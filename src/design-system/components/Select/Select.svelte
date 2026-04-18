<script lang="ts" generics="T extends string | number">
    import type { Snippet } from 'svelte';
    import { createVariant } from '../../utils/builder';
    import { selectConfig } from './select.config';
    import SearchField from '../SearchField/SearchField.svelte';
    import Popover from '../Popover/Popover.svelte';
    import type { PopoverPalette, PopoverElevation } from '../Popover/popover.config';

    type Size = "sm" | "md" | "lg";
    type OptionEntry = { value: T; label?: string };
    type Direction = "bottom" | "top" | "left" | "right"

    interface Props {
        value?: T;
        options: readonly (T | OptionEntry)[];
        placeholder?: string;
        label?: string;
        hint?: string;
        error?: string;
        success?: string;
        size?: Size;
        disabled?: boolean;
        required?: boolean;
        searchable?: boolean;
        searchPlaceholder?: string;
        name?: string;
        id?: string;
        onchange?: (value: T) => void;
        leading?: Snippet;
        trailing?: Snippet;
        palette?: PopoverPalette;
        rounded?: boolean;
        elevation?: PopoverElevation;
        direction?: Direction;
    }

    let {
        value = $bindable(),
        options,
        placeholder = "Select an option",
        label,
        hint,
        error,
        success,
        size = "md",
        disabled = false,
        required = false,
        searchable = false,
        searchPlaceholder = "Search\u2026",
        name,
        id,
        onchange,
        leading,
        trailing,
        palette = "tone",
        rounded = false,
        elevation = "none",
        direction = "bottom",
    }: Props = $props();

    const uid = id ?? `select-${Math.random().toString(36).slice(2, 7)}`;

    const resolve = createVariant(selectConfig);

    let open: boolean = $state(false);
    let search: string = $state("");

    // Normalise options to { value, label }
    function to_entry(o: T | OptionEntry): OptionEntry {
        if (typeof o === 'object' && o !== null) return o as OptionEntry;
        return { value: o as T, label: String(o) };
    }

    const entries = $derived(options.map(to_entry));

    const filtered = $derived(
        searchable && search.trim()
            ? entries.filter(e => {
                const text = (e.label ?? String(e.value)).toLowerCase();
                return text.includes(search.trim().toLowerCase());
            })
            : entries
    );

    const selected_label = $derived(
        value !== undefined
            ? entries.find(e => e.value === value)?.label ?? String(value)
            : undefined
    );

    const root_classes = $derived(
        resolve({
            size,
            palette,
            disabled: disabled ? true : undefined,
            has_error: error ? true : undefined,
            has_success: success && !error ? true : undefined,
        }).trim()
    );

    function toggle() {
        if (disabled) return;
        open = !open;
        if (open) search = "";
    }

    function select_entry(entry: OptionEntry) {
        value = entry.value;
        onchange?.(entry.value);
        open = false;
    }

    function handle_trigger_keydown(e: KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
        if (e.key === "Escape" && open) {
            e.preventDefault();
            open = false;
        }
    }

    function close() {
        open = false;
    }
</script>

<div class={root_classes}>
    {#if label}
        <label class="select-label" for={uid}>
            {label}
            {#if required}
                <span class="select-required" aria-hidden="true">*</span>
            {/if}
        </label>
    {/if}

    <Popover
        bind:open
        onclose={close}
        matchWidth
        {palette}
        {rounded}
        {elevation}
        {direction}
    >
        {#snippet trigger()}
            <button
                class="select-trigger"
                type="button"
                id={uid}
                {disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                onclick={toggle}
                onkeydown={handle_trigger_keydown}
            >
                <span class="select-value" class:is-placeholder={value === undefined}>
                    {selected_label ?? placeholder}
                </span>
                <svg class="select-chevron" class:select-chevron-open={open} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            {#if name}
                <input type="hidden" {name} value={value ?? ""} />
            {/if}
        {/snippet}

        {#snippet children()}
            <div role="listbox" aria-labelledby={uid}>
                {#if leading || searchable}
                    <div class="select-header">
                        {#if leading}
                            {@render leading()}
                        {:else if searchable}
                            <SearchField
                                bind:value={search}
                                placeholder={searchPlaceholder}
                                {size}
                                palette={palette}
                                autofocus
                            />
                        {/if}
                    </div>
                {/if}

                <div class="select-options">
                    {#each filtered as entry (entry.value)}
                        <button
                            class="select-option"
                            class:select-option-active={value === entry.value}
                            type="button"
                            role="option"
                            aria-selected={value === entry.value}
                            onclick={() => select_entry(entry)}
                        >
                            {entry.label ?? String(entry.value)}
                            {#if value === entry.value}
                                <svg class="select-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <polyline points="4 12 10 18 20 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            {/if}
                        </button>
                    {:else}
                        <div class="select-empty">No results</div>
                    {/each}
                </div>

                {#if trailing}
                    <div class="select-footer">
                        {@render trailing()}
                    </div>
                {/if}
            </div>
        {/snippet}
    </Popover>

    {#if error}
        <span class="select-message select-message-error" role="alert">{error}</span>
    {:else if success}
        <span class="select-message select-message-success">{success}</span>
    {:else if hint}
        <span class="select-message">{hint}</span>
    {/if}
</div>

<style>
    /* Root ------------------------------------------------------------ */

    .select-root {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        width: 100%;
        position: relative;
    }

    /* Label ----------------------------------------------------------- */

    .select-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text);
        line-height: 1.3;
    }

    .select-required {
        color: var(--error);
    }

    /* Trigger --------------------------------------------------------- */

    .select-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: var(--tone);
        border: 2px solid var(--tone-hover);
        border-radius: var(--radius-edge);
        color: var(--text);
        font-family: var(--font-body);
        cursor: pointer;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        gap: 0.5rem;
        text-align: left;
    }

    .select-trigger:hover:not(:disabled) {
        border-color: var(--accent-muted);
    }

    .select-trigger:focus-visible {
        outline: none;
        border-color: var(--accent-muted);
        box-shadow: 0 0 0 3px var(--accent-ghost-hover);
    }

    .select-value {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .select-value.is-placeholder {
        color: var(--text-muted);
        opacity: 0.7;
    }

    /* Chevron --------------------------------------------------------- */

    .select-chevron {
        width: 1.1em;
        height: 1.1em;
        flex-shrink: 0;
        color: var(--text-muted);
        transition: transform 0.15s ease;
    }

    .select-chevron-open {
        transform: rotate(180deg);
    }

    /* Header ---------------------------------------------------------- */

    .select-header {
        padding: 0.5rem;
        border-bottom: 1px solid var(--tone-hover);
        flex-shrink: 0;
    }

    /* Options list ---------------------------------------------------- */

    .select-options {
        flex: 1;
        overflow-y: auto;
        padding: 0.25rem;
    }

    /* Single option --------------------------------------------------- */

    .select-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: none;
        border: none;
        border-radius: var(--radius-edge);
        color: var(--text);
        font-family: var(--font-body);
        cursor: pointer;
        text-align: left;
        transition: background 0.1s ease;
        gap: 0.5rem;
    }

    .select-option-active {
        font-weight: 700;
    }

    .select-check {
        width: 1em;
        height: 1em;
        flex-shrink: 0;
    }

    /* Option palette - tone ------------------------------------------- */

    .select-option-tone .select-option:hover {
        background: var(--tone-ghost-hover);
    }

    .select-option-tone .select-option-active {
        background: var(--accent-ghost-hover);
        color: var(--accent-muted);
    }

    /* Option palette - accent ----------------------------------------- */

    .select-option-accent .select-option:hover {
        background: var(--accent-hover);
    }

    .select-option-accent .select-option-active {
        background: var(--accent-hover);
        color: var(--text-accent);
    }

    /* Option palette - accentbg --------------------------------------- */

    .select-option-accentbg .select-option:hover {
        background: var(--accent-ghost-hover);
    }

    .select-option-accentbg .select-option-active {
        background: var(--accent-ghost-hover);
        color: var(--text-accent);
    }

    /* Empty state ----------------------------------------------------- */

    .select-empty {
        padding: 0.75rem;
        text-align: center;
        color: var(--text-muted);
        font-size: 0.85rem;
    }

    /* Footer ---------------------------------------------------------- */

    .select-footer {
        padding: 0.5rem;
        border-top: 1px solid var(--tone-hover);
        flex-shrink: 0;
    }

    /* Message --------------------------------------------------------- */

    .select-message {
        font-size: 0.75rem;
        color: var(--text-muted);
        line-height: 1.4;
    }

    .select-message-error {
        color: var(--error);
    }

    .select-message-success {
        color: var(--success);
    }

    /* Sizes ----------------------------------------------------------- */

    .select-sm .select-trigger {
        font-size: 0.8rem;
        padding: 0.35rem 0.65rem;
        border-radius: var(--radius-edge);
    }

    .select-sm .select-label {
        font-size: 0.78rem;
    }

    .select-sm .select-message {
        font-size: 0.7rem;
    }

    .select-sm .select-option {
        font-size: 0.8rem;
        padding: 0.3rem 0.5rem;
    }

    .select-md .select-trigger {
        font-size: 0.9rem;
        padding: 0.6rem 0.9rem;
    }

    .select-md .select-option {
        font-size: 0.9rem;
        padding: 0.45rem 0.65rem;
    }

    .select-lg .select-trigger {
        font-size: 1rem;
        padding: 0.85rem 1.1rem;
        border-radius: var(--radius-soft);
    }

    .select-lg .select-label {
        font-size: 0.9rem;
    }

    .select-lg .select-option {
        font-size: 1rem;
        padding: 0.55rem 0.75rem;
    }

    /* Validation states ----------------------------------------------- */

    .select-has-error .select-trigger {
        border-color: var(--error);
    }

    .select-has-error .select-trigger:focus-visible {
        border-color: var(--error);
        box-shadow: 0 0 0 3px var(--error-ghost-hover);
    }

    .select-has-success .select-trigger {
        border-color: var(--success);
    }

    .select-has-success .select-trigger:focus-visible {
        border-color: var(--success);
        box-shadow: 0 0 0 3px var(--success-ghost-hover);
    }

    /* Disabled -------------------------------------------------------- */

    .select-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .select-disabled .select-trigger {
        cursor: not-allowed;
    }
</style>
