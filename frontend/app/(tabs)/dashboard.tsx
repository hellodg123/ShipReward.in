import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

// Color Scheme
const COLORS = {
  // Primary Colors
  primary: '#1f46a7',        // Deep Blue
  primaryDark: '#183a8c',    // Darker Blue
  primaryLight: '#3d5fb8',   // Lighter Blue
  
  // Secondary Colors
  secondary: '#ffd700',      // Gold
  accent: '#ffd700',         // Gold
  
  // Background Colors
  bgWhite: '#FFFFFF',        // White background
  
  // Text Colors
  textDark: '#1E293B',       // Slate 800
  textMuted: '#64748B',      // Slate 500
  textLight: '#94A3B8',      // Slate 400
  
  // Status Colors
  success: '#10B981',        // Emerald
  warning: '#F59E0B',        // Amber
  error: '#EF4444',          // Red
  info: '#3B82F6',           // Blue
  purple: '#8B5CF6',         // Violet
  cyan: '#06B6D4',           // Cyan
  rose: '#F43F5E',           // Rose
  orange: '#F97316',         // Orange
  indigo: '#6366F1',         // Indigo
  teal: '#14B8A6',           // Teal
  
  // KYC Bar Colors
  kycBarBg: '#FEF3E2',       // Light orange/peach
  kycText: '#B45309',        // Dark orange text
  
  // UI Colors
  white: '#FFFFFF',
  black: '#000000',
  border: '#E2E8F0',
  divider: '#F1F5F9',
  transparent: 'transparent',
};

// Cards with unique icon colors
const orderStatusCards = [
  { title: 'All Orders', count: '00', icon: 'layers-outline', iconColor: COLORS.primary, route: '/(tabs)/orders', tab: 'all' },
  { title: 'Drafted Orders', count: '00', icon: 'create-outline', iconColor: COLORS.warning, route: '/(tabs)/orders', tab: 'drafts' },
  { title: 'Pending for Label', count: '00', icon: 'pricetag-outline', iconColor: COLORS.success, route: '/(tabs)/orders', tab: 'ready' },
  { title: 'Packed Orders', count: '00', icon: 'cube-outline', iconColor: COLORS.cyan, route: '/(tabs)/orders', tab: 'packed' },
  { title: 'Dispatched Orders', count: '00', icon: 'send-outline', iconColor: COLORS.purple, route: '/(tabs)/orders', tab: 'dispatched' },
];

const actionCards = [
  { title: 'Pickups In Progress', count: '00', icon: 'checkmark-done-outline', iconColor: COLORS.teal, route: '/(tabs)/pickup', tab: '' },
  { title: 'Open Manifests', count: '00', icon: 'mail-outline', iconColor: COLORS.indigo, route: '/(tabs)/manifest', tab: '' },
  { title: 'Disputed Orders', count: '00', icon: 'close-circle-outline', iconColor: COLORS.rose, route: '/(tabs)/orders', tab: 'disputed' },
];

export default function DashboardScreen() {
  const router = useRouter();

  const handleCardPress = (route: string, tab: string) => {
    if (tab) {
      router.push({ pathname: route as any, params: { tab } });
    } else {
      router.push(route as any);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.dashboardTitle}>Dashboard</Text>

      {/* Order Status Cards Row - Transparent background with colored icons */}
      <View style={styles.orderStatusRow}>
        {orderStatusCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderStatusCard}
            onPress={() => handleCardPress(card.route, card.tab)}
          >
            <View style={[styles.orderStatusIcon, { backgroundColor: `${card.iconColor}15` }]}>
              <Ionicons name={card.icon as any} size={22} color={card.iconColor} />
            </View>
            <Text style={[styles.orderStatusTitle, { color: card.iconColor }]}>{card.title}</Text>
            <Text style={styles.orderStatusCount}>{card.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Actions Section */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionsRow}>
          {actionCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => handleCardPress(card.route, card.tab)}
            >
              <View style={[styles.actionIcon, { backgroundColor: `${card.iconColor}15` }]}>
                <Ionicons name={card.icon as any} size={28} color={card.iconColor} />
              </View>
              <Text style={styles.actionCount}>{card.count}</Text>
              <Text style={styles.actionTitle}>{card.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>2025 © ShipReward.in</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.bgWhite,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  orderStatusRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  orderStatusCard: {
    flex: 1,
    minWidth: 120,
    padding: 14,
    borderRadius: 12,
    alignItems: 'flex-start',
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderStatusIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  orderStatusTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderStatusCount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  actionCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: COLORS.transparent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionCount: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  actionTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 24,
    fontWeight: '500',
  },
});
