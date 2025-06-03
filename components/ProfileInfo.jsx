import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getProfile } from "../services/api"; // Importera API-funktionen

const ProfileInfo = () => {
  const { theme } = useTheme();

  // Temporär lokal state – kan ersättas med API-data
  const [profileData, setProfileData] = useState({
    username: "maggiepearson",
    email: "maggie.pearson@ecobuild.com",
    phone_number: "+46 78 993 65 12",
    workplace: "EcoBuild Solutions",
    job_title: "Construction Engineer",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Hämta profildata från API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        console.log("ProfileInfo: Fetching profile from API...");
        const apiProfile = await getProfile();
        console.log("ProfileInfo: API response:", apiProfile);
        
        if (apiProfile) {
          console.log("ProfileInfo: Använder livedata för profil");
          setProfileData({
            username: apiProfile.username || profileData.username,
            email: apiProfile.email || profileData.email,
            phone_number: apiProfile.phone_number || profileData.phone_number,
            workplace: apiProfile.workplace || profileData.workplace,
            job_title: apiProfile.job_title || profileData.job_title,
          });
        } else {
          console.log("ProfileInfo: API inte tillgängligt, använder mockdata för profil");
          // Behåller mockdata som är redan satt
        }
      } catch (error) {
        console.error("ProfileInfo: Error fetching profile:", error);
        // Behåller mockdata vid fel
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {renderField("Username", profileData.username, styles)}
      {renderField("Email", profileData.email, styles)}
      {renderField("Phonenumber", profileData.phone_number, styles)}
      {renderField("Workplace", profileData.workplace, styles)}
      {renderField("Job title", profileData.job_title, styles)}
    </View>
  );
};

// Delad renderingsfunktion
const renderField = (label, value, styles) => (
  <View style={styles.fieldContainer} key={label}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value}>
        {value || 'Ej angiven'}
      </Text>
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
