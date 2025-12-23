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

const walletActivity = [
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', amount: '-Rs. 250.00', color: COLORS.error },
  { description: 'Wallet Recharge:', orderId: 'TXN-20251209-001234', date: '09 Oct 25 - 04:35 PM', amount: '+Rs. 5,000.00', color: COLORS.success },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283G7 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', amount: '-Rs. 180.00', color: COLORS.error },
  { description: 'Order Payment:', orderId: 'SG32512224553178', date: '08 Oct 25 - 02:15 PM', amount: '-Rs. 476.72', color: COLORS.warning },
  { description: 'Wallet Recharge:', orderId: 'TXN-20251008-005678', date: '08 Oct 25 - 10:00 AM', amount: '+Rs. 2,000.00', color: COLORS.success },
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
                <View style={[styles.actionIcon, { backgroundColor: `${card.iconColor}15` }]}>
                  <Ionicons name={card.icon as any} size={28} color={card.iconColor} />
                </View>
                <Text style={styles.actionCount}>{card.count}</Text>
                <Text style={styles.actionTitle}>{card.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Wallet Activity Section - Now as a Table with vertical scroll */}
        <View style={styles.walletActivitySection}>
          <Text style={styles.sectionTitle}>Wallet Activity</Text>
          <View style={styles.walletActivityContainer}>
            {/* Table Header */}
            <View style={styles.walletTableHeader}>
              <Text style={[styles.walletHeaderCell, { flex: 2 }]}>Description</Text>
              <Text style={[styles.walletHeaderCell, { flex: 2 }]}>Reference</Text>
              <Text style={[styles.walletHeaderCell, { flex: 1.5 }]}>Date</Text>
              <Text style={[styles.walletHeaderCell, { flex: 1, textAlign: 'right' }]}>Amount</Text>
            </View>
            {/* Table Body with scroll */}
            <ScrollView style={styles.walletTableBody} nestedScrollEnabled={true}>
              {walletActivity.map((item, index) => (
                <View key={index} style={styles.walletTableRow}>
                  <Text style={[styles.walletCell, { flex: 2 }]} numberOfLines={1}>{item.description}</Text>
                  <Text style={[styles.walletCell, styles.walletCellRef, { flex: 2 }]} numberOfLines={1}>{item.orderId}</Text>
                  <Text style={[styles.walletCell, styles.walletCellDate, { flex: 1.5 }]} numberOfLines={1}>{item.date}</Text>
                  <Text style={[styles.walletCell, { flex: 1, textAlign: 'right', color: item.color, fontWeight: '600' }]}>{item.amount}</Text>
                </View>
              ))}
            </ScrollView>
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
  walletActivitySection: {
    flex: 1.5,
    minWidth: 300,
  },
  walletActivityContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  walletTableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.divider,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  walletHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  walletTableBody: {
    maxHeight: 200,
  },
  walletTableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    alignItems: 'center',
  },
  walletCell: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  walletCellRef: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  walletCellDate: {
    color: COLORS.textMuted,
    fontSize: 12,
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
