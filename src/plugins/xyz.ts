import { parseXYZColor, roundXYZ } from "@models/xyz";
import { rgb2xyz, rgb2xyzString } from "@models/rgb";
import type { ColorXYZ, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Returns color in CIE XYZ color space.
		 */
		xyz: ColorXYZ;
	}
}

/**
 * Adds support for CIE XYZ color space.
 * 
 * [About CIE](Wikipedia: https://en.wikipedia.org/wiki/CIE_1931_color_space)
 * 
 * [More about XYZ]( https://www.sttmedia.com/colormodel-xyz)
 */
export const pluginXYZ: Plugin = (BaseClass, { parsers, stringTransformers }): void => {
	Object.defineProperty(BaseClass.prototype, "xyz", {
		get: function xyz() {
			return roundXYZ(rgb2xyz(this.color));
		}
	});

	stringTransformers.set("xyz", rgb2xyzString);

	parsers.object.push({
		model: "xyz",
		parser: parseXYZColor
	});
};