<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { footerConfig } from './footer.config';

    type Palette = "accent" | "tone";

    interface Props {
        palette?: Palette;
        rounded?: boolean;
        style?: string;
        leading?: Snippet;
        children?: Snippet;
        following?: Snippet;
    }

    let {
        palette = "accent",
        rounded = false,
        style,
        leading,
        children,
        following
    }: Props = $props();

    const resolve = createVariant(footerConfig);

    const wrapper_classes = $derived(
        resolve({ palette, rounded }).trim()
    );

    let footer_el: HTMLElement;
    let is_wrapped = $state(false);

    $effect(() => {
        const observer = new ResizeObserver(() => {
            const items = [...footer_el.children] as HTMLElement[];
            if (items.length < 2) return;
            is_wrapped = items[0].offsetTop !== items[items.length - 1].offsetTop;
        });
        observer.observe(footer_el);
        return () => observer.disconnect();
    });
</script>

<footer
    bind:this={footer_el}
    class="footer-base {wrapper_classes}"
    class:footer-wrapped={is_wrapped}
    {style}
>
    {#if leading}
        <div class="footer-leading">
            {@render leading()}
        </div>
    {/if}

    {#if children}
        <div class="footer-content">
            {@render children()}
        </div>
    {/if}

    {#if following}
        <div class="footer-following">
            {@render following()}
        </div>
    {/if}
</footer>

<style>
    .footer-base {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 3%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-body);
        margin-top: auto;
        z-index: 200;
    }

    .footer-wrapped {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* Rounded — top corners only */
    .footer-rounded { border-radius: 12px 12px 0 0; }

    /* Palette — accent (default: matches layout footer) */
    .footer-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Palette — tone */
    .footer-palette-tone {
        background: var(--card);
        color: var(--text);
        border-top: 4px solid var(--accent);
    }

    /* Slots layout */
    .footer-leading,
    .footer-following {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .footer-content {
        display: flex;
        align-items: center;
        flex: 1;
        padding: 0 2rem;
        min-width: 0;
    }
</style>
