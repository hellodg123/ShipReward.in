import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  gray: '#6B7280',
  darkGray: '#374151',
  gold: '#F59E0B',
};

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const quickActions = [
    { icon: 'add-circle-outline', label: 'New Shipment', route: '/shipments' },
    { icon: 'location-outline', label: 'Track', route: '/track' },
    { icon: 'calculator-outline', label: 'Rate Calculator', route: '/track' },
    { icon: 'document-text-outline', label: 'Documents', route: '/profile' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route as any)}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name={action.icon as any} size={28} color={COLORS.primary} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="cube" size={32} color={COLORS.white} />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Total Shipments</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: COLORS.gold }]}>
              <Ionicons name="time" size={32} color={COLORS.white} />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>In Transit</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
              <Ionicons name="checkmark-circle" size={32} color={COLORS.white} />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Delivered</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="hourglass" size={32} color={COLORS.white} />
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Ship Internationally</Text>
            <Text style={styles.promoSubtitle}>To 220+ Countries</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Get Quote</Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="globe-outline" size={80} color="rgba(255,255,255,0.3)" />
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primaryDark,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 40,
    tintColor: COLORS.white,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: COLORS.primaryDark,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 4,
  },
  quickActionsSection: {
    backgroundColor: COLORS.lightGray,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  statsSection: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  promoBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
