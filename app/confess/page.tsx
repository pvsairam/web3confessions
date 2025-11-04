'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { EncryptedBadge } from '@/components/EncryptedBadge';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import { encryptText, formatCiphertext } from '@/lib/fhe';
import { Lock, Send, Eye, EyeOff, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConfessPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [confession, setConfession] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [step, setStep] = useState<'write' | 'encrypt' | 'submit' | 'success'>('write');

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleEncrypt = async () => {
    if (!confession.trim()) return;

    setIsEncrypting(true);
    setStep('encrypt');

    try {
      // Simulate encryption delay for dramatic effect
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const ciphertext = await encryptText(confession);
      setEncrypted(ciphertext);
      setShowPreview(true);
      setStep('submit');
    } catch (error) {
      console.error('Encryption failed:', error);
      setStep('write');
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleSubmit = async () => {
    if (!encrypted || !isConnected) return;

    try {
      // Convert hex string to bytes
      const bytes = encrypted.startsWith('0x') ? encrypted : `0x${encrypted}`;

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'postConfession',
        args: [bytes as `0x${string}`],
      });
    } catch (error) {
      console.error('Failed to submit confession:', error);
    }
  };

  // Handle success
  if (isSuccess) {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-cyan animate-glow" />
            <h1 className="font-display text-5xl font-bold gradient-text">
              Share Your Secret
            </h1>
            <Sparkles className="w-6 h-6 text-cyan animate-glow" />
          </div>
          <p className="text-gray-400 text-lg">
            Your confession will be encrypted before leaving your device
          </p>
          <div className="flex items-center justify-center mt-4">
            <EncryptedBadge />
          </div>
        </motion.div>

        {/* Main Card */}
        <GlassCard className="p-8" hover={false}>
          <AnimatePresence mode="wait">
            {!isConnected ? (
              <motion.div
                key="connect"
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Lock className="w-16 h-16 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">Connect Your Wallet</h3>
                <p className="text-gray-400 mb-8">
                  Connect your wallet to share an encrypted confession
                </p>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success"
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-cipher-glow"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold mb-4 text-green-400">
                  Confession Encrypted & Posted!
                </h3>
                <p className="text-gray-400 mb-2">
                  Your secret is now encrypted forever on Base
                </p>
                <p className="text-sm text-gray-600 font-mono">
                  Transaction: {hash?.slice(0, 10)}...{hash?.slice(-8)}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Steps indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <StepIndicator
                    number={1}
                    label="Write"
                    active={step === 'write'}
                    completed={step !== 'write'}
                  />
                  <div className="w-12 h-0.5 bg-white/20" />
                  <StepIndicator
                    number={2}
                    label="Encrypt"
                    active={step === 'encrypt'}
                    completed={step === 'submit' || step === 'success'}
                  />
                  <div className="w-12 h-0.5 bg-white/20" />
                  <StepIndicator
                    number={3}
                    label="Submit"
                    active={step === 'submit'}
                    completed={step === 'success'}
                  />
                </div>

                {/* Confession Input */}
                <div className="mb-6">
                  <Input
                    multiline
                    rows={8}
                    placeholder="Share your secret anonymously... Your words will be encrypted before anyone can see them."
                    value={confession}
                    onChange={(e) => setConfession(e.target.value)}
                    disabled={step !== 'write'}
                    className="text-lg"
                  />
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>{confession.length} characters</span>
                    {confession.length > 0 && (
                      <span className="text-cyan">Ready to encrypt</span>
                    )}
                  </div>
                </div>

                {/* Preview Encrypted */}
                {showPreview && encrypted && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="glass-panel p-4 border-cyan/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Encrypted Preview</span>
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className="text-cyan hover:text-white transition-colors"
                        >
                          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="cipher-text text-xs break-all">
                        {formatCiphertext(encrypted, 100)}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Display */}
                {error && (
                  <motion.div
                    className="mb-6 glass-panel p-4 border-red-500/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{error.message}</span>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  {step === 'write' && (
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleEncrypt}
                      disabled={!confession.trim() || isEncrypting}
                      isLoading={isEncrypting}
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      {isEncrypting ? 'Encrypting...' : 'Encrypt Confession'}
                    </Button>
                  )}

                  {step === 'submit' && (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setStep('write');
                          setEncrypted('');
                          setShowPreview(false);
                        }}
                      >
                        Start Over
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={isPending || isConfirming}
                        isLoading={isPending || isConfirming}
                      >
                        <Send className="w-5 h-5 mr-2" />
                        {isPending || isConfirming ? 'Submitting...' : 'Submit to Blockchain'}
                      </Button>
                    </>
                  )}
                </div>

                {/* Info */}
                <div className="mt-8 glass-panel p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan" />
                    How it works
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Your confession is encrypted on your device using FHE</li>
                    <li>• Only encrypted data is sent to the blockchain</li>
                    <li>• Only you can decrypt and read your own confession</li>
                    <li>• Your identity remains anonymous</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
          transition-all duration-300
          ${
            active
              ? 'bg-gradient-to-br from-base to-cyan text-white shadow-cipher-glow scale-110'
              : completed
              ? 'bg-cyan/20 text-cyan border border-cyan/30'
              : 'bg-white/5 text-gray-600 border border-white/10'
          }
        `}
        animate={{ scale: active ? 1.1 : 1 }}
      >
        {completed ? <CheckCircle2 className="w-5 h-5" /> : number}
      </motion.div>
      <span className={`text-xs ${active ? 'text-white' : 'text-gray-600'}`}>{label}</span>
    </div>
  );
}
