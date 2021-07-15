import { ANGLE_UNITS } from "./constants";

/**
 * Round the number up to the desired precision.
 */
export function round(number: number, digits: number = 0) {
  const multiplicator = Math.pow(10, digits);
  return Math.round(number * multiplicator) / multiplicator;
}

/**
 * Clamps the number between two values.
 */
export function clamp(number: number, min = 0, max = 1): number {
  return Math.min(Math.max(Number(number), min), max)
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
};

/**
 * Converts a Hue value to degrees.
 */
export function parseHue(value: string, unit = "deg"): number {
  return Number(value) * (ANGLE_UNITS[unit] ?? 1);
}