/**
 * Material Design 3 design tokens and CSS variables
 * Centralized constants for consistent theming
 */

/**
 * Material Design 3 Color System Variables
 */
export const MD3_COLORS = {
  // Primary colors
  primary: 'var(--md-sys-color-primary, #6750a4)',
  onPrimary: 'var(--md-sys-color-on-primary, #ffffff)',
  primaryContainer: 'var(--md-sys-color-primary-container, #eaddff)',
  onPrimaryContainer: 'var(--md-sys-color-on-primary-container, #21005d)',
  
  // Secondary colors
  secondary: 'var(--md-sys-color-secondary, #625b71)',
  onSecondary: 'var(--md-sys-color-on-secondary, #ffffff)',
  secondaryContainer: 'var(--md-sys-color-secondary-container, #e8def8)',
  onSecondaryContainer: 'var(--md-sys-color-on-secondary-container, #1d192b)',
  
  // Surface colors
  surface: 'var(--md-sys-color-surface, #fffbfe)',
  onSurface: 'var(--md-sys-color-on-surface, #1c1b1f)',
  surfaceVariant: 'var(--md-sys-color-surface-variant, #e7e0ec)',
  onSurfaceVariant: 'var(--md-sys-color-on-surface-variant, #49454f)',
  surfaceContainer: 'var(--md-sys-color-surface-container, #f3edf7)',
  surfaceContainerHighest: 'var(--md-sys-color-surface-container-highest, #e6e1e5)',
  
  // Outline and background
  outline: 'var(--md-sys-color-outline, #79747e)',
  background: 'var(--md-sys-color-background, #fffbfe)',
  onBackground: 'var(--md-sys-color-on-background, #1c1b1f)',
  
  // Error colors
  error: 'var(--md-sys-color-error, #ba1a1a)',
  onError: 'var(--md-sys-color-on-error, #ffffff)',
  errorContainer: 'var(--md-sys-color-error-container, #ffdad6)',
  onErrorContainer: 'var(--md-sys-color-on-error-container, #410002)'
} as const;

/**
 * Material Design 3 Typography Scale
 */
export const MD3_TYPOGRAPHY = {
  // Display styles
  displayLarge: {
    fontSize: '57px',
    lineHeight: '64px',
    fontWeight: '400',
    letterSpacing: '-0.25px'
  },
  displayMedium: {
    fontSize: '45px', 
    lineHeight: '52px',
    fontWeight: '400',
    letterSpacing: '0px'
  },
  displaySmall: {
    fontSize: '36px',
    lineHeight: '44px', 
    fontWeight: '400',
    letterSpacing: '0px'
  },
  
  // Headline styles
  headlineLarge: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '400',
    letterSpacing: '0px'
  },
  headlineMedium: {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: '400',
    letterSpacing: '0px'
  },
  headlineSmall: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '400',
    letterSpacing: '0px'
  },
  
  // Title styles
  titleLarge: {
    fontSize: '22px',
    lineHeight: '28px',
    fontWeight: '400',
    letterSpacing: '0px'
  },
  titleMedium: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '500',
    letterSpacing: '0.15px'
  },
  titleSmall: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
    letterSpacing: '0.1px'
  },
  
  // Body styles
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    letterSpacing: '0.5px'
  },
  bodyMedium: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '400',
    letterSpacing: '0.25px'
  },
  bodySmall: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    letterSpacing: '0.4px'
  },
  
  // Label styles
  labelLarge: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '500',
    letterSpacing: '0.1px'
  },
  labelMedium: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
    letterSpacing: '0.5px'
  },
  labelSmall: {
    fontSize: '11px',
    lineHeight: '16px',
    fontWeight: '500',
    letterSpacing: '0.5px'
  }
} as const;

/**
 * Material Design 3 Elevation System
 */
export const MD3_ELEVATION = {
  level0: 'none',
  level1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  level2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  level3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  level4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  level5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
} as const;

/**
 * Material Design 3 Motion/Animation
 */
export const MD3_MOTION = {
  // Duration tokens
  duration: {
    short1: '50ms',
    short2: '100ms', 
    short3: '150ms',
    short4: '200ms',
    medium1: '250ms',
    medium2: '300ms',
    medium3: '350ms', 
    medium4: '400ms',
    long1: '450ms',
    long2: '500ms',
    long3: '550ms',
    long4: '600ms'
  },
  
  // Easing tokens
  easing: {
    linear: 'linear',
    standard: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
    standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
    standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
    emphasizedAccelerate: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)'
  }
} as const;

/**
 * Material Design 3 Shape System
 */
export const MD3_SHAPE = {
  corner: {
    none: '0px',
    extraSmall: '4px',
    small: '8px',
    medium: '12px',
    large: '16px',
    extraLarge: '28px',
    full: '1000px'
  }
} as const;

/**
 * Material Design 3 State Layers (for hover, focus, pressed states)
 */
export const MD3_STATE_LAYERS = {
  hover: 'rgba(103, 80, 164, 0.08)',
  focus: 'rgba(103, 80, 164, 0.12)',
  pressed: 'rgba(103, 80, 164, 0.16)',
  selected: 'rgba(103, 80, 164, 0.08)',
  disabled: 'rgba(0, 0, 0, 0.04)'
} as const;

/**
 * Common Material Design 3 CSS classes and utilities
 */
export const MD3_CLASSES = {
  // Base classes
  component: 'md-component',
  
  // State classes
  disabled: 'md-disabled',
  selected: 'md-selected', 
  active: 'md-active',
  focused: 'md-focused',
  pressed: 'md-pressed',
  
  // Size classes
  small: 'md-small',
  medium: 'md-medium',
  large: 'md-large',
  
  // Variant classes
  filled: 'md-filled',
  outlined: 'md-outlined',
  text: 'md-text',
  elevated: 'md-elevated'
} as const;

/**
 * Helper function to create CSS with Material Design 3 tokens
 */
export function createMD3CSS(selector: string, styles: Record<string, string>): string {
  const cssRules = Object.entries(styles)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');
    
  return `${selector} {\n${cssRules}\n}`;
}

/**
 * Helper to get theme-aware colors (light/dark mode)
 */
export function getThemeColor(lightColor: string, darkColor: string): string {
  return `light-dark(${lightColor}, ${darkColor})`;
}