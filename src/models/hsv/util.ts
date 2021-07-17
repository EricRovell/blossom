import { clamp, clampDegrees, round } from "@util/helpers";
import type { ColorHSV } from "@types";

/**
 * Clamps the HSV color object values.
 */
export function clampHSV({ h, s, v, a = 1 }: ColorHSV): ColorHSV {
  return {
    h: clampDegrees(h),
    s: clamp(s, 0, 100),
    v: clamp(v, 0, 100),
    a: clamp(a)
  }
};

/**
 * Rounds the HSV color object values.
 */
export function roundHSV({ h, s, v, a = 1 }: ColorHSV): ColorHSV {
  return {
    h: round(h),
    s: round(s),
    v: round(v),
    a: round(a)
  };
}