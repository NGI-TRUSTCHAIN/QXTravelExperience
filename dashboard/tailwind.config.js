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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			height: {
				inherit: 'inherit',
				'30': '7.5rem'
			},
			width: {
				inherit: 'inherit'
			},
			minHeight: {
				inherit: 'inherit'
			},
			fontFamily: {
				BubbleGumBlack: [
					'BubbleGumBlack'
				],
				BubbleGumBold: [
					'BubbleGumBold'
				]
			},
			spacing: {
				'26': '6.5rem',
				'28': '7rem',
				'30': '7.5rem',
				'74': '18.5rem',
				'128': '32rem'
			},
			fontSize: {
				'2xs': '0.625rem',
				'3xs': '0.5rem'
			},
			backgroundImage: {
				anakiwaSailBlueGradient: 'linear-gradient(180deg, hsl(var(--anakiwa-blue)) 35%, hsl(var(--sail-blue)) 78%)',
				camelotCrimsonGradient: 'linear-gradient(180deg, hsl(var(--camelot)) 5%, hsl(var(--crimson)) 92%)'
			},
			colors: {
				bababa: 'hsl(var(--bababa))',
				xgray: 'hsl(var(--xgray))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				maroonPink: 'hsl(var(--maroon-pink))',
				luckyBlue: 'hsl(var(--lucky-blue))',
				anakiwaBlue: 'hsl(var(--anakiwa-blue))',
				sailBlue: 'hsl(var(--sail-blue))',
				oxfordBlue: {
					DEFAULT: 'hsl(var(--oxford-blue))',
					foreground: 'hsl(var(--oxford-blue-foreground))'
				},
				disco: {
					DEFAULT: 'hsl(var(--disco))',
					foreground: 'hsl(var(--disco-foreground))'
				},
				forestGreen: {
					DEFAULT: 'hsl(var(--forest-green))',
					foreground: 'hsl(var(--forest-green-foreground))',
					darker: 'hsl(var(--forest-green-darker))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					lighter: 'hsl(var(--muted-lighter))',
					darker: 'hsl(var(--muted-darker))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},

	plugins: [tailwindcssAnimate, require("tailwindcss-animate")],
}