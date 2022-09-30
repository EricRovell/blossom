import { clampLAB, lab2rgb } from "@models/lab";
import { rgb2lab } from "@models/rgb";
import type { ColorRGB } from "../types";

/**
 * Mixes two colors with defined ratio.
 */
export function mix(color1: ColorRGB, color2: ColorRGB, ratio: number): ColorRGB {
	const { l: l1, a: a1, b: b1, alpha: alpha1 = 1 } = rgb2lab(color1);
	const { l: l2, a: a2, b: b2, alpha: alpha2 = 1 } = rgb2lab(color2);

	const mixture = clampLAB({
		l: l1 * (1 - ratio) + l2 * ratio,
		a: a1 * (1 - ratio) + a2 * ratio,
		b: b1 * (1 - ratio) + b2 * ratio,
		alpha: alpha1 * (1 - ratio) + alpha2 * ratio
	});

	return lab2rgb(mixture);
}
