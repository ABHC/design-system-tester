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
        trailing?: Snippet;
    }

    let {
        palette = "tone",
        rounded = false,
        visible = $bindable(true),
        style,
        leading,
        children,
        trailing
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

    {#if trailing}
        <div class="header-trailing">
            {@render trailing()}
        </div>
    {/if}
</header>

<style>
    .header-base {
        box-sizing: border-box;
        width: 100%;
        min-height: 100px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 4px solid var(--accent);
        padding: 0 5%;
        z-index: 200;
    }

    /* Rounded */
    .header-rounded { border-radius: 0 0 var(--radius-round) var(--radius-round); }

    /* Palette - tone (default: card background) */
    .header-palette-tone {
        background: var(--tone);
        color: var(--text);
    }

    /* Palette - accent */
    .header-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
        border-bottom-color: var(--tone-hover);
    }

    /* Slots layout */
    .header-leading,
    .header-trailing {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 0 0 auto;
        min-width: 0;
    }

    .header-content {
        display: flex;
        align-items: center;
        flex: 1;
        /*padding: 0 2rem;*/
        min-width: 0;
    }
</style>
