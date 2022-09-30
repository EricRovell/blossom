import path from "path";

const aliasList = [
	{ name: "@lib", path: "src" },
	{ name: "@models", path: "src/models" },
	{ name: "@plugins", path: "src/plugins" },
	{ name: "@utils", path: "src/utils" }
];

const config = {
	plugins: [],
	resolve: {
		alias: Object.fromEntries(aliasList.map(alias => (
			[ alias.name, path.resolve(alias.path) ]
		)))
	}
};

export default config;
