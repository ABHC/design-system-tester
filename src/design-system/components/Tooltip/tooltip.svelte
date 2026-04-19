<script lang="ts">
    import type { Snippet } from "svelte";
    import { onDestroy } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { tooltipConfig, defaultTooltipConfig } from "./tooltip.config";
    import type { TooltipPalette, TooltipDirection, TooltipAlign, TooltipElevation, TooltipSize } from "./tooltip.config";

    interface Props {
        open?: boolean;
        direction?: TooltipDirection;
        align?: TooltipAlign;
        maxWidth?: string;
        gap?: string;
        showDelay?: number;
        hideDelay?: number;
        palette?: TooltipPalette;
        rounded?: boolean;
        bordered?: boolean;
        elevation?: TooltipElevation;
        size?: TooltipSize;
        arrow?: boolean;
        trigger: Snippet;
        leading?: Snippet;
        trailing?: Snippet;
        children: Snippet;
    }

    let {
        open = $bindable(false),
        direction = defaultTooltipConfig.direction,
        align = defaultTooltipConfig.align,
        gap = "8px",
        maxWidth = "320px",
        showDelay = 120,
        hideDelay = 80,
        palette = defaultTooltipConfig.palette,
        rounded = defaultTooltipConfig.rounded,
        bordered = defaultTooltipConfig.bordered,
        elevation = defaultTooltipConfig.elevation,
        size = defaultTooltipConfig.size,
        arrow = defaultTooltipConfig.arrow,
        trigger,
        leading,
        trailing,
        children,
    }: Props = $props();

    const resolve = createVariant(tooltipConfig);

    const panel_classes = $derived(resolve({ palette, rounded, bordered, elevation, size }));

    const panel_style = $derived(
        `max-width: ${maxWidth};` +
        ` --tooltip-gap: ${gap};`
    );

    let show_timer: ReturnType<typeof setTimeout> | null = null;
    let hide_timer: ReturnType<typeof setTimeout> | null = null;

    function clear_show_timer() {
        if (show_timer) { clearTimeout(show_timer); show_timer = null; }
    }

    function clear_hide_timer() {
        if (hide_timer) { clearTimeout(hide_timer); hide_timer = null; }
    }

    function schedule_open() {
        clear_hide_timer();
        if (open || show_timer) return;
        show_timer = setTimeout(() => {
            open = true;
            show_timer = null;
        }, showDelay);
    }

    function schedule_close() {
        clear_show_timer();
        if (!open || hide_timer) return;
        hide_timer = setTimeout(() => {
            open = false;
            hide_timer = null;
        }, hideDelay);
    }

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            clear_show_timer();
            clear_hide_timer();
            open = false;
        }
    }

    onDestroy(() => {
        clear_show_timer();
        clear_hide_timer();
    });
</script>

<svelte:window onkeydown={open ? handle_keydown : undefined} />

<div
    class="tooltip-anchor"
    onmouseenter={schedule_open}
    onmouseleave={schedule_close}
    onfocusin={schedule_open}
    onfocusout={schedule_close}
    role="presentation"
>
    {@render trigger()}

    {#if open}
        <div
            class="{panel_classes} tooltip-direction-{direction} tooltip-align-{align}"
            class:tooltip-has-arrow={arrow}
            style={panel_style}
            role="tooltip"
        >
            {#if leading}
                <div class="tooltip-leading">{@render leading()}</div>
            {/if}

            <div class="tooltip-content">{@render children()}</div>

            {#if trailing}
                <div class="tooltip-trailing">{@render trailing()}</div>
            {/if}
        </div>
    {/if}
</div>

<style>
    /* Anchor ---------------------------------------------------------- */

    .tooltip-anchor {
        position: relative;
        display: inline-block;
    }

    /* Panel ----------------------------------------------------------- */

    .tooltip {
        position: absolute;
        z-index: 100;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        box-sizing: border-box;
        width: max-content;
        background: var(--tooltip-bg);
        color: var(--tooltip-text);
        border: 2px solid transparent;
        --tooltip-arrow-size: 10px;
    }

    .tooltip-leading,
    .tooltip-trailing {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
    }

    .tooltip-content {
        flex: 1 1 auto;
        min-width: 0;
        overflow-wrap: anywhere;
    }

    /* Sizes ----------------------------------------------------------- */

    .tooltip-sm {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        --tooltip-arrow-size: 8px;
    }

    .tooltip-md {
        font-size: 0.875rem;
        padding: 0.4rem 0.7rem;
        --tooltip-arrow-size: 10px;
    }

    .tooltip-lg {
        font-size: 1rem;
        padding: 0.6rem 1rem;
        --tooltip-arrow-size: 12px;
    }

    /* Direction - main axis ------------------------------------------- */

    .tooltip-direction-bottom {
        top: calc(100% + var(--tooltip-gap, 8px));
        animation: tooltip-in-bottom 0.12s ease;
    }

    .tooltip-direction-top {
        bottom: calc(100% + var(--tooltip-gap, 8px));
        animation: tooltip-in-top 0.12s ease;
    }

    .tooltip-direction-left {
        right: calc(100% + var(--tooltip-gap, 8px));
        animation: tooltip-in-left 0.12s ease;
    }

    .tooltip-direction-right {
        left: calc(100% + var(--tooltip-gap, 8px));
        animation: tooltip-in-right 0.12s ease;
    }

    /* Align - cross axis for top/bottom ------------------------------- */

    .tooltip-direction-top.tooltip-align-start,
    .tooltip-direction-bottom.tooltip-align-start {
        left: 0;
    }

    .tooltip-direction-top.tooltip-align-center,
    .tooltip-direction-bottom.tooltip-align-center {
        left: 50%;
        translate: -50% 0;
    }

    .tooltip-direction-top.tooltip-align-end,
    .tooltip-direction-bottom.tooltip-align-end {
        right: 0;
    }

    /* Align - cross axis for left/right ------------------------------- */

    .tooltip-direction-left.tooltip-align-start,
    .tooltip-direction-right.tooltip-align-start {
        top: 0;
    }

    .tooltip-direction-left.tooltip-align-center,
    .tooltip-direction-right.tooltip-align-center {
        top: 50%;
        translate: 0 -50%;
    }

    .tooltip-direction-left.tooltip-align-end,
    .tooltip-direction-right.tooltip-align-end {
        bottom: 0;
    }

    /* Arrow - rotated square stuck to the panel edge ------------------ */

    .tooltip-has-arrow::before {
        content: "";
        position: absolute;
        width: var(--tooltip-arrow-size);
        height: var(--tooltip-arrow-size);
        background: var(--tooltip-bg);
        box-sizing: border-box;
        border: 2px solid transparent;
        pointer-events: none;
        transform: rotate(45deg);
    }

    /* Arrow main-axis position per direction (tip facing anchor) */

    .tooltip-direction-bottom.tooltip-has-arrow::before { top: calc(var(--tooltip-arrow-size) / -2); }
    .tooltip-direction-top.tooltip-has-arrow::before    { bottom: calc(var(--tooltip-arrow-size) / -2); }
    .tooltip-direction-right.tooltip-has-arrow::before  { left: calc(var(--tooltip-arrow-size) / -2); }
    .tooltip-direction-left.tooltip-has-arrow::before   { right: calc(var(--tooltip-arrow-size) / -2); }

    /* Arrow cross-axis position per align - top/bottom directions */

    .tooltip-direction-bottom.tooltip-align-start.tooltip-has-arrow::before,
    .tooltip-direction-top.tooltip-align-start.tooltip-has-arrow::before {
        left: 12px;
    }

    .tooltip-direction-bottom.tooltip-align-center.tooltip-has-arrow::before,
    .tooltip-direction-top.tooltip-align-center.tooltip-has-arrow::before {
        left: calc(50% - var(--tooltip-arrow-size) / 2);
    }

    .tooltip-direction-bottom.tooltip-align-end.tooltip-has-arrow::before,
    .tooltip-direction-top.tooltip-align-end.tooltip-has-arrow::before {
        right: 12px;
    }

    /* Arrow cross-axis position per align - left/right directions */

    .tooltip-direction-right.tooltip-align-start.tooltip-has-arrow::before,
    .tooltip-direction-left.tooltip-align-start.tooltip-has-arrow::before {
        top: 12px;
    }

    .tooltip-direction-right.tooltip-align-center.tooltip-has-arrow::before,
    .tooltip-direction-left.tooltip-align-center.tooltip-has-arrow::before {
        top: calc(50% - var(--tooltip-arrow-size) / 2);
    }

    .tooltip-direction-right.tooltip-align-end.tooltip-has-arrow::before,
    .tooltip-direction-left.tooltip-align-end.tooltip-has-arrow::before {
        bottom: 12px;
    }

    /* Bordered - apply border to panel and the two outward arrow edges */

    .tooltip-bordered {
        border-color: var(--tooltip-border);
    }

    .tooltip-direction-bottom.tooltip-bordered.tooltip-has-arrow::before {
        border-top-color: var(--tooltip-border);
        border-left-color: var(--tooltip-border);
    }

    .tooltip-direction-top.tooltip-bordered.tooltip-has-arrow::before {
        border-bottom-color: var(--tooltip-border);
        border-right-color: var(--tooltip-border);
    }

    .tooltip-direction-right.tooltip-bordered.tooltip-has-arrow::before {
        border-bottom-color: var(--tooltip-border);
        border-left-color: var(--tooltip-border);
    }

    .tooltip-direction-left.tooltip-bordered.tooltip-has-arrow::before {
        border-top-color: var(--tooltip-border);
        border-right-color: var(--tooltip-border);
    }

    /* Animations ------------------------------------------------------ */

    @keyframes tooltip-in-bottom {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes tooltip-in-top {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes tooltip-in-left {
        from { opacity: 0; transform: translateX(4px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes tooltip-in-right {
        from { opacity: 0; transform: translateX(-4px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @media (prefers-reduced-motion: reduce) {
        .tooltip-direction-bottom,
        .tooltip-direction-top,
        .tooltip-direction-left,
        .tooltip-direction-right {
            animation: none;
        }
    }

    /* Palette --------------------------------------------------------- */

    .tooltip-palette-tone {
        --tooltip-bg: var(--tone);
        --tooltip-border: var(--tone-hover);
        --tooltip-text: var(--text);
    }

    .tooltip-palette-accent {
        --tooltip-bg: var(--accent);
        --tooltip-border: var(--accent-hover);
        --tooltip-text: var(--text-accent);
    }

    .tooltip-palette-accentbg {
        --tooltip-bg: var(--accent-bg);
        --tooltip-border: var(--tone-hover);
        --tooltip-text: var(--text-accent);
    }

    /* Rounded --------------------------------------------------------- */

    .tooltip-rounded {
        border-radius: var(--radius-soft);
    }

    /* Elevation ------------------------------------------------------- */

    .tooltip-elevation-none {
        box-shadow: none;
    }

    .tooltip-elevation-subtle {
        box-shadow: 0 8px 24px var(--shadow-subtle);
    }

    .tooltip-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }
</style>
