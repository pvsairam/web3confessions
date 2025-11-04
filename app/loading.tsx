import { Lock } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-cyan/20 border-t-cyan animate-spin" />
          <Lock className="w-8 h-8 text-cyan absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-gray-400 font-mono">Decrypting...</p>
      </div>
    </div>
  );
}
