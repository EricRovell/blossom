import { clamp, round } from "@util/helpers";
import type { ColorLAB, ColorRGB } from "../../types";
import { rgb2lab } from "../rgb";

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

/**
 * Transforms the RGB color object to CIE LAB color string.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
 */
export function rgb2labString(rgb: ColorRGB): string {
	const { l, a, b, alpha = 1 } = roundLAB(rgb2lab(rgb));
	return alpha < 1
		? `lab(${l}% ${a} ${b} / ${alpha})`
		: `lab(${l}% ${a} ${b})`;
}