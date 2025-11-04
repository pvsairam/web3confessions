import type { Metadata } from 'next';
import { Inter, Playfair_Display, Roboto_Mono } from 'next/font/google';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Crypto Confessions | Encrypted Anonymous Confessions on Base',
  description:
    'Share your secrets anonymously with end-to-end encryption powered by Zama FHEVM on Base blockchain. Your confessions, encrypted forever.',
  keywords: ['blockchain', 'encryption', 'privacy', 'confessions', 'FHE', 'Base', 'Farcaster'],
  authors: [{ name: 'xtestnet' }],
  openGraph: {
    title: 'Crypto Confessions',
    description: 'Encrypted anonymous confessions on Base blockchain',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${robotoMono.variable}`}>
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
