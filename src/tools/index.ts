/**
 * Tool definitions for Material Tailwind MCP
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export async function setupTools(): Promise<Tool[]> {
  return [
    {
      name: 'generate_component',
      description: 'Generate Material Design 3 component HTML and CSS code',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'button', 'card', 'checkbox', 'radio', 'switch', 'dialog',
              'menu', 'select', 'slider', 'tabs', 'textfield', 'tooltip',
              'chip', 'fab', 'badge', 'divider', 'progress', 'list',
              'table', 'accordion', 'breadcrumb', 'snackbar', 'navigation-bar', 'icon'
            ],
            description: 'The type of component to generate',
          },
          variant: {
            type: 'string',
            enum: ['filled', 'outlined', 'text', 'elevated', 'tonal', 'primary', 'secondary', 'small', 'medium', 'large'],
            description: 'The variant of the component (if applicable)',
          },
          props: {
            type: 'object',
            description: 'Component properties like text, icons, states, etc.',
            additionalProperties: true,
          },
          content: {
            type: 'string',
            description: 'Content to include in the component',
          },
          includeJS: {
            type: 'boolean',
            default: false,
            description: 'Whether to include Alpine.js behavior for interactive components',
          },
          framework: {
            type: 'string',
            enum: ['css-only', 'alpine', 'vanilla-js'],
            default: 'css-only',
            description: 'JavaScript framework approach to use',
          },
        },
        required: ['type'],
      },
    },
    {
      name: 'generate_theme',
      description: 'Generate a complete Material Design 3 color theme from a seed color',
      inputSchema: {
        type: 'object',
        properties: {
          seedColor: {
            type: 'string',
            pattern: '^#[0-9A-Fa-f]{6}$',
            description: 'Hex color code to use as the base for theme generation (e.g., #6750A4)',
          },
          name: {
            type: 'string',
            description: 'Name for the generated theme',
          },
          darkMode: {
            type: 'boolean',
            default: true,
            description: 'Whether to generate dark mode variant',
          },
          outputFormat: {
            type: 'string',
            enum: ['css', 'tailwind', 'both'],
            default: 'css',
            description: 'Output format for the theme',
          },
          includeUtilities: {
            type: 'boolean',
            default: true,
            description: 'Whether to include utility classes',
          },
        },
        required: ['seedColor'],
      },
    },
    {
      name: 'search_icons',
      description: 'Search Material Design icons by keyword',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term for icons (e.g., "home", "search", "menu")',
          },
          category: {
            type: 'string',
            description: 'Icon category to filter by',
          },
          style: {
            type: 'string',
            enum: ['filled', 'outlined', 'round', 'sharp', 'two-tone'],
            description: 'Icon style variant',
          },
          size: {
            type: 'number',
            minimum: 16,
            maximum: 48,
            default: 24,
            description: 'Icon size in pixels',
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'create_layout',
      description: 'Generate complete page layouts with Material Design components',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['page', 'section', 'grid', 'flex'],
            description: 'Type of layout to generate',
          },
          components: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of components to include in the layout',
          },
          responsive: {
            type: 'boolean',
            default: true,
            description: 'Whether to include responsive design',
          },
          theme: {
            type: 'string',
            description: 'Theme name to apply to the layout',
          },
        },
        required: ['type', 'components'],
      },
    },
    {
      name: 'get_component_info',
      description: 'Get detailed information about a specific component',
      inputSchema: {
        type: 'object',
        properties: {
          component: {
            type: 'string',
            description: 'Component name to get information about',
          },
        },
        required: ['component'],
      },
    },
    {
      name: 'get_version',
      description: 'Get version information and capabilities of the Material Tailwind MCP',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  ];
}