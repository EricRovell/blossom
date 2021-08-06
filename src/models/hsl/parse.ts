
import { hsl2rgb } from "./transform";
import { clampHSL } from "./util";
import { matcherHSLComma, matcherHSLSpace } from "./matchers";
import { checkValue, parseHue } from "@util/helpers";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses the HSL color string into RGB color object.
 */
export function parseHSLString(input: string): ColorRGB | null {
	const match =
    matcherHSLComma.exec(input) ??
    matcherHSLSpace.exec(input);
    
	if (!match) {
		return null;
	}
  
	const hsl = clampHSL({
		h: parseHue(match[1], match[2]),
		s: Number(match[3]),
		l: Number(match[4]),
		a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
	});
  
	return hsl2rgb(hsl);
}

/**
 * Parses the HSL color object into RGB.
 */
export function parseHSLColor({ h, s, l, a = 1 }: InputObject): ColorRGB | null {
	if (checkValue(h) && checkValue(s) && checkValue(l)) {
		const hsl = clampHSL({
			h: Number(h),
			s: Number(s),
			l: Number(l),
			a: Number(a)
		});
    
		return hsl2rgb(hsl);
	}
  
	return null;
}