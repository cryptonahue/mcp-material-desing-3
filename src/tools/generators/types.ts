/**
 * Shared types for component generators
 */

export interface ComponentCode {
  html: string;
  css: string;  
  js?: string;
}

export type Framework = 'css-only' | 'alpine' | 'vanilla-js';

export interface GeneratorFunction {
  (props: any, framework: string): ComponentCode;
}