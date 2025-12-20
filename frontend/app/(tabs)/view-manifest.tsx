import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F97316',
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
  border: '#E5E7EB',
};

// Sample pickup address
const pickupAddress = {
  name: 'Hiren Vaghashiya',
  street: 'hiren, 477, ar mall, mota varachha',
  area: 'Mota Varachha',
  city: 'Surat',
  state: 'Gujarat',
  pincode: '394101',
  phone: '8866394789',
};

export default function ViewManifestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const manifestCode = (params.code as string) || 'MSG268752510266333233';

  // Summary data
  const summaryData = {
    shipmentCost: 0.00,
    totalInvoiceValue: 0.00,
    totalOrderWeight: 0,
    boxCount: 0,
  };

  const renderOrdersTable = (title: string, showBulkAdd: boolean = false) => (
    <View style={styles.tableSection}>
      <View style={styles.tableHeaderRow}>
        <Text style={styles.tableSectionTitle}>{title}</Text>
        {showBulkAdd && (
          <TouchableOpacity style={styles.bulkAddButton}>
            <Text style={styles.bulkAddButtonText}>Bulk Add to Manifest</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <View style={styles.checkboxCell}>
          <View style={styles.checkbox} />
        </View>
        <View style={[styles.tableCell, { flex: 1.2 }]}>
          <Text style={styles.tableHeaderText}>Order ID</Text>
        </View>
        <View style={[styles.tableCell, { flex: 1.2 }]}>
          <Text style={styles.tableHeaderText}>Customer Details</Text>
        </View>
        <View style={[styles.tableCell, { flex: 0.8 }]}>
          <Text style={styles.tableHeaderText}>Order Date</Text>
        </View>
        <View style={[styles.tableCell, { flex: 0.8 }]}>
          <Text style={styles.tableHeaderText}>Package Details</Text>
        </View>
        <View style={[styles.tableCell, { flex: 1.2 }]}>
          <Text style={styles.tableHeaderText}>Address</Text>
        </View>
        <View style={[styles.tableCell, { flex: 0.8 }]}>
          <Text style={styles.tableHeaderText}>Last Mile AWB</Text>
        </View>
        <View style={[styles.tableCell, { flex: 0.6 }]}>
          <Text style={styles.tableHeaderText}>View Order</Text>
        </View>
        <View style={[styles.tableCell, { flex: 0.5 }]}>
          <Text style={styles.tableHeaderText}>Action</Text>
        </View>
      </View>

      {/* Empty State */}
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No results.</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>View Manifest : </Text>
            <Text style={styles.manifestCode}>{manifestCode}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Open</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.pickupDateButton}>
          <Text style={styles.pickupDateButtonText}>Select Pickup Date</Text>
        </TouchableOpacity>
      </View>

      {/* Pickup Address */}
      <View style={styles.addressSection}>
        <Text style={styles.addressText}>
          {pickupAddress.name}, {pickupAddress.street}, {pickupAddress.area}, {pickupAddress.city}, {pickupAddress.state}, {pickupAddress.pincode}, {pickupAddress.phone}
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Shipment Cost</Text>
          <Text style={styles.summaryValue}>Rs. {summaryData.shipmentCost.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Invoice Value</Text>
          <Text style={styles.summaryValue}>Rs. {summaryData.totalInvoiceValue.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Order Weight</Text>
          <Text style={styles.summaryValue}>{summaryData.totalOrderWeight} KG</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Box Count</Text>
          <Text style={styles.summaryValue}>{summaryData.boxCount}</Text>
        </View>
      </View>

      {/* Same Address Orders */}
      {renderOrdersTable('Same Address Orders', true)}

      {/* Other Address Orders */}
      {renderOrdersTable('Other Address Orders', true)}

      {/* Manifested Orders */}
      {renderOrdersTable('Manifested Orders', false)}

      <View style={{ height: 40 }} />
    </ScrollView>
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
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  manifestCode: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statusBadge: {
    backgroundColor: COLORS.purpleLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.purple,
  },
  pickupDateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  pickupDateButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  addressSection: {
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  summaryCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 20,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  tableSection: {
    marginBottom: 32,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tableSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  bulkAddButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bulkAddButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  checkboxCell: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  tableCell: {
    paddingHorizontal: 6,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
