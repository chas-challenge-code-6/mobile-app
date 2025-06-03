import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import Layout from "../components/layout/Layout";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginFormScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Get theme

  const [username, setUsername] = useState("code6");
  const [password, setPassword] = useState("QNiNKJWwfvWbJSS");
  const { login, loading, setLoading } = useAuth(); // Hämta login-funktionen från context
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(username, password, setError); // Anropar login från AuthContext
    } catch (err) {
      setError(
        "Login failed. Please check your username and password and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout scrollable>
      <View style={styles.container}>
        {!loading ? (
          <>
            <Text
              style={theme.textStyles.titleLarge}
              accessibilityRole="header"
            >
              Login
            </Text>

            <Text style={theme.textStyles.inputTitle}>Username</Text>
            <TextInput
              placeholder="Enter username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              style={styles.input}
              accessibilityLabel="Username input field"
              accessibilityHint="Enter your username"
            />

            <Text style={theme.textStyles.inputTitle}>Password</Text>
            <TextInput
              secureTextEntry
              placeholder="Enter password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              accessibilityLabel="Password input field"
              accessibilityHint="Enter your password"
            />

            <PrimaryButton
              title="Login"
              onPress={handleLogin}
              variant="primary"
              accessibilityRole="button"
              accessibilityLabel="Login button"
              accessibilityHint="Log in to your account"
            />
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}

        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
      </View>
    </Layout>
  );
};

export default LoginFormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
  },
  button: {
    backgroundColor: "#46D2CA",
    borderRadius: 10,
    padding: 12,
  },
});
