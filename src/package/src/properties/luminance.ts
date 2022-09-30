import { makeLinearChannels } from "@models/rgb";
import type { ColorRGB } from "../types";

/**
 * Retuns the percieved luminance of a color in range [0, 1].
 * [According to WCAG 2.0](https://www.w3.org/TR/WCAG20/#relativeluminancedef)
 */
export function getLuminance({ r, g, b }: ColorRGB): number {
	const [ red, green, blue ] = [ r, g, b ].map(value => makeLinearChannels(value));
	return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
