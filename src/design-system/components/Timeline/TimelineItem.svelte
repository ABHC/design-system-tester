<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import { TIMELINE_KEY, type TimelineContext } from "./timeline.config";

    // Props

    interface Props {
        marker: Snippet;
        title?: string;
        meta?: string;
        rounded?: boolean;
        wide?: boolean;
        children?: Snippet;
    }

    let {
        marker,
        title = "",
        meta = "",
        rounded = false,
        wide = false,
        children,
    }: Props = $props();

    // Context

    const ctx = getContext<TimelineContext>(TIMELINE_KEY);
    // Stable index captured once at init - not reactive to re-renders.
    const my_index = ctx.register();

    // Reverse lights the last N items. Since lit items are contiguous from
    // the end, "my item is lit" already implies "next item is lit too" -
    // except for the last item, whose trailing connector is hidden by CSS.
    const is_on = $derived(
        ctx.reverse
            ? my_index >= ctx.total - ctx.completed
            : my_index < ctx.completed
    );
    const connector_on = $derived(
        ctx.reverse
            ? my_index >= ctx.total - ctx.completed
            : my_index < ctx.completed - 1
    );
</script>

<div class="timeline-item" class:timeline-item-on={is_on}>
    <div class="timeline-marker">
        <div
            class="timeline-dot"
            class:timeline-dot-rounded={rounded}
            class:timeline-dot-wide={wide}
        >
            {@render marker()}
        </div>
        <div
            class="timeline-connector"
            class:timeline-connector-on={connector_on}
            aria-hidden="true"
        ></div>
    </div>

    <div class="timeline-content">
        {#if title || meta}
            <div class="timeline-header">
                {#if title}
                    <span class="timeline-title">{title}</span>
                {/if}
                {#if meta}
                    <span class="timeline-meta">{meta}</span>
                {/if}
            </div>
        {/if}

        {#if children}
            <div class="timeline-body">
                {@render children()}
            </div>
        {/if}
    </div>
</div>

<style>
    /* Item ---------------------------------------------------------------- */

    .timeline-item {
        display: flex;
        gap: var(--tl-item-gap, 0.75rem);
        min-width: 0;
    }

    /* Vertical: marker column left, content right */
    :global(.timeline-vertical) > .timeline-item {
        flex-direction: row;
        padding-bottom: 0.5rem;
    }

    :global(.timeline-vertical) > .timeline-item:last-child {
        padding-bottom: 0;
    }

    /* Horizontal: marker row on top, content below */
    :global(.timeline-horizontal) > .timeline-item {
        flex: 1 1 0;
        flex-direction: column;
        padding-right: 0.5rem;
        min-width: 0;
    }

    :global(.timeline-horizontal) > .timeline-item:last-child {
        padding-right: 0;
    }

    /* Marker (dot + connector) ------------------------------------------- */

    .timeline-marker {
        display: flex;
        flex-shrink: 0;
    }

    :global(.timeline-vertical) .timeline-marker {
        flex-direction: column;
        align-items: center;
    }

    :global(.timeline-horizontal) .timeline-marker {
        flex-direction: row;
        align-items: center;
    }

    /* Dot ----------------------------------------------------------------- */

    .timeline-dot {
        width: var(--tl-dot-size, 1.4rem);
        height: var(--tl-dot-size, 1.4rem);
        background: var(--tone-hover);
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--tl-dot-font, 0.75rem);
        font-weight: 700;
        line-height: 1;
        flex-shrink: 0;
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .timeline-dot-rounded {
        border-radius: var(--radius-circle);
    }

    /* Wide marker: auto-grows horizontally to fit long content (e.g. version
       strings like "v1.0.0"). Short content stays squarish thanks to min-width
       matching the dot size; long content extends into a pill. */
    .timeline-dot-wide {
        width: auto;
        min-width: var(--tl-dot-size, 1.4rem);
        padding: 0 0.6em;
    }

    .timeline-dot-wide.timeline-dot-rounded {
        border-radius: calc(var(--tl-dot-size, 1.4rem) / 2);
    }

    .timeline-item-on .timeline-dot {
        background: var(--tl-color);
        color: var(--tl-marker);
    }

    /* Outlined variant: dot uses outline instead of fill */
    :global(.timeline-outlined) .timeline-dot {
        background: transparent;
        border: 2px solid var(--tone-hover);
    }

    :global(.timeline-outlined) .timeline-item-on .timeline-dot {
        background: transparent;
        border-color: var(--tl-color);
        color: var(--tl-color);
    }

    /* Ghost variant (default): filled dot when on, tone when off */
    /* Flat variant: same as ghost but inside the flat frame */

    /* Connector ----------------------------------------------------------- */

    /* The connector color is driven by a single custom property so that
       the solid and dashed variants share one source of truth - lit state
       just overrides --tl-conn via .timeline-connector-on. */

    .timeline-connector {
        --tl-conn: var(--tone-hover);
        background: var(--tl-conn);
        transition: background 0.2s ease;
    }

    :global(.timeline-vertical) .timeline-connector {
        width: var(--tl-line-width, 2px);
        flex: 1;
        min-height: 0.75rem;
        margin-top: 0.5rem;
    }

    :global(.timeline-horizontal) .timeline-connector {
        height: var(--tl-line-width, 2px);
        flex: 1;
        min-width: 1rem;
        margin-left: 0.5rem;
    }

    /* Dashed connector: repeating gradient - independent of border quirks */
    :global(.timeline-vertical.timeline-connector-dashed) .timeline-connector {
        background: repeating-linear-gradient(
            to bottom,
            var(--tl-conn) 0 var(--tl-dash, 5px),
            transparent var(--tl-dash, 5px) calc(var(--tl-dash, 5px) * 2)
        );
    }

    :global(.timeline-horizontal.timeline-connector-dashed) .timeline-connector {
        background: repeating-linear-gradient(
            to right,
            var(--tl-conn) 0 var(--tl-dash, 5px),
            transparent var(--tl-dash, 5px) calc(var(--tl-dash, 5px) * 2)
        );
    }

    /* Mixed connector: lit connectors stay solid, unlit ones render dashed.
       Uses :not(.timeline-connector-on) so lit connectors fall through to the
       base solid rule and keep --tl-conn = --tl-color. */
    :global(.timeline-vertical.timeline-connector-mixed) .timeline-connector:not(.timeline-connector-on) {
        background: repeating-linear-gradient(
            to bottom,
            var(--tl-conn) 0 var(--tl-dash, 5px),
            transparent var(--tl-dash, 5px) calc(var(--tl-dash, 5px) * 2)
        );
    }

    :global(.timeline-horizontal.timeline-connector-mixed) .timeline-connector:not(.timeline-connector-on) {
        background: repeating-linear-gradient(
            to right,
            var(--tl-conn) 0 var(--tl-dash, 5px),
            transparent var(--tl-dash, 5px) calc(var(--tl-dash, 5px) * 2)
        );
    }

    /* No connector */
    :global(.timeline-connector-none) .timeline-connector {
        display: none;
    }

    /* Lit connector (both endpoints completed): just swap --tl-conn, the
       solid background and the dashed gradient both read from it. */
    .timeline-connector-on {
        --tl-conn: var(--tl-color);
    }

    /* Last item hides its trailing connector */
    :global(.timeline) > .timeline-item:last-child .timeline-connector {
        display: none;
    }

    /* Content ------------------------------------------------------------- */

    .timeline-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    :global(.timeline-horizontal) .timeline-content {
        padding-top: 0.5rem;
    }

    .timeline-header {
        display: flex;
        align-items: baseline;
        gap: 0.6rem;
        flex-wrap: wrap;
    }

    .timeline-title {
        font-size: var(--tl-font-size, 0.9rem);
        font-weight: 600;
        color: var(--text);
        line-height: 1.3;
        transition: color 0.2s ease;
    }

    .timeline-item-on .timeline-title {
        color: var(--tl-text);
    }

    .timeline-meta {
        font-size: var(--tl-meta-font-size, 0.75rem);
        font-family: var(--font-mono, monospace);
        color: var(--text-muted);
        letter-spacing: 0.02em;
    }

    .timeline-body {
        font-size: calc(var(--tl-font-size, 0.9rem) * 0.95);
        line-height: 1.55;
        color: var(--text-muted);
    }

    :global(.timeline-vertical) .timeline-body {
        padding-bottom: var(--tl-item-pad);
    }

    :global(.timeline-horizontal) .timeline-body {
        padding-right: var(--tl-item-pad);
    }
</style>
