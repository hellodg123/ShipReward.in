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
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  textDark: '#1F2937',
  border: '#E5E7EB',
  background: '#F0F4F8',
};

export default function ContactScreen() {
  const router = useRouter();

  const handleCall = () => {
    Linking.openURL('tel:+917096826135');
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
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
          {/* Main Title */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>We're here to help!</Text>
            <Text style={styles.subtitle}>
              Got a question, need support, or want to explore how we can grow together?
            </Text>
            <Text style={styles.subtitle}>
              Just drop us a message using the form below, and our team will get back to you shortly.
            </Text>
          </View>

          {/* Contact Cards Container */}
          <View style={[styles.cardsContainer, { flexDirection: isMobile ? 'column' : 'row' }]}>
            {/* Get In Touch Card */}
            <View style={styles.contactCard}>
              <Text style={styles.cardTitle}>Get In Touch</Text>
              
              <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
                <View style={styles.iconContainer}>
                  <Ionicons name="call" size={22} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.contactValue}>+91 7096826135</Text>
                  <Text style={styles.contactLabel}>10 am – 6:30 pm</Text>
                  <Text style={styles.contactLabel}>(Monday – Saturday)</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Head Office Card */}
            <View style={styles.contactCard}>
              <Text style={styles.cardTitle}>Head Office</Text>
              
              <View style={styles.contactItem}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location" size={22} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactValue}>
                    477, AR Mall, Near Vip Circle, Mota Varachha,{"\n"}Surat, Gujarat 394101, India
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.contactItem} 
                onPress={() => handleEmail('support@shipreward.in')}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="mail" size={22} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.contactLabel}>For support :</Text>
                  <Text style={styles.contactValue}>support@shipreward.in</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactItem} 
                onPress={() => handleEmail('admin@shipreward.in')}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="mail" size={22} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.contactLabel}>For any other queries :</Text>
                  <Text style={styles.contactValue}>admin@shipreward.in</Text>
                </View>
              </TouchableOpacity>
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
    paddingHorizontal: isMobile ? 20 : 60,
    paddingVertical: 40,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  titleSection: {
    marginBottom: 40,
    alignItems: isMobile ? 'center' : 'flex-start',
  },
  mainTitle: {
    fontSize: isMobile ? 28 : 36,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 16,
    textAlign: isMobile ? 'center' : 'left',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    lineHeight: 24,
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: 8,
  },
  cardsContainer: {
    gap: 24,
    marginBottom: 40,
  },
  contactCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    lineHeight: 24,
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
