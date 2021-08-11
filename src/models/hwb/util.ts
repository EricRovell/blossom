import { clamp, clampDegrees, round } from "@util/helpers";
import type { ColorHWB } from "../../types";

/**
 * Clamps the HWB color object values.
 */
export function clampHWB({ h, w, b, a = 1 }: ColorHWB): ColorHWB {
	return {
		h: clampDegrees(h),
		w: clamp(w, 0, 100),
		b: clamp(b, 0, 100),
		a: clamp(a)
	};
}

/**
 * Rounds the HWB color object values.
 */
export function roundHWB({ h, w, b, a = 1 }: ColorHWB): ColorHWB {
	return {
		h: round(h),
		w: round(w),
		b: round(b),
		a: round(a, 2)
	};
}