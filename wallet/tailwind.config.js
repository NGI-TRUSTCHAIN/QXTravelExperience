/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animatecss";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        robotoRegular: ['Roboto-Regular'],
        robotoMedium: ['Roboto-Medium'],
        robotoBold: ['Roboto-Bold'],
      },
      spacing: {
        '74': '18.5rem',
        '128': '32rem',
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      backgroundImage: {
        anakiwaSailBlueGradient: 'linear-gradient(180deg, hsl(var(--anakiwa-blue)) 35%, hsl(var(--sail-blue)) 78%)',
        camelotCrimsonGradient: 'linear-gradient(180deg, hsl(var(--camelot)) 5%, hsl(var(--crimson)) 92%)',
        landingImage: "url('/src/assets/images/landing.png')",
      },
      colors: {
        silver: "hsl(var(--silver))",
        xgray: "hsl(var(--xgray))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        maroonPink: "hsl(var(--maroon-pink))",
        luckyBlue: "hsl(var(--lucky-blue))",
        anakiwaBlue: "hsl(var(--anakiwa-blue))",
        sailBlue: "hsl(var(--sail-blue))",
        oxfordBlue: "hsl(var(--oxford-blue))",
        forestGreen: "hsl(var(--forest-green))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [tailwindcssAnimate],
}