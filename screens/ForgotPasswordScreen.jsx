import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/layout/Layout';
import PrimaryButton from '../components/PrimaryButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://backend-belz.onrender.com/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Password reset request failed');

      Alert.alert('Success', 'Check your email for reset instructions');
      navigation.goBack(); // Gå tillbaka till login efter skickat
    } catch (error) {
      Alert.alert('Error', 'Failed to send password reset link');
    }
  };

  return (
    <Layout scrollable>
      <View style={styles.container}>
        <Text style={[theme.textStyles.titleLarge, { marginBottom: 24 }]} accessibilityRole="header">
          Forgot Password
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.snow, color: theme.colors.text }]}
          placeholder="Enter your email"
          placeholderTextColor={theme.colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address for password reset"
        />
        <PrimaryButton
          title="Send Reset Link"
          onPress={handleSubmit}
          variant="primary"
          accessibilityRole="button"
          accessibilityLabel="Send password reset link"
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  input: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
