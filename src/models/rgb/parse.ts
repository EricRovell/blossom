import { clampRGB } from "./util";
import { matcherRGBComma, matcherRGBSpace } from "./matchers";
import { checkValue } from "@util/helpers";
import type { ColorRGB, InputObject } from "../../types";

/**
 * Parses a valid RGB[A] CSS color string.
 */
export function parseRGBString(input: string): ColorRGB | null {
	/**
   * match index:
   *   0. entire match;
   *   1. red channel;
   *   2. red channel % value indicator;
   *   3. green channel;
   *   4. green channel % value indicator;
   *   5. blue channel;
   *   6. blue channel % value indicator;
   *   7. alpha value;
   *   8. alpha value % indicator;
   */
	const match =
    matcherRGBComma.exec(input) ??
    matcherRGBSpace.exec(input);
    
	if (!match) {
		return null;
	}
  
	// mixing numbers and percentages is not allowed
	// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb_syntax_variations
	if (match[2] !== match[4] || match[4] !== match[6]) {
		return null;
	}
  
	// if the parsed channel values are percentage?
	const percentage = Boolean(match[2]);
  
	const [ r, g, b ] = percentage
		? [ match[1], match[3], match[5] ].map(value => Number(value) * 255 / 100)
		: [ match[1], match[3], match[5] ].map(Number);
    
	const a = match[7]
		? Number(match[7]) / (match[8] ? 100 : 1)
		: 1;
  
	return clampRGB({ r, g, b, a });
}

/**
 * Parses RGB color object.
 */
export function parseRGBColor({ r, g, b, a = 1 }: InputObject): ColorRGB | null {
	if (checkValue(r) && checkValue(g) && checkValue(b)) {
		return clampRGB({
			r: Number(r),
			g: Number(g),
			b: Number(b),
			a: Number(a)
		});
	}
  
	return null;
}