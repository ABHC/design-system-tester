<script lang="ts">
    import type { Snippet } from 'svelte';
    import { onMount } from 'svelte';
    import { createVariant } from "../../utils/builder";
    import { headerConfig } from './header.config';

    type Palette = "accent" | "tone";

    interface Props {
        palette?: Palette;
        rounded?: boolean;
        visible?: boolean;
        style?: string;
        leading?: Snippet;
        children?: Snippet;
        following?: Snippet;
    }

    let {
        palette = "tone",
        rounded = false,
        visible = $bindable(true),
        style,
        leading,
        children,
        following
    }: Props = $props();

    const resolve = createVariant(headerConfig);

    const wrapper_classes = $derived(
        resolve({ palette, rounded }).trim()
    );

    let el: HTMLElement;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { visible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    });

</script>

<header
    class="header-base {wrapper_classes}"
    {style}
    bind:this={el}
>
    {#if leading}
        <div class="header-leading">
            {@render leading()}
        </div>
    {/if}

    {#if children}
        <div class="header-content">
            {@render children()}
        </div>
    {/if}

    {#if following}
        <div class="header-following">
            {@render following()}
        </div>
    {/if}
</header>

<style>
    .header-base {
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-heading);
        border-bottom: 4px solid var(--accent);
        padding: 0 5%;
        z-index: 200;
    }

    /* Rounded */
    .header-rounded { border-radius: 0 0 12px 12px; }

    /* Palette — tone (default: card background) */
    .header-palette-tone {
        background: var(--card);
        color: var(--text);
    }

    /* Palette — accent */
    .header-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
        border-bottom-color: var(--highlight);
    }

    /* Slots layout — flex-shrink: 0 prevents leading/following from compressing */
    .header-leading,
    .header-following {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .header-content {
        display: flex;
        align-items: center;
        flex: 1;
        padding: 0 2rem;
        min-width: 0;
    }
</style>
