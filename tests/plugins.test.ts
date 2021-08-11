import { blossom, extend, getModel } from "../src";
import { pluginHarmonies } from "@plugins/harmonies";
import { pluginMonochromatic } from "@plugins/monochromatic";
import { pluginA11Y } from "@plugins/a11y";
import { pluginXYZ } from "@plugins/xyz";
import { pluginLAB } from "@plugins/lab";
import { pluginLCH } from "@plugins/lch";
import { pluginHWB } from "@plugins/hwb";

describe("Harmony colors plugin", () => {
	extend([ pluginHarmonies ]);

	const color = blossom("#FF0000");

	it("Generates analogous colors", () => {
		expect(color.harmonies("analogous").map(value => value.hex)).toEqual([
			"#FF0080", "#FF0000", "#FF8000"
		]);
	});
	it("Generates complimentary colors", () => {
		expect(color.harmonies("complimentary").map(value => value.hex)).toEqual([
			"#FF0000", "#00FFFF"
		]);
	});
	it("Generates double-split-complementary colors", () => {
		expect(color.harmonies("double-split-complementary").map(value => value.hex)).toEqual([
			"#FF0080","#FF0000", "#FF8000", "#00FF80", "#0080FF"
		]);
	});
	it("Generates rectangle colors", () => {
		expect(color.harmonies("rectangle").map(value => value.hex)).toEqual([
			"#FF0000", "#FFFF00", "#00FFFF", "#0000FF"
		]);
	});
	it("Generates tetradic colors", () => {
		expect(color.harmonies("tetradic").map(value => value.hex)).toEqual([
			"#FF0000", "#80FF00", "#00FFFF", "#8000FF"
		]);
	});
	it("Generates triadic colors", () => {
		expect(color.harmonies("triadic").map(value => value.hex)).toEqual([
			"#FF0000", "#00FF00", "#0000FF"
		]);
	});
	it("Generates split-complimentary colors", () => {
		expect(color.harmonies("split-complimentary").map(value => value.hex)).toEqual([
			"#FF0000", "#00FF80", "#0080FF"
		]);
	});
});

describe("Monochromatic colors plugin", () => {
	extend([ pluginMonochromatic ]);

	it("Generates tints", () => {
		expect(blossom("#ff0000").tints(10).map(color => color.hex)).toEqual([
			"#FF0000",
			"#FF1A1A",
			"#FF3333",
			"#FF4D4D",
			"#FF6666",
			"#FF8080",
			"#FF9999",
			"#FFB3B3",
			"#FFCCCC",
			"#FFE5E5",
			"#FFFFFF"
		]);
	});
	it("Generates shades", () => {
		expect(blossom("#ff0000").shades(10).map(color => color.hex)).toEqual([
			"#FF0000",
			"#E60000",
			"#CC0000",
			"#B30000",
			"#990000",
			"#800000",
			"#660000",
			"#4D0000",
			"#330000",
			"#190000",
			"#000000"
		]);
	});
	it("Generates tones", () => {
		expect(blossom("#FF0000").tones(10).map(color => color.hex)).toEqual([
			"#FF0000",
			"#F20D0D",
			"#E61919",
			"#D92626",
			"#CC3333",
			"#BF4040",
			"#B34D4D",
			"#A65959",
			"#996666",
			"#8C7373",
			"#808080"
		]);
	});
	it("Won't generate tints for pure white color", () => {
		expect(blossom("#FFF").tints().map(color => color.hex)).toEqual([]);
	});
	it("Won't generate shades for pure black color", () => {
		expect(blossom("#000").shades().map(color => color.hex)).toEqual([]);
	});
	it("Won't generate tones for pure gray color", () => {
		expect(blossom("#808080").tones().map(color => color.hex)).toEqual([]);
	});
	it("Won't generate enought tints for color too close to pure white", () => {
		expect(blossom("#FAFAFA").tints(10).map(color => color.hex)).toEqual([
			"#FAFAFA", "#FDFDFD", "#FFFFFF"
		]);
	});
	it("Won't generate enought shades for color too close to pure black", () => {
		expect(blossom("#050505").shades(10).map(color => color.hex)).toEqual([
			"#050505", "#020202", "#000000"
		]);
	});
	it("Won't generate enought tones for color too close to pure gray", () => {
		expect(blossom("#827D7D").tones(10).map(color => color.hex)).toEqual([
			"#827D7D", "#817E7E", "#808080"
		]);
	});
});

describe("A11Y plugin", () => {
	/**
	 * Test results: // https://webaim.org/resources/contrastchecker/
	 */
	extend([ pluginA11Y ]);

	it("Calculates the perceived luminance of a color", () => {
		expect(blossom("#000000").luminance).toBe(0);
		expect(blossom("#E42189").luminance).toBe(0.19);
		expect(blossom("#FF0000").luminance).toBe(0.21);
		expect(blossom("#808080").luminance).toBe(0.22);
		expect(blossom("#AABBCC").luminance).toBe(0.48);
		expect(blossom("#CCDDEE").luminance).toBe(0.71);
		expect(blossom("#FFFFFF").luminance).toBe(1);
	});
	it("Calculates the contrast ratio between two colors", () => {
		expect(blossom("#000000").contrast()).toBe(21);
		expect(blossom("#FFFFFF").contrast("#000000")).toBe(21);
		expect(blossom("#777777").contrast()).toBe(4.47);
		expect(blossom("#FF0000").contrast()).toBe(3.99);
		expect(blossom("#00FF00").contrast()).toBe(1.37);
		expect(blossom("#2e2e2e").contrast()).toBe(13.57);
		expect(blossom("#0079AD").contrast()).toBe(4.84);
		expect(blossom("#0079AD").contrast("#2E2E2E")).toBe(2.8);
		expect(blossom("#e42189").contrast("#0D0330")).toBe(4.54);
		expect(blossom("#FFF4CC").contrast("#3A1209")).toBe(15);
		expect(blossom("#FFF4CC").contrast(blossom("#3A1209"))).toBe(15);
	});
	it("Checks readability", () => {
		expect(blossom("#000").readable()).toBe(true);
		expect(blossom("#777777").readable()).toBe(false);
		expect(blossom("#e60000").readable("#FFFF47")).toBe(true);
		expect(blossom("#AF085C").readable("#000000")).toBe(false);
		expect(blossom("#AF085C").readable("#000000", { size: "large" })).toBe(true);
		expect(blossom("#D53987").readable("#000000")).toBe(true);
		expect(blossom("#D53987").readable("#000000", { level: "AAA" })).toBe(false);
		expect(blossom("#E9DDDD").readable("#864B7C", { level: "AA" })).toBe(true);
		expect(blossom("#E9DDDD").readable("#864B7C", { level: "AAA" })).toBe(false);
		expect(blossom("#E9DDDD").readable("#864B7C", { level: "AAA", size: "large" })).toBe(true);
		expect(blossom("#E9DDDD").readable("#67325E", { level: "AAA" })).toBe(true);
		expect(blossom("#E9DDDD").readable(blossom("#67325E"), { level: "AAA" })).toBe(true);
	});
});

describe("XYZ plugin", () => {
	/**
	 * Test results:
	 * 
	 * - https://www.nixsensor.com/free-color-converter/
	 * - https://cielab.xyz/colorconv/
	 * - https://www.easyrgb.com/en/convert.php
	 */
	extend([ pluginXYZ ]);

	it("Parses XYZ color object", () => {
		expect(blossom({ x: 0, y: 0, z: 0 }).hex).toBe("#000000");
		expect(blossom({ x: 50, y: 50, z: 50 }).hex).toBe("#BEB9CF");
		expect(blossom({ x: 96.42, y: 100, z: 82.52, a: 1 }).hex).toBe("#FFFFFF");
	});

	it("Converts a color to CIE XYZ object", () => {
		expect(blossom("#FFFFFF").xyz).toMatchObject({ x: 96.42, y: 100, z: 82.52, a: 1 });
		expect(blossom("#5CBF54").xyz).toMatchObject({ x: 26, y: 40.27, z: 11.54, a: 1 });
		expect(blossom("#00000000").xyz).toMatchObject({ x: 0, y: 0, z: 0, a: 0 });
	});

	it("Converts a color to CIE XYZ string", () => {
		expect(blossom("#00000080").toStringXYZ).toBe("color(xyz 0 0 0 / 0.5)");
		expect(blossom("#FFFFFF").toStringXYZ).toBe("color(xyz 96.42 100 82.52)");
		expect(blossom("#C65D06ED").toStringXYZ).toBe("color(xyz 28.87 20.42 1.98 / 0.93)");
		expect(blossom("#ABCDEF").toStringXYZ).toBe("color(xyz 53.62 58.06 68.14)");
	});

	it("Supported by `getModel`", () => {
		expect(getModel({ x: 30, y: 20, z: 10 })).toBe("xyz");
	});
});

describe("LAB plugin", () => {
	/**
	 * Test results: https://cielab.xyz/colorconv/
	 */
	extend([ pluginLAB ]);

	it("Parses CIE LAB color object", () => {
		expect(blossom({ l: 100, a: 0, b: 0 }).hex).toBe("#FFFFFF");
		expect(blossom({ l: 0, a: 0, b: 0 }).hex).toBe("#000000");
		expect(blossom({ l: 54.29, a: 80.81, b: 69.89 }).hex).toBe("#FF0000");
		expect(blossom({ l: 15.05, a: 6.68, b: 14.59, alpha: 0.5 }).hex).toBe("#33221180");
		expect(blossom({ l: 50.93, a: 64.96, b: -6.38, alpha: 1 }).hex).toBe("#D53987");
	});

	it("Converts a color to CIE LAB object", () => {
		expect(blossom("#FFFFFF").lab).toMatchObject({ l: 100, a: 0, b: 0, alpha: 1 });
		expect(blossom("#00000000").lab).toMatchObject({ l: 0, a: 0, b: 0, alpha: 0 });
		expect(blossom("#FF0000").lab).toMatchObject({ l: 54.29, a: 80.81, b: 69.89, alpha: 1 });
		expect(blossom("#00FF00").lab).toMatchObject({ l: 87.82, a: -79.29, b: 80.99, alpha: 1 });
		expect(blossom("#FFFF00").lab).toMatchObject({ l: 97.61, a: -15.75, b: 93.39, alpha: 1 });
		expect(blossom("#AABBCC").lab).toMatchObject({ l: 74.97, a: -3.4, b: -10.7, alpha: 1 });
		expect(blossom("#33221180").lab).toMatchObject({ l: 15.05, a: 6.68, b: 14.59, alpha: 0.5 });
		expect(blossom("#D53987").lab).toMatchObject({ l: 50.93, a: 64.96, b: -6.38, alpha: 1 });
		expect(blossom("#123ABC").lab).toMatchObject({ l: 29.95, a: 29.48, b: -72.93, alpha: 1 });
	});

	it("Converts a color to CIE LAB string", () => {
		expect(blossom("#00000080").toStringLAB).toBe("lab(0% 0 0 / 0.5)");
		expect(blossom("#FFFFFF").toStringLAB).toBe("lab(100% 0 0)");
		expect(blossom("#C65D06ED").toStringLAB).toBe("lab(52.31% 40.04 60.1 / 0.93)");
		expect(blossom("#ABCDEF").toStringLAB).toBe("lab(80.77% -5.96 -20.79)");
	});

	it("Supported by `getModel`", () => {
		expect(getModel({ l: 50, a: 0, b: 0, alpha: 1 })).toBe("lab");
	});
});

describe("lch", () => {
	/**
	 * Test results sources:
	 * 
	 * - https://www.w3.org/TR/css-color-4/#specifying-lab-lch
	 * - https://cielab.xyz/colorconv/
	 * - https://www.w3.org/TR/css-color-4/
	 * - https://developer.mozilla.org/en-US/docs/Web/CSS/angle
	 * 
	 */
	extend([ pluginLCH ]);

	it("Parses CIE LCH color object", () => {
		expect(blossom({ l: 0, c: 0, h: 0, a: 0 }).hex).toBe("#00000000");
		expect(blossom({ l: 100, c: 0, h: 0 }).hex).toBe("#FFFFFF");
		expect(blossom({ l: 29.2345, c: 44.2, h: 27 }).hex).toBe("#7D2329");
		expect(blossom({ l: 52.2345, c: 72.2, h: 56.2 }).hex).toBe("#C65D06");
		expect(blossom({ l: 60.2345, c: 59.2, h: 95.2 }).hex).toBe("#9D9318");
		expect(blossom({ l: 62.2345, c: 59.2, h: 126.2 }).hex).toBe("#68A639");
		expect(blossom({ l: 67.5345, c: 42.5, h: 258.2, a: 0.5 }).hex).toBe("#62ACEF80");
	});

	it("Parses CIE LCH color string", () => {
		expect(blossom("lch(0% 0 0 / 0)").hex).toBe("#00000000");
		expect(blossom("lch(100% 0 0)").hex).toBe("#FFFFFF");
		expect(blossom("lch(52.2345% 72.2 56.2 / 1)").hex).toBe("#C65D06");
		expect(blossom("lch(37% 105 305)").hex).toBe("#6A27E7");
		expect(blossom("lch(56.2% 83.6 357.4 / 93%)").hex).toBe("#FE1091ED");
	});

	it("Converts a color to CIE LCH object", () => {
		expect(blossom("#00000000").lch).toMatchObject({ l: 0, c: 0, h: 0, a: 0 });
		expect(blossom("#ffffff").lch).toMatchObject({ l: 100, c: 0, h: 0, a: 1 });
		expect(blossom("#7d2329").lch).toMatchObject({ l: 29.16, c: 44.14, h: 26.48, a: 1 });
		expect(blossom("#c65d06").lch).toMatchObject({ l: 52.31, c: 72.21, h: 56.33, a: 1 });
		expect(blossom("#9d9318").lch).toMatchObject({ l: 60.31, c: 59.2, h: 95.46, a: 1 });
		expect(blossom("#68a639").lch).toMatchObject({ l: 62.22, c: 59.15, h: 126.15, a: 1 });
		expect(blossom("#62acef80").lch).toMatchObject({ l: 67.67, c: 42.18, h: 257.79, a: 0.5 });
	});

	it("Converts a color to CIE LCH string (CSS functional notation)", () => {
		expect(blossom("#00000080").toStringLCH).toBe("lch(0% 0 0 / 0.5)");
		expect(blossom("#ffffff").toStringLCH).toBe("lch(100% 0 0)");
		expect(blossom("#c65d06ed").toStringLCH).toBe("lch(52.31% 72.21 56.33 / 0.93)");
		expect(blossom("#aabbcc").toStringLCH).toBe("lch(74.97% 11.22 252.37)");
	});

	it("Supports all valid CSS angle units", () => {
		expect(blossom("lch(50% 50 90deg)").lch.h).toBe(90);
		expect(blossom("lch(50% 50 100grad)").lch.h).toBe(90);
		expect(blossom("lch(50% 50 0.25turn)").lch.h).toBe(90);
		expect(blossom("lch(50% 50 1.5708rad)").lch.h).toBe(90);
	});

	it("Supported by `getModel`", () => {
		expect(getModel("lch(50% 50 180deg)")).toBe("lch");
		expect(getModel({ l: 50, c: 50, h: 180 })).toBe("lch");
	});
});

describe("hwb", () => {
	/**
	 * Test results:
	 * 
	 * - https://htmlcolors.com/color-converter
	 * - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb()
	 * - https://en.wikipedia.org/wiki/HWB_color_model
	 */
	extend([ pluginHWB ]);

	it("Parses HWB color object", () => {
		expect(blossom({ h: 0, w: 0, b: 100 }).hex).toBe("#000000");
		expect(blossom({ h: 210, w: 67, b: 20, a: 1 }).hex).toBe("#ABBBCC");
		expect(blossom({ h: 236, w: 33, b: 33, a: 0.5 }).hex).toBe("#545AAB80");
		expect(blossom({ h: 0, w: 100, b: 0, a: 1 }).hex).toBe("#FFFFFF");
	});

	it("Converts a color to HWB object", () => {
		
		expect(blossom("#000000").hwb).toMatchObject({ h: 0, w: 0, b: 100, a: 1 });
		expect(blossom("#FF0000").hwb).toMatchObject({ h: 0, w: 0, b: 0, a: 1 });
		expect(blossom("#00FFFF").hwb).toMatchObject({ h: 180, w: 0, b: 0, a: 1 });
		expect(blossom("#665533").hwb).toMatchObject({ h: 40, w: 20, b: 60, a: 1 });
		expect(blossom("#FEACFA").hwb).toMatchObject({ h: 303, w: 67, b: 0, a: 1 });
		expect(blossom("#FFFFFF").hwb).toMatchObject({ h: 0, w: 100, b: 0, a: 1 });
	});

	it("Parses HWB color string", () => {
		expect(blossom("hwb(194 0% 0%)").hex).toBe("#00C3FF");
		expect(blossom("hwb(194 0% 0% / .5)").hex).toBe("#00C3FF80");
		expect(blossom("hwb(-90deg 40% 40% / 50%)").hex).toBe("#7F669980");
	});

	it("Ignores invalid syntax", () => {
		// comma syntax is not documented
		expect(blossom("hwb(194, 0%, 0%, .5)").valid).toBe(false);
		// missing percents
		expect(blossom("hwb(-90deg 40 40)").valid).toBe(false);
	});

	it("Converts a color to HWB string", () => {
		expect(blossom("#999966").toStringHWB).toBe("hwb(60 40% 40%)");
		expect(blossom("#99FFFF").toStringHWB).toBe("hwb(180 60% 0%)");
		expect(blossom("#00336680").toStringHWB).toBe("hwb(210 0% 60% / 0.5)");
	});

	it("Supports all valid CSS angle units", () => {
		expect(blossom("hwb(90deg 20% 20%)").hwb.h).toBe(90);
		expect(blossom("hwb(100grad 20% 20%)").hwb.h).toBe(90);
		expect(blossom("hwb(1.25turn 20% 20%)").hwb.h).toBe(90);
		expect(blossom("hwb(1.5708rad 20% 20%)").hwb.h).toBe(90);
	});

	it("Supported by `getModel`", () => {
		expect(getModel("hwb(180deg 50% 50%)")).toBe("hwb");
		expect(getModel({ h: 0, w: 0, b: 100 })).toBe("hwb");
	});
});