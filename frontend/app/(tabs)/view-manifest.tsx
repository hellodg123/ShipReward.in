import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const COLORS = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  success: '#10B981',
  successLight: '#D1FAE5',
  purple: '#7C3AED',
  purpleLight: '#EDE9FE',
};

// Sample orders for Same Address
const sameAddressOrders = [
  {
    id: 'SG32512224554864',
    customerName: 'Mahammad Naazeem Shaik',
    customerPhone: '+1 415-419-8616',
    orderDate: '22 Dec, 2025',
    orderTime: '01:07 PM',
    weight: '0.4 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'UUS5CN4987718180989',
  },
  {
    id: 'SG32512224554865',
    customerName: 'Sezibel Cabrera',
    customerPhone: '+1 207-835-4259',
    orderDate: '22 Dec, 2025',
    orderTime: '12:55 PM',
    weight: '0.25 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'UUS5CN4989718184382',
  },
  {
    id: 'SG32512224554866',
    customerName: 'Roy Roy',
    customerPhone: '+1 480-818-5344',
    orderDate: '22 Dec, 2025',
    orderTime: '01:07 PM',
    weight: '0.45 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'UUS5CN4989718184383',
  },
  {
    id: 'SG32512224554867',
    customerName: 'Armando Armando',
    customerPhone: '+1 415-419-8616',
    orderDate: '21 Dec, 2025',
    orderTime: '02:30 PM',
    weight: '0.7 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'CR000516948986',
  },
  {
    id: 'SG32512224554868',
    customerName: 'John Smith',
    customerPhone: '+1 212-555-7890',
    orderDate: '21 Dec, 2025',
    orderTime: '10:15 AM',
    weight: '0.5 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'CR000516948987',
  },
  {
    id: 'SG32512224554869',
    customerName: 'Emma Wilson',
    customerPhone: '+44 20-7946-0958',
    orderDate: '20 Dec, 2025',
    orderTime: '09:30 AM',
    weight: '0.3 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DHL789456123',
  },
  {
    id: 'SG32512224554870',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 555-123-4567',
    orderDate: '20 Dec, 2025',
    orderTime: '03:45 PM',
    weight: '0.15 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DHL789456124',
  },
  {
    id: 'SG32512224554871',
    customerName: 'Mike Brown',
    customerPhone: '+1 416-555-7890',
    orderDate: '19 Dec, 2025',
    orderTime: '02:30 PM',
    weight: '0.35 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DHL789456125',
  },
  {
    id: 'SG32512224554872',
    customerName: 'Lisa Anderson',
    customerPhone: '+44 20-7123-4567',
    orderDate: '19 Dec, 2025',
    orderTime: '11:15 AM',
    weight: '0.55 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DHL789456126',
  },
  {
    id: 'SG32512224554873',
    customerName: 'David Lee',
    customerPhone: '+61 2-9876-5432',
    orderDate: '18 Dec, 2025',
    orderTime: '08:00 AM',
    weight: '0.25 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DHL789456127',
  },
  {
    id: 'SG32512224554874',
    customerName: 'James Wilson',
    customerPhone: '+1 555-987-6543',
    orderDate: '18 Dec, 2025',
    orderTime: '10:30 AM',
    weight: '0.8 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'PKD000123456',
  },
  {
    id: 'SG32512224554875',
    customerName: 'Emily Davis',
    customerPhone: '+1 416-123-4567',
    orderDate: '17 Dec, 2025',
    orderTime: '04:15 PM',
    weight: '0.5 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'PKD000123457',
  },
  {
    id: 'SG32512224554876',
    customerName: 'Oliver Brown',
    customerPhone: '+44 20-5555-1234',
    orderDate: '17 Dec, 2025',
    orderTime: '09:00 AM',
    weight: '1.2 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'MNF000789012',
  },
  {
    id: 'SG32512224554877',
    customerName: 'Charlotte Miller',
    customerPhone: '+61 2-1234-5678',
    orderDate: '16 Dec, 2025',
    orderTime: '02:30 PM',
    weight: '0.9 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'MNF000789013',
  },
  {
    id: 'SG32512224554878',
    customerName: 'William Johnson',
    customerPhone: '+1 555-111-2222',
    orderDate: '16 Dec, 2025',
    orderTime: '11:30 AM',
    weight: '0.6 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DSP000456789',
  },
  {
    id: 'SG32512224554879',
    customerName: 'Sophia Garcia',
    customerPhone: '+1 416-333-4444',
    orderDate: '15 Dec, 2025',
    orderTime: '03:45 PM',
    weight: '1.0 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'DSP000456790',
  },
  {
    id: 'SG32512224554880',
    customerName: 'Benjamin Taylor',
    customerPhone: '+44 20-6666-7777',
    orderDate: '15 Dec, 2025',
    orderTime: '10:00 AM',
    weight: '0.4 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'RCV000111222',
  },
  {
    id: 'SG32512224554881',
    customerName: 'Mia Anderson',
    customerPhone: '+61 2-8888-9999',
    orderDate: '14 Dec, 2025',
    orderTime: '01:15 PM',
    weight: '0.7 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'RCV000111223',
  },
  {
    id: 'SG32512224554882',
    customerName: 'Alexander White',
    customerPhone: '+1 555-222-3333',
    orderDate: '14 Dec, 2025',
    orderTime: '09:30 AM',
    weight: '0.3 kg',
    packageType: 'CSB-IV',
    address: '477, ar mall, mota varachha, Surat, 394101',
    lastMileAWB: 'CAN000222333',
  },
];

// Sample other address orders (with dummy data)
const otherAddressOrders = [
  {
    id: 'SG32512224554890',
    customerName: 'Robert Chen',
    customerPhone: '+1 555-444-3333',
    orderDate: '23 Dec, 2025',
    orderTime: '10:30 AM',
    weight: '0.6 kg',
    packageType: 'CSB-IV',
    address: '123, Main Street, Los Angeles, 90001',
    lastMileAWB: 'UUS5CN4987718181001',
  },
  {
    id: 'SG32512224554891',
    customerName: 'Jessica Martinez',
    customerPhone: '+1 555-222-1111',
    orderDate: '23 Dec, 2025',
    orderTime: '11:45 AM',
    weight: '0.35 kg',
    packageType: 'CSB-IV',
    address: '456, Oak Avenue, Chicago, 60601',
    lastMileAWB: 'UUS5CN4987718181002',
  },
  {
    id: 'SG32512224554892',
    customerName: 'Michael Thompson',
    customerPhone: '+44 20-7654-3210',
    orderDate: '22 Dec, 2025',
    orderTime: '02:15 PM',
    weight: '0.8 kg',
    packageType: 'CSB-IV',
    address: '789, Park Lane, London, SW1A 1AA',
    lastMileAWB: 'UUS5CN4987718181003',
  },
];

// Sample manifested orders (with dummy data)
const manifestedOrders = [
  {
    id: 'SG32512224554900',
    customerName: 'Andrew Wilson',
    customerPhone: '+1 555-888-7777',
    orderDate: '20 Dec, 2025',
    orderTime: '09:00 AM',
    weight: '0.5 kg',
    packageType: 'CSB-IV',
    address: '321, Broadway St, New York, 10001',
    lastMileAWB: 'MNF5CN4987718182001',
  },
  {
    id: 'SG32512224554901',
    customerName: 'Linda Brown',
    customerPhone: '+1 555-666-5555',
    orderDate: '19 Dec, 2025',
    orderTime: '03:30 PM',
    weight: '1.2 kg',
    packageType: 'CSB-IV',
    address: '654, Market St, San Francisco, 94102',
    lastMileAWB: 'MNF5CN4987718182002',
  },
  {
    id: 'SG32512224554902',
    customerName: 'Daniel Garcia',
    customerPhone: '+61 2-9999-8888',
    orderDate: '18 Dec, 2025',
    orderTime: '11:00 AM',
    weight: '0.75 kg',
    packageType: 'CSB-IV',
    address: '987, George St, Sydney, 2000',
    lastMileAWB: 'MNF5CN4987718182003',
  },
  {
    id: 'SG32512224554903',
    customerName: 'Emma Davis',
    customerPhone: '+44 20-1234-5678',
    orderDate: '17 Dec, 2025',
    orderTime: '04:45 PM',
    weight: '0.4 kg',
    packageType: 'CSB-IV',
    address: '159, Oxford St, Manchester, M1 1AA',
    lastMileAWB: 'MNF5CN4987718182004',
  },
];

const ITEMS_PER_PAGE = 10;

export default function ViewManifestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const manifestCode = params.code || 'MSG4576525123699213';

  // Pagination states
  const [sameAddressPage, setSameAddressPage] = useState(1);
  const [otherAddressPage, setOtherAddressPage] = useState(1);
  const [manifestedPage, setManifestedPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Calculate pagination for same address orders
  const totalSameAddressItems = sameAddressOrders.length;
  const totalSameAddressPages = Math.ceil(totalSameAddressItems / ITEMS_PER_PAGE);
  const sameAddressStartIndex = (sameAddressPage - 1) * ITEMS_PER_PAGE;
  const sameAddressEndIndex = Math.min(sameAddressStartIndex + ITEMS_PER_PAGE, totalSameAddressItems);
  const paginatedSameAddressOrders = sameAddressOrders.slice(sameAddressStartIndex, sameAddressEndIndex);

  const handleViewOrder = (orderId: string) => {
    router.push(`/(tabs)/view-order?id=${orderId}`);
  };

  const handleAddToManifest = (orderId: string) => {
    alert(`Added order ${orderId} to manifest`);
  };

  const handleBulkAddToManifest = () => {
    if (selectedOrders.length === 0) {
      alert('Please select orders to add');
      return;
    }
    alert(`Added ${selectedOrders.length} orders to manifest`);
    setSelectedOrders([]);
  };

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = (orders: any[]) => {
    const orderIds = orders.map(o => o.id);
    const allSelected = orderIds.every(id => selectedOrders.includes(id));
    if (allSelected) {
      setSelectedOrders(selectedOrders.filter(id => !orderIds.includes(id)));
    } else {
      const newSelected = [...selectedOrders];
      orderIds.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      setSelectedOrders(newSelected);
    }
  };

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const pages: number[] = [];
    const maxVisible = 3;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  const renderOrderRow = (order: any, showAddButton: boolean = true) => {
    const isSelected = selectedOrders.includes(order.id);
    
    return (
      <View key={order.id} style={styles.tableRow}>
        <View style={styles.checkboxCell}>
          <TouchableOpacity 
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => handleSelectOrder(order.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
          </TouchableOpacity>
        </View>
        <View style={styles.orderIdCell}>
          <Text style={styles.orderId}>{order.id}</Text>
        </View>
        <View style={styles.customerCell}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.customerPhone}>{order.customerPhone}</Text>
        </View>
        <View style={styles.dateCell}>
          <Text style={styles.dateText}>{order.orderDate}</Text>
          <Text style={styles.timeText}>{order.orderTime}</Text>
        </View>
        <View style={styles.packageCell}>
          <Text style={styles.weightText}>{order.weight}</Text>
          <Text style={styles.packageType}>{order.packageType}</Text>
        </View>
        <View style={styles.addressCell}>
          <Text style={styles.addressText} numberOfLines={2}>{order.address}</Text>
        </View>
        <View style={styles.awbCell}>
          <Text style={styles.awbText}>{order.lastMileAWB}</Text>
        </View>
        <View style={styles.viewCell}>
          <TouchableOpacity onPress={() => handleViewOrder(order.id)}>
            <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        {showAddButton && (
          <View style={styles.actionCell}>
            <TouchableOpacity 
              style={styles.addToManifestBtn}
              onPress={() => handleAddToManifest(order.id)}
            >
              <Text style={styles.addToManifestBtnText}>Add to Manifest</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderTableHeader = (showAddButton: boolean = true) => (
    <View style={styles.tableHeader}>
      <View style={styles.checkboxCell}>
        <View style={styles.checkbox} />
      </View>
      <View style={styles.orderIdCell}>
        <Text style={styles.headerText}>Order ID</Text>
      </View>
      <View style={styles.customerCell}>
        <Text style={styles.headerText}>Customer Details</Text>
      </View>
      <View style={styles.dateCell}>
        <Text style={styles.headerText}>Order Date</Text>
      </View>
      <View style={styles.packageCell}>
        <Text style={styles.headerText}>Package Details</Text>
      </View>
      <View style={styles.addressCell}>
        <Text style={styles.headerText}>Address</Text>
      </View>
      <View style={styles.awbCell}>
        <Text style={styles.headerText}>Last Mile AWB</Text>
      </View>
      <View style={styles.viewCell}>
        <Text style={styles.headerText}>View Order</Text>
      </View>
      {showAddButton && (
        <View style={styles.actionCell}>
          <Text style={styles.headerText}>Action</Text>
        </View>
      )}
    </View>
  );

  const renderPagination = (
    currentPage: number, 
    totalPages: number, 
    totalItems: number,
    startIndex: number,
    endIndex: number,
    onPageChange: (page: number) => void
  ) => {
    if (totalItems === 0) return null;

    return (
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationInfo}>
          Showing {startIndex + 1} to {endIndex} of {totalItems} entries
        </Text>
        <View style={styles.paginationControls}>
          <TouchableOpacity
            style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
            onPress={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageBtnText}>{'<'}</Text>
          </TouchableOpacity>
          {getVisiblePages(currentPage, totalPages).map((page) => (
            <TouchableOpacity
              key={page}
              style={[styles.pageNumBtn, currentPage === page && styles.pageNumBtnActive]}
              onPress={() => onPageChange(page)}
            >
              <Text style={[styles.pageNumText, currentPage === page && styles.pageNumTextActive]}>
                {page}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]}
            onPress={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageBtnText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemsPerPageRow}>
          <Text style={styles.itemsPerPageLabel}>Items per page</Text>
          <View style={styles.itemsPerPageBtn}>
            <Text style={styles.itemsPerPageValue}>{ITEMS_PER_PAGE}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTable = (orders: any[], showAddButton: boolean = true) => {
    if (isMobile) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableMobile}>
            {renderTableHeader(showAddButton)}
            {orders.length > 0 ? (
              orders.map(order => renderOrderRow(order, showAddButton))
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No results.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      );
    }

    return (
      <View>
        {renderTableHeader(showAddButton)}
        {orders.length > 0 ? (
          orders.map(order => renderOrderRow(order, showAddButton))
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No results.</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.breadcrumb}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/manifest')}>
            <Text style={styles.breadcrumbText}>Manifest</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> {'>'} </Text>
          <Text style={styles.breadcrumbActive}>View</Text>
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>View Manifest : {manifestCode}</Text>
          <View style={styles.headerActions}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Open</Text>
            </View>
            <TouchableOpacity style={styles.pickupDateBtn}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.gray} />
              <Text style={styles.pickupDateText}>Select Pickup Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Address Info */}
      <View style={styles.addressInfo}>
        <Ionicons name="location-outline" size={24} color={COLORS.primary} />
        <View style={styles.addressDetails}>
          <Text style={styles.manifestAddress}>
            Chirag Vaghasiya, Surat, 477, ar mall, mota varachha, Mota varachha, Surat, 394101
          </Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>Rs. 0.00</Text>
          <Text style={styles.statLabel}>Shipment Cost</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>Rs. 0.00</Text>
          <Text style={styles.statLabel}>Total Invoice Value</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0 KG</Text>
          <Text style={styles.statLabel}>Total Order Weight</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Box Count</Text>
        </View>
      </View>

      {/* Same Address Orders Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Same Address Orders</Text>
          <TouchableOpacity style={styles.bulkAddBtn} onPress={handleBulkAddToManifest}>
            <Ionicons name="add" size={16} color={COLORS.white} />
            <Text style={styles.bulkAddBtnText}>Bulk Add to Manifest</Text>
          </TouchableOpacity>
        </View>
        {renderTable(paginatedSameAddressOrders)}
        {renderPagination(
          sameAddressPage,
          totalSameAddressPages,
          totalSameAddressItems,
          sameAddressStartIndex,
          sameAddressEndIndex,
          setSameAddressPage
        )}
      </View>

      {/* Other Address Orders Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Other Address Orders</Text>
        </View>
        {renderTable(otherAddressOrders)}
      </View>

      {/* Manifested Orders Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Manifested Orders</Text>
        </View>
        {renderTable(manifestedOrders, false)}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: isMobile ? 12 : 24,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  breadcrumbText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: COLORS.gray,
  },
  breadcrumbActive: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    backgroundColor: COLORS.purpleLight,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.purple,
  },
  pickupDateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pickupDateText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: 20,
  },
  addressDetails: {
    flex: 1,
  },
  manifestAddress: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  bulkAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bulkAddBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  tableMobile: {
    minWidth: 1100,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    alignItems: 'flex-start',
  },
  checkboxCell: {
    width: 40,
    alignItems: 'center',
    paddingTop: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  orderIdCell: {
    width: 150,
    paddingHorizontal: 8,
  },
  orderId: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  customerCell: {
    width: 160,
    paddingHorizontal: 8,
  },
  customerName: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  customerPhone: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  dateCell: {
    width: 100,
    paddingHorizontal: 8,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  packageCell: {
    width: 90,
    paddingHorizontal: 8,
  },
  weightText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  packageType: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  addressCell: {
    width: 180,
    paddingHorizontal: 8,
  },
  addressText: {
    fontSize: 12,
    color: COLORS.gray,
    lineHeight: 18,
  },
  awbCell: {
    width: 140,
    paddingHorizontal: 8,
  },
  awbText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  viewCell: {
    width: 70,
    alignItems: 'center',
  },
  actionCell: {
    width: 130,
    paddingHorizontal: 8,
  },
  addToManifestBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addToManifestBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.white,
  },
  noResults: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  paginationContainer: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
    gap: 12,
  },
  paginationInfo: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pageBtnDisabled: {
    opacity: 0.4,
  },
  pageBtnText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  pageNumBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumBtnActive: {
    backgroundColor: COLORS.primary,
  },
  pageNumText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  pageNumTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  itemsPerPageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemsPerPageLabel: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  itemsPerPageBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemsPerPageValue: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
});
