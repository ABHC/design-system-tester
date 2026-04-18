<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { explorerLinkConfig } from "./explorer.config";

    interface Props {
        label: string;
        href?: string;
        icon?: Snippet;
        active?: boolean;
        naked?: boolean;
        onclick?: () => void;
    }

    let {
        label,
        href,
        icon,
        active = false,
        naked = false,
        onclick,
    }: Props = $props();

    const resolve = createVariant(explorerLinkConfig);

    const container_classes = $derived(
        resolve({
            active: active ? true : undefined,
            naked: naked ? true : undefined,
        }).trim()
    );
</script>

{#if href}
    <div class={container_classes}>
        <a class="explorer-link-item" {href} onclick={onclick}>
            {#if icon}
                <span class="explorer-link-icon" aria-hidden="true">
                    {@render icon()}
                </span>
            {/if}
            <span class="explorer-link-label">{label}</span>
        </a>
    </div>
{:else}
    <div class={container_classes}>
        <button class="explorer-link-item" onclick={onclick} type="button">
            {#if icon}
                <span class="explorer-link-icon" aria-hidden="true">
                    {@render icon()}
                </span>
            {/if}
            <span class="explorer-link-label">{label}</span>
        </button>
    </div>
{/if}

<style>
    /* Container - carries the left border indicator */
    .explorer-link {
        margin-left: 0.35rem;
        border-left: 2px solid var(--explorer-hover-bg);
    }

    .explorer-link-active {
        border-left-color: var(--explorer-active, currentColor);
    }

    .explorer-link-naked {
        border-left-color: transparent;
    }

    /* Item - the interactive a/button inside the container */
    .explorer-link-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.6rem;
        border: none;
        background: transparent;
        color: var(--explorer-muted, currentColor);
        cursor: pointer;
        border-radius: var(--radius-edge);
        text-decoration: none;
        transition: background 0.15s;
        text-align: left;
        font-family: inherit;
        font-size: 0.82rem;
        line-height: 1.3;
        margin-left: 0.3rem;
    }

    .explorer-link-item:hover {
        background: var(--explorer-hover-bg, rgba(128, 128, 128, 0.1));
    }

    /* Active state cascades from container to item */
    .explorer-link-active .explorer-link-item {
        color: var(--explorer-active);
        font-weight: 600;
    }

    .explorer-link-icon {
        display: flex;
        align-items: center;
        font-size: 1rem;
        line-height: 1;
        flex-shrink: 0;
    }

    .explorer-link-label {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
