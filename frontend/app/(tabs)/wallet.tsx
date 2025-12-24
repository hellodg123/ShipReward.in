import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

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

// Extended transaction data for pagination
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
  {
    id: '5',
    date: '07 Oct 25 - 11:30 AM',
    description: 'Wallet Recharge via UPI',
    orderId: 'TXN98765432101',
    amount: 500.00,
    status: 'Complete',
  },
  {
    id: '6',
    date: '06 Oct 25 - 03:45 PM',
    description: 'Shipping Charge Deduction:',
    orderId: 'SG325100639283H8 - Express',
    amount: -125.50,
    status: 'Complete',
  },
  {
    id: '7',
    date: '05 Oct 25 - 09:20 AM',
    description: 'Wallet Recharge via Card',
    orderId: 'TXN98765432102',
    amount: 1000.00,
    status: 'Complete',
  },
  {
    id: '8',
    date: '04 Oct 25 - 02:00 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283I9 - Dispute-Other',
    amount: -45.80,
    status: 'Complete',
  },
  {
    id: '9',
    date: '03 Oct 25 - 10:15 AM',
    description: 'Refund Credit:',
    orderId: 'SG325100639283J0 - Refund',
    amount: 89.99,
    status: 'Complete',
  },
  {
    id: '10',
    date: '02 Oct 25 - 04:30 PM',
    description: 'Shipping Charge Deduction:',
    orderId: 'SG325100639283K1 - Standard',
    amount: -75.25,
    status: 'Complete',
  },
  {
    id: '11',
    date: '01 Oct 25 - 11:45 AM',
    description: 'Wallet Recharge via Net Banking',
    orderId: 'TXN98765432103',
    amount: 2000.00,
    status: 'Complete',
  },
  {
    id: '12',
    date: '30 Sep 25 - 03:20 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283L2 - Dispute-Restricted',
    amount: -55.00,
    status: 'Complete',
  },
  {
    id: '13',
    date: '29 Sep 25 - 09:00 AM',
    description: 'Shipping Charge Deduction:',
    orderId: 'SG325100639283M3 - Express',
    amount: -150.75,
    status: 'Complete',
  },
  {
    id: '14',
    date: '28 Sep 25 - 02:45 PM',
    description: 'Cashback Credit:',
    orderId: 'PROMO-SEP2025',
    amount: 50.00,
    status: 'Complete',
  },
  {
    id: '15',
    date: '27 Sep 25 - 10:30 AM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283N4 - Dispute-Other',
    amount: -38.50,
    status: 'Complete',
  },
  {
    id: '16',
    date: '26 Sep 25 - 04:00 PM',
    description: 'Wallet Recharge via UPI',
    orderId: 'TXN98765432104',
    amount: 750.00,
    status: 'Complete',
  },
  {
    id: '17',
    date: '25 Sep 25 - 11:15 AM',
    description: 'Shipping Charge Deduction:',
    orderId: 'SG325100639283O5 - Standard',
    amount: -62.30,
    status: 'Complete',
  },
  {
    id: '18',
    date: '24 Sep 25 - 03:30 PM',
    description: 'Refund Credit:',
    orderId: 'SG325100639283P6 - Refund',
    amount: 112.45,
    status: 'Complete',
  },
  {
    id: '19',
    date: '23 Sep 25 - 09:45 AM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283Q7 - Dispute-Restricted',
    amount: -72.80,
    status: 'Complete',
  },
  {
    id: '20',
    date: '22 Sep 25 - 02:15 PM',
    description: 'Wallet Recharge via Card',
    orderId: 'TXN98765432105',
    amount: 1500.00,
    status: 'Complete',
  },
  {
    id: '21',
    date: '21 Sep 25 - 10:00 AM',
    description: 'Shipping Charge Deduction:',
    orderId: 'SG325100639283R8 - Express',
    amount: -95.60,
    status: 'Complete',
  },
  {
    id: '22',
    date: '20 Sep 25 - 04:45 PM',
    description: 'Wallet Deduction for Dispute Order:',
    orderId: 'SG325100639283S9 - Dispute-Other',
    amount: -28.75,
    status: 'Complete',
  },
  {
    id: '23',
    date: '19 Sep 25 - 11:30 AM',
    description: 'Promotional Credit:',
    orderId: 'WELCOME-BONUS',
    amount: 100.00,
    status: 'Complete',
  },
  {
    id: '24',
    date: '18 Sep 25 - 03:00 PM',
    description: 'Shipping Charge Deduction:',
    orderId: 'SG325100639283T0 - Standard',
    amount: -48.90,
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
  {
    id: '3',
    date: '01 Sep 25 - 11:00 AM',
    description: 'Wallet Recharge via Net Banking',
    transactionId: 'TXN456789123',
    amount: 2000,
    status: 'Success',
  },
  {
    id: '4',
    date: '15 Aug 25 - 02:30 PM',
    description: 'Wallet Recharge via UPI',
    transactionId: 'TXN789123456',
    amount: 750,
    status: 'Success',
  },
  {
    id: '5',
    date: '01 Aug 25 - 09:15 AM',
    description: 'Wallet Recharge via Card',
    transactionId: 'TXN321654987',
    amount: 1500,
    status: 'Success',
  },
  {
    id: '6',
    date: '15 Jul 25 - 04:00 PM',
    description: 'Wallet Recharge via UPI',
    transactionId: 'TXN654987321',
    amount: 300,
    status: 'Success',
  },
  {
    id: '7',
    date: '01 Jul 25 - 10:45 AM',
    description: 'Wallet Recharge via Net Banking',
    transactionId: 'TXN147258369',
    amount: 5000,
    status: 'Success',
  },
  {
    id: '8',
    date: '15 Jun 25 - 01:30 PM',
    description: 'Wallet Recharge via Card',
    transactionId: 'TXN369258147',
    amount: 800,
    status: 'Success',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function WalletScreen() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Get data based on active tab
  const currentData = activeTab === 'transactions' ? transactionHistory : rechargeHistory;

  // Calculate pagination
  const totalItems = currentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = currentData.slice(startIndex, endIndex);

  // Reset to page 1 when changing tabs or items per page
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

  const renderTransactionRow = (item: typeof transactionHistory[0]) => (
    <View key={item.id} style={styles.tableRow}>
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

  const renderRechargeRow = (item: typeof rechargeHistory[0]) => (
    <View key={item.id} style={styles.tableRow}>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScrollContainer}>
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
      </ScrollView>

      {/* Filter and Export */}
      <View style={styles.filterSection}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity 
          style={styles.exportButton}
          onPress={() => setShowExportDropdown(true)}
        >
          <Ionicons name="cloud-download-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header and Body - Conditional Horizontal Scroll for Mobile */}
      {isMobile ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableScrollContainer}>
          <View style={styles.tableWrapper}>
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
            <View style={styles.tableBody}>
              {paginatedData.length > 0 ? (
                activeTab === 'transactions' 
                  ? paginatedData.map((item) => renderTransactionRow(item as typeof transactionHistory[0]))
                  : paginatedData.map((item) => renderRechargeRow(item as typeof rechargeHistory[0]))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="wallet-outline" size={48} color={COLORS.gray} />
                  <Text style={styles.emptyText}>No transactions found</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <>
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
          <View style={styles.tableBody}>
            {paginatedData.length > 0 ? (
              activeTab === 'transactions' 
                ? paginatedData.map((item) => renderTransactionRow(item as typeof transactionHistory[0]))
                : paginatedData.map((item) => renderRechargeRow(item as typeof rechargeHistory[0]))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="wallet-outline" size={48} color={COLORS.gray} />
                <Text style={styles.emptyText}>No transactions found</Text>
              </View>
            )}
          </View>
        </>
      )}

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

    {/* Export Dropdown Modal */}
    <Modal
      visible={showExportDropdown}
      transparent
      animationType="fade"
      onRequestClose={() => setShowExportDropdown(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowExportDropdown(false)}>
        <View style={styles.exportModalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.exportDropdownContainer}>
              <TouchableOpacity 
                style={styles.exportDropdownItem}
                onPress={() => {
                  alert('Export as CSV');
                  setShowExportDropdown(false);
                }}
              >
                <Ionicons name="document-text-outline" size={18} color={COLORS.darkGray} />
                <Text style={styles.exportDropdownText}>Export as CSV</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.exportDropdownItem}
                onPress={() => {
                  alert('Export as Excel');
                  setShowExportDropdown(false);
                }}
              >
                <Ionicons name="grid-outline" size={18} color={COLORS.darkGray} />
                <Text style={styles.exportDropdownText}>Export as Excel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
  tabsScrollContainer: {
    marginBottom: 20,
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
  // Table horizontal scroll
  tableScrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  tableWrapper: {
    minWidth: 800,
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
    minHeight: 200,
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
  // Pagination styles
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
