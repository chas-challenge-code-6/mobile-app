import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const ProfileInfo = () => {
  const { theme } = useTheme();
  const { getUserInfo } = useAuth();

  // Temporär lokal state – kan ersättas med API-data
  const [profileData, setProfileData] = useState({
    username: "maggiepearson",
    email: "maggie.pearson@ecobuild.com",
    phonenumber: "+46 78 993 65 12",
    workplace: "EcoBuild Solutions",
    jobTitle: "Construction Engineer",
  });

  // Förbered för API-hämtning
  // useEffect(() => {

  // TODO: Ersätt URL nedan när API är tillgängligt
  /*
    fetch("https://our-api-url.com/profile")
      .then((res) => res.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error("Error fetching profile:", error));
    */
  // }, []);

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {renderField("Username", profileData.username, styles)}
      {renderField("Email", profileData.email, styles)}
      {renderField("Phonenumber", profileData.phonenumber, styles)}
      {renderField("Workplace", profileData.workplace, styles)}
      {renderField("Job title", profileData.jobTitle, styles)}
    </View>
  );
};

// Delad renderingsfunktion
const renderField = (label, value, styles) => (
  <View style={styles.fieldContainer} key={label}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      gap: 8,
      marginTop: 20,
    },
    fieldContainer: {
      marginBottom: 10,
    },
    label: {
      fontWeight: "600",
      color: theme.colors.heading,
      fontSize: 16,
      marginBottom: 6,
    },
    valueContainer: {
      backgroundColor: theme.colors.snow,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    value: {
      fontSize: 16,
      color: theme.textPrimary,
    },
  });

export default ProfileInfo;
