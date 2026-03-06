<script lang="ts">
    import type { Snippet } from 'svelte';
    import { fly } from 'svelte/transition';
    import { createVariant } from "../../utils/builder";
    import { alertConfig } from './alert.config';
    import Button from '../Button/Button.svelte';

    type Variant  = "info" | "success" | "warning" | "error";
    type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    type AnimDir  = "top" | "bottom" | "left" | "right" | false;

    /*
        Props
        animate : Direction of the slide-in/out translation. false = no animation
        duration : Auto-dismiss delay in seconds. Omit to disable.
        dismissable : Show a built-in close button (icon) when no `following` snippet is provided
        dismiss_label : Show a btn-text dismiss button with this label. Takes priority over `dismissable`
    */
    interface Props {
        variant?: Variant;
        position?: Position;
        rounded?: boolean;
        animate?: AnimDir;
        duration?: number;
        dismissable?: boolean;
        dismiss_label?: string;
        style?: string;
        leading?: Snippet;
        children?: Snippet;
        following?: Snippet;
        ondismiss?: () => void;
    }

    let {
        variant = "info",
        position = "bottom-right",
        rounded = false,
        animate = false,
        duration = undefined,
        dismissable = false,
        dismiss_label = undefined,
        style,
        leading,
        children,
        following,
        ondismiss,
    }: Props = $props();

    let visible = $state(true);

    function dismiss() {
        visible = false;
        ondismiss?.();
    }

    $effect(() => {
        if (duration !== undefined && duration > 0) {
            const timer = setTimeout(dismiss, duration * 1000);
            return () => clearTimeout(timer);
        }
    });

    const resolve = createVariant(alertConfig);

    const wrapper_classes = $derived(
        resolve({ variant, position, rounded }).trim()
    );

    function flyParams() {
        const base = { duration: 320 };
        switch (animate) {
            case "top": return { ...base, y: -24, x: 0 };
            case "bottom": return { ...base, y:  24, x: 0 };
            case "left": return { ...base, x: -24, y: 0 };
            case "right": return { ...base, x:  24, y: 0 };
            default: return { duration: 0, x: 0, y: 0 };
        }
    }

    function outFlyParams() {
        const base = { duration: 320 };
        switch (animate) {
            case "top": return { ...base, y:  24, x: 0 };
            case "bottom": return { ...base, y: -24, x: 0 };
            case "left": return { ...base, x:  24, y: 0 };
            case "right": return { ...base, x: -24, y: 0 };
            default: return { duration: 0, x: 0, y: 0 };
        }
    }
</script>

{#if visible}
    <div
        class="alert-base {wrapper_classes}"
        role="alert"
        in:fly={flyParams()}
        out:fly={outFlyParams()}
        {style}
    >
        {#if leading}
            <div class="alert-leading">
                {@render leading()}
            </div>
        {/if}

        {#if children}
            <div class="alert-content">
                {@render children()}
            </div>
        {/if}

        {#if following}
            <div class="alert-following">
                {@render following()}
            </div>
        {:else if dismiss_label}
            <div class="alert-following">
                <Button variant="text" size="sm" onclick={dismiss}>
                    {dismiss_label}
                </Button>
            </div>
        {:else if dismissable}
            <div class="alert-following">
                <Button variant="text" size="sm" onclick={dismiss} aria_label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </Button>
            </div>
        {/if}
    </div>
{/if}

<style>
    /* Base */
    .alert-base {
        position: fixed;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem 1rem;
        min-width: 260px;
        max-width: 460px;
        width: fit-content;
        background: color-mix(in srgb, var(--al-color) 12%, var(--highlight) 88%);
        border-left: 4px solid var(--al-color);
        color: var(--text);
        font-family: var(--font-body);
        box-shadow: 0 4px 24px color-mix(in srgb, var(--al-color) 16%, var(--overlay) 84%);
    }

    /* Variants — set --al-color, everything derives from it */
    .alert-variant-info { --al-color: var(--ctx-info);    }
    .alert-variant-success { --al-color: var(--ctx-success); }
    .alert-variant-warning { --al-color: var(--ctx-warning); }
    .alert-variant-error { --al-color: var(--ctx-error);   }

    /*
        Positions
        Center positions use left:0 + right:0 + margin-inline:auto instead of
        translateX(-50%) to avoid conflicting with the fly() transition transform.
    */
    .alert-pos-top-left { top: 1.5rem; left: 1.5rem; }
    .alert-pos-top-center { top: 1.5rem; left: 0; right: 0; margin-inline: auto; }
    .alert-pos-top-right { top: 1.5rem; right: 1.5rem; }
    .alert-pos-bottom-left { bottom: 1.5rem; left: 1.5rem; }
    .alert-pos-bottom-center { bottom: 1.5rem; left: 0; right: 0; margin-inline: auto; }
    .alert-pos-bottom-right { bottom: 1.5rem; right: 1.5rem; }

    /* Rounded */
    .alert-rounded { border-radius: 10px; }

    /* Slots */
    .alert-leading {
        color: var(--al-color);
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }

    .alert-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .alert-following {
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }

    /* <code> inside content */
    .alert-content :global(code) {
        font-size: 0.85em;
        font-family: monospace;
        font-weight: 600;
        color: var(--al-color);
        background: color-mix(in srgb, var(--al-color) 12%, transparent);
        padding: 0.1em 0.35em;
        border-radius: 4px;
    }

    /* <a> inside content — inherits --al-color automatically */
    .alert-content :global(a) {
        color: var(--al-color);
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .alert-content :global(a:hover) {
        opacity: 0.75;
    }

    /* Button overrides — btn-muted and btn-text both inherit --al-color.*/
    .alert-base :global(.btn.btn-muted) {
        border-color: color-mix(in srgb, var(--al-color) 50%, transparent);
        color: var(--al-color);
    }

    .alert-base :global(.btn.btn-muted:hover) {
        border-color: var(--al-color);
        background: var(--al-color);
        color: var(--card);
    }

    .alert-base :global(.btn.btn-text) {
        color: color-mix(in srgb, var(--al-color) 70%, var(--text) 30%);
    }

    .alert-base :global(.btn.btn-text:hover) {
        color: var(--al-color);
    }
</style>
