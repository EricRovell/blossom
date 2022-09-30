import type { ColorSuite, TestColor } from "./types";

/**
 * Several simple colors in different models each to test transformation between models.
 * https://www.rapidtables.com/convert/color/index.html
 */
export const testColors: ColorSuite[] = [
	{
		hex: "#000000",
		rgb: { r: 0, g: 0, b: 0 },
		hsl: { h: 0, s: 0, l: 0 },
		hsv: { h: 0, s: 0, v: 0 },
		cmyk: { c: 0, m: 0, y: 0, k: 100 }
	},
	{
		hex: "#FFFFFF",
		rgb: { r: 255, g: 255, b: 255 },
		hsl: { h: 0, s: 0, l: 100 },
		hsv: { h: 0, s: 0, v: 100 },
		cmyk: { c: 0, m: 0, y: 0, k: 0 }
	},
	{
		hex: "#FF0000",
		rgb: { r: 255, g: 0, b: 0 },
		hsl: { h: 0, s: 100, l: 50 },
		hsv: { h: 0, s: 100, v: 100 },
		cmyk: { c: 0, m: 100, y: 100, k: 0 }
	},
	{
		hex: "#00FF00",
		rgb: { r: 0, g: 255, b: 0 },
		hsl: { h: 120, s: 100, l: 50 },
		hsv: { h: 120, s: 100, v: 100 },
		cmyk: { c: 100, m: 0, y: 100, k: 0 }
	},
	{
		hex: "#0000FF",
		rgb: { r: 0, g: 0, b: 255 },
		hsl: { h: 240, s: 100, l: 50 },
		hsv: { h: 240, s: 100, v: 100 },
		cmyk: { c: 100, m: 100, y: 0, k: 0 }
	},
	{
		hex: "#808080",
		rgb: { r: 128, g: 128, b: 128 },
		hsl: { h: 0, s: 0, l: 50 },
		hsv: { h: 0, s: 0, v: 50 },
		cmyk: { c: 0, m: 0, y: 0, k: 50 }
	}
];

/**
 * Color in different representations for transformation tests.
 * name: Lavender Blush
 */
export const testColor: TestColor = {
	hex: "#FFF0F5",
	hex8: "#FFF0F5FF",
	rgb: { r: 255, g: 240, b: 245 },
	rgbStringComma: "rgb(255, 240, 245)",
	rgbStringWhitespace: "rgb(255 240 245)",
	rgbStringCompactComma: "rgb(255,240,245)",
	rgba: { r: 255, g: 240, b: 245, a: 1 },
	rgbaStringComma: "rgba(255, 240, 245, 1)",
	rgbaStringWhitespace: "rgba(255 240 245 / 1)",
	rgbaStringCompact: "rgba(255,240,245,1)",
	hsl: { h: 340, s: 100, l: 97 },
	hslStringComma: "hsl(340deg, 100%, 97%)",
	hslStringWhitespace: "hsl(340deg 100% 97%)",
	hsla: { h: 340, s: 100, l: 97, a: 1 },
	hslaStringComma: "hsla(340deg, 100%, 97%, 1)",
	hslaStringWhitespace: "hsla(340deg 100% 97% / 1)",
	hsv: { h: 340, s: 6, v: 100 },
	hsva: { h: 340, s: 6, v: 100, a: 1 },
	cmyk: { c: 0, m: 6, y: 4, k: 0 }
};

/**
 * Saturatuin steps of color for saturation manipulation tests.
 */
export const saturationSteps = [
	"#999999",
	"#8FA39C",
	"#85ADA0",
	"#7AB8A3",
	"#70C2A7",
	"#66CCAA",
	"#5CD6AD",
	"#52E0B1",
	"#47EBB4",
	"#3DF5B8",
	"#33FFBB"
];
