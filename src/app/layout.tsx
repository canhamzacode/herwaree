import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const getinter = Inter({ variable: '--font-geist-inter', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Herwaree - Your journey to better breast health starts here.',
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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="Herwaree Team" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Herwaree - Your journey to better breast health starts here."
        />
        <meta
          property="og:description"
          content="Your journey to better breast health starts here. Let’s empower you with knowledge and tools to stay proactive and confident."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://herwaree-three.vercel.app/" />
        <meta property="og:image" content="/logo.png" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${getinter.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
