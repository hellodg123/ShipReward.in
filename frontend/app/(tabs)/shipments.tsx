import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

export default function ShipmentsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Shipments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="cube-outline" size={64} color={COLORS.gray} />
          </View>
          <Text style={styles.emptyTitle}>No Shipments Yet</Text>
          <Text style={styles.emptyDescription}>
            Your shipments will appear here once you create one.
          </Text>
          <TouchableOpacity style={styles.createButton}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
            <Text style={styles.createButtonText}>Create Shipment</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primaryDark,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
