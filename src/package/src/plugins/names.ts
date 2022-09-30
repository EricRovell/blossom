import { findNearestColor } from "../manipulation";
import { hex2rgb } from "@models/hex";
import { cssColorNames } from "../properties";
import type { ColorRGB, Plugin } from "../types";

type NamesRGBCache = Map<string, ColorRGB>;
type HexNamesCache = Map<string, string>;

declare module "../blossom" {
	interface Blossom {
		/**
		 * Returns match to the named CSS color if possible.
		 */
		name: string | null;

		/**
		 * Returns a closest match to the named CSS color.
		 */
		closestName: string;
	}
}

/**
 * Cache CSS color names as Map:
 *  - name -> rgb (distance calculations optimixation);
 */
function createNamesRGBCache(): NamesRGBCache {
	const names2RGBMap = new Map();

	for (const [ name, hex ] of Object.entries(cssColorNames)) {
		names2RGBMap.set(name, hex2rgb(hex));
	}

	return names2RGBMap;
}

/**
 * Cache CSS names as:
 * 	- hex -> name pair for faster search by hex;
 */
function createHexNamesCache(): HexNamesCache {
	const hex2namesMap = new Map();

	for (const [ name, hex ] of Object.entries(cssColorNames)) {
		hex2namesMap.set(hex, name);
	}

	return hex2namesMap;
}

/**
 * Adds support for [named CSS colors](https://www.w3.org/TR/css-color-4/#named-colors).
 */
export const pluginNames: Plugin = (BaseClass, { parsers }) => {
	let cacheRGB: NamesRGBCache;
	let cacheHEX: HexNamesCache;

	Object.defineProperty(BaseClass.prototype, "name", {
		get: function name() {
			if (!this.color.a) {
				return "transparent";
			}

			if (!cacheHEX) {
				cacheHEX = createHexNamesCache();
			}

			return cacheHEX.get(this.hex.toLowerCase()) ?? null;
		}
	});

	Object.defineProperty(BaseClass.prototype, "closestName", {
		get: function closestName() {
			const exact = this.name;

			if (exact) {
				return exact;
			}

			if (!cacheRGB) {
				cacheRGB = createNamesRGBCache();
			}

			return findNearestColor(this.rgb, cacheRGB);
		}
	});

	/**
	 * Parses CSS color name.
	 */
	function parseColorName(input: string): ColorRGB | null {
		const hex = cssColorNames[input.toLowerCase()];

		return hex
			? new BaseClass(hex).rgb
			: null;
	}

	parsers.string.push({
		model: "name",
		parser: parseColorName
	});
};