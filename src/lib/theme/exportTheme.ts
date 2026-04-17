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

// ─── Icon set registry ───────────────────────────────────────────────────────

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

// ─── Store → palette resolvers ───────────────────────────────────────────────

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

// ─── Config + CSS assembly ───────────────────────────────────────────────────

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
            '--tone-bg', 
            '--tone', 
            '--tone-hover', 
            '--tone-muted', 
            '--tone-ghost', 
            '--tone-ghost-hover'
        ] 
    },
    { 
        title: 'Accent',
        keys: [
            '--accent', 
            '--accent-hover', 
            '--accent-bg', 
            '--accent-ghost-hover', 
            '--accent-muted', 
            '--text-accent'
        ] 
    },
    { 
        title: 'Error', 
        keys: [
            '--error', 
            '--error-hover', 
            '--error-bg', 
            '--error-ghost-hover', 
            '--error-muted', 
            '--text-error'
        ]
    },
    { 
        title: 'Warning', keys: [
            '--warning', 
            '--warning-hover', 
            '--warning-bg', 
            '--warning-ghost-hover', 
            '--warning-muted', 
            '--text-warning'
        ] 
    },
    { 
        title: 'Success', 
        keys: [
            '--success', 
            '--success-hover', 
            '--success-bg', 
            '--success-ghost-hover', 
            '--success-muted', 
            '--text-success'
        ] 
    },
    { 
        title: 'Info', 
        keys: [
            '--info', 
            '--info-hover', 
            '--info-bg', 
            '--info-ghost-hover', 
            '--info-muted', 
            '--text-info'
        ] 
    },
    { 
        title: 'Neutral', 
        keys: [
            '--neutral', 
            '--neutral-hover', 
            '--neutral-bg', 
            '--neutral-ghost-hover', 
            '--neutral-muted', 
            '--text-neutral'
        ] 
    },
    { 
        title: 'Text', 
        keys: [
            '--text', 
            '--text-light', 
            '--text-dark', 
            '--text-muted'
        ] 
    },
    { 
        title: 'Shadows', 
        keys: [
            '--shadow-hard', 
            '--muted-shadow'
        ] 
    },
];

const RADII: Record<string, string> = {
    '--radius-edge':   '4px',
    '--radius-soft':   '8px',
    '--radius-round':  '12px',
    '--radius-pill':   '999px',
    '--radius-circle': '50%',
};

const ROOT_SHARED_KEYS = new Set(['--font-body', '--font-heading', '--shadow-subtle']);

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
        sections.push(`    /* ─── ${cat.title} ─── */`);
        sections.push(...catLines);
    }
    return `${selector} {\n${sections.join('\n')}\n}`;
}

function renderRoot(shared: Record<string, string>): string {
    const lines: string[] = [];
    lines.push('    /* ─── Border radius ─── */');
    for (const [k, v] of Object.entries(RADII)) lines.push(`    ${k}: ${v};`);

    if ('--font-body' in shared || '--font-heading' in shared) {
        lines.push('');
        lines.push('    /* ─── Typography ─── */');
        if ('--font-body' in shared) lines.push(`    --font-body: ${shared['--font-body']};`);
        if ('--font-heading' in shared) lines.push(`    --font-heading: ${shared['--font-heading']};`);
    }
    if ('--shadow-subtle' in shared) {
        lines.push('');
        lines.push('    /* ─── Shadows ─── */');
        lines.push(`    --shadow-subtle: ${shared['--shadow-subtle']};`);
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

const TYPOGRAPHY_CSS = `/* ─── Typography ─── */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--text);
    margin: 1em 0 0.5em;
}

h1 { font-size: 2.5rem; font-weight: 700; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; font-weight: 500; }

body {
    background: var(--tone-bg);
    color: var(--text);
    font-family: var(--font-body);
}`;

function buildHeader(icons: IconSetConfig, fontsUrl: string): string {
    const lines: string[] = [];
    lines.push('/* ─── Spektral UI — Exported Tokens ───────────────────────────');
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
    lines.push('   ───────────────────────────────────────────────────────────── */');
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
    if (icons.helperCss) {
        parts.push('');
        parts.push(`/* ─── ${icons.label} ─── */`);
        parts.push(icons.helperCss);
    }
    parts.push('');

    return parts.join('\n');
}

// ─── Download ────────────────────────────────────────────────────────────────

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
