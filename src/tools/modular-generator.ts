/**
 * Modular Component Generator - Nueva arquitectura limpia
 * Coexiste con component-generator.ts sin modificarlo
 */

import type { GenerateComponentOptions, ToolResult } from '../types/index.js';
import { logger } from '../utils/logger.js';

// Importar generadores modulares
import { generateAccordion } from './generators/layout.js';
import { generateBreadcrumb } from './generators/navigation.js';
import { generateButton, generateCard, generateDialog, generateDivider } from './generators/basic-components.js';
import { generateTextField, generateCheckbox, generateRadio, generateSwitch, generateSlider, generateSelect } from './generators/form-components.js';
import { generateTabs, generateMenu, generateNavigationBar } from './generators/navigation.js';
import { generateTooltip, generateSnackbar, generateProgress } from './generators/feedback.js';
import { generateList, generateTable } from './generators/data-display.js';
import { generateFAB, generateIconButton } from './generators/layout.js';
import { generateFocus, generateElevation, generateRipple, generateTypography, generateIcon, generateField } from './generators/systems.js';

/**
 * Lista de componentes soportados por el generador modular
 */
const MODULAR_COMPONENTS = new Set([
  // Basic components
  'button', 'card', 'dialog', 'divider',
  // Form components
  'textfield', 'checkbox', 'radio', 'switch', 'slider', 'select',
  // Navigation components
  'tabs', 'menu', 'navigation-bar', 'breadcrumb',
  // Feedback components
  'tooltip', 'snackbar', 'progress',
  // Data display components
  'list', 'table',
  // Layout components
  'fab', 'iconbutton', 'accordion',
  // System components
  'focus', 'elevation', 'ripple', 'typography', 'icon', 'field'
]);

/**
 * Determina si un componente debe usar el generador modular
 */
export function shouldUseModularGenerator(type: string): boolean {
  return MODULAR_COMPONENTS.has(type);
}

/**
 * Generador modular para nuevos componentes
 */
export async function generateModularComponent(options: GenerateComponentOptions): Promise<ToolResult> {
  logger.info(`Generating modular component: ${options.type}`, { options });

  try {
    const componentCode = await generateModularComponentCode(options);
    
    return {
      success: true,
      data: {
        type: options.type,
        variant: options.variant,
        framework: options.framework,
        html: componentCode.html,
        css: componentCode.css,
        js: componentCode.js,
      },
      code: componentCode.html,
      message: `Generated ${options.type} component successfully (modular)`,
    };
  } catch (error) {
    logger.error('Modular component generation failed:', error);
    return {
      success: false,
      message: `Failed to generate ${options.type}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Router para componentes modulares
 */
async function generateModularComponentCode(options: GenerateComponentOptions) {
  const { type, variant, props, content, framework } = options;

  switch (type) {
    // Basic components
    case 'button':
      return generateButton(props || {}, framework || 'css-only');
    case 'card':
      return generateCard(props || {}, framework || 'css-only');
    case 'dialog':
      return generateDialog(props || {}, framework || 'css-only');
    case 'divider':
      return generateDivider(props || {}, framework || 'css-only');
      
    // Form components
    case 'textfield':
      return generateTextField(props || {}, framework || 'css-only');
    case 'checkbox':
      return generateCheckbox(props || {}, framework || 'css-only');
    case 'radio':
      return generateRadio(props || {}, framework || 'css-only');
    case 'switch':
      return generateSwitch(props || {}, framework || 'css-only');
    case 'slider':
      return generateSlider(props || {}, framework || 'css-only');
    case 'select':
      return generateSelect(props || {}, framework || 'css-only');
      
    // Navigation components
    case 'tabs':
      return generateTabs(props || {}, framework || 'css-only');
    case 'menu':
      return generateMenu(props || {}, framework || 'css-only');
    case 'navigation-bar':
      return generateNavigationBar(props || {}, framework || 'css-only');
    case 'breadcrumb':
      return generateBreadcrumb(props || {}, framework || 'css-only');
      
    // Feedback components
    case 'tooltip':
      return generateTooltip(props || {}, framework || 'css-only');
    case 'snackbar':
      return generateSnackbar(props || {}, framework || 'css-only');
    case 'progress':
      return generateProgress(props || {}, framework || 'css-only');
      
    // Data display components
    case 'list':
      return generateList(props || {}, framework || 'css-only');
    case 'table':
      return generateTable(props || {}, framework || 'css-only');
      
    // Layout components
    case 'fab':
      return generateFAB(props || {}, framework || 'css-only');
    case 'iconbutton':
      return generateIconButton(props || {}, framework || 'css-only');
    case 'accordion':
      return generateAccordion(props || {}, framework || 'css-only');
      
    // System components
    case 'focus':
      return generateFocus(props || {}, framework || 'css-only');
    case 'elevation':
      return generateElevation(props || {}, framework || 'css-only');
    case 'ripple':
      return generateRipple(props || {}, framework || 'css-only');
    case 'typography':
      return generateTypography(props || {}, framework || 'css-only');
    case 'icon':
      return generateIcon(props || {}, framework || 'css-only');
    case 'field':
      return generateField(props || {}, framework || 'css-only');
      
    default:
      throw new Error(`Modular generator does not support component type: ${type}`);
  }
}