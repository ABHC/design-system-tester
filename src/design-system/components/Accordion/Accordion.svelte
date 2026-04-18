<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { accordionConfig, defaultAccordionConfig } from "./accordion.config";

    // Types ----------------------------------------------------------------

    type Variant = "flat" | "outlined" | "ghost";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    // Props ----------------------------------------------------------------

    interface Props {
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        rounded?: boolean;
        children: Snippet;
    }

    let {
        variant = defaultAccordionConfig.variant,
        palette = defaultAccordionConfig.palette,
        size = defaultAccordionConfig.size,
        elevation = defaultAccordionConfig.elevation,
        rounded = defaultAccordionConfig.rounded,
        children,
    }: Props = $props();

    // Helpers --------------------------------------------------------------

    const resolve = createVariant(accordionConfig);

    const classes = $derived(
        resolve({
            variant,
            palette,
            size,
            elevation,
            rounded: rounded ? true : undefined,
        }).trim()
    );
</script>

<div class={classes}>
    {@render children()}
</div>

<style>
    /* Base ---------------------------------------------------------------- */

    .accordion {
        display: flex;
        flex-direction: column;
        font-family: var(--font-body);
        color: var(--text);
    }

    /* Palette - set local custom properties ------------------------------- */

    .accordion-palette-accent {
        --acc-color: var(--accent);
        --acc-bg: var(--accent-bg);
        --acc-hover: var(--accent-hover);
        --acc-text: var(--text-accent);
        --acc-border: var(--accent-hover);
        --acc-header-flat: var(--accent);
        --acc-header-flat-text: var(--text-accent);
        --acc-header-ghost-text: var(--text);
    }

    .accordion-palette-tone {
        --acc-color: var(--tone);
        --acc-bg: var(--tone);
        --acc-hover: var(--tone-hover);
        --acc-text: var(--text);
        --acc-border: var(--tone-hover);
        --acc-header-flat: var(--tone-hover);
        --acc-header-flat-text: var(--text);
        --acc-header-ghost-text: var(--text);
    }

    .accordion-palette-neutral {
        --acc-color: var(--neutral);
        --acc-bg: var(--neutral-bg);
        --acc-hover: var(--neutral-hover);
        --acc-text: var(--text-neutral);
        --acc-border: var(--neutral-hover);
        --acc-header-flat: var(--neutral);
        --acc-header-flat-text: var(--text-neutral);
        --acc-header-ghost-text: var(--text);
    }

    .accordion-palette-error {
        --acc-color: var(--error);
        --acc-bg: var(--error-bg);
        --acc-hover: var(--error-hover);
        --acc-text: var(--text-error);
        --acc-border: var(--error-hover);
        --acc-header-flat: var(--error);
        --acc-header-flat-text: var(--text-error);
        --acc-header-ghost-text: var(--text);
    }

    .accordion-palette-warning {
        --acc-color: var(--warning);
        --acc-bg: var(--warning-bg);
        --acc-hover: var(--warning-hover);
        --acc-text: var(--text-warning);
        --acc-border: var(--warning-hover);
        --acc-header-flat: var(--warning);
        --acc-header-flat-text: var(--text-warning);
        --acc-header-ghost-text: var(--text);
    }

    .accordion-palette-success {
        --acc-color: var(--success);
        --acc-bg: var(--success-bg);
        --acc-hover: var(--success-hover);
        --acc-text: var(--text-success);
        --acc-border: var(--success-hover);
        --acc-header-flat: var(--success);
        --acc-header-flat-text: var(--text-success);
        --acc-header-ghost-text: var(--text);
    }

    .accordion-palette-info {
        --acc-color: var(--info);
        --acc-bg: var(--info-bg);
        --acc-hover: var(--info-hover);
        --acc-text: var(--text-info);
        --acc-border: var(--info-hover);
        --acc-header-flat: var(--info);
        --acc-header-flat-text: var(--text-info);
        --acc-header-ghost-text: var(--text);
    }

    /* Variants ------------------------------------------------------------ */

    .accordion-flat {
        gap: 0.6rem;
    }

    .accordion-outlined {
        gap: 0.6rem;
    }

    .accordion-ghost {
        gap: 0;
    }

    /* Ghost: separator between items */
    .accordion-ghost > :global(.accordion-header + .accordion-header),
    .accordion-ghost > :global(.accordion-item + .accordion-header) {
        border-top: 2px solid var(--acc-border, var(--tone-hover));
    }

    /* Sizes --------------------------------------------------------------- */

    .accordion-sm {
        --acc-header-padding: 0.4rem 0.7rem;
        --acc-item-padding: 0.5rem 0.7rem;
        --acc-font-size: 0.8rem;
    }

    .accordion-md {
        --acc-header-padding: 0.6rem 1rem;
        --acc-item-padding: 0.75rem 1rem;
        --acc-font-size: 0.875rem;
    }

    .accordion-lg {
        --acc-header-padding: 0.8rem 1.2rem;
        --acc-item-padding: 1rem 1.2rem;
        --acc-font-size: 1rem;
    }

    /* Elevation ----------------------------------------------------------- */

    /* Ghost: shadow on parent (items form a single visual block) */
    .accordion-ghost.accordion-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .accordion-ghost.accordion-elevation-hard {
        box-shadow: 0.3rem 0.3rem var(--shadow-hard);
    }

    /* Flat / Outlined: shadow on each child (items are separated by gap) */
    .accordion-flat.accordion-elevation-subtle > :global(.accordion-header),
    .accordion-outlined.accordion-elevation-subtle > :global(.accordion-header) {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .accordion-flat.accordion-elevation-hard > :global(.accordion-header),
    .accordion-outlined.accordion-elevation-hard > :global(.accordion-header) {
        box-shadow: 0.3rem 0.3rem var(--shadow-hard);
    }
</style>
