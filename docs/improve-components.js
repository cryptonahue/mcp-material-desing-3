import { generateButton, generateCard, generateFAB, generateTabs, generateNavigationBar } from '../dist/tools/generators/index.js';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Improve existing components using MCP generators
async function improveComponents() {
  console.log('🔧 Mejorando componentes existentes con generadores MCP...');
  
  try {
    // 1. Improve Button component
    console.log('\n📦 Generando botón mejorado...');
    const buttonResult = generateButton({
      variant: 'filled',
      size: 'medium',
      disabled: false,
      ripple: true,
      elevation: true,
      focusRing: true
    }, 'astro');
    
    // Write improved button
    const buttonPath = join(process.cwd(), 'src', 'components', 'ImprovedButton.astro');
    const buttonContent = `---
// Improved Material Design 3 Button using MCP Generator
export interface Props {
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  id?: string;
  'aria-label'?: string;
}

const {
  variant = 'filled',
  size = 'medium',
  disabled = false,
  href,
  type = 'button',
  class: className = '',
  id,
  'aria-label': ariaLabel,
  ...rest
} = Astro.props;

const Tag = href ? 'a' : 'button';
---

${buttonResult.html}

<style>
${buttonResult.css}
</style>

<script>
${buttonResult.js || ''}
</script>`;
    
    writeFileSync(buttonPath, buttonContent);
    console.log('✅ Botón mejorado creado en:', buttonPath);
    
    // 2. Improve Card component
    console.log('\n🃏 Generando tarjeta mejorada...');
    const cardResult = generateCard({
      variant: 'elevated',
      interactive: true,
      elevation: 'level1',
      ripple: true
    }, 'astro');
    
    const cardPath = join(process.cwd(), 'src', 'components', 'ImprovedCard.astro');
    const cardContent = `---
// Improved Material Design 3 Card using MCP Generator
export interface Props {
  variant?: 'elevated' | 'filled' | 'outlined';
  interactive?: boolean;
  href?: string;
  class?: string;
  id?: string;
  'aria-label'?: string;
}

const {
  variant = 'elevated',
  interactive = false,
  href,
  class: className = '',
  id,
  'aria-label': ariaLabel,
  ...rest
} = Astro.props;

const Tag = href ? 'a' : 'div';
---

${cardResult.html}

<style>
${cardResult.css}
</style>

<script>
${cardResult.js || ''}
</script>`;
    
    writeFileSync(cardPath, cardContent);
    console.log('✅ Tarjeta mejorada creada en:', cardPath);
    
    // 3. Improve FAB component
    console.log('\n🎯 Generando FAB mejorado...');
    const fabResult = generateFAB({
      icon: 'add',
      size: 'medium',
      variant: 'primary',
      position: 'bottom-right',
      extended: false,
      disabled: false
    }, 'astro');
    
    const fabPath = join(process.cwd(), 'src', 'components', 'ImprovedFAB.astro');
    const fabContent = `---
// Improved Material Design 3 FAB using MCP Generator
export interface Props {
  icon?: string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'surface' | 'tertiary';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'custom';
  extended?: boolean;
  disabled?: boolean;
  href?: string;
  class?: string;
  id?: string;
  'aria-label'?: string;
}

const {
  icon = 'add',
  label = '',
  size = 'medium',
  variant = 'primary',
  position = 'bottom-right',
  extended = false,
  disabled = false,
  href,
  class: className = '',
  id,
  'aria-label': ariaLabel,
  ...rest
} = Astro.props;

const Tag = href ? 'a' : 'button';
---

${fabResult.html}

<style>
${fabResult.css}
</style>

<script>
${fabResult.js || ''}
</script>`;
    
    writeFileSync(fabPath, fabContent);
    console.log('✅ FAB mejorado creado en:', fabPath);
    
    // 4. Generate improved Navigation
    console.log('\n🧭 Generando navegación mejorada...');
    const navResult = generateNavigationBar({
      items: [
        { label: 'Inicio', href: '/', icon: 'home', active: true },
        { label: 'Componentes', href: '/components', icon: 'widgets' },
        { label: 'Herramientas', href: '/tools', icon: 'build' },
        { label: 'Ejemplos', href: '/examples', icon: 'code' }
      ],
      variant: 'primary',
      position: 'top',
      elevation: true
    }, 'astro');
    
    const navPath = join(process.cwd(), 'src', 'components', 'ImprovedNavigation.astro');
    const navContent = `---
// Improved Material Design 3 Navigation using MCP Generator
export interface Props {
  currentPath?: string;
  items?: Array<{
    label: string;
    href: string;
    icon?: string;
    active?: boolean;
  }>;
}

const { 
  currentPath = '',
  items = [
    { label: 'Inicio', href: '/', icon: 'home' },
    { label: 'Componentes', href: '/components', icon: 'widgets' },
    { label: 'Herramientas', href: '/tools', icon: 'build' },
    { label: 'Ejemplos', href: '/examples', icon: 'code' }
  ]
} = Astro.props;

// Mark active item based on current path
const processedItems = items.map(item => ({
  ...item,
  active: currentPath === item.href
}));
---

${navResult.html}

<style>
${navResult.css}
</style>

<script>
${navResult.js || ''}
</script>`;
    
    writeFileSync(navPath, navContent);
    console.log('✅ Navegación mejorada creada en:', navPath);
    
    // 5. Generate improved Tabs
    console.log('\n📑 Generando pestañas mejoradas...');
    const tabsResult = generateTabs({
      tabs: [
        { label: 'Pestaña 1', content: 'Contenido 1', active: true, icon: 'tab' },
        { label: 'Pestaña 2', content: 'Contenido 2', active: false, icon: 'tab' },
        { label: 'Pestaña 3', content: 'Contenido 3', active: false, icon: 'tab' }
      ],
      variant: 'primary',
      size: 'medium',
      fullWidth: false
    }, 'astro');
    
    const tabsPath = join(process.cwd(), 'src', 'components', 'ImprovedTabs.astro');
    const tabsContent = `---
// Improved Material Design 3 Tabs using MCP Generator
export interface Props {
  tabs?: Array<{
    label: string;
    content: string;
    active?: boolean;
    disabled?: boolean;
    icon?: string;
  }>;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const {
  tabs = [
    { label: 'Tab 1', content: 'Content 1', active: true },
    { label: 'Tab 2', content: 'Content 2', active: false },
    { label: 'Tab 3', content: 'Content 3', active: false }
  ],
  variant = 'primary',
  size = 'medium',
  fullWidth = false
} = Astro.props;
---

${tabsResult.html}

<style>
${tabsResult.css}
</style>

<script>
${tabsResult.js || ''}
</script>`;
    
    writeFileSync(tabsPath, tabsContent);
    console.log('✅ Pestañas mejoradas creadas en:', tabsPath);
    
    console.log('\n🎉 ¡Todos los componentes han sido mejorados exitosamente!');
    console.log('\n📋 Resumen de componentes creados:');
    console.log('   • ImprovedButton.astro - Botón con ripple y focus ring científicos');
    console.log('   • ImprovedCard.astro - Tarjeta con elevación y interactividad mejoradas');
    console.log('   • ImprovedFAB.astro - FAB con posicionamiento y animaciones científicas');
    console.log('   • ImprovedNavigation.astro - Navegación con estados activos mejorados');
    console.log('   • ImprovedTabs.astro - Pestañas con transiciones y accesibilidad mejoradas');
    
    console.log('\n🔬 Características científicas implementadas:');
    console.log('   • Algoritmo HCT para colores científicamente precisos');
    console.log('   • Curvas de animación basadas en Material Motion');
    console.log('   • Elevaciones con sombras físicamente correctas');
    console.log('   • Estados de foco y ripple con timing científico');
    console.log('   • Accesibilidad WCAG AA/AAA compliant');
    
  } catch (error) {
    console.error('❌ Error mejorando componentes:', error);
    process.exit(1);
  }
}

// Execute the improvement
improveComponents();