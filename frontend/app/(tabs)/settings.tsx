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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: '#6B7280',
  darkGray: '#374151',
  border: '#E5E7EB',
  red: '#EF4444',
  green: '#10B981',
  lightPink: '#FEF2F2',
  lightBlue: '#EFF6FF',
};

const settingsMenu = [
  { id: 'profile', icon: 'person-outline', label: 'My Profile' },
  { id: 'kyc', icon: 'document-text-outline', label: 'KYC Details' },
  { id: 'address', icon: 'location-outline', label: 'Pickup Address' },
  { id: 'password', icon: 'key-outline', label: 'Change Password' },
];

export default function SettingsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 768;
  const [activeTab, setActiveTab] = useState('profile');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const renderMyProfile = () => (
    <View style={styles.contentSection}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Profile</Text>
        <Text style={styles.breadcrumb}>Settings {'>'} My Profile</Text>
      </View>

      {/* Basic Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Basic Details</Text>
        <View style={styles.cardDivider} />
        
        <View style={[styles.detailRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <Text style={[styles.detailLabel, isMobile && { marginBottom: 4 }]}>Name</Text>
          <View style={[styles.detailValues, isMobile && { flexDirection: 'column', gap: 12 }]}>
            <View style={styles.detailItem}>
              <Text style={styles.detailSubLabel}>First Name</Text>
              <Text style={styles.detailValue}>{user?.first_name || 'John'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailSubLabel}>Last Name</Text>
              <Text style={styles.detailValue}>{user?.last_name || 'Doe'}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.detailRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <Text style={[styles.detailLabel, isMobile && { marginBottom: 4 }]}>Contact Details</Text>
          <View style={styles.detailValues}>
            <View style={styles.detailItem}>
              <Text style={styles.detailSubLabel}>Phone Number</Text>
              <View style={styles.valueWithStatus}>
                <Text style={styles.detailValue}>{user?.mobile_number || '9876543210'}</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.detailRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <Text style={[styles.detailLabel, isMobile && { marginBottom: 4 }]}></Text>
          <View style={styles.detailValues}>
            <View style={styles.detailItem}>
              <Text style={styles.detailSubLabel}>Email</Text>
              <Text style={[styles.detailValue, isMobile && { fontSize: 13 }]}>{user?.email || 'test@shipreward.com'}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Billing Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Billing Details</Text>
        <View style={styles.cardDivider} />
        
        <View style={[styles.detailRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <Text style={[styles.detailLabel, isMobile && { marginBottom: 4 }]}>Address</Text>
          <View style={styles.detailValues}>
            <View style={styles.detailItem}>
              <View style={styles.addressRow}>
                <Ionicons name="business-outline" size={16} color={COLORS.gray} />
                <Text style={styles.companyName}>SHIPREWARD CUSTOMER</Text>
              </View>
              <Text style={styles.addressText}>
                123 Main Street, Mumbai, 400001, Maharashtra, India
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderKYCDetails = () => (
    <View style={styles.contentSection}>
      <View style={styles.pageHeader}>
        <View style={styles.pageTitleRow}>
          <Text style={styles.pageTitle}>KYC</Text>
          <View style={styles.approvedBadge}>
            <Text style={styles.approvedText}>Approved</Text>
          </View>
        </View>
        <Text style={styles.breadcrumb}>Settings {'>'} KYC</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.upgradeButton}>
          <Ionicons name="arrow-up" size={16} color={COLORS.white} />
          <Text style={styles.upgradeButtonText}>Upgrade To Business</Text>
        </TouchableOpacity>
      </View>

      {/* Individual KYC */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Individual KYC (CSB-IV)</Text>
        <View style={styles.cardDivider} />
        
        <View style={styles.kycRow}>
          <Text style={styles.kycLabel}>Aadhar</Text>
          <View style={styles.kycDetails}>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>Aadhar Number</Text>
              <Text style={styles.kycValue}>360819959868</Text>
            </View>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>Aadhar Front</Text>
              <TouchableOpacity style={styles.downloadLink}>
                <Text style={styles.downloadText}>Download</Text>
                <Ionicons name="download-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>Aadhar Back</Text>
              <TouchableOpacity style={styles.downloadLink}>
                <Text style={styles.downloadText}>Download</Text>
                <Ionicons name="download-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.kycRow}>
          <Text style={styles.kycLabel}>PAN</Text>
          <View style={styles.kycDetails}>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>PAN Number</Text>
              <Text style={styles.kycValue}>CUMPG9412N</Text>
            </View>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>PAN</Text>
              <TouchableOpacity style={styles.downloadLink}>
                <Text style={styles.downloadText}>Download</Text>
                <Ionicons name="download-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.kycRow}>
          <Text style={styles.kycLabel}>Signature</Text>
          <View style={styles.kycDetails}>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>Signature</Text>
              <TouchableOpacity style={styles.downloadLink}>
                <Text style={styles.downloadText}>Download</Text>
                <Ionicons name="download-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.kycRow}>
          <Text style={styles.kycLabel}>Agreement</Text>
          <View style={styles.kycDetails}>
            <View style={styles.kycItem}>
              <Text style={styles.kycSubLabel}>Merchant Agreement</Text>
              <TouchableOpacity 
                style={styles.downloadLink}
                onPress={() => router.push('/merchant-agreement')}
              >
                <Text style={styles.downloadText}>View</Text>
                <Ionicons name="eye-outline" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderPickupAddress = () => (
    <View style={styles.contentSection}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Pickup Address</Text>
        <Text style={styles.breadcrumb}>Settings {'>'} Pickup Address</Text>
      </View>

      <TouchableOpacity style={styles.addAddressButton}>
        <Ionicons name="add" size={18} color={COLORS.white} />
        <Text style={styles.addAddressButtonText}>Add Pickup Address</Text>
      </TouchableOpacity>

      {/* Address Table - with horizontal scroll on mobile */}
      <View style={styles.card}>
        {!isLargeScreen ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.addressTableWrapper}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { width: 100 }]}>Nickname</Text>
                <Text style={[styles.tableHeaderText, { width: 150 }]}>Contact Details</Text>
                <Text style={[styles.tableHeaderText, { width: 200 }]}>Address</Text>
                <Text style={[styles.tableHeaderText, { width: 80 }]}>Actions</Text>
              </View>

              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { width: 100 }]}>
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                  <Text style={styles.nickname}>Home</Text>
                </View>
                <View style={[styles.tableCell, { width: 150 }]}>
                  <View style={styles.contactRow}>
                    <Ionicons name="person-outline" size={14} color={COLORS.gray} />
                    <Text style={styles.contactText}>{user?.first_name} {user?.last_name}</Text>
                  </View>
                  <View style={styles.contactRow}>
                    <Ionicons name="call-outline" size={14} color={COLORS.gray} />
                    <Text style={styles.contactText}>{user?.mobile_number}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, { width: 200 }]}>
                  <Text style={styles.addressTableText}>
                    123 Main Street, Mumbai, 400001, Maharashtra, India
                  </Text>
                </View>
                <View style={[styles.tableCell, { width: 80, flexDirection: 'row', gap: 8 }]}>
                  <TouchableOpacity>
                    <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="trash-outline" size={20} color={COLORS.red} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>Nickname</Text>
              <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Contact Details</Text>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>Address</Text>
              <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>Actions</Text>
            </View>

            <View style={styles.tableRow}>
              <View style={[styles.tableCell, { flex: 1 }]}>
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
                <Text style={styles.nickname}>Home</Text>
              </View>
              <View style={[styles.tableCell, { flex: 1.5 }]}>
                <View style={styles.contactRow}>
                  <Ionicons name="person-outline" size={14} color={COLORS.gray} />
                  <Text style={styles.contactText}>{user?.first_name} {user?.last_name}</Text>
                </View>
                <View style={styles.contactRow}>
                  <Ionicons name="call-outline" size={14} color={COLORS.gray} />
                  <Text style={styles.contactText}>{user?.mobile_number}</Text>
                </View>
              </View>
              <View style={[styles.tableCell, { flex: 2 }]}>
                <Text style={styles.addressTableText}>
                  123 Main Street, Mumbai, 400001, Maharashtra, India
                </Text>
              </View>
              <View style={[styles.tableCell, { flex: 0.5, flexDirection: 'row', gap: 8 }]}>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="trash-outline" size={20} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );

  const renderChangePassword = () => (
    <View style={styles.contentSection}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Change Password</Text>
        <Text style={styles.breadcrumb}>Settings {'>'} Change Password</Text>
      </View>

      <View style={styles.passwordCard}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Old Password <Text style={styles.required}>*</Text></Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Type here ..."
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!showOldPassword}
            />
            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
              <Ionicons 
                name={showOldPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={22} 
                color={COLORS.gray} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Password <Text style={styles.required}>*</Text></Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Type here ..."
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Ionicons 
                name={showNewPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={22} 
                color={COLORS.gray} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password <Text style={styles.required}>*</Text></Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Type here ..."
              placeholderTextColor={COLORS.gray}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons 
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} 
                size={22} 
                color={COLORS.gray} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <View style={styles.checkbox}>
            <Ionicons name="checkmark" size={14} color={COLORS.white} />
          </View>
          <Text style={styles.checkboxLabel}>Logout from all devices</Text>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderMyProfile();
      case 'kyc':
        return renderKYCDetails();
      case 'address':
        return renderPickupAddress();
      case 'password':
        return renderChangePassword();
      default:
        return renderMyProfile();
    }
  };

  // Mobile view with tabs at top
  if (isMobile) {
    return (
      <View style={styles.container}>
        {/* Mobile Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.mobileTabsContainer}
          contentContainerStyle={styles.mobileTabsContent}
        >
          {settingsMenu.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.mobileTab, activeTab === item.id && styles.mobileTabActive]}
              onPress={() => setActiveTab(item.id)}
            >
              <Ionicons 
                name={item.icon as any} 
                size={18} 
                color={activeTab === item.id ? COLORS.white : COLORS.gray} 
              />
              <Text style={[
                styles.mobileTabLabel, 
                activeTab === item.id && styles.mobileTabLabelActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Area */}
        <ScrollView style={styles.mobileContentArea} showsVerticalScrollIndicator={false}>
          {renderContent()}
          <Text style={styles.footerText}>2025 © ShipReward.in</Text>
        </ScrollView>
      </View>
    );
  }

  // Desktop view with sidebar
  return (
    <View style={styles.container}>
      {/* Settings Sidebar */}
      <View style={styles.settingsSidebar}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={32} color={COLORS.red} />
          </View>
          <Text style={styles.profileName}>{user?.first_name} {user?.last_name}</Text>
        </View>

        {/* Settings Menu */}
        {settingsMenu.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.settingsMenuItem, activeTab === item.id && styles.settingsMenuItemActive]}
            onPress={() => setActiveTab(item.id)}
          >
            <Ionicons 
              name={item.icon as any} 
              size={20} 
              color={activeTab === item.id ? COLORS.white : COLORS.gray} 
            />
            <Text style={[
              styles.settingsMenuLabel, 
              activeTab === item.id && styles.settingsMenuLabelActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <ScrollView style={styles.contentArea} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <Text style={styles.footerText}>2025 © ShipReward.in</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: isLargeScreen ? 'row' : 'column',
    backgroundColor: COLORS.lightGray,
  },
  // Mobile styles
  mobileTabsContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexGrow: 0,
  },
  mobileTabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  mobileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    gap: 8,
  },
  mobileTabActive: {
    backgroundColor: COLORS.primary,
  },
  mobileTabLabel: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '500',
  },
  mobileTabLabelActive: {
    color: COLORS.white,
  },
  mobileContentArea: {
    flex: 1,
    padding: 16,
  },
  // Desktop styles
  settingsSidebar: {
    width: 200,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.lightBlue,
    marginHorizontal: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  settingsMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 4,
    borderRadius: 8,
    gap: 10,
  },
  settingsMenuItemActive: {
    backgroundColor: COLORS.primary,
  },
  settingsMenuLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  settingsMenuLabelActive: {
    color: COLORS.white,
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
    padding: 24,
  },
  contentSection: {
    flex: 1,
  },
  pageHeader: {
    marginBottom: 20,
  },
  pageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  approvedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  approvedText: {
    fontSize: 12,
    color: COLORS.green,
    fontWeight: '500',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  upgradeButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    gap: 12,
  },
  pickupAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  pickupAddressButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailLabel: {
    width: 120,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  detailValues: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
  },
  detailItem: {
    minWidth: 150,
  },
  detailSubLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  valueWithStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  verifiedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  verifiedText: {
    fontSize: 11,
    color: COLORS.green,
    fontWeight: '500',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 13,
    color: COLORS.gray,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  kycRow: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  kycLabel: {
    width: 100,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  kycDetails: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
  },
  kycItem: {
    minWidth: 140,
  },
  kycSubLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  kycValue: {
    fontSize: 15,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  downloadLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  downloadText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginBottom: 20,
    gap: 6,
  },
  addAddressButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  // Address table wrapper for mobile scroll
  addressTableWrapper: {
    minWidth: 530,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  tableCell: {
    paddingRight: 12,
  },
  defaultBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#D97706',
    fontWeight: '600',
  },
  nickname: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  addressTableText: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 18,
  },
  passwordCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 32,
    maxWidth: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  required: {
    color: COLORS.red,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.darkGray,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
});
