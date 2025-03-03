'use client';

import React, { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

interface IProvider {
  children: ReactNode;
}

const Provider = ({ children }: IProvider) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '/splashLogo.png'
        },
        loginMethods: ['email', 'wallet'],
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets'
          },
          solana: {
            createOnLogin: 'users-without-wallets'
          }
        },
        solanaClusters: [{ name: 'mainnet-beta', rpcUrl: 'https://api.mainnet-beta.solana.com' }]
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Provider;
