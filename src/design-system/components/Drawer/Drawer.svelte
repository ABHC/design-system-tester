<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { drawerConfig } from "./drawer.config";

    type Direction = "left" | "right" | "top" | "bottom";
    type Palette = "accent" | "tone";

    interface Props {
        direction?: Direction;
        palette?: Palette;
        open?: boolean;
        offset_top?: string;
        offset_bottom?: string;
        width?: string;
        height?: string;
        rounded?: boolean;
        leading?: Snippet;
        children?: Snippet;
        trailing?: Snippet;
        onclose?: () => void;
        aria_label?: string;
    }

    let {
        direction = "left",
        palette = "accent",
        open = false,
        offset_top = "0px",
        offset_bottom = "0px",
        width = "260px",
        height = "300px",
        rounded = false,
        leading,
        children,
        trailing,
        onclose,
        aria_label = "Drawer",
    }: Props = $props();

    const resolve = createVariant(drawerConfig);

    const wrapper_classes = $derived(
        resolve({
            direction,
            palette,
            rounded: rounded ? true : undefined,
            open: open ? "true" : "false",
        }).trim()
    );

    const is_horizontal = $derived(direction === "left" || direction === "right");

    const inline_style = $derived(
        [
            is_horizontal
                ? `--drawer-width: ${width}`
                : `--drawer-height: ${height}`,
            `--drawer-offset-top: ${offset_top}`,
            `--drawer-offset-bottom: ${offset_bottom}`,
        ].join("; ")
    );
</script>

<!-- Scrim - full-viewport translucent overlay -->
{#if open}
    <div
        class="drawer-scrim"
        role="presentation"
        aria-hidden="true"
        onclick={onclose}
    ></div>
{/if}

<!-- Drawer panel -->
<aside
    class={wrapper_classes}
    style={inline_style}
    aria-label={aria_label}
    aria-hidden={!open}
>
    {#if leading}
        <div class="drawer-header">
            {@render leading()}
        </div>
    {/if}

    <div class="drawer-body">
        {@render children?.()}
    </div>

    {#if trailing}
        <div class="drawer-footer">
            {@render trailing()}
        </div>
    {/if}
</aside>

<style>
    /* Base ------------------------------------------------------------- */

    .drawer-component {
        display: flex;
        position: fixed;
        z-index: 300;
        overflow: hidden;
        overflow-y: auto;
        transition:
            background 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.3s ease;
    }

    /* Direction: left / right (vertical drawer) ----------------------- */

    .drawer-direction-left,
    .drawer-direction-right {
        flex-direction: column;
        width: var(--drawer-width, 260px);
        top: var(--drawer-offset-top, 0px);
        bottom: var(--drawer-offset-bottom, 0px);
    }

    .drawer-direction-left { left: 0; }
    .drawer-direction-right { right: 0; }

    .drawer-direction-left.drawer-closed { transform: translateX(-100%); }
    .drawer-direction-right.drawer-closed { transform: translateX(100%); }

    /* Rounded - inner edge only */
    .drawer-direction-left.drawer-rounded { border-radius: 0 var(--radius-round) var(--radius-round) 0; }
    .drawer-direction-right.drawer-rounded { border-radius: var(--radius-round) 0 0 var(--radius-round); }

    /* Direction: top / bottom (horizontal drawer) --------------------- */

    .drawer-direction-top,
    .drawer-direction-bottom {
        flex-direction: column;
        height: var(--drawer-height, 300px);
        left: 0;
        right: 0;
    }

    .drawer-direction-top { top: var(--drawer-offset-top, 0px); }
    .drawer-direction-bottom { bottom: var(--drawer-offset-bottom, 0px); }

    .drawer-direction-top.drawer-closed { transform: translateY(-100%); }
    .drawer-direction-bottom.drawer-closed { transform: translateY(100%); }

    /* Rounded - inner edge only */
    .drawer-direction-top.drawer-rounded { border-radius: 0 0 var(--radius-round) var(--radius-round); }
    .drawer-direction-bottom.drawer-rounded { border-radius: var(--radius-round) var(--radius-round) 0 0; }

    /* Open state (shared) --------------------------------------------- */

    .drawer-open { transform: translate(0, 0); }

    /* Palette: accent ------------------------------------------------- */

    .drawer-palette-accent {
        background: var(--accent);
        color: var(--text-accent);

        --drawer-text: var(--text-accent);
        --drawer-muted: var(--text-accent);
        --drawer-separator: var(--accent-hover);
        --drawer-item-hover-bg: var(--accent-ghost-hover);
        --drawer-item-active-bg: var(--accent-ghost-hover);
        --drawer-item-active-border: var(--accent-hover);

        --dot-bg: var(--accent);
    }

    /* Palette: tone --------------------------------------------------- */

    .drawer-palette-tone {
        background: var(--tone);
        color: var(--text);

        --drawer-text: var(--text);
        --drawer-muted: var(--text-muted);
        --drawer-separator: var(--tone-hover);
        --drawer-item-hover-bg: var(--tone-hover);
        --drawer-item-active-bg: var(--accent);
        --drawer-item-active-border: var(--accent);

        --dot-bg: var(--tone);
    }

    /* Slots ----------------------------------------------------------- */

    .drawer-header {
        display: flex;
        align-items: center;
        padding: 1rem 1rem 0.75rem;
        border-bottom: 2px solid var(--drawer-separator, rgba(128, 128, 128, 0.2));
        flex-shrink: 0;
    }

    .drawer-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0.75rem;
        font-family: var(--font-body);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--drawer-separator, rgba(128, 128, 128, 0.3)) transparent;
    }

    .drawer-footer {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem 1rem;
        border-top: 2px solid var(--drawer-separator, rgba(128, 128, 128, 0.2));
        flex-shrink: 0;
    }

    /* Scrim ----------------------------------------------------------- */

    .drawer-scrim {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 299;
        cursor: pointer;
        animation: drawer-scrim-fade-in 0.3s ease forwards;
    }

    @keyframes drawer-scrim-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Reduced motion --------------------------------------------------- */

    @media (prefers-reduced-motion: reduce) {
        .drawer-component {
            transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .drawer-scrim {
            animation: none;
        }
    }
</style>
