import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export function EncryptedBadge() {
  return (
    <motion.div
      className="encrypted-badge"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Lock className="w-3 h-3" />
      <span>End-to-end encrypted</span>
    </motion.div>
  );
}
