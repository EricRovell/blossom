import { clamp, round } from "@util/helpers";
import type { ColorCMYK, ColorRGB } from "../../types";
import { rgb2cmyk } from "../rgb";

/**
 * Clamps the CMYK color object values.
 */
export function clampCMYK({ c, m, y, k, a = 1 }: ColorCMYK): ColorCMYK {
	return {
		c: clamp(c, 0, 100),
		m: clamp(m, 0, 100),
		y: clamp(y, 0, 100),
		k: clamp(k, 0, 100),
		a: clamp(a)
	};
}

/**
 * Rounds the CMYK color object values.
 */
export function roundCMYK({ c, m, y, k, a = 1 }: ColorCMYK): ColorCMYK {
	return {
		c: round(c, 2),
		m: round(m, 2),
		y: round(y, 2),
		k: round(k, 2),
		a: round(a, 2)
	};
}

/**
 * Converts RGB Color object to CMYK string.
 */
export function rgb2cmykString(color: ColorRGB): string {
	const { c, m, y, k, a } = roundCMYK(rgb2cmyk(color));
	return a && a < 1
		? `device-cmyk(${c}% ${m}% ${y}% ${k}% / ${a})`
		: `device-cmyk(${c}% ${m}% ${y}% ${k}%)`;
}