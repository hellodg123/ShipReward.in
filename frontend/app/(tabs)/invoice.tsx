import React, { useState } from 'react';
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

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  border: '#E5E7EB',
};

// Sample invoice data
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
];

export default function InvoiceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredInvoices = invoiceData.filter(invoice =>
    invoice.invoiceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderInvoiceRow = ({ item, index }: { item: typeof invoiceData[0]; index: number }) => (
    <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}>
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
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.filterButtonText}>More Filters</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bulkInvoiceButton}>
          <Ionicons name="document-text-outline" size={18} color={COLORS.gray} />
          <Text style={styles.bulkInvoiceButtonText}>Bulk Invoice</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
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
        <FlatList
          data={filteredInvoices}
          renderItem={renderInvoiceRow}
          keyExtractor={(item) => item.id}
          style={styles.tableBody}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={48} color={COLORS.gray} />
              <Text style={styles.emptyText}>No invoices found</Text>
            </View>
          }
        />
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <Text style={styles.paginationInfo}>
          Showing 1 to {filteredInvoices.length} of {filteredInvoices.length} entries
        </Text>
        <View style={styles.paginationControls}>
          <TouchableOpacity style={styles.paginationButton} disabled>
            <Ionicons name="play-back" size={14} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationButton} disabled>
            <Ionicons name="chevron-back" size={14} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paginationButton, styles.paginationButtonActive]}>
            <Text style={styles.paginationButtonActiveText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationButton} disabled>
            <Ionicons name="chevron-forward" size={14} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationButton} disabled>
            <Ionicons name="play-forward" size={14} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsPerPage}>
          <Text style={styles.itemsPerPageText}>Items per page</Text>
          <TouchableOpacity style={styles.itemsPerPageSelect}>
            <Text style={styles.itemsPerPageValue}>{itemsPerPage}</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
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
  tableContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    flex: 1,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  paginationInfo: {
    fontSize: 13,
    color: COLORS.gray,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paginationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  paginationButtonActive: {
    backgroundColor: COLORS.primary,
  },
  paginationButtonActiveText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  itemsPerPage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemsPerPageText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  itemsPerPageSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
  },
  itemsPerPageValue: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
});
