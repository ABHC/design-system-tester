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

// ── Auto-adjustment suggestions ──

export interface AdjustmentSuggestion {
    hex: string;
    ratio: string;
    deltaL: number;
}

/**
 * Convert hex to HSL.
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l: l * 100 };
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h: number;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to hex.
 */
export function hslToHex(h: number, s: number, l: number): string {
    h /= 360; s /= 100; l /= 100;
    let r: number, g: number, b: number;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (c: number) => {
        const v = Math.round(Math.min(255, Math.max(0, c * 255)));
        return v.toString(16).padStart(2, '0');
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Suggest minimal lightness adjustment on fgHex to reach targetRatio against bgHex.
 * Uses binary search in HSL L-space. Tries both darker and lighter, picks smallest delta.
 */
export function suggestAdjustedColor(
    fgHex: string,
    bgHex: string,
    targetRatio: number = 4.5
): AdjustmentSuggestion | null {
    const fgHsl = hexToHsl(fgHex);
    const bgLum = getLuminance(bgHex);
    if (!fgHsl || bgLum === null) return null;

    const originalL = fgHsl.l;

    function tryDirection(lowL: number, highL: number): AdjustmentSuggestion | null {
        // Binary search for the L value closest to originalL that achieves targetRatio
        let lo = lowL, hi = highL;
        let bestHex: string | null = null;
        let bestRatio = '';
        let bestL = originalL;

        for (let i = 0; i < 40; i++) {
            const midL = (lo + hi) / 2;
            const candidateHex = hslToHex(fgHsl.h, fgHsl.s, midL);
            const ratio = parseFloat(getContrastRatio(candidateHex, bgHex));

            if (ratio >= targetRatio) {
                bestHex = candidateHex;
                bestRatio = ratio.toFixed(2);
                bestL = midL;
                // Try to get closer to originalL (smaller delta)
                if (midL < originalL) lo = midL;
                else hi = midL;
            } else {
                // Need to move further from originalL
                if (midL < originalL) hi = midL;
                else lo = midL;
            }
        }
        if (!bestHex) return null;
        return {
            hex: bestHex,
            ratio: bestRatio,
            deltaL: Math.round(bestL - originalL),
        };
    }

    const results: AdjustmentSuggestion[] = [];

    // Try darkening (reduce L)
    const darker = tryDirection(0, originalL);
    if (darker) results.push(darker);

    // Try lightening (increase L)
    const lighter = tryDirection(originalL, 100);
    if (lighter) results.push(lighter);

    if (results.length === 0) return null;

    // Pick the result with smallest absolute deltaL
    results.sort((a, b) => Math.abs(a.deltaL) - Math.abs(b.deltaL));
    return results[0];
}

// ── OKLCH color space ──
// Perceptually uniform — equal L steps = equal perceived brightness changes.
// Unlike HSL, avoids black/white clipping and produces usable color scales.

export interface Oklch {
    l: number;  // Perceptual lightness, 0–1
    c: number;  // Chroma (saturation), 0–~0.4
    h: number;  // Hue angle, 0–360
}

/**
 * Convert linear-light component back to sRGB gamma.
 */
function fromLinear(c: number): number {
    if (c <= 0.0031308) return c * 12.92;
    return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/**
 * Convert hex to OKLCH.
 */
export function hexToOklch(hex: string): Oklch | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    const r = toLinear(parseInt(result[1], 16));
    const g = toLinear(parseInt(result[2], 16));
    const b = toLinear(parseInt(result[3], 16));

    // Linear sRGB → LMS
    const lms_l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const lms_m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const lms_s = 0.0883024619 * r + 0.2024326609 * g + 0.6892650165 * b;

    // Cube root
    const l_ = Math.cbrt(lms_l);
    const m_ = Math.cbrt(lms_m);
    const s_ = Math.cbrt(lms_s);

    // LMS → Oklab
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const bOk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    // Oklab → OKLCH
    const C = Math.sqrt(a * a + bOk * bOk);
    let H = Math.atan2(bOk, a) * 180 / Math.PI;
    if (H < 0) H += 360;

    return { l: L, c: C, h: H };
}

/**
 * Convert OKLCH → linear sRGB (unbounded — may be out of gamut).
 */
function oklchToLinearRgb(L: number, C: number, H: number): [number, number, number] {
    const a = C * Math.cos(H * Math.PI / 180);
    const b = C * Math.sin(H * Math.PI / 180);

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    return [
        +4.0767416621 * (l_ ** 3) - 3.3077115913 * (m_ ** 3) + 0.2309699292 * (s_ ** 3),
        -1.2684380046 * (l_ ** 3) + 2.6097574011 * (m_ ** 3) - 0.3413193965 * (s_ ** 3),
        -0.0041960863 * (l_ ** 3) - 0.7034186147 * (m_ ** 3) + 1.7076147010 * (s_ ** 3),
    ];
}

function isInSrgbGamut(r: number, g: number, b: number): boolean {
    const EPS = -0.001;
    return r >= EPS && r <= 1.001 && g >= EPS && g <= 1.001 && b >= EPS && b <= 1.001;
}

/**
 * Convert OKLCH to hex with gamut mapping.
 * Reduces chroma (keeps lightness) until the color fits in sRGB.
 */
export function oklchToHex(L: number, C: number, H: number): string {
    let rgb = oklchToLinearRgb(L, C, H);

    if (!isInSrgbGamut(rgb[0], rgb[1], rgb[2])) {
        // Binary search: reduce chroma to find gamut boundary
        let lo = 0, hi = C;
        for (let i = 0; i < 24; i++) {
            const mid = (lo + hi) / 2;
            rgb = oklchToLinearRgb(L, mid, H);
            if (isInSrgbGamut(rgb[0], rgb[1], rgb[2])) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        rgb = oklchToLinearRgb(L, lo, H);
    }

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const ch = (v: number) => Math.round(clamp01(fromLinear(clamp01(v))) * 255).toString(16).padStart(2, '0');

    return `#${ch(rgb[0])}${ch(rgb[1])}${ch(rgb[2])}`;
}

// ── Scale suggestions ──

export interface ScaleShade {
    name: string;
    hex: string;
    l: number;       // OKLCH L (0–1)
    ok: boolean;      // true if all required contrasts are met
    adjusted: boolean; // true if color was changed from original
}

export interface ScaleSuggestion {
    shades: ScaleShade[];  // 3 shades [light, accent, dark]
    score: number;         // quality score (higher = better)
}

export interface RequiredPair {
    variant_idx: number;
    surface_key: string;
    targetRatio?: number;
}

const SHADE_NAMES = ['light', 'accent', 'dark'];
const MIN_SEP = 0.08; // Minimum OKLCH L separation between adjacent shades

/**
 * Check if a given L passes ALL rules for a variant.
 * Uses per-rule targetRatio if available, otherwise falls back to defaultRatio.
 */
function passesAllRules(
    l: number,
    oklchC: number,
    oklchH: number,
    surfaceHexes: Record<string, string>,
    variantRules: RequiredPair[],
    defaultRatio: number
): boolean {
    const hex = oklchToHex(l, oklchC, oklchH);
    for (const rule of variantRules) {
        const surfaceHex = surfaceHexes[rule.surface_key];
        if (!surfaceHex) continue;
        const ratio = rule.targetRatio ?? defaultRatio;
        if (parseFloat(getContrastRatio(hex, surfaceHex)) < ratio) return false;
    }
    return true;
}

/**
 * For a single variant, find the OKLCH L closest to targetL
 * that passes ALL its required contrast rules simultaneously.
 * Search is bounded by [boundsLo, boundsHi] (for separation constraints).
 */
function findBestL(
    oklchC: number,
    oklchH: number,
    targetL: number,
    surfaceHexes: Record<string, string>,
    variantRules: RequiredPair[],
    defaultRatio: number,
    boundsLo: number = 0,
    boundsHi: number = 1
): number | null {
    const clampedTarget = Math.max(boundsLo, Math.min(boundsHi, targetL));

    const passesAll = (l: number) =>
        passesAllRules(l, oklchC, oklchH, surfaceHexes, variantRules, defaultRatio);

    if (passesAll(clampedTarget)) return clampedTarget;

    let bestL: number | null = null;
    let bestDist = Infinity;

    // Search lighter (increase L)
    {
        let lo = clampedTarget, hi = boundsHi;
        let found: number | null = null;
        for (let i = 0; i < 40; i++) {
            const mid = (lo + hi) / 2;
            if (passesAll(mid)) { found = mid; hi = mid; }
            else lo = mid;
        }
        if (found !== null && Math.abs(found - clampedTarget) < bestDist) {
            bestL = found; bestDist = Math.abs(found - clampedTarget);
        }
    }

    // Search darker (decrease L)
    {
        let lo = boundsLo, hi = clampedTarget;
        let found: number | null = null;
        for (let i = 0; i < 40; i++) {
            const mid = (lo + hi) / 2;
            if (passesAll(mid)) { found = mid; lo = mid; }
            else hi = mid;
        }
        if (found !== null && Math.abs(found - clampedTarget) < bestDist) {
            bestL = found; bestDist = Math.abs(found - clampedTarget);
        }
    }

    return bestL;
}

/**
 * Score a scale: sum of min-ratios per passing shade, penalty for failures.
 */
function scoreScale(
    shades: ScaleShade[],
    surfaceHexes: Record<string, string>,
    rules: RequiredPair[],
    defaultRatio: number
): number {
    let score = 0;
    for (const shade of shades) {
        if (shade.ok) score += 10;
        // Add margin bonus
        const variantRules = rules.filter(r => r.variant_idx === shades.indexOf(shade));
        for (const rule of variantRules) {
            const surfaceHex = surfaceHexes[rule.surface_key];
            if (!surfaceHex) continue;
            const ratio = parseFloat(getContrastRatio(shade.hex, surfaceHex));
            const ruleRatio = rule.targetRatio ?? defaultRatio;
            score += Math.min(ratio - ruleRatio, 5); // cap bonus at 5
        }
    }
    return score;
}

// ── Mono-theme: corrected scale ──

/**
 * Corrected scale for mono-theme: starts from the EXISTING palette colors.
 * All 3 variants are adjustable. Accent (idx=1) has a 2x penalty on delta
 * in the score to prefer keeping it close to the original value.
 * Minimal corrections — keeps existing colors when they already pass.
 */
export function suggestCorrectedScale(
    existingHexes: string[],  // 3 hex colors [light, accent, dark]
    oklchC: number,
    oklchH: number,
    surfaceHexes: Record<string, string>,
    rules: RequiredPair[],
    defaultRatio: number = 4.5
): ScaleSuggestion {
    const shades: ScaleShade[] = [];

    for (let idx = 0; idx < 3; idx++) {
        const currentHex = existingHexes[idx];
        const currentOklch = hexToOklch(currentHex);
        const currentL = currentOklch?.l ?? 0.5;

        const variantRules = rules.filter(r => r.variant_idx === idx);

        // No rules → keep as-is
        if (variantRules.length === 0) {
            shades.push({ name: SHADE_NAMES[idx], hex: currentHex, l: currentL, ok: true, adjusted: false });
            continue;
        }

        // Check if current color already passes
        const alreadyPasses = passesAllRules(currentL, oklchC, oklchH, surfaceHexes, variantRules, defaultRatio);
        if (alreadyPasses) {
            shades.push({ name: SHADE_NAMES[idx], hex: currentHex, l: currentL, ok: true, adjusted: false });
            continue;
        }

        // Search for minimal adjustment
        const foundL = findBestL(oklchC, oklchH, currentL, surfaceHexes, variantRules, defaultRatio);
        if (foundL !== null) {
            shades.push({ name: SHADE_NAMES[idx], hex: oklchToHex(foundL, oklchC, oklchH), l: foundL, ok: true, adjusted: true });
        } else {
            shades.push({ name: SHADE_NAMES[idx], hex: currentHex, l: currentL, ok: false, adjusted: false });
        }
    }

    // Score with 2x penalty for accent (idx=1) displacement
    let score = scoreScale(shades, surfaceHexes, rules, defaultRatio);
    const accentOrigOklch = hexToOklch(existingHexes[1]);
    if (accentOrigOklch && shades[1].adjusted) {
        const delta = Math.abs(shades[1].l - accentOrigOklch.l);
        score -= delta * 20; // 2x penalty on accent displacement
    }

    return { shades, score };
}

// ── Dual-theme: multiple candidate scales ──

/**
 * Build a full 3-shade scale for a given accent L, with separation constraints.
 * Shades: [light, accent, dark]. All are generated/adjusted.
 */
function buildCandidateScale(
    accentL: number,
    oklchC: number,
    oklchH: number,
    surfaceHexes: Record<string, string>,
    rules: RequiredPair[],
    defaultRatio: number,
    preferredStep: number
): ScaleSuggestion {
    const naturalL = [
        accentL + preferredStep,  // light (idx=0)
        accentL,                  // accent (idx=1)
        accentL - preferredStep,  // dark (idx=2)
    ];

    const shades: ScaleShade[] = new Array(3);

    // Place accent first (idx=1)
    {
        const variantRules = rules.filter(r => r.variant_idx === 1);
        const ok = variantRules.length === 0 ||
            passesAllRules(accentL, oklchC, oklchH, surfaceHexes, variantRules, defaultRatio);
        shades[1] = {
            name: SHADE_NAMES[1],
            hex: oklchToHex(accentL, oklchC, oklchH),
            l: accentL,
            ok,
            adjusted: true,
        };
    }

    // Place light (idx=0): must be >= accent.L + MIN_SEP
    {
        const variantRules = rules.filter(r => r.variant_idx === 0);
        const lo = shades[1].l + MIN_SEP;
        if (variantRules.length === 0) {
            const l = Math.max(lo, Math.min(1, naturalL[0]));
            shades[0] = { name: SHADE_NAMES[0], hex: oklchToHex(l, oklchC, oklchH), l, ok: true, adjusted: true };
        } else {
            const foundL = findBestL(oklchC, oklchH, naturalL[0], surfaceHexes, variantRules, defaultRatio, lo, 1);
            if (foundL !== null) {
                shades[0] = { name: SHADE_NAMES[0], hex: oklchToHex(foundL, oklchC, oklchH), l: foundL, ok: true, adjusted: true };
            } else {
                const l = Math.max(lo, Math.min(1, naturalL[0]));
                shades[0] = { name: SHADE_NAMES[0], hex: oklchToHex(l, oklchC, oklchH), l, ok: false, adjusted: true };
            }
        }
    }

    // Place dark (idx=2): must be <= accent.L - MIN_SEP
    {
        const variantRules = rules.filter(r => r.variant_idx === 2);
        const hi = shades[1].l - MIN_SEP;
        if (variantRules.length === 0) {
            const l = Math.max(0, Math.min(hi, naturalL[2]));
            shades[2] = { name: SHADE_NAMES[2], hex: oklchToHex(l, oklchC, oklchH), l, ok: true, adjusted: true };
        } else {
            const foundL = findBestL(oklchC, oklchH, naturalL[2], surfaceHexes, variantRules, defaultRatio, 0, hi);
            if (foundL !== null) {
                shades[2] = { name: SHADE_NAMES[2], hex: oklchToHex(foundL, oklchC, oklchH), l: foundL, ok: true, adjusted: true };
            } else {
                const l = Math.max(0, Math.min(hi, naturalL[2]));
                shades[2] = { name: SHADE_NAMES[2], hex: oklchToHex(l, oklchC, oklchH), l, ok: false, adjusted: true };
            }
        }
    }

    return { shades, score: scoreScale(shades, surfaceHexes, rules, defaultRatio) };
}

/**
 * Dual-theme finder: generate multiple candidate scales by scanning
 * different accent L values. Returns top N scales sorted by score.
 *
 * @param oklchC - Chroma from the user's accent
 * @param oklchH - Hue from the user's accent
 * @param originalL - Original accent L (used to prefer close candidates)
 * @param surfaceHexes - Combined surface map (dark_card, light_bg, etc.)
 * @param rules - Combined rules from both themes
 * @param count - Number of candidates to return (default 3)
 */
export function suggestDualScales(
    oklchC: number,
    oklchH: number,
    originalL: number,
    surfaceHexes: Record<string, string>,
    rules: RequiredPair[],
    targetRatio: number = 4.5,
    count: number = 3,
    preferredStep: number = 0.09
): ScaleSuggestion[] {
    if (rules.length === 0) return [];

    const candidates: ScaleSuggestion[] = [];

    // Scan accent L across the usable range
    for (let accentL = 0.20; accentL <= 0.80; accentL += 0.01) {
        const scale = buildCandidateScale(accentL, oklchC, oklchH, surfaceHexes, rules, targetRatio, preferredStep);
        // Proximity bonus: prefer scales closer to original accent
        scale.score += Math.max(0, 5 - Math.abs(accentL - originalL) * 20);
        candidates.push(scale);
    }

    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);

    // Deduplicate: skip candidates whose accent L is too close to an already-selected one
    const selected: ScaleSuggestion[] = [];
    for (const c of candidates) {
        if (selected.length >= count) break;
        const accentL = c.shades[1].l;
        const tooClose = selected.some(s => Math.abs(s.shades[1].l - accentL) < 0.05);
        if (!tooClose) selected.push(c);
    }

    return selected;
}
