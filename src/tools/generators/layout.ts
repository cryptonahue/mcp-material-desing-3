import { ComponentCode } from './types.js';
import { normalizeProps, buildClasses, buildAttributes, generateId, renderIcon, getDisabledState } from '../../utils/component-helpers.js';
import { MD3_COLORS, MD3_MOTION, MD3_ELEVATION, MD3_SHAPE } from '../../utils/material-tokens.js';

// FAB (Floating Action Button) Component
export function generateFAB(props: any, framework: string): ComponentCode {
  // Normalize props with defaults
  const normalizedProps = normalizeProps(props, {
    icon: 'add',
    label: '',
    size: 'medium', // small, medium, large
    variant: 'primary', // primary, secondary, surface, tertiary
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left, custom
    extended: false, // true for extended FAB with text
    disabled: false
  });

  const { icon, label, size, variant, position, extended, disabled } = normalizedProps;
  const disabledState = getDisabledState(disabled);
  const fabId = generateId('fab');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-fab',
    `md-fab--${variant}`,
    `md-fab--${size}`,
    `md-fab--${position}`,
    extended && 'md-fab--extended',
    disabledState.classes
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    class: classes,
    type: 'button',
    role: 'button',
    id: fabId,
    'aria-label': label || `${icon} button`,
    ...disabledState.attributes,
    ...(framework === 'alpine' && { '@click': '$dispatch("fab-click", { icon: "' + icon + '" })' })
  });

  // Generate icon and optional label
  const iconElement = renderIcon(icon, 'md-fab__icon material-icons');
  const labelElement = extended && label ? `<span class="md-fab__label">${label}</span>` : '';

  const html = `<button ${attributes}>
  ${iconElement}
  ${labelElement}
</button>`;

  const css = `/* Material Design 3 FAB */
.md-fab {
  position: fixed;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 56px;
  min-height: 56px;
  padding: 16px;
  border: none;
  border-radius: ${MD3_SHAPE.corner.large};
  background: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
  cursor: pointer;
  font-family: 'Roboto', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12);
  z-index: 1000;
}

.md-fab:hover:not(.md-disabled) {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.16), 0 4px 20px rgba(0, 0, 0, 0.14);
  transform: translateY(-2px);
}

.md-fab:active:not(.md-disabled) {
  transform: translateY(0) scale(0.98);
  transition-duration: ${MD3_MOTION.duration.short1};
}

.md-fab:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

/* Variants */
.md-fab--primary {
  background: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
}

.md-fab--secondary {
  background: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}

.md-fab--surface {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.primary};
  border: 1px solid ${MD3_COLORS.outline};
}

.md-fab--tertiary {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
}

/* Sizes */
.md-fab--small {
  min-width: 40px;
  min-height: 40px;
  padding: 8px;
}

.md-fab--large {
  min-width: 96px;
  min-height: 96px;
  padding: 28px;
}

.md-fab--large .md-fab__icon {
  font-size: 36px;
}

/* Extended FAB */
.md-fab--extended {
  min-width: auto;
  padding: 16px 24px;
  border-radius: ${MD3_SHAPE.corner.large};
}

.md-fab--small.md-fab--extended {
  padding: 8px 16px;
}

.md-fab--large.md-fab--extended {
  padding: 28px 32px;
}

/* Position variants */
.md-fab--bottom-right {
  bottom: 16px;
  right: 16px;
}

.md-fab--bottom-left {
  bottom: 16px;
  left: 16px;
}

.md-fab--top-right {
  top: 16px;
  right: 16px;
}

.md-fab--top-left {
  top: 16px;
  left: 16px;
}

.md-fab--custom {
  position: relative;
}

/* FAB elements */
.md-fab__icon {
  font-size: 24px;
  flex-shrink: 0;
}

.md-fab__label {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
}

/* Dark theme */
[data-theme="dark"] .md-fab--primary {
  background: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
}

[data-theme="dark"] .md-fab--secondary {
  background: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}

[data-theme="dark"] .md-fab--surface {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.primary};
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-fab--tertiary {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .md-fab--bottom-right,
  .md-fab--bottom-left {
    bottom: 24px;
  }
  
  .md-fab--bottom-right {
    right: 24px;
  }
  
  .md-fab--bottom-left {
    left: 24px;
  }
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Material Design 3 FAB - Vanilla JavaScript
function initFAB(fabElement) {
  // Add ripple effect
  fabElement.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = \`
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: \${size}px;
      height: \${size}px;
      left: \${x}px;
      top: \${y}px;
      pointer-events: none;
    \`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('fabClick', {
      detail: { 
        icon: this.querySelector('.md-fab__icon')?.textContent,
        fabId: this.id
      }
    }));
  });
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = \`
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.md-fab {
  position: relative;
  overflow: hidden;
}
\`;
document.head.appendChild(style);

// Auto-initialize all FABs
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-fab').forEach(initFAB);
});`;
  }

  return { html, css, js };
}

// Icon Button Component
export function generateIconButton(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    icon: 'favorite',
    variant: 'standard', // standard, filled, filled-tonal, outlined
    size: 'medium', // small, medium, large  
    selected: false,
    selectedIcon: '',
    toggle: false, // true for toggle icon button
    disabled: false,
    ariaLabel: 'Icon button'
  });

  const { icon, variant, size, selected, selectedIcon, toggle, disabled, ariaLabel } = normalizedProps;
  const disabledState = getDisabledState(disabled);
  const buttonId = generateId('icon-btn');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-icon-button',
    `md-icon-button--${variant}`,
    `md-icon-button--${size}`,
    selected ? 'md-icon-button--selected' : null,
    disabled ? 'md-disabled' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': buttonId,
    'type': 'button',
    'class': classes,
    'aria-label': ariaLabel,
    'aria-pressed': toggle ? selected.toString() : null,
    ...disabledState.attributes
  });

  // Determine which icon to show
  const displayIcon = (toggle && selected && selectedIcon) ? selectedIcon : icon;
  const iconElement = renderIcon(displayIcon);

  let alpineAttributes = '';
  let clickHandler = '';
  
  if (framework === 'alpine') {
    if (toggle) {
      alpineAttributes = `x-data="{ selected: ${selected} }" @click="selected = !selected" :aria-pressed="selected.toString()"`;
      clickHandler = `:class="{ 'md-icon-button--selected': selected }"`;
    }
  }

  const html = `<button ${attributes} ${alpineAttributes} ${clickHandler}>
  ${iconElement}
</button>`;

  const css = `/* Material Design 3 Icon Button */
.md-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${MD3_COLORS.onSurfaceVariant};
  font-size: 24px;
  cursor: pointer;
  position: relative;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
  overflow: hidden;
}

.md-icon-button:hover:not(:disabled) {
  background-color: rgba(103, 80, 164, 0.08);
}

.md-icon-button:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

.md-icon-button:active:not(:disabled) {
  background-color: rgba(103, 80, 164, 0.12);
}

/* Variants */
.md-icon-button--filled {
  background-color: ${MD3_COLORS.primary};
  color: ${MD3_COLORS.onPrimary};
}

.md-icon-button--filled:hover:not(:disabled) {
  box-shadow: 0 2px 8px rgba(103, 80, 164, 0.3);
}

.md-icon-button--filled-tonal {
  background-color: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}

.md-icon-button--outlined {
  border: 1px solid ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurfaceVariant};
}

.md-icon-button--outlined:hover:not(:disabled) {
  background-color: rgba(103, 80, 164, 0.08);
}

/* Selected state */
.md-icon-button--selected {
  background-color: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
}

/* Size variants */
.md-icon-button--small {
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.md-icon-button--large {
  width: 56px;
  height: 56px;
  font-size: 28px;
}

/* Ripple effect container */
.md-icon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transition: opacity ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-icon-button:hover::before:not(:disabled) {
  opacity: 0.08;
}

.md-icon-button:active::before:not(:disabled) {
  opacity: 0.12;
}

/* Dark theme support */
[data-theme="dark"] .md-icon-button {
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-icon-button--filled {
  background-color: ${MD3_COLORS.primary};
  color: ${MD3_COLORS.onPrimary};
}

[data-theme="dark"] .md-icon-button--filled-tonal {
  background-color: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Icon Button
document.addEventListener('DOMContentLoaded', function() {
  const iconButton = document.getElementById('${buttonId}');
  
  if (iconButton && iconButton.getAttribute('aria-pressed')) {
    // Toggle functionality
    iconButton.addEventListener('click', function() {
      const isPressed = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', (!isPressed).toString());
      this.classList.toggle('md-icon-button--selected', !isPressed);
      
      // Dispatch custom event
      this.dispatchEvent(new CustomEvent('iconButtonToggle', {
        detail: { selected: !isPressed }
      }));
    });
  }
  
  // Ripple effect
  iconButton.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = \`
      position: absolute;
      width: \${size}px;
      height: \${size}px;
      left: \${x}px;
      top: \${y}px;
      background: currentColor;
      border-radius: 50%;
      opacity: 0.3;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    \`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}`;
  }

  return { html, css, js };
}

// Accordion Component
export function generateAccordion(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    items: [
      { 
        title: 'Accordion Item 1', 
        content: 'This is the content for the first accordion item. It can contain any HTML content.',
        expanded: false,
        disabled: false
      },
      { 
        title: 'Accordion Item 2', 
        content: 'This is the content for the second accordion item. It supports rich content and formatting.',
        expanded: true,
        disabled: false
      },
      { 
        title: 'Accordion Item 3', 
        content: 'This is the content for the third accordion item. You can add multiple paragraphs and elements.',
        expanded: false,
        disabled: false
      }
    ],
    allowMultiple: false, // Allow multiple items to be expanded
    variant: 'outlined', // outlined, filled
    size: 'medium', // small, medium, large
    disabled: false
  });

  const { items, allowMultiple, variant, size, disabled } = normalizedProps;
  const accordionId = generateId('accordion');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-accordion',
    `md-accordion--${variant}`,
    `md-accordion--${size}`,
    disabled && 'md-disabled'
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': accordionId,
    'class': classes,
    'role': 'region',
    'aria-label': 'Accordion'
  });

  // Generate accordion items
  const accordionItems = items.map((item: any, index: number) => {
    const itemId = `${accordionId}-item-${index}`;
    const headerId = `${accordionId}-header-${index}`;
    const contentId = `${accordionId}-content-${index}`;
    const isExpanded = item.expanded;
    const isDisabled = item.disabled || disabled;

    const itemClasses = buildClasses([
      'md-accordion__item',
      isExpanded && 'md-accordion__item--expanded',
      isDisabled && 'md-accordion__item--disabled'
    ]);

    let alpineData = '';
    let clickHandler = '';
    
    if (framework === 'alpine') {
      alpineData = `x-data="{ expanded: ${isExpanded} }"`;
      clickHandler = `@click="expanded = !expanded; $dispatch('accordion-toggle', { index: ${index}, expanded: !expanded })"`;
    }

    return `<div class="${itemClasses}" ${alpineData}>
      <button class="md-accordion__header" 
              id="${headerId}"
              aria-expanded="${isExpanded}"
              aria-controls="${contentId}"
              ${isDisabled ? 'disabled' : ''}
              ${clickHandler}>
        <span class="md-accordion__title">${item.title}</span>
        <span class="md-accordion__icon material-icons">expand_more</span>
      </button>
      <div class="md-accordion__content" 
           id="${contentId}"
           role="region"
           aria-labelledby="${headerId}"
           ${framework === 'alpine' ? 'x-show="expanded"' : ''}>
        <div class="md-accordion__body">
          ${item.content}
        </div>
      </div>
    </div>`;
  }).join('\n');

  const html = `<div ${attributes}>
  ${accordionItems}
</div>`;

  const css = `/* Material Design 3 Accordion */
.md-accordion {
  border: 1px solid ${MD3_COLORS.outline};
  border-radius: ${MD3_SHAPE.corner.medium};
  background: ${MD3_COLORS.surface};
  overflow: hidden;
}

.md-accordion--filled {
  background: ${MD3_COLORS.surfaceVariant};
  border: none;
}

.md-accordion__item {
  border-bottom: 1px solid ${MD3_COLORS.outline};
}

.md-accordion__item:last-child {
  border-bottom: none;
}

.md-accordion__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border: none;
  background: transparent;
  color: ${MD3_COLORS.onSurface};
  font-family: 'Roboto', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-accordion__header:hover:not(:disabled) {
  background: rgba(103, 80, 164, 0.08);
}

.md-accordion__header:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: -2px;
}

.md-accordion__header:disabled {
  color: ${MD3_COLORS.onSurface};
  opacity: 0.38;
  cursor: not-allowed;
}

.md-accordion__title {
  flex: 1;
  margin-right: 16px;
}

.md-accordion__icon {
  font-size: 24px;
  color: ${MD3_COLORS.onSurfaceVariant};
  transition: transform ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-accordion__item--expanded .md-accordion__icon {
  transform: rotate(180deg);
}

.md-accordion__content {
  overflow: hidden;
  transition: all ${MD3_MOTION.duration.medium2} ${MD3_MOTION.easing.standard};
}

.md-accordion__item:not(.md-accordion__item--expanded) .md-accordion__content {
  max-height: 0;
}

.md-accordion__item--expanded .md-accordion__content {
  max-height: 1000px; /* Adjust based on content */
}

.md-accordion__body {
  padding: 0 20px 16px 20px;
  color: ${MD3_COLORS.onSurfaceVariant};
  font-size: 14px;
  line-height: 1.5;
}

/* Size variants */
.md-accordion--small .md-accordion__header {
  padding: 12px 16px;
  font-size: 14px;
}

.md-accordion--small .md-accordion__body {
  padding: 0 16px 12px 16px;
  font-size: 13px;
}

.md-accordion--large .md-accordion__header {
  padding: 20px 24px;
  font-size: 18px;
}

.md-accordion--large .md-accordion__body {
  padding: 0 24px 20px 24px;
  font-size: 16px;
}

/* Dark theme support */
[data-theme="dark"] .md-accordion {
  background: ${MD3_COLORS.surface};
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-accordion--filled {
  background: ${MD3_COLORS.surfaceVariant};
}

[data-theme="dark"] .md-accordion__item {
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-accordion__header {
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-accordion__body {
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-accordion__icon {
  color: ${MD3_COLORS.onSurfaceVariant};
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Material Design 3 Accordion - Vanilla JavaScript
function initAccordion(accordionElement) {
  const allowMultiple = ${allowMultiple};
  const headers = accordionElement.querySelectorAll('.md-accordion__header');
  
  headers.forEach((header, index) => {
    header.addEventListener('click', function() {
      if (this.disabled) return;
      
      const item = this.closest('.md-accordion__item');
      const content = item.querySelector('.md-accordion__content');
      const isExpanded = item.classList.contains('md-accordion__item--expanded');
      
      // Close other items if allowMultiple is false
      if (!allowMultiple && !isExpanded) {
        headers.forEach((otherHeader, otherIndex) => {
          if (otherIndex !== index) {
            const otherItem = otherHeader.closest('.md-accordion__item');
            const otherContent = otherItem.querySelector('.md-accordion__content');
            
            otherItem.classList.remove('md-accordion__item--expanded');
            otherHeader.setAttribute('aria-expanded', 'false');
            otherContent.style.maxHeight = '0';
          }
        });
      }
      
      // Toggle current item
      if (isExpanded) {
        item.classList.remove('md-accordion__item--expanded');
        this.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('md-accordion__item--expanded');
        this.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
      
      // Dispatch custom event
      accordionElement.dispatchEvent(new CustomEvent('accordionToggle', {
        detail: { 
          index: index, 
          expanded: !isExpanded,
          item: item
        }
      }));
    });
  });
  
  // Initialize expanded state
  headers.forEach((header) => {
    const item = header.closest('.md-accordion__item');
    const content = item.querySelector('.md-accordion__content');
    const isExpanded = item.classList.contains('md-accordion__item--expanded');
    
    if (isExpanded) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '0';
    }
  });
}

// Auto-initialize all accordions
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-accordion').forEach(initAccordion);
});`;
  }

  return { html, css, js };
}