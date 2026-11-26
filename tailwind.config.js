/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: '#3182F6',
          blueDark: '#1B64DA',
          blueSoft: '#E8F3FF',
          bg: '#F2F4F6',
          card: '#FFFFFF',
          ink: '#191F28',
          sub: '#4E5968',
          muted: '#8B95A1',
          border: '#E5E8EB',
        },
      },
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(15, 23, 42, 0.04)',
        float: '0 12px 32px rgba(15, 23, 42, 0.12)',
        device: '0 8px 28px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
