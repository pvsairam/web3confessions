import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://crypto-confessions.vercel.app';

  const frameMetadata = {
    version: 'vNext',
    image: `${appUrl}/og-image.png`,
    buttons: [
      {
        label: 'Share a Confession',
        action: 'link',
        target: `${appUrl}/confess`,
      },
      {
        label: 'View Feed',
        action: 'link',
        target: appUrl,
      },
    ],
  };

  return NextResponse.json(frameMetadata);
}

export async function POST() {
  // Handle Farcaster Frame actions
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://crypto-confessions.vercel.app';

  return NextResponse.json({
    version: 'vNext',
    image: `${appUrl}/og-image.png`,
    buttons: [
      {
        label: 'Share a Confession',
        action: 'link',
        target: `${appUrl}/confess`,
      },
    ],
  });
}
