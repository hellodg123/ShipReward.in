import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia', 'India'];
const states = ['California', 'Florida', 'New York', 'Texas', 'Arizona', 'Gujarat'];
const currencies = ['INR', 'USD', 'EUR', 'GBP', 'CAD', 'AUD'];
const igstOptions = ['0%', '5%', '12%', '18%', '28%'];

// Sample shipping partners
const shippingPartners = [
  { id: '1', name: 'ShipGlobal Direct Commercial', deliveryTime: '7 - 10 Days', rate: 1410, additionalFee: 2574, ddp: false, note: 'As per US Government advisory, a tariff fee will be charged.' },
  { id: '2', name: 'ShipGlobal Direct', deliveryTime: '7 - 10 Days', rate: 1460, ddp: true },
  { id: '3', name: 'ShipGlobal USPS Special', deliveryTime: '7 - 10 Days', rate: 1500, ddp: true },
  { id: '4', name: 'ShipGlobal Premium', deliveryTime: '6 - 9 Days', rate: 1680, ddp: true },
  { id: '5', name: 'ShipGlobal First Class', deliveryTime: '7 - 10 Days', rate: 1788, ddp: true, note: 'Order cancellation not allowed after 10 days of booking!' },
  { id: '6', name: 'ShipGlobal Express', deliveryTime: '4 - 6 Days', rate: 2111, ddp: true },
  { id: '7', name: 'ShipGlobal Premium UPS Ground', deliveryTime: '7 - 10 Days', rate: 2194, ddp: true },
];

// Sample pickup address
const pickupAddress = {
  name: 'Hiren Vaghashiya',
  street: 'hiren, 477, ar mall, mota varachha',
  area: 'Mota Varachha',
  city: 'Surat',
  pincode: '394101',
  state: 'Gujarat',
  phone: '8866394789',
};

interface ItemDetail {
  productName: string;
  sku: string;
  hsn: string;
  qty: string;
  unitPrice: string;
  igst: string;
}

export default function AddOrderScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShippingPartner, setSelectedShippingPartner] = useState<string | null>(null);
  const [shipmentMode, setShipmentMode] = useState('CSB-IV');

  // Step 1: Consignee Details
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    country: '',
    address1: '',
    address2: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    country: '',
    address1: '',
    address2: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });

  // Step 2: Shipment Information
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('December 20th, 2025');
  const [orderRefId, setOrderRefId] = useState('');
  const [iossNumber, setIossNumber] = useState('');
  const [invoiceCurrency, setInvoiceCurrency] = useState('INR');
  const [deadWeight, setDeadWeight] = useState('');
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [items, setItems] = useState<ItemDetail[]>([
    { productName: '', sku: '', hsn: '', qty: '', unitPrice: '', igst: '0%' },
  ]);

  // Dropdowns
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showBillingCountryDropdown, setShowBillingCountryDropdown] = useState(false);
  const [showBillingStateDropdown, setShowBillingStateDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [activeIgstDropdown, setActiveIgstDropdown] = useState<number | null>(null);

  const addItem = () => {
    setItems([...items, { productName: '', sku: '', hsn: '', qty: '', unitPrice: '', igst: '0%' }]);
  };

  const updateItem = (index: number, field: keyof ItemDetail, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return total + qty * price;
    }, 0);
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      <TouchableOpacity
        style={[styles.stepItem, currentStep >= 1 && styles.stepItemActive]}
        onPress={() => currentStep > 1 && setCurrentStep(1)}
      >
        <View style={[styles.stepNumber, currentStep >= 1 && styles.stepNumberActive]}>
          <Text style={[styles.stepNumberText, currentStep >= 1 && styles.stepNumberTextActive]}>1</Text>
        </View>
        <Text style={[styles.stepLabel, currentStep >= 1 && styles.stepLabelActive]}>Consignee Details</Text>
      </TouchableOpacity>

      <View style={styles.stepLine} />

      <TouchableOpacity
        style={[styles.stepItem, currentStep >= 2 && styles.stepItemActive]}
        onPress={() => currentStep > 2 && setCurrentStep(2)}
      >
        <View style={[styles.stepNumber, currentStep >= 2 && styles.stepNumberActive]}>
          <Text style={[styles.stepNumberText, currentStep >= 2 && styles.stepNumberTextActive]}>2</Text>
        </View>
        <Text style={[styles.stepLabel, currentStep >= 2 && styles.stepLabelActive]}>Shipment Information</Text>
      </TouchableOpacity>

      <View style={styles.stepLine} />

      <TouchableOpacity style={[styles.stepItem, currentStep >= 3 && styles.stepItemActive]}>
        <View style={[styles.stepNumber, currentStep >= 3 && styles.stepNumberActive]}>
          <Text style={[styles.stepNumberText, currentStep >= 3 && styles.stepNumberTextActive]}>3</Text>
        </View>
        <Text style={[styles.stepLabel, currentStep >= 3 && styles.stepLabelActive]}>Select Shipping Partner</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDropdown = (
    options: string[],
    selectedValue: string,
    onSelect: (value: string) => void,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    placeholder: string
  ) => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsOpen(!isOpen)}>
        <Text style={selectedValue ? styles.dropdownText : styles.dropdownPlaceholder}>
          {selectedValue || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.gray} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderStep1 = () => (
    <View>
      {/* Select Pickup Address */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Select Pickup Address *</Text>
        <View style={styles.pickupAddressBox}>
          <Text style={styles.pickupAddressText}>
            {pickupAddress.name}, {pickupAddress.street}, {pickupAddress.area}, {pickupAddress.city}, {pickupAddress.pincode}, {pickupAddress.state}, {pickupAddress.phone}
          </Text>
          <Ionicons name="chevron-down" size={18} color={COLORS.gray} />
        </View>
      </View>

      {/* Buyer Shipping Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buyer Shipping Details</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>First Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter First Name ..."
              placeholderTextColor={COLORS.gray}
              value={shippingDetails.firstName}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, firstName: text })}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Last Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Last Name ..."
              placeholderTextColor={COLORS.gray}
              value={shippingDetails.lastName}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, lastName: text })}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Mobile Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number ..."
              placeholderTextColor={COLORS.gray}
              keyboardType="phone-pad"
              value={shippingDetails.mobile}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, mobile: text })}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Alternate Mobile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Alternate Mobile ..."
              placeholderTextColor={COLORS.gray}
              keyboardType="phone-pad"
              value={shippingDetails.alternateMobile}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, alternateMobile: text })}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email ID ..."
              placeholderTextColor={COLORS.gray}
              keyboardType="email-address"
              value={shippingDetails.email}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, email: text })}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Country *</Text>
            {renderDropdown(
              countries,
              shippingDetails.country,
              (val) => setShippingDetails({ ...shippingDetails, country: val }),
              showCountryDropdown,
              setShowCountryDropdown,
              'Select Country'
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Address 1 *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address 1 ..."
              placeholderTextColor={COLORS.gray}
              value={shippingDetails.address1}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, address1: text })}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Address 2 *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address 2 ..."
              placeholderTextColor={COLORS.gray}
              value={shippingDetails.address2}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, address2: text })}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Landmark</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Landmark ..."
              placeholderTextColor={COLORS.gray}
              value={shippingDetails.landmark}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, landmark: text })}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Pincode *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Pincode ..."
              placeholderTextColor={COLORS.gray}
              keyboardType="numeric"
              value={shippingDetails.pincode}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, pincode: text })}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>City *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter City ..."
              placeholderTextColor={COLORS.gray}
              value={shippingDetails.city}
              onChangeText={(text) => setShippingDetails({ ...shippingDetails, city: text })}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>State *</Text>
            {renderDropdown(
              states,
              shippingDetails.state,
              (val) => setShippingDetails({ ...shippingDetails, state: val }),
              showStateDropdown,
              setShowStateDropdown,
              'Select State'
            )}
          </View>
        </View>
      </View>

      {/* Billing Same as Shipping Checkbox */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setBillingSameAsShipping(!billingSameAsShipping)}
      >
        <View style={[styles.checkbox, billingSameAsShipping && styles.checkboxChecked]}>
          {billingSameAsShipping && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
        </View>
        <Text style={styles.checkboxLabel}>Billing address is same as shipping address</Text>
      </TouchableOpacity>

      {/* Buyer Billing Details */}
      {!billingSameAsShipping && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buyer Billing Details</Text>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>First Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter First Name ..."
                placeholderTextColor={COLORS.gray}
                value={billingDetails.firstName}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, firstName: text })}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Last Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Last Name ..."
                placeholderTextColor={COLORS.gray}
                value={billingDetails.lastName}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, lastName: text })}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Mobile Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number ..."
                placeholderTextColor={COLORS.gray}
                keyboardType="phone-pad"
                value={billingDetails.mobile}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, mobile: text })}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Country *</Text>
              {renderDropdown(
                countries,
                billingDetails.country,
                (val) => setBillingDetails({ ...billingDetails, country: val }),
                showBillingCountryDropdown,
                setShowBillingCountryDropdown,
                'Select Country'
              )}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Address 1 *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address 1 ..."
                placeholderTextColor={COLORS.gray}
                value={billingDetails.address1}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, address1: text })}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Address 2 *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address 2 ..."
                placeholderTextColor={COLORS.gray}
                value={billingDetails.address2}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, address2: text })}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Landmark</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Landmark ..."
                placeholderTextColor={COLORS.gray}
                value={billingDetails.landmark}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, landmark: text })}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>Pincode *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Pincode ..."
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={billingDetails.pincode}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, pincode: text })}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter City ..."
                placeholderTextColor={COLORS.gray}
                value={billingDetails.city}
                onChangeText={(text) => setBillingDetails({ ...billingDetails, city: text })}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.fieldLabel}>State *</Text>
              {renderDropdown(
                states,
                billingDetails.state,
                (val) => setBillingDetails({ ...billingDetails, state: val }),
                showBillingStateDropdown,
                setShowBillingStateDropdown,
                'Select State'
              )}
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View>
      {/* Shipment Mode */}
      <View style={styles.section}>
        <View style={styles.shipmentModeContainer}>
          <TouchableOpacity
            style={[styles.shipmentModeButton, shipmentMode === 'CSB-IV' && styles.shipmentModeButtonActive]}
            onPress={() => setShipmentMode('CSB-IV')}
          >
            <Ionicons name="person-outline" size={20} color={shipmentMode === 'CSB-IV' ? COLORS.white : COLORS.gray} />
            <View>
              <Text style={[styles.shipmentModeTitle, shipmentMode === 'CSB-IV' && styles.shipmentModeTitleActive]}>CSB-IV</Text>
              <Text style={[styles.shipmentModeSubtitle, shipmentMode === 'CSB-IV' && styles.shipmentModeSubtitleActive]}>Non Commercial Mode</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.upgradeButton} onPress={() => setShipmentMode('CSB-V')}>
            <Text style={styles.upgradeButtonText}>Upgrade to CSB - V</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Invoice Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invoice Details</Text>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Invoice Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Invoice Number ..."
              placeholderTextColor={COLORS.gray}
              value={invoiceNumber}
              onChangeText={setInvoiceNumber}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Invoice Date *</Text>
            <View style={styles.dateInput}>
              <Text style={styles.dateText}>{invoiceDate}</Text>
              <Ionicons name="calendar-outline" size={18} color={COLORS.gray} />
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Order/Reference ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Order/Reference ID ..."
              placeholderTextColor={COLORS.gray}
              value={orderRefId}
              onChangeText={setOrderRefId}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>IOSS Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter IOSS Number ..."
              placeholderTextColor={COLORS.gray}
              value={iossNumber}
              onChangeText={setIossNumber}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.fieldLabel}>Invoice Currency *</Text>
            {renderDropdown(
              currencies,
              invoiceCurrency,
              setInvoiceCurrency,
              showCurrencyDropdown,
              setShowCurrencyDropdown,
              'Select Currency'
            )}
          </View>
        </View>
      </View>

      {/* Box Measurements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Box Measurements</Text>

        <View style={styles.row}>
          <View style={styles.quarterField}>
            <Text style={styles.fieldLabel}>Dead Weight *</Text>
            <View style={styles.measurementInput}>
              <TextInput
                style={styles.measurementTextInput}
                placeholder="Eg. 1.25"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={deadWeight}
                onChangeText={setDeadWeight}
              />
              <View style={styles.unitBadge}>
                <Text style={styles.unitText}>kg</Text>
              </View>
            </View>
          </View>
          <View style={styles.quarterField}>
            <Text style={styles.fieldLabel}>Length *</Text>
            <View style={styles.measurementInput}>
              <TextInput
                style={styles.measurementTextInput}
                placeholder="Eg. 10"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={length}
                onChangeText={setLength}
              />
              <View style={styles.unitBadge}>
                <Text style={styles.unitText}>cm</Text>
              </View>
            </View>
          </View>
          <View style={styles.quarterField}>
            <Text style={styles.fieldLabel}>Breadth *</Text>
            <View style={styles.measurementInput}>
              <TextInput
                style={styles.measurementTextInput}
                placeholder="Eg. 10"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={breadth}
                onChangeText={setBreadth}
              />
              <View style={styles.unitBadge}>
                <Text style={styles.unitText}>cm</Text>
              </View>
            </View>
          </View>
          <View style={styles.quarterField}>
            <Text style={styles.fieldLabel}>Height *</Text>
            <View style={styles.measurementInput}>
              <TextInput
                style={styles.measurementTextInput}
                placeholder="Eg. 10"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
              <View style={styles.unitBadge}>
                <Text style={styles.unitText}>cm</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Item Details */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Item(s) Details</Text>
          <TouchableOpacity>
            <Text style={styles.restrictedItemsLink}>Restricted Items</Text>
          </TouchableOpacity>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemField}>
              <Text style={styles.fieldLabel}>Product Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Product Name"
                placeholderTextColor={COLORS.gray}
                value={item.productName}
                onChangeText={(text) => updateItem(index, 'productName', text)}
              />
            </View>
            <View style={styles.itemFieldSmall}>
              <Text style={styles.fieldLabel}>SKU</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter SKU ..."
                placeholderTextColor={COLORS.gray}
                value={item.sku}
                onChangeText={(text) => updateItem(index, 'sku', text)}
              />
            </View>
            <View style={styles.itemFieldSmall}>
              <Text style={styles.fieldLabel}>HSN *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter HSN ..."
                placeholderTextColor={COLORS.gray}
                value={item.hsn}
                onChangeText={(text) => updateItem(index, 'hsn', text)}
              />
            </View>
            <View style={styles.itemFieldTiny}>
              <Text style={styles.fieldLabel}>Qty *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Qty ..."
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={item.qty}
                onChangeText={(text) => updateItem(index, 'qty', text)}
              />
            </View>
            <View style={styles.itemFieldSmall}>
              <Text style={styles.fieldLabel}>Unit Price (INR) *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Unit Price"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={item.unitPrice}
                onChangeText={(text) => updateItem(index, 'unitPrice', text)}
              />
            </View>
            <View style={styles.itemFieldTiny}>
              <Text style={styles.fieldLabel}>IGST *</Text>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setActiveIgstDropdown(activeIgstDropdown === index ? null : index)}
                >
                  <Text style={styles.dropdownText}>{item.igst}</Text>
                  <Ionicons name="chevron-down" size={14} color={COLORS.gray} />
                </TouchableOpacity>
                {activeIgstDropdown === index && (
                  <View style={styles.dropdownMenu}>
                    {igstOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownItem}
                        onPress={() => {
                          updateItem(index, 'igst', option);
                          setActiveIgstDropdown(null);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}

        <View style={styles.totalPriceRow}>
          <Text style={styles.totalPriceLabel}>Total Price :</Text>
          <Text style={styles.totalPriceValue}>INR {calculateTotalPrice().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
          <Ionicons name="add" size={18} color={COLORS.primary} />
          <Text style={styles.addItemButtonText}>Add Another Product</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Select Shipping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.step3Container}>
      <View style={styles.shippingListContainer}>
        <Text style={styles.resultCount}>Showing {shippingPartners.length} Results</Text>

        {/* Table Header */}
        <View style={styles.shippingTableHeader}>
          <View style={styles.courierColumn}>
            <Text style={styles.tableHeaderText}>Courier Partner</Text>
          </View>
          <View style={styles.deliveryColumn}>
            <Text style={styles.tableHeaderText}>Delivery Time</Text>
          </View>
          <View style={styles.rateColumn}>
            <Text style={styles.tableHeaderText}>Shipment Rate</Text>
          </View>
          <View style={styles.selectColumn}>
            <Text style={styles.tableHeaderText}>Select</Text>
          </View>
        </View>

        {/* Shipping Partners List */}
        {shippingPartners.map((partner) => (
          <View key={partner.id}>
            <TouchableOpacity
              style={[
                styles.shippingPartnerRow,
                selectedShippingPartner === partner.id && styles.shippingPartnerRowSelected,
              ]}
              onPress={() => setSelectedShippingPartner(partner.id)}
            >
              <View style={styles.courierColumn}>
                <Text style={styles.courierName}>{partner.name}</Text>
                {partner.ddp && (
                  <View style={styles.ddpBadge}>
                    <Text style={styles.ddpText}>DDP</Text>
                  </View>
                )}
              </View>
              <View style={styles.deliveryColumn}>
                <Text style={styles.deliveryTime}>{partner.deliveryTime}</Text>
              </View>
              <View style={styles.rateColumn}>
                <Text style={styles.rateText}>Rs. {partner.rate.toLocaleString()}</Text>
                {partner.additionalFee && (
                  <Text style={styles.additionalFeeText}>+ Rs. {partner.additionalFee.toLocaleString()}</Text>
                )}
              </View>
              <View style={styles.selectColumn}>
                <View style={[styles.radioButton, selectedShippingPartner === partner.id && styles.radioButtonSelected]}>
                  {selectedShippingPartner === partner.id && <View style={styles.radioButtonInner} />}
                </View>
              </View>
            </TouchableOpacity>
            {partner.note && (
              <Text style={styles.partnerNote}>{partner.note}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Summary Sidebar */}
      <View style={styles.summaryContainer}>
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Consignee Details</Text>
          <View style={styles.summaryDivider} />
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Shipment Details</Text>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Actual Wt:</Text>
            <Text style={styles.summaryValue}>{deadWeight || '0'} KG</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dimensions:</Text>
            <Text style={styles.summaryValue}>{length || '0'} x {breadth || '0'} x {height || '0'} (in cm)</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Invoice Value:</Text>
            <Text style={styles.summaryValue}>{calculateTotalPrice()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Product Name:</Text>
            <Text style={styles.summaryValue}>{items[0]?.productName || '-'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Qty:</Text>
            <Text style={styles.summaryValue}>{items[0]?.qty || '0'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Price:</Text>
            <Text style={styles.summaryValueBold}>INR {calculateTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.payButton, !selectedShippingPartner && styles.payButtonDisabled]}
        disabled={!selectedShippingPartner}
        onPress={() => {
          // Handle payment and order creation
          router.push('/(tabs)/orders');
        }}
      >
        <Text style={styles.payButtonText}>Pay and Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Add Order: Create</Text>
        </View>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Form Content */}
      <View style={styles.formContainer}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
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
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepItemActive: {},
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberActive: {
    backgroundColor: COLORS.primary,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  stepNumberTextActive: {
    color: COLORS.white,
  },
  stepLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  stepLabelActive: {
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  formContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  restrictedItemsLink: {
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  pickupAddressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },
  pickupAddressText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.darkGray,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  quarterField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.darkGray,
    backgroundColor: COLORS.white,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 100,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: COLORS.gray,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    maxHeight: 200,
    zIndex: 1000,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 4,
      },
    }),
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  // Step 2 styles
  shipmentModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  shipmentModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 12,
  },
  shipmentModeButtonActive: {
    backgroundColor: COLORS.primaryDark,
  },
  shipmentModeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
  },
  shipmentModeTitleActive: {
    color: COLORS.white,
  },
  shipmentModeSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
  shipmentModeSubtitleActive: {
    color: COLORS.white,
    opacity: 0.8,
  },
  upgradeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  upgradeButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  measurementInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  measurementTextInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  unitBadge: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  unitText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  itemField: {
    flex: 2,
    minWidth: 150,
  },
  itemFieldSmall: {
    flex: 1,
    minWidth: 100,
  },
  itemFieldTiny: {
    flex: 0.7,
    minWidth: 80,
  },
  totalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginVertical: 16,
  },
  totalPriceLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addItemButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  // Step 3 styles
  step3Container: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  shippingListContainer: {
    flex: 2,
    minWidth: 500,
  },
  resultCount: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
  },
  shippingTableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  courierColumn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rateColumn: {
    flex: 1,
    alignItems: 'center',
  },
  selectColumn: {
    width: 60,
    alignItems: 'center',
  },
  shippingPartnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  shippingPartnerRowSelected: {
    backgroundColor: '#EFF6FF',
  },
  courierName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  ddpBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ddpText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4F46E5',
  },
  deliveryTime: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  rateText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  additionalFeeText: {
    fontSize: 12,
    color: COLORS.orange,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  partnerNote: {
    fontSize: 12,
    color: COLORS.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FEF3C7',
  },
  summaryContainer: {
    flex: 1,
    minWidth: 250,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 16,
    alignSelf: 'flex-start',
  },
  summarySection: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.gray,
  },
  summaryValue: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  summaryValueBold: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  payButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
