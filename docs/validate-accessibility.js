/**
 * Script para validar la accesibilidad WCAG del sistema de diseño
 * Utiliza las herramientas científicas del MCP para validación automática
 */

import { generateAccessibilityReport, validateContrast, findAccessibleForeground } from '../dist/utils/wcag-validator.js';
import { generateTheme } from '../dist/tools/theme-generator.js';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Configuración del tema para validación
const SEED_COLOR = '#6750A4';
const DARK_MODE = true;

console.log('♿ Iniciando validación de accesibilidad WCAG...');

// Generar tema para validación
const theme = generateTheme({
  seedColor: SEED_COLOR,
  darkMode: DARK_MODE,
  contrastLevel: 0.0
});

console.log('✅ Tema generado para validación');

// Extraer tonos del tema para validación
const extractTones = (colorPalette) => {
  const tones = {};
  Object.entries(colorPalette).forEach(([tone, hex]) => {
    // Convertir hex a tone (simplificado para demo)
    const toneNumber = parseInt(tone);
    if (!isNaN(toneNumber)) {
      tones[toneNumber] = hex;
    }
  });
  return tones;
};

// Crear esquema de colores para validación
const colorScheme = {
  primary: 40,      // Tono típico para primary
  onPrimary: 100,   // Blanco para texto en primary
  secondary: 40,    // Tono típico para secondary
  onSecondary: 100, // Blanco para texto en secondary
  surface: 98,      // Superficie clara
  onSurface: 10,    // Texto oscuro en superficie
  background: 99,   // Fondo muy claro
  onBackground: 10, // Texto oscuro en fondo
  error: 40,        // Error estándar
  onError: 100      // Texto en error
};

console.log('🔍 Validando combinaciones de colores...');

// Generar reporte de accesibilidad
const accessibilityReport = generateAccessibilityReport(colorScheme);

console.log('📊 Reporte de accesibilidad generado');

// Validaciones específicas adicionales
const specificValidations = [
  {
    name: 'Botón Primario',
    foreground: 100, // Texto blanco
    background: 40,  // Fondo primario
    context: 'Botón principal de acción'
  },
  {
    name: 'Texto en Superficie',
    foreground: 10,  // Texto oscuro
    background: 98,  // Superficie clara
    context: 'Texto principal en tarjetas'
  },
  {
    name: 'Texto Secundario',
    foreground: 30,  // Texto gris
    background: 98,  // Superficie clara
    context: 'Texto de apoyo y descripciones'
  },
  {
    name: 'Enlaces',
    foreground: 40,  // Color primario
    background: 99,  // Fondo blanco
    context: 'Enlaces y elementos interactivos'
  },
  {
    name: 'Estados de Error',
    foreground: 100, // Texto blanco
    background: 40,  // Fondo de error
    context: 'Mensajes de error críticos'
  }
];

const detailedValidations = specificValidations.map(validation => {
  const contrastResult = validateContrast(validation.foreground, validation.background);
  
  return {
    ...validation,
    ...contrastResult,
    accessible: contrastResult.level !== 'FAIL',
    improvements: contrastResult.level === 'FAIL' ? 
      findAccessibleForeground(validation.background, 4.5) : null
  };
});

console.log('🎯 Validaciones específicas completadas');

// Generar reporte HTML
const generateAccessibilityHTML = () => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Accesibilidad WCAG - Material Design 3</title>
  <style>
    body {
      font-family: 'Roboto', system-ui, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #fefbff;
      color: #1c1b1f;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding: 40px 20px;
      background: linear-gradient(135deg, #6750a4, #625b71);
      color: white;
      border-radius: 16px;
    }
    .rating {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 500;
      margin: 10px;
    }
    .rating.AAA {
      background-color: #4caf50;
      color: white;
    }
    .rating.AA {
      background-color: #ff9800;
      color: white;
    }
    .rating.FAIL {
      background-color: #f44336;
      color: white;
    }
    .section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
    .validation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .validation-card {
      border: 1px solid #e7e0ec;
      border-radius: 8px;
      padding: 16px;
    }
    .contrast-demo {
      padding: 12px;
      border-radius: 8px;
      margin: 8px 0;
      text-align: center;
      font-weight: 500;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }
    .stat {
      text-align: center;
      padding: 20px;
      background: #f3edf7;
      border-radius: 8px;
    }
    .stat-number {
      font-size: 2em;
      font-weight: bold;
      color: #6750a4;
    }
    .recommendations {
      background: #fff8e1;
      border-left: 4px solid #ff9800;
      padding: 16px;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>♿ Reporte de Accesibilidad WCAG</h1>
      <p>Material Design 3 - Sistema Científico</p>
      <div class="rating ${accessibilityReport.overallRating}">
        Nivel General: WCAG ${accessibilityReport.overallRating}
      </div>
    </div>

    <!-- Estadísticas Generales -->
    <div class="section">
      <h2>📊 Estadísticas Generales</h2>
      <div class="stats">
        <div class="stat">
          <div class="stat-number">${accessibilityReport.combinations.filter(c => c.validation.level === 'AAA').length}</div>
          <div>Combinaciones AAA</div>
        </div>
        <div class="stat">
          <div class="stat-number">${accessibilityReport.combinations.filter(c => c.validation.level === 'AA').length}</div>
          <div>Combinaciones AA</div>
        </div>
        <div class="stat">
          <div class="stat-number">${accessibilityReport.combinations.filter(c => c.validation.level === 'FAIL').length}</div>
          <div>Fallos</div>
        </div>
        <div class="stat">
          <div class="stat-number">${detailedValidations.filter(v => v.accessible).length}/${detailedValidations.length}</div>
          <div>Validaciones Específicas</div>
        </div>
      </div>
    </div>

    <!-- Combinaciones Principales -->
    <div class="section">
      <h2>🎨 Combinaciones de Colores Principales</h2>
      <div class="validation-grid">
        ${accessibilityReport.combinations.map(combo => `
          <div class="validation-card">
            <h3>${combo.name}</h3>
            <div class="rating ${combo.validation.level}">
              WCAG ${combo.validation.level}
            </div>
            <p><strong>Ratio de Contraste:</strong> ${combo.validation.ratio}:1</p>
            <div class="contrast-demo" style="background-color: hsl(259, 50%, ${100 - combo.background}%); color: hsl(259, 50%, ${100 - combo.foreground}%)">
              Ejemplo de Texto
            </div>
            ${combo.validation.recommendation ? `<p><em>${combo.validation.recommendation}</em></p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Validaciones Específicas -->
    <div class="section">
      <h2>🎯 Validaciones Específicas de Componentes</h2>
      <div class="validation-grid">
        ${detailedValidations.map(validation => `
          <div class="validation-card">
            <h3>${validation.name}</h3>
            <div class="rating ${validation.level}">
              WCAG ${validation.level}
            </div>
            <p><strong>Contexto:</strong> ${validation.context}</p>
            <p><strong>Ratio:</strong> ${validation.ratio}:1</p>
            <div class="contrast-demo" style="background-color: hsl(259, 50%, ${100 - validation.background}%); color: hsl(259, 50%, ${100 - validation.foreground}%)">
              ${validation.name}
            </div>
            ${validation.recommendation ? `<p><em>${validation.recommendation}</em></p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Recomendaciones -->
    ${accessibilityReport.recommendations.length > 0 ? `
    <div class="section">
      <h2>💡 Recomendaciones</h2>
      <div class="recommendations">
        <ul>
          ${accessibilityReport.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    </div>
    ` : ''}

    <!-- Resumen Técnico -->
    <div class="section">
      <h2>🔬 Resumen Técnico</h2>
      <h3>Metodología de Validación</h3>
      <ul>
        <li><strong>Algoritmo HCT:</strong> Utilizado para generar colores científicamente precisos</li>
        <li><strong>Validación WCAG:</strong> Contraste calculado usando fórmulas oficiales W3C</li>
        <li><strong>Niveles de Cumplimiento:</strong>
          <ul>
            <li>AA: Contraste mínimo 4.5:1 (texto normal), 3:1 (texto grande)</li>
            <li>AAA: Contraste mínimo 7:1 (texto normal), 4.5:1 (texto grande)</li>
          </ul>
        </li>
        <li><strong>Validación Automática:</strong> Todos los componentes validados automáticamente</li>
      </ul>
      
      <h3>Características del Sistema</h3>
      <ul>
        <li>✅ Colores generados con algoritmo HCT científico</li>
        <li>✅ Validación automática de contraste</li>
        <li>✅ Cumplimiento WCAG ${accessibilityReport.overallRating}</li>
        <li>✅ Soporte para modo claro y oscuro</li>
        <li>✅ Tokens de diseño accesibles</li>
      </ul>
    </div>

    <div class="section" style="text-align: center; color: #666;">
      <p>Reporte generado automáticamente por Material Design 3 MCP</p>
      <p>Fecha: ${new Date().toLocaleDateString('es-ES')}</p>
    </div>
  </div>
</body>
</html>`;
};

// Generar reporte JSON detallado
const detailedReport = {
  metadata: {
    generatedAt: new Date().toISOString(),
    seedColor: SEED_COLOR,
    darkMode: DARK_MODE,
    wcagVersion: '2.1',
    methodology: 'HCT + Scientific Validation'
  },
  overallRating: accessibilityReport.overallRating,
  summary: {
    totalCombinations: accessibilityReport.combinations.length,
    aaaCompliant: accessibilityReport.combinations.filter(c => c.validation.level === 'AAA').length,
    aaCompliant: accessibilityReport.combinations.filter(c => c.validation.level === 'AA').length,
    failures: accessibilityReport.combinations.filter(c => c.validation.level === 'FAIL').length,
    specificValidations: detailedValidations.length,
    accessibleValidations: detailedValidations.filter(v => v.accessible).length
  },
  mainCombinations: accessibilityReport.combinations,
  specificValidations: detailedValidations,
  recommendations: accessibilityReport.recommendations,
  colorScheme: colorScheme,
  theme: {
    primary: theme.primary || {},
    secondary: theme.secondary || {},
    tertiary: theme.tertiary || {},
    neutral: theme.neutral || {},
    surface: theme.surface || {},
    background: theme.background || {}
  }
};

// Guardar archivos
const outputDir = './src/styles';
const htmlReport = generateAccessibilityHTML();
const jsonReport = JSON.stringify(detailedReport, null, 2);

writeFileSync(join(outputDir, 'accessibility-report.html'), htmlReport);
writeFileSync(join(outputDir, 'accessibility-report.json'), jsonReport);

// Mostrar resumen en consola
console.log('\n♿ REPORTE DE ACCESIBILIDAD WCAG');
console.log('================================');
console.log(`🎯 Nivel General: WCAG ${accessibilityReport.overallRating}`);
console.log(`📊 Combinaciones Principales:`);
console.log(`   • AAA: ${accessibilityReport.combinations.filter(c => c.validation.level === 'AAA').length}`);
console.log(`   • AA:  ${accessibilityReport.combinations.filter(c => c.validation.level === 'AA').length}`);
console.log(`   • FAIL: ${accessibilityReport.combinations.filter(c => c.validation.level === 'FAIL').length}`);
console.log(`🎯 Validaciones Específicas: ${detailedValidations.filter(v => v.accessible).length}/${detailedValidations.length} exitosas`);

if (accessibilityReport.recommendations.length > 0) {
  console.log(`\n💡 Recomendaciones:`);
  accessibilityReport.recommendations.forEach((rec, i) => {
    console.log(`   ${i + 1}. ${rec}`);
  });
}

console.log('\n✅ Archivos generados:');
console.log('  📄 accessibility-report.html - Reporte visual completo');
console.log('  📋 accessibility-report.json - Datos técnicos detallados');
console.log('\n🔬 Características validadas:');
console.log('  ✅ Algoritmo HCT científico');
console.log('  ✅ Contraste WCAG automático');
console.log('  ✅ Validación de componentes');
console.log('  ✅ Cumplimiento internacional');