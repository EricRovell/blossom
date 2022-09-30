import { factors } from "./util";
import { D50 } from "../xyz/constants";
import { xyz2rgb } from "../xyz/transform";
import type { ColorRGB, ColorLAB } from "../../types";

/**
 * Transforms LAB color to RGB color object.
 * 
 * https://www.w3.org/TR/css-color-4/#color-conversion-code
 */
export function lab2rgb({ l, a, b, alpha = 1 }: ColorLAB): ColorRGB {
	const y = (l + 16) / 116;
	const x = a / 500 + y;
	const z = y - b / 200;
	const { e, k } = factors;

	return xyz2rgb({
		x: (Math.pow(x, 3) > e ? Math.pow(x, 3) : (116 * x - 16) / k) * D50.x,
		y: (l > k * e ? Math.pow((l + 16) / 116, 3) : l / k) * D50.y,
		z: (Math.pow(z, 3) > e ? Math.pow(z, 3) : (116 * z - 16) / k) * D50.z,
		a: alpha
	});
}
