<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { FontConfig } from "$lib/types/fonts";

    // Props
    interface Props {
        items: ToneTheme[] | AccentTheme[] | FontConfig[];
        selected: ToneTheme | AccentTheme | FontConfig;
        on_item_change: (index: number) => void;
    }

    let {
        items,
        selected,
        on_item_change,
    }: Props = $props();

    import { trans } from './store';

    let max_visible_item:number = 3;
    let open: boolean = $state(false);
</script>

<!-- Item Controls -->
<div class="btn-group {open === true ? 'scrollable' : ''}">
    {#if !open}
        {#each items.slice(0, max_visible_item) as item, index}
            <button 
                class="control-btn {item.name === selected.name ? 'active' : ''}" 
                onclick={() => on_item_change(index)}
            >
                {item.name}
            </button>
        {/each}

        <button 
            class="control-btn" 
            onclick={() => open = true}
        >
            {$trans?.control.more}
        </button>
    {:else}
        {#each items as item, index}
            <button 
                class="control-btn {item.name === selected.name ? 'active' : ''}" 
                onclick={() => on_item_change(index)}
            >
                {item.name}
            </button>
        {/each}

        <button 
            class="control-btn" 
            onclick={() => open = false}
        >
            {$trans?.control.less}
        </button>
    {/if}
</div>

<style>
    .btn-group {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    /* Scrollable container for overflowing items */
    .btn-group.scrollable {
        /*display: flex;*/
        flex-wrap: wrap;
        gap: 8px;
        max-height: 140px;
        overflow-y: auto;
        padding-right: 4px;
    }

    /* Firefox scrollbar */
    .btn-group.scrollable {
        scrollbar-color: var(--accent) transparent;
        scrollbar-width: thin;
    }

    .control-btn {
        padding: 8px 16px;
        border: 2px solid var(--accent);
        background: transparent;
        color: var(--text);
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
    }

    .control-btn:hover {
        background: var(--accent);
        color: var(--text-accent);
    }

    .control-btn.active {
        background: var(--accent);
        color: var(--text-accent);
    }
</style>
