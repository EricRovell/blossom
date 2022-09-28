import type { Blossom } from "@/blossom";
import type { Parsers } from "./parser";
import type { ColorModel, ColorRGB } from "./color";

export type ColorStringTransformer = (color: ColorRGB) => string;

export interface PluginExtension {
	parsers: Parsers;
	stringTransformers: Map<ColorModel, ColorStringTransformer>;
}

export type Plugin = (BlossomClass: typeof Blossom, extensions: PluginExtension) => void;
export type Plugins = Plugin[];