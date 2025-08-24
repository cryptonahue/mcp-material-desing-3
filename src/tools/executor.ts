/**
 * Tool execution logic
 */

import { GenerateComponentSchema, ThemeGenerationSchema, IconSearchSchema, LayoutGenerationSchema } from '../types/index.js';
import { generateModularComponent } from './modular-generator.js';
import { generateTheme } from './theme-generator.js';
import { searchIcons } from './icon-search.js';
import { createLayout } from './layout-generator.js';
import { getComponentInfo } from './component-info.js';
import { getVersion } from './version.js';
import { logger } from '../utils/logger.js';
import type { ToolResult } from '../types/index.js';

export async function executeToolCall(name: string, args: any): Promise<ToolResult> {
  logger.debug(`Executing tool: ${name}`, { args });

  try {
    switch (name) {
      case 'generate_component': {
        const options = GenerateComponentSchema.parse(args);
        return await generateModularComponent(options);
      }

      case 'generate_theme': {
        const options = ThemeGenerationSchema.parse(args);
        return await generateTheme(options);
      }

      case 'search_icons': {
        const options = IconSearchSchema.parse(args);
        return await searchIcons(options);
      }

      case 'create_layout': {
        const options = LayoutGenerationSchema.parse(args);
        return await createLayout(options);
      }

      case 'get_component_info': {
        const { component } = args;
        return await getComponentInfo(component);
      }

      case 'get_version': {
        return await getVersion();
      }

      default:
        return {
          success: false,
          message: `Unknown tool: ${name}`,
        };
    }
  } catch (error) {
    logger.error(`Error in tool ${name}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}