<script lang="ts">
    import type { ToneTheme } from "$lib/types/palettes";

    import palettes from "$lib/data/palettes.json";

    import { placeholders } from './placeholders';
    import type { PlaceholderLocale } from './placeholders';

    import Content from './Content.svelte';

    import {
        trans,
        locale,
        selected_tone,
        selected_tone_palette,
        selected_accent,
        selected_ctx,
    } from './store';

    // Static data for dual-theme finder (palettes.json is static, no reactivity needed)
    const all_light_palettes: ToneTheme[] = palettes.light.filter(t => t.display);
    const all_dark_palettes: ToneTheme[]  = palettes.dark.filter(t => t.display);

    // ---------- Derived placeholder data based on current locale ----------
    let lang_placeholders = $derived(placeholders[$locale as PlaceholderLocale] || placeholders.en);

</script>

<svelte:head>
    <title>Design System Tester - Épinard</title>
</svelte:head>

<div class="tester-container">
    <Content
        trans={$trans}
        placeholders={lang_placeholders}
        selected_tone_palette={$selected_tone_palette}
        selected_accent={$selected_accent}
        light_palettes={all_light_palettes}
        dark_palettes={all_dark_palettes}
        selected_ctx={$selected_ctx}
    />
</div>

<style>
    .tester-container {
        font-family: var(--font-body);
        background: var(--tone-bg);
        color: var(--text);
        transition: background-color 0.3s, color 0.3s;
        font-size: 14px;
    }
</style>
