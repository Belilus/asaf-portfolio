/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' },
        success: { DEFAULT: 'var(--success)', foreground: 'var(--success-foreground)' },
        warning: { DEFAULT: 'var(--warning)', foreground: 'var(--warning-foreground)' },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        perf: {
          improve: { DEFAULT: 'var(--perf-improve)', foreground: 'var(--perf-improve-fg)' },
          regress: { DEFAULT: 'var(--perf-regress)', foreground: 'var(--perf-regress-fg)' },
          neutral: { DEFAULT: 'var(--perf-neutral)', foreground: 'var(--perf-neutral-fg)' },
        },
        medal: {
          gold: 'var(--medal-gold)',
          silver: 'var(--medal-silver)',
          bronze: 'var(--medal-bronze)',
        },
        isa: {
          navy: 'var(--isa-navy)',
          'navy-2': 'var(--isa-navy-2)',
          'navy-3': 'var(--isa-navy-3)',
          teal: 'var(--isa-teal)',
          'teal-soft': 'var(--isa-teal-soft)',
          gold: 'var(--isa-gold)',
          'gold-soft': 'var(--isa-gold-soft)',
          'ink-2': 'var(--isa-ink-2)',
          'ink-3': 'var(--isa-ink-3)',
          line: 'var(--isa-line)',
        },
        cyan: { DEFAULT: 'var(--cyan)', deep: 'var(--cyan-deep)' },
        rope: 'var(--rope)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        data: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out)',
        'in-out-expo': 'var(--ease-in-out)',
      },
      transitionDuration: { fast: '150ms', base: '250ms', slow: '400ms' },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'lane-drift': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up var(--dur-slow) var(--ease-out) both',
        'lane-drift': 'lane-drift 24s linear infinite',
      },
    },
  },
  plugins: [],
}
