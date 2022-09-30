import { rgb2cmyk, rgb2hsl, rgb2hsv, rgb2hwb, rgb2lab, rgb2lch, rgb2xyz } from "./transform";
import { roundRGB } from "./util";
import { roundCMYK } from "../cmyk/util";
import { roundHSL } from "../hsl/util";
import { roundHSV } from "../hsv/util";
import { roundLAB } from "../lab/util";
import { roundLCH } from "../lch/util";
import { roundXYZ } from "../xyz/util";
import type { ColorRGB } from "../../types";
import { roundHWB } from "../hwb/util";

/**
 * Transforms the RGB color object into string.
 */
export function rgb2string(color: ColorRGB): string {
	const { r, g, b, a = 1 } = roundRGB(color);
	return a < 1
		? `rgb(${r} ${g} ${b} / ${a})`
		: `rgb(${r} ${g} ${b})`;
}

/**
 * Transforms the RGB color object to HSL color string.
 * Functional whitespace syntax is used.
 */
export function rgb2hslString(rgb: ColorRGB): string {
	const { h, s, l, a = 1 } = roundHSL(rgb2hsl(rgb));
	return a < 1
		? `hsl(${h}deg ${s}% ${l}% / ${a})`
		: `hsl(${h}deg ${s}% ${l}%)`;
}

/**
 * Transforms the RGB color object to HSL color string.
 * Functional whitespace syntax is used.
 */
export function rgb2hsvString(rgb: ColorRGB): string {
	const { h, s, v, a = 1 } = roundHSV(rgb2hsv(rgb));
	return a < 1
		? `hsv(${h}deg ${s}% ${v}% / ${a})`
		: `hsv(${h}deg ${s}% ${v}%)`;
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

/**
 * Transforms the RGB color object to CIE XYZ color string.
 * 
 * https://www.w3.org/TR/css-color-4/#valdef-color-xyz
 */
export function rgb2xyzString(rgb: ColorRGB): string {
	const { x, y, z, a = 1 } = roundXYZ(rgb2xyz(rgb));
	return a < 1
		? `color(xyz ${x} ${y} ${z} / ${a})`
		: `color(xyz ${x} ${y} ${z})`;
}

/**
 * Transforms the RGB color object to CIE LAB color string.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
 */
export function rgb2labString(rgb: ColorRGB): string {
	const { l, a, b, alpha = 1 } = roundLAB(rgb2lab(rgb));
	return alpha < 1
		? `lab(${l}% ${a} ${b} / ${alpha})`
		: `lab(${l}% ${a} ${b})`;
}

/**
 * Transforms the RGB color object to CIE LCH color string.
 */
export function rgb2lchString(rgb: ColorRGB): string {
	const { l, c, h, a = 1 } = roundLCH(rgb2lch(rgb));
	return a < 1
		? `lch(${l}% ${c} ${h} / ${a})`
		: `lch(${l}% ${c} ${h})`;
}

/**
 * Transforms the RGB color object to CIE LCH color string.
 */
export function rgb2hwbString(rgb: ColorRGB): string {
	const { h, w, b, a = 1 } = roundHWB(rgb2hwb(rgb));
	return a < 1
		? `hwb(${h} ${w}% ${b}% / ${a})`
		: `hwb(${h} ${w}% ${b}%)`;
}
