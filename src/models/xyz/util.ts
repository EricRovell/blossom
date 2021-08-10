import { clamp, round } from "@util/helpers";
import type { ColorXYZ } from "../../types";
import { D50 } from "./constants";

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