import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep cosmic background gradients
        void: {
          900: '#0b0d12',
          800: '#111827',
          700: '#1a202e',
        },
        // Base blue - the color of trust and encryption
        base: {
          DEFAULT: '#0052FF',
          light: '#3374FF',
          dark: '#0041CC',
        },
        // Cyan accents - digital whispers
        cyan: {
          DEFAULT: '#00E0FF',
          light: '#4DFFFF',
          dark: '#00A8CC',
        },
        // Glass surfaces
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
      },
      fontFamily: {
        // Poetic serif for headings
        display: ['Playfair Display', 'Georgia', 'serif'],
        // Clean sans for body
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        // Monospace for cipher text
        mono: ['Roboto Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0b0d12 0%, #111827 50%, #0b0d12 100%)',
        'glass-shimmer': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'encryption-glow': 'radial-gradient(circle at center, rgba(0, 82, 255, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 48px 0 rgba(0, 82, 255, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(0, 224, 255, 0.1)',
        'cipher-glow': '0 0 20px rgba(0, 224, 255, 0.3), 0 0 40px rgba(0, 82, 255, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bubble-up': 'bubbleUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(0, 224, 255, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 20px rgba(0, 224, 255, 0.6))' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bubbleUp: {
          '0%': {
            transform: 'translateY(100px) scale(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1',
          },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
