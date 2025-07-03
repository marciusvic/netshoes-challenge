import type { Metadata } from 'next';
import './globals.css';
import { ContextManager } from '@/context/context-manager';
import NavBar from '@/components/nav-bar/nav-bar';
import Navigation from '@/components/navigation/navigation';

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
    <html lang="pt-br">
      <body>
        <ContextManager>
          <NavBar />
          <Navigation />
          {children}
        </ContextManager>
      </body>
    </html>
  );
}
