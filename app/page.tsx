'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount, usePublicClient } from 'wagmi';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { EncryptedBadge } from '@/components/EncryptedBadge';
import { CONTRACT_ABI, CONTRACT_ADDRESS, Confession } from '@/lib/contract';
import { canDecrypt, decryptText, formatCiphertext } from '@/lib/fhe';
import { Lock, Heart, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [loading, setLoading] = useState(true);
  const [decryptedTexts, setDecryptedTexts] = useState<Record<number, string>>({});

  // Fetch confessions from contract
  useEffect(() => {
    async function fetchConfessions() {
      if (!publicClient) return;

      try {
        // Get total count
        const count = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'count',
        });

        // Fetch all confessions
        const items: Confession[] = [];
        for (let i = 0; i < Number(count); i++) {
          const item = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'items',
            args: [BigInt(i)],
          });

          items.push({
            id: i,
            author: item[0],
            ciphertext: item[1] as string,
            upvotes: Number(item[2]),
          });
        }

        setConfessions(items.reverse()); // Show newest first
      } catch (error) {
        console.error('Failed to fetch confessions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchConfessions();
  }, [publicClient]);

  // Attempt to decrypt user's own confessions
  useEffect(() => {
    async function attemptDecryption() {
      if (!address) return;

      const newDecrypted: Record<number, string> = {};

      for (const confession of confessions) {
        if (canDecrypt(confession.ciphertext, address, confession.author)) {
          const plaintext = await decryptText(confession.ciphertext);
          if (plaintext) {
            newDecrypted[confession.id] = plaintext;
          }
        }
      }

      setDecryptedTexts(newDecrypted);
    }

    attemptDecryption();
  }, [confessions, address]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background effects */}
        <div className="absolute inset-0 bg-encryption-glow opacity-30" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-base/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-cyan animate-glow" />
              <h1 className="font-display text-6xl md:text-7xl font-bold gradient-text">
                Crypto Confessions
              </h1>
              <Sparkles className="w-8 h-8 text-cyan animate-glow" />
            </div>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Share your secrets anonymously.{' '}
              <span className="text-cyan font-medium">Encrypted forever</span> on Base.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <EncryptedBadge />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Link href="/confess">
                <Button size="lg" className="shadow-cipher-glow">
                  <Lock className="w-5 h-5 mr-2" />
                  Share a Confession
                </Button>
              </Link>
              <Link href="/privacy">
                <Button variant="secondary" size="lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Stats
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Confessions Feed */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Recent Confessions
          </h2>
          <p className="text-center text-gray-500">
            All confessions are end-to-end encrypted. Only you can read your own.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="spinner w-8 h-8" />
            <span className="ml-3 text-gray-400">Loading confessions...</span>
          </div>
        ) : confessions.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lock className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 mb-6">No confessions yet. Be the first to share!</p>
            <Link href="/confess">
              <Button>Create First Confession</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {confessions.map((confession, index) => {
              const isOwnConfession = address && canDecrypt(
                confession.ciphertext,
                address,
                confession.author
              );
              const decryptedText = decryptedTexts[confession.id];

              return (
                <motion.div
                  key={confession.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <GlassCard className="confession-bubble p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-base to-cyan flex items-center justify-center">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-mono text-sm text-gray-500">
                            {confession.author.slice(0, 6)}...{confession.author.slice(-4)}
                          </p>
                          <p className="text-xs text-gray-600">Confession #{confession.id}</p>
                        </div>
                      </div>

                      {isOwnConfession && (
                        <span className="text-xs px-2 py-1 rounded-full bg-cyan/20 text-cyan border border-cyan/30">
                          Your confession
                        </span>
                      )}
                    </div>

                    {/* Confession content */}
                    <div className="mb-4">
                      {decryptedText ? (
                        <motion.p
                          className="text-lg text-gray-200 leading-relaxed"
                          initial={{ opacity: 0, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          transition={{ duration: 0.5 }}
                        >
                          {decryptedText}
                        </motion.p>
                      ) : (
                        <div className="relative">
                          <p className="cipher-text blurred select-none">
                            {formatCiphertext(confession.ciphertext, 120)}
                          </p>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="glass-panel px-4 py-2 flex items-center gap-2">
                              <Lock className="w-4 h-4 text-cyan" />
                              <span className="text-sm text-gray-400">Encrypted</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{confession.upvotes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-cyan transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">React</span>
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
