import { Blossom } from "./blossom";

/**
 * Creates an instance with random color.
 */
export function random(): Blossom {
	return new Blossom({
		r: Math.random() * 255,
		g: Math.random() * 255,
		b: Math.random() * 255
	});
}