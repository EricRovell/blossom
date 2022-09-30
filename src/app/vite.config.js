import { sveltekit } from "@sveltejs/kit/vite";
import replace from "@rollup/plugin-replace";
import path from "path";

const aliasList = [
	{ name: "@blossom", path: "../package/dist" }
];

const config = {
	plugins: [
		sveltekit(),
		replace({
			"__buildTime__": () => new Date().toISOString()
		})
	],
	resolve: {
		alias: Object.fromEntries(aliasList.map(alias => (
			[ alias.name, path.resolve(alias.path) ]
		)))
	},
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: [ ".." ]
		}
	}
};

export default config;