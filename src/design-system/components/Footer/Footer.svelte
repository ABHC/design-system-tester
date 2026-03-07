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
</script>

<footer
    class="footer-base {wrapper_classes}"
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
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-body);
        margin-top: auto;
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
