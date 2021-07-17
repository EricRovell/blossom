import { ColorRGB } from "@types";

/**
 * Inverts a color defined in RGB color space.
 */
export function invert({ r, g, b, a }: ColorRGB): ColorRGB {
  return {
    r: 255 - r,
    g: 255 - g,
    b: 255 - b,
    a
  };
}