import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'ClearBite - Clear Choices. Better Bites.',
  description:
    'Explore a wide variety of cuisines, discover top restaurants, and order your favorite meals with confidence.',
  keywords: 'food delivery, restaurants, cuisines, ClearBite, order food online',
  openGraph: {
    title: 'ClearBite - Clear Choices. Better Bites.',
    description: 'Explore a wide variety of cuisines, discover top restaurants and order your favorite meals.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
