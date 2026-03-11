<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { controlConfig } from './controlbar.config';

    type Palette = "accent" | "tone";

    interface Props {
        header?:  Snippet;
        children: Snippet;
        palette?: Palette;
        rounded?: boolean;
        bordered?: boolean;
    }

    let {
        header,
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
    {#if header}
        <div class="control-header">
            {@render header()}
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
    }

    .control-rounded {
        border-radius: 10px;
    }

    /* Header — separator only, no box border */
    .control-header {
        padding-bottom: 0.6rem;
        border-bottom:  1px solid var(--highlight);
        color: var(--text);
    }

    .control-body {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 2rem;
    }

    /* Palette — tone ──────────────────────────────────────────────── */

    .control-palette-tone {
        background: var(--card);

        --sel-label-color: var(--text-muted);
        --sel-btn-color: var(--text-muted);
        --sel-btn-border: var(--highlight);
        --sel-btn-hover-color: var(--accent);
        --sel-btn-active-bg: var(--accent);
        --sel-btn-active-border: var(--accent);
        --sel-btn-active-color: var(--text-accent);
    }

    .control-palette-tone.control-bordered {
        border: 1.5px solid var(--highlight);
    }

    /* Palette — accent ────────────────────────────────────────────── */

    .control-palette-accent {
        background: var(--accent);

        --sel-label-color: color-mix(in srgb, var(--text-accent) 70%, transparent);
        --sel-btn-color: color-mix(in srgb, var(--text-accent) 65%, transparent);
        --sel-btn-border: color-mix(in srgb, var(--text-accent) 35%, transparent);
        --sel-btn-hover-color: var(--text-accent);
        --sel-btn-active-bg: color-mix(in srgb, var(--text-accent) 22%, transparent);
        --sel-btn-active-border: var(--text-accent);
        --sel-btn-active-color: var(--text-accent);
    }

    .control-palette-accent.control-bordered {
        border: 1.5px solid var(--accent-more);
    }

    .control-palette-accent .control-header {
        color: var(--text-accent);
        border-bottom-color: color-mix(in srgb, var(--text-accent) 30%, transparent);
    }

</style>
