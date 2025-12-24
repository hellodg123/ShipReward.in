import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
  lightBlue: '#EFF6FF',
};

const countryTabs = [
  { id: 'usa', label: 'USA (United State Of America)', flag: 'https://flagcdn.com/w40/us.png' },
  { id: 'canada', label: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
  { id: 'germany', label: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
  { id: 'uk', label: 'UK (United Kingdom)', flag: 'https://flagcdn.com/w40/gb.png' },
];

// Shipping rates data for different countries with more data
const ratesData = {
  usa: [
    { weight: '0.50 kg', standard: 950, express: 1250, priority: 1650 },
    { weight: '0.75 kg', standard: 1100, express: 1450, priority: 1900 },
    { weight: '1.00 kg', standard: 1250, express: 1650, priority: 2150 },
    { weight: '1.25 kg', standard: 1400, express: 1850, priority: 2400 },
    { weight: '1.50 kg', standard: 1550, express: 2050, priority: 2650 },
    { weight: '1.75 kg', standard: 1700, express: 2250, priority: 2900 },
    { weight: '2.00 kg', standard: 1850, express: 2450, priority: 3150 },
    { weight: '2.50 kg', standard: 2100, express: 2750, priority: 3550 },
    { weight: '3.00 kg', standard: 2350, express: 3050, priority: 3950 },
    { weight: '3.50 kg', standard: 2600, express: 3350, priority: 4350 },
    { weight: '4.00 kg', standard: 2850, express: 3650, priority: 4750 },
    { weight: '4.50 kg', standard: 3100, express: 3950, priority: 5150 },
    { weight: '5.00 kg', standard: 3350, express: 4250, priority: 5550 },
  ],
  canada: [
    { weight: '0.50 kg', standard: 900, express: 1200, priority: 1600 },
    { weight: '0.75 kg', standard: 1050, express: 1400, priority: 1850 },
    { weight: '1.00 kg', standard: 1200, express: 1600, priority: 2100 },
    { weight: '1.25 kg', standard: 1350, express: 1800, priority: 2350 },
    { weight: '1.50 kg', standard: 1500, express: 2000, priority: 2600 },
    { weight: '1.75 kg', standard: 1650, express: 2200, priority: 2850 },
    { weight: '2.00 kg', standard: 1800, express: 2400, priority: 3100 },
    { weight: '2.50 kg', standard: 2050, express: 2700, priority: 3500 },
    { weight: '3.00 kg', standard: 2300, express: 3000, priority: 3900 },
    { weight: '3.50 kg', standard: 2550, express: 3300, priority: 4300 },
    { weight: '4.00 kg', standard: 2800, express: 3600, priority: 4700 },
    { weight: '4.50 kg', standard: 3050, express: 3900, priority: 5100 },
    { weight: '5.00 kg', standard: 3300, express: 4200, priority: 5500 },
  ],
  germany: [
    { weight: '0.50 kg', standard: 850, express: 1150, priority: 1550 },
    { weight: '0.75 kg', standard: 1000, express: 1350, priority: 1800 },
    { weight: '1.00 kg', standard: 1150, express: 1550, priority: 2050 },
    { weight: '1.25 kg', standard: 1300, express: 1750, priority: 2300 },
    { weight: '1.50 kg', standard: 1450, express: 1950, priority: 2550 },
    { weight: '1.75 kg', standard: 1600, express: 2150, priority: 2800 },
    { weight: '2.00 kg', standard: 1750, express: 2350, priority: 3050 },
    { weight: '2.50 kg', standard: 2000, express: 2650, priority: 3450 },
    { weight: '3.00 kg', standard: 2250, express: 2950, priority: 3850 },
    { weight: '3.50 kg', standard: 2500, express: 3250, priority: 4250 },
    { weight: '4.00 kg', standard: 2750, express: 3550, priority: 4650 },
    { weight: '4.50 kg', standard: 3000, express: 3850, priority: 5050 },
    { weight: '5.00 kg', standard: 3250, express: 4150, priority: 5450 },
  ],
  uk: [
    { weight: '0.50 kg', standard: 800, express: 1100, priority: 1500 },
    { weight: '0.75 kg', standard: 950, express: 1300, priority: 1750 },
    { weight: '1.00 kg', standard: 1100, express: 1500, priority: 2000 },
    { weight: '1.25 kg', standard: 1250, express: 1700, priority: 2250 },
    { weight: '1.50 kg', standard: 1400, express: 1900, priority: 2500 },
    { weight: '1.75 kg', standard: 1550, express: 2100, priority: 2750 },
    { weight: '2.00 kg', standard: 1700, express: 2300, priority: 3000 },
    { weight: '2.50 kg', standard: 1950, express: 2600, priority: 3400 },
    { weight: '3.00 kg', standard: 2200, express: 2900, priority: 3800 },
    { weight: '3.50 kg', standard: 2450, express: 3200, priority: 4200 },
    { weight: '4.00 kg', standard: 2700, express: 3500, priority: 4600 },
    { weight: '4.50 kg', standard: 2950, express: 3800, priority: 5000 },
    { weight: '5.00 kg', standard: 3200, express: 4100, priority: 5400 },
  ],
};

export default function RateTableScreen() {
  const [activeTab, setActiveTab] = useState('usa');

  const currentRates = ratesData[activeTab as keyof typeof ratesData];
  const currentCountry = countryTabs.find(tab => tab.id === activeTab);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Rate Table</Text>
          <Text style={styles.breadcrumb}>{currentCountry?.label}</Text>
        </View>
      </View>

      {/* Country Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {countryTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Image 
              source={{ uri: tab.flag }} 
              style={styles.flagIcon}
              resizeMode="cover"
            />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rate Card */}
      <View style={styles.rateCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Shipping Rates to {currentCountry?.label}</Text>
          <View style={styles.cardSubtitle}>
            <Ionicons name="information-circle-outline" size={16} color={COLORS.gray} />
            <Text style={styles.cardSubtitleText}>All prices are in INR (₹) inclusive of GST</Text>
          </View>
        </View>

        {/* Table */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={[styles.tableHeaderCell, { width: 120 }]}>
                <Text style={styles.tableHeaderText}>Weight</Text>
                <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
              </View>
              <View style={[styles.tableHeaderCell, { width: 140 }]}>
                <View style={styles.headerWithBadge}>
                  <Text style={styles.tableHeaderText}>Standard</Text>
                  <View style={[styles.deliveryBadge, { backgroundColor: '#ECFDF5' }]}>
                    <Text style={[styles.deliveryBadgeText, { color: '#10B981' }]}>7-10 Days</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.tableHeaderCell, { width: 140 }]}>
                <View style={styles.headerWithBadge}>
                  <Text style={styles.tableHeaderText}>Express</Text>
                  <View style={[styles.deliveryBadge, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[styles.deliveryBadgeText, { color: '#D97706' }]}>5-7 Days</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.tableHeaderCell, { width: 140 }]}>
                <View style={styles.headerWithBadge}>
                  <Text style={styles.tableHeaderText}>Priority</Text>
                  <View style={[styles.deliveryBadge, { backgroundColor: '#FEE2E2' }]}>
                    <Text style={[styles.deliveryBadgeText, { color: '#EF4444' }]}>3-5 Days</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Table Body */}
            {currentRates.map((rate, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}>
                <View style={[styles.tableCell, { width: 120 }]}>
                  <Text style={styles.weightText}>{rate.weight}</Text>
                </View>
                <View style={[styles.tableCell, { width: 140 }]}>
                  <Text style={styles.priceText}>₹ {rate.standard.toLocaleString()}</Text>
                </View>
                <View style={[styles.tableCell, { width: 140 }]}>
                  <Text style={styles.priceText}>₹ {rate.express.toLocaleString()}</Text>
                </View>
                <View style={[styles.tableCell, { width: 140 }]}>
                  <Text style={styles.priceText}>₹ {rate.priority.toLocaleString()}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>2025 © ShipReward.in</Text>
    </ScrollView>
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
  tabsContainer: {
    flexGrow: 0,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  flagIcon: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.white,
  },
  rateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  cardSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardSubtitleText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  table: {
    minWidth: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  tableHeaderCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  headerWithBadge: {
    alignItems: 'flex-start',
  },
  deliveryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  deliveryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableRowEven: {
    backgroundColor: COLORS.lightBlue,
  },
  tableCell: {
    justifyContent: 'center',
  },
  weightText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  priceText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
});
