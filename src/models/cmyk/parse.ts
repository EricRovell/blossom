import { clampCMYK } from "./util";
import { cmyk2rgb } from "./transform";
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