import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function RootLayout() {
  // Remove focus outline on web for all inputs
  useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        * { outline: none !important; }
        input, textarea, select, button { 
          outline: none !important; 
          -webkit-appearance: none;
        }
        input:focus, textarea:focus, select:focus, button:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        [data-focusable="true"]:focus { outline: none !important; }
        input:focus, textarea:focus {
          caret-color: #2563EB;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}
