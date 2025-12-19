import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

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
  { id: 'all', label: 'All Orders' },
  { id: 'drafts', label: 'Drafts' },
  { id: 'ready', label: 'Ready' },
  { id: 'packed', label: 'Packed' },
  { id: 'manifested', label: 'Manifested' },
  { id: 'dispatched', label: 'Dispatched' },
  { id: 'received', label: 'Received' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'disputed', label: 'Disputed' },
];

// Sample orders data
const sampleOrders = [
  {
    id: 'SG32510063928386',
    prefix: 'US - 94520',
    invoiceNo: 'DP-111-2884301-7196240',
    customerName: 'Armando Armando',
    customerEmail: 'HARDIKSOJITRA477@gmail.com',
    customerPhone: '+1 415-419-8616',
    orderDate: '06 Oct, 2025',
    orderTime: '01:41 PM',
    weight: '0.7 kg',
    price: '₹ 1951.72',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948986',
    carrier: 'Cirro',
  },
  {
    id: 'SG32510063928367',
    prefix: 'US - 98002',
    invoiceNo: 'DP-112-7427052-2815434',
    customerName: 'RAFAEL MIGUEL',
    customerEmail: 'ASHISHSAVANI477@GMAIL.COM',
    customerPhone: '+1 210-728-4548',
    orderDate: '06 Oct, 2025',
    orderTime: '01:41 PM',
    weight: '0.7 kg',
    price: '₹ 1951.72',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64989985119667',
    carrier: 'UNI UNI',
  },
  {
    id: 'SG32510063928304',
    prefix: 'US - 08619',
    invoiceNo: 'DP-111-9815145-5159440',
    customerName: 'Sugel Cruz',
    customerEmail: 'HARDIKSOJITRA477@gmail.com',
    customerPhone: '+1 763-225-9463',
    orderDate: '06 Oct, 2025',
    orderTime: '01:41 PM',
    weight: '0.7 kg',
    price: '₹ 1951.72',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120610',
    carrier: 'UNI UNI',
  },
  {
    id: 'SG32507133359313',
    prefix: 'US - 97203',
    invoiceNo: 'JGJHJ',
    customerName: 'Jemal Harun',
    customerEmail: 'KRUNALSOJITRA760000@GMAIL.COM',
    customerPhone: '+1 347-448-3190',
    orderDate: '13 Jul, 2025',
    orderTime: '03:09 PM',
    weight: '0.35 kg',
    price: '₹ 0.00',
    packageType: 'CSB-IV',
    status: 'cancelled',
    trackingId: '',
    carrier: '',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return { bg: '#ECFDF5', text: COLORS.green };
    case 'cancelled':
      return { bg: '#FEF2F2', text: COLORS.red };
    case 'dispatched':
      return { bg: '#EFF6FF', text: COLORS.primary };
    case 'packed':
      return { bg: '#FEF3C7', text: COLORS.orange };
    default:
      return { bg: COLORS.lightGray, text: COLORS.gray };
  }
};

export default function OrdersScreen() {
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (params.tab) {
      setActiveTab(params.tab as string);
    }
  }, [params.tab]);

  const filteredOrders = sampleOrders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'delivered') return order.status === 'delivered';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    if (activeTab === 'dispatched') return order.status === 'dispatched';
    if (activeTab === 'disputed') return order.status === 'disputed';
    return true;
  });

  const renderOrderRow = ({ item }: { item: typeof sampleOrders[0] }) => {
    const statusColors = getStatusColor(item.status);

    return (
      <View style={styles.orderRow}>
        <View style={styles.checkboxCell}>
          <View style={styles.checkbox} />
        </View>

        <View style={styles.orderIdCell}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderPrefix}>{item.prefix}</Text>
          <Text style={styles.orderInvoice}>Inv no. {item.invoiceNo}</Text>
        </View>

        <View style={styles.customerCell}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.customerEmail}>{item.customerEmail}</Text>
          <Text style={styles.customerPhone}>{item.customerPhone}</Text>
        </View>

        <View style={styles.dateCell}>
          <Text style={styles.orderDate}>{item.orderDate}</Text>
          <Text style={styles.orderTime}>{item.orderTime}</Text>
        </View>

        <View style={styles.packageCell}>
          <Text style={styles.packageWeight}>{item.weight}</Text>
          <Text style={styles.packagePrice}>{item.price}</Text>
          <Text style={styles.packageType}>{item.packageType}</Text>
        </View>

        <View style={styles.statusCell}>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.lastMileCell}>
          {item.trackingId ? (
            <>
              <Text style={styles.trackingId}>{item.trackingId}</Text>
              <Text style={styles.carrier}>{item.carrier}</Text>
              <View style={styles.copyRow}>
                <Ionicons name="copy-outline" size={14} color={COLORS.gray} />
                <Text style={styles.copyText}>Copy</Text>
              </View>
            </>
          ) : (
            <Text style={styles.noTracking}>-</Text>
          )}
        </View>

        <View style={styles.viewCell}>
          <TouchableOpacity style={styles.viewButton}>
            <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>All Orders</Text>
          <Text style={styles.breadcrumb}>Orders {'>'} All</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={18} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkButton}>
            <Ionicons name="cloud-upload-outline" size={18} color={COLORS.white} />
            <Text style={styles.bulkButtonText}>Bulk Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
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
      </ScrollView>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Tracking Id..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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
        <View style={styles.orderIdCell}>
          <Text style={styles.headerText}>Order ID</Text>
          <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
        </View>
        <View style={styles.customerCell}>
          <Text style={styles.headerText}>Customer Details</Text>
        </View>
        <View style={styles.dateCell}>
          <Text style={styles.headerText}>Order Date</Text>
          <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
        </View>
        <View style={styles.packageCell}>
          <Text style={styles.headerText}>Package Details</Text>
          <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
        </View>
        <View style={styles.statusCell}>
          <Text style={styles.headerText}>Status</Text>
        </View>
        <View style={styles.lastMileCell}>
          <Text style={styles.headerText}>Last Mile Details</Text>
        </View>
        <View style={styles.viewCell}>
          <Text style={styles.headerText}>View Order</Text>
        </View>
      </View>

      {/* Table Body */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderRow}
        keyExtractor={(item) => item.id}
        style={styles.tableBody}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No orders found</Text>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  bulkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  bulkButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  tabsContainer: {
    flexGrow: 0,
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 200,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.darkGray,
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
  orderIdCell: {
    flex: 1.5,
    minWidth: 150,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  customerCell: {
    flex: 1.5,
    minWidth: 180,
    paddingHorizontal: 8,
  },
  dateCell: {
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  packageCell: {
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  lastMileCell: {
    flex: 1.2,
    minWidth: 140,
    paddingHorizontal: 8,
  },
  viewCell: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableBody: {
    flex: 1,
  },
  orderRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'flex-start',
  },
  orderId: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  orderPrefix: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  orderInvoice: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  customerName: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  customerEmail: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  customerPhone: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  orderDate: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  orderTime: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  packageWeight: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  packagePrice: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: 2,
  },
  packageType: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
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
  trackingId: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  carrier: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  copyText: {
    fontSize: 11,
    color: COLORS.gray,
  },
  noTracking: {
    fontSize: 13,
    color: COLORS.gray,
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
