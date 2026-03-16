<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import ControlBar from "../design-system/components/Selector/ControlBar.svelte";
    import Selector   from "../design-system/components/Selector/Selector.svelte";

    interface Props {
        trans: Translation | null;
        selected_category: string;
    }

    let { trans, selected_category = $bindable("all") }: Props = $props();

    // Catégories ─────────────────────────────────────────────────────────

    const category_opts = $derived([
        { value: "structure", label: trans?.welcome.cat_structure },
        { value: "composants", label: trans?.welcome.cat_composants },
        { value: "presentation", label: trans?.welcome.cat_presentation },
        { value: "all", label: trans?.welcome.cat_all },
    ]);

    // Composants par catégorie ────────────────────────────────────────────

    const component_map = $derived<Record<string, { id: string; label: string | undefined }[]>>({
        all: [],
        presentation: [
            { id: "demo-typo", label: trans?.typo.title },
            { id: "demo-codeblock", label: trans?.codeblocks.title },
            { id: "demo-forms", label: trans?.form.title },
        ],
        structure: [
            { id: "demo-header", label: trans?.header_demo.title },
            { id: "demo-footer", label: trans?.footer_demo.title },
            { id: "demo-nav", label: trans?.nav.title },
            { id: "demo-sidebar", label: trans?.sidebar.title },
            { id: "demo-tilegrid", label: trans?.tile_grid.title },
            { id: "demo-selector", label: trans?.selector_demo.title },
        ],
        composants: [
            { id: "demo-callout", label: trans?.callout.title },
            { id: "demo-alert", label: trans?.alerts.title },
            { id: "demo-button", label: trans?.buttons.title },
            { id: "demo-badge", label: trans?.badges.title },
            { id: "demo-listitem", label: trans?.list_items.title },
            { id: "demo-card", label: trans?.cards.title },
        ],
    });

    const nav_items = $derived(component_map[selected_category] ?? []);
    const nav_opts  = $derived(nav_items.map(item => ({ value: item.id, label: item.label })));

    let nav_selected: string = $state("");
    $effect(() => { selected_category; nav_selected = ""; });

    // Navigation ─────────────────────────────────────────────────────────

    function scroll_to(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
</script>

<div class="welcome">
    <h1 class="welcome-title">{trans?.welcome.title}</h1>
    <p class="welcome-intro">{trans?.welcome.intro}</p>
</div>

<ControlBar palette="tone" rounded bordered={false}>
    {#snippet header()}
        <div class="welcome-control-header">
            {trans?.welcome.filter_header}
        </div>
    {/snippet}

    <Selector options={category_opts} bind:value={selected_category} />

    {#if nav_opts.length > 0}
        <div class="nav-row">
            <Selector options={nav_opts} bind:value={nav_selected} onchange={scroll_to} />
        </div>
    {/if}
</ControlBar>

<style>
    .welcome {
        padding: 2rem 0 1.5rem;
        border-bottom: 1px solid var(--highlight);
        margin-bottom: 0.5rem;
    }

    .welcome-title {
        font-size:   2rem;
        font-weight: 800;
        color: var(--text);
        margin: 0 0 0.5rem;
        font-family: var(--font-heading);
        line-height: 1.1;
    }

    .welcome-intro {
        font-size:  0.95rem;
        color:      var(--text-muted);
        margin:     0;
        line-height: 1.6;
        max-width:  60ch;
    }

    .welcome-control-header {
        font-family: var(--font-heading);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    /* ── Nav row ─────────────────────────────────────────────────────────── */

    .nav-row {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        padding-top: 0.75rem;
        border-top:1px solid var(--sel-btn-border, var(--highlight));
    }

</style>
