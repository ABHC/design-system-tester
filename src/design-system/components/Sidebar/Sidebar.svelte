<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { sidebarConfig } from "./sidebar.config";
    import Button from "../Button/Button.svelte";
    import ListItem from "../ListItem/ListItem.svelte";

    type Position  = "fixed" | "floating";
    type Direction = "left" | "right";
    type Palette   = "accent" | "tone";
    type Layout    = "row" | "column";

    // ── Individual item data types ─────────────────────────────────────────────

    export interface ButtonItemData {
        icon?: Snippet;
        label: string;
        active?: boolean;
        onclick?: () => void;
        aria_label?: string;
    }

    export interface ListItemData {
        main: string;
        extra?: string | Snippet;
        leading?: Snippet;
        active?: boolean;
        onclick?: () => void;
    }

    // ── Group types ────────────────────────────────────────────────────────────

    export interface SidebarButtonGroup {
        type: "button";
        layout?: Layout;        // default: "column"
        items: ButtonItemData[];
    }

    export interface SidebarListGroup {
        type: "listitem";
        layout?: Layout;        // default: "column"
        items: ListItemData[];
    }

    export interface SidebarSeparator {
        type: "separator";
        label?: string;         // optional section title above the <hr>
    }

    export type SidebarItem = SidebarButtonGroup | SidebarListGroup | SidebarSeparator;

    /* Props
        Position : "fixed" overlays the viewport, "floating" is sticky and participates in the document flow.
        Direction : Which side of the viewport the sidebar is anchored to.
        Palette : theme tone or accent color
        Open : the sidebar is rendered only in its open (visible) state.
        Offsets : Shifts the sidebar up or down
        Width : default 260px
        Rounded : is the corner of the sidebar rounded
        Items : Array of SidebarButtonGroup | SidebarListGroup | SidebarSeparator.
                Groups control layout ("row" | "column") and item type independently.
                Separators add a visual divider, with an optional section label.
        Header : Slot rendered at the top of the sidebar (logo, title, avatar…)
        Children : Main content slot — navigation links, menu items, etc.
                Receives no arguments; User is responsible for its markup.
        Footer : Slot rendered at the bottom of the sidebar (theme toggle, user badge…).
        Onclose : Callback fired when the user clicks the scrim (backdrop overlay).
                If omitted, the scrim is rendered but clicking it does nothing.
                Wire this to toggle `open` from the parent.
        Aria Label : ARIA label for the <aside> landmark.
    */

    interface Props {
        position?: Position;
        direction?: Direction;
        palette?: Palette;
        open?: boolean;
        offset_top?: string;
        offset_bottom?: string;
        width?: string;
        rounded?: boolean;
        items?: SidebarItem[];
        header?: Snippet;
        children?: Snippet;
        footer?: Snippet;
        onclose?: () => void;
        aria_label?: string;
    }

    let {
        position = "fixed",
        direction = "left",
        palette = "accent",
        open = false,
        offset_top = "0px",
        offset_bottom = "0px",
        width = "260px",
        rounded = true,
        items,
        header,
        children,
        footer,
        onclose,
        aria_label = "Sidebar",
    }: Props = $props();

    // Variant resolution
    const resolve = createVariant(sidebarConfig);

    const wrapper_classes = $derived(
        resolve({
            position,
            direction,
            palette,
            rounded: rounded ? true : undefined,
            open: open ? "true" : "false",
        }).trim()
    );

    // Inline style
    const inline_style = $derived(
        [
            `--sidebar-width: ${width}`,
            `--sidebar-offset-top: ${offset_top}`,
            `--sidebar-offset-bottom: ${offset_bottom}`,
        ].join("; ")
    );
</script>

<!--
    Scrim — a full-viewport translucent overlay rendered behind the sidebar
    in "fixed" mode so the user can click outside to close.
    Not rendered in "floating" mode because the sidebar participates in flow.
-->
{#if position === "fixed" && open}
    <div
        class="sidebar-scrim"
        role="presentation"
        aria-hidden="true"
        onclick={onclose}
    ></div>
{/if}

<!--
    Sidebar wrapper — <aside> is the correct landmark for supplementary
    navigation or contextual content alongside the main page content.
-->
<aside
    class={wrapper_classes}
    style={inline_style}
    aria-label={aria_label}
    aria-hidden={!open}
>
    <!-- Top slot: logo, branding, close button… -->
    {#if header}
        <div class="sidebar-header">
            {@render header()}
        </div>
    {/if}

    <!-- Main content: navigation links, grouped menu items, etc. -->
    <div class="sidebar-body">
        {#if items && items.length > 0}
            {#each items as group}

                {#if group.type === "separator"}
                    <!-- Separator — visual divider between groups -->
                    <div class="sidebar-sep">
                        {#if group.label}
                            <span class="sidebar-sep-label">{group.label}</span>
                        {/if}
                        <hr class="sidebar-sep-hr" />
                    </div>

                {:else}
                    <!-- Item group — layout driven by group.layout -->
                    <div class="sidebar-group sidebar-group--{group.layout ?? 'column'}">

                        {#if group.type === "button"}
                            {#each group.items as item}
                                <Button
                                    variant="nav"
                                    active={item.active ?? false}
                                    aria_label={item.aria_label ?? item.label}
                                    onclick={item.onclick}
                                >
                                    {#if item.icon}
                                        <span class="nav-icon" aria-hidden="true">
                                            {@render item.icon()}
                                        </span>
                                    {/if}
                                    <span class="nav-label">{item.label}</span>
                                </Button>
                            {/each}

                        {:else if group.type === "listitem"}
                            {#each group.items as item}
                                <ListItem
                                    supporting_text={{ main: item.main, extra: item.extra }}
                                    leading={item.leading}
                                    active={item.active ?? false}
                                    onclick={item.onclick}
                                    palette={palette}
                                    rounded
                                />
                            {/each}
                        {/if}

                    </div>
                {/if}

            {/each}
        {/if}

        {@render children?.()}
    </div>

    <!-- Bottom slot: user profile, theme toggle, logout… -->
    {#if footer}
        <div class="sidebar-footer">
            {@render footer()}
        </div>
    {/if}
</aside>

<style>
    /* Base wrapper */
    .sidebar-component {
        display:        flex;
        flex-direction: column;
        width:          var(--sidebar-width, 260px);
        overflow:       hidden;
        z-index:        200;
        transition:
            background   0.3s ease,
            box-shadow   0.3s ease,
            transform    0.35s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.3s ease;
        overflow-x: hidden;
        overflow-y: auto;
    }

    /* Rounded corners — fixed mode only rounds the inner (content-facing) edge */
    .sidebar-direction-left.sidebar-fixed.sidebar-rounded  {
        border-radius: 0 14px 14px 0;
    }

    .sidebar-direction-right.sidebar-fixed.sidebar-rounded {
        border-radius: 14px 0 0 14px;
    }

    /* Floating mode: detached pill — all four corners rounded */
    .sidebar-floating.sidebar-rounded { border-radius: 14px; }

    /* Open / closed state */
    .sidebar-direction-left.sidebar-closed  {
        transform: translateX(-100%);
    }

    .sidebar-direction-right.sidebar-closed {
        transform: translateX(100%);
    }

    .sidebar-open {
        transform: translateX(0);
    }

    /* Fixed positioning */
    .sidebar-fixed {
        position: fixed;
        top: var(--sidebar-offset-top, 0px);
        bottom: var(--sidebar-offset-bottom, 0px);
    }

    .sidebar-direction-left.sidebar-fixed  { left: 0; }
    .sidebar-direction-right.sidebar-fixed { right: 0; }

    /* Floating (sticky) positioning */
    .sidebar-floating {
        position: sticky;
        top: calc(var(--sidebar-offset-top, 0px) + 0.75rem);
        align-self: flex-start;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .sidebar-direction-left.sidebar-floating  { margin-left:  0.75rem; }
    .sidebar-direction-right.sidebar-floating { margin-right: 0.75rem; }

    /* Palette — accent */
    .sidebar-palette-accent {
        background: var(--accent);
        color: var(--text-accent);

        --sidebar-text: var(--text-accent);
        --sidebar-muted: color-mix(in srgb, var(--text-accent) 80%, transparent);
        --sidebar-separator: color-mix(in srgb, var(--text-accent) 45%, transparent);
        --sidebar-item-hover-bg: color-mix(in srgb, var(--text-accent) 15%, transparent);
        --sidebar-item-active-bg: color-mix(in srgb, var(--text-accent) 25%, transparent);
        --sidebar-item-active-border: color-mix(in srgb, var(--text-accent) 45%, transparent);

        --nav-btn-color: var(--text-accent);
        --nav-btn-hover-bg: color-mix(in srgb, var(--text-accent) 15%, transparent);
        --nav-btn-active-bg: color-mix(in srgb, var(--text-accent) 25%, transparent);
        --nav-btn-active-border: color-mix(in srgb, var(--text-accent) 45%, transparent);

        --listitem-bg: color-mix(in srgb, var(--text-accent) 15%, transparent);
        --listitem-hover-bg: color-mix(in srgb, var(--text-accent) 25%, transparent);
    }

    /* Palette — tone */
    .sidebar-palette-tone {
        background: var(--card);
        color: var(--text);

        --sidebar-text: var(--text);
        --sidebar-muted: var(--text-muted);
        --sidebar-separator: var(--highlight);
        --sidebar-item-hover-bg: var(--highlight);
        --sidebar-item-active-bg: var(--accent);
        --sidebar-item-active-border: var(--accent);

        --nav-btn-color: var(--text);
        --nav-btn-hover-bg: var(--highlight);
        --nav-btn-active-bg: var(--accent);
        --nav-btn-active-border: var(--accent);

        --listitem-bg: var(--highlight);
        --listitem-hover-bg: color-mix(in srgb, var(--accent) 15%, var(--highlight));
    }

    /* Slots */
    
    .sidebar-header {
        display: flex;
        align-items: center;
        padding: 1rem 1rem 0.75rem;
        border-bottom: 2px solid var(--sidebar-separator, rgba(128, 128, 128, 0.2));
        flex-shrink: 0;
    }

    .sidebar-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0.75rem 0.5rem;
        font-family: var(--font-body);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--sidebar-separator, rgba(128,128,128,0.3)) transparent;
    }

    .sidebar-footer {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem 1rem;
        border-top: 2px solid var(--sidebar-separator, rgba(128, 128, 128, 0.2));
        flex-shrink: 0;
    }

    /* Group container */

    .sidebar-group {
        display: flex;
        gap: 6px;
    }

    /* Column layout — nav links stacked vertically, full width */
    .sidebar-group--column {
        flex-direction: column;
    }

    .sidebar-group--column :global(.btn-nav) {
        width: 100%;
        justify-content: flex-start;
        gap: 0.6rem;
        padding: 0.5rem 0.75rem;
    }

    /* Row layout — buttons side by side, equal width */
    .sidebar-group--row {
        flex-direction: row;
        flex-wrap:      wrap;
    }

    .sidebar-group--row :global(.btn-nav) {
        flex: 1;
        justify-content: center;
        gap: 0.35rem;
        padding: 0.5rem 0.4rem;
    }

    /* Separator */

    .sidebar-sep {
        padding: 0.15rem 0;
    }

    /* Optional section title — appears above the <hr> */
    .sidebar-sep-label {
        display: block;
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--sidebar-muted, rgba(128, 128, 128, 0.7));
        padding: 0.4rem 0.25rem 0.3rem;
    }

    .sidebar-sep-hr {
        border: none;
        border-top: 2px solid var(--sidebar-separator, rgba(128, 128, 128, 0.2));
        margin: 0;
    }

    /* Scrim (backdrop) */

    .sidebar-scrim {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 199;
        cursor: pointer;
        animation: scrim-fade-in 0.3s ease forwards;
    }

    @keyframes scrim-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
</style>
