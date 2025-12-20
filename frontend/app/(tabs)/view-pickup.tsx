import React, { useState, useEffect } from 'react';
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

// Sample picked orders data
const pickedOrdersData = [
  {
    id: '1',
    orderId: 'SG32510063928304',
    orderDate: '6 Oct 2025',
    orderWeight: '0.7 kg',
    billWeight: '0.7 kg',
    manifestCode: '',
  },
  {
    id: '2',
    orderId: 'SG32510063928386',
    orderDate: '6 Oct 2025',
    orderWeight: '0.7 kg',
    billWeight: '0.7 kg',
    manifestCode: '',
  },
  {
    id: '3',
    orderId: 'SG32510063928367',
    orderDate: '6 Oct 2025',
    orderWeight: '0.7 kg',
    billWeight: '0.7 kg',
    manifestCode: '',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function ViewPickupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pickupCode = (params.code as string) || 'PRSG251006349783';

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  // Pickup address
  const pickupAddress = {
    name: 'Hiren Vaghasiya',
    street: 'Hiren, 477, ar mall, mota varachha',
    area: 'Surat',
    locality: 'Mota varachha',
    pincode: '394101',
    country: 'India',
  };

  // Summary data
  const manifestedDetails = {
    totalOrder: 3,
    totalWeight: 2.10,
  };

  const additionalDetails = {
    totalOrder: 50,
    totalWeight: 20.00,
  };

  const pickupSummary = {
    pickupDate: '6 Oct 2025',
    totalOrders: 3,
    totalWeight: 2.10,
  };

  // Pagination calculations
  const totalItems = pickedOrdersData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = pickedOrdersData.slice(startIndex, endIndex);

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.pageTitle}>Pickup Code : </Text>
              <Text style={styles.pickupCode}>{pickupCode}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Picked</Text>
              </View>
            </View>
            <Text style={styles.breadcrumb}>Pickups {'>'} View</Text>
          </View>
        </View>
      </View>

      {/* Address and Summary Row */}
      <View style={styles.addressSummaryRow}>
        {/* Address */}
        <View style={styles.addressSection}>
          <View style={styles.addressIcon}>
            <Ionicons name="location-outline" size={20} color={COLORS.gray} />
          </View>
          <View style={styles.addressContent}>
            <Text style={styles.addressName}>{pickupAddress.name}</Text>
            <Text style={styles.addressText}>
              {pickupAddress.street}, {pickupAddress.area}, {pickupAddress.locality}, {pickupAddress.pincode}, {pickupAddress.country}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryItem}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.gray} />
            <View>
              <Text style={styles.summaryLabel}>{pickupSummary.pickupDate}</Text>
              <Text style={styles.summarySubLabel}>Pickup Date</Text>
            </View>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="cube-outline" size={18} color={COLORS.gray} />
            <View>
              <Text style={styles.summaryLabel}>{pickupSummary.totalOrders}</Text>
              <Text style={styles.summarySubLabel}>Total Orders</Text>
            </View>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="scale-outline" size={18} color={COLORS.gray} />
            <View>
              <Text style={styles.summaryLabel}>{pickupSummary.totalWeight.toFixed(2)} kg</Text>
              <Text style={styles.summarySubLabel}>Total Weight</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.cardsContainer}>
        {/* Manifested Order Details */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Manifested Order Details</Text>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <View style={styles.cardIconBox}>
                <Ionicons name="cube-outline" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.cardValue}>{manifestedDetails.totalOrder}</Text>
                <Text style={styles.cardLabel}>Total Order</Text>
              </View>
            </View>
            <View style={styles.cardRow}>
              <View style={styles.cardIconBox}>
                <Ionicons name="person-outline" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.cardValue}>{manifestedDetails.totalWeight.toFixed(2)} kg</Text>
                <Text style={styles.cardLabel}>Total Weight</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Order Details */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Additional Order Details</Text>
          <View style={styles.cardContent}>
            <View style={styles.cardRow}>
              <View style={styles.cardIconBox}>
                <Ionicons name="cube-outline" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.cardValue}>{additionalDetails.totalOrder}</Text>
                <Text style={styles.cardLabel}>Total Order</Text>
              </View>
            </View>
            <View style={styles.cardRow}>
              <View style={styles.cardIconBox}>
                <Ionicons name="person-outline" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.cardValue}>{additionalDetails.totalWeight.toFixed(2)} kg</Text>
                <Text style={styles.cardLabel}>Total Weight</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Picked Orders Table */}
      <View style={styles.tableSection}>
        <Text style={styles.tableSectionTitle}>Picked Orders</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.tableCell, { flex: 1.5 }]}>
            <Text style={styles.tableHeaderText}>Order ID</Text>
          </View>
          <View style={[styles.tableCell, { flex: 1 }]}>
            <Text style={styles.tableHeaderText}>Order Date</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.8 }]}>
            <Text style={styles.tableHeaderText}>Order Weight</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.8 }]}>
            <Text style={styles.tableHeaderText}>Bill Weight</Text>
          </View>
          <View style={[styles.tableCell, { flex: 1.2 }]}>
            <Text style={styles.tableHeaderText}>Manifest Code</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.5, alignItems: 'center' }]}>
            <Text style={styles.tableHeaderText}>View</Text>
          </View>
        </View>

        {/* Table Body */}
        {paginatedOrders.map((order) => (
          <View key={order.id} style={styles.tableRow}>
            <View style={[styles.tableCell, { flex: 1.5 }]}>
              <Text style={styles.orderIdText}>{order.orderId}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 1 }]}>
              <Text style={styles.tableCellText}>{order.orderDate}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 0.8 }]}>
              <Text style={styles.tableCellText}>{order.orderWeight}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 0.8 }]}>
              <Text style={styles.tableCellText}>{order.billWeight}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 1.2 }]}>
              <Text style={styles.tableCellText}>{order.manifestCode || '-'}</Text>
            </View>
            <View style={[styles.tableCell, { flex: 0.5, alignItems: 'center' }]}>
              <TouchableOpacity style={styles.viewButton}>
                <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <View style={styles.pageNavigation}>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButtonText}>{'<'}</Text>
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
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>{'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.pageButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.paginationInfo}>
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </Text>

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
      </View>

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
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginTop: 2,
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
  pickupCode: {
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
  breadcrumb: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  addressSummaryRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  addressSection: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    minWidth: 300,
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 8,
  },
  addressIcon: {
    marginTop: 2,
  },
  addressContent: {
    flex: 1,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 20,
  },
  summarySection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  summarySubLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  summaryCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  tableSection: {
    marginBottom: 24,
  },
  tableSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  tableCell: {
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  tableCellText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  viewButton: {
    padding: 8,
  },
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
  paginationInfo: {
    fontSize: 14,
    color: COLORS.gray,
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
