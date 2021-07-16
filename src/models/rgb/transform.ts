import { round } from "@util/helpers";
import type { ColorHSV, ColorRGB, ColorHSL, ColorHEX, ColorCMYK } from "@types";

/**
 * Convert RGB Color Model object to HSV.
 */
export function rgb2hsv(rgb: ColorRGB): ColorHSV {
  let { r, g, b, a = 1 } = rgb;
  [ r, g, b ] = [ r, g, b ].map(value => value / 255);

  const [ min, max ] = [ Math.min(r, g, b), Math.max(r, g, b) ];
  const chroma = max - min;

  const hue = (() => {
    if (chroma === 0) return 0;
    switch(max) {
      case (r): return 60 * (((g - b) / chroma) + (g < b ? 6 : 0));
      case (g): return 60 * ((b - r) / chroma + 2);
      case (b): return 60 * ((r - g) / chroma + 4);
    }
  })() as number;

  const saturation = (max === 0)
    ? 0
    : chroma / max;
    
  const value = max;

  return {
    h: round(hue),
    s: round(saturation * 100),
    v: round(value * 100),
    a
  };
}

/**
 * Convert RGB Color Model object to HSL.
 */
export function rgb2hsl(color: ColorRGB): ColorHSL {
  let { r, g, b, a = 1 } = color;
  [ r, g, b ] = [ r, g, b ].map(value => value / 255);

  const [ min, max ] = [ Math.min(r, g, b), Math.max(r, g, b) ];
  const chroma = max - min;

  const lightness = (max + min) / 2;

  const saturation = (max === min)
    ? 0
    : chroma / (1 - Math.abs(2 * lightness - 1));
    
  let hue = 0;
  
  if (chroma === 0) {
    hue = 0;
  } else if (max === r) {
    hue = 60 * (((g - b) / chroma) + (g < b ? 6 : 0));
  } else if (max === g) {
    hue = 60 * ((b - r) / chroma + 2);
  } else if (max === b) {
    hue = 60 * ((r - g) / chroma + 4);
  }

  return {
    h: round(hue),
    s: round(saturation * 100),
    l: round(lightness * 100),
    a
  };
}

/**
 * Convert RGB Color Model object to HEX string.
 */
export function rgb2hex(color: ColorRGB): ColorHEX {
  const { r, g, b, a } = color;
  
  const hex = [ r, g, b ] 
    .map(value => {
      const hexValue = value.toString(16);
      return (hexValue.length === 2)
        ? hexValue
        : hexValue + hexValue;
    });
  
  if (a && a !== 1) {
    let value = a.toString(16);
    value.length === 1
      ? hex.push(value + value)
      : hex.push(value);
  }

  return `#${hex.join("").toUpperCase()}`;
}

/**
 * Convert RGB Color Model object to CMYK.
 */
export function rgb2cmyk(color: ColorRGB): ColorCMYK {
  let r = color.r / 255;
  let g = color.g / 255;
  let b = color.b / 255;
  let a = color.a ?? 1;
  
  let k = 1 - Math.max(r, g, b);
  
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);
  
  return {
    c: Number.isNaN(c) ? 0 : round(c * 100),
    m: Number.isNaN(m) ? 0 : round(m * 100),
    y: Number.isNaN(y) ? 0 : round(y * 100),
    k: round(k * 100),
    a: round(a, 2)
  };
}