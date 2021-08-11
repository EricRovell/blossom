import type { ColorRGB, ColorHWB } from "../../types";
import { hsv2rgb } from "../hsv/transform";

/**
 * Convert HWB color object to RGB.
 */
export function hwb2rgb({ h, w, b, a = 1 }: ColorHWB): ColorRGB {
	return hsv2rgb({
		h,
		s: b === 100
			? 0
			: 100 - (w / (100 - b)) * 100,
		v: 100 - b,
		a
	});
}