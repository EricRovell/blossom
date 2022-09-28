import { Blossom } from "@/blossom";
import { parsers } from "./parse";
import { stringTransformers } from "./to-string";
import { Plugins } from "./types";

const activePlugins: Plugins = [];

/**
 * Extends the functionality of the core interface. 
 */
export function extend(plugins: Plugins): void {
	plugins.forEach(plugin => {
		if (activePlugins.indexOf(plugin) < 0) {
			plugin(Blossom, { parsers, stringTransformers });
			activePlugins.push(plugin);
		}
	});
}