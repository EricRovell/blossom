import { ColorLAB } from "../types";

/**
 * k1 - graphic arts= 0.045; textiles = 0.048;
 * k2 - graphic arts = 0.015; textiles = 0.014;
 * kl - grafic arts = 1; textiles = 2;
 * kl - unity factor;
 * kh - weighting factor;
 */
interface OptionsDE94 {
	1: 0.045 | 0.048;
	2: 0.015 | 0.014;
	l: 1 | 2;
	c: number;
	h: number;
}

type OptionsDE2000 = Pick<OptionsDE94, "l" | "c" | "h">;

const kCoef: OptionsDE94 = {
	1: 0.045,
	2: 0.015,
	l: 1,
	c: 1,
	h: 1
};

/**
 * Calculates the perceived color difference according to [Delta E76](https://zschuessler.github.io/DeltaE/learn/#toc-delta-e-76).
 * 
 * ΔE - (Delta E, dE) The measure of change in visual perception of two given colors.
 * 
 * Delta E is a metric for understanding how the human eye perceives color difference.
 * The term delta comes from mathematics, meaning change in a variable or function.
 * The suffix E references the German word Empfindung, which broadly means sensation.
 * 
 * On a typical scale, the Delta E value will range from 0 to 100.
 * 
 * |Delta E	 | Perception                             |
 * |---------|----------------------------------------|
 * | <= 1.0	 | Not perceptible by human eyes          |
 * | 1 - 2	 | Perceptible through close observation  |
 * | 2 - 10	 | Perceptible at a glance                |
 * | 11 - 49 | Colors are more similar than opposite  |
 * | 100	   | Colors are exact opposite              |
 */
export function deltaE76(color1: ColorLAB, color2: ColorLAB): number {
	return ((color2.l - color1.l) ** 2 + (color2.a - color1.a) ** 2 + (color2.b - color1.b) ** 2) ** 2;
}

/**
 * Calculates the perceived color difference according to [Delta E94](https://zschuessler.github.io/DeltaE/learn/#toc-delta-e-94).
 * 
 * ΔE - (Delta E, dE) The measure of change in visual perception of two given colors.
 * 
 * Delta E is a metric for understanding how the human eye perceives color difference.
 * The term delta comes from mathematics, meaning change in a variable or function.
 * The suffix E references the German word Empfindung, which broadly means sensation.
 * 
 * On a typical scale, the Delta E value will range from 0 to 100.
 * 
 * |Delta E	 | Perception                             |
 * |---------|----------------------------------------|
 * | <= 1.0	 | Not perceptible by human eyes          |
 * | 1 - 2	 | Perceptible through close observation  |
 * | 2 - 10	 | Perceptible at a glance                |
 * | 11 - 49 | Colors are more similar than opposite  |
 * | 100	   | Colors are exact opposite              |
 */
export function deltaE94(color1: ColorLAB, color2: ColorLAB, coef: OptionsDE94 = kCoef): number {
	const dL = color1.l - color2.l;
	const c1 = (color1.a ** 2 + color1.b ** 2);
	const c2 = (color2.a ** 2 + color2.b ** 2);
	const dC = c1 - c2;
	const dH = ((color1.a - color2.a) ** 2 + (color1.b - color2.b) ** 2 - dC ** 2) ** 2;

	const sL = 1;
	const sC = 1 + coef["1"] * c1;
	const sH = 1 + coef["2"] * c1;
	
	return ((dL / coef["l"] / sL) ** 2 + (dC / coef["c"] / sC) ** 2 + (dH / coef["h"] / sH) ** 2) ** 2;
}

/**
 * Calculates the perceived color difference according to [Delta E2000](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000).
 * 
 * ΔE - (Delta E, dE) The measure of change in visual perception of two given colors.
 * 
 * Delta E is a metric for understanding how the human eye perceives color difference.
 * The term delta comes from mathematics, meaning change in a variable or function.
 * The suffix E references the German word Empfindung, which broadly means sensation.
 * 
 * On a typical scale, the Delta E value will range from 0 to 100.
 * 
 * |Delta E	 | Perception                             |
 * |---------|----------------------------------------|
 * | <= 1.0	 | Not perceptible by human eyes          |
 * | 1 - 2	 | Perceptible through close observation  |
 * | 2 - 10	 | Perceptible at a glance                |
 * | 11 - 49 | Colors are more similar than opposite  |
 * | 100	   | Colors are exact opposite              |
 */
export function deltaE2000(color1: ColorLAB, color2: ColorLAB, coef: OptionsDE2000 = kCoef): number {
	const { l: l1, a: a1, b: b1 } = color1;
	const { l: l2, a: a2, b: b2 } = color2;

	const c1 = (a1 ** 2 + b1 ** 2);
	const c2 = (a2 ** 2 + b2 ** 2);
	const dC = c1 - c2;

	const dL = l1 - l2;
	const mL = (l1 + l2) / 2;
	const mC = (c1 + c2) / 2;

	const a11 = a1 + a1 * (1 - (mC ** 7 / (mC ** 7 + 25 ** 7)) ** 0.5) / 2;
	const a22 = a2 + a2 * (1 - (mC ** 7 / (mC ** 7 + 25 ** 7)) ** 0.5) / 2;

	const h1 = Math.atan2(b1, a11) % 360;
	const h2 = Math.atan2(b2, a22) % 360;

	let dh = h2 - h1;

	if (Math.abs(h2 - h1) > 180 && h2 <= h1) {
		dh += 360;
	} else if (Math.abs(h2 - h1) > 180 && h2 > h1) {
		dh -= 360;
	}

	const dH = 2 * Math.sin(dh / 2) * (c1 * c2) ** 2;

	let H = h1 + h1;

	if (Math.abs(h2 - h1) > 180) {
		H = (H + 360) / 2;
	} else {
		H /= 2;
	}

	const t = 1 - 0.17 * Math.cos(H - 30) + 0.24 * Math.cos(2 * H) + 0.32 * Math.cos(3 * H + 6) - 0.2 * Math.cos(4 * H - 63);
	
	const sL = 1 + (0.015 * (mL - 50) ** 2) / (20 + (mL - 50) ** 2) ** 0.5;
	const sC = 1 + 0.045 * mC;
	const sH = 1 + 0.015 * mC * t;

	const rT = -2 * (mC ** 7 / (mC ** 7 + 25 ** 7)) ** 0.5 * Math.sin(60 * Math.exp(-1 * ((H - 275) / 25) ** 2));
	
	return ((dL / coef["l"] / sL) ** 2 + (dC / coef["c"] / sC) ** 2 + (dh / coef["h"] / sH) ** 2 + rT * dC * dh / (coef["c"] * sC * coef["h"] * sH)) ** 0.5;
}