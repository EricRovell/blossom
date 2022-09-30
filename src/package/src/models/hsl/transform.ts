import { round } from "@utils/helpers";
import type { ColorHSL, ColorRGB, ColorHSV } from "../../types";

/**
 * Convert HSL color object to RGB.
 */
export function hsl2rgb(color: ColorHSL): ColorRGB {
	const h = color.h;
	const s = color.s / 100;
	const l = color.l / 100;
	const a = color.a ? round(color.a, 2) : 1;

	const chroma = (1 - Math.abs(2 * l - 1)) * s;
  
	// to adjust each of the values for lightness
	const m = l - chroma / 2;
  
	// will be used as the middle (second-largest) component value
	const middle = chroma * (1 - Math.abs((h / 60) % 2 - 1));

	let r = 0;
	let g = 0;
	let b = 0;
  
	if (h >= 0 && h < 60) {
		[ r, g, b ] = [ chroma, middle, 0 ];
	} else if (h >= 60 && h < 120) {
		[ r, g, b ] = [ middle, chroma, 0 ];
	} else if (h >= 120 && h < 180) {
		[ r, g, b ] = [ 0, chroma, middle ];
	} else if (h >= 180 && h < 240) {
		[ r, g, b ] = [ 0, middle, chroma ];
	} else if (h >= 240 && h < 300) {
		[ r, g, b ] = [ middle, 0, chroma ];
	} else if (h >= 300 && h < 360) {
		[ r, g, b ] = [ chroma, 0, middle ];
	}

	return {
		r: round(255 * (r + m)),
		g: round(255 * (g + m)),
		b: round(255 * (b + m)),
		a
	};
}

/**
 * Convert HSL color object to HSV.
 */
export function hsl2hsv(color: ColorHSL): ColorHSV {
	const h = color.h;
	const sl = color.s / 100;
	const l = color.l / 100;
	const a = color.a ? round(color.a, 2) : 1;

	// calculate value and saturation for HSV
	const v = l + sl * Math.min(l, 1 - l);
	const sv = (v === 0)
		? 0
		: 2 * (1 - l / v);
  
	return {
		h,
		s: round(sv * 100),
		v: round(v * 100),
		a
	};
}
