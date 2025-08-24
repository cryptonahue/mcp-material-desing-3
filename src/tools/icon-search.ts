/**
 * Icon search functionality - Using complete Material Icons database
 */

import type { IconSearchOptions, ToolResult } from '../types/index.js';
import { logger } from '../utils/logger.js';
import { searchMaterialIcons, getIconByName, getIconStats } from '../resources/material-icons.js';

export async function searchIcons(options: IconSearchOptions): Promise<ToolResult> {
  logger.info(`Searching icons: ${options.query}`, { options });

  try {
    // Use the complete Material Icons database
    const icons = await searchMaterialIcons({
      query: options.query,
      category: options.category,
      style: options.style,
      limit: 50 // Reasonable limit for performance
    });

    // Transform to expected format
    const formattedIcons = icons.map(icon => ({
      name: icon.name,
      displayName: icon.displayName,
      category: icon.category,
      tags: icon.tags,
      styles: icon.styles,
      svg: icon.svg[options.style || 'filled'] || icon.svg[icon.styles[0]] || '',
      availableStyles: icon.styles
    }));
    
    return {
      success: true,
      data: {
        query: options.query,
        total: icons.length,
        icons: formattedIcons,
        stats: await getIconStats()
      },
      message: `Found ${icons.length} icons matching "${options.query}" from ${(await getIconStats()).totalIcons} total icons`,
    };
  } catch (error) {
    logger.error('Icon search failed:', error);
    return {
      success: false,
      message: `Failed to search icons: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Legacy code removed - now using complete Material Icons database from M3-icons.json