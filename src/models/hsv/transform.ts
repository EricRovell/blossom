import { round } from "@util/helpers";
import type { ColorHSV, ColorRGB, ColorHSL } from "@types";

/**
 * Convert HSV color object to RGB.
 */
export function hsv2rgb(color: ColorHSV): ColorRGB {
  let h = color.h;
  let s = color.s / 100;
  let v = color.v / 100;
  let a = color.a ? round(color.a, 2) : 1;

  const chroma = v * s;
  
  // will be used as the middle (second-largest) component value
  const middle = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  
  // to adjust each of the values for lightness
  const m = v - chroma;

  let r: number = 0;
  let g: number = 0;
  let b: number = 0;
  
  if (h >= 0 && h < 60) {
    [ r, g, b ] = [ chroma, middle, 0 ];
  } else if (h >= 60 && h < 120) {
    [ r, g, b ] = [ middle, chroma, 0 ];
  } else if (h >= 120 && h < 180) {
    [ r, g, b ] = [ 0, chroma, middle ];
  } else if (h >= 180 && h < 240) {
    [ r, g, b ] = [ 0, middle, chroma ];
  } else if (h >= 240 && h < 300) {
    [ r, g, b ] = [ middle, 0, chroma ];
  } else if (h >= 300 && h < 360) {
    [ r, g, b ] = [ chroma, 0, middle ];
  }

  return {
    r: round(255 * (r + m)),
    g: round(255 * (g + m)),
    b: round(255 * (b + m)),
    a
  };
}

/**
 * Convert HSV color object to HSL.
 */
export function hsv2hsl(color: ColorHSV): ColorHSL {
  let h = color.h;
  let sv = color.s / 100;
  let v = color.v / 100;
  let a = color.a ? round(color.a, 2) : 1;
  
  const l = v * (1 - sv / 2);
  const sl = (l === 0 || l === 1)
    ? 0
    : (v - l) / (Math.min(l, 1 - l));

  return {
    h,
    s: round(sl * 100),
    l: round(l * 100),
    a
  };
}