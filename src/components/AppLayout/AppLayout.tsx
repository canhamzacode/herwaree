'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AuthGuard } from '../AuthGuard';
import { usePathname } from 'next/navigation';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { LuMap, LuUserRound } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { Navigation } from '../Navigation';
import { AuthProvider } from '@/modules/Auth/context';
import SelfExaminationProvider from '@/modules/SelfExamination/context';
import RiskPredictionProvider from '@/modules/RiskPrediction/context';

const PrivyProviderWrapper = dynamic(() => import('@/components/PrivyProvider/PrivyProvider'), {
  ssr: false
});

interface IAppLayout {
  children: ReactNode;
}

const routes = [
  {
    name: 'Home',
    icon: <RiHomeSmile2Line size={20} />,
    path: '/'
  },
  {
    name: 'Overview',
    icon: <LuMap size={20} />,
    path: '/overview'
  },
  {
    name: 'Stories',
    icon: <MdOutlineEventNote size={20} />,
    path: '/stories'
  },
  {
    name: 'Profile',
    icon: <LuUserRound size={20} />,
    path: '/profile'
  }
];

export default function AppLayout({ children }: IAppLayout) {
  const pathname = usePathname();

  const isAuthPage = ['/auth', '/onboarding'].some((path) => pathname.startsWith(path));
  const isValidRoute = routes.some((route) => route.path === pathname);

  return (
    <PrivyProviderWrapper>
      <AuthProvider>
        <SelfExaminationProvider>
          <RiskPredictionProvider>
            <AuthGuard>
              {/* Ensures the layout takes full screen height */}
              <div className="w-full max-w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex-grow pb-[85px]">{children}</div>

                {/* Show navigation only if it's not an auth page and is a valid route */}
                {!isAuthPage && isValidRoute && <Navigation routes={routes} pathname={pathname} />}
              </div>
            </AuthGuard>
          </RiskPredictionProvider>
        </SelfExaminationProvider>
      </AuthProvider>
    </PrivyProviderWrapper>
  );
}
