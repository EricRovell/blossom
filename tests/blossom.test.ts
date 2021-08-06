/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Blossom, blossom } from "@/blossom";
import { random } from "@/random";
import { getModel } from "@properties";
import { testColor, testColors, saturationSteps } from "./samples";

describe("Parsing", () => {
	it("Validates an input value correctly", () => {
		expect(blossom("#ffffff").valid).toBe(true);
		expect(blossom("#0011gg").valid).toBe(false);
		expect(blossom("#12345").valid).toBe(false);
		expect(blossom("#1234567").valid).toBe(false);
		expect(blossom("abracadabra").valid).toBe(false);
		expect(blossom("rgba(0,0,0,1)").valid).toBe(true);
		expect(blossom("hsla(100,50%,50%,1)").valid).toBe(true);
		expect(blossom({ r: 255, g: 255, b: 255 }).valid).toBe(true);
		expect(blossom({ r: 255, g: 255, v: 255 }).valid).toBe(false);
		expect(blossom({ h: 0, w: 0, l: 0 }).valid).toBe(false);
		expect(blossom({ w: 1, u: 2, t: 3 }).valid).toBe(false);
	});
	it("Accepts a class instance as an input", () => {
		const instance = blossom(testColor.hex);
		expect(blossom(instance).rgb).toMatchObject(testColor.rgba);
		expect(blossom(blossom(instance)).hsl).toMatchObject(testColor.hsla);
	});
	it("Gets an input color model", () => {
		expect(getModel("#000")).toBe("hex");
		expect(getModel("rgb(128, 128, 128)")).toBe("rgb");
		expect(getModel("rgba(50% 50% 50% / 50%)")).toBe("rgb");
		expect(getModel("hsl(180, 50%, 50%)")).toBe("hsl");
		expect(getModel({ r: 128, g: 128, b: 128, a: 0.5 })).toBe("rgb");
		expect(getModel({ h: 180, s: 50, l: 50, a: 0.5 })).toBe("hsl");
		expect(getModel({ h: 180, s: 50, v: 50, a: 0.5 })).toBe("hsv");
		expect(getModel({ c: 53, m: 46, y: 85, k: 28 })).toBe("cmyk");
		expect(getModel("disco-dancing")).toBeNull();
		expect(getModel({ w: 1, u: 2, t: 3 })).toBeNull();
	});
	it("Parses and transforms the color", () => {
		for (const value of Object.values(testColor)) {
			const instance = blossom(value);
  
			expect(instance.hex).toBe(testColor.hex);
			expect(instance.rgb).toEqual(expect.objectContaining(testColor.rgb));
			expect(instance.toStringRGB).toBe(testColor.rgbStringWhitespace);
			expect(instance.hsl).toEqual(expect.objectContaining(testColor.hsl));
			expect(instance.toStringHSL).toBe(testColor.hslStringWhitespace);
			expect(instance.hsv).toEqual(expect.objectContaining(testColor.hsv));
			expect(instance.cmyk).toEqual(expect.objectContaining(testColor.cmyk));
		}
	});
	it("Parses modern whitespace RGB notation", () => {
		expect(blossom("rgb(0% 50% 100%)").rgb).toEqual({ r: 0, g: 128, b: 255, a: 1 });
		expect(blossom("rgb(10% 20% 30% / 0.5)").rgb).toEqual({ r: 26, g: 51, b: 77, a: 0.5 });
		expect(blossom("rgb(10% 20% 30% / 33%)").rgb).toEqual({ r: 26, g: 51, b: 77, a: 0.33 });
	});
	it("Parses modern whitespace HSL notation", () => {
		expect(blossom("hsl(120deg 100% 50%)").hsl).toEqual({ h: 120, s: 100, l: 50, a: 1 });
		expect(blossom("hsl(10deg 20% 30% / 0.1)").hsl).toEqual({ h: 10, s: 20, l: 30, a: 0.1 });
		expect(blossom("hsl(10deg 20% 30% / 90%)").hsl).toEqual({ h: 10, s: 20, l: 30, a: 0.9 });
	});
	it("Supports HEX color strings with alpha values", () => {
		expect(blossom("#ffffffff").rgb).toEqual({ r: 255, g: 255, b: 255, a: 1 });
		expect(blossom("#80808080").rgb).toEqual({ r: 128, g: 128, b: 128, a: 0.5 });
		expect(blossom("#AAAF").rgb).toEqual({ r: 170, g: 170, b: 170, a: 1 });
		expect(blossom("#5550").rgb).toEqual({ r: 85, g: 85, b: 85, a: 0 });
		expect(blossom({ r: 255, g: 255, b: 255, a: 1 }).hex).toBe("#FFFFFF");
		expect(blossom({ r: 170, g: 170, b: 170, a: 0.5 }).hex).toBe("#AAAAAA80");
		expect(blossom({ r: 128, g: 128, b: 128, a: 0 }).hex).toBe("#80808000");
	});
	it("Parses shorthand alpha values", () => {
		expect(blossom("rgba(0, 0, 0, .5)").alpha).toBe(0.5);
		expect(blossom("rgba(50% 50% 50% / .999%)").alpha).toBe(0.01);
		expect(blossom("hsla(0, 0%, 0%, .25)").alpha).toBe(0.25);
	});
	it("Ignores invalid color formats", () => {
		// mixing prefix
		expect(blossom("AbC").valid).toBe(false);
		expect(blossom("111").valid).toBe(false);
		expect(blossom("999999").valid).toBe(false);
		// no bracket
		expect(blossom("rgb 10 10 10)").valid).toBe(false);
		expect(blossom("rgb(10 10 10").valid).toBe(false);
		// missing commas
		expect(blossom("rgb( 10 10 10 0.1 )").valid).toBe(false);
		expect(blossom("hsl(10, 20 30)").valid).toBe(false);
		// mixing numbers and percentage
		expect(blossom("rgb(100, 100%, 20)").valid).toBe(false);
		// mixing commas and slash
		expect(blossom("rgba(10, 50, 30 / .5").valid).toBe(false);
		expect(blossom("hsla(10, 20, 30/50%)").valid).toBe(false);
		// missing percent
		expect(blossom("hsl(10deg, 50, 50)").valid).toBe(false);
		// wrong content
		expect(blossom("rgb(10, 10, 10, var(--alpha))").valid).toBe(false);
		expect(blossom("hsl(var(--h) 10% 10%)").valid).toBe(false);
	});
	it("Ignores a case and extra whitespace", () => {
		expect(blossom(" #0a0a0a ").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
		expect(blossom("RGB( 10, 10, 10 )").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
		expect(blossom(" rGb(10,10,10 )").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
		expect(blossom("  Rgb(10, 10, 10) ").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
		expect(blossom("  hSl(10,20%,30%,0.1)").hsl).toMatchObject({ h: 10, s: 20, l: 30, a: 0.1 });
		expect(blossom("HsLa( 10, 20%, 30%, 1)  ").hsl).toMatchObject({ h: 10, s: 20, l: 30, a: 1 });
	});
	it("Supports all valid CSS angle units", () => {
		expect(blossom("hsl(90deg, 50%, 50%)").hsl.h).toBe(90);
		expect(blossom("hsl(100grad, 50%, 50%)").hsl.h).toBe(90);
		expect(blossom("hsl(.25turn, 50%, 50%)").hsl.h).toBe(90);
		expect(blossom("hsl(1.5708rad, 50%, 50%)").hsl.h).toBe(90);
		expect(blossom("hsl(-180deg, 50%, 50%)").hsl.h).toBe(180);
		expect(blossom("hsl(-200grad, 50%, 50%)").hsl.h).toBe(180);
		expect(blossom("hsl(-.5turn, 50%, 50%)").hsl.h).toBe(180);
		expect(blossom("hsl(-3.1416rad, 50%, 50%)").hsl.h).toBe(180);
	});
	it("Clamps input numbers", () => {
		expect(blossom("rgba(256, 999, -200, 2)").rgb).toEqual({ r: 255, g: 255, b: 0, a: 1 });
		expect(blossom({ r: NaN, g: -Infinity, b: +Infinity, a: 100500 }).rgb).toEqual({ r: 0, g: 0, b: 255, a: 1 });
		expect(blossom({ h: NaN, s: -Infinity, l: +Infinity, a: 100500 }).hsl).toEqual({ h: 0, s: 0, l: 100, a: 1 });
	});  
	it("Clamps hue value properly", () => {
		expect(blossom("hsl(361, 50%, 50%)").hsl.h).toBe(1);
		expect(blossom("hsl(-1, 50%, 50%)").hsl.h).toBe(359);
		expect(blossom({ h: 999, s: 50, l: 50 }).hsl.h).toBe(279);
		expect(blossom({ h: -999, s: 50, l: 50 }).hsl.h).toBe(81);
		expect(blossom({ h: 400, s: 50, v: 50 }).hsv.h).toBe(40);
		expect(blossom({ h: -400, s: 50, v: 60 }).hsv.h).toBe(320);
	});
	it("Does not crash when input has an invalid type", () => {
		const fallbackRGB = { r: 0, g: 0, b: 0, a: 1 };
		// @ts-ignore
		expect(blossom().rgb).toMatchObject(fallbackRGB);
		// @ts-ignore
		expect(blossom(null).rgb).toMatchObject(fallbackRGB);
		// @ts-ignore
		expect(blossom(undefined).rgb).toMatchObject(fallbackRGB);
		// @ts-ignore
		expect(blossom([1, 2, 3]).rgb).toMatchObject(fallbackRGB);
	});  
	it("Does not crash when input has an invalid format", () => {
		const fallbackRGB = { r: 0, g: 0, b: 0, a: 1 };
		expect(blossom({ w: 1, u: 2, t: 3 }).rgb).toMatchObject(fallbackRGB);
		expect(blossom("BANANA").rgb).toMatchObject(fallbackRGB);
	});
	it("Parses CMYK color string", () => {
		expect(blossom("device-cmyk(0% 0% 0% 100%)").hex).toBe("#000000");
		expect(blossom("device-cmyk(0% 61% 72% 0% / 50%)").hex).toBe("#FF634780");
		expect(blossom("device-cmyk(0 0.61 0.72 0 / 0.5)").hex).toBe("#FF634780");
	});
	it("Parses CMYK color object", () => {
		expect(blossom({ c: 0, m: 0, y: 0, k: 100 }).hex).toBe("#000000");
		expect(blossom({ c: 16, m: 8, y: 0, k: 20, a: 1 }).hex).toBe("#ABBCCC");
		expect(blossom({ c: 51, m: 47, y: 0, k: 33, a: 0.5 }).hex).toBe("#545BAB80");
		expect(blossom({ c: 0, m: 0, y: 0, k: 0, a: 1 }).hex).toBe("#FFFFFF");
	});
});

describe("Color transformations", () => {
	it("Transforms between color models properly", () => {
		for (const { rgb, hex, hsl, hsv, cmyk } of testColors) {
			// -> hex
			expect(blossom(rgb).hex).toBe(hex);
			expect(blossom(hsl).hex).toBe(hex);
			expect(blossom(hsv).hex).toBe(hex);
			expect(blossom(cmyk).hex).toBe(hex);
			// -> rgb
			expect(blossom(hex).rgb).toEqual(expect.objectContaining(rgb));
			expect(blossom(hsl).rgb).toEqual(expect.objectContaining(rgb));
			expect(blossom(hsv).rgb).toEqual(expect.objectContaining(rgb));
			expect(blossom(cmyk).rgb).toEqual(expect.objectContaining(rgb));
			// -> hsl
			expect(blossom(hex).hsl).toEqual(expect.objectContaining(hsl));
			expect(blossom(rgb).hsl).toEqual(expect.objectContaining(hsl));
			expect(blossom(hsv).hsl).toEqual(expect.objectContaining(hsl));
			expect(blossom(cmyk).hsl).toEqual(expect.objectContaining(hsl));
			// -> hsv
			expect(blossom(hex).hsv).toEqual(expect.objectContaining(hsv));
			expect(blossom(rgb).hsv).toEqual(expect.objectContaining(hsv));
			expect(blossom(hsl).hsv).toEqual(expect.objectContaining(hsv));
			expect(blossom(cmyk).hsv).toEqual(expect.objectContaining(hsv));
			// -> cmyk
			expect(blossom(hex).cmyk).toEqual(expect.objectContaining(cmyk));
			expect(blossom(rgb).cmyk).toEqual(expect.objectContaining(cmyk));
			expect(blossom(hsl).cmyk).toEqual(expect.objectContaining(cmyk));
			expect(blossom(hsv).cmyk).toEqual(expect.objectContaining(cmyk));
		}
	});
	it("Adds alpha value into string transformations only if needed", () => {
		expect(blossom("rgb(0 0 0)").toStringRGB).toBe("rgb(0 0 0)");
		expect(blossom("rgb(0, 0, 0)").toStringRGB).toBe("rgb(0 0 0)");
		expect(blossom("hsl(0 0% 0%)").toStringHSL).toBe("hsl(0deg 0% 0%)");
		expect(blossom("hsl(0, 0%, 0%)").toStringHSL).toBe("hsl(0deg 0% 0%)");
		expect(blossom("rgb(0 0 0 / 0.5)").toStringRGB).toBe("rgb(0 0 0 / 0.5)");
		expect(blossom("rgba(0, 0, 0, 0.5)").toStringRGB).toBe("rgb(0 0 0 / 0.5)");
		expect(blossom("hsl(0deg 0% 0% / 0.5)").toStringHSL).toBe("hsl(0deg 0% 0% / 0.5)");
		expect(blossom("hsla(0deg, 0%, 0%, 0.5)").toStringHSL).toBe("hsl(0deg 0% 0% / 0.5)");
	});
	it("Converts a color to CMYK object", () => {
		expect(blossom("#000000").cmyk).toMatchObject({ c: 0, m: 0, y: 0, k: 100, a: 1 });
		expect(blossom("#FF0000").cmyk).toMatchObject({ c: 0, m: 100, y: 100, k: 0, a: 1 });
		expect(blossom("#00FFFF").cmyk).toMatchObject({ c: 100, m: 0, y: 0, k: 0, a: 1 });
		expect(blossom("#665533").cmyk).toMatchObject({ c: 0, m: 17, y: 50, k: 60, a: 1 });
		expect(blossom("#FEACFA").cmyk).toMatchObject({ c: 0, m: 32, y: 2, k: 0, a: 1 });
		expect(blossom("#FFFFFF").cmyk).toMatchObject({ c: 0, m: 0, y: 0, k: 0, a: 1 });
	});
	it("Converts a color to CMYK string", () => {
		expect(blossom("#999966").toStringCMYK).toBe("device-cmyk(0% 0% 33% 40%)");
		expect(blossom("#99FFFF").toStringCMYK).toBe("device-cmyk(40% 0% 0% 0%)");
		expect(blossom("#00336680").toStringCMYK).toBe("device-cmyk(100% 50% 0% 60% / 0.5)");
	});
});

describe("Color manipulation", () => {
	it("Saturates and desaturates a color properly", () => {
		const instance = blossom(saturationSteps[5]);
		expect(instance.saturate(0.2).hex).toBe(saturationSteps[7]);
		expect(instance.desaturate(0.2).hex).toBe(saturationSteps[3]);
		expect(instance.saturate(0.5).hex).toBe(saturationSteps[10]);
		expect(instance.desaturate(0.5).hex).toBe(saturationSteps[0]);
		expect(instance.saturate(1).hex).toBe(saturationSteps[10]);
		expect(instance.desaturate(1).hex).toBe(saturationSteps[0]);
		expect(instance.grayscale.hex).toBe(saturationSteps[0]);
	});  
	it("Makes a color lighter and darker properly", () => {
		expect(blossom("hsl(100, 50%, 50%)").lighten().toStringHSL).toBe("hsl(100deg 50% 60%)");
		expect(blossom("hsl(100, 50%, 50%)").lighten(0.25).hsl.l).toBe(75);
		expect(blossom("hsl(100, 50%, 50%)").darken().toStringHSL).toBe("hsl(100deg 50% 40%)");
		expect(blossom("hsl(100, 50%, 50%)").darken(0.25).hsl.l).toBe(25);
		expect(blossom("#000").lighten(1).hex).toBe("#FFFFFF");
		expect(blossom("#000").lighten(0.5).hex).toBe("#808080");
		expect(blossom("#FFF").darken(1).hex).toBe("#000000");
		expect(blossom("#FFF").darken(0.5).hex).toBe("#808080");
	});  
	it("Inverts a color properly", () => {
		expect(blossom("#000").inverted.hex).toBe("#FFFFFF");
		expect(blossom("#FFF").inverted.hex).toBe("#000000");
		expect(blossom("#123").inverted.hex).toBe("#EEDDCC");
	});
	it("Changes a hue value", () => {
		expect(blossom("hsl(90, 50%, 50%)").setHue(0).toStringHSL).toBe("hsl(0deg 50% 50%)");
		expect(blossom("hsl(90, 50%, 50%)").setHue(180).toStringHSL).toBe("hsl(180deg 50% 50%)");
		expect(blossom("hsl(90, 50%, 50%)").setHue(370).toStringHSL).toBe("hsl(10deg 50% 50%)");
	});  
	it("Rotates a hue circle", () => {
		expect(blossom("hsl(90, 50%, 50%)").rotate(0).toStringHSL).toBe("hsl(90deg 50% 50%)");
		expect(blossom("hsl(90, 50%, 50%)").rotate(360).toStringHSL).toBe("hsl(90deg 50% 50%)");
		expect(blossom("hsl(90, 50%, 50%)").rotate(90).toStringHSL).toBe("hsl(180deg 50% 50%)");
		expect(blossom("hsl(90, 50%, 50%)").rotate(-180).toStringHSL).toBe("hsl(270deg 50% 50%)");
	});
	it("Changes an alpha channel value", () => {
		expect(blossom("#000").setAlpha(0.25).alpha).toBe(0.25);
		expect(blossom("#FFF").setAlpha(0).alpha).toBe(0);
	});
	it("Generates a random color", () => {
		expect(random()).toBeInstanceOf(Blossom);
		expect(random().hex).not.toBe(random().hex);
	});
});

describe("Color properties", () => {
	it("Gets color brightness", () => {
		expect(blossom("#000").brightness).toBe(0);
		expect(blossom("#808080").brightness).toBe(0.5);
		expect(blossom("#FFF").brightness).toBe(1);
		expect(blossom("#000").dark).toBe(true);
		expect(blossom("#665544").dark).toBe(true);
		expect(blossom("#888").dark).toBe(false);
		expect(blossom("#777").light).toBe(false);
		expect(blossom("#AABBCC").light).toBe(true);
		expect(blossom("#FFF").light).toBe(true);
	});  
	it("Gets an alpha channel value", () => {
		expect(blossom("#000").alpha).toBe(1);
		expect(blossom("rgba(50, 100, 150, 0.5)").alpha).toBe(0.5);
	});
	it("Gets a hue value", () => {
		expect(blossom("#000").hue).toBe(0);
		expect(blossom("hsl(90, 50%, 50%)").hue).toBe(90);
		expect(blossom("hsl(-10, 50%, 50%)").hue).toBe(350);
	});
});