import { getLuminance } from "./luminance";
import type { ColorRGB } from "../types";

/**
 * Returns a contrast ration for a color pair in range [1, 21].
 * [Read more](http://www.w3.org/TR/WCAG20/#contrast-ratiodef)
 */
export function getContrast(color1: ColorRGB, color2: ColorRGB): number {
	const luminance1 = getLuminance(color1) + 0.05;
	const luminance2 = getLuminance(color2) + 0.05;

	return luminance1 > luminance2
		? luminance1 / luminance2
		: luminance2 / luminance1;
}
