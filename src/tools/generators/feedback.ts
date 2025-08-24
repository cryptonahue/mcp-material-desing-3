import { ComponentCode } from './types.js';
import { normalizeProps, buildClasses, buildAttributes, generateId, renderIcon } from '../../utils/component-helpers.js';
import { MD3_COLORS, MD3_MOTION, MD3_ELEVATION, MD3_SHAPE } from '../../utils/material-tokens.js';

// Progress Component
export function generateProgress(props: any, framework: string): ComponentCode {
  const type = props.type || 'linear'; // linear, circular
  const value = props.value !== undefined ? props.value : null; // null for indeterminate
  const max = props.max || 100;
  const label = props.label || '';
  const size = props.size || 'medium'; // small, medium, large
  const showLabel = props.showLabel !== false;
  const color = props.color || 'primary'; // primary, secondary, error
  const thickness = props.thickness || 'medium'; // thin, medium, thick
  
  const isIndeterminate = value === null || value === undefined;
  const percentage = isIndeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
  
  const progressClasses = [
    'md-progress',
    `md-progress--${type}`,
    `md-progress--${size}`,
    `md-progress--${color}`,
    `md-progress--${thickness}`,
    isIndeterminate ? 'md-progress--indeterminate' : 'md-progress--determinate'
  ].filter(Boolean).join(' ');

  let html = '';
  
  if (type === 'circular') {
    const radius = size === 'small' ? 18 : size === 'large' ? 22 : 20;
    const strokeWidth = thickness === 'thin' ? 2 : thickness === 'thick' ? 6 : 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = isIndeterminate ? 0 : circumference - (percentage / 100) * circumference;
    
    html = `<div class="${progressClasses}" role="progressbar" ${isIndeterminate ? '' : `aria-valuenow="${value}" aria-valuemax="${max}"`} aria-label="${label || 'Progress'}">
  ${showLabel && label ? `<div class="md-progress__label">${label}</div>` : ''}
  <div class="md-progress__circular">
    <svg class="md-progress__svg" width="${(radius + strokeWidth) * 2}" height="${(radius + strokeWidth) * 2}">
      <circle
        class="md-progress__track"
        cx="${radius + strokeWidth}"
        cy="${radius + strokeWidth}"
        r="${radius}"
        fill="none"
        stroke-width="${strokeWidth}"
      />
      <circle
        class="md-progress__bar"
        cx="${radius + strokeWidth}"
        cy="${radius + strokeWidth}"
        r="${radius}"
        fill="none"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${strokeDashoffset}"
        transform="rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})"
      />
    </svg>
    ${!isIndeterminate && showLabel ? `<div class="md-progress__value">${Math.round(percentage)}%</div>` : ''}
  </div>
</div>`;
  } else {
    // Linear progress
    html = `<div class="${progressClasses}" role="progressbar" ${isIndeterminate ? '' : `aria-valuenow="${value}" aria-valuemax="${max}"`} aria-label="${label || 'Progress'}">
  ${showLabel && label ? `<div class="md-progress__label">${label}</div>` : ''}
  <div class="md-progress__track">
    <div class="md-progress__bar" style="${isIndeterminate ? '' : `width: ${percentage}%`}"></div>
  </div>
  ${!isIndeterminate && showLabel ? `<div class="md-progress__value">${Math.round(percentage)}%</div>` : ''}
</div>`;
  }

  const css = `/* Material Design 3 Progress */
.md-progress {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  font-family: 'Roboto', system-ui, sans-serif;
}

.md-progress__label {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
}

.md-progress__value {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  text-align: right;
}

/* Linear Progress */
.md-progress--linear {
  width: 200px;
}

.md-progress--linear .md-progress__track {
  position: relative;
  width: 100%;
  height: 4px;
  background: var(--md-sys-color-surface-variant, #e7e0ec);
  border-radius: 2px;
  overflow: hidden;
}

.md-progress--linear .md-progress__bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--md-sys-color-primary, #6750a4);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Circular Progress */
.md-progress--circular {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.md-progress__circular {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.md-progress__svg {
  transform: rotate(-90deg);
}

.md-progress__track {
  stroke: var(--md-sys-color-surface-variant, #e7e0ec);
}

.md-progress__bar {
  stroke: var(--md-sys-color-primary, #6750a4);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.md-progress--circular .md-progress__value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 500;
  color: var(--md-sys-color-on-surface, #1c1b1f);
  margin: 0;
  text-align: center;
}

/* Size variants */
.md-progress--small.md-progress--linear {
  width: 120px;
}

.md-progress--small.md-progress--linear .md-progress__track {
  height: 2px;
}

.md-progress--large.md-progress--linear {
  width: 300px;
}

.md-progress--large.md-progress--linear .md-progress__track {
  height: 6px;
}

/* Thickness variants */
.md-progress--thin.md-progress--linear .md-progress__track {
  height: 2px;
}

.md-progress--thick.md-progress--linear .md-progress__track {
  height: 8px;
}

/* Color variants */
.md-progress--secondary .md-progress__bar,
.md-progress--secondary .md-progress__bar {
  background: var(--md-sys-color-secondary, #625b71);
  stroke: var(--md-sys-color-secondary, #625b71);
}

.md-progress--error .md-progress__bar,
.md-progress--error .md-progress__bar {
  background: var(--md-sys-color-error, #ba1a1a);
  stroke: var(--md-sys-color-error, #ba1a1a);
}

/* Indeterminate animations */
.md-progress--indeterminate.md-progress--linear .md-progress__bar {
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--md-sys-color-primary, #6750a4),
    transparent
  );
  animation: linear-indeterminate 2s ease-in-out infinite;
}

.md-progress--indeterminate.md-progress--circular .md-progress__bar {
  animation: circular-indeterminate 1.4s ease-in-out infinite;
}

@keyframes linear-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes circular-indeterminate {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125;
  }
}

/* Accessibility */
.md-progress:focus {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: 2px;
}`;

  let js = '';
  if (framework === 'alpine') {
    js = `<!-- Alpine.js data -->
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('progressComponent', () => ({
    value: ${value || 0},
    max: ${max},
    isIndeterminate: ${isIndeterminate},
    
    get percentage() {
      return this.isIndeterminate ? 0 : Math.min(Math.max((this.value / this.max) * 100, 0), 100);
    },
    
    updateProgress(newValue) {
      if (!this.isIndeterminate) {
        this.value = Math.min(Math.max(newValue, 0), this.max);
        this.updateUI();
        this.$dispatch('progress-change', { 
          value: this.value,
          percentage: this.percentage
        });
      }
    },
    
    updateUI() {
      const bar = this.$el.querySelector('.md-progress__bar');
      const valueDisplay = this.$el.querySelector('.md-progress__value');
      
      if (bar && !this.isIndeterminate) {
        if (bar.style.width !== undefined) {
          // Linear progress
          bar.style.width = this.percentage + '%';
        } else {
          // Circular progress
          const circumference = 2 * Math.PI * 20; // Default radius
          bar.style.strokeDashoffset = circumference - (this.percentage / 100) * circumference;
        }
      }
      
      if (valueDisplay && !this.isIndeterminate) {
        valueDisplay.textContent = Math.round(this.percentage) + '%';
      }
    },
    
    init() {
      this.updateUI();
    }
  }));
});
</script>`;
  } else if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Progress
function initProgress(progressElement) {
  const bar = progressElement.querySelector('.md-progress__bar');
  const valueDisplay = progressElement.querySelector('.md-progress__value');
  const isIndeterminate = progressElement.classList.contains('md-progress--indeterminate');
  
  function updateProgress(value, max = 100) {
    if (isIndeterminate) return;
    
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    if (bar) {
      if (bar.style.width !== undefined) {
        // Linear progress
        bar.style.width = percentage + '%';
      } else {
        // Circular progress  
        const circumference = 2 * Math.PI * 20; // Default radius
        bar.style.strokeDashoffset = circumference - (percentage / 100) * circumference;
      }
    }
    
    if (valueDisplay) {
      valueDisplay.textContent = Math.round(percentage) + '%';
    }
    
    // Dispatch custom event
    const event = new CustomEvent('progressChange', {
      detail: { value, percentage, max }
    });
    progressElement.dispatchEvent(event);
  }
  
  // Expose update function
  progressElement.updateProgress = updateProgress;
  
  // Auto-update from aria attributes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'aria-valuenow') {
        const value = parseFloat(progressElement.getAttribute('aria-valuenow')) || 0;
        const max = parseFloat(progressElement.getAttribute('aria-valuemax')) || 100;
        updateProgress(value, max);
      }
    });
  });
  
  observer.observe(progressElement, { attributes: true });
}

// Auto-initialize all progress indicators
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-progress').forEach(initProgress);
});`;
  }

  return { html, css, js };
}

// Snackbar Component
export function generateSnackbar(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    message: 'This is a snackbar message',
    action: '', // Optional action button text
    duration: 4000, // Auto-dismiss duration in ms (0 = no auto-dismiss)
    position: 'bottom-center', // bottom-center, bottom-left, bottom-right, top-center
    variant: 'standard', // standard, error, success, warning
    multiline: false, // Allow message to wrap to multiple lines
    showCloseButton: false, // Show X close button
    visible: false // Initial visibility state
  });

  const { message, action, duration, position, variant, multiline, showCloseButton, visible } = normalizedProps;
  const snackbarId = generateId('snackbar');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-snackbar',
    `md-snackbar--${position}`,
    `md-snackbar--${variant}`,
    multiline ? 'md-snackbar--multiline' : null,
    visible ? 'md-snackbar--visible' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': snackbarId,
    'class': classes,
    'role': 'alert',
    'aria-live': 'polite',
    'aria-atomic': 'true'
  });

  // Action button
  const actionButton = action ? `
    <button class="md-snackbar__action" 
            onclick="handleSnackbarAction('${snackbarId}')">
      ${action}
    </button>` : '';

  // Close button
  const closeButton = showCloseButton ? `
    <button class="md-snackbar__close" 
            onclick="hideSnackbar('${snackbarId}')"
            aria-label="Close">
      ✕
    </button>` : '';

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      visible: ${visible},
      show() {
        this.visible = true;
        if (${duration} > 0) {
          setTimeout(() => this.hide(), ${duration});
        }
      },
      hide() {
        this.visible = false;
      },
      handleAction() {
        this.$dispatch('snackbar-action', { id: '${snackbarId}' });
        this.hide();
      }
    }" 
    x-show="visible" 
    x-transition:enter="transform transition ease-out duration-300" 
    x-transition:enter-start="translate-y-full opacity-0" 
    x-transition:enter-end="translate-y-0 opacity-100"
    x-transition:leave="transform transition ease-in duration-200"
    x-transition:leave-start="translate-y-0 opacity-100"
    x-transition:leave-end="translate-y-full opacity-0"`;
  }

  const html = `<div ${attributes} ${alpineData}>
  <div class="md-snackbar__content">
    <span class="md-snackbar__message">${message}</span>
    ${actionButton}
    ${closeButton}
  </div>
</div>`;

  const css = `/* Material Design 3 Snackbar */
.md-snackbar {
  display: flex;
  align-items: center;
  min-width: 288px;
  max-width: 568px;
  background: ${MD3_COLORS.surfaceVariant};
  color: ${MD3_COLORS.onSurfaceVariant};
  border-radius: ${MD3_SHAPE.corner.small};
  box-shadow: ${MD3_ELEVATION.level3};
  position: fixed;
  z-index: 1000;
  transform: translateY(100%);
  opacity: 0;
  transition: all ${MD3_MOTION.duration.medium2} ${MD3_MOTION.easing.standard};
  pointer-events: none;
}

.md-snackbar--visible {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

/* Positioning */
.md-snackbar--bottom-center {
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
}

.md-snackbar--bottom-center.md-snackbar--visible {
  transform: translateX(-50%) translateY(0);
}

.md-snackbar--bottom-left {
  bottom: 16px;
  left: 16px;
}

.md-snackbar--bottom-right {
  bottom: 16px;
  right: 16px;
}

.md-snackbar--top-center {
  top: 16px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
}

.md-snackbar--top-center.md-snackbar--visible {
  transform: translateX(-50%) translateY(0);
}

/* Variants */
.md-snackbar--error {
  background: ${MD3_COLORS.errorContainer};
  color: ${MD3_COLORS.onErrorContainer};
}

.md-snackbar--success {
  background: #4caf50;
  color: #ffffff;
}

.md-snackbar--warning {
  background: #ff9800;
  color: #ffffff;
}

/* Content */
.md-snackbar__content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  width: 100%;
}

.md-snackbar__message {
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
}

/* Action button */
.md-snackbar__action {
  background: transparent;
  border: none;
  color: ${MD3_COLORS.primary};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: ${MD3_SHAPE.corner.small};
  cursor: pointer;
  transition: background ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
}

.md-snackbar__action:hover {
  background: rgba(103, 80, 164, 0.08);
}

/* Close button */
.md-snackbar__close {
  background: transparent;
  border: none;
  color: currentColor;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
}

.md-snackbar__close:hover {
  background: rgba(255, 255, 255, 0.1);
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Snackbar
function showSnackbar(message, options = {}) {
  const snackbar = document.createElement('div');
  const id = 'snackbar-' + Date.now();
  snackbar.id = id;
  snackbar.className = \`md-snackbar md-snackbar--\${options.position || 'bottom-center'} md-snackbar--\${options.variant || 'standard'}\`;
  snackbar.setAttribute('role', 'alert');
  snackbar.setAttribute('aria-live', 'polite');
  
  const actionButton = options.action ? 
    \`<button class="md-snackbar__action" onclick="handleSnackbarAction('\${id}')">
\${options.action}</button>\` : '';
  
  const closeButton = options.showCloseButton ? 
    \`<button class="md-snackbar__close" onclick="hideSnackbar('\${id}')" aria-label="Close">✕</button>\` : '';
  
  snackbar.innerHTML = \`
    <div class="md-snackbar__content">
      <span class="md-snackbar__message">\${message}</span>
      \${actionButton}
      \${closeButton}
    </div>
  \`;
  
  document.body.appendChild(snackbar);
  
  // Show snackbar
  requestAnimationFrame(() => {
    snackbar.classList.add('md-snackbar--visible');
  });
  
  // Auto-hide if duration is set
  if (options.duration && options.duration > 0) {
    setTimeout(() => {
      hideSnackbar(id);
    }, options.duration);
  }
  
  return id;
}

function hideSnackbar(id) {
  const snackbar = document.getElementById(id);
  if (snackbar) {
    snackbar.classList.remove('md-snackbar--visible');
    setTimeout(() => {
      snackbar.remove();
    }, 300);
  }
}

function handleSnackbarAction(id) {
  const snackbar = document.getElementById(id);
  if (snackbar) {
    snackbar.dispatchEvent(new CustomEvent('snackbarAction', {
      detail: { id }
    }));
    hideSnackbar(id);
  }
}`;
  }

  return { html, css, js };
}

// Tooltip Component
export function generateTooltip(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    text: 'Tooltip text',
    position: 'top', // top, bottom, left, right
    delay: 500,
    maxWidth: '200px',
    arrow: true
  });

  const { text, position, delay, maxWidth, arrow } = normalizedProps;
  const tooltipId = generateId('tooltip');
  
  const classes = buildClasses([
    'md-tooltip-wrapper'
  ]);

  const tooltipClasses = buildClasses([
    'md-tooltip',
    `md-tooltip--${position}`,
    arrow && 'md-tooltip--arrow'
  ]);

  const html = `<div class="${classes}" ${framework === 'alpine' ? `x-data="{ show: false }"` : ''}>
  <div class="md-tooltip-trigger" 
       ${framework === 'alpine' ? '@mouseenter="show = true" @mouseleave="show = false"' : ''}>
    <!-- Target element goes here -->
    <slot></slot>
  </div>
  <div class="${tooltipClasses}" 
       id="${tooltipId}"
       role="tooltip"
       style="max-width: ${maxWidth}"
       ${framework === 'alpine' ? 'x-show="show" x-transition.opacity' : 'hidden'}>
    ${text}
    ${arrow ? '<div class="md-tooltip__arrow"></div>' : ''}
  </div>
</div>`;

  const css = `/* Material Design 3 Tooltip */
.md-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.md-tooltip {
  position: absolute;
  z-index: 1000;
  padding: 8px 12px;
  background: ${MD3_COLORS.onSurface};
  color: ${MD3_COLORS.surface};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  border-radius: ${MD3_SHAPE.corner.small};
  white-space: nowrap;
  opacity: 0;
  transform: scale(0.8);
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  pointer-events: none;
}

.md-tooltip[aria-hidden="false"] {
  opacity: 1;
  transform: scale(1);
}

/* Positions */
.md-tooltip--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  margin-bottom: 8px;
}

.md-tooltip--bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  margin-top: 8px;
}

.md-tooltip--left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  margin-right: 8px;
}

.md-tooltip--right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  margin-left: 8px;
}

/* Show state transforms */
.md-tooltip--top[aria-hidden="false"] {
  transform: translateX(-50%) scale(1);
}

.md-tooltip--bottom[aria-hidden="false"] {
  transform: translateX(-50%) scale(1);
}

.md-tooltip--left[aria-hidden="false"] {
  transform: translateY(-50%) scale(1);
}

.md-tooltip--right[aria-hidden="false"] {
  transform: translateY(-50%) scale(1);
}

/* Arrow */
.md-tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${MD3_COLORS.onSurface};
  transform: rotate(45deg);
}

.md-tooltip--top .md-tooltip__arrow {
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.md-tooltip--bottom .md-tooltip__arrow {
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.md-tooltip--left .md-tooltip__arrow {
  right: -4px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.md-tooltip--right .md-tooltip__arrow {
  left: -4px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}`;

  const js = framework === 'vanilla' ? `
function initTooltip(wrapper) {
  const trigger = wrapper.querySelector('.md-tooltip-trigger');
  const tooltip = wrapper.querySelector('.md-tooltip');
  let timeout;

  function show() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      tooltip.setAttribute('aria-hidden', 'false');
    }, ${delay});
  }

  function hide() {
    clearTimeout(timeout);
    tooltip.setAttribute('aria-hidden', 'true');
  }

  trigger.addEventListener('mouseenter', show);
  trigger.addEventListener('mouseleave', hide);
  trigger.addEventListener('focus', show);
  trigger.addEventListener('blur', hide);
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-tooltip-wrapper').forEach(initTooltip);
});` : '';

  return { html, css, js };
}