<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { buttonConfig } from './button.config';

    type Variant = "primary" | "secondary" | "ghost" | "muted" | "nav";
    type Size = "sm" | "md" | "lg";
    type Animate = "left" | "right" ;

    interface Props {
        variant?: Variant;
        size?: Size;
        uppercase?: boolean;
        animate?: Animate;
        active?: boolean; //highlights the button as currently selected (nav use)
        squared?: boolean;
        aria_label?: string;
        onclick?: () => void;
        children?: Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        uppercase = false,
        animate = undefined,
        active = false,
        squared = false,
        aria_label = undefined,
        onclick = undefined,
        children
    }: Props = $props();

    const resolve = createVariant(buttonConfig);

    const variant_classes = $derived(
        resolve({ variant, size, animate, uppercase, active, squared })
    );

    const classes = $derived(
        `${variant_classes}`.trim()
    );
</script>

<button 
    class={classes}
    aria-label={aria_label}
    aria-current={active ? "page" : undefined}
    {onclick}
>
    {@render children?.()}
</button>

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

    /* Nav — icon + label stacked along the nav axis.
    Colour context is inherited from the parent Nav container.
    Two palette modes are driven by CSS custom properties set
    on the Nav wrapper:
        • palette="accent" → parent sets --nav-btn-color, --nav-btn-hover-bg
        • palette="tone" → same tokens, different values
    flex-direction mirrors the nav axis via --nav-btn-flex-direction
    set on the Nav wrapper (column for left/right, row for top/bottom).
    */
    .btn-nav {
        gap: 0.25rem;
        border-radius: 8px;
        background: transparent;
        border: none;
        color: var(--nav-btn-color, var(--text-accent));
        padding: 0.25rem;
    }

    .btn-nav :global(.nav-icon) {
        font-size: 1.375rem;
        line-height: 1;
    }

    .btn-nav :global(.nav-label) {
        font-family: var(--font-heading);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        line-height: 1;
        /* Prevent label from wrapping and overflowing the square */
        white-space: nowrap;
        /*overflow: hidden;*/
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .btn-nav:hover {
        background: var(--nav-btn-hover-bg, rgba(255, 255, 255, 0.15));
        /*transform: scale(1.05);*/
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    /* Active / current page highlight */
    .btn-nav.btn-active {
        /*background: var(--nav-btn-active-bg, rgba(255, 255, 255, 0.25));
        box-shadow: inset 0 0 0 2px var(--nav-btn-active-border, rgba(255, 255, 255, 0.4));*/
        border-bottom: solid 2px var(--nav-btn-active-border);
        border-radius: 8px 8px 0 0;
    }

    .btn-nav.btn-active:hover {
        transform: scale(1.05);
    }

    /* Sizes */
    .btn-lg {
        font-size: 1.125rem;
        font-weight: 700;
        padding: 0.9rem 1.8rem;
    }

    .btn-md {
        font-weight: 600;
        padding: 0.6rem 1.2rem;
    }

    .btn-sm {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }

    /* Squared — declared after sizes so it overrides their padding.
    Column layout: icon stacked above label. */
    .btn-squared {
        flex-direction: column;
        aspect-ratio:   1;
        padding:        0.25rem;
    }

    .btn-squared.btn-sm { width: 46px; }
    .btn-squared.btn-md { width: 62px; }
    .btn-squared.btn-lg { width: 74px; }

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