import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'horizontal-gradient': 'linear-gradient(90deg, #7FD1CC, #9694F5)',
        'vertical-gradient': 'linear-gradient(#7FD1CC, #9694F5)',
        sidebar: 'url("/aside-background.png")',
      },
      colors: {
        green: {
          100: '#50B2C0',
          200: '#255D6A',
          300: '#0A313C',
        },
        purple: {
          100: '#8381D9',
          200: '#2A2879',
        },
        gray: {
          100: '#F8F9FC',
          200: '#E6E8F2',
          300: '#D1D6E4',
          400: '#8D95AF',
          500: '#303F73',
          600: '#252D4A',
          700: '#181C2A',
          800: '#0E1116',
        },
        exit: '#F75A68',
      },
      gridTemplateColumns: {
        app: '14rem 1fr',
        dashboard: '1fr 324px',
        profile: '1fr 308px',
      },
    },
  },
  plugins: [],
} satisfies Config
