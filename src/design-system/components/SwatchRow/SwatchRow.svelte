<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { swatchRowConfig, defaultSwatchRowConfig } from "./swatchRow.config";
    import type { Swatch } from "./swatchRow.config";
    import { hexToOklch } from "$lib/utils/contrast";
    import CopyButton from "../Button/CopyButton.svelte";

    // Props

    interface Props {
        swatches: Swatch[];
        compact?: boolean;
        rounded?: boolean;
    }

    let {
        swatches,
        compact = defaultSwatchRowConfig.compact,
        rounded = defaultSwatchRowConfig.rounded
    }: Props = $props();

    // Helpers

    const resolve = createVariant(swatchRowConfig);
    const classes = $derived(resolve({ compact, rounded }));

    function formatOklch(hex: string): string | null {
        if (!hex || hex.startsWith("rgba")) return null;
        const oklch = hexToOklch(hex);
        if (!oklch) return null;
        return `${(oklch.l * 100).toFixed(0)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(0)}`;
    }
</script>

<div class={classes}>
    {#each swatches as swatch}
        {@const oklch = formatOklch(swatch.value)}
        <div class="sw" style="background: {swatch.bg}; color: {swatch.color};">
            {#if swatch.isText}
                <span class="sw-aa">Aa</span>
            {/if}
            <span class="sw-label">{swatch.label}</span>
            <span class="sw-value-row">
                <span class="sw-hex">{swatch.value}</span>
                <CopyButton to_copy={swatch.value} />
            </span>
            {#if oklch}
                <span class="sw-value-row">
                    <span class="sw-oklch">{oklch}</span>
                    <CopyButton to_copy={oklch} rounded/>
                </span>
            {/if}
        </div>
    {/each}
</div>

<style>
    .swatch-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: 5px;
    }

    .sw {
        min-width: 0;
        padding: 7px 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 2px;
        border: 1px solid var(--tone-ghost-hover);
        overflow: hidden;
    }

    .sw-aa {
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 2px;
    }

    .sw-label {
        font-size: 0.55rem;
        font-weight: 600;
        opacity: 0.7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .sw-value-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2px;
    }

    .sw-hex {
        font-size: 0.55rem;
        font-weight: 700;
        font-family: monospace;
    }

    .sw-oklch {
        font-size: 0.55rem;
        font-weight: 700;
        font-family: monospace;
        opacity: 0.6;
    }

    /* Compact --------------------------------------------------------- */

    .swatch-row-compact {
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    }

    .swatch-row-compact .sw {
        padding: 4px 5px;
        gap: 1px;
    }

    .swatch-row-compact .sw-aa {
        font-size: 0.85rem;
        margin-bottom: 1px;
    }

    .swatch-row-compact .sw-label {
        font-size: 0.5rem;
    }

    .swatch-row-compact .sw-hex {
        font-size: 0.5rem;
    }

    .swatch-row-compact .sw-oklch {
        font-size: 0.45rem;
    }

    /* Rounded --------------------------------------------------------- */

    .swatch-row-rounded .sw {
        border-radius: var(--radius-edge);
    }
</style>
