'use client';

import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter, usePathname } from 'next/navigation';
import { SplashScreen } from '@/components';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authenticated, ready } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    const publicPages = ['/auth', '/onboarding'];

    if (authenticated && publicPages.includes(pathname)) {
      router.replace('/');
    } else if (!authenticated && pathname.startsWith('/')) {
      router.replace('/auth');
    }

    setLoading(false);
  }, [authenticated, ready, pathname, router]);

  // Show SplashScreen while checking auth status
  if (loading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
