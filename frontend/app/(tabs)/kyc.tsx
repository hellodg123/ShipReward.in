import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  textDark: '#1F2937',
  border: '#E5E7EB',
  background: '#F0F4F8',
  success: '#10B981',
  warning: '#F59E0B',
  yellow: '#FEF3C7',
  yellowText: '#92400E',
};

const STEPS = [
  { id: 1, title: 'Account Type', completed: false },
  { id: 2, title: 'Identification', completed: false },
  { id: 3, title: 'Billing Details', completed: false },
  { id: 4, title: 'Agreement', completed: false },
];

export default function KYCScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  
  // Personal KYC fields
  const [documentType, setDocumentType] = useState('Aadhar');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [nameOnPan, setNameOnPan] = useState('');
  const [dobOnPan, setDobOnPan] = useState('');
  
  // Business KYC fields
  const [gstNumber, setGstNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  
  // Billing fields
  const [billingAddress, setBillingAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Agreement
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit KYC
      alert('KYC Submitted Successfully!');
      router.push('/(tabs)/dashboard');
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
    <View style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>Let's setup your account</Text>
      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepItem}>
            <View style={[
              styles.stepCircle,
              currentStep === step.id && styles.stepCircleActive,
              currentStep > step.id && styles.stepCircleCompleted,
            ]}>
              {currentStep > step.id ? (
                <Ionicons name="checkmark" size={14} color={COLORS.white} />
              ) : (
                <Text style={[
                  styles.stepNumber,
                  currentStep === step.id && styles.stepNumberActive,
                ]}>{step.id}</Text>
              )}
            </View>
            <Text style={[
              styles.stepTitle,
              currentStep === step.id && styles.stepTitleActive,
            ]}>{step.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAccountTypeStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.timeTag}>
        <Text style={styles.timeTagText}>Usually takes 5 Minutes</Text>
      </View>
      <Text style={styles.stepHeading}>Complete Your KYC</Text>
      <Text style={styles.stepSubheading}>To start exporting you need to complete your KYC</Text>
      
      <Text style={styles.selectLabel}>Please select your account</Text>
      
      <View style={[styles.accountCardsRow, { flexDirection: isMobile ? 'column' : 'row' }]}>
        {/* Personal Account Card */}
        <TouchableOpacity 
          style={[
            styles.accountCard,
            accountType === 'personal' && styles.accountCardSelected,
          ]}
          onPress={() => setAccountType('personal')}
        >
          <View style={styles.accountCardHeader}>
            <View style={[
              styles.radioCircle,
              accountType === 'personal' && styles.radioCircleSelected,
            ]}>
              {accountType === 'personal' && (
                <Ionicons name="checkmark" size={14} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.accountCardTitle}>Personal</Text>
          </View>
          <Image 
            source={require('../../assets/images/personal-kyc.png')} 
            style={styles.accountCardImage}
            resizeMode="contain"
          />
          <Text style={styles.accountCardDesc}>
            Verify your identity with ease using your personal id proofs.
          </Text>
        </TouchableOpacity>

        {/* Business Account Card */}
        <TouchableOpacity 
          style={[
            styles.accountCard,
            accountType === 'business' && styles.accountCardSelected,
          ]}
          onPress={() => setAccountType('business')}
        >
          <View style={styles.accountCardHeader}>
            <View style={[
              styles.radioCircle,
              accountType === 'business' && styles.radioCircleSelected,
            ]}>
              {accountType === 'business' && (
                <Ionicons name="checkmark" size={14} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.accountCardTitle}>Business</Text>
          </View>
          <Image 
            source={require('../../assets/images/business-kyc.png')} 
            style={styles.accountCardImage}
            resizeMode="contain"
          />
          <Text style={styles.accountCardDesc}>
            Kickstart KYC for your GST registered business effortlessly.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderIdentificationStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepHeading}>Add Identity Proof</Text>
      <Text style={styles.stepSubheading}>
        Provide valid identity proof for KYC verification to ensure compliance and security.
      </Text>

      {accountType === 'personal' ? (
        <View style={styles.formGrid}>
          {/* Document Type */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Document Type *</Text>
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>{documentType}</Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
            </View>
          </View>

          {/* Aadhar Number */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Aadhar Number *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Aadhar Number..."
              placeholderTextColor={COLORS.gray}
              value={aadharNumber}
              onChangeText={setAadharNumber}
              keyboardType="numeric"
            />
          </View>

          {/* Aadhar Front Upload */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Aadhar Front *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>

          {/* Aadhar Back Upload */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Aadhar Back *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>

          {/* PAN Number */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>PAN Number *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter PAN Number..."
              placeholderTextColor={COLORS.gray}
              value={panNumber}
              onChangeText={setPanNumber}
              autoCapitalize="characters"
            />
          </View>

          {/* Name on PAN */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Name as on PAN *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Name as on PAN..."
              placeholderTextColor={COLORS.gray}
              value={nameOnPan}
              onChangeText={setNameOnPan}
            />
          </View>

          {/* DOB on PAN */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>DOB as on PAN *</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={[styles.selectText, !dobOnPan && { color: COLORS.gray }]}>
                {dobOnPan || 'Pick a date'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          {/* Upload PAN */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Upload PAN *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>

          {/* Upload Signature */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Upload Signature *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.formGrid}>
          {/* GST Number */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>GST Number *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter GST Number..."
              placeholderTextColor={COLORS.gray}
              value={gstNumber}
              onChangeText={setGstNumber}
              autoCapitalize="characters"
            />
          </View>

          {/* Company Name */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Company Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Company Name..."
              placeholderTextColor={COLORS.gray}
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>

          {/* Business Type */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Business Type *</Text>
            <View style={styles.selectInput}>
              <Text style={[styles.selectText, !businessType && { color: COLORS.gray }]}>
                {businessType || 'Select Business Type'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
            </View>
          </View>

          {/* GST Certificate Upload */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>GST Certificate *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>

          {/* Company PAN Upload */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Company PAN *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>

          {/* Authorised Signatory Upload */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Authorised Signatory *</Text>
            <View style={styles.uploadBox}>
              <Ionicons name="cloud-upload-outline" size={32} color={COLORS.gray} />
              <Text style={styles.uploadText}>Drag & drop or <Text style={styles.browseText}>Browse</Text></Text>
              <Text style={styles.uploadHint}>PDF, JPEG, PNG or JPG format, up to 2MB</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderBillingStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepHeading}>Billing Details</Text>
      <Text style={styles.stepSubheading}>
        Provide your billing address for invoicing purposes.
      </Text>

      <View style={styles.formGrid}>
        <View style={[styles.formField, { flex: 1, minWidth: '100%' }]}>
          <Text style={styles.fieldLabel}>Billing Address *</Text>
          <TextInput
            style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Enter complete billing address..."
            placeholderTextColor={COLORS.gray}
            value={billingAddress}
            onChangeText={setBillingAddress}
            multiline
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>City *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter City..."
            placeholderTextColor={COLORS.gray}
            value={city}
            onChangeText={setCity}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>State *</Text>
          <View style={styles.selectInput}>
            <Text style={[styles.selectText, !state && { color: COLORS.gray }]}>
              {state || 'Select State'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Pincode *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Pincode..."
            placeholderTextColor={COLORS.gray}
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
      </View>
    </View>
  );

  const renderAgreementStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepHeading}>Agreement</Text>
      <Text style={styles.stepSubheading}>
        Please review and accept our merchant agreement to complete KYC.
      </Text>

      <View style={styles.agreementBox}>
        <ScrollView style={styles.agreementScroll} nestedScrollEnabled>
          <Text style={styles.agreementTitle}>MERCHANT AGREEMENT</Text>
          <Text style={styles.agreementVersion}>Version 1.0</Text>
          
          <Text style={styles.agreementText}>
            This Merchant Agreement ("Agreement") is between you (company/individual/firm/partnership/body corporate), together with any company or other business entity you are representing, if any (hereinafter collectively referred as "Merchant" or "you" or "User"); and Shipreward Logistics Private Limited, a company incorporated under the laws of India, having its registered office at 477, AR Mall, Near Vip Circle, Mota Varachha, Surat, Gujarat 394101 offering 'Logistics Management Services', under the name 'Shipreward' (hereinafter referred to as "we" or "Shipreward" or "Company", and together with the User referred jointly as the "Parties" and individually as a "Party").
          </Text>

          <Text style={styles.agreementSectionTitle}>BACKGROUND</Text>
          <Text style={styles.agreementText}>
            This Agreement comes into effect when you register to use the Services (as defined below), or click on "Continue" box, and accept the terms and conditions provided herein.{'\n\n'}
            By registering or clicking on the 'Continue' box, you signify your absolute, irrevocable and unconditional consent to all the provisions of this Agreement in its entirety. This Agreement constitutes a legally binding agreement between you and Shipreward.
          </Text>

          <Text style={styles.agreementSectionTitle}>I. DEFINITIONS</Text>
          <Text style={styles.agreementText}>
            All capitalized terms used in this Merchant Agreement shall have the meanings ascribed to them in the Terms & Conditions and Privacy Policy, unless the context otherwise provides or requires.
          </Text>

          <Text style={styles.agreementSectionTitle}>II. METHODOLOGY FOR PRICING</Text>
          <Text style={styles.agreementText}>
            With respect to Shipments, we have specific weight and size limitations for each individual Shipment which may vary basis the Shipping Vendor and/or location to which the Shipment is being shipped.{'\n\n'}
            Volumetric weight formula: length(cm) x breadth(cm) x height(cm) / 5000{'\n\n'}
            For shipments with volumetric weight up to 5kg, charges will be applied on the basis of dead weight. For shipments exceeding 5kg volumetric weight, billing will be based on whichever is higher between dead weight and volumetric weight.
          </Text>

          <Text style={styles.agreementSectionTitle}>III. CUSTOMER JOURNEY</Text>
          <Text style={styles.agreementText}>
            You will be shown two options at the time of booking: Ship Reward-Pickup (we collect from your doorstep) or Self-Ship (you drop off at our nearest hub).{'\n\n'}
            Once Your Shipment reaches Our hub, it is scanned, weighed and sorted. In case of weight discrepancy, an email notification is sent for approval.
          </Text>

          <Text style={styles.agreementSectionTitle}>IV. REFUND AND LIABILITY POLICY</Text>
          <Text style={styles.agreementText}>
            Claims Maintainable:{'\n\n'}
            • Case 1: No first scan by last mile carrier - For 0-100g shipments: 30% of invoice value plus shipping charges (max Rs.1,000/-). For shipments above 100g: 30% of invoice plus shipping charges (max Rs.4,000/-).{'\n\n'}
            • Case 2: No delivery scan or Shipment Lost - Same claim policy applies upon presentation of buyer-seller chat with proof of refund.{'\n\n'}
            • Case 3: Package lost before inwarding - If pickup by Ship Reward's team, refund as per policy. For 3PL, only shipping charges refunded.
          </Text>

          <Text style={styles.agreementSectionTitle}>V. HANDLING & OTHER CHARGES</Text>
          <Text style={styles.agreementText}>
            Maximum Shipment weight limits:{'\n'}
            • USA: 22 KGs{'\n'}
            • UK: 30 KGs{'\n'}
            • Europe: 30 KGs{'\n'}
            • Australia/NZ: 20 KGs{'\n'}
            • Canada: 20 KGs{'\n\n'}
            Additional handling charge of Rs 4000/- plus GST applies for packages exceeding these limits.
          </Text>

          <Text style={styles.agreementSectionTitle}>GOVERNING LAW</Text>
          <Text style={styles.agreementText}>
            The Agreement shall be governed by the laws of India. Disputes shall first be attempted to be settled by mutual discussions for 30 days. If not resolved, disputes shall be referred to arbitration with seat in New Delhi.
          </Text>

          <Text style={styles.agreementSectionTitle}>CONTACT</Text>
          <Text style={styles.agreementText}>
            For questions or support: support@shipreward.in
          </Text>
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.checkboxRow}
        onPress={() => setAgreeTerms(!agreeTerms)}
      >
        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
          {agreeTerms && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
        </View>
        <Text style={styles.checkboxText}>
          I have read and agree to the shipreward.in merchant agreement
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderAccountTypeStep();
      case 2:
        return renderIdentificationStep();
      case 3:
        return renderBillingStep();
      case 4:
        return renderAgreementStep();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.mainContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.contentWrapper, { flexDirection: isMobile ? 'column' : 'row' }]}>
          {/* Sidebar */}
          {renderStepIndicator()}

          {/* Main Content */}
          <View style={styles.mainArea}>
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={18} color={COLORS.darkGray} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.continueButton,
                  currentStep === 4 && !agreeTerms && styles.continueButtonDisabled,
                ]}
                onPress={handleContinue}
                disabled={currentStep === 4 && !agreeTerms}
              >
                <Text style={styles.continueButtonText}>
                  {currentStep === 4 ? 'Submit' : 'Continue'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: isMobile ? 16 : 24,
  },
  contentWrapper: {
    flex: 1,
    gap: 24,
  },
  sidebar: {
    width: isMobile ? '100%' : 280,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignSelf: 'flex-start',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 24,
  },
  stepsContainer: {
    gap: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  stepNumberActive: {
    color: COLORS.white,
  },
  stepTitle: {
    fontSize: 15,
    color: COLORS.gray,
    fontWeight: '500',
  },
  stepTitleActive: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  mainArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: isMobile ? 20 : 32,
  },
  stepContent: {
    flex: 1,
  },
  timeTag: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.yellowText,
  },
  stepHeading: {
    fontSize: isMobile ? 24 : 28,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  stepSubheading: {
    fontSize: 15,
    color: COLORS.gray,
    marginBottom: 24,
    lineHeight: 22,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  accountCardsRow: {
    gap: 20,
  },
  accountCard: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  accountCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#EFF6FF',
  },
  accountCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  accountCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  accountCardImage: {
    width: '100%',
    height: 140,
    marginBottom: 16,
  },
  accountCardDesc: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  formField: {
    flex: 1,
    minWidth: isMobile ? '100%' : 280,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textDark,
  },
  selectInput: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 15,
    color: COLORS.textDark,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  uploadText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 12,
  },
  browseText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  uploadHint: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  agreementBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 300,
    marginBottom: 20,
  },
  agreementScroll: {
    padding: 20,
  },
  agreementText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
  },
});
