import { rgb2lab } from "@models/rgb";
import { parseLABColor, roundLAB } from "@models/lab";
import type { ColorLAB, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Converts a color to CIE LAB color space.
		 */
		lab: ColorLAB;
	}
}

/**
 * Adds support for CIE LAB color space.
 * 
 * https://en.wikipedia.org/wiki/CIELAB_color_space
 */
export const pluginLAB: Plugin = (BaseClass, parsers) => {
	Object.defineProperty(BaseClass.prototype, "lab", {
		get: function lab() {
			return roundLAB(rgb2lab(this.color));
		}
	});

	parsers.object.push({
		model: "lab",
		parser: parseLABColor
	});
};