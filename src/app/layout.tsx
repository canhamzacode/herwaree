import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const getinter = Inter({
  variable: '--font-geist-inter',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'EccoChain - Break Language Barriers, Anytime, Anywhere.',
  description: 'Break Language Barriers, Anytime, Anywhere.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${getinter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
