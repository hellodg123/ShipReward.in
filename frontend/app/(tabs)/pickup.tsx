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
  {
    id: '6',
    pickupCode: 'PRSG250725159632',
    pickupDate: '25 Jul, 2025',
    pickupAddress: {
      name: 'Amit Patel',
      street: '789, Industrial Estate, Naroda',
      city: 'Ahmedabad',
      pincode: '382330',
    },
    dateAdded: '24 Jul, 2025',
    timeAdded: '04:45 PM',
    orderWeight: '55 kg',
    packetCount: 80,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '7',
    pickupCode: 'PRSG251001852369',
    pickupDate: '01 Oct, 2025',
    pickupAddress: {
      name: 'Neha Verma',
      street: '321, Commerce Center, Connaught Place',
      city: 'Delhi',
      pincode: '110001',
    },
    dateAdded: '30 Sep, 2025',
    timeAdded: '10:00 AM',
    orderWeight: '25 kg',
    packetCount: 40,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '8',
    pickupCode: 'PRSG250905741258',
    pickupDate: '05 Sep, 2025',
    pickupAddress: {
      name: 'Vikram Singh',
      street: '654, Logistics Park, Guindy',
      city: 'Chennai',
      pincode: '600032',
    },
    dateAdded: '04 Sep, 2025',
    timeAdded: '03:30 PM',
    orderWeight: '60 kg',
    packetCount: 90,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '9',
    pickupCode: 'PRSG250812963574',
    pickupDate: '12 Aug, 2025',
    pickupAddress: {
      name: 'Anjali Gupta',
      street: '987, Trade Center, Salt Lake',
      city: 'Kolkata',
      pincode: '700091',
    },
    dateAdded: '11 Aug, 2025',
    timeAdded: '11:20 AM',
    orderWeight: '10 kg',
    packetCount: 15,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '10',
    pickupCode: 'PRSG250928147852',
    pickupDate: '28 Sep, 2025',
    pickupAddress: {
      name: 'Sanjay Mehta',
      street: '147, Export Zone, Hinjewadi',
      city: 'Pune',
      pincode: '411057',
    },
    dateAdded: '27 Sep, 2025',
    timeAdded: '01:45 PM',
    orderWeight: '35 kg',
    packetCount: 55,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '11',
    pickupCode: 'PRSG250730258963',
    pickupDate: '30 Jul, 2025',
    pickupAddress: {
      name: 'Kavita Reddy',
      street: '258, IT Park, Madhapur',
      city: 'Hyderabad',
      pincode: '500081',
    },
    dateAdded: '29 Jul, 2025',
    timeAdded: '05:00 PM',
    orderWeight: '40 kg',
    packetCount: 65,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '12',
    pickupCode: 'PRSG250817369741',
    pickupDate: '17 Aug, 2025',
    pickupAddress: {
      name: 'Rohit Malhotra',
      street: '369, Warehouse Complex, Mansarovar',
      city: 'Jaipur',
      pincode: '302020',
    },
    dateAdded: '16 Aug, 2025',
    timeAdded: '08:30 AM',
    orderWeight: '18 kg',
    packetCount: 28,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '13',
    pickupCode: 'PRSG250922478521',
    pickupDate: '22 Sep, 2025',
    pickupAddress: {
      name: 'Deepika Joshi',
      street: '741, Shipping Hub, Gomti Nagar',
      city: 'Lucknow',
      pincode: '226010',
    },
    dateAdded: '21 Sep, 2025',
    timeAdded: '12:00 PM',
    orderWeight: '12 kg',
    packetCount: 18,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '14',
    pickupCode: 'PRSG250805852147',
    pickupDate: '05 Aug, 2025',
    pickupAddress: {
      name: 'Manish Agarwal',
      street: '852, Cargo Point, Vijay Nagar',
      city: 'Indore',
      pincode: '452010',
    },
    dateAdded: '04 Aug, 2025',
    timeAdded: '02:30 PM',
    orderWeight: '28 kg',
    packetCount: 42,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '15',
    pickupCode: 'PRSG250910963258',
    pickupDate: '10 Sep, 2025',
    pickupAddress: {
      name: 'Sunita Nair',
      street: '963, Distribution Center, Edappally',
      city: 'Kochi',
      pincode: '682024',
    },
    dateAdded: '09 Sep, 2025',
    timeAdded: '04:15 PM',
    orderWeight: '38 kg',
    packetCount: 58,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '16',
    pickupCode: 'PRSG250802174963',
    pickupDate: '02 Aug, 2025',
    pickupAddress: {
      name: 'Arun Krishnan',
      street: '174, Freight Terminal, Gandhipuram',
      city: 'Coimbatore',
      pincode: '641012',
    },
    dateAdded: '01 Aug, 2025',
    timeAdded: '09:45 AM',
    orderWeight: '70 kg',
    packetCount: 100,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '17',
    pickupCode: 'PRSG250925285741',
    pickupDate: '25 Sep, 2025',
    pickupAddress: {
      name: 'Pooja Bhatia',
      street: '285, Express Depot, Sector 17',
      city: 'Chandigarh',
      pincode: '160017',
    },
    dateAdded: '24 Sep, 2025',
    timeAdded: '11:30 AM',
    orderWeight: '16 kg',
    packetCount: 24,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '18',
    pickupCode: 'PRSG250815396852',
    pickupDate: '15 Aug, 2025',
    pickupAddress: {
      name: 'Nitin Saxena',
      street: '396, Courier Hub, Dharampeth',
      city: 'Nagpur',
      pincode: '440010',
    },
    dateAdded: '14 Aug, 2025',
    timeAdded: '03:00 PM',
    orderWeight: '32 kg',
    packetCount: 48,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '19',
    pickupCode: 'PRSG250903507369',
    pickupDate: '03 Sep, 2025',
    pickupAddress: {
      name: 'Meera Iyer',
      street: '507, Parcel Center, Vijayanagar',
      city: 'Mysore',
      pincode: '570017',
    },
    dateAdded: '02 Sep, 2025',
    timeAdded: '10:15 AM',
    orderWeight: '22 kg',
    packetCount: 35,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '20',
    pickupCode: 'PRSG250720618741',
    pickupDate: '20 Jul, 2025',
    pickupAddress: {
      name: 'Suresh Pillai',
      street: '618, Delivery Point, Pattom',
      city: 'Trivandrum',
      pincode: '695004',
    },
    dateAdded: '19 Jul, 2025',
    timeAdded: '01:00 PM',
    orderWeight: '52 kg',
    packetCount: 78,
    createdBy: 'Vendor',
    status: 'picked',
  },
  {
    id: '21',
    pickupCode: 'PRSG250918729147',
    pickupDate: '18 Sep, 2025',
    pickupAddress: {
      name: 'Lakshmi Menon',
      street: '729, Pickup Station, Alkapuri',
      city: 'Vadodara',
      pincode: '390007',
    },
    dateAdded: '17 Sep, 2025',
    timeAdded: '04:30 PM',
    orderWeight: '14 kg',
    packetCount: 22,
    createdBy: 'Vendor',
    status: 'cancelled',
  },
  {
    id: '22',
    pickupCode: 'PRSG250808840258',
    pickupDate: '08 Aug, 2025',
    pickupAddress: {
      name: 'Rahul Kapoor',
      street: '840, Logistics Base, Kalawad Road',
      city: 'Rajkot',
      pincode: '360005',
    },
    dateAdded: '07 Aug, 2025',
    timeAdded: '08:00 AM',
    orderWeight: '42 kg',
    packetCount: 62,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

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
          <Text style={styles.pageTitle}>Pickup Requests</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.addButton}>
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
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={COLORS.darkGray} />
          <Text style={styles.filterButtonText}>More Filters</Text>
        </TouchableOpacity>
      </View>

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
