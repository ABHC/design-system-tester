<script lang="ts">
    import { onMount } from 'svelte';
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { FontConfig } from '$lib/types/fonts';
    
    import palettes from "$lib/data/palettes.json";
    import stored_fonts from "$lib/data/fonts.json";
    
    import { trans, locale } from './store';
    import { placeholders } from './placeholders';
    import type { PlaceholderLocale } from './placeholders';
    
    import ControlPanel from './ControlPanel.svelte';
    import Content from './Content.svelte';

    // ---------- Local state ----------
    let selected_tone = $state<'light' | 'dark'>('dark');
    let accent_index = $state(0);
    let tone_index = $state(0);
    let body_font_index = $state(0);
    let title_font_index = $state(1);

    // ---------- Derived data filtered according to display status ----------
    let accent_palettes: AccentTheme[] = $derived(palettes.accent.filter(a => a.display));
    let tone_palettes: ToneTheme[] = $derived(palettes[selected_tone].filter(t => t.display));
    let available_fonts: FontConfig[] = $derived(stored_fonts.fonts.filter(f => f.display));
    
    let selected_accent: AccentTheme = $derived(accent_palettes[accent_index]);
    let selected_palette: ToneTheme = $derived(tone_palettes[tone_index]);
    let selected_body_font: FontConfig = $derived(available_fonts[body_font_index]);
    let selected_title_font: FontConfig = $derived(available_fonts[title_font_index]);

    // ---------- Derived placeholder data based on current locale ----------
    let lang_placeholders = $derived(placeholders[$locale as PlaceholderLocale] || placeholders.en);

    // ---------- Reactive contrast calculus ----------
    let contrast_txt_bg = $derived(getContrastRatio(selected_palette.text, selected_palette.bg));
    let contrast_txt_card = $derived(getContrastRatio(selected_palette.text, selected_palette.card));
    
    let contrast_card_bg = $derived(getContrastRatio(selected_palette.card, selected_palette.bg));
    let contrast_highlight_bg = $derived(getContrastRatio(selected_palette.highlight, selected_palette.bg));
    let contrast_highlight_card = $derived(getContrastRatio(selected_palette.highlight, selected_palette.card));

    let contrast_accent = $derived(getContrastRatio(selected_accent.accent, selected_accent.text_accent));
    let contrast_accent_bg = $derived(getContrastRatio(selected_accent.accent, selected_palette.bg));
    let contrast_accent_card = $derived(getContrastRatio(selected_accent.accent, selected_palette.card));
    let contrast_accent_highlight = $derived(getContrastRatio(selected_accent.accent,selected_palette.highlight));

    let contrast_accent_light = $derived(getContrastRatio(selected_accent.accent_light, selected_accent.text_accent));
    let contrast_accent_light_bg = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.bg));
    let contrast_accent_light_card = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.card));
    let contrast_accent_light_highlight = $derived(getContrastRatio(selected_accent.accent_light,selected_palette.highlight));

    let contrast_accent_lighter = $derived(getContrastRatio(selected_accent.accent_lighter, selected_accent.text_accent));
    let contrast_accent_lighter_bg = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.bg));
    let contrast_accent_lighter_card = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.card));
    let contrast_accent_lighter_highlight = $derived(getContrastRatio(selected_accent.accent_lighter,selected_palette.highlight));
    
    let contrast_accent_dark = $derived(getContrastRatio(selected_accent.accent_dark, selected_accent.text_accent));
    let contrast_accent_dark_bg = $derived(getContrastRatio(selected_accent.accent_dark, selected_palette.bg));
    let contrast_accent_dark_card = $derived(getContrastRatio(selected_accent.accent_dark, selected_palette.card));
    let contrast_accent_dark_highlight = $derived(getContrastRatio(selected_accent.accent_dark,selected_palette.highlight));

    let contrast_accent_darker = $derived(getContrastRatio(selected_accent.accent_darker, selected_accent.text_accent));
    let contrast_accent_darker_bg = $derived(getContrastRatio(selected_accent.accent_darker, selected_palette.bg));
    let contrast_accent_darker_card = $derived(getContrastRatio(selected_accent.accent_darker, selected_palette.card));
    let contrast_accent_darker_highlight = $derived(getContrastRatio(selected_accent.accent_darker,selected_palette.highlight));

    // ---------- Reactive CSS variables ----------
    const css_variables = $derived({
        '--bg': selected_palette.bg,
        '--card': selected_palette.card,
        '--highlight': selected_palette.highlight,
        '--text': selected_palette.text,
        '--text-muted': selected_palette.text_muted,
        '--accent': selected_accent.accent,
        '--accent-dark': selected_accent.accent_dark,
        '--accent-darker': selected_accent.accent_darker,
        '--accent-light': selected_accent.accent_light,
        '--accent-lighter': selected_accent.accent_lighter,
        '--text-accent': selected_accent.text_accent,
        '--font-body': `'${selected_body_font.family}', sans-serif`,
        '--font-heading': `'${selected_title_font.family}', sans-serif`
    });

    $effect(() => {
        for (const [key, value] of Object.entries(css_variables)) {
            document.documentElement.style.setProperty(key, value);
        }
    });

    // ---------- Helper functions ----------

    /**
     * Set the theme tone (light or dark) and reset tone index
     */
    function setTone(tone: 'light' | 'dark'): void {
        selected_tone = tone;
        tone_index = 0;
    }

    /**
     * convert a single 0-255 channel to linear light
     */
    function toLinear(c: number): number {
        const normalized = c / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    }

    /**
     * Compute WCAG 2.1 relative luminance from a hex colour
     */
    function getLuminance(hex: string): number | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return null;
        //Convert hex colour string to RGB object
        const r = toLinear(parseInt(result[1], 16));
        const g = toLinear(parseInt(result[2], 16));
        const b = toLinear(parseInt(result[3], 16));
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * Compute WCAG 2.1 contrast ratio between two hex colours
     * Returns a string like "4.54" matching Chrome DevTools output
     */
    function getContrastRatio(hex1: string, hex2: string): string {
        const l1 = getLuminance(hex1);
        const l2 = getLuminance(hex2);
        if (l1 === null || l2 === null) return '—';
        const lighter = Math.max(l1, l2);
        const darker  = Math.min(l1, l2);
        return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
    }

    /**
     * Evaluate WCAG level for a given ratio and text size
     * size: 'normal' | 'large'  (large = ≥18pt or bold ≥14pt)
     */
    function getWcagLevel(ratio: string, size: 'normal' | 'large' = 'normal'): {
        level: 'AAA' | 'AA' | 'AA Large' | 'Fail',
        pass: boolean,
        colour: string
    } {
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

    /**
     * Convert hex colour string to RGB object
     */
    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16)
              }
            : null;
    }

    /**
     * Calculate relative luminance for a colour component
     */
    /*function getLuminance(r: number, g: number, b: number): number {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }*/

    /**
     * Calculate WCAG contrast ratio between two colours
     */
    /*function getContrastRatio(color1: string, color2: string): string {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        if (!rgb1 || !rgb2) {
            throw new Error('Invalid colour format provided');
        }

        const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);

        return ((lighter + 0.05) / (darker + 0.05)).toFixed(1);
    }*/

    // ---------- Lifecycle ----------
    onMount(() => {
        setTone(selected_tone);
    });
</script>

<svelte:head>
    <title>Design System Tester - Épinard</title>
</svelte:head>

<div class="tester-container">
    <ControlPanel
        {selected_tone}
        {tone_palettes}
        {accent_palettes}
        {available_fonts}
        {selected_palette}
        {selected_accent}
        {selected_body_font}
        {selected_title_font}
        on_tone_change={setTone}
        on_tone_index_change={(index) => (tone_index = index)}
        on_accent_index_change={(index) => (accent_index = index)}
        on_body_font_change={(index) => (body_font_index = index)}
        on_title_font_change={(index) => (title_font_index = index)}
    />

    <Content
        trans={$trans}
        placeholders={lang_placeholders}
        {css_variables}
        {contrast_txt_bg}
        {contrast_txt_card}
        {contrast_card_bg}
        {contrast_highlight_bg}
        {contrast_highlight_card}
        {selected_palette}
        {selected_accent}
        {contrast_accent}
        {contrast_accent_bg}
        {contrast_accent_card}
        {contrast_accent_highlight}
        {contrast_accent_light}
        {contrast_accent_light_bg}
        {contrast_accent_light_card}
        {contrast_accent_light_highlight}
        {contrast_accent_lighter}
        {contrast_accent_lighter_bg}
        {contrast_accent_lighter_card}
        {contrast_accent_lighter_highlight}
        {contrast_accent_dark}
        {contrast_accent_dark_bg}
        {contrast_accent_dark_card}
        {contrast_accent_dark_highlight}
        {contrast_accent_darker}
        {contrast_accent_darker_bg}
        {contrast_accent_darker_card}
        {contrast_accent_darker_highlight}
    />
</div>

<style>
    /* Main container */
    .tester-container {
        font-family: var(--font-body);
        background: var(--bg);
        color: var(--text);
        transition: background-color 0.3s, color 0.3s;
        font-size: 14px;
    }
</style>