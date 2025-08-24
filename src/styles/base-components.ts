/**
 * Base CSS styles for Material Design 3 components
 * Centralized styles to reduce duplication
 */

import { MD3_COLORS, MD3_MOTION, MD3_SHAPE, createMD3CSS } from '../utils/material-tokens.js';

/**
 * Common base styles for all components
 */
export const BASE_COMPONENT_CSS = `
/* Material Design 3 Base Component Styles */
.md-component {
  font-family: 'Roboto', system-ui, sans-serif;
  box-sizing: border-box;
}

.md-component *,
.md-component *::before,
.md-component *::after {
  box-sizing: inherit;
}

/* State classes */
.md-disabled {
  opacity: 0.38;
  cursor: not-allowed;
  pointer-events: none;
}

.md-selected {
  background: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
}

.md-focused {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

/* Transition base */
.md-transition {
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

/* Size variants */
.md-small {
  --md-component-scale: 0.875;
}

.md-medium {
  --md-component-scale: 1;
}

.md-large {
  --md-component-scale: 1.125;
}
`;

/**
 * Interactive element base styles
 */
export const INTERACTIVE_CSS = `
/* Interactive elements */
.md-interactive {
  cursor: pointer;
  user-select: none;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-interactive:hover:not(.md-disabled) {
  background: ${MD3_COLORS.primaryContainer};
}

.md-interactive:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

.md-interactive:active:not(.md-disabled) {
  transform: scale(0.98);
}
`;

/**
 * Button component specific styles
 */
export const BUTTON_CSS = createMD3CSS('.btn', {
  'display': 'inline-flex',
  'align-items': 'center',
  'justify-content': 'center',
  'gap': '8px',
  'min-height': '40px',
  'min-width': '64px',
  'padding': '0 24px',
  'border-radius': MD3_SHAPE.corner.large,
  'border': 'none',
  'outline': 'none',
  'background': 'transparent',
  'cursor': 'pointer',
  'font-family': 'inherit',
  'font-size': '14px',
  'font-weight': '500',
  'text-decoration': 'none',
  'transition': `all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard}`
}) + `

.btn--filled {
  background-color: ${MD3_COLORS.primary};
  color: ${MD3_COLORS.onPrimary};
}

.btn--filled:hover:not(:disabled) {
  box-shadow: 0 2px 8px rgba(103, 80, 164, 0.3);
}

.btn--outlined {
  border: 1px solid ${MD3_COLORS.outline};
  color: ${MD3_COLORS.primary};
}

.btn--outlined:hover:not(:disabled) {
  background-color: rgba(103, 80, 164, 0.08);
}

.btn--text {
  color: ${MD3_COLORS.primary};
}

.btn--text:hover:not(:disabled) {
  background-color: rgba(103, 80, 164, 0.08);
}

/* Size variants */
.btn--small {
  min-height: 32px;
  padding: 0 16px;
  font-size: 13px;
}

.btn--large {
  min-height: 48px;
  padding: 0 32px;
  font-size: 16px;
}

/* Icon styles */
.btn-icon {
  font-size: 18px;
}

.btn--small .btn-icon {
  font-size: 16px;
}

.btn--large .btn-icon {
  font-size: 20px;
}
`;

/**
 * Form field base styles  
 */
export const FORM_FIELD_CSS = `
/* Form field base */
.md-form-field {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 280px;
}

.md-form-field__label {
  color: ${MD3_COLORS.onSurfaceVariant};
  font-size: 14px;
  margin-bottom: 8px;
}

.md-form-field__input {
  padding: 16px;
  border: 1px solid ${MD3_COLORS.outline};
  border-radius: ${MD3_SHAPE.corner.small};
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  font-size: 16px;
  font-family: inherit;
  outline: none;
  transition: border-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-form-field__input:focus {
  border-color: ${MD3_COLORS.primary};
  border-width: 2px;
}

.md-form-field__input::placeholder {
  color: ${MD3_COLORS.onSurfaceVariant};
}
`;

/**
 * Dark theme overrides
 */
export const DARK_THEME_CSS = `
/* Dark theme overrides */
[data-theme="dark"] .btn--filled {
  background-color: ${MD3_COLORS.primary};
  color: ${MD3_COLORS.onPrimary};
}

[data-theme="dark"] .btn--outlined {
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.primary};
}

[data-theme="dark"] .md-form-field__input {
  background: ${MD3_COLORS.surface};
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurface};
}
`;

/**
 * Combine all base styles
 */
export function getBaseCSS(): string {
  return [
    BASE_COMPONENT_CSS,
    INTERACTIVE_CSS,
    BUTTON_CSS,
    FORM_FIELD_CSS,
    DARK_THEME_CSS
  ].join('\n\n');
}