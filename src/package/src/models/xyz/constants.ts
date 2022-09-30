import type { ColorXYZ } from "../../types";

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
