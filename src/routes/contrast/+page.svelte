<script lang="ts">
    import type { ToneTheme } from "$lib/types/palettes";
    import palettes from "$lib/data/palettes.json";

    import { placeholders } from '../placeholders';
    import type { PlaceholderLocale } from '../placeholders';

    import Contrast from "./Contrast.svelte";
    import Colorblind from './Colorblind.svelte';
    import Headline from "../../design-system/components/Headline/Headline.svelte";

    import {
        trans,
        locale,
        selected_palette,
        selected_accent,
        selected_ctx,
    } from '../store';

    const all_light_palettes: ToneTheme[] = palettes.light.filter(t => t.display);
    const all_dark_palettes: ToneTheme[]  = palettes.dark.filter(t => t.display);

    let lang_placeholders = $derived(placeholders[$locale as PlaceholderLocale] || placeholders.en);
</script>

<svelte:head>
    <title>Design System Tester - Contrast</title>
</svelte:head>

<div class="content">

    <Headline size="md" uppercase>
        {$trans?.palette.title}
    </Headline>

    <div class="demo-section">
        <div class="swatch-grid">
            <div class="swatch" style="border: 2px solid var(--highlight);">
                <div class="swatch-header">
                    <div class="swatch-label">Background</div>
                    <div class="swatch-var">--bg</div>
                </div>
                <div class="swatch-hex">{$selected_palette.bg}</div>
            </div>
            <div class="swatch" style="background: var(--card);">
                <div class="swatch-header">
                    <div class="swatch-label">Card</div>
                    <div class="swatch-var">--card</div>
                </div>
                <div class="swatch-hex">{$selected_palette.card}</div>
            </div>
            <div class="swatch" style="background: var(--highlight);">
                <div class="swatch-header">
                    <div class="swatch-label">Highlight</div>
                    <div class="swatch-var">--highlight</div>
                </div>
                <div class="swatch-hex">{$selected_palette.highlight}</div>
            </div>
            <div class="swatch" style="background: var(--accent-lighter); color: var(--text-accent);">
                <div class="swatch-header">
                    <div class="swatch-label">Lighter</div>
                    <div class="swatch-var">--accent-lighter</div>
                </div>
                <div class="swatch-hex">{$selected_accent.accent_lighter}</div>
            </div>
            <div class="swatch" style="background: var(--accent-light); color: var(--text-accent);">
                <div class="swatch-header">
                    <div class="swatch-label">Light</div>
                    <div class="swatch-var">--accent-light</div>
                </div>
                <div class="swatch-hex">{$selected_accent.accent_light}</div>
            </div>
            <div class="swatch" style="background: var(--accent-dark); color: var(--text-accent);">
                <div class="swatch-header">
                    <div class="swatch-label">Dark</div>
                    <div class="swatch-var">--accent-dark</div>
                </div>
                <div class="swatch-hex">{$selected_accent.accent_dark}</div>
            </div>
            <div class="swatch" style="background: var(--accent-darker); color: var(--text-accent);">
                <div class="swatch-header">
                    <div class="swatch-label">Darker</div>
                    <div class="swatch-var">--accent-darker</div>
                </div>
                <div class="swatch-hex">{$selected_accent.accent_darker}</div>
            </div>
        </div>
    </div>

    <Headline size="md" uppercase>
        {$trans?.contrast.title}
    </Headline>

    <Contrast
        trans={$trans}
        selected_palette={$selected_palette}
        selected_accent={$selected_accent}
        light_palettes={all_light_palettes}
        dark_palettes={all_dark_palettes}
        selected_ctx={$selected_ctx}
    />

    <Headline size="md" uppercase>
        {$trans?.colorblind.title}
    </Headline>

    <Colorblind
        trans={$trans}
        selected_palette={$selected_palette}
        selected_accent={$selected_accent}
        selected_ctx={$selected_ctx}
    />
</div>

<style>
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 10px 40px 40px;
    }

    .demo-section {
        margin-bottom: 40px;
    }

    .swatch-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }

    .swatch {
        aspect-ratio: 1;
        border-radius: 8px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 11px;
        font-family: 'Courier New', monospace;
        font-weight: 600;
        position: relative;
    }

    .swatch-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .swatch-label {
        font-size: 10px;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .swatch-var {
        font-size: 11px;
        opacity: 0.9;
    }

    .swatch-hex {
        font-size: 13px;
        font-weight: 700;
        padding: 6px 10px;
        border-radius: 4px;
        text-align: center;
        background: rgba(255,255,255,0.35);
    }

    @media (max-width: 768px) {
        .content {
            padding: 10px 20px 40px;
        }
    }
</style>
