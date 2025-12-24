import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoHorizontal } from '../src/components/Logo';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const COLORS = {
  primary: '#2563EB',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  textDark: '#1F2937',
  border: '#E5E7EB',
  background: '#F0F4F8',
  orange: '#F97316',
  red: '#EF4444',
  green: '#10B981',
};

export default function RefundsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/login')}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <LogoHorizontal width={180} height={50} variant="dark" />
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.mainTitle}>Refunds & Cancellation Policy</Text>
            <Text style={styles.lastUpdated}>Last Updated: December 24, 2025</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Cancellation Policy</Text>
              <Text style={styles.paragraph}>
                Orders can be cancelled under the following conditions:
              </Text>
              <View style={styles.policyCard}>
                <View style={styles.policyHeader}>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />
                  <Text style={styles.policyTitle}>Before Pickup</Text>
                </View>
                <Text style={styles.policyText}>Full refund will be processed within 5-7 business days</Text>
              </View>
              <View style={styles.policyCard}>
                <View style={styles.policyHeader}>
                  <Ionicons name="alert-circle" size={20} color={COLORS.orange} />
                  <Text style={styles.policyTitle}>After Pickup, Before Dispatch</Text>
                </View>
                <Text style={styles.policyText}>80% refund after deducting handling charges</Text>
              </View>
              <View style={styles.policyCard}>
                <View style={styles.policyHeader}>
                  <Ionicons name="close-circle" size={20} color={COLORS.red} />
                  <Text style={styles.policyTitle}>After International Dispatch</Text>
                </View>
                <Text style={styles.policyText}>No refund possible once shipment leaves India</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Refund Eligibility</Text>
              <Text style={styles.paragraph}>Refunds may be processed in the following scenarios:</Text>
              <Text style={styles.bulletPoint}>• Order cancelled before pickup</Text>
              <Text style={styles.bulletPoint}>• Shipment lost in transit (subject to investigation)</Text>
              <Text style={styles.bulletPoint}>• Duplicate payment made in error</Text>
              <Text style={styles.bulletPoint}>• Service not provided as promised</Text>
              <Text style={styles.bulletPoint}>• Package returned due to incorrect address (partial refund)</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Non-Refundable Scenarios</Text>
              <Text style={styles.paragraph}>The following cases are not eligible for refunds:</Text>
              <Text style={styles.bulletPoint}>• Shipments held by customs due to prohibited items</Text>
              <Text style={styles.bulletPoint}>• Delays caused by incorrect documentation</Text>
              <Text style={styles.bulletPoint}>• Package refused by recipient</Text>
              <Text style={styles.bulletPoint}>• Damage due to improper packaging by sender</Text>
              <Text style={styles.bulletPoint}>• Force majeure events (natural disasters, war, etc.)</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Refund Process</Text>
              <Text style={styles.paragraph}>
                To request a refund, follow these steps:
              </Text>
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Submit Request</Text>
                  <Text style={styles.stepText}>Email your refund request to support@shipreward.in with your order ID</Text>
                </View>
              </View>
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Review Period</Text>
                  <Text style={styles.stepText}>Our team will review your request within 48-72 hours</Text>
                </View>
              </View>
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Processing</Text>
                  <Text style={styles.stepText}>Approved refunds are processed to original payment method</Text>
                </View>
              </View>
              <View style={styles.stepContainer}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>4</Text></View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Credit</Text>
                  <Text style={styles.stepText}>Refund credited within 5-7 business days</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Refund Timeline</Text>
              <View style={styles.timelineTable}>
                <View style={styles.timelineRow}>
                  <Text style={styles.timelineLabel}>Credit/Debit Card:</Text>
                  <Text style={styles.timelineValue}>5-7 business days</Text>
                </View>
                <View style={styles.timelineRow}>
                  <Text style={styles.timelineLabel}>UPI/Net Banking:</Text>
                  <Text style={styles.timelineValue}>3-5 business days</Text>
                </View>
                <View style={styles.timelineRow}>
                  <Text style={styles.timelineLabel}>Wallet Credit:</Text>
                  <Text style={styles.timelineValue}>Instant (within 24 hours)</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Damaged or Lost Shipments</Text>
              <Text style={styles.paragraph}>
                For damaged or lost shipments:
              </Text>
              <Text style={styles.bulletPoint}>• Report within 48 hours of delivery (for damage)</Text>
              <Text style={styles.bulletPoint}>• Provide photographic evidence of damage</Text>
              <Text style={styles.bulletPoint}>• Lost shipment claims can be filed after 30 days of non-delivery</Text>
              <Text style={styles.bulletPoint}>• Compensation limited to declared value or insurance coverage</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Contact for Refunds</Text>
              <Text style={styles.paragraph}>
                For any refund-related queries, please reach out to us:
              </Text>
              <Text style={styles.contactInfo}>Email: support@shipreward.in</Text>
              <Text style={styles.contactInfo}>Phone: +91 7096826135</Text>
              <Text style={styles.contactInfo}>Hours: 10 AM - 6:30 PM (Mon-Sat)</Text>
            </View>
          </View>

          {/* Back to Login Button */}
          <TouchableOpacity 
            style={styles.backToLoginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 © ShipReward.in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: isMobile ? 16 : 60,
    paddingVertical: 30,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: isMobile ? 24 : 40,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  mainTitle: {
    fontSize: isMobile ? 24 : 36,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 26,
    paddingLeft: 8,
  },
  policyCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  policyText: {
    fontSize: 14,
    color: COLORS.darkGray,
    paddingLeft: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  timelineTable: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timelineLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  timelineValue: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  contactInfo: {
    fontSize: 15,
    color: COLORS.primary,
    lineHeight: 26,
    fontWeight: '500',
  },
  backToLoginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backToLoginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
