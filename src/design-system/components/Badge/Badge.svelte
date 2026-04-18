<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { badgeConfig } from "./badge.config";

    type Variant = "flat" | "outlined";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    /*
        Props _________________________________________________________
        variant : flat | outlined 
        palette : color of the badge
        size : sm | md | lg
        uppercase : Text transform + letter-spacing
        elevation : kind of shadow applied to the badge
        pill : true (default) → capsule shape
               false → rounded rectangle
        href : Renders as <a>
        onclick: Renders as <button>. Implicit - no extra prop needed.
        trailing : trailing slot for icons or other content
        on_trailing_click : Makes the trailing icon an actionable button
        trailing_label : aria-label for the trailing slot
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
        trailing?: Snippet;
        on_trailing_click?: () => void;
        trailing_label?: string;
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
        trailing = undefined,
        on_trailing_click = undefined,
        trailing_label = undefined,
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

<!-- Trailing icon snippet --------------------------------------------------- -->

{#snippet trailing_slot()}
    {#if trailing}
        {#if on_trailing_click}
            <button
                class="badge-trailing-btn"
                onclick={handle_trailing}
                tabindex={root_is_button ? -1 : 0}
                aria-label={trailing_label}
                type="button"
            >
                <span class="badge-trailing-icon" aria-hidden="true">
                    {@render trailing()}
                </span>
            </button>
        {:else}
            <span class="badge-trailing-icon" aria-hidden="true">
                {@render trailing()}
            </span>
        {/if}
    {/if}
{/snippet}

<!-- Root element ------------------------------------------------------------ -->

{#if href}
    <a {href} class={classes}>
        {@render children?.()}
        {@render trailing_slot()}
    </a>
{:else if onclick}
    <button class={classes} {onclick} type="button" aria-pressed={selected}>
        {@render children?.()}
        {@render trailing_slot()}
    </button>
{:else}
    <span class={classes}>
        {@render children?.()}
        {@render trailing_slot()}
    </span>
{/if}

<style>
    /* Base --------------------------------------------------------------- */

    .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        line-height: 1;
        font-family: var(--font-body);
        text-decoration: none;
        border: 2px solid transparent;
    }

    /* Reset for button/link roots */
    button.badge {
        cursor: pointer;
    }

    a.badge {
        cursor: pointer;
    }

    /* Shape -------------------------------------------------------------- */

    .badge-pill { border-radius: var(--radius-pill); }
    .badge-rect { border-radius: var(--radius-edge); }

    /* Variants ----------------------------------------------------------- */

    .badge-flat {
        font-weight: 600;
    }

    .badge-outlined {
        background: transparent;
    }

    /* Palette ------------------------------------------------------------ */

    /* accent */
    .badge-palette-accent.badge-flat {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .badge-palette-accent.badge-outlined {
        border-color: var(--accent-muted);
        color: var(--accent-muted);
    }

    /* tone */
    .badge-palette-tone.badge-flat {
        background: var(--tone);
        border-color: var(--tone);
        color: var(--text);
    }

    .badge-palette-tone.badge-outlined {
        border-color: var(--tone-muted);
        color: var(--text-muted);
    }

    /* error */
    .badge-palette-error.badge-flat {
        background: var(--error);
        border-color: var(--error);
        color: var(--text-error);
    }

    .badge-palette-error.badge-outlined {
        border-color: var(--error-muted);
        color: var(--error-muted);
    }

    /* warning */
    .badge-palette-warning.badge-flat {
        background: var(--warning);
        border-color: var(--warning);
        color: var(--text-warning);
    }

    .badge-palette-warning.badge-outlined {
        border-color: var(--warning-muted);
        color: var(--warning-muted);
    }

    /* success */
    .badge-palette-success.badge-flat {
        background: var(--success);
        border-color: var(--success);
        color: var(--text-success);
    }

    .badge-palette-success.badge-outlined {
        border-color: var(--success-muted);
        color: var(--success-muted);
    }

    /* info */
    .badge-palette-info.badge-flat {
        background: var(--info);
        border-color: var(--info);
        color: var(--text-info);
    }

    .badge-palette-info.badge-outlined {
        border-color: var(--info-muted);
        color: var(--info-muted);
    }

    /* neutral */
    .badge-palette-neutral.badge-flat {
        background: var(--neutral);
        border-color: var(--neutral);
        color: var(--text-neutral);
    }

    .badge-palette-neutral.badge-outlined {
        border-color: var(--neutral-muted);
        color: var(--neutral-muted);
    }

    /* Elevation ----------------------------------------------------------- */

    .badge-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .badge-elevation-hard {
        box-shadow: 0.3rem 0.3rem var(--shadow-hard);
    }

    /* Uppercase ---------------------------------------------------------- */

    .badge-uppercase {
        font-size: .875rem;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    /* Sizes -------------------------------------------------------------- */

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

    /* Hover - interactive roots only ------------------------------------ */

    /* accent */
    button.badge-flat.badge-palette-accent:hover,
    a.badge-flat.badge-palette-accent:hover {
        /*background: var(--accent-hover);*/
        background: var(--accent-hover);
        border-color: var(--accent-hover);
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
        background: var(--tone-hover);
        border-color: var(--tone-hover);
    }

    button.badge-outlined.badge-palette-tone:hover,
    a.badge-outlined.badge-palette-tone:hover {
        background: var(--tone-hover);
        border-color: var(--tone-hover);
        color: var(--text);
    }

    /* Error */
    button.badge-flat.badge-palette-error:hover,
    a.badge-flat.badge-palette-error:hover {
        background: var(--error-hover);
        border-color: var(--error-hover);
    }

    button.badge-outlined.badge-palette-error:hover,
    a.badge-outlined.badge-palette-error:hover {
        background: var(--error);
        border-color: var(--error);
        color: var(--text-error);
    }

    /* Warning */
    button.badge-flat.badge-palette-warning:hover,
    a.badge-flat.badge-palette-warning:hover {
        background: var(--warning-hover);
        border-color: var(--warning-hover);
    }

    button.badge-outlined.badge-palette-warning:hover,
    a.badge-outlined.badge-palette-warning:hover {
        background: var(--warning);
        border-color: var(--warning);
        color: var(--text-warning);
    }

    /* Success */
    button.badge-flat.badge-palette-success:hover,
    a.badge-flat.badge-palette-success:hover {
        background: var(--success-hover);
        border-color: var(--success-hover);
    }

    button.badge-outlined.badge-palette-success:hover,
    a.badge-outlined.badge-palette-success:hover {
        background: var(--success);
        border-color: var(--success);
        color: var(--text-success);
    }

    /* Info */
    button.badge-flat.badge-palette-info:hover,
    a.badge-flat.badge-palette-info:hover {
        background: var(--info-hover);
        border-color: var(--info-hover);
    }

    button.badge-outlined.badge-palette-info:hover,
    a.badge-outlined.badge-palette-info:hover {
        background: var(--info);
        border-color: var(--info);
        color: var(--text-info);
    }

    /* Neutral */
    button.badge-flat.badge-palette-neutral:hover,
    a.badge-flat.badge-palette-neutral:hover {
        background: var(--neutral-hover);
        border-color: var(--neutral-hover);
    }

    button.badge-outlined.badge-palette-neutral:hover,
    a.badge-outlined.badge-palette-neutral:hover {
        background: var(--neutral);
        border-color: var(--neutral);
        color: var(--text-neutral);
    }

    /* Selected - mirrors hover styles ------------------------------------ */

    /* accent */
    button.badge-flat.badge-palette-accent.badge-selected,
    a.badge-flat.badge-palette-accent.badge-selected {
        background: var(--accent-hover);
        border-color: var(--accent-muted);
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
        background: var(--tone-hover);
        border-color: var(--tone-muted);
    }

    button.badge-outlined.badge-palette-tone.badge-selected,
    a.badge-outlined.badge-palette-tone.badge-selected {
        background: var(--tone-hover);
        border-color: var(--accent);
        color: var(--text);
    }

    /* Error */
    button.badge-flat.badge-palette-error.badge-selected,
    a.badge-flat.badge-palette-error.badge-selected {
        background: var(--error-hover);
        border-color: var(--error-muted);
    }

    button.badge-outlined.badge-palette-error.badge-selected,
    a.badge-outlined.badge-palette-error.badge-selected {
        background: var(--error);
        border-color: var(--error);
        color: var(--text-error);
    }

    /* Warning */
    button.badge-flat.badge-palette-warning.badge-selected,
    a.badge-flat.badge-palette-warning.badge-selected {
        background: var(--warning-hover);
        border-color: var(--warning-muted);
    }

    button.badge-outlined.badge-palette-warning.badge-selected,
    a.badge-outlined.badge-palette-warning.badge-selected {
        background: var(--warning);
        border-color: var(--warning);
        color: var(--text-warning);
    }

    /* Success */
    button.badge-flat.badge-palette-success.badge-selected,
    a.badge-flat.badge-palette-success.badge-selected {
        background: var(--success-hover);
        border-color: var(--success-muted);
    }

    button.badge-outlined.badge-palette-success.badge-selected,
    a.badge-outlined.badge-palette-success.badge-selected {
        background: var(--success);
        border-color: var(--success);
        color: var(--text-success);
    }

    /* Info */
    button.badge-flat.badge-palette-info.badge-selected,
    a.badge-flat.badge-palette-info.badge-selected {
        background: var(--info-hover);
        border-color: var(--info-muted);
    }

    button.badge-outlined.badge-palette-info.badge-selected,
    a.badge-outlined.badge-palette-info.badge-selected {
        background: var(--info);
        border-color: var(--info);
        color: var(--text-info);
    }

    /* Neutral */
    button.badge-flat.badge-palette-neutral.badge-selected,
    a.badge-flat.badge-palette-neutral.badge-selected {
        background: var(--neutral-hover);
        border-color: var(--neutral-muted);
    }

    button.badge-outlined.badge-palette-neutral.badge-selected,
    a.badge-outlined.badge-palette-neutral.badge-selected {
        background: var(--neutral);
        border-color: var(--neutral);
        color: var(--text-neutral);
    }

    /* Trailing icon ------------------------------------------------------ */

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
