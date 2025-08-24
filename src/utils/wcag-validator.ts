/**
 * WCAG accessibility validation utilities for Material Design 3
 * Leverages @material/material-color-utilities for scientific contrast calculation
 */

import { Contrast } from '@material/material-color-utilities';

/**
 * WCAG contrast level requirements
 */
export const WCAG_LEVELS = {
  AA_NORMAL: 4.5,    // WCAG AA for normal text (under 18pt/24px)
  AA_LARGE: 3.0,     // WCAG AA for large text (18pt+/24px+ or 14pt+/18.5px+ bold)
  AAA_NORMAL: 7.0,   // WCAG AAA for normal text 
  AAA_LARGE: 4.5,    // WCAG AAA for large text
  MINIMUM: 3.0       // Absolute minimum for any interactive element
} as const;

/**
 * Text size categories for WCAG compliance
 */
export const TEXT_SIZES = {
  SMALL: 'small',      // < 18pt (24px) and not bold, < 14pt (18.5px) bold
  LARGE: 'large'       // >= 18pt (24px) or >= 14pt (18.5px) bold
} as const;

/**
 * WCAG compliance levels
 */
export const COMPLIANCE_LEVELS = {
  AA: 'AA',
  AAA: 'AAA'
} as const;

export interface ContrastValidationResult {
  ratio: number;
  passes: {
    AA_normal: boolean;
    AA_large: boolean;
    AAA_normal: boolean;
    AAA_large: boolean;
  };
  level: 'AAA' | 'AA' | 'FAIL';
  recommendation?: string;
}

export interface AccessibleColor {
  original: number;   // Original tone
  adjusted: number;   // WCAG-compliant tone
  ratio: number;      // Achieved contrast ratio
  method: 'lighter' | 'darker' | 'none';
}

/**
 * Validates contrast ratio between two tones and provides WCAG compliance info
 */
export function validateContrast(
  foregroundTone: number, 
  backgroundTone: number
): ContrastValidationResult {
  const ratio = Contrast.ratioOfTones(foregroundTone, backgroundTone);
  
  const passes = {
    AA_normal: ratio >= WCAG_LEVELS.AA_NORMAL,
    AA_large: ratio >= WCAG_LEVELS.AA_LARGE,
    AAA_normal: ratio >= WCAG_LEVELS.AAA_NORMAL,
    AAA_large: ratio >= WCAG_LEVELS.AAA_LARGE
  };

  let level: 'AAA' | 'AA' | 'FAIL';
  let recommendation: string | undefined;

  if (passes.AAA_normal) {
    level = 'AAA';
  } else if (passes.AA_normal) {
    level = 'AA';
  } else {
    level = 'FAIL';
    if (passes.AA_large) {
      recommendation = 'Use only for large text (18pt+/24px+ or 14pt+/18.5px+ bold)';
    } else if (passes.AAA_large || ratio >= WCAG_LEVELS.MINIMUM) {
      recommendation = 'Use only for decorative elements or adjust colors for better contrast';
    } else {
      recommendation = 'Colors fail all WCAG requirements. Adjust immediately.';
    }
  }

  return {
    ratio: Math.round(ratio * 100) / 100, // Round to 2 decimals
    passes,
    level,
    recommendation
  };
}

/**
 * Finds an accessible foreground color for a given background
 */
export function findAccessibleForeground(
  backgroundTone: number,
  targetRatio: number = WCAG_LEVELS.AA_NORMAL,
  preferDark: boolean = true
): AccessibleColor {
  const original = preferDark ? 20 : 80; // Start with preferred tone
  
  // Try darker first if preferred
  if (preferDark) {
    const darker = Contrast.darker(backgroundTone, targetRatio);
    if (darker !== -1) {
      return {
        original,
        adjusted: darker,
        ratio: Contrast.ratioOfTones(darker, backgroundTone),
        method: 'darker'
      };
    }
  }
  
  // Try lighter
  const lighter = Contrast.lighter(backgroundTone, targetRatio);
  if (lighter !== -1) {
    return {
      original,
      adjusted: lighter,
      ratio: Contrast.ratioOfTones(lighter, backgroundTone),
      method: 'lighter'
    };
  }
  
  // Try darker if we haven't yet
  if (!preferDark) {
    const darker = Contrast.darker(backgroundTone, targetRatio);
    if (darker !== -1) {
      return {
        original,
        adjusted: darker,
        ratio: Contrast.ratioOfTones(darker, backgroundTone),
        method: 'darker'
      };
    }
  }
  
  // Fallback to unsafe methods
  const lighterUnsafe = Contrast.lighterUnsafe(backgroundTone, targetRatio);
  const darkerUnsafe = Contrast.darkerUnsafe(backgroundTone, targetRatio);
  
  const lighterRatio = Contrast.ratioOfTones(lighterUnsafe, backgroundTone);
  const darkerRatio = Contrast.ratioOfTones(darkerUnsafe, backgroundTone);
  
  // Choose the one that gets closer to target ratio
  if (lighterRatio >= darkerRatio) {
    return {
      original,
      adjusted: lighterUnsafe,
      ratio: lighterRatio,
      method: 'lighter'
    };
  } else {
    return {
      original,
      adjusted: darkerUnsafe,
      ratio: darkerRatio,
      method: 'darker'
    };
  }
}

/**
 * Validates if a color combination is suitable for different text sizes
 */
export function validateForTextSize(
  foregroundTone: number,
  backgroundTone: number,
  fontSize: number = 16,
  isBold: boolean = false
): {
  isAccessible: boolean;
  textSizeCategory: 'small' | 'large';
  wcagLevel: 'AAA' | 'AA' | 'FAIL';
  requiredRatio: number;
} {
  // Determine if text is considered "large" by WCAG standards
  const isLargeText = fontSize >= 24 || (fontSize >= 18.5 && isBold);
  const textSizeCategory = isLargeText ? TEXT_SIZES.LARGE : TEXT_SIZES.SMALL;
  
  const validation = validateContrast(foregroundTone, backgroundTone);
  const requiredRatio = isLargeText ? WCAG_LEVELS.AA_LARGE : WCAG_LEVELS.AA_NORMAL;
  
  const isAccessible = isLargeText ? 
    validation.passes.AA_large : 
    validation.passes.AA_normal;
  
  return {
    isAccessible,
    textSizeCategory,
    wcagLevel: validation.level,
    requiredRatio
  };
}

/**
 * Generates accessibility report for a color scheme
 */
export function generateAccessibilityReport(scheme: {
  primary: number;
  onPrimary: number;
  secondary: number;
  onSecondary: number;
  surface: number;
  onSurface: number;
  background: number;
  onBackground: number;
  error: number;
  onError: number;
}): {
  overallRating: 'AAA' | 'AA' | 'FAIL';
  combinations: Array<{
    name: string;
    foreground: number;
    background: number;
    validation: ContrastValidationResult;
  }>;
  recommendations: string[];
} {
  const combinations = [
    { name: 'Primary/OnPrimary', foreground: scheme.onPrimary, background: scheme.primary },
    { name: 'Secondary/OnSecondary', foreground: scheme.onSecondary, background: scheme.secondary },
    { name: 'Surface/OnSurface', foreground: scheme.onSurface, background: scheme.surface },
    { name: 'Background/OnBackground', foreground: scheme.onBackground, background: scheme.background },
    { name: 'Error/OnError', foreground: scheme.onError, background: scheme.error }
  ].map(combo => ({
    ...combo,
    validation: validateContrast(combo.foreground, combo.background)
  }));

  const levels = combinations.map(c => c.validation.level);
  const hasAAA = levels.every(level => level === 'AAA');
  const hasAA = levels.every(level => level === 'AAA' || level === 'AA');
  
  const overallRating: 'AAA' | 'AA' | 'FAIL' = hasAAA ? 'AAA' : hasAA ? 'AA' : 'FAIL';
  
  const recommendations: string[] = [];
  
  combinations.forEach(combo => {
    if (combo.validation.level === 'FAIL' && combo.validation.recommendation) {
      recommendations.push(`${combo.name}: ${combo.validation.recommendation}`);
    }
  });
  
  if (recommendations.length === 0 && overallRating === 'AA') {
    recommendations.push('All combinations pass WCAG AA. Consider improving to AAA for enhanced accessibility.');
  }
  
  if (recommendations.length === 0 && overallRating === 'AAA') {
    recommendations.push('Excellent! All combinations pass WCAG AAA standards.');
  }

  return {
    overallRating,
    combinations,
    recommendations
  };
}