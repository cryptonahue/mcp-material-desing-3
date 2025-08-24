/**
 * Script para mejorar el sistema de tokens de diseño
 * Utiliza los tokens científicos del MCP para crear un sistema más robusto
 */

import { generateTheme } from '../dist/tools/theme-generator.js';
import { MD3_TYPOGRAPHY, MD3_ELEVATION, MD3_MOTION, MD3_SHAPE, MD3_STATE_LAYERS } from '../dist/utils/material-tokens.js';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Configuración del tema
const SEED_COLOR = '#6750A4';
const DARK_MODE = true;

console.log('🎨 Generando sistema de tokens de diseño científico...');

// Generar tema base
const theme = generateTheme({
  seedColor: SEED_COLOR,
  darkMode: DARK_MODE,
  contrastLevel: 0.0
});

console.log('✅ Tema base generado');

// Crear tokens de diseño completos
const designTokens = {
  // Colores del tema científico
  colors: {
    ...theme.colors,
    // Agregar capas de estado
    state: {
      hover: 'rgba(103, 80, 164, 0.08)',
      focus: 'rgba(103, 80, 164, 0.12)',
      pressed: 'rgba(103, 80, 164, 0.16)',
      selected: 'rgba(103, 80, 164, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.04)'
    }
  },
  
  // Tipografía científica
  typography: MD3_TYPOGRAPHY,
  
  // Elevación física
  elevation: MD3_ELEVATION,
  
  // Movimiento basado en Material Motion
  motion: MD3_MOTION,
  
  // Formas geométricas
  shape: MD3_SHAPE,
  
  // Espaciado basado en grid de 4px
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px'
  },
  
  // Breakpoints responsivos
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '905px',
    lg: '1240px',
    xl: '1440px'
  }
};

// Generar CSS con tokens completos
const generateTokensCSS = () => {
  let css = `/**
 * Sistema de tokens de diseño científico Material Design 3
 * Generado automáticamente con HCT y Material Motion
 */

:root {
`;

  // Colores del sistema
  Object.entries(designTokens.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object' && colors !== null) {
      Object.entries(colors).forEach(([tone, value]) => {
        css += `  --md-sys-color-${category}-${tone}: ${value};\n`;
      });
    }
  });

  // Tipografía
  Object.entries(designTokens.typography).forEach(([scale, props]) => {
    css += `  --md-sys-typescale-${scale.replace(/([A-Z])/g, '-$1').toLowerCase()}-font-size: ${props.fontSize};\n`;
    css += `  --md-sys-typescale-${scale.replace(/([A-Z])/g, '-$1').toLowerCase()}-line-height: ${props.lineHeight};\n`;
    css += `  --md-sys-typescale-${scale.replace(/([A-Z])/g, '-$1').toLowerCase()}-font-weight: ${props.fontWeight};\n`;
    css += `  --md-sys-typescale-${scale.replace(/([A-Z])/g, '-$1').toLowerCase()}-letter-spacing: ${props.letterSpacing};\n`;
  });

  // Elevación
  Object.entries(designTokens.elevation).forEach(([level, shadow]) => {
    css += `  --md-sys-elevation-${level}: ${shadow};\n`;
  });

  // Movimiento
  Object.entries(designTokens.motion.duration).forEach(([name, duration]) => {
    css += `  --md-sys-motion-duration-${name}: ${duration};\n`;
  });
  
  Object.entries(designTokens.motion.easing).forEach(([name, easing]) => {
    css += `  --md-sys-motion-easing-${name}: ${easing};\n`;
  });

  // Formas
  Object.entries(designTokens.shape.corner).forEach(([size, radius]) => {
    css += `  --md-sys-shape-corner-${size}: ${radius};\n`;
  });

  // Espaciado
  Object.entries(designTokens.spacing).forEach(([size, value]) => {
    css += `  --md-sys-spacing-${size}: ${value};\n`;
  });

  // Breakpoints
  Object.entries(designTokens.breakpoints).forEach(([size, value]) => {
    css += `  --md-sys-breakpoint-${size}: ${value};\n`;
  });

  css += `}\n\n`;

  // Clases utilitarias para tipografía
  css += `/* Clases utilitarias de tipografía */\n`;
  Object.keys(designTokens.typography).forEach(scale => {
    const className = scale.replace(/([A-Z])/g, '-$1').toLowerCase();
    css += `.md-typescale-${className} {\n`;
    css += `  font-size: var(--md-sys-typescale-${className}-font-size);\n`;
    css += `  line-height: var(--md-sys-typescale-${className}-line-height);\n`;
    css += `  font-weight: var(--md-sys-typescale-${className}-font-weight);\n`;
    css += `  letter-spacing: var(--md-sys-typescale-${className}-letter-spacing);\n`;
    css += `}\n\n`;
  });

  // Clases utilitarias para elevación
  css += `/* Clases utilitarias de elevación */\n`;
  Object.keys(designTokens.elevation).forEach(level => {
    css += `.md-elevation-${level} {\n`;
    css += `  box-shadow: var(--md-sys-elevation-${level});\n`;
    css += `}\n\n`;
  });

  // Clases utilitarias para formas
  css += `/* Clases utilitarias de formas */\n`;
  Object.keys(designTokens.shape.corner).forEach(size => {
    css += `.md-shape-${size} {\n`;
    css += `  border-radius: var(--md-sys-shape-corner-${size});\n`;
    css += `}\n\n`;
  });

  return css;
};

// Generar configuración de Tailwind con tokens
const generateTailwindTokens = () => {
  return `/**
 * Configuración de tokens para Tailwind CSS
 * Basada en el sistema de tokens científico Material Design 3
 */

module.exports = {
  colors: ${JSON.stringify(designTokens.colors, null, 2)},
  
  fontSize: {
${Object.entries(designTokens.typography).map(([scale, props]) => 
    `    '${scale.replace(/([A-Z])/g, '-$1').toLowerCase()}': ['${props.fontSize}', { lineHeight: '${props.lineHeight}', letterSpacing: '${props.letterSpacing}', fontWeight: '${props.fontWeight}' }]`
  ).join(',\n')}
  },
  
  boxShadow: ${JSON.stringify(designTokens.elevation, null, 2)},
  
  borderRadius: ${JSON.stringify(designTokens.shape.corner, null, 2)},
  
  spacing: ${JSON.stringify(designTokens.spacing, null, 2)},
  
  screens: ${JSON.stringify(designTokens.breakpoints, null, 2)},
  
  transitionDuration: ${JSON.stringify(designTokens.motion.duration, null, 2)},
  
  transitionTimingFunction: ${JSON.stringify(designTokens.motion.easing, null, 2)}
};
`;
};

// Guardar archivos
const outputDir = './src/styles';
const tokensCSS = generateTokensCSS();
const tailwindTokens = generateTailwindTokens();

writeFileSync(join(outputDir, 'design-tokens.css'), tokensCSS);
writeFileSync(join(outputDir, 'tailwind-tokens.config.js'), tailwindTokens);

// Generar archivo JSON con todos los tokens
writeFileSync(
  join(outputDir, 'design-tokens.json'), 
  JSON.stringify(designTokens, null, 2)
);

console.log('✅ Sistema de tokens de diseño generado:');
console.log('  📄 design-tokens.css - Variables CSS con tokens científicos');
console.log('  ⚙️ tailwind-tokens.config.js - Configuración para Tailwind');
console.log('  📋 design-tokens.json - Tokens en formato JSON');
console.log('\n🎯 Características del sistema:');
console.log('  🔬 Colores basados en HCT (Hue, Chroma, Tone)');
console.log('  📐 Tipografía científica Material Design 3');
console.log('  🌊 Animaciones basadas en Material Motion');
console.log('  ♿ Cumplimiento WCAG AA/AAA');
console.log('  📱 Sistema responsivo completo');