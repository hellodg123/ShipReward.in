import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
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
  border: '#E5E7EB',
};

// Extended invoice data for pagination
const invoiceData = [
  {
    id: '1',
    invoiceCode: 'SGINV2526DACM',
    date: '31-10-25',
    company: 'GHEVARIYA DHARMIN BHIKHABHAI',
    customer: 'Ghevariya Dharmin Bhikhabhai',
    gst: '',
  },
  {
    id: '2',
    invoiceCode: 'SGINV2526CJYY',
    date: '31-07-25',
    company: 'GHEVARIYA DHARMIN BHIKHABHAI',
    customer: 'Ghevariya Dharmin Bhikhabhai',
    gst: '',
  },
  {
    id: '3',
    invoiceCode: 'SGINV2526CEPJ',
    date: '30-06-25',
    company: 'GHEVARIYA DHARMIN BHIKHABHAI',
    customer: 'Ghevariya Dharmin Bhikhabhai',
    gst: '',
  },
  {
    id: '4',
    invoiceCode: 'SGINV2526BZRU',
    date: '31-05-25',
    company: 'GHEVARIYA DHARMIN BHIKHABHAI',
    customer: 'Ghevariya Dharmin Bhikhabhai',
    gst: '',
  },
  {
    id: '5',
    invoiceCode: 'SGINV2526BTMK',
    date: '30-04-25',
    company: 'SHIPREWARD LOGISTICS PVT LTD',
    customer: 'ShipReward Customer',
    gst: '27AADCS1234K1ZK',
  },
  {
    id: '6',
    invoiceCode: 'SGINV2526BNWZ',
    date: '31-03-25',
    company: 'SHIPREWARD LOGISTICS PVT LTD',
    customer: 'ShipReward Customer',
    gst: '27AADCS1234K1ZK',
  },
  {
    id: '7',
    invoiceCode: 'SGINV2526BHQP',
    date: '28-02-25',
    company: 'ABC EXPORTS INDIA',
    customer: 'Rajesh Kumar',
    gst: '24AABCU1234F1ZH',
  },
  {
    id: '8',
    invoiceCode: 'SGINV2526BCKA',
    date: '31-01-25',
    company: 'GLOBAL TRADING CO',
    customer: 'Priya Sharma',
    gst: '07AADCG5678P1ZQ',
  },
  {
    id: '9',
    invoiceCode: 'SGINV2525AZXY',
    date: '31-12-24',
    company: 'SUNRISE ENTERPRISES',
    customer: 'Amit Patel',
    gst: '27AADCS9876L1ZM',
  },
  {
    id: '10',
    invoiceCode: 'SGINV2525AVWU',
    date: '30-11-24',
    company: 'SUNSHINE LOGISTICS',
    customer: 'Neha Verma',
    gst: '33AABCS4567M1ZN',
  },
  {
    id: '11',
    invoiceCode: 'SGINV2525ARST',
    date: '31-10-24',
    company: 'EXPRESS CARGO PVT LTD',
    customer: 'Vikram Singh',
    gst: '06AADCE7890N1ZO',
  },
  {
    id: '12',
    invoiceCode: 'SGINV2525ANOP',
    date: '30-09-24',
    company: 'FAST TRACK SHIPPING',
    customer: 'Anjali Gupta',
    gst: '09AABCF1234O1ZP',
  },
  {
    id: '13',
    invoiceCode: 'SGINV2525AJKL',
    date: '31-08-24',
    company: 'RELIABLE TRANSPORT',
    customer: 'Sanjay Mehta',
    gst: '27AADCR5678P1ZQ',
  },
  {
    id: '14',
    invoiceCode: 'SGINV2525AFGH',
    date: '31-07-24',
    company: 'SWIFT MOVERS',
    customer: 'Kavita Reddy',
    gst: '36AABCS9012Q1ZR',
  },
  {
    id: '15',
    invoiceCode: 'SGINV2525ABCD',
    date: '30-06-24',
    company: 'PREMIER LOGISTICS',
    customer: 'Rohit Malhotra',
    gst: '29AADCP3456R1ZS',
  },
  {
    id: '16',
    invoiceCode: 'SGINV2524ZXYW',
    date: '31-05-24',
    company: 'OCEANIC FREIGHT',
    customer: 'Deepika Joshi',
    gst: '21AABCO7890S1ZT',
  },
  {
    id: '17',
    invoiceCode: 'SGINV2524VUTS',
    date: '30-04-24',
    company: 'AIR CARGO EXPRESS',
    customer: 'Manish Agarwal',
    gst: '07AADCA1234T1ZU',
  },
  {
    id: '18',
    invoiceCode: 'SGINV2524RQPO',
    date: '31-03-24',
    company: 'CONTINENTAL SHIPPING',
    customer: 'Sunita Nair',
    gst: '32AABCC5678U1ZV',
  },
  {
    id: '19',
    invoiceCode: 'SGINV2524NMLK',
    date: '29-02-24',
    company: 'GLOBAL CARRIERS',
    customer: 'Arun Krishnan',
    gst: '33AADCG9012V1ZW',
  },
  {
    id: '20',
    invoiceCode: 'SGINV2524JIHG',
    date: '31-01-24',
    company: 'RAPID DELIVERY SERVICES',
    customer: 'Pooja Bhatia',
    gst: '06AABCR3456W1ZX',
  },
  {
    id: '21',
    invoiceCode: 'SGINV2523FEDC',
    date: '31-12-23',
    company: 'SECURE TRANSPORT CO',
    customer: 'Nitin Saxena',
    gst: '09AADCS7890X1ZY',
  },
  {
    id: '22',
    invoiceCode: 'SGINV2523BAZY',
    date: '30-11-23',
    company: 'NATIONWIDE LOGISTICS',
    customer: 'Meera Iyer',
    gst: '27AABCN1234Y1ZZ',
  },
  {
    id: '23',
    invoiceCode: 'SGINV2523XWVU',
    date: '31-10-23',
    company: 'PREMIUM CARGO SOLUTIONS',
    customer: 'Suresh Pillai',
    gst: '32AADCP5678Z1AA',
  },
  {
    id: '24',
    invoiceCode: 'SGINV2523TSRQ',
    date: '30-09-23',
    company: 'ELITE SHIPPING SERVICES',
    customer: 'Lakshmi Menon',
    gst: '29AABCE9012A1AB',
  },
  {
    id: '25',
    invoiceCode: 'SGINV2523PONM',
    date: '31-08-23',
    company: 'DIAMOND FREIGHT',
    customer: 'Rahul Kapoor',
    gst: '07AADCD3456B1AC',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function InvoiceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Filter invoices based on search query
  const filteredInvoices = invoiceData.filter(invoice =>
    invoice.invoiceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredInvoices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

  // Reset to page 1 when changing search or items per page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

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

  const renderInvoiceRow = (item: typeof invoiceData[0], index: number) => (
    <View key={item.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}>
      <View style={styles.checkboxCell}>
        <View style={styles.checkbox} />
      </View>
      <View style={[styles.tableCell, { flex: 1.2 }]}>
        <Text style={styles.invoiceCode}>{item.invoiceCode}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 0.8 }]}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 1.5 }]}>
        <Text style={styles.companyText}>{item.company}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 1.5 }]}>
        <Text style={styles.customerText}>{item.customer}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.gstText}>{item.gst || '-'}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 0.5, alignItems: 'center' }]}>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download-outline" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Invoices</Text>
          <Text style={styles.breadcrumb}>Documents {'>'} Invoices</Text>
        </View>
      </View>

      {/* Tab - Only Invoices */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Invoices</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filterSection}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Invoice Code..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="cloud-download-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bulkInvoiceButton}>
          <Ionicons name="document-text-outline" size={18} color={COLORS.gray} />
          <Text style={styles.bulkInvoiceButtonText}>Bulk Invoice</Text>
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
              <View style={[styles.tableHeaderCell, { flex: 1.2 }]}>
                <Text style={styles.tableHeaderText}>Invoice code</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 0.8 }]}>
                <Text style={styles.tableHeaderText}>Date</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 1.5 }]}>
                <Text style={styles.tableHeaderText}>Company</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 1.5 }]}>
                <Text style={styles.tableHeaderText}>Customer</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 1 }]}>
                <Text style={styles.tableHeaderText}>GST</Text>
              </View>
              <View style={[styles.tableHeaderCell, { flex: 0.5, alignItems: 'center' }]}>
                <Text style={styles.tableHeaderText}>Actions</Text>
              </View>
            </View>

            {/* Table Body */}
            <View style={styles.tableBody}>
              {paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((item, index) => renderInvoiceRow(item, index))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="document-text-outline" size={48} color={COLORS.gray} />
                  <Text style={styles.emptyText}>No invoices found</Text>
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
            <View style={[styles.tableHeaderCell, { flex: 1.2 }]}>
              <Text style={styles.tableHeaderText}>Invoice code</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 0.8 }]}>
              <Text style={styles.tableHeaderText}>Date</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 1.5 }]}>
              <Text style={styles.tableHeaderText}>Company</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 1.5 }]}>
              <Text style={styles.tableHeaderText}>Customer</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 1 }]}>
              <Text style={styles.tableHeaderText}>GST</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 0.5, alignItems: 'center' }]}>
              <Text style={styles.tableHeaderText}>Actions</Text>
            </View>
          </View>

          {/* Table Body */}
          <View style={styles.tableBody}>
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((item, index) => renderInvoiceRow(item, index))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={48} color={COLORS.gray} />
                <Text style={styles.emptyText}>No invoices found</Text>
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
    flexWrap: 'wrap',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  bulkInvoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },
  bulkInvoiceButtonText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  // Table horizontal scroll
  tableScrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  tableWrapper: {
    minWidth: 800,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  tableHeaderCell: {
    paddingHorizontal: 8,
  },
  tableHeaderText: {
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
  tableBody: {
    minHeight: 200,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: COLORS.white,
  },
  tableCell: {
    paddingHorizontal: 8,
  },
  invoiceCode: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  companyText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  customerText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  gstText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  downloadButton: {
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
