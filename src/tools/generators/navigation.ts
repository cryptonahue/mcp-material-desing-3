import { ComponentCode } from './types.js';
import { normalizeProps, buildClasses, buildAttributes, generateId, renderIcon } from '../../utils/component-helpers.js';
import { MD3_COLORS, MD3_MOTION, MD3_ELEVATION, MD3_SHAPE } from '../../utils/material-tokens.js';

// Tabs Component
export function generateTabs(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    tabs: [
      { label: 'Tab 1', content: 'Content for tab 1', active: true, disabled: false, icon: '' },
      { label: 'Tab 2', content: 'Content for tab 2', active: false, disabled: false, icon: '' },
      { label: 'Tab 3', content: 'Content for tab 3', active: false, disabled: false, icon: '' }
    ],
    variant: 'primary', // primary, secondary
    size: 'medium', // small, medium, large
    fullWidth: false, // Make tabs fill container width
    disabledTabs: [], // Array of tab indices to disable
    id: ''
  });

  const { tabs, variant, size, fullWidth, disabledTabs, id } = normalizedProps;
  const tabsId = id || generateId('tabs');
  const activeTabIndex = tabs.findIndex((tab: any) => tab.active);
  
  // Build classes using helper
  const classes = buildClasses([
    'md-tabs',
    `md-tabs--${variant}`,
    `md-tabs--${size}`,
    fullWidth ? 'md-tabs--full-width' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': tabsId,
    'class': classes,
    'role': 'tablist',
    'aria-orientation': 'horizontal'
  });

  // Generate tab headers
  const tabHeaders = tabs.map((tab: any, index: number) => {
    const isDisabled = (disabledTabs as number[]).includes(index) || tab.disabled;
    const isActive = tab.active;
    const tabId = `${tabsId}-tab-${index}`;
    const panelId = `${tabsId}-panel-${index}`;
    
    const tabClasses = buildClasses([
      'md-tab',
      isActive ? 'md-tab--active' : null,
      isDisabled ? 'md-tab--disabled' : null
    ]);
    
    const iconElement = tab.icon ? renderIcon(tab.icon) : '';
    
    let alpineAttributes = '';
    if (framework === 'alpine' && !isDisabled) {
      alpineAttributes = `@click="activeTab = ${index}"`;
    }
    
    return `
    <button class="${tabClasses}" 
            id="${tabId}"
            role="tab"
            aria-selected="${isActive}"
            aria-controls="${panelId}"
            tabindex="${isActive ? '0' : '-1'}"
            ${isDisabled ? 'disabled' : ''}
            ${alpineAttributes}>
      ${iconElement}
      <span class="md-tab__label">${tab.label}</span>
      <div class="md-tab__indicator"></div>
    </button>`;
  }).join('');

  // Generate tab panels
  const tabPanels = tabs.map((tab: any, index: number) => {
    const isActive = tab.active;
    const tabId = `${tabsId}-tab-${index}`;
    const panelId = `${tabsId}-panel-${index}`;
    
    const panelClasses = buildClasses([
      'md-tab-panel',
      isActive ? 'md-tab-panel--active' : null
    ]);
    
    let alpineShow = '';
    if (framework === 'alpine') {
      alpineShow = `x-show="activeTab === ${index}"`;
    }
    
    return `
    <div class="${panelClasses}" 
         id="${panelId}"
         role="tabpanel"
         aria-labelledby="${tabId}"
         ${alpineShow}>
      ${tab.content}
    </div>`;
  }).join('');

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ activeTab: ${activeTabIndex} }"`;
  }

  const html = `<div ${attributes} ${alpineData}>
  <div class="md-tabs__header">
    ${tabHeaders}
  </div>
  <div class="md-tabs__content">
    ${tabPanels}
  </div>
</div>`;

  const css = `/* Material Design 3 Tabs */
.md-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.md-tabs__header {
  display: flex;
  border-bottom: 1px solid ${MD3_COLORS.outline};
  background: ${MD3_COLORS.surface};
}

.md-tabs--full-width .md-tabs__header {
  width: 100%;
}

.md-tabs--full-width .md-tab {
  flex: 1;
}

/* Tab buttons */
.md-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  background: transparent;
  color: ${MD3_COLORS.onSurfaceVariant};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.1px;
  cursor: pointer;
  position: relative;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
  min-height: 48px;
}

.md-tab:hover:not(.md-tab--disabled) {
  background: ${MD3_COLORS.surfaceVariant};
  color: ${MD3_COLORS.onSurface};
}

.md-tab:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: -2px;
}

.md-tab--active {
  color: ${MD3_COLORS.primary};
}

.md-tab--disabled {
  color: ${MD3_COLORS.onSurface};
  opacity: 0.38;
  cursor: not-allowed;
}

.md-tab__label {
  white-space: nowrap;
}

/* Tab indicator */
.md-tab__indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${MD3_COLORS.primary};
  transform: scaleX(0);
  transition: transform ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-tab--active .md-tab__indicator {
  transform: scaleX(1);
}

/* Size variants */
.md-tabs--small .md-tab {
  padding: 10px 16px;
  font-size: 12px;
  min-height: 40px;
}

.md-tabs--large .md-tab {
  padding: 18px 32px;
  font-size: 16px;
  min-height: 56px;
}

/* Tab content */
.md-tabs__content {
  position: relative;
  flex: 1;
}

.md-tab-panel {
  padding: 24px;
  display: none;
}

.md-tab-panel--active {
  display: block;
}

/* Secondary variant */
.md-tabs--secondary {
  background: ${MD3_COLORS.surfaceVariant};
}

.md-tabs--secondary .md-tabs__header {
  background: transparent;
  border-bottom: none;
}

.md-tabs--secondary .md-tab {
  background: ${MD3_COLORS.surface};
  border-radius: ${MD3_SHAPE.corner.small} ${MD3_SHAPE.corner.small} 0 0;
  margin-right: 2px;
}

.md-tabs--secondary .md-tab--active {
  background: ${MD3_COLORS.surface};
  box-shadow: ${MD3_ELEVATION.level1};
}

.md-tabs--secondary .md-tab__indicator {
  display: none;
}

/* Dark theme support */
[data-theme="dark"] .md-tabs__header {
  border-color: ${MD3_COLORS.outline};
  background: ${MD3_COLORS.surface};
}

[data-theme="dark"] .md-tab {
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-tab:hover:not(.md-tab--disabled) {
  background: ${MD3_COLORS.surfaceVariant};
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-tab--active {
  color: ${MD3_COLORS.primary};
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = generateTabsVanillaJS(tabsId, tabs.length);
  }

  return { html, css, js };
}

// Menu Component
export function generateMenu(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    items: [
      { label: 'Menu Item 1', value: 'item1', icon: '', disabled: false, divider: false },
      { label: 'Menu Item 2', value: 'item2', icon: '', disabled: false, divider: false },
      { label: 'Menu Item 3', value: 'item3', icon: '', disabled: true, divider: true }
    ],
    trigger: 'Click me', // Text for trigger button
    position: 'bottom-start', // bottom-start, bottom-end, top-start, top-end
    variant: 'standard', // standard, dense
    maxHeight: '300px', // Maximum height before scrolling
    closeOnSelect: true, // Close menu when item is selected
    disabled: false // Disable the entire menu
  });

  const { items, trigger, position, variant, maxHeight, closeOnSelect, disabled } = normalizedProps;
  const menuId = generateId('menu');
  const triggerId = `${menuId}-trigger`;
  
  // Build classes using helper
  const menuClasses = buildClasses([
    'md-menu',
    `md-menu--${position}`,
    `md-menu--${variant}`
  ]);

  const triggerClasses = buildClasses([
    'md-menu-trigger',
    disabled ? 'md-menu-trigger--disabled' : null
  ]);

  // Build attributes using helper
  const menuAttributes = buildAttributes({
    'id': menuId,
    'class': menuClasses,
    'role': 'menu',
    'aria-labelledby': triggerId,
    'style': `max-height: ${maxHeight}`
  });

  const triggerAttributes = buildAttributes({
    'id': triggerId,
    'class': triggerClasses,
    'aria-haspopup': 'true',
    'aria-expanded': 'false',
    'disabled': disabled ? 'true' : null
  });

  // Generate menu items
  const menuItems = items.map((item: any, index: number) => {
    const itemClasses = buildClasses([
      'md-menu-item',
      item.disabled ? 'md-menu-item--disabled' : null
    ]);
    
    const iconElement = item.icon ? renderIcon(item.icon) : '';
    const dividerElement = item.divider ? '<div class="md-menu-divider"></div>' : '';
    
    let alpineAttributes = '';
    if (framework === 'alpine' && !item.disabled) {
      alpineAttributes = `@click="selectItem('${item.value}', '${item.label}', ${index})"`;
    }
    
    return `
    <div class="${itemClasses}" 
         role="menuitem"
         tabindex="${item.disabled ? '-1' : '0'}"
         data-value="${item.value}"
         ${alpineAttributes}>
      ${iconElement}
      <span class="md-menu-item__label">${item.label}</span>
    </div>
    ${dividerElement}`;
  }).join('');

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      open: false,
      toggle() {
        this.open = !this.open;
        this.$refs.trigger.setAttribute('aria-expanded', this.open);
      },
      close() {
        this.open = false;
        this.$refs.trigger.setAttribute('aria-expanded', 'false');
      },
      selectItem(value, label, index) {
        if (${closeOnSelect}) {
          this.close();
        }
        this.$dispatch('menu-select', { value, label, index });
      }
    }" 
    @click.away="close()" 
    @keydown.escape="close()"`;
  }

  const html = `<div class="md-menu-container" ${alpineData}>
  <button ${triggerAttributes} 
          ${framework === 'alpine' ? '@click="toggle()" x-ref="trigger"' : ''}>
    ${trigger}
    <span class="md-menu-trigger__icon">▼</span>
  </button>
  
  <div ${menuAttributes} 
       ${framework === 'alpine' ? 'x-show="open" x-transition' : 'style="display: none;"'}>
    ${menuItems}
  </div>
</div>`;

  const css = `/* Material Design 3 Menu */
.md-menu-container {
  position: relative;
  display: inline-block;
}

.md-menu-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid ${MD3_COLORS.outline};
  border-radius: ${MD3_SHAPE.corner.small};
  background: ${MD3_COLORS.surface};
  color: ${MD3_COLORS.onSurface};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
  min-height: 40px;
}

.md-menu-trigger:hover:not(.md-menu-trigger--disabled) {
  background: ${MD3_COLORS.surfaceVariant};
  border-color: ${MD3_COLORS.primary};
}

.md-menu-trigger:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
}

.md-menu-trigger--disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.md-menu-trigger__icon {
  font-size: 12px;
  transition: transform ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-menu-trigger[aria-expanded="true"] .md-menu-trigger__icon {
  transform: rotate(180deg);
}

/* Menu dropdown */
.md-menu {
  position: absolute;
  z-index: 1000;
  background: ${MD3_COLORS.surface};
  border: 1px solid ${MD3_COLORS.outline};
  border-radius: ${MD3_SHAPE.corner.small};
  box-shadow: ${MD3_ELEVATION.level2};
  overflow-y: auto;
  min-width: 112px;
  max-width: 280px;
  padding: 8px 0;
}

/* Menu positioning */
.md-menu--bottom-start {
  top: 100%;
  left: 0;
  margin-top: 4px;
}

.md-menu--bottom-end {
  top: 100%;
  right: 0;
  margin-top: 4px;
}

.md-menu--top-start {
  bottom: 100%;
  left: 0;
  margin-bottom: 4px;
}

.md-menu--top-end {
  bottom: 100%;
  right: 0;
  margin-bottom: 4px;
}

/* Menu items */
.md-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: ${MD3_COLORS.onSurface};
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
}

.md-menu-item:hover:not(.md-menu-item--disabled) {
  background: ${MD3_COLORS.surfaceVariant};
}

.md-menu-item:focus-visible {
  background: ${MD3_COLORS.surfaceVariant};
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: -2px;
}

.md-menu-item--disabled {
  color: ${MD3_COLORS.onSurface};
  opacity: 0.38;
  cursor: not-allowed;
}

.md-menu-item__label {
  flex: 1;
}

/* Menu divider */
.md-menu-divider {
  height: 1px;
  background: ${MD3_COLORS.outline};
  margin: 8px 0;
}

/* Dense variant */
.md-menu--dense .md-menu-item {
  padding: 8px 16px;
  font-size: 13px;
}

/* Dark theme support */
[data-theme="dark"] .md-menu {
  background: ${MD3_COLORS.surface};
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-menu-trigger {
  background: ${MD3_COLORS.surface};
  border-color: ${MD3_COLORS.outline};
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-menu-item {
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-menu-item:hover:not(.md-menu-item--disabled) {
  background: ${MD3_COLORS.surfaceVariant};
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = generateMenuVanillaJS(menuId, triggerId, closeOnSelect);
  }

  return { html, css, js };
}

// Navigation Bar Component
export function generateNavigationBar(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    items: [
      { label: 'Home', icon: 'home', activeIcon: 'home', value: 'home', active: true },
      { label: 'Search', icon: 'search', activeIcon: 'search', value: 'search', active: false },
      { label: 'Library', icon: 'library_music', activeIcon: 'library_music', value: 'library', active: false },
      { label: 'Profile', icon: 'person', activeIcon: 'person', value: 'profile', active: false }
    ],
    hideInactiveLabels: false, // Hide labels for inactive items
    showBadges: false, // Show notification badges
    position: 'bottom', // bottom, top
    variant: 'standard' // standard, small
  });

  const { items, hideInactiveLabels, showBadges, position, variant } = normalizedProps;
  const navId = generateId('nav-bar');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-navigation-bar',
    `md-navigation-bar--${position}`,
    `md-navigation-bar--${variant}`,
    hideInactiveLabels ? 'md-navigation-bar--hide-inactive-labels' : null
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': navId,
    'class': classes,
    'role': 'navigation',
    'aria-label': 'Main navigation'
  });

  // Generate navigation items
  const navItems = items.map((item: any, index: number) => {
    const itemId = `${navId}-item-${index}`;
    const itemClasses = buildClasses([
      'md-nav-item',
      item.active ? 'md-nav-item--active' : null
    ]);
    
    const displayIcon = item.active && item.activeIcon ? item.activeIcon : item.icon;
    const iconElement = renderIcon(displayIcon);
    const badgeElement = (item.badge && showBadges) 
      ? `<span class="md-nav-badge">${item.badge}</span>` 
      : '';
    
    let alpineAttributes = '';
    if (framework === 'alpine') {
      alpineAttributes = `@click="selectItem('${item.value}', ${index})"`;
    }
    
    return `
    <button class="${itemClasses}" 
            id="${itemId}"
            role="tab"
            aria-selected="${item.active}"
            data-value="${item.value}"
            ${alpineAttributes}>
      <div class="md-nav-item__icon-container">
        ${iconElement}
        ${badgeElement}
      </div>
      <span class="md-nav-item__label">${item.label}</span>
      <div class="md-nav-item__indicator"></div>
    </button>`;
  }).join('');

  let alpineData = '';
  if (framework === 'alpine') {
    alpineData = `x-data="{ 
      activeIndex: ${items.findIndex((item: any) => item.active)},
      selectItem(value, index) {
        this.activeIndex = index;
        // Update active states
        this.$el.querySelectorAll('.md-nav-item').forEach((item, i) => {
          item.classList.toggle('md-nav-item--active', i === index);
          item.setAttribute('aria-selected', i === index);
        });
        // Dispatch event
        this.$dispatch('navigation-change', { value, index });
      }
    }"`;
  }

  const html = `<nav ${attributes} ${alpineData}>
  ${navItems}
</nav>`;

  const css = `/* Material Design 3 Navigation Bar */
.md-navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${MD3_COLORS.surface};
  border-top: 1px solid ${MD3_COLORS.outline};
  padding: 12px 0 16px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
  min-height: 80px;
}

.md-navigation-bar--bottom {
  bottom: 0;
}

.md-navigation-bar--top {
  top: 0;
  border-top: none;
  border-bottom: 1px solid ${MD3_COLORS.outline};
}

.md-navigation-bar--small {
  min-height: 64px;
  padding: 8px 0 12px;
}

/* Navigation Items */
.md-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 168px;
  min-width: 48px;
  padding: 4px 0;
  border: none;
  background: transparent;
  color: ${MD3_COLORS.onSurfaceVariant};
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: all ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
  outline: none;
}

.md-nav-item:hover:not(.md-nav-item--active) {
  color: ${MD3_COLORS.onSurface};
}

.md-nav-item:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
  border-radius: 16px;
}

/* Active state */
.md-nav-item--active {
  color: ${MD3_COLORS.onSecondaryContainer};
}

.md-nav-item--active .md-nav-item__icon-container::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -16px;
  right: -16px;
  bottom: -4px;
  background: ${MD3_COLORS.secondaryContainer};
  border-radius: 16px;
  z-index: -1;
}

/* Icon container */
.md-nav-item__icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  font-size: 24px;
}

/* Labels */
.md-nav-item__label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.5px;
  transition: opacity ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

/* Hide inactive labels option */
.md-navigation-bar--hide-inactive-labels .md-nav-item:not(.md-nav-item--active) .md-nav-item__label {
  opacity: 0;
  transform: scale(0.8);
}

/* Badges */
.md-nav-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${MD3_COLORS.error};
  color: ${MD3_COLORS.onError};
  border-radius: 6px;
  padding: 0 4px;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  min-width: 12px;
  text-align: center;
  z-index: 1;
}

/* Indicator (bottom line for active item) */
.md-nav-item__indicator {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: ${MD3_COLORS.primary};
  border-radius: 3px 3px 0 0;
  transition: width ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-nav-item--active .md-nav-item__indicator {
  width: 64px;
}

/* Small variant adjustments */
.md-navigation-bar--small .md-nav-item__icon-container {
  width: 28px;
  height: 28px;
  font-size: 20px;
}

.md-navigation-bar--small .md-nav-item__label {
  font-size: 11px;
}

/* Dark theme support */
[data-theme="dark"] .md-navigation-bar {
  background: ${MD3_COLORS.surface};
  border-color: ${MD3_COLORS.outline};
}

[data-theme="dark"] .md-nav-item {
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-nav-item--active {
  color: ${MD3_COLORS.onSecondaryContainer};
}

[data-theme="dark"] .md-nav-item--active .md-nav-item__icon-container::before {
  background: ${MD3_COLORS.secondaryContainer};
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .md-navigation-bar {
    padding: 8px 0 12px;
  }
  
  .md-nav-item__label {
    font-size: 10px;
  }
}`;

  let js = '';
  if (framework === 'vanilla') {
    js = generateNavigationBarVanillaJS(navId);
  }

  return { html, css, js };
}

// Breadcrumb Component
export function generateBreadcrumb(props: any, framework: string): ComponentCode {
  const normalizedProps = normalizeProps(props, {
    items: [
      { label: 'Home', href: '/', current: false },
      { label: 'Category', href: '/category', current: false },
      { label: 'Subcategory', href: '/category/subcategory', current: false },
      { label: 'Current Page', href: '/category/subcategory/current', current: true }
    ],
    separator: '/', // Separator between items
    maxItems: 0, // Maximum items to show (0 = show all)
    showHome: true, // Show home icon for first item
    variant: 'standard' // standard, compact
  });

  const { items, separator, maxItems, showHome, variant } = normalizedProps;
  const breadcrumbId = generateId('breadcrumb');
  
  // Build classes using helper
  const classes = buildClasses([
    'md-breadcrumb',
    `md-breadcrumb--${variant}`
  ]);

  // Build attributes using helper
  const attributes = buildAttributes({
    'id': breadcrumbId,
    'class': classes,
    'role': 'navigation',
    'aria-label': 'Breadcrumb'
  });

  // Handle max items with ellipsis
  let displayItems = items;
  if (maxItems > 0 && items.length > maxItems) {
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    displayItems = [firstItem, { label: '...', href: '#', current: false, ellipsis: true } as any, ...lastItems];
  }

  // Generate breadcrumb items
  const breadcrumbItems = displayItems.map((item: any, index: number) => {
    const isLast = index === displayItems.length - 1;
    const itemClasses = buildClasses([
      'md-breadcrumb-item',
      item.current ? 'md-breadcrumb-item--current' : null,
      item.ellipsis ? 'md-breadcrumb-item--ellipsis' : null
    ]);
    
    const homeIcon = (index === 0 && showHome) ? renderIcon('home') : '';
    const separatorElement = !isLast ? `<span class="md-breadcrumb-separator">${separator}</span>` : '';
    
    let content;
    if (item.ellipsis) {
      content = `<span class="md-breadcrumb-ellipsis">${item.label}</span>`;
    } else if (item.current || !item.href) {
      content = `<span class="md-breadcrumb-text">${homeIcon}${item.label}</span>`;
    } else {
      content = `<a href="${item.href}" class="md-breadcrumb-link">${homeIcon}${item.label}</a>`;
    }
    
    return `
    <li class="${itemClasses}">
      ${content}
      ${separatorElement}
    </li>`;
  }).join('');

  const html = `<nav ${attributes}>
  <ol class="md-breadcrumb-list">
    ${breadcrumbItems}
  </ol>
</nav>`;

  const css = `/* Material Design 3 Breadcrumb */
.md-breadcrumb {
  display: block;
  width: 100%;
}

.md-breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4px;
}

.md-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.md-breadcrumb-link,
.md-breadcrumb-text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: ${MD3_COLORS.onSurfaceVariant};
  transition: color ${MD3_MOTION.duration.short4} ${MD3_MOTION.easing.standard};
}

.md-breadcrumb-link:hover {
  color: ${MD3_COLORS.primary};
  text-decoration: underline;
}

.md-breadcrumb-link:focus-visible {
  outline: 2px solid ${MD3_COLORS.primary};
  outline-offset: 2px;
  border-radius: 4px;
}

.md-breadcrumb-item--current .md-breadcrumb-text {
  color: ${MD3_COLORS.onSurface};
  font-weight: 500;
}

.md-breadcrumb-separator {
  color: ${MD3_COLORS.onSurfaceVariant};
  font-size: 14px;
  user-select: none;
}

.md-breadcrumb-ellipsis {
  color: ${MD3_COLORS.onSurfaceVariant};
  font-size: 14px;
  cursor: default;
  user-select: none;
}

/* Compact variant */
.md-breadcrumb--compact .md-breadcrumb-link,
.md-breadcrumb--compact .md-breadcrumb-text {
  font-size: 12px;
  line-height: 16px;
}

.md-breadcrumb--compact .md-breadcrumb-separator {
  font-size: 12px;
}

/* Dark theme support */
[data-theme="dark"] .md-breadcrumb-link,
[data-theme="dark"] .md-breadcrumb-text {
  color: ${MD3_COLORS.onSurfaceVariant};
}

[data-theme="dark"] .md-breadcrumb-link:hover {
  color: ${MD3_COLORS.primary};
}

[data-theme="dark"] .md-breadcrumb-item--current .md-breadcrumb-text {
  color: ${MD3_COLORS.onSurface};
}

[data-theme="dark"] .md-breadcrumb-separator,
[data-theme="dark"] .md-breadcrumb-ellipsis {
  color: ${MD3_COLORS.onSurfaceVariant};
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .md-breadcrumb-list {
    gap: 2px;
  }
  
  .md-breadcrumb-link,
  .md-breadcrumb-text {
    font-size: 12px;
  }
  
  .md-breadcrumb-separator {
    font-size: 12px;
  }
}`;

  return { html, css, js: '' };
}

// Helper functions for Vanilla JS implementations
function generateTabsVanillaJS(tabsId: string, tabCount: number): string {
  return `// Vanilla JavaScript for Tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabsContainer = document.getElementById('${tabsId}');
  const tabs = tabsContainer.querySelectorAll('.md-tab');
  const panels = tabsContainer.querySelectorAll('.md-tab-panel');
  
  function activateTab(index) {
    // Update tabs
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('md-tab--active', isActive);
      tab.setAttribute('aria-selected', isActive);
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Update panels
    panels.forEach((panel, i) => {
      panel.classList.toggle('md-tab-panel--active', i === index);
    });
    
    // Dispatch event
    tabsContainer.dispatchEvent(new CustomEvent('tabChange', {
      detail: { activeIndex: index, tab: tabs[index], panel: panels[index] }
    }));
  }
  
  // Click handlers
  tabs.forEach((tab, index) => {
    if (!tab.disabled) {
      tab.addEventListener('click', () => activateTab(index));
    }
  });
  
  // Keyboard navigation
  tabsContainer.addEventListener('keydown', function(e) {
    const currentTab = document.activeElement;
    const currentIndex = Array.from(tabs).indexOf(currentTab);
    
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    tabs[newIndex].focus();
    activateTab(newIndex);
  });
});`;
}

function generateMenuVanillaJS(menuId: string, triggerId: string, closeOnSelect: boolean): string {
  return `// Vanilla JavaScript for Menu
document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('${menuId}');
  const trigger = document.getElementById('${triggerId}');
  const menuItems = menu.querySelectorAll('.md-menu-item:not(.md-menu-item--disabled)');
  let isOpen = false;
  
  function openMenu() {
    isOpen = true;
    menu.style.display = 'block';
    trigger.setAttribute('aria-expanded', 'true');
    // Focus first item
    if (menuItems.length > 0) {
      menuItems[0].focus();
    }
  }
  
  function closeMenu() {
    isOpen = false;
    menu.style.display = 'none';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }
  
  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  // Trigger click
  trigger.addEventListener('click', toggleMenu);
  
  // Menu item clicks
  menuItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      const label = this.querySelector('.md-menu-item__label').textContent;
      
      // Dispatch event
      menu.dispatchEvent(new CustomEvent('menuSelect', {
        detail: { value, label, index, item: this }
      }));
      
      if (${closeOnSelect}) {
        closeMenu();
      }
    });
  });
  
  // Outside click
  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !trigger.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });
  
  // Arrow key navigation
  menu.addEventListener('keydown', function(e) {
    const currentItem = document.activeElement;
    const currentIndex = Array.from(menuItems).indexOf(currentItem);
    
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowDown':
        newIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        newIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = menuItems.length - 1;
        break;
      case 'Enter':
      case ' ':
        currentItem.click();
        return;
      default:
        return;
    }
    
    e.preventDefault();
    menuItems[newIndex].focus();
  });
});`;
}

function generateNavigationBarVanillaJS(navId: string): string {
  return `// Vanilla JavaScript for Navigation Bar
document.addEventListener('DOMContentLoaded', function() {
  const navBar = document.getElementById('${navId}');
  const navItems = navBar.querySelectorAll('.md-nav-item');
  
  navItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      
      // Update active states
      navItems.forEach((navItem, i) => {
        navItem.classList.toggle('md-nav-item--active', i === index);
        navItem.setAttribute('aria-selected', i === index);
      });
      
      // Dispatch custom event
      navBar.dispatchEvent(new CustomEvent('navigationChange', {
        detail: { value, index, item: this }
      }));
    });
    
    // Add ripple effect
    item.addEventListener('click', function(e) {
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
        opacity: 0.2;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 0;
      \`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}`;
}