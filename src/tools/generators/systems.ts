import { ComponentCode } from './types.js';
import { normalizeProps, buildClasses, buildAttributes, generateId, renderIcon, getDisabledState } from '../../utils/component-helpers.js';
import { MD3_COLORS, MD3_MOTION, MD3_ELEVATION, MD3_SHAPE, MD3_TYPOGRAPHY } from '../../utils/material-tokens.js';

// Focus Ring Component
export function generateFocus(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    visible: false, // Whether focus ring is visible
    inward: false, // Animate inward instead of outward
    target: '', // Target element selector or ID
    width: 2, // Focus ring width in pixels
    color: 'primary', // primary, secondary, error, custom
    offset: 2, // Offset from target element
    shape: 'rounded' // rounded, sharp, circular
  });

  const { visible, inward, target, width, color, offset, shape } = normalizedProps;
  const focusRingId = generateId('focus-ring');
  
  // Color mapping
  const colorValue = color === 'primary' ? MD3_COLORS.primary :
                    color === 'secondary' ? MD3_COLORS.secondary :
                    color === 'error' ? MD3_COLORS.error :
                    color.startsWith('#') ? color : MD3_COLORS.primary;

  // Build classes using helper
  const classes = buildClasses([
    'md-focus-ring',
    visible ? 'md-focus-ring--visible' : null,
    inward ? 'md-focus-ring--inward' : null,
    `md-focus-ring--${shape}`,
    `md-focus-ring--${color}`
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': focusRingId,
    'class': classes,
    'data-target': target || null
  });

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      visible: ${visible},
      target: '${target}',
      show() {
        this.visible = true;
        this.$dispatch('focus-ring-show');
      },
      hide() {
        this.visible = false;
        this.$dispatch('focus-ring-hide');
      },
      attachToTarget() {
        if (this.target) {
          const targetEl = document.querySelector(this.target);
          if (targetEl) {
            targetEl.addEventListener('focus', () => this.show());
            targetEl.addEventListener('blur', () => this.hide());
            targetEl.addEventListener('pointerdown', () => this.hide());
          }
        }
      }
    }" 
    x-init="attachToTarget()"
    x-show="visible"
    x-transition:enter="transition ease-out duration-150"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-100"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-95"`;
  }

  const html = `<div ${attributes} ${alpineData}></div>`;

  const css = `/* Material Design 3 Focus Ring */
.md-focus-ring {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: ${width}px solid ${colorValue};
  border-radius: inherit;
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transform: scale(0.95);
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  box-sizing: border-box;
}

.md-focus-ring--visible {
  opacity: 1;
  transform: scale(1);
}

.md-focus-ring--inward {
  transform: scale(1.05);
}

.md-focus-ring--inward.md-focus-ring--visible {
  transform: scale(1);
}

/* Shape variants */
.md-focus-ring--rounded {
  border-radius: ${MD3_SHAPE.corner.small};
}

.md-focus-ring--sharp {
  border-radius: 0;
}

.md-focus-ring--circular {
  border-radius: 50%;
}

/* Color variants */
.md-focus-ring--primary {
  border-color: ${MD3_COLORS.primary};
}

.md-focus-ring--secondary {
  border-color: ${MD3_COLORS.secondary};
}

.md-focus-ring--error {
  border-color: ${MD3_COLORS.error};
}

/* Attached to parent positioning */
.md-focus-ring[data-attached] {
  position: absolute;
  top: -${offset}px;
  left: -${offset}px;
  right: -${offset}px;
  bottom: -${offset}px;
  border-radius: calc(inherit + ${offset}px);
}

/* Focus ring utilities for common elements */
.md-focus-target {
  position: relative;
  outline: none;
}

.md-focus-target:focus-visible .md-focus-ring {
  opacity: 1;
  transform: scale(1);
}

.md-focus-target:not(:focus-visible) .md-focus-ring {
  opacity: 0;
  transform: scale(0.95);
}

/* Built-in focus rings for interactive elements */
.btn:focus-visible {
  outline: none;
  position: relative;
}

.btn:focus-visible::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid ${MD3_COLORS.primary};
  border-radius: calc(inherit + 2px);
  pointer-events: none;
  animation: focus-ring-appear ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

@keyframes focus-ring-appear {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Focus ring for form elements */
.md-field__input:focus-visible + .md-focus-ring {
  opacity: 1;
  transform: scale(1);
}

/* Focus ring for icon buttons */
.md-icon-button:focus-visible {
  outline: none;
}

.md-icon-button:focus-visible::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid ${MD3_COLORS.primary};
  border-radius: 50%;
  pointer-events: none;
  animation: focus-ring-appear ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .md-focus-ring {
    border-width: 3px;
  }
  
  .btn:focus-visible::before,
  .md-icon-button:focus-visible::before {
    border-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .md-focus-ring {
    transition: opacity ${MD3_MOTION.duration.short4} linear;
    transform: none;
  }
  
  .md-focus-ring--visible {
    transform: none;
  }
  
  @keyframes focus-ring-appear {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

/* Dark theme support */
[data-theme="dark"] .md-focus-ring--primary,
[data-theme="dark"] .btn:focus-visible::before,
[data-theme="dark"] .md-icon-button:focus-visible::before {
  border-color: ${MD3_COLORS.primary};
}

[data-theme="dark"] .md-focus-ring--secondary {
  border-color: ${MD3_COLORS.secondary};
}

[data-theme="dark"] .md-focus-ring--error {
  border-color: ${MD3_COLORS.error};
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Focus Ring
class FocusRingManager {
  constructor() {
    this.rings = new Map();
    this.init();
  }
  
  init() {
    // Auto-attach focus rings to elements with focus-target class
    document.addEventListener('DOMContentLoaded', () => {
      this.attachToFocusTargets();
    });
    
    // Handle programmatic focus ring creation
    document.addEventListener('focusRingCreate', (e) => {
      this.createFocusRing(e.detail);
    });
  }
  
  attachToFocusTargets() {
    const focusTargets = document.querySelectorAll('.md-focus-target');
    focusTargets.forEach(target => {
      this.attachFocusRing(target);
    });
  }
  
  attachFocusRing(target, options = {}) {
    const ringId = target.id + '-focus-ring' || 'focus-ring-' + Date.now();
    
    if (this.rings.has(target)) {
      return; // Already has focus ring
    }
    
    const ring = document.createElement('div');
    ring.id = ringId;
    ring.className = \`md-focus-ring md-focus-ring--\${options.color || 'primary'} md-focus-ring--\${options.shape || 'rounded'}\`;
    ring.setAttribute('data-attached', 'true');
    
    target.appendChild(ring);
    this.rings.set(target, ring);
    
    // Event listeners
    const showRing = () => {
      ring.classList.add('md-focus-ring--visible');
      ring.dispatchEvent(new CustomEvent('focusRingShow'));
    };
    
    const hideRing = () => {
      ring.classList.remove('md-focus-ring--visible');
      ring.dispatchEvent(new CustomEvent('focusRingHide'));
    };
    
    target.addEventListener('focus', showRing);
    target.addEventListener('blur', hideRing);
    target.addEventListener('pointerdown', hideRing);
    
    // Store cleanup function
    target._focusRingCleanup = () => {
      target.removeEventListener('focus', showRing);
      target.removeEventListener('blur', hideRing);
      target.removeEventListener('pointerdown', hideRing);
      ring.remove();
      this.rings.delete(target);
    };
  }
  
  createFocusRing(options) {
    const { target, ...ringOptions } = options;
    const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (targetEl) {
      this.attachFocusRing(targetEl, ringOptions);
    }
  }
  
  removeFocusRing(target) {
    if (target._focusRingCleanup) {
      target._focusRingCleanup();
    }
  }
}

// Global focus ring manager
window.focusRingManager = new FocusRingManager();

// Initialize specific focus ring
document.addEventListener('DOMContentLoaded', function() {
  const focusRing = document.getElementById('${focusRingId}');
  const targetSelector = '${target}';
  
  if (focusRing && targetSelector) {
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      targetEl.addEventListener('focus', () => {
        focusRing.classList.add('md-focus-ring--visible');
      });
      
      targetEl.addEventListener('blur', () => {
        focusRing.classList.remove('md-focus-ring--visible');
      });
      
      targetEl.addEventListener('pointerdown', () => {
        focusRing.classList.remove('md-focus-ring--visible');
      });
    }
  }
});`;
  }

  return { html, css, js };
}

// Elevation Component
export function generateElevation(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    level: 1, // Elevation level (0-5)
    content: 'Content with elevation',
    animated: false, // Whether to animate elevation changes
    hover: false, // Whether to increase elevation on hover
    focus: false, // Whether to increase elevation on focus
    pressed: false, // Whether to decrease elevation when pressed
    tonal: false, // Use tonal elevation (surface tint)
    customShadow: '', // Custom shadow value
    borderRadius: 'medium' // small, medium, large, full
  });

  const { level, content, animated, hover, focus, pressed, tonal, customShadow, borderRadius } = normalizedProps;
  const elevationId = generateId('elevation');
  
  // Clamp level to valid range
  const validLevel = Math.max(0, Math.min(5, level));
  const elevationValue = customShadow || MD3_ELEVATION[`level${validLevel}` as keyof typeof MD3_ELEVATION];
  
  // Build classes using helper
  const classes = buildClasses([
    'md-elevation',
    `md-elevation--level-${validLevel}`,
    `md-elevation--radius-${borderRadius}`,
    animated ? 'md-elevation--animated' : null,
    hover ? 'md-elevation--hover-enabled' : null,
    focus ? 'md-elevation--focus-enabled' : null,
    pressed ? 'md-elevation--press-enabled' : null,
    tonal ? 'md-elevation--tonal' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': elevationId,
    'class': classes,
    'data-elevation-level': validLevel.toString()
  });

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      level: ${validLevel},
      originalLevel: ${validLevel},
      hoverEnabled: ${hover},
      focusEnabled: ${focus},
      pressEnabled: ${pressed},
      isHovered: false,
      isFocused: false,
      isPressed: false,
      
      get currentLevel() {
        if (this.isPressed && this.pressEnabled) return Math.max(0, this.originalLevel - 1);
        if (this.isFocused && this.focusEnabled) return Math.min(5, this.originalLevel + 1);
        if (this.isHovered && this.hoverEnabled) return Math.min(5, this.originalLevel + 1);
        return this.originalLevel;
      },
      
      updateElevation() {
        this.level = this.currentLevel;
        this.$el.style.boxShadow = this.getElevationValue(this.level);
        this.$dispatch('elevation-change', { level: this.level });
      },
      
      getElevationValue(level) {
        const elevations = {
          0: 'none',
          1: '${MD3_ELEVATION.level1}',
          2: '${MD3_ELEVATION.level2}',
          3: '${MD3_ELEVATION.level3}',
          4: '${MD3_ELEVATION.level4}',
          5: '${MD3_ELEVATION.level5}'
        };
        return elevations[level] || elevations[1];
      }
    }" 
    x-init="updateElevation()"
    @mouseenter="isHovered = true; updateElevation()"
    @mouseleave="isHovered = false; isPressed = false; updateElevation()"
    @focus="isFocused = true; updateElevation()"
    @blur="isFocused = false; updateElevation()"
    @mousedown="isPressed = true; updateElevation()"
    @mouseup="isPressed = false; updateElevation()"
    tabindex="${focus ? '0' : '-1'}"`;
  }

  const html = `<div ${attributes} ${alpineData}>
  <div class="md-elevation__content">
    ${content}
  </div>
</div>`;

  const css = `/* Material Design 3 Elevation System */
.md-elevation {
  position: relative;
  background-color: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  transition: ${animated ? `box-shadow ${MD3_MOTION.duration.medium2} ${MD3_MOTION.easing.standard}` : 'none'};
  box-sizing: border-box;
}

/* Elevation levels */
.md-elevation--level-0 { box-shadow: ${MD3_ELEVATION.level0}; }
.md-elevation--level-1 { box-shadow: ${MD3_ELEVATION.level1}; }
.md-elevation--level-2 { box-shadow: ${MD3_ELEVATION.level2}; }
.md-elevation--level-3 { box-shadow: ${MD3_ELEVATION.level3}; }
.md-elevation--level-4 { box-shadow: ${MD3_ELEVATION.level4}; }
.md-elevation--level-5 { box-shadow: ${MD3_ELEVATION.level5}; }

/* Border radius variants */
.md-elevation--radius-small { border-radius: ${MD3_SHAPE.corner.extraSmall}; }
.md-elevation--radius-medium { border-radius: ${MD3_SHAPE.corner.small}; }
.md-elevation--radius-large { border-radius: ${MD3_SHAPE.corner.medium}; }
.md-elevation--radius-full { border-radius: ${MD3_SHAPE.corner.full}; }

/* Animated elevation */
.md-elevation--animated {
  transition: box-shadow ${MD3_MOTION.duration.medium2} ${MD3_MOTION.easing.standard};
}

/* Interactive states */
.md-elevation--hover-enabled:hover { box-shadow: ${MD3_ELEVATION.level2}; }
.md-elevation--hover-enabled.md-elevation--level-0:hover { box-shadow: ${MD3_ELEVATION.level1}; }
.md-elevation--hover-enabled.md-elevation--level-1:hover { box-shadow: ${MD3_ELEVATION.level2}; }
.md-elevation--hover-enabled.md-elevation--level-2:hover { box-shadow: ${MD3_ELEVATION.level3}; }
.md-elevation--hover-enabled.md-elevation--level-3:hover { box-shadow: ${MD3_ELEVATION.level4}; }
.md-elevation--hover-enabled.md-elevation--level-4:hover { box-shadow: ${MD3_ELEVATION.level5}; }
.md-elevation--hover-enabled.md-elevation--level-5:hover { box-shadow: ${MD3_ELEVATION.level5}; }

/* Focus state */
.md-elevation--focus-enabled:focus { outline: none; }
.md-elevation--focus-enabled:focus-visible { box-shadow: ${MD3_ELEVATION.level2}, 0 0 0 2px ${MD3_COLORS.primary}; }

/* Pressed state */
.md-elevation--press-enabled:active { box-shadow: ${MD3_ELEVATION.level0}; }
.md-elevation--press-enabled.md-elevation--level-1:active { box-shadow: ${MD3_ELEVATION.level0}; }
.md-elevation--press-enabled.md-elevation--level-2:active { box-shadow: ${MD3_ELEVATION.level1}; }
.md-elevation--press-enabled.md-elevation--level-3:active { box-shadow: ${MD3_ELEVATION.level2}; }
.md-elevation--press-enabled.md-elevation--level-4:active { box-shadow: ${MD3_ELEVATION.level3}; }
.md-elevation--press-enabled.md-elevation--level-5:active { box-shadow: ${MD3_ELEVATION.level4}; }

/* Content area */
.md-elevation__content { padding: 16px; width: 100%; height: 100%; }

/* Utility classes */
.md-elevation-0 { box-shadow: ${MD3_ELEVATION.level0}; }
.md-elevation-1 { box-shadow: ${MD3_ELEVATION.level1}; }
.md-elevation-2 { box-shadow: ${MD3_ELEVATION.level2}; }
.md-elevation-3 { box-shadow: ${MD3_ELEVATION.level3}; }
.md-elevation-4 { box-shadow: ${MD3_ELEVATION.level4}; }
.md-elevation-5 { box-shadow: ${MD3_ELEVATION.level5}; }`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Elevation
document.addEventListener('DOMContentLoaded', function() {
  const elevation = document.getElementById('${elevationId}');
  
  if (elevation) {
    elevation.style.boxShadow = '${elevationValue}';
    
    const originalLevel = ${validLevel};
    let currentLevel = originalLevel;
    
    const updateElevation = (level) => {
      const elevations = {
        0: 'none',
        1: '${MD3_ELEVATION.level1}',
        2: '${MD3_ELEVATION.level2}',
        3: '${MD3_ELEVATION.level3}',
        4: '${MD3_ELEVATION.level4}',
        5: '${MD3_ELEVATION.level5}'
      };
      elevation.style.boxShadow = elevations[level] || elevations[1];
    };
    
    ${hover ? `
    elevation.addEventListener('mouseenter', () => updateElevation(Math.min(5, originalLevel + 1)));
    elevation.addEventListener('mouseleave', () => updateElevation(originalLevel));
    ` : ''}
    
    ${focus ? `
    elevation.setAttribute('tabindex', '0');
    elevation.addEventListener('focus', () => updateElevation(Math.min(5, originalLevel + 1)));
    elevation.addEventListener('blur', () => updateElevation(originalLevel));
    ` : ''}
    
    ${pressed ? `
    elevation.addEventListener('mousedown', () => updateElevation(Math.max(0, originalLevel - 1)));
    elevation.addEventListener('mouseup', () => updateElevation(originalLevel));
    ` : ''}
  }
});`;
  }

  return { html, css, js };
}

// Ripple Component
export function generateRipple(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    color: 'primary', // primary, secondary, surface, custom
    customColor: '', // Custom color value
    opacity: 0.12, // Ripple opacity (0-1)
    duration: 600, // Animation duration in ms
    centered: false, // Center ripple instead of using click position
    unbounded: false, // Allow ripple to extend beyond container bounds
    disabled: false, // Disable ripple effect
    size: 'auto', // auto, small, medium, large, or pixel value
    trigger: 'click', // click, hover, focus, touch
    content: 'Click me for ripple effect'
  });

  const { color, customColor, opacity, duration, centered, unbounded, disabled, size, trigger, content } = normalizedProps;
  const rippleId = generateId('ripple');
  
  // Color mapping
  let rippleColor = customColor;
  if (!customColor) {
    switch (color) {
      case 'primary':
        rippleColor = MD3_COLORS.primary;
        break;
      case 'secondary':
        rippleColor = MD3_COLORS.secondary;
        break;
      case 'surface':
        rippleColor = MD3_COLORS.onSurface;
        break;
      default:
        rippleColor = color.startsWith('#') ? color : MD3_COLORS.primary;
    }
  }
  
  // Build classes using helper
  const classes = buildClasses([
    'md-ripple',
    `md-ripple--${color}`,
    centered ? 'md-ripple--centered' : null,
    unbounded ? 'md-ripple--unbounded' : null,
    disabled ? 'md-ripple--disabled' : null,
    `md-ripple--trigger-${trigger}`
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': rippleId,
    'class': classes,
    'data-ripple-color': rippleColor,
    'data-ripple-opacity': opacity.toString(),
    'data-ripple-duration': duration.toString()
  });

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      disabled: ${disabled},
      centered: ${centered},
      unbounded: ${unbounded},
      color: '${rippleColor}',
      opacity: ${opacity},
      duration: ${duration},
      activeRipples: [],
      
      createRipple(event) {
        if (this.disabled) return;
        
        const rect = this.$el.getBoundingClientRect();
        const x = this.centered ? rect.width / 2 : event.clientX - rect.left;
        const y = this.centered ? rect.height / 2 : event.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'md-ripple__circle';
        
        const size = this.calculateSize(rect, x, y);
        
        ripple.style.cssText = \`
          position: absolute;
          left: \${x - size / 2}px;
          top: \${y - size / 2}px;
          width: \${size}px;
          height: \${size}px;
          background-color: \${this.color};
          opacity: \${this.opacity};
          border-radius: 50%;
          pointer-events: none;
          animation: md-ripple-expand \${this.duration}ms ease-out;
          z-index: 0;
        \`;
        
        this.$el.appendChild(ripple);
        this.activeRipples.push(ripple);
        
        setTimeout(() => {
          ripple.style.animation = \`md-ripple-fade \${this.duration / 2}ms ease-out\`;
          setTimeout(() => {
            if (ripple.parentNode) ripple.remove();
            this.activeRipples = this.activeRipples.filter(r => r !== ripple);
          }, this.duration / 2);
        }, this.duration);
        
        this.$dispatch('ripple-created', { x, y, size });
      },
      
      calculateSize(rect, x, y) {
        if ('${size}' !== 'auto') {
          const sizes = { small: 40, medium: 56, large: 72 };
          return sizes['${size}'] || parseInt('${size}') || 56;
        }
        
        if (this.centered) {
          return Math.max(rect.width, rect.height);
        }
        
        const distanceX = Math.max(x, rect.width - x);
        const distanceY = Math.max(y, rect.height - y);
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY) * 2;
      }
    }" 
    @${trigger}="createRipple($event)"`;
  }

  const html = `<div ${attributes} ${alpineData}>
  <div class="md-ripple__content">
    ${content}
  </div>
</div>`;

  const css = `/* Material Design 3 Ripple Effect */
.md-ripple {
  position: relative;
  overflow: ${unbounded ? 'visible' : 'hidden'};
  cursor: ${disabled ? 'default' : 'pointer'};
  user-select: none;
  background-color: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  border-radius: ${MD3_SHAPE.corner.small};
  padding: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-ripple:not(.md-ripple--disabled):hover {
  background-color: color-mix(in srgb, ${rippleColor} 8%, ${MD3_COLORS.surface});
}

.md-ripple--disabled {
  opacity: 0.38;
  pointer-events: none;
}

.md-ripple__content {
  position: relative;
  z-index: 1;
}

.md-ripple__circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transform-origin: center;
}

/* Ripple animations */
@keyframes md-ripple-expand {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: ${opacity};
    transform: scale(1);
  }
}

@keyframes md-ripple-fade {
  from {
    opacity: ${opacity};
  }
  to {
    opacity: 0;
  }
}

/* Utility classes for adding ripple to existing elements */
.md-ripple-target {
  position: relative;
  overflow: hidden;
}

.md-ripple-target::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, ${rippleColor} 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition: transform ${duration}ms ease-out, opacity ${duration}ms ease-out;
  pointer-events: none;
}

.md-ripple-target:active::before {
  opacity: ${opacity};
  transform: scale(1);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  @keyframes md-ripple-expand {
    from, to {
      opacity: ${opacity};
      transform: scale(1);
    }
  }
  
  .md-ripple__circle {
    animation-duration: 0.1s !important;
  }
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
  const ripple = document.getElementById('${rippleId}');
  
  if (ripple) {
    const config = {
      color: '${rippleColor}',
      opacity: ${opacity},
      duration: ${duration},
      centered: ${centered},
      unbounded: ${unbounded},
      disabled: ${disabled}
    };
    
    ripple.addEventListener('${trigger}', function(e) {
      if (config.disabled) return;
      
      const rect = this.getBoundingClientRect();
      const x = config.centered ? rect.width / 2 : e.clientX - rect.left;
      const y = config.centered ? rect.height / 2 : e.clientY - rect.top;
      
      const rippleCircle = document.createElement('span');
      rippleCircle.className = 'md-ripple__circle';
      
      const distanceX = Math.max(x, rect.width - x);
      const distanceY = Math.max(y, rect.height - y);
      const size = Math.sqrt(distanceX * distanceX + distanceY * distanceY) * 2;
      
      rippleCircle.style.cssText = \`
        position: absolute;
        left: \${x - size / 2}px;
        top: \${y - size / 2}px;
        width: \${size}px;
        height: \${size}px;
        background-color: \${config.color};
        opacity: \${config.opacity};
        border-radius: 50%;
        pointer-events: none;
        animation: md-ripple-expand \${config.duration}ms ease-out;
        z-index: 0;
      \`;
      
      this.appendChild(rippleCircle);
      
      setTimeout(() => {
        rippleCircle.style.animation = \`md-ripple-fade \${config.duration / 2}ms ease-out\`;
        setTimeout(() => {
          if (rippleCircle.parentNode) rippleCircle.remove();
        }, config.duration / 2);
      }, config.duration);
    });
  }
});`;
  }

  return { html, css, js };
}

// Typography Component
export function generateTypography(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    scale: 'bodyLarge', // Material Design 3 typography scale
    content: 'Typography Sample Text',
    tag: 'p', // HTML tag to use
    color: 'onSurface', // Material color token
    align: 'left', // left, center, right, justify
    weight: 'inherit', // CSS font-weight or 'inherit'
    transform: 'none', // uppercase, lowercase, capitalize, none
    decoration: 'none', // underline, line-through, none
    truncate: false, // Enable text truncation
    lines: 0 // Line clamp (0 = disabled)
  });

  const { scale, content, tag, color, align, weight, transform, decoration, truncate, lines } = normalizedProps;
  const typographyId = generateId('typography');
  
  // Get typography values from MD3_TYPOGRAPHY
  const scaleStyles = MD3_TYPOGRAPHY[scale as keyof typeof MD3_TYPOGRAPHY] || MD3_TYPOGRAPHY.bodyLarge;
  
  // Color mapping
  const textColor = color.startsWith('--') ? `var(${color})` : 
                    MD3_COLORS[color as keyof typeof MD3_COLORS] || 
                    (color.startsWith('#') ? color : MD3_COLORS.onSurface);
  
  // Build classes using helper
  const classes = buildClasses([
    'md-typography',
    `md-typography--${scale}`,
    `md-typography--align-${align}`,
    truncate ? 'md-typography--truncate' : null,
    lines > 0 ? `md-typography--lines-${lines}` : null,
    transform !== 'none' ? `md-typography--transform-${transform}` : null,
    decoration !== 'none' ? `md-typography--decoration-${decoration}` : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': typographyId,
    'class': classes,
    'data-typography-scale': scale
  });

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      content: '${content}',
      scale: '${scale}',
      truncated: ${truncate}
    }"`;
  }

  const html = `<${tag} ${attributes} ${alpineData}>${content}</${tag}>`;

  const css = `/* Material Design 3 Typography System */
.md-typography {
  margin: 0;
  padding: 0;
  color: ${textColor};
  font-family: 'Roboto', 'Noto Sans', sans-serif;
  text-align: ${align};
  font-weight: ${weight !== 'inherit' ? weight : 'inherit'};
  text-transform: ${transform};
  text-decoration: ${decoration};
}

/* Typography scales */
.md-typography--displayLarge {
  font-size: ${MD3_TYPOGRAPHY.displayLarge.fontSize};
  line-height: ${MD3_TYPOGRAPHY.displayLarge.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.displayLarge.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.displayLarge.letterSpacing};
}

.md-typography--displayMedium {
  font-size: ${MD3_TYPOGRAPHY.displayMedium.fontSize};
  line-height: ${MD3_TYPOGRAPHY.displayMedium.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.displayMedium.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.displayMedium.letterSpacing};
}

.md-typography--displaySmall {
  font-size: ${MD3_TYPOGRAPHY.displaySmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.displaySmall.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.displaySmall.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.displaySmall.letterSpacing};
}

.md-typography--headlineLarge {
  font-size: ${MD3_TYPOGRAPHY.headlineLarge.fontSize};
  line-height: ${MD3_TYPOGRAPHY.headlineLarge.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.headlineLarge.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.headlineLarge.letterSpacing};
}

.md-typography--headlineMedium {
  font-size: ${MD3_TYPOGRAPHY.headlineMedium.fontSize};
  line-height: ${MD3_TYPOGRAPHY.headlineMedium.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.headlineMedium.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.headlineMedium.letterSpacing};
}

.md-typography--headlineSmall {
  font-size: ${MD3_TYPOGRAPHY.headlineSmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.headlineSmall.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.headlineSmall.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.headlineSmall.letterSpacing};
}

.md-typography--titleLarge {
  font-size: ${MD3_TYPOGRAPHY.titleLarge.fontSize};
  line-height: ${MD3_TYPOGRAPHY.titleLarge.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.titleLarge.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.titleLarge.letterSpacing};
}

.md-typography--titleMedium {
  font-size: ${MD3_TYPOGRAPHY.titleMedium.fontSize};
  line-height: ${MD3_TYPOGRAPHY.titleMedium.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.titleMedium.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.titleMedium.letterSpacing};
}

.md-typography--titleSmall {
  font-size: ${MD3_TYPOGRAPHY.titleSmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.titleSmall.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.titleSmall.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.titleSmall.letterSpacing};
}

.md-typography--bodyLarge {
  font-size: ${MD3_TYPOGRAPHY.bodyLarge.fontSize};
  line-height: ${MD3_TYPOGRAPHY.bodyLarge.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.bodyLarge.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.bodyLarge.letterSpacing};
}

.md-typography--bodyMedium {
  font-size: ${MD3_TYPOGRAPHY.bodyMedium.fontSize};
  line-height: ${MD3_TYPOGRAPHY.bodyMedium.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.bodyMedium.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.bodyMedium.letterSpacing};
}

.md-typography--bodySmall {
  font-size: ${MD3_TYPOGRAPHY.bodySmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.bodySmall.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.bodySmall.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.bodySmall.letterSpacing};
}

.md-typography--labelLarge {
  font-size: ${MD3_TYPOGRAPHY.labelLarge.fontSize};
  line-height: ${MD3_TYPOGRAPHY.labelLarge.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.labelLarge.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.labelLarge.letterSpacing};
}

.md-typography--labelMedium {
  font-size: ${MD3_TYPOGRAPHY.labelMedium.fontSize};
  line-height: ${MD3_TYPOGRAPHY.labelMedium.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.labelMedium.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.labelMedium.letterSpacing};
}

.md-typography--labelSmall {
  font-size: ${MD3_TYPOGRAPHY.labelSmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.labelSmall.lineHeight};
  font-weight: ${MD3_TYPOGRAPHY.labelSmall.fontWeight};
  letter-spacing: ${MD3_TYPOGRAPHY.labelSmall.letterSpacing};
}

/* Text alignment */
.md-typography--align-left { text-align: left; }
.md-typography--align-center { text-align: center; }
.md-typography--align-right { text-align: right; }
.md-typography--align-justify { text-align: justify; }

/* Text transform */
.md-typography--transform-uppercase { text-transform: uppercase; }
.md-typography--transform-lowercase { text-transform: lowercase; }
.md-typography--transform-capitalize { text-transform: capitalize; }

/* Text decoration */
.md-typography--decoration-underline { text-decoration: underline; }
.md-typography--decoration-line-through { text-decoration: line-through; }

/* Text truncation */
.md-typography--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Line clamping */
.md-typography--lines-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.md-typography--lines-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.md-typography--lines-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Typography
document.addEventListener('DOMContentLoaded', function() {
  const typography = document.getElementById('${typographyId}');
  
  if (typography) {
    typography.changeScale = function(newScale) {
      const scales = [
        'displayLarge', 'displayMedium', 'displaySmall',
        'headlineLarge', 'headlineMedium', 'headlineSmall',
        'titleLarge', 'titleMedium', 'titleSmall',
        'bodyLarge', 'bodyMedium', 'bodySmall',
        'labelLarge', 'labelMedium', 'labelSmall'
      ];
      
      if (scales.includes(newScale)) {
        scales.forEach(scale => {
          typography.classList.remove('md-typography--' + scale);
        });
        typography.classList.add('md-typography--' + newScale);
        typography.dataset.typographyScale = newScale;
      }
    };
  }
});`;
  }

  return { html, css, js };
}

// Icon Component
export function generateIcon(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    name: 'favorite', // Material icon name or custom content
    size: 24, // Size in pixels (16, 20, 24, 32, 40, 48)
    variant: 'filled', // filled, outlined, round, sharp, two-tone
    color: 'inherit', // inherit, primary, secondary, error, custom hex
    weight: 400, // Font weight for variable fonts
    grade: 0, // Grade for variable fonts (-25 to 200)
    opticalSize: 24, // Optical size for variable fonts
    ariaHidden: true, // Accessibility - hidden by default
    ariaLabel: '', // Accessibility label if not hidden
    customIcon: false // If true, treats name as custom SVG or text content
  });

  const { name, size, variant, color, weight, grade, opticalSize, ariaHidden, ariaLabel, customIcon } = normalizedProps;
  const iconId = generateId('icon');
  
  // Color mapping
  const colorValue = color === 'inherit' ? 'inherit' :
                    color === 'primary' ? MD3_COLORS.primary :
                    color === 'secondary' ? MD3_COLORS.secondary :
                    color === 'error' ? MD3_COLORS.error :
                    color.startsWith('#') ? color : 'inherit';

  // Build classes using helper
  const classes = buildClasses([
    'md-icon',
    `md-icon--${variant}`,
    `md-icon--size-${size}`,
    color !== 'inherit' ? `md-icon--color-${color}` : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': iconId,
    'class': classes,
    'aria-hidden': ariaHidden ? 'true' : null,
    'aria-label': !ariaHidden && ariaLabel ? ariaLabel : null,
    'role': !ariaHidden ? 'img' : null
  });

  // Icon content based on type
  let iconContent = '';
  if (customIcon) {
    // Custom SVG or text content
    iconContent = name;
  } else {
    // Material Icons font ligature
    iconContent = name;
  }

  // Style attributes for variable fonts
  const variableFontStyles = `
    font-weight: ${weight};
    font-variation-settings: 'FILL' ${variant === 'filled' ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize};
  `.trim();

  const html = `<span ${attributes} style="font-size: ${size}px; color: ${colorValue}; ${variableFontStyles}">
  ${iconContent}
</span>`;

  const css = `/* Material Design 3 Icon */
.md-icon {
  font-family: 'Material Symbols Outlined', 'Material Icons', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  flex-shrink: 0;
  /* Support for variable fonts */
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Icon variants - for different icon families */
.md-icon--filled {
  font-family: 'Material Symbols Outlined', 'Material Icons';
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.md-icon--outlined {
  font-family: 'Material Symbols Outlined', 'Material Icons Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.md-icon--round {
  font-family: 'Material Symbols Rounded', 'Material Icons Round';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.md-icon--sharp {
  font-family: 'Material Symbols Sharp', 'Material Icons Sharp';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.md-icon--two-tone {
  font-family: 'Material Symbols Outlined', 'Material Icons Two Tone';
  font-variation-settings: 'FILL' 0.5, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Size variants */
.md-icon--size-16 {
  font-size: 16px;
  width: 16px;
  height: 16px;
}

.md-icon--size-20 {
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.md-icon--size-24 {
  font-size: 24px;
  width: 24px;
  height: 24px;
}

.md-icon--size-32 {
  font-size: 32px;
  width: 32px;
  height: 32px;
}

.md-icon--size-40 {
  font-size: 40px;
  width: 40px;
  height: 40px;
}

.md-icon--size-48 {
  font-size: 48px;
  width: 48px;
  height: 48px;
}

/* Color variants */
.md-icon--color-primary {
  color: ${MD3_COLORS.primary};
}

.md-icon--color-secondary {
  color: ${MD3_COLORS.secondary};
}

.md-icon--color-error {
  color: ${MD3_COLORS.error};
}

.md-icon--color-on-surface {
  color: ${MD3_COLORS.onSurface};
}

.md-icon--color-on-surface-variant {
  color: ${MD3_COLORS.onSurfaceVariant};
}

/* Interactive states when used in buttons */
.md-icon:hover {
  /* Icons themselves don't have hover states, but can inherit from parent */
}

.md-icon:focus {
  /* Icons themselves don't have focus states, but can inherit from parent */
}

/* Accessibility improvements */
.md-icon[aria-hidden="false"] {
  /* When icon is not hidden, ensure it's properly accessible */
}

/* Dark theme support */
[data-theme="dark"] .md-icon--color-primary {
  color: ${MD3_COLORS.primary};
}

[data-theme="dark"] .md-icon--color-secondary {
  color: ${MD3_COLORS.secondary};
}

[data-theme="dark"] .md-icon--color-error {
  color: ${MD3_COLORS.error};
}

[data-theme="dark"] .md-icon--color-on-surface {
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-icon--color-on-surface-variant {
  color: ${MD3_COLORS.onSurfaceVariant};
}

/* SVG icons support */
.md-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
  display: block;
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Icon
document.addEventListener('DOMContentLoaded', function() {
  const icon = document.getElementById('${iconId}');
  
  // Icon accessibility handler
  if (icon && !icon.hasAttribute('aria-hidden')) {
    // Ensure proper accessibility for non-decorative icons
    if (!icon.hasAttribute('aria-label') && !icon.hasAttribute('aria-labelledby')) {
      console.warn('Icon without aria-hidden should have aria-label or aria-labelledby');
    }
  }
  
  // Variable font support detection
  if ('fontVariationSettings' in document.documentElement.style) {
    icon.classList.add('md-icon--variable-font-support');
  }
  
  // Dispatch load event for custom handling
  icon.dispatchEvent(new CustomEvent('iconLoad', {
    detail: { 
      id: '${iconId}', 
      name: '${name}',
      variant: '${variant}',
      size: ${size}
    }
  }));
});`;
  }

  return { html, css, js };
}

// Field Component
export function generateField(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    label: 'Label',
    supportingText: '',
    errorText: '',
    variant: 'outlined', // filled, outlined
    disabled: false,
    error: false,
    focused: false,
    populated: false,
    required: false,
    hasStart: false, // Leading icon/content
    hasEnd: false, // Trailing icon/content
    resizable: false,
    count: -1, // Character count (-1 = disabled)
    max: -1, // Max characters (-1 = unlimited)
    noAsterisk: false // Hide required asterisk
  });

  const { 
    label, 
    supportingText, 
    errorText, 
    variant, 
    disabled, 
    error, 
    focused, 
    populated, 
    required, 
    hasStart, 
    hasEnd, 
    resizable,
    count,
    max,
    noAsterisk 
  } = normalizedProps;
  
  const fieldId = generateId('field');
  const inputId = generateId('field-input');
  const labelId = generateId('field-label');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-field',
    `md-field--${variant}`,
    disabled ? 'md-field--disabled' : null,
    error ? 'md-field--error' : null,
    focused ? 'md-field--focused' : null,
    populated ? 'md-field--populated' : null,
    hasStart ? 'md-field--has-start' : null,
    hasEnd ? 'md-field--has-end' : null,
    resizable ? 'md-field--resizable' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': fieldId,
    'class': classes
  });

  // Character counter
  const showCounter = count >= 0 || max > 0;
  const counterText = showCounter ? 
    (count >= 0 && max > 0 ? `${count}/${max}` : 
     count >= 0 ? `${count}` : 
     max > 0 ? `0/${max}` : '') : '';

  // Supporting text to display
  const displaySupportingText = error && errorText ? errorText : supportingText;
  const displayTextClass = error && errorText ? 'md-field__supporting-text--error' : '';

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      focused: ${focused},
      populated: ${populated},
      count: ${count},
      error: ${error},
      handleFocus() {
        this.focused = true;
      },
      handleBlur() {
        this.focused = false;
      },
      handleInput(event) {
        const value = event.target.value;
        this.populated = value.length > 0;
        this.count = value.length;
        
        // Validation
        if (${max} > 0 && value.length > ${max}) {
          this.error = true;
        } else {
          this.error = false;
        }
        
        this.$dispatch('field-input', { value, count: this.count });
      }
    }"`;
  }

  const html = `<div ${attributes} ${alpineData}>
  <div class="md-field__container">
    <!-- Start (Leading) content -->
    ${hasStart ? `<div class="md-field__start"><slot name="start">🔍</slot></div>` : ''}
    
    <!-- Input area -->
    <div class="md-field__input-area">
      <input 
        id="${inputId}"
        class="md-field__input"
        type="text"
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${max > 0 ? `maxlength="${max}"` : ''}
        aria-labelledby="${labelId}"
        ${framework === 'alpine' ? '@focus="handleFocus()" @blur="handleBlur()" @input="handleInput($event)"' : ''}
      />
      
      <!-- Label -->
      <label id="${labelId}" class="md-field__label" for="${inputId}">
        ${label}${required && !noAsterisk ? ' *' : ''}
      </label>
      
      <!-- Outline (for outlined variant) -->
      ${variant === 'outlined' ? `
      <div class="md-field__outline">
        <div class="md-field__outline-start"></div>
        <div class="md-field__outline-notch">
          <div class="md-field__outline-panel-inactive"></div>
          <div class="md-field__outline-panel-active"></div>
        </div>
        <div class="md-field__outline-end"></div>
      </div>` : ''}
    </div>
    
    <!-- End (Trailing) content -->
    ${hasEnd ? `<div class="md-field__end"><slot name="end">✓</slot></div>` : ''}
  </div>
  
  <!-- Supporting text and character counter -->
  ${displaySupportingText || showCounter ? `
  <div class="md-field__footer">
    ${displaySupportingText ? `<div class="md-field__supporting-text ${displayTextClass}">${displaySupportingText}</div>` : ''}
    ${showCounter ? `<div class="md-field__counter">${counterText}</div>` : ''}
  </div>` : ''}
</div>`;

  const css = `/* Material Design 3 Field */
.md-field {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Roboto', sans-serif;
}

.md-field__container {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 56px;
  border-radius: ${MD3_SHAPE.corner.extraSmall};
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

/* Outlined variant */
.md-field--outlined .md-field__container {
  background: transparent;
}

.md-field--outlined .md-field__outline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid ${MD3_COLORS.outline};
  border-radius: ${MD3_SHAPE.corner.extraSmall};
  pointer-events: none;
  transition: border-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-field--outlined.md-field--focused .md-field__outline {
  border-color: ${MD3_COLORS.primary};
  border-width: 2px;
}

.md-field--outlined.md-field--error .md-field__outline {
  border-color: ${MD3_COLORS.error};
}

/* Filled variant */
.md-field--filled .md-field__container {
  background: ${MD3_COLORS.surfaceContainerHighest};
  border-radius: ${MD3_SHAPE.corner.extraSmall} ${MD3_SHAPE.corner.extraSmall} 0 0;
  border-bottom: 1px solid ${MD3_COLORS.onSurfaceVariant};
}

.md-field--filled.md-field--focused .md-field__container {
  border-bottom: 2px solid ${MD3_COLORS.primary};
}

.md-field--filled.md-field--error .md-field__container {
  border-bottom: 2px solid ${MD3_COLORS.error};
}

/* Input area */
.md-field__input-area {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 56px;
}

.md-field__input {
  width: 100%;
  height: 56px;
  padding: 16px;
  border: none;
  background: transparent;
  outline: none;
  font-size: ${MD3_TYPOGRAPHY.bodyLarge.fontSize};
  line-height: ${MD3_TYPOGRAPHY.bodyLarge.lineHeight};
  color: ${MD3_COLORS.onSurface};
  caret-color: ${MD3_COLORS.primary};
}

.md-field__input::placeholder {
  color: ${MD3_COLORS.onSurfaceVariant};
  opacity: 0;
  transition: opacity ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-field__input:focus::placeholder {
  opacity: 1;
}

/* Label */
.md-field__label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${MD3_TYPOGRAPHY.bodyLarge.fontSize};
  color: ${MD3_COLORS.onSurfaceVariant};
  pointer-events: none;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  background: ${MD3_COLORS.surface};
  padding: 0 4px;
  margin-left: -4px;
}

.md-field--focused .md-field__label,
.md-field--populated .md-field__label {
  top: 0;
  transform: translateY(-50%) scale(0.75);
  color: ${MD3_COLORS.primary};
}

.md-field--error .md-field__label {
  color: ${MD3_COLORS.error};
}

/* Start and end content */
.md-field__start,
.md-field__end {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: ${MD3_COLORS.onSurfaceVariant};
}

/* Footer */
.md-field__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
  padding: 0 16px;
}

.md-field__supporting-text {
  font-size: ${MD3_TYPOGRAPHY.bodySmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.bodySmall.lineHeight};
  color: ${MD3_COLORS.onSurfaceVariant};
}

.md-field__supporting-text--error {
  color: ${MD3_COLORS.error};
}

.md-field__counter {
  font-size: ${MD3_TYPOGRAPHY.bodySmall.fontSize};
  line-height: ${MD3_TYPOGRAPHY.bodySmall.lineHeight};
  color: ${MD3_COLORS.onSurfaceVariant};
  margin-left: auto;
}

/* Disabled state */
.md-field--disabled {
  opacity: 0.38;
  pointer-events: none;
}

.md-field--disabled .md-field__input {
  color: ${MD3_COLORS.onSurface};
}

/* Dark theme support */
[data-theme="dark"] .md-field--outlined .md-field__outline {
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-field--filled .md-field__container {
  background: ${MD3_COLORS.surfaceContainerHighest};
  border-bottom-color: ${MD3_COLORS.onSurfaceVariant};
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Field
document.addEventListener('DOMContentLoaded', function() {
  const field = document.getElementById('${fieldId}');
  const input = document.getElementById('${inputId}');
  
  if (field && input) {
    let count = ${count};
    
    const updateFieldState = () => {
      const hasValue = input.value.length > 0;
      field.classList.toggle('md-field--populated', hasValue);
      
      if (${max} > 0) {
        count = input.value.length;
        const counter = field.querySelector('.md-field__counter');
        if (counter) {
          counter.textContent = \`\${count}/${max}\`;
        }
        
        field.classList.toggle('md-field--error', count > ${max});
      }
    };
    
    input.addEventListener('focus', () => {
      field.classList.add('md-field--focused');
    });
    
    input.addEventListener('blur', () => {
      field.classList.remove('md-field--focused');
    });
    
    input.addEventListener('input', (e) => {
      updateFieldState();
      field.dispatchEvent(new CustomEvent('fieldInput', {
        detail: { value: e.target.value, count: e.target.value.length }
      }));
    });
    
    // Initial state
    updateFieldState();
  }
});`;
  }

  return { html, css, js };
}