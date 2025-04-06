'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

interface IUser {
  email: string;
  username: string;
}
interface AuthContextType {
  user: { privy_id: string; email: string; wallet_addr: string } | null;
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  isOnboarded: boolean;
  login: () => void;
  logout: () => void;
  onboardUser: (username: string, image_id: string) => void;
  getUserInfo: () => void;
  authUser: IUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authenticated, ready, login, logout, user } = usePrivy();
  const router = useRouter();
  const [userData, setUserData] = useState<AuthContextType['user'] | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<IUser | null>(null);

  const handleAuthentication = async (privyUser: typeof user) => {
    if (!privyUser) return;

    if (!privyUser || !privyUser.id || !privyUser.wallet?.address) {
      console.error('User data is incomplete, skipping authentication request.');
      return;
    }

    const formData = {
      privy_id: privyUser.id,
      email: privyUser.email?.address || '',
      wallet_addr: privyUser.wallet.address
    };

    setUserData(formData);

    try {
      const res = await axiosInstance.post('/auth/auth-me', formData);
      setIsOnboarded(res.data.isOnboarded);
      // router.replace(res.data.isOnboarded ? '/' : '/onboarding');
    } catch (error) {
      console.error('Error sending user data:', error);
    } finally {
      setIsAuthLoaded(true);
    }
  };

  const onboardUser = async (username: string, image_id: string) => {
    if (!userData?.privy_id) return;

    try {
      await axiosInstance.post(`/auth/onboard/${userData.privy_id}`, { username, image_id });
      setIsOnboarded(true);
      router.replace('/');
    } catch (error) {
      console.error('Error onboarding user:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get(`/auth/user/${user?.id}`);
      console.log('res', res);
      setAuthUser(res.data.user);
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };

  useEffect(() => {
    if (ready) {
      if (authenticated && user) {
        handleAuthentication(user);
      } else {
        setIsAuthLoaded(true);
      }
    }
  }, [authenticated, ready, user]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        isAuthenticated: authenticated,
        isAuthLoaded,
        isOnboarded,
        login,
        logout,
        onboardUser,
        getUserInfo,
        authUser
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
