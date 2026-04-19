<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { navConfig } from "./nav.config";

    type Position = "fixed" | "floating";
    type Direction = "top" | "bottom" | "left" | "right";
    type Palette = "accent" | "tone";
    type Elevation = "none" | "subtle" | "hard";

    interface Props {
        position?: Position;
        direction?: Direction;
        palette?: Palette;
        rounded?: boolean;
        elevation?: Elevation;
        offset?: string;
        leading?: Snippet;
        trailing?: Snippet;
        children: Snippet;
    }

    let {
        position = "fixed",
        direction = "left",
        palette = "accent",
        rounded = false,
        elevation = "none",
        offset = "0px",
        leading,
        trailing,
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
            elevation: elevation !== "none" ? elevation : undefined,
        }).trim()
    );
</script>

<nav
    class="{wrapper_classes} {is_column ? 'nav-layout-column' : 'nav-layout-row'}"
    style="--nav-offset: {offset}"
    aria-label="Navigation"
>
    {#if leading}
        <div class="nav-leading">
            {@render leading()}
        </div>
    {/if}

    <div class="nav-items">
        {@render children()}
    </div>

    {#if trailing}
        <div class="nav-trailing">
            {@render trailing()}
        </div>
    {/if}
</nav>

<style>
    /* Base wrapper -------------------------------------------------------- */
    .nav-component {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        transition: background 0.3s ease, box-shadow 0.3s ease;
        z-index: 200;
    }

    /* Rounded ------------------------------------------------------------- */
    .nav-rounded { border-radius: var(--radius-round); }

    /* Top / bottom bars only round the inner edge */
    .nav-direction-top.nav-rounded    { 
            border-radius: 0 0 var(--radius-round) var(--radius-round); 
    }
    
    .nav-direction-bottom.nav-rounded { 
        border-radius: var(--radius-round) var(--radius-round) 0 0; 
    }

    /* Layouts & Itemps ---------------------------------------------------- */

    /* Layout directions */
    .nav-layout-column {
        flex-direction: column;
        padding: 0.5rem 0.5rem;
    }

    .nav-layout-row {
        flex-direction: row;
    }

    /* leading / trailing slots always stack perpendicular to the nav axis */
    .nav-leading,
    .nav-trailing {
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        flex-shrink: 0;
        margin: 0 8px;
    }

    @media (max-width: 639px) {
        .nav-leading,
        .nav-trailing {
            margin: 0 4px;
        }
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

    /* Padding zones - keep items off the edges --------------------------- */
    .nav-direction-top .nav-items,
    .nav-direction-bottom .nav-items { 
        padding: 0.5rem 0.5rem; 
    }

    .nav-direction-left.nav-items,
    .nav-direction-right .nav-items { 
        padding: 0.5rem 0;       
    }

    /* Positionning -------------------------------------------------------- */

    .nav-fixed { 
        position: fixed;  
    }

    .nav-floating { 
        position: sticky; 
        width: fit-content;
    }

    /* Direction anchors ---------------------------------------------------- */

    /* fixed mode */
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

    /* floating (sticky) mode */
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

    /* Palette -------------------------------------------------------------- */

    /* accent */
    .nav-palette-accent {
        background: var(--accent);
    }

    /* tone */
    .nav-palette-tone {
        background: var(--tone);
    }

    /* Elevation ------------------------------------------------------------ */

    .nav-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .nav-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

</style>