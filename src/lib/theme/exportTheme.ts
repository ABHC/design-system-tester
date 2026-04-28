import { get } from 'svelte/store';
import palettes from '$lib/data/palettes.json';
import type {
    ToneTheme,
    AccentTheme,
    ContextualColors,
    TextTheme,
} from '$lib/types/palettes';
import type { FontConfig } from '$lib/types/fonts';
import {
    tone_index_dark,
    tone_index_light,
    accent_index,
    ctx_index,
    text_index,
    body_font_index,
    title_font_index,
    custom_tone_dark,
    custom_tone_light,
    custom_accent,
    custom_ctx,
    custom_text,
    available_fonts,
    shadow_opacity,
    icon_set,
    type IconSet,
} from '../../routes/store';
import { tokenValues, type TokenConfig } from './tokenSchema';

// Icon set registry -------------------------------------------------

interface IconSetConfig {
    id: IconSet;
    label: string;
    cdn?: string;
    linkTag?: string;
    helperCss?: string;
    preview?: { className: string; content?: string };
}

const ICON_SETS: Record<IconSet, IconSetConfig> = {
    none: {
        id: 'none',
        label: 'None',
    },
    material: {
        id: 'material',
        label: 'Material Symbols',
        cdn: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
        linkTag: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined">',
        helperCss: `.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
    font-size: 24px;
}`,
        preview: { className: 'material-symbols-outlined', content: 'star' },
    },
    lucide: {
        id: 'lucide',
        label: 'Lucide',
        cdn: 'https://unpkg.com/lucide-static@latest/font/lucide.css',
        linkTag: '<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css">',
        preview: { className: 'icon-star' },
    },
    phosphor: {
        id: 'phosphor',
        label: 'Phosphor',
        cdn: 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css',
        linkTag: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css">',
        preview: { className: 'ph ph-star' },
    },
};

export const iconSetOptions: ReadonlyArray<{
    id: IconSet;
    label: string;
    preview?: { className: string; content?: string };
}> = Object.values(ICON_SETS).map(({ id, label, preview }) => ({ id, label, preview }));

// Store → palette resolvers ---------------------------------------------

function resolveTone(mode: 'light' | 'dark'): ToneTheme {
    const base = (palettes[mode] as ToneTheme[]).filter((t) => t.display);
    const customs = (mode === 'dark' ? get(custom_tone_dark) : get(custom_tone_light))
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map((c) => ({ ...c, display: true } as ToneTheme));
    const list = [...base, ...customs];
    const idx = mode === 'dark' ? get(tone_index_dark) : get(tone_index_light);
    return list[idx] ?? list[0];
}

function resolveAccent(): AccentTheme {
    const base = (palettes.accent as AccentTheme[]).filter((a) => a.display);
    const customs = get(custom_accent)
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map((c) => ({ ...c, display: true } as AccentTheme));
    const list = [...base, ...customs];
    return list[get(accent_index)] ?? list[0];
}

function resolveCtx(): ContextualColors {
    const base = (palettes.ctx as ContextualColors[]).filter((c) => c.display);
    const customs = get(custom_ctx)
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map((c) => ({ ...c, display: true } as ContextualColors));
    const list = [...base, ...customs];
    return list[get(ctx_index)] ?? list[0];
}

function resolveText(): TextTheme {
    const base = (palettes.text as TextTheme[]).filter((t) => t.display);
    const customs = get(custom_text)
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map((c) => ({ ...c, display: true } as TextTheme));
    const list = [...base, ...customs];
    return list[get(text_index)] ?? list[0];
}

function resolveFont(idx: number): FontConfig {
    return available_fonts[idx] ?? available_fonts[0];
}

// Config + CSS assembly -----------------------------------------------

function buildConfig(mode: 'light' | 'dark'): TokenConfig {
    const tone = resolveTone(mode);
    const accent = resolveAccent();
    const ctx = resolveCtx();
    const text = resolveText();
    const body = resolveFont(get(body_font_index));
    const title = resolveFont(get(title_font_index));

    return {
        mode,
        tone: { bg: tone.bg, card: tone.card },
        semantic: {
            accent: accent.accent,
            error: ctx.error,
            warning: ctx.warning,
            success: ctx.success,
            info: ctx.info,
            neutral: ctx.neutral,
        },
        text_palette: { light: text.light, dark: text.dark },
        typography: {
            body: `'${body.family}', sans-serif`,
            heading: `'${title.family}', sans-serif`,
        },
        shadow_opacity,
    };
}

interface Category {
    title: string;
    keys: string[];
}

const CATEGORIES: Category[] = [
    {
        title: 'Tone surface',
        keys: [
            '--spk-tone-bg',
            '--spk-tone',
            '--spk-tone-hover',
            '--spk-tone-muted',
            '--spk-tone-ghost',
            '--spk-tone-ghost-hover'
        ]
    },
    {
        title: 'Accent',
        keys: [
            '--spk-accent',
            '--spk-accent-hover',
            '--spk-accent-bg',
            '--spk-accent-ghost-hover',
            '--spk-accent-muted',
            '--spk-text-accent'
        ]
    },
    {
        title: 'Error',
        keys: [
            '--spk-error',
            '--spk-error-hover',
            '--spk-error-bg',
            '--spk-error-ghost-hover',
            '--spk-error-muted',
            '--spk-text-error'
        ]
    },
    {
        title: 'Warning', keys: [
            '--spk-warning',
            '--spk-warning-hover',
            '--spk-warning-bg',
            '--spk-warning-ghost-hover',
            '--spk-warning-muted',
            '--spk-text-warning'
        ]
    },
    {
        title: 'Success',
        keys: [
            '--spk-success',
            '--spk-success-hover',
            '--spk-success-bg',
            '--spk-success-ghost-hover',
            '--spk-success-muted',
            '--spk-text-success'
        ]
    },
    {
        title: 'Info',
        keys: [
            '--spk-info',
            '--spk-info-hover',
            '--spk-info-bg',
            '--spk-info-ghost-hover',
            '--spk-info-muted',
            '--spk-text-info'
        ]
    },
    {
        title: 'Neutral',
        keys: [
            '--spk-neutral',
            '--spk-neutral-hover',
            '--spk-neutral-bg',
            '--spk-neutral-ghost-hover',
            '--spk-neutral-muted',
            '--spk-text-neutral'
        ]
    },
    {
        title: 'Text',
        keys: [
            '--spk-text',
            '--spk-text-light',
            '--spk-text-dark',
            '--spk-text-muted'
        ]
    },
    {
        title: 'Shadows',
        keys: [
            '--spk-shadow-hard',
            '--spk-muted-shadow'
        ]
    },
];

const RADII: Record<string, string> = {
    '--spk-radius-edge': '4px',
    '--spk-radius-soft': '8px',
    '--spk-radius-round': '12px',
    '--spk-radius-pill': '999px',
    '--spk-radius-circle': '50%',
};

const Z_INDEX: Record<string, string> = {
    '--spk-z-behind': '-1',
    '--spk-z-floating': '100',
    '--spk-z-sticky': '200',
    '--spk-z-panel': '300',
    '--spk-z-dialog': '400',
    '--spk-z-notification': '1000',
};

const MOTION: Record<string, string> = {
    '--spk-duration-quick': '0.15s',
    '--spk-duration-base': '0.2s',
    '--spk-duration-slow': '0.3s',
    '--spk-ease-out': 'ease-out',
    '--spk-ease-glide': 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const ELEVATION: Record<string, string> = {
    '--spk-elevation-subtle': '0 4px 12px',
    '--spk-elevation-hard': '0.3rem 0.3rem',
};

const BORDER: Record<string, string> = {
    '--spk-border': '2px',
    '--spk-border-thin': '1px',
    '--spk-border-accent': '4px',
};

const OPACITY: Record<string, string> = {
    '--spk-opacity-disabled': '0.5',
    '--spk-opacity-faded': '0.6',
    '--spk-opacity-muted': '0.7',
    '--spk-opacity-overlay': '0.85',
};

const FOCUS: Record<string, string> = {
    '--spk-focus-ring': 'var(--spk-text)',
    '--spk-focus-ring-width': '2px',
    '--spk-focus-ring-offset': '2px',
};

const ROOT_SHARED_KEYS = new Set(['--spk-font-body', '--spk-font-heading', '--spk-shadow-subtle']);

function renderBlock(
    selector: string,
    vars: Record<string, string>,
    scheme: 'light' | 'dark',
): string {
    const sections: string[] = [`    color-scheme: ${scheme};`];
    for (const cat of CATEGORIES) {
        const catLines = cat.keys
            .filter((k) => k in vars)
            .map((k) => `    ${k}: ${vars[k]};`);
        if (catLines.length === 0) continue;
        sections.push('');
        sections.push(`    /* --- ${cat.title} --- */`);
        sections.push(...catLines);
    }
    return `${selector} {\n${sections.join('\n')}\n}`;
}

function renderRoot(shared: Record<string, string>): string {
    const lines: string[] = [];
    lines.push('    /* --- Border radius --- */');
    for (const [k, v] of Object.entries(RADII)) lines.push(`    ${k}: ${v};`);

    lines.push('');
    lines.push('    /* --- Z-index ladder --- */');
    for (const [k, v] of Object.entries(Z_INDEX)) lines.push(`    ${k}: ${v};`);

    lines.push('');
    lines.push('    /* --- Motion --- */');
    for (const [k, v] of Object.entries(MOTION)) lines.push(`    ${k}: ${v};`);

    lines.push('');
    lines.push('    /* --- Elevation (shape only — color is provided by --spk-shadow-*) --- */');
    for (const [k, v] of Object.entries(ELEVATION)) lines.push(`    ${k}: ${v};`);

    lines.push('');
    lines.push('    /* --- Border width --- */');
    for (const [k, v] of Object.entries(BORDER)) lines.push(`    ${k}: ${v};`);

    lines.push('');
    lines.push('    /* --- Opacity --- */');
    for (const [k, v] of Object.entries(OPACITY)) lines.push(`    ${k}: ${v};`);

    lines.push('');
    lines.push('    /* --- Focus ring --- */');
    for (const [k, v] of Object.entries(FOCUS)) lines.push(`    ${k}: ${v};`);

    if ('--spk-font-body' in shared || '--spk-font-heading' in shared) {
        lines.push('');
        lines.push('    /* --- Typography --- */');
        if ('--spk-font-body' in shared) lines.push(`    --spk-font-body: ${shared['--spk-font-body']};`);
        if ('--spk-font-heading' in shared) lines.push(`    --spk-font-heading: ${shared['--spk-font-heading']};`);
    }
    if ('--spk-shadow-subtle' in shared) {
        lines.push('');
        lines.push('    /* --- Shadows --- */');
        lines.push(`    --spk-shadow-subtle: ${shared['--spk-shadow-subtle']};`);
    }
    return `:root {\n${lines.join('\n')}\n}`;
}

function splitShared(
    light: Record<string, string>,
    dark: Record<string, string>,
): {
    shared: Record<string, string>;
    lightOnly: Record<string, string>;
    darkOnly: Record<string, string>;
} {
    const shared: Record<string, string> = {};
    const lightOnly: Record<string, string> = {};
    const darkOnly: Record<string, string> = {};
    for (const [k, v] of Object.entries(light)) {
        if (ROOT_SHARED_KEYS.has(k) && dark[k] === v) shared[k] = v;
        else lightOnly[k] = v;
    }
    for (const [k, v] of Object.entries(dark)) {
        if (!(k in shared)) darkOnly[k] = v;
    }
    return { shared, lightOnly, darkOnly };
}

function buildFontsImport(): string {
    const body = resolveFont(get(body_font_index));
    const title = resolveFont(get(title_font_index));
    const families = new Map<string, Set<number>>();
    for (const font of [body, title]) {
        const weights = families.get(font.googleFontsName) ?? new Set<number>();
        font.weights.forEach((w) => weights.add(w));
        families.set(font.googleFontsName, weights);
    }
    const parts = [...families.entries()].map(([name, weightsSet]) => {
        const weights = [...weightsSet].sort((a, b) => a - b).join(';');
        return `family=${name}:wght@${weights}`;
    });
    return `https://fonts.googleapis.com/css2?${parts.join('&')}&display=swap`;
}

const TYPOGRAPHY_CSS = `/* --- Typography --- */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--spk-font-heading);
    font-weight: 600;
    color: var(--spk-text);
    margin: 1em 0 0.5em;
}

h1 { font-size: 2.5rem; font-weight: 700; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; font-weight: 500; }

body {
    background: var(--spk-tone-bg);
    color: var(--spk-text);
    font-family: var(--spk-font-body);
}`;

const REDUCED_MOTION_CSS = `/* --- Reduced motion ---------------------------------------------------
   Collapses the tokenized durations to a near-zero value so transitionend
   and animationend events still fire, while motion stays imperceptible. */
@media (prefers-reduced-motion: reduce) {
    :root {
        --spk-duration-quick: 0.01ms;
        --spk-duration-base: 0.01ms;
        --spk-duration-slow: 0.01ms;
    }
}`;

function buildHeader(icons: IconSetConfig, fontsUrl: string): string {
    const lines: string[] = [];
    lines.push('/* --- Spektral UI - Exported Tokens ---------------------------');
    lines.push('   Dual theme. Toggle via [data-theme="light"] / [data-theme="dark"]');
    lines.push('   on <html> (e.g. document.documentElement.dataset.theme = "dark").');
    lines.push('');
    lines.push(`   Icon set: ${icons.label}`);
    lines.push('');
    lines.push('   Fonts and icons are loaded via @import so this file works');
    lines.push('   out of the box. For better performance, remove the @import');
    lines.push('   lines and add these tags in your HTML <head> instead');
    lines.push('   (in Svelte, wrap them in <svelte:head>…</svelte:head>):');
    lines.push('');
    lines.push(`     <link rel="stylesheet" href="${fontsUrl}">`);
    if (icons.linkTag) {
        lines.push(`     ${icons.linkTag}`);
    }
    lines.push('   ----------------------------------------------------------- */');
    return lines.join('\n');
}

export function generateExportCSS(): string {
    const icons = ICON_SETS[get(icon_set)];
    const fontsUrl = buildFontsImport();

    const parts: string[] = [];
    parts.push(buildHeader(icons, fontsUrl));
    parts.push('');
    parts.push(`@import url("${fontsUrl}");`);
    if (icons.cdn) parts.push(`@import url("${icons.cdn}");`);
    parts.push('');
    const { shared, lightOnly, darkOnly } = splitShared(
        tokenValues(buildConfig('light')),
        tokenValues(buildConfig('dark')),
    );
    parts.push(renderRoot(shared));
    parts.push('');
    parts.push(renderBlock('[data-theme="light"]', lightOnly, 'light'));
    parts.push('');
    parts.push(renderBlock('[data-theme="dark"]', darkOnly, 'dark'));
    parts.push('');
    parts.push(TYPOGRAPHY_CSS);
    parts.push('');
    parts.push(REDUCED_MOTION_CSS);
    if (icons.helperCss) {
        parts.push('');
        parts.push(`/* --- ${icons.label} --- */`);
        parts.push(icons.helperCss);
    }
    parts.push('');

    return parts.join('\n');
}

// Download -------------------------------------------------------------

export function downloadThemeCSS(filename: string = 'tokens.css'): void {
    const css = generateExportCSS();
    const blob = new Blob([css], { type: 'text/css;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
