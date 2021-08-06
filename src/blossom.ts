import { parse } from "./parse";
import { invert, lighten, saturate } from "@manipulation";
import { calcBrightness } from "@properties";
import { clamp, clampDegrees, round } from "@util/helpers";

import { rgb2cmyk, rgb2hsl, rgb2hsv, rgb2string, roundRGB, rgb2hex } from "@models/rgb";
import { rgb2hslString, roundHSL } from "@models/hsl";
import { rgb2hsvString, roundHSV } from "@models/hsv";

import type { Color, ColorCMYK, ColorHSL, ColorHSV, ColorRGB, Input, ParseResult } from "@types";
import { rgb2cmykString } from "./models/cmyk";

/**
 * Blossom instance.
 * Provides color transformation, manipulation, and access to color properties in immutable way.
 */
export class Blossom {
	readonly parsed: ParseResult | null;
	readonly color: ColorRGB;
	
	constructor(input?: Input | Color) {
		this.parsed = parse(input as Input);
		this.color = this.parsed?.color ?? { r: 0, g: 0, b: 0, a: 1 };
	}

	/**
	 * A Boolean indicator whether or not an input has been parsed successfully.
	 * On unsuccessful parsing the color defaults to *black*.
	 */
	get valid(): boolean {
		return this.parsed !== null;
	}

	/**
	 * Returns a boolean indicating whether or not a color is opaque.
	 */
	get opaque(): boolean {
		return this.color.a === 1 ?? this.color.a === null;
	}

	/**
	 * Returns a boolean indicating whether or not a color is transparent.
	 */
	get transparent(): boolean {
		return !this.opaque;
	}

	/**
	 * Returns an alpha channel value of the color.
	 */
	get alpha(): number {
		const { a = 1 } = this.color;
		return round(a, 2);
	}

	/**
	 * Returns a new instance with desired alpha channel value of the color.
	*/
	setAlpha(value = 1): Blossom {
		return new Blossom({ ...this.color, a: clamp(value) });
	}

	/**
	 * Returns an inverted color.
	 */
	get inverted(): Blossom {
		return new Blossom(invert(this.color));
	}

	/**
	 * Returns lightness value from HSL color model with more precision.
	*/
	get lightness(): number {
		return round(rgb2hsl(this.color).l, 2);
	}

	/**
	 * Returns saturation value from HSL color model with more precision.
	*/
	get saturation(): number {
		return round(rgb2hsl(this.color).s, 2);
	}

	/**
	 * Calculate the brightness level of a color in range [0; 1].
	 */
	get brightness(): number {
		return round(calcBrightness(this.color), 2);
	}

	/**
	 * A Boolean indicator whether or not a color is light.
	 */
	get light(): boolean {
		return this.brightness >= 0.5;
	}

	/**
	 * A Boolean indicator whether or not a color is dark.
	 */
	get dark(): boolean {
		return this.brightness < 0.5;
	}

	/**
	 * Increases the lightness of a color by a given amount.
	 */
	lighten(amount = 0.1): Blossom {
		return new Blossom(lighten(this.color, amount));
	}

	/**
	 * Decreases the lightness of a color by a given amount.
	 */
	darken(amount = 0.1): Blossom {
		return new Blossom(lighten(this.color, -amount));
	}

	/**
	 * Saturates a color by a given amount.
	 */
	saturate(amount = 0.1): Blossom {
		return new Blossom(saturate(this.color, amount));
	}

	/**
	 * Desaturates a color by a given amount.
	 */
	desaturate(amount = 0.1): Blossom {
		return new Blossom(saturate(this.color, -amount));
	}

	/**
	 * Desaturates a color completely.
	 */
	get grayscale(): Blossom {
		return this.desaturate(1);
	}

	/**
	 * Changes the HSL hue of a color by a given amount.
	 */
	rotate(amount = 15): Blossom {
		const { h, s, l, a } = rgb2hsl(this.color);

		return new Blossom({
			h: clampDegrees(h + amount),
			s,
			l,
			a
		});
	}
	
	/**
	 * Returns the Hexadecimal representation of a color.
	 */
	get hex(): string {
		return rgb2hex(this.color);
	}
	
	/**
	 * Transform a color to RGB color space object.
	 * Opacity channel value is included in range [0, 1].
	 */
	get rgb(): ColorRGB {
		return roundRGB(this.color);
	}
	
	/**
	 * Returns a string representation of a color in RGB color space.
	 */
	get toStringRGB(): string {
		return rgb2string(this.color);
	}
	
	/**
	 * Transform a color to HSL color space object.
	 * Opacity channel value is included in range [0, 1].
	 */
	get hsl(): ColorHSL {
		return roundHSL(rgb2hsl(this.color));
	}
	
	/**
	 * Returns a string representation of a color in HSL color space.
	 */
	get toStringHSL(): string {
		return rgb2hslString(this.color);
	}
	
	/**
	 * Transform a color to HSV color space object.
	 * Opacity channel value is included in range [0, 1].
	 */
	get hsv(): ColorHSV {
		return roundHSV(rgb2hsv(this.color));
	}

	/**
	 * Returns a string representation of a color in HSL color space.
	 */
	get toStringHSV(): string {
		return rgb2hsvString(this.color);
	}

	/**
	 * Transform a color to CMYK color space object.
	 * Opacity channel value is included in range [0, 1].
	 */
	get cmyk(): ColorCMYK {
		return rgb2cmyk(this.color);
	}

	/**
	 * Returns a string representation of a color in CMYK color space.
	 */
	get toStringCMYK(): string {
		return rgb2cmykString(this.color);
	}

	/**
	 * Returns the Hue value of the number on the color wheel.
	 */
	get hue(): number {
		const { h } = rgb2hsl(this.color);
		return h;
	}

	/**
	 * Set a new hue value.
	 */
	setHue(value: number): Blossom {
		const { s, l, a } = rgb2hsl(this.color);
		return new Blossom({
			h: clampDegrees(value),
			s,
			l,
			a
		});
	}
}

/**
 * Parses the given input color and creates a new `Blossom` instance.
 */
export const blossom = (input: Input | Color | Blossom): Blossom => {
	if (input instanceof Blossom) {
		return input;
	}
	
	return new Blossom(input);
};