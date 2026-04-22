<script lang="ts">
    import { page } from "$app/state";
    import { docs, categories } from './docs/registry';
    import { 
        Drawer, 
        SearchField, 
        Explorer, 
        ExplorerGroup, 
        ExplorerLink 
    } from '@abhc/spektral-ui';

    import {
        trans,
        drawer_open,
        drawer_menu,
        drawer_docs_open,
    } from './store';

    let search: string = $state("");
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

    // -- Doc Summary — IntersectionObserver on data-summary elements --

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
</script>

{#snippet drawer_header()}
    <div class="sb-head">
        <button
            class="sb-head-close"
            aria-label="{$trans?.aria.close}"
            onclick={() => { $drawer_docs_open = false; $drawer_menu = null; }}
        >
            <span class="material-symbols-outlined">close</span>
        </button>
        <span class="sb-head-title">
            {$trans?.control.docs}
        </span>
    </div>
{/snippet}

<Drawer
    direction="left"
    palette="tone"
    width="300px"
    open={$drawer_docs_open}
    leading={drawer_header}
    onclose={() => { $drawer_docs_open = false;}}
>
    <div class="docs-menu">
        <div class="search-container">
            <SearchField
                bind:value={search}
                placeholder={$trans?.doc.filter}
            />
        </div>

        <Explorer palette="tone" aria_label="Component navigation">
            {#each by_category as cat}
                <ExplorerGroup 
                    headline={true}
                    label={cat.get_label($trans)} 
                    open={cat.get_label($trans) === $trans?.welcome.cat_layout ? true : false}
                >
                    {#each cat.entries as entry, i}
                        <ExplorerLink
                            href="/docs/{entry.slug}"
                            label={entry.get_label($trans)}
                            active={current_slug() === entry.slug}
                        />
                    {/each}
                </ExplorerGroup>
            {/each}
        </Explorer>
    </div>
</Drawer>

<style>
    :global(.sb-head) {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        font-family: var(--font-heading);
    }

    :global(.sb-head-title) {
        font-weight: 700;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        flex: 1;
    }

    :global(.sb-head-back),
    :global(.sb-head-close) {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
        border-radius: 6px;
        padding: 4px;
        transition: background 0.15s;
        flex-shrink: 0;
    }

    :global(.sb-head-back:hover),
    :global(.sb-head-close:hover) {
        background: var(--drawer-item-hover-bg, rgba(128, 128, 128, 0.15));
    }

    :global(.drawer-group) {
        display: flex;
        gap: 6px;
    }

    :global(.drawer-group--column) {
        flex-direction: column;
    }

    :global(.drawer-group--column) :global(.btn-ghost) {
        width: 100%;
        justify-content: flex-start;
        gap: 0.6rem;
        padding: 0.5rem 0.75rem;
    }

    :global(.drawer-group--row) {
        flex-direction: row;
        flex-wrap: wrap;
    }

    :global(.drawer-group--row) :global(.btn-ghost) {
        flex: 1;
        justify-content: center;
        gap: 0.35rem;
        padding: 0.5rem 0.4rem;
    }

    :global(.drawer-group) :global(.nav-icon) {
        line-height: 1;
    }

    :global(.drawer-group) :global(.nav-label) {
        font-family: var(--font-heading);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        line-height: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    :global(.drawer-sep) {
        border: none;
        border-top: 2px solid var(--drawer-separator, rgba(128, 128, 128, 0.2));
        margin: 0.15rem 0;
    }

    :global(.palette-swatches) {
        display: inline-flex;
        gap: 3px;
        align-items: center;
    }

    :global(.palette-swatch) {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 20%;
        flex-shrink: 0;
        border: 2px solid var(--text-muted);
    }

    .docs-menu {
        display: flex;
        flex-direction: column;
    }

    .search-container {
        margin: 0px 5px 10px 5px;
    }


</style>
