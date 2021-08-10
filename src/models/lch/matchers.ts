/**
 * RegEx for CIE LCH color string.
 * 
 * lch(<percentage> <number> <hue> [/ <alpha-value>])
 */
export const matcherLCH = /^lch\(\s*([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;