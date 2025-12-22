import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

// Color Scheme
const COLORS = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
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
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFF7ED',
  error: '#EF4444',
  errorLight: '#FEF2F2',
  cyan: '#06B6D4',
  cyanLight: '#ECFEFF',
  purple: '#8B5CF6',
  purpleLight: '#F3E8FF',
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

// Sample orders data for All Orders tab
const allOrdersData = [
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
    status: 'Delivered',
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
    status: 'Packed',
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
    status: 'Manifested',
    trackingId: 'CR000516948987',
    carrier: 'DHL',
  },
  {
    id: 'SG32512224553316',
    prefix: 'UK - 20005',
    invoiceNo: 'Inv no. DP-115-9876543-1234567',
    customerName: 'Emma Wilson',
    customerEmail: 'emma.wilson@email.com',
    customerPhone: '+44 20-7946-0958',
    orderDate: '20 Dec, 2025',
    orderTime: '09:30 AM',
    weight: '0.3 kg',
    price: '₹ 720.00',
    packageType: 'CSB-IV',
    status: 'Dispatched',
    trackingId: 'DHL789456123',
    carrier: 'DHL',
  },
];

// Sample draft orders data
const draftOrdersData = [
  {
    id: 'SG32512224554900',
    prefix: 'US - 95991',
    invoiceNo: 'Inv no. DP-120-1234567-8901234',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    customerPhone: '+1 555-123-4567',
    orderDate: '22 Dec, 2025',
    orderTime: '03:45 PM',
    weight: '0.15 kg',
    price: '₹ 350.00',
    packageType: 'CSB-IV',
    status: 'Draft',
  },
  {
    id: 'SG32512224554901',
    prefix: 'CA - 12345',
    invoiceNo: 'Inv no. DP-121-2345678-9012345',
    customerName: 'Mike Brown',
    customerEmail: 'mike.brown@email.com',
    customerPhone: '+1 416-555-7890',
    orderDate: '22 Dec, 2025',
    orderTime: '02:30 PM',
    weight: '0.35 kg',
    price: '₹ 580.00',
    packageType: 'CSB-IV',
    status: 'Draft',
  },
  {
    id: 'SG32512224554902',
    prefix: 'UK - 67890',
    invoiceNo: 'Inv no. DP-122-3456789-0123456',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@email.com',
    customerPhone: '+44 20-7123-4567',
    orderDate: '21 Dec, 2025',
    orderTime: '11:15 AM',
    weight: '0.55 kg',
    price: '₹ 920.00',
    packageType: 'CSB-IV',
    status: 'Draft',
  },
  {
    id: 'SG32512224554903',
    prefix: 'AU - 33333',
    invoiceNo: 'Inv no. DP-123-4567890-1234567',
    customerName: 'David Lee',
    customerEmail: 'david.lee@email.com',
    customerPhone: '+61 2-9876-5432',
    orderDate: '21 Dec, 2025',
    orderTime: '08:00 AM',
    weight: '0.25 kg',
    price: '₹ 450.00',
    packageType: 'CSB-IV',
    status: 'Draft',
  },
];

// Sample ready orders data
const readyOrdersData = [
  {
    id: 'SG32512224555000',
    prefix: 'US - 95991',
    invoiceNo: 'Inv no. DP-114-1127278-4180268',
    customerName: 'Kuljinder Kaur',
    customerEmail: 'ASHISHSAVANI477@GMAIL.COM',
    customerPhone: '+1 602-671-6610',
    orderDate: '22 Dec, 2025',
    orderTime: '07:35 PM',
    weight: '1.1 kg',
    price: '₹ 1506.86',
    packageType: 'CSB-IV',
    status: 'Ready For Packing',
  },
  {
    id: 'SG32512224555001',
    prefix: 'CA - 45678',
    invoiceNo: 'Inv no. DP-115-2238389-5291379',
    customerName: 'Robert Chen',
    customerEmail: 'robert.chen@email.com',
    customerPhone: '+1 416-789-0123',
    orderDate: '22 Dec, 2025',
    orderTime: '06:20 PM',
    weight: '0.8 kg',
    price: '₹ 1250.00',
    packageType: 'CSB-IV',
    status: 'Ready For Packing',
  },
  {
    id: 'SG32512224555002',
    prefix: 'UK - 78901',
    invoiceNo: 'Inv no. DP-116-3349490-6302480',
    customerName: 'Alice Thompson',
    customerEmail: 'alice.thompson@email.com',
    customerPhone: '+44 20-1234-5678',
    orderDate: '22 Dec, 2025',
    orderTime: '05:15 PM',
    weight: '0.6 kg',
    price: '₹ 980.50',
    packageType: 'CSB-IV',
    status: 'Ready For Packing',
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
  const [actionMenuOrderId, setActionMenuOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (params.tab) {
      setActiveTab(params.tab as string);
    }
  }, [params.tab]);

  // Get data based on active tab
  const getCurrentData = () => {
    if (activeTab === 'drafts') {
      return draftOrdersData;
    }
    if (activeTab === 'ready') {
      return readyOrdersData;
    }
    return allOrdersData.filter(order => {
      if (activeTab === 'all') return true;
      const statusMap: { [key: string]: string[] } = {
        packed: ['packed'],
        manifested: ['manifested'],
        dispatched: ['dispatched', 'Picked Up'],
        received: ['received', 'Delivered'],
        cancelled: ['cancelled'],
        disputed: ['disputed'],
      };
      return statusMap[activeTab]?.some(s => 
        order.status.toLowerCase().includes(s.toLowerCase())
      );
    });
  };

  const currentData = getCurrentData();
  
  const filteredOrders = currentData.filter(order => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return order.id.toLowerCase().includes(searchLower) ||
             (order.trackingId && order.trackingId.toLowerCase().includes(searchLower));
    }
    return true;
  });

  const totalEntries = filteredOrders.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalEntries);
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

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
      return { bg: COLORS.primaryLight, color: COLORS.primary };
    }
    if (statusLower.includes('delivered') || statusLower.includes('received')) {
      return { bg: COLORS.successLight, color: COLORS.success };
    }
    if (statusLower.includes('packed')) {
      return { bg: COLORS.cyanLight, color: COLORS.cyan };
    }
    if (statusLower.includes('manifested')) {
      return { bg: COLORS.purpleLight, color: COLORS.purple };
    }
    if (statusLower.includes('cancelled')) {
      return { bg: COLORS.errorLight, color: COLORS.error };
    }
    if (statusLower.includes('draft')) {
      return { bg: COLORS.warningLight, color: COLORS.warning };
    }
    return { bg: COLORS.lightGray, color: COLORS.gray };
  };

  const handleViewOrder = (orderId: string) => {
    router.push(`/(tabs)/view-order?id=${orderId}`);
  };

  const handleEditOrder = (orderId: string) => {
    setActionMenuOrderId(null);
    // Navigate to edit order page
    router.push(`/(tabs)/view-order?id=${orderId}&edit=true`);
  };

  const handleCancelOrder = (orderId: string) => {
    setActionMenuOrderId(null);
    // Handle cancel order logic
    alert(`Cancel order: ${orderId}`);
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

  const getPageTitle = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.label : 'All Orders';
  };

  // Render table for All Orders (and other non-draft tabs)
  const renderAllOrdersTable = () => (
    <View style={isMobile ? undefined : styles.tableContainerDesktop}>
      {isMobile ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableMobile}>
            {renderAllOrdersHeader()}
            {paginatedOrders.map(order => renderAllOrdersRow(order))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.tableDesktop}>
          {renderAllOrdersHeader()}
          {paginatedOrders.map(order => renderAllOrdersRow(order))}
        </View>
      )}
    </View>
  );

  const renderAllOrdersHeader = () => (
    <View style={[styles.tableHeader, isMobile ? styles.tableHeaderMobile : styles.tableHeaderDesktop]}>
      <View style={styles.cellCheckbox}>
        <TouchableOpacity 
          style={[styles.checkbox, selectAll && styles.checkboxSelected]}
          onPress={handleSelectAll}
        >
          {selectAll && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
        </TouchableOpacity>
      </View>
      <View style={isMobile ? styles.cellOrderIdMobile : styles.cellOrderId}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Order ID</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellCustomerMobile : styles.cellCustomer}>
        <Text style={styles.headerText}>Customer Details</Text>
      </View>
      <View style={isMobile ? styles.cellDateMobile : styles.cellDate}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Order Date</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellPackageMobile : styles.cellPackage}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Package Details</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellStatusMobile : styles.cellStatus}>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <View style={isMobile ? styles.cellLastMileMobile : styles.cellLastMile}>
        <Text style={styles.headerText}>Last Mile Details</Text>
      </View>
      <View style={isMobile ? styles.cellViewMobile : styles.cellView}>
        <Text style={styles.headerText}>View Order</Text>
      </View>
    </View>
  );

  const renderAllOrdersRow = (order: any) => {
    const statusStyle = getStatusStyle(order.status);
    const isSelected = selectedOrders.includes(order.id);
    
    return (
      <View key={order.id} style={[styles.tableRow, isMobile ? styles.tableRowMobile : styles.tableRowDesktop]}>
        <View style={styles.cellCheckbox}>
          <TouchableOpacity 
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => handleSelectOrder(order.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
          </TouchableOpacity>
        </View>
        <View style={isMobile ? styles.cellOrderIdMobile : styles.cellOrderId}>
          <Text style={styles.orderIdText}>{order.id}</Text>
          <Text style={styles.subText}>{order.prefix}</Text>
          <Text style={styles.subTextLight}>{order.invoiceNo}</Text>
        </View>
        <View style={isMobile ? styles.cellCustomerMobile : styles.cellCustomer}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.subText}>{order.customerEmail}</Text>
          <Text style={styles.subText}>{order.customerPhone}</Text>
        </View>
        <View style={isMobile ? styles.cellDateMobile : styles.cellDate}>
          <Text style={styles.dateText}>{order.orderDate}</Text>
          <Text style={styles.subText}>{order.orderTime}</Text>
        </View>
        <View style={isMobile ? styles.cellPackageMobile : styles.cellPackage}>
          <Text style={styles.weightText}>{order.weight}</Text>
          <Text style={styles.priceText}>{order.price}</Text>
          <Text style={styles.subText}>{order.packageType}</Text>
        </View>
        <View style={isMobile ? styles.cellStatusMobile : styles.cellStatus}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{order.status}</Text>
          </View>
        </View>
        <View style={isMobile ? styles.cellLastMileMobile : styles.cellLastMile}>
          {order.trackingId ? (
            <>
              <Text style={styles.trackingText}>{order.trackingId}</Text>
              <Text style={styles.subText}>{order.carrier}</Text>
              <View style={styles.trackingActions}>
                <TouchableOpacity style={styles.copyBtn}>
                  <Ionicons name="copy-outline" size={14} color={COLORS.gray} />
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={styles.noDataText}>-</Text>
          )}
        </View>
        <View style={isMobile ? styles.cellViewMobile : styles.cellView}>
          <TouchableOpacity onPress={() => handleViewOrder(order.id)}>
            <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render table for Drafts tab
  const renderDraftsTable = () => (
    <View style={isMobile ? undefined : styles.tableContainerDesktop}>
      {isMobile ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableMobile}>
            {renderDraftsHeader()}
            {paginatedOrders.map(order => renderDraftsRow(order))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.tableDesktop}>
          {renderDraftsHeader()}
          {paginatedOrders.map(order => renderDraftsRow(order))}
        </View>
      )}
    </View>
  );

  const renderDraftsHeader = () => (
    <View style={[styles.tableHeader, isMobile ? styles.tableHeaderMobile : styles.tableHeaderDesktop]}>
      <View style={styles.cellCheckbox}>
        <TouchableOpacity 
          style={[styles.checkbox, selectAll && styles.checkboxSelected]}
          onPress={handleSelectAll}
        >
          {selectAll && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
        </TouchableOpacity>
      </View>
      <View style={isMobile ? styles.cellOrderIdMobile : styles.cellOrderId}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Order ID</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellCustomerMobile : styles.cellCustomer}>
        <Text style={styles.headerText}>Customer Details</Text>
      </View>
      <View style={isMobile ? styles.cellDateMobile : styles.cellDate}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Order Date</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellPackageMobile : styles.cellPackage}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Package Details</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellStatusMobile : styles.cellStatus}>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <View style={isMobile ? styles.cellActionsMobile : styles.cellActions}>
        <Text style={styles.headerText}>Actions</Text>
      </View>
    </View>
  );

  const renderDraftsRow = (order: any) => {
    const statusStyle = getStatusStyle(order.status);
    const isSelected = selectedOrders.includes(order.id);
    const showMenu = actionMenuOrderId === order.id;
    
    return (
      <View key={order.id} style={[styles.tableRow, isMobile ? styles.tableRowMobile : styles.tableRowDesktop]}>
        <View style={styles.cellCheckbox}>
          <TouchableOpacity 
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => handleSelectOrder(order.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
          </TouchableOpacity>
        </View>
        <View style={isMobile ? styles.cellOrderIdMobile : styles.cellOrderId}>
          <Text style={styles.orderIdText}>{order.id}</Text>
          <Text style={styles.subText}>{order.prefix}</Text>
          <Text style={styles.subTextLight}>{order.invoiceNo}</Text>
        </View>
        <View style={isMobile ? styles.cellCustomerMobile : styles.cellCustomer}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.subText}>{order.customerEmail}</Text>
          <Text style={styles.subText}>{order.customerPhone}</Text>
        </View>
        <View style={isMobile ? styles.cellDateMobile : styles.cellDate}>
          <Text style={styles.dateText}>{order.orderDate}</Text>
          <Text style={styles.subText}>{order.orderTime}</Text>
        </View>
        <View style={isMobile ? styles.cellPackageMobile : styles.cellPackage}>
          <Text style={styles.weightText}>{order.weight}</Text>
          <Text style={styles.priceText}>{order.price}</Text>
          <Text style={styles.subText}>{order.packageType}</Text>
        </View>
        <View style={isMobile ? styles.cellStatusMobile : styles.cellStatus}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{order.status}</Text>
          </View>
        </View>
        <View style={isMobile ? styles.cellActionsMobile : styles.cellActions}>
          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={() => handleViewOrder(order.id)} style={styles.actionIcon}>
              <Ionicons name="eye-outline" size={18} color={COLORS.gray} />
            </TouchableOpacity>
            <View style={styles.actionMenuContainer}>
              <TouchableOpacity 
                onPress={() => setActionMenuOrderId(showMenu ? null : order.id)}
                style={styles.actionIcon}
              >
                <Ionicons name="ellipsis-vertical" size={18} color={COLORS.gray} />
              </TouchableOpacity>
              {showMenu && (
                <View style={styles.actionMenu}>
                  <TouchableOpacity 
                    style={styles.actionMenuItem}
                    onPress={() => handleEditOrder(order.id)}
                  >
                    <Text style={styles.actionMenuText}>Edit Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionMenuItem}
                    onPress={() => handleCancelOrder(order.id)}
                  >
                    <Text style={styles.actionMenuText}>Cancel Order</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Handle Ready tab actions
  const handlePrintInvoice = (orderId: string) => {
    setActionMenuOrderId(null);
    alert(`Print Invoice: ${orderId}`);
  };

  const handleCloneOrder = (orderId: string) => {
    setActionMenuOrderId(null);
    alert(`Clone Order: ${orderId}`);
  };

  const handleCancelReadyOrder = (orderId: string) => {
    setActionMenuOrderId(null);
    alert(`Cancel Order: ${orderId}`);
  };

  // Render table for Ready tab
  const renderReadyTable = () => (
    <View style={isMobile ? undefined : styles.tableContainerDesktop}>
      {isMobile ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View style={styles.tableMobile}>
            {renderReadyHeader()}
            {paginatedOrders.map(order => renderReadyRow(order))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.tableDesktop}>
          {renderReadyHeader()}
          {paginatedOrders.map(order => renderReadyRow(order))}
        </View>
      )}
    </View>
  );

  const renderReadyHeader = () => (
    <View style={[styles.tableHeader, isMobile ? styles.tableHeaderMobile : styles.tableHeaderDesktop]}>
      <View style={styles.cellCheckbox}>
        <TouchableOpacity 
          style={[styles.checkbox, selectAll && styles.checkboxSelected]}
          onPress={handleSelectAll}
        >
          {selectAll && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
        </TouchableOpacity>
      </View>
      <View style={isMobile ? styles.cellOrderIdMobile : styles.cellOrderId}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Order ID</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellCustomerMobile : styles.cellCustomer}>
        <Text style={styles.headerText}>Customer Details</Text>
      </View>
      <View style={isMobile ? styles.cellDateMobile : styles.cellDate}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Order Date</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellPackageMobile : styles.cellPackage}>
        <View style={styles.headerCellWithSort}>
          <Text style={styles.headerText}>Package Details</Text>
          <Ionicons name="swap-vertical-outline" size={12} color={COLORS.gray} />
        </View>
      </View>
      <View style={isMobile ? styles.cellStatusMobile : styles.cellStatus}>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <View style={isMobile ? styles.cellActionsMobile : styles.cellActions}>
        <Text style={styles.headerText}>Actions</Text>
      </View>
    </View>
  );

  const renderReadyRow = (order: any) => {
    const statusStyle = getStatusStyle(order.status);
    const isSelected = selectedOrders.includes(order.id);
    const showMenu = actionMenuOrderId === order.id;
    
    return (
      <View key={order.id} style={[styles.tableRow, isMobile ? styles.tableRowMobile : styles.tableRowDesktop]}>
        <View style={styles.cellCheckbox}>
          <TouchableOpacity 
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => handleSelectOrder(order.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
          </TouchableOpacity>
        </View>
        <View style={isMobile ? styles.cellOrderIdMobile : styles.cellOrderId}>
          <Text style={styles.orderIdText}>{order.id}</Text>
          <Text style={styles.subText}>{order.prefix}</Text>
          <Text style={styles.subTextLight}>{order.invoiceNo}</Text>
        </View>
        <View style={isMobile ? styles.cellCustomerMobile : styles.cellCustomer}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.subText}>{order.customerEmail}</Text>
          <Text style={styles.subText}>{order.customerPhone}</Text>
        </View>
        <View style={isMobile ? styles.cellDateMobile : styles.cellDate}>
          <Text style={styles.dateText}>{order.orderDate}</Text>
          <Text style={styles.subText}>{order.orderTime}</Text>
        </View>
        <View style={isMobile ? styles.cellPackageMobile : styles.cellPackage}>
          <Text style={styles.weightText}>{order.weight}</Text>
          <Text style={styles.priceText}>{order.price}</Text>
          <Text style={styles.subText}>{order.packageType}</Text>
        </View>
        <View style={isMobile ? styles.cellStatusMobile : styles.cellStatus}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{order.status}</Text>
          </View>
        </View>
        <View style={isMobile ? styles.cellActionsMobile : styles.cellActions}>
          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={() => handlePrintInvoice(order.id)} style={styles.actionIcon}>
              <Ionicons name="print-outline" size={18} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleViewOrder(order.id)} style={styles.actionIcon}>
              <Ionicons name="eye-outline" size={18} color={COLORS.gray} />
            </TouchableOpacity>
            <View style={styles.actionMenuContainer}>
              <TouchableOpacity 
                onPress={() => setActionMenuOrderId(showMenu ? null : order.id)}
                style={styles.actionIcon}
              >
                <Ionicons name="ellipsis-vertical" size={18} color={COLORS.gray} />
              </TouchableOpacity>
              {showMenu && (
                <View style={styles.actionMenu}>
                  <TouchableOpacity 
                    style={styles.actionMenuItem}
                    onPress={() => handlePrintInvoice(order.id)}
                  >
                    <Text style={styles.actionMenuText}>Print Invoice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionMenuItem}
                    onPress={() => handleCloneOrder(order.id)}
                  >
                    <Text style={styles.actionMenuText}>Clone Order</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionMenuItem, { borderBottomWidth: 0 }]}
                    onPress={() => handleCancelReadyOrder(order.id)}
                  >
                    <Text style={styles.actionMenuText}>Cancel Order</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>{getPageTitle()}</Text>
          <Text style={styles.breadcrumb}>Orders {'>'} {activeTab === 'all' ? 'All' : getPageTitle()}</Text>
        </View>
        <TouchableOpacity style={styles.addOrderBtn} onPress={() => router.push('/(tabs)/add-order')}>
          <Ionicons name="add" size={18} color={COLORS.white} />
          <Text style={styles.addOrderBtnText}>Add Order</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
        <View style={styles.tabsRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
                setSelectedOrders([]);
                setSelectAll(false);
              }}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Search and Export */}
      <View style={styles.filterRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Tracking Id..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        
        <View style={styles.exportContainer}>
          <TouchableOpacity 
            style={styles.exportBtn}
            onPress={() => setShowExportDropdown(!showExportDropdown)}
          >
            <Ionicons name="cloud-download-outline" size={18} color={COLORS.darkGray} />
            <Text style={styles.exportBtnText}>Export</Text>
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
                style={[styles.exportOption, { borderBottomWidth: 0 }]}
                onPress={() => setShowExportDropdown(false)}
              >
                <Text style={styles.exportOptionText}>Export as PDF</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Table */}
      {activeTab === 'drafts' ? renderDraftsTable() : 
       activeTab === 'ready' ? renderReadyTable() : 
       renderAllOrdersTable()}

      {/* Pagination */}
      <View style={isMobile ? styles.paginationRowMobile : styles.paginationRow}>
        <Text style={styles.showingText}>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {endIndex} of {totalEntries} entries
        </Text>

        <View style={styles.paginationControls}>
          <TouchableOpacity
            style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
            onPress={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageBtnText}>{'<<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pageBtn, currentPage === 1 && styles.pageBtnDisabled]}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageBtnText}>{'<'}</Text>
          </TouchableOpacity>
          
          {getVisiblePages().map((page) => (
            <TouchableOpacity
              key={page}
              style={[styles.pageNumBtn, currentPage === page && styles.pageNumBtnActive]}
              onPress={() => handlePageChange(page)}
            >
              <Text style={[styles.pageNumText, currentPage === page && styles.pageNumTextActive]}>
                {page}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageBtnText}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pageBtn, currentPage === totalPages && styles.pageBtnDisabled]}
            onPress={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageBtnText}>{'>>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemsPerPageRow}>
          <Text style={styles.itemsPerPageLabel}>Items per page</Text>
          <TouchableOpacity
            style={styles.itemsPerPageBtn}
            onPress={() => setShowItemsDropdown(!showItemsDropdown)}
          >
            <Text style={styles.itemsPerPageValue}>{itemsPerPage}</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.gray} />
          </TouchableOpacity>
          {showItemsDropdown && (
            <View style={styles.itemsDropdown}>
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.itemsOption, itemsPerPage === option && styles.itemsOptionActive]}
                  onPress={() => {
                    setItemsPerPage(option);
                    setShowItemsDropdown(false);
                    setCurrentPage(1);
                  }}
                >
                  <Text style={[styles.itemsOptionText, itemsPerPage === option && styles.itemsOptionTextActive]}>
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
    backgroundColor: COLORS.bgWhite,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  addOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  addOrderBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  tabsScroll: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 4,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textDark,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  tabTextActive: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  searchBox: {
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
  exportContainer: {
    position: 'relative',
  },
  exportBtn: {
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
  exportBtnText: {
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
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    zIndex: 9999,
    minWidth: 160,
  },
  exportOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  exportOptionText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  // Table styles
  tableContainerDesktop: {
    marginBottom: 16,
  },
  tableMobile: {
    minWidth: 1100,
  },
  tableDesktop: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tableHeaderMobile: {},
  tableHeaderDesktop: {},
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    paddingVertical: 14,
    alignItems: 'flex-start',
  },
  tableRowMobile: {},
  tableRowDesktop: {},
  // Cell styles - Checkbox
  cellCheckbox: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  // Cell styles - Mobile
  cellOrderIdMobile: { width: 170, paddingHorizontal: 8, flexDirection: 'column', gap: 2 },
  cellCustomerMobile: { width: 200, paddingHorizontal: 8, flexDirection: 'column', gap: 2 },
  cellDateMobile: { width: 110, paddingHorizontal: 8, flexDirection: 'column', gap: 2 },
  cellPackageMobile: { width: 110, paddingHorizontal: 8, flexDirection: 'column', gap: 2 },
  cellStatusMobile: { width: 100, paddingHorizontal: 8 },
  cellLastMileMobile: { width: 180, paddingHorizontal: 8 },
  cellViewMobile: { width: 80, paddingHorizontal: 8, alignItems: 'center' },
  cellActionsMobile: { width: 100, paddingHorizontal: 8 },
  // Cell styles - Desktop (flex-based) - for data rows
  cellOrderId: { flex: 2, paddingHorizontal: 8, minWidth: 150 },
  cellCustomer: { flex: 2.5, paddingHorizontal: 8, minWidth: 180 },
  cellDate: { flex: 1.2, paddingHorizontal: 8, minWidth: 100 },
  cellPackage: { flex: 1.2, paddingHorizontal: 8, minWidth: 100 },
  cellStatus: { flex: 1, paddingHorizontal: 8, minWidth: 90 },
  cellLastMile: { flex: 2, paddingHorizontal: 8, minWidth: 160 },
  cellView: { flex: 0.8, paddingHorizontal: 8, alignItems: 'center', minWidth: 70 },
  cellActions: { flex: 1, paddingHorizontal: 8, minWidth: 90 },
  // Header cell with sort icon
  headerCellWithSort: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // Text styles
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  subText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  subTextLight: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  weightText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  priceText: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  trackingText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  noDataText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trackingActions: {
    flexDirection: 'row',
    marginTop: 4,
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
  // Actions for drafts
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    padding: 4,
  },
  actionMenuContainer: {
    position: 'relative',
    zIndex: 9999,
  },
  actionMenu: {
    position: 'absolute',
    bottom: 28,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 50,
    zIndex: 99999,
    minWidth: 150,
  },
  actionMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  actionMenuText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  // Pagination
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexWrap: 'wrap',
    gap: 16,
  },
  paginationRowMobile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
    position: 'relative',
  },
  itemsPerPageLabel: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  itemsPerPageBtn: {
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
  itemsDropdown: {
    position: 'absolute',
    bottom: 36,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    zIndex: 9999,
  },
  itemsOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 80,
  },
  itemsOptionActive: {
    backgroundColor: COLORS.lightGray,
  },
  itemsOptionText: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  itemsOptionTextActive: {
    fontWeight: '600',
    color: COLORS.primary,
  },
});
