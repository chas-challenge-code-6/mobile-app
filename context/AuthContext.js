import { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

/* Expo-secure-store fungerar inte i webbläsare – bara i Android/iOS. 
Om vi vill stötta webben måste vi lägga till ett fallback som t ex använder AsyncStorage i webbläsaren. */
import { Platform } from 'react-native'; 

/* Skapar en global inloggningskontext som andra komponenter i appen 
kan använda för att veta om användaren är inloggad eller inte */
const AuthContext = createContext(); 

// Wrapper för SecureStore + fallback till localStorage på webben
// Eget objekt: Storage – fungerar både på mobil och webb
// När vi vill HÄMTA ett värde, kollar vi om vi kör i webbläsare (Platform.OS === 'web')
// Om ja: använd localStorage, annars expo-secure-store
const Storage = {
  getItemAsync: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  // När vi vill SPARA ett värde, kollar vi om vi kör i webbläsare (Platform.OS === 'web')
  // Om ja: använd localStorage, annars expo-secure-store 
  setItemAsync: async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  // När vi vill TA BORT (LOGGA UT) ett värde, kollar vi om vi kör i webbläsare (Platform.OS === 'web')
  // Om ja: använd localStorage, annars expo-secure-store 
   deleteItemAsync: async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key); // För webb
    } else {
      await SecureStore.deleteItemAsync(key); // För mobil
    }
  },
};

// Den här komponenten lindar in hela appen så att alla barnkomponenter får tillgång till inloggningsinfo
export const AuthProvider = ({ children }) => {
  // Två tillstånd:
  const [isAuthenticated, setIsAuthenticated] = useState(false); //  isAuthenticated = om användaren är inloggad
  const [loading, setLoading] = useState(true); // loading = om vi fortfarande laddar data (t ex kontrollerar om token finns)

  /* När appen startar körs checkToken(). Den försöker hämta ett sparat token.
  Om det finns ett token (!!token = true), sätts isAuthenticated till true.
Annars blir det false. I båda fall: loading sätts till false när vi är klara. */
  useEffect(() => {
    const checkToken = async () => {
      console.log("AuthContext: Run checkToken");
      try {
        const token = await Storage.getItemAsync('token');
        console.log("AuthContext: Token found:", token ? "Token exists" : "No token found");
        
        // Kolla om korrekt
        if (token) {
          console.log("AuthContext: Testing token validity...");
          try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/me`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            
            if (response.status === 401) {
              console.log("AuthContext: Token is invalid, clearing it...");
              await Storage.deleteItemAsync('token');
              setIsAuthenticated(false);
            } else {
              console.log("AuthContext: Token is valid");
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.log("AuthContext: Error testing token, keeping it for now");
            setIsAuthenticated(!!token);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("AuthContext: Failed to load token:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  /* Riktigt login
  */
  const login = async (username, password) => {
    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      console.log("AuthContext: Attempting login with API...");
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Login failed - Invalid credentials");
      }

      const result = await response.json();
      console.log("AuthContext: Login response:", result);
      
      if (result.status === "success" && result.data.token) {
        await Storage.setItemAsync("token", result.data.token);
        setIsAuthenticated(true);
        console.log("AuthContext: Login successful, token stored");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("AuthContext: Login error:", error);
      throw new Error("Login failed - Please check your credentials");
    }
  };

  // Tar bort token. Markerar användaren som utloggad.
  const logout = async () => {
    await Storage.deleteItemAsync("token");
    setIsAuthenticated(false);
  };

  // Hämta för tillfället sparade token
  const getToken = async () => {
    try {
      return await Storage.getItemAsync('token');
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  };

  // Gör isAuthenticated, login(), logout(), getToken() och loading tillgängliga för alla komponenter via context
  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

/* 

Hook för att använda auth-funktioner i komponenter:
export const useAuth = () => useContext(AuthContext);

När vi vill använda auth någonstans i vår app (t ex LoginFormScreen), skriver vi:
const { login, logout, isAuthenticated } = useAuth() 

*/
