<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { cardConfig, defaultCardConfig } from "./card.config";

    // ── Types ─────────────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined" | "ghost";

    // ── Props ─────────────────────────────────────────────────────────────────

    /*
        variant : Visual surface — flat | outlined | elevated | ghost
        width   : CSS width value injected as inline style. Omit to fill parent.
        rounded : Border-radius toggle (uses --card-radius, default 12px)
        href    : Renders root as <a>. Best for cards with no interactive children.

        Slots
        header   : Top zone — no padding by default, image fills edge-to-edge.
                   Add your own padding inside the snippet when no image.
        children : Body zone — has default padding (--card-padding, 1.25rem).
        footer   : Bottom zone — has default padding, separated by a top border.
                   Rendered only when the snippet is provided.
    */

    interface Props {
        variant?: Variant;
        width?: string;
        rounded?: boolean;
        href?: string;
        header?: Snippet;
        children?: Snippet;
        footer?: Snippet;
    }

    let {
        variant = defaultCardConfig.variant,
        width = undefined,
        rounded = defaultCardConfig.rounded,
        href = undefined,
        header,
        children,
        footer,
    }: Props = $props();

    // ── Helpers ───────────────────────────────────────────────────────────────

    const resolve = createVariant(cardConfig);

    const classes = $derived(resolve({ variant, rounded }));

    const style = $derived(width ? `width: ${width};` : undefined);
</script>

<!-- ── Card inner markup (shared between <div> and <a> roots) ──────────────── -->

{#snippet card_inner()}
    {#if header}
        <div class="card-header">
            {@render header()}
        </div>
    {/if}

    {#if children}
        <div class="card-body">
            {@render children()}
        </div>
    {/if}

    {#if footer}
        <div class="card-footer">
            {@render footer()}
        </div>
    {/if}
{/snippet}

<!-- ── Root element ──────────────────────────────────────────────────────────── -->

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
    /* ── Base ─────────────────────────────────────────────────────────────── */

    .card {
        --card-radius:  12px;
        --card-padding: 1.25rem;

        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
        color: var(--text);
        text-decoration: none; /* reset if <a> */
    }

    /* ── Variants ─────────────────────────────────────────────────────────── */

    .card-flat {
        background: var(--card);
    }

    .card-outlined {
        background: transparent;
        border: 1.5px solid var(--highlight);
    }

    .card-ghost {
        background: transparent;
    }

    /* ── Rounded ──────────────────────────────────────────────────────────── */

    .card-rounded {
        border-radius: var(--card-radius);
    }

    /* ── Hover — link cards only ──────────────────────────────────────────── */

    a.card-flat:hover {
        box-shadow: 0 8px 28px var(--tone-shadow);
        transform: translateY(-2px);
        transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    a.card-outlined:hover {
        border-color: var(--accent);
        transition: border-color 0.2s ease;
    }

    /* ── Zones ────────────────────────────────────────────────────────────── */

    /*
        Header: no padding — images or custom content fill edge-to-edge.
        If you need a padded header (e.g. avatar + name), add padding
        directly inside the snippet.
    */
    .card-header {
        flex-shrink: 0;
        overflow: hidden;
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
        border-top: 1px solid var(--highlight);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }
</style>
