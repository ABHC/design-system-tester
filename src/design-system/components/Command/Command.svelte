<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import Modal from "../Modal/Modal.svelte";
    import Headline from "../Headline/Headline.svelte";
    import SearchField from "../SearchField/SearchField.svelte";
    import { CommandConfig, defaultCommandConfig } from "./command.config";
    import {
        type CommandItem,
        type CommandGroup,
        type CommandPalette,
        type CommandElevation,
    } from "./command.config";

    interface Props {
        open?: boolean;
        items: CommandItem[];
        groups?: CommandGroup[];
        placeholder?: string;
        empty_placeholder?: string;
        onselect: (item: CommandItem) => void;
        onclose?: () => void;
        item?: Snippet<[CommandItem]>;
        empty?: Snippet;
        palette?: CommandPalette;
        rounded?: boolean;
        elevation?: CommandElevation;
        width?: string;
    }

    let {
        open = $bindable(false),
        items,
        groups = [],
        placeholder = defaultCommandConfig.placeholder,
        empty_placeholder = defaultCommandConfig.empty_placeholder,
        onselect,
        onclose,
        item,
        empty,
        palette = defaultCommandConfig.palette,
        rounded = defaultCommandConfig.rounded,
        elevation = defaultCommandConfig.elevation,
        width = defaultCommandConfig.width,
    }: Props = $props();

    let search: string = $state("");
    let active_index: number = $state(0);
    const resolve = createVariant(CommandConfig);
    const cmd_classes = $derived(resolve({ palette }));

    // Filter items by search term (label + keywords)
    const filtered = $derived.by(() => {
        const term = search.trim().toLowerCase();
        if (!term) return items.filter(i => !i.disabled);

        return items.filter(i => {
            if (i.disabled) return false;
            if (i.label.toLowerCase().includes(term)) return true;
            if (i.keywords?.some(k => k.toLowerCase().includes(term))) return true;
            return false;
        });
    });

    // Group filtered items for display
    type VisibleGroup = { id: string; label: string; items: CommandItem[] };

    const visible_groups = $derived.by((): VisibleGroup[] => {
        if (!groups.length) {
            return [{ id: "__default", label: "", items: filtered }];
        }

        const ungrouped = filtered.filter(i => !i.group);
        const grouped = groups
            .map(g => ({
                id: g.id,
                label: g.label,
                items: filtered.filter(i => i.group === g.id),
            }))
            .filter(g => g.items.length > 0);

        if (ungrouped.length) {
            return [{ id: "__default", label: "", items: ungrouped }, ...grouped];
        }
        return grouped;
    });

    // Flat list of visible items for keyboard navigation
    const flat_items = $derived(visible_groups.flatMap(g => g.items));

    // Reset state when opening
    $effect(() => {
        if (open) {
            search = "";
            active_index = 0;
        }
    });

    // Clamp active_index when filtered list changes
    $effect(() => {
        if (active_index >= flat_items.length) {
            active_index = Math.max(0, flat_items.length - 1);
        }
    });

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            active_index = (active_index + 1) % flat_items.length;
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            active_index = (active_index - 1 + flat_items.length) % flat_items.length;
        } else if (e.key === "Enter") {
            e.preventDefault();
            const current = flat_items[active_index];
            if (current) select_item(current);
        }
    }

    function select_item(entry: CommandItem) {
        onselect(entry);
        open = false;
    }

    function handle_close() {
        open = false;
        onclose?.();
    }
</script>

<svelte:window onkeydown={open ? handle_keydown : undefined} />

<Modal
    {open}
    onclose={handle_close}
    {palette}
    {rounded}
    {elevation}
    {width}
>
    {#snippet leading()}
        <SearchField
            bind:value={search}
            {placeholder}
            size="lg"
            palette={palette}
            autofocus
            naked
        />
    {/snippet}

    {#snippet children()}
        {#if flat_items.length === 0}
            {#if empty}
                {@render empty()}
            {:else}
                <div class="command-empty">{empty_placeholder}</div>
            {/if}
        {:else}
            <div class={cmd_classes}>
                {#each visible_groups as group}
                    {#if group.label}
                        <div class="group-label" style="--color: var(--cmd-txt);">
                            <Headline size="xs" uppercase>{group.label}</Headline>
                        </div>
                    {/if}
                    {#each group.items as entry}
                        <button
                            class="command-item {cmd_classes}"
                            class:command-item-active={flat_items[active_index]?.id === entry.id}
                            type="button"
                            onclick={() => select_item(entry)}
                            onmouseenter={() => {
                                active_index = flat_items.findIndex(i => i.id === entry.id);
                            }}
                        >
                            {#if item}
                                {@render item(entry)}
                            {:else}
                                <span class="command-item-label">{entry.label}</span>
                                {#if entry.hint}
                                    <span class="command-item-hint">{entry.hint}</span>
                                {/if}
                            {/if}
                        </button>
                    {/each}
                {/each}
            </div>
        {/if}
    {/snippet}
</Modal>

<style>
    /* Empty state ------------------------------------------------------ */

    .command-empty {
        padding: 2rem 1rem;
        text-align: center;
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    /* Group label ------------------------------------------------------ */

    .command-group-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
        padding: 0.75rem 0.75rem 0.35rem;
    }

    .command-item ~ .group-label {                                                                                                                                                                                                      
        margin-top: 10px;                                                                                                                                                                                                               
    }


    /* Item ------------------------------------------------------------- */

    .command-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: none;
        border: none;
        border-radius: var(--radius-edge);
        color: var(--cmd-txt);
        font-family: var(--font-body);
        font-size: 0.9rem;
        padding: 0.55rem 0.75rem;
        cursor: pointer;
        text-align: left;
        transition: background 0.08s ease;
        gap: 0.75rem;
    }

    .command-item:hover,
    .command-item-active {
        background: var(--accent-ghost-hover);
    }

    .command-item-label {
        flex: 1;
        min-width: 0;
    }

    .command-item-hint {
        font-size: 0.75rem;
        color: var(--text-muted);
        flex-shrink: 0;
        font-weight: 500;
    }

    /* Palettes --------------------------------------------------------- */

    .command-tone {
        --cmd-txt:var(--text);
    }

    .command-accent {
        --cmd-txt:var(--text-accent);
    }

    .command-accentbg {
        --cmd-txt:var(--text);
    }


</style>
