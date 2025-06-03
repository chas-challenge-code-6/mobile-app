import { useEffect, useState } from "react";
import { StyleSheet, Text, View, LayoutAnimation, RefreshControl } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/layout/Layout";
import CardSection from "../components/CardSection";
import dataList from "../utils/dataList.js";
import WarningCard from "../components/WarningCard";
import { getData } from "../services/api"; // Importera API-funktionen

const HomeScreen = () => {
  const { theme } = useTheme(); // Get theme
  const [sensorData, setSensorData] = useState({
    temperature: 28,
    steps: 6200,
    heartRate: 85,
    gasLevel: 2,
    noiseLevel: 85,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Layout-animation
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  // Hämta sensordata från API
  const fetchSensorData = async () => {
    try {
      if (!refreshing) setIsLoading(true);
      console.log("HomeScreen: Fetching sensor data from API...");
      const apiData = await getData();
      console.log("HomeScreen: API response:", apiData);
      
      if (apiData) {
        console.log("HomeScreen: Använder livedata för sensorer");
        setSensorData({
          temperature: apiData.temperature || 28,
          steps: apiData.steps || 6200,
          heartRate: apiData.heart_rate || 85,
          gasLevel: apiData.gas || 2,
          noiseLevel: apiData.noise_level || 85,
        });
      } else {
        console.log("HomeScreen: API inte tillgängligt, använder mockdata för sensorer");
        // Behåller befintliga mockdata
      }
    } catch (error) {
      console.error("HomeScreen: Error fetching sensor data:", error);
      // Behåller mockdata vid fel
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Pull-to-refresh funktion
  const onRefresh = () => {
    setRefreshing(true);
    fetchSensorData();
  };

  useEffect(() => {
    fetchSensorData();
    
    // Uppdatera data var 30:e sekund
    const interval = setInterval(fetchSensorData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const notifications = [];

  if (sensorData.temperature > 26) notifications.push("heat");
  if (sensorData.steps > 6000) notifications.push("steps");
  if (sensorData.heartRate > 125) notifications.push("heartrate");
  if (sensorData.noiseLevel > 70) notifications.push("noise");
  if (sensorData.gasLevel >= 2) notifications.push("gas");

  if (notifications.length === 0) notifications.push("default");

  const randomIndex = Math.floor(Math.random() * notifications.length);
  const selectedNotification = notifications[randomIndex];

  return (
    <Layout 
      scrollable
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={[theme.colors.primary]} // Android
          tintColor={theme.colors.primary} // iOS
          title="Hämtar data..." // iOS
          titleColor={theme.colors.text} // iOS
        />
      }
    >
      <Text style={theme.textStyles.titleLarge} accessibilityRole="header">
        Overview
      </Text>

      {/* Visa laddningsindikator eller varningskort */}
      {isLoading ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={theme.textStyles.textBody}>Hämtar sensordata...</Text>
        </View>
      ) : (
        <WarningCard type={selectedNotification} />
      )}

      {/* Data-sektioner */}
      {dataList.map((item) => (
        <CardSection key={item} title={item} />
      ))}
    </Layout>
  );
};

export default HomeScreen;
