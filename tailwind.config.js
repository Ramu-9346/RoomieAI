/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Mirror Phase 2 design tokens for NativeWind utility usage
        cream:   '#FBF7F0',
        ink:     '#1A1713',
        primary: {
          DEFAULT: '#C65E00',
          surface: '#FFF0E0',
          text:    '#7A3800',
        },
        success: {
          DEFAULT: '#2E7D4E',
          surface: '#E8F5EE',
        },
        error: {
          DEFAULT: '#C0392B',
          surface: '#FDE8E6',
        },
        warning: {
          DEFAULT: '#D97706',
          surface: '#FEF3C7',
        },
        border: {
          DEFAULT: '#E8E0D4',
          strong:  '#C8B8A0',
          subtle:  '#F0EAE0',
        },
      },
      fontFamily: {
        fraunces: ['Fraunces_500Medium'],
        geist:    ['Geist_400Regular'],
        mono:     ['GeistMono_400Regular'],
      },
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '10px',
        lg:   '12px',
        xl:   '14px',
        xxl:  '18px',
        xxxl: '24px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
