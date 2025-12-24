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
  TouchableWithoutFeedback,
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
    phone: '8866394789',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    street: '123, Business Park, Andheri East',
    area: 'Andheri',
    city: 'Mumbai',
    pincode: '400069',
    state: 'Maharashtra',
    phone: '9876543210',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    street: '456, Tech Hub, Whitefield',
    area: 'Whitefield',
    city: 'Bangalore',
    pincode: '560066',
    state: 'Karnataka',
    phone: '8765432109',
  },
];

// Sample manifest data
const manifestData = [
  {
    id: '1',
    manifestCode: 'MSG26875251026633233',
    date: '26 Oct, 2025',
    time: '01:27 PM',
    pickupAddress: {
      name: 'hiren',
      street: '477, ar mall, mota varachha',
      city: 'Surat',
      pincode: '394101',
    },
    packetCount: 0,
    manifestValue: 0.00,
    status: 'open',
  },
  {
    id: '2',
    manifestCode: 'MSG26875251026633234',
    date: '25 Oct, 2025',
    time: '03:45 PM',
    pickupAddress: {
      name: 'Rajesh Kumar',
      street: '123, Business Park',
      city: 'Mumbai',
      pincode: '400001',
    },
    packetCount: 15,
    manifestValue: 12500.00,
    status: 'closed',
  },
  {
    id: '3',
    manifestCode: 'MSG26875251026633235',
    date: '24 Oct, 2025',
    time: '10:30 AM',
    pickupAddress: {
      name: 'Priya Sharma',
      street: '456, Tech Hub',
      city: 'Bangalore',
      pincode: '560001',
    },
    packetCount: 8,
    manifestValue: 7800.00,
    status: 'open',
  },
  {
    id: '4',
    manifestCode: 'MSG26875251026633236',
    date: '23 Oct, 2025',
    time: '02:15 PM',
    pickupAddress: {
      name: 'Amit Patel',
      street: '789, Industrial Estate',
      city: 'Ahmedabad',
      pincode: '380001',
    },
    packetCount: 25,
    manifestValue: 18500.00,
    status: 'closed',
  },
  {
    id: '5',
    manifestCode: 'MSG26875251026633237',
    date: '22 Oct, 2025',
    time: '11:00 AM',
    pickupAddress: {
      name: 'Neha Verma',
      street: '321, Commerce Center',
      city: 'Delhi',
      pincode: '110001',
    },
    packetCount: 12,
    manifestValue: 9200.00,
    status: 'open',
  },
  {
    id: '6',
    manifestCode: 'MSG26875251026633238',
    date: '21 Oct, 2025',
    time: '04:30 PM',
    pickupAddress: {
      name: 'Vikram Singh',
      street: '654, Logistics Park',
      city: 'Chennai',
      pincode: '600001',
    },
    packetCount: 30,
    manifestValue: 22000.00,
    status: 'closed',
  },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return { bg: '#EDE9FE', text: '#7C3AED', border: '#7C3AED' };
    case 'closed':
      return { bg: '#FEE2E2', text: '#DC2626', border: '#DC2626' };
    default:
      return { bg: COLORS.lightGray, text: COLORS.gray, border: COLORS.gray };
  }
};

export default function ManifestScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPickupAddress, setSelectedPickupAddress] = useState<string>('');
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Filter manifests based on search query
  const filteredManifests = manifestData.filter(manifest =>
    manifest.manifestCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manifest.pickupAddress.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manifest.pickupAddress.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredManifests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedManifests = filteredManifests.slice(startIndex, endIndex);

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

  const handleCreateManifest = () => {
    if (selectedPickupAddress) {
      setShowCreateModal(false);
      // Generate a new manifest code
      const newManifestCode = `MSG${Date.now()}`;
      router.push(`/(tabs)/view-manifest?code=${newManifestCode}&addressId=${selectedPickupAddress}`);
    }
  };

  const renderManifestRow = (item: typeof manifestData[0]) => {
    const statusColors = getStatusColor(item.status);

    return (
      <View key={item.id} style={styles.tableRow}>
        <View style={styles.checkboxCell}>
          <View style={styles.checkbox} />
        </View>
        <View style={styles.manifestCodeCell}>
          <Text style={styles.manifestCode}>{item.manifestCode}</Text>
        </View>
        <View style={styles.dateCell}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.addressCell}>
          <Text style={styles.addressName}>{item.pickupAddress.name}</Text>
          <Text style={styles.addressStreet}>{item.pickupAddress.street}</Text>
          <Text style={styles.addressCity}>{item.pickupAddress.city}</Text>
          <Text style={styles.addressPincode}>{item.pickupAddress.pincode}</Text>
        </View>
        <View style={styles.packetCell}>
          <Text style={styles.packetCount}>{item.packetCount}</Text>
        </View>
        <View style={styles.valueCell}>
          <Text style={styles.valueText}>{item.manifestValue.toFixed(2)}</Text>
        </View>
        <View style={styles.statusCell}>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg, borderColor: statusColors.border }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={styles.viewCell}>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => router.push(`/(tabs)/view-manifest?code=${item.manifestCode}`)}
          >
            <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getSelectedAddressText = () => {
    const address = pickupAddresses.find(a => a.id === selectedPickupAddress);
    if (address) {
      return `${address.name}, ${address.street}, ${address.city}, ${address.pincode}`;
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Manifests</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowCreateModal(true)}>
              <Ionicons name="add" size={18} color={COLORS.white} />
              <Text style={styles.addButtonText}>Add New Manifest</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={18} color={COLORS.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter Manifest Code..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
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
                <View style={styles.manifestCodeCell}>
                  <Text style={styles.headerText}>Manifest Code</Text>
                </View>
                <View style={styles.dateCell}>
                  <Text style={styles.headerText}>Date</Text>
                </View>
                <View style={styles.addressCell}>
                  <Text style={styles.headerText}>Pickup Address</Text>
                </View>
                <View style={styles.packetCell}>
                  <Text style={styles.headerText}>Packet Count</Text>
                </View>
                <View style={styles.valueCell}>
                  <Text style={styles.headerText}>Manifest Value</Text>
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
                {paginatedManifests.length > 0 ? (
                  paginatedManifests.map((item) => renderManifestRow(item))
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons name="document-text-outline" size={48} color={COLORS.gray} />
                    <Text style={styles.emptyText}>No manifests found</Text>
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
              <View style={styles.manifestCodeCell}>
                <Text style={styles.headerText}>Manifest Code</Text>
              </View>
              <View style={styles.dateCell}>
                <Text style={styles.headerText}>Date</Text>
              </View>
              <View style={styles.addressCell}>
                <Text style={styles.headerText}>Pickup Address</Text>
              </View>
              <View style={styles.packetCell}>
                <Text style={styles.headerText}>Packet Count</Text>
              </View>
              <View style={styles.valueCell}>
                <Text style={styles.headerText}>Manifest Value</Text>
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
              {paginatedManifests.length > 0 ? (
                paginatedManifests.map((item) => renderManifestRow(item))
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="document-text-outline" size={48} color={COLORS.gray} />
                  <Text style={styles.emptyText}>No manifests found</Text>
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

      {/* Create New Manifest Modal */}
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
              <Text style={styles.modalTitle}>Create New Manifest</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <View style={styles.modalBody}>
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
                        {address.name}, {address.street}, {address.city}, {address.pincode}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Modal Footer */}
            <TouchableOpacity
              style={[styles.submitButton, !selectedPickupAddress && styles.submitButtonDisabled]}
              onPress={handleCreateManifest}
              disabled={!selectedPickupAddress}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

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
  manifestCodeCell: {
    flex: 1.5,
    minWidth: 180,
    paddingHorizontal: 8,
  },
  dateCell: {
    flex: 0.8,
    minWidth: 100,
    paddingHorizontal: 8,
  },
  addressCell: {
    flex: 1.5,
    minWidth: 180,
    paddingHorizontal: 8,
  },
  packetCell: {
    flex: 0.6,
    minWidth: 80,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  valueCell: {
    flex: 0.8,
    minWidth: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statusCell: {
    flex: 0.6,
    minWidth: 80,
    paddingHorizontal: 8,
    alignItems: 'center',
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
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'flex-start',
  },
  manifestCode: {
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
  packetCount: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  valueText: {
    fontSize: 14,
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
    maxHeight: 200,
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
  exportModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 180,
    paddingRight: 24,
  },
  exportDropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 180,
  },
  exportDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  exportDropdownText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
});
