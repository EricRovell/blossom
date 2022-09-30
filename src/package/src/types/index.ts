import type { ColorRGB } from "./color";

export type {
	ColorModel,
	Color,
	ColorObject,
	ColorRGB,
	ColorHEX,
	ColorHSL,
	ColorHSV,
	ColorHSB,
	ColorCMYK,
	ColorXYZ,
	ColorLAB,
	ColorLCH,
	ColorHWB
} from "./color";

export type { 
	InputObject,
	Input,
	Parser,
	Parsers,
	ParseResult
} from "./parser";

export type {
	Plugin
} from "./plugin";

export type ColorStringTransformer = (color: ColorRGB) => string;
