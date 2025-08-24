/**
 * Layout generation functionality
 */

import type { LayoutGenerationOptions, ToolResult } from '../types/index.js';
import { logger } from '../utils/logger.js';

export async function createLayout(options: LayoutGenerationOptions): Promise<ToolResult> {
  logger.info(`Creating layout: ${options.type}`, { options });

  try {
    const layout = await generateLayout(options);
    
    return {
      success: true,
      data: layout,
      code: layout.html,
      message: `Generated ${options.type} layout successfully`,
    };
  } catch (error) {
    logger.error('Layout generation failed:', error);
    return {
      success: false,
      message: `Failed to generate layout: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

interface GeneratedLayout {
  type: string;
  html: string;
  css: string;
  components: string[];
  responsive: boolean;
}

async function generateLayout(options: LayoutGenerationOptions): Promise<GeneratedLayout> {
  const { type, components, responsive, theme } = options;

  switch (type) {
    case 'page':
      return generatePageLayout(components, responsive, theme);
    case 'section':
      return generateSectionLayout(components, responsive, theme);
    case 'grid':
      return generateGridLayout(components, responsive, theme);
    case 'flex':
      return generateFlexLayout(components, responsive, theme);
    default:
      throw new Error(`Unknown layout type: ${type}`);
  }
}

function generatePageLayout(components: string[], responsive: boolean, theme?: string): GeneratedLayout {
  const themeClass = theme ? `theme-${theme}` : '';
  
  const html = `<!DOCTYPE html>
<html lang="en" ${themeClass ? `class="${themeClass}"` : ''}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Material Design Page</title>
  <link rel="stylesheet" href="material-tailwind.css">
  ${responsive ? '<meta name="viewport" content="width=device-width, initial-scale=1.0">' : ''}
</head>
<body>
  <!-- Header -->
  <header class="md-surface bg-md-sys-bg-surface-container">
    <div class="container mx-auto px-4 py-3">
      <nav class="flex items-center justify-between">
        <h1 class="text-xl font-medium text-md-sys-color-on-surface">App Title</h1>
        <div class="flex items-center gap-2">
          ${components.includes('button') ? '<button class="btn btn--text">Menu</button>' : ''}
          ${components.includes('icon') ? '<span class="material-icons">account_circle</span>' : ''}
        </div>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    ${generateMainContent(components)}
  </main>

  <!-- Footer -->
  <footer class="mt-16 bg-md-sys-bg-surface-variant">
    <div class="container mx-auto px-4 py-6">
      <p class="text-center text-md-sys-color-on-surface-variant">
        Made with Material Design 3
      </p>
    </div>
  </footer>
</body>
</html>`;

  return {
    type: 'page',
    html,
    css: generatePageCSS(responsive),
    components,
    responsive,
  };
}

function generateSectionLayout(components: string[], responsive: boolean, theme?: string): GeneratedLayout {
  const html = `<section class="md-section ${responsive ? 'responsive' : ''}">
  <div class="container">
    <header class="section-header">
      <h2 class="section-title">Section Title</h2>
      <p class="section-subtitle">Section description goes here</p>
    </header>
    
    <div class="section-content">
      ${generateMainContent(components)}
    </div>
  </div>
</section>`;

  return {
    type: 'section',
    html,
    css: generateSectionCSS(responsive),
    components,
    responsive,
  };
}

function generateGridLayout(components: string[], responsive: boolean, theme?: string): GeneratedLayout {
  const gridCols = Math.min(components.length, 4);
  const responsiveClasses = responsive 
    ? `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols}`
    : `grid-cols-${gridCols}`;

  const html = `<div class="md-grid grid ${responsiveClasses} gap-6">
  ${components.map(component => generateComponentForGrid(component)).join('\n  ')}
</div>`;

  return {
    type: 'grid',
    html,
    css: generateGridCSS(responsive),
    components,
    responsive,
  };
}

function generateFlexLayout(components: string[], responsive: boolean, theme?: string): GeneratedLayout {
  const flexDirection = responsive ? 'flex-col sm:flex-row' : 'flex-row';
  
  const html = `<div class="md-flex flex ${flexDirection} gap-4 items-center justify-center">
  ${components.map(component => generateComponentForFlex(component)).join('\n  ')}
</div>`;

  return {
    type: 'flex',
    html,
    css: generateFlexCSS(responsive),
    components,
    responsive,
  };
}

function generateMainContent(components: string[]): string {
  return components.map(component => {
    switch (component) {
      case 'card':
        return `<div class="md-card md-card--elevated mb-6">
  <div class="md-card__content">
    <div class="md-card__header">
      <h3 class="md-card__title">Card Title</h3>
      <p class="md-card__subtitle">Card subtitle</p>
    </div>
    <div class="md-card__body">
      <p>This is a card component with some sample content.</p>
    </div>
    <div class="md-card__actions">
      <button class="btn btn--text">Action</button>
      <button class="btn btn--text">Learn More</button>
    </div>
  </div>
</div>`;

      case 'button':
        return `<div class="flex gap-4 mb-6">
  <button class="btn btn--filled">Primary</button>
  <button class="btn btn--outlined">Secondary</button>
  <button class="btn btn--text">Text</button>
</div>`;

      case 'textfield':
        return `<div class="mb-6">
  <div class="md-select md-select--outlined">
    <div class="md-select__container">
      <div class="md-select__field">
        <input type="text" class="md-select__input" placeholder=" ">
        <label class="md-select__label">Label</label>
      </div>
    </div>
    <div class="md-select__supporting-text">
      <span class="md-select__helper-text">Helper text</span>
    </div>
  </div>
</div>`;

      case 'chip':
        return `<div class="flex gap-2 mb-6">
  <div class="md-chip md-chip--assist">
    <span class="md-chip__text">Assist chip</span>
  </div>
  <div class="md-chip md-chip--filter">
    <span class="md-chip__text">Filter chip</span>
  </div>
  <div class="md-chip md-chip--input">
    <span class="md-chip__text">Input chip</span>
  </div>
</div>`;

      case 'progress':
        return `<div class="mb-6">
  <div class="md-progress md-progress--linear">
    <div class="md-progress__track">
      <div class="md-progress__indicator" style="width: 60%"></div>
    </div>
  </div>
</div>`;

      default:
        return `<div class="mb-6">
  <p>Component: ${component}</p>
</div>`;
    }
  }).join('\n    ');
}

function generateComponentForGrid(component: string): string {
  switch (component) {
    case 'card':
      return `<div class="md-card md-card--elevated">
    <div class="md-card__content">
      <h3 class="md-card__title">${component}</h3>
      <p>Grid item content</p>
    </div>
  </div>`;
    default:
      return `<div class="grid-item">
    <p>${component}</p>
  </div>`;
  }
}

function generateComponentForFlex(component: string): string {
  switch (component) {
    case 'button':
      return `<button class="btn btn--filled">${component}</button>`;
    case 'chip':
      return `<div class="md-chip md-chip--assist">
    <span class="md-chip__text">${component}</span>
  </div>`;
    default:
      return `<div class="flex-item">
    <span>${component}</span>
  </div>`;
  }
}

function generatePageCSS(responsive: boolean): string {
  return `/* Page Layout Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

${responsive ? `
/* Responsive breakpoints */
@media (min-width: 640px) {
  .container {
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 4rem;
  }
}
` : ''}

/* Header styles */
header {
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
}

/* Main content */
main {
  min-height: calc(100vh - 200px);
}`;
}

function generateSectionCSS(responsive: boolean): string {
  return `/* Section Layout Styles */
.md-section {
  padding: 2rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 500;
  color: var(--md-sys-color-on-surface);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--md-sys-color-on-surface-variant);
}

${responsive ? `
@media (max-width: 768px) {
  .md-section {
    padding: 1rem 0;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
` : ''}`;
}

function generateGridCSS(responsive: boolean): string {
  return `/* Grid Layout Styles */
.md-grid {
  display: grid;
  gap: 1.5rem;
}

.grid-item {
  padding: 1rem;
  background: var(--md-sys-color-surface-container);
  border-radius: var(--md-sys-shape-corner-medium);
}

${responsive ? `
@media (max-width: 640px) {
  .md-grid {
    gap: 1rem;
  }
}
` : ''}`;
}

function generateFlexCSS(responsive: boolean): string {
  return `/* Flex Layout Styles */
.md-flex {
  display: flex;
  gap: 1rem;
}

.flex-item {
  padding: 0.5rem 1rem;
  background: var(--md-sys-color-surface-container);
  border-radius: var(--md-sys-shape-corner-small);
}

${responsive ? `
@media (max-width: 640px) {
  .md-flex {
    flex-direction: column;
  }
}
` : ''}`;
}