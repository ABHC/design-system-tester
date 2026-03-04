<script lang="ts">
    import { onMount } from 'svelte';
    import type { ToneTheme } from "$lib/types/palettes";

    import palettes from "$lib/data/palettes.json";

    import { placeholders } from './placeholders';
    import type { PlaceholderLocale } from './placeholders';

    import Content from './Content.svelte';

    import {
        trans,
        locale,
        selected_tone,
        tone_index,
        selected_palette,
        selected_accent,
        selected_ctx,
    } from './store';

    // Static data for dual-theme finder (palettes.json is static, no reactivity needed)
    const all_light_palettes: ToneTheme[] = palettes.light.filter(t => t.display);
    const all_dark_palettes: ToneTheme[]  = palettes.dark.filter(t => t.display);

    // ---------- Derived placeholder data based on current locale ----------
    let lang_placeholders = $derived(placeholders[$locale as PlaceholderLocale] || placeholders.en);

    // ---------- Helper functions ----------
    function setTone(tone: 'light' | 'dark'): void {
        $selected_tone = tone;
        $tone_index = 0;
    }

    // ---------- Lifecycle ----------
    onMount(() => {
        setTone($selected_tone);
    });
</script>

<svelte:head>
    <title>Design System Tester - Épinard</title>
</svelte:head>

<div class="tester-container">
    <Content
        trans={$trans}
        placeholders={lang_placeholders}
        selected_palette={$selected_palette}
        selected_accent={$selected_accent}
        light_palettes={all_light_palettes}
        dark_palettes={all_dark_palettes}
        selected_ctx={$selected_ctx}
    />
</div>

<style>
    .tester-container {
        font-family: var(--font-body);
        background: var(--bg);
        color: var(--text);
        transition: background-color 0.3s, color 0.3s;
        font-size: 14px;
    }
</style>
