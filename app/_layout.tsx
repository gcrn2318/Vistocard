import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default credentials for testing
export const DEFAULT_EMAIL = 'user@example.com';
export const DEFAULT_PASSWORD = 'password123';

function useProtectedRoute(isAuthenticated: boolean, fontsLoaded: boolean) {
  // Placeholder implementation
  console.log("useProtectedRoute called", isAuthenticated, fontsLoaded);
}

export default function RootLayout() {
  useFrameworkReady();
  
  // For demo purposes, we'll use a simple authentication state
  // In a real app, this would come from your auth system
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      if (email === DEFAULT_EMAIL) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Call the hook with the fontsLoaded state
  useProtectedRoute(isAuthenticated, fontsLoaded);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}