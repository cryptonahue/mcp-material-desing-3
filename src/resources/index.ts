/**
 * Resource definitions for Material Tailwind MCP
 */

import type { Resource } from '@modelcontextprotocol/sdk/types.js';

export async function setupResources(): Promise<Resource[]> {
  return [
    {
      uri: 'material://components/catalog',
      name: 'Component Catalog',
      description: 'Complete catalog of available Material Design 3 components',
      mimeType: 'application/json',
    },
    {
      uri: 'material://themes/default',
      name: 'Default Theme',
      description: 'Default Material Design 3 color theme',
      mimeType: 'application/json',
    },
    {
      uri: 'material://icons/catalog',
      name: 'Icons Catalog',
      description: 'Catalog of available Material Design icons',
      mimeType: 'application/json',
    },
    {
      uri: 'material://patterns/common',
      name: 'Common Patterns',
      description: 'Common UI patterns and layouts using Material Design components',
      mimeType: 'application/json',
    },
    {
      uri: 'material://examples/components',
      name: 'Component Examples',
      description: 'Code examples for all components',
      mimeType: 'application/json',
    },
    {
      uri: 'material://guidelines/design',
      name: 'Design Guidelines',
      description: 'Material Design 3 principles and best practices',
      mimeType: 'application/json',
    },
  ];
}