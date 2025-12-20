import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

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

// Extended sample orders data for pagination
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
  {
    id: 'SG32510063928401',
    prefix: 'US - 90210',
    invoiceNo: 'DP-113-5521478-9874523',
    customerName: 'Maria Santos',
    customerEmail: 'maria.santos@email.com',
    customerPhone: '+1 323-555-1234',
    orderDate: '05 Oct, 2025',
    orderTime: '10:30 AM',
    weight: '1.2 kg',
    price: '₹ 2450.00',
    packageType: 'CSB-IV',
    status: 'dispatched',
    trackingId: 'UU55A64987985120611',
    carrier: 'FedEx',
  },
  {
    id: 'SG32510063928402',
    prefix: 'CA - 10001',
    invoiceNo: 'DP-114-7894561-2365478',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1 212-555-7890',
    orderDate: '05 Oct, 2025',
    orderTime: '02:15 PM',
    weight: '0.5 kg',
    price: '₹ 1850.00',
    packageType: 'CSB-IV',
    status: 'packed',
    trackingId: 'CR000516948987',
    carrier: 'DHL',
  },
  {
    id: 'SG32510063928403',
    prefix: 'UK - 20001',
    invoiceNo: 'DP-115-1234567-8901234',
    customerName: 'Emma Wilson',
    customerEmail: 'emma.wilson@email.com',
    customerPhone: '+44 20-7946-0958',
    orderDate: '04 Oct, 2025',
    orderTime: '11:45 AM',
    weight: '2.0 kg',
    price: '₹ 3200.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120612',
    carrier: 'Royal Mail',
  },
  {
    id: 'SG32510063928404',
    prefix: 'DE - 30001',
    invoiceNo: 'DP-116-9876543-2109876',
    customerName: 'Hans Mueller',
    customerEmail: 'hans.mueller@email.com',
    customerPhone: '+49 30-1234-5678',
    orderDate: '04 Oct, 2025',
    orderTime: '09:00 AM',
    weight: '1.5 kg',
    price: '₹ 2800.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948988',
    carrier: 'DPD',
  },
  {
    id: 'SG32510063928405',
    prefix: 'US - 30301',
    invoiceNo: 'DP-117-5678901-2345678',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    customerPhone: '+1 404-555-2345',
    orderDate: '03 Oct, 2025',
    orderTime: '04:30 PM',
    weight: '0.8 kg',
    price: '₹ 2100.00',
    packageType: 'CSB-IV',
    status: 'dispatched',
    trackingId: 'UU55A64987985120613',
    carrier: 'UPS',
  },
  {
    id: 'SG32510063928406',
    prefix: 'US - 60601',
    invoiceNo: 'DP-118-3456789-0123456',
    customerName: 'Michael Brown',
    customerEmail: 'michael.brown@email.com',
    customerPhone: '+1 312-555-6789',
    orderDate: '03 Oct, 2025',
    orderTime: '01:00 PM',
    weight: '3.0 kg',
    price: '₹ 4500.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948989',
    carrier: 'USPS',
  },
  {
    id: 'SG32510063928407',
    prefix: 'CA - 75201',
    invoiceNo: 'DP-119-7890123-4567890',
    customerName: 'Lisa Garcia',
    customerEmail: 'lisa.garcia@email.com',
    customerPhone: '+1 214-555-0123',
    orderDate: '02 Oct, 2025',
    orderTime: '03:45 PM',
    weight: '0.6 kg',
    price: '₹ 1750.00',
    packageType: 'CSB-IV',
    status: 'ready',
    trackingId: '',
    carrier: '',
  },
  {
    id: 'SG32510063928408',
    prefix: 'US - 98101',
    invoiceNo: 'DP-120-2345678-9012345',
    customerName: 'David Lee',
    customerEmail: 'david.lee@email.com',
    customerPhone: '+1 206-555-4567',
    orderDate: '02 Oct, 2025',
    orderTime: '10:15 AM',
    weight: '1.0 kg',
    price: '₹ 2200.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120614',
    carrier: 'FedEx',
  },
  {
    id: 'SG32510063928409',
    prefix: 'UK - 33101',
    invoiceNo: 'DP-121-6789012-3456789',
    customerName: 'Robert Martinez',
    customerEmail: 'robert.martinez@email.com',
    customerPhone: '+1 305-555-8901',
    orderDate: '01 Oct, 2025',
    orderTime: '12:30 PM',
    weight: '0.4 kg',
    price: '₹ 1500.00',
    packageType: 'CSB-IV',
    status: 'disputed',
    trackingId: 'CR000516948990',
    carrier: 'DHL',
  },
  {
    id: 'SG32510063928410',
    prefix: 'DE - 85001',
    invoiceNo: 'DP-122-0123456-7890123',
    customerName: 'Jennifer Taylor',
    customerEmail: 'jennifer.taylor@email.com',
    customerPhone: '+1 602-555-2345',
    orderDate: '01 Oct, 2025',
    orderTime: '08:45 AM',
    weight: '2.5 kg',
    price: '₹ 3800.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120615',
    carrier: 'UPS',
  },
  {
    id: 'SG32510063928411',
    prefix: 'US - 02101',
    invoiceNo: 'DP-123-4567890-1234567',
    customerName: 'William Anderson',
    customerEmail: 'william.anderson@email.com',
    customerPhone: '+1 617-555-6789',
    orderDate: '30 Sep, 2025',
    orderTime: '05:00 PM',
    weight: '0.9 kg',
    price: '₹ 2050.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948991',
    carrier: 'USPS',
  },
  {
    id: 'SG32510063928412',
    prefix: 'CA - 80202',
    invoiceNo: 'DP-124-8901234-5678901',
    customerName: 'Elizabeth Thomas',
    customerEmail: 'elizabeth.thomas@email.com',
    customerPhone: '+1 303-555-0123',
    orderDate: '30 Sep, 2025',
    orderTime: '02:30 PM',
    weight: '1.8 kg',
    price: '₹ 2900.00',
    packageType: 'CSB-IV',
    status: 'cancelled',
    trackingId: '',
    carrier: '',
  },
  {
    id: 'SG32510063928413',
    prefix: 'UK - 19101',
    invoiceNo: 'DP-125-2345678-9012345',
    customerName: 'Christopher White',
    customerEmail: 'chris.white@email.com',
    customerPhone: '+1 215-555-4567',
    orderDate: '29 Sep, 2025',
    orderTime: '11:00 AM',
    weight: '0.7 kg',
    price: '₹ 1900.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120616',
    carrier: 'FedEx',
  },
  {
    id: 'SG32510063928414',
    prefix: 'DE - 48201',
    invoiceNo: 'DP-126-6789012-3456789',
    customerName: 'Patricia Harris',
    customerEmail: 'patricia.harris@email.com',
    customerPhone: '+1 313-555-8901',
    orderDate: '29 Sep, 2025',
    orderTime: '09:30 AM',
    weight: '1.3 kg',
    price: '₹ 2600.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948992',
    carrier: 'DHL',
  },
  {
    id: 'SG32510063928415',
    prefix: 'US - 55401',
    invoiceNo: 'DP-127-0123456-7890123',
    customerName: 'Daniel Clark',
    customerEmail: 'daniel.clark@email.com',
    customerPhone: '+1 612-555-2345',
    orderDate: '28 Sep, 2025',
    orderTime: '04:15 PM',
    weight: '0.5 kg',
    price: '₹ 1650.00',
    packageType: 'CSB-IV',
    status: 'dispatched',
    trackingId: 'UU55A64987985120617',
    carrier: 'UPS',
  },
  {
    id: 'SG32510063928416',
    prefix: 'CA - 63101',
    invoiceNo: 'DP-128-4567890-1234567',
    customerName: 'Nancy Lewis',
    customerEmail: 'nancy.lewis@email.com',
    customerPhone: '+1 314-555-6789',
    orderDate: '28 Sep, 2025',
    orderTime: '01:45 PM',
    weight: '2.2 kg',
    price: '₹ 3400.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948993',
    carrier: 'USPS',
  },
  {
    id: 'SG32510063928417',
    prefix: 'UK - 92101',
    invoiceNo: 'DP-129-8901234-5678901',
    customerName: 'Mark Robinson',
    customerEmail: 'mark.robinson@email.com',
    customerPhone: '+1 619-555-0123',
    orderDate: '27 Sep, 2025',
    orderTime: '10:00 AM',
    weight: '1.1 kg',
    price: '₹ 2300.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120618',
    carrier: 'FedEx',
  },
  {
    id: 'SG32510063928418',
    prefix: 'DE - 77002',
    invoiceNo: 'DP-130-2345678-9012345',
    customerName: 'Karen Walker',
    customerEmail: 'karen.walker@email.com',
    customerPhone: '+1 713-555-4567',
    orderDate: '27 Sep, 2025',
    orderTime: '07:30 AM',
    weight: '0.3 kg',
    price: '₹ 1400.00',
    packageType: 'CSB-IV',
    status: 'packed',
    trackingId: '',
    carrier: '',
  },
  {
    id: 'SG32510063928419',
    prefix: 'US - 30303',
    invoiceNo: 'DP-131-6789012-3456789',
    customerName: 'Steven Hall',
    customerEmail: 'steven.hall@email.com',
    customerPhone: '+1 404-555-8901',
    orderDate: '26 Sep, 2025',
    orderTime: '03:00 PM',
    weight: '1.6 kg',
    price: '₹ 2750.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'CR000516948994',
    carrier: 'DHL',
  },
  {
    id: 'SG32510063928420',
    prefix: 'CA - 94102',
    invoiceNo: 'DP-132-0123456-7890123',
    customerName: 'Betty Allen',
    customerEmail: 'betty.allen@email.com',
    customerPhone: '+1 415-555-2345',
    orderDate: '26 Sep, 2025',
    orderTime: '12:15 PM',
    weight: '0.8 kg',
    price: '₹ 2000.00',
    packageType: 'CSB-IV',
    status: 'delivered',
    trackingId: 'UU55A64987985120619',
    carrier: 'UPS',
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
    case 'ready':
      return { bg: '#E0E7FF', text: '#4F46E5' };
    case 'disputed':
      return { bg: '#FEE2E2', text: '#DC2626' };
    case 'draft':
      return { bg: '#F3F4F6', text: COLORS.gray };
    default:
      return { bg: COLORS.lightGray, text: COLORS.gray };
  }
};

// Sample draft orders
const draftOrders = [
  {
    id: 'SG32512204545620',
    prefix: 'US - 364050',
    invoiceNo: 'rwerwerwer',
    customerName: 'Dfsdf Dsfdf',
    customerEmail: 'dfasdfdsf@gmail.com',
    customerPhone: '8849966135',
    orderDate: '20 Dec, 2025',
    orderTime: '01:04 PM',
    weight: '1 kg',
    price: '₹ 1722.80',
    packageType: 'CSB-IV',
    status: 'draft',
  },
  {
    id: 'SG32512204545621',
    prefix: 'US - 90210',
    invoiceNo: 'INV-2025-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '9876543210',
    orderDate: '19 Dec, 2025',
    orderTime: '10:30 AM',
    weight: '2.5 kg',
    price: '₹ 2450.00',
    packageType: 'CSB-IV',
    status: 'draft',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function OrdersScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  useEffect(() => {
    if (params.tab) {
      setActiveTab(params.tab as string);
    }
  }, [params.tab]);

  // Filter orders based on active tab
  const filteredOrders = sampleOrders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'delivered') return order.status === 'delivered';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    if (activeTab === 'dispatched') return order.status === 'dispatched';
    if (activeTab === 'disputed') return order.status === 'disputed';
    if (activeTab === 'packed') return order.status === 'packed';
    if (activeTab === 'ready') return order.status === 'ready';
    return true;
  });

  // Calculate pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when changing filters or items per page
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  const renderOrderRow = (item: typeof sampleOrders[0], index: number) => {
    const statusColors = getStatusColor(item.status);

    return (
      <View key={item.id} style={styles.orderRow}>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>All Orders</Text>
          <Text style={styles.breadcrumb}>Orders {'>'} All</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(tabs)/add-order')}>
            <Ionicons name="add" size={18} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Order</Text>
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

      {/* Table Body - Full scroll */}
      <View style={styles.tableBody}>
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order, index) => renderOrderRow(order, index))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        )}
      </View>

      {/* Pagination */}
      {totalItems > 0 && (
        <View style={styles.paginationContainer}>
          {/* Showing X to Y of Z entries */}
          <Text style={styles.paginationInfo}>
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </Text>

          {/* Page Navigation */}
          <View style={styles.pageNavigation}>
            {/* First Page */}
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>|{'<'}</Text>
            </TouchableOpacity>

            {/* Previous Page */}
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>{'<'}</Text>
            </TouchableOpacity>

            {/* Page Numbers */}
            {getVisiblePages().map((page) => (
              <TouchableOpacity
                key={page}
                style={[styles.pageNumberButton, currentPage === page && styles.pageNumberActive]}
                onPress={() => handlePageChange(page)}
              >
                <Text style={[styles.pageNumberText, currentPage === page && styles.pageNumberTextActive]}>
                  {page}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Next Page */}
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>{'>'}</Text>
            </TouchableOpacity>

            {/* Last Page */}
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>{'>'}|</Text>
            </TouchableOpacity>
          </View>

          {/* Items per page dropdown */}
          <View style={styles.itemsPerPageContainer}>
            <Text style={styles.itemsPerPageLabel}>Items per page</Text>
            <TouchableOpacity
              style={styles.itemsPerPageDropdown}
              onPress={() => setShowItemsDropdown(!showItemsDropdown)}
            >
              <Text style={styles.itemsPerPageValue}>{itemsPerPage}</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.gray} />
            </TouchableOpacity>
            {showItemsDropdown && (
              <View style={styles.dropdownMenu}>
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.dropdownItem,
                      itemsPerPage === option && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setItemsPerPage(option);
                      setShowItemsDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        itemsPerPage === option && styles.dropdownItemTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* Bottom spacing */}
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
    minHeight: 200,
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
  // Pagination styles
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 16,
    flexWrap: 'wrap',
    gap: 16,
  },
  paginationInfo: {
    fontSize: 14,
    color: COLORS.gray,
  },
  pageNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },
  pageButtonText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  pageNumberActive: {
    backgroundColor: COLORS.primary,
  },
  pageNumberText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  pageNumberTextActive: {
    color: COLORS.white,
  },
  itemsPerPageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  itemsPerPageLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  itemsPerPageDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  itemsPerPageValue: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  dropdownMenu: {
    position: 'absolute',
    bottom: 45,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.lightGray,
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  dropdownItemTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
