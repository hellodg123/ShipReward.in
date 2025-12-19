import React from 'react';
import { Slot } from 'expo-router';
import DashboardLayout from '../../src/components/DashboardLayout';

export default function TabLayout() {
  return (
    <DashboardLayout>
      <Slot />
    </DashboardLayout>
  );
}
