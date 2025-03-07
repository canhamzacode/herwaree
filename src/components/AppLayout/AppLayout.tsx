'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AuthGuard } from '../AuthGuard';
import { usePathname } from 'next/navigation';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { LuMap, LuUserRound } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { Navigation } from '../Navigation';

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
    name: 'Map',
    icon: <LuMap size={20} />,
    path: '/map'
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

  return (
    <PrivyProviderWrapper>
      <AuthGuard>
        {/* Ensures the layout takes full screen height */}
        <div className="w-full max-w-[375px] mx-auto min-h-screen flex flex-col">
          <div className="flex-grow pb-[85px]">{children}</div>

          {/* Fixed bottom navigation */}
          {!isAuthPage && <Navigation routes={routes} pathname={pathname} />}
        </div>
      </AuthGuard>
    </PrivyProviderWrapper>
  );
}
