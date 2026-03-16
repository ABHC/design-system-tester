<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { listItemConfig } from './listItem.config';

    type Size = "sm" | "md" | "lg";
    type Palette = "tone" | "highlight" | "ghost" | "accent" | "error" | "warning" | "success" | "info";
    type Elevation = "none" | "subtle" | "hard";

    export interface SupportingText {
        main: string;
        extra?: string | Snippet;
    }

    interface Props {
        size?: Size;
        palette?: Palette;
        elevation?: Elevation;
        rounded?: boolean;
        active?: boolean;
        leading?: Snippet;
        supporting_text: SupportingText;
        onclick?: () => void;
    }

    let {
        size = "md",
        palette = "tone",
        elevation = "none",
        rounded = false,
        active = false,
        supporting_text,
        leading,
        onclick,
    }: Props = $props();

    const resolve = createVariant(listItemConfig);
    const wrapper_classes = $derived(
        resolve({
            size,
            palette,
            elevation,
            rounded: rounded ? true : undefined,
            active: active ? true : undefined,
        }).trim()
    );
</script>

{#snippet content()}
    {#if leading}
        <div class="leading">
            {@render leading()}
        </div>
    {/if}

    <div class="supporting-text">
        <div class="main-supporting">
            {supporting_text.main}
        </div>
        {#if supporting_text.extra}
            <div class="extra-supporting">
                {#if typeof supporting_text.extra === 'string'}
                    {supporting_text.extra}
                {:else}
                    {@render supporting_text.extra()}
                {/if}
            </div>
        {/if}
    </div>
{/snippet}

{#if onclick}
    <button class="{wrapper_classes}" {onclick}>
        {@render content()}
    </button>
{:else}
    <div class="{wrapper_classes}">
        {@render content()}
    </div>
{/if}

<style>
    /* Reset button styles */
    button.list-item {
        font: inherit;
        text-align: inherit;
        width: 100%;
        cursor: pointer;
    }

    /* Base */
    .list-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border: 2px solid transparent;
        transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    /* Palette — tone ──────────────────────────────────────────────────── */

    .list-item-tone {
        background: var(--listitem-bg, var(--card));
        color: var(--text);
    }

    button.list-item-tone:hover {
        background: var(--listitem-hover-bg, var(--highlight));
    }

    button.list-item-tone.list-item-active {
        border-color: var(--accent);
    }

    /* Palette — highlight (pour usage sur fond card) ─────────────────── */

    .list-item-highlight {
        background: var(--highlight);
        color: var(--text);
    }

    button.list-item-highlight:hover {
        background: color-mix(in srgb, var(--accent) 15%, var(--highlight));
    }

    button.list-item-highlight.list-item-active {
        border-color: var(--accent);
    }

    /* Palette — ghost (s'adapte au contexte via currentColor) ────────── */
    /* Hérite de --listitem-bg / --listitem-hover-bg si définis            */

    .list-item-ghost {
        background: var(--listitem-bg, color-mix(in srgb, currentColor 12%, transparent));
        color: inherit;
    }

    button.list-item-ghost:hover {
        background: var(--listitem-hover-bg, color-mix(in srgb, currentColor 22%, transparent));
    }

    button.list-item-ghost.list-item-active {
        border-color: color-mix(in srgb, currentColor 45%, transparent);
    }

    /* Palette — accent ────────────────────────────────────────────────── */

    .list-item-accent {
        background: var(--listitem-bg, var(--accent));
        color: var(--text-accent);
    }

    button.list-item-accent:hover {
        background: var(--listitem-hover-bg, var(--accent-more));
    }

    button.list-item-accent.list-item-active {
        border-color: color-mix(in srgb, var(--text-accent) 45%, transparent);
    }

    /* Palette — error ─────────────────────────────────────────────────── */

    .list-item-error {
        background: var(--ctx-error-blend);
        color: var(--text);
    }

    button.list-item-error:hover {
        background: color-mix(in srgb, var(--ctx-error) 25%, var(--highlight));
    }

    button.list-item-error.list-item-active {
        border-color: var(--ctx-error);
    }

    /* Palette — warning ───────────────────────────────────────────────── */

    .list-item-warning {
        background: var(--ctx-warning-blend);
        color: var(--text);
    }

    button.list-item-warning:hover {
        background: color-mix(in srgb, var(--ctx-warning) 25%, var(--highlight));
    }

    button.list-item-warning.list-item-active {
        border-color: var(--ctx-warning);
    }

    /* Palette — success ───────────────────────────────────────────────── */

    .list-item-success {
        background: var(--ctx-success-blend);
        color: var(--text);
    }

    button.list-item-success:hover {
        background: color-mix(in srgb, var(--ctx-success) 25%, var(--highlight));
    }

    button.list-item-success.list-item-active {
        border-color: var(--ctx-success);
    }

    /* Palette — info ──────────────────────────────────────────────────── */

    .list-item-info {
        background: var(--ctx-info-blend);
        color: var(--text);
    }

    button.list-item-info:hover {
        background: color-mix(in srgb, var(--ctx-info) 25%, var(--highlight));
    }

    button.list-item-info.list-item-active {
        border-color: var(--ctx-info);
    }

    /* Elevation ───────────────────────────────────────────────────────── */

    .list-item-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .list-item-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow);
    }

    /* Sizes ───────────────────────────────────────────────────────────── */

    .list-item-sm {
        padding: 0.35rem 0.6rem;
        font-size: 0.85rem;
    }

    .list-item-md {
        padding: 0.6rem 0.9rem;
    }

    .list-item-lg {
        padding: 0.9rem 1.25rem;
        font-size: 1.05rem;
    }

    /* Rounded ─────────────────────────────────────────────────────────── */

    .list-item-rounded {
        border-radius: 8px;
    }

    /* Inner elements ──────────────────────────────────────────────────── */

    .leading {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .supporting-text {
        flex: 1;
        min-width: 0;
    }

    .main-supporting {
        font-weight: 600;
        line-height: 1.2;
    }

    .extra-supporting {
        font-size: 0.8em;
        opacity: 0.7;
        margin-top: 0.1rem;
        white-space: pre-line;
    }
</style>
