import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

// Color Scheme
const COLORS = {
  primary: '#2563EB',
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
  // Card colors
  skyBlue: '#E0F2FE',
  mintGreen: '#D1FAE5',
  peach: '#FED7AA',
  lavender: '#E9D5FF',
  pink: '#FCE7F3',
  yellow: '#FEF3C7',
  // Summary colors
  summaryBg: '#FFF7ED',
  summaryBorder: '#FDBA74',
  success: '#10B981',
};

// Mock order data - in real app, this would be fetched from API
const getOrderData = (orderId: string) => ({
  id: orderId || 'SG32512224554864',
  pickupAddress: {
    name: 'Chirag Vaghasiya',
    phone: '+91 9106425242',
    address: 'Surat, 477, ar mall, mota varachha, Surat, Gujarat, 394101',
  },
  deliveryAddress: {
    name: 'Mahammad Naazeem shaik',
    phone: '+1 415-419-8616',
    address: '2267, Cabana club ct apt204, Tampa, Florida, United states, 33612',
  },
  shipmentDetails: {
    deadWeight: '0.05 KG',
    volumetricWeight: '0.001 KG',
    billedWeight: '0.05 KG',
    dimensions: '1 x 1 x 1 (in cm)',
    shippingPartner: 'ShipGlobal Super Saver',
    pickupRequest: 'PRSG251222434621',
    estimatedDelivery: '8 - 12 Days',
  },
  billedDetails: [
    {
      srNo: 1,
      productName: '1Doooonstruot Brightening Tinted with SPF 30',
      sku: '',
      hsn: '33049000',
      qty: 1,
      unitPrice: 'INR 000.00',
      total: 'INR 000.00',
    },
  ],
  summary: {
    logisticFee: 'Rs. 404.00',
    gst: 'Rs. 72.72',
    total: 'Rs. 476.72',
  },
  productTotal: 'INR 999.00',
});

export default function ViewOrderScreen() {
  const params = useLocalSearchParams();
  const orderId = params.id as string;
  const order = getOrderData(orderId);

  const renderInfoCard = (
    icon: string, 
    iconColor: string, 
    iconBg: string, 
    title: string, 
    subtitle: string
  ) => (
    <View style={styles.infoCard}>
      <View style={[styles.infoCardIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.infoCardContent}>
        <Text style={styles.infoCardTitle}>{title}</Text>
        <Text style={styles.infoCardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>View Order : {order.id}</Text>
        <Text style={styles.breadcrumb}>Orders {'>'} View</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Addresses */}
          <View style={styles.addressSection}>
            <View style={styles.addressBox}>
              <View style={styles.addressHeader}>
                <Ionicons name="location" size={18} color={COLORS.primary} />
                <Text style={styles.addressLabel}>Pickup Address</Text>
              </View>
              <Text style={styles.addressName}>{order.pickupAddress.name} | {order.pickupAddress.phone}</Text>
              <Text style={styles.addressText}>{order.pickupAddress.address}</Text>
            </View>

            <View style={styles.addressBox}>
              <View style={styles.addressHeader}>
                <Ionicons name="location-outline" size={18} color={COLORS.primary} />
                <Text style={styles.addressLabel}>Delivery Address</Text>
              </View>
              <Text style={styles.addressName}>{order.deliveryAddress.name} | {order.deliveryAddress.phone}</Text>
              <Text style={styles.addressText}>{order.deliveryAddress.address}</Text>
            </View>
          </View>

          {/* Shipment Details Cards - Row 1 */}
          <View style={styles.cardsRow}>
            {renderInfoCard('cube-outline', COLORS.primary, COLORS.skyBlue, order.shipmentDetails.deadWeight, 'Dead Weight')}
            {renderInfoCard('cube-outline', COLORS.success, COLORS.mintGreen, order.shipmentDetails.volumetricWeight, 'Volumetric Weight')}
            {renderInfoCard('cube-outline', '#F97316', COLORS.peach, order.shipmentDetails.billedWeight, 'Billed Weight')}
          </View>

          {/* Shipment Details Cards - Row 2 */}
          <View style={styles.cardsRow}>
            {renderInfoCard('resize-outline', '#DC2626', COLORS.pink, order.shipmentDetails.dimensions, 'Dimension (L x B x H)')}
            {renderInfoCard('airplane-outline', COLORS.success, COLORS.mintGreen, order.shipmentDetails.shippingPartner, 'Shipping Partner')}
            {renderInfoCard('document-text-outline', '#F59E0B', COLORS.yellow, order.shipmentDetails.pickupRequest, 'Pickup Request')}
          </View>

          {/* Estimated Delivery */}
          <View style={styles.cardsRow}>
            {renderInfoCard('time-outline', '#8B5CF6', COLORS.lavender, order.shipmentDetails.estimatedDelivery, 'Estimated Delivery Time')}
          </View>

          {/* Billed Details */}
          <View style={styles.billedSection}>
            <View style={styles.billedHeader}>
              <Ionicons name="receipt-outline" size={18} color={COLORS.primary} />
              <Text style={styles.billedTitle}>Billed Details</Text>
            </View>

            {/* Table with horizontal scroll on mobile */}
            {isMobile ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.billedTableWrapper}>
                  {/* Table Header */}
                  <View style={styles.billedTableHeader}>
                    <Text style={[styles.billedHeaderCell, { width: 50 }]}>Sr No.</Text>
                    <Text style={[styles.billedHeaderCell, { width: 200 }]}>Product Name</Text>
                    <Text style={[styles.billedHeaderCell, { width: 80 }]}>SKU</Text>
                    <Text style={[styles.billedHeaderCell, { width: 80 }]}>HSN</Text>
                    <Text style={[styles.billedHeaderCell, { width: 50 }]}>Qty</Text>
                    <Text style={[styles.billedHeaderCell, { width: 100 }]}>Unit Price</Text>
                    <Text style={[styles.billedHeaderCell, { width: 100 }]}>Total</Text>
                  </View>

                  {/* Table Rows */}
                  {order.billedDetails.map((item, index) => (
                    <View key={index} style={styles.billedTableRow}>
                      <Text style={[styles.billedCell, { width: 50 }]}>{item.srNo}</Text>
                      <Text style={[styles.billedCell, { width: 200 }]}>{item.productName}</Text>
                      <Text style={[styles.billedCell, { width: 80 }]}>{item.sku || '-'}</Text>
                      <Text style={[styles.billedCell, { width: 80 }]}>{item.hsn}</Text>
                      <Text style={[styles.billedCell, { width: 50 }]}>{item.qty}</Text>
                      <Text style={[styles.billedCell, { width: 100 }]}>{item.unitPrice}</Text>
                      <Text style={[styles.billedCell, { width: 100 }]}>{item.total}</Text>
                    </View>
                  ))}

                  {/* Total */}
                  <View style={styles.productTotalRow}>
                    <Text style={styles.productTotalLabel}>Total</Text>
                    <Text style={styles.productTotalValue}>{order.productTotal}</Text>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <>
                {/* Table Header */}
                <View style={styles.billedTableHeader}>
                  <Text style={[styles.billedHeaderCell, { width: 50 }]}>Sr No.</Text>
                  <Text style={[styles.billedHeaderCell, { flex: 1 }]}>Product Name</Text>
                  <Text style={[styles.billedHeaderCell, { width: 80 }]}>SKU</Text>
                  <Text style={[styles.billedHeaderCell, { width: 80 }]}>HSN</Text>
                  <Text style={[styles.billedHeaderCell, { width: 50 }]}>Qty</Text>
                  <Text style={[styles.billedHeaderCell, { width: 100 }]}>Unit Price</Text>
                  <Text style={[styles.billedHeaderCell, { width: 100 }]}>Total</Text>
                </View>

                {/* Table Rows */}
                {order.billedDetails.map((item, index) => (
                  <View key={index} style={styles.billedTableRow}>
                    <Text style={[styles.billedCell, { width: 50 }]}>{item.srNo}</Text>
                    <Text style={[styles.billedCell, { flex: 1 }]}>{item.productName}</Text>
                    <Text style={[styles.billedCell, { width: 80 }]}>{item.sku || '-'}</Text>
                    <Text style={[styles.billedCell, { width: 80 }]}>{item.hsn}</Text>
                    <Text style={[styles.billedCell, { width: 50 }]}>{item.qty}</Text>
                    <Text style={[styles.billedCell, { width: 100 }]}>{item.unitPrice}</Text>
                    <Text style={[styles.billedCell, { width: 100 }]}>{item.total}</Text>
                  </View>
                ))}

                {/* Total */}
                <View style={styles.productTotalRow}>
                  <Text style={styles.productTotalLabel}>Total</Text>
                  <Text style={styles.productTotalValue}>{order.productTotal}</Text>
                </View>
              </>
            )}
          </View>
              <Text style={styles.productTotalValue}>{order.productTotal}</Text>
            </View>
          </View>
        </View>

        {/* Right Column - Summary */}
        <View style={styles.rightColumn}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>Summary</Text>
            </View>
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Logistic Fee</Text>
                <Text style={styles.summaryValue}>{order.summary.logisticFee}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>GST</Text>
                <Text style={styles.summaryValue}>{order.summary.gst}</Text>
              </View>
              <View style={styles.summaryTotalRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>{order.summary.total}</Text>
              </View>
            </View>
          </View>
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
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  breadcrumb: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  mainContent: {
    flexDirection: isMobile ? 'column' : 'row',
    gap: 24,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    width: isMobile ? '100%' : 320,
  },
  addressSection: {
    flexDirection: isMobile ? 'column' : 'row',
    gap: 24,
    marginBottom: 24,
  },
  addressBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  addressName: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  infoCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  infoCardSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  billedSection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  billedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  billedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  billedTableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  billedHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
  },
  billedTableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  billedCell: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  productTotalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    gap: 24,
    backgroundColor: COLORS.summaryBg,
  },
  productTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  productTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EA580C',
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  summaryHeader: {
    backgroundColor: COLORS.summaryBg,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.summaryBorder,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EA580C',
  },
  summaryContent: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.summaryBg,
    marginHorizontal: -16,
    marginBottom: -16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  summaryTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EA580C',
  },
});
