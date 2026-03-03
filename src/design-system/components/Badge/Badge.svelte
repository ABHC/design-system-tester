<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { badgeConfig } from "./badge.config";

    type Variant = "primary" | "secondary" | "ghost" | "ctx";
    type Size = "sm" | "md" | "lg";
    type State = "error" | "warning" | "success" | "info";

    interface Props {
        variant?: Variant;
        size?: Size;
        uppercase?: boolean;
        state?: State;
        children?: Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        uppercase = false,
        state = undefined,
        children
    }: Props = $props();

    const resolve = createVariant(badgeConfig);
    
    const variant_classes = $derived(
        resolve({ variant, size, uppercase })
    );

    const state_class = $derived(
        variant === "ctx" && state
        ? `badge-ctx-${state}`
        : ""
    );

    const classes = $derived(
        `${variant_classes} ${state_class}`.trim()
    );
</script>

<span class={classes}>
    {@render children?.()}
</span>

<style>
    .badge {
        /*display: inline-block;*/
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        border-radius: 20px;
        line-height: 1;
    }

    /* Badges (primary, uppercase, ghost, contextuals) */
    .badge-primary {
        font-weight: 600;
        border: 2px solid var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    .badge-secondary {
        border: 2px solid var(--accent-more);
        background: var(--bg);
        color: var(--accent-more);
    }

    .badge-ghost {
        border: 2px solid var(--highlight);
        background: var(--highlight);
        color: var(--text);
    }

    /* Uppercase */
    .badge-uppercase {
        font-size: .875rem;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    /* Sizes */
    .badge-lg {
        font-size: 1.125rem;
        font-weight: 700;
        padding: 0.65rem 1.3rem;
    }

    .badge-md {
        padding: 0.45rem 0.9rem;
    }

    .badge-sm {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }


    /* Contextuals */
    .badge-ctx {
        font-weight: 600;
        color: var(--text);
        border: 2px solid transparent;
    }

    .badge-ctx-error   { background: var(--ctx-error-blend); }
    .badge-ctx-warning { background: var(--ctx-warning-blend); }
    .badge-ctx-success { background: var(--ctx-success-blend); }
    .badge-ctx-info    { background: var(--ctx-info-blend); }

</style>