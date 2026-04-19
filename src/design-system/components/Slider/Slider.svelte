<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { sliderConfig } from './slider.config';

    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    interface Props {
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        outlined?: boolean;
        rounded?: boolean;
        range?: boolean;
        value?: number;
        value_end?: number;
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
        aria_label?: string;
    }

    let {
        palette = "accent",
        size = "md",
        elevation = "none",
        outlined = false,
        rounded = false,
        range = false,
        value = $bindable(0),
        value_end = $bindable(100),
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        aria_label = undefined,
    }: Props = $props();

    const resolve = createVariant(sliderConfig);

    let track_el: HTMLDivElement | undefined = $state(undefined);
    let dragging: "start" | "end" | null = $state(null);

    // Snap a raw number to the nearest step
    function snap(raw: number): number {
        const clamped = Math.min(max, Math.max(min, raw));
        return Math.round((clamped - min) / step) * step + min;
    }

    // Convert a pixel position on the track to a value
    function pos_to_value(client_x: number): number {
        if (!track_el) return min;
        const rect = track_el.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (client_x - rect.left) / rect.width));
        return snap(min + ratio * (max - min));
    }

    // Percentages for positioning
    const pct_start = $derived(((value - min) / (max - min)) * 100);
    const pct_end = $derived(((value_end - min) / (max - min)) * 100);

    function on_pointerdown(e: PointerEvent, thumb: "start" | "end") {
        if (disabled) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        dragging = thumb;
    }

    function on_pointermove(e: PointerEvent) {
        if (!dragging) return;
        const v = pos_to_value(e.clientX);
        if (dragging === "start") {
            if (range && v > value_end) return;
            value = v;
        } else {
            if (v < value) return;
            value_end = v;
        }
    }

    function on_pointerup() {
        dragging = null;
    }

    function on_track_click(e: MouseEvent) {
        if (disabled) return;
        const v = pos_to_value(e.clientX);
        if (!range) {
            value = v;
        } else {
            // Move whichever thumb is closest
            const dist_start = Math.abs(v - value);
            const dist_end = Math.abs(v - value_end);
            if (dist_start <= dist_end) {
                value = Math.min(v, value_end);
            } else {
                value_end = Math.max(v, value);
            }
        }
    }

    function on_keydown(e: KeyboardEvent, thumb: "start" | "end") {
        if (disabled) return;
        let delta = 0;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
        else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
        else if (e.key === "Home") delta = min - (thumb === "start" ? value : value_end);
        else if (e.key === "End") delta = max - (thumb === "start" ? value : value_end);
        else return;

        e.preventDefault();
        if (thumb === "start") {
            const next = snap(value + delta);
            if (range && next > value_end) return;
            value = next;
        } else {
            const next = snap(value_end + delta);
            if (next < value) return;
            value_end = next;
        }
    }

    const track_classes = $derived(
        resolve({ size, elevation, outlined, rounded }).trim()
    );

    const fill_class = $derived(`slider-fill slider-fill-${palette}`);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="slider-container"
    class:slider-disabled={disabled}
    onpointermove={on_pointermove}
    onpointerup={on_pointerup}
    onpointercancel={on_pointerup}
>
    <div
        class={track_classes}
        bind:this={track_el}
        onclick={on_track_click}
    >
        <!-- Fill -->
        {#if range}
            <div
                class={fill_class}
                style="left: {pct_start}%; width: {pct_end - pct_start}%"
            ></div>
        {:else}
            <div
                class={fill_class}
                style="left: 0; width: {pct_start}%"
            ></div>
        {/if}

        <!-- Start thumb (always visible) -->
        <div
            class="slider-thumb slider-thumb-{palette}"
            style="left: {pct_start}%"
            role="slider"
            tabindex={disabled ? -1 : 0}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={range ? value_end : max}
            aria-label={aria_label ?? (range ? "Start" : "Value")}
            aria-disabled={disabled}
            onpointerdown={(e) => on_pointerdown(e, "start")}
            onkeydown={(e) => on_keydown(e, "start")}
        ></div>

        <!-- End thumb (range only) -->
        {#if range}
            <div
                class="slider-thumb slider-thumb-{palette}"
                style="left: {pct_end}%"
                role="slider"
                tabindex={disabled ? -1 : 0}
                aria-valuenow={value_end}
                aria-valuemin={value}
                aria-valuemax={max}
                aria-label="End"
                aria-disabled={disabled}
                onpointerdown={(e) => on_pointerdown(e, "end")}
                onkeydown={(e) => on_keydown(e, "end")}
            ></div>
        {/if}
    </div>

    <!-- Labels -->
    <div class="slider-labels">
        {#if range}
            <span class="slider-value slider-value-{palette}">{value}</span>
            <span class="slider-value slider-value-{palette}">{value_end}</span>
        {:else}
            <span class="slider-value slider-value-{palette}">{value}</span>
        {/if}
    </div>
</div>

<style>
    /* Container ------------------------------------------------------- */

    .slider-container {
        width: 100%;
        padding: 8px 0;
        user-select: none;
        touch-action: none;
    }

    .slider-disabled {
        opacity: 0.4;
        pointer-events: none;
    }

    /* Track ----------------------------------------------------------- */

    .slider-base {
        width: 100%;
        background: var(--tone-hover);
        overflow: visible;
        position: relative;
        cursor: pointer;
    }

    /* Size ------------------------------------------------------------ */

    .slider-sm { height: 4px; }
    .slider-md { height: 8px; }
    .slider-lg { height: 16px; }

    /* Rounded --------------------------------------------------------- */

    .slider-rounded { border-radius: var(--radius-pill); }
    .slider-rounded .slider-fill { border-radius: var(--radius-pill); }

    /* Outlined -------------------------------------------------------- */

    .slider-outlined {
        background: transparent;
        border: 2px solid var(--tone-hover);
    }

    /* Elevation ------------------------------------------------------- */

    .slider-elevation-subtle { box-shadow: 0 4px 12px var(--shadow-subtle); }
    .slider-elevation-hard { box-shadow: 0.3rem 0.3rem var(--shadow-hard); }

    /* Fill ------------------------------------------------------------ */

    .slider-fill {
        position: absolute;
        top: 0;
        height: 100%;
        transition: left 0.1s ease, width 0.1s ease;
        pointer-events: none;
    }

    .slider-fill-accent { background: var(--accent); }
    .slider-fill-tone { background: var(--tone-muted); }
    .slider-fill-neutral { background: var(--neutral); }
    .slider-fill-error { background: var(--error); }
    .slider-fill-warning { background: var(--warning); }
    .slider-fill-success { background: var(--success); }
    .slider-fill-info { background: var(--info); }

    /* Thumb ----------------------------------------------------------- */

    .slider-thumb {
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        border-radius: var(--radius-circle);
        transform: translate(-50%, -50%);
        cursor: grab;
        transition: box-shadow 0.15s ease, transform 0.15s ease;
        outline: none;
        z-index: 1;
    }

    .slider-thumb:active {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(1.15);
    }

    .slider-thumb:focus-visible {
        outline: var(--focus-ring-width) solid var(--focus-ring);
        outline-offset: var(--focus-ring-offset);
    }

    .slider-thumb-accent { background: var(--accent); }
    .slider-thumb-tone { background: var(--tone-muted); }
    .slider-thumb-neutral { background: var(--neutral); }
    .slider-thumb-error { background: var(--error); }
    .slider-thumb-warning { background: var(--warning); }
    .slider-thumb-success { background: var(--success); }
    .slider-thumb-info { background: var(--info); }

    /* Size-dependent thumb sizing */
    .slider-sm .slider-thumb { width: 14px; height: 14px; }
    .slider-lg .slider-thumb { width: 24px; height: 24px; }

    /* Labels ---------------------------------------------------------- */

    .slider-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        font-size: 0.85rem;
    }

    .slider-value-accent { color: var(--accent-muted); }
    .slider-value-tone { color: var(--tone-muted); }
    .slider-value-neutral { color: var(--neutral-muted); }
    .slider-value-error { color: var(--error-muted); }
    .slider-value-warning { color: var(--warning-muted); }
    .slider-value-success { color: var(--success-muted); }
    .slider-value-info { color: var(--info-muted); }
</style>
