import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Layout from '../components/layout/Layout';

const ResetPasswordScreen = ({ route, navigation }) => {
  const token = route.params?.token; // Hämtar token från navigation params

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://backend-belz.onrender.com/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }

      Alert.alert('Success', 'Your password has been reset.');
      navigation.navigate('Login'); // Navigera tillbaka till login
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (!token) {
    return (
      <Layout scrollable>
        <View style={styles.container}>
          <Text style={styles.errorText}>Invalid or missing reset token.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout scrollable>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          placeholder="New Password"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          autoCapitalize="none"
          accessibilityLabel="New password input field"
        />
        <TextInput
          placeholder="Confirm New Password"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          accessibilityLabel="Confirm new password input field"
        />
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default ResetPasswordScreen;
