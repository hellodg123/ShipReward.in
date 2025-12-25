import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563EB',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  border: '#E5E7EB',
};

export default function SupportScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@shipreward.in');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+917096826135');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.pageTitle}>Support Center</Text>

      {/* Support Card */}
      <View style={styles.card}>
        {/* Dedicated Account Manager Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dedicated Account Manager</Text>
          <Text style={styles.sectionSubtitle}>
            Dedicated Account Manager is available to assist you.
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          {/* Customer Support Row */}
          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Ionicons name="person-outline" size={20} color={COLORS.gray} />
              <Text style={styles.contactLabel}>Customer Support</Text>
            </View>
            <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
              <Ionicons name="mail-outline" size={20} color={COLORS.gray} />
              <Text style={styles.contactLink}>support@shipreward.in</Text>
            </TouchableOpacity>
          </View>

          {/* Phone Row */}
          <TouchableOpacity style={styles.phoneRow} onPress={handlePhonePress}>
            <Ionicons name="call-outline" size={20} color={COLORS.gray} />
            <Text style={styles.contactLink}>+91 7096826135</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: COLORS.white,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  contactSection: {
    gap: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  contactLink: {
    fontSize: 14,
    color: COLORS.primary,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
