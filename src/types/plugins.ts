import type { Blossom } from "@/blossom";
import type { Parsers } from "./parser";

export type Plugin = (BlossomClass: typeof Blossom, parsers: Parsers) => void;
export type Plugins = Plugin[];