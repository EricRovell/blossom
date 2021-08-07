import type { Plugin } from "../types";

export type Harmony =
  | "analogous"
  | "complimentary"
  | "double-split-complementary"
  | "rectangle"
  | "tetradic"
  | "triadic"  
  | "split-complimentary";

declare module "../blossom" {
  interface Blossom {
    /**
     * Returns an array of harmony colors as `blossom` instances.
     */
    harmonies(type: Harmony): Blossom[];
  }
}

export const pluginHarmonies: Plugin = (BaseClass): void =>  {
	/**
   * All harmony colors are just hue-shifted colors of particular angles.
   */
	const hueShifts: Record<Harmony, number[]> = {
		analogous: [ -30, 0, 30 ],
		complimentary: [ 0, 180 ],
		"double-split-complementary": [ -30, 0, 30, 150, 210 ],
		rectangle: [ 0, 60, 180, 240 ],
		tetradic: [ 0, 90, 180, 270 ],
		triadic: [ 0, 120, 240 ],
		"split-complimentary": [ 0, 150, 210 ]
	};

	BaseClass.prototype.harmonies = function(type = "complimentary") {
		return hueShifts[type].map(shift => this.rotate(shift));
	};
};