import themeExtend from './src/themes';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: themeExtend.colors,
      fontFamily: {
        sans: ['var(--font-product-sans)'],
      },
      fontSize: themeExtend.fontSize,
      spacing: themeExtend.spacing,
      borderRadius: themeExtend.borderRadius,
      boxShadow: themeExtend.boxShadow,
    },
  },
  plugins: [],
};
export default config;
