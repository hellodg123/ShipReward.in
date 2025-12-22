import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'expo-router';
import { LogoCompact } from './Logo';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

// New Modern Color Scheme
const COLORS = {
  // Primary Colors
  primary: '#2563EB',        // Blue (matches wallet recharge button)
  primaryDark: '#1E40AF',    // Darker Blue
  primaryLight: '#3B82F6',   // Lighter Blue
  
  // Secondary Colors
  secondary: '#ffd700',      // Gold
  accent: '#ffd700',         // Gold
  
  // Background Colors
  bgDark: '#1E1B4B',         // Dark Indigo (for special use)
  bgLight: '#F8FAFC',        // Very light gray
  bgCard: '#FFFFFF',         // White
  
  // Text Colors
  textDark: '#1E293B',       // Slate 800
  textMuted: '#64748B',      // Slate 500
  textLight: '#94A3B8',      // Slate 400
  black: '#000000',          // Pure black
  
  // Status Colors
  success: '#10B981',        // Emerald
  green: '#10B981',          // Green for recharge
  warning: '#F59E0B',        // Amber
  error: '#EF4444',          // Red
  red: '#EF4444',            // Red
  info: '#3B82F6',           // Blue
  gray: '#64748B',           // Gray
  
  // UI Colors
  white: '#FFFFFF',
  border: '#E2E8F0',         // Slate 200
  divider: '#F1F5F9',        // Slate 100
  
  // Gradient accents
  gradientStart: '#2563EB',
  gradientEnd: '#ffd700',
};

const menuItems = [
  { icon: 'speedometer-outline', label: 'Dashboard', route: '/(tabs)/dashboard' },
  { icon: 'receipt-outline', label: 'Orders', route: '/(tabs)/orders' },
  { icon: 'document-text-outline', label: 'Manifest', route: '/(tabs)/manifest' },
  { icon: 'car-outline', label: 'Pickup', route: '/(tabs)/pickup' },
  { icon: 'calculator-outline', label: 'Rate Table', route: '/(tabs)/rate-table' },
  { icon: 'wallet-outline', label: 'Wallet', route: '/(tabs)/wallet' },
  { icon: 'receipt-outline', label: 'Invoice', route: '/(tabs)/invoice' },
  { icon: 'settings-outline', label: 'Settings', route: '/(tabs)/settings' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(!isLargeScreen);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await logout();
    router.replace('/login');
  };

  const handleNavigateToSettings = () => {
    setShowProfileMenu(false);
    router.push('/(tabs)/settings');
  };

  const handleNavigateToSupport = () => {
    setShowProfileMenu(false);
    router.push('/(tabs)/support');
  };

  const handleNavigateToWallet = () => {
    router.push('/(tabs)/wallet');
  };

  const isActiveRoute = (route: string) => {
    return pathname === route || pathname.startsWith(route + '/');
  };

  // Profile Menu Popup - Updated with white backgrounds and black text
  const ProfileMenu = () => (
    <Modal
      transparent
      visible={showProfileMenu}
      animationType="fade"
      onRequestClose={() => setShowProfileMenu(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setShowProfileMenu(false)}>
        <View style={styles.profileMenuContainer}>
          <View style={styles.profileMenuContent}>
            {/* User Info - White background */}
            <View style={styles.profileMenuHeader}>
              <View style={styles.profileMenuAvatar}>
                <Text style={styles.profileMenuAvatarText}>
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </Text>
              </View>
              <View style={styles.profileMenuUserInfo}>
                <Text style={styles.profileMenuName}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text style={styles.profileMenuEmail}>{user?.email}</Text>
              </View>
            </View>

            <View style={styles.profileMenuDivider} />

            {/* Menu Items */}
            <TouchableOpacity style={styles.profileMenuItem} onPress={handleNavigateToSettings}>
              <Ionicons name="settings-outline" size={20} color={COLORS.black} />
              <Text style={styles.profileMenuItemText}>Account Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileMenuItem} onPress={handleNavigateToSupport}>
              <Ionicons name="headset-outline" size={20} color={COLORS.black} />
              <Text style={styles.profileMenuItemText}>Support Center</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileMenuItem}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.black} />
              <Text style={styles.profileMenuItemText}>Logout all the other devices</Text>
            </TouchableOpacity>

            <View style={styles.profileMenuDivider} />

            <TouchableOpacity style={styles.profileMenuItem} onPress={handleLogout}>
              <Ionicons name="exit-outline" size={20} color={COLORS.red} />
              <Text style={[styles.profileMenuItemText, { color: COLORS.red }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );

  const handleNavigateToAddOrder = () => {
    router.push('/(tabs)/add-order');
  };

  // Mobile view
  if (!isLargeScreen) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ProfileMenu />
        
        {/* Mobile Header */}
        <View style={styles.mobileHeader}>
          <LogoCompact width={160} height={50} variant="dark" />
          <View style={styles.mobileHeaderRight}>
            <TouchableOpacity style={styles.addOrderBtn} onPress={handleNavigateToAddOrder}>
              <Ionicons name="add" size={22} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn} onPress={() => setShowProfileMenu(true)}>
              <Text style={styles.profileInitials}>
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Content */}
        <View style={styles.mobileContent}>
          {children}
        </View>

        {/* Mobile Bottom Navigation */}
        <View style={styles.mobileBottomNavContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mobileNavScrollContent}
          >
            {menuItems.map((item, index) => {
              const isActive = isActiveRoute(item.route);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.mobileNavItemHorizontal, isActive && styles.mobileNavItemActive]}
                  onPress={() => router.push(item.route as any)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={isActive ? COLORS.white : COLORS.black}
                  />
                  <Text style={[styles.mobileNavLabelHorizontal, isActive && styles.mobileNavLabelHorizontalActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Desktop/Tablet view with sidebar
  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileMenu />
      
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
            {menuItems.map((item, index) => {
              const isActive = isActiveRoute(item.route);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}
                  onPress={() => router.push(item.route as any)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={isActive ? COLORS.white : COLORS.black}
                  />
                  {!sidebarCollapsed && (
                    <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                      {item.label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.desktopHeader}>
            <LogoCompact width={200} height={60} variant="dark" />
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.walletBalance} onPress={handleNavigateToWallet}>
                <Ionicons name="wallet" size={18} color={COLORS.green} />
                <Text style={styles.walletBalanceText}>₹ 2.26</Text>
                <Text style={styles.rechargeText}>Recharge</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addOrderBtn} onPress={handleNavigateToAddOrder}>
                <Ionicons name="add" size={22} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileBtn} onPress={() => setShowProfileMenu(true)}>
                <Text style={styles.profileInitials}>
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Page Content */}
          <View style={styles.pageContent}>
            {children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 27, 75, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  profileMenuContainer: {
    marginTop: 60,
    marginRight: 20,
  },
  profileMenuContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: 300,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  profileMenuAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  profileMenuAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  profileMenuUserInfo: {
    marginLeft: 14,
    flex: 1,
  },
  profileMenuName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.black,
  },
  profileMenuEmail: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  profileMenuDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: 16,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 14,
  },
  profileMenuItemText: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '500',
  },
  // Mobile Styles
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
  mobileContent: {
    flex: 1,
  },
  mobileBottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  mobileNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  mobileNavLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  mobileNavLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  // Mobile Bottom Navigation Styles
  mobileBottomNavContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 10,
    paddingBottom: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  mobileNavScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  mobileNavItemHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.divider,
    gap: 8,
    minWidth: 90,
  },
  mobileNavItemActive: {
    backgroundColor: COLORS.primary,
  },
  mobileNavLabelHorizontal: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: '600',
  },
  mobileNavLabelHorizontalActive: {
    color: COLORS.white,
  },
  // Add Order Button Styles
  addOrderBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addOrderBtnDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addOrderBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  // Desktop Styles
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 220,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  sidebarCollapsed: {
    width: 70,
    paddingHorizontal: 10,
  },
  collapseBtn: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 12,
    backgroundColor: COLORS.divider,
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 6,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: COLORS.primary,
  },
  menuLabel: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: '500',
  },
  menuLabelActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
  },
  desktopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  desktopLogo: {
    width: 140,
    height: 40,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  walletBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.divider,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    cursor: 'pointer',
  },
  walletBalanceText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  rechargeText: {
    fontSize: 14,
    color: COLORS.green,
    fontWeight: '600',
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  profileInitials: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
  },
  pageContent: {
    flex: 1,
  },
});
