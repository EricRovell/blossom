import type { ColorRGB } from "../../types";
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
 * Maps RGB channels to linear light (un-companded) form in range [0, 1].
 * Linear RGB values widely used to color space transformations and contrast calculations.
 */
export function makeLinearChannels(value: number): number {
	const ratio = value / 255;
	return ratio < 0.04045
		? ratio / 12.92
		: ((ratio + 0.055) / 1.055) ** 2.4;
}

/**
 * Converts a linear sRGB channel in range [0, 1] to it's gamma corrected form [0; 255].
 */
export function revertLinearChannels(ratio: number): number {
	const value = ratio > 0.0031308
		? 1.055 * Math.pow(ratio, 1 / 2.4) - 0.055
		: 12.92 * ratio;

	return value * 255;
}