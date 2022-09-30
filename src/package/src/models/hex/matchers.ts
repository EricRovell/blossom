/**
 * RegEx for HEX color string.
 * Matches in range of [3; 8] hex symbols,
 * so cases with invalid number of symbols should be validated (ex.: 5 or 7).
 */
export const matchHEX = /^#([0-9a-f]{3,8})$/i;
