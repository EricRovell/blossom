import { Blossom } from "@/blossom";
import { parsers } from "./parse";
import { Plugins } from "@types";

const activePlugins: Plugins = [];

/**
 * Extends the functionality of the core interface. 
 */
export function extend(plugins: Plugins): void {
  plugins.forEach(plugin => {
    if (activePlugins.indexOf(plugin) < 0) {
      plugin(Blossom, parsers);
      activePlugins.push(plugin);
    }
  });
};