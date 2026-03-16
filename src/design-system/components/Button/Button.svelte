<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { buttonConfig } from './button.config';

    type Variant = "flat" | "outlined" | "ghost" | "textual";
    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Animate = "left" | "right" | "top" | "bottom";
    type Elevation = "none" | "subtle" | "hard";
    type Direction = "row" | "column"

    interface Props {
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        uppercase?: boolean;
        animate?: Animate;
        active?: boolean;
        rounded?: boolean;
        direction?: Direction;
        aria_label?: string;
        onclick?: () => void;
        children?: Snippet;
    }

    let {
        variant = "flat",
        palette = "accent",
        size = "md",
        elevation = "none",
        uppercase = false,
        animate = undefined,
        active = false,
        rounded = false,
        direction = "row",
        aria_label = undefined,
        onclick = undefined,
        children,
    }: Props = $props();

    const resolve = createVariant(buttonConfig);

    const classes = $derived(
        resolve({
            variant,
            palette,
            size,
            elevation,
            animate,
            uppercase,
            active,
            rounded,
            direction
        }).trim()
    );
</script>

<button
    class={classes}
    aria-label={aria_label}
    aria-current={active ? "page" : undefined}
    {onclick}
>
    {@render children?.()}
</button>

<style>
    /* Base ────────────────────────────────────────────────────────────── */

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        transition:
            background   0.2s ease-out,
            color        0.2s ease-out,
            border-color 0.2s ease-out,
            box-shadow   0.2s ease-out,
            transform    0.2s ease-out;
        width: fit-content;
        height: fit-content;
        line-height: 1;
        font-family: var(--font-body);
        text-transform: capitalize;
    }

    /* Variant structure (style only, no color) ────────────────────────── */

    /* Flat — solid fill */
    .btn-flat {
        border: 2px solid transparent;
    }

    /* Outlined — transparent bg, visible border */
    .btn-outlined {
        background: transparent;
        border: 2px solid transparent;
    }

    /* Ghost — transparent, nav-style bg-on-hover + active indicator */
    .btn-ghost {
        background: transparent;
        border: none;
        gap: 0.25rem;
        padding: 0.25rem;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
    }

    .btn-ghost:hover {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btn-ghost.btn-active.btn-rounded {
        border-radius: 8px 8px 0 0;
    }

    /* Textual — transparent, opacity-only hover */
    .btn-textual {
        border: none;
        background: transparent;
        padding: 0.25rem 0.5rem;
        border-bottom: 2px solid transparent;
    }

    /* Palette × Variant colors ────────────────────────────────────────── */

    /* accent */
    .btn-palette-accent.btn-flat {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-flat:hover {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
    }

    .btn-palette-accent.btn-flat.btn-active {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-outlined {
        border-color: var(--accent-more);
        color: var(--accent-more);
    }

    .btn-palette-accent.btn-outlined:hover {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-outlined.btn-active {
        background: var(--accent-invert);
        border-color: var(--accent-invert);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-ghost {
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-ghost:hover {
        background: color-mix(in srgb, var(--text-accent) 15%, transparent);
    }

    .btn-palette-accent.btn-ghost.btn-active {
        border-bottom-color: color-mix(in srgb, var(--text-accent) 45%, transparent);
    }

    .btn-palette-accent.btn-textual {
        color: color-mix(in srgb, var(--text-accent) 78%, transparent);
    }

    .btn-palette-accent.btn-textual:hover {
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-textual.btn-active {
        color: var(--text-accent);
        border-color: var(--text-accent);
    }

    /* tone */
    .btn-palette-tone.btn-flat {
        background: var(--card);
        border-color: var(--highlight);
        color: var(--text);
    }

    .btn-palette-tone.btn-flat:hover {
        background: var(--highlight);
    }

    .btn-palette-tone.btn-flat.btn-active {
        background: var(--highlight);
        border-color: var(--highlight);
        color: var(--accent-more);
    }

    .btn-palette-tone.btn-outlined {
        border-color: var(--highlight);
        color: var(--text-muted);
    }

    .btn-palette-tone.btn-outlined:hover {
        border-color: var(--accent);
        color: var(--accent);
    }

    .btn-palette-tone.btn-outlined.btn-active {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-tone.btn-ghost {
        color: var(--text);
    }

    .btn-palette-tone.btn-ghost:hover {
        background: var(--highlight);
    }

    .btn-palette-tone.btn-ghost.btn-active {
        border-bottom-color: var(--accent);
    }

    .btn-palette-tone.btn-textual {
        color: color-mix(in srgb, var(--text) 78%, transparent);
    }

    .btn-palette-tone.btn-textual:hover {
        color: var(--text);
    }

    .btn-palette-tone.btn-textual.btn-active {
        color: var(--text);
        border-color: var(--text);
    }

    /* error */
    .btn-palette-error.btn-flat {
        background: var(--ctx-error-blend);
        color: var(--text);
    }

    .btn-palette-error.btn-flat:hover {
        background: color-mix(in srgb, var(--ctx-error) 30%, transparent);
    }

    .btn-palette-error.btn-flat.btn-active {
        background: var(--ctx-error);
        border-color: var(--ctx-error);
        color: var(--text-accent);
    }

    .btn-palette-error.btn-outlined {
        border-color: var(--ctx-error);
        color: var(--ctx-error);
    }

    .btn-palette-error.btn-outlined:hover {
        background: var(--ctx-error);
        color: var(--text-accent);
    }

    .btn-palette-error.btn-outlined.btn-active {
        background: var(--ctx-error);
        border-color: var(--ctx-error);
        color: var(--text-accent);
    }

    .btn-palette-error.btn-ghost {
        color: var(--ctx-error);
    }

    .btn-palette-error.btn-ghost:hover {
        background: var(--ctx-error-blend);
    }

    .btn-palette-error.btn-ghost.btn-active {
        border-bottom-color: var(--ctx-error);
    }

    .btn-palette-error.btn-textual {
        color: color-mix(in srgb, var(--ctx-error) 78%, transparent);
    }

    .btn-palette-error.btn-textual:hover {
        color: var(--ctx-error);
    }

    .btn-palette-error.btn-textual.btn-active {
        color: var(--ctx-error);
        border-color: var(--ctx-error);
    }

    /* warning */
    .btn-palette-warning.btn-flat {
        background: var(--ctx-warning-blend);
        color: var(--text);
    }

    .btn-palette-warning.btn-flat:hover {
        background: color-mix(in srgb, var(--ctx-warning) 30%, transparent);
    }

    .btn-palette-warning.btn-flat.btn-active {
        background: var(--ctx-warning);
        border-color: var(--ctx-warning);
        color: var(--text-accent);
    }

    .btn-palette-warning.btn-outlined {
        border-color: var(--ctx-warning);
        color: var(--ctx-warning);
    }

    .btn-palette-warning.btn-outlined:hover {
        background: var(--ctx-warning);
        color: var(--text-accent);
    }

    .btn-palette-warning.btn-outlined.btn-active {
        background: var(--ctx-warning);
        border-color: var(--ctx-warning);
        color: var(--text-accent);
    }

    .btn-palette-warning.btn-ghost {
        color: var(--ctx-warning);
    }

    .btn-palette-warning.btn-ghost:hover {
        background: var(--ctx-warning-blend);
    }

    .btn-palette-warning.btn-ghost.btn-active {
        border-bottom-color: var(--ctx-warning);
    }

    .btn-palette-warning.btn-textual {
        color: color-mix(in srgb, var(--ctx-warning) 78%, transparent);
    }

    .btn-palette-warning.btn-textual:hover {
        color: var(--ctx-warning);
    }

    .btn-palette-warning.btn-textual.btn-active {
        color: var(--ctx-warning);
        border-color: var(--ctx-warning);
    }

    /* success */
    .btn-palette-success.btn-flat {
        background: var(--ctx-success-blend);
        color: var(--text);
    }

    .btn-palette-success.btn-flat:hover {
        background: color-mix(in srgb, var(--ctx-success) 30%, transparent);
    }

    .btn-palette-success.btn-flat.btn-active {
        background: var(--ctx-success);
        border-color: var(--ctx-success);
        color: var(--text-accent);
    }

    .btn-palette-success.btn-outlined {
        border-color: var(--ctx-success);
        color: var(--ctx-success);
    }

    .btn-palette-success.btn-outlined:hover {
        background: var(--ctx-success);
        color: var(--text-accent);
    }

    .btn-palette-success.btn-outlined.btn-active {
        background: var(--ctx-success);
        border-color: var(--ctx-success);
        color: var(--text-accent);
    }

    .btn-palette-success.btn-ghost {
        color: var(--ctx-success);
    }

    .btn-palette-success.btn-ghost:hover {
        background: var(--ctx-success-blend);
    }

    .btn-palette-success.btn-ghost.btn-active {
        border-bottom-color: var(--ctx-success);
    }

    .btn-palette-success.btn-textual {
        color: color-mix(in srgb, var(--ctx-success) 78%, transparent);
    }

    .btn-palette-success.btn-textual:hover {
        color: var(--ctx-success);
    }

    .btn-palette-success.btn-textual.btn-active {
        color: var(--ctx-success);
        border-color: var(--ctx-success);
    }


    /* info */
    .btn-palette-info.btn-flat {
        background: var(--ctx-info-blend);
        color: var(--text);
    }

    .btn-palette-info.btn-flat:hover {
        background: color-mix(in srgb, var(--ctx-info) 30%, transparent);
    }

    .btn-palette-info.btn-outlined {
        border-color: var(--ctx-info);
        color: var(--ctx-info);
    }

    .btn-palette-info.btn-flat.btn-active {
        background: var(--ctx-info);
        border-color: var(--ctx-info);
        color: var(--text-accent);
    }

    .btn-palette-info.btn-outlined:hover {
        background: var(--ctx-info);
        color: var(--text-accent);
    }

    .btn-palette-info.btn-outlined.btn-active {
        background: var(--ctx-info);
        border-color: var(--ctx-info);
        color: var(--text-accent);
    }

    .btn-palette-info.btn-ghost {
        color: var(--ctx-info);
    }

    .btn-palette-info.btn-ghost:hover {
        background: var(--ctx-info-blend);
    }

    .btn-palette-info.btn-ghost.btn-active {
        border-bottom-color: var(--ctx-info);
    }

    .btn-palette-info.btn-textual {
        color: color-mix(in srgb, var(--ctx-info) 78%, transparent);
    }

    .btn-palette-info.btn-textual:hover {
        color: var(--ctx-info);
    }

    .btn-palette-info.btn-textual.btn-active {
        color: var(--ctx-info);
        border-color: var(--ctx-info);
    }

    /* Elevation — appears on hover ───────────────────────────────────── */

    .btn-elevation-subtle:hover {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btn-elevation-hard:hover {
        box-shadow: 0.4rem 0.4rem var(--shadow);
    }

    /* Sizes ───────────────────────────────────────────────────────────── */

    .btn-lg {
        font-size: 1.125rem;
        font-weight: 700;
        padding: 0.9rem 1.8rem;
    }

    .btn-md {
        font-weight: 600;
        padding: 0.6rem 1.2rem;
    }

    .btn-sm {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }

    /* ghost: size classes control padding (matches old btn-nav behaviour) */
    .btn-ghost.btn-lg { font-size: 1.125rem; font-weight: 700; }
    .btn-ghost.btn-sm { font-size: 0.75rem; }

    /* textual: compact padding regardless of size */
    .btn-textual.btn-lg { font-size: 1.125rem; font-weight: 700; padding: 0.3rem 0.6rem; }
    .btn-textual.btn-md { padding: 0.25rem 0.5rem; }
    .btn-textual.btn-sm { font-size: 0.75rem; padding: 0.15rem 0.35rem; }

    /* Rounded ─────────────────────────────────────────────────────────── */

    .btn-rounded {
        border-radius: 8px;
    }

    /* Direction ────────────────────────────────────────────────────────── */

    .btn-row {
        flex-direction: row;
    }

    /* column — icon + label stacked, square aspect ratio */
    .btn-column {
        flex-direction: column;
        aspect-ratio: 1;
        padding: 0.25rem;
        overflow: hidden;
    }

    .btn-column.btn-sm { 
        width: 48px; 
        font-size : 0.65rem
    }
    .btn-column.btn-md { 
        width: 64px; 
        font-size : 0.80rem
    }
    .btn-column.btn-lg { 
        width: 76px; 
        font-size : 1rem
    }

    /* Animate ─────────────────────────────────────────────────────────── */

    .btn-animate-left:hover  { transform: translateX(-4px); }
    .btn-animate-right:hover { transform: translateX(4px); }
    .btn-animate-top:hover { transform: translateY(-4px); }
    .btn-animate-bottom:hover { transform: translateY(4px); }

    /* Uppercase ───────────────────────────────────────────────────────── */

    .btn-uppercase {
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
</style>
