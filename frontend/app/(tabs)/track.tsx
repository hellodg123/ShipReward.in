import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  gray: '#6B7280',
  darkGray: '#374151',
};

export default function TrackScreen() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = () => {
    // TODO: Implement tracking
    console.log('Tracking:', trackingNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Shipment</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.trackingCard}>
          <Text style={styles.trackingLabel}>Enter Tracking Number</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="e.g., SR1234567890"
              placeholderTextColor={COLORS.gray}
              value={trackingNumber}
              onChangeText={setTrackingNumber}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleTrack}>
              <Ionicons name="search" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Enter your ShipReward tracking number to see the status of your shipment.
          </Text>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.emptyRecent}>
            <Ionicons name="time-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No recent searches</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primaryDark,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  trackingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trackingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  recentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  emptyRecent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 8,
  },
});
