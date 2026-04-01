<script lang="ts">
    import { page } from "$app/state";
    import { trans, locale } from "../../store";
    import { placeholders } from "../../placeholders";
    import type { PlaceholderLocale } from "../../placeholders";
    import { docs_by_slug } from "../registry";

    let lang_placeholders = $derived(placeholders[$locale as PlaceholderLocale] || placeholders.en);
    let entry = $derived(docs_by_slug.get(page.params.slug ?? ""));
</script>

<svelte:head>
    <title>{entry?.label ?? "Docs"} - Spektral UI</title>
</svelte:head>

{#if entry}
    {#key entry.slug}
        <svelte:component this={entry.component} trans={$trans} placeholders={lang_placeholders} />
    {/key}
{:else}
    <div class="not-found">
        <h2>Component not found</h2>
        <p>No documentation for <code>{page.params.slug}</code></p>
    </div>
{/if}

<style>
    .not-found {
        padding: 2rem;
        text-align: center;
    }
    .not-found code {
        padding: 0.2em 0.5em;
        background: var(--tone-card);
        border-radius: 4px;
    }
</style>
