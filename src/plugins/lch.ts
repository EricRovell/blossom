import { rgb2lch } from "@models/rgb";
import { parseLCHColor, parseLCHString, roundLCH } from "@models/lch";
import { rgb2lchString } from "@models/rgb";
import { ColorLCH, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Converts a color to CIE LCH (Lightness-Chroma-Hue) color space object.
		 * 
		 * https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/
		 * https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model
		 */
		lch: ColorLCH;
	}
}

/**
 * Adds support for CIE LCH color space.
 * 
 * https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/
 * https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model
 */
export const pluginLCH: Plugin = (BaseClass, { parsers, stringTransformers }) => {
	Object.defineProperty(BaseClass.prototype, "lch", {
		get: function lch() {
			return roundLCH(rgb2lch(this.color));
		}
	});

	stringTransformers.set("lch", rgb2lchString);

	parsers.object.push({
		model: "lch",
		parser: parseLCHColor
	});

	parsers.string.push({
		model: "lch",
		parser: parseLCHString
	});
};