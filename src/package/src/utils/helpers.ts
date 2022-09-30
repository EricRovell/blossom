import { ANGLE_UNITS } from "./constants";

/**
 * Round the number up to the desired precision.
 */
export function round(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.round(number * base) / base + 0;
}

/**
 * Round the number up to the desired precision.
 */
export function floor(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.floor(number * base) / base + 0;
}

/**
 * Clamps a value between an upper and lower bound.
 * NaN is clamped to the lower bound
 */
export function clamp(number: number, min = 0, max = 1): number {
	return number > max
		? max
		: number > min
			? number
			: min;
}

/**
 * Clamps the degrees with desired period.
 */
export function clampDegrees(degrees: number, period = 360): number {
	const value = isFinite(degrees)
		? degrees % period
		: 0;
    
	return value >= 0
		? value
		: value + period;
}

/**
 * Checks the existence of primitive values: string | number. 
 */
export function checkValue(value: unknown): boolean {
	if (typeof value === "string") return value.length > 0;
	if (typeof value === "number") return true;
	return false;
}

/**
 * Converts a Hue value to degrees.
 */
export function parseHue(value: string, unit = "deg"): number {
	return Number(value) * (ANGLE_UNITS[unit] ?? 1);
}

/**
 * Transform decimal number in range [0, 255] to hexadecimal string.
 */
export function toHexString(number: number): string {
	const decimal = clamp(number, 0, 255);
	const hex = decimal.toString(16).toUpperCase();
	return hex.length < 2
		? `0${hex}`
		: hex;
}
