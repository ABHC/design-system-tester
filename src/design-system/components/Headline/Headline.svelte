<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from '../../utils/builder';
    import { headlineConfig } from './headline.config';

    type Size = "sm" | "md" | "lg";

    interface Props {
        size?: Size;
        uppercase?: boolean;
        children?: Snippet;
    }

    let {
        size = "md",
        uppercase = false,
        children
    }: Props = $props();

    const resolve = createVariant(headlineConfig);

    const variant_classes = $derived(
        resolve({ size, uppercase })
    );

    const classes = $derived(
        `${variant_classes}`.trim()
    );
</script>

<div class="headline">
    {#if size == "lg"}
        <h1 id="profile-section" class={classes}>
            {@render children?.()}
        </h1>
    {:else if size == "md"}
        <h2 id="profile-section" class={classes}>
            {@render children?.()}
        </h2>
    {:else if size == "sm"}
        <h3 id="profile-section" class={classes}>
            {@render children?.()}
        </h3>
    {/if}
    <hr>
</div>


<style>
    .headline {
        display: flex;
        align-items: baseline;
        gap: 10px;
        /*margin-bottom: 1rem ;*/
        color: var(--text);
    }

    .headline-uppercase {
        text-transform: uppercase;
    }

    .headline hr {
        flex: 1;
        border: 1px solid var(--text);
    }
</style>