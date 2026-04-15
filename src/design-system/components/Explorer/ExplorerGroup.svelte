<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { explorerGroupConfig } from "./explorer.config";

    interface Props {
        label: string;
        icon?: Snippet;
        collapsible?: boolean;
        headline?: boolean;
        open?: boolean;
        children: Snippet;
    }

    let {
        label,
        icon,
        collapsible = true,
        headline = true,
        open = true,
        children,
    }: Props = $props();

    let is_open: boolean = $state(open);

    const resolve = createVariant(explorerGroupConfig);

    const group_classes = $derived(
        resolve({
            open: !collapsible ? "true" : is_open ? "true" : "false",
        }).trim()
    );
</script>

<div class={group_classes}>
    {#if collapsible}
        <button
            class="explorer-group-header-btn"
            onclick={() => { is_open = !is_open; }}
            aria-expanded={is_open}
        >
            {#if icon}
                <span class="explorer-group-icon" aria-hidden="true">
                    {@render icon()}
                </span>
            {/if}

            {#if headline}
                <div class="explorer-group-headline">
                    <span class="explorer-group-label">{label}</span>
                    <hr>
                </div>
            {:else}
                <span class="explorer-group-label">{label}</span>
            {/if}

            <span class="explorer-group-chevron" aria-hidden="true">
                <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                >
                    <polyline points="4 2 8 6 4 10" />
                </svg>
            </span>
        </button>
    {:else}
        <div
            class="explorer-group-header"
            aria-expanded={is_open}
        >
            {#if icon}
                <span class="explorer-group-icon" aria-hidden="true">
                    {@render icon()}
                </span>
            {/if}

            {#if headline}
                <div class="explorer-group-headline">
                    <span class="explorer-group-label">{label}</span>
                    <hr>
                </div>
            {:else}
                <span class="explorer-group-label">{label}</span>
            {/if}
        </div>
    {/if}

    {#if is_open}
        <div class="explorer-group-body">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .explorer-group {
        display: flex;
        flex-direction: column;
    }

    .explorer-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.4rem 0.5rem;
        background: transparent;
        border: none;
        color: var(--explorer-text, currentColor);
        border-radius: var(--radius-edge);
        transition: background 0.15s;
        width: 90%;
        text-align: left;
    }

    .explorer-group-header-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.4rem 0.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--explorer-text, currentColor);
        border-radius: var(--radius-edge);
        transition: background 0.15s;
        width: 100%;
        text-align: left;
    }

    .explorer-group-header-btn:hover {
        background: var(--explorer-hover-bg, rgba(128, 128, 128, 0.1));
    }

    .explorer-group-icon {
        display: flex;
        align-items: center;
        font-size: 1rem;
        line-height: 1;
        flex-shrink: 0;
    }

    .explorer-group-headline {
        display: flex;
        align-items: baseline;
        flex: 1;
        gap: 0.25rem;
    }

    .explorer-group-headline hr {
        flex: 1;
        border: 1px solid var(--explorer-text);
    }

    .explorer-group-label {
        /*font-size: 0.7rem;*/
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-family: var(--font-heading, inherit);
        flex: 1;
    }

    .explorer-group-chevron {
        display: flex;
        align-items: center;
        transition: transform 0.2s ease;
        opacity: 1;
        flex-shrink: 0;
    }

    .explorer-group-open .explorer-group-chevron {
        transform: rotate(90deg);
    }

    .explorer-group-body {
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding-left: 0.25rem;
    }
</style>
