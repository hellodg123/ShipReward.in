import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  gray: '#6B7280',
  darkGray: '#374151',
  error: '#EF4444',
  gold: '#F59E0B',
};

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email.trim(), password);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
            {/* Left Side - Branding */}
            <View style={styles.brandingSection}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.tagline}>Delivering</Text>
              <Text style={styles.taglineHighlight}>Beyond Borders</Text>
              <Text style={styles.subtitle}>International Shipping to</Text>
              <Text style={styles.subtitle}>220+ Countries</Text>
            </View>

            {/* Right Side - Login Form */}
            <View style={styles.formSection}>
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Login</Text>

                {error ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={18} color={COLORS.error} />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.gray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.gray}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={22}
                        color={COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => router.push('/forgot-password')}
                  style={styles.forgotButton}
                >
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>New User? </Text>
                  <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.registerLink}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: isLargeScreen ? 'row' : 'column',
  },
  brandingSection: {
    backgroundColor: COLORS.primaryDark,
    padding: 32,
    paddingTop: 48,
    flex: isLargeScreen ? 0.45 : undefined,
    minHeight: isLargeScreen ? '100%' : 280,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 32,
  },
  tagline: {
    fontSize: 36,
    fontWeight: '300',
    fontStyle: 'italic',
    color: COLORS.gold,
    marginBottom: 4,
  },
  taglineHighlight: {
    fontSize: 36,
    fontWeight: '700',
    fontStyle: 'italic',
    color: COLORS.gold,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '600',
  },
  formSection: {
    flex: isLargeScreen ? 0.55 : 1,
    backgroundColor: COLORS.lightGray,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.error,
    marginLeft: 8,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  eyeButton: {
    padding: 14,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
