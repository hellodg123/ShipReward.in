import React from 'react';
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
  greenLight: '#D1FAE5',
  yellow: '#FEF3C7',
  border: '#E5E7EB',
};

export default function OrderSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Sample order data (in real app, this would come from params or API)
  const orderData = {
    orderId: 'SG32512204545620',
    orderType: 'CSB-IV',
    createdAt: '20 Dec, 2025 11:03 PM',
    name: 'John Doe',
    contact: '8849988135',
    billingDetails: 'Same as shipping address',
    shippingAddress: '123 Main Street, Downtown, New York, NY, US, 10001',
    actualWeight: '1 KG',
    dimensions: '3 x 3 x 3 (in cm)',
    invoiceValue: '3432',
    productName: 'Sample Product',
    qty: '1',
    totalPrice: 'INR 3432.00',
    logisticFee: 1460.00,
    gst: 262.80,
    total: 1722.80,
  };

  const progressSteps = [
    { label: 'Order Created', completed: true, date: orderData.createdAt },
    { label: 'Order Picked Up', completed: false, date: '' },
    { label: 'Order Received at Hub', completed: false, date: '' },
    { label: 'Order Dispatched from Hub', completed: false, date: '' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Order Summary</Text>
          <Text style={styles.breadcrumb}>Orders {'>'} Summary</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Left Side - Success & Progress */}
        <View style={styles.leftSection}>
          {/* Success Icon */}
          <View style={styles.successContainer}>
            <View style={styles.successIconOuter}>
              <View style={styles.successIconMiddle}>
                <View style={styles.successIconInner}>
                  <Ionicons name="checkmark" size={40} color={COLORS.white} />
                </View>
              </View>
            </View>
            <Text style={styles.successText}>Order created successfully</Text>
          </View>

          {/* Progress Tracker */}
          <View style={styles.progressContainer}>
            {progressSteps.map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <View style={styles.progressIconContainer}>
                  <View style={[
                    styles.progressIcon,
                    step.completed ? styles.progressIconCompleted : styles.progressIconPending
                  ]}>
                    {step.completed ? (
                      <Ionicons name="checkmark" size={16} color={COLORS.white} />
                    ) : (
                      <View style={styles.progressIconDot} />
                    )}
                  </View>
                  {index < progressSteps.length - 1 && (
                    <View style={[
                      styles.progressLine,
                      step.completed ? styles.progressLineCompleted : styles.progressLinePending
                    ]} />
                  )}
                </View>
                <View style={styles.progressTextContainer}>
                  <Text style={[
                    styles.progressLabel,
                    step.completed && styles.progressLabelCompleted
                  ]}>
                    {step.label}
                  </Text>
                  {step.date && (
                    <Text style={styles.progressDate}>{step.date}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Right Side - Order Details */}
        <View style={styles.rightSection}>
          {/* Order ID */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID :</Text>
            <View style={styles.orderIdContainer}>
              <Text style={styles.detailValue}>{orderData.orderId}</Text>
              <View style={styles.orderTypeBadge}>
                <Text style={styles.orderTypeText}>{orderData.orderType}</Text>
              </View>
            </View>
          </View>

          {/* Name/Contact */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name/Contact</Text>
            <Text style={styles.detailValue}>{orderData.name} / {orderData.contact}</Text>
          </View>

          {/* Billing Details */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Billing Details</Text>
            <Text style={styles.detailValue}>{orderData.billingDetails}</Text>
          </View>

          {/* Shipping Address */}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shipping Address</Text>
            <Text style={styles.detailValue}>{orderData.shippingAddress}</Text>
          </View>

          {/* Item Details Header */}
          <View style={styles.itemDetailsHeader}>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailHeaderText}>Actual Wt.</Text>
            </View>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailHeaderText}>Dimensions</Text>
            </View>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailHeaderText}>Invoice Value</Text>
            </View>
          </View>

          {/* Item Details Values Row 1 */}
          <View style={styles.itemDetailsRow}>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailValue}>{orderData.actualWeight}</Text>
            </View>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailValue}>{orderData.dimensions}</Text>
            </View>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailValue}>{orderData.invoiceValue}</Text>
            </View>
          </View>

          {/* Item Details Header 2 */}
          <View style={styles.itemDetailsHeader}>
            <View style={styles.itemDetailColumnWide}>
              <Text style={styles.itemDetailHeaderText}>Product Name</Text>
            </View>
            <View style={styles.itemDetailColumnSmall}>
              <Text style={styles.itemDetailHeaderText}>Qty</Text>
            </View>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailHeaderText}>Total Price</Text>
            </View>
          </View>

          {/* Item Details Values Row 2 */}
          <View style={styles.itemDetailsRow}>
            <View style={styles.itemDetailColumnWide}>
              <Text style={styles.itemDetailValue}>{orderData.productName}</Text>
            </View>
            <View style={styles.itemDetailColumnSmall}>
              <Text style={styles.itemDetailValue}>{orderData.qty}</Text>
            </View>
            <View style={styles.itemDetailColumn}>
              <Text style={styles.itemDetailValue}>{orderData.totalPrice}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Fees */}
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Logistic Fee</Text>
            <Text style={styles.feeValue}>Rs. {orderData.logisticFee.toFixed(2)}</Text>
          </View>

          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>GST</Text>
            <Text style={styles.feeValue}>Rs. {orderData.gst.toFixed(2)}</Text>
          </View>

          {/* Total */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs. {orderData.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Back to Orders Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/orders')}
      >
        <Text style={styles.backButtonText}>Back to Orders</Text>
      </TouchableOpacity>

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
    marginBottom: 24,
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
  contentContainer: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
  },
  leftSection: {
    flex: 1,
    minWidth: 300,
    alignItems: 'center',
    paddingTop: 40,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  successIconOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successIconMiddle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A7F3D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  progressStep: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  progressIconContainer: {
    alignItems: 'center',
    width: 30,
  },
  progressIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIconCompleted: {
    backgroundColor: COLORS.green,
  },
  progressIconPending: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  progressIconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
  },
  progressLine: {
    width: 2,
    height: 40,
    marginVertical: 4,
  },
  progressLineCompleted: {
    backgroundColor: COLORS.green,
  },
  progressLinePending: {
    backgroundColor: COLORS.border,
    borderStyle: 'dashed',
  },
  progressTextContainer: {
    marginLeft: 12,
    paddingBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  progressLabelCompleted: {
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  progressDate: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  rightSection: {
    flex: 1,
    minWidth: 350,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 24,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderTypeBadge: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  orderTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  itemDetailsHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
    marginTop: 16,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  itemDetailColumn: {
    flex: 1,
  },
  itemDetailColumnWide: {
    flex: 2,
  },
  itemDetailColumnSmall: {
    flex: 0.5,
  },
  itemDetailHeaderText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  itemDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  feeLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  feeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.yellow,
    marginHorizontal: -24,
    marginBottom: -24,
    marginTop: 8,
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  backButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
