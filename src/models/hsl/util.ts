import { rgb2hsl } from "../rgb";
import { clamp, clampDegrees, round } from "@util/helpers";
import type { ColorHSL, ColorRGB } from "@types";

/**
 * Clamps the HSL color object values.
 */
export function clampHSL({ h, s, l, a = 1 }: ColorHSL): ColorHSL {
  return {
    h: clampDegrees(h),
    s: clamp(s, 0, 100),
    l: clamp(l, 0, 100),
    a: clamp(a)
  };
}

/**
 * Rounds the HSL color object values.
 */
export function roundHSL({ h, s, l, a = 1 }: ColorHSL): ColorHSL {
  return {
    h: round(h),
    s: round(s),
    l: round(l),
    a: round(a, 2)
  };
}

/**
 * Transforms the RGB color object to HSL color string.
 * Functional whitespace syntax is used.
 */
export function rgb2hslString(rgb: ColorRGB): string {
  const { h, s, l, a = 1 } = roundHSL(rgb2hsl(rgb));
  return a < 1
    ? `hsl(${h}deg ${s}% ${l}% / ${a})`
    : `hsl(${h}deg ${s}% ${l}%)`;
}