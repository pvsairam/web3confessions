export const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'bytes', name: 'ciphertext', type: 'bytes' }],
    name: 'postConfession',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'bytes', name: 'ciphertext', type: 'bytes' },
    ],
    name: 'reactConfession',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'upvote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'count',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'items',
    outputs: [
      { internalType: 'address', name: 'author', type: 'address' },
      { internalType: 'bytes', name: 'ciphertext', type: 'bytes' },
      { internalType: 'uint256', name: 'upvotes', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'author', type: 'address' },
      { indexed: false, internalType: 'bytes', name: 'ciphertext', type: 'bytes' },
    ],
    name: 'Posted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'by', type: 'address' },
      { indexed: false, internalType: 'bytes', name: 'ciphertext', type: 'bytes' },
    ],
    name: 'Reacted',
    type: 'event',
  },
] as const;

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  '0x0000000000000000000000000000000000000000') as `0x${string}`;

export interface Confession {
  id: number;
  author: string;
  ciphertext: string;
  upvotes: number;
  timestamp?: number;
}
