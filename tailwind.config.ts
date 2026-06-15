/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark-first theme
        'vault-bg': '#111111',
        'vault-surface': '#1A1A1A',
        'vault-surface-hover': '#222222',
        
        'vault-border': '#2D2D2D',
        'vault-border-light': '#242424',
        
        'vault-text': '#FAFAF9',
        'vault-text-secondary': '#A1A1AA',
        'vault-text-tertiary': '#71717A',
        
        'vault-accent': '#F97316',
        'vault-accent-hover': '#FB923C',
        'vault-accent-muted': '#EA580C',
        
        'vault-success': '#22C55E',
        'vault-danger': '#EF4444',
        'vault-warning': '#FACC15',
        'vault-info': '#F97316',
      },
      fontFamily: {
        'sans': ['Manrope', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'lg': '0.375rem',
      },
      boxShadow: {
        'sm': '0 0 0 1px rgba(0, 0, 0, 0.3)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'lg': '0 16px 48px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
