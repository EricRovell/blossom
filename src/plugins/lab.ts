import { rgb2lab } from "@models/rgb";
import { parseLABColor, roundLAB } from "@models/lab";
import { rgb2labString } from "@models/rgb";
import { deltaE2000 } from "@properties";
import type { Input, ColorLAB, Plugin } from "../types";

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

		/**
		 * Calculates the perceived color difference for two colors according to
		 * [Delta E2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000).
		 */
		deltaE00(color: Blossom | Input): number;
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

	BaseClass.prototype.deltaE00 = function(color) {
		const compared = color instanceof BaseClass
			? color
			: new BaseClass(color);

		return deltaE2000(this.lab, compared.lab);
	};

	parsers.object.push({
		model: "lab",
		parser: parseLABColor
	});
};