import { hsv2rgb } from "./transform";
import { clampHSV } from "./util";
import { checkValue } from "@util/helpers";
import { ColorRGB, InputObject } from "@types";

/**
 * Parses the HSV color object into RGB.
 */
export function parseHSVColor({ h, s, v, a = 1 }: InputObject): ColorRGB | null {
  if (checkValue(h) && checkValue(s) && checkValue(v)) {
    const hsv = clampHSV({
      h: Number(h),
      s: Number(s),
      v: Number(v),
      a: Number(a)
    });

    return hsv2rgb(hsv);
  }
  
  return null;
}