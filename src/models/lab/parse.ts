import { checkValue } from "@util/helpers";
import { lab2rgb } from "./transform";
import { clampLAB } from "./util";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses the XYZ color object into RGB.
 */
export function parseLABColor({ l, a, b, alpha = 1 }: InputObject): ColorRGB | null {
	if (checkValue(l) && checkValue(a) && checkValue(b)) {
		const xyz = clampLAB({
			l: Number(l),
			a: Number(a),
			b: Number(b),
			alpha: Number(alpha)
		});

		return lab2rgb(xyz);
	}

	return null;
}