<script lang="ts">
    import type { ToneTheme } from "$lib/types/palettes";
    import type { CustomSlots, CustomTone, CustomAccent, CustomCtx, CustomText } from "$lib/types/palettes";
    import palettes from "$lib/data/palettes.json";
    import { getLuminance } from "$lib/utils/contrast";
    import { get } from 'svelte/store';

    import Contrast from "./Contrast.svelte";
    import Colorblind from './Colorblind.svelte';
    import ThemeSwatches from './ThemeSwatches.svelte';
    import { Headline, Button, Switch, ColorPicker, SwatchRow } from "@abhc/spektral-ui";
    import { tokenValues, deriveSemanticTokens, computeMuted } from '$lib/theme/tokenSchema';
    import type { Swatch } from '@abhc/spektral-ui';

    import {
        trans,
        selected_tone_palette,
        selected_accent,
        selected_ctx,
        selected_text,
        selected_tone,
        selected_body_font,
        selected_title_font,
        shadow_opacity,
        setToneIndex,
        tone_index_dark,
        tone_index_light,
        tone_palettes,
        accent_index,
        ctx_index,
        text_index,
        custom_tone_dark,
        custom_tone_light,
        custom_accent,
        custom_ctx,
        custom_text,
        custom_slot_index,
    } from '../store';

    const all_light_palettes: ToneTheme[] = palettes.light.filter(t => t.display);
    const all_dark_palettes: ToneTheme[]  = palettes.dark.filter(t => t.display);

    // Base palette counts (for computing custom palette index offset)
    const base_tone_dark_count = palettes.dark.filter(t => t.display).length;
    const base_tone_light_count = palettes.light.filter(t => t.display).length;
    const base_accent_count = palettes.accent.filter(a => a.display).length;
    const base_ctx_count = palettes.ctx.filter(c => c.display).length;
    const base_text_count = palettes.text.filter(t => t.display).length;

    // ── Tabbed picker state ──────────────────────────────────────────────────────
    type PickerTab = 'tone-bg' | 'tone-base' | 'accent' | 'ctx' | 'text';
    type CtxField = 'error' | 'warning' | 'success' | 'info' | 'neutral';

    let active_tab: PickerTab = $state('accent');

    // Tone tabs
    let tone_dark_mode: boolean = $state($selected_tone === 'dark');
    let tone_bg_hex: string = $state($selected_tone_palette.bg);
    let tone_card_hex: string = $state($selected_tone_palette.card);
    const tone_mode = $derived<'light' | 'dark'>(tone_dark_mode ? 'dark' : 'light');

    // Palette for the mode targeted by the tone switch
    function tonePaletteForMode(mode: 'light' | 'dark'): ToneTheme {
        const base = (palettes[mode] as ToneTheme[]).filter(t => t.display);
        const customSlots = mode === 'dark' ? get(custom_tone_dark) : get(custom_tone_light);
        const customs = customSlots
            .filter((s): s is CustomTone => s !== null)
            .map(c => ({ ...c, display: true } as ToneTheme));
        const all = [...base, ...customs];
        const idx = mode === 'dark' ? get(tone_index_dark) : get(tone_index_light);
        return all[idx] ?? all[0];
    }

    // Sync tone hex values when switch toggles
    $effect(() => {
        const p = tonePaletteForMode(tone_mode);
        tone_bg_hex = p.bg;
        tone_card_hex = p.card;
    });

    // Accent tab
    let accent_hex: string = $state($selected_accent.accent);

    // Ctx tab
    let ctx_field: CtxField = $state('error');
    let ctx_hexes = $state({
        error: $selected_ctx.error,
        warning: $selected_ctx.warning,
        success: $selected_ctx.success,
        info: $selected_ctx.info,
        neutral: $selected_ctx.neutral,
    });

    // Text tab
    let text_dark_mode: boolean = $state($selected_tone === 'dark');
    let text_hex: string = $state(
        $selected_tone === 'dark' ? $selected_text.light : $selected_text.dark
    );
    const text_is_dark = $derived(text_dark_mode);

    // Sync text hex when switch toggles
    $effect(() => {
        text_hex = text_dark_mode ? $selected_text.light : $selected_text.dark;
    });

    // Footer
    let custom_slot: 0 | 1 | 2 = $state(0);

    // ── Common derived ───────────────────────────────────────────────────────────

    function makeTokens(palette: ToneTheme, mode: 'light' | 'dark'): Record<string, string> {
        return tokenValues({
            mode,
            tone: {
                bg: palette.bg,
                card: palette.card,
            },
            semantic: {
                accent: $selected_accent.accent,
                error: $selected_ctx.error,
                warning: $selected_ctx.warning,
                success: $selected_ctx.success,
                info: $selected_ctx.info,
                neutral: $selected_ctx.neutral,
            },
            text_palette: {
                light: $selected_text.light,
                dark: $selected_text.dark,
            },
            typography: {
                body: `'${$selected_body_font.family}', sans-serif`,
                heading: `'${$selected_title_font.family}', sans-serif`,
            },
            shadow_opacity,
        });
    }

    const tokens = $derived(makeTokens($selected_tone_palette, $selected_tone));
    const is_dark = $derived((getLuminance($selected_tone_palette.bg) ?? 0) < 0.5);
    const text_color = $derived(is_dark ? $selected_text.light : $selected_text.dark);

    // Opposite theme
    const opposite_palettes = $derived(is_dark ? all_light_palettes : all_dark_palettes);
    const opposite_tone = $derived<'light' | 'dark'>(is_dark ? 'light' : 'dark');
    let opposite_index = $state(0);
    const opposite_theme = $derived(opposite_index >= 0 ? opposite_palettes[opposite_index] : null);
    const opposite_tokens = $derived.by(() => {
        if (!opposite_theme) return null;
        return makeTokens(opposite_theme, opposite_tone);
    });

    // ── Per-tab swatch derivation ────────────────────────────────────────────────

    function buildSemanticSwatches(hex: string, isDark: boolean, cardHex: string, bgHex: string): Swatch[] {
        const name = 'preview';
        const textPalette = { light: $selected_text.light, dark: $selected_text.dark };
        const txtColor = isDark ? $selected_text.light : $selected_text.dark;
        const tk = deriveSemanticTokens(name, hex, isDark, cardHex, bgHex, textPalette);
        return [
            { 
                label: 'bg', 
                value: tk[`--spk-${name}-bg`], 
                bg: tk[`--spk-${name}-bg`], 
                color: txtColor 
            },
            { 
                label: 'base', 
                value: tk[`--spk-${name}`], 
                bg: tk[`--spk-${name}`], 
                color: tk[`--spk-text-${name}`] 
            },
            { 
                label: 'hover', 
                value: tk[`--spk-${name}-hover`], 
                bg: tk[`--spk-${name}-hover`], 
                color: tk[`--spk-text-${name}`] 
            },
            { 
                label: 'muted', 
                value: tk[`--spk-${name}-muted`], 
                bg: tk[`--spk-${name}-muted`], 
                color: tk[`--spk-text-${name}`] 
            },
            { 
                label: 'text', 
                value: tk[`--spk-text-${name}`], 
                bg: tk[`--spk-${name}`], 
                color: tk[`--spk-text-${name}`], 
                isText: true 
            },
        ];
    }

    const tone_swatches = $derived.by((): Swatch[] => {
        const toneText = tone_mode === 'dark' ? $selected_text.light : $selected_text.dark;
        const toneTextMuted = computeMuted(toneText, tone_card_hex);
        return [
            { 
                label: 'bg', 
                value: tone_bg_hex, 
                bg: tone_bg_hex, 
                color: toneText 
            },
            { 
                label: 'card', 
                value: tone_card_hex, 
                bg: tone_card_hex, 
                color: toneText 
            },
            { 
                label: 'text', 
                value: toneText, 
                bg: tone_card_hex, 
                color: toneText, 
                isText: true 
            },
            { 
                label: 'text-muted', 
                value: toneTextMuted, 
                bg: tone_card_hex, 
                color: toneTextMuted, 
                isText: true 
            },
        ];
    });

    // Accent — current theme
    const accent_swatches = $derived(
        buildSemanticSwatches(accent_hex, is_dark, $selected_tone_palette.card, $selected_tone_palette.bg)
    );
    // Accent — opposite theme
    const accent_opposite_swatches = $derived.by((): Swatch[] | null => {
        if (!opposite_theme) return null;
        const oppIsDark = opposite_tone === 'dark';
        return buildSemanticSwatches(accent_hex, oppIsDark, opposite_theme.card, opposite_theme.bg);
    });

    // Ctx — current theme
    const ctx_swatches = $derived(
        buildSemanticSwatches(ctx_hexes[ctx_field], is_dark, $selected_tone_palette.card, $selected_tone_palette.bg)
    );
    // Ctx — opposite theme
    const ctx_opposite_swatches = $derived.by((): Swatch[] | null => {
        if (!opposite_theme) return null;
        const oppIsDark = opposite_tone === 'dark';
        return buildSemanticSwatches(ctx_hexes[ctx_field], oppIsDark, opposite_theme.card, opposite_theme.bg);
    });

    // Text swatches
    const text_swatches = $derived.by((): Swatch[] => {
        const bgHex = text_is_dark ? $selected_tone_palette.bg : (opposite_theme?.bg ?? all_light_palettes[0].bg);
        const cardHex = text_is_dark ? $selected_tone_palette.card : (opposite_theme?.card ?? all_light_palettes[0].card);
        const muted = computeMuted(text_hex, cardHex);
        return [
            { 
                label: 'text', 
                value: text_hex, 
                bg: bgHex, 
                color: text_hex, 
                isText: true 
            },
            { 
                label: 'text', 
                value: text_hex, 
                bg: cardHex, 
                color: text_hex, 
                isText: true 
            },
            { 
                label: 'text-muted', 
                value: muted, 
                bg: cardHex, 
                color: muted, 
                isText: true 
            },
            { 
                label: 'text-muted', 
                value: muted, 
                bg: bgHex, 
                color: muted, 
                isText: true 
            },
        ];
    });

    // ── Assign handler ───────────────────────────────────────────────────────────

    function customIndexInMerged<T>(slots: (T | null)[], slotIdx: number, baseCount: number): number {
        let pos = 0;
        for (let i = 0; i < slotIdx; i++) {
            if (slots[i] !== null) pos++;
        }
        return baseCount + pos;
    }

    function handleAssign() {
        const idx = custom_slot;
        switch (active_tab) {
            case 'tone-bg':
            case 'tone-base': {
                const entry: CustomTone = { name: `Custom ${idx + 1}`, bg: tone_bg_hex, card: tone_card_hex };
                const store = tone_mode === 'dark' ? custom_tone_dark : custom_tone_light;
                const slots = [...get(store)] as CustomSlots<CustomTone>;
                slots[idx] = entry;
                store.set(slots);
                const baseCount = tone_mode === 'dark' ? base_tone_dark_count : base_tone_light_count;
                $selected_tone = tone_mode;
                setToneIndex(customIndexInMerged(slots, idx, baseCount));
                break;
            }
            case 'accent': {
                const entry: CustomAccent = { name: `Custom ${idx + 1}`, accent: accent_hex };
                const slots = [...get(custom_accent)] as CustomSlots<CustomAccent>;
                slots[idx] = entry;
                custom_accent.set(slots);
                $accent_index = customIndexInMerged(slots, idx, base_accent_count);
                break;
            }
            case 'ctx': {
                const entry: CustomCtx = { name: `Custom ${idx + 1}`, ...ctx_hexes };
                const slots = [...get(custom_ctx)] as CustomSlots<CustomCtx>;
                slots[idx] = entry;
                custom_ctx.set(slots);
                $ctx_index = customIndexInMerged(slots, idx, base_ctx_count);
                break;
            }
            case 'text': {
                const light = text_is_dark ? text_hex : $selected_text.light;
                const dark = text_is_dark ? $selected_text.dark : text_hex;
                const entry: CustomText = { name: `Custom ${idx + 1}`, light, dark };
                const slots = [...get(custom_text)] as CustomSlots<CustomText>;
                slots[idx] = entry;
                custom_text.set(slots);
                $text_index = customIndexInMerged(slots, idx, base_text_count);
                break;
            }
        }
    }

    const CTX_FIELDS: { key: CtxField; label: string }[] = [
        { key: 'error', label: 'Error' },
        { key: 'warning', label: 'Warning' },
        { key: 'success', label: 'Success' },
        { key: 'info', label: 'Info' },
        { key: 'neutral', label: 'Neutral' },
    ];
</script>

<svelte:head>
    <title>Customizer - Spektral UI</title>
</svelte:head>

<!-- Shared snippets ────────────────────────────────────────────── -->

{#snippet header_tabs()}
    <div class="picker-tabs">
        <Button 
            variant="ghost" 
            palette="tone"
            size="md" 
            rounded
            active={active_tab === 'tone-bg'} 
            onclick={() => active_tab = 'tone-bg'}
        >
            {$trans?.palette_creator.tone_bg}
        </Button>
        <Button 
            variant="ghost" 
            palette="tone"
            size="md" 
            rounded
            active={active_tab === 'tone-base'} 
            onclick={() => active_tab = 'tone-base'}
        >
            {$trans?.palette_creator.tone_base}
        </Button>
        <Button 
            variant="ghost" 
            palette="tone"
            size="md" 
            rounded
            active={active_tab === 'accent'} 
            onclick={() => active_tab = 'accent'}
        >
            {$trans?.palette_creator.accent}
        </Button>
        <Button 
            variant="ghost" 
            palette="tone"
            size="md" 
            rounded
            active={active_tab === 'ctx'} 
            onclick={() => active_tab = 'ctx'}
        >
            {$trans?.palette_creator.ctx}
        </Button>
        <Button 
            variant="ghost" 
            palette="tone"
            size="md" 
            rounded
            active={active_tab === 'text'} 
            onclick={() => active_tab = 'text'}
        >
            {$trans?.palette_creator.text}
        </Button>
    </div>
{/snippet}

{#snippet save_footer()}
    <div class="picker-footer">
        <select class="slot-select" bind:value={custom_slot}>
            <option value={0}>Slot 1</option>
            <option value={1}>Slot 2</option>
            <option value={2}>Slot 3</option>
        </select>
        <Button variant="ghost" palette="accent" size="sm" onclick={handleAssign}>Save</Button>
        <span class="footer-divider"></span>
        <span class="footer-hint">{$trans?.palette_creator.slot_hint}</span>
    </div>
{/snippet}

{#snippet leading_light()}
    <span class="material-symbols-outlined">light_mode</span>
{/snippet}

{#snippet trailing_dark()}
    <span class="material-symbols-outlined">dark_mode</span>
{/snippet}

{#snippet leading_txt_light()}
    <span>{$trans?.palette_creator.light_text}</span>
{/snippet}

{#snippet trailing_txt_dark()}
    <span>{$trans?.palette_creator.dark_text}</span>
{/snippet}

<div class="content">

    <Headline size="md" uppercase>
        {$trans?.palette_creator.title}
    </Headline>

    <!-- Tabbed ColorPicker ─────────────────────────────────────────── -->

    {#if active_tab === 'tone-bg'}
        <ColorPicker
            value={tone_bg_hex}
            mode="full"
            alpha={false}
            onchange={(hex) => { tone_bg_hex = hex; }}
        >
            {#snippet leading()}
                {@render header_tabs()}
            {/snippet}
            {#snippet extra()}
                <div class="picker-toggles">
                    <Switch 
                        bind:checked={tone_dark_mode} 
                        size="md" 
                        palette="tone"
                        leading={leading_light}
                        trailing={trailing_dark}
                    />
                </div>
                <SwatchRow swatches={tone_swatches} />
            {/snippet}
            {#snippet trailing()}
                {@render save_footer()}
            {/snippet}
        </ColorPicker>

    {:else if active_tab === 'tone-base'}
        <ColorPicker
            value={tone_card_hex}
            mode="full"
            alpha={false}
            onchange={(hex) => { tone_card_hex = hex; }}
        >
            {#snippet leading()}
                {@render header_tabs()}
            {/snippet}
            {#snippet extra()}
                <div class="picker-toggles">
                    <Switch 
                        bind:checked={tone_dark_mode} 
                        size="md" 
                        palette="tone"
                        leading={leading_light}
                        trailing={trailing_dark}
                    />
                </div>
                <SwatchRow swatches={tone_swatches} />
            {/snippet}
            {#snippet trailing()}
                {@render save_footer()}
            {/snippet}
        </ColorPicker>

    {:else if active_tab === 'accent'}
        <ColorPicker
            value={accent_hex}
            mode="full"
            alpha={true}
            onchange={(hex) => { accent_hex = hex; }}
        >
            {#snippet leading()}
                {@render header_tabs()}
            {/snippet}
            {#snippet extra()}
                <SwatchRow swatches={accent_swatches} />
                {#if accent_opposite_swatches}
                    <span class="swatch-label">{opposite_theme?.name ?? 'Opposite'}</span>
                    <SwatchRow swatches={accent_opposite_swatches} />
                {/if}
            {/snippet}
            {#snippet trailing()}
                {@render save_footer()}
            {/snippet}
        </ColorPicker>

    {:else if active_tab === 'ctx'}
        <ColorPicker
            value={ctx_hexes[ctx_field]}
            mode="full"
            alpha={true}
            onchange={(hex) => { ctx_hexes[ctx_field] = hex; }}
        >
            {#snippet leading()}
                {@render header_tabs()}
            {/snippet}
            {#snippet extra()}
                <div class="picker-toggles">
                    <select class="ctx-select" bind:value={ctx_field}>
                        {#each CTX_FIELDS as f}
                            <option value={f.key}>{f.label}</option>
                        {/each}
                    </select>
                </div>
                <SwatchRow swatches={ctx_swatches} />
                {#if ctx_opposite_swatches}
                    <span class="swatch-label">{opposite_theme?.name ?? 'Opposite'}</span>
                    <SwatchRow swatches={ctx_opposite_swatches} />
                {/if}
            {/snippet}
            {#snippet trailing()}
                {@render save_footer()}
            {/snippet}
        </ColorPicker>

    {:else if active_tab === 'text'}
        <ColorPicker
            value={text_hex}
            mode="achromatic"
            alpha={false}
            onchange={(hex) => { text_hex = hex; }}
        >
            {#snippet leading()}
                {@render header_tabs()}
            {/snippet}
            {#snippet extra()}
                <div class="picker-toggles">
                    <Switch
                        bind:checked={text_dark_mode}
                        size="md"
                        palette="tone"
                        leading={leading_txt_light}
                        trailing={trailing_txt_dark}
                    />
                </div>
                <SwatchRow swatches={text_swatches} />
            {/snippet}
            {#snippet trailing()}
                {@render save_footer()}
            {/snippet}
        </ColorPicker>
    {/if}

    <!-- Shared theme selector -->
    <div class="theme-selector-row">
        <div class="theme-selector-col">
            <div class="select-like">{$selected_tone_palette.name}</div>
        </div>
        <div class="theme-selector-col">
            <select class="opposite-select" bind:value={opposite_index}>
                <option value={-1}>{$trans?.contrast.opposite_none ?? 'None'}</option>
                {#each opposite_palettes as palette, i}
                    <option value={i}>{palette.name}</option>
                {/each}
            </select>
        </div>
    </div>

    <Headline size="md" uppercase>
        {$trans?.palette.title}
    </Headline>

    <ThemeSwatches
        current_palette={$selected_tone_palette}
        current_tokens={tokens}
        opposite_palette={opposite_theme}
        opposite_tokens={opposite_tokens}
    />

    <Headline size="md" uppercase>
        {$trans?.contrast.title}
    </Headline>

    <Contrast
        trans={$trans}
        selected_tone_palette={$selected_tone_palette}
        selected_accent={$selected_accent}
        selected_ctx={$selected_ctx}
        selected_text={$selected_text}
        selected_tone={$selected_tone}
        {opposite_theme}
        {opposite_tokens}
    />

    <Headline size="md" uppercase>
        {$trans?.colorblind.title}
    </Headline>

    <Colorblind
        trans={$trans}
        selected_tone_palette={$selected_tone_palette}
        selected_accent={$selected_accent}
        selected_ctx={$selected_ctx}
        selected_text={$selected_text}
        tone_hover={tokens['--spk-tone-hover']}
        text_color={text_color}
    />
</div>

<style>
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 10px 40px 40px;
    }

    .picker-tabs {
        display: flex;
        gap: 20px;
        padding: 10px 20px;
    }

    @media (max-width: 1024px) {
        .picker-tabs {
            flex-wrap: wrap;
            gap: 8px;
        }
    }

    .picker-toggles {
        display: flex;
        gap: 8px;
        align-items: center;
        margin: 12px 4px;
    }

    .swatch-label {
        display: block;
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--spk-text-muted);
        margin-top: 6px;
        margin-bottom: 2px;
    }

    .picker-footer {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .footer-divider {
        width: 1px;
        align-self: stretch;
        background: var(--spk-tone-hover);
        margin: 0 4px;
    }

    .footer-hint {
        font-size: 11px;
        color: var(--spk-text-muted);
        line-height: 1.3;
    }

    .slot-select,
    .ctx-select {
        padding: 4px 8px;
        border: 1px solid var(--spk-tone-hover);
        background: var(--spk-tone-bg);
        color: var(--spk-text);
        border-radius: 4px;
        font-size: 13px;
    }

    .theme-selector-row {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
    }

    .theme-selector-col {
        flex: 1;
    }

    .opposite-select,
    .select-like {
        padding: 8px 12px;
        border: 2px solid var(--spk-tone-hover);
        background: var(--spk-tone-bg);
        color: var(--spk-text);
        border-radius: 6px;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
    }

    .opposite-select:focus {
        outline: none;
        border-color: var(--spk-accent);
    }

    @media (max-width: 1024px) {
        .theme-selector-row {
            flex-direction: column;
        }
    }

    @media (max-width: 768px) {
        .content {
            padding: 10px 20px 40px;
        }
    }
</style>
