import type { ColorRGB } from "@types";
import { clamp, round } from "@util/helpers";

/**
 * Clamps the RGB color values.
 */
export function clampRGB({ r, g, b, a = 1 }: ColorRGB): ColorRGB {
	return {
		r: clamp(r, 0, 255),
		g: clamp(g, 0, 255),
		b: clamp(b, 0, 255),
		a: clamp(a)
	};
}

/**
 * Rounds the RGB color values.
 */
export function roundRGB({ r, g, b, a = 1 }: ColorRGB): ColorRGB {
	return {
		r: round(r),
		g: round(g),
		b: round(b),
		a: round(a, 2)
	};
}

/**
 * Transforms the RGB color object into string.
 */
export function rgb2string(color: ColorRGB): string {
	const { r, g, b, a = 1 } = roundRGB(color);
	return a < 1
		? `rgb(${r} ${g} ${b} / ${a})`
		: `rgb(${r} ${g} ${b})`;
}