import type { Blossom } from "../blossom";
import type { ColorModel, ColorRGB } from "./color";
import type { Parsers } from "./parser";

export type ColorStringTransformer = (color: ColorRGB) => string;

export interface PluginExtension {
	parsers: Parsers;
	stringTransformers: Map<ColorModel, ColorStringTransformer>;
}

export type Plugin = (BlossomClass: typeof Blossom, extensions: PluginExtension) => void;
