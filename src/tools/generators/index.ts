/**
 * Main API for component generators - maintains compatibility
 * This file serves as the central export point for all component generators
 */

import type { ComponentCode, Framework } from './types.js';

// Import all generator modules
import * as BasicComponents from './basic-components.js';
import * as FormComponents from './form-components.js';
import * as Navigation from './navigation.js';
import * as Feedback from './feedback.js';
import * as DataDisplay from './data-display.js';
import * as Layout from './layout.js';
import * as Systems from './systems.js';

// Re-export types
export type { ComponentCode, Framework } from './types.js';

// Component generator registry
type ComponentType = 
  // Basic Components
  | 'button' | 'card' | 'dialog' | 'divider'
  // Form Components  
  | 'checkbox' | 'radio' | 'switch' | 'textfield' | 'select' | 'slider'
  // Navigation
  | 'tabs' | 'menu' | 'navigationbar' | 'breadcrumb'
  // Feedback
  | 'progress' | 'snackbar' | 'tooltip'
  // Data Display
  | 'table' | 'list' | 'badge' | 'chip'
  // Layout
  | 'fab' | 'iconbutton' | 'accordion'
  // Systems
  | 'focus' | 'elevation' | 'ripple' | 'typography' | 'icon' | 'field'
  // Legacy support
  | 'text' | 'heading';

/**
 * Main component generator function
 * Maintains backward compatibility with existing API
 */
export function generateComponentCode(type: ComponentType, props: any = {}, framework: Framework = 'css-only'): ComponentCode {
  switch (type) {
    // Basic Components
    case 'button':
      return BasicComponents.generateButton(props, framework);
    case 'card':
      return BasicComponents.generateCard(props, framework);
    case 'dialog':
      return BasicComponents.generateDialog(props, framework);
    case 'divider':
      return BasicComponents.generateDivider(props, framework);
    
    // Form Components
    case 'checkbox':
      return FormComponents.generateCheckbox(props, framework);
    case 'radio':
      return FormComponents.generateRadio(props, framework);
    case 'switch':
      return FormComponents.generateSwitch(props, framework);
    case 'textfield':
      return FormComponents.generateTextField(props, framework);
    case 'select':
      return FormComponents.generateSelect(props, framework);
    case 'slider':
      return FormComponents.generateSlider(props, framework);
    
    // Navigation
    case 'tabs':
      return Navigation.generateTabs(props, framework);
    case 'menu':
      return Navigation.generateMenu(props, framework);
    case 'navigationbar':
      return Navigation.generateNavigationBar(props, framework);
    case 'breadcrumb':
      return Navigation.generateBreadcrumb(props, framework);
    
    // Feedback
    case 'progress':
      return Feedback.generateProgress(props, framework);
    case 'snackbar':
      return Feedback.generateSnackbar(props, framework);
    case 'tooltip':
      return Feedback.generateTooltip(props, framework);
    
    // Data Display
    case 'table':
      return DataDisplay.generateTable(props, framework);
    case 'list':
      return DataDisplay.generateList(props, framework);
    case 'badge':
      return DataDisplay.generateBadge(props, framework);
    case 'chip':
      return DataDisplay.generateChip(props, framework);
    
    // Layout
    case 'fab':
      return Layout.generateFAB(props, framework);
    case 'iconbutton':
      return Layout.generateIconButton(props, framework);
    case 'accordion':
      return Layout.generateAccordion(props, framework);
    
    // Systems
    case 'focus':
      return Systems.generateFocus(props, framework);
    case 'elevation':
      return Systems.generateElevation(props, framework);
    case 'ripple':
      return Systems.generateRipple(props, framework);
    case 'typography':
      return Systems.generateTypography(props, framework);
    case 'icon':
      return Systems.generateIcon(props, framework);
    case 'field':
      return Systems.generateField(props, framework);
    
    // Legacy support - redirect to typography
    case 'text':
      return Systems.generateTypography({...props, scale: 'bodyLarge'}, framework);
    case 'heading':
      return Systems.generateTypography({...props, scale: 'headlineLarge'}, framework);
    
    default:
      return generateGenericComponent(type, props, framework);
  }
}

/**
 * Generic component generator for unknown types
 */
function generateGenericComponent(type: string, props: any, framework: Framework): ComponentCode {
  const variant = props.variant || '';
  const content = props.content || `This is a ${type} component${variant ? ` with ${variant} variant` : ''}.`;
  
  const html = `<!-- ${type} component -->
<div class="md-${type} ${variant ? `md-${type}--${variant}` : ''}">
  ${content}
</div>`;

  return {
    html,
    css: `/* ${type} styles would be included here */`,
    js: framework === 'alpine' ? `// ${type} Alpine.js behavior` : framework === 'vanilla-js' ? `// ${type} Vanilla JS behavior` : ''
  };
}

// Export individual generator modules for direct access
export {
  BasicComponents,
  FormComponents,
  Navigation,
  Feedback,
  DataDisplay,
  Layout,
  Systems
};

// Export specific generators for convenience
export const {
  generateButton,
  generateCard,
  generateDialog,
  generateDivider
} = BasicComponents;

export const {
  generateCheckbox,
  generateRadio,
  generateSwitch,
  generateTextField,
  generateSelect,
  generateSlider
} = FormComponents;

export const {
  generateTabs,
  generateMenu,
  generateNavigationBar,
  generateBreadcrumb
} = Navigation;

export const {
  generateProgress,
  generateSnackbar,
  generateTooltip
} = Feedback;

export const {
  generateTable,
  generateList,
  generateBadge,
  generateChip
} = DataDisplay;

export const {
  generateFAB,
  generateIconButton,
  generateAccordion
} = Layout;

export const {
  generateFocus,
  generateElevation,
  generateRipple,
  generateTypography,
  generateIcon,
  generateField
} = Systems;