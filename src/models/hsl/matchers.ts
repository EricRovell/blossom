/**
 * Matches the HSL color functional syntax string:
 * 
 * `hsl(<hue>, <percentage>, <percentage> [, <alpha-value>])`
 */
export const matcherHSLComma = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

/**
 * Matches the HSL color functional whitespace syntax string:
 * 
 * `hsl(<hue> <percentage> <percentage> [/ <alpha-value>])`
 */
export const matcherHSLSpace = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;