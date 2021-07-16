import { round } from "@util/helpers";
import type { ColorRGB, ColorCMYK } from "@types";

/**
 * Transforms the CMYK color object to RGB.
 */
export function cmyk2rgb(color: ColorCMYK): ColorRGB {
  let c = color.c / 100;
  let m = color.m / 100;
  let y = color.y / 100;
  let k = color.k / 100;
  let a = color?.a ?? 1;
  
  return {
    r: round(255 * (1 - c) * (1 - k)),
    g: round(255 * (1 - m) * (1 - k)),
    b: round(255 * (1 - y) * (1 - k)),
    a: a ? round(a, 2) : 1
  };
}