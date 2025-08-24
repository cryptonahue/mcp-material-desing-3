/**
 * Component generation helpers and utilities
 * Shared logic for all Material Design 3 components
 */

export type Framework = 'alpine' | 'vanilla' | 'css';

export interface ComponentCode {
  html: string;
  css: string;
  js?: string;
}

/**
 * Builds CSS class names from an array, filtering out falsy values
 */
export function buildClasses(classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Builds HTML attributes from an object, filtering out falsy values
 */
export function buildAttributes(attrs: Record<string, string | boolean | null | undefined>): string {
  return Object.entries(attrs)
    .filter(([_, value]) => value !== false && value !== null && value !== undefined)
    .map(([key, value]) => value === true ? key : `${key}="${value}"`)
    .join(' ');
}

/**
 * Generates a unique component ID
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Common size variants for components
 */
export const SIZES = {
  small: 'small',
  medium: 'medium', 
  large: 'large'
} as const;

/**
 * Common component variants
 */
export const VARIANTS = {
  filled: 'filled',
  outlined: 'outlined',
  text: 'text',
  elevated: 'elevated',
  standard: 'standard',
  dense: 'dense'
} as const;

/**
 * Material Design 3 icon helper
 */
export function renderIcon(iconName?: string, className = 'material-icons'): string {
  return iconName ? `<span class="${className}">${iconName}</span>` : '';
}

/**
 * Wraps content in Alpine.js reactive data
 */
export function wrapAlpineData(content: string, data: Record<string, any>): string {
  const dataString = JSON.stringify(data).replace(/"/g, "'");
  return `x-data="${dataString}"`;
}

/**
 * Common Alpine.js event handlers
 */
export const ALPINE_EVENTS = {
  click: (action: string) => `@click="${action}"`,
  toggle: (variable: string) => `@click="${variable} = !${variable}"`,
  setValue: (variable: string, value: string) => `@click="${variable} = '${value}'"`,
  dispatch: (event: string, data?: string) => `@click="$dispatch('${event}'${data ? `, ${data}` : ''})"`,
  show: (condition: string) => `x-show="${condition}"`,
  transition: 'x-transition.opacity'
} as const;

/**
 * Validates and normalizes component props
 */
export function normalizeProps<T extends Record<string, any>>(
  props: Partial<T>, 
  defaults: T
): T {
  return { ...defaults, ...props };
}

/**
 * Generates CSS custom property fallbacks
 */
export function cssVar(varName: string, fallback?: string): string {
  return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;
}

/**
 * Common disabled state logic
 */
export function getDisabledState(disabled?: boolean) {
  return {
    classes: disabled ? 'disabled' : '',
    attributes: disabled ? { disabled: true, 'aria-disabled': 'true' } : {},
    tabIndex: disabled ? -1 : 0
  };
}