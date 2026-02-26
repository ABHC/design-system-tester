<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { navConfig } from "./nav.config";
    import Button from "../Button/Button.svelte";

    // Types

    type Position  = "fixed" | "floating";
    type Direction = "top" | "bottom" | "left" | "right";
    type Palette   = "accent" | "tone";

    export interface NavItem {
        // Icon slot accepts any HTML snippet: Material Symbols, SVG, Simple Icons… (rendered inside a wrapper)
        // Short label displayed below the icon.
        // Marks this item as the currently active route/section
        // Click handler — navigation, scroll, route change, etc
        // Optional accessible label override (defaults to label)
        icon: Snippet;
        label: string;
        active?: boolean;
        onclick?: () => void;
        aria_label?: string;
    }

    interface Props {
        position?: Position;
        direction?: Direction;
        palette?: Palette;
        items: NavItem[];
        rounded?: boolean;
        squared?: boolean;
        offset?: string; // Shifts the nav away from its anchor edge in fixed mode (e.g. "100px" to sit below a header)
        header?: Snippet; // Optional header slot (logo, title, etc..)
        footer?: Snippet; // Optional footer slot (theme toggle, language selector, etc.. )
    }

    let {
        position = "fixed",
        direction = "left",
        palette = "accent",
        items,
        rounded = false,
        squared = false,
        offset = "0px",
        header,
        footer,
    }: Props = $props();

    // Layout helper
    const is_column = $derived(direction === "left" || direction === "right");

    // Variant resolution
    const resolve = createVariant(navConfig);
    const wrapper_classes = $derived(
        resolve({
            position,
            direction,
            palette,
            rounded: rounded ? true : undefined,
        }).trim()
    );
</script>

<!--
    Nav wrapper
    CSS custom properties injected here drive the Button "nav" variant colours,
    so the colour logic stays in one place and Button.svelte stays agnostic.
-->
<nav
    class="{wrapper_classes} {is_column ? 'nav-layout-column' : 'nav-layout-row'}"
    style="--nav-offset: {offset}"
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
                {squared}
                active={item.active ?? false}
                aria_label={item.aria_label ?? item.label}
                onclick={item.onclick}
            >
                <!--
                    Icon wrapper — agnostic to icon system.
                    User passes a Snippet, which can be:
                    • <span class="material-symbols-outlined">code</span>
                    • <svg>…</svg>
                    • <img src="…" />
                    • Any Simple Icons markup, etc.
                -->
                <span class="nav-icon" aria-hidden="true">
                    {@render item.icon()}
                </span>
                <span class="nav-label">{item.label}</span>
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
        justify-content: space-evenly;
        transition: background 0.3s ease, box-shadow 0.3s ease;
        z-index: 100;
    }

    /* Rounded corners — only when rounded prop is passed */
    .nav-rounded { border-radius: 12px; }

    /* Top / bottom bars only round the inner edge */
    .nav-direction-top.nav-rounded    { border-radius: 0 0 12px 12px; }
    .nav-direction-bottom.nav-rounded { border-radius: 12px 12px 0 0; }

    /* Layout directions — derived from direction prop */
    .nav-layout-column {
        flex-direction: column;
        padding: 0.5rem 0.5rem;
    }

    .nav-layout-row {
        flex-direction: row;
    }

    /* Header / footer slots always stack perpendicular to the nav axis */
    .nav-header,
    .nav-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10%;
        /*margin: 0 30px;*/
    }

    /* Items container inherits the parent direction */
    .nav-items {
        display:     flex;
        align-items: center;
        gap:         10px;
    }

    .nav-layout-column .nav-items {
        flex-direction: column;
        justify-content: center;
        width: fit-content;
    }

    /* In column mode, all buttons stretch to the width of the widest one */
    .nav-layout-column .nav-items :global(.btn-nav) {
        width: 100%;
    }

    /* Column + rect only: space icon and label apart */
    .nav-layout-column .nav-items :global(.btn-nav:not(.btn-squared)) {
        justify-content: space-between;
        gap:0.6rem;
    }

    .nav-layout-row .nav-items {
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

    .nav-layout-row .nav-items :global(.btn-nav:not(.btn-squared)) {
        gap:0.6rem;
    }

    /* Padding zones — keep items off the edges */
    .nav-direction-top .nav-items,
    .nav-direction-bottom .nav-items { 
        padding: 0.5rem 0.5rem; 
    }

    .nav-direction-left.nav-items,
    .nav-direction-right .nav-items { 
        padding: 0.5rem 0;       
    }

    /*  Positioning  */
    .nav-fixed { 
        position: fixed;  
    }

    .nav-floating { 
        position: sticky; 
        width: fit-content;
    }

    /*  Direction anchors — fixed mode */
    .nav-direction-left.nav-fixed {
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
    }

    .nav-direction-right.nav-fixed {
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
    }

    .nav-direction-top.nav-fixed {
        top: var(--nav-offset, 0);
        left: 0;
        right: 0;
        width: 100%;
    }

    .nav-direction-bottom.nav-fixed {
        bottom: var(--nav-offset, 0);
        left: 0;
        right: 0;
        width: 100%;
    }

    /*  Direction anchors — floating (sticky) mode */
    .nav-direction-left.nav-floating,
    .nav-direction-right.nav-floating {
        /* Stick to the top of the scroll container, vertically centred via  */
        /* align-self on the parent flex column */
        align-self: flex-start;
        top: 1rem;
    }

    .nav-direction-top.nav-floating {
        top: 0;
        width: 100%;
    }

    .nav-direction-bottom.nav-floating {
        bottom: 0;
        width: 100%;
    }

    /*  Palette — accent (portfolio side-nav style)  */
    .nav-palette-accent {
        background: var(--accent);
        box-shadow: 0 4px 24px var(--muted-shadow);
        /* Tokens consumed by Button variant="nav" */
        --nav-btn-color: var(--text-accent);
        --nav-btn-hover-bg: rgba(255, 255, 255, 0.15);
        --nav-btn-active-bg: rgba(255, 255, 255, 0.25);
        --nav-btn-active-border: rgba(255, 255, 255, 0.45);
    }

    /*  Palette — tone (styleguide card/highlight style)*/
    .nav-palette-tone {
        background: var(--card);
        border:     1.5px solid var(--highlight);
        box-shadow: 0 2px 12px var(--muted-shadow);
        /* Tokens consumed by Button variant="nav" */
        --nav-btn-color: var(--text);
        --nav-btn-hover-bg: var(--highlight);
        --nav-btn-active-bg: var(--accent);
        --nav-btn-active-border: var(--accent);
    }

</style>