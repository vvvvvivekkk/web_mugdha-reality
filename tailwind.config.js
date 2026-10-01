/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:    '#0a0908',
        bg2:   '#13100e',
        bg3:   '#1a1613',
        cream: '#f5f0e6',
        gold:  '#c9a961',
        goldDim: '#8b7742',
        sage:  '#8b9d83',
        muted: '#9a948a',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        script:  ['"Great Vibes"', 'cursive'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
        kenburns: 'kenburns 20s ease-out infinite alternate',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.15)' } },
      },
    },
  },
  plugins: [],
};
