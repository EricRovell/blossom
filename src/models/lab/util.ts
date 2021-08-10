import { clamp, round } from "@util/helpers";
import type { ColorLAB } from "../../types";

/**
 * Convertion factors.
 * 
 * https://en.wikipedia.org/wiki/CIELAB_color_space
 */
export const factors = {
	e: 216 / 24389,
	k: 24389 / 27
};

/**
 * Clamps the LAB axis values.
 */
export function clampLAB({ l, a, b, alpha = 1 }: ColorLAB): ColorLAB {
	/**
	 * CIE Lightness values less than 0% must be clamped to 0%.
	 * Values greater than 100% are permitted for forwards compatibility with HDR.
	 * 
	 * A and B axis values are signed (allow both positive and negative values)
	 * and theoretically unbounded (but in practice do not exceed ±160).
	 */
	return {
		l: clamp(l, 0, 400),
		a,
		b,
		alpha: clamp(alpha)
	};
}

/**
 * Rounds the LAB color object values.
 */
export function roundLAB({ l, a, b, alpha = 1 }: ColorLAB): ColorLAB {
	return {
		l: round(l, 2),
		a: round(a, 2),
		b: round(b, 2),
		alpha: round(alpha, 2)
	};
}