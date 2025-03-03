import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const getinter = Inter({ variable: '--font-geist-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Herwaree - Break Language Barriers, Anytime, Anywhere.',
  description:
    'Your journey to better breast health starts here. Let’s empower you with knowledge and tools to stay proactive and confident.'
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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
