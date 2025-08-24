/**
 * Form Components: Checkbox, Radio, Switch, TextField, Select, Slider
 */

import type { ComponentCode, Framework } from './types.js';
import { 
  buildClasses, 
  buildAttributes, 
  generateId, 
  normalizeProps,
  getDisabledState,
  renderIcon
} from '../../utils/component-helpers.js';
import { MD3_COLORS } from '../../utils/material-tokens.js';

/**
 * Generate Checkbox component
 */
export function generateCheckbox(props: any, framework: Framework): ComponentCode {
  const label = props.label || 'Checkbox';
  const checked = props.checked ? 'checked' : '';
  const disabled = props.disabled ? 'disabled' : '';
  const id = props.id || 'checkbox-' + Math.random().toString(36).substr(2, 9);

  let html = '';
  if (framework === 'alpine') {
    html = `<div x-data="{ checked: ${props.checked || false} }" class="md3-checkbox-with-label">
  <div class="md3-checkbox" :class="{ checked: checked, disabled: ${props.disabled || false} }">
    <input type="checkbox" 
           x-model="checked"
           class="input" 
           id="${id}"
           ${disabled}>
    <div class="container">
      <div class="outline"></div>
      <div class="background"></div>
      <div class="icon">
        <svg viewBox="0 0 18 18">
          <path class="mark checkmark" d="M6,9 L8,11 L12,7"></path>
        </svg>
      </div>
    </div>
  </div>
  <label for="${id}" class="label">${label}</label>
</div>`;
  } else {
    html = `<div class="md3-checkbox-with-label">
  <div class="md3-checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}">
    <input type="checkbox" 
           class="input" 
           id="${id}"
           ${checked} 
           ${disabled}>
    <div class="container">
      <div class="outline"></div>
      <div class="background"></div>
      <div class="icon">
        <svg viewBox="0 0 18 18">
          <path class="mark checkmark" d="M6,9 L8,11 L12,7"></path>
        </svg>
      </div>
    </div>
  </div>
  <label for="${id}" class="label">${label}</label>
</div>`;
  }

  return {
    html,
    css: '/* Checkbox styles are included in the main CSS file */',
    js: framework === 'alpine' ? generateCheckboxAlpineJS(props) : undefined,
  };
}

/**
 * Generate Radio component
 */
export function generateRadio(props: any, framework: Framework): ComponentCode {
  const name = props.name || 'radio-group';
  const options = props.options || [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
  ];
  const selectedValue = props.selected || '';
  const disabled = props.disabled || false;
  const inline = props.layout === 'inline';
  
  const groupClasses = `md-radio-group ${inline ? 'md-radio-group--inline' : ''}`;
  
  const radioItems = options.map((option: any, index: number) => {
    const isSelected = option.value === selectedValue;
    const itemDisabled = disabled || option.disabled;
    const radioId = `${name}-${index}`;
    
    const attributes = [
      `type="radio"`,
      `name="${name}"`,
      `value="${option.value}"`,
      `id="${radioId}"`,
      isSelected ? 'checked' : '',
      itemDisabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    return `  <label class="md-radio ${itemDisabled ? 'md-radio--disabled' : ''}" for="${radioId}">
    <input ${attributes} class="md-radio__input">
    <div class="md-radio__background">
      <div class="md-radio__outer-circle"></div>
      <div class="md-radio__inner-circle"></div>
    </div>
    <span class="md-radio__label">${option.label}</span>
  </label>`;
  }).join('\n');

  const html = `<div class="${groupClasses}" role="radiogroup" aria-label="${props.label || 'Radio group'}">
${radioItems}
</div>`;

  const css = `/* Material Design 3 Radio Button */
.md-radio-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.md-radio-group--inline {
  flex-direction: row;
  gap: 24px;
}

.md-radio {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  min-height: 48px;
  padding: 12px 0;
  user-select: none;
  transition: opacity 0.2s ease;
}

.md-radio--disabled {
  cursor: not-allowed;
  opacity: 0.38;
}

.md-radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}

.md-radio__background {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.md-radio__outer-circle {
  position: absolute;
  inset: 0;
  border: 2px solid var(--md-sys-color-on-surface-variant, #49454f);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.md-radio__inner-circle {
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: var(--md-sys-color-primary, #6750a4);
  transform: scale(0);
  transition: transform 0.2s ease;
}

.md-radio__label {
  color: var(--md-sys-color-on-surface, #1c1b1f);
  font-family: 'Roboto', system-ui, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

/* States */
.md-radio__input:checked + .md-radio__background .md-radio__outer-circle {
  border-color: var(--md-sys-color-primary, #6750a4);
  border-width: 2px;
}

.md-radio__input:checked + .md-radio__background .md-radio__inner-circle {
  transform: scale(1);
}

.md-radio__input:focus + .md-radio__background {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: 2px;
}

.md-radio:hover:not(.md-radio--disabled) .md-radio__background::before {
  content: '';
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: var(--md-sys-color-on-surface, #1c1b1f);
  opacity: 0.08;
  transition: opacity 0.2s ease;
}

.md-radio__input:checked + .md-radio__background:hover::before {
  background: var(--md-sys-color-primary, #6750a4);
  opacity: 0.08;
}

/* Error state */
.md-radio-group[aria-invalid="true"] .md-radio__outer-circle {
  border-color: var(--md-sys-color-error, #ba1a1a);
}`;

  let js = '';
  if (framework === 'alpine') {
    js = generateRadioAlpineJS(props, selectedValue, options);
  } else if (framework === 'vanilla-js') {
    js = generateRadioVanillaJS();
  }

  return { html, css, js };
}

/**
 * Generate Switch component
 */
export function generateSwitch(props: any, framework: Framework): ComponentCode {
  const name = props.name || 'switch';
  const checked = props.checked || false;
  const disabled = props.disabled || false;
  const label = props.label || '';
  const labelPosition = props.labelPosition || 'end'; // 'start' | 'end'
  const size = props.size || 'medium'; // 'small' | 'medium' | 'large'
  const showIcons = props.showIcons || false;
  const switchId = props.id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  
  const switchClasses = [
    'md-switch',
    `md-switch--${size}`,
    disabled ? 'md-switch--disabled' : '',
    checked ? 'md-switch--checked' : ''
  ].filter(Boolean).join(' ');
  
  const attributes = [
    `type="checkbox"`,
    `role="switch"`,
    `id="${switchId}"`,
    `name="${name}"`,
    checked ? 'checked' : '',
    disabled ? 'disabled' : '',
    `aria-checked="${checked}"`
  ].filter(Boolean).join(' ');

  const switchElement = `<div class="${switchClasses}">
    <input ${attributes} class="md-switch__input">
    <div class="md-switch__track">
      <div class="md-switch__handle">
        ${showIcons ? `
        <div class="md-switch__icons">
          <svg class="md-switch__icon md-switch__icon--on" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <svg class="md-switch__icon md-switch__icon--off" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        </div>` : ''}
      </div>
    </div>
  </div>`;

  let html;
  if (label) {
    const labelElement = `<span class="md-switch__label">${label}</span>`;
    html = labelPosition === 'start' 
      ? `<label class="md-switch-container">${labelElement}${switchElement}</label>`
      : `<label class="md-switch-container">${switchElement}${labelElement}</label>`;
  } else {
    html = switchElement;
  }

  const css = `/* Material Design 3 Switch */
.md-switch-container {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
}

.md-switch {
  position: relative;
  display: inline-block;
  transition: opacity 0.2s ease;
}

.md-switch--disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.md-switch__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}

.md-switch__track {
  position: relative;
  width: 52px;
  height: 32px;
  border-radius: 16px;
  background: var(--md-sys-color-surface-variant, #e7e0ec);
  border: 2px solid var(--md-sys-color-outline, #79747e);
  transition: all 0.2s ease;
  cursor: pointer;
}

.md-switch__handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--md-sys-color-outline, #79747e);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(0);
}

.md-switch__icons {
  position: relative;
  width: 16px;
  height: 16px;
}

.md-switch__icon {
  position: absolute;
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: opacity 0.2s ease;
}

.md-switch__icon--on {
  opacity: 0;
}

.md-switch__icon--off {
  opacity: 1;
}

.md-switch__label {
  color: var(--md-sys-color-on-surface, #1c1b1f);
  font-family: 'Roboto', system-ui, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

/* Size variants */
.md-switch--small .md-switch__track {
  width: 44px;
  height: 28px;
  border-radius: 14px;
}

.md-switch--small .md-switch__handle {
  width: 20px;
  height: 20px;
  top: 2px;
  left: 2px;
}

.md-switch--large .md-switch__track {
  width: 60px;
  height: 36px;
  border-radius: 18px;
}

.md-switch--large .md-switch__handle {
  width: 28px;
  height: 28px;
  top: 2px;
  left: 2px;
}

/* Checked state */
.md-switch__input:checked + .md-switch__track {
  background: var(--md-sys-color-primary, #6750a4);
  border-color: var(--md-sys-color-primary, #6750a4);
}

.md-switch__input:checked + .md-switch__track .md-switch__handle {
  background: var(--md-sys-color-on-primary, #ffffff);
  transform: translateX(20px);
}

.md-switch--small .md-switch__input:checked + .md-switch__track .md-switch__handle {
  transform: translateX(16px);
}

.md-switch--large .md-switch__input:checked + .md-switch__track .md-switch__handle {
  transform: translateX(24px);
}

.md-switch__input:checked + .md-switch__track .md-switch__icon--on {
  opacity: 1;
}

.md-switch__input:checked + .md-switch__track .md-switch__icon--off {
  opacity: 0;
}

/* Focus state */
.md-switch__input:focus + .md-switch__track {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: 2px;
}

/* Hover state */
.md-switch:hover:not(.md-switch--disabled) .md-switch__track::before {
  content: '';
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: var(--md-sys-color-on-surface, #1c1b1f);
  opacity: 0.08;
  transition: opacity 0.2s ease;
}

.md-switch__input:checked + .md-switch__track:hover::before {
  background: var(--md-sys-color-primary, #6750a4);
  opacity: 0.08;
}

/* Active/pressed state */
.md-switch__input:active + .md-switch__track .md-switch__handle {
  width: 28px;
}

.md-switch__input:checked:active + .md-switch__track .md-switch__handle {
  transform: translateX(16px);
}

/* Disabled state */
.md-switch--disabled .md-switch__track {
  background: var(--md-sys-color-surface-variant, #e7e0ec);
  border-color: var(--md-sys-color-on-surface, #1c1b1f);
  opacity: 0.12;
}

.md-switch--disabled .md-switch__handle {
  background: var(--md-sys-color-on-surface, #1c1b1f);
  opacity: 0.38;
}`;

  let js = '';
  if (framework === 'alpine') {
    js = generateSwitchAlpineJS(props, checked, disabled, name);
  } else if (framework === 'vanilla-js') {
    js = generateSwitchVanillaJS();
  }

  return { html, css, js };
}

/**
 * Generate TextField component
 */
export function generateTextField(props: any, framework: Framework): ComponentCode {
  const type = props.type || 'text'; // text, email, password, tel, url, search, number
  const variant = props.variant || 'filled'; // filled, outlined
  const label = props.label || '';
  const placeholder = props.placeholder || '';
  const value = props.value || '';
  const name = props.name || 'textfield';
  const disabled = props.disabled || false;
  const required = props.required || false;
  const readonly = props.readonly || false;
  const error = props.error || '';
  const supportingText = props.supportingText || '';
  const maxLength = props.maxLength;
  const leadingIcon = props.leadingIcon;
  const trailingIcon = props.trailingIcon;
  const id = props.id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
  const size = props.size || 'medium'; // small, medium, large
  
  const containerClasses = [
    'md-textfield',
    `md-textfield--${variant}`,
    `md-textfield--${size}`,
    disabled ? 'md-textfield--disabled' : '',
    error ? 'md-textfield--error' : '',
    leadingIcon ? 'md-textfield--leading-icon' : '',
    trailingIcon ? 'md-textfield--trailing-icon' : ''
  ].filter(Boolean).join(' ');
  
  const inputAttributes = [
    `type="${type}"`,
    `id="${id}"`,
    `name="${name}"`,
    placeholder ? `placeholder="${placeholder}"` : '',
    value ? `value="${value}"` : '',
    disabled ? 'disabled' : '',
    required ? 'required' : '',
    readonly ? 'readonly' : '',
    maxLength ? `maxlength="${maxLength}"` : '',
    error ? 'aria-invalid="true"' : '',
    error ? `aria-describedby="${id}-error"` : supportingText ? `aria-describedby="${id}-supporting"` : ''
  ].filter(Boolean).join(' ');

  const leadingIconElement = leadingIcon ? `
    <div class="md-textfield__leading-icon">
      <svg class="md-textfield__icon" viewBox="0 0 24 24">
        ${getIconPath(leadingIcon)}
      </svg>
    </div>` : '';

  const trailingIconElement = trailingIcon ? `
    <div class="md-textfield__trailing-icon">
      <svg class="md-textfield__icon" viewBox="0 0 24 24">
        ${getIconPath(trailingIcon)}
      </svg>
    </div>` : '';

  const labelElement = label ? `
    <label class="md-textfield__label" for="${id}">${label}${required ? ' *' : ''}</label>` : '';

  const characterCount = maxLength ? `
    <div class="md-textfield__character-count">
      <span class="md-textfield__character-current">0</span>/${maxLength}
    </div>` : '';

  const supportingElement = (error || supportingText || maxLength) ? `
    <div class="md-textfield__supporting-text">
      ${error ? `<div class="md-textfield__error-text" id="${id}-error">${error}</div>` : ''}
      ${supportingText && !error ? `<div class="md-textfield__supporting" id="${id}-supporting">${supportingText}</div>` : ''}
      ${characterCount}
    </div>` : '';

  const html = `<div class="${containerClasses}">
  ${labelElement}
  <div class="md-textfield__field">
    ${leadingIconElement}
    <input ${inputAttributes} class="md-textfield__input">
    ${trailingIconElement}
  </div>
  ${supportingElement}
</div>`;

  const css = `/* Material Design 3 Text Field */
.md-textfield {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 280px;
  font-family: 'Roboto', system-ui, sans-serif;
}

.md-textfield__label {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.md-textfield__field {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 56px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.md-textfield__input {
  flex: 1;
  padding: 16px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--md-sys-color-on-surface, #1c1b1f);
  font-size: 16px;
  line-height: 24px;
  font-family: inherit;
  min-width: 0;
}

.md-textfield__input::placeholder {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  opacity: 1;
}

/* Filled variant */
.md-textfield--filled .md-textfield__field {
  background: var(--md-sys-color-surface-container-highest, #e6e1e5);
  border-bottom: 1px solid var(--md-sys-color-on-surface-variant, #49454f);
  border-radius: 4px 4px 0 0;
}

.md-textfield--filled .md-textfield__field:hover {
  background: var(--md-sys-color-on-surface, #1c1b1f);
  background-opacity: 0.04;
}

.md-textfield--filled .md-textfield__input:focus + * {
  border-bottom-width: 2px;
  border-bottom-color: var(--md-sys-color-primary, #6750a4);
}

/* Outlined variant */
.md-textfield--outlined .md-textfield__field {
  background: transparent;
  border: 1px solid var(--md-sys-color-outline, #79747e);
  border-radius: 4px;
}

.md-textfield--outlined .md-textfield__field:hover {
  border-color: var(--md-sys-color-on-surface, #1c1b1f);
}

.md-textfield--outlined .md-textfield__input:focus {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: -2px;
}

/* Size variants */
.md-textfield--small .md-textfield__field {
  min-height: 48px;
}

.md-textfield--small .md-textfield__input {
  padding: 12px;
  font-size: 14px;
}

.md-textfield--large .md-textfield__field {
  min-height: 64px;
}

.md-textfield--large .md-textfield__input {
  padding: 20px;
  font-size: 18px;
}

/* Icons */
.md-textfield__leading-icon,
.md-textfield__trailing-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 0 12px;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  flex-shrink: 0;
}

.md-textfield__icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.md-textfield--leading-icon .md-textfield__input {
  padding-left: 4px;
}

.md-textfield--trailing-icon .md-textfield__input {
  padding-right: 4px;
}

/* Supporting text */
.md-textfield__supporting-text {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
  padding: 0 16px;
  font-size: 12px;
  line-height: 16px;
}

.md-textfield__supporting,
.md-textfield__character-count {
  color: var(--md-sys-color-on-surface-variant, #49454f);
}

.md-textfield__error-text {
  color: var(--md-sys-color-error, #ba1a1a);
}

.md-textfield__character-count {
  white-space: nowrap;
}

/* Error state */
.md-textfield--error .md-textfield__label {
  color: var(--md-sys-color-error, #ba1a1a);
}

.md-textfield--error.md-textfield--filled .md-textfield__field {
  border-bottom-color: var(--md-sys-color-error, #ba1a1a);
}

.md-textfield--error.md-textfield--outlined .md-textfield__field {
  border-color: var(--md-sys-color-error, #ba1a1a);
}

.md-textfield--error .md-textfield__leading-icon,
.md-textfield--error .md-textfield__trailing-icon {
  color: var(--md-sys-color-error, #ba1a1a);
}

/* Disabled state */
.md-textfield--disabled {
  opacity: 0.38;
  pointer-events: none;
}

.md-textfield--disabled .md-textfield__input {
  color: var(--md-sys-color-on-surface, #1c1b1f);
}

/* Focus states */
.md-textfield__input:focus + .md-textfield__label {
  color: var(--md-sys-color-primary, #6750a4);
}

/* Read-only state */
.md-textfield__input[readonly] {
  cursor: default;
}

/* Required indicator */
.md-textfield__label .required {
  color: var(--md-sys-color-error, #ba1a1a);
}`;

  let js = '';
  if (framework === 'alpine') {
    js = generateTextFieldAlpineJS(props, value, name, maxLength);
  } else if (framework === 'vanilla-js') {
    js = generateTextFieldVanillaJS();
  }

  return { html, css, js };
}

/**
 * Generate Select component
 */
export function generateSelect(props: any, framework: Framework): ComponentCode {
  const name = props.name || 'select';
  const label = props.label || '';
  const placeholder = props.placeholder || 'Choose an option';
  const options = props.options || [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];
  const selectedValue = props.value || '';
  const disabled = props.disabled || false;
  const required = props.required || false;
  const error = props.error || '';
  const supportingText = props.supportingText || '';
  const id = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const variant = props.variant || 'filled'; // filled, outlined
  
  const containerClasses = [
    'md-select',
    `md-select--${variant}`,
    disabled ? 'md-select--disabled' : '',
    error ? 'md-select--error' : ''
  ].filter(Boolean).join(' ');
  
  const selectAttributes = [
    `id="${id}"`,
    `name="${name}"`,
    disabled ? 'disabled' : '',
    required ? 'required' : '',
    error ? 'aria-invalid="true"' : '',
    error ? `aria-describedby="${id}-error"` : supportingText ? `aria-describedby="${id}-supporting"` : ''
  ].filter(Boolean).join(' ');

  const optionElements = options.map((option: any) => {
    const isSelected = option.value === selectedValue;
    return `    <option value="${option.value}" ${isSelected ? 'selected' : ''}>${option.label}</option>`;
  }).join('\n');

  const labelElement = label ? `
    <label class="md-select__label" for="${id}">${label}${required ? ' *' : ''}</label>` : '';

  const supportingElement = (error || supportingText) ? `
    <div class="md-select__supporting-text">
      ${error ? `<div class="md-select__error-text" id="${id}-error">${error}</div>` : ''}
      ${supportingText && !error ? `<div class="md-select__supporting" id="${id}-supporting">${supportingText}</div>` : ''}
    </div>` : '';

  const html = `<div class="${containerClasses}">
  ${labelElement}
  <div class="md-select__field">
    <select ${selectAttributes} class="md-select__input">
      ${placeholder && !selectedValue ? `<option value="" disabled selected>${placeholder}</option>` : ''}
${optionElements}
    </select>
    <div class="md-select__dropdown-icon">
      <svg viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </div>
  </div>
  ${supportingElement}
</div>`;

  const css = `/* Material Design 3 Select */
.md-select {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 280px;
  font-family: 'Roboto', system-ui, sans-serif;
}

.md-select__label {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.md-select__field {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 56px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.md-select__input {
  flex: 1;
  padding: 16px;
  padding-right: 48px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--md-sys-color-on-surface, #1c1b1f);
  font-size: 16px;
  line-height: 24px;
  font-family: inherit;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.md-select__dropdown-icon {
  position: absolute;
  right: 12px;
  width: 24px;
  height: 24px;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  pointer-events: none;
  transition: transform 0.2s ease;
}

.md-select__dropdown-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

/* Filled variant */
.md-select--filled .md-select__field {
  background: var(--md-sys-color-surface-container-highest, #e6e1e5);
  border-bottom: 1px solid var(--md-sys-color-on-surface-variant, #49454f);
  border-radius: 4px 4px 0 0;
}

.md-select--filled .md-select__field:hover {
  background: var(--md-sys-color-on-surface, #1c1b1f);
  background-opacity: 0.04;
}

.md-select--filled .md-select__input:focus {
  border-bottom-width: 2px;
  border-bottom-color: var(--md-sys-color-primary, #6750a4);
}

/* Outlined variant */
.md-select--outlined .md-select__field {
  background: transparent;
  border: 1px solid var(--md-sys-color-outline, #79747e);
  border-radius: 4px;
}

.md-select--outlined .md-select__field:hover {
  border-color: var(--md-sys-color-on-surface, #1c1b1f);
}

.md-select--outlined .md-select__input:focus {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: -2px;
}

/* Supporting text */
.md-select__supporting-text {
  margin-top: 4px;
  padding: 0 16px;
  font-size: 12px;
  line-height: 16px;
}

.md-select__supporting {
  color: var(--md-sys-color-on-surface-variant, #49454f);
}

.md-select__error-text {
  color: var(--md-sys-color-error, #ba1a1a);
}

/* Error state */
.md-select--error .md-select__label {
  color: var(--md-sys-color-error, #ba1a1a);
}

.md-select--error.md-select--filled .md-select__field {
  border-bottom-color: var(--md-sys-color-error, #ba1a1a);
}

.md-select--error.md-select--outlined .md-select__field {
  border-color: var(--md-sys-color-error, #ba1a1a);
}

.md-select--error .md-select__dropdown-icon {
  color: var(--md-sys-color-error, #ba1a1a);
}

/* Disabled state */
.md-select--disabled {
  opacity: 0.38;
  pointer-events: none;
}

.md-select--disabled .md-select__input {
  color: var(--md-sys-color-on-surface, #1c1b1f);
  cursor: not-allowed;
}

/* Focus states */
.md-select__input:focus + .md-select__dropdown-icon {
  transform: rotate(180deg);
}

.md-select__input:focus ~ .md-select__label {
  color: var(--md-sys-color-primary, #6750a4);
}`;

  let js = '';
  if (framework === 'alpine') {
    js = generateSelectAlpineJS(props, selectedValue, name);
  } else if (framework === 'vanilla-js') {
    js = generateSelectVanillaJS();
  }

  return { html, css, js };
}

/**
 * Generate Slider component
 */
export function generateSlider(props: any, framework: Framework): ComponentCode {
  const name = props.name || 'slider';
  const min = props.min || 0;
  const max = props.max || 100;
  const value = props.value || 50;
  const step = props.step || 1;
  const disabled = props.disabled || false;
  const label = props.label || '';
  const showValue = props.showValue !== false; // Default true
  const showTicks = props.showTicks || false;
  const discrete = props.discrete || false;
  const size = props.size || 'medium'; // small, medium, large
  const id = props.id || `slider-${Math.random().toString(36).substr(2, 9)}`;
  
  const sliderClasses = [
    'md-slider',
    `md-slider--${size}`,
    disabled ? 'md-slider--disabled' : '',
    discrete ? 'md-slider--discrete' : '',
    showTicks ? 'md-slider--with-ticks' : ''
  ].filter(Boolean).join(' ');
  
  const inputAttributes = [
    `type="range"`,
    `id="${id}"`,
    `name="${name}"`,
    `min="${min}"`,
    `max="${max}"`,
    `value="${value}"`,
    `step="${step}"`,
    disabled ? 'disabled' : '',
    `aria-label="${label || 'Slider'}"`
  ].filter(Boolean).join(' ');

  // Generate tick marks if needed
  const tickMarks = showTicks ? generateTickMarks(min, max, step) : '';
  
  const labelElement = label ? `
    <label class="md-slider__label" for="${id}">${label}</label>` : '';

  const valueDisplay = showValue ? `
    <div class="md-slider__value-display">
      <span class="md-slider__current-value">${value}</span>
    </div>` : '';

  const html = `<div class="${sliderClasses}">
  ${labelElement}
  <div class="md-slider__container">
    <input ${inputAttributes} class="md-slider__input">
    <div class="md-slider__track">
      <div class="md-slider__track-active"></div>
      <div class="md-slider__handle">
        ${discrete ? '<div class="md-slider__handle-label"></div>' : ''}
      </div>
    </div>
    ${tickMarks}
  </div>
  ${valueDisplay}
</div>`;

  const css = `/* Material Design 3 Slider */
.md-slider {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 280px;
  font-family: 'Roboto', system-ui, sans-serif;
}

.md-slider__label {
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
}

.md-slider__container {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
}

.md-slider__input {
  position: absolute;
  width: 100%;
  height: 48px;
  opacity: 0;
  cursor: pointer;
  margin: 0;
  z-index: 2;
}

.md-slider__track {
  position: relative;
  width: 100%;
  height: 4px;
  background: var(--md-sys-color-surface-variant, #e7e0ec);
  border-radius: 2px;
  overflow: visible;
}

.md-slider__track-active {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--md-sys-color-primary, #6750a4);
  border-radius: 2px;
  width: 50%; /* Will be updated by JavaScript */
  transition: width 0.2s ease;
}

.md-slider__handle {
  position: absolute;
  top: 50%;
  left: 50%; /* Will be updated by JavaScript */
  width: 20px;
  height: 20px;
  background: var(--md-sys-color-primary, #6750a4);
  border: 2px solid var(--md-sys-color-surface, #fffbfe);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 1;
}

.md-slider__handle-label {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--md-sys-color-primary, #6750a4);
  color: var(--md-sys-color-on-primary, #ffffff);
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  margin-bottom: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.md-slider__value-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  color: var(--md-sys-color-on-surface-variant, #49454f);
  font-size: 12px;
}

.md-slider__current-value {
  font-weight: 500;
  color: var(--md-sys-color-primary, #6750a4);
}

/* Size variants */
.md-slider--small .md-slider__container {
  height: 32px;
  padding: 0 12px;
}

.md-slider--small .md-slider__handle {
  width: 16px;
  height: 16px;
}

.md-slider--large .md-slider__container {
  height: 56px;
  padding: 0 28px;
}

.md-slider--large .md-slider__track {
  height: 6px;
}

.md-slider--large .md-slider__handle {
  width: 24px;
  height: 24px;
}

/* Discrete slider */
.md-slider--discrete .md-slider__handle:hover .md-slider__handle-label,
.md-slider--discrete .md-slider__handle:focus .md-slider__handle-label,
.md-slider--discrete .md-slider__handle:active .md-slider__handle-label {
  opacity: 1;
}

/* Tick marks */
.md-slider__ticks {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  transform: translateY(-50%);
  pointer-events: none;
}

.md-slider__tick {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--md-sys-color-on-surface-variant, #49454f);
  border-radius: 50%;
  transform: translateX(-50%);
}

.md-slider__tick--active {
  background: var(--md-sys-color-primary, #6750a4);
}

/* Hover states */
.md-slider:hover:not(.md-slider--disabled) .md-slider__handle {
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 2px 8px rgba(103, 80, 164, 0.3);
}

/* Focus states */
.md-slider__input:focus + .md-slider__track .md-slider__handle {
  outline: 2px solid var(--md-sys-color-primary, #6750a4);
  outline-offset: 2px;
}

/* Active states */
.md-slider__input:active + .md-slider__track .md-slider__handle {
  transform: translate(-50%, -50%) scale(1.3);
}

/* Disabled state */
.md-slider--disabled {
  opacity: 0.38;
  pointer-events: none;
}

.md-slider--disabled .md-slider__handle {
  background: var(--md-sys-color-on-surface, #1c1b1f);
  border-color: var(--md-sys-color-surface, #fffbfe);
}

.md-slider--disabled .md-slider__track-active {
  background: var(--md-sys-color-on-surface, #1c1b1f);
}`;

  let js = '';
  if (framework === 'alpine') {
    js = generateSliderAlpineJS(props, value, min, max, step, name);
  } else if (framework === 'vanilla-js') {
    js = generateSliderVanillaJS();
  }

  return { html, css, js };
}

// Helper functions for JavaScript generation
function generateCheckboxAlpineJS(props: any): string {
  return `// Checkbox Alpine.js behavior
// Handles checked state, validation, etc.`;
}

function generateRadioAlpineJS(props: any, selectedValue: string, options: any[]): string {
  return `<!-- Alpine.js data -->
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('radioGroup', () => ({
    selected: '${selectedValue}',
    options: ${JSON.stringify(options)},
    
    select(value) {
      if (!this.disabled) {
        this.selected = value;
        this.$dispatch('radio-changed', { value });
      }
    },
    
    isSelected(value) {
      return this.selected === value;
    }
  }));
});
</script>`;
}

function generateRadioVanillaJS(): string {
  return `// Vanilla JavaScript for Radio Group
function initRadioGroup(groupElement) {
  const radios = groupElement.querySelectorAll('.md-radio__input');
  
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        // Dispatch custom event
        const event = new CustomEvent('radioChanged', {
          detail: { 
            name: this.name,
            value: this.value,
            label: this.closest('.md-radio').querySelector('.md-radio__label').textContent
          }
        });
        groupElement.dispatchEvent(event);
      }
    });
    
    // Keyboard navigation
    radio.addEventListener('keydown', function(e) {
      const radios = Array.from(groupElement.querySelectorAll('.md-radio__input'));
      const currentIndex = radios.indexOf(this);
      let nextIndex;
      
      switch(e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % radios.length;
          radios[nextIndex].focus();
          radios[nextIndex].checked = true;
          radios[nextIndex].dispatchEvent(new Event('change'));
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + radios.length) % radios.length;
          radios[nextIndex].focus();
          radios[nextIndex].checked = true;
          radios[nextIndex].dispatchEvent(new Event('change'));
          break;
      }
    });
  });
}

// Auto-initialize all radio groups
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-radio-group').forEach(initRadioGroup);
});`;
}

function generateSwitchAlpineJS(props: any, checked: boolean, disabled: boolean, name: string): string {
  return `<!-- Alpine.js data -->
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('switchComponent', () => ({
    checked: ${checked},
    disabled: ${disabled},
    
    toggle() {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.$dispatch('switch-changed', { 
          checked: this.checked,
          name: '${name}'
        });
      }
    },
    
    handleKeydown(e) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    }
  }));
});
</script>`;
}

function generateSwitchVanillaJS(): string {
  return `// Vanilla JavaScript for Switch
function initSwitch(switchElement) {
  const input = switchElement.querySelector('.md-switch__input');
  
  if (!input) return;
  
  // Toggle functionality
  function toggle() {
    if (!input.disabled) {
      input.checked = !input.checked;
      input.setAttribute('aria-checked', input.checked.toString());
      
      // Dispatch custom event
      const event = new CustomEvent('switchChanged', {
        detail: { 
          checked: input.checked,
          name: input.name,
          id: input.id
        }
      });
      switchElement.dispatchEvent(event);
    }
  }
  
  // Click handler for track
  const track = switchElement.querySelector('.md-switch__track');
  if (track) {
    track.addEventListener('click', toggle);
  }
  
  // Keyboard handling
  input.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  });
  
  // Change event
  input.addEventListener('change', function() {
    this.setAttribute('aria-checked', this.checked.toString());
  });
}

// Auto-initialize all switches
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-switch').forEach(initSwitch);
});`;
}

function generateTextFieldAlpineJS(props: any, value: string, name: string, maxLength?: number): string {
  return `<!-- Alpine.js data -->
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('textField', () => ({
    value: '${value}',
    maxLength: ${maxLength || 'null'},
    
    get characterCount() {
      return this.value ? this.value.length : 0;
    },
    
    get isOverLimit() {
      return this.maxLength && this.characterCount > this.maxLength;
    },
    
    updateCharacterCount() {
      const countElement = this.$el.querySelector('.md-textfield__character-current');
      if (countElement) {
        countElement.textContent = this.characterCount;
      }
    },
    
    handleInput(event) {
      this.value = event.target.value;
      this.updateCharacterCount();
      this.$dispatch('textfield-input', { 
        value: this.value,
        name: '${name}'
      });
    },
    
    handleFocus() {
      this.$dispatch('textfield-focus', { name: '${name}' });
    },
    
    handleBlur() {
      this.$dispatch('textfield-blur', { 
        value: this.value,
        name: '${name}'
      });
    }
  }));
});
</script>`;
}

function generateTextFieldVanillaJS(): string {
  return `// Vanilla JavaScript for Text Field
function initTextField(textFieldElement) {
  const input = textFieldElement.querySelector('.md-textfield__input');
  const characterCurrent = textFieldElement.querySelector('.md-textfield__character-current');
  
  if (!input) return;
  
  // Character count update
  function updateCharacterCount() {
    if (characterCurrent) {
      characterCurrent.textContent = input.value.length;
    }
  }
  
  // Input event
  input.addEventListener('input', function(e) {
    updateCharacterCount();
    
    const event = new CustomEvent('textFieldInput', {
      detail: { 
        value: this.value,
        name: this.name,
        id: this.id
      }
    });
    textFieldElement.dispatchEvent(event);
  });
  
  // Focus events
  input.addEventListener('focus', function() {
    textFieldElement.classList.add('md-textfield--focused');
    
    const event = new CustomEvent('textFieldFocus', {
      detail: { name: this.name, id: this.id }
    });
    textFieldElement.dispatchEvent(event);
  });
  
  input.addEventListener('blur', function() {
    textFieldElement.classList.remove('md-textfield--focused');
    
    const event = new CustomEvent('textFieldBlur', {
      detail: { 
        value: this.value,
        name: this.name,
        id: this.id
      }
    });
    textFieldElement.dispatchEvent(event);
  });
  
  // Initial character count
  updateCharacterCount();
}

// Auto-initialize all text fields
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-textfield').forEach(initTextField);
});`;
}

function generateSelectAlpineJS(props: any, selectedValue: string, name: string): string {
  return `<!-- Alpine.js data -->
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('selectComponent', () => ({
    value: '${selectedValue}',
    
    handleChange(event) {
      this.value = event.target.value;
      this.$dispatch('select-change', { 
        value: this.value,
        name: '${name}'
      });
    }
  }));
});
</script>`;
}

function generateSelectVanillaJS(): string {
  return `// Vanilla JavaScript for Select
function initSelect(selectElement) {
  const input = selectElement.querySelector('.md-select__input');
  
  if (!input) return;
  
  // Change event
  input.addEventListener('change', function(e) {
    const event = new CustomEvent('selectChange', {
      detail: { 
        value: this.value,
        name: this.name,
        id: this.id,
        selectedText: this.options[this.selectedIndex].text
      }
    });
    selectElement.dispatchEvent(event);
  });
  
  // Focus events for dropdown icon animation
  input.addEventListener('focus', function() {
    selectElement.classList.add('md-select--focused');
  });
  
  input.addEventListener('blur', function() {
    selectElement.classList.remove('md-select--focused');
  });
}

// Auto-initialize all selects
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-select').forEach(initSelect);
});`;
}

function generateSliderAlpineJS(props: any, value: number, min: number, max: number, step: number, name: string): string {
  return `<!-- Alpine.js data -->
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('sliderComponent', () => ({
    value: ${value},
    min: ${min},
    max: ${max},
    step: ${step},
    
    get percentage() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },
    
    updateValue(event) {
      this.value = parseFloat(event.target.value);
      this.updateUI();
      this.$dispatch('slider-change', { 
        value: this.value,
        name: '${name}'
      });
    },
    
    updateUI() {
      const track = this.$el.querySelector('.md-slider__track-active');
      const handle = this.$el.querySelector('.md-slider__handle');
      const valueDisplay = this.$el.querySelector('.md-slider__current-value');
      const handleLabel = this.$el.querySelector('.md-slider__handle-label');
      
      if (track) {
        track.style.width = this.percentage + '%';
      }
      
      if (handle) {
        handle.style.left = this.percentage + '%';
      }
      
      if (valueDisplay) {
        valueDisplay.textContent = this.value;
      }
      
      if (handleLabel) {
        handleLabel.textContent = this.value;
      }
    },
    
    init() {
      this.$nextTick(() => {
        this.updateUI();
      });
    }
  }));
});
</script>`;
}

function generateSliderVanillaJS(): string {
  return `// Vanilla JavaScript for Slider
function initSlider(sliderElement) {
  const input = sliderElement.querySelector('.md-slider__input');
  const track = sliderElement.querySelector('.md-slider__track-active');
  const handle = sliderElement.querySelector('.md-slider__handle');
  const valueDisplay = sliderElement.querySelector('.md-slider__current-value');
  const handleLabel = sliderElement.querySelector('.md-slider__handle-label');
  
  if (!input) return;
  
  function updateSlider() {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const percentage = ((value - min) / (max - min)) * 100;
    
    if (track) {
      track.style.width = percentage + '%';
    }
    
    if (handle) {
      handle.style.left = percentage + '%';
    }
    
    if (valueDisplay) {
      valueDisplay.textContent = value;
    }
    
    if (handleLabel) {
      handleLabel.textContent = value;
    }
  }
  
  // Input event
  input.addEventListener('input', function(e) {
    updateSlider();
    
    const event = new CustomEvent('sliderChange', {
      detail: { 
        value: parseFloat(this.value),
        name: this.name,
        id: this.id
      }
    });
    sliderElement.dispatchEvent(event);
  });
  
  // Initial update
  updateSlider();
}

// Auto-initialize all sliders
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.md-slider').forEach(initSlider);
});`;
}

// Helper function for generating tick marks
function generateTickMarks(min: number, max: number, step: number): string {
  const ticks = [];
  const range = max - min;
  const tickCount = Math.floor(range / step) + 1;
  
  for (let i = 0; i < tickCount; i++) {
    const value = min + (i * step);
    const percentage = ((value - min) / range) * 100;
    ticks.push(`    <div class="md-slider__tick" style="left: ${percentage}%"></div>`);
  }
  
  return `
  <div class="md-slider__ticks">
${ticks.join('\n')}
  </div>`;
}

// Helper function for getting icon paths
function getIconPath(iconName: string): string {
  const icons: Record<string, string> = {
    'search': '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
    'email': '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
    'lock': '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
    'person': '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
    'phone': '<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>',
    'visibility': '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
    'visibility_off': '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
  };
  
  return icons[iconName] || icons['search'];
}