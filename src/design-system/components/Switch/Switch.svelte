<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from '../../utils/builder';
    import { switchConfig } from './switch.config';

    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";

    interface Props {
        checked?: boolean;
        palette?: Palette;
        size?: Size;
        circle?: boolean;
        leading?: Snippet;
        trailing?: Snippet;
        disabled?: boolean;
        aria_label?: string;
    }

    let {
        checked = $bindable(false),
        palette = "accent",
        size = "md",
        circle = true,
        leading,
        trailing,
        disabled = false,
        aria_label,
    }: Props = $props();

    const resolve = createVariant(switchConfig);

    const wrapper_classes = $derived(
        resolve({
            palette,
            size,
            circle: circle   ? true : undefined,
            disabled: disabled ? true : undefined,
        }).trim()
    );
</script>

<label class={wrapper_classes}>
    <!--
        The real checkbox is visually hidden but stays in the accessibility tree.
        Clicking anywhere on the label (knob, track, or adjacent text) toggles it.
    -->
    <input
        type="checkbox"
        role="switch"
        class="switch-input"
        bind:checked
        {disabled}
        aria-label={aria_label}
    />

    {#if leading}
        <span class="switch-label">
            {@render leading()}
        </span>
    {/if}

    <!-- Track + knob - aria-hidden because the input carries semantics -->
    <span 
        class="switch-track" 
        class:switch-checked={checked} 
        aria-hidden="true"
    >
        <span class="switch-knob"></span>
    </span>

    {#if trailing}
        <span class="switch-label">
            {@render trailing()}
        </span>
    {/if}
</label>

<style>
    /* Hidden input ---------------------------------------------------- */

    .switch-input {
        position: absolute;
        opacity:  0;
        width:    0;
        height:   0;
        margin:   0;
    }

    /* Wrapper --------------------------------------------------------- */

    .switch-wrapper {
        display:     inline-flex;
        align-items: center;
        gap:         0.5rem;
        cursor:      pointer;
        user-select: none;
        line-height: 1.3;
    }

    .switch-label {
        display:     inline-flex;
        align-items: center;
        gap:         0.3rem;
        font-size:   0.9rem;
        font-weight: 500;
        color:       inherit;
    }

    /* Track ----------------------------------------------------------- */

    .switch-track {
        position:    relative;
        flex-shrink: 0;
        overflow:    visible;
        transition:  background 0.2s ease, box-shadow 0.2s ease;
    }

    /* OFF state - outline and knob adapt via currentColor.
       Works automatically on any background (neutral or accent). */
    .switch-track:not(.switch-checked) {
        background: transparent;
        box-shadow: 0 0 0 2px var(--text-muted);
    }

    /* Knob ------------------------------------------------------------ */

    /*
        Knob is always 20 × 20 px - fixed across all sizes.
        Size affects only the TRACK; in `sm` the knob intentionally protrudes
        above and below the track.
    */
    .switch-knob {
        position: absolute;
        width: 20px;
        height: 20px;
        left: var(--switch-begin);
        top: 50%;
        transform:  translate(0, -50%);
        background: var(--text-muted);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                    background 0.2s ease;
    }

    .switch-track.switch-checked .switch-knob {
        transform: translate(var(--switch-travel), -50%);
    }

    /* Sizes ----------------------------------------------------------- */

    /* sm : 36 × 18 - knob (20 px) protrudes 1 px each side */
    .switch-sm .switch-track {
        width: 36px;
        height: 14px;
        --switch-begin: -3px;
        --switch-travel: 21px;
    }

    /* md : 48 × 26 - knob fits flush */
    .switch-md .switch-track {
        width: 48px;
        height: 26px;
        --switch-begin: 2px;
        --switch-travel: 24px;
    }

    /* lg : 60 × 34 - knob with comfortable clearance */
    .switch-lg .switch-track {
        width: 60px;
        height: 34px;
        --switch-begin: 6px;
        --switch-travel: 30px;
    }

    /* Shapes ---------------------------------------------------------- */

    /* circle=true  → pill track + round knob */
    .switch-circle .switch-track { border-radius: var(--radius-pill); }
    .switch-circle .switch-knob  { border-radius: var(--radius-circle); }

    /* circle=false → rect track + square knob */
    .switch-wrapper:not(.switch-circle) .switch-track { border-radius: var(--radius-edge); }
    .switch-wrapper:not(.switch-circle) .switch-knob  { border-radius: var(--radius-edge); }

    /* Palette - ON state (track fill + knob color) -------------------- */

    /* Accent */
    .switch-palette-accent .switch-checked {
        background: var(--accent);
        box-shadow: none;
    }

    .switch-palette-accent .switch-checked .switch-knob {
        background: var(--text-accent);
    }

    /* Tone */
    .switch-palette-tone .switch-checked {
        background: var(--text);
        box-shadow: none;
    }

    .switch-palette-tone .switch-checked .switch-knob {
        background: var(--tone-hover);
    }

    /* Error */
    .switch-palette-error .switch-checked {
        background: var(--error);
        box-shadow: none;
    }

    .switch-palette-error .switch-checked .switch-knob {
        background: var(--text-accent);
    }

    /* Warning */
    .switch-palette-warning .switch-checked {
        background: var(--warning);
        box-shadow: none;
    }

    .switch-palette-warning .switch-checked .switch-knob {
        background: var(--text-accent);
    }

    /* Success */
    .switch-palette-success .switch-checked {
        background: var(--success);
        box-shadow: none;
    }

    .switch-palette-success .switch-checked .switch-knob {
        background: var(--text-accent);
    }

    /* Info */
    .switch-palette-info .switch-checked {
        background: var(--info);
        box-shadow: none;
    }

    .switch-palette-info .switch-checked .switch-knob {
        background: var(--text-accent);
    }

    /* Neutral */
    .switch-palette-neutral .switch-checked {
        background: var(--neutral);
        box-shadow: none;
    }

    .switch-palette-neutral .switch-checked .switch-knob {
        background: var(--text-neutral);
    }

    /* Disabled -------------------------------------------------------- */

    .switch-disabled {
        opacity:        0.45;
        cursor:         not-allowed;
        pointer-events: none;
    }

    /* Focus visible - keyboard nav ------------------------------------ */

    .switch-input:focus-visible ~ .switch-track {
        outline:        var(--focus-ring-width) solid var(--focus-ring);
        outline-offset: var(--focus-ring-offset);
    }
</style>
