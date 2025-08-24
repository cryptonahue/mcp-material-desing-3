/**
 * Configuración de tokens para Tailwind CSS
 * Basada en el sistema de tokens científico Material Design 3
 */

module.exports = {
  colors: {
  "state": {
    "hover": "rgba(103, 80, 164, 0.08)",
    "focus": "rgba(103, 80, 164, 0.12)",
    "pressed": "rgba(103, 80, 164, 0.16)",
    "selected": "rgba(103, 80, 164, 0.08)",
    "disabled": "rgba(0, 0, 0, 0.04)"
  }
},
  
  fontSize: {
    'display-large': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px', fontWeight: '400' }],
    'display-medium': ['45px', { lineHeight: '52px', letterSpacing: '0px', fontWeight: '400' }],
    'display-small': ['36px', { lineHeight: '44px', letterSpacing: '0px', fontWeight: '400' }],
    'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0px', fontWeight: '400' }],
    'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0px', fontWeight: '400' }],
    'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0px', fontWeight: '400' }],
    'title-large': ['22px', { lineHeight: '28px', letterSpacing: '0px', fontWeight: '400' }],
    'title-medium': ['16px', { lineHeight: '24px', letterSpacing: '0.15px', fontWeight: '500' }],
    'title-small': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
    'body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px', fontWeight: '400' }],
    'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px', fontWeight: '400' }],
    'body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px', fontWeight: '400' }],
    'label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
    'label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
    'label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }]
  },
  
  boxShadow: {
  "level0": "none",
  "level1": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  "level2": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  "level3": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  "level4": "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  "level5": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
},
  
  borderRadius: {
  "none": "0px",
  "extraSmall": "4px",
  "small": "8px",
  "medium": "12px",
  "large": "16px",
  "extraLarge": "28px",
  "full": "1000px"
},
  
  spacing: {
  "xs": "4px",
  "sm": "8px",
  "md": "12px",
  "lg": "16px",
  "xl": "24px",
  "2xl": "32px",
  "3xl": "48px",
  "4xl": "64px"
},
  
  screens: {
  "xs": "0px",
  "sm": "600px",
  "md": "905px",
  "lg": "1240px",
  "xl": "1440px"
},
  
  transitionDuration: {
  "short1": "50ms",
  "short2": "100ms",
  "short3": "150ms",
  "short4": "200ms",
  "medium1": "250ms",
  "medium2": "300ms",
  "medium3": "350ms",
  "medium4": "400ms",
  "long1": "450ms",
  "long2": "500ms",
  "long3": "550ms",
  "long4": "600ms"
},
  
  transitionTimingFunction: {
  "linear": "linear",
  "standard": "cubic-bezier(0.2, 0.0, 0, 1.0)",
  "standardAccelerate": "cubic-bezier(0.3, 0, 1, 1)",
  "standardDecelerate": "cubic-bezier(0, 0, 0, 1)",
  "emphasized": "cubic-bezier(0.2, 0.0, 0, 1.0)",
  "emphasizedAccelerate": "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
  "emphasizedDecelerate": "cubic-bezier(0.05, 0.7, 0.1, 1.0)"
}
};
