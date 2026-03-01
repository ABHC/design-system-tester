<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { listItemConfig } from './listItem.config';

    type Size = "sm" | "md" | "lg";
    type Palette   = "accent" | "tone";

    export interface SupportingText {
        main: string;
        extra?: string | Snippet;
    }

    interface Props {
        size?: Size;
        palette?: Palette;
        rounded?: boolean;
        active?: boolean;
        leading?: Snippet;
        supporting_text: SupportingText;
        onclick?: () => void;
    }

    let {
        size = "md",
        palette = "tone",
        rounded = false,
        active = false,
        supporting_text,
        leading,
        onclick,
    }: Props = $props();

    // Variant resolution
    const resolve = createVariant(listItemConfig);
    const wrapper_classes = $derived(
        resolve({
            size,
            palette,
            rounded: rounded ? true : undefined,
            active: active ? true : undefined,
        }).trim()
    );
</script>

<div
    class="{wrapper_classes}"
    aria-label="List Item"
    role={onclick ? "button" : undefined}
    tabindex={onclick ? 0 : undefined}
    {onclick}
>
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
</div>

<style>
    /* Base */
    .list-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        border: 2px solid transparent;
        transition: background 0.2s ease, border-color 0.2s ease;
    }

    /* Palette — tone */
    .list-item-tone {
        background: var(--listitem-bg, var(--card));
        color: var(--text);
    }

    .list-item-tone:hover {
        background: var(--listitem-hover-bg, var(--highlight));
    }

    /* Palette — accent */
    .list-item-accent {
        background: var(--listitem-bg, var(--accent));
        color: var(--text-accent);
    }

    .list-item-accent:hover {
        background: var(--listitem-hover-bg, var(--accent-more));
    }

    /* Active — la bordure prend la couleur accent */
    .list-item-tone.list-item-active {
        border-color: var(--accent);
    }

    .list-item-accent.list-item-active {
        border-color: color-mix(in srgb, var(--text-accent) 45%, transparent);
    }

    /* Sizes */
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

    /* Rounded */
    .list-item-rounded {
        border-radius: 8px;
    }

    /* Inner elements */
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
