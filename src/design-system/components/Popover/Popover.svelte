<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { popoverConfig, defaultPopoverConfig } from "./popover.config";
    import type { PopoverPalette, PopoverElevation, PopoverDirection, PopoverAlign } from "./popover.config";

    interface Props {
        open?: boolean;
        onclose?: () => void;
        maxHeight?: string;
        width?: string;
        matchWidth?: boolean;
        direction?: PopoverDirection;
        align?: PopoverAlign;
        gap?: string;
        palette?: PopoverPalette;
        rounded?: boolean;
        elevation?: PopoverElevation;
        trigger: Snippet;
        children: Snippet;
    }

    let {
        open = $bindable(false),
        onclose,
        maxHeight = "320px",
        width,
        matchWidth = false,
        direction = defaultPopoverConfig.direction,
        align = defaultPopoverConfig.align,
        gap = "6px",
        palette = defaultPopoverConfig.palette,
        rounded = defaultPopoverConfig.rounded,
        elevation = defaultPopoverConfig.elevation,
        trigger,
        children,
    }: Props = $props();

    const resolve = createVariant(popoverConfig);

    const panel_classes = $derived(resolve({ palette, rounded, elevation }));

    const panel_style = $derived(
        `max-height: ${maxHeight};` +
        (width ? ` width: ${width};` : '') +
        ` --popover-gap: ${gap};`
    );

    let anchor_el: HTMLDivElement;

    function handle_outside(e: MouseEvent) {
        if (open && anchor_el && !anchor_el.contains(e.target as Node)) {
            onclose?.();
        }
    }

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "Escape") onclose?.();
    }
</script>

<svelte:window
    onclick={open ? handle_outside : undefined}
    onkeydown={open ? handle_keydown : undefined}
/>

<div class="popover-anchor" bind:this={anchor_el}>
    {@render trigger()}

    {#if open}
        <div
            class="{panel_classes} popover-direction-{direction} popover-align-{align}"
            class:popover-match-width={matchWidth}
            style={panel_style}
        >
            {@render children()}
        </div>
    {/if}
</div>

<style>
    /* Anchor ---------------------------------------------------------- */

    .popover-anchor {
        position: relative;
    }

    /* Panel ----------------------------------------------------------- */

    .popover {
        position: absolute;
        z-index: 100;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        box-sizing: border-box;
    }

    /* Direction - main axis ------------------------------------------- */

    .popover-direction-bottom {
        top: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-bottom 0.12s ease;
    }

    .popover-direction-top {
        bottom: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-top 0.12s ease;
    }

    .popover-direction-left {
        right: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-left 0.12s ease;
    }

    .popover-direction-right {
        left: calc(100% + var(--popover-gap, 6px));
        animation: popover-in-right 0.12s ease;
    }

    /* Align - cross axis for top/bottom ------------------------------- */

    .popover-direction-top.popover-align-start,
    .popover-direction-bottom.popover-align-start {
        left: 0;
    }

    .popover-direction-top.popover-align-center,
    .popover-direction-bottom.popover-align-center {
        left: 50%;
        translate: -50% 0;
    }

    .popover-direction-top.popover-align-end,
    .popover-direction-bottom.popover-align-end {
        right: 0;
    }

    /* Align - cross axis for left/right ------------------------------- */

    .popover-direction-left.popover-align-start,
    .popover-direction-right.popover-align-start {
        top: 0;
    }

    .popover-direction-left.popover-align-center,
    .popover-direction-right.popover-align-center {
        top: 50%;
        translate: 0 -50%;
    }

    .popover-direction-left.popover-align-end,
    .popover-direction-right.popover-align-end {
        bottom: 0;
    }

    /* Match width - panel stretches to anchor width -------------------- */

    .popover-match-width {
        left: 0;
        right: 0;
        translate: none;
    }

    /* Animations ------------------------------------------------------ */

    @keyframes popover-in-bottom {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes popover-in-top {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes popover-in-left {
        from { opacity: 0; transform: translateX(4px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes popover-in-right {
        from { opacity: 0; transform: translateX(-4px); }
        to { opacity: 1; transform: translateX(0); }
    }

    @media (prefers-reduced-motion: reduce) {
        .popover-direction-bottom,
        .popover-direction-top,
        .popover-direction-left,
        .popover-direction-right {
            animation: none;
        }
    }

    /* Palette - tone -------------------------------------------------- */

    .popover-palette-tone {
        background: var(--tone);
        border: 2px solid var(--tone-hover);
        color: var(--text);
        scrollbar-color: var(--tone-hover) var(--tone)
    }

    /* Palette - accent ------------------------------------------------ */

    .popover-palette-accent {
        background: var(--accent);
        border: 2px solid var(--accent-hover);
        color: var(--text-accent);
        scrollbar-color: var(--accent-muted) var(--accent)
    }

    /* Palette - accentbg ---------------------------------------------- */

    .popover-palette-accentbg {
        background: var(--accent-bg);
        border: 2px solid var(--tone-hover);
        color: var(--text-accent);
        scrollbar-color: var(--accent-hover) var(--accent-bg)
    }

    /* Rounded --------------------------------------------------------- */

    .popover-rounded {
        border-radius: var(--radius-soft);
    }

    /* Elevation ------------------------------------------------------- */

    .popover-elevation-none {
        box-shadow: none;
    }

    .popover-elevation-subtle {
        box-shadow: 0 8px 24px var(--shadow-subtle);
    }

    .popover-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }
</style>
