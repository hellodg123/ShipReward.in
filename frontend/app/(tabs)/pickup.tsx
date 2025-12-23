import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  purple: '#8B5CF6',
  purpleLight: '#EDE9FE',
  border: '#E5E7EB',
};

// Sample pickup addresses
const pickupAddresses = [
  {
    id: '1',
    name: 'Hiren Vaghashiya',
    street: 'hiren, 477, ar mall, mota varachha',
    area: 'Mota Varachha',
    city: 'Surat',
    pincode: '394101',
    state: 'Gujarat',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    street: '123, Business Park, Andheri East',
    area: 'Andheri',
    city: 'Mumbai',
    pincode: '400069',
    state: 'Maharashtra',
  },
];

// Available pickup dates
const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    dates.push({
      id: `date-${i}`,
      label: `${day} ${month}`,
      fullDate: date.toISOString().split('T')[0],
    });
  }
  return dates;
};

// Sample pickup data
const pickupData = [
  {
    id: '1',
    pickupCode: 'PRSG251006349783',
    pickupDate: '06 Oct, 2025',
    pickupAddress: {
      name: 'hiren',
      street: '477, ar mall, mota varachha',
      city: 'Surat',
      pincode: '394101',
    },
    dateAdded: '06 Oct, 2025',
    timeAdded: '11:50 AM',
    orderWeight: '20 kg',
    packetCount: 50,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '2',
    pickupCode: 'PRSG250708264082',
    pickupDate: '09 Jul, 2025',
    pickupAddress: {
      name: 'surat',
      street: '477, AR Mall, Mota Varachha',
      city: 'Surat',
      pincode: '394101',
    },
    dateAdded: '08 Jul, 2025',
    timeAdded: '07:31 PM',
    orderWeight: '30 kg',
    packetCount: 30,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '3',
    pickupCode: 'PRSG250707262544',
    pickupDate: '08 Jul, 2025',
    pickupAddress: {
      name: 'surat',
      street: '477, AR Mall, Mota Varachha',
      city: 'Surat',
      pincode: '394101',
    },
    dateAdded: '07 Jul, 2025',
    timeAdded: '11:51 AM',
    orderWeight: '20 kg',
    packetCount: 20,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '4',
    pickupCode: 'PRSG250915478523',
    pickupDate: '15 Sep, 2025',
    pickupAddress: {
      name: 'Rajesh Kumar',
      street: '123, Business Park, Andheri East',
      city: 'Mumbai',
      pincode: '400069',
    },
    dateAdded: '14 Sep, 2025',
    timeAdded: '09:30 AM',
    orderWeight: '45 kg',
    packetCount: 75,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '5',
    pickupCode: 'PRSG250820369147',
    pickupDate: '20 Aug, 2025',
    pickupAddress: {
      name: 'Priya Sharma',
      street: '456, Tech Hub, Whitefield',
      city: 'Bangalore',
      pincode: '560066',
    },
    dateAdded: '19 Aug, 2025',
    timeAdded: '02:15 PM',
    orderWeight: '15 kg',
    packetCount: 25,
    createdBy: 'Vendor',
    status: 'picked',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'picked':
      return { bg: '#EDE9FE', text: '#7C3AED', border: '#7C3AED' };
    case 'cancelled':
      return { bg: '#FEE2E2', text: '#DC2626', border: '#DC2626' };
    case 'pending':
      return { bg: '#FEF3C7', text: '#D97706', border: '#D97706' };
    case 'scheduled':
      return { bg: '#DBEAFE', text: '#2563EB', border: '#2563EB' };
    default:
      return { bg: COLORS.lightGray, text: COLORS.gray, border: COLORS.gray };
  }
};

export default function PickupScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPickupAddress, setSelectedPickupAddress] = useState<string>('');
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [estimatedOrders, setEstimatedOrders] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState('');
  
  const availableDates = getAvailableDates();

  // Filter pickups based on search query
  const filteredPickups = pickupData.filter(pickup =>
    pickup.pickupCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pickup.pickupAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pickup.pickupAddress.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredPickups.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedPickups = filteredPickups.slice(startIndex, endIndex);

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

  const handleCreatePickup = () => {
    if (selectedPickupAddress && selectedDate) {
      setShowCreateModal(false);
      // Generate a new pickup code
      const newPickupCode = `PRSG${Date.now()}`;
      router.push(`/(tabs)/view-pickup?code=${newPickupCode}&addressId=${selectedPickupAddress}&date=${selectedDate}&orders=${estimatedOrders}&weight=${estimatedWeight}`);
      // Reset form
      setSelectedPickupAddress('');
      setSelectedDate('');
      setEstimatedOrders('');
      setEstimatedWeight('');
    }
  };

  const getSelectedAddressText = () => {
    const address = pickupAddresses.find(a => a.id === selectedPickupAddress);
    if (address) {
      return `${address.name}, ${address.street}, ${address.area}...`;
    }
    return '';
  };

  const renderPickupRow = (item: typeof pickupData[0]) => {
    const statusColors = getStatusColor(item.status);

    return (
      <View key={item.id} style={styles.tableRow}>
        <View style={styles.pickupCodeCell}>
          <Text style={styles.pickupCode}>{item.pickupCode}</Text>
        </View>
        <View style={styles.pickupDateCell}>
          <Text style={styles.dateText}>{item.pickupDate}</Text>
        </View>
        <View style={styles.addressCell}>
          <Text style={styles.addressName}>{item.pickupAddress.name}</Text>
          <Text style={styles.addressStreet}>{item.pickupAddress.street}</Text>
          <Text style={styles.addressCity}>{item.pickupAddress.city}</Text>
          <Text style={styles.addressPincode}>{item.pickupAddress.pincode}</Text>
        </View>
        <View style={styles.dateAddedCell}>
          <Text style={styles.dateText}>{item.dateAdded}</Text>
          <Text style={styles.timeText}>{item.timeAdded}</Text>
        </View>
        <View style={styles.detailsCell}>
          <Text style={styles.detailLabel}>Order Wt: <Text style={styles.detailValue}>{item.orderWeight}</Text></Text>
          <Text style={styles.detailLabel}>No. of Packet: <Text style={styles.detailValue}>{item.packetCount}</Text></Text>
          <Text style={styles.detailLabel}>Created by: <Text style={styles.detailValue}>{item.createdBy}</Text></Text>
        </View>
        <View style={styles.statusCell}>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg, borderColor: statusColors.border }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        <View style={styles.actionsCell}>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push(`/(tabs)/view-pickup?code=${item.pickupCode}`)}
          >
            <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => alert(`Cancel pickup: ${item.pickupCode}`)}
          >
            <Ionicons name="close-circle-outline" size={20} color={COLORS.red} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Pickup Requests</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowCreateModal(true)}>
              <Ionicons name="add" size={18} color={COLORS.white} />
              <Text style={styles.addButtonText}>Add Pickup Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={18} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter Pickup Code..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Table Header and Body - Conditional Horizontal Scroll for Mobile */}
        {isMobile ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableScrollContainer}>
            <View style={styles.tableWrapper}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <View style={styles.pickupCodeCell}>
                  <Text style={styles.headerText}>Pickup code</Text>
                </View>
                <View style={styles.pickupDateCell}>
                  <Text style={styles.headerText}>Pickup Date</Text>
                  <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                </View>
                <View style={styles.addressCell}>
                  <Text style={styles.headerText}>Pickup Address</Text>
                </View>
                <View style={styles.dateAddedCell}>
                  <Text style={styles.headerText}>Date Added</Text>
                  <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                </View>
                <View style={styles.detailsCell}>
                  <Text style={styles.headerText}>Pickup Details</Text>
                  <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
                </View>
                <View style={styles.statusCell}>
                  <Text style={styles.headerText}>Status</Text>
                </View>
                <View style={styles.viewCell}>
                  <Text style={styles.headerText}>Actions</Text>
                </View>
              </View>

              {/* Table Body */}
              <View style={styles.tableBody}>
                {paginatedPickups.length > 0 ? (
                  paginatedPickups.map((item) => renderPickupRow(item))
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons name="car-outline" size={48} color={COLORS.gray} />
                    <Text style={styles.emptyText}>No pickup requests found</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        ) : (
          <>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <View style={styles.pickupCodeCell}>
                <Text style={styles.headerText}>Pickup code</Text>
              </View>
              <View style={styles.pickupDateCell}>
                <Text style={styles.headerText}>Pickup Date</Text>
                <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
              </View>
              <View style={styles.addressCell}>
                <Text style={styles.headerText}>Pickup Address</Text>
              </View>
              <View style={styles.dateAddedCell}>
                <Text style={styles.headerText}>Date Added</Text>
                <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
              </View>
              <View style={styles.detailsCell}>
                <Text style={styles.headerText}>Pickup Details</Text>
                <Ionicons name="swap-vertical-outline" size={14} color={COLORS.gray} />
              </View>
              <View style={styles.statusCell}>
                <Text style={styles.headerText}>Status</Text>
              </View>
              <View style={styles.viewCell}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>

            {/* Table Body */}
            <View style={styles.tableBody}>
              {paginatedPickups.length > 0 ? (
                paginatedPickups.map((item) => renderPickupRow(item))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="car-outline" size={48} color={COLORS.gray} />
                  <Text style={styles.emptyText}>No pickup requests found</Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* Pagination */}
        {totalItems > 0 && (
          <View style={styles.paginationContainer}>
            <Text style={styles.paginationInfo}>
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </Text>

            <View style={styles.pageNavigation}>
              <TouchableOpacity
                style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                onPress={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <Text style={styles.pageButtonText}>|{'<'}</Text>
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
                onPress={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.pageButtonText}>{'>'}|</Text>
              </TouchableOpacity>
            </View>

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

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Create Pickup Request Modal */}
      <Modal
        visible={showCreateModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowCreateModal(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Pickup Request</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <View style={styles.modalBody}>
              {/* Select Pickup Address */}
              <View style={styles.modalField}>
                <Text style={styles.modalFieldLabel}>Select Pickup Address <Text style={styles.required}>*</Text></Text>
                <TouchableOpacity
                  style={styles.addressDropdownButton}
                  onPress={() => setShowAddressDropdown(!showAddressDropdown)}
                >
                  <Text style={selectedPickupAddress ? styles.addressDropdownText : styles.addressDropdownPlaceholder}>
                    {selectedPickupAddress ? getSelectedAddressText() : 'Select'}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={COLORS.gray} />
                </TouchableOpacity>

                {showAddressDropdown && (
                  <View style={styles.addressDropdownMenu}>
                    {pickupAddresses.map((address) => (
                      <TouchableOpacity
                        key={address.id}
                        style={styles.addressDropdownItem}
                        onPress={() => {
                          setSelectedPickupAddress(address.id);
                          setShowAddressDropdown(false);
                        }}
                      >
                        <Text style={styles.addressDropdownItemText}>
                          {address.name}, {address.street}, {address.area}...
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Available Pickup Dates */}
              <View style={styles.modalField}>
                <Text style={styles.modalFieldLabel}>Available Pickup Dates <Text style={styles.required}>*</Text></Text>
                <View style={styles.datesContainer}>
                  {availableDates.map((date) => (
                    <TouchableOpacity
                      key={date.id}
                      style={[
                        styles.dateButton,
                        selectedDate === date.fullDate && styles.dateButtonActive,
                      ]}
                      onPress={() => setSelectedDate(date.fullDate)}
                    >
                      <Text style={[
                        styles.dateButtonText,
                        selectedDate === date.fullDate && styles.dateButtonTextActive,
                      ]}>
                        {date.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Estimated Numbers of Orders */}
              <View style={styles.modalField}>
                <Text style={styles.modalFieldLabel}>Estimated Numbers of Orders <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter estimated orders"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  value={estimatedOrders}
                  onChangeText={setEstimatedOrders}
                />
              </View>

              {/* Estimated Weight */}
              <View style={styles.modalField}>
                <Text style={styles.modalFieldLabel}>Estimated Weight (in KG) <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter estimated weight"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  value={estimatedWeight}
                  onChangeText={setEstimatedWeight}
                />
              </View>
            </View>

            {/* Modal Footer */}
            <TouchableOpacity
              style={[styles.submitButton, (!selectedPickupAddress || !selectedDate) && styles.submitButtonDisabled]}
              onPress={handleCreatePickup}
              disabled={!selectedPickupAddress || !selectedDate}
            >
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
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
  // Table horizontal scroll
  tableScrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  tableWrapper: {
    minWidth: 900,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  pickupCodeCell: {
    flex: 1.2,
    minWidth: 140,
    paddingHorizontal: 8,
  },
  pickupDateCell: {
    flex: 0.8,
    minWidth: 100,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressCell: {
    flex: 1.5,
    minWidth: 180,
    paddingHorizontal: 8,
  },
  dateAddedCell: {
    flex: 0.8,
    minWidth: 100,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  detailsCell: {
    flex: 1.2,
    minWidth: 150,
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  statusCell: {
    flex: 0.7,
    minWidth: 90,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  viewCell: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsCell: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButton: {
    padding: 8,
  },
  tableBody: {
    minHeight: 200,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'flex-start',
  },
  pickupCode: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  addressName: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  addressStreet: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  addressCity: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  addressPincode: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  modalBody: {
    marginBottom: 24,
  },
  modalField: {
    marginBottom: 20,
  },
  modalFieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  required: {
    color: COLORS.red,
  },
  addressDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
  },
  addressDropdownText: {
    fontSize: 14,
    color: COLORS.darkGray,
    flex: 1,
    marginRight: 8,
  },
  addressDropdownPlaceholder: {
    fontSize: 14,
    color: COLORS.gray,
  },
  addressDropdownMenu: {
    marginTop: 4,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    maxHeight: 150,
  },
  addressDropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  addressDropdownItemText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateButtonText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  dateButtonTextActive: {
    color: COLORS.white,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.darkGray,
    backgroundColor: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
