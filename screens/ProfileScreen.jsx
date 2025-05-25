import { StyleSheet, Image, Button, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/layout/Layout";
import ProfileInfo from "../components/ProfileInfo";
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme(); //  theme: ett objekt som innehåller colors, textStyles m.m och även ett mode - light eller dark
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };
  
  return (
    <Layout scrollable>
      <View style={styles.container}>
        
        <Image
          source={require("../assets/images/profile-example.jpg")}
          style={styles.profileimg}
        />
        <Text style={theme.textStyles.titleMedium} accessibilityRole="header">
          Maggie Pearson
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
       
      <ProfileInfo />

      <PrimaryButton
        title="Logout"
        variant="primary"
        accessibilityRole="button"
        accessibilityLabel="Logout"
        accessibilityHint="Log out from your account"
        onPress={() => {
          console.log("Logout button pressed!");
          logout();
        }}   
      />

      </View>
    </Layout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  profileimg: {
    borderColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    height: 150,
    marginBottom: 16,
    width: 150,
  },
});
