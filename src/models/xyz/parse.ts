import { checkValue } from "@util/helpers";
import { xyz2rgb } from "./transform";
import { clampXYZ } from "./util";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses the XYZ color object into RGB.
 */
export function parseXYZColor({ x, y, z, a = 1 }: InputObject): ColorRGB | null {
	if (checkValue(x) && checkValue(y) && checkValue(z)) {
		const xyz = clampXYZ({
			x: Number(x),
			y: Number(y),
			z: Number(z),
			a: Number(a)
		});

		return xyz2rgb(xyz);
	}

	return null;
}