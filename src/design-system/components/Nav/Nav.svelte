<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { navConfig } from "./nav.config";

    type Position = "fixed" | "floating";
    type Direction = "top" | "bottom" | "left" | "right";
    type Palette = "accent" | "tone";

    interface Props {
        position?: Position;
        direction?: Direction;
        palette?: Palette;
        rounded?: boolean;
        offset?: string;
        header?: Snippet;
        footer?: Snippet;
        children: Snippet;
    }

    let {
        position = "fixed",
        direction = "left",
        palette = "accent",
        rounded = false,
        offset = "0px",
        header,
        footer,
        children,
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
        {@render children()}
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
        z-index: 200;
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
        margin: 0 30px;
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
    .nav-layout-column .nav-items :global(.btn-ghost) {
        width: 100%;
    }

    /* Column + rect only: space icon and label apart */
    .nav-layout-column .nav-items :global(.btn-ghost:not(.btn-column)) {
        justify-content: flex-start;
        gap: 1rem;
    }

    .nav-layout-row .nav-items {
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
    }

    .nav-layout-row .nav-items :global(.btn-ghost:not(.btn-column)) {
        gap: 0.6rem;
    }

    /* nav-icon / nav-label layout inside ghost buttons */
    .nav-items :global(.nav-icon) {
        line-height: 1;
    }

    .nav-items :global(.nav-label) {
        font-family: var(--font-heading);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        line-height: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
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
    }

    /*  Palette — tone (styleguide card/highlight style)*/
    .nav-palette-tone {
        background: var(--tone);
    }

</style>