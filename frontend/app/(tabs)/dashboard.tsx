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

// New Modern Color Scheme
const COLORS = {
  // Primary Colors
  primary: '#1f46a7',        // Deep Blue
  primaryDark: '#183a8c',    // Darker Blue
  primaryLight: '#3d5fb8',   // Lighter Blue
  
  // Secondary Colors
  secondary: '#ffd700',      // Gold
  accent: '#ffd700',         // Gold
  
  // Background Colors
  bgLight: '#F8FAFC',        // Very light gray
  bgCard: '#FFFFFF',         // White
  
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
  
  // UI Colors
  white: '#FFFFFF',
  black: '#000000',
  border: '#E2E8F0',
  divider: '#F1F5F9',
  
  // Card Background Colors
  bgBlue: '#EEF2FF',
  bgGreen: '#ECFDF5',
  bgYellow: '#FFFBEB',
  bgRed: '#FEF2F2',
  bgPurple: '#F5F3FF',
  bgCyan: '#ECFEFF',
  bgRose: '#FFF1F2',
};

const orderStatusCards = [
  { title: 'All Orders', count: '00', icon: 'layers-outline', route: '/(tabs)/orders', tab: 'all' },
  { title: 'Drafted Orders', count: '00', icon: 'create-outline', route: '/(tabs)/orders', tab: 'drafts' },
  { title: 'Pending for Label', count: '00', icon: 'pricetag-outline', route: '/(tabs)/orders', tab: 'ready' },
  { title: 'Packed Orders', count: '00', icon: 'cube-outline', route: '/(tabs)/orders', tab: 'packed' },
  { title: 'Dispatched Orders', count: '00', icon: 'send-outline', route: '/(tabs)/orders', tab: 'dispatched' },
];

const actionCards = [
  { title: 'Pickups In Progress', count: '00', icon: 'checkmark-done-outline', route: '/(tabs)/pickup', tab: '' },
  { title: 'Open Manifests', count: '00', icon: 'mail-outline', route: '/(tabs)/manifest', tab: '' },
  { title: 'Disputed Orders', count: '00', icon: 'close-circle-outline', route: '/(tabs)/orders', tab: 'disputed' },
];

const walletActivity = [
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', color: COLORS.warning },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Restricted', date: '09 Oct 25 - 04:35 PM', color: COLORS.primary },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283G7 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', color: COLORS.accent },
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

      {/* Order Status Cards Row - White background with black icons */}
      <View style={styles.orderStatusRow}>
        {orderStatusCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderStatusCard}
            onPress={() => handleCardPress(card.route, card.tab)}
          >
            <View style={styles.orderStatusIcon}>
              <Ionicons name={card.icon as any} size={22} color={COLORS.black} />
            </View>
            <Text style={styles.orderStatusTitle}>{card.title}</Text>
            <Text style={styles.orderStatusCount}>{card.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Actions and Wallet Row */}
      <View style={styles.actionsWalletRow}>
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
                <View style={styles.actionIcon}>
                  <Ionicons name={card.icon as any} size={28} color={COLORS.black} />
                </View>
                <Text style={styles.actionCount}>{card.count}</Text>
                <Text style={styles.actionTitle}>{card.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Wallet Activity Section */}
        <View style={styles.walletActivitySection}>
          <Text style={styles.sectionTitle}>Wallet Activity</Text>
          <View style={styles.walletActivityList}>
            {walletActivity.map((item, index) => (
              <View key={index} style={styles.walletActivityItem}>
                <View style={[styles.walletActivityIndicator, { backgroundColor: item.color }]} />
                <View style={styles.walletActivityContent}>
                  <Text style={styles.walletActivityDesc}>{item.description}</Text>
                  <Text style={styles.walletActivityOrderId}>{item.orderId}</Text>
                  <Text style={styles.walletActivityDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
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
    backgroundColor: COLORS.bgLight,
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
    gap: 16,
    marginBottom: 28,
    flexWrap: 'wrap',
  },
  orderStatusCard: {
    flex: 1,
    minWidth: 160,
    padding: 20,
    borderRadius: 16,
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderStatusIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: COLORS.divider,
  },
  orderStatusTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: COLORS.textMuted,
  },
  orderStatusCount: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -1,
  },
  actionsWalletRow: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  actionsSection: {
    flex: 2,
    minWidth: 300,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  actionCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: COLORS.divider,
  },
  actionCount: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
    letterSpacing: -1,
  },
  actionTitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  walletActivitySection: {
    flex: 1,
    minWidth: 300,
  },
  walletActivityList: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  walletActivityItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  walletActivityIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 14,
  },
  walletActivityContent: {
    flex: 1,
  },
  walletActivityDesc: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  walletActivityOrderId: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  walletActivityDate: {
    fontSize: 12,
    color: COLORS.textLight,
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
