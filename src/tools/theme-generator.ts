/**
 * Theme generation logic using Material Design 3 HCT color science
 */

import type { ThemeGenerationOptions, ToolResult } from '../types/index.js';
import { logger } from '../utils/logger.js';
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
  Scheme,
  Hct,
} from '@material/material-color-utilities';
import { generateAccessibilityReport } from '../utils/wcag-validator.js';

export async function generateTheme(options: ThemeGenerationOptions): Promise<ToolResult> {
  logger.info(`Generating theme from seed color: ${options.seedColor}`, { options });

  try {
    const theme = await generateThemeFromSeed(options);
    
    return {
      success: true,
      data: theme,
      code: theme.css,
      message: `Generated theme "${options.name || 'custom'}" successfully`,
    };
  } catch (error) {
    logger.error('Theme generation failed:', error);
    return {
      success: false,
      message: `Failed to generate theme: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

interface GeneratedTheme {
  name: string;
  seedColor: string;
  css: string;
  tailwind?: string;
  palette: {
    primary: string[];
    secondary: string[];
    tertiary: string[];
    neutral: string[];
  };
  accessibility: {
    wcagCompliance: 'AAA' | 'AA' | 'FAIL';
    lightTheme: any;
    darkTheme: any;
    recommendations: string[];
  };
}

async function generateThemeFromSeed(options: ThemeGenerationOptions): Promise<GeneratedTheme> {
  const { seedColor, name = 'custom', darkMode, outputFormat } = options;
  
  // Convert hex seed color to ARGB for Material Color Utilities
  const sourceColorArgb = argbFromHex(seedColor);
  
  // Generate Material Design 3 theme using scientific HCT algorithm
  const materialTheme = themeFromSourceColor(sourceColorArgb);
  
  const themeName = name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  // Extract palettes from the scientifically generated theme
  const palette = extractMaterialPalettes(materialTheme);
  
  // Generate CSS using the scientific color scheme
  const css = generateMaterialThemeCSS(themeName, materialTheme, darkMode);
  
  // Generate Tailwind config if needed
  const tailwind = outputFormat === 'tailwind' || outputFormat === 'both' 
    ? generateMaterialTailwindConfig(themeName, palette)
    : undefined;

  // Generate WCAG accessibility reports
  // Convert ARGB colors to HCT tones for accessibility validation
  const lightAccessibility = generateAccessibilityReport({
    primary: Hct.fromInt(materialTheme.schemes.light.primary).tone,
    onPrimary: Hct.fromInt(materialTheme.schemes.light.onPrimary).tone,
    secondary: Hct.fromInt(materialTheme.schemes.light.secondary).tone,
    onSecondary: Hct.fromInt(materialTheme.schemes.light.onSecondary).tone,
    surface: Hct.fromInt(materialTheme.schemes.light.surface).tone,
    onSurface: Hct.fromInt(materialTheme.schemes.light.onSurface).tone,
    background: Hct.fromInt(materialTheme.schemes.light.background).tone,
    onBackground: Hct.fromInt(materialTheme.schemes.light.onBackground).tone,
    error: Hct.fromInt(materialTheme.schemes.light.error).tone,
    onError: Hct.fromInt(materialTheme.schemes.light.onError).tone
  });
  
  const darkAccessibility = generateAccessibilityReport({
    primary: Hct.fromInt(materialTheme.schemes.dark.primary).tone,
    onPrimary: Hct.fromInt(materialTheme.schemes.dark.onPrimary).tone,
    secondary: Hct.fromInt(materialTheme.schemes.dark.secondary).tone,
    onSecondary: Hct.fromInt(materialTheme.schemes.dark.onSecondary).tone,
    surface: Hct.fromInt(materialTheme.schemes.dark.surface).tone,
    onSurface: Hct.fromInt(materialTheme.schemes.dark.onSurface).tone,
    background: Hct.fromInt(materialTheme.schemes.dark.background).tone,
    onBackground: Hct.fromInt(materialTheme.schemes.dark.onBackground).tone,
    error: Hct.fromInt(materialTheme.schemes.dark.error).tone,
    onError: Hct.fromInt(materialTheme.schemes.dark.onError).tone
  });

  // Determine overall WCAG compliance (worst of both themes)
  const overallCompliance = lightAccessibility.overallRating === 'FAIL' || darkAccessibility.overallRating === 'FAIL' 
    ? 'FAIL' 
    : lightAccessibility.overallRating === 'AA' || darkAccessibility.overallRating === 'AA' 
    ? 'AA' 
    : 'AAA';

  // Combine recommendations from both themes
  const allRecommendations = [
    ...lightAccessibility.recommendations.map(rec => `Light theme: ${rec}`),
    ...darkAccessibility.recommendations.map(rec => `Dark theme: ${rec}`)
  ];

  return {
    name: themeName,
    seedColor,
    css,
    tailwind,
    palette,
    accessibility: {
      wcagCompliance: overallCompliance,
      lightTheme: lightAccessibility,
      darkTheme: darkAccessibility,
      recommendations: allRecommendations
    }
  };
}

function extractMaterialPalettes(materialTheme: any): GeneratedTheme['palette'] {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  
  return {
    primary: tones.map(tone => hexFromArgb(materialTheme.palettes.primary.tone(tone))),
    secondary: tones.map(tone => hexFromArgb(materialTheme.palettes.secondary.tone(tone))),
    tertiary: tones.map(tone => hexFromArgb(materialTheme.palettes.tertiary.tone(tone))),
    neutral: tones.map(tone => hexFromArgb(materialTheme.palettes.neutral.tone(tone))),
  };
}

function generateMaterialThemeCSS(name: string, materialTheme: any, darkMode?: boolean): string {
  const lightScheme = materialTheme.schemes.light;
  const darkScheme = materialTheme.schemes.dark;
  
  // Generate all tonal palette variables
  const paletteCSS = generatePaletteVariables(materialTheme.palettes);
  
  // Generate light theme variables using Material Design 3 scientific color roles
  const lightSystemColors = generateSystemColorVariables(lightScheme, 'light');
  
  let css = `:root {
  /* ${name} theme - Tonal Palettes (Scientific HCT) */
${paletteCSS}

  /* Light Theme - System Color Assignments */
${lightSystemColors}
}

/* Theme selector class */
.theme-${name} {
  /* Apply this theme */
}`;

  // Add dark theme if requested
  if (darkMode) {
    const darkSystemColors = generateSystemColorVariables(darkScheme, 'dark');
    css += `

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root {
${darkSystemColors}
  }
}

[data-theme="${name}-dark"] {
${darkSystemColors}
}`;
  }

  return css;
}

function generatePaletteVariables(palettes: any): string {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  let css = '';
  
  const paletteNames = ['primary', 'secondary', 'tertiary', 'neutral', 'neutralVariant', 'error'];
  
  for (const paletteName of paletteNames) {
    if (palettes[paletteName]) {
      css += `\n  /* ${paletteName.charAt(0).toUpperCase() + paletteName.slice(1)} Tones */\n`;
      for (const tone of tones) {
        const color = hexFromArgb(palettes[paletteName].tone(tone));
        css += `  --md-sys-color-${paletteName}-${tone}: ${color};\n`;
      }
    }
  }
  
  return css;
}

function generateSystemColorVariables(scheme: Scheme, mode: 'light' | 'dark'): string {
  const systemColors = {
    // Primary colors
    'primary': scheme.primary,
    'on-primary': scheme.onPrimary,
    'primary-container': scheme.primaryContainer,
    'on-primary-container': scheme.onPrimaryContainer,
    
    // Secondary colors  
    'secondary': scheme.secondary,
    'on-secondary': scheme.onSecondary,
    'secondary-container': scheme.secondaryContainer,
    'on-secondary-container': scheme.onSecondaryContainer,
    
    // Tertiary colors
    'tertiary': scheme.tertiary,
    'on-tertiary': scheme.onTertiary,
    'tertiary-container': scheme.tertiaryContainer,
    'on-tertiary-container': scheme.onTertiaryContainer,
    
    // Surface colors
    'surface': scheme.surface,
    'on-surface': scheme.onSurface,
    'surface-variant': scheme.surfaceVariant,
    'on-surface-variant': scheme.onSurfaceVariant,
    
    // Background colors
    'background': scheme.background,
    'on-background': scheme.onBackground,
    
    // Error colors
    'error': scheme.error,
    'on-error': scheme.onError,
    'error-container': scheme.errorContainer,
    'on-error-container': scheme.onErrorContainer,
    
    // Outline colors
    'outline': scheme.outline,
    'outline-variant': scheme.outlineVariant,
    
    // Other colors
    'inverse-surface': scheme.inverseSurface,
    'inverse-on-surface': scheme.inverseOnSurface,
    'inverse-primary': scheme.inversePrimary,
    'shadow': scheme.shadow,
    'scrim': scheme.scrim,
  };
  
  let css = '';
  for (const [colorName, colorValue] of Object.entries(systemColors)) {
    css += `    --md-sys-color-${colorName}: ${hexFromArgb(colorValue)};\n`;
  }
  
  return css;
}

function generateMaterialTailwindConfig(name: string, palette: GeneratedTheme['palette']): string {
  const tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
  
  return `// Tailwind CSS theme extension for ${name} (Material Design 3 Scientific)
module.exports = {
  theme: {
    extend: {
      colors: {
        'md-primary': {
${tones.map((tone, i) => `          ${tone}: '${palette.primary[i]}',`).join('\n')}
          DEFAULT: '${palette.primary[4]}', // tone 40
        },
        'md-secondary': {
${tones.map((tone, i) => `          ${tone}: '${palette.secondary[i]}',`).join('\n')}
          DEFAULT: '${palette.secondary[4]}', // tone 40
        },
        'md-tertiary': {
${tones.map((tone, i) => `          ${tone}: '${palette.tertiary[i]}',`).join('\n')}
          DEFAULT: '${palette.tertiary[4]}', // tone 40
        },
        'md-neutral': {
${tones.map((tone, i) => `          ${tone}: '${palette.neutral[i]}',`).join('\n')}
          DEFAULT: '${palette.neutral[6]}', // tone 50
        },
      },
    },
  },
};`;
}