/**
 * Matches the CMYK color functional syntax string:
 * 
 * `device-cmyk(<percentage> <percentage> <percentage> <percentage> [/ <alpha-value>])`
 */
export const matcherCMYK = /^device-cmyk\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
