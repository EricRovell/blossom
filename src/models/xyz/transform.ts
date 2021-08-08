import { adaptXYZtoD65 } from "./util";
import { clampRGB, revertLinearChannels } from "../rgb";
import { ColorRGB, ColorXYZ } from "../../types";

/**
 * Converts an CIE XYZ color (D50) to RGBA color space (D65)
 * 
 * https://www.w3.org/TR/css-color-4/#color-conversion-code
 */
export function xyz2rgb(color: ColorXYZ): ColorRGB {
	const { x, y, z, a = 1 } = adaptXYZtoD65(color);
	return clampRGB({
		r: revertLinearChannels(0.032404542 * x - 0.015371385 * y - 0.004985314 * z),
		g: revertLinearChannels(-0.00969266 * x + 0.018760108 * y + 0.00041556 * z),
		b: revertLinearChannels(0.000556434 * x - 0.002040259 * y + 0.010572252 * z),
		a
	});
}