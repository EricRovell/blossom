import { parseHWBColor, parseHWBString, roundHWB } from "@models/hwb";
import { rgb2hwbString } from "@models/rgb";
import { ColorHWB, Plugin } from "../types";
import { rgb2hwb } from "@/models/rgb/transform";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Converts a color to HWB (Hue-Whiteness-Blackness) color space object.
		 * 
		 * https://en.wikipedia.org/wiki/HWB_color_model
		 */
		hwb: ColorHWB;

		/**
		 * Converts a color to HWB (Hue-Whiteness-Blackness) color space and returns a string.
		 * 
		 * https://www.w3.org/TR/css-color-4/#the-hwb-notation
		 */
		toStringHWB: string;
	}
}

/**
 * Adds support for HWB (Hue-Whiteness-Blackness) color model.
 * 
 * https://en.wikipedia.org/wiki/HWB_color_model
 * https://www.w3.org/TR/css-color-4/#the-hwb-notation
 */
export const pluginHWB: Plugin = (BaseClass, parsers) => {
	Object.defineProperty(BaseClass.prototype, "hwb", {
		get: function hwb() {
			return roundHWB(rgb2hwb(this.color));
		}
	});

	Object.defineProperty(BaseClass.prototype, "toStringHWB", {
		get: function toStringLCH() {
			return rgb2hwbString(this.color);
		}
	});

	parsers.object.push({
		model: "hwb",
		parser: parseHWBColor
	});

	parsers.string.push({
		model: "hwb",
		parser: parseHWBString
	});
};