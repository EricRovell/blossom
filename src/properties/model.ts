import { parse } from "../parse";
import type { Input, ColorModel } from "../types";

export function getModel(input: Input): ColorModel | null {
	const parsed = parse(input);
	return parsed
		? parsed.model
		: null;
}