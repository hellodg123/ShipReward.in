import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoHorizontal } from '../src/components/Logo';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width > 768;

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  primaryLight: '#3B82F6',
  secondary: '#7C3AED',
  accent: '#F59E0B',
  gold: '#FFD700',
  orange: '#F97316',
  pink: '#EC4899',
  green: '#10B981',
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  gray: '#6B7280',
  darkGray: '#374151',
  error: '#EF4444',
  dark: '#111827',
};

// Car Icon SVG
const CarIcon = ({ size = 80, color = COLORS.primary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size * 0.5} viewBox="0 0 100 50">
    <Path d="M10 35 L20 35 L25 25 L35 15 L65 15 L80 25 L90 35 L90 40 L10 40 Z" fill={color} />
    <Circle cx="25" cy="42" r="8" fill="#333" />
    <Circle cx="25" cy="42" r="4" fill="#666" />
    <Circle cx="75" cy="42" r="8" fill="#333" />
    <Circle cx="75" cy="42" r="4" fill="#666" />
    <Rect x="40" y="20" width="15" height="10" fill="#87CEEB" rx="2" />
    <Rect x="58" y="20" width="12" height="10" fill="#87CEEB" rx="2" />
  </Svg>
);

// Bike Icon SVG
const BikeIcon = ({ size = 80, color = COLORS.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size * 0.6} viewBox="0 0 100 60">
    <Circle cx="20" cy="45" r="12" fill="none" stroke="#333" strokeWidth="4" />
    <Circle cx="80" cy="45" r="12" fill="none" stroke="#333" strokeWidth="4" />
    <Path d="M20 45 L35 25 L50 25 L60 15 L70 25 L80 45" stroke={color} strokeWidth="4" fill="none" />
    <Path d="M50 25 L55 45 L80 45" stroke={color} strokeWidth="3" fill="none" />
    <Circle cx="60" cy="15" r="5" fill={color} />
  </Svg>
);

// Phone Icon SVG
const PhoneIcon = ({ size = 60, color = COLORS.pink }: { size?: number; color?: string }) => (
  <Svg width={size * 0.5} height={size} viewBox="0 0 30 60">
    <Rect x="2" y="2" width="26" height="56" rx="4" fill={color} />
    <Rect x="4" y="8" width="22" height="40" fill="#1a1a2e" rx="2" />
    <Circle cx="15" cy="54" r="3" fill="#1a1a2e" />
  </Svg>
);

const shippingCountries = [
  { name: 'USA', flag: '🇺🇸', fullName: 'United States' },
  { name: 'CANADA', flag: '🇨🇦', fullName: 'Canada' },
  { name: 'UK', flag: '🇬🇧', fullName: 'United Kingdom' },
  { name: 'GERMANY', flag: '🇩🇪', fullName: 'Germany' },
];

type CardView = 'login' | 'register' | 'forgot';

export default function LoginScreen() {
  const router = useRouter();
  const { login, register, forgotPassword } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth < 768;
  
  // Card view state
  const [cardView, setCardView] = useState<CardView>('login');
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Register state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  
  // Common state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetForm = () => {
    setError('');
    setSuccessMessage('');
  };

  const switchToLogin = () => {
    resetForm();
    setCardView('login');
  };

  const switchToRegister = () => {
    resetForm();
    setCardView('register');
  };

  const switchToForgot = () => {
    resetForm();
    setCardView('forgot');
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !mobileNumber.trim() || 
        !registerEmail.trim() || !registerPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register({
        email: registerEmail,
        password: registerPassword,
        first_name: firstName,
        last_name: lastName,
        mobile_number: mobileNumber,
      });
      setSuccessMessage('Account created successfully!');
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await forgotPassword(forgotEmail);
      setSuccessMessage('Password reset link sent to your email!');
      setTimeout(() => {
        switchToLogin();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login Card Component
  const renderLoginCard = () => (
    <View style={styles.loginCard}>
      <Text style={styles.cardTitle}>Welcome Back!</Text>
      <Text style={styles.cardSubtitle}>Sign in to start shipping & winning</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={18} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotPassword} onPress={switchToForgot}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <>
            <Text style={styles.primaryButtonText}>Sign In</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </>
        )}
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>New to ShipReward?</Text>
        <TouchableOpacity onPress={switchToRegister}>
          <Text style={styles.switchLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Register Card Component
  const renderRegisterCard = () => (
    <View style={styles.loginCard}>
      <Text style={styles.cardTitle}>Create Account</Text>
      <Text style={styles.cardSubtitle}>Join ShipReward and start winning</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={18} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {successMessage ? (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.green} />
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.inputLabel}>First Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter First Name..."
              placeholderTextColor={COLORS.gray}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Last Name..."
              placeholderTextColor={COLORS.gray}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number..."
            placeholderTextColor={COLORS.gray}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
        </View>
        <Text style={styles.inputHint}>You will receive SMS and WhatsApp updates on this number</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email ID..."
            placeholderTextColor={COLORS.gray}
            value={registerEmail}
            onChangeText={setRegisterEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            placeholderTextColor={COLORS.gray}
            value={registerPassword}
            onChangeText={setRegisterPassword}
            secureTextEntry={!showRegisterPassword}
          />
          <TouchableOpacity onPress={() => setShowRegisterPassword(!showRegisterPassword)}>
            <Ionicons name={showRegisterPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            placeholderTextColor={COLORS.gray}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.checkboxRow}
        onPress={() => setAgreeTerms(!agreeTerms)}
      >
        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
          {agreeTerms && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
        </View>
        <Text style={styles.checkboxText}>
          By clicking on Create Account, you agree to ShipReward's{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Already have an account?</Text>
        <TouchableOpacity onPress={switchToLogin}>
          <Text style={styles.switchLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Forgot Password Card Component
  const renderForgotCard = () => (
    <View style={styles.loginCard}>
      <Text style={styles.cardTitle}>Forgot Your Password?</Text>
      <Text style={styles.cardSubtitle}>
        Enter email address linked to your account and we'll email you a link to reset your password.
      </Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={18} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {successMessage ? (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.green} />
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email <Text style={styles.requiredStar}>*</Text></Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email ID..."
            placeholderTextColor={COLORS.gray}
            value={forgotEmail}
            onChangeText={setForgotEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
        onPress={handleForgotPassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Submit</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.returnLink} onPress={switchToLogin}>
        <Ionicons name="arrow-back" size={16} color={COLORS.primary} />
        <Text style={styles.returnLinkText}>Return to Login</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section with Login */}
        <View style={styles.heroSection}>
          {/* Gradient Background */}
          <View style={styles.heroGradient}>
            <View style={styles.gradientOverlay} />
          </View>

          <View style={styles.heroContent}>
            {/* Logo */}
            <View style={styles.logoSection}>
              <LogoHorizontal width={340} height={100} variant="light" />
            </View>

            <View style={styles.heroMain}>
              {/* Left Side - Hero Text */}
              <View style={styles.heroTextSection}>
                <Text style={styles.heroTagline}>🚀 Ship Globally, Win Big!</Text>
                <Text style={styles.heroTitle}>
                  International Shipping{'\n'}Made <Text style={styles.heroHighlight}>Rewarding</Text>
                </Text>
                <Text style={styles.heroSubtitle}>
                  Ship your orders to USA, Canada, UK & Germany at the best rates and win rewards worth
                </Text>
                <View style={styles.rewardHighlight}>
                  <Text style={styles.rewardAmount}>₹21 Crore+</Text>
                </View>

                {/* Countries We Ship To */}
                <View style={styles.countriesSection}>
                  <Text style={styles.countriesTitle}>We Ship To:</Text>
                  <View style={styles.countriesRow}>
                    {shippingCountries.map((country, index) => (
                      <View key={index} style={styles.countryBadge}>
                        <Text style={styles.countryFlag}>{country.flag}</Text>
                        <Text style={styles.countryName}>{country.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Right Side - Dynamic Card */}
              <View style={styles.loginSection}>
                {cardView === 'login' && renderLoginCard()}
                {cardView === 'register' && renderRegisterCard()}
                {cardView === 'forgot' && renderForgotCard()}
              </View>
            </View>
          </View>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.whyChooseSection}>
          <Text style={styles.sectionTitle}>Why Choose <Text style={styles.highlightText}>ShipReward?</Text></Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="trophy" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.featureTitle}>₹21 Crore+ Rewards</Text>
              <Text style={styles.featureDesc}>Win cars, bikes, phones and cash prizes just by shipping!</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#F0FDF4' }]}>
                <Ionicons name="cash" size={32} color={COLORS.green} />
              </View>
              <Text style={styles.featureTitle}>Best Rates in Market</Text>
              <Text style={styles.featureDesc}>Competitive pricing for international shipping to 4 countries</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="rocket" size={32} color={COLORS.orange} />
              </View>
              <Text style={styles.featureTitle}>Fast & Reliable</Text>
              <Text style={styles.featureDesc}>Express delivery to USA, UK, Canada & Germany</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#FDF2F8' }]}>
                <Ionicons name="shield-checkmark" size={32} color={COLORS.pink} />
              </View>
              <Text style={styles.featureTitle}>Safe & Secure</Text>
              <Text style={styles.featureDesc}>Full tracking and insurance on every shipment</Text>
            </View>
          </View>
        </View>

        {/* Rewards Showcase Section */}
        <View style={styles.rewardsSection}>
          <View style={styles.rewardsSectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Win Amazing <Text style={styles.highlightText}>Rewards!</Text></Text>
            <Text style={styles.rewardsSectionSubtitle}>22 Lakh Plus Coupon Win ₹1,00,00,000 to ₹60</Text>
          </View>

          {/* Prize Showcase */}
          <View style={styles.prizeShowcase}>
            {/* Grand Prize */}
            <View style={styles.grandPrizeCard}>
              <View style={styles.grandPrizeBadge}>
                <Text style={styles.grandPrizeBadgeText}>GRAND PRIZE</Text>
              </View>
              <Text style={styles.grandPrizeEmoji}>💰</Text>
              <Text style={styles.grandPrizeAmount}>₹1 Crore</Text>
              <Text style={styles.grandPrizeLabel}>Cash Prize (1st, 2nd, 3rd Winners)</Text>
            </View>

            {/* Vehicle Prizes */}
            <View style={styles.vehiclePrizesRow}>
              <View style={styles.vehiclePrizeCard}>
                <CarIcon size={100} color={COLORS.primary} />
                <Text style={styles.vehiclePrizeName}>Range Rover Velar</Text>
                <Text style={styles.vehiclePrizeValue}>₹86.74 Lakh</Text>
                <View style={styles.vehiclePrizeRank}>
                  <Text style={styles.vehiclePrizeRankText}>4th Prize</Text>
                </View>
              </View>

              <View style={styles.vehiclePrizeCard}>
                <CarIcon size={100} color={COLORS.secondary} />
                <Text style={styles.vehiclePrizeName}>BMW iX1 xDrive30</Text>
                <Text style={styles.vehiclePrizeValue}>₹71.24 Lakh</Text>
                <View style={[styles.vehiclePrizeRank, { backgroundColor: COLORS.secondary }]}>
                  <Text style={styles.vehiclePrizeRankText}>5th Prize</Text>
                </View>
              </View>

              <View style={styles.vehiclePrizeCard}>
                <CarIcon size={100} color={COLORS.orange} />
                <Text style={styles.vehiclePrizeName}>Audi Q3 Premium</Text>
                <Text style={styles.vehiclePrizeValue}>₹49.71 Lakh</Text>
                <View style={[styles.vehiclePrizeRank, { backgroundColor: COLORS.orange }]}>
                  <Text style={styles.vehiclePrizeRankText}>6th Prize</Text>
                </View>
              </View>
            </View>

            {/* Bike Prizes */}
            <View style={styles.bikePrizesRow}>
              <View style={styles.bikePrizeCard}>
                <BikeIcon size={90} color={COLORS.dark} />
                <Text style={styles.bikePrizeName}>Harley Davidson Sportster S</Text>
                <Text style={styles.bikePrizeValue}>₹19.95 Lakh</Text>
              </View>

              <View style={styles.bikePrizeCard}>
                <BikeIcon size={90} color={COLORS.green} />
                <Text style={styles.bikePrizeName}>Kawasaki Ninja 500</Text>
                <Text style={styles.bikePrizeValue}>₹6.26 Lakh</Text>
              </View>

              <View style={styles.bikePrizeCard}>
                <BikeIcon size={90} color={COLORS.primary} />
                <Text style={styles.bikePrizeName}>Royal Enfield Hunter 350</Text>
                <Text style={styles.bikePrizeValue}>₹1.88 Lakh × 41</Text>
              </View>
            </View>

            {/* Phone Prizes */}
            <View style={styles.phonePrizesRow}>
              <View style={styles.phonePrizeCard}>
                <PhoneIcon size={80} color={COLORS.secondary} />
                <Text style={styles.phonePrizeName}>Samsung Galaxy Z Fold7</Text>
                <Text style={styles.phonePrizeValue}>25 Winners</Text>
              </View>

              <View style={styles.phonePrizeCard}>
                <PhoneIcon size={80} color={COLORS.gray} />
                <Text style={styles.phonePrizeName}>iPhone 17 Pro Max</Text>
                <Text style={styles.phonePrizeValue}>25 Winners</Text>
              </View>
            </View>
          </View>
        </View>

        {/* How It Works Section */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How It <Text style={styles.highlightText}>Works?</Text></Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.stepCard}>
              <View style={[styles.stepNumber, { backgroundColor: COLORS.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Sign Up & Ship</Text>
              <Text style={styles.stepDesc}>Create your account and start shipping internationally</Text>
            </View>

            <View style={styles.stepArrow}>
              <Ionicons name="arrow-forward" size={24} color={COLORS.gray} />
            </View>

            <View style={styles.stepCard}>
              <View style={[styles.stepNumber, { backgroundColor: COLORS.secondary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Earn Coupons</Text>
              <Text style={styles.stepDesc}>Get reward coupons on every 6 shipment</Text>
            </View>

            <View style={styles.stepArrow}>
              <Ionicons name="arrow-forward" size={24} color={COLORS.gray} />
            </View>

            <View style={styles.stepCard}>
              <View style={[styles.stepNumber, { backgroundColor: COLORS.gold }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Win Big!</Text>
              <Text style={styles.stepDesc}>Win Cars, Bikes, Phones & Cash!</Text>
            </View>
          </View>
        </View>

        {/* Footer - Combined CTA and Info */}
        <View style={styles.footer}>
          <View style={styles.footerInner}>
            {/* Left Side - Logo & Content */}
            <View style={styles.footerLeftSection}>
              <LogoHorizontal width={isMobile ? 200 : 320} height={isMobile ? 56 : 90} variant="light" />
              
              {/* Countries with Flags */}
              <View style={styles.footerCountriesRow}>
                <View style={styles.footerCountryBadge}>
                  <Text style={styles.footerCountryFlag}>🇺🇸</Text>
                  <Text style={styles.footerCountryName}>USA</Text>
                </View>
                <View style={styles.footerCountryBadge}>
                  <Text style={styles.footerCountryFlag}>🇨🇦</Text>
                  <Text style={styles.footerCountryName}>CANADA</Text>
                </View>
                <View style={styles.footerCountryBadge}>
                  <Text style={styles.footerCountryFlag}>🇬🇧</Text>
                  <Text style={styles.footerCountryName}>UK</Text>
                </View>
                <View style={styles.footerCountryBadge}>
                  <Text style={styles.footerCountryFlag}>🇩🇪</Text>
                  <Text style={styles.footerCountryName}>GERMANY</Text>
                </View>
              </View>

              {/* Social Media Buttons */}
              <View style={styles.socialButtonsRow}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={20} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-youtube" size={20} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-twitter" size={20} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-instagram" size={20} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-linkedin" size={20} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              {/* Contact Info */}
              <View style={styles.footerContactRow}>
                <View style={styles.footerContactItem}>
                  <Ionicons name="call" size={16} color={COLORS.accent} />
                  <Text style={styles.footerContactText}>+91 99065 99065</Text>
                </View>
                <View style={styles.footerContactItem}>
                  <Ionicons name="mail" size={16} color={COLORS.accent} />
                  <Text style={styles.footerContactText}>support@shipreward.in</Text>
                </View>
              </View>

              {/* Company Address */}
              <View style={styles.footerAddressSection}>
                <Text style={styles.footerAddressTitle}>Registered Office:</Text>
                <Text style={styles.footerAddressText}>
                  ShipReward Logistics Pvt. Ltd., 123, Electronic City Phase 1,{'\n'}
                  Hosur Road, Bengaluru, Karnataka - 560100, India
                </Text>
              </View>

              {/* Policy Links */}
              <View style={styles.footerLinksRow}>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={styles.footerLinkDivider}>|</Text>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Terms & Conditions</Text>
                </TouchableOpacity>
                <Text style={styles.footerLinkDivider}>|</Text>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Refunds & Cancellation</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Right Side - CTA Card */}
            <View style={styles.footerRightSection}>
              <View style={styles.footerCtaCard}>
                <Text style={styles.footerCtaTitle}>Ready to Ship & Win?</Text>
                <Text style={styles.footerCtaSubtitle}>Join thousands of happy shippers earning rewards</Text>
                <TouchableOpacity style={styles.footerCtaButton} onPress={() => {
                  scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                  setCardView('login');
                }}>
                  <Text style={styles.footerCtaButtonText}>Start Shipping Now</Text>
                  <Ionicons name="arrow-forward" size={20} color={COLORS.dark} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <Text style={styles.footerCopyright}>© 2025 ShipReward.in - All Rights Reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero Section
  heroSection: {
    minHeight: isLargeScreen ? height * 0.95 : 'auto',
    position: 'relative',
    overflow: 'hidden',
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primaryDark,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(37, 99, 235, 0.3)',
  },
  heroContent: {
    padding: isLargeScreen ? 40 : 20,
    paddingTop: isLargeScreen ? 30 : 16,
    zIndex: 1,
  },
  logoSection: {
    marginBottom: 20,
  },
  heroMain: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isLargeScreen ? 'flex-start' : 'stretch',
    gap: 40,
  },
  heroTextSection: {
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 550 : '100%',
  },
  heroTagline: {
    fontSize: 16,
    color: COLORS.gold,
    fontWeight: '600',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: isLargeScreen ? 48 : 32,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: isLargeScreen ? 58 : 42,
    marginBottom: 20,
  },
  heroHighlight: {
    color: COLORS.gold,
  },
  heroSubtitle: {
    fontSize: isLargeScreen ? 17 : 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 26,
    marginBottom: 20,
  },
  rewardHighlight: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 28,
  },
  rewardAmount: {
    fontSize: isLargeScreen ? 44 : 32,
    fontWeight: '800',
    color: COLORS.gold,
  },
  rewardLabel: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
  countriesSection: {
    marginTop: 16,
  },
  countriesTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    fontWeight: '600',
  },
  countriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryName: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },

  // Login/Register/Forgot Card Section
  loginSection: {
    width: isLargeScreen ? 420 : '100%',
  },
  loginCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: isLargeScreen ? 32 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 20,
    lineHeight: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    flex: 1,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  successText: {
    color: COLORS.green,
    fontSize: 13,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 6,
  },
  requiredStar: {
    color: COLORS.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.dark,
  },
  inputHint: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 4,
  },
  switchText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  switchLink: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.gray,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  returnLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },
  returnLinkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  // Why Choose Us Section
  whyChooseSection: {
    padding: isLargeScreen ? 80 : 40,
    backgroundColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: isLargeScreen ? 36 : 26,
    fontWeight: '800',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 40,
  },
  highlightText: {
    color: COLORS.primary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    width: isLargeScreen ? 260 : '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Rewards Section
  rewardsSection: {
    padding: isLargeScreen ? 80 : 40,
    backgroundColor: COLORS.white,
  },
  rewardsSectionHeader: {
    marginBottom: 40,
  },
  rewardsSectionSubtitle: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: -28,
  },
  prizeShowcase: {
    alignItems: 'center',
  },
  grandPrizeCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    width: isLargeScreen ? 360 : '100%',
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  grandPrizeBadge: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  grandPrizeBadgeText: {
    color: COLORS.dark,
    fontWeight: '800',
    fontSize: 11,
  },
  grandPrizeEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  grandPrizeAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.dark,
  },
  grandPrizeLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 6,
  },
  vehiclePrizesRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 20,
    marginBottom: 28,
    width: '100%',
    justifyContent: 'center',
  },
  vehiclePrizeCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 280 : '100%',
  },
  vehiclePrizeName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
    marginTop: 14,
    textAlign: 'center',
  },
  vehiclePrizeValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 6,
  },
  vehiclePrizeRank: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    marginTop: 10,
  },
  vehiclePrizeRankText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 11,
  },
  bikePrizesRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 16,
    marginBottom: 28,
    width: '100%',
    justifyContent: 'center',
  },
  bikePrizeCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 260 : '100%',
  },
  bikePrizeName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginTop: 10,
    textAlign: 'center',
  },
  bikePrizeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.green,
    marginTop: 4,
  },
  phonePrizesRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  phonePrizeCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 280 : '100%',
  },
  phonePrizeName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginTop: 10,
    textAlign: 'center',
  },
  phonePrizeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.pink,
    marginTop: 4,
  },

  // How It Works Section
  howItWorksSection: {
    padding: isLargeScreen ? 80 : 40,
    backgroundColor: COLORS.lightGray,
  },
  stepsContainer: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isLargeScreen ? 16 : 20,
  },
  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    width: isLargeScreen ? 260 : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 6,
    textAlign: 'center',
  },
  stepDesc: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  stepArrow: {
    display: isLargeScreen ? 'flex' : 'none',
  },

  // CTA Section - Removed (merged with footer)
  ctaSection: {
    display: 'none',
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: isLargeScreen ? 36 : 26,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 28,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 10,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.dark,
  },

  // Footer
  footer: {
    padding: isLargeScreen ? 50 : 24,
    backgroundColor: COLORS.primary,
  },
  footerInner: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isLargeScreen ? 'flex-start' : 'center',
    gap: isLargeScreen ? 60 : 30,
  },
  footerLeftSection: {
    flex: isLargeScreen ? 1 : undefined,
    alignItems: isLargeScreen ? 'flex-start' : 'center',
    gap: 14,
    width: isLargeScreen ? undefined : '100%',
  },
  footerRightSection: {
    alignItems: isLargeScreen ? 'flex-end' : 'center',
    width: isLargeScreen ? undefined : '100%',
  },
  footerCtaCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: isLargeScreen ? 32 : 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    width: isLargeScreen ? 340 : '100%',
  },
  footerCtaTitle: {
    fontSize: isLargeScreen ? 26 : 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  footerCtaSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 18,
    textAlign: 'center',
    lineHeight: 20,
  },
  footerCtaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  footerCtaButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
  },
  footerCountriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: isLargeScreen ? 'flex-start' : 'center',
    gap: 8,
  },
  footerCountryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  footerCountryFlag: {
    fontSize: 14,
  },
  footerCountryName: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 10,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: isLargeScreen ? 'flex-start' : 'center',
    gap: 10,
  },
  socialButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContactRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: isLargeScreen ? 'flex-start' : 'center',
    alignItems: 'center',
    gap: isLargeScreen ? 20 : 8,
  },
  footerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerContactText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  footerAddressSection: {
    alignItems: isLargeScreen ? 'flex-start' : 'center',
  },
  footerAddressTitle: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  footerAddressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    textAlign: isLargeScreen ? 'left' : 'center',
    lineHeight: 16,
  },
  footerLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: isLargeScreen ? 'flex-start' : 'center',
    alignItems: 'center',
    gap: 6,
  },
  footerLink: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '500',
  },
  footerLinkDivider: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
  },
  footerCopyright: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  footerCountries: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
});
