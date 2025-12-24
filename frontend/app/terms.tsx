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
};

export default function TermsScreen() {
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
            <Text style={styles.mainTitle}>Terms & Conditions</Text>
            <Text style={styles.lastUpdated}>Last Updated: December 24, 2025</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Agreement to Terms</Text>
              <Text style={styles.paragraph}>
                By accessing or using ShipReward.in, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Services Description</Text>
              <Text style={styles.paragraph}>
                ShipReward.in provides international courier and shipping services to USA, Canada, UK, and Germany. Our services include:
              </Text>
              <Text style={styles.bulletPoint}>• Door-to-door international shipping</Text>
              <Text style={styles.bulletPoint}>• Package tracking and monitoring</Text>
              <Text style={styles.bulletPoint}>• Customs clearance assistance</Text>
              <Text style={styles.bulletPoint}>• Rewards program for frequent shippers</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
              <Text style={styles.paragraph}>As a user of our services, you agree to:</Text>
              <Text style={styles.bulletPoint}>• Provide accurate and complete information for all shipments</Text>
              <Text style={styles.bulletPoint}>• Comply with all applicable laws and regulations</Text>
              <Text style={styles.bulletPoint}>• Not ship prohibited or restricted items</Text>
              <Text style={styles.bulletPoint}>• Pay all applicable fees and charges</Text>
              <Text style={styles.bulletPoint}>• Properly package items to prevent damage</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Prohibited Items</Text>
              <Text style={styles.paragraph}>The following items are strictly prohibited from shipping:</Text>
              <Text style={styles.bulletPoint}>• Hazardous materials and dangerous goods</Text>
              <Text style={styles.bulletPoint}>• Illegal drugs and narcotics</Text>
              <Text style={styles.bulletPoint}>• Weapons and ammunition</Text>
              <Text style={styles.bulletPoint}>• Counterfeit goods</Text>
              <Text style={styles.bulletPoint}>• Perishable items without proper packaging</Text>
              <Text style={styles.bulletPoint}>• Currency and negotiable instruments</Text>
              <Text style={styles.bulletPoint}>• Live animals and plants</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Pricing and Payment</Text>
              <Text style={styles.paragraph}>
                Shipping rates are calculated based on package weight, dimensions, destination, and service type. All prices are in Indian Rupees (INR) unless otherwise stated. Payment must be made before shipment processing.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Delivery Times</Text>
              <Text style={styles.paragraph}>
                Estimated delivery times are provided as guidelines and are not guaranteed. Factors affecting delivery include customs processing, weather conditions, and local carrier schedules. ShipReward.in is not liable for delays beyond our control.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Liability Limitations</Text>
              <Text style={styles.paragraph}>
                Our liability for lost, damaged, or delayed shipments is limited to the declared value of the package or the maximum liability specified in our insurance policy, whichever is lower. We recommend purchasing additional insurance for valuable items.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Rewards Program</Text>
              <Text style={styles.paragraph}>
                Participation in our rewards program is subject to specific terms:
              </Text>
              <Text style={styles.bulletPoint}>• Reward coupons are earned on every 6th shipment</Text>
              <Text style={styles.bulletPoint}>• Coupons are non-transferable and have expiration dates</Text>
              <Text style={styles.bulletPoint}>• Prize draws are conducted as per announced schedules</Text>
              <Text style={styles.bulletPoint}>• Winners are selected randomly from eligible participants</Text>
              <Text style={styles.bulletPoint}>• ShipReward.in reserves the right to modify the program</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. Account Termination</Text>
              <Text style={styles.paragraph}>
                We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent activity, or any other reason deemed necessary to protect our services and other users.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>10. Governing Law</Text>
              <Text style={styles.paragraph}>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>11. Contact Information</Text>
              <Text style={styles.paragraph}>
                For any questions regarding these Terms and Conditions, please contact us:
              </Text>
              <Text style={styles.contactInfo}>Email: support@shipreward.in</Text>
              <Text style={styles.contactInfo}>Phone: +91 7096826135</Text>
              <Text style={styles.contactInfo}>Address: 477, AR Mall, Near Vip Circle, Mota Varachha, Surat, Gujarat 394101, India</Text>
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
    fontSize: isMobile ? 28 : 36,
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
