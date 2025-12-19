import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  gold: '#F59E0B',
  green: '#10B981',
  red: '#EF4444',
  purple: '#8B5CF6',
  pink: '#EC4899',
  orange: '#F97316',
  blue: '#3B82F6',
  lightBlue: '#EFF6FF',
  lightGreen: '#ECFDF5',
  lightYellow: '#FFFBEB',
  lightRed: '#FEF2F2',
  lightPurple: '#F5F3FF',
};

const menuItems = [
  { icon: 'speedometer-outline', label: 'Dashboard', active: true },
  { icon: 'receipt-outline', label: 'Orders' },
  { icon: 'cube-outline', label: 'Multi Box' },
  { icon: 'document-text-outline', label: 'Manifest' },
  { icon: 'car-outline', label: 'Pickup' },
  { icon: 'calculator-outline', label: 'Rate Calculator' },
  { icon: 'bar-chart-outline', label: 'Bulk Report' },
  { icon: 'wallet-outline', label: 'Wallet' },
  { icon: 'documents-outline', label: 'Documents' },
  { icon: 'git-branch-outline', label: 'Integrations' },
  { icon: 'chatbubble-outline', label: 'Request Quote' },
  { icon: 'settings-outline', label: 'Settings' },
];

const orderStatusCards = [
  { title: 'All Orders', count: '00', color: COLORS.blue, bgColor: COLORS.lightBlue, icon: 'layers-outline' },
  { title: 'Drafted Orders', count: '00', color: COLORS.orange, bgColor: COLORS.lightYellow, icon: 'create-outline' },
  { title: 'Pending for Label', count: '00', color: COLORS.green, bgColor: COLORS.lightGreen, icon: 'pricetag-outline' },
  { title: 'Packed Orders', count: '00', color: COLORS.red, bgColor: COLORS.lightRed, icon: 'cube-outline' },
  { title: 'Dispatched Orders', count: '00', color: COLORS.purple, bgColor: COLORS.lightPurple, icon: 'send-outline' },
];

const actionCards = [
  { title: 'Pickups In Progress', count: '00', color: COLORS.purple, icon: 'checkmark-done-outline' },
  { title: 'Open Manifests', count: '00', color: COLORS.blue, icon: 'mail-outline' },
  { title: 'Disputed Orders', count: '00', color: COLORS.red, icon: 'close-circle-outline' },
];

const walletActivity = [
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', color: COLORS.orange },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283O4 - Dispute-Restricted', date: '09 Oct 25 - 04:35 PM', color: COLORS.blue },
  { description: 'Wallet Deduction for Dispute Order:', orderId: 'SG325100639283G7 - Dispute-Other', date: '09 Oct 25 - 04:35 PM', color: COLORS.gold },
];

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(!isLargeScreen);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  // Mobile view - simplified dashboard
  if (!isLargeScreen) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.mobileContainer} showsVerticalScrollIndicator={false}>
          {/* Mobile Header */}
          <View style={styles.mobileHeader}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.mobileLogo}
              resizeMode="contain"
            />
            <View style={styles.mobileHeaderRight}>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="notifications-outline" size={22} color={COLORS.darkGray} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileBtn}>
                <Text style={styles.profileInitials}>
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Title */}
          <Text style={styles.dashboardTitle}>Dashboard</Text>

          {/* Order Status Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.orderCardsScroll}>
            {orderStatusCards.map((card, index) => (
              <TouchableOpacity key={index} style={[styles.orderCard, { backgroundColor: card.bgColor }]}>
                <View style={[styles.orderCardIcon, { backgroundColor: card.color }]}>
                  <Ionicons name={card.icon as any} size={20} color={COLORS.white} />
                </View>
                <Text style={[styles.orderCardTitle, { color: card.color }]}>{card.title}</Text>
                <Text style={styles.orderCardCount}>{card.count}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Actions Section */}
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsGrid}>
            {actionCards.map((card, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionCardIcon, { backgroundColor: `${card.color}20` }]}>
                  <Ionicons name={card.icon as any} size={24} color={card.color} />
                </View>
                <Text style={styles.actionCardCount}>{card.count}</Text>
                <Text style={styles.actionCardTitle}>{card.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Wallet Activity */}
          <Text style={styles.sectionTitle}>Wallet Activity</Text>
          <View style={styles.walletSection}>
            {walletActivity.map((item, index) => (
              <View key={index} style={styles.walletItem}>
                <View style={[styles.walletIndicator, { backgroundColor: item.color }]} />
                <View style={styles.walletContent}>
                  <Text style={styles.walletDescription}>{item.description}</Text>
                  <Text style={styles.walletOrderId}>{item.orderId}</Text>
                  <Text style={styles.walletDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Desktop/Tablet view with sidebar
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.desktopContainer}>
        {/* Sidebar */}
        <View style={[styles.sidebar, sidebarCollapsed && styles.sidebarCollapsed]}>
          <TouchableOpacity 
            style={styles.collapseBtn}
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Ionicons 
              name={sidebarCollapsed ? 'chevron-forward' : 'chevron-back'} 
              size={20} 
              color={COLORS.primary} 
            />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.menuItem, item.active && styles.menuItemActive]}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={20} 
                  color={item.active ? COLORS.white : COLORS.gray} 
                />
                {!sidebarCollapsed && (
                  <Text style={[styles.menuLabel, item.active && styles.menuLabelActive]}>
                    {item.label}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.buyPackagingBtn}>
            <Ionicons name="cube-outline" size={20} color={COLORS.primary} />
            {!sidebarCollapsed && <Text style={styles.buyPackagingText}>Buy Packaging</Text>}
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.desktopHeader}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.desktopLogo}
              resizeMode="contain"
            />
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.quickActionsBtn}>
                <Ionicons name="flash-outline" size={18} color={COLORS.primary} />
                <Text style={styles.quickActionsText}>Quick Actions</Text>
              </TouchableOpacity>
              <View style={styles.walletBalance}>
                <Ionicons name="wallet" size={18} color={COLORS.green} />
                <Text style={styles.walletBalanceText}>₹ 2.26</Text>
                <Text style={styles.rechargeText}>Recharge</Text>
              </View>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="book-outline" size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="headset-outline" size={20} color={COLORS.darkGray} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileBtn} onPress={handleLogout}>
                <Text style={styles.profileInitials}>
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dashboard Content */}
          <ScrollView style={styles.dashboardContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.dashboardTitle}>Dashboard</Text>

            {/* Order Status Cards Row */}
            <View style={styles.orderStatusRow}>
              {orderStatusCards.map((card, index) => (
                <TouchableOpacity key={index} style={[styles.orderStatusCard, { backgroundColor: card.bgColor }]}>
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
                    <TouchableOpacity key={index} style={styles.desktopActionCard}>
                      <View style={[styles.desktopActionIcon, { backgroundColor: `${card.color}20` }]}>
                        <Ionicons name={card.icon as any} size={28} color={card.color} />
                      </View>
                      <Text style={styles.desktopActionCount}>{card.count}</Text>
                      <Text style={styles.desktopActionTitle}>{card.title}</Text>
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  // Mobile Styles
  mobileContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mobileLogo: {
    width: 120,
    height: 36,
  },
  mobileHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
    marginVertical: 16,
  },
  orderCardsScroll: {
    marginBottom: 20,
  },
  orderCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'flex-start',
  },
  orderCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  orderCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderCardCount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 12,
    marginTop: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  actionCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionCardCount: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  actionCardTitle: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
  walletSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  walletItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  walletIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  walletContent: {
    flex: 1,
  },
  walletDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  walletOrderId: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 4,
  },
  walletDate: {
    fontSize: 12,
    color: COLORS.gray,
  },

  // Desktop Styles
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  sidebarCollapsed: {
    width: 60,
    paddingHorizontal: 8,
  },
  collapseBtn: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
    gap: 10,
  },
  menuItemActive: {
    backgroundColor: COLORS.primary,
  },
  menuLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  menuLabelActive: {
    color: COLORS.white,
    fontWeight: '500',
  },
  buyPackagingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 16,
    gap: 8,
  },
  buyPackagingText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  mainContent: {
    flex: 1,
  },
  desktopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  desktopLogo: {
    width: 140,
    height: 40,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quickActionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickActionsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  walletBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walletBalanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  rechargeText: {
    fontSize: 14,
    color: COLORS.orange,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  dashboardContent: {
    flex: 1,
    padding: 24,
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
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  desktopActionCard: {
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
  desktopActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  desktopActionCount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  desktopActionTitle: {
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
