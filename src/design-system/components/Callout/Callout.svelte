<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { calloutConfig } from './callout.config';

    type Variant = "accent" | "neutral" | "error" | "warning" | "success" | "info";
    type Align = "center" | "start";

    interface Props {
        variant?: Variant;
        align?: Align;
        rounded?: boolean;
        style?: string;
        leading?: Snippet;
        children?: Snippet;
        following?: Snippet;
    }

    let {
        variant = "info",
        align = "center",
        rounded = false,
        style,
        leading,
        children,
        following,
    }: Props = $props();

    const resolve = createVariant(calloutConfig);

    const wrapper_classes = $derived(
        resolve({ variant, align, rounded }).trim()
    );
</script>

<div
    class="callout-base {wrapper_classes}"
    role="note"
    {style}
>
    {#if leading}
        <div class="callout-leading">
            {@render leading()}
        </div>
    {/if}

    {#if children}
        <div class="callout-content">
            {@render children()}
        </div>
    {/if}

    {#if following}
        <div class="callout-following">
            {@render following()}
        </div>
    {/if}
</div>

<style>
    /* Base */
    .callout-base {
        display: flex;
        gap: 0.75rem;
        padding: 0.9rem 1.1rem;
        background: color-mix(in srgb, var(--cb-color) 10%, var(--card) 90%);
        border: 1.5px solid color-mix(in srgb, var(--cb-color) 30%, transparent);
        color: var(--text);
        font-family: var(--font-body);
    }

    /* Rounded */
    .callout-rounded { border-radius: 10px; }

    /* Align */
    .callout-align-center { align-items: center; }
    .callout-align-start { align-items: flex-start; }

    /* Variants — set --cb-color, everything else derives from it */
    .callout-variant-accent { --cb-color: var(--accent); }
    .callout-variant-neutral { --cb-color: var(--text); }
    .callout-variant-error { --cb-color: var(--ctx-error); }
    .callout-variant-warning { --cb-color: var(--ctx-warning); }
    .callout-variant-success { --cb-color: var(--ctx-success); }
    .callout-variant-info { --cb-color: var(--ctx-info); }

    /* Slots */
    .callout-leading {
        color: var(--cb-color);
        flex-shrink: 0;
        display: flex;
        align-items: inherit;
    }

    .callout-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .callout-following {
        flex-shrink: 0;
        display: flex;
        align-items: inherit;
    }

    /* Typography inside callout content */
    .callout-content :global(p) {
        font-size: 0.85rem;
        line-height: 1.55;
        opacity: 0.85;
        margin: 0;
    }

    .callout-content :global(strong) {
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--cb-color);
        line-height: 1.3;
    }

    /* <code> inside callout content */
    .callout-content :global(code) {
        font-size: 0.85em;
        font-family: monospace;
        font-weight: 600;
        color: var(--cb-color);
        background: color-mix(in srgb, var(--cb-color) 12%, transparent);
        padding: 0.1em 0.35em;
        border-radius: 4px;
    }

    /* Icon in leading slot */
    .callout-leading :global(.material-symbols-outlined) {
        font-size: 1.2rem;
    }

    /* 
        Button inside callout — muted variant inherits --cb-color
        Specificity trick: .callout-base + .btn + .btn-muted (3 classes)
        beats Button's own .btn-muted.svelte-hash (2 classes). 
    */
    .callout-base :global(.btn.btn-muted) {
        border-color: color-mix(in srgb, var(--cb-color) 50%, transparent);
        color: var(--cb-color);
    }

    .callout-base :global(.btn.btn-muted:hover) {
        border-color: var(--cb-color);
        background: var(--cb-color);
        color: var(--card);
    }

    .callout-base :global(.btn.btn-text) {
        color: color-mix(in srgb, var(--cb-color) 70%, var(--text) 30%);
    }

    .callout-base :global(.btn.btn-text:hover) {
        color: var(--cb-color);
    }
</style>
