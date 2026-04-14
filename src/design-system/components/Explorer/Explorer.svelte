<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { explorerConfig } from "./explorer.config";

    type Palette = "accent" | "tone";

    interface Props {
        palette?: Palette;
        children: Snippet;
        aria_label?: string;
    }

    let {
        palette = "tone",
        children,
        aria_label = "Explorer",
    }: Props = $props();

    const resolve = createVariant(explorerConfig);

    const root_classes = $derived(
        resolve({
            palette,
        }).trim()
    );
</script>

<nav class={root_classes} aria-label={aria_label}>
    {@render children()}
</nav>

<style>
    .explorer-component {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-family: var(--font-body);
    }

    .explorer-palette-accent {
        color: var(--text-accent);
        --explorer-text: var(--text-accent);
        --explorer-muted: var(--text-accent);
        --explorer-hover-bg: var(--accent-ghost-hover);
        --explorer-active: var(--tone-muted);
        --explorer-active-bg: var(--accent-ghost-hover);
        --explorer-active-text: var(--text);
        --explorer-active-border: var(--accent-hover);
        --explorer-separator: var(--accent-hover);
    }

    .explorer-palette-tone {
        color: var(--text);
        --explorer-text: var(--text);
        --explorer-muted: var(--text-muted);
        --explorer-hover-bg: var(--tone-hover);
        --explorer-active: var(--accent-muted);
        --explorer-active-bg: var(--accent);
        --explorer-active-text: var(--text-accent);
        --explorer-active-border: var(--accent);
        --explorer-separator: var(--tone-hover);
    }
</style>
