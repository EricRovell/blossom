import { clamp, round } from "@util/helpers";
import type { ColorRGB, ColorXYZ } from "../../types";
import { rgb2xyz } from "../rgb";

/**
 * Theoretical light source that approximates "warm daylight".
 * 
 * https://en.wikipedia.org/wiki/Standard_illuminant
 */
export const D50 = {
	x: 96.422,
	y: 100,
	z: 82.521
};

/**
 * Clamps the XYZ color object values.
 */
export function clampXYZ({ x, y, z, a = 1 }: ColorXYZ): ColorXYZ {
	return {
		x: clamp(x, 0, D50.x),
		y: clamp(y, 0, D50.y),
		z: clamp(z, 0, D50.z),
		a: clamp(a)
	};
}

/**
 * Rounds the HSV color object values.
 */
export function roundXYZ({ x, y, z, a = 1 }: ColorXYZ): ColorXYZ {
	return {
		x: round(x, 2),
		y: round(y, 2),
		z: round(z, 2),
		a: round(a, 2)
	};
}

/**
 * Performs Bradford chromatic adaptation: D50 -> D65 
 */
export function adaptXYZtoD65({ x, y, z, a = 1 }: ColorXYZ): ColorXYZ {
	return {
		x: x * 0.9555766 + y * -0.0230393 + z * 0.0631636,
		y: x * -0.0282895 + y * 1.0099416 + z * 0.0210077,
		z: x * 0.0122982 + y * -0.020483 + z * 1.3299098,
		a
	};
}

/**
 * Performs Bradford chromatic adaptation: D65 -> D50 
 */
export function adaptXYZtoD50({ x, y, z, a = 1 }: ColorXYZ): ColorXYZ {
	return {
		x: x * 1.0478112 + y * 0.0228866 + z * -0.050127,
		y: x * 0.0295424 + y * 0.9904844 + z * -0.0170491,
		z: x * -0.0092345 + y * 0.0150436 + z * 0.7521316,
		a
	};
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