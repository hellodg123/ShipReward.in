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
            <Text style={styles.lastUpdated}>Version 1.0</Text>

            <Text style={styles.introText}>
              This Privacy Policy outlines ShipReward.in's approach to Data Protection and Privacy to fulfil its obligations under the applicable laws and regulations. This Privacy Policy applies to your Personal Data which is processed by us, whether in physical or electronic mode.
            </Text>

            <Text style={styles.introText}>
              In this Privacy Policy, the expressions 'Personal Data', 'Data Subject', 'Controller', 'Processor' and 'Processing' shall have the meanings given to them in the applicable privacy laws.
            </Text>

            <Text style={styles.introText}>
              We are committed to treating data privacy seriously. It is important that you know exactly what we do with your Personal Data.
            </Text>

            <Text style={styles.introText}>
              Throughout this document, "we", "us", "our", "ours" refer to ShipReward.in. Wherever we have said 'you' or 'your', this means YOU.
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>WHO WE ARE</Text>
              <Text style={styles.paragraph}>
                ShipReward.in (Ship Reward Logistics Private Limited) is a company incorporated and registered in India. ShipReward.in is engaged in the business of facilitating selling, marketing and retailing products ("Business") through the e-commerce websites and mobile applications ("App") both developed and owned by ShipReward.in and/or its parent company, and/or its affiliates (Website and App collectively referred to as "Platform") or offline stores / events to conduct its Business.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ROLES WE PLAY</Text>
              <Text style={styles.paragraph}>
                We play the role of a Data Controller when we collect and process Personal Data about you.
              </Text>
              <Text style={styles.paragraph}>
                We play the role of a Data Processor when we collect and process Personal Data on behalf of another Data Controller.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>OUR COMMITMENT</Text>
              <Text style={styles.paragraph}>
                We commit to protecting your privacy and hence our Personal Data handling practices are continually reviewed to ensure compliance with the applicable Privacy laws and regulations.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PERSONAL INFORMATION GATHERED BY ShipReward.in</Text>
              <Text style={styles.paragraph}>
                The information we learn and gather from you, personal or otherwise, is used to register you, verify your identity to permit you to use the app, undertake transactions (including to facilitate and process payments), communicate with you, convey any promotional offers, services or updates associated with SHIPREWARD.IN, and generally maintain your accounts with us. We also use this information to customize your experience and improve SHIPREWARD.IN.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INFORMATION YOU GIVE US</Text>
              <Text style={styles.paragraph}>
                We receive and store any information you provide while using SHIPREWARD.IN or give us in any other way. You can choose not to provide certain information, but then you might not be able to use SHIPREWARD.IN. We use the information that you provide for such purposes as opening your account, processing your transactions, responding to your requests, and communicating with you.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INFORMATION WE COLLECT ABOUT YOU</Text>
              <Text style={styles.paragraph}>
                We receive and store certain types of information whenever you interact with us. For example, like many websites, we use "cookies," and we obtain certain types of information when your web browser accesses our Services. We may also receive/store information about your location and your mobile device, including a unique identifier for your device. We may use this information for internal analysis and to provide you with location-based services, such as advertising, search results, and other personalized content.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INFORMATION FROM OTHER SOURCES</Text>
              <Text style={styles.paragraph}>
                We might receive information about you from other sources, such as updated delivery and address information from our carriers, which we use to correct our records and deliver your next purchase more easily.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CATEGORIES OF PERSONAL DATA</Text>
              <Text style={styles.paragraph}>
                Categories of Personal Data collected and processed by us are as follows:
              </Text>
              <Text style={styles.bulletPoint}>• Demographic & Identity data: Contact details such as Name, email address, contact number, shipping address, country, date of birth, profile picture. Open data and public records such as information about YOU that is openly available on the internet.</Text>
              <Text style={styles.bulletPoint}>• Details such as Transaction amount, Bank Name, Card Type, Card number.</Text>
              <Text style={styles.bulletPoint}>• Online Identifiers and other Technical Data</Text>
              <Text style={styles.bulletPoint}>• Location details such as data we get about your location, IP address, logs, or from where you connect a computer to the internet.</Text>
              <Text style={styles.bulletPoint}>• Technical details such as device information, location, and network carrier when you use our mobile applications.</Text>
              <Text style={styles.bulletPoint}>• Communications details such as the Metadata and other Personal Data we get from communications done through e-mails, SMS, instant messages, and calls.</Text>
              <Text style={styles.bulletPoint}>• Usage data details such as data about how you use our website or web-based properties, pages viewed, etc.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Aadhaar and Document Alternatives</Text>
              <Text style={styles.paragraph}>
                We may collect Aadhaar information for identity verification purposes. However, users may choose to upload alternate government-issued documents such as PAN or Passport instead.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CONSENT</Text>
              <Text style={styles.paragraph}>
                By using the Website and/ or by providing your information, you consent to the collection and use of the information you disclose on the Website in accordance with this Privacy Policy, including but not limited to your consent for sharing your information as per this privacy policy.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Purpose of Data Collection</Text>
              <Text style={styles.paragraph}>
                We use your data to process orders, deliver products, enhance functionality, provide personalized recommendations, communicate service updates, and ensure compliance with legal obligations.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cookies and Trackers</Text>
              <Text style={styles.paragraph}>
                Our website uses cookies and trackers (e.g., Google Analytics, Hot Jar) to improve performance and user experience. You may disable certain cookies via browser settings; however, this may affect site functionality.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Data Disclosure</Text>
              <Text style={styles.paragraph}>
                We may share data with third-party SDK providers for service integration, as well as with legal or regulatory authorities if required by law.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Data Security</Text>
              <Text style={styles.paragraph}>
                We implement strong physical, technical, and administrative safeguards to protect your data, including encryption and secure infrastructure practices.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Data Retention</Text>
              <Text style={styles.paragraph}>
                Your data is retained only as long as necessary for the purposes outlined in this policy and to meet legal requirements. We take reasonable steps to delete or de-identify data when no longer needed.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Children's Privacy</Text>
              <Text style={styles.paragraph}>
                Our services are intended for adult users. We do not knowingly collect information from minors.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Rights</Text>
              <Text style={styles.paragraph}>
                You have the right to access, correct, and manage your personal data. If you have unresolved concerns, please contact us at support@ShipReward.in.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CONTACT US</Text>
              <Text style={styles.paragraph}>
                For any further queries and complaints related to privacy under applicable laws and regulations, you could reach us at:
              </Text>
              <Text style={styles.contactInfo}>Contact Email Address: Support@ShipReward.in</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notification of Changes</Text>
              <Text style={styles.paragraph}>
                We regularly review and update our Privacy Policy. Any changes will be published on this page. We recommend revisiting this page periodically.
              </Text>
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
    marginBottom: 24,
  },
  introText: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 24,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
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
    marginBottom: 8,
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
