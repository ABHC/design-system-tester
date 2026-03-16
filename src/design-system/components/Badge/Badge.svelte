<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { badgeConfig } from "./badge.config";

    type Variant = "flat" | "outlined";
    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    /*
        Props _________________________________________________________
        variant : flat | outlined 
        palette : color of the badge
        size : sm | md | lg
        uppercase : Text transform + letter-spacing
        elevation : kind of shadow applied to the badge
        pill : true (default) → border-radius: 20px (capsule)
               false → border-radius: 6px (rounded rectangle)
        href : Renders as <a>
        onclick: Renders as <button>. Implicit — no extra prop needed.
        trailing_icon : Material Symbol name shown after the label
        on_trailing_click : Makes the trailing icon an actionable button
        trailing_icon_label : aria-label for the trailing icon button
        children : Badge label content
    */

    interface Props {
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        uppercase?: boolean;
        elevation?: Elevation;
        pill?: boolean;
        href?: string;
        onclick?: () => void;
        selected?: boolean;
        trailing_icon?: Snippet;
        on_trailing_click?: () => void;
        trailing_icon_label?: string;
        children?: Snippet;
    }

    let {
        variant = "flat",
        palette = "accent",
        size = "md",
        uppercase = false,
        elevation = "none",
        pill = true,
        href = undefined,
        onclick = undefined,
        selected = false,
        trailing_icon = undefined,
        on_trailing_click = undefined,
        trailing_icon_label = undefined,
        children,
    }: Props = $props();

    // Helpers _____________________________________________________________

    const resolve = createVariant(badgeConfig);

    const type_classes = $derived(resolve({ variant, palette, size, uppercase, elevation }));

    const shape_class = $derived(pill ? "badge-pill" : "badge-rect");

    const selected_class = $derived(selected ? "badge-selected" : "");

    const classes = $derived(
        `${type_classes} ${shape_class} ${selected_class}`.trim()
    );

    // Root is interactive when onclick or href is provided (implicit)
    const root_is_button = $derived(!!onclick && !href);

    function handle_trailing(e: MouseEvent) {
        e.stopPropagation();
        on_trailing_click?.();
    }
</script>

<!-- Trailing icon snippet ─────────────────────────────────────────────────── -->

{#snippet trailing()}
    {#if trailing_icon}
        {#if on_trailing_click}
            <button
                class="badge-trailing-btn"
                onclick={handle_trailing}
                tabindex={root_is_button ? -1 : 0}
                aria-label={trailing_icon_label}
                type="button"
            >
                <span class="badge-trailing-icon" aria-hidden="true">
                    {@render trailing_icon()}
                </span>
            </button>
        {:else}
            <span class="badge-trailing-icon" aria-hidden="true">
                {@render trailing_icon()}
            </span>
        {/if}
    {/if}
{/snippet}

<!-- Root element ──────────────────────────────────────────────────────────── -->

{#if href}
    <a {href} class={classes}>
        {@render children?.()}
        {@render trailing()}
    </a>
{:else if onclick}
    <button class={classes} {onclick} type="button" aria-pressed={selected}>
        {@render children?.()}
        {@render trailing()}
    </button>
{:else}
    <span class={classes}>
        {@render children?.()}
        {@render trailing()}
    </span>
{/if}

<style>
    /* Base ─────────────────────────────────────────────────────────────── */

    .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        line-height: 1;
        font-family: var(--font-body);
        text-decoration: none;
        border: 1px solid transparent;
    }

    /* Reset for button/link roots */
    button.badge {
        cursor: pointer;
    }

    a.badge {
        cursor: pointer;
    }

    /* Shape ────────────────────────────────────────────────────────────── */

    .badge-pill { border-radius: 20px; }
    .badge-rect { border-radius: 4px; }

    /* Variants ─────────────────────────────────────────────────────────── */

    .badge-flat {
        font-weight: 600;
    }

    .badge-outlined {
        background: transparent;
    }

    /* Palette ──────────────────────────────────────────────────────────── */

    /* accent */
    .badge-palette-accent.badge-flat {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .badge-palette-accent.badge-outlined {
        border-color: var(--accent-more);
        color: var(--accent-more);
    }

    .badge-palette-accent.badge-ghost {
        color: var(--text-accent);
    }

    /* tone */
    .badge-palette-tone.badge-flat {
        background: var(--card);
        border-color: var(--highlight);
        color: var(--text);
    }

    .badge-palette-tone.badge-outlined {
        border-color: var(--highlight);
        color: var(--text-muted);
    }

    .badge-palette-tone.badge-ghost {
        color: var(--text);
    }

    /* error */
    .badge-palette-error.badge-flat {
        background: var(--ctx-error-blend);
        color: var(--text);
    }

    .badge-palette-error.badge-outlined {
        border-color: var(--ctx-error);
        color: var(--ctx-error);
    }

    .badge-palette-error.badge-ghost {
        color: var(--ctx-error);
    }

    /* warning */
    .badge-palette-warning.badge-flat {
        background: var(--ctx-warning-blend);
        color: var(--text);
    }

    .badge-palette-warning.badge-outlined {
        border-color: var(--ctx-warning);
        color: var(--ctx-warning);
    }

    .badge-palette-warning.badge-ghost {
        color: var(--ctx-warning);
    }

    /* success */
    .badge-palette-success.badge-flat {
        background: var(--ctx-success-blend);
        color: var(--text);
    }

    .badge-palette-success.badge-outlined {
        border-color: var(--ctx-success);
        color: var(--ctx-success);
    }

    .badge-palette-success.badge-ghost {
        color: var(--ctx-success);
    }

    /* info */
    .badge-palette-info.badge-flat {
        background: var(--ctx-info-blend);
        color: var(--text);
    }

    .badge-palette-info.badge-outlined {
        border-color: var(--ctx-info);
        color: var(--ctx-info);
    }

    .badge-palette-info.badge-ghost {
        color: var(--ctx-info);
    }

    /* Elevation ─────────────────────────────────────────────────────────── */

    .badge-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .badge-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow);
    }

    /* Uppercase ────────────────────────────────────────────────────────── */

    .badge-uppercase {
        font-size: .875rem;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    /* Sizes ────────────────────────────────────────────────────────────── */

    .badge-lg {
        font-size: 1.125rem;
        font-weight: 700;
        padding: 0.65rem 1.3rem;
    }

    .badge-md {
        padding: 0.45rem 0.9rem;
    }

    .badge-sm {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }

    /* Hover — interactive roots only ──────────────────────────────────── */

    /* accent */
    button.badge-flat.badge-palette-accent:hover,
    a.badge-flat.badge-palette-accent:hover {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
    }

    button.badge-outlined.badge-palette-accent:hover,
    a.badge-outlined.badge-palette-accent:hover {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    /* Tone */
    button.badge-flat.badge-palette-tone:hover,
    a.badge-flat.badge-palette-tone:hover {
        background: var(--highlight);
    }

    button.badge-outlined.badge-palette-tone:hover,
    a.badge-outlined.badge-palette-tone:hover {
        border-color: var(--accent);
        color: var(--accent);
    }

    /* Error */
    button.badge-flat.badge-palette-error:hover,
    a.badge-flat.badge-palette-error:hover {
        background: color-mix(in srgb, var(--ctx-error) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-error:hover,
    a.badge-outlined.badge-palette-error:hover {
        background: var(--ctx-error);
        color: var(--text-accent);
    }

    /* Warning */
    button.badge-flat.badge-palette-warning:hover,
    a.badge-flat.badge-palette-warning:hover {
        background: color-mix(in srgb, var(--ctx-warning) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-warning:hover,
    a.badge-outlined.badge-palette-warning:hover {
        background: var(--ctx-warning);
        color: var(--text-accent);
    }

    /* Success */
    button.badge-flat.badge-palette-success:hover,
    a.badge-flat.badge-palette-success:hover {
        background: color-mix(in srgb, var(--ctx-success) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-success:hover,
    a.badge-outlined.badge-palette-success:hover {
        background: var(--ctx-success);
        color: var(--text-accent);
    }

    /* Info */
    button.badge-flat.badge-palette-info:hover,
    a.badge-flat.badge-palette-info:hover {
        background: color-mix(in srgb, var(--ctx-info) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-info:hover,
    a.badge-outlined.badge-palette-info:hover {
        background: var(--ctx-info);
        color: var(--text-accent);
    }

    /* Selected — mirrors hover styles ──────────────────────────────────── */

    /* accent */
    button.badge-flat.badge-palette-accent.badge-selected,
    a.badge-flat.badge-palette-accent.badge-selected {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
    }

    button.badge-outlined.badge-palette-accent.badge-selected,
    a.badge-outlined.badge-palette-accent.badge-selected {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    /* Tone */
    button.badge-flat.badge-palette-tone.badge-selected,
    a.badge-flat.badge-palette-tone.badge-selected {
        background: var(--highlight);
    }

    button.badge-outlined.badge-palette-tone.badge-selected,
    a.badge-outlined.badge-palette-tone.badge-selected {
        border-color: var(--accent);
        color: var(--accent);
    }

    /* Error */
    button.badge-flat.badge-palette-error.badge-selected,
    a.badge-flat.badge-palette-error.badge-selected {
        background: color-mix(in srgb, var(--ctx-error) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-error.badge-selected,
    a.badge-outlined.badge-palette-error.badge-selected {
        background: var(--ctx-error);
        color: var(--text-accent);
    }

    /* Warning */
    button.badge-flat.badge-palette-warning.badge-selected,
    a.badge-flat.badge-palette-warning:hover {
        background: color-mix(in srgb, var(--ctx-warning) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-warning.badge-selected,
    a.badge-outlined.badge-palette-warning.badge-selected {
        background: var(--ctx-warning);
        color: var(--text-accent);
    }

    /* Success */
    button.badge-flat.badge-palette-success.badge-selected,
    a.badge-flat.badge-palette-success.badge-selected {
        background: color-mix(in srgb, var(--ctx-success) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-success.badge-selected,
    a.badge-outlined.badge-palette-success.badge-selected {
        background: var(--ctx-success);
        color: var(--text-accent);
    }

    /* Info */
    button.badge-flat.badge-palette-info.badge-selected,
    a.badge-flat.badge-palette-info.badge-selected {
        background: color-mix(in srgb, var(--ctx-info) 60%, var(--highlight));
    }

    button.badge-outlined.badge-palette-info.badge-selected,
    a.badge-outlined.badge-palette-info.badge-selected {
        background: var(--ctx-info);
        color: var(--text-accent);
    }

    /* Contextuals ──────────────────────────────────────────────────────── */

    .badge-ctx {
        font-weight: 600;
        color: var(--text);
        border: 2px solid transparent;
    }

    .badge-ctx-error   { background: var(--ctx-error-blend); }
    .badge-ctx-warning { background: var(--ctx-warning-blend); }
    .badge-ctx-success { background: var(--ctx-success-blend); }
    .badge-ctx-info    { background: var(--ctx-info-blend); }

    /* Trailing icon ────────────────────────────────────────────────────── */

    .badge-trailing-icon {
        display: inline-flex;
        align-items: center;
        line-height: 1;
    }

    .badge-trailing-icon :global(*) {
        font-size: 1em;
        line-height: 1;
    }

    .badge-trailing-btn {
        display: inline-flex;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        transition: opacity 0.15s ease;
        /*font-family: inherit;*/
    }

    .badge-trailing-btn:hover {
        opacity: 1;
    }
</style>
