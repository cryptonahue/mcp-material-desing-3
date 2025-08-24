/**
 * Type definitions for Material Tailwind MCP
 */

import { z } from 'zod';

// Component Types
export const ComponentType = z.enum([
  'button',
  'card',
  'checkbox',
  'radio',
  'switch',
  'dialog',
  'menu',
  'select',
  'slider',
  'tabs',
  'textfield',
  'tooltip',
  'chip',
  'fab',
  'badge',
  'divider',
  'progress',
  'list',
  'iconbutton',
  'navigationbar',
  'snackbar',
  'table',
  'icon',
  'field',
  'focus',
  'elevation',
  'ripple',
  'typography',
  'text',
  'heading',
  'accordion',
  'breadcrumb',
  'snackbar',
  'navigation-bar',
  'icon'
]);

export type ComponentType = z.infer<typeof ComponentType>;

// Component Variants
export const ComponentVariant = z.enum([
  'filled',
  'outlined',
  'text',
  'elevated',
  'tonal',
  'primary',
  'secondary',
  'tertiary',
  'small',
  'medium',
  'large',
  'basic',
  'confirmation',
  'full-screen'
]);

export type ComponentVariant = z.infer<typeof ComponentVariant>;

// Component Properties
export const ComponentProps = z.record(z.any());
export type ComponentProps = z.infer<typeof ComponentProps>;

// Generate Component Options
export const GenerateComponentSchema = z.object({
  type: ComponentType,
  variant: ComponentVariant.optional(),
  props: ComponentProps.optional(),
  content: z.string().optional(),
  includeJS: z.boolean().default(false),
  framework: z.enum(['css-only', 'alpine', 'vanilla-js']).default('css-only'),
});

export type GenerateComponentOptions = z.infer<typeof GenerateComponentSchema>;

// Theme Generation
export const ThemeGenerationSchema = z.object({
  seedColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  name: z.string().optional(),
  darkMode: z.boolean().default(true),
  outputFormat: z.enum(['css', 'tailwind', 'both']).default('css'),
  includeUtilities: z.boolean().default(true),
});

export type ThemeGenerationOptions = z.infer<typeof ThemeGenerationSchema>;

// Icon Search
export const IconSearchSchema = z.object({
  query: z.string(),
  category: z.string().optional(),
  style: z.enum(['filled', 'outlined', 'round', 'sharp', 'two-tone']).optional(),
  size: z.number().min(16).max(48).default(24),
});

export type IconSearchOptions = z.infer<typeof IconSearchSchema>;

// Layout Generation
export const LayoutGenerationSchema = z.object({
  type: z.enum(['page', 'section', 'grid', 'flex']),
  components: z.array(z.string()),
  responsive: z.boolean().default(true),
  theme: z.string().optional(),
});

export type LayoutGenerationOptions = z.infer<typeof LayoutGenerationSchema>;

// Tool Result
export interface ToolResult {
  success: boolean;
  data?: any;
  message?: string;
  code?: string;
  preview?: string;
}