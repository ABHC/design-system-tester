<script lang="ts">
    import { onMount } from 'svelte';
    import type { AccentTheme, ToneTheme, ContextualColors } from "$lib/types/palettes";
    import type { FontConfig } from '$lib/types/fonts';

    import palettes from "$lib/data/palettes.json";
    import stored_fonts from "$lib/data/fonts.json";
    import { tokenValues } from '../design-system/token-schema';

    import { placeholders } from './placeholders';
    import type { PlaceholderLocale } from './placeholders';

    import ControlPanel from './ControlPanel.svelte';
    import Content from './Content.svelte';

    import { 
        trans, 
        locale, 
        shadow_opacity, 
        ctx_opacity, 
        ctx_surface 
    } from './store';

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

    // All light/dark palettes for dual-theme finder
    let all_light_palettes: ToneTheme[] = $derived(palettes.light.filter(t => t.display));
    let all_dark_palettes: ToneTheme[] = $derived(palettes.dark.filter(t => t.display));

    let selected_accent: AccentTheme = $derived(accent_palettes[accent_index]);
    let selected_palette: ToneTheme = $derived(tone_palettes[tone_index]);
    let selected_body_font: FontConfig = $derived(available_fonts[body_font_index]);
    let selected_title_font: FontConfig = $derived(available_fonts[title_font_index]);

    // ---------- Derived placeholder data based on current locale ----------
    let lang_placeholders = $derived(placeholders[$locale as PlaceholderLocale] || placeholders.en);

    // ---------- Contextual colors ----------
    const contextual_colors = $derived<ContextualColors>({
        error:   '#dc2626',
        warning: '#F39C12',
        success: '#15803d',
        info:    '#6b7280',
        //info: '#F0FFFF',
    });
    //WARM
    /*const contextual_colors = $derived<ContextualColors>({
        error:   '#b91c1c',
        warning: '#d97706',
        success: '#65a30d',
        info:    '#7c3aed',
    });*/
    //COLD
    /*const contextual_colors = $derived<ContextualColors>({
        error:   '#e11d48',
        warning: '#ca8a04',
        success: '#0d9488',
        info:    '#0284c7',
    });*/
    //VIFS
    /*const contextual_colors = $derived<ContextualColors>({
        error:   '#ef4444',
        warning: '#f97316',
        success: '#22c55e',
        info:    '#0ea5e9',
    });*/

    // ---------- Reactive CSS variables ----------
    const css_variables = $derived(tokenValues({
        palette: {
            bg:         selected_palette.bg,
            card:       selected_palette.card,
            highlight:  selected_palette.highlight,
            text:       selected_palette.text,
            text_muted: selected_palette.text_muted,
        },
        accent: {
            accent_lighter: selected_accent.accent_lighter,
            accent_light:   selected_accent.accent_light,
            accent_dark:    selected_accent.accent_dark,
            accent_darker:  selected_accent.accent_darker,
            text_accent:    selected_accent.text_accent,
        },
        tone: selected_tone,
        typography: {
            body:    `'${selected_body_font.family}', sans-serif`,
            heading: `'${selected_title_font.family}', sans-serif`,
        },
        contextual: contextual_colors,
        ctx_opacity,
        shadow_opacity,
        ctx_surface,
    }));

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
        {selected_palette}
        {selected_accent}
        light_palettes={all_light_palettes}
        dark_palettes={all_dark_palettes}
        {contextual_colors}
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
