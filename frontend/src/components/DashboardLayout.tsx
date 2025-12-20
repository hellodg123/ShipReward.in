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

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  green: '#10B981',
  orange: '#F97316',
  red: '#EF4444',
  border: '#E5E7EB',
};

const menuItems = [
  { icon: 'speedometer-outline', label: 'Dashboard', route: '/(tabs)/home' },
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

  // Profile Menu Popup
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
            {/* User Info */}
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
              <Ionicons name="settings-outline" size={20} color={COLORS.gray} />
              <Text style={styles.profileMenuItemText}>Account Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileMenuItem} onPress={handleNavigateToSupport}>
              <Ionicons name="headset-outline" size={20} color={COLORS.gray} />
              <Text style={styles.profileMenuItemText}>Support Center</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileMenuItem}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.gray} />
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

  // Mobile view
  if (!isLargeScreen) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ProfileMenu />
        
        {/* Mobile Header */}
        <View style={styles.mobileHeader}>
          <LogoCompact width={120} height={36} variant="dark" />
          <View style={styles.mobileHeaderRight}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={handleNavigateToSupport}>
              <Ionicons name="headset-outline" size={22} color={COLORS.darkGray} />
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
        <View style={styles.mobileBottomNav}>
          {menuItems.slice(0, 4).map((item, index) => {
            const isActive = isActiveRoute(item.route);
            return (
              <TouchableOpacity
                key={index}
                style={styles.mobileNavItem}
                onPress={() => router.push(item.route as any)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isActive ? COLORS.primary : COLORS.gray}
                />
                <Text style={[styles.mobileNavLabel, isActive && styles.mobileNavLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
                    color={isActive ? COLORS.white : COLORS.gray}
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
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.desktopLogo}
              resizeMode="contain"
            />
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.walletBalance} onPress={handleNavigateToWallet}>
                <Ionicons name="wallet" size={18} color={COLORS.green} />
                <Text style={styles.walletBalanceText}>₹ 2.26</Text>
                <Text style={styles.rechargeText}>Recharge</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconBtn} onPress={handleNavigateToSupport}>
                <Ionicons name="headset-outline" size={20} color={COLORS.darkGray} />
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
    backgroundColor: COLORS.lightGray,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  profileMenuContainer: {
    marginTop: 60,
    marginRight: 20,
  },
  profileMenuContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  profileMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileMenuAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileMenuAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  profileMenuUserInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileMenuName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  profileMenuEmail: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
  },
  profileMenuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  profileMenuItemText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  // Mobile Styles
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    color: COLORS.gray,
    marginTop: 4,
  },
  mobileNavLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
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
    borderRightColor: COLORS.border,
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
    borderBottomColor: COLORS.border,
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
  walletBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
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
  pageContent: {
    flex: 1,
  },
});
