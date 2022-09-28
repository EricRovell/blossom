import {
	rgb2string,
	rgb2hslString,
	rgb2hsvString,
	rgb2cmykString,
	rgb2hex
} from "@models/rgb";
import type { ColorModel, ColorStringTransformer } from "./types";

export const stringTransformers: Map<ColorModel, ColorStringTransformer> = new Map([
	[ "hex", rgb2hex ],
	[ "rgb", rgb2string ],
	[ "hsl", rgb2hslString ],
	[ "hsv", rgb2hsvString ],
	[ "cmyk", rgb2cmykString ]
]);

export function colorToString(model: ColorModel = "hex"): ColorStringTransformer {
	return stringTransformers.get(model) ?? rgb2hex;
}