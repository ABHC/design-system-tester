<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { searchFieldConfig, defaultSearchFieldConfig } from "./searchfield.config";
    import type { SearchFieldSize, SearchFieldPalette } from "./searchfield.config";

    import { onMount } from "svelte";

    interface Props {
        value?: string;
        placeholder?: string;
        clearable?: boolean;
        disabled?: boolean;
        autofocus?: boolean;
        naked?: boolean;
        size?: SearchFieldSize;
        rounded?: boolean;
        palette?: SearchFieldPalette;
    }

    let {
        value = $bindable(""),
        placeholder = "Search\u2026",
        clearable = defaultSearchFieldConfig.clearable,
        disabled = false,
        autofocus = false,
        naked = false,
        size = defaultSearchFieldConfig.size,
        rounded = defaultSearchFieldConfig.rounded,
        palette = defaultSearchFieldConfig.palette,
    }: Props = $props();

    const resolve = createVariant(searchFieldConfig);

    const classes = $derived(
        resolve({
            size,
            palette,
            rounded,
            naked: naked ? true : undefined,
            disabled: disabled ? true : undefined,
        })
    );

    let input_el: HTMLInputElement | undefined = $state();

    onMount(() => {
        if (autofocus) input_el?.focus();
    });

    function clear() {
        value = "";
        input_el?.focus();
    }
</script>

<div class={classes}>
    <svg
        class="search-field-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
        <line
            x1="16.5" y1="16.5"
            x2="21" y2="21"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
        />
    </svg>

    <input
        bind:this={input_el}
        class="search-field-input"
        type="text"
        {placeholder}
        {disabled}
        bind:value
        onclick={(e) => e.stopPropagation()}
    />

    {#if clearable && value}
        <button
            class="search-field-clear"
            type="button"
            aria-label="Clear search"
            onclick={clear}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                aria-hidden="true"
            >
                <line 
                    x1="6" 
                    y1="6" 
                    x2="18" 
                    y2="18" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round"
                />
                <line 
                    x1="18" 
                    y1="6" 
                    x2="6" 
                    y2="18" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round"
                />
            </svg>
        </button>
    {/if}
</div>

<style>
    /* Base ------------------------------------------------------------ */

    .search-field {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        border: 2px solid var(--sf-border);
        padding: 0 0.5rem;
        background: var(--sf-bg);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .search-field:focus-within {
        border-color: var(--sf-focus);
        box-shadow: 0 0 0 3px var(--accent-ghost-hover);
    }

    /* Icon ------------------------------------------------------------ */

    .search-field-icon {
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        color: var(--text-muted);
    }

    /* Input ----------------------------------------------------------- */

    .search-field-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        font-family: var(--font-body);
        min-width: 0;
    }

    .search-field-input::placeholder {
        color: var(--text-muted);
        opacity: 0.7;
    }

    /* Clear button ---------------------------------------------------- */

    .search-field-clear {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0.15rem;
        cursor: pointer;
        color: var(--text-muted);
        border-radius: var(--radius-edge);
        transition: color 0.1s ease, background 0.1s ease;
    }

    .search-field-clear:hover {
        color: var(--text);
        background: var(--tone-hover);
    }

    .search-field-clear svg {
        width: 1.25em;
        height: 1.25em;
    }

    /* Palette - tone -------------------------------------------------- */

    .search-field-palette-tone {
        --sf-bg: var(--tone-bg);
        --sf-border: var(--tone-hover);
        --sf-focus: var(--accent-muted);
        --sf-shadow: var(--accent-ghost-hover);
    }

    /* Palette - accent ------------------------------------------------ */

    .search-field-palette-accent {
        --sf-bg: var(--tone-bg);
        --sf-border: var(--accent-muted);
        --sf-focus: var(--tone-muted);
        --sf-shadow: var(--accent-ghost-hover);
    }

    /* Palette - accentbg ---------------------------------------------- */

    .search-field-palette-accentbg {
        --sf-bg: var(--tone-bg);
        --sf-border: var(--accent-bg);
        --sf-focus: var(--tone-muted);
        --sf-shadow: var(--accent-ghost-hover);
    }

    /* Rounded --------------------------------------------------------- */

    .search-field-rounded {
        border-radius: var(--radius-round);
    }

    /* Naked ----------------------------------------------------------- */

    .search-field-naked {
        width: 100%;
        border: none;
        border-radius: 0;
        background: transparent;
    }

    .search-field-naked:focus-within {
        box-shadow: none;
    }

    /* Disabled -------------------------------------------------------- */

    .search-field-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .search-field-disabled .search-field-input {
        cursor: not-allowed;
    }

    /* Size - sm ------------------------------------------------------- */

    .search-field-sm {
        font-size: 0.8rem;
        padding: 0 0.4rem;
    }

    .search-field-sm .search-field-input {
        font-size: 0.8rem;
        padding: 0.25rem 0;
    }

    /* Size - md ------------------------------------------------------- */

    .search-field-md {
        font-size: 0.875rem;
    }

    .search-field-md .search-field-input {
        font-size: 0.85rem;
        padding: 0.35rem 0;
    }

    /* Size - lg ------------------------------------------------------- */

    .search-field-lg {
        font-size: 1rem;
        padding: 0 0.65rem;
    }

    .search-field-lg .search-field-input {
        font-size: 0.95rem;
        padding: 0.45rem 0;
    }

    .search-field-lg .search-field-icon {
        width: 1.15em;
        height: 1.15em;
    }
</style>
