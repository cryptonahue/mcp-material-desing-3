import defaultTheme from 'tailwindcss/defaultTheme';
import designTokens from './src/styles/tailwind-tokens.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
        // Material Design 3 Typography
        'display': ['Roboto', 'system-ui', 'sans-serif'],
        'headline': ['Roboto', 'system-ui', 'sans-serif'],
        'title': ['Roboto Medium', 'system-ui', 'sans-serif'],
        'body': ['Roboto', 'system-ui', 'sans-serif'],
        'label': ['Roboto Medium', 'system-ui', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace']
      },
      // Integrar tokens de diseño científicos
      ...designTokens,
      colors: {
        // Material Design 3 Color System (Scientific HCT Generated)
        'md': {
          // Primary colors (Scientific HCT)
          'primary': {
            DEFAULT: '#6750a4',
            0: '#000000',
            10: '#22005d',
            20: '#381e72',
            30: '#4f378a',
            40: '#6750a4',
            50: '#8069bf',
            60: '#9a83db',
            70: '#b69df8',
            80: '#cfbcff',
            90: '#e9ddff',
            95: '#f6eeff',
            99: '#fffbff',
            100: '#ffffff'
          },
          'on-primary': {
            DEFAULT: '#FFFFFF',
            10: '#FFFFFF',
            20: '#FFFFFF',
            30: '#FFFFFF',
            40: '#FFFFFF',
            50: '#000000',
            60: '#000000',
            70: '#000000',
            80: '#000000',
            90: '#000000',
            95: '#000000',
            99: '#000000'
          },
          // Secondary colors (Scientific HCT)
          'secondary': {
            DEFAULT: '#625b71',
            0: '#000000',
            10: '#1e192b',
            20: '#332d41',
            30: '#4a4458',
            40: '#625b71',
            50: '#7b748a',
            60: '#958da4',
            70: '#b0a7c0',
            80: '#cbc2db',
            90: '#e8def8',
            95: '#f6eeff',
            99: '#fffbff',
            100: '#ffffff'
          },
          // Tertiary colors (Scientific HCT)
          'tertiary': {
            DEFAULT: '#7e5260',
            0: '#000000',
            10: '#31101d',
            20: '#4a2532',
            30: '#633b48',
            40: '#7e5260',
            50: '#996a79',
            60: '#b58392',
            70: '#d29dad',
            80: '#efb8c8',
            90: '#ffd9e3',
            95: '#ffecf0',
            99: '#fffbff',
            100: '#ffffff'
          },
          // Neutral colors (Scientific HCT)
          'neutral': {
            DEFAULT: '#938f94',
            0: '#000000',
            10: '#1c1b1e',
            20: '#313033',
            30: '#48464a',
            40: '#605d62',
            50: '#79767a',
            60: '#938f94',
            70: '#aeaaae',
            80: '#cac5ca',
            90: '#e6e1e6',
            95: '#f4eff4',
            99: '#fffbff',
            100: '#ffffff'
          },
          // Error colors
          'error': {
            DEFAULT: '#BA1A1A',
            10: '#410E0B',
            20: '#601410',
            30: '#8C1D18',
            40: '#BA1A1A',
            50: '#DE3730',
            60: '#FF5449',
            70: '#FF897D',
            80: '#FFB4AB',
            90: '#FFDAD6',
            95: '#FFEDEA',
            99: '#FFFBFF'
          },
          // Surface colors
          'surface': {
            DEFAULT: '#FFFBFE',
            dim: '#DDD8E1',
            bright: '#FFFBFE',
            'container-lowest': '#FFFFFF',
            'container-low': '#F7F2FA',
            'container': '#F1ECF4',
            'container-high': '#ECE6F0',
            'container-highest': '#E6E0E9'
          },
          'on-surface': {
            DEFAULT: '#1C1B1F',
            variant: '#49454F'
          },
          // Background
          'background': '#FFFBFE',
          'on-background': '#1C1B1F',
          // Outline
          'outline': {
            DEFAULT: '#79747E',
            variant: '#CAC4D0'
          },
          // Inverse colors
          'inverse': {
            surface: '#313033',
            'on-surface': '#F4EFF4',
            primary: '#D0BCFF'
          }
        }
      },
      fontSize: {
        // Material Design 3 Typography Scale
        'display-large': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px', fontWeight: '400' }],
        'display-medium': ['45px', { lineHeight: '52px', letterSpacing: '0px', fontWeight: '400' }],
        'display-small': ['36px', { lineHeight: '44px', letterSpacing: '0px', fontWeight: '400' }],
        'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0px', fontWeight: '400' }],
        'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0px', fontWeight: '400' }],
        'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0px', fontWeight: '400' }],
        'title-large': ['22px', { lineHeight: '28px', letterSpacing: '0px', fontWeight: '400' }],
        'title-medium': ['16px', { lineHeight: '24px', letterSpacing: '0.15px', fontWeight: '500' }],
        'title-small': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
        'label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
        'label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
        'label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
        'body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px', fontWeight: '400' }],
        'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px', fontWeight: '400' }],
        'body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px', fontWeight: '400' }]
      },
      boxShadow: {
        // Material Design 3 Elevation
        'elevation-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        // Material Design 3 Shape Scale
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '28px'
      },
      spacing: {
        // Material Design 3 Spacing
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
        '5.5': '22px',
        '6.5': '26px',
        '7.5': '30px'
      },
      animation: {
        // Material Design 3 Motion
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.2, 0, 0, 1)',
        'fade-out': 'fadeOut 0.15s cubic-bezier(0.4, 0, 1, 1)',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.2, 0, 0, 1)',
        'slide-out': 'slideOut 0.2s cubic-bezier(0.4, 0, 1, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.2, 0, 0, 1)',
        'scale-out': 'scaleOut 0.15s cubic-bezier(0.4, 0, 1, 1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideIn: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-8px)', opacity: '0' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}