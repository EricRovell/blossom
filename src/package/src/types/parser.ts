import type { ColorRGB, ColorModel } from "./color";

export type InputObject = Record<string, unknown>
export type Input = InputObject | string;
export type ParseColor<T extends Input> = (input: T) => ColorRGB | null;

export interface Parser<T extends Input> {
  model: ColorModel;
  parser: ParseColor<T>;
}

export interface Parsers {
  string: Parser<string>[];
  object: Parser<InputObject>[];
}

export interface ParseResult {
  color: ColorRGB;
  model: ColorModel;
}
