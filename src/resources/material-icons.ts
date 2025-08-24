/**
 * Material Icons Database - Efficient Loading and Search
 * Handles 2200+ Material Design Icons with lazy loading and caching
 */

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

interface MaterialIconData {
  displayName: string;
  iconName: string;
  category: string;
  styles: {
    materialicons?: { svg: string };
    materialiconsoutlined?: { svg: string };
    materialiconsround?: { svg: string };
    materialiconssharp?: { svg: string };
    materialiconstwotone?: { svg: string };
  };
  searchTerms: string[];
  keywords: string[];
  categoryInfo: {
    name: string;
  };
}

interface MaterialIconsDatabase {
  icons: MaterialIconData[];
}

export interface ProcessedIcon {
  name: string;
  displayName: string;
  category: string;
  tags: string[];
  styles: string[];
  svg: Record<string, string>;
}

// Cache for loaded icons - lazy loading
let iconsCache: ProcessedIcon[] | null = null;
let loadingPromise: Promise<ProcessedIcon[]> | null = null;

// Style mapping for consistency with existing API
const STYLE_MAPPING = {
  'materialicons': 'filled',
  'materialiconsoutlined': 'outlined', 
  'materialiconsround': 'round',
  'materialiconssharp': 'sharp',
  'materialiconstwotone': 'two-tone'
} as const;

/**
 * Loads and processes all Material Icons from M3-icons.json
 * Uses lazy loading and caching for performance
 */
export async function loadMaterialIcons(): Promise<ProcessedIcon[]> {
  // Return cached icons if available
  if (iconsCache) {
    return iconsCache;
  }

  // Return existing loading promise if in progress
  if (loadingPromise) {
    return loadingPromise;
  }

  // Start loading process
  loadingPromise = loadAndProcessIcons();
  return loadingPromise;
}

async function loadAndProcessIcons(): Promise<ProcessedIcon[]> {
  try {
    logger.info('Loading Material Icons database...');
    const startTime = Date.now();

    // Get the path to M3-icons.json - always relative to project root
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const iconsPath = path.resolve(__dirname, '../../M3-icons.json');
    logger.info(`Attempting to load icons from: ${iconsPath}`);
    
    // Read and parse JSON file
    const rawData = await fs.readFile(iconsPath, 'utf-8');
    const database: MaterialIconsDatabase = JSON.parse(rawData);

    // Process icons for efficient searching
    const processedIcons: ProcessedIcon[] = database.icons.map(icon => {
      // Extract available styles and their SVGs
      const styles: string[] = [];
      const svg: Record<string, string> = {};

      for (const [originalStyle, data] of Object.entries(icon.styles)) {
        if (data?.svg) {
          const mappedStyle = STYLE_MAPPING[originalStyle as keyof typeof STYLE_MAPPING];
          if (mappedStyle) {
            styles.push(mappedStyle);
            svg[mappedStyle] = data.svg;
          }
        }
      }

      // Combine all searchable terms
      const tags = [
        ...icon.searchTerms,
        ...icon.keywords,
        icon.displayName.toLowerCase(),
        icon.iconName.toLowerCase(),
        icon.category.toLowerCase(),
        icon.categoryInfo.name.toLowerCase()
      ].filter(Boolean);

      return {
        name: icon.iconName,
        displayName: icon.displayName,
        category: icon.category,
        tags: [...new Set(tags)], // Remove duplicates
        styles,
        svg
      };
    });

    // Cache the processed icons
    iconsCache = processedIcons;
    
    const loadTime = Date.now() - startTime;
    logger.info(`Material Icons loaded: ${processedIcons.length} icons in ${loadTime}ms`);

    return processedIcons;
  } catch (error) {
    logger.error('Failed to load Material Icons database:', error);
    
    // Reset loading state on error
    loadingPromise = null;
    
    // Return fallback to original subset
    return getFallbackIcons();
  }
}

/**
 * Search icons efficiently with multiple filters
 */
export async function searchMaterialIcons(options: {
  query?: string;
  category?: string;
  style?: string;
  limit?: number;
}): Promise<ProcessedIcon[]> {
  const icons = await loadMaterialIcons();
  const { query, category, style, limit = 50 } = options;

  let results = icons;

  // Filter by search query (name or tags)
  if (query) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm) ||
      icon.displayName.toLowerCase().includes(searchTerm) ||
      icon.tags.some(tag => tag.includes(searchTerm))
    );
  }

  // Filter by category
  if (category) {
    results = results.filter(icon => 
      icon.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by style availability
  if (style) {
    results = results.filter(icon => 
      icon.styles.includes(style)
    );
  }

  // Limit results for performance
  return results.slice(0, limit);
}

/**
 * Get icon by exact name
 */
export async function getIconByName(name: string): Promise<ProcessedIcon | null> {
  const icons = await loadMaterialIcons();
  return icons.find(icon => icon.name === name) || null;
}

/**
 * Get available categories
 */
export async function getIconCategories(): Promise<string[]> {
  const icons = await loadMaterialIcons();
  const categories = new Set(icons.map(icon => icon.category));
  return Array.from(categories).sort();
}

/**
 * Get icons count and stats
 */
export async function getIconStats(): Promise<{
  totalIcons: number;
  categories: number;
  stylesAvailable: string[];
}> {
  const icons = await loadMaterialIcons();
  const allStyles = new Set<string>();
  
  icons.forEach(icon => {
    icon.styles.forEach(style => allStyles.add(style));
  });

  return {
    totalIcons: icons.length,
    categories: (await getIconCategories()).length,
    stylesAvailable: Array.from(allStyles).sort()
  };
}

/**
 * Fallback icons in case M3-icons.json fails to load
 */
function getFallbackIcons(): ProcessedIcon[] {
  return [
    {
      name: 'home',
      displayName: 'Home',
      category: 'action',
      tags: ['house', 'main', 'start', 'home'],
      styles: ['filled', 'outlined', 'round', 'sharp'],
      svg: {
        filled: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
        outlined: '<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>',
        round: '<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>',
        sharp: '<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>'
      }
    },
    {
      name: 'search',
      displayName: 'Search',
      category: 'action',
      tags: ['find', 'look', 'magnify', 'search'],
      styles: ['filled', 'outlined', 'round', 'sharp'],
      svg: {
        filled: '<path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 13 15.5v-.17l.27-.28h.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
        outlined: '<path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 13 15.5v-.17l.27-.28h.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
        round: '<path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 13 15.5v-.17l.27-.28h.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
        sharp: '<path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 13 15.5v-.17l.27-.28h.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
      }
    }
  ];
}