<script lang="ts" generics="T extends string | number | boolean">

    import Button from "../Button/Button.svelte";

    // Types

    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Variant = "flat" | "outlined" | "ghost" | "naked";
    type Size = "sm" | "md" | "lg";
    type Direction = "row" | "column";
    type OptionEntry = { value: T; label?: string };

    interface Props {
        label?: string;
        palette?: Palette;
        variant?: Variant;
        size?: Size;
        rounded?: boolean;
        uppercase?: boolean;
        direction?: Direction;
        options: readonly (T | OptionEntry)[];
        value: T;
        onchange?: (value: T) => void;
    }

    // Props

    let {
        label,
        palette = "accent",
        variant = "outlined",
        size = "sm",
        rounded = false,
        uppercase = false,
        direction = "row",
        options,
        value = $bindable(),
        onchange
    }: Props = $props();

    // Normalisation

    function to_entry(o: T | OptionEntry): OptionEntry {
        if (typeof o === 'object' && o !== null) return o as OptionEntry;
        return { value: o as T, label: String(o) };
    }

    const entries = $derived(options.map(to_entry));

    // Interaction

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
            <Button
                variant={variant}
                palette={palette}
                size={size}
                rounded={rounded}
                uppercase={uppercase}
                direction={direction}
                active={value === entry.value}
                onclick={() => select(entry.value)}
            >
                {entry.label ?? String(entry.value)}
            </Button>
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

</style>
