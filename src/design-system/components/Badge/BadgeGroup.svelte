<script lang="ts">
    import Badge from "./Badge.svelte";
    import type { BadgeItem } from "./badge.config";

    type Variant = "flat" | "outlined";
    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info" | "neutral";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    /*
        Props _________________________________________________________
        badges : Array of BadgeItem - each needs { value, label }
        selected : Bindable array of active `value` strings
                   Bind this to your own state to drive filtering logic.
                   ex : bind:selected={activeSkills}
        multiple : true (default) → multiple badges selectable simultaneously
                   false → single-select, deselects on re-click
        variant : Passed through to every Badge
        size : Passed through to every Badge
        pill : Passed through to every Badge
        gap : Flex gap between badges - any valid CSS length
    */

    interface Props {
        badges: BadgeItem[];
        selected?: string[];
        multiple?: boolean;
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        pill?: boolean;
        gap?: string;
    }

    let {
        badges,
        selected = $bindable([]),
        multiple = true,
        variant = "flat",
        palette = "accent",
        size = "md",
        elevation = "none",
        pill = true,
        gap = "0.5rem",
    }: Props = $props();

    // Selection logic --------------------------------------------------------

    function toggle(value: string) {
        if (multiple) {
            if (selected.includes(value)) {
                selected = selected.filter(v => v !== value);
            } else {
                selected = [...selected, value];
            }
        } else {
            selected = selected.includes(value) ? [] : [value];
        }
    }
</script>

<div class="badge-group" style="--badge-group-gap: {gap};" role="group">
    {#each badges as badge (badge.value)}
        <Badge
            {variant}
            {palette}
            {size}
            {pill}
            {elevation}
            selected={selected.includes(badge.value)}
            onclick={() => toggle(badge.value)}
        >
            {badge.label}
        </Badge>
    {/each}
</div>

<style>
    .badge-group {
        display: flex;
        flex-wrap: wrap;
        gap: var(--badge-group-gap, 0.5rem);
        align-items: center;
    }
</style>
