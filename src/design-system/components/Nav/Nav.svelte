<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { navConfig } from "./nav.config";
    import Button from "../Button/Button.svelte";

    // Types

    type Layout    = "row" | "column";
    type Position  = "fixed" | "sticky";
    type Direction = "top" | "bottom" | "left" | "right";
    type Palette   = "accent" | "tone";

    export interface NavItem {
        // Material Symbols icon name (e.g. "design_services", "code")
        icon:     string;
        // Short label displayed below the icon
        label:    string;
        // Marks this item as the currently active route/section
        active?:  boolean;
        // Click handler — navigation, scroll, etc.
        onclick?: () => void;
        // Optional accessible label override (defaults to label)
        aria_label?: string;
    }

    interface Props {
        layout?:    Layout;
        position?:  Position;
        direction?: Direction;
        palette?:   Palette;
        items:      NavItem[];
        // Optional header slot — e.g. logo, title
        header?:    Snippet;
        // Optional footer slot — e.g. theme toggle
        footer?:    Snippet;
    }

    let {
        layout = "column",
        position = "fixed",
        direction = "left",
        palette = "accent",
        items,
        header,
        footer,
    }: Props = $props();

    // Variant resolution

    const resolve = createVariant(navConfig);

    const wrapper_classes = $derived(
        resolve({ layout, position, direction, palette }).trim()
    );

    // Geometry helpers 
    // For fixed/sticky navs on left/right, the nav is vertically centred.
    // For top/bottom navs, it spans the full width and is horizontally centred.

    const is_vertical = $derived(direction === "left" || direction === "right");
    const is_row_layout = $derived(layout === "row");
</script>

<!--
    Nav wrapper
    CSS custom properties injected here drive the Button "nav" variant colours,
    so the colour logic stays in one place and Button.svelte stays agnostic.
-->
<nav
    class={wrapper_classes}
    aria-label="Navigation"
>
    {#if header}
        <div class="nav-header">
            {@render header()}
        </div>
    {/if}

    <div class="nav-items">
        {#each items as item}
            <Button
                variant="nav"
                active={item.active ?? false}
                aria_label={item.aria_label ?? item.label}
                onclick={item.onclick}
            >
                <span 
                    class="nav-icon material-symbols-outlined" 
                    aria-hidden="true"
                >
                    {item.icon}
                </span>
                <span class="nav-label">
                    {item.label}
                </span>
            </Button>
        {/each}
    </div>

    {#if footer}
        <div class="nav-footer">
            {@render footer()}
        </div>
    {/if}
</nav>

<style>
    /* Base wrapper */
    .nav-component {
        display: flex;
        align-items: center;
        border-radius: 12px;
        transition: background 0.3s ease, box-shadow 0.3s ease;
        z-index: 100;
    }

    /* Internal flex direction */
    /* Column layout: items stack vertically */
    .nav-layout-column {
        flex-direction: column;
        justify-content: center;
        gap: 0;
        padding: 0.5rem 0;
    }

    /* Row layout: items are side by side */
    .nav-layout-row {
        flex-direction: row;
        justify-content: space-evenly;
        gap: 0;
        padding: 0 0.5rem;
    }

    /* Header and footer slots — always stacked */
    .nav-header,
    .nav-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    /* Items container matches the layout direction */
    .nav-items {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
    }

    .nav-layout-column .nav-items {
        flex-direction: column;
    }

    .nav-layout-row .nav-items {
        flex-direction: row;
    }

    /* Positioning */
    .nav-position-fixed {
        position: fixed;
    }

    .nav-position-sticky {
        position: sticky;
    }

    /* Direction — fixed positioning anchors */
    /* Left side: vertically centred on the left edge */
    .nav-direction-left.nav-position-fixed {
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
    }

    /* Right side: vertically centred on the right edge */
    .nav-direction-right.nav-position-fixed {
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
    }

    /* Top bar: full-width bar pinned at the top */
    .nav-direction-top.nav-position-fixed {
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        border-radius: 0 0 12px 12px;
    }

    /* Bottom bar: full-width bar pinned at the bottom */
    .nav-direction-bottom.nav-position-fixed {
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        border-radius: 12px 12px 0 0;
    }

    /* Sticky variants — used in normal flow (e.g. inside a scrollable panel) */
    .nav-direction-top.nav-position-sticky {
        top: 0;
        width: 100%;
        border-radius: 0 0 12px 12px;
    }

    .nav-direction-bottom.nav-position-sticky {
        bottom: 0;
        width: 100%;
        border-radius: 12px 12px 0 0;
    }

    .nav-direction-left.nav-position-sticky {
        /* Used inside a flex/grid layout column */
        align-self: flex-start;
        top: 1rem;
    }

    .nav-direction-right.nav-position-sticky {
        align-self: flex-start;
        top: 1rem;
    }

    /* Palette — accent mode (portfolio side-nav style) */
    /* Background = accent colour, buttons inherit --text-accent */
    .nav-palette-accent {
        background: var(--accent);
        box-shadow: 0 4px 24px var(--muted-shadow);

        /* Expose tokens consumed by Button variant="nav" */
        --nav-btn-color:         var(--text-accent);
        --nav-btn-hover-bg:      rgba(255, 255, 255, 0.15);
        --nav-btn-active-bg:     rgba(255, 255, 255, 0.25);
        --nav-btn-active-border: rgba(255, 255, 255, 0.45);
    }

    /* Palette — tone mode (styleguide card/highlight style) */
    /* Background = card surface, buttons use --text colour */
    .nav-palette-tone {
        background: var(--card);
        border: 1.5px solid var(--highlight);
        box-shadow: 0 2px 12px var(--muted-shadow);

        /* Expose tokens consumed by Button variant="nav" */
        --nav-btn-color:         var(--text);
        --nav-btn-hover-bg:      var(--highlight);
        --nav-btn-active-bg:     var(--accent);
        --nav-btn-active-border: var(--accent);
    }

    /* When tone palette is active, override the active button text colour */
    /* so it stays legible on the accent background */
    .nav-palette-tone :global(.btn-nav.btn-active) {
        color: var(--text-accent);
    }

    .nav-palette-tone :global(.btn-nav.btn-active:hover) {
        color: var(--text-accent);
    }

    /* Top/bottom bars need horizontal padding on the items zone */
    .nav-direction-top .nav-items,
    .nav-direction-bottom .nav-items {
        padding: 0.25rem 0.5rem;
    }

    /* Left/right columns need vertical padding on the items zone */
    .nav-direction-left .nav-items,
    .nav-direction-right .nav-items {
        padding: 0.5rem 0;
    }
</style>