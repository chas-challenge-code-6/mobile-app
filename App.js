import { ThemeProvider } from "./context/ThemeContext";
import Navigation from "./navigation/Navigation";
import { AuthProvider } from "./context/AuthContext";
import { NewsProvider } from "./context/NewsContext";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function App() {
  // Registrera Service Worker för PWA-funktionalitet
  useEffect(() => {
    if (Platform.OS === 'web' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NewsProvider>
          <Navigation />
        </NewsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
