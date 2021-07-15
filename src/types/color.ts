export type ColorModel = 
  | "rgb"
  | "hex"
  | "hsl"
  | "hsv"
  | "cmyk";

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export type ColorHEX = string;

export interface ColorHSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface ColorHSV {
  h: number;
  s: number;
  v: number;
  a?: number;
}

export interface ColorHSB {
  h: number;
  s: number;
  b: number;
  a?: number;
}

export interface ColorCMYK {
  c: number;
  m: number;
  y: number;
  k: number;
  a?: number;
}

export type ColorObject =
  | ColorRGB
  | ColorHSV
  | ColorHSB
  | ColorCMYK;
  
export type Color =
  | string
  | ColorObject;