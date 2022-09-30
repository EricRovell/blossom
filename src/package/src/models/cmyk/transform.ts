import { round } from "@utils/helpers";
import type { ColorRGB, ColorCMYK } from "../../types";

/**
 * Transforms the CMYK color object to RGB.
 */
export function cmyk2rgb({ c, m, y, k, a = 1 }: ColorCMYK): ColorRGB {
	return {
		r: round(255 * (1 - c / 100) * (1 - k / 100)),
		g: round(255 * (1 - m / 100) * (1 - k / 100)),
		b: round(255 * (1 - y / 100) * (1 - k / 100)),
		a: a ? round(a, 2) : 1
	};
}
