import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        themeColor: '#4CAF50',
        backgroundNavy: '#0F0F16',
        lightNavy: '#232333',
        lightGray: '#a9a9a9',
        hoverGray: '#46464a',
        progressBarGray: '#adadad',
      },
      boxShadow: {
        sideNavBarShadow: '4px 0 10px #1a1a20',
        whiteShadow: '0 0 0 1px #ffffff inset',
      },
    },
  },
  plugins: [],
};
export default config;
