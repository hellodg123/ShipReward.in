import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      
      const { access_token, user: userData } = response.data;
      
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      setToken(access_token);
      setUser(userData);
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed. Please try again.';
      throw new Error(message);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      
      const { access_token, user: newUser } = response.data;
      
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(access_token);
      setUser(newUser);
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Registration failed. Please try again.';
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const forgotPassword = async (email: string): Promise<string> => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      return response.data.message;
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Failed to process request. Please try again.';
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
