<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { cardConfig, defaultCardConfig } from "./card.config";

    // Types ------------------------------------------------------------------

    type Variant = "flat" | "outlined" | "ghost";
    type Elevation = "none" | "subtle" | "hard";

    // Props ------------------------------------------------------------------

    interface Props {
        variant?: Variant;
        elevation?: Elevation;
        width?: string;
        rounded?: boolean;
        href?: string;
        leading?: Snippet;
        children?: Snippet;
        trailing?: Snippet;
    }

    let {
        variant = defaultCardConfig.variant,
        elevation = defaultCardConfig.elevation,
        width = undefined,
        rounded = defaultCardConfig.rounded,
        href = undefined,
        leading,
        children,
        trailing,
    }: Props = $props();

    // Helpers ----------------------------------------------------------------

    const resolve = createVariant(cardConfig);

    const classes = $derived(resolve({ variant, rounded, elevation }));

    const style = $derived(width ? `width: ${width};` : undefined);
</script>

<!-- Card inner markup (shared between <div> and <a> roots) ------------------- -->

{#snippet card_inner()}
    {#if leading}
        <div class="card-header">
            {@render leading()}
        </div>
    {/if}

    {#if children}
        <div class="card-body">
            {@render children()}
        </div>
    {/if}

    {#if trailing}
        <div class="card-footer">
            {@render trailing()}
        </div>
    {/if}
{/snippet}

<!-- Root element -------------------------------------------------------------- -->

{#if href}
    <a {href} class={classes} {style}>
        {@render card_inner()}
    </a>
{:else}
    <div class={classes} {style}>
        {@render card_inner()}
    </div>
{/if}

<style>
    /* Base ----------------------------------------------------------------- */

    .card {
        --card-radius:  12px;
        --card-padding: 1.25rem;

        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        color: var(--text);
        text-decoration: none; /* reset if <a> */
    }

    a.card:focus { outline: none; }
    a.card:focus-visible {
        outline: var(--focus-ring-width) solid var(--focus-ring);
        outline-offset: var(--focus-ring-offset);
    }

    /* Variants ------------------------------------------------------------- */

    .card-flat {
        background: var(--tone);
    }

    .card-outlined {
        background: transparent;
        border: 2px solid var(--tone-hover);
    }

    .card-ghost {
        background: transparent;
    }

    /* Rounded -------------------------------------------------------------- */

    .card-rounded {
        border-radius: var(--card-radius);
    }

    /* Elevation ------------------------------------------------------------ */

    .card-elevation-none {
        box-shadow: none;
    }

    .card-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .card-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
        transition: box-shadow 0.15s ease, transform 0.15s ease;
    }

    /* Hover - link cards only ---------------------------------------------- */

    a.card-outlined:hover {
        border-color: var(--accent);
        transition: border-color 0.2s ease;
    }

    /* Zones ---------------------------------------------------------------- */

    /*
        Header: no padding - images or custom content fill edge-to-edge.
        If you need a padded header (e.g. avatar + name), add padding
        directly inside the snippet.
    */
    .card-header {
        flex-shrink: 0;
        overflow: hidden;
        border-bottom: 2px solid var(--tone-hover);
    }

    /* Rounded top corners on the header image */
    .card-rounded .card-header {
        border-radius: var(--card-radius) var(--card-radius) 0 0;
    }

    .card-body {
        flex: 1;
        padding: var(--card-padding);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .card-footer {
        padding: calc(var(--card-padding) * 0.75) var(--card-padding);
        border-top: 2px solid var(--tone-hover);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }
</style>
