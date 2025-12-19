import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  border: '#E5E7EB',
  green: '#10B981',
};

const supportOptions = [
  {
    id: '1',
    icon: 'chatbubbles-outline',
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    available: true,
  },
  {
    id: '2',
    icon: 'mail-outline',
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    email: 'support@shipreward.in',
    available: true,
  },
  {
    id: '3',
    icon: 'call-outline',
    title: 'Phone Support',
    description: 'Call us during business hours',
    phone: '+91 1800-XXX-XXXX',
    available: true,
  },
  {
    id: '4',
    icon: 'logo-whatsapp',
    title: 'WhatsApp',
    description: 'Message us on WhatsApp for quick support',
    phone: '+91 98XXX-XXXXX',
    available: true,
  },
];

const faqItems = [
  {
    id: '1',
    question: 'How do I track my shipment?',
    answer: 'You can track your shipment by entering your tracking number in the Track section or by clicking on the shipment in your orders.',
  },
  {
    id: '2',
    question: 'What are the shipping rates?',
    answer: 'Shipping rates vary based on destination, weight, and dimensions. Use our Rate Calculator to get an estimate.',
  },
  {
    id: '3',
    question: 'How do I schedule a pickup?',
    answer: 'Go to the Pickup section and click on "Schedule Pickup". Select your preferred date and time slot.',
  },
  {
    id: '4',
    question: 'What is the refund policy?',
    answer: 'Refunds are processed within 7-10 business days for cancelled shipments. Contact support for dispute resolutions.',
  },
];

export default function SupportScreen() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Support Center</Text>
          <Text style={styles.breadcrumb}>Help {'>'} Support Center</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Support Options */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.supportGrid}>
          {supportOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.supportCard}>
              <View style={styles.supportIconContainer}>
                <Ionicons name={option.icon as any} size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.supportTitle}>{option.title}</Text>
              <Text style={styles.supportDescription}>{option.description}</Text>
              {option.email && (
                <Text style={styles.supportContact}>{option.email}</Text>
              )}
              {option.phone && (
                <Text style={styles.supportContact}>{option.phone}</Text>
              )}
              {option.available && (
                <View style={styles.availableBadge}>
                  <View style={styles.availableDot} />
                  <Text style={styles.availableText}>Available</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqSection}>
          {faqItems.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={COLORS.gray}
                />
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Links */}
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="document-text-outline" size={20} color={COLORS.primary} />
            <Text style={styles.quickLinkText}>Documentation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="videocam-outline" size={20} color={COLORS.primary} />
            <Text style={styles.quickLinkText}>Video Tutorials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="newspaper-outline" size={20} color={COLORS.primary} />
            <Text style={styles.quickLinkText}>Knowledge Base</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLinkItem}>
            <Ionicons name="flag-outline" size={20} color={COLORS.primary} />
            <Text style={styles.quickLinkText}>Report an Issue</Text>
          </TouchableOpacity>
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
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  searchSection: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  supportCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 20,
  },
  supportIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 8,
  },
  supportContact: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },
  availableText: {
    fontSize: 12,
    color: COLORS.green,
    fontWeight: '500',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqItem: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 12,
    lineHeight: 20,
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  quickLinkText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
});
