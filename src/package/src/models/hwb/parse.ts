import { hwb2rgb } from "./transform";
import { clampHWB } from "./util";
import { matcherHWB } from "./matchers";
import { checkValue, parseHue } from "@utils/helpers";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses the HSL color string into RGB color object.
 */
export function parseHWBString(input: string): ColorRGB | null {
	const match =	matcherHWB.exec(input);

	if (!match) {
		return null;
	}

	const hsl = clampHWB({
		h: parseHue(match[1], match[2]),
		w: Number(match[3]),
		b: Number(match[4]),
		a: match[5]
			? Number(match[5]) / (match[6] ? 100 : 1)
			: 1
	});

	return hwb2rgb(hsl);
}

/**
 * Parses the HWB color object into RGB.
 */
export function parseHWBColor({ h, w, b, a = 1 }: InputObject): ColorRGB | null {
	if (checkValue(h) && checkValue(w) && checkValue(b)) {
		const hsl = clampHWB({
			h: Number(h),
			w: Number(w),
			b: Number(b),
			a: Number(a)
		});
    
		return hwb2rgb(hsl);
	}

	return null;
}
