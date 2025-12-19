import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  border: '#E5E7EB',
  red: '#EF4444',
};

export default function SettingsScreen() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Profile Information', onPress: () => {} },
        { icon: 'mail-outline', label: 'Email Address', value: user?.email },
        { icon: 'call-outline', label: 'Phone Number', value: user?.mobile_number },
        { icon: 'lock-closed-outline', label: 'Change Password', onPress: () => {} },
      ],
    },
    {
      title: 'Business',
      items: [
        { icon: 'business-outline', label: 'Company Details', onPress: () => {} },
        { icon: 'location-outline', label: 'Pickup Address', onPress: () => {} },
        { icon: 'card-outline', label: 'Bank Details', onPress: () => {} },
        { icon: 'document-outline', label: 'KYC Documents', onPress: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'globe-outline', label: 'Language', value: 'English' },
        { icon: 'cash-outline', label: 'Currency', value: 'INR (₹)' },
        { icon: 'time-outline', label: 'Timezone', value: 'IST (UTC+5:30)' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Account Settings</Text>
          <Text style={styles.breadcrumb}>Settings {'>'} Account</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.settingItemLeft}>
                    <Ionicons name={item.icon as any} size={22} color={COLORS.gray} />
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.settingItemRight}>
                    {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                    <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Ionicons name="mail-outline" size={22} color={COLORS.gray} />
                <Text style={styles.settingLabel}>Email Notifications</Text>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
              />
            </View>
            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Ionicons name="chatbubble-outline" size={22} color={COLORS.gray} />
                <Text style={styles.settingLabel}>SMS Notifications</Text>
              </View>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
              />
            </View>
            <View style={[styles.settingItem, styles.lastItem]}>
              <View style={styles.settingItemLeft}>
                <Ionicons name="logo-whatsapp" size={22} color={COLORS.gray} />
                <Text style={styles.settingLabel}>WhatsApp Notifications</Text>
              </View>
              <Switch
                value={whatsappNotifications}
                onValueChange={setWhatsappNotifications}
                trackColor={{ false: COLORS.border, true: COLORS.primary }}
              />
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={[styles.settingItem, styles.lastItem]}>
              <View style={styles.settingItemLeft}>
                <Ionicons name="trash-outline" size={22} color={COLORS.red} />
                <Text style={[styles.settingLabel, { color: COLORS.red }]}>Delete Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  breadcrumb: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingLabel: {
    fontSize: 15,
    color: COLORS.darkGray,
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
