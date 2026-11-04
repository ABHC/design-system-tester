<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import {
        Headline,
        ListItem,
        Callout,
        CodeBlock,
        Selector,
        ControlBar,
        DataTable
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const items = $derived(placeholders.list_items);

    // ── Demo state ─────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined" | "ghost" | "ambient";
    type Palette = "tone" | "accent" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";
    type Bg = "tone-bg" | "tone" | "accent";

    let demo_variant: Variant = $state("flat");
    let demo_palette: Palette = $state("tone");
    let demo_size: Size = $state("md");
    let demo_rounded: boolean = $state(false);
    let demo_elevation: Elevation = $state("none");
    let demo_bg: Bg = $state("tone-bg");

    const bool_opts = [
        { value: true, label: "true"  },
        { value: false, label: "false" },
    ] as const;

    // Click the interactive item to toggle its active state
    let demo_active: boolean = $state(false);

    let bg_state: string = $derived.by(() => {
		if (demo_variant != "ambient") {
            return "tone-bg";
        }
        return demo_bg;
	});

    // ── Code examples ──────────────────────────────────────────────────────

    const code_opaque = `
<ListItem
    label="TGV"
    leading={icon_train}
    trailing={icon_transit_ticket}
    palette="tone"
    rounded
    active={active === "tgv"}
    onclick={() => active = "tgv"}
>
    Paris - Lyon
</ListItem>

<ListItem
    label="Concorde"
    leading={icon_flight}
    variant="outlined"
    palette="accent"
    size = "lg"
    elevation = "hard"
    active={active === "concorde"}
    onclick={() => active = "concorde"}
>
    Paris - New York
</ListItem>`;

    const code_ghost = `<!-- ghost — transparent fill, still coloured by palette (like Button's ghost) -->
<ListItem label="TGV" leading={icon_train} variant="ghost" palette="accent" rounded>
    Paris — Lyon
</ListItem>`;

    const code_ambient = `
<!-- ambient adapts to currentColor and ignores palette, so it blends into any surrounding context -->
<Drawer palette="accent">
    <ListItem label="Dashboard" variant="ambient" />
    <ListItem label="Settings" variant="ambient" />
</Drawer>

<ListItem
    label="TGV"
    leading={icon_train}
    variant="ambient"
    rounded
    active={active === "tgv"}
    onclick={() => active = "tgv"}
>
    Paris — Lyon
</ListItem>`;

    const code_contextual = `<!-- Contextual palettes — action menus, status lists -->
<ListItem label="Annuler la mission" leading={icon_delete} palette="error" rounded onclick={handleDelete}>
    Action irréversible
</ListItem>
<ListItem label="Mettre en attente" leading={icon_archive} palette="warning" rounded onclick={handleHold} />
<ListItem label="Mission accomplie" leading={icon_check} palette="success" rounded>
    Ariane est en orbite
</ListItem>
<ListItem label="Consulter les archives" leading={icon_info} palette="info" rounded />`;

    const code_elevation = `<!-- elevation — même valeurs que Button / Card / Badge -->
<ListItem label="Subtle shadow" palette="tone" rounded elevation="subtle" />
<ListItem label="Hard shadow" palette="tone" rounded elevation="hard" />`;

    const code_sizes = `<ListItem label="Small"  size="sm" palette="tone" rounded />
<ListItem label="Medium" palette="tone" rounded />
<ListItem label="Large"  size="lg" palette="tone" rounded />`;

    const code_static = `<!-- No onclick, cursor, hover, or active state -->
<ListItem 
    label="TGV" 
    variant="outlined"
    leading={icon_train} 
    palette="warning" 
    rounded
>
    Paris — Lyon
</ListItem>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Icon snippets ──────────────────────────────────────────────────────── -->

{#snippet icon_train()}
    <span class="material-symbols-outlined">train</span>
{/snippet}

{#snippet icon_plane()}
    <span class="material-symbols-outlined">flight</span>
{/snippet}

{#snippet icon_ticket()}
    <span class="material-symbols-outlined">transit_ticket</span>
{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>{trans?.list_item_demo?.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector
        label="Variant"
        options={["flat", "outlined", "ghost", "ambient"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "neutral", "error", "warning", "success", "info"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    {#if demo_variant === "ambient" }
        <Selector
            label="Background"
            options={["tone-bg", "tone", "accent"]}
            bind:value={demo_bg}
        />
    {/if}
</ControlBar>

<!-- Live preview -->

<div class="list-preview list-preview-bg-{bg_state}">
    <div class="list-row">
        <span class="row-label">Interactive</span>
        <ListItem
            label={items.nav[0].label}
            leading={icon_train}
            trailing={icon_ticket}
            variant={demo_variant}
            palette={demo_palette}
            size={demo_size}
            rounded={demo_rounded}
            elevation={demo_elevation}
            active={demo_active}
            onclick={() => demo_active = !demo_active}
        >{items.nav[0].extra}</ListItem>
    </div>

    <div class="list-row">
        <span class="row-label">Static (no onclick)</span>
        <ListItem
            label={items.nav[1].label}
            leading={icon_plane}
            variant={demo_variant}
            palette={demo_palette}
            size={demo_size}
            rounded={demo_rounded}
            elevation={demo_elevation}
        >{items.nav[1].extra}</ListItem>
    </div>
</div>

<Callout palette="accent" align="start">
    {#snippet leading()}
        <span class="material-symbols-outlined">colorize</span>
    {/snippet}
    {#snippet children()}
        <p>{@html trans?.list_item_demo?.ambient_note}</p>
    {/snippet}
</Callout>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "opaque", code: code_opaque, language: "Svelte" },
        { label: "ghost", code: code_ghost, language: "Svelte" },
        { label: "ambient", code: code_ambient, language: "Svelte" },
        { label: "static", code: code_static, language: "Svelte" },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api}>
    <Headline size="sm" uppercase muted>{trans?.doc.api}</Headline>
</div>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "variant", type: '"flat" | "outlined" | "ghost" | "ambient"', default: '"flat"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "palette", type: '"tone" | "accent" | "neutral" | "error" | "warning" | "success" | "info"', default: '"tone"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "active", type: "boolean", default: "false" },
        { prop: "label", type: "string", default: "\u2014" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "onclick", type: "() => void", default: "\u2014" },
    ]}
/>

<style>
    .list-preview {
        border: 2px solid var(--spk-tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
        transition: background 0.2s ease, color 0.2s ease;
    }

    /* Each swatch pairs background + color, matching what a real
       Drawer/Button palette would inject — ambient relies on currentColor */
    .list-preview-bg-tone-bg {
        background: var(--spk-tone-bg);
        color: var(--spk-text);
    }

    .list-preview-bg-tone {
        background: var(--spk-tone);
        color: var(--spk-text);
    }

    .list-preview-bg-accent {
        background: var(--spk-accent);
        color: var(--spk-text-accent);
    }

    .list-row {
        display: flex;
        flex: 1;
        min-width: 220px;
        flex-direction: column;
        gap: 0.5rem;
    }

    .row-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        font-weight: 700;
    }
</style>
