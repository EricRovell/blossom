import { ColorLCH, ColorRGB } from "../../types";
import { lab2rgb } from "../lab/transform";

/**
 * Converts an CIE LCH color to RGB color space
 * Flow: CIE LCH -> CIE LAB -> RGB
 * 
 * https://www.w3.org/TR/css-color-4/#color-conversion-code
 */
export function lch2rgb({ l, c, h, a = 1 }: ColorLCH): ColorRGB {
	return lab2rgb({
		l,
		a: c * Math.cos((h * Math.PI) / 180),
		b: c * Math.sin((h * Math.PI) / 180),
		alpha: a
	});
}