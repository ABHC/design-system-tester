import type { AccentTheme, ToneTheme } from "$lib/types/palettes";

export type ColorblindType = 'protan' | 'deutan' | 'tritan';

// Viénot, Brettel & Mollon (1999) dichromacy simulation matrices (linear RGB)
const matrices: Record<ColorblindType, number[]> = {
    protan:  [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
    deutan:  [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881],
    tritan:  [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.303900],
};

function srgbToLinear(c: number): number {
    const n = c / 255;
    return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
    const clamped = Math.max(0, Math.min(1, c));
    const encoded = clamped <= 0.0031308
        ? clamped * 12.92
        : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    return Math.round(encoded * 255);
}

function hexToRgb(hex: string): [number, number, number] | null {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return null;
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

export function simulateColorblind(hex: string, type: ColorblindType): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    const [r, g, b] = rgb.map(srgbToLinear);
    const m = matrices[type];

    const sr = m[0] * r + m[1] * g + m[2] * b;
    const sg = m[3] * r + m[4] * g + m[5] * b;
    const sb = m[6] * r + m[7] * g + m[8] * b;

    return rgbToHex(linearToSrgb(sr), linearToSrgb(sg), linearToSrgb(sb));
}

export function simulatePalette(palette: ToneTheme, accent: AccentTheme, type: ColorblindType) {
    return {
        palette: {
            bg: simulateColorblind(palette.bg, type),
            card: simulateColorblind(palette.card, type),
            highlight: simulateColorblind(palette.highlight, type),
            text: simulateColorblind(palette.text, type),
        },
        accent: {
            accent: simulateColorblind(accent.accent, type),
            accent_light: simulateColorblind(accent.accent_light, type),
            accent_dark: simulateColorblind(accent.accent_dark, type),
            text_accent: simulateColorblind(accent.text_accent, type),
        },
    };
}
