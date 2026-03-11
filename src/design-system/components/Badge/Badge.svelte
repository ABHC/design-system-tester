<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { badgeConfig } from "./badge.config";

    type Variant = "accent" | "outlined" | "flat" | "ctx";
    type Size = "sm" | "md" | "lg";
    type State = "error" | "warning" | "success" | "info";

    /*
        Props _________________________________________________________
        variant : primary | secondary | ghost | ctx
        size : sm | md | lg
        uppercase : Text transform + letter-spacing
        state : ctx variant only — error | warning | success | info
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
        size?: Size;
        uppercase?: boolean;
        state?: State;
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
        variant = "accent",
        size = "md",
        uppercase = false,
        state = undefined,
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

    const variant_classes = $derived(resolve({ variant, size, uppercase }));

    const state_class = $derived(
        variant === "ctx" && state ? `badge-ctx-${state}` : ""
    );

    const shape_class = $derived(pill ? "badge-pill" : "badge-rect");

    const selected_class = $derived(selected ? "badge-selected" : "");

    const classes = $derived(
        `${variant_classes} ${state_class} ${shape_class} ${selected_class}`.trim()
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

    .badge-accent {
        font-weight: 600;
        border: 1px solid var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    .badge-outlined {
        border: 1px solid var(--accent-more);
        background: inherit;
        color: var(--accent-more);
    }

    .badge-flat {
        border: 1px solid var(--highlight);
        background: var(--highlight);
        color: var(--text);
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

    button.badge-accent:hover,
    a.badge-accent:hover {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
    }

    button.badge-outlined:hover,
    a.badge-outlined:hover {
        border-color: var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    button.badge-flat:hover,
    a.badge-flat:hover {
        border-color: var(--accent);
        color: var(--accent-more);
    }

    button.badge-ctx-error:hover,
    a.badge-ctx-error:hover {
        background: color-mix(in srgb, var(--ctx-error) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-error) 65%, var(--highlight));
    }

    button.badge-ctx-warning:hover,
    a.badge-ctx-warning:hover {
        background: color-mix(in srgb, var(--ctx-warning) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-warning) 65%, var(--highlight));
    }

    button.badge-ctx-success:hover,
    a.badge-ctx-success:hover {
        background: color-mix(in srgb, var(--ctx-success) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-success) 65%, var(--highlight));
    }

    button.badge-ctx-info:hover,
    a.badge-ctx-info:hover {
        background: color-mix(in srgb, var(--ctx-info) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-info) 65%, var(--highlight));
    }

    /* Selected — mirrors hover styles ──────────────────────────────────── */

    button.badge-accent.badge-selected,
    a.badge-accent.badge-selected {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
    }

    button.badge-outlined.badge-selected,
    a.badge-outlined.badge-selected {
        border-color: var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    button.badge-flat.badge-selected,
    a.badge-flat.badge-selected {
        border-color: var(--accent);
        color: var(--accent-more);
    }

    button.badge-ctx-error.badge-selected,
    a.badge-ctx-error.badge-selected {
        background: color-mix(in srgb, var(--ctx-error) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-error) 65%, var(--highlight));
    }

    button.badge-ctx-warning.badge-selected,
    a.badge-ctx-warning.badge-selected {
        background: color-mix(in srgb, var(--ctx-warning) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-warning) 65%, var(--highlight));
    }

    button.badge-ctx-success.badge-selected,
    a.badge-ctx-success.badge-selected {
        background: color-mix(in srgb, var(--ctx-success) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-success) 65%, var(--highlight));
    }

    button.badge-ctx-info.badge-selected,
    a.badge-ctx-info.badge-selected {
        background: color-mix(in srgb, var(--ctx-info) 65%, var(--highlight));
        border-color: color-mix(in srgb, var(--ctx-info) 65%, var(--highlight));
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
