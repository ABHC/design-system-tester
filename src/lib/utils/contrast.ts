export type WcagSize = 'normal' | 'large';

export interface WcagResult {
    level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
    pass: boolean;
    colour: string;
}

/**
 * Convert a single 0-255 channel to linear light.
 */
export function toLinear(c: number): number {
    const normalized = c / 255;
    return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

/**
 * Compute WCAG 2.1 relative luminance from a hex colour.
 */
export function getLuminance(hex: string): number | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    const r = toLinear(parseInt(result[1], 16));
    const g = toLinear(parseInt(result[2], 16));
    const b = toLinear(parseInt(result[3], 16));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Compute WCAG 2.1 contrast ratio between two hex colours.
 * Returns a string like "4.54" matching Chrome DevTools output.
 */
export function getContrastRatio(hex1: string, hex2: string): string {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    if (l1 === null || l2 === null) return '—';
    const lighter = Math.max(l1, l2);
    const darker  = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

/**
 * Evaluate WCAG level for a given ratio and text size.
 * size: 'normal' | 'large'  (large = ≥18pt or bold ≥14pt)
 */
export function getWcagLevel(ratio: string, size: WcagSize = 'normal'): WcagResult {
    const r = parseFloat(ratio);
    if (size === 'normal') {
        if (r >= 7)   return { level: 'AAA',      pass: true,  colour: '#10b981' };
        if (r >= 4.5) return { level: 'AA',       pass: true,  colour: '#3d8a45' };
        if (r >= 3)   return { level: 'AA Large', pass: true,  colour: '#f59e0b' };
                      return { level: 'Fail',     pass: false, colour: '#ef4444' };
    } else {
        if (r >= 4.5) return { level: 'AAA',      pass: true,  colour: '#10b981' };
        if (r >= 3)   return { level: 'AA',       pass: true,  colour: '#3d8a45' };
                      return { level: 'Fail',     pass: false, colour: '#ef4444' };
    }
}
