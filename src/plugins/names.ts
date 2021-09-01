import { cssColorNames } from "@properties";
import { ColorRGB, Plugin } from "../types";

/**
 * Adds support for [named CSS colors](https://www.w3.org/TR/css-color-4/#named-colors).
 */
export const pluginNames: Plugin = (BaseClass, parsers) => {
	/**
	 * Parses CSS color name.
	 */
	function parseColorName(input: string): ColorRGB | null {
		const name = input.toLowerCase();

		const hex: string | undefined = (name === "transparent")
			? "0000"
			: cssColorNames[name];

		if (typeof hex === "string") {
			return new BaseClass(`#${hex}`).rgb;
		}

		return null;
	}

	parsers.string.push({
		model: "name",
		parser: parseColorName
	});
};