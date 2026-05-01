import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E7D7C2', // Ivory/beige
        muted: '#BFA98D', // Warm muted
        accent: '#8EBB1D', // Olive green
        'accent-bright': '#A8D141', // Brighter olive
        'black-900': '#000000',
        'black-800': '#0a0a0a',
        'black-700': '#1a1410',
      },
      fontFamily: {
        cinzel: ['Cinzel', ...defaultTheme.fontFamily.serif],
        cormorant: ['Cormorant Garamond', ...defaultTheme.fontFamily.serif],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        sans: ['El Messiri', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      backgroundImage: {
        'gradient-edge':
          'radial-gradient(ellipse at top, transparent 0%, rgba(0,0,0,0.4) 100%)',
        'gradient-noise':
          'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" /%3E%3C/filter%3E%3Crect width="400" height="400" fill="%23000" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E")',
      },
      boxShadow: {
        glow: '0 0 20px rgba(142, 187, 29, 0.5)',
        'glow-lg': '0 0 40px rgba(142, 187, 29, 0.6)',
        'glow-sm': '0 0 10px rgba(142, 187, 29, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-40px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(142, 187, 29, 0.3))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 16px rgba(142, 187, 29, 0.6))',
          },
        },
      },
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
      },
    },
  },
  plugins: [],
};

export default config;
