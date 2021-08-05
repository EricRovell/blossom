import { floor, round } from "@util/helpers";
import { getLuminance, getContrast } from "@properties";
import type { Plugin, Input } from "@types";

/**
 * Defines Web Accessibility Contrast options.
 * https://webaim.org/resources/contrastchecker/
 */
interface ReadabilityOptions {
	level?: "AA" | "AAA";
	size?: "normal" | "large";
}

declare module "blossom" {
	interface Blossom {
		/**
		 * Returns the relative luminance of the color.
		 * Value is normalized to range [0, 1] as for [black, white].
		 * 
		 * [Relative luminance](https://www.w3.org/TR/WCAG20/#relativeluminancedef),
		 * [more about luminance](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance).
		 */
		luminance(): number;

		/**
		 * Calculates a contrast ratio for a pair of colors.
		 * The luminance difference lies in range [1 (white on white), 21 (black on white)].
		 * 
		 * WCAG required a ratio at least 4.5 for normal text and 3:1 for large one.
		 * 
		 * https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
		 * https://webaim.org/articles/contrast/
		 */
		contrast(color?: Input | Blossom): number;

		/**
		 * Tells whether the background and text color conforms to WCAG 2.0 requirements.
		 * 
		 * https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
		 */
		readable(color?: Input | Blossom, options?: ReadabilityOptions): boolean;
	}
}

export const pluginA11Y: Plugin = (BaseClass): void => {
	/**
	 * Returns WCAG text color contrast requirement value.
	 * 
	 * [Read explanation](https://webaim.org/resources/contrastchecker/)
	 */
	function getMinimumContrastValue({ level = "AA", size = "normal"} : ReadabilityOptions): number {
		if (level === "AAA" && size === "normal") {
			return 7;
		}
		if (level === "AA" && size === "large") {
			return 3;
		}
		return 4.5;
	}

	Object.defineProperty(BaseClass.prototype, "luminance", {
		/**
		 * Retuns the percieved luminance of a color in range [0, 1].
		 * [According to WCAG 2.0](https://www.w3.org/TR/WCAG20/#relativeluminancedef)
		 */
		get: function luminance() {
			return round(getLuminance(this.color), 2);
		}
	});

	BaseClass.prototype.contrast = function(color = "#FFF") {
		const compared = color instanceof BaseClass
			? color
			: new BaseClass(color);

		return floor(getContrast(this.color, compared.rgb), 2);
	};

	BaseClass.prototype.readable = function(color = "#FFF", options = {}) {
		return this.contrast(color) >= getMinimumContrastValue(options);
	};
};