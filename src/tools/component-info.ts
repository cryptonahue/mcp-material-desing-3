/**
 * Component information provider
 */

import type { ToolResult } from '../types/index.js';
import { logger } from '../utils/logger.js';

export async function getComponentInfo(componentName: string): Promise<ToolResult> {
  logger.info(`Getting component info: ${componentName}`);

  try {
    const info = await fetchComponentInfo(componentName);
    
    if (!info) {
      return {
        success: false,
        message: `Component "${componentName}" not found`,
      };
    }
    
    return {
      success: true,
      data: info,
      message: `Retrieved information for ${componentName}`,
    };
  } catch (error) {
    logger.error('Component info retrieval failed:', error);
    return {
      success: false,
      message: `Failed to get component info: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  variants: string[];
  props: ComponentProp[];
  features: string[];
  examples: ComponentExample[];
  cssClasses: string[];
  jsRequired: boolean;
  alpineSupport: boolean;
}

interface ComponentProp {
  name: string;
  type: string;
  description: string;
  default?: any;
  required: boolean;
  options?: string[];
}

interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

async function fetchComponentInfo(componentName: string): Promise<ComponentInfo | null> {
  const componentDatabase = getComponentDatabase();
  return componentDatabase[componentName.toLowerCase()] || null;
}

function getComponentDatabase(): Record<string, ComponentInfo> {
  return {
    button: {
      name: 'Button',
      description: 'Versatile button component with Material Design 3 styling and 5 variants',
      category: 'Actions',
      variants: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
      props: [
        {
          name: 'text',
          type: 'string',
          description: 'Button text content',
          default: 'Button',
          required: false,
        },
        {
          name: 'variant',
          type: 'string',
          description: 'Button variant style',
          default: 'filled',
          required: false,
          options: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
        },
        {
          name: 'size',
          type: 'string',
          description: 'Button size',
          default: 'medium',
          required: false,
          options: ['small', 'medium', 'large'],
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the button is disabled',
          default: false,
          required: false,
        },
        {
          name: 'icon',
          type: 'string',
          description: 'Icon position relative to text',
          default: 'none',
          required: false,
          options: ['none', 'leading', 'trailing', 'only'],
        },
        {
          name: 'iconName',
          type: 'string',
          description: 'Material icon name (when using icons)',
          required: false,
        },
      ],
      features: ['Multiple variants', 'Icon support', 'Size variants', 'Disabled state', 'Ripple effect'],
      examples: [
        {
          title: 'Basic Button',
          description: 'Simple filled button',
          code: '<button class="btn btn--filled">Click me</button>',
        },
        {
          title: 'Button with Icon',
          description: 'Button with leading icon',
          code: `<button class="btn btn--filled btn--icon-leading">
  <span class="btn-content">
    <span class="btn-icon material-icons">add</span>
    <span class="btn-label">Add Item</span>
  </span>
</button>`,
        },
      ],
      cssClasses: ['btn', 'btn--filled', 'btn--outlined', 'btn--text', 'btn--elevated', 'btn--tonal', 'btn--small', 'btn--large'],
      jsRequired: false,
      alpineSupport: true,
    },

    card: {
      name: 'Card',
      description: 'Flexible card component with media and action support',
      category: 'Layout',
      variants: ['elevated', 'filled', 'outlined'],
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Card title text',
          default: 'Card Title',
          required: false,
        },
        {
          name: 'subtitle',
          type: 'string',
          description: 'Card subtitle text',
          required: false,
        },
        {
          name: 'content',
          type: 'string',
          description: 'Card body content',
          required: false,
        },
        {
          name: 'variant',
          type: 'string',
          description: 'Card variant style',
          default: 'elevated',
          required: false,
          options: ['elevated', 'filled', 'outlined'],
        },
        {
          name: 'actions',
          type: 'boolean',
          description: 'Whether to include action buttons',
          default: false,
          required: false,
        },
      ],
      features: ['Multiple variants', 'Header with title/subtitle', 'Action buttons', 'Media support'],
      examples: [
        {
          title: 'Basic Card',
          description: 'Simple elevated card',
          code: `<div class="md-card md-card--elevated">
  <div class="md-card__content">
    <div class="md-card__header">
      <h3 class="md-card__title">Card Title</h3>
    </div>
    <div class="md-card__body">
      <p>Card content goes here.</p>
    </div>
  </div>
</div>`,
        },
      ],
      cssClasses: ['md-card', 'md-card--elevated', 'md-card--filled', 'md-card--outlined'],
      jsRequired: false,
      alpineSupport: true,
    },

    checkbox: {
      name: 'Checkbox',
      description: 'Checkbox with indeterminate state and smooth animations',
      category: 'Form Inputs',
      variants: [],
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'Checkbox label text',
          required: false,
        },
        {
          name: 'checked',
          type: 'boolean',
          description: 'Whether the checkbox is checked',
          default: false,
          required: false,
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the checkbox is disabled',
          default: false,
          required: false,
        },
        {
          name: 'indeterminate',
          type: 'boolean',
          description: 'Whether the checkbox is in indeterminate state',
          default: false,
          required: false,
        },
      ],
      features: ['Indeterminate state', 'Ripple effect', 'Smooth animations', 'Label support'],
      examples: [
        {
          title: 'Basic Checkbox',
          description: 'Simple checkbox with label',
          code: `<div class="md3-checkbox-with-label">
  <div class="md3-checkbox">
    <input type="checkbox" class="input" id="checkbox1">
    <div class="container">
      <div class="outline"></div>
      <div class="background"></div>
      <div class="icon">
        <svg viewBox="0 0 18 18">
          <path class="mark checkmark" d="M6,9 L8,11 L12,7"></path>
        </svg>
      </div>
    </div>
  </div>
  <label for="checkbox1" class="label">Accept terms</label>
</div>`,
        },
      ],
      cssClasses: ['md3-checkbox', 'md3-checkbox-with-label', 'checked', 'disabled', 'indeterminate'],
      jsRequired: false,
      alpineSupport: true,
    },

    dialog: {
      name: 'Dialog',
      description: 'Modal dialogs with confirmation and full-screen variants',
      category: 'Feedback',
      variants: ['basic', 'confirmation', 'full-screen'],
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Dialog title text',
          default: 'Dialog Title',
          required: false,
        },
        {
          name: 'content',
          type: 'string',
          description: 'Dialog body content',
          required: false,
        },
        {
          name: 'actions',
          type: 'array',
          description: 'Array of action button labels',
          default: ['Cancel', 'OK'],
          required: false,
        },
        {
          name: 'variant',
          type: 'string',
          description: 'Dialog variant',
          default: 'basic',
          required: false,
          options: ['basic', 'confirmation', 'full-screen'],
        },
      ],
      features: ['Multiple variants', 'Backdrop overlay', 'Focus management', 'Escape key support'],
      examples: [
        {
          title: 'Basic Dialog',
          description: 'Simple modal dialog',
          code: `<div class="md-dialog-overlay">
  <div class="md-dialog">
    <div class="md-dialog-header">
      <h2 class="md-dialog-title">Confirm Action</h2>
    </div>
    <div class="md-dialog-content">
      <p>Are you sure you want to continue?</p>
    </div>
    <div class="md-dialog-actions">
      <button class="btn btn--text">Cancel</button>
      <button class="btn btn--filled">OK</button>
    </div>
  </div>
</div>`,
        },
      ],
      cssClasses: ['md-dialog', 'md-dialog-overlay', 'md-dialog-open', 'md-dialog--basic', 'md-dialog--full-screen'],
      jsRequired: true,
      alpineSupport: true,
    },

    select: {
      name: 'Select',
      description: 'Dropdown selection component with search support',
      category: 'Form Inputs',
      variants: ['filled', 'outlined'],
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'Select field label',
          required: false,
        },
        {
          name: 'variant',
          type: 'string',
          description: 'Select variant style',
          default: 'outlined',
          required: false,
          options: ['filled', 'outlined'],
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the select is disabled',
          default: false,
          required: false,
        },
        {
          name: 'multiple',
          type: 'boolean',
          description: 'Allow multiple selections',
          default: false,
          required: false,
        },
      ],
      features: ['Search functionality', 'Multiple selection', 'Floating labels', 'Validation support'],
      examples: [
        {
          title: 'Basic Select',
          description: 'Simple outlined select',
          code: `<div class="md-select md-select--outlined">
  <div class="md-select__container">
    <div class="md-select__field">
      <select class="md-select__input">
        <option value="">Choose option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
      <label class="md-select__label">Select Label</label>
    </div>
  </div>
</div>`,
        },
      ],
      cssClasses: ['md-select', 'md-select--filled', 'md-select--outlined', 'md-select--error', 'md-select--disabled'],
      jsRequired: true,
      alpineSupport: true,
    },
  };
}