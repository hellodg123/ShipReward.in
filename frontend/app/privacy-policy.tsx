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

export default function PrivacyPolicyScreen() {
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
            <Text style={styles.mainTitle}>Privacy Policy</Text>
            <Text style={styles.lastUpdated}>Last Updated: December 24, 2025</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Introduction</Text>
              <Text style={styles.paragraph}>
                Welcome to ShipReward.in. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. Information We Collect</Text>
              <Text style={styles.paragraph}>
                We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.
              </Text>
              <Text style={styles.bulletPoint}>• Personal Data: Name, email address, phone number, shipping address</Text>
              <Text style={styles.bulletPoint}>• Payment Information: Credit card details, billing address (processed securely through our payment partners)</Text>
              <Text style={styles.bulletPoint}>• Shipping Information: Sender and recipient details, package contents, weight, and dimensions</Text>
              <Text style={styles.bulletPoint}>• Usage Data: Browser type, IP address, pages visited, time spent on pages</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
              <Text style={styles.paragraph}>We use the information we collect for the following purposes:</Text>
              <Text style={styles.bulletPoint}>• To process and fulfill your shipping orders</Text>
              <Text style={styles.bulletPoint}>• To communicate with you about your orders and our services</Text>
              <Text style={styles.bulletPoint}>• To manage your account and provide customer support</Text>
              <Text style={styles.bulletPoint}>• To administer our rewards and loyalty programs</Text>
              <Text style={styles.bulletPoint}>• To send you marketing communications (with your consent)</Text>
              <Text style={styles.bulletPoint}>• To improve our website and services</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. Information Sharing</Text>
              <Text style={styles.paragraph}>
                We may share your information with third parties only in the following situations:
              </Text>
              <Text style={styles.bulletPoint}>• With shipping carriers to fulfill your orders</Text>
              <Text style={styles.bulletPoint}>• With payment processors to complete transactions</Text>
              <Text style={styles.bulletPoint}>• With customs authorities as required by law</Text>
              <Text style={styles.bulletPoint}>• With service providers who assist in our operations</Text>
              <Text style={styles.bulletPoint}>• When required by law or to protect our rights</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. Data Security</Text>
              <Text style={styles.paragraph}>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. Your Rights</Text>
              <Text style={styles.paragraph}>You have the right to:</Text>
              <Text style={styles.bulletPoint}>• Access your personal information</Text>
              <Text style={styles.bulletPoint}>• Correct inaccurate or incomplete information</Text>
              <Text style={styles.bulletPoint}>• Request deletion of your personal information</Text>
              <Text style={styles.bulletPoint}>• Opt-out of marketing communications</Text>
              <Text style={styles.bulletPoint}>• Withdraw consent at any time</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. Cookies</Text>
              <Text style={styles.paragraph}>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. Contact Us</Text>
              <Text style={styles.paragraph}>
                If you have any questions about this Privacy Policy, please contact us at:
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
