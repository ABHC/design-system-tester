<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { controlConfig } from './controlbar.config';

    type Palette = "accent" | "tone" | "accentbg";

    interface Props {
        leading?: Snippet;
        children: Snippet;
        palette?: Palette;
        rounded?: boolean;
        bordered?: boolean;
    }

    let {
        leading,
        children,
        palette,
        rounded  = false,
        bordered = true,
    }: Props = $props();

    const resolve = createVariant(controlConfig);

    const wrapper_classes = $derived(
        resolve({ palette, rounded, bordered }).trim()
    );
</script>

<div class="control-bar {wrapper_classes}">
    {#if leading}
        <div class="control-header">
            {@render leading()}
        </div>
    {/if}
    <div class="control-body">
        {@render children()}
    </div>
</div>

<style>
    .control-bar {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        padding: 1rem 1.25rem;
        margin-bottom:  1.5rem;
        border: 2px solid transparent;
    }

    .control-rounded {
        border-radius: var(--radius-soft);
    }

    /* Header - separator only, no box border */
    .control-header {
        padding-bottom: 0.6rem;
        border-bottom:  2px solid var(--tone-hover);
        color: var(--text);
    }

    .control-body {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 2rem;
    }

    /* Palette - tone -------------------------------------------------- */

    .control-palette-tone {
        background: var(--tone);

        --sel-label-color: var(--text-muted);
        --sel-btn-color: var(--text-muted);
        --sel-btn-border: var(--tone-hover);
        --sel-btn-hover-color: var(--accent);
        --sel-btn-active-bg: var(--accent);
        --sel-btn-active-border: var(--accent);
        --sel-btn-active-color: var(--text-accent);
    }

    .control-palette-tone.control-bordered {
        border-color: var(--tone-hover);
    }

    /* Palette - accent ------------------------------------------------ */

    .control-palette-accent {
        background: var(--accent);

        --sel-label-color: var(--text-accent);
        --sel-btn-color: var(--accent-muted);
        --sel-btn-border: var(--accent-hover);
        --sel-btn-hover-color: var(--text-accent);
        --sel-btn-active-bg: var(--accent-ghost-hover);
        --sel-btn-active-border: var(--text-accent);
        --sel-btn-active-color: var(--text-accent);
    }

    .control-palette-accent.control-bordered {
        border-color: var(--accent-muted);
    }

    .control-palette-accent .control-header {
        color: var(--text-accent);
        border-bottom-color: var(--accent-muted);
    }

    /* Palette - accent-bg --------------------------------------------- */

    .control-palette-accent-bg {
        background: var(--accent-bg);

        --sel-label-color: var(--text-accent);
        --sel-btn-color: var(--accent-muted);
        --sel-btn-border: var(--accent-hover);
        --sel-btn-hover-color: var(--text-accent);
        --sel-btn-active-bg: var(--accent-ghost-hover);
        --sel-btn-active-border: var(--text-accent);
        --sel-btn-active-color: var(--text-accent);
    }

    .control-palette-accent-bg.control-bordered {
        border-color: var(--accent-hover);
    }

    .control-palette-accent-bg .control-header {
        color: var(--text-accent);
        border-bottom-color: var(--accent-hover);
    }

</style>
