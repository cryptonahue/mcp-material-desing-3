/**
 * Basic UI Components: Button, Card, Dialog, Divider
 */

import type { ComponentCode, Framework } from './types.js';
import { 
  buildClasses, 
  buildAttributes, 
  generateId, 
  normalizeProps,
  getDisabledState,
  renderIcon
} from '../../utils/component-helpers.js';
import { MD3_COLORS } from '../../utils/material-tokens.js';
import { BUTTON_CSS } from '../../styles/base-components.js';

/**
 * Generate Button component
 */
export function generateButton(props: any, framework: Framework): ComponentCode {
  const variant = props.variant || 'filled';
  const content = props.content || props.text || 'Button';
  
  // Normalize props with defaults
  const normalizedProps = normalizeProps(props, {
    text: content,
    size: 'medium',
    disabled: false,
    icon: 'none',
    iconName: ''
  });

  const { text, size, disabled, icon: iconPosition, iconName } = normalizedProps;
  const disabledState = getDisabledState(disabled);
  
  // Build classes using helper
  const classes = buildClasses([
    'btn',
    `btn--${variant}`,
    size !== 'medium' && `btn--${size}`,
    iconPosition !== 'none' && `btn--icon-${iconPosition}`,
    disabledState.classes
  ]);

  // Generate icons using helper
  const leadingIcon = iconPosition === 'leading' ? renderIcon(iconName, 'btn-icon material-icons') : '';
  const trailingIcon = iconPosition === 'trailing' ? renderIcon(iconName, 'btn-icon material-icons') : '';

  // Build attributes using helper
  const attributes = buildAttributes({
    class: classes,
    type: 'button',
    ...disabledState.attributes
  });

  const html = `<button ${attributes}>
  <span class="btn-content">
    ${leadingIcon}
    <span class="btn-label">${text}</span>
    ${trailingIcon}
  </span>
</button>`;

  return {
    html,
    css: BUTTON_CSS,
    js: framework === 'alpine' ? generateButtonAlpineJS(normalizedProps) : undefined,
  };
}

/**
 * Generate Card component
 */
export function generateCard(props: any, framework: Framework): ComponentCode {
  const variant = props.variant || 'elevated';
  const title = props.title || 'Card Title';
  const subtitle = props.subtitle || '';
  const content = props.content || 'Card content goes here.';
  
  const html = `<div class="md-card md-card--${variant}">
  <div class="md-card__content">
    <div class="md-card__header">
      <h3 class="md-card__title">${title}</h3>
      ${subtitle ? `<p class="md-card__subtitle">${subtitle}</p>` : ''}
    </div>
    <div class="md-card__body">
      <p>${content}</p>
    </div>
    ${props.actions ? `<div class="md-card__actions">
      <button class="btn btn--text">Action 1</button>
      <button class="btn btn--text">Action 2</button>
    </div>` : ''}
  </div>
</div>`;

  return {
    html,
    css: '/* Card styles are included in the main CSS file */',
    js: framework === 'alpine' ? generateCardAlpineJS(props) : undefined
  };
}

/**
 * Generate Dialog component
 */
export function generateDialog(props: any, framework: Framework): ComponentCode {
  const title = props.title || 'Dialog Title';
  const content = props.content || 'Dialog content goes here.';
  const actions = props.actions || ['Cancel', 'OK'];

  let html = '';
  if (framework === 'alpine') {
    html = `<div x-data="{ open: false }">
  <!-- Trigger -->
  <button @click="open = true" class="btn btn--filled">Open Dialog</button>
  
  <!-- Dialog -->
  <div x-show="open" 
       x-transition
       @click.away="open = false"
       @keydown.escape="open = false"
       class="md-dialog-overlay md-dialog-open">
    <div class="md-dialog">
      <div class="md-dialog-header">
        <h2 class="md-dialog-title">${title}</h2>
      </div>
      <div class="md-dialog-content">
        <p>${content}</p>
      </div>
      <div class="md-dialog-actions">
        ${actions.map((action: string, index: number) => 
          `<button @click="open = false" class="btn ${index === actions.length - 1 ? 'btn--filled' : 'btn--text'}">${action}</button>`
        ).join('\n        ')}
      </div>
    </div>
  </div>
</div>`;
  } else {
    html = `<!-- Dialog trigger -->
<button onclick="openDialog()" class="btn btn--filled">Open Dialog</button>

<!-- Dialog -->
<div id="dialog" class="md-dialog-overlay">
  <div class="md-dialog">
    <div class="md-dialog-header">
      <h2 class="md-dialog-title">${title}</h2>
    </div>
    <div class="md-dialog-content">
      <p>${content}</p>
    </div>
    <div class="md-dialog-actions">
      ${actions.map((action: string, index: number) => 
        `<button onclick="closeDialog()" class="btn ${index === actions.length - 1 ? 'btn--filled' : 'btn--text'}">${action}</button>`
      ).join('\n      ')}
    </div>
  </div>
</div>`;
  }

  return {
    html,
    css: '/* Dialog styles are included in the main CSS file */',
    js: framework === 'alpine' ? undefined : generateDialogVanillaJS(),
  };
}

/**
 * Generate Divider component
 */
export function generateDivider(props: any, framework: Framework): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    orientation: 'horizontal', // horizontal, vertical
    variant: 'full-bleed', // full-bleed, inset, middle
    thickness: 'thin', // thin, thick
    color: 'outline', // outline, surface-variant
    spacing: 'medium', // small, medium, large
    insetSize: 16 // px for inset variant
  });

  const { orientation, variant, thickness, color, spacing, insetSize } = normalizedProps;
  const divideId = generateId('divider');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-divider',
    `md-divider--${orientation}`,
    `md-divider--${variant}`,
    `md-divider--${thickness}`,
    `md-divider--${spacing}`
  ]);

  // Build attributes using helper  
  const attributes = buildAttributes({
    'id': divideId,
    'class': classes,
    'role': 'separator',
    'aria-orientation': orientation
  });

  const html = `<div ${attributes}></div>`;

  const css = `/* Material Design 3 Divider */
.md-divider {
  border: none;
  background-color: ${color === 'outline' ? MD3_COLORS.outline : MD3_COLORS.surfaceVariant};
  flex-shrink: 0;
}

/* Horizontal dividers */
.md-divider--horizontal {
  width: 100%;
  height: 1px;
}

.md-divider--horizontal.md-divider--thick {
  height: 2px;
}

/* Vertical dividers */
.md-divider--vertical {
  width: 1px;
  height: 100%;
  min-height: 24px;
}

.md-divider--vertical.md-divider--thick {
  width: 2px;
}

/* Variants */
.md-divider--full-bleed {
  margin: 0;
}

.md-divider--inset {
  margin-left: ${insetSize}px;
}

.md-divider--middle {
  margin: 0 ${insetSize}px;
}

/* Spacing variants */
.md-divider--small {
  --divider-margin: 8px;
}

.md-divider--medium {
  --divider-margin: 16px;
}

.md-divider--large {
  --divider-margin: 24px;
}

.md-divider--horizontal.md-divider--small {
  margin-top: var(--divider-margin);
  margin-bottom: var(--divider-margin);
}

.md-divider--horizontal.md-divider--medium {
  margin-top: var(--divider-margin);
  margin-bottom: var(--divider-margin);
}

.md-divider--horizontal.md-divider--large {
  margin-top: var(--divider-margin);
  margin-bottom: var(--divider-margin);
}

.md-divider--vertical.md-divider--small {
  margin-left: var(--divider-margin);
  margin-right: var(--divider-margin);
}

.md-divider--vertical.md-divider--medium {
  margin-left: var(--divider-margin);
  margin-right: var(--divider-margin);
}

.md-divider--vertical.md-divider--large {
  margin-left: var(--divider-margin);
  margin-right: var(--divider-margin);
}

/* Dark theme support */
[data-theme="dark"] .md-divider {
  background-color: ${MD3_COLORS.outline};
}

/* Usage in lists */
.md-list .md-divider {
  margin: 8px 0;
}

.md-list .md-divider--inset {
  margin-left: 56px; /* Standard list item indent */
}

/* Usage in menus */
.md-menu .md-divider {
  margin: 8px 12px;
}`;

  // Divider is CSS-only, no JS needed
  const js = '';

  return { html, css, js };
}

// Helper functions for JavaScript generation
function generateButtonAlpineJS(props: any): string {
  return `// Button Alpine.js behavior
// Add click handlers, loading states, etc.`;
}

function generateCardAlpineJS(props: any): string {
  return `// Card Alpine.js behavior
// Add interaction handlers, etc.`;
}

function generateDialogVanillaJS(): string {
  return `// Vanilla JS for dialog
function openDialog() {
  document.getElementById('dialog').classList.add('md-dialog-open');
  document.body.classList.add('md-dialog-open');
}

function closeDialog() {
  document.getElementById('dialog').classList.remove('md-dialog-open');
  document.body.classList.remove('md-dialog-open');
}

// Close on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeDialog();
  }
});`;
}