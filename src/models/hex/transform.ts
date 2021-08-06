import { round } from "@util/helpers";
import { matchHEX } from "./matchers";
import type { ColorHEX, ColorRGB } from "../../types";

/**
 * Parses HEX color string and converts it to RGB Color object.
 */
export function hex2rgb(input: ColorHEX): ColorRGB | null {
	const match = matchHEX.exec(input);
  
	if (!match) {
		return null;
	}
  
	const value = match[1];
  
	// handle shorthand
	if (value.length <= 4) {
		return {
			r: parseInt(value[0] + value[0], 16),
			g: parseInt(value[1] + value[1], 16),
			b: parseInt(value[2] + value[2], 16),
			a: value.length === 4
				? round(parseInt(value[3] + value[3], 16) / 255, 2)
				: 1,
		};
	}
  
	// handle full string with or without opacity value
	if (value.length === 6 || value.length === 8) {
		return {
			r: parseInt(value.substr(0, 2), 16),
			g: parseInt(value.substr(2, 2), 16),
			b: parseInt(value.substr(4, 2), 16),
			a: value.length === 8
				? round(parseInt(value.substr(6, 2), 16) / 255, 2)
				: 1,
		};
	}
  
	return null;
}