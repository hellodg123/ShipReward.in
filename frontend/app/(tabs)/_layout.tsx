import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="manifest" />
      <Stack.Screen name="pickup" />
      <Stack.Screen name="shipments" />
      <Stack.Screen name="track" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
