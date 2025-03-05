'use client';

import React, { ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
const solanaConnectors = toSolanaWalletConnectors();

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
          logo: '/splashLogo.png',
          showWalletLoginFirst: true,
          walletList: ['phantom', 'solflare']
        },
        loginMethods: ['email', 'wallet'],
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets'
          }
        },
        externalWallets: {
          solana: { connectors: solanaConnectors }
        },
        solanaClusters: [{ name: 'mainnet-beta', rpcUrl: 'https://api.mainnet-beta.solana.com' }]
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Provider;
