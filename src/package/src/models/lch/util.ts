import { clamp, clampDegrees, round } from "@utils/helpers";
import type { ColorLCH } from "../../types";

/**
 * Clamps the LCH color object values.
 * 
 * https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 * https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/#how-does-lch-work
 */
export function clampLCH({ l, c, h, a = 1 }: ColorLCH): ColorLCH {
	return {
		l: clamp(l, 0, 100),
		c,
		h: clampDegrees(h),
		a: clamp(a)
	};
}

/**
 * Rounds the HSV color object values.
 */
export function roundLCH({ l, c, h, a = 1 }: ColorLCH): ColorLCH {
	return {
		l: round(l, 2),
		c: round(c, 2),
		h: round(h, 2),
		a: round(a, 2)
	};
}
