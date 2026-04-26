/**
 * App-wide layout constants. Single source of truth for values that
 * also appear in Tailwind arbitrary classes (e.g. `max-w-[640px]`).
 *
 * Tailwind class strings cannot interpolate runtime values without
 * losing JIT compilation, so the literal `640px` remains in those
 * class strings — but any runtime/JS consumer (inline styles, math,
 * portal sizing) MUST import APP_MAX_WIDTH_PX from this module.
 */
export const APP_MAX_WIDTH_PX = 640;
