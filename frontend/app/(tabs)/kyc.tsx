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

      <TouchableOpacity 
        style={styles.viewFullAgreementButton}
        onPress={() => router.push('/merchant-agreement')}
      >
        <Ionicons name="eye-outline" size={18} color={COLORS.primary} />
        <Text style={styles.viewFullAgreementText}>View Full Agreement</Text>
        <Ionicons name="open-outline" size={16} color={COLORS.primary} />
      </TouchableOpacity>

      <View style={styles.agreementBox}>
        <ScrollView style={styles.agreementScroll} nestedScrollEnabled>
          <Text style={styles.agreementTitle}>MERCHANT AGREEMENT</Text>
          <Text style={styles.agreementVersion}>Version 1.0</Text>
          
          <Text style={styles.agreementText}>
            This Merchant Agreement ("Agreement") is between you (company/individual/firm/partnership/body corporate), together with any company or other business entity you are representing, if any (hereinafter collectively referred as "Merchant" or "you" or "User"); and Shipreward Logistics Private Limited, a company incorporated under the laws of India, having its registered office at 477, AR Mall, Near Vip Circle, Mota Varachha, Surat, Gujarat 394101 offering 'Logistics Management Services', under the name 'Shipreward' (hereinafter referred to as "we" or "Shipreward" or "Company", and together with the User referred jointly as the "Parties" and individually as a "Party").
          </Text>

          <Text style={styles.agreementSectionTitle}>BACKGROUND</Text>
          <Text style={styles.agreementText}>
            This Agreement comes into effect when you register to use the Services (as defined below), or click on "Continue" box, and accept the terms and conditions provided herein.
          </Text>
          <Text style={styles.agreementText}>
            By registering or clicking on the 'Continue' box, you signify your absolute, irrevocable and unconditional consent to all the provisions of this Agreement in its entirety. This Agreement constitutes a legally binding agreement between you and Shipreward. This Agreement is an extension of the terms and conditions which can be viewed below in (Annexure 1) and privacy policy (Annexure 2), under which you're allowed to use Shipreward's website ("Website") and application ("App"), and how Shipreward will treat your account while you are a member. If you have any questions about our terms, feel free to contact us at support@shipreward.in.
          </Text>
          <Text style={styles.agreementText}>
            You are advised to read this Agreement carefully. You expressly represent and warrant that you will not avail the Services if you do not understand, agree to become a party to, and abide by all of the terms and conditions specified below. Any violation of this Agreement may result in legal liability upon you.
          </Text>
          <Text style={styles.agreementText}>
            The Website/App and the online/offline services of Shipreward or its affiliates, provides access to a platform that facilitates more comfortable form of e-commerce where you can use the logistics services according to your requirements as designated by Shipreward from time to time ("Service(s)").
          </Text>
          <Text style={styles.agreementText}>
            This Agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system, and does not require any physical or digital signatures. This Agreement is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries guidelines) Rules, 2011.
          </Text>
          <Text style={styles.agreementText}>
            Shipreward reserves the right to modify the terms of this Agreement, at any time, without giving you any prior notice. Your use of the Service following any such modification constitutes your agreement to follow and be bound by the terms of the Agreement, as modified.
          </Text>

          <Text style={styles.agreementSectionTitle}>I. DEFINITIONS</Text>
          <Text style={styles.agreementText}>
            All capitalized terms used in this Merchant Agreement shall have the meanings ascribed to them in the Terms & Conditions and Privacy Policy, unless the context otherwise provides or requires.
          </Text>

          <Text style={styles.agreementSectionTitle}>II. METHODOLOGY FOR PRICING</Text>
          <Text style={styles.agreementText}>
            With respect to Shipments, we have specific weight and size limitations for each individual Shipment which may vary basis the Shipping Vendor and/or location to which the Shipment is being shipped, although there is no restriction to the total weight of all Your Shipments collectively or on the number of boxes in each of Your Shipment.
          </Text>
          <Text style={styles.agreementText}>
            Volumetric weight of a Shipment will be system calculated at the time of booking in the panel of the Platforms. The formula used to calculate the volumetric weight is:
          </Text>
          <Text style={styles.agreementFormula}>length(cm) x breadth(cm) x height(cm) / 5000</Text>
          <Text style={styles.agreementText}>
            For example, if a shipment has the following dimensions:{'\n'}Length 30cm, Breadth 25cm, Height 40cm{'\n'}The volumetric weight will be: 30 x 25 x 40 / 5000 = 6 KGs
          </Text>
          <Text style={styles.agreementText}>
            For all shipments, billing will be based on the following criteria:{'\n'}• For shipments with a volumetric weight up to 5kg, charges will be applied on the basis of dead weight.{'\n'}• For shipments exceeding 5kg volumetric weight, billing will be done based on whichever is higher between dead weight and volumetric weight.
          </Text>
          <Text style={styles.agreementText}>
            Additionally, certain goods that require specialized handling, as defined under our internal operational guidelines, will be subject to an applicable special handling fee.
          </Text>

          <Text style={styles.agreementSectionTitle}>III. CUSTOMER JOURNEY AFTER BOOKING OF SHIPMENT ON THE PLATFORMS</Text>
          <Text style={styles.agreementText}>
            Depending upon the pick-up location, you will be shown two options at the time of booking Shipments:{'\n'}• Ship Reward-Pickup: We come and collect the Shipments from Your doorstep (i.e. from the location provided by You){'\n'}• Self-Ship: You are required to drop off the Shipments to Our nearest hub
          </Text>
          <Text style={styles.agreementText}>
            Once Your Shipment reaches Our hub, it is scanned, weighed and sorted as per the destination location and service selected. In case, there is any weight discrepancy in the weight mentioned and the weight recorded, it is put on hold and an email notification is sent to You for approval. Once approved it is connected to its destination.
          </Text>
          <Text style={styles.agreementText}>
            In case of international shipments, upon Shipments reaching the destination country after clearing the customs in India, the Shipments are custom cleared in the destination country and the Shipments are received at our local office from where it is forwarded to the last mile shipping carrier.
          </Text>
          <Text style={styles.agreementSubTitle}>Our Shipping Vendors by Region:</Text>
          <Text style={styles.agreementText}>
            • USA: UPS, USPS and Fedex{'\n'}• Europe: DPD or postal networks{'\n'}• Canada: Canada Post and UPS
          </Text>
          <Text style={styles.agreementText}>
            Note: Our Shipping Vendors may change from time to time.
          </Text>
          <Text style={styles.agreementSubTitle}>Delivery Attempts & RTOs:</Text>
          <Text style={styles.agreementText}>
            All Shipments are attempted to be delivered at least once, in many cases deliveries are attempted twice depending upon the last mile Shipping Vendor's policy. In case no one is available to receive the packages, the Shipments may be:{'\n'}• Dropped with the neighbour{'\n'}• Dropped to the local post office for pickup by the Customer{'\n'}• Dropped in a secure location outside the house or mailbox of the Customer
          </Text>
          <Text style={styles.agreementSubTitle}>RTO under Ship Reward Direct Service:</Text>
          <Text style={styles.agreementText}>
            If any Shipment is undeliverable, the shipment will be forwarded back to Our or Our partner's local office in the destination country. The RTO charges will be billed to Your account and the package will be destroyed in most cases, except USA and Europe. Re-forwarding option is available for USA, Europe and the charges for the same will be extra.
          </Text>
          <Text style={styles.agreementSubTitle}>Reasons for Shipment being Undeliverable:</Text>
          <Text style={styles.agreementText}>
            • Incorrect address mentioned at the time of booking and/or on the Shipment{'\n'}• Missing/incomplete information like apt number, street name etc.{'\n'}• Customer refused to accept the Shipment at the time of delivery{'\n'}• Customer refused to pay the taxes and/or duties
          </Text>

          <Text style={styles.agreementSectionTitle}>IV. SHIP REWARD'S REFUND AND LIABILITY POLICY</Text>
          <Text style={styles.agreementSubTitle}>Claims Maintainable:</Text>
          <Text style={styles.agreementText}>
            Our goal is to fulfil all Your Shipments securely however if anything goes wrong, we've got you covered! You may be entitled to file a claim and get compensation in the following circumstances:
          </Text>
          <Text style={styles.agreementSubTitle}>Case 1: No first scan by the last mile carrier in the destination country</Text>
          <Text style={styles.agreementText}>
            • For 0-100g shipments: 30% of invoice value plus shipping charges, maximum Rs.1,000/- (Indian Rupees One Thousand Only) inclusive of shipping charges{'\n'}• For shipments above 100g: 30% of invoice plus shipping charges, maximum Rs.4,000/- (Indian Rupees Four Thousand Only) inclusive of shipping charges
          </Text>
          <Text style={styles.agreementSubTitle}>Case 2: No delivery scan by the last mile Shipping Vendor or Shipment Lost in transit</Text>
          <Text style={styles.agreementText}>
            In case your customer claims for non-delivery and a refund has been made from your side to the customer, You may claim for a refund. Claim will be processed as per Claim Policy upon presentation of buyer-seller chat along with proof of refund.
          </Text>
          <Text style={styles.agreementSubTitle}>Case 3: Package lost before inwarding in Delhi Hub</Text>
          <Text style={styles.agreementText}>
            If pickup is done by Ship Reward's team, refund will be as per policy. In case of 3PL (third party logistics) only the shipping charges will be refunded.
          </Text>
          <Text style={styles.agreementSubTitle}>No Claims Maintainable:</Text>
          <Text style={styles.agreementText}>
            Ship Reward shall not be liable to entertain claims in the following circumstances:{'\n'}• Non-delivery due to wrong name/address or any wrong information{'\n'}• Shipment detained by customs or similar authority{'\n'}• Delivery attempt made but delivery not completed{'\n'}• Damage/leaking/tampering/pilferage due to poor packaging{'\n'}• Shipping Vendor does not provide for refund in the given circumstance{'\n'}• Shipping Vendor claims the Shipment is delivered
          </Text>
          <Text style={styles.agreementSubTitle}>Process and Terms To Make Claim:</Text>
          <Text style={styles.agreementText}>
            1. Send your claim to support@shipreward.in with all supporting documents{'\n'}2. Ship Reward's support team will investigate and contact local office/Shipping Vendor{'\n'}3. Upon completion of investigation, Ship Reward will communicate the result{'\n'}4. Ship Reward endeavours to close each claim within 15 days{'\n'}5. For Ship Reward Direct services, refund entitlement after 30 days of pickup if not delivered{'\n'}6. Claims must be made within 60 days from the date of inward scan
          </Text>
          <Text style={styles.agreementSubTitle}>Wallet Balance Refund:</Text>
          <Text style={styles.agreementText}>
            If any Non-GST registered customer does not perform any transaction for a period of 365 consecutive days, the wallet balance shall be refunded.
          </Text>

          <Text style={styles.agreementSectionTitle}>V. HANDLING CHARGES, REMOTE AREA CHARGES, REFORWARDING CHARGES</Text>
          <Text style={styles.agreementSubTitle}>Maximum Shipment Weight Limits:</Text>
          <Text style={styles.agreementText}>
            • USA: 22 KGs (volume or dead weight whichever is higher){'\n'}• UK: 30 KGs (volume or dead weight whichever is higher){'\n'}• Europe: 30 KGs (volume or dead weight whichever is higher){'\n'}• Australia/NZ: 20 KGs (volume or dead weight whichever is higher){'\n'}• Canada: 20 KGs (volume or dead weight whichever is higher)
          </Text>
          <Text style={styles.agreementText}>
            In case of package weight higher than above slabs, additional handling charge of Rs 4000/- plus GST applies, up to a maximum of additional 10 KGs.
          </Text>
          <Text style={styles.agreementSubTitle}>Reforwarding Charges:</Text>
          <Text style={styles.agreementText}>
            • USA: $15 for up to 500 grams, $25 for 500g to 5 KG{'\n'}• Europe: €20 for up to 500 grams, €30 for 500g to 5 KG{'\n'}• Canada: CAD 20 for up to 500 grams, CAD 30 for 500g to 5 KG
          </Text>

          <Text style={styles.agreementSectionTitle}>ANNEXURE A - PROHIBITED ITEMS</Text>
          <Text style={styles.agreementText}>
            The below-mentioned items are restricted and might not be accepted:
          </Text>
          <Text style={styles.agreementText}>
            1. Alcohol, tobacco, drugs, contraband and poisonous goods{'\n'}2. Activated Sim Cards{'\n'}3. Air guns, replica and imitation firearms and arms and ammunitions{'\n'}4. Asbestos{'\n'}5. Corrosive items (acids, chemicals), radioactive material{'\n'}6. Biological Substance, Category B{'\n'}7. Corpses or human ashes{'\n'}8. Fruits and vegetables{'\n'}9. Fire extinguishers{'\n'}10. Pornography material{'\n'}11. Dry Ice{'\n'}12. Edible Oils, De-oiled groundnut cakes, Fodder and Rice bran{'\n'}13. Lottery tickets and Gambling devices{'\n'}14. Food items that require refrigeration{'\n'}15. Dangerous goods and Hazardous material{'\n'}16. Radioactive stuff{'\n'}17. Antiques{'\n'}18. Designer clothing{'\n'}19. Expensive jewellery{'\n'}20. Bullion (of any precious metal){'\n'}21. Bacteria or virus samples{'\n'}22. Harmful chemicals{'\n'}23. Currency instruments{'\n'}24. Cigarettes{'\n'}25. Electronic Cigarettes{'\n'}26. Lithium Batteries{'\n'}27. Samsung Galaxy Note 7{'\n'}28. Magnets{'\n'}29. Speakers{'\n'}30. DNS{'\n'}31. Skin Sample{'\n'}32. Blood Sample{'\n'}33. Cosmetic{'\n'}34. Soaps{'\n'}35. Perfume{'\n'}36. Ignite substance or combust{'\n'}37. Medicine more than 3 Month Quantity{'\n'}38. Homeopathic Medicines{'\n'}39. Ayurvedic Medicines{'\n'}40. Red Chilli{'\n'}41. Seeds{'\n'}42. Plant Cells{'\n'}43. Govt Restricted Commodity (PPE Kit, N95 mask){'\n'}44. More than 1 Battery Or Electric IEC mobile components{'\n'}45. Desktop PC{'\n'}46. Antiques{'\n'}47. Credit Cards{'\n'}48. Original Passport{'\n'}49. Animals, raw skins/furs, live stocks and its Articles{'\n'}50. Drones{'\n'}51. LED / LCD{'\n'}52. Hollow Musical Instruments (Tabla, Harmonium){'\n'}53. Hoverboard{'\n'}54. Precious / Semi-Precious Jewellery{'\n'}55. Knives{'\n'}56. Needle
          </Text>

          <Text style={styles.agreementSectionTitle}>GOVERNING LAW AND JURISDICTION</Text>
          <Text style={styles.agreementText}>
            The Agreement shall be governed by the laws of India. You hereby agree that if any dispute(s) or difference(s) arise between You and Ship Reward, both parties shall attempt, for a period of 30 days from the receipt of a written notice from the other Party, to settle such dispute(s) by mutual discussions.
          </Text>
          <Text style={styles.agreementText}>
            If the said dispute(s) cannot be settled by mutual discussions within the 30-day period, such disputes shall be referred to arbitration by a sole arbitrator for final resolution in accordance with the provisions of the Arbitration and Conciliation Act, 1996. The arbitration proceedings shall be held in English language with the seat, venue and legal place of the arbitration being New Delhi.
          </Text>

          <Text style={styles.agreementSectionTitle}>CUSTOMER SUPPORT</Text>
          <Text style={styles.agreementText}>
            If You have any questions, issues, complaint, or seek any clarity in relations to the Agreement and/or Services/Products, please feel free to contact us at:
          </Text>
          <Text style={styles.agreementContactInfo}>Email: support@shipreward.in</Text>

          <Text style={styles.agreementFooter}>
            This Agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system, and does not require any physical or digital signatures. This document is published in accordance with the provisions of Rule 3(1)(a) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
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
    height: 400,
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
  agreementTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 4,
  },
  agreementVersion: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  agreementSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 20,
    marginBottom: 8,
  },
  agreementSubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 6,
  },
  agreementFormula: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  agreementContactInfo: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 8,
  },
  agreementFooter: {
    fontSize: 12,
    color: COLORS.gray,
    fontStyle: 'italic',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    lineHeight: 20,
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
