import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'space-black':   'rgb(var(--c-space-black) / <alpha-value>)',
        'cyan':          'rgb(var(--c-cyan) / <alpha-value>)',
        'midnight':      'rgb(var(--c-midnight) / <alpha-value>)',
        'ghost':         'rgb(var(--c-ghost) / <alpha-value>)',
        'slate':         'rgb(var(--c-slate) / <alpha-value>)',
        'status-green':  'rgb(var(--c-status-green) / <alpha-value>)',
        'status-yellow': 'rgb(var(--c-status-yellow) / <alpha-value>)',
        'status-red':    'rgb(var(--c-status-red) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,212,255,0.10), transparent)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'cyan-glow':    '0 0 20px rgba(0,212,255,0.25)',
        'cyan-glow-lg': '0 0 40px rgba(0,212,255,0.15)',
        'card':         '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-up':   'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
