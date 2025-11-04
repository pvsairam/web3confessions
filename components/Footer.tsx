import { Heart, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 backdrop-blur-xl bg-void-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Main tagline */}
          <div className="flex items-center gap-2 text-gray-400">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse-slow" />
            <span>by</span>
            <a
              href="https://twitter.com/xtestnet"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-cyan hover:text-white transition-colors"
            >
              xtestnet
            </a>
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
            <span>Powered by</span>
            <span className="px-2 py-1 rounded bg-white/5">Zama FHEVM</span>
            <span className="px-2 py-1 rounded bg-white/5">Base</span>
            <span className="px-2 py-1 rounded bg-white/5">Farcaster</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-gray-600 text-center max-w-md">
            All confessions are encrypted on your device before being stored on-chain.
            Your secrets are mathematically impossible to decrypt without your permission.
          </p>
        </div>
      </div>
    </footer>
  );
}
