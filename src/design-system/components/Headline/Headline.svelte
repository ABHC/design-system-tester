<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from '../../utils/builder';
    import { headlineConfig } from './headline.config';

    type Size = "xs" | "sm" | "md" | "lg";

    interface Props {
        size?: Size;
        uppercase?: boolean;
        muted?: boolean;
        children?: Snippet;
    }

    let {
        size = "md",
        uppercase = false,
        muted = false,
        children
    }: Props = $props();

    const resolve = createVariant(headlineConfig);

    const variant_classes = $derived(
        resolve({ size, uppercase, muted })
    );

    const classes = $derived(
        `${variant_classes}`.trim()
    );
</script>

<div class="headline {muted ? 'hr-muted' : ''}">
    {#if size == "lg"}
        <h1 class={classes}>
            {@render children?.()}
        </h1>
    {:else if size == "md"}
        <h2 class={classes}>
            {@render children?.()}
        </h2>
    {:else if size == "sm"}
        <h3 class={classes}>
            {@render children?.()}
        </h3>
    {:else if size == "xs"}
        <span class={classes}>
            {@render children?.()}
        </span>
    {/if}
    <hr>
</div>


<style>
    .headline {
        display: flex;
        align-items: baseline;
        gap: 10px;
        color: var(--color, var(--text));
    }

    .headline-uppercase {
        text-transform: uppercase;
    }

    .headline hr {
        flex: 1;
        border: 1px solid var(--color, var(--text));
    }

    .headline-xs {
        font-weight: 600;
    }

    .headline-muted {
        color: var(--text-muted);
    }

    .hr-muted hr {
        border-color: var(--text-muted);
    }
</style>