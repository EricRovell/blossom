import { matcherLCH } from "./matchers";
import { checkValue, parseHue } from "@utils/helpers";
import { lch2rgb } from "./transform";
import { clampLCH } from "./util";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses the LCH color object into RGB.
 */
export function parseLCHColor({ l, c, h, a = 1 }: InputObject): ColorRGB | null {
	if (checkValue(l) && checkValue(c) && checkValue(h)) {
		const xyz = clampLCH({
			l: Number(l),
			c: Number(c),
			h: Number(h),
			a: Number(a)
		});

		return lch2rgb(xyz);
	}

	return null;
}


/**
 * Parses a valid LCH CSS color functional string.
 * 
 *  https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 */
export function parseLCHString(input: string): ColorRGB | null {
	const match = matcherLCH.exec(input);

	if (!match) {
		return null;
	}

	const lch = clampLCH({
		l: Number(match[1]),
		c: Number(match[2]),
		h: Number(parseHue(match[3], match[4])),
		a: match[5] ? Number(match[5]) / (match[6] ? 100 : 1) : 1
	});

	return lch2rgb(lch);
}
