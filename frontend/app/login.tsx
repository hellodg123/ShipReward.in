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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoHorizontal } from '../src/components/Logo';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

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

// Country flags as simple colored icons
const CountryFlag = ({ country }: { country: string }) => {
  const flagColors: { [key: string]: string[] } = {
    USA: ['#BF0A30', '#FFFFFF', '#002868'],
    UK: ['#012169', '#C8102E', '#FFFFFF'],
    Canada: ['#FF0000', '#FFFFFF'],
    Germany: ['#000000', '#DD0000', '#FFCE00'],
  };
  
  return (
    <View style={styles.flagContainer}>
      <View style={[styles.flagStripe, { backgroundColor: flagColors[country]?.[0] || COLORS.gray }]} />
      <View style={[styles.flagStripe, { backgroundColor: flagColors[country]?.[1] || COLORS.white }]} />
      <View style={[styles.flagStripe, { backgroundColor: flagColors[country]?.[2] || flagColors[country]?.[0] || COLORS.gray }]} />
    </View>
  );
};

// Car Icon SVG
const CarIcon = ({ size = 80, color = COLORS.primary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size * 0.5} viewBox="0 0 100 50">
    <Path
      d="M10 35 L20 35 L25 25 L35 15 L65 15 L80 25 L90 35 L90 40 L10 40 Z"
      fill={color}
    />
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

// Reward data
const topRewards = [
  { rank: '1-3', prize: '₹1 Crore Cash', icon: '💰', color: COLORS.gold },
  { rank: '4', prize: 'Range Rover Velar', value: '₹86.74 Lakh', icon: '🚗', color: COLORS.primary },
  { rank: '5', prize: 'BMW iX1 xDrive30', value: '₹71.24 Lakh', icon: '🚙', color: COLORS.primaryLight },
  { rank: '6', prize: 'Audi Q3 Premium', value: '₹49.71 Lakh', icon: '🚘', color: COLORS.secondary },
  { rank: '7', prize: 'Harley Davidson', value: '₹19.95 Lakh', icon: '🏍️', color: COLORS.orange },
  { rank: '10-50', prize: 'Royal Enfield Hunter', value: '₹1.88 Lakh', icon: '🏍️', color: COLORS.green },
  { rank: '51-75', prize: 'Samsung Galaxy Z Fold7', value: '₹1.86 Lakh', icon: '📱', color: COLORS.pink },
  { rank: '76-100', prize: 'iPhone 17 Pro Max', value: '₹1.69 Lakh', icon: '📱', color: COLORS.gray },
];

const shippingCountries = [
  { name: 'USA', flag: '🇺🇸', fullName: 'United States' },
  { name: 'UK', flag: '🇬🇧', fullName: 'United Kingdom' },
  { name: 'Canada', flag: '🇨🇦', fullName: 'Canada' },
  { name: 'Germany', flag: '🇩🇪', fullName: 'Germany' },
];

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        router.replace('/(tabs)/home');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToLogin = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

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
              <LogoHorizontal width={200} height={60} variant="light" />
            </View>

            <View style={styles.heroMain}>
              {/* Left Side - Hero Text */}
              <View style={styles.heroTextSection}>
                <Text style={styles.heroTagline}>🚀 Ship Globally, Win Big!</Text>
                <Text style={styles.heroTitle}>
                  International Shipping{'\n'}Made <Text style={styles.heroHighlight}>Rewarding</Text>
                </Text>
                <Text style={styles.heroSubtitle}>
                  Ship your orders to USA, Canada, UK & Germany at the best rates and stand a chance to win rewards worth
                </Text>
                <View style={styles.rewardHighlight}>
                  <Text style={styles.rewardAmount}>₹21 Crore+</Text>
                  <Text style={styles.rewardLabel}>in Amazing Rewards!</Text>
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

              {/* Right Side - Login Form */}
              <View style={styles.loginSection}>
                <View style={styles.loginCard}>
                  <Text style={styles.loginTitle}>Welcome Back!</Text>
                  <Text style={styles.loginSubtitle}>Sign in to start shipping & winning</Text>

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
                        <Ionicons 
                          name={showPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color={COLORS.gray} 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.forgotPassword}
                    onPress={() => router.push('/forgot-password')}
                  >
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={COLORS.white} />
                    ) : (
                      <>
                        <Text style={styles.loginButtonText}>Sign In</Text>
                        <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
                      </>
                    )}
                  </TouchableOpacity>

                  <View style={styles.signupRow}>
                    <Text style={styles.signupText}>New to ShipReward?</Text>
                    <TouchableOpacity onPress={() => router.push('/register')}>
                      <Text style={styles.signupLink}>Create Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
            <Text style={styles.rewardsSectionSubtitle}>Top 100 winners every month get incredible prizes</Text>
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
              <Text style={styles.stepDesc}>Get reward coupons for every shipment you make</Text>
            </View>

            <View style={styles.stepArrow}>
              <Ionicons name="arrow-forward" size={24} color={COLORS.gray} />
            </View>

            <View style={styles.stepCard}>
              <View style={[styles.stepNumber, { backgroundColor: COLORS.gold }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Win Big!</Text>
              <Text style={styles.stepDesc}>Monthly draws - win cars, bikes, phones & cash!</Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Ready to Ship & Win?</Text>
            <Text style={styles.ctaSubtitle}>Join thousands of happy shippers earning rewards</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/register')}>
              <Text style={styles.ctaButtonText}>Start Shipping Now</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <LogoHorizontal width={140} height={40} variant="dark" />
          <Text style={styles.footerText}>© 2025 ShipReward.in - All Rights Reserved</Text>
          <Text style={styles.footerCountries}>🇺🇸 USA | 🇬🇧 UK | 🇨🇦 Canada | 🇩🇪 Germany</Text>
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
    minHeight: isLargeScreen ? height * 0.9 : 'auto',
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
    padding: isLargeScreen ? 60 : 24,
    zIndex: 1,
  },
  logoSection: {
    marginBottom: 40,
  },
  heroMain: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isLargeScreen ? 'center' : 'stretch',
    gap: 40,
  },
  heroTextSection: {
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 600 : '100%',
  },
  heroTagline: {
    fontSize: 16,
    color: COLORS.gold,
    fontWeight: '600',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: isLargeScreen ? 52 : 36,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: isLargeScreen ? 62 : 44,
    marginBottom: 20,
  },
  heroHighlight: {
    color: COLORS.gold,
  },
  heroSubtitle: {
    fontSize: isLargeScreen ? 18 : 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 28,
    marginBottom: 24,
  },
  rewardHighlight: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 32,
  },
  rewardAmount: {
    fontSize: isLargeScreen ? 48 : 36,
    fontWeight: '800',
    color: COLORS.gold,
  },
  rewardLabel: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '600',
  },
  countriesSection: {
    marginTop: 20,
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
    gap: 12,
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  countryFlag: {
    fontSize: 20,
  },
  countryName: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  flagContainer: {
    width: 24,
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  flagStripe: {
    flex: 1,
    height: '100%',
  },

  // Login Section
  loginSection: {
    width: isLargeScreen ? 420 : '100%',
  },
  loginCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 24,
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
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.dark,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 4,
  },
  signupText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  // Why Choose Us Section
  whyChooseSection: {
    padding: isLargeScreen ? 80 : 40,
    backgroundColor: COLORS.lightGray,
  },
  sectionTitle: {
    fontSize: isLargeScreen ? 40 : 28,
    fontWeight: '800',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 48,
  },
  highlightText: {
    color: COLORS.primary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 28,
    width: isLargeScreen ? 280 : '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Rewards Section
  rewardsSection: {
    padding: isLargeScreen ? 80 : 40,
    backgroundColor: COLORS.white,
  },
  rewardsSectionHeader: {
    marginBottom: 48,
  },
  rewardsSectionSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: -32,
  },
  prizeShowcase: {
    alignItems: 'center',
  },
  grandPrizeCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginBottom: 40,
    width: isLargeScreen ? 400 : '100%',
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  grandPrizeBadge: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  grandPrizeBadgeText: {
    color: COLORS.dark,
    fontWeight: '800',
    fontSize: 12,
  },
  grandPrizeEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  grandPrizeAmount: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.dark,
  },
  grandPrizeLabel: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginTop: 8,
  },
  vehiclePrizesRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 24,
    marginBottom: 32,
    width: '100%',
    justifyContent: 'center',
  },
  vehiclePrizeCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 300 : '100%',
  },
  vehiclePrizeName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginTop: 16,
    textAlign: 'center',
  },
  vehiclePrizeValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 8,
  },
  vehiclePrizeRank: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  vehiclePrizeRankText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
  },
  bikePrizesRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 20,
    marginBottom: 32,
    width: '100%',
    justifyContent: 'center',
  },
  bikePrizeCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 280 : '100%',
  },
  bikePrizeName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginTop: 12,
    textAlign: 'center',
  },
  bikePrizeValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.green,
    marginTop: 4,
  },
  phonePrizesRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 20,
    width: '100%',
    justifyContent: 'center',
  },
  phonePrizeCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 300 : '100%',
  },
  phonePrizeName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginTop: 12,
    textAlign: 'center',
  },
  phonePrizeValue: {
    fontSize: 16,
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
    gap: isLargeScreen ? 20 : 24,
  },
  stepCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: isLargeScreen ? 280 : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  stepNumber: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDesc: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  stepArrow: {
    display: isLargeScreen ? 'flex' : 'none',
  },

  // CTA Section
  ctaSection: {
    padding: isLargeScreen ? 80 : 40,
    backgroundColor: COLORS.primary,
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: isLargeScreen ? 40 : 28,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 32,
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 30,
    gap: 12,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
  },

  // Footer
  footer: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    gap: 16,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  footerCountries: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
});
