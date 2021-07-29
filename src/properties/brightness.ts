import { ColorRGB } from "@types";

/**
 * Calculate the brightness level of a color in range [0; 1].
 * https://www.w3.org/TR/AERT/#color-contrast
 * https://en.wikipedia.org/wiki/YIQ
 */
export function calcBrightness({ r, g, b }: ColorRGB): number {
	return (r * 299 + g * 587 + b * 114) / 1000 / 255;
}