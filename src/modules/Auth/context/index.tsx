/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import toast from 'react-hot-toast';

interface IUser {
  email: string;
  username: string;
}

interface AuthContextType {
  user: { id: string; email: string } | null;
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  onboardUser: (username: string, image_id: string) => void;
  getUserInfo: () => void;
  authUser: IUser | null;
  verifyOtp: (token: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<AuthContextType['user'] | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      console.log('Login response:', res);

      if (res.data?.data?.accessToken && res.data?.data?.user) {
        // Save token to localStorage
        localStorage.setItem('accessToken', res.data.data.accessToken);

        // Set user data
        setUserData({ id: res.data.data.user.id, email: res.data.data.user.email });
        setIsAuthenticated(true);
        setIsAuthLoaded(true);

        // Optionally, navigate to home or dashboard
        router.replace('/');
      } else {
        setIsAuthenticated(false);
        setIsAuthLoaded(true);
      }
    } catch (error: any) {
      const backendMsg =
        error?.response?.data?.cleanedMessage || error?.response?.data?.message || 'Login error';
      toast.error(backendMsg);
      setIsAuthenticated(false);
      setIsAuthLoaded(true);
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
      await axiosInstance.post('/auth/signup', {
        firstname,
        lastname,
        email,
        password
      });
    } catch (error: any) {
      const backendMsg =
        error?.response?.data?.cleanedMessage ||
        error?.response?.data?.message ||
        'Registration error';
      toast.error(backendMsg);
      console.error('Registration error:', error);
      throw error;
    }
  };

  const verifyOtp = async (token: string, email: string) => {
    try {
      await axiosInstance.post('/auth/user/verify-otp', {
        email,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setAuthUser(null);
    setIsOnboarded(false);
    router.push('/auth');
  };

  const onboardUser = async (username: string, image_id: string) => {
    if (!userData?.id) return;

    try {
      await axiosInstance.post(`/auth/onboard/${userData.id}`, { username, image_id });
      setIsOnboarded(true);
      router.replace('/');
    } catch (error) {
      console.error('Error onboarding user:', error);
    }
  };

  // Update axiosInstance to use token for Authorization header
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [isAuthenticated]);

  const getUserInfo = async () => {
    try {
      // Get token from localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!token) return;

      // Set Authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const res = await axiosInstance.get('/auth/profile-me');
      console.log('res', res);
      setAuthUser(res.data.user);
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };

  useEffect(() => {
    // TODO: Check for existing session/token
    setIsAuthLoaded(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        isAuthenticated,
        isAuthLoaded,
        isOnboarded,
        login,
        logout,
        register,
        onboardUser,
        getUserInfo,
        authUser,
        verifyOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};
