import { ComponentCode } from './types.js';
import { normalizeProps, buildClasses, buildAttributes, generateId, renderIcon, getDisabledState } from '../../utils/component-helpers.js';
import { MD3_COLORS, MD3_MOTION, MD3_ELEVATION, MD3_SHAPE } from '../../utils/material-tokens.js';

// Badge Component
export function generateBadge(props: any, framework: string): ComponentCode {
  // Normalize props with defaults
  const normalizedProps = normalizeProps(props, {
    content: '1', // Badge content (number, text, or icon)
    variant: 'standard', // standard, dot, large
    color: 'error', // error, primary, secondary, surface
    position: 'top-right', // top-right, top-left, bottom-right, bottom-left
    targetSelector: '', // CSS selector for the element to badge
    max: 99, // Maximum number to display before showing +
    showZero: false, // Whether to show badge when content is 0
    invisible: false // Whether badge should be hidden
  });

  const { content, variant, color, position, targetSelector, max, showZero, invisible } = normalizedProps;
  const badgeId = generateId('badge');
  
  // Handle numeric content with max limit
  let displayContent = content;
  if (typeof content === 'number' || !isNaN(Number(content))) {
    const num = Number(content);
    if (num === 0 && !showZero) {
      displayContent = '';
    } else if (num > max) {
      displayContent = `${max}+`;
    } else {
      displayContent = num.toString();
    }
  }

  // Build classes using helper
  const classes = buildClasses([
    'md-badge',
    `md-badge--${variant}`,
    `md-badge--${color}`,
    `md-badge--${position}`,
    invisible && 'md-badge--invisible',
    !displayContent && 'md-badge--empty'
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    class: classes,
    id: badgeId,
    'aria-label': `Badge with content: ${displayContent || 'empty'}`,
    ...(framework === 'alpine' && { 
      'x-show': '!invisible',
      'x-text': 'content'
    })
  });

  // Alpine.js data if needed
  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ content: '${displayContent}', invisible: ${invisible} }"`;
  }

  // Generate badge HTML
  const badgeHtml = variant === 'dot' ? '' : displayContent;
  
  const html = targetSelector ? 
    // Badge with target element
    `<div class="md-badge-wrapper" ${alpineData}>
  <div class="md-badge-target">
    <!-- Target element will be positioned here -->
  </div>
  <span ${attributes}>${badgeHtml}</span>
</div>` :
    // Standalone badge
    `<span ${attributes} ${alpineData}>${badgeHtml}</span>`;

  const css = `/* Material Design 3 Badge */
.md-badge {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: ${MD3_COLORS.error};
  color: ${MD3_COLORS.onError};
  font-family: 'Roboto', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  z-index: 1;
  transform: scale(1);
  transition: transform ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-badge-wrapper {
  position: relative;
  display: inline-block;
}

.md-badge-target {
  position: relative;
}

/* Variants */
.md-badge--dot {
  min-width: 8px;
  min-height: 8px;
  padding: 0;
  border-radius: 50%;
}

.md-badge--large {
  min-width: 24px;
  min-height: 24px;
  border-radius: 12px;
  font-size: 14px;
  padding: 0 8px;
}

/* Colors */
.md-badge--error {
  background: ${MD3_COLORS.error};
  color: ${MD3_COLORS.onError};
}

.md-badge--primary {
  background: ${MD3_COLORS.primary};
  color: ${MD3_COLORS.onPrimary};
}

.md-badge--secondary {
  background: ${MD3_COLORS.secondary};
  color: ${MD3_COLORS.onSecondary};
}

.md-badge--surface {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  border: 1px solid ${MD3_COLORS.outline};
}

/* Positions */
.md-badge--top-right {
  top: -10px;
  right: -10px;
}

.md-badge--top-left {
  top: -10px;
  left: -10px;
}

.md-badge--bottom-right {
  bottom: -10px;
  right: -10px;
}

.md-badge--bottom-left {
  bottom: -10px;
  left: -10px;
}

.md-badge--dot.md-badge--top-right {
  top: -4px;
  right: -4px;
}

.md-badge--dot.md-badge--top-left {
  top: -4px;
  left: -4px;
}

.md-badge--dot.md-badge--bottom-right {
  bottom: -4px;
  right: -4px;
}

.md-badge--dot.md-badge--bottom-left {
  bottom: -4px;
  left: -4px;
}

/* States */
.md-badge--invisible {
  transform: scale(0);
  opacity: 0;
}

.md-badge--empty {
  display: none;
}

/* Animation */
.md-badge[data-animate="true"] {
  animation: badgeAppear ${MD3_MOTION.duration.medium2} ${MD3_MOTION.easing.standard};
}

@keyframes badgeAppear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Dark theme */
[data-theme="dark"] .md-badge--error {
  background: ${MD3_COLORS.error};
  color: ${MD3_COLORS.onError};
}

[data-theme="dark"] .md-badge--primary {
  background: ${MD3_COLORS.primary};
  color: ${MD3_COLORS.onPrimary};
}

[data-theme="dark"] .md-badge--secondary {
  background: ${MD3_COLORS.secondary};
  color: ${MD3_COLORS.onSecondary};
}

[data-theme="dark"] .md-badge--surface {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  border-color: ${MD3_COLORS.outline};
}

/* Badge with specific target elements */
.md-badge-wrapper .btn,
.md-badge-wrapper .md-fab,
.md-badge-wrapper .material-icons {
  position: relative;
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Material Design 3 Badge - Vanilla JavaScript
function initBadge(badgeElement) {
  const badgeWrapper = badgeElement.closest('.md-badge-wrapper');
  
  // Update badge content
  function updateContent(newContent) {
    const max = parseInt(badgeElement.dataset.max) || 99;
    const showZero = badgeElement.dataset.showZero === 'true';
    
    let displayContent = newContent;
    if (typeof newContent === 'number' || !isNaN(Number(newContent))) {
      const num = Number(newContent);
      if (num === 0 && !showZero) {
        displayContent = '';
        badgeElement.classList.add('md-badge--empty');
      } else {
        badgeElement.classList.remove('md-badge--empty');
        if (num > max) {
          displayContent = max + '+';
        } else {
          displayContent = num.toString();
        }
      }
    }
    
    if (badgeElement.classList.contains('md-badge--dot')) {
      badgeElement.textContent = '';
    } else {
      badgeElement.textContent = displayContent;
    }
    
    // Animate appearance
    badgeElement.setAttribute('data-animate', 'true');
    setTimeout(() => {
      badgeElement.removeAttribute('data-animate');
    }, 300);
    
    // Dispatch event
    badgeElement.dispatchEvent(new CustomEvent('badgeUpdate', {
      detail: { content: displayContent, originalContent: newContent }
    }));
  }
  
  // Hide/show badge
  function setVisibility(visible) {
    if (visible) {
      badgeElement.classList.remove('md-badge--invisible');
    } else {
      badgeElement.classList.add('md-badge--invisible');
    }
    
    badgeElement.dispatchEvent(new CustomEvent('badgeVisibilityChange', {
      detail: { visible: visible }
    }));
  }
  
  // API methods
  badgeElement.updateContent = updateContent;
  badgeElement.setVisibility = setVisibility;
  badgeElement.show = () => setVisibility(true);
  badgeElement.hide = () => setVisibility(false);
}

// Auto-initialize all badges
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-badge').forEach(initBadge);
});`;
  }

  return { html, css, js };
}

// Chip Component
export function generateChip(props: any, framework: string): ComponentCode {
  // Normalize props with defaults
  const normalizedProps = normalizeProps(props, {
    label: 'Chip',
    variant: 'assist', // assist, filter, input, suggestion
    selected: false,
    disabled: false,
    icon: '', // leading icon
    avatar: '', // avatar image URL or initials
    deleteIcon: '', // trailing delete icon (for input chips)
    elevated: false, // elevated appearance
    size: 'medium', // small, medium, large
    clickable: true, // whether chip is interactive
    deletable: false // whether chip can be deleted
  });

  const { label, variant, selected, disabled, icon, avatar, deleteIcon, elevated, size, clickable, deletable } = normalizedProps;
  const disabledState = getDisabledState(disabled);
  const chipId = generateId('chip');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-chip',
    `md-chip--${variant}`,
    `md-chip--${size}`,
    selected && 'md-chip--selected',
    elevated && 'md-chip--elevated',
    clickable && 'md-chip--clickable',
    deletable && 'md-chip--deletable',
    disabledState.classes
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    class: classes,
    id: chipId,
    role: clickable ? 'button' : 'generic',
    'aria-label': `${label} chip`,
    'aria-selected': variant === 'filter' ? selected.toString() : null,
    ...disabledState.attributes,
    ...(framework === 'alpine' && clickable && { '@click': 'handleClick()' }),
    ...(framework === 'alpine' && { 'x-bind:class': '{ "md-chip--selected": selected }' })
  });

  // Alpine.js data if needed
  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      selected: ${selected}, 
      handleClick() { 
        ${variant === 'filter' ? 'this.selected = !this.selected;' : ''}
        $dispatch('chip-click', { label: '${label}', selected: this.selected });
      },
      handleDelete() {
        $dispatch('chip-delete', { label: '${label}' });
      }
    }"`;
  }

  // Generate leading element (icon or avatar)
  let leadingElement = '';
  if (avatar) {
    if (avatar.length <= 2) {
      // Text avatar (initials)
      leadingElement = `<span class="md-chip__avatar md-chip__avatar--text">${avatar}</span>`;
    } else {
      // Image avatar
      leadingElement = `<img class="md-chip__avatar md-chip__avatar--image" src="${avatar}" alt="Avatar">`;
    }
  } else if (icon) {
    leadingElement = renderIcon(icon, 'md-chip__icon md-chip__icon--leading material-icons');
  }

  // Generate trailing element (delete icon)
  let trailingElement = '';
  if (deletable) {
    const deleteIconName = deleteIcon || 'close';
    const deleteAttributes = framework === 'alpine' ? '@click.stop="handleDelete()"' : '';
    trailingElement = `<button class="md-chip__delete" aria-label="Delete ${label}" ${deleteAttributes}>
      ${renderIcon(deleteIconName, 'md-chip__icon md-chip__icon--trailing material-icons')}
    </button>`;
  }

  const html = `<div ${attributes} ${alpineData}>
  ${leadingElement}
  <span class="md-chip__label">${label}</span>
  ${trailingElement}
</div>`;

  const css = `/* Material Design 3 Chip */
.md-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 16px;
  border: 1px solid ${MD3_COLORS.outline};
  border-radius: ${MD3_SHAPE.corner.small};
  background: transparent;
  color: ${MD3_COLORS.onSurfaceVariant};
  font-family: 'Roboto', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  user-select: none;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  position: relative;
  overflow: hidden;
}

/* Clickable chips */
.md-chip--clickable {
  cursor: pointer;
}

.md-chip--clickable:hover:not(.md-disabled) {
  background: rgba(103, 80, 164, 0.08);
  border-color: ${MD3_COLORS.onSurfaceVariant};
}

.md-chip--clickable:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

.md-chip--clickable:active:not(.md-disabled) {
  background: rgba(103, 80, 164, 0.12);
}

/* Variants */
.md-chip--assist {
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurfaceVariant};
}

.md-chip--filter {
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurfaceVariant};
}

.md-chip--filter.md-chip--selected {
  background: ${MD3_COLORS.secondaryContainer};
  border-color: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}

.md-chip--input {
  background: ${MD3_COLORS.surfaceVariant};
  border-color: transparent;
  color: ${MD3_COLORS.onSurfaceVariant};
}

.md-chip--suggestion {
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurfaceVariant};
}

/* Elevated variant */
.md-chip--elevated {
  background: ${MD3_COLORS.surface};
  border-color: transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.md-chip--elevated:hover:not(.md-disabled) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
}

/* Sizes */
.md-chip--small {
  height: 24px;
  padding: 0 12px;
  font-size: 12px;
  gap: 6px;
}

.md-chip--large {
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
  gap: 10px;
}

/* Chip elements */
.md-chip__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.md-chip__icon {
  font-size: 18px;
  flex-shrink: 0;
}

.md-chip--small .md-chip__icon {
  font-size: 16px;
}

.md-chip--large .md-chip__icon {
  font-size: 20px;
}

/* Avatar styles */
.md-chip__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: -8px;
}

.md-chip--small .md-chip__avatar {
  width: 20px;
  height: 20px;
  margin-left: -6px;
}

.md-chip--large .md-chip__avatar {
  width: 32px;
  height: 32px;
  margin-left: -10px;
}

.md-chip__avatar--text {
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
  font-size: 12px;
  font-weight: 500;
}

.md-chip__avatar--image {
  object-fit: cover;
}

/* Delete button */
.md-chip__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: -6px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: ${MD3_COLORS.onSurfaceVariant};
  cursor: pointer;
  transition: background-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-chip__delete:hover {
  background: rgba(0, 0, 0, 0.08);
}

.md-chip--small .md-chip__delete {
  width: 16px;
  height: 16px;
  margin-right: -4px;
}

.md-chip--large .md-chip__delete {
  width: 20px;
  height: 20px;
  margin-right: -8px;
}

/* Selected state for filter chips */
.md-chip--filter.md-chip--selected .md-chip__icon--leading::before {
  content: 'check';
  font-family: 'Material Icons';
}

/* Dark theme */
[data-theme="dark"] .md-chip {
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-chip--filter.md-chip--selected {
  background: ${MD3_COLORS.secondaryContainer};
  border-color: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}

[data-theme="dark"] .md-chip--input {
  background: ${MD3_COLORS.surfaceVariant};
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-chip--elevated {
  background: ${MD3_COLORS.surface};
}

[data-theme="dark"] .md-chip__avatar--text {
  background: ${MD3_COLORS.primaryContainer};
  color: ${MD3_COLORS.onPrimaryContainer};
}

[data-theme="dark"] .md-chip__delete {
  color: ${MD3_COLORS.onSurfaceVariant};
}

/* Ripple effect for clickable chips */
.md-chip--clickable::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  pointer-events: none;
  transition: background ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-chip--clickable:active::before {
  background: rgba(103, 80, 164, 0.12);
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Material Design 3 Chip - Vanilla JavaScript
function initChip(chipElement) {
  const isClickable = chipElement.classList.contains('md-chip--clickable');
  const isFilter = chipElement.classList.contains('md-chip--filter');
  const isDeletable = chipElement.classList.contains('md-chip--deletable');
  
  // Handle chip click
  if (isClickable) {
    chipElement.addEventListener('click', function(e) {
      // Don't trigger if clicking delete button
      if (e.target.closest('.md-chip__delete')) return;
      
      const label = this.querySelector('.md-chip__label')?.textContent || '';
      let selected = false;
      
      // Toggle selection for filter chips
      if (isFilter) {
        this.classList.toggle('md-chip--selected');
        selected = this.classList.contains('md-chip--selected');
      }
      
      // Add ripple effect
      addRippleEffect(this, e);
      
      // Dispatch event
      this.dispatchEvent(new CustomEvent('chipClick', {
        detail: { label, selected, chipElement: this }
      }));
    });
  }
  
  // Handle delete button
  if (isDeletable) {
    const deleteButton = chipElement.querySelector('.md-chip__delete');
    if (deleteButton) {
      deleteButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const label = chipElement.querySelector('.md-chip__label')?.textContent || '';
        
        // Animate out
        chipElement.style.transform = 'scale(0)';
        chipElement.style.opacity = '0';
        
        setTimeout(() => {
          chipElement.dispatchEvent(new CustomEvent('chipDelete', {
            detail: { label, chipElement }
          }));
          
          // Remove element if not prevented
          if (chipElement.parentNode) {
            chipElement.remove();
          }
        }, 200);
      });
    }
  }
  
  // Add ripple effect
  function addRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = \`
      position: absolute;
      border-radius: 50%;
      background: rgba(103, 80, 164, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: \${size}px;
      height: \${size}px;
      left: \${x}px;
      top: \${y}px;
      pointer-events: none;
      z-index: 1;
    \`;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// CSS for ripple animation
const chipStyle = document.createElement('style');
chipStyle.textContent = \`
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
\`;
document.head.appendChild(chipStyle);

// Auto-initialize all chips
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-chip').forEach(initChip);
});`;
  }

  return { html, css, js };
}

// List Component
export function generateList(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    items: [
      { label: 'Item 1', value: 'item1' },
      { label: 'Item 2', value: 'item2' },
      { label: 'Item 3', value: 'item3' }
    ],
    variant: 'single-line', // single-line, two-line, three-line
    dividers: true,
    clickable: true,
    density: 'default' // default, dense, comfortable
  });

  const { items, variant, dividers, clickable, density } = normalizedProps;
  const listId = generateId('list');
  
  const classes = buildClasses([
    'md-list',
    `md-list--${variant}`,
    `md-list--${density}`,
    dividers && 'md-list--dividers'
  ]);

  const itemsHtml = items.map((item: any, index: number) => {
    const itemClasses = buildClasses([
      'md-list__item',
      clickable && 'md-list__item--clickable',
      item.selected && 'md-list__item--selected'
    ]);

    const leadingElement = item.icon ? renderIcon(item.icon, 'md-list__icon material-icons') : '';
    const trailingElement = item.trailingIcon ? renderIcon(item.trailingIcon, 'md-list__trailing-icon material-icons') : '';
    
    return `<li class="${itemClasses}" 
               ${clickable ? 'role="button" tabindex="0"' : ''}
               ${framework === 'alpine' ? `@click="selectItem(${index})"` : ''}>
      ${leadingElement}
      <div class="md-list__content">
        <div class="md-list__primary">${item.label}</div>
        ${item.secondary ? `<div class="md-list__secondary">${item.secondary}</div>` : ''}
        ${item.tertiary ? `<div class="md-list__tertiary">${item.tertiary}</div>` : ''}
      </div>
      ${trailingElement}
    </li>`;
  }).join('');

  const html = `<ul class="${classes}" id="${listId}" role="list" 
                   ${framework === 'alpine' ? `x-data="{ selectedIndex: -1, selectItem(index) { this.selectedIndex = index; $dispatch('list-select', { index, item: ${JSON.stringify(items)}[index] }); } }"` : ''}>
  ${itemsHtml}
</ul>`;

  const css = `/* Material Design 3 List */
.md-list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
}

.md-list__item {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 56px;
  padding: 8px 16px;
  position: relative;
  transition: background-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-list--single-line .md-list__item {
  min-height: 56px;
}

.md-list--two-line .md-list__item {
  min-height: 72px;
}

.md-list--three-line .md-list__item {
  min-height: 88px;
}

.md-list--dense .md-list__item {
  min-height: 40px;
  padding: 4px 16px;
}

.md-list--comfortable .md-list__item {
  min-height: 64px;
  padding: 12px 16px;
}

.md-list__item--clickable {
  cursor: pointer;
}

.md-list__item--clickable:hover {
  background: rgba(103, 80, 164, 0.08);
}

.md-list__item--selected {
  background: ${MD3_COLORS.secondaryContainer};
  color: ${MD3_COLORS.onSecondaryContainer};
}

.md-list__icon {
  font-size: 24px;
  color: ${MD3_COLORS.onSurfaceVariant};
  flex-shrink: 0;
}

.md-list__content {
  flex: 1;
  min-width: 0;
}

.md-list__primary {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.md-list__secondary {
  font-size: 14px;
  color: ${MD3_COLORS.onSurfaceVariant};
  line-height: 20px;
}

.md-list__tertiary {
  font-size: 12px;
  color: ${MD3_COLORS.onSurfaceVariant};
  line-height: 16px;
}

.md-list__trailing-icon {
  font-size: 24px;
  color: ${MD3_COLORS.onSurfaceVariant};
  flex-shrink: 0;
}

/* Dividers */
.md-list--dividers .md-list__item:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 1px;
  background: ${MD3_COLORS.outline};
}`;

  const js = framework === 'vanilla' ? `
function initList(listElement) {
  const items = listElement.querySelectorAll('.md-list__item--clickable');
  
  items.forEach((item, index) => {
    item.addEventListener('click', function() {
      // Remove previous selection
      items.forEach(i => i.classList.remove('md-list__item--selected'));
      
      // Add current selection
      this.classList.add('md-list__item--selected');
      
      // Dispatch event
      listElement.dispatchEvent(new CustomEvent('listSelect', {
        detail: { index, item: this }
      }));
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-list').forEach(initList);
});` : '';

  return { html, css, js };
}

// Table Component
export function generateTable(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' }
    ],
    columns: [
      { key: 'id', title: 'ID', sortable: true, width: '80px' },
      { key: 'name', title: 'Name', sortable: true },
      { key: 'email', title: 'Email', sortable: true },
      { key: 'role', title: 'Role', sortable: false },
      { key: 'status', title: 'Status', sortable: true }
    ],
    selectable: false, // Allow row selection
    sortable: true, // Enable column sorting
    striped: true, // Alternating row colors
    variant: 'standard', // standard, outlined
    density: 'standard', // compact, standard, comfortable
    showHeader: true,
    showFooter: false,
    pagination: false // Enable pagination
  });

  const { data, columns, selectable, sortable, striped, variant, density, showHeader, showFooter, pagination } = normalizedProps;
  const tableId = generateId('table');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-table',
    `md-table--${variant}`,
    `md-table--${density}`,
    striped ? 'md-table--striped' : null,
    selectable ? 'md-table--selectable' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': tableId,
    'class': classes,
    'role': 'table'
  });

  // Generate table header
  const headerRow = showHeader ? `
    <thead class="md-table__head">
      <tr class="md-table__row">
        ${selectable ? '<th class="md-table__cell md-table__cell--checkbox"><input type="checkbox" class="md-table__checkbox" /></th>' : ''}
        ${columns.map((col: any) => `
          <th class="md-table__cell md-table__cell--header${col.sortable && sortable ? ' md-table__cell--sortable' : ''}" 
              ${col.width ? `style="width: ${col.width}"` : ''}
              ${col.sortable && sortable ? `data-sort-key="${col.key}"` : ''}>
            <div class="md-table__cell-content">
              ${col.title}
              ${col.sortable && sortable ? '<span class="md-table__sort-icon">↕️</span>' : ''}
            </div>
          </th>
        `).join('')}
      </tr>
    </thead>` : '';

  // Generate table body
  const bodyRows = `
    <tbody class="md-table__body">
      ${data.map((row: any, rowIndex: number) => `
        <tr class="md-table__row md-table__row--data" data-row-index="${rowIndex}">
          ${selectable ? `<td class="md-table__cell md-table__cell--checkbox"><input type="checkbox" class="md-table__checkbox" data-row-id="${row.id || rowIndex}" /></td>` : ''}
          ${columns.map((col: any) => `
            <td class="md-table__cell" data-column="${col.key}">
              <div class="md-table__cell-content">
                ${row[col.key] || ''}
              </div>
            </td>
          `).join('')}
        </tr>
      `).join('')}
    </tbody>`;

  // Generate table footer (if needed)
  const footer = showFooter ? `
    <tfoot class="md-table__foot">
      <tr class="md-table__row">
        ${selectable ? '<td class="md-table__cell"></td>' : ''}
        ${columns.map(() => '<td class="md-table__cell"></td>').join('')}
      </tr>
    </tfoot>` : '';

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      selectedRows: [],
      sortColumn: null,
      sortDirection: 'asc',
      selectAll: false,
      sortTable(column) {
        if (this.sortColumn === column) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortColumn = column;
          this.sortDirection = 'asc';
        }
        this.$dispatch('table-sort', { column, direction: this.sortDirection });
      },
      toggleSelectAll() {
        const checkboxes = this.$el.querySelectorAll('.md-table__checkbox[data-row-id]');
        checkboxes.forEach(cb => cb.checked = this.selectAll);
        this.selectedRows = this.selectAll ? Array.from(checkboxes).map(cb => cb.dataset.rowId) : [];
      },
      toggleRowSelect(rowId) {
        const index = this.selectedRows.indexOf(rowId);
        if (index > -1) {
          this.selectedRows.splice(index, 1);
        } else {
          this.selectedRows.push(rowId);
        }
        this.selectAll = this.selectedRows.length === ${data.length};
      }
    }"`;
  }

  const html = `<div class="md-table-container">
  <table ${attributes} ${alpineData}>
    ${headerRow}
    ${bodyRows}
    ${footer}
  </table>
</div>`;

  const css = `/* Material Design 3 Table */
.md-table-container {
  background: ${MD3_COLORS.surface};
  border-radius: ${MD3_SHAPE.corner.medium};
  overflow: hidden;
  border: 1px solid ${MD3_COLORS.outline};
}

.md-table {
  width: 100%;
  border-collapse: collapse;
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  font-size: 14px;
  line-height: 20px;
}

.md-table--outlined {
  border: 1px solid ${MD3_COLORS.outline};
}

/* Table sections */
.md-table__head {
  background: ${MD3_COLORS.surfaceVariant};
}

.md-table__body {
  background: ${MD3_COLORS.surface};
}

.md-table__foot {
  background: ${MD3_COLORS.surfaceVariant};
  border-top: 1px solid ${MD3_COLORS.outline};
}

/* Rows */
.md-table__row {
  border-bottom: 1px solid ${MD3_COLORS.outline};
  transition: background-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-table__row--data:hover {
  background-color: rgba(103, 80, 164, 0.04);
}

.md-table__row--data:active {
  background-color: rgba(103, 80, 164, 0.08);
}

.md-table--striped .md-table__row--data:nth-child(even) {
  background-color: rgba(103, 80, 164, 0.02);
}

/* Cells */
.md-table__cell {
  padding: 12px 16px;
  vertical-align: middle;
  text-align: left;
  border: none;
}

.md-table__cell--header {
  font-weight: 500;
  color: ${MD3_COLORS.onSurfaceVariant};
  background: ${MD3_COLORS.surfaceVariant};
  position: sticky;
  top: 0;
  z-index: 1;
}

.md-table__cell--checkbox {
  width: 48px;
  padding: 12px;
  text-align: center;
}

.md-table__cell--sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.md-table__cell--sortable:hover {
  background-color: rgba(103, 80, 164, 0.08);
}

/* Cell content */
.md-table__cell-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Sort icons */
.md-table__sort-icon {
  opacity: 0.5;
  font-size: 12px;
  transition: opacity ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-table__cell--sortable:hover .md-table__sort-icon {
  opacity: 1;
}

/* Checkboxes */
.md-table__checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid ${MD3_COLORS.outline};
  border-radius: 2px;
  background: transparent;
  cursor: pointer;
  position: relative;
  appearance: none;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-table__checkbox:checked {
  background: ${MD3_COLORS.primary};
  border-color: ${MD3_COLORS.primary};
}

.md-table__checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${MD3_COLORS.onPrimary};
  font-size: 12px;
  font-weight: bold;
}

.md-table__checkbox:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

/* Density variants */
.md-table--compact .md-table__cell {
  padding: 8px 12px;
}

.md-table--comfortable .md-table__cell {
  padding: 16px 20px;
}

/* Dark theme support */
[data-theme="dark"] .md-table-container {
  background: ${MD3_COLORS.surface};
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-table {
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-table__head,
[data-theme="dark"] .md-table__foot {
  background: ${MD3_COLORS.surfaceVariant};
}

[data-theme="dark"] .md-table__cell--header {
  background: ${MD3_COLORS.surfaceVariant};
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-table__row {
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-table__checkbox {
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-table__checkbox:checked {
  background: ${MD3_COLORS.primary};
  border-color: ${MD3_COLORS.primary};
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .md-table-container {
    overflow-x: auto;
  }
  
  .md-table {
    min-width: 600px;
  }
  
  .md-table__cell {
    padding: 8px 12px;
  }
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = `// Vanilla JavaScript for Table
document.addEventListener('DOMContentLoaded', function() {
  const table = document.getElementById('${tableId}');
  let selectedRows = [];
  let sortColumn = null;
  let sortDirection = 'asc';
  
  // Handle column sorting
  const sortableHeaders = table.querySelectorAll('.md-table__cell--sortable');
  sortableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const column = this.getAttribute('data-sort-key');
      
      if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn = column;
        sortDirection = 'asc';
      }
      
      // Update sort icons
      sortableHeaders.forEach(h => {
        const icon = h.querySelector('.md-table__sort-icon');
        if (icon) {
          if (h === this) {
            icon.textContent = sortDirection === 'asc' ? '↑' : '↓';
          } else {
            icon.textContent = '↕️';
          }
        }
      });
      
      // Dispatch sort event
      table.dispatchEvent(new CustomEvent('tableSort', {
        detail: { column, direction: sortDirection }
      }));
    });
  });
  
  // Handle row selection
  const selectAllCheckbox = table.querySelector('.md-table__head .md-table__checkbox');
  const rowCheckboxes = table.querySelectorAll('.md-table__body .md-table__checkbox');
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const isChecked = this.checked;
      rowCheckboxes.forEach(cb => {
        cb.checked = isChecked;
        const rowId = cb.getAttribute('data-row-id');
        if (isChecked && !selectedRows.includes(rowId)) {
          selectedRows.push(rowId);
        } else if (!isChecked) {
          const index = selectedRows.indexOf(rowId);
          if (index > -1) selectedRows.splice(index, 1);
        }
      });
      
      // Dispatch selection event
      table.dispatchEvent(new CustomEvent('tableSelectionChange', {
        detail: { selectedRows: [...selectedRows], selectAll: isChecked }
      }));
    });
  }
  
  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const rowId = this.getAttribute('data-row-id');
      const index = selectedRows.indexOf(rowId);
      
      if (this.checked && index === -1) {
        selectedRows.push(rowId);
      } else if (!this.checked && index > -1) {
        selectedRows.splice(index, 1);
      }
      
      // Update select all checkbox
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = selectedRows.length === rowCheckboxes.length;
        selectAllCheckbox.indeterminate = selectedRows.length > 0 && selectedRows.length < rowCheckboxes.length;
      }
      
      // Dispatch selection event
      table.dispatchEvent(new CustomEvent('tableSelectionChange', {
        detail: { selectedRows: [...selectedRows], rowId }
      }));
    });
  });
  
  // Handle row clicks
  const dataRows = table.querySelectorAll('.md-table__row--data');
  dataRows.forEach(row => {
    row.addEventListener('click', function(e) {
      // Don't trigger if clicking checkbox
      if (e.target.closest('.md-table__checkbox')) return;
      
      const rowIndex = this.getAttribute('data-row-index');
      
      // Dispatch row click event
      table.dispatchEvent(new CustomEvent('tableRowClick', {
        detail: { rowIndex, row: this }
      }));
    });
  });
});`;
  }

  return { html, css, js };
}