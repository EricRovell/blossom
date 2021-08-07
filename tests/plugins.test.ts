import { blossom } from "@/blossom";
import { extend } from "@/extend";
import { pluginHarmonies } from "@plugins/harmonies";
import { pluginMonochromatic } from "@plugins/monochromatic";
import { pluginA11Y } from "@plugins/a11y";

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