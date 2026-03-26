<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { popoverConfig, defaultPopoverConfig } from "./popover.config";
    import type { PopoverPalette, PopoverElevation } from "./popover.config";

    interface Props {
        open?: boolean;
        onclose?: () => void;
        maxHeight?: string;
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
        palette = defaultPopoverConfig.palette,
        rounded = defaultPopoverConfig.rounded,
        elevation = defaultPopoverConfig.elevation,
        trigger,
        children,
    }: Props = $props();

    const resolve = createVariant(popoverConfig);

    const panel_classes = $derived(resolve({ palette, rounded, elevation }));

    const panel_style = $derived(`max-height: ${maxHeight};`);

    function handle_outside() {
        if (open) onclose?.();
    }

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "Escape") onclose?.();
    }
</script>

<svelte:window
    onclick={open ? handle_outside : undefined}
    onkeydown={open ? handle_keydown : undefined}
/>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="popover-anchor" onclick={(e) => e.stopPropagation()}>
    {@render trigger()}

    {#if open}
        <div class={panel_classes} style={panel_style}>
            {@render children()}
        </div>
    {/if}
</div>

<style>
    /* Anchor ────────────────────────────────────────────────────────── */

    .popover-anchor {
        position: relative;
    }

    /* Panel ─────────────────────────────────────────────────────────── */

    .popover {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        z-index: 100;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        box-sizing: border-box;
        animation: popover-in 0.12s ease;
    }

    @keyframes popover-in {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Palette — tone ───────────────────────────────────────────────── */

    .popover-palette-tone {
        background: var(--tone);
        border: 2px solid var(--tone-hover);
        color: var(--text);
        scrollbar-color: var(--tone-hover) var(--tone)
    }

    /* Palette — accent ─────────────────────────────────────────────── */

    .popover-palette-accent {
        background: var(--accent);
        border: 2px solid var(--accent-hover);
        color: var(--text-accent);
        scrollbar-color: var(--accent-muted) var(--accent)
    }

    /* Palette — accentbg ───────────────────────────────────────────── */

    .popover-palette-accentbg {
        background: var(--accent-bg);
        border: 2px solid var(--tone-hover);
        color: var(--text-accent);
        scrollbar-color: var(--accent-hover) var(--accent-bg)
    }

    /* Rounded ──────────────────────────────────────────────────────── */

    .popover-rounded {
        border-radius: 8px;
    }

    /* Elevation ────────────────────────────────────────────────────── */

    .popover-elevation-none {
        box-shadow: none;
    }

    .popover-elevation-subtle {
        box-shadow: 0 8px 24px var(--shadow-subtle);
    }

    .popover-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow);
    }
</style>
