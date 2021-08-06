import { clamp } from "@util/helpers";
import { rgb2hsl } from "@models/rgb";
import type { ColorRGB, ColorHSL } from "../types";

/**
 * Changes the lightness of a color by a given amount.
 */
export function lighten(color: ColorRGB, amount = 0.1): ColorHSL {
	const { h, s, l, a } = rgb2hsl(color);

	return {
		h,
		s,
		l: clamp(l + amount * 100, 0, 100),
		a
	};
}