<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { buttonConfig } from './button.config';

    type Variant = "primary" | "secondary" | "ghost" | "muted";
    type Size = "sm" | "md" | "lg";
    type Animate = "left" | "right" ;

    interface Props {
        variant?: Variant;
        size?: Size;
        uppercase?: boolean;
        animate?: Animate;
        children?: Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        uppercase = false,
        animate = undefined,
        children
    }: Props = $props();

    const resolve = createVariant(buttonConfig);
    
    const variant_classes = $derived(
        resolve({ variant, size, animate, uppercase })
    );

    const classes = $derived(
        `${variant_classes}`.trim()
    );
</script>

<span class={classes}>
    {@render children?.()}
</span>

<style>
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
        width: fit-content;
        height: fit-content;
    }

    /* Primary */
    .btn-primary {
        border: 2px solid var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 4px var(--muted-shadow);
    }

    /* Secondary */
    .btn-secondary {
        border: 2px solid var(--accent-more);
        background: var(--bg);
        color: var(--accent-more);
    }

    .btn-secondary:hover {
        border: 2px solid var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Ghost */
    .btn-ghost {
        border: 2px solid var(--highlight);
        background: var(--highlight);
        color: var(--text);
    }

    .btn-ghost:hover {
        border: 2px solid var(--accent);
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Muted — utility actions, no fill on hover */
    .btn-muted {
        border: 2px solid var(--highlight);
        background: transparent;
        color: var(--text-muted);
    }

    .btn-muted:hover {
        border-color: var(--accent);
        color: var(--accent);
    }

    /* Large */
    .btn-lg {
        font-size: 1.125rem;
        font-weight: 700;
        padding: 0.9rem 1.8rem;
    }

    /* Medium */
    .btn-md {
        font-weight: 600;
        padding: 0.6rem 1.2rem;
    }

    /* Small */
    .btn-sm {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }

    /* Animate */
    .btn-animate-left:hover {
        transform: translateX(-4px);
    }

    .btn-animate-right:hover {
        transform: translateX(4px);
    }


    /* Uppercase */
    .btn-uppercase {
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    .demo-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border: none;
        border-radius: 8px;
        font-size: 1.125rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--text-accent);
    }

    .demo-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .back-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        background: var(--card);
        border: none;
        border-radius: 8px;
        color: var(--text);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .back-btn:hover {
        background: var(--accent);
        color: var(--text-accent);
        transform: translateX(-4px);
    }

</style>