import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoHorizontal } from '../src/components/Logo';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  orange: '#F97316',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  textDark: '#1F2937',
  border: '#E5E7EB',
  background: '#F0F4F8',
  green: '#10B981',
};

// Sample tracking data
const sampleTrackingData = {
  awb: 'SG32512154494741',
  bookingDate: '20 Dec, 2025 - 02:30 PM',
  consignee: 'John Smith',
  destination: 'USA (United States)',
  status: 'Delivered',
  lastmileAwb: 'UUS5CN4989718184382',
  history: [
    {
      timestamp: '23-Dec-2025 10:45 AM',
      location: 'USA',
      event: 'Shipment Delivered',
    },
    {
      timestamp: '23-Dec-2025 08:30 AM',
      location: 'USA',
      event: 'Out for delivery',
    },
    {
      timestamp: '22-Dec-2025 06:15 PM',
      location: 'USA',
      event: 'Arrival scan at local delivery hub',
    },
    {
      timestamp: '22-Dec-2025 09:00 AM',
      location: 'USA',
      event: 'Customs cleared - Released for delivery',
    },
    {
      timestamp: '21-Dec-2025 04:30 PM',
      location: 'USA',
      event: 'In customs clearance process',
    },
    {
      timestamp: '21-Dec-2025 11:00 AM',
      location: 'USA',
      event: 'Arrived at destination country',
    },
    {
      timestamp: '20-Dec-2025 08:00 PM',
      location: 'Delhi, India',
      event: 'Departed from origin airport',
    },
    {
      timestamp: '20-Dec-2025 04:15 PM',
      location: 'Delhi, India',
      event: 'Received at Delhi Hub',
    },
    {
      timestamp: '20-Dec-2025 02:30 PM',
      location: 'Delhi, India',
      event: 'Order Picked Up from seller',
    },
  ],
};

export default function TrackingScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 768;
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [trackingData, setTrackingData] = useState<typeof sampleTrackingData | null>(null);

  const handleTrack = () => {
    // Simulate tracking - in real app, this would call an API
    if (trackingNumber.trim()) {
      setTrackingData({
        ...sampleTrackingData,
        awb: trackingNumber.trim(),
      });
      setShowResults(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return COLORS.green;
      case 'in transit':
        return COLORS.orange;
      default:
        return COLORS.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/login')}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <LogoHorizontal width={180} height={50} variant="dark" />
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Tracking Input Section */}
          <View style={styles.trackingCard}>
            <Text style={styles.mainTitle}>Track Your Shipment</Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="search" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Tracking ID..."
                  placeholderTextColor={COLORS.gray}
                  value={trackingNumber}
                  onChangeText={setTrackingNumber}
                  onSubmitEditing={handleTrack}
                />
              </View>
              <TouchableOpacity 
                style={styles.trackButton}
                onPress={handleTrack}
              >
                <Text style={styles.trackButtonText}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Results Section */}
          {showResults && trackingData && (
            <View style={styles.resultsCard}>
              {/* Shipping Details */}
              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Shipping Details</Text>
                
                <View style={styles.detailsGrid}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>AWB</Text>
                    <Text style={styles.detailValue}>{trackingData.awb}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Booking Date</Text>
                    <Text style={styles.detailValue}>{trackingData.bookingDate}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Consignee</Text>
                    <Text style={styles.detailValue}>{trackingData.consignee}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Destination</Text>
                    <Text style={styles.detailValue}>{trackingData.destination}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trackingData.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(trackingData.status) }]}>
                        {trackingData.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Lastmile AWB</Text>
                    <Text style={styles.detailValue}>{trackingData.lastmileAwb}</Text>
                  </View>
                </View>
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Shipment History */}
              <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Shipment History</Text>
                
                {/* History Header */}
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyHeaderText, { flex: 1.2 }]}>Update Timestamp</Text>
                  <Text style={[styles.historyHeaderText, { flex: 0.8 }]}>Location</Text>
                  <Text style={[styles.historyHeaderText, { flex: 2 }]}>Shipment History</Text>
                </View>

                {/* History Items */}
                {trackingData.history.map((item, index) => (
                  <View key={index} style={styles.historyRow}>
                    <View style={{ flex: 1.2 }}>
                      <Text style={styles.historyTimestamp}>{item.timestamp}</Text>
                    </View>
                    <View style={{ flex: 0.8 }}>
                      <Text style={styles.historyLocation}>{item.location}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.historyEvent}>{item.event}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Back to Login Button */}
          <TouchableOpacity 
            style={styles.backToLoginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>2025 © ShipReward.in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: isMobile ? 16 : 60,
    paddingVertical: 30,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  trackingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: isMobile ? 24 : 40,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  mainTitle: {
    fontSize: isMobile ? 24 : 32,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: isMobile ? 'column' : 'row',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textDark,
  },
  trackButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  resultsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: isMobile ? 20 : 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 20,
  },
  detailsGrid: {
    gap: 16,
  },
  detailRow: {
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: isMobile ? 4 : 0,
  },
  detailLabel: {
    width: isMobile ? '100%' : 150,
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  detailValue: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: COLORS.border,
    marginVertical: 24,
  },
  historySection: {
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  historyHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  historyRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  historyTimestamp: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  historyLocation: {
    fontSize: 13,
    color: COLORS.gray,
  },
  historyEvent: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  backToLoginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 8,
  },
  backToLoginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
