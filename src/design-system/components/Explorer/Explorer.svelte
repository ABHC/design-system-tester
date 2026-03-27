<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { explorerConfig } from "./explorer.config";

    type Palette = "accent" | "tone";

    interface Props {
        palette?: Palette;
        rounded?: boolean;
        children: Snippet;
        aria_label?: string;
    }

    let {
        palette = "tone",
        rounded = false,
        children,
        aria_label = "Explorer",
    }: Props = $props();

    const resolve = createVariant(explorerConfig);

    const root_classes = $derived(
        resolve({
            palette,
            rounded: rounded ? true : undefined,
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

    .explorer-rounded {
        border-radius: 10px;
    }

    .explorer-palette-accent {
        color: var(--text-accent);
        --explorer-text: var(--text-accent);
        --explorer-muted: var(--text-accent);
        --explorer-hover-bg: var(--accent-ghost-hover);
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
        --explorer-active-bg: var(--accent);
        --explorer-active-text: var(--accent-muted);
        --explorer-active-border: var(--accent);
        --explorer-separator: var(--tone-hover);
    }
</style>
