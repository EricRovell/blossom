import { rgb2lab } from "@models/rgb";
import { parseLABColor, roundLAB } from "@models/lab";
import { rgb2labString } from "@models/rgb";
import { calcDeltaE00 } from "@properties";
import { round, clamp } from "@util/helpers";
import type { Input, ColorLAB, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Converts a color to CIE LAB color space.
		 */
		lab: ColorLAB;

		/**
		 * Calculates the perceived color difference for two colors according to
		 * [Delta E2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000).
		 */
		delta(color?: Blossom | Input): number;
	}
}

/**
 * Adds support for CIE LAB color space.
 * 
 * https://en.wikipedia.org/wiki/CIELAB_color_space
 */
export const pluginLAB: Plugin = (BaseClass, { parsers, stringTransformers }) => {
	Object.defineProperty(BaseClass.prototype, "lab", {
		get: function lab() {
			return roundLAB(rgb2lab(this.color));
		}
	});

	stringTransformers.set("lab", rgb2labString);

	BaseClass.prototype.delta = function(color = "#FFF") {
		const compared = color instanceof BaseClass
			? color
			: new BaseClass(color);
		const value = calcDeltaE00(this.lab, compared.lab) / 100;

		return clamp(round(value, 3));
	};

	parsers.object.push({
		model: "lab",
		parser: parseLABColor
	});
};