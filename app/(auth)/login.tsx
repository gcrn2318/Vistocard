import { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { DEFAULT_EMAIL, DEFAULT_PASSWORD } from '../_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const backendUrl = Constants.expoConfig?.extra?.BACKEND_URL || 'https://41bd-2409-40f0-2e-8d93-e917-86f5-fa6-d9c7.ngrok-free.app';
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        // Fetch user details
        const userResponse = await fetch('http://localhost:5000/auth/user', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const userData = await userResponse.json();
        if (userResponse.ok) {
          await AsyncStorage.setItem('fullName', userData.fullName);
          router.replace('/(tabs)');
        } else {
          setError(userData.message || 'Failed to fetch user details');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Failed to login');
      console.error('Login error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#fff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>

            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => console.log('Login with Google')}>
            <Text style={styles.loginButtonText}>Login with Google</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.defaultCredentials}>
            <Text style={styles.defaultCredentialsTitle}>Default Login Details:</Text>
            <Text style={styles.defaultCredentialsText}>Username: <Text>{DEFAULT_EMAIL}</Text></Text>
            <Text style={styles.defaultCredentialsText}>Password: <Text>{DEFAULT_PASSWORD}</Text></Text>
          </View>

          <View style={styles.links}>
            <Link href="/signup" style={styles.link}>
              Create Account
            </Link>
            <Link href="/forgot-password" style={styles.link}>
              Forgot Password?
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
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  link: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  defaultCredentials: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  defaultCredentialsTitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  defaultCredentialsText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
});