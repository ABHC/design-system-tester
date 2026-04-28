<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { ToneTheme, CustomTone } from "$lib/types/palettes";
    import palettes from "$lib/data/palettes.json";
    import {
        Headline,
        Callout,
        DataTable,
    } from "@abhc/spektral-ui";
    import {
        selected_accent,
        selected_ctx,
        selected_text,
        selected_body_font,
        selected_title_font,
        tone_index_dark,
        tone_index_light,
        custom_tone_dark,
        custom_tone_light,
        shadow_opacity,
    } from "../store";
    import { tokenValues } from "$lib/theme/tokenSchema";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans }: Props = $props();

    // Resolve per-mode tone palette (built-in + custom) ------------------

    function resolve_tone(
        mode: "light" | "dark",
        custom_slots: (CustomTone | null)[],
        idx: number,
    ): ToneTheme {
        const base = (palettes[mode] as ToneTheme[]).filter((t) => t.display);
        const customs = custom_slots
            .filter((s): s is CustomTone => s !== null)
            .map((c) => ({ ...c, display: true } as ToneTheme));
        const list = [...base, ...customs];
        return list[idx] ?? list[0];
    }

    const light_tone = $derived(resolve_tone("light", $custom_tone_light, $tone_index_light));
    const dark_tone  = $derived(resolve_tone("dark",  $custom_tone_dark,  $tone_index_dark));

    // Compute live tokens for both themes -------------------------------

    const semantic = $derived({
        accent: $selected_accent.accent,
        error: $selected_ctx.error,
        warning: $selected_ctx.warning,
        success: $selected_ctx.success,
        info: $selected_ctx.info,
        neutral: $selected_ctx.neutral,
    });

    const typography = $derived({
        body: `'${$selected_body_font.family}', sans-serif`,
        heading: `'${$selected_title_font.family}', sans-serif`,
    });

    const text_palette = $derived({
        light: $selected_text.light,
        dark: $selected_text.dark,
    });

    const light_tokens = $derived(tokenValues({
        mode: "light",
        tone: { bg: light_tone.bg, card: light_tone.card },
        semantic,
        typography,
        text_palette,
        shadow_opacity,
    }));

    const dark_tokens = $derived(tokenValues({
        mode: "dark",
        tone: { bg: dark_tone.bg, card: dark_tone.card },
        semantic,
        typography,
        text_palette,
        shadow_opacity,
    }));

    // Static tokens (never change with theme) ---------------------------

    const radius = [
        { token: "--spk-radius-edge", value: "4px" },
        { token: "--spk-radius-soft", value: "8px" },
        { token: "--spk-radius-round", value: "12px" },
        { token: "--spk-radius-pill", value: "999px" },
        { token: "--spk-radius-circle", value: "50%" },
    ];

    const z_index = [
        { token: "--spk-z-behind", value: "-1" },
        { token: "--spk-z-floating", value: "100" },
        { token: "--spk-z-sticky", value: "200" },
        { token: "--spk-z-panel", value: "300" },
        { token: "--spk-z-dialog", value: "400" },
        { token: "--spk-z-notification", value: "1000" },
    ];

    const motion = [
        { token: "--spk-duration-quick", value: "0.15s" },
        { token: "--spk-duration-base", value: "0.2s" },
        { token: "--spk-duration-slow", value: "0.3s" },
        { token: "--spk-ease-out", value: "ease-out" },
        { token: "--spk-ease-glide", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
    ];

    const elevation = [
        { token: "--spk-elevation-subtle", value: "0 4px 12px" },
        { token: "--spk-elevation-hard", value: "0.3rem 0.3rem" },
    ];

    const border = [
        { token: "--spk-border", value: "2px" },
        { token: "--spk-border-thin", value: "1px" },
        { token: "--spk-border-accent", value: "4px" },
    ];

    const opacity = [
        { token: "--spk-opacity-disabled", value: "0.5" },
        { token: "--spk-opacity-faded", value: "0.6" },
        { token: "--spk-opacity-muted", value: "0.7" },
        { token: "--spk-opacity-overlay", value: "0.85" },
    ];

    const focus = [
        { token: "--spk-focus-ring", value: "var(--spk-text)" },
        { token: "--spk-focus-ring-width", value: "2px" },
        { token: "--spk-focus-ring-offset", value: "2px" },
    ];

    const typography_static = $derived([
        { token: "--spk-font-body", value: typography.body },
        { token: "--spk-font-heading", value: typography.heading },
    ]);

    const shadow_root = [
        { token: "--spk-shadow-subtle", value: "rgba(0, 0, 0, 0.2)" },
    ];

    // Themed token groups (keys read from live light/dark token maps) ---

    function themed_rows(keys: string[]) {
        return keys.map((token) => ({
            token,
            light: light_tokens[token] ?? "",
            dark: dark_tokens[token] ?? "",
        }));
    }

    const tone_keys = [
        "--spk-tone-bg", 
        "--spk-tone", 
        "--spk-tone-hover",
        "--spk-tone-muted", 
        "--spk-tone-ghost", 
        "--spk-tone-ghost-hover",
    ];
    const accent_keys = [
        "--spk-accent", 
        "--spk-accent-hover", 
        "--spk-accent-bg",
        "--spk-accent-ghost-hover", 
        "--spk-accent-muted", 
        "--spk-text-accent",
    ];
    const error_keys = [
        "--spk-error", 
        "--spk-error-hover", 
        "--spk-error-bg",
        "--spk-error-ghost-hover", 
        "--spk-error-muted", 
        "--spk-text-error",
    ];
    const warning_keys = [
        "--spk-warning", 
        "--spk-warning-hover", 
        "--spk-warning-bg",
        "--spk-warning-ghost-hover", 
        "--spk-warning-muted", 
        "--spk-text-warning",
    ];
    const success_keys = [
        "--spk-success", 
        "--spk-success-hover", 
        "--spk-success-bg",
        "--spk-success-ghost-hover", 
        "--spk-success-muted", 
        "--spk-text-success",
    ];
    const info_keys = [
        "--spk-info", 
        "--spk-info-hover", 
        "--spk-info-bg",
        "--spk-info-ghost-hover", 
        "--spk-info-muted", 
        "--spk-text-info",
    ];
    const neutral_keys = [
        "--spk-neutral", 
        "--spk-neutral-hover", 
        "--spk-neutral-bg",
        "--spk-neutral-ghost-hover", 
        "--spk-neutral-muted", 
        "--spk-text-neutral",
    ];
    const text_keys = [
        "--spk-text", 
        "--spk-text-light", 
        "--spk-text-dark", 
        "--spk-text-muted",
    ];
    const shadow_themed_keys = [
        "--spk-shadow-hard", 
        "--spk-muted-shadow",
    ];

    const tone_rows = $derived(themed_rows(tone_keys));
    const accent_rows = $derived(themed_rows(accent_keys));
    const error_rows = $derived(themed_rows(error_keys));
    const warning_rows = $derived(themed_rows(warning_keys));
    const success_rows = $derived(themed_rows(success_keys));
    const info_rows = $derived(themed_rows(info_keys));
    const neutral_rows = $derived(themed_rows(neutral_keys));
    const text_rows = $derived(themed_rows(text_keys));
    const shadow_rows = $derived(themed_rows(shadow_themed_keys));

    // Color preview detection -------------------------------------------

    function is_color(v: string): boolean {
        if (!v) return false;
        if (/^#[0-9a-f]{3,8}$/i.test(v)) return true;
        if (/^rgba?\(/i.test(v)) return true;
        if (/^hsla?\(/i.test(v)) return true;
        if (v === "var(--spk-text)") return true;
        return false;
    }

    // Column shapes -----------------------------------------------------

    const cols_static = [
        { key: "token", label: "Token", cell: tokenCell },
        { key: "value", label: "Value", width: "25%", cell: valueCell },
    ];

    const cols_themed = [
        { key: "token", label: "Token", cell: tokenCell },
        { key: "light", label: "Light", cell: valueCell },
        { key: "dark",  label: "Dark", width: "25%", cell: valueCell },
    ];
</script>

{#snippet tokenCell(value: string)}<code class="token-name">{value}</code>{/snippet}

{#snippet valueCell(value: string)}
    <span class="value-cell">
        {#if is_color(value)}
            <span class="swatch" style:background={value} aria-hidden="true"></span>
        {/if}
        <code>{value}</code>
    </span>
{/snippet}

<!-- Title --------------------------------------------------------------- -->

<Headline size="md" uppercase>
    {trans?.tokens_demo.title}
</Headline>

<p class="intro">{trans?.tokens_demo.intro}</p>

<div class="callout-wrapper">
    <Callout variant="info">
        {#snippet leading()}
            <span class="material-symbols-outlined">lightbulb</span>
        {/snippet}
        {#snippet children()}
            <strong>{trans?.tokens_demo.callout_title}</strong>
            <p>{trans?.tokens_demo.callout_body}</p>
        {/snippet}
    </Callout>
</div>

<!-- Constants ----------------------------------------------------------- -->

<div data-summary="constants" data-summary-label={trans?.tokens_demo.section_constants}>
    <Headline size="sm" uppercase muted>
        {trans?.tokens_demo.section_constants}
    </Headline>
</div>

<h4 class="group-title">Border radius</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={radius} 
/>

<h4 class="group-title">Z-index</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={z_index} 
/>

<h4 class="group-title">Motion</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={motion} 
/>

<h4 class="group-title">Elevation</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={elevation} 
/>

<h4 class="group-title">Border width</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={border} 
/>

<h4 class="group-title">Opacity</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={opacity} 
/>

<h4 class="group-title">Focus ring</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={focus} 
/>

<h4 class="group-title">Typography</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={typography_static} 
/>

<h4 class="group-title">Shadow</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_static} 
    rows={shadow_root} 
/>

<!-- Theme tokens (reactive) --------------------------------------------- -->

<div data-summary="theme" data-summary-label={trans?.tokens_demo.section_theme}>
    <Headline size="sm" uppercase muted>{trans?.tokens_demo.section_theme}</Headline>
</div>

<h4 class="group-title">Tone surface</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={tone_rows} 
/>

<h4 class="group-title">Accent</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={accent_rows} 
/>

<h4 class="group-title">Error</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={error_rows} 
/>

<h4 class="group-title">Warning</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={warning_rows} 
/>

<h4 class="group-title">Success</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={success_rows} 
/>

<h4 class="group-title">Info</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={info_rows} 
/>

<h4 class="group-title">Neutral</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={neutral_rows} 
/>

<h4 class="group-title">Text</h4>
<DataTable 
    variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={text_rows} 
/>

<h4 class="group-title">Shadow (themed)</h4>
<DataTable variant="ghost" 
    palette="tone" 
    size="sm" 
    columns={cols_themed} 
    rows={shadow_rows} 
/>

<style>
    .intro {
        margin: 0.5rem 0 1rem;
        color: var(--spk-text-muted);
    }

    .callout-wrapper {
        margin-bottom: 1.5rem;
    }

    .group-title {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1.25rem 0 0.5rem;
        color: var(--spk-text-muted);
    }

    :global(.token-name) {
        font-weight: 600;
    }

    :global(.value-cell) {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    :global(.swatch) {
        display: inline-block;
        width: 0.9em;
        height: 0.9em;
        border: 1px solid var(--spk-tone-hover);
        flex-shrink: 0;
    }
</style>
