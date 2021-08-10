import { parseXYZColor, roundXYZ, rgb2xyzString } from "@models/xyz";
import { rgb2xyz } from "@models/rgb";
import type { ColorXYZ, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Returns color in CIE XYZ color space.
		 */
		xyz: ColorXYZ;

		/**
		 * Returns a CIE LAB color string.
		 * 
		 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
		 */
		toStringLAB: string;
	}
}

/**
 * Adds support for CIE XYZ color space.
 * 
 * [About CIE](Wikipedia: https://en.wikipedia.org/wiki/CIE_1931_color_space)
 * 
 * [More about XYZ]( https://www.sttmedia.com/colormodel-xyz)
 */
export const pluginXYZ: Plugin = (BaseClass, parsers): void => {
	Object.defineProperty(BaseClass.prototype, "xyz", {
		get: function xyz() {
			return roundXYZ(rgb2xyz(this.color));
		}
	});

	Object.defineProperty(BaseClass.prototype, "toStringXYZ", {
		get: function toStringXYZ() {
			return rgb2xyzString(this.color);
		}
	});

	parsers.object.push({
		model: "xyz",
		parser: parseXYZColor
	});
};