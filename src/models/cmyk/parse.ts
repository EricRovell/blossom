import { clampCMYK } from "./util";
import { cmyk2rgb } from "./transform";
import { matcherCMYK } from "./matchers";
import { checkValue } from "@util/helpers";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses the CMYK color object into RGB.
 */
export function parseCMYKColor({ c, m, y, k, a = 1 }: InputObject): ColorRGB | null {
	if (checkValue(c) && checkValue(m) && checkValue(y) && checkValue(k)) {
		const cmyk = clampCMYK({
			c: Number(c),
			m: Number(m),
			y: Number(y),
			k: Number(k),
			a: Number(a)
		});
    
		return cmyk2rgb(cmyk);
	}
  
	return null;
}

/**
 * Parses CMYK CSS color functional string.
 * https://www.w3.org/TR/css-color-4/#device-cmyk
 */
export function parseCMYKString(input: string): ColorRGB | null {
	const match = matcherCMYK.exec(input);

	if (!match) {
		return null;
	}

	const cmyk = clampCMYK({
		c: Number(match[1]) * (match[2] ? 1 : 100),
		m: Number(match[3]) * (match[4] ? 1 : 100),
		y: Number(match[5]) * (match[6] ? 1 : 100),
		k: Number(match[7]) * (match[8] ? 1 : 100),
		a: match[9] ? Number(match[9]) / (match[10] ? 100 : 1) : 1
	});

	return cmyk2rgb(cmyk);
}