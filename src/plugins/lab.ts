import { rgb2lab } from "@models/rgb";
import { parseLABColor, roundLAB, rgb2labString } from "@models/lab";
import type { ColorLAB, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Converts a color to CIE LAB color space.
		 */
		lab: ColorLAB;

		/**
		 * Returns a CIE LAB color string.
		 * 
		 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
		 */
		toStringLAB: string;
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

	Object.defineProperty(BaseClass.prototype, "toStringLAB", {
		get: function toStringLAB() {
			return rgb2labString(this.color);
		}
	});

	parsers.object.push({
		model: "lab",
		parser: parseLABColor
	});
};