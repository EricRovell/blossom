import { clamp, round } from "@util/helpers";
import type { Plugin } from "@types";

declare module "blossom" {
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

export const pluginMonochromatic: Plugin = (BaseClass): void => {
  /**
   * Generates an array of increments (decrements)
   */
  function getIncrements(from: number, to: number, steps: number = 3): number[] {
    /**
     * Handle cases:
     *  1. Pure colors (pure white etc.);
     *  2. Too little step, less than 1% has no sense;
     *  3. Too litle variations.
     */
    if (Math.abs(from - to) < 1 || steps < 3) {
      return [];
    }

    /**
     * As this function used to alter lightness and saturation increments,
     * we will clamp the step at value = 1, as it depicts 1%.
     */
    const delta = Math.abs(from - to);
    const step = round(clamp(delta / steps, 1, delta) / 100, 2);
    const shifts = [];
    for (let i = 0; i <= steps; i++) {
      shifts.push(step * i);
    }
    return shifts.map(val => round(val, 2));
  }

  BaseClass.prototype.tints = function(steps = 5) {
    return getIncrements(this.lightness, 100, steps).map(shift => this.lighten(shift));
  }
  
  BaseClass.prototype.shades = function(steps = 5) {
    return getIncrements(this.lightness, 0, steps).map(shift => this.darken(shift));
  }

  BaseClass.prototype.tones = function(steps = 5) {
    return getIncrements(this.saturation, 0, steps).map(shift => this.desaturate(shift));
  }
}