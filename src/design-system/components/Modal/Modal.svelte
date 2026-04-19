<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { modalConfig, defaultModalConfig, type Elevation } from "./modal.config";

    type Palette = "tone" | "accent" | "accentbg";

    /*
        open : Controls visibility.
        onclose : Called on scrim click or Escape key.
        palette : tone (--card bg) | accent (--accent bg). Default: tone.
        rounded : Border-radius. Default: true.
        width : CSS width of the dialog. Default: "480px".
                Max-width is always capped at calc(100vw - 2rem).
        label : Accessible name fallback when no leading snippet is provided.

        Slots :
            leading : Top zone - padded, bottom border. Auto-linked as aria-labelledby.
            children : Body zone - padded, scrollable.
            trailing : Bottom zone - padded, top border, flex row.

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
        label?: string;
        leading?: Snippet;
        children?: Snippet;
        trailing?: Snippet;
    }

    let {
        open = false,
        onclose = undefined,
        palette = defaultModalConfig.palette,
        elevation = defaultModalConfig.elevation,
        rounded = defaultModalConfig.rounded,
        width = "480px",
        label,
        leading,
        children,
        trailing,
    }: Props = $props();

    const resolve = createVariant(modalConfig);
    const modal_classes = $derived(resolve({ palette, rounded, elevation }));
    const style = $derived(`width: ${width};`);

    const title_id = `spektral-modal-${Math.random().toString(36).slice(2, 10)}`;

    let modal_el: HTMLElement | undefined = $state();
    let last_trigger: HTMLElement | null = null;

    const FOCUSABLE = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    function get_focusables(): HTMLElement[] {
        if (!modal_el) return [];
        return Array.from(modal_el.querySelectorAll<HTMLElement>(FOCUSABLE));
    }

    function handle_keydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            onclose?.();
            return;
        }
        if (e.key !== "Tab" || !modal_el) return;

        const focusables = get_focusables();
        if (focusables.length === 0) {
            e.preventDefault();
            modal_el.focus();
            return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const inside = !!active && modal_el.contains(active);

        if (!inside) {
            e.preventDefault();
            first.focus();
            return;
        }
        if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }
    }

    $effect(() => {
        if (!open) return;
        last_trigger = document.activeElement as HTMLElement | null;
        queueMicrotask(() => {
            const focusables = get_focusables();
            (focusables[0] ?? modal_el)?.focus();
        });
        return () => {
            last_trigger?.focus?.();
        };
    });
</script>

<svelte:window onkeydown={open ? handle_keydown : undefined} />

{#if open}
    <!-- Scrim - click to close -->
    <div
        class="modal-scrim"
        role="presentation"
        onclick={onclose}
    ></div>

    <!-- Dialog -->
    <div
        bind:this={modal_el}
        class={modal_classes}
        {style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={leading ? title_id : undefined}
        aria-label={!leading ? label : undefined}
        tabindex="-1"
    >
        {#if leading}
            <div class="modal-header" id={title_id}>
                {@render leading()}
            </div>
        {/if}

        {#if children}
            <div class="modal-body">
                {@render children()}
            </div>
        {/if}

        {#if trailing}
            <div class="modal-footer">
                {@render trailing()}
            </div>
        {/if}
    </div>
{/if}

<style>
    /* Scrim ---------------------------------------------------------------- */
    .modal-scrim {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 200;
        animation: scrim-in 0.18s ease;
    }

    /* Dialog --------------------------------------------------------------- */
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

    .modal-dialog:focus {
        outline: none;
    }

    @keyframes scrim-in {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    @keyframes dialog-in {
        from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
        to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
        .modal-scrim,
        .modal-dialog {
            animation: none;
        }
    }

    /* Palette ------------------------------------------------------------- */

    /* tone */
    .modal-palette-tone {
        background: var(--tone);
        color: var(--text);
        --modal-border: var(--tone-hover);
        --modal-muted:  var(--text-muted);
    }

    /* accent */
    .modal-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
        --modal-border: var(--accent-hover);
        --modal-muted: var(--text-accent);
    }

    /* accentbg */
    .modal-palette-accentbg {
        background: var(--accent-bg);
        color: var(--text-accent);
        --modal-border: var(--accent-muted);
        --modal-muted: var(--text-accent);
    }

    /* Rounded -------------------------------------------------------------- */
    .modal-rounded {
        border-radius: var(--radius-round);
    }

    /* Elevation ------------------------------------------------------------ */
    .modal-elevation-none {
        box-shadow: none;
    }

    .modal-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .modal-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

    /* Header -------------------------------------------------------------- */
    .modal-header {
        padding: 1.25rem;
        border-bottom: 2px solid var(--modal-border);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    /* Body ---------------------------------------------------------------- */
    .modal-body {
        flex: 1;
        padding: 1.25rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    /* Footer -------------------------------------------------------------- */
    .modal-footer {
        padding: 1rem 1.25rem;
        /*border-top: 1px solid var(--modal-border);*/
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }
</style>
