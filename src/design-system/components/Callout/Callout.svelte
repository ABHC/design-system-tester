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
        bordered?: boolean;
        style?: string;
        leading?: Snippet;
        children?: Snippet;
        trailing?: Snippet;
    }

    let {
        variant = "info",
        align = "center",
        rounded = false,
        bordered = false,
        style,
        leading,
        children,
        trailing,
    }: Props = $props();

    const resolve = createVariant(calloutConfig);

    const wrapper_classes = $derived(
        resolve({ variant, align, rounded, bordered }).trim()
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

    {#if trailing}
        <div class="callout-trailing">
            {@render trailing()}
        </div>
    {/if}
</div>

<style>
    /* Base */
    .callout-base {
        display: flex;
        gap: 0.75rem;
        padding: 0.9rem 1.1rem;
        background: var(--cb-bg);
        border: 2px solid transparent;
        color: var(--text);
        font-family: var(--font-body);
    }

    /* Rounded */
    .callout-rounded { border-radius: var(--radius-soft); }

    /* Bordered */ 
    .callout-bordered {
        border-color: var(--cb-muted);
    }

    /* Align */
    .callout-align-center { align-items: center; }
    .callout-align-start { align-items: flex-start; }

    /* Variants - set --cb-color, --cb-bg, --cb-border */
    .callout-variant-accent { 
        --cb-color: var(--accent); 
        --cb-bg: var(--accent-bg); 
        --cb-muted: var(--accent-muted);
        --cb-hover: var(--accent-hover);
        --cb-ghost: var(--accent-ghost-hover);
    }
    .callout-variant-neutral { 
        --cb-color: var(--neutral); 
        --cb-bg: var(--neutral-bg); 
        --cb-muted: var(--neutral-muted);
        --cb-hover: var(--neutral-hover);
        --cb-ghost: var(--neutral-ghost-hover);
        --cb-text: var(--text-neutral);  
    }

    .callout-variant-error { 
        --cb-color: var(--error); 
        --cb-bg: var(--error-bg); 
        --cb-muted: var(--error-muted);
        --cb-hover: var(--error-hover);
        --cb-ghost: var(--error-ghost-hover);
    }

    .callout-variant-warning { 
        --cb-color: var(--warning); 
        --cb-bg: var(--warning-bg); 
        --cb-muted: var(--warning-muted);
        --cb-hover: var(--warning-hover);
        --cb-ghost: var(--warning-ghost-hover);
        --cb-text: var(--text-warning);  
    }

    .callout-variant-success { 
        --cb-color: var(--success); 
        --cb-bg: var(--success-bg); 
        --cb-muted: var(--success-muted);
        --cb-hover: var(--success-hover);
        --cb-ghost: var(--success-ghost-hover);
    }

    .callout-variant-info { 
        --cb-color: var(--info); 
        --cb-bg: var(--info-bg); 
        --cb-muted: var(--info-muted);
        --cb-hover: var(--info-hover);
        --cb-ghost: var(--info-ghost-hover);
    }

    /* Slots */
    .callout-leading {
        color: var(--cb-muted);
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

    .callout-trailing {
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
        color: var(--cb-muted);
        line-height: 1.3;
    }

    /* <code> inside callout content */
    .callout-content :global(code) {
        font-size: 0.85em;
        font-family: monospace;
        font-weight: 600;
        color: var(--text);
        background: var(--cb-ghost);
        padding: 0.1em 0.35em;
        border-radius: var(--radius-edge);
    }

    /* Icon in leading slot */
    .callout-leading :global(.material-symbols-outlined) {
        font-size: 1.2rem;
    }
</style>
