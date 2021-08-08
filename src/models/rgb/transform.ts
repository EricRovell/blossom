import { round, toHexString } from "@util/helpers";
import { clampXYZ, adaptXYZtoD50, D50 } from "@models/xyz";
import { clampLAB, factors } from "@models/lab";
import { makeLinearChannels, roundRGB } from "./util";
import type { ColorHSV, ColorRGB, ColorHSL, ColorHEX, ColorCMYK, ColorXYZ, ColorLAB } from "../../types";

/**
 * Convert RGB Color Model object to HSV.
 */
export function rgb2hsv({ r, g, b, a }: ColorRGB): ColorHSV {
	const max = Math.max(r, g, b);
	const delta = max - Math.min(r, g, b);

	const h = delta
		? max === r
			? (g - b) / delta
			: max === g
				? 2 + (b - r) / delta
				: 4 + (r - g) / delta
		: 0;

	return {
		h: 60 * (h < 0 ? h + 6 : h),
		s: max ? (delta / max) * 100 : 0,
		v: (max / 255) * 100,
		a,
	};
}

/**
 * Convert RGB Color Model object to HSL.
 */
export function rgb2hsl(color: ColorRGB): ColorHSL {
	let { r, g, b } = color;
	const { a = 1 } = color;
	[ r, g, b ] = [ r, g, b ].map(value => value / 255);

	const [ min, max ] = [ Math.min(r, g, b), Math.max(r, g, b) ];
	const chroma = max - min;

	const lightness = (max + min) / 2;

	const saturation = (max === min)
		? 0
		: chroma / (1 - Math.abs(2 * lightness - 1));
    
	let hue = 0;
  
	if (chroma === 0) {
		hue = 0;
	} else if (max === r) {
		hue = 60 * (((g - b) / chroma) + (g < b ? 6 : 0));
	} else if (max === g) {
		hue = 60 * ((b - r) / chroma + 2);
	} else if (max === b) {
		hue = 60 * ((r - g) / chroma + 4);
	}

	return {
		h: round(hue),
		s: saturation * 100,
		l: lightness * 100,
		a
	};
}

/**
 * Convert RGB Color Model object to HEX string.
 */
export function rgb2hex(color: ColorRGB): ColorHEX {
	const { r, g, b, a = 1 } = roundRGB(color);

	const alpha = a < 1
		? toHexString(round(a * 255))
		: "";

	return `#${toHexString(r)}${toHexString(g)}${toHexString(b)}${alpha}`;
}

/**
 * Convert RGB Color Model object to CMYK.
 */
export function rgb2cmyk({ r, g, b, a = 1 }: ColorRGB): ColorCMYK {
	const k = 1 - Math.max(r / 255, g / 255, b / 255);  
	const c = (1 - r / 255 - k) / (1 - k);
	const m = (1 - g / 255 - k) / (1 - k);
	const y = (1 - b / 255 - k) / (1 - k);
  
	return {
		c: isNaN(c) ? 0 : round(c * 100),
		m: isNaN(m) ? 0 : round(m * 100),
		y: isNaN(y) ? 0 : round(y * 100),
		k: round(k * 100),
		a: round(a, 2)
	};
}

/**
 * Convert RGB Color Model object to XYZ.
 */
export function rgb2xyz({ r, g, b, a = 1 }: ColorRGB): ColorXYZ {
	const linearR = makeLinearChannels(r);
	const linearG = makeLinearChannels(g);
	const linearB = makeLinearChannels(b);

	const xyz: ColorXYZ = {
		x: (linearR * 0.4124564 + linearG * 0.3575761 + linearB * 0.1804375) * 100,
		y: (linearR * 0.2126729 + linearG * 0.7151522 + linearB * 0.072175) * 100,
		z: (linearR * 0.0193339 + linearG * 0.119192 + linearB * 0.9503041) * 100,
		a,
	};

	return clampXYZ(adaptXYZtoD50(xyz));
}

/**
 * Convert RGB Color Model object to LAB.
 */
export function rgb2lab(color: ColorRGB): ColorLAB {
	/**
	 * Compute XYZ scaled relative to D50 reference white
	 */
	const xyz = rgb2xyz(color);
	let x = xyz.x / D50.x;
	let y = xyz.y / D50.y;
	let z = xyz.z / D50.z;
	const { e, k } = factors;

	x = x > e ? Math.cbrt(x) : (k * x + 16) / 116;
	y = y > e ? Math.cbrt(y) : (k * y + 16) / 116;
	z = z > e ? Math.cbrt(z) : (k * z + 16) / 116;

	return {
		l: 116 * y - 16,
		a: 500 * (x - y),
		b: 200 * (y - z),
		alpha: xyz.a,
	};
}