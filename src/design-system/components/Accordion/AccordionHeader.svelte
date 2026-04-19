<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { accordionHeaderConfig } from "./accordion.config";

    // Props ----------------------------------------------------------------

    interface Props {
        label: string;
        leading?: Snippet;
        open?: boolean;
        disabled?: boolean;
        children: Snippet;
    }

    let {
        label,
        leading,
        open = false,
        disabled = false,
        children,
    }: Props = $props();

    let is_open: boolean = $state(open);

    const resolve = createVariant(accordionHeaderConfig);

    const header_classes = $derived(
        resolve({
            open: is_open ? "true" : "false",
            disabled: disabled ? true : undefined,
        }).trim()
    );

    function toggle() {
        if (!disabled) is_open = !is_open;
    }
</script>

<div class={header_classes}>
    <button
        class="accordion-header-btn"
        onclick={toggle}
        aria-expanded={is_open}
        {disabled}
        type="button"
    >
        {#if leading}
            <span class="accordion-header-icon" aria-hidden="true">
                {@render leading()}
            </span>
        {/if}
        <span class="accordion-header-label">{label}</span>
        <span class="accordion-header-chevron" aria-hidden="true">
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline points="4 2 8 6 4 10" />
            </svg>
        </span>
    </button>

    {#if is_open}
        <div class="accordion-item">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    /* Header wrapper ------------------------------------------------------ */

    .accordion-header {
        display: flex;
        flex-direction: column;
    }

    /* Header button ------------------------------------------------------- */

    .accordion-header-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: var(--acc-header-padding, 0.6rem 1rem);
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--acc-text, var(--text));
        font-family: inherit;
        font-size: var(--acc-font-size, 0.875rem);
        font-weight: 600;
        line-height: 1.4;
        text-align: left;
        width: 100%;
        border-radius: 0;
        transition: background 0.15s ease, color 0.15s ease;
    }

    .accordion-header-btn:hover {
        background: var(--acc-hover, rgba(128, 128, 128, 0.1));
    }

    .accordion-header-btn:focus { outline: none; }
    .accordion-header-btn:focus-visible {
        outline: var(--focus-ring-width) solid var(--focus-ring);
        outline-offset: calc(var(--focus-ring-offset) * -1);
    }

    /* Flat variant: header gets palette color */
    :global(.accordion-flat) .accordion-header-btn {
        background: var(--acc-header-flat, var(--tone-hover));
        color: var(--acc-header-flat-text, var(--text));
    }

    :global(.accordion-flat) .accordion-header-btn:hover {
        background: var(--acc-hover);
    }

    /* Flat variant: header gets palette color */
    :global(.accordion-ghost) .accordion-header-btn {
        color: var(--acc-header-ghost-text);
    }

    /* Outlined variant: border around each header+item group */
    :global(.accordion-outlined) .accordion-header-btn {
        color: var(--acc-header-ghost-text);
    }

    :global(.accordion-outlined) .accordion-header {
        border: 2px solid var(--acc-border, var(--tone-hover));
    }

    :global(.accordion-outlined) .accordion-header-btn:hover,
    :global(.accordion-ghost) .accordion-header-btn:hover {
        background: var(--tone-hover);
    }


    /* Rounded + flat/outlined: radius on each item */
    :global(.accordion-rounded.accordion-outlined) .accordion-header,
    :global(.accordion-rounded.accordion-flat) .accordion-header {
        border-radius: var(--radius-soft);
        overflow: hidden;
    }

    /* Rounded + ghost: first/last/only rounding (items form a single block) */
    :global(.accordion-rounded.accordion-ghost) .accordion-header:first-child .accordion-header-btn {
        border-radius: var(--radius-soft) var(--radius-soft) 0 0;
    }

    :global(.accordion-rounded.accordion-ghost) .accordion-header:last-child .accordion-header-btn {
        border-radius: 0 0 var(--radius-soft) var(--radius-soft);
    }

    :global(.accordion-rounded.accordion-ghost) .accordion-header:only-child .accordion-header-btn {
        border-radius: var(--radius-soft);
    }

    /* Disabled ------------------------------------------------------------ */

    .accordion-header-disabled .accordion-header-btn {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .accordion-header-disabled .accordion-header-btn:hover {
        background: transparent;
        filter: none;
    }

    /* Icon ---------------------------------------------------------------- */

    .accordion-header-icon {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        line-height: 1;
        flex-shrink: 0;
    }

    /* Label --------------------------------------------------------------- */

    .accordion-header-label {
        flex: 1;
    }

    /* Chevron ------------------------------------------------------------- */

    .accordion-header-chevron {
        display: flex;
        align-items: center;
        transition: transform 0.2s ease;
        flex-shrink: 0;
        opacity: 0.6;
    }

    .accordion-header-open .accordion-header-chevron {
        transform: rotate(90deg);
    }

    /* Item (content zone) ------------------------------------------------- */

    .accordion-item {
        padding: var(--acc-item-padding, 0.75rem 1rem);
        font-size: var(--acc-font-size, 0.875rem);
        line-height: 1.6;
        color: var(--text);
    }

    /* Flat variant: item gets tone background */
    :global(.accordion-flat) .accordion-item {
        background: var(--tone);
    }
</style>
