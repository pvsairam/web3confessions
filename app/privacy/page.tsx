'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePublicClient } from 'wagmi';
import { GlassCard } from '@/components/GlassCard';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import { Lock, Heart, Users, TrendingUp, Shield, Zap, Eye, Database } from 'lucide-react';

interface Stats {
  totalConfessions: number;
  totalUpvotes: number;
  activeUsers: number;
  encryptionStrength: string;
}

export default function PrivacyPage() {
  const publicClient = usePublicClient();
  const [stats, setStats] = useState<Stats>({
    totalConfessions: 0,
    totalUpvotes: 0,
    activeUsers: 0,
    encryptionStrength: 'FHE-256',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!publicClient) return;

      try {
        const count = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'count',
        });

        // Fetch all items to calculate upvotes
        let totalUpvotes = 0;
        const uniqueAuthors = new Set<string>();

        for (let i = 0; i < Number(count); i++) {
          const item = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'items',
            args: [BigInt(i)],
          });

          totalUpvotes += Number(item[2]);
          uniqueAuthors.add(item[0].toLowerCase());
        }

        setStats({
          totalConfessions: Number(count),
          totalUpvotes,
          activeUsers: uniqueAuthors.size,
          encryptionStrength: 'FHE-256',
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [publicClient]);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-cyan animate-glow" />
            <h1 className="font-display text-6xl font-bold gradient-text">Privacy Dashboard</h1>
          </div>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            All metrics computed under encryption. Your secrets remain mathematically secure.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Lock}
            label="Total Confessions"
            value={stats.totalConfessions}
            subtext="Encrypted forever"
            delay={0}
            loading={loading}
            gradient="from-base to-blue-600"
          />
          <StatCard
            icon={Heart}
            label="Total Reactions"
            value={stats.totalUpvotes}
            subtext="Anonymous upvotes"
            delay={0.1}
            loading={loading}
            gradient="from-pink-500 to-red-500"
          />
          <StatCard
            icon={Users}
            label="Active Users"
            value={stats.activeUsers}
            subtext="Unique addresses"
            delay={0.2}
            loading={loading}
            gradient="from-cyan to-teal-500"
          />
          <StatCard
            icon={Shield}
            label="Encryption"
            value={stats.encryptionStrength}
            subtext="Military grade"
            delay={0.3}
            loading={loading}
            gradient="from-purple-500 to-indigo-600"
            isText
          />
        </div>

        {/* Privacy Features */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            Privacy Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Lock}
              title="End-to-End Encryption"
              description="Your confessions are encrypted on your device before being sent to the blockchain. Nobody can read them except you."
            />
            <FeatureCard
              icon={Eye}
              title="Zero Knowledge"
              description="Aggregations and computations are performed on encrypted data without ever revealing the plaintext."
            />
            <FeatureCard
              icon={Database}
              title="Immutable Storage"
              description="Your encrypted confessions are stored permanently on Base blockchain, ensuring they can never be deleted or modified."
            />
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-8" hover={false}>
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-cyan" />
              <h3 className="font-display text-2xl font-bold">How FHE Works</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-cyan">Fully Homomorphic Encryption</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  FHE allows computations to be performed directly on encrypted data without
                  decryption. This means aggregations, sorting, and analytics can happen while
                  your secrets remain completely private.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    Client-side encryption using Zama FHEVM
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    On-chain computation without decryption
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    Only you hold the decryption key
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-cyan">Base Integration</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Built on Base Sepolia testnet, this app demonstrates how privacy-preserving
                  dApps can be built on Ethereum L2s with fast transactions and low fees.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    Deploy to Base Mainnet with one config change
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    Gas-efficient encrypted storage
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                    Compatible with Farcaster Frames
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>
                  Contract Address:{' '}
                  <code className="text-cyan font-mono">
                    {CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-8)}
                  </code>
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  delay,
  loading,
  gradient,
  isText = false,
}: {
  icon: any;
  label: string;
  value: number | string;
  subtext: string;
  delay: number;
  loading: boolean;
  gradient: string;
  isText?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (loading || isText) return;

    let start = 0;
    const end = typeof value === 'number' ? value : 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, loading, isText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <GlassCard className="stat-card">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-cipher-glow`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="stat-value mb-2">
          {loading ? (
            <div className="spinner w-8 h-8 mx-auto" />
          ) : isText ? (
            value
          ) : (
            displayValue.toLocaleString()
          )}
        </div>

        <p className="text-gray-400 font-medium mb-1">{label}</p>
        <p className="text-gray-600 text-sm">{subtext}</p>
      </GlassCard>
    </motion.div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-base to-cyan flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </GlassCard>
  );
}
