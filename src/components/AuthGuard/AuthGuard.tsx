'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SplashScreen } from '@/components';
import { useAuthState } from '@/modules/Auth/context';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthLoaded, isOnboarded } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();
  const [isRouting, setIsRouting] = useState(true);

  const publicPages = ['/auth', '/onboarding'];
  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    if (!isAuthLoaded) return;

    if (isAuthenticated) {
      if (!isOnboarded && pathname !== '/onboarding') {
        setIsRouting(true);
        router.replace('/onboarding');
      } else if (isOnboarded && isPublicPage) {
        setIsRouting(true);
        router.replace('/');
      } else {
        setIsRouting(false);
      }
    } else if (!isAuthenticated && !isPublicPage) {
      setIsRouting(true);
      router.replace('/auth');
    } else {
      setIsRouting(false);
    }
  }, [isAuthenticated, isOnboarded, isAuthLoaded, router, pathname]);

  // Prevent rendering any page until the right route is set
  if (!isAuthLoaded || isRouting) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
