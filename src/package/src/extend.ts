import { Blossom } from "./blossom";
import { parsers } from "./parse";
import { stringTransformers } from "./to-string";
import type { Plugin } from "./types";

const activePlugins: Plugin[] = [];

/**
 * Extends the functionality of the core interface. 
 */
export function extend(plugins: Plugin[]): void {
	plugins.forEach(plugin => {
		if (activePlugins.indexOf(plugin) < 0) {
			plugin(Blossom, { parsers, stringTransformers });
			activePlugins.push(plugin);
		}
	});
}
