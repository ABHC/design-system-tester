<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { modalConfig, defaultModalConfig, type Elevation } from "./modal.config";

    type Palette = "tone" | "accent";

    /*
        open : Controls visibility.
        onclose : Called on scrim click or Escape key.
        palette : tone (--card bg) | accent (--accent bg). Default: tone.
        rounded : Border-radius. Default: true.
        width : CSS width of the dialog. Default: "480px".
                Max-width is always capped at calc(100vw - 2rem).

        Slots
        header : Top zone — padded, bottom border.
        children : Body zone — padded, scrollable.
        footer : Bottom zone — padded, top border, flex row.

        Note: the modal renders inline in the component tree.
        Ensure no ancestor has overflow:hidden or a conflicting z-index.
    */

    interface Props {
        open?: boolean;
        onclose?: () => void;
        palette?: Palette;
        elevation?: Elevation;
        rounded?: boolean;
        width?: string;
        header?: Snippet;
        children?: Snippet;
        footer?: Snippet;
    }

    let {
        open = false,
        onclose = undefined,
        palette = defaultModalConfig.palette,
        elevation = defaultModalConfig.elevation,
        rounded = defaultModalConfig.rounded,
        width = "480px",
        header,
        children,
        footer,
    }: Props = $props();

    const resolve = createVariant(modalConfig);
    const dialog_classes = $derived(resolve({ palette, rounded, elevation }));
    const style = $derived(`width: ${width};`);

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "Escape") onclose?.();
    }
</script>

<svelte:window onkeydown={open ? handle_keydown : undefined} />

{#if open}
    <!-- Scrim — click to close -->
    <div
        class="modal-scrim"
        role="presentation"
        onclick={onclose}
    ></div>

    <!-- Dialog -->
    <div
        class={dialog_classes}
        {style}
        role="dialog"
        aria-modal="true"
    >
        {#if header}
            <div class="modal-header">
                {@render header()}
            </div>
        {/if}

        {#if children}
            <div class="modal-body">
                {@render children()}
            </div>
        {/if}

        {#if footer}
            <div class="modal-footer">
                {@render footer()}
            </div>
        {/if}
    </div>
{/if}

<style>
    /* Scrim */
    .modal-scrim {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 200;
        animation: scrim-in 0.18s ease;
    }

    /* Dialog */
    .modal-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 201;
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        max-width: calc(100vw - 2rem);
        box-sizing: border-box;
        border: 2px solid var(--modal-border);
        animation: dialog-in 0.18s ease;
    }

    @keyframes scrim-in {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    @keyframes dialog-in {
        from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
        to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }

    /* Palette — tone */
    .modal-palette-tone {
        background: var(--card);
        color: var(--text);
        --modal-border: var(--highlight);
        --modal-muted:  var(--text-muted);
    }

    /* Palette — accent */
    .modal-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
        --modal-border: color-mix(in srgb, var(--text-accent) 20%, transparent);
        --modal-muted:  color-mix(in srgb, var(--text-accent) 75%, transparent);
    }

    /* Rounded */
    .modal-rounded {
        border-radius: 16px;
    }

    /* Elevation */
    .modal-elevation-none {
        box-shadow: none;
    }

    .modal-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .modal-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow);
    }

    /* Header */
    .modal-header {
        padding: 1.25rem;
        border-bottom: 2px solid var(--modal-border);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    /* Body */
    .modal-body {
        flex: 1;
        padding: 1.25rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    /* Footer */
    .modal-footer {
        padding: 1rem 1.25rem;
        /*border-top: 1px solid var(--modal-border);*/
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }
</style>
