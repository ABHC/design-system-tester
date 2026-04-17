// ─── Colour helpers ──────────────────────────────────────────────────────────

import {
    hexToOklch,
    oklchToHex,
    getContrastRatio,
} from '$lib/utils/contrast';

function hexToRgbParts(hex: string): [number, number, number] | null {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return null;
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function hexToRgba(hex: string, alpha: number): string {
    const rgb = hexToRgbParts(hex);
    if (!rgb) return 'rgba(0, 0, 0, 0)';
    const a = Math.min(1, Math.max(0, alpha));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ToneTokens {
    bg: string;
    card: string;
}

export interface SemanticTokens {
    accent: string;
    error: string;
    warning: string;
    success: string;
    info: string;
    neutral: string;
}

export interface TypographyTokens {
    body: string;
    heading: string;
}

export interface TextTokens {
    light: string;
    dark: string;
}

export interface TokenConfig {
    mode: 'light' | 'dark';
    tone: ToneTokens;
    semantic: SemanticTokens;
    text_palette: TextTokens;
    typography: TypographyTokens;
    shadow_opacity?: number;
}

export interface DualTokenConfig {
    light: TokenConfig;
    dark: TokenConfig;
}

export type GenerateMode = 'single' | 'dual' | 'media';

// ─── OKLCH derivation ────────────────────────────────────────────────────────

export const HOVER_DELTA = 0.07;
export const GHOST_HOVER_ALPHA = 0.15;
export const BG_CHROMA_FACTOR = 0.30;
export const BG_L_OFFSET = 0.15;

function bestTextColor(bgHex: string, lightText: string, darkText: string): string {
    const rL = parseFloat(getContrastRatio(lightText, bgHex));
    const rD = parseFloat(getContrastRatio(darkText, bgHex));
    return rL >= rD ? lightText : darkText;
}

function shiftLightness(hex: string, delta: number): string {
    const oklch = hexToOklch(hex);
    if (!oklch) return hex;
    return oklchToHex(
        Math.max(0, Math.min(1, oklch.l + delta)),
        oklch.c,
        oklch.h,
    );
}

/**
 * Compute a muted variant: readable as text on surfaceHex.
 * Targets 4.5:1 contrast (AA minimum) to keep muted visually distinct from base text.
 * Reduces chroma to 80% for a softer, more "muted" appearance.
 */

const TEXT_MUTED_TARGET_RATIO = 5.5;
const MUTED_TARGET_RATIO = 5.5;
const MUTED_CHROMA_FACTOR = 0.8;

export function computeMuted(hex: string, surfaceHex: string): string {
    const oklch = hexToOklch(hex);
    if (!oklch) return hex;

    const mutedC = oklch.c * MUTED_CHROMA_FACTOR;
    const mutedHex = oklchToHex(oklch.l, mutedC, oklch.h);

    if (parseFloat(getContrastRatio(mutedHex, surfaceHex)) >= MUTED_TARGET_RATIO) return mutedHex;

    const surfaceOklch = hexToOklch(surfaceHex);
    const goLighter = (surfaceOklch?.l ?? 0.5) < 0.5;

    let lo = goLighter ? oklch.l : 0;
    let hi = goLighter ? 1 : oklch.l;
    let best = mutedHex;

    for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        const candidate = oklchToHex(mid, mutedC, oklch.h);
        if (parseFloat(getContrastRatio(candidate, surfaceHex)) >= MUTED_TARGET_RATIO) {
            best = candidate;
            if (goLighter) hi = mid; else lo = mid;
        } else {
            if (goLighter) lo = mid; else hi = mid;
        }
    }
    return best;
}

function computeBg(hex: string, bgHex: string, isDark: boolean): string {
    const oklch = hexToOklch(hex);
    if (!oklch) return bgHex;
    const bgOklch = hexToOklch(bgHex);
    if (!bgOklch) return bgHex;

    const targetL = isDark
        ? bgOklch.l + BG_L_OFFSET
        : bgOklch.l - BG_L_OFFSET;

    return oklchToHex(
        Math.max(0, Math.min(1, targetL)),
        oklch.c * BG_CHROMA_FACTOR,
        oklch.h,
    );
}

export function deriveSemanticTokens(
    name: string,
    hex: string,
    isDark: boolean,
    cardHex: string,
    bgHex: string,
    textPalette: TextTokens,
): Record<string, string> {
    const delta = isDark ? HOVER_DELTA : -HOVER_DELTA;
    return {
        [`--${name}`]: hex,
        [`--${name}-hover`]: shiftLightness(hex, delta),
        [`--${name}-bg`]: computeBg(hex, bgHex, isDark),
        [`--${name}-ghost-hover`]: hexToRgba(hex, 0.10),
        [`--text-${name}`]: bestTextColor(hex, textPalette.light, textPalette.dark),
        [`--${name}-muted`]: computeMuted(hex, cardHex),
    };
}

function computeTextMuted(textHex: string, surfaceHex: string): string {
    const oklch = hexToOklch(textHex);
    if (!oklch) return textHex;

    const surfaceOklch = hexToOklch(surfaceHex);
    if (!surfaceOklch) return textHex;

    // Search from surface toward text to find the closest-to-surface gray at 4.5:1
    const isDarkSurface = surfaceOklch.l < 0.5;
    let lo = isDarkSurface ? surfaceOklch.l : oklch.l;
    let hi = isDarkSurface ? oklch.l : surfaceOklch.l;
    let best = textHex;

    for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        const candidate = oklchToHex(mid, 0, oklch.h);
        if (parseFloat(getContrastRatio(candidate, surfaceHex)) >= TEXT_MUTED_TARGET_RATIO) {
            best = candidate;
            // Move toward surface (reduce contrast)
            if (isDarkSurface) hi = mid; else lo = mid;
        } else {
            // Move toward text (increase contrast)
            if (isDarkSurface) lo = mid; else hi = mid;
        }
    }
    return best;
}

// ─── Token computation ───────────────────────────────────────────────────────

export function tokenValues(config: TokenConfig): Record<string, string> {
    const { mode, tone, semantic, typography, text_palette, shadow_opacity = 0.3 } = config;
    const isDark = mode === 'dark';
    const hoverDelta = isDark ? HOVER_DELTA : -HOVER_DELTA;

    const text = isDark ? text_palette.light : text_palette.dark;
    const text_muted = computeTextMuted(text, tone.card);
    const shadow_hard = shiftLightness(tone.bg, isDark ? -0.08 : -0.25);

    const tokens: Record<string, string> = {
        // Tone surface
        '--tone-bg': tone.bg,
        '--tone': tone.card,
        '--tone-hover': shiftLightness(tone.card, hoverDelta),
        '--tone-muted': computeMuted(tone.card, tone.card),
        '--tone-ghost': hexToRgba(text, 0.08),
        '--tone-ghost-hover': hexToRgba(text, 0.15),

        // Global
        '--text': text,
        '--text-light': text_palette.light,
        '--text-dark': text_palette.dark,
        '--text-muted': text_muted,

        // Typography
        '--font-body': typography.body,
        '--font-heading': typography.heading,

        // Shadows
        '--shadow-hard' : shadow_hard,
        '--shadow-subtle': 'rgba(0, 0, 0, 0.2)',
        '--muted-shadow': hexToRgba(text_muted, shadow_opacity),
    };

    const names = ['accent', 'error', 'warning', 'success', 'info', 'neutral'] as const;
    for (const name of names) {
        Object.assign(
            tokens, 
            deriveSemanticTokens(
                name, 
                semantic[name], 
                isDark, 
                tone.card, 
                tone.bg, 
                text_palette
            ));
    }

    return tokens;
}
