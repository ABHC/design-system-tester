<script lang="ts">
    import { createVariant } from '../../utils/builder';
    import { radioGroupConfig } from './radiogroup.config';

    type Palette = "accent" | "tone";
    type Size = "sm" | "md" | "lg";
    type LabelPosition = "right" | "left" | "top" | "bottom";

    interface Option {
        value: string;
        label: string;
        disabled?: boolean;
    }

    interface Props {
        value?: string;
        options?: Option[];
        name: string;
        palette?: Palette;
        size?: Size;
        label_position?: LabelPosition;
        disabled?: boolean;
        aria_label?: string;
    }

    let {
        value = $bindable(undefined),
        options = [],
        name,
        palette = "accent",
        size = "md",
        label_position = "right",
        disabled = false,
        aria_label,
    }: Props = $props();

    const resolve = createVariant(radioGroupConfig);

    const group_classes = $derived(
        resolve({
            palette,
            size,
            label_position,
            disabled: disabled ? true : undefined,
        }).trim()
    );
</script>

<div class={group_classes} role="radiogroup" aria-label={aria_label}>
    {#each options as option}
        {@const item_disabled = disabled || !!option.disabled}
        <label
            class="radio-item"
            class:radio-item-disabled={!disabled && !!option.disabled}
        >
            <input
                type="radio"
                class="radio-input"
                bind:group={value}
                value={option.value}
                {name}
                disabled={item_disabled}
            />
            <span class="radio-control" aria-hidden="true"></span>
            <span class="radio-label-text">{option.label}</span>
        </label>
    {/each}
</div>

<style>
    /* Hidden input ---------------------------------------------------- */

    .radio-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
    }

    /* Group ----------------------------------------------------------- */

    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    /* When labels are above/below, a row layout is more natural */
    .radio-label-top,
    .radio-label-bottom {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.25rem;
    }

    /* Item ------------------------------------------------------------ */

    .radio-item {
        display: inline-flex;
        align-items: center;
        gap: var(--radio-gap, 0.5rem);
        cursor: pointer;
        user-select: none;
        line-height: 1.3;
    }

    /* Label positions - flex direction on each item */
    .radio-label-right .radio-item { 
        flex-direction: row; 
    }

    .radio-label-left .radio-item { 
        flex-direction: row-reverse; 
    }
    
    .radio-label-top .radio-item { 
        flex-direction: column-reverse; 
        align-items: center; 
    }

    .radio-label-bottom .radio-item { 
        flex-direction: column; 
        align-items: center; 
    }

    /* Control (custom radio circle) ----------------------------------- */

    .radio-control {
        position: relative;
        flex-shrink: 0;
        width: var(--radio-size, 18px);
        height: var(--radio-size, 18px);
        border-radius: var(--radius-circle);
        border: 2px solid var(--text-muted);
        background: transparent;
        transition: border-color 0.2s ease;
    }

    /* Inner dot */
    .radio-control::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--radio-dot, 8px);
        height: var(--radio-dot, 8px);
        border-radius: var(--radius-circle);
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Checked state */
    .radio-input:checked ~ .radio-control {
        border-color: var(--radio-checked-color, var(--accent));
    }

    .radio-input:checked ~ .radio-control::after {
        transform: translate(-50%, -50%) scale(1);
        background: var(--radio-checked-color, var(--accent));
    }

    /* Label text */
    .radio-label-text {
        font-size: var(--radio-font, 0.9rem);
        font-weight: 500;
        color: inherit;
    }

    /* Sizes ----------------------------------------------------------- */

    .radio-size-sm {
        --radio-size: 14px;
        --radio-dot: 6px;
        --radio-font: 0.8rem;
        --radio-gap: 0.4rem;
    }

    .radio-size-md {
        --radio-size: 18px;
        --radio-dot: 8px;
        --radio-font: 0.9rem;
        --radio-gap: 0.5rem;
    }

    .radio-size-lg {
        --radio-size: 22px;
        --radio-dot: 10px;
        --radio-font: 1rem;
        --radio-gap: 0.6rem;
    }

    /* Palettes -------------------------------------------------------- */

    .radio-palette-accent { 
        --radio-checked-color: var(--accent);
    }

    .radio-palette-tone { 
        --radio-checked-color: var(--text); 
    }

    /* Disabled -------------------------------------------------------- */

    /* Whole group disabled */
    .radio-disabled {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* Single item disabled (only when group is not disabled, to avoid double opacity) */
    .radio-item-disabled {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* Focus visible - keyboard nav ------------------------------------ */

    .radio-input:focus-visible ~ .radio-control {
        outline: var(--focus-ring-width) solid var(--focus-ring);
        outline-offset: var(--focus-ring-offset);
    }
</style>
