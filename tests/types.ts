import type {
  ColorCMYK,
  ColorHEX,
  ColorHSL,
  ColorHSV,
  ColorRGB,
  Input
} from "@types";

export interface TestColor {
  [key: string]: Input;
}

export interface ColorSuite {
  rgb: ColorRGB,
  hex: ColorHEX,
  hsl: ColorHSL,
  hsv: ColorHSV,
  cmyk: ColorCMYK
}