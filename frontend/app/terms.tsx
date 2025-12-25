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
            <Text style={styles.mainTitle}>Terms and Conditions</Text>
            <Text style={styles.lastUpdated}>Version 1.0</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>AGREEMENT</Text>
              <Text style={styles.paragraph}>
                These terms and conditions forms a binding agreement ("Terms & Conditions") between you and the Legal Entity that you are representing, if any, (hereinafter collectively referred to as "You" or "Your" or "User") ON THE ONE PART and SHIP Reward Logistics PRIVATE LIMITED, a private limited company incorporated under the Companies Act, 2013, having its corporate office at 477, AR Mall, Near Vip Circle, Mota Varachha, Surat, Gujarat – 394101, India (hereinafter referred to as "Ship Reward" or "We" or "Our" or "Us") ON THE OTHER PART.
              </Text>
              <Text style={styles.paragraph}>
                The User and Ship Reward shall hereinafter collectively be referred to as "Parties" and individually as "Party".
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INTRODUCTION</Text>
              <Text style={styles.paragraph}>
                Ship Reward owns and operates the website "www.shipreward.in" ("Website") and application "ShipReward" ("App") (hereinafter the Website and App are together referred to as "Platform(s)").
              </Text>
              <Text style={styles.paragraph}>
                We through the Platforms offer logistic/shipping services to You either through Shipping Vendors or ourselves ("Services") and/or sell certain Products, in accordance and subject to compliance with the terms and conditions contained in the Agreement.
              </Text>
              <Text style={styles.paragraph}>
                Please read these Terms & Conditions and other documents referred herein carefully before registering on, accessing, browsing, downloading or using any Services or purchasing any Products offered on the Platforms or any electronic device.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ACCEPTANCE</Text>
              
              <Text style={styles.subSectionTitle}>Eligibility:</Text>
              <Text style={styles.paragraph}>
                The Platforms, the Services and the Products are only available for, and to, persons who are competent to enter into legally binding agreements under the Indian Contracts Act, 1872. For avoidance of any doubt, no Services or Products or access to the Platforms will be available to any person that has been previously stopped/blocked from accessing the Platforms or availing the Services or purchasing the Products by Ship Reward, unless specifically permitted by Ship Reward at its sole discretion.
              </Text>

              <Text style={styles.subSectionTitle}>User's Representations:</Text>
              <Text style={styles.paragraph}>
                By accessing, browsing, using or registering on the Platforms or availing the Services or purchasing any Products, You are representing the following:
              </Text>
              <Text style={styles.bulletPoint}>• You are 18 years of age or older;</Text>
              <Text style={styles.bulletPoint}>• You are capable of entering into a legally binding agreement as per the Applicable Law;</Text>
              <Text style={styles.bulletPoint}>• You are not barred or otherwise legally prohibited from accessing or using the Platforms and/or Services and/or Products;</Text>
              <Text style={styles.bulletPoint}>• You have all necessary rights, powers and authority to enter into and perform the Agreement;</Text>
              <Text style={styles.bulletPoint}>• That the entrance and performance of the Agreement by You shall not violate any Applicable Law;</Text>
              <Text style={styles.bulletPoint}>• That You have read and understood the contents of the Agreement.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>User's Acknowledgement</Text>
              <Text style={styles.paragraph}>
                By accessing, using, browsing, downloading, or clicking on the "Continue" box or checking the box "I agree to the Terms and Conditions" or registering on the Platform or availing any Service or purchasing any Product, it shall be deemed that You irrevocably and unconditionally agree, consent and accept:
              </Text>
              <Text style={styles.bulletPoint}>• All of the provisions of the Agreement in its entirety;</Text>
              <Text style={styles.bulletPoint}>• That Ship Reward has the right to alter, add, remove, amend and/or modify any portions or whole of the Agreement, without any prior notice to You;</Text>
              <Text style={styles.bulletPoint}>• That You have provided consent to automatically receive updates such as bug fixes, patches, enhanced functions;</Text>
              <Text style={styles.bulletPoint}>• That You have not and shall not impersonate any person or entity;</Text>
              <Text style={styles.bulletPoint}>• That You are responsible for all activities and transactions that occur under Your account;</Text>
              <Text style={styles.bulletPoint}>• To receive communications from Ship Reward through email, SMS, WhatsApp and any other mode.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>User's Undertakings</Text>
              <Text style={styles.paragraph}>
                While accessing or using the Platforms and/or Service and/or Products, You hereby irrevocably and unconditionally agree and undertake not to:
              </Text>
              <Text style={styles.bulletPoint}>• Violate any of the provisions of the Agreement;</Text>
              <Text style={styles.bulletPoint}>• Avail Services with monies obtained illegally or fraudulently;</Text>
              <Text style={styles.bulletPoint}>• Infringe Our or any third party's intellectual property rights;</Text>
              <Text style={styles.bulletPoint}>• Post any content that is libellous, defamatory, or objectionable;</Text>
              <Text style={styles.bulletPoint}>• Use the Platforms in any manner that could damage or disable these;</Text>
              <Text style={styles.bulletPoint}>• Use any robot, spider, or automatic device to monitor or copy the Platforms;</Text>
              <Text style={styles.bulletPoint}>• Conduct any illegal activity through the Platforms.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>USE OF PLATFORM AND AVAILING OF SERVICES</Text>
              <Text style={styles.paragraph}>
                Provided You accept and comply with the Agreement, Ship Reward hereby grants You a personal, non-exclusive, non-transferable, limited, revocable privilege to enter and use Platforms and/or avail all or some of the Services and/or purchase the Products.
              </Text>

              <Text style={styles.subSectionTitle}>Registration on Platform:</Text>
              <Text style={styles.paragraph}>
                In order to gain access to the Platforms, You need to open a User's account with Ship Reward by registering on the relevant Platform and completing the authentication process including entering the one-time password (OTP) issued by Ship Reward to You.
              </Text>

              <Text style={styles.subSectionTitle}>Account Data Confidentiality:</Text>
              <Text style={styles.paragraph}>
                At the time of registration, You are obliged to provide correct, complete and accurate information. You shall maintain the confidentiality of the login credentials of Your account and immediately notify Ship Reward of any unauthorized use.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Scope of Service</Text>
              <Text style={styles.paragraph}>
                The User by availing the Service(s) shall be deemed to have agreed to the following:
              </Text>
              <Text style={styles.bulletPoint}>• Comply with the provisions of the Agreement as amended from time to time;</Text>
              <Text style={styles.bulletPoint}>• The actual pick-up and delivery of Shipment(s) may be undertaken by sub-contracted Shipping Vendors;</Text>
              <Text style={styles.bulletPoint}>• Pick-up will only be undertaken from the location set out by the User on the Platforms;</Text>
              <Text style={styles.bulletPoint}>• Provide each Shipment with shipping label prominently displayed;</Text>
              <Text style={styles.bulletPoint}>• All Shipment(s) to be properly packed with good quality materials;</Text>
              <Text style={styles.bulletPoint}>• Ensure compliance with all Applicable Laws with respect to the contents of the Shipment(s).</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROHIBITED ITEMS</Text>
              <Text style={styles.paragraph}>
                The User is fully aware of items prohibited for carriage and undertakes not to ship any Shipments which are prohibited, restricted, banned, illegal, stolen, counterfeit, or in breach of any third party rights or Applicable Law. An indicative list includes:
              </Text>
              <Text style={styles.bulletPoint}>• Alcohol, tobacco, drugs, contraband and poisonous goods</Text>
              <Text style={styles.bulletPoint}>• Air guns, replica firearms and ammunition</Text>
              <Text style={styles.bulletPoint}>• Corrosive items, radioactive material</Text>
              <Text style={styles.bulletPoint}>• Currency instruments, precious metals, jewellery, bullion</Text>
              <Text style={styles.bulletPoint}>• Dangerous goods and hazardous materials</Text>
              <Text style={styles.bulletPoint}>• Lithium batteries (standalone)</Text>
              <Text style={styles.bulletPoint}>• Perfumes, cosmetics in large quantities</Text>
              <Text style={styles.bulletPoint}>• Live animals and plants</Text>
              <Text style={styles.bulletPoint}>• Food items requiring refrigeration</Text>
              <Text style={styles.bulletPoint}>• Drones, hoverboards</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>FEES AND PRICING</Text>
              <Text style={styles.paragraph}>
                With respect to pricing of the Services/Products and payment of fees:
              </Text>
              <Text style={styles.bulletPoint}>• You are responsible for any and all fees that may be applicable;</Text>
              <Text style={styles.bulletPoint}>• Ship Reward reserves its rights to add new services for additional fees or amend fees for existing Services;</Text>
              <Text style={styles.bulletPoint}>• All fees shall be exclusive of all taxes like GST, which shall be charged additionally;</Text>
              <Text style={styles.bulletPoint}>• Services provided shall be on pre-paid basis unless agreed otherwise;</Text>
              <Text style={styles.bulletPoint}>• The User cannot request for refund of the credit balance in the User's account.</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>LIMITATION OF LIABILITY</Text>
              <Text style={styles.paragraph}>
                Ship Reward's liability with respect to the Services provided shall be limited as follows:
              </Text>
              <Text style={styles.bulletPoint}>• For 0-100g shipments: 30% of invoice value plus shipping charges, maximum Rs.1,000/-</Text>
              <Text style={styles.bulletPoint}>• For shipments above 100g: 30% of invoice plus shipping charges, maximum Rs.4,000/-</Text>
              
              <Text style={styles.subSectionTitle}>Exception - ShipReward Economy:</Text>
              <Text style={styles.paragraph}>
                For shipments booked under the ShipReward Economy service, no refunds, reimbursements, or claims shall be entertained or processed, irrespective of the invoice value, declared value, or freight charges paid.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>REFUND AND RETURN POLICY</Text>
              <Text style={styles.paragraph}>
                The refund and return policy of Shipments shall be applicable as set out in the Merchant Agreement.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>GOVERNING LAW AND JURISDICTION</Text>
              <Text style={styles.paragraph}>
                The Agreement shall be governed by the laws of India. Any dispute(s) shall first be attempted to be settled by mutual discussions for 30 days. If not resolved, such disputes shall be referred to arbitration by a sole arbitrator. The arbitration proceedings shall be held in English with the seat, venue and legal place being New Delhi.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CUSTOMER SUPPORT</Text>
              <Text style={styles.paragraph}>
                If You have any questions, issues, complaint, or seek any clarity in relations to the Agreement and/or Services/Products, please feel free to contact us at:
              </Text>
              <Text style={styles.contactInfo}>Email: support@shipreward.in</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.paragraph}>
                The Agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system, and does not require any physical or digital signatures. This document is published in accordance with the provisions of Rule 3(1)(a) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
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
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 12,
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
