import { hsv2rgb } from "./transform";
import { clampHSV } from "./util";
import { checkValue } from "@util/helpers";
import { ColorRGB, ColorHSV, InputObject } from "@types";

/**
 * Parses the HSV color object into RGB.
 */
export function parseHSVColor({ h, s, v, a = 1 }: InputObject): ColorRGB | null {
  if (checkValue(h) && checkValue(s) && checkValue(v)) {
    const hsv = { h, s, v, a } as ColorHSV;
    return hsv2rgb(clampHSV(hsv))
  }
  
  return null;
}