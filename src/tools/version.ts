/**
 * Version information tool for Material Tailwind MCP
 */

import type { ToolResult } from '../types/index.js';
import { logger } from '../utils/logger.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface VersionInfo {
  version: string;
  name: string;
  description: string;
  buildDate: string;
  features: {
    scientificHCT: boolean;
    componentCount: number;
    toolCount: number;
    materialDesignVersion: string;
  };
  dependencies: {
    materialColorUtilities: string;
    mcpSdk: string;
    zod: string;
    typescript: string;
  };
  capabilities: string[];
  changelog: {
    latest: string;
    major: string[];
  };
}

export async function getVersion(): Promise<ToolResult> {
  logger.info('Getting MCP version information');

  try {
    const versionInfo = await getVersionInfo();
    
    return {
      success: true,
      data: versionInfo,
      message: `Material Tailwind MCP v${versionInfo.version} - ${versionInfo.description}`,
    };
  } catch (error) {
    logger.error('Failed to get version info:', error);
    return {
      success: false,
      message: `Failed to get version: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function getVersionInfo(): Promise<VersionInfo> {
  // Read package.json for version info
  const packageJsonPath = join(__dirname, '../../package.json');
  let packageInfo;
  
  try {
    const packageJson = readFileSync(packageJsonPath, 'utf-8');
    packageInfo = JSON.parse(packageJson);
  } catch (error) {
    packageInfo = {
      version: '0.1.0',
      name: 'material-tailwind-mcp',
      description: 'Material Design 3 + Tailwind CSS MCP'
    };
  }

  return {
    version: packageInfo.version,
    name: packageInfo.name,
    description: packageInfo.description,
    buildDate: new Date().toISOString().split('T')[0], // Current date as build date
    features: {
      scientificHCT: true, // ⭐ NEW: Scientific HCT algorithm implemented
      componentCount: 5, // Button, Card, Checkbox, Dialog, Select
      toolCount: 6, // generate_component, generate_theme, search_icons, create_layout, get_component_info, get_version
      materialDesignVersion: '3.0'
    },
    dependencies: {
      materialColorUtilities: packageInfo.dependencies?.['@material/material-color-utilities'] || 'unknown',
      mcpSdk: packageInfo.dependencies?.['@modelcontextprotocol/sdk'] || 'unknown',
      zod: packageInfo.dependencies?.['zod'] || 'unknown',
      typescript: packageInfo.devDependencies?.['typescript'] || 'unknown'
    },
    capabilities: [
      'Scientific HCT Color Generation',
      'Material Design 3 Components',
      'Tailwind CSS Integration',
      'Alpine.js Support',
      'Icon Search (Material Design)',
      'Responsive Layout Generation',
      'Light/Dark Theme Support',
      'CSS & Tailwind Output',
      'Component Information Lookup',
      'Real-time Component Preview'
    ],
    changelog: {
      latest: 'Implemented scientific HCT algorithm for accurate Material Design 3 colors',
      major: [
        'v0.1.0 - Initial MCP implementation with 5 tools and scientific HCT',
        'v0.1.0 - Added Material Design 3 component library',
        'v0.1.0 - Integrated @material/material-color-utilities',
        'v0.1.0 - Scientific color validation and testing'
      ]
    }
  };
}