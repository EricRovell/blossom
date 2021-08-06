import { parseRGBColor, parseRGBString } from "@models/rgb";
import { hex2rgb } from "@models/hex";
import { parseHSLColor, parseHSLString } from "@models/hsl";
import { parseHSVColor } from "@models/hsv";
import { parseCMYKColor, parseCMYKString } from "@models/cmyk";
import type { Input, Parser, Parsers, ParseResult, InputObject } from "./types";

/**
 * Parser store.
 * Parsers are broken into two groups: for string and object inputs.
 */
export const parsers: Parsers = {
	"string": [
		{
			model: "rgb",
			parser: parseRGBString
		},
		{
			model: "hex",
			parser: hex2rgb
		},
		{
			model: "hsl",
			parser: parseHSLString
		},
		{
			model: "cmyk",
			parser: parseCMYKString
		}
	],
	"object": [
		{
			model: "rgb",
			parser: parseRGBColor
		},
		{
			model: "hsl",
			parser: parseHSLColor
		},
		{
			model: "hsv",
			parser: parseHSVColor
		},
		{
			model: "cmyk",
			parser: parseCMYKColor
		}
	]
};

/**
 * Attempts to find the correct parser function for known type of input. 
 */
function findValidColor<T extends Input>(input: T, parsers: Parser<T>[]): ParseResult | null {
	for (const { model, parser } of parsers) {
		const color = parser(input);
		if (color) {
			return {
				color,
				model
			};
		}
	}

	return null;
}

/**
 * Attempts to parse the input into color object.
 * If parsing is successful, returns the color object in RGB model
 * and the detected color model of the input.
 */
export function parse(input: Input): ParseResult | null {
	if (typeof input === "string") {
		return findValidColor<string>(input.trim(), parsers.string);
	}

	if (typeof input === "object" && input !== null) {
		return findValidColor<InputObject>(input, parsers.object);
	}

	return null;
}