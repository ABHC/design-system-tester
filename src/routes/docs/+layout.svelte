<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { trans } from "../store";
    import { docs, categories } from "./registry";
    import { 
        Explorer, 
        ExplorerGroup, 
        ExplorerLink, 
        SearchField 
    } from "@abhc/spektral-ui";


    let { children }: { children?: Snippet | null } = $props();
    let search: string = $state("");

    // -- Explorer (left) --
    const query = $derived(search.trim().toLowerCase());

    const by_category = $derived(
        categories
            .map(cat => ({
                ...cat,
                entries: docs.filter(d =>
                    d.category === cat.key &&
                    (!query || d.label.toLowerCase().includes(query) || d.slug.includes(query))
                ),
            }))
            .filter(cat => cat.entries.length > 0)
    );

    function current_slug(): string {
        return page.url.pathname.split("/").pop() ?? "";
    }

    // -- Doc Summary (right) — IntersectionObserver on data-summary elements --

    interface SummaryItem {
        id: string;
        label: string;
    }

    let summary_items: SummaryItem[] = $state([]);
    let active_id: string = $state("");

    function scroll_to(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Re-scan data-summary elements whenever the route (slug) changes
    let content_el: HTMLDivElement | undefined = $state(undefined);
    let observer: IntersectionObserver | null = null;

    function scan_summaries() {
        observer?.disconnect();

        const anchors = document.querySelectorAll<HTMLElement>("[data-summary]");
        summary_items = Array.from(anchors).map(el => {
            const id = el.getAttribute("data-summary") ?? "";
            const label = el.getAttribute("data-summary-label") ?? id;
            if (!el.id) el.id = id;
            return { id, label };
        });

        if (summary_items.length === 0) return;
        active_id = summary_items[0].id;

        observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-summary");
                        if (id) active_id = id;
                    }
                }
            },
            { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
        );

        anchors.forEach(anchor => observer!.observe(anchor));
    }

    // Re-scan when the slug changes (new component page loaded)
    $effect(() => {
        // Track slug so this effect re-runs on route change
        const _slug = page.params.slug;
        // Wait for DOM to render the new component
        requestAnimationFrame(() => scan_summaries());
    });

    onMount(() => {
        return () => observer?.disconnect();
    });
</script>

<div class="page-layout">

    <aside class="page-aside">
        <div class="search-container">
            <SearchField
                bind:value={search}
                placeholder={$trans?.doc.filter}
            />
        </div>

        <Explorer palette="tone" aria_label="Component navigation">
            {#each by_category as cat}
                <ExplorerGroup 
                    label={cat.get_label($trans)} 
                    headline={true}
                >
                    {#each cat.entries as entry}
                        <ExplorerLink
                            href="/docs/{entry.slug}"
                            label={entry.get_label($trans)}
                            active={current_slug() === entry.slug}
                        />
                    {/each}
                </ExplorerGroup>
            {/each}
        </Explorer>
    </aside>

    <div class="content" bind:this={content_el}>
        {@render children?.()}
    </div>

    <aside class="doc-summary">
        {#if summary_items.length > 0}
            <ExplorerGroup 
                label={$trans?.doc.title ?? "On this page"}
                headline={false} 
                collapsible={false} 
            >
                <Explorer palette="tone" aria_label="On this page">
                    {#each summary_items as item}
                        <ExplorerLink
                            label={item.label}
                            onclick={() => scroll_to(item.id)}
                            naked
                        />
                    {/each}
                </Explorer>
            </ExplorerGroup>
        {/if}
    </aside>

</div>

<style>
    .page-layout {
        display: grid;
        grid-template-columns: 200px 1fr 200px;
        gap: 0;
        max-width: 1600px;
        margin: 0 auto;
    }

    .page-aside {
        position: sticky;
        top: var(--nav-height, 0px);
        align-self: start;
        height: calc(100dvh - var(--nav-height, 0px) - var(--header-offset, 0px));
        box-sizing: border-box;
        overflow-y: auto;
        padding: 1rem 0.75rem;
        scrollbar-width: thin;
        scrollbar-color: var(--spk-tone-hover) transparent;
        border-right: 2px solid var(--spk-tone-hover);
    }

    .search-container {
        margin: 0px 5px 10px 5px;
    }

    .content {
        padding: 10px 40px 40px;
        min-width: 0;
    }

    .doc-summary {
        position: sticky;
        top: var(--nav-height, 0px);
        align-self: start;
        height: calc(100dvh - var(--nav-height, 0px) - var(--header-offset, 0px));
        box-sizing: border-box;
        overflow-y: auto;
        padding: 1rem 0.75rem;
        scrollbar-width: thin;
        scrollbar-color: var(--spk-tone-hover) transparent;
        border-left: 2px solid var(--spk-tone-hover);
    }

    @media (max-width: 1024px) {
        .page-layout {
            grid-template-columns: 1fr;
        }

        .page-aside {
            display: none;
        }

        .doc-summary {
            display: none;
        }

        .content { padding: 10px 20px 40px; }
    }

    /* API tables — shared across all doc pages */
    :global(.api-table) {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0 2rem;
        font-size: 0.85rem;
    }

    :global(.api-table th) {
        text-align: left;
        padding: 0.6rem 0.75rem;
        border-bottom: 2px solid var(--spk-tone-hover);
        font-weight: 700;
        font-family: var(--spk-font-heading);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.5px;
        color: var(--spk-text-muted);
    }

    :global(.api-table td) {
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid var(--spk-tone-hover);
        vertical-align: top;
    }

    :global(.api-table code) {
        background: var(--tone-card);
        padding: 0.15em 0.4em;
        border-radius: 4px;
        font-size: 0.82em;
        white-space: nowrap;
    }

    :global(.api-table tr:last-child td) {
        border-bottom: none;
    }
</style>
