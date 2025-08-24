/**
 * Script para generar un tema Material Design 3 usando las herramientas del MCP
 */

import { generateTheme } from '../dist/tools/theme-generator.js';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function generateNewTheme() {
  try {
    console.log('Generando tema Material Design 3 científicamente correcto...');
    
    // Generar tema usando el algoritmo HCT científico
    const result = await generateTheme({
      seedColor: '#6750A4', // Color primario de Material Design 3
      name: 'material-docs',
      darkMode: true,
      outputFormat: 'both',
      includeUtilities: true
    });
    
    if (!result.success) {
      throw new Error(result.message || 'Error generando tema');
    }
    
    const theme = result.data;
    
    console.log('Tema generado exitosamente!');
    console.log('Cumplimiento WCAG:', theme.accessibility.wcagCompliance);
    
    // Guardar CSS del tema
    writeFileSync(
      join(process.cwd(), 'src/styles/material-theme.css'),
      theme.css
    );
    
    // Guardar configuración de Tailwind
    if (theme.tailwind) {
      writeFileSync(
        join(process.cwd(), 'tailwind-theme.config.js'),
        theme.tailwind
      );
    }
    
    // Mostrar información del tema
    console.log('\n=== INFORMACIÓN DEL TEMA ===');
    console.log('Nombre:', theme.name);
    console.log('Color semilla:', theme.seedColor);
    console.log('Cumplimiento WCAG:', theme.accessibility.wcagCompliance);
    
    if (theme.accessibility.recommendations.length > 0) {
      console.log('\n=== RECOMENDACIONES DE ACCESIBILIDAD ===');
      theme.accessibility.recommendations.forEach(rec => {
        console.log('-', rec);
      });
    }
    
    console.log('\n=== PALETA DE COLORES ===');
    console.log('Primario:', theme.palette.primary.slice(0, 5));
    console.log('Secundario:', theme.palette.secondary.slice(0, 5));
    console.log('Terciario:', theme.palette.tertiary.slice(0, 5));
    
    console.log('\nArchivos generados:');
    console.log('- src/styles/material-theme.css');
    console.log('- tailwind-theme.config.js');
    
  } catch (error) {
    console.error('Error generando tema:', error);
    process.exit(1);
  }
}

generateNewTheme();