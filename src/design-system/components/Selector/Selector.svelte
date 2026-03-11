<script lang="ts" generics="T extends string | number | boolean">

    // Types ─────────────────────────────────────────────────────────────────

    type OptionEntry = { value: T; label?: string; swatches?: string[] };

    interface Props {
        label?: string;
        options: readonly (T | OptionEntry)[];
        value: T;
        onchange?: (value: T) => void;
    }

    // Props ─────────────────────────────────────────────────────────────────

    let { 
        label, 
        options, 
        value = $bindable(), 
        onchange 
    }: Props = $props();

    // Normalisation ─────────────────────────────────────────────────────────

    function to_entry(o: T | OptionEntry): OptionEntry {
        if (typeof o === 'object' && o !== null) return o as OptionEntry;
        return { value: o as T, label: String(o) };
    }

    const entries = $derived(options.map(to_entry));

    // Interaction ───────────────────────────────────────────────────────────

    function select(v: T) {
        value = v;
        onchange?.(v);
    }

</script>

<div class="selector">
    {#if label}
        <span class="selector-label">{label}</span>
    {/if}
    <div class="selector-options">
        {#each entries as entry (entry.value)}
            <button
                class="opt-btn"
                class:opt-active={value === entry.value}
                class:opt-palette={!!entry.swatches}
                title={entry.label}
                onclick={() => select(entry.value)}
            >
                {#if entry.swatches}
                    {#each entry.swatches as color}
                        <span 
                            class="swatch" 
                            style="background: {color}"
                        ></span>
                    {/each}
                {:else}
                    {entry.label ?? String(entry.value)}
                {/if}
            </button>
        {/each}
    </div>
</div>

<style>

    .selector {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .selector-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--sel-label-color, var(--text-muted));
    }

    .selector-options {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
    }

    .opt-btn {
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        border: 1.5px solid var(--sel-btn-border, var(--highlight));
        background: transparent;
        color: var(--sel-btn-color, var(--text-muted));
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: capitalize;
        cursor: pointer;
        transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
        font-family: inherit;
        line-height: 1;
        white-space: nowrap;
    }

    .opt-btn:hover {
        border-color: var(--sel-btn-hover-color, var(--accent));
        color: var(--sel-btn-hover-color, var(--accent));
    }

    .opt-btn.opt-active {
        background: var(--sel-btn-active-bg,     var(--accent));
        border-color: var(--sel-btn-active-border,  var(--accent));
        color: var(--sel-btn-active-color,   var(--text-accent));
    }

    /* Bouton palette */

    .opt-btn.opt-palette {
        padding: 0.25rem 0.35rem;
    }

    .opt-btn.opt-palette:hover {
        background: transparent;
    }

    .opt-btn.opt-palette.opt-active {
        background: transparent;
        border-color: var(--sel-btn-active-border, var(--accent));
    }

    .swatch {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        flex-shrink: 0;
    }

</style>
