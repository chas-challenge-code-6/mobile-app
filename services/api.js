// Här kan vi samla våra fetchanrop
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Storage wrapper that works on both mobile and web (same as in AuthContext)
const Storage = {
  getItemAsync: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  deleteItemAsync: async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

// Get the stored authentication token
const getStoredToken = async () => {
  try {
    const token = await Storage.getItemAsync('token');
    console.log("API: Retrieved token:", token ? "Token exists" : "No token found");
    return token;
  } catch (error) {
    console.error("API: Failed to get stored token:", error);
    return null;
  }
};

// Hjälpfunktion för att säkerställa att vi har en giltig token
const ensureAuthenticated = async () => {
  const token = await getStoredToken();
  if (!token) {
    console.error("API: No authentication token found. Please log in first.");
    throw new Error("No authentication token found. Please log in first.");
  }
  console.log("API: Using authentication token for request");
  return token;
};

// Hämta sensor data
export const getData = async (title) => {
  try {
    const token = await ensureAuthenticated();
    
    const response = await fetch(`${API_URL}/api/data/latest`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log("API: Token is invalid, clearing it...");
        await Storage.deleteItemAsync('token');
        throw new Error("Authentication failed. Please log in again.");
      }
      throw new Error("Error collecting data");
    }

    const data = await response.json();
    console.log("Received data:", data);
    
    // API returnerar ett objekt, inte en array
    if (title && data) {
      return data[title.toLowerCase().replace(' ', '_')];
    }
    return data;
  } catch (error) {
    console.error("Error collecting data", error);
    return null;
  }
};

// Hämta nyheter
export const getNews = async () => {
  try {
    const token = await ensureAuthenticated();
    
    const response = await fetch(`${API_URL}/api/news`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        console.log("API: Token is invalid, clearing it...");
        await Storage.deleteItemAsync('token');
        throw new Error("Authentication failed. Please log in again.");
      }
      throw new Error("Error fetching news");
    }

    const news = await response.json();
    console.log("Received news:", news);
    return news;
  } catch (error) {
    console.error("Error fetching news", error);
    return null;
  }
};

// Hämta profildata
export const getProfile = async () => {
  try {
    const token = await ensureAuthenticated();
    
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        console.log("API: Token is invalid, clearing it...");
        await Storage.deleteItemAsync('token');
        throw new Error("Authentication failed. Please log in again.");
      }
      throw new Error("Error fetching profile");
    }

    const profile = await response.json();
    console.log("Received profile:", profile);
    return profile;
  } catch (error) {
    console.error("Error fetching profile", error);
    return null;
  }
};

// Hämta historisk data för statistik
export const getHistoricalData = async (deviceId = 1, fromDate, toDate) => {
  try {
    const token = await ensureAuthenticated();
    
    // Om inga datum anges, använd de senaste 30 dagarna
    if (!fromDate || !toDate) {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      
      toDate = now.toISOString();
      fromDate = thirtyDaysAgo.toISOString();
    }
    
    const url = `${API_URL}/api/data/${deviceId}?from=${fromDate}&to=${toDate}`;
    console.log("API: Fetching historical data from:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log("API: Token is invalid, clearing it...");
        await Storage.deleteItemAsync('token');
        throw new Error("Authentication failed. Please log in again.");
      }
      throw new Error(`Error fetching historical data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received historical data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching historical data", error);
    return null;
  }
};
