<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { explorerLinkConfig } from "./explorer.config";

    interface Props {
        label: string;
        href?: string;
        icon?: Snippet;
        active?: boolean;
        onclick?: () => void;
    }

    let {
        label,
        href,
        icon,
        active = false,
        onclick,
    }: Props = $props();

    const resolve = createVariant(explorerLinkConfig);

    const link_classes = $derived(
        resolve({
            active: active ? true : undefined,
        }).trim()
    );
</script>

{#if href}
    <div class="link-container {active ? "link-container-active" : ""}">
        <a class={link_classes} {href} onclick={onclick}>
            {#if icon}
                <span class="explorer-link-icon" aria-hidden="true">
                    {@render icon()}
                </span>
            {/if}
            <span class="explorer-link-label">{label}</span>
        </a>
    </div>
{:else}
    <div class="link-container">
        <button class={link_classes} onclick={onclick} type="button">
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
    .link-container {
        margin-left: 0.35rem;
        border-left: 2px solid var(--explorer-muted);
    }

    .explorer-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.6rem;
        border: none;
        background: transparent;
        color: var(--explorer-muted, currentColor);
        cursor: pointer;
        border-radius: 6px;
        text-decoration: none;
        transition: background 0.15s;
        /*width: 100%;*/
        text-align: left;
        font-family: inherit;
        font-size: 0.82rem;
        line-height: 1.3;
        /*border-left: 2px solid var(--explorer-muted);*/
        margin-left: 0.3rem;
    }

    .explorer-link:hover {
        background: var(--explorer-hover-bg, rgba(128, 128, 128, 0.1));
    }

    .link-container-active {
        border-left-color: var(--explorer-active-border, currentColor);
    }

    .explorer-link-active {
        color: var(--explorer-active-text);
        /*background: var(--explorer-active-bg, rgba(128, 128, 128, 0.15));*/
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
