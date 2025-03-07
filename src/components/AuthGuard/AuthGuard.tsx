'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter, usePathname } from 'next/navigation';
import { SplashScreen } from '@/components';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Define public pages that don't require authentication
  const publicPages = ['/auth'];
  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    if (!ready) return;

    if (authenticated && isPublicPage) {
      router.replace('/');
      setLoading(false);
    } else if (!authenticated && !isPublicPage) {
      router.replace('/auth');
      setLoading(false);
    } else {
      // User is authenticated and on a protected page OR
      // User is unauthenticated and on a public page
      setLoading(false);
    }
  }, [authenticated, ready, router, isPublicPage]); // Added isPublicPage dependency

  // Show SplashScreen while checking auth status
  if (loading) {
    return <SplashScreen />;
  }

  // Only render children if:
  // 1. User is authenticated and on a protected page, OR
  // 2. User is on a public page (authenticated or not)
  if ((authenticated && !isPublicPage) || isPublicPage) {
    return <>{children}</>;
  }

  // For any other case, show the splash screen
  // This prevents the flash of protected content
  return <SplashScreen />;
}
