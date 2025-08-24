/**
 * Resource reader implementation
 */

import { logger } from '../utils/logger.js';
import { getIconStats, getIconCategories } from './material-icons.js';

export async function readResource(uri: string): Promise<any> {
  logger.info(`Reading resource: ${uri}`);

  const resourceMap: Record<string, () => Promise<any>> = {
    'material://components/catalog': readComponentsCatalog,
    'material://themes/default': readDefaultTheme,
    'material://icons/catalog': readIconsCatalog,
    'material://icons/stats': readIconsStats,
    'material://patterns/common': readCommonPatterns,
    'material://examples/components': readComponentExamples,
    'material://guidelines/design': readDesignGuidelines,
  };

  const reader = resourceMap[uri];
  if (!reader) {
    throw new Error(`Unknown resource URI: ${uri}`);
  }

  return await reader();
}

async function readComponentsCatalog(): Promise<any> {
  return {
    title: 'Material Design 3 Components Catalog',
    version: '1.0.0',
    categories: [
      {
        id: 'actions',
        name: 'Actions',
        description: 'Components that trigger actions or navigation',
        components: [
          {
            id: 'button',
            name: 'Button',
            description: 'Versatile button component with 5 variants',
            variants: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
          {
            id: 'fab',
            name: 'Floating Action Button',
            description: 'Prominent action button that floats above content',
            variants: ['surface', 'primary', 'secondary', 'tertiary'],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
        ],
      },
      {
        id: 'form-inputs',
        name: 'Form Inputs',
        description: 'Components for user input and form controls',
        components: [
          {
            id: 'textfield',
            name: 'Text Field',
            description: 'Text input with floating labels and validation',
            variants: ['filled', 'outlined'],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
          {
            id: 'select',
            name: 'Select',
            description: 'Dropdown selection with search support',
            variants: ['filled', 'outlined'],
            status: 'stable',
            jsRequired: true,
            alpineSupport: true,
          },
          {
            id: 'checkbox',
            name: 'Checkbox',
            description: 'Checkbox with indeterminate state support',
            variants: [],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
          {
            id: 'radio',
            name: 'Radio Button',
            description: 'Radio buttons for mutually exclusive selections',
            variants: [],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
          {
            id: 'switch',
            name: 'Switch',
            description: 'Toggle switch with icon support',
            variants: [],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
          {
            id: 'slider',
            name: 'Slider',
            description: 'Range slider with single and dual handle support',
            variants: ['single', 'range'],
            status: 'stable',
            jsRequired: true,
            alpineSupport: true,
          },
        ],
      },
      {
        id: 'navigation',
        name: 'Navigation',
        description: 'Components for navigation and wayfinding',
        components: [
          {
            id: 'tabs',
            name: 'Tabs',
            description: 'Primary and secondary tabs with icon support',
            variants: ['primary', 'secondary'],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
          {
            id: 'navigation-bar',
            name: 'Navigation Bar',
            description: 'Bottom navigation for mobile applications',
            variants: [],
            status: 'stable',
            jsRequired: true,
            alpineSupport: true,
          },
          {
            id: 'menu',
            name: 'Menu',
            description: 'Dropdown and context menus with submenu support',
            variants: [],
            status: 'stable',
            jsRequired: true,
            alpineSupport: true,
          },
          {
            id: 'breadcrumb',
            name: 'Breadcrumb',
            description: 'Hierarchical navigation with responsive behavior',
            variants: [],
            status: 'stable',
            jsRequired: false,
            alpineSupport: true,
          },
        ],
      },
    ],
    totalComponents: 25,
    stableComponents: 23,
    betaComponents: 2,
  };
}

async function readDefaultTheme(): Promise<any> {
  return {
    name: 'Material Design 3 Default',
    seedColor: '#6750A4',
    palette: {
      primary: {
        10: '#21005D',
        20: '#381E72',
        30: '#4F378B',
        40: '#6750A4',
        50: '#7F67BE',
        60: '#9A82DB',
        70: '#B69DF8',
        80: '#D0BCFF',
        90: '#EADDFF',
        95: '#F6EDFF',
        99: '#FFFBFE',
      },
      secondary: {
        10: '#1D192B',
        20: '#332D41',
        30: '#4A4458',
        40: '#625B71',
        50: '#7C7289',
        60: '#958DA5',
        70: '#B0A7C0',
        80: '#CCC2DC',
        90: '#E8DEF8',
        95: '#F6EDFF',
        99: '#FFFBFE',
      },
    },
    semanticColors: {
      light: {
        primary: 'var(--md-sys-color-primary-40)',
        onPrimary: 'var(--md-sys-color-primary-99)',
        primaryContainer: 'var(--md-sys-color-primary-90)',
        onPrimaryContainer: 'var(--md-sys-color-primary-10)',
      },
      dark: {
        primary: 'var(--md-sys-color-primary-80)',
        onPrimary: 'var(--md-sys-color-primary-20)',
        primaryContainer: 'var(--md-sys-color-primary-30)',
        onPrimaryContainer: 'var(--md-sys-color-primary-90)',
      },
    },
  };
}

async function readIconsCatalog(): Promise<any> {
  const stats = await getIconStats();
  const categories = await getIconCategories();
  
  return {
    title: 'Material Design Icons Catalog',
    totalIcons: stats.totalIcons,
    categories: categories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      description: `Icons for ${category} related functionality`
    })),
    styles: stats.stylesAvailable.map(style => ({
      id: style,
      name: style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' '),
      description: getStyleDescription(style)
    })),
    sizes: [16, 18, 20, 24, 32, 48],
    usage: [
      'Use consistent icon style throughout your application',
      'Icons should be 24dp in size by default', 
      'Ensure sufficient color contrast for accessibility',
      'Use semantic meaning rather than decorative icons',
      `${stats.totalIcons} icons available across ${stats.categories} categories`
    ],
  };
}

async function readIconsStats(): Promise<any> {
  return await getIconStats();
}

function getStyleDescription(style: string): string {
  const descriptions: Record<string, string> = {
    'filled': 'Solid filled icons with maximum emphasis',
    'outlined': 'Outlined icons for secondary emphasis', 
    'round': 'Rounded corners for friendly appearance',
    'sharp': 'Sharp corners for precise, technical look',
    'two-tone': 'Two-tone icons for depth and sophistication'
  };
  return descriptions[style] || `${style} style Material icons`;
}

async function readCommonPatterns(): Promise<any> {
  return {
    title: 'Common UI Patterns',
    patterns: [
      {
        id: 'landing-hero',
        name: 'Landing Page Hero',
        description: 'Hero section with title, subtitle, and call-to-action',
        components: ['button', 'card', 'icon'],
        difficulty: 'beginner',
        responsive: true,
      },
      {
        id: 'dashboard-layout',
        name: 'Dashboard Layout',
        description: 'Admin dashboard with sidebar navigation and content grid',
        components: ['navigation-bar', 'card', 'table', 'button'],
        difficulty: 'intermediate',
        responsive: true,
      },
      {
        id: 'form-wizard',
        name: 'Multi-step Form',
        description: 'Wizard-style form with progress indication',
        components: ['textfield', 'select', 'checkbox', 'button', 'progress'],
        difficulty: 'advanced',
        responsive: true,
      },
      {
        id: 'product-catalog',
        name: 'Product Catalog',
        description: 'Grid of product cards with filtering',
        components: ['card', 'chip', 'button', 'select'],
        difficulty: 'intermediate',
        responsive: true,
      },
    ],
  };
}

async function readComponentExamples(): Promise<any> {
  return {
    title: 'Component Code Examples',
    examples: {
      button: [
        {
          title: 'Basic Buttons',
          code: `<!-- Filled Button -->
<button class="btn btn--filled">Primary Action</button>

<!-- Outlined Button -->
<button class="btn btn--outlined">Secondary Action</button>

<!-- Text Button -->
<button class="btn btn--text">Tertiary Action</button>`,
        },
        {
          title: 'Button with Icon',
          code: `<button class="btn btn--filled btn--icon-leading">
  <span class="btn-content">
    <span class="btn-icon material-icons">add</span>
    <span class="btn-label">Add Item</span>
  </span>
</button>`,
        },
      ],
      card: [
        {
          title: 'Basic Card',
          code: `<div class="md-card md-card--elevated">
  <div class="md-card__content">
    <div class="md-card__header">
      <h3 class="md-card__title">Card Title</h3>
      <p class="md-card__subtitle">Supporting text</p>
    </div>
    <div class="md-card__body">
      <p>Card content with detailed information.</p>
    </div>
    <div class="md-card__actions">
      <button class="btn btn--text">Action 1</button>
      <button class="btn btn--text">Action 2</button>
    </div>
  </div>
</div>`,
        },
      ],
    },
  };
}

async function readDesignGuidelines(): Promise<any> {
  return {
    title: 'Material Design 3 Guidelines',
    principles: [
      {
        id: 'adaptive',
        name: 'Adaptive',
        description: 'Interfaces adapt across platforms, inputs, and contexts',
        guidelines: [
          'Use responsive design principles',
          'Support multiple input methods',
          'Adapt to different screen sizes',
        ],
      },
      {
        id: 'expressive',
        name: 'Expressive',
        description: 'Celebrate personal style with beautiful, dynamic color',
        guidelines: [
          'Use the Material You color system',
          'Apply color meaningfully and consistently',
          'Support light and dark themes',
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        description: 'Enable personal expression and accessibility for everyone',
        guidelines: [
          'Support customization and theming',
          'Ensure accessibility compliance',
          'Provide clear visual hierarchy',
        ],
      },
    ],
    colorSystem: {
      description: 'Material Design 3 uses a scientific color system based on HCT (Hue, Chroma, Tone)',
      keyColors: ['Primary', 'Secondary', 'Tertiary', 'Error', 'Neutral', 'Neutral Variant'],
      roles: ['Primary', 'On Primary', 'Primary Container', 'On Primary Container'],
    },
    typography: {
      scale: ['Display Large', 'Display Medium', 'Display Small', 'Headline Large', 'Headline Medium', 'Headline Small'],
      principles: ['Legibility', 'Readability', 'Hierarchy'],
    },
  };
}