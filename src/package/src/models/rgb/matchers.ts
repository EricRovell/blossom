/**
 * Matches the RGB color functional syntax string:
 * 
 * `rgb(<percentage>, <percentage>, <percentage> [, <alpha-value>])`
 * 
 * `rgb(<number>, <number>, <number> [, <alpha-value>])`
 */
export const matcherRGBComma = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

/**
 * Matches the RGB color functional whitespace syntax string:
 * 
 * `rgb(<percentage> <percentage> <percentage> [/ <alpha-value>])`
 * 
 * `rgb(<number> <number> <number> [/ <alpha-value>])`
 */
export const matcherRGBSpace = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
