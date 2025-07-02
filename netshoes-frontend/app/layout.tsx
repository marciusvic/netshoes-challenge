import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ContextManager } from '@/context/context-manager';
import NavBar from '@/components/nav-bar/nav-bar';
import Navigation from '@/components/navigation/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Netshoes Frontend Challenge',
  description: 'A simple e-commerce frontend application with home and wishlist pages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ContextManager>
          <NavBar />
          <Navigation />
          {children}
        </ContextManager>
      </body>
    </html>
  );
}
