/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.js',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        han:   ['"KaiTi"', '"STKaiti"', '"BiauKai"', '"DFKai-SB"', '"Kaiti SC"', '"Noto Sans SC"', '"PingFang SC"', 'serif'],
        brush: ['"Ma Shan Zheng"', '"ZCOOL XiaoWei"', '"Long Cang"', '"KaiTi"', '"STKaiti"', 'serif'],
      },
      colors: {
        ink:    { DEFAULT: '#1a1209', soft: '#2a1f12' },
        paper:  { DEFAULT: '#f8f4ee', warm: '#eee8df' },
        gold:   { DEFAULT: '#c8a84b', soft: '#a0906a', deep: '#8b6914' },
        cream:  '#f5e9c8',
        rice:   '#f8f0e0',
      },
      boxShadow: {
        card:  '0 10px 40px -10px rgba(26,18,9,0.18), 0 2px 8px -2px rgba(26,18,9,0.08)',
        chip:  '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px -2px rgba(0,0,0,0.08)',
        ink:   '0 4px 24px -6px rgba(0,0,0,0.4)',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'none' } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: {
        fadeUp:  'fadeUp 0.3s ease-out',
        fadeIn:  'fadeIn 0.4s ease-out',
        slideUp: 'slideUp 0.4s cubic-bezier(.2,.8,.2,1)',
      },
    },
  },
  plugins: [],
}
