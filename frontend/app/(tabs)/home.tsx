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
  primary: '#6366F1',        // Indigo
  primaryDark: '#4F46E5',    // Darker Indigo
  primaryLight: '#818CF8',   // Lighter Indigo
  
  // Secondary Colors
  secondary: '#EC4899',      // Pink
  accent: '#F59E0B',         // Amber/Gold
  
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
  { title: 'All Orders', count: '00', color: COLORS.primary, bgColor: COLORS.bgBlue, icon: 'layers-outline', route: '/(tabs)/orders', tab: 'all' },
  { title: 'Drafted Orders', count: '00', color: COLORS.warning, bgColor: COLORS.bgYellow, icon: 'create-outline', route: '/(tabs)/orders', tab: 'drafts' },
  { title: 'Pending for Label', count: '00', color: COLORS.success, bgColor: COLORS.bgGreen, icon: 'pricetag-outline', route: '/(tabs)/orders', tab: 'ready' },
  { title: 'Packed Orders', count: '00', color: COLORS.cyan, bgColor: COLORS.bgCyan, icon: 'cube-outline', route: '/(tabs)/orders', tab: 'packed' },
  { title: 'Dispatched Orders', count: '00', color: COLORS.purple, bgColor: COLORS.bgPurple, icon: 'send-outline', route: '/(tabs)/orders', tab: 'dispatched' },
];

const actionCards = [
  { title: 'Pickups In Progress', count: '00', color: COLORS.secondary, icon: 'checkmark-done-outline', route: '/(tabs)/pickup', tab: '' },
  { title: 'Open Manifests', count: '00', color: COLORS.primary, icon: 'mail-outline', route: '/(tabs)/manifest', tab: '' },
  { title: 'Disputed Orders', count: '00', color: COLORS.rose, icon: 'close-circle-outline', route: '/(tabs)/orders', tab: 'disputed' },
];

const walletActivity = [
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', color: COLORS.warning },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Restricted', date: '09 Oct 25 - 04:35 PM', color: COLORS.primary },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283G7 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', color: COLORS.accent },
];

export default function HomeScreen() {
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

      {/* Order Status Cards Row */}
      <View style={styles.orderStatusRow}>
        {orderStatusCards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.orderStatusCard, { backgroundColor: card.bgColor }]}
            onPress={() => handleCardPress(card.route, card.tab)}
          >
            <View style={[styles.orderStatusIcon, { backgroundColor: card.color }]}>
              <Ionicons name={card.icon as any} size={18} color={COLORS.white} />
            </View>
            <Text style={[styles.orderStatusTitle, { color: card.color }]}>{card.title}</Text>
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
                <View style={[styles.actionIcon, { backgroundColor: `${card.color}20` }]}>
                  <Ionicons name={card.icon as any} size={28} color={card.color} />
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
    backgroundColor: COLORS.lightGray,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
    marginBottom: 20,
  },
  orderStatusRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  orderStatusCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  orderStatusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  orderStatusTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderStatusCount: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.darkGray,
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
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  actionCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionCount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
  },
  walletActivitySection: {
    flex: 1,
    minWidth: 280,
  },
  walletActivityList: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  walletActivityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  walletActivityIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  walletActivityContent: {
    flex: 1,
  },
  walletActivityDesc: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  walletActivityOrderId: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  walletActivityDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
});
