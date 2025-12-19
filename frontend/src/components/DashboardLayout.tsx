import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'expo-router';

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
};

const menuItems = [
  { icon: 'speedometer-outline', label: 'Dashboard', route: '/(tabs)/home' },
  { icon: 'receipt-outline', label: 'Orders', route: '/(tabs)/orders' },
  { icon: 'document-text-outline', label: 'Manifest', route: '/(tabs)/manifest' },
  { icon: 'car-outline', label: 'Pickup', route: '/(tabs)/pickup' },
  { icon: 'calculator-outline', label: 'Rate Calculator', route: '/(tabs)/rate-calculator' },
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

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const isActiveRoute = (route: string) => {
    return pathname === route || pathname.startsWith(route + '/');
  };

  // Mobile view
  if (!isLargeScreen) {
    return (
      <SafeAreaView style={styles.safeArea}>
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
            <TouchableOpacity style={styles.profileBtn} onPress={handleLogout}>
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
              <View style={styles.walletBalance}>
                <Ionicons name="wallet" size={18} color={COLORS.green} />
                <Text style={styles.walletBalanceText}>₹ 2.26</Text>
                <Text style={styles.rechargeText}>Recharge</Text>
              </View>
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
  // Mobile Styles
  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    borderTopColor: '#E5E7EB',
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
  pageContent: {
    flex: 1,
  },
});
