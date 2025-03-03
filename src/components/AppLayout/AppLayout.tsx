'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AuthGuard } from '../AuthGuard';

const PrivyProviderWrapper = dynamic(() => import('@/components/PrivyProvider/PrivyProvider'), {
  ssr: false
});

interface IAppLayout {
  children: ReactNode;
}

export default function AppLayout({ children }: IAppLayout) {
  return (
    <PrivyProviderWrapper>
      <AuthGuard>
        <div className="w-full max-w-[375px] mx-auto">{children}</div>
      </AuthGuard>
    </PrivyProviderWrapper>
  );
}
