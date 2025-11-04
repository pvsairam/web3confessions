import Link from 'next/link';
import { Lock, Home } from 'lucide-react';
import { Button } from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 relative">
          <div className="text-9xl font-display font-bold gradient-text">404</div>
          <Lock className="w-12 h-12 text-cyan absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-glow" />
        </div>

        <h1 className="font-display text-4xl font-bold mb-4">
          This confession is encrypted
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been encrypted beyond recovery.
        </p>

        <Link href="/">
          <Button size="lg">
            <Home className="w-5 h-5 mr-2" />
            Return to Feed
          </Button>
        </Link>
      </div>
    </div>
  );
}
