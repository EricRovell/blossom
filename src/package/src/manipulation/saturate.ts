import { rgb2hsl } from "@models/rgb";
import { clamp } from "@utils/helpers";
import type { ColorRGB, ColorHSL } from "../types";

/**
 * Changes a saturation value of color by a given amount in range [0, 1].
 */
export function saturate(color: ColorRGB, amount = 0.1): ColorHSL {
	const { h, s, l, a } = rgb2hsl(color);

	return {
		h,
		s: clamp(s + amount * 100, 0, 100),
		l,
		a
	};
}
