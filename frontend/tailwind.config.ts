// ── tailwind.config.ts ────────────────────────────────────────────────────
// Replace / merge your existing tailwind.config.ts with this.
import type { Config } from 'tailwindcss';

export default {
  // CRITICAL: enables the `dark:` variant via the .dark class on <html>
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        exo: ["'Exo 2'", 'sans-serif'],
      },
      colors: {
        // Map Tailwind color scale to CSS vars so dark mode "just works"
        // Usage: bg-brand-600, text-brand-400, border-brand-200, etc.
        brand: {
          50:  'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          900: 'var(--brand-900)',
        },
        surface: {
          base:     'var(--bg-base)',
          DEFAULT:  'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
        },
        border: {
          subtle:  'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          strong:  'var(--border-strong)',
        },
        tx: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, var(--hero-from) 0%, var(--hero-via) 50%, var(--hero-to) 100%)',
      },
      boxShadow: {
        card:       'var(--card-shadow)',
        'card-hover': 'var(--card-shadow-hover)',
      },
    },
  },
  plugins: [],
} satisfies Config;