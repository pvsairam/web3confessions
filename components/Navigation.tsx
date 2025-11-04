'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Lock, Home, Send, Shield } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { href: '/', label: 'Feed', icon: Home },
  { href: '/confess', label: 'Confess', icon: Send },
  { href: '/privacy', label: 'Privacy', icon: Shield },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-void-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-base to-cyan shadow-cipher-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lock className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="font-display text-xl font-bold gradient-text">
                Crypto Confessions
              </h1>
              <p className="text-xs text-gray-500 font-mono">
                Encrypted forever
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <MobileMenu />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl
                        transition-all duration-300
                        ${
                          isActive
                            ? 'bg-base/20 text-cyan border border-base/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Connect Wallet Button */}
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
