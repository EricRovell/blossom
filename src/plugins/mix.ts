import { mix } from "@manipulation";
import type { Input, Plugin } from "../types";

declare module "../blossom" {
	interface Blossom {
		/**
		 * Produces a mixture of two colors using CIE LAB color space.
		 */
		mix(color: Input | Blossom, ratio?: number): Blossom;
	}
}

/**
 * Adds support for color mixing.
 */
export const pluginMix: Plugin = (BaseClass): void => {
	BaseClass.prototype.mix = function(color2, ratio = 0.5) {
		const instance = color2 instanceof BaseClass
			? color2
			: new BaseClass(color2);

		const mixture = mix(this.color, instance.rgb, ratio);
		return new BaseClass(mixture);
	};
};