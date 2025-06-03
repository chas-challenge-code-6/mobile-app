import { ActivityIndicator, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getData } from "../services/api"; // Aktiverad för livedata

const Card = ({ title, arrow }) => {
  const { theme } = useTheme(); // Get theme

  const [value, setValue] = useState("");
  const [icon, setIcon] = useState("");
  const [unit, setUnit] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Försök hämta livedata från API
        console.log(`Fetching data for ${title}...`);
        const apiData = await getData();
        
        let dataValue = "";
        let iconName = "";
        let unitText = "";

        if (apiData) {
          // Använd livedata från API (API returnerar ett objekt direkt)
          switch (title) {
            case "temperature":
              dataValue = apiData.temperature;
              iconName = "sun-thermometer-outline";
              unitText = "°C";
              break;
            case "humidity":
              dataValue = apiData.humidity;
              iconName = "weather-fog";
              unitText = "%";
              break;
            case "gas":
              dataValue = apiData.gas;
              iconName = "weather-windy-variant";
              unitText = "m^3";
              break;
            case "steps":
              dataValue = apiData.steps;
              iconName = "shoe-print";
              unitText = "steps";
              break;
            case "heart_rate":
              dataValue = apiData.heart_rate;
              iconName = "heart-pulse";
              unitText = "bpm";
              break;
            case "noise_level":
              dataValue = apiData.noise_level;
              iconName = "ear-hearing";
              unitText = "dB";
              break;
            default:
              dataValue = "N/A";
              break;
          }
        } else {
          // Fallback till mockdata om API inte svarar
          console.log("API inte tillgängligt, använder mockdata");
          const mockData = require("../data/data.json");
          
          switch (title) {
            case "temperature":
              dataValue = mockData.temperature;
              iconName = "sun-thermometer-outline";
              unitText = "°C";
              break;
            case "humidity":
              dataValue = mockData.humidity;
              iconName = "weather-fog";
              unitText = "%";
              break;
            case "gas":
              dataValue = mockData.gas;
              iconName = "weather-windy-variant";
              unitText = "m^3";
              break;
            case "steps":
              dataValue = mockData.steps;
              iconName = "shoe-print";
              unitText = "steps";
              break;
            case "heart_rate":
              dataValue = mockData.heart_rate;
              iconName = "heart-pulse";
              unitText = "bpm";
              break;
            case "noise_level":
              dataValue = mockData.noise_level;
              iconName = "ear-hearing";
              unitText = "dB";
              break;
            default:
              dataValue = "Något gick fel";
              break;
          }
        }

        setValue(dataValue);
        setIcon(iconName);
        setUnit(unitText);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Kunde inte hämta data");
        
        // Fallback till mockdata vid fel
        const mockData = require("../data/data.json");
        
        let fallbackValue = "";
        let fallbackIcon = "";
        let fallbackUnit = "";
        
        switch (title) {
          case "temperature":
            fallbackValue = mockData.temperature;
            fallbackIcon = "sun-thermometer-outline";
            fallbackUnit = "°C";
            break;
          case "humidity":
            fallbackValue = mockData.humidity;
            fallbackIcon = "weather-fog";
            fallbackUnit = "%";
            break;
          case "gas":
            fallbackValue = mockData.gas;
            fallbackIcon = "weather-windy-variant";
            fallbackUnit = "m^3";
            break;
          case "steps":
            fallbackValue = mockData.steps;
            fallbackIcon = "shoe-print";
            fallbackUnit = "steps";
            break;
          case "heart_rate":
            fallbackValue = mockData.heart_rate;
            fallbackIcon = "heart-pulse";
            fallbackUnit = "bpm";
            break;
          case "noise_level":
            fallbackValue = mockData.noise_level;
            fallbackIcon = "ear-hearing";
            fallbackUnit = "dB";
            break;
          default:
            fallbackValue = "N/A";
            fallbackIcon = "alert-circle";
            fallbackUnit = "";
            break;
        }
        
        setValue(fallbackValue);
        setIcon(fallbackIcon);
        setUnit(fallbackUnit);
        setError(null); // Clear error since we have fallback data
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [title]);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text style={{ color: "red" }}>{error}</Text>;
    }

    return (
      <View style={theme.card}>
        <MaterialCommunityIcons
          name={icon}
          color={theme.colors.icon}
          size={50}
        />

        <View style={{ alignItems: "flex-end" }}>
          {arrow && (
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme.colors.accent}
              size={24}
            />
          )}

          <Text style={theme.textStyles.unitLarge}>
            {value}
            <Text style={theme.textStyles.unitSmall}> {unit}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return <View>{getContent()}</View>;
};

export default Card;
