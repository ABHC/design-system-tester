<script lang="ts">
    import { createVariant } from '../../utils/builder';
    import { checkboxGroupConfig } from './checkboxgroup.config';

    type Palette = "accent" | "tone";
    type Size = "sm" | "md" | "lg";
    type LabelPosition = "right" | "left" | "top" | "bottom";

    interface Option {
        value: string;
        label: string;
        disabled?: boolean;
    }

    interface Props {
        value?: string[];
        options?: Option[];
        name?: string;
        palette?: Palette;
        size?: Size;
        label_position?: LabelPosition;
        disabled?: boolean;
        aria_label?: string;
    }

    let {
        value = $bindable([]),
        options = [],
        name,
        palette = "accent",
        size = "md",
        label_position = "right",
        disabled = false,
        aria_label,
    }: Props = $props();

    const resolve = createVariant(checkboxGroupConfig);

    const group_classes = $derived(
        resolve({
            palette,
            size,
            label_position,
            disabled: disabled ? true : undefined,
        }).trim()
    );
</script>

<div class={group_classes} role="group" aria-label={aria_label}>
    {#each options as option}
        {@const item_disabled = disabled || !!option.disabled}
        <label
            class="checkbox-item"
            class:checkbox-item-disabled={!disabled && !!option.disabled}
        >
            <input
                type="checkbox"
                class="checkbox-input"
                bind:group={value}
                value={option.value}
                {name}
                disabled={item_disabled}
            />
            <span class="checkbox-control" aria-hidden="true"></span>
            <span class="checkbox-label-text">{option.label}</span>
        </label>
    {/each}
</div>

<style>
    /* Hidden input -------------------------------------------------------- */

    .checkbox-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
    }

    /* Group --------------------------------------------------------------- */

    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    /* When labels are above/below, a row layout is more natural */
    .checkbox-label-top,
    .checkbox-label-bottom {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.25rem;
    }

    /* Item ---------------------------------------------------------------- */

    .checkbox-item {
        display: inline-flex;
        align-items: center;
        gap: var(--checkbox-gap, 0.5rem);
        cursor: pointer;
        user-select: none;
        line-height: 1.3;
    }

    /* Label positions - flex direction on each item */
    .checkbox-label-right .checkbox-item {
        flex-direction: row;
    }

    .checkbox-label-left .checkbox-item {
        flex-direction: row-reverse;
    }

    .checkbox-label-top .checkbox-item {
        flex-direction: column-reverse;
        align-items: center;
    }

    .checkbox-label-bottom .checkbox-item {
        flex-direction: column;
        align-items: center;
    }

    /* Control (custom checkbox square) ------------------------------------ */

    .checkbox-control {
        position: relative;
        flex-shrink: 0;
        width: var(--checkbox-size, 18px);
        height: var(--checkbox-size, 18px);
        border-radius: var(--radius-edge);
        border: 2px solid var(--text-muted);
        background: transparent;
        transition: border-color 0.2s ease, background 0.2s ease;
    }

    /* Checkmark */
    .checkbox-control::after {
        content: '';
        position: absolute;
        top: 45%;
        left: 50%;
        width: var(--checkbox-check-w, 5px);
        height: var(--checkbox-check-h, 9px);
        border: 2px solid transparent;
        border-top: none;
        border-left: none;
        transform: translate(-50%, -50%) rotate(45deg) scale(0);
        transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Checked state */
    .checkbox-input:checked ~ .checkbox-control {
        border-color: var(--checkbox-checked-color, var(--accent));
        background: var(--checkbox-checked-color, var(--accent));
    }

    .checkbox-input:checked ~ .checkbox-control::after {
        border-color: var(--checkbox-check-color, white);
        transform: translate(-50%, -50%) rotate(45deg) scale(1);
    }

    /* Label text */
    .checkbox-label-text {
        font-size: var(--checkbox-font, 0.9rem);
        font-weight: 500;
        color: inherit;
    }

    /* Sizes --------------------------------------------------------------- */

    .checkbox-size-sm {
        --checkbox-size: 14px;
        --checkbox-check-w: 4px;
        --checkbox-check-h: 7px;
        --checkbox-font: 0.8rem;
        --checkbox-gap: 0.4rem;
    }

    .checkbox-size-md {
        --checkbox-size: 18px;
        --checkbox-check-w: 5px;
        --checkbox-check-h: 9px;
        --checkbox-font: 0.9rem;
        --checkbox-gap: 0.5rem;
    }

    .checkbox-size-lg {
        --checkbox-size: 22px;
        --checkbox-check-w: 6px;
        --checkbox-check-h: 11px;
        --checkbox-font: 1rem;
        --checkbox-gap: 0.6rem;
    }

    /* Palettes ------------------------------------------------------------ */

    .checkbox-palette-accent {
        --checkbox-checked-color: var(--accent);
        --checkbox-check-color: var(--text-accent);
    }

    .checkbox-palette-tone {
        --checkbox-checked-color: var(--text);
        --checkbox-check-color: var(--tone-bg);
    }

    /* Disabled ------------------------------------------------------------ */

    /* Whole group disabled */
    .checkbox-disabled {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* Single item disabled (only when group is not disabled, to avoid double opacity) */
    .checkbox-item-disabled {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* Focus visible - keyboard nav ---------------------------------------- */

    .checkbox-input:focus-visible ~ .checkbox-control {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
    }
</style>
