// ─── Minimal colour helpers (no external deps for portability) ────────────────

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

export interface PaletteTokens {
    bg:         string;
    card:       string;
    highlight:  string;
    text:       string;
    text_muted: string;
}

export interface AccentTokens {
    accent_lighter: string;
    accent_light:   string;
    accent_dark:    string;
    accent_darker:  string;
    text_accent:    string;
}

export interface ContextualTokens {
    error:   string;
    warning: string;
    success: string;
    info:    string;
}

export interface TypographyTokens {
    body:    string;   // full CSS font-family value, e.g. "'Inter', sans-serif"
    heading: string;
}

export interface TokenConfig {
    palette:         PaletteTokens;
    accent:          AccentTokens;
    tone:            'light' | 'dark';
    typography:      TypographyTokens;
    contextual:      ContextualTokens;
    ctx_opacity?:    number;  // default: 0.4
    shadow_opacity?: number;  // default: 0.3
    ctx_surface?:    string;  // CSS var name of the badge blend surface, default: 'highlight'
}

export interface DualTokenConfig {
    light: TokenConfig;
    dark:  TokenConfig;
}

export type GenerateMode = 'single' | 'dual' | 'media';

// ─── Token computation ────────────────────────────────────────────────────────

/**
 * Compute the complete set of CSS custom property values from a TokenConfig.
 * Returns a Record suitable for style attribute assignment or CSS generation.
 */
export function tokenValues(config: TokenConfig): Record<string, string> {
    const {
        palette,
        accent,
        tone,
        typography,
        contextual,
        ctx_opacity    = 0.4,
        shadow_opacity = 0.3,
        ctx_surface    = 'highlight',
    } = config;

    const is_dark = tone === 'dark';

    function ctxBlend(hex: string): string {
        const rgba = hexToRgba(hex, ctx_opacity);
        return `linear-gradient(${rgba}, ${rgba}), var(--${ctx_surface})`;
    }

    return {
        // ── Palette ──────────────────────────────────────────────────────────
        '--bg':         palette.bg,
        '--card':       palette.card,
        '--highlight':  palette.highlight,
        '--text':       palette.text,
        '--text-muted': palette.text_muted,

        // ── Accent scale ─────────────────────────────────────────────────────
        '--accent-lighter': accent.accent_lighter,
        '--accent-light':   accent.accent_light,
        '--accent':         is_dark ? accent.accent_light   : accent.accent_dark,
        '--accent-more':    is_dark ? accent.accent_lighter : accent.accent_darker,
        '--accent-invert':  is_dark ? accent.accent_dark    : accent.accent_light,
        '--accent-dark':    accent.accent_dark,
        '--accent-darker':  accent.accent_darker,
        '--text-accent':    accent.text_accent,

        // ── Typography ───────────────────────────────────────────────────────
        '--font-body':    typography.body,
        '--font-heading': typography.heading,

        // ── Contextual — solid ───────────────────────────────────────────────
        '--ctx-error':   contextual.error,
        '--ctx-warning': contextual.warning,
        '--ctx-success': contextual.success,
        '--ctx-info':    contextual.info,

        // ── Contextual — blended badge backgrounds ───────────────────────────
        '--ctx-error-blend':   ctxBlend(contextual.error),
        '--ctx-warning-blend': ctxBlend(contextual.warning),
        '--ctx-success-blend': ctxBlend(contextual.success),
        '--ctx-info-blend':    ctxBlend(contextual.info),

        // ── Shadows ──────────────────────────────────────────────────────────
        '--tone-shadow':   hexToRgba(palette.text, shadow_opacity),
        '--muted-shadow':   hexToRgba(palette.text_muted, shadow_opacity),
        '--accent-shadow': hexToRgba(
            is_dark ? accent.accent_light : accent.accent_dark,
            shadow_opacity
        ),
    };
}

// ─── CSS generation ───────────────────────────────────────────────────────────

function renderBlock(selector: string, vars: Record<string, string>): string {
    const lines = Object.entries(vars)
        .map(([k, v]) => `    ${k}: ${v};`)
        .join('\n');
    return `${selector} {\n${lines}\n}`;
}

/**
 * Generate a ready-to-use CSS string from a token configuration.
 *
 * mode 'single' (default) → :root { ... }
 * mode 'dual'             → [data-theme="light"] { } + [data-theme="dark"] { }
 * mode 'media'            → :root { } + @media (prefers-color-scheme: dark) { :root { } }
 */
export function generateCSS(
    config: TokenConfig | DualTokenConfig,
    mode: GenerateMode = 'single'
): string {
    if (mode === 'single') {
        return renderBlock(':root', tokenValues(config as TokenConfig));
    }

    const { light, dark } = config as DualTokenConfig;

    if (mode === 'dual') {
        return [
            renderBlock('[data-theme="light"]', tokenValues(light)),
            renderBlock('[data-theme="dark"]',  tokenValues(dark)),
        ].join('\n\n');
    }

    // mode === 'media'
    const lightBlock = renderBlock(':root', tokenValues(light));
    const darkVars   = Object.entries(tokenValues(dark))
        .map(([k, v]) => `        ${k}: ${v};`)
        .join('\n');
    return [
        lightBlock,
        `@media (prefers-color-scheme: dark) {\n    :root {\n${darkVars}\n    }\n}`,
    ].join('\n\n');
}
