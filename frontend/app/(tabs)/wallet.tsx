import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  border: '#E5E7EB',
};

const tabs = [
  { id: 'transactions', label: 'Transaction History' },
  { id: 'recharge', label: 'Recharge History' },
];

// Sample transaction data
const transactionHistory = [
  {
    id: '1',
    date: '09 Oct 25 - 04:35 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283O4 - Dispute-Other',
    amount: -61.27,
    status: 'Complete',
  },
  {
    id: '2',
    date: '09 Oct 25 - 04:35 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283O4 - Dispute-Restricted',
    amount: -61.27,
    status: 'Complete',
  },
  {
    id: '3',
    date: '09 Oct 25 - 04:35 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283G7 - Dispute-Other',
    amount: -61.27,
    status: 'Complete',
  },
  {
    id: '4',
    date: '08 Oct 25 - 02:15 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283G7 - Dispute-Restricted',
    amount: -61.27,
    status: 'Complete',
  },
];

const rechargeHistory = [
  {
    id: '1',
    date: '01 Oct 25 - 10:30 AM',
    description: 'Wallet Recharge via UPI',
    transactionId: 'TXN123456789',
    amount: 1000,
    status: 'Success',
  },
  {
    id: '2',
    date: '15 Sep 25 - 03:45 PM',
    description: 'Wallet Recharge via Card',
    transactionId: 'TXN987654321',
    amount: 500,
    status: 'Success',
  },
];

export default function WalletScreen() {
  const [activeTab, setActiveTab] = useState('transactions');

  const renderTransactionRow = ({ item }: { item: typeof transactionHistory[0] }) => (
    <View style={styles.tableRow}>
      <View style={styles.checkboxCell}>
        <View style={styles.checkbox} />
      </View>
      <View style={styles.dateCell}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.descCell}>
        <Text style={styles.descText}>{item.description}</Text>
        <Text style={styles.orderIdText}>{item.orderId}</Text>
      </View>
      <View style={styles.amountCell}>
        <Text style={[styles.amountText, item.amount < 0 ? styles.amountNegative : styles.amountPositive]}>
          {item.amount < 0 ? `- ₹ ${Math.abs(item.amount).toFixed(2)}` : `+ ₹ ${item.amount.toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.statusCell}>
        <View style={[styles.statusBadge, { backgroundColor: '#ECFDF5' }]}>
          <Text style={[styles.statusText, { color: COLORS.green }]}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.viewCell}>
        <TouchableOpacity style={styles.viewButton}>
          <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRechargeRow = ({ item }: { item: typeof rechargeHistory[0] }) => (
    <View style={styles.tableRow}>
      <View style={styles.checkboxCell}>
        <View style={styles.checkbox} />
      </View>
      <View style={styles.dateCell}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.descCell}>
        <Text style={styles.descText}>{item.description}</Text>
        <Text style={styles.orderIdText}>{item.transactionId}</Text>
      </View>
      <View style={styles.amountCell}>
        <Text style={[styles.amountText, styles.amountPositive]}>
          + ₹ {item.amount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.statusCell}>
        <View style={[styles.statusBadge, { backgroundColor: '#ECFDF5' }]}>
          <Text style={[styles.statusText, { color: COLORS.green }]}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.viewCell}>
        <TouchableOpacity style={styles.viewButton}>
          <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Transactions</Text>
          <Text style={styles.breadcrumb}>Wallet {'>'} Transactions</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.rechargeButton}>
            <Ionicons name="add" size={18} color={COLORS.white} />
            <Text style={styles.rechargeButtonText}>Recharge Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter and Export */}
      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.filterButtonText}>More Filters</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <View style={styles.checkboxCell}>
          <View style={styles.checkbox} />
        </View>
        <View style={styles.dateCell}>
          <Text style={styles.headerText}>Transaction Date</Text>
          <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
        </View>
        <View style={styles.descCell}>
          <Text style={styles.headerText}>Description</Text>
        </View>
        <View style={styles.amountCell}>
          <Text style={styles.headerText}>Amount</Text>
          <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
        </View>
        <View style={styles.statusCell}>
          <Text style={styles.headerText}>Status</Text>
        </View>
        <View style={styles.viewCell}>
          <Text style={styles.headerText}>View Detail</Text>
        </View>
      </View>

      {/* Table Body */}
      <FlatList
        data={activeTab === 'transactions' ? transactionHistory : rechargeHistory}
        renderItem={activeTab === 'transactions' ? renderTransactionRow : renderRechargeRow}
        keyExtractor={(item) => item.id}
        style={styles.tableBody}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />
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
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rechargeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  rechargeButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.darkGray,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  checkboxCell: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  dateCell: {
    flex: 1.2,
    minWidth: 140,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  descCell: {
    flex: 2,
    minWidth: 200,
    paddingHorizontal: 8,
  },
  amountCell: {
    flex: 0.8,
    minWidth: 100,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusCell: {
    flex: 0.8,
    minWidth: 90,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewCell: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  descText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  orderIdText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  amountText: {
    fontSize: 13,
    fontWeight: '600',
  },
  amountNegative: {
    color: COLORS.red,
  },
  amountPositive: {
    color: COLORS.green,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 12,
  },
});
