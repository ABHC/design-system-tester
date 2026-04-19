<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { buttonConfig } from './button.config';

    type Variant = "flat" | "outlined" | "ghost" | "naked";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Animate = "left" | "right" | "top" | "bottom";
    type Elevation = "none" | "subtle" | "hard";
    type Direction = "row" | "column"

    interface Props {
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        raised?: boolean;
        uppercase?: boolean;
        animate?: Animate;
        active?: boolean;
        rounded?: boolean;
        direction?: Direction;
        aria_label?: string;
        href?: string;
        onclick?: () => void;
        children?: Snippet;
    }

    let {
        variant = "flat",
        palette = "accent",
        size = "md",
        elevation = "none",
        raised = false,
        uppercase = false,
        animate = undefined,
        active = false,
        rounded = false,
        direction = "row",
        aria_label = undefined,
        href = undefined,
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
            raised,
            animate,
            uppercase,
            active,
            rounded,
            direction
        }).trim()
    );
</script>

{#if href}
    <a
        {href}
        class={classes}
        aria-label={aria_label}
        aria-current={active ? "page" : undefined}
    >
        {@render children?.()}
    </a>
{:else}
    <button
        class={classes}
        aria-label={aria_label}
        aria-current={active ? "page" : undefined}
        {onclick}
    >
        {@render children?.()}
    </button>
{/if}

<style>
    /* Base -------------------------------------------------------------- */

    a.btn {
        text-decoration: none;
    }

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
    }

    .btn:focus { outline: none; }
    .btn:focus-visible {
        outline: var(--focus-ring-width) solid var(--focus-ring);
        outline-offset: var(--focus-ring-offset);
    }

    /* Variant structure (style only, no color) -------------------------- */

    /* Flat - solid fill */
    .btn-flat {
        border: 2px solid transparent;
    }

    /* Outlined - transparent bg, visible border */
    .btn-outlined {
        background: transparent;
        border: 2px solid transparent;
    }

    /* Ghost - transparent, nav-style bg-on-hover + active indicator */
    .btn-ghost {
        background: transparent;
        border: none;
        gap: 0.25rem;
        padding: 0.25rem;
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
    }

    /* Textual - transparent, opacity-only hover */
    .btn-naked {
        border: none;
        background: transparent;
        padding: 0.25rem 0.5rem;
        border-bottom: 2px solid transparent;
    }

    .btn-ghost:hover {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btn-ghost.btn-active.btn-rounded,
    .btn-naked.btn-active.btn-rounded {
        border-radius: var(--radius-soft) var(--radius-soft) 0 0;
    }

    /* Palette × Variant colors ------------------------------------------ */

    /* accent */
    .btn-palette-accent.btn-flat {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-flat:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
    }

    .btn-palette-accent.btn-flat.btn-active {
        background: var(--accent-hover);
        border-color: var(--accent-muted);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-outlined {
        border-color: var(--accent-muted);
        color: var(--accent-muted);
    }

    .btn-palette-accent.btn-outlined:hover {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-outlined.btn-active {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-ghost {
        color: var(--text-accent);
    }

    .btn-palette-accent.btn-ghost:hover {
        background: var(--accent-ghost-hover);
    }

    .btn-palette-accent.btn-ghost.btn-active {
        border-bottom-color: var(--text-accent);
    }

    .btn-palette-accent.btn-naked {
        color: var(--accent-muted);
    }

    .btn-palette-accent.btn-naked:hover {
        color: var(--accent);
    }

    .btn-palette-accent.btn-naked.btn-active {
        color: var(--accent-muted);
        border-color: var(--accent);
    }

    /* tone */
    .btn-palette-tone.btn-flat {
        background: var(--tone);
        color: var(--text);
    }

    .btn-palette-tone.btn-flat:hover {
        background: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-tone.btn-flat.btn-active {
        background: var(--accent);
        border-color: var(--tone-muted);
        color: var(--text-accent);
    }

    .btn-palette-tone.btn-outlined {
        border-color: var(--tone-muted);
        color: var(--tone-muted);
    }

    .btn-palette-tone.btn-outlined:hover {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    .btn-palette-tone.btn-outlined.btn-active {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
        color: var(--text-accent);
    }

    .btn-palette-tone.btn-ghost {
        color: var(--text);
    }

    .btn-palette-tone.btn-ghost:hover {
        background: var(--tone-ghost);
    }

    .btn-palette-tone.btn-ghost.btn-active {
        border-bottom-color: var(--accent);
    }

    .btn-palette-tone.btn-naked {
        color: var(--text-muted);
    }

    .btn-palette-tone.btn-naked:hover {
        color: var(--text);
    }

    .btn-palette-tone.btn-naked.btn-active {
        color: var(--text);
        border-color: var(--text);
    }

    /* error */
    .btn-palette-error.btn-flat {
        background: var(--error);
        border-color: var(--error);
        color: var(--text-error);
    }

    .btn-palette-error.btn-flat:hover {
        background: var(--error-hover);
        border-color: var(--error-hover);
    }

    .btn-palette-error.btn-flat.btn-active {
        background: var(--error-hover);
        border-color: var(--error-muted);
        color: var(--text-error);
    }

    .btn-palette-error.btn-outlined {
        border-color: var(--error-muted);
        color: var(--error-muted);
    }

    .btn-palette-error.btn-outlined:hover {
        background: var(--error);
        border-color: var(--error);
        color: var(--text-error);
    }

    .btn-palette-error.btn-outlined.btn-active {
        background: var(--error-hover);
        border-color: var(--error-hover);
        color: var(--text-error);
    }

    .btn-palette-error.btn-ghost {
        color: var(--error-muted);
    }

    .btn-palette-error.btn-ghost:hover {
        background: var(--error-ghost-hover);
        color: var(--error-muted);
    }

    .btn-palette-error.btn-ghost.btn-active {
        border-bottom-color: var(--error-muted);
    }

    .btn-palette-error.btn-naked {
        color: var(--error-muted);
    }

    .btn-palette-error.btn-naked:hover {
        color: var(--error);
    }

    .btn-palette-error.btn-naked.btn-active {
        color: var(--error-muted);
        border-color: var(--error);
    }

    /* warning */
    .btn-palette-warning.btn-flat {
        background: var(--warning);
        border-color: var(--warning);
        color: var(--text-warning);
    }

    .btn-palette-warning.btn-flat:hover {
        background: var(--warning-hover);
        border-color: var(--warning-hover);
    }

    .btn-palette-warning.btn-flat.btn-active {
        background: var(--warning-hover);
        border-color: var(--warning-muted);
        color: var(--text-warning);
    }

    .btn-palette-warning.btn-outlined {
        border-color: var(--warning-muted);
        color: var(--warning-muted);
    }

    .btn-palette-warning.btn-outlined:hover {
        background: var(--warning);
        border-color: var(--warning);
        color: var(--text-warning);
    }

    .btn-palette-warning.btn-outlined.btn-active {
        background: var(--warning-hover);
        border-color: var(--warning-hover);
        color: var(--text-warning);
    }

    .btn-palette-warning.btn-ghost {
        color: var(--warning-muted);
    }

    .btn-palette-warning.btn-ghost:hover {
        background: var(--warning-ghost-hover);
        color: var(--warning-muted);
    }

    .btn-palette-warning.btn-ghost.btn-active {
        border-bottom-color: var(--warning-muted);
    }

    .btn-palette-warning.btn-naked {
        color: var(--warning-muted);
    }

    .btn-palette-warning.btn-naked:hover {
        color: var(--warning);
    }

    .btn-palette-warning.btn-naked.btn-active {
        color: var(--warning-muted);
        border-color: var(--warning);
    }

    /* success */
    .btn-palette-success.btn-flat {
        background: var(--success);
        border-color: var(--success);
        color: var(--text-success);
    }

    .btn-palette-success.btn-flat:hover {
        background: var(--success-hover);
        border-color: var(--success-hover);
    }

    .btn-palette-success.btn-flat.btn-active {
        background: var(--success-hover);
        border-color: var(--success-muted);
        color: var(--text-success);
    }

    .btn-palette-success.btn-outlined {
        border-color: var(--success-muted);
        color: var(--success-muted);
    }

    .btn-palette-success.btn-outlined:hover {
        background: var(--success);
        border-color: var(--success);
        color: var(--text-success);
    }

    .btn-palette-success.btn-outlined.btn-active {
        background: var(--success-hover);
        border-color: var(--success-hover);
        color: var(--text-success);
    }

    .btn-palette-success.btn-ghost {
        color: var(--success-muted);
    }

    .btn-palette-success.btn-ghost:hover {
        background: var(--success-ghost-hover);
        color: var(--success-muted);
    }

    .btn-palette-success.btn-ghost.btn-active {
        border-bottom-color: var(--success-muted);
    }

    .btn-palette-success.btn-naked {
        color: var(--success-muted);
    }

    .btn-palette-success.btn-naked:hover {
        color: var(--success);
    }

    .btn-palette-success.btn-naked.btn-active {
        color: var(--success-muted);
        border-color: var(--success);
    }

    /* info */
    .btn-palette-info.btn-flat {
        background: var(--info);
        border-color: var(--info);
        color: var(--text-info);
    }

    .btn-palette-info.btn-flat:hover {
        background: var(--info-hover);
        border-color: var(--info-hover);
    }

    .btn-palette-info.btn-flat.btn-active {
        background: var(--info-hover);
        border-color: var(--info-muted);
        color: var(--text-info);
    }

    .btn-palette-info.btn-outlined {
        border-color: var(--info-muted);
        color: var(--info-muted);
    }

    .btn-palette-info.btn-outlined:hover {
        background: var(--info);
        border-color: var(--info);
        color: var(--text-info);
    }

    .btn-palette-info.btn-outlined.btn-active {
        background: var(--info-hover);
        border-color: var(--info-hover);
        color: var(--text-info);
    }

    .btn-palette-info.btn-ghost {
        color: var(--info-muted);
    }

    .btn-palette-info.btn-ghost:hover {
        background: var(--info-ghost-hover);
        color: var(--info-muted);
    }

    .btn-palette-info.btn-ghost.btn-active {
        border-bottom-color: var(--info-muted);
    }

    .btn-palette-info.btn-naked {
        color: var(--info-muted);
    }

    .btn-palette-info.btn-naked:hover {
        color: var(--info);
    }

    .btn-palette-info.btn-naked.btn-active {
        color: var(--info-muted);
        border-color: var(--info);
    }

    /* neutral */
    .btn-palette-neutral.btn-flat {
        background: var(--neutral);
        border-color: var(--neutral);
        color: var(--text-neutral);
    }

    .btn-palette-neutral.btn-flat:hover {
        background: var(--neutral-hover);
        border-color: var(--neutral-hover);
    }

    .btn-palette-neutral.btn-flat.btn-active {
        background: var(--neutral-hover);
        border-color: var(--neutral-muted);
        color: var(--text-neutral);
    }

    .btn-palette-neutral.btn-outlined {
        border-color: var(--neutral-muted);
        color: var(--neutral-muted);
    }

    .btn-palette-neutral.btn-outlined:hover {
        background: var(--neutral);
        border-color: var(--neutral);
        color: var(--text-neutral);
    }

    .btn-palette-neutral.btn-outlined.btn-active {
        background: var(--neutral-hover);
        border-color: var(--neutral-hover);
        color: var(--text-neutral);
    }

    .btn-palette-neutral.btn-ghost {
        color: var(--neutral-muted);
    }

    .btn-palette-neutral.btn-ghost:hover {
        background: var(--neutral-ghost-hover);
        color: var(--neutral-muted);
    }

    .btn-palette-neutral.btn-ghost.btn-active {
        border-bottom-color: var(--neutral-muted);
    }

    .btn-palette-neutral.btn-naked {
        color: var(--neutral-muted);
    }

    .btn-palette-neutral.btn-naked:hover {
        color: var(--neutral);
    }

    .btn-palette-neutral.btn-naked.btn-active {
        color: var(--neutral-muted);
        border-color: var(--neutral);
    }

    /* Elevation - hover only (default) --------------------------------- */

    .btn-elevation-subtle:hover {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btn-elevation-hard:hover {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

    /* Elevation - constant (raised=true) ------------------------------- */

    .btn-raised.btn-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btn-raised.btn-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

    /* Sizes ------------------------------------------------------------- */

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
    .btn-naked.btn-lg { font-size: 1.125rem; font-weight: 700; padding: 0.3rem 0.6rem; }
    .btn-naked.btn-md { padding: 0.25rem 0.5rem; }
    .btn-naked.btn-sm { font-size: 0.75rem; padding: 0.15rem 0.35rem; }

    /* Rounded ----------------------------------------------------------- */

    .btn-rounded {
        border-radius: var(--radius-soft);
    }

    /* Direction --------------------------------------------------------- */

    .btn-row {
        flex-direction: row;
    }

    /* column - icon + label stacked, square aspect ratio */
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

    /* Animate ----------------------------------------------------------- */

    .btn-animate-left:hover  { transform: translateX(-4px); }
    .btn-animate-right:hover { transform: translateX(4px); }
    .btn-animate-top:hover { transform: translateY(-4px); }
    .btn-animate-bottom:hover { transform: translateY(4px); }

    /* Uppercase --------------------------------------------------------- */

    .btn-uppercase {
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }
</style>
