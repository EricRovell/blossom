import { getDistanceSq } from "../properties";
import type { ColorRGB } from "../types";

/**
 * Performs a search for nearest color within a color collection Map.
 */
export function findNearestColor(source: ColorRGB, colors: Map<string, ColorRGB>): string {
	let shortest = Infinity;
	let colorKey = "";

	for (const [ key, color ] of colors) {
		const distance = getDistanceSq(source, color);
		if (distance < shortest) {
			colorKey = key;
			shortest = distance;
		}
	}

	return colorKey;
}
