import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

// Color Scheme
const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  white: '#FFFFFF',
  bgWhite: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  textDark: '#1F2937',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  cyan: '#06B6D4',
  purple: '#8B5CF6',
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
    id: 'SG32512224554864',
    prefix: 'US - 33612',
    invoiceNo: 'Inv no. DP-114-8297781-8009853',
    customerName: 'Mahammad Naazeem Shaik',
    customerEmail: 'ASHISHSAVANI477@GMAIL.COM',
    customerPhone: '+1 415-419-8616',
    orderDate: '22 Dec, 2025',
    orderTime: '01:07 PM',
    weight: '0.05 kg',
    price: '₹ 476.72',
    packageType: 'CSB-IV',
    status: 'Picked Up',
    trackingId: 'UUS5CN4987718180989',
    carrier: 'UNI UNI',
  },
  {
    id: 'SG32512224554794',
    prefix: 'US - 98144',
    invoiceNo: 'Inv no. HV-114-1265569-7493835',
    customerName: 'Sezibel Cabrera',
    customerEmail: 'YASHDHAMELIYA477@GMAIL.COM',
    customerPhone: '+1 207-835-4259',
    orderDate: '22 Dec, 2025',
    orderTime: '12:55 PM',
    weight: '0.25 kg',
    price: '₹ 628.94',
    packageType: 'CSB-IV',
    status: 'Picked Up',
    trackingId: 'UUS5CN4989718184382',
    carrier: 'UNI UNI',
  },
  {
    id: 'SG32512224553313',
    prefix: 'US - 79423',
    invoiceNo: 'Inv no. DP-113-5218508-2365839',
    customerName: 'Roy Roy',
    customerEmail: 'ASHISHSAVANI477@GMAIL.COM',
    customerPhone: '+1 480-818-5344',
    orderDate: '22 Dec, 2025',
    orderTime: '01:07 PM',
    weight: '0.45 kg',
    price: '₹ 818.92',
    packageType: 'CSB-IV',
    status: 'Picked Up',
    trackingId: 'UUS5CN4989718184383',
    carrier: 'UNI UNI',
  },
  {
    id: 'SG32512224553314',
    prefix: 'US - 94520',
    invoiceNo: 'Inv no. DP-111-2884301-7196240',
    customerName: 'Armando Armando',
    customerEmail: 'HARDIKSOJITRA477@gmail.com',
    customerPhone: '+1 415-419-8616',
    orderDate: '21 Dec, 2025',
    orderTime: '02:30 PM',
    weight: '0.7 kg',
    price: '₹ 1951.72',
    packageType: 'CSB-IV',
    status: 'Delivered',
    trackingId: 'CR000516948986',
    carrier: 'Cirro',
  },
  {
    id: 'SG32512224553315',
    prefix: 'CA - 10001',
    invoiceNo: 'Inv no. DP-114-7894561-2365478',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1 212-555-7890',
    orderDate: '21 Dec, 2025',
    orderTime: '10:15 AM',
    weight: '0.5 kg',
    price: '₹ 1850.00',
    packageType: 'CSB-IV',
    status: 'Packed',
    trackingId: 'CR000516948987',
    carrier: 'DHL',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function OrdersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (params.tab) {
      setActiveTab(params.tab as string);
    }
  }, [params.tab]);

  const filteredOrders = sampleOrders.filter(order => {
    if (activeTab !== 'all') {
      const statusMap: { [key: string]: string[] } = {
        drafts: ['draft'],
        ready: ['ready'],
        packed: ['packed'],
        manifested: ['manifested'],
        dispatched: ['dispatched', 'Picked Up'],
        received: ['received', 'Delivered'],
        cancelled: ['cancelled'],
        disputed: ['disputed'],
      };
      if (!statusMap[activeTab]?.some(s => order.status.toLowerCase().includes(s.toLowerCase()))) {
        return false;
      }
    }
    if (searchQuery) {
      return order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
             order.trackingId.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const totalEntries = filteredOrders.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(o => o.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedOrders, orderId];
      setSelectedOrders(newSelected);
      if (newSelected.length === paginatedOrders.length) {
        setSelectAll(true);
      }
    }
  };

  const getStatusStyle = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('picked') || statusLower.includes('dispatched')) {
      return { backgroundColor: '#EFF6FF', color: COLORS.primary, borderColor: COLORS.primary };
    }
    if (statusLower.includes('delivered') || statusLower.includes('received')) {
      return { backgroundColor: '#ECFDF5', color: COLORS.success, borderColor: COLORS.success };
    }
    if (statusLower.includes('packed')) {
      return { backgroundColor: '#F0FDFA', color: COLORS.cyan, borderColor: COLORS.cyan };
    }
    if (statusLower.includes('cancelled')) {
      return { backgroundColor: '#FEF2F2', color: COLORS.error, borderColor: COLORS.error };
    }
    return { backgroundColor: '#FFF7ED', color: COLORS.warning, borderColor: COLORS.warning };
  };

  const handleViewOrder = (orderId: string) => {
    router.push(`/(tabs)/view-order?id=${orderId}`);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const renderOrderRow = (order: typeof sampleOrders[0]) => {
    const statusStyle = getStatusStyle(order.status);
    const isSelected = selectedOrders.includes(order.id);
    
    return (
      <View key={order.id} style={styles.tableRow}>
        {/* Checkbox */}
        <View style={styles.checkboxCell}>
          <TouchableOpacity 
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => handleSelectOrder(order.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
          </TouchableOpacity>
        </View>
        
        {/* Order ID */}
        <View style={styles.orderIdCell}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderPrefix}>{order.prefix}</Text>
          <Text style={styles.invoiceNo}>{order.invoiceNo}</Text>
        </View>
        
        {/* Customer Details */}
        <View style={styles.customerCell}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.customerEmail}>{order.customerEmail}</Text>
          <Text style={styles.customerPhone}>{order.customerPhone}</Text>
        </View>
        
        {/* Order Date */}
        <View style={styles.dateCell}>
          <Text style={styles.orderDate}>{order.orderDate}</Text>
          <Text style={styles.orderTime}>{order.orderTime}</Text>
        </View>
        
        {/* Package Details */}
        <View style={styles.packageCell}>
          <Text style={styles.packageWeight}>{order.weight}</Text>
          <Text style={styles.packagePrice}>{order.price}</Text>
          <Text style={styles.packageType}>{order.packageType}</Text>
        </View>
        
        {/* Status */}
        <View style={styles.statusCell}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, borderColor: statusStyle.borderColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{order.status}</Text>
          </View>
        </View>
        
        {/* Last Mile Details */}
        <View style={styles.lastMileCell}>
          {order.trackingId ? (
            <>
              <Text style={styles.trackingId}>{order.trackingId}</Text>
              <Text style={styles.carrier}>{order.carrier}</Text>
              <TouchableOpacity style={styles.copyBtn}>
                <Ionicons name="copy-outline" size={14} color={COLORS.gray} />
                <Text style={styles.copyText}>Copy</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.noTracking}>-</Text>
          )}
        </View>
        
        {/* View Order */}
        <View style={styles.viewCell}>
          <TouchableOpacity onPress={() => handleViewOrder(order.id)}>
            <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>All Orders</Text>
          <Text style={styles.breadcrumb}>Orders {'>'} All</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.addOrderButton}>
            <Ionicons name="add" size={18} color={COLORS.white} />
            <Text style={styles.addOrderButtonText}>Add Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScrollContainer}>
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
              }}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Search and Export - No gap */}
      <View style={styles.filterSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Tracking Id..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        
        {/* Export Button with Dropdown */}
        <View style={styles.exportWrapper}>
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={() => setShowExportDropdown(!showExportDropdown)}
          >
            <Ionicons name="cloud-download-outline" size={18} color={COLORS.darkGray} />
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
          
          {showExportDropdown && (
            <View style={styles.exportDropdown}>
              <TouchableOpacity 
                style={styles.exportOption}
                onPress={() => setShowExportDropdown(false)}
              >
                <Text style={styles.exportOptionText}>Export as XLSX</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.exportOption}
                onPress={() => setShowExportDropdown(false)}
              >
                <Text style={styles.exportOptionText}>Export as PDF</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Table - No horizontal scroll on desktop */}
      <View style={isMobile ? styles.tableScrollContainer : styles.tableContainer}>
        {isMobile ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.tableWrapper}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <View style={styles.checkboxCell}>
                  <TouchableOpacity 
                    style={[styles.checkbox, selectAll && styles.checkboxSelected]}
                    onPress={handleSelectAll}
                  >
                    {selectAll && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                  </TouchableOpacity>
                </View>
                <View style={styles.orderIdCell}>
                  <View style={styles.headerWithSort}>
                    <Text style={styles.headerText}>Order ID</Text>
                    <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                  </View>
                </View>
                <View style={styles.customerCell}>
                  <Text style={styles.headerText}>Customer Details</Text>
                </View>
                <View style={styles.dateCell}>
                  <View style={styles.headerWithSort}>
                    <Text style={styles.headerText}>Order Date</Text>
                    <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                  </View>
                </View>
                <View style={styles.packageCell}>
                  <View style={styles.headerWithSort}>
                    <Text style={styles.headerText}>Package Details</Text>
                    <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                  </View>
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
              {paginatedOrders.map(order => renderOrderRow(order))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.tableWrapperDesktop}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.checkboxCell}>
                <TouchableOpacity 
                  style={[styles.checkbox, selectAll && styles.checkboxSelected]}
                  onPress={handleSelectAll}
                >
                  {selectAll && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                </TouchableOpacity>
              </View>
              <View style={styles.orderIdCellDesktop}>
                <View style={styles.headerWithSort}>
                  <Text style={styles.headerText}>Order ID</Text>
                  <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                </View>
              </View>
              <View style={styles.customerCellDesktop}>
                <Text style={styles.headerText}>Customer Details</Text>
              </View>
              <View style={styles.dateCellDesktop}>
                <View style={styles.headerWithSort}>
                  <Text style={styles.headerText}>Order Date</Text>
                  <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                </View>
              </View>
              <View style={styles.packageCellDesktop}>
                <View style={styles.headerWithSort}>
                  <Text style={styles.headerText}>Package Details</Text>
                  <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                </View>
              </View>
              <View style={styles.statusCellDesktop}>
                <Text style={styles.headerText}>Status</Text>
              </View>
              <View style={styles.lastMileCellDesktop}>
                <Text style={styles.headerText}>Last Mile Details</Text>
              </View>
              <View style={styles.viewCellDesktop}>
                <Text style={styles.headerText}>View Order</Text>
              </View>
            </View>

            {/* Table Body Desktop */}
            {paginatedOrders.map(order => {
              const statusStyle = getStatusStyle(order.status);
              const isSelected = selectedOrders.includes(order.id);
              
              return (
                <View key={order.id} style={styles.tableRow}>
                  <View style={styles.checkboxCell}>
                    <TouchableOpacity 
                      style={[styles.checkbox, isSelected && styles.checkboxSelected]}
                      onPress={() => handleSelectOrder(order.id)}
                    >
                      {isSelected && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.orderIdCellDesktop}>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderPrefix}>{order.prefix}</Text>
                    <Text style={styles.invoiceNo}>{order.invoiceNo}</Text>
                  </View>
                  <View style={styles.customerCellDesktop}>
                    <Text style={styles.customerName}>{order.customerName}</Text>
                    <Text style={styles.customerEmail}>{order.customerEmail}</Text>
                    <Text style={styles.customerPhone}>{order.customerPhone}</Text>
                  </View>
                  <View style={styles.dateCellDesktop}>
                    <Text style={styles.orderDate}>{order.orderDate}</Text>
                    <Text style={styles.orderTime}>{order.orderTime}</Text>
                  </View>
                  <View style={styles.packageCellDesktop}>
                    <Text style={styles.packageWeight}>{order.weight}</Text>
                    <Text style={styles.packagePrice}>{order.price}</Text>
                    <Text style={styles.packageType}>{order.packageType}</Text>
                  </View>
                  <View style={styles.statusCellDesktop}>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, borderColor: statusStyle.borderColor }]}>
                      <Text style={[styles.statusText, { color: statusStyle.color }]}>{order.status}</Text>
                    </View>
                  </View>
                  <View style={styles.lastMileCellDesktop}>
                    {order.trackingId ? (
                      <>
                        <Text style={styles.trackingId}>{order.trackingId}</Text>
                        <Text style={styles.carrier}>{order.carrier}</Text>
                        <TouchableOpacity style={styles.copyBtn}>
                          <Ionicons name="copy-outline" size={14} color={COLORS.gray} />
                          <Text style={styles.copyText}>Copy</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <Text style={styles.noTracking}>-</Text>
                    )}
                  </View>
                  <View style={styles.viewCellDesktop}>
                    <TouchableOpacity onPress={() => handleViewOrder(order.id)}>
                      <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Pagination - Centered */}
      <View style={styles.paginationContainer}>
        {/* Showing X to Y of Z entries */}
        <Text style={styles.showingText}>
          Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
        </Text>

        {/* Page Navigation - Centered */}
        <View style={styles.paginationControls}>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
            onPress={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageButtonText}>{'<<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageButtonText}>{'<'}</Text>
          </TouchableOpacity>
          
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
          
          <TouchableOpacity
            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <Text style={styles.pageButtonText}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
            onPress={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <Text style={styles.pageButtonText}>{'>>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Items per page */}
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
                  style={[styles.dropdownItem, itemsPerPage === option && styles.dropdownItemActive]}
                  onPress={() => {
                    setItemsPerPage(option);
                    setShowItemsDropdown(false);
                    setCurrentPage(1);
                  }}
                >
                  <Text style={[styles.dropdownItemText, itemsPerPage === option && styles.dropdownItemTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: COLORS.bgWhite,
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
    color: COLORS.textDark,
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
  addOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  addOrderButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  tabsScrollContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textDark,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    maxWidth: 300,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  exportWrapper: {
    position: 'relative',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  exportDropdown: {
    position: 'absolute',
    top: 46,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    minWidth: 160,
  },
  exportOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  exportOptionText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  tableScrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  tableContainer: {
    flex: 1,
    marginBottom: 16,
  },
  tableWrapper: {
    minWidth: 1200,
  },
  tableWrapperDesktop: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 14,
  },
  headerWithSort: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  checkboxCell: {
    width: 40,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  // Mobile cells
  orderIdCell: { width: 180, paddingHorizontal: 8 },
  customerCell: { width: 200, paddingHorizontal: 8 },
  dateCell: { width: 120, paddingHorizontal: 8 },
  packageCell: { width: 120, paddingHorizontal: 8 },
  statusCell: { width: 100, paddingHorizontal: 8, alignItems: 'flex-start' },
  lastMileCell: { width: 200, paddingHorizontal: 8 },
  viewCell: { width: 80, paddingHorizontal: 8, alignItems: 'center' },
  // Desktop cells - flex based
  orderIdCellDesktop: { flex: 2, paddingHorizontal: 8, minWidth: 150 },
  customerCellDesktop: { flex: 2.5, paddingHorizontal: 8, minWidth: 180 },
  dateCellDesktop: { flex: 1.2, paddingHorizontal: 8, minWidth: 100 },
  packageCellDesktop: { flex: 1.2, paddingHorizontal: 8, minWidth: 100 },
  statusCellDesktop: { flex: 1, paddingHorizontal: 8, alignItems: 'flex-start', minWidth: 90 },
  lastMileCellDesktop: { flex: 2, paddingHorizontal: 8, minWidth: 160 },
  viewCellDesktop: { flex: 0.8, paddingHorizontal: 8, alignItems: 'center', minWidth: 70 },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  orderPrefix: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  invoiceNo: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  orderDate: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  packageWeight: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  packagePrice: {
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  packageType: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trackingId: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  carrier: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  copyText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  noTracking: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexWrap: 'wrap',
    gap: 16,
  },
  showingText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },
  pageButtonText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  pageNumberButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNumberActive: {
    backgroundColor: COLORS.primary,
  },
  pageNumberText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  pageNumberTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  itemsPerPageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  itemsPerPageLabel: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  itemsPerPageDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    backgroundColor: COLORS.white,
  },
  itemsPerPageValue: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 36,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 100,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 80,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.lightGray,
  },
  dropdownItemText: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  dropdownItemTextActive: {
    fontWeight: '600',
    color: COLORS.primary,
  },
});
