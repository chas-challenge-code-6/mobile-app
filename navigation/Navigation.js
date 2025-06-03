import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import DrawerNavigator from "./DrawerNavigator";
import EntryScreen from "../screens/EntryScreen";
import LoginFormScreen from "../screens/LoginFormScreen";
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen'


const Navigation = () => {
  const { theme } = useTheme();
  const { isAuthenticated, loading } = useAuth(); // Här hämtas inloggningsstatus och laddningsstatus från AuthContext
  const [showSplash, setShowSplash] = useState(true); // Visar en splash screen i 2 sekunder för att ge en smidig uppstart
  const Stack = createNativeStackNavigator();
  const styles = createStyles();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // 2 sekunder splash
    return () => clearTimeout(timer);
  }, []);

  /* Om splash visas eller om vi fortfarande kontrollerar token från SecureStore, 
  så visas EntryScreen */
  if (showSplash || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EntryScreen />
      </SafeAreaView>
    );
  }

  /* Om användaren är inloggad (isAuthenticated är true) visas huvudappen (DrawerNavigator)
  Annars visas inloggningsformuläret (LoginFormScreen) */
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="MainApp" component={DrawerNavigator} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginFormScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />  

            </>
          )}

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const createStyles = () =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      // paddingBottom: Platform.OS === "android" ? 50 : 0,
    },
  });

export default Navigation;
