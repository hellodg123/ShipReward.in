import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
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

  const handleCall = () => {
    Linking.openURL('tel:+917096826135');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@shipreward.in');
  };

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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Returns</Text>
              <Text style={styles.paragraph}>
                We do not accept RTOs once the shipment has been received at our hub. In case the shipment is in transit to our hub, and you wish to cancel, please write to us at{' '}
                <Text style={styles.linkText} onPress={handleEmail}>support@shipreward.in</Text>
                {' '}or call our customer care at{' '}
                <Text style={styles.linkText} onPress={handleCall}>+917096826135</Text>
                {' '}with details.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cancellation</Text>
              <Text style={styles.paragraph}>
                You can cancel the order anytime before it gets in-warded at our hub. Once you request for cancellation of your order, it will take 1-2 business days for the cancellation to reflect in our systems. The same will be notified to you by email. We will refund the entire amount within 7-10 working days.
              </Text>
            </View>

            {/* Contact Info Card */}
            <View style={styles.contactCard}>
              <Text style={styles.contactTitle}>Need Help?</Text>
              <View style={styles.contactRow}>
                <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
                  <Ionicons name="mail" size={20} color={COLORS.primary} />
                  <Text style={styles.contactButtonText}>support@shipreward.in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                  <Ionicons name="call" size={20} color={COLORS.primary} />
                  <Text style={styles.contactButtonText}>+91 7096826135</Text>
                </TouchableOpacity>
              </View>
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
    marginBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.darkGray,
    lineHeight: 26,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: isMobile ? 'column' : 'row',
    gap: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  contactButtonText: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
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
