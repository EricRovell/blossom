import { clamp, clampDegrees, round } from "@util/helpers";
import type { ColorHSL } from "../../types";

/**
 * Clamps the HSL color object values.
 */
export function clampHSL({ h, s, l, a = 1 }: ColorHSL): ColorHSL {
	return {
		h: clampDegrees(h),
		s: clamp(s, 0, 100),
		l: clamp(l, 0, 100),
		a: clamp(a)
	};
}

/**
 * Rounds the HSL color object values.
 */
export function roundHSL({ h, s, l, a = 1 }: ColorHSL): ColorHSL {
	return {
		h: round(h),
		s: round(s),
		l: round(l),
		a: round(a, 2)
	};
}