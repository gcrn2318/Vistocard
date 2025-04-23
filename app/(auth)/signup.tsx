import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, ArrowRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';
export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const backendUrl = Constants.expoConfig?.extra?.BACKEND_URL || 'https://41bd-2409-40f0-2e-8d93-e917-86f5-fa6-d9c7.ngrok-free.app';
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName: name, username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, store the token and redirect
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('fullName', name);
        router.replace('/(tabs)');
      } else {
        // Signup failed, display the error message
        Alert.alert('Signup Failed', data.message || 'An error occurred during signup.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', 'Failed to connect to the server.');
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <User size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.links}>
            <Link href="/login" style={styles.link}>
              Already have an account? Sign In
            </Link>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#999',
    marginBottom: 48,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  links: {
    alignItems: 'center',
    marginTop: 24,
  },
  link: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});