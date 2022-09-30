/**
 * Matches the HWB color functional syntax string:
 * 
 * `hwb(<hue> <percentage> <percentage> [/ <alpha-value>])`
 */
export const matcherHWB = /^hwb\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
