import type { ColorRGB } from "../types";

/**
 * Calculates the square of the distance between two colors.
 * 
 * As this function better be used to find matches, there is not need to take root for better performance.
 */
export function getDistanceSq(color1: ColorRGB, color2: ColorRGB): number {
	const { r: r1, g: g1, b: b1 } = color1;
	const { r: r2, g: g2, b: b2 } = color2;
	return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}