import { clamp, clampDegrees, round } from "@util/helpers";
import type { ColorHSV, ColorRGB } from "../../types";
import { rgb2hsv } from "../rgb";

/**
 * Clamps the HSV color object values.
 */
export function clampHSV({ h, s, v, a = 1 }: ColorHSV): ColorHSV {
	return {
		h: clampDegrees(h),
		s: clamp(s, 0, 100),
		v: clamp(v, 0, 100),
		a: clamp(a)
	};
}

/**
 * Rounds the HSV color object values.
 */
export function roundHSV({ h, s, v, a = 1 }: ColorHSV): ColorHSV {
	return {
		h: round(h),
		s: round(s),
		v: round(v),
		a: round(a)
	};
}

/**
 * Transforms the RGB color object to HSL color string.
 * Functional whitespace syntax is used.
 */
export function rgb2hsvString(rgb: ColorRGB): string {
	const { h, s, v, a = 1 } = roundHSV(rgb2hsv(rgb));
	return a < 1
		? `hsv(${h}deg ${s}% ${v}% / ${a})`
		: `hsv(${h}deg ${s}% ${v}%)`;
}