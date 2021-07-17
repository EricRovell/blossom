import { round } from "@util/helpers";
import type { ColorHSV, ColorRGB, ColorHSL } from "@types";

/**
 * Convert HSV color object to RGB.
 */
export function hsv2rgb(color: ColorHSV): ColorRGB {
  let h = (color.h / 360) * 6;
  let s = color.s / 100;
  let v = color.v / 100;
  let a = color?.a ?? 1;

  const hh = Math.floor(h);
  const b = v * (1 - s);
  const c = v * (1 - (h - hh) * s);
  const d = v * (1 - (1 - h + hh) * s);
  const module = hh % 6;

  return {
    r: [v, c, b, b, d, v][module] * 255,
    g: [d, v, v, c, b, b][module] * 255,
    b: [b, b, d, v, v, c][module] * 255,
    a: a,
  };
};

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