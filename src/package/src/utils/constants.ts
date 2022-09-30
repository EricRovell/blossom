/**
 * Angle Units convertion object.
 */
export const ANGLE_UNITS: Record<string, number> = {
	grad: 360 / 400,
	turn: 360,
	rad: 360 / (Math.PI * 2)
};

/**
 * Multiplier that converts radians to degrees.
 */
export const rad2deg = 180 / Math.PI;

/**
 * Multiplier that converts degrees to radians.
 */
export const deg2rad = Math.PI / 180;
