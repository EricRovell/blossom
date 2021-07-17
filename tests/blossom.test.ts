import { Blossom, petal } from "@/blossom";
import { random } from "@/random";
import { getModel } from "@properties";
import { testColor, testColors, saturationSteps } from "./samples";

it("Parses and transforms the color", () => {
  for (let value of Object.values(testColor)) {
    const instance = petal(value);

    expect(instance.hex).toBe(testColor.hex);
    expect(instance.rgb).toEqual(expect.objectContaining(testColor.rgb));
    expect(instance.toStringRGB).toBe(testColor.rgbStringWhitespace);
    expect(instance.hsl).toEqual(expect.objectContaining(testColor.hsl));
    expect(instance.toStringHSL).toBe(testColor.hslStringWhitespace);
    expect(instance.hsv).toEqual(expect.objectContaining(testColor.hsv));
    expect(instance.cmyk).toEqual(expect.objectContaining(testColor.cmyk));
  }
});

it("Transforms between color models properly", () => {
  for (let { rgb, hex, hsl, hsv, cmyk } of testColors) {
    // -> hex
    expect(petal(rgb).hex).toBe(hex);
    expect(petal(hsl).hex).toBe(hex);
    expect(petal(hsv).hex).toBe(hex);
    expect(petal(cmyk).hex).toBe(hex);
    // -> rgb
    expect(petal(hex).rgb).toEqual(expect.objectContaining(rgb));
    expect(petal(hsl).rgb).toEqual(expect.objectContaining(rgb));
    expect(petal(hsv).rgb).toEqual(expect.objectContaining(rgb));
    expect(petal(cmyk).rgb).toEqual(expect.objectContaining(rgb));
    // -> hsl
    expect(petal(hex).hsl).toEqual(expect.objectContaining(hsl));
    expect(petal(rgb).hsl).toEqual(expect.objectContaining(hsl));
    expect(petal(hsv).hsl).toEqual(expect.objectContaining(hsl));
    expect(petal(cmyk).hsl).toEqual(expect.objectContaining(hsl));
    // -> hsv
    expect(petal(hex).hsv).toEqual(expect.objectContaining(hsv));
    expect(petal(rgb).hsv).toEqual(expect.objectContaining(hsv));
    expect(petal(hsl).hsv).toEqual(expect.objectContaining(hsv));
    expect(petal(cmyk).hsv).toEqual(expect.objectContaining(hsv));
    // -> cmyk
    expect(petal(hex).cmyk).toEqual(expect.objectContaining(cmyk));
    expect(petal(rgb).cmyk).toEqual(expect.objectContaining(cmyk));
    expect(petal(hsl).cmyk).toEqual(expect.objectContaining(cmyk));
    expect(petal(hsv).cmyk).toEqual(expect.objectContaining(cmyk));
  }
});

it("Adds alpha value into string transformations only if needed", () => {
  expect(petal("rgb(0 0 0)").toStringRGB).toBe("rgb(0 0 0)");
  expect(petal("rgb(0, 0, 0)").toStringRGB).toBe("rgb(0 0 0)");
  expect(petal("hsl(0 0% 0%)").toStringHSL).toBe("hsl(0deg 0% 0%)");
  expect(petal("hsl(0, 0%, 0%)").toStringHSL).toBe("hsl(0deg 0% 0%)");
  expect(petal("rgb(0 0 0 / 0.5)").toStringRGB).toBe("rgb(0 0 0 / 0.5)");
  expect(petal("rgba(0, 0, 0, 0.5)").toStringRGB).toBe("rgb(0 0 0 / 0.5)");
  expect(petal("hsl(0deg 0% 0% / 0.5)").toStringHSL).toBe("hsl(0deg 0% 0% / 0.5)");
  expect(petal("hsla(0deg, 0%, 0%, 0.5)").toStringHSL).toBe("hsl(0deg 0% 0% / 0.5)");
});

it("Parses modern whitespace RGB notation", () => {
  expect(petal("rgb(0% 50% 100%)").rgb).toEqual({ r: 0, g: 128, b: 255, a: 1 });
  expect(petal("rgb(10% 20% 30% / 0.5)").rgb).toEqual({ r: 26, g: 51, b: 77, a: 0.5 });
  expect(petal("rgb(10% 20% 30% / 33%)").rgb).toEqual({ r: 26, g: 51, b: 77, a: 0.33 });
});

it("Parses modern whitespace HSL notation", () => {
  expect(petal("hsl(120deg 100% 50%)").hsl).toEqual({ h: 120, s: 100, l: 50, a: 1 });
  expect(petal("hsl(10deg 20% 30% / 0.1)").hsl).toEqual({ h: 10, s: 20, l: 30, a: 0.1 });
  expect(petal("hsl(10deg 20% 30% / 90%)").hsl).toEqual({ h: 10, s: 20, l: 30, a: 0.9 });
});

it("Supports HEX color strings with alpha values", () => {
  expect(petal("#ffffffff").rgb).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  expect(petal("#80808080").rgb).toEqual({ r: 128, g: 128, b: 128, a: 0.5 });
  expect(petal("#AAAF").rgb).toEqual({ r: 170, g: 170, b: 170, a: 1 });
  expect(petal("#5550").rgb).toEqual({ r: 85, g: 85, b: 85, a: 0 });
  expect(petal({ r: 255, g: 255, b: 255, a: 1 }).hex).toBe("#FFFFFF");
  expect(petal({ r: 170, g: 170, b: 170, a: 0.5 }).hex).toBe("#AAAAAA80");
  expect(petal({ r: 128, g: 128, b: 128, a: 0 }).hex).toBe("#80808000");
});

it("Ignores a case and extra whitespace", () => {
  expect(petal(" #0a0a0a ").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
  expect(petal("RGB( 10, 10, 10 )").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
  expect(petal(" rGb(10,10,10 )").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
  expect(petal("  Rgb(10, 10, 10) ").rgb).toMatchObject({ r: 10, g: 10, b: 10, a: 1 });
  expect(petal("  hSl(10,20%,30%,0.1)").hsl).toMatchObject({ h: 10, s: 20, l: 30, a: 0.1 });
  expect(petal("HsLa( 10, 20%, 30%, 1)  ").hsl).toMatchObject({ h: 10, s: 20, l: 30, a: 1 });
});

it("Parses shorthand alpha values", () => {
  expect(petal("rgba(0, 0, 0, .5)").alpha).toBe(0.5);
  expect(petal("rgba(50% 50% 50% / .999%)").alpha).toBe(0.01);
  expect(petal("hsla(0, 0%, 0%, .25)").alpha).toBe(0.25);
});

it("Ignores invalid color formats", () => {
  // mixing prefix
  expect(petal("AbC").valid).toBe(false);
  expect(petal("111").valid).toBe(false);
  expect(petal("999999").valid).toBe(false);
  // no bracket
  expect(petal("rgb 10 10 10)").valid).toBe(false);
  expect(petal("rgb(10 10 10").valid).toBe(false);
  // missing commas
  expect(petal("rgb( 10 10 10 0.1 )").valid).toBe(false);
  expect(petal("hsl(10, 20 30)").valid).toBe(false);
  // mixing numbers and percentage
  expect(petal("rgb(100, 100%, 20)").valid).toBe(false);
  // mixing commas and slash
  expect(petal("rgba(10, 50, 30 / .5").valid).toBe(false);
  expect(petal("hsla(10, 20, 30/50%)").valid).toBe(false);
  // missing percent
  expect(petal("hsl(10deg, 50, 50)").valid).toBe(false);
  // wrong content
  expect(petal("rgb(10, 10, 10, var(--alpha))").valid).toBe(false);
  expect(petal("hsl(var(--h) 10% 10%)").valid).toBe(false);
});

it("Clamps input numbers", () => {
  expect(petal("rgba(256, 999, -200, 2)").rgb).toEqual({ r: 255, g: 255, b: 0, a: 1 });
  expect(petal({ r: NaN, g: -Infinity, b: +Infinity, a: 100500 }).rgb).toEqual({ r: 0, g: 0, b: 255, a: 1 });
  expect(petal({ h: NaN, s: -Infinity, l: +Infinity, a: 100500 }).hsl).toEqual({ h: 0, s: 0, l: 100, a: 1 });
});

it("Clamps hue value properly", () => {
  expect(petal("hsl(361, 50%, 50%)").hsl.h).toBe(1);
  expect(petal("hsl(-1, 50%, 50%)").hsl.h).toBe(359);
  expect(petal({ h: 999, s: 50, l: 50 }).hsl.h).toBe(279);
  expect(petal({ h: -999, s: 50, l: 50 }).hsl.h).toBe(81);
  expect(petal({ h: 400, s: 50, v: 50 }).hsv.h).toBe(40);
  expect(petal({ h: -400, s: 50, v: 60 }).hsv.h).toBe(320);
});

it("Supports all valid CSS angle units", () => {
  expect(petal("hsl(90deg, 50%, 50%)").hsl.h).toBe(90);
  expect(petal("hsl(100grad, 50%, 50%)").hsl.h).toBe(90);
  expect(petal("hsl(.25turn, 50%, 50%)").hsl.h).toBe(90);
  expect(petal("hsl(1.5708rad, 50%, 50%)").hsl.h).toBe(90);
  expect(petal("hsl(-180deg, 50%, 50%)").hsl.h).toBe(180);
  expect(petal("hsl(-200grad, 50%, 50%)").hsl.h).toBe(180);
  expect(petal("hsl(-.5turn, 50%, 50%)").hsl.h).toBe(180);
  expect(petal("hsl(-3.1416rad, 50%, 50%)").hsl.h).toBe(180);
});

it("Accepts a class instance as an input", () => {
  const instance = petal(testColor.hex);
  expect(petal(instance).rgb).toMatchObject(testColor.rgba);
  expect(petal(petal(instance)).hsl).toMatchObject(testColor.hsla);
});

it("Does not crash when input has an invalid type", () => {
  const fallbackRGB = { r: 0, g: 0, b: 0, a: 1 };
  // @ts-ignore
  expect(petal().rgb).toMatchObject(fallbackRGB);
  // @ts-ignore
  expect(petal(null).rgb).toMatchObject(fallbackRGB);
  // @ts-ignore
  expect(petal(undefined).rgb).toMatchObject(fallbackRGB);
  // @ts-ignore
  expect(petal([1, 2, 3]).rgb).toMatchObject(fallbackRGB);
});

it("Does not crash when input has an invalid format", () => {
  const fallbackRGB = { r: 0, g: 0, b: 0, a: 1 };
  expect(petal({ w: 1, u: 2, t: 3 }).rgb).toMatchObject(fallbackRGB);
  expect(petal("BANANA").rgb).toMatchObject(fallbackRGB);
});

it("Validates an input value correctly", () => {
  expect(petal("#ffffff").valid).toBe(true);
  expect(petal("#0011gg").valid).toBe(false);
  expect(petal("#12345").valid).toBe(false);
  expect(petal("#1234567").valid).toBe(false);
  expect(petal("abracadabra").valid).toBe(false);
  expect(petal("rgba(0,0,0,1)").valid).toBe(true);
  expect(petal("hsla(100,50%,50%,1)").valid).toBe(true);
  expect(petal({ r: 255, g: 255, b: 255 }).valid).toBe(true);
  expect(petal({ r: 255, g: 255, v: 255 }).valid).toBe(false);
  expect(petal({ h: 0, w: 0, l: 0 }).valid).toBe(false);
  expect(petal({ w: 1, u: 2, t: 3 }).valid).toBe(false);
});

it("Saturates and desaturates a color properly", () => {
  const instance = petal(saturationSteps[5]);
  expect(instance.saturate(0.2).hex).toBe(saturationSteps[7]);
  expect(instance.desaturate(0.2).hex).toBe(saturationSteps[3]);
  expect(instance.saturate(0.5).hex).toBe(saturationSteps[10]);
  expect(instance.desaturate(0.5).hex).toBe(saturationSteps[0]);
  expect(instance.saturate(1).hex).toBe(saturationSteps[10]);
  expect(instance.desaturate(1).hex).toBe(saturationSteps[0]);
  expect(instance.grayscale.hex).toBe(saturationSteps[0]);
});

it("Makes a color lighter and darker properly", () => {
  expect(petal("hsl(100, 50%, 50%)").lighten().toStringHSL).toBe("hsl(100deg 50% 60%)");
  expect(petal("hsl(100, 50%, 50%)").lighten(0.25).hsl.l).toBe(75);
  expect(petal("hsl(100, 50%, 50%)").darken().toStringHSL).toBe("hsl(100deg 50% 40%)");
  expect(petal("hsl(100, 50%, 50%)").darken(0.25).hsl.l).toBe(25);
  expect(petal("#000").lighten(1).hex).toBe("#FFFFFF");
  expect(petal("#000").lighten(0.5).hex).toBe("#808080");
  expect(petal("#FFF").darken(1).hex).toBe("#000000");
  expect(petal("#FFF").darken(0.5).hex).toBe("#808080");
});

it("Inverts a color properly", () => {
  expect(petal("#000").invert.hex).toBe("#FFFFFF");
  expect(petal("#FFF").invert.hex).toBe("#000000");
  expect(petal("#123").invert.hex).toBe("#EEDDCC");
});

it("Gets color brightness", () => {
  expect(petal("#000").brightness).toBe(0);
  expect(petal("#808080").brightness).toBe(0.5);
  expect(petal("#FFF").brightness).toBe(1);
  expect(petal("#000").dark).toBe(true);
  expect(petal("#665544").dark).toBe(true);
  expect(petal("#888").dark).toBe(false);
  expect(petal("#777").light).toBe(false);
  expect(petal("#AABBCC").light).toBe(true);
  expect(petal("#FFF").light).toBe(true);
});

it("Gets an alpha channel value", () => {
  expect(petal("#000").alpha).toBe(1);
  expect(petal("rgba(50, 100, 150, 0.5)").alpha).toBe(0.5);
});

it("Changes an alpha channel value", () => {
  expect(petal("#000").setAlpha(0.25).alpha).toBe(0.25);
  expect(petal("#FFF").setAlpha(0).alpha).toBe(0);
});

it("Gets a hue value", () => {
  expect(petal("#000").hue).toBe(0);
  expect(petal("hsl(90, 50%, 50%)").hue).toBe(90);
  expect(petal("hsl(-10, 50%, 50%)").hue).toBe(350);
});

it("Changes a hue value", () => {
  expect(petal("hsl(90, 50%, 50%)").setHue(0).toStringHSL).toBe("hsl(0deg 50% 50%)");
  expect(petal("hsl(90, 50%, 50%)").setHue(180).toStringHSL).toBe("hsl(180deg 50% 50%)");
  expect(petal("hsl(90, 50%, 50%)").setHue(370).toStringHSL).toBe("hsl(10deg 50% 50%)");
});

it("Rotates a hue circle", () => {
  expect(petal("hsl(90, 50%, 50%)").rotate(0).toStringHSL).toBe("hsl(90deg 50% 50%)");
  expect(petal("hsl(90, 50%, 50%)").rotate(360).toStringHSL).toBe("hsl(90deg 50% 50%)");
  expect(petal("hsl(90, 50%, 50%)").rotate(90).toStringHSL).toBe("hsl(180deg 50% 50%)");
  expect(petal("hsl(90, 50%, 50%)").rotate(-180).toStringHSL).toBe("hsl(270deg 50% 50%)");
});

it("Generates a random color", () => {
  expect(random()).toBeInstanceOf(Blossom);
  expect(random().hex).not.toBe(random().hex);
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