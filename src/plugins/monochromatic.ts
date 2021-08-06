import { clamp, round } from "@util/helpers";
import type { Plugin } from "../types";

declare module "../blossom" {
  interface Blossom {
    /**
     * Returns an array of tint colors as `blossom` instances.
     */
    tints(steps?: number): Blossom[];
    
    /**
     * Returns an array of shade colors as `blossom` instances.
     */
    shades(steps?: number): Blossom[];

    /**
     * Returns an array of tone colors as `blossom` instances.
     */
    tones(steps?: number): Blossom[];
  }
}

/**
 * Provides functionatity to generate [monochromatic colors](https://en.wikipedia.org/wiki/Monochromatic_color) as:
 * 
 * - Tints;
 * - Shades;
 * - Tones.
 */
export const pluginMonochromatic: Plugin = (BaseClass): void => {
	/**
   * Generates an array of increments (decrements)
   */
	function getIncrements(from: number, to: number, steps = 5): number[] {
		const delta = round(Math.abs(from - to));

		/**
     * Cannot generate pallete from pure colors and too close to them.
     */
		if (delta < 1) {
			return [];
		}

		/**
     * We consider an increments only as per 1% of lightness or saturation.
     * User may specify too big palette for a color too close to pure.
     * That's why the steps should be clamped.
     */
		const stepsClamped = clamp(steps, 1, delta);
		const step = round(clamp(delta / stepsClamped, 1, delta) / 100, 2);
		const shifts = [];
		for (let i = 0; i <= stepsClamped; i++) {
			shifts.push(step * i);
		}

		return shifts.map(val => round(val, 2));
	}

	BaseClass.prototype.tints = function(steps = 5) {
		return getIncrements(this.lightness, 100, steps).map(shift => this.lighten(shift));
	};
  
	BaseClass.prototype.shades = function(steps = 5) {
		return getIncrements(this.lightness, 0, steps).map(shift => this.darken(shift));
	};

	BaseClass.prototype.tones = function(steps = 5) {
		return getIncrements(this.saturation, 0, steps).map(shift => this.desaturate(shift));
	};
};