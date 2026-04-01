<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import ListItem from "../../design-system/components/ListItem/ListItem.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const items = $derived(placeholders.list_items);

    // ── Demo state ─────────────────────────────────────────────────────────

    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";
    type Bg = "bg" | "card" | "accent";

    let demo_size: Size = $state("md");
    let demo_rounded: boolean = $state(true);
    let demo_elevation: Elevation = $state("none");
    let demo_bg: Bg = $state("bg");

    const bool_opts = [
        { value: true, label: "true"  },
        { value: false, label: "false" },
    ] as const;

    // Click any item to make it active; click again to deselect
    let active_id: string | undefined = $state("nav-0");

    function toggle(id: string) {
        active_id = active_id === id ? undefined : id;
    }

    // ── Code examples ──────────────────────────────────────────────────────

    const code_opaque = `
<ListItem
    supporting_text={{ main: "TGV", extra: "Paris — Lyon" }}
    leading={icon_train}
    palette="tone"
    rounded
    active={active === "tgv"}
    onclick={() => active = "tgv"}
/>
<ListItem
    supporting_text={{ main: "Minitel", extra: "3615 COGIP" }}
    leading={icon_terminal}
    palette="highlight"
    rounded
    active={active === "minitel"}
    onclick={() => active = "minitel"}
/>`;

    const code_ghost = `
<ListItem
    supporting_text={{ main: "TGV", extra: "Paris — Lyon" }}
    leading={icon_train}
    palette="ghost"
    rounded
    active={active === "tgv"}
    onclick={() => active = "tgv"}
/>

<!-- ListItems in a Drawer automatically take the value ghost -->
<Drawer palette="accent">
    <ListItem supporting_text={{ main: "Dashboard" }} palette="ghost" />
    <ListItem supporting_text={{ main: "Settings" }} palette="ghost" />
</Drawer>`;

    const code_contextual = `<!-- Contextual palettes — action menus, status lists -->
<ListItem
    supporting_text={{ main: "Annuler la mission", extra: "Action irréversible" }}
    leading={icon_delete}
    palette="error"
    rounded
    onclick={handleDelete}
/>
<ListItem
    supporting_text={{ main: "Mettre en attente" }}
    leading={icon_archive}
    palette="warning"
    rounded
    onclick={handleHold}
/>
<ListItem
    supporting_text={{ main: "Mission accomplie", extra: "Ariane est en orbite" }}
    leading={icon_check}
    palette="success"
    rounded
/>
<ListItem
    supporting_text={{ main: "Consulter les archives" }}
    leading={icon_info}
    palette="info"
    rounded
/>`;

    const code_elevation = `<!-- elevation — même valeurs que Button / Card / Badge -->
<ListItem
    supporting_text={{ main: "Subtle shadow" }}
    palette="tone"
    rounded
    elevation="subtle"
/>
<ListItem
    supporting_text={{ main: "Hard shadow" }}
    palette="tone"
    rounded
    elevation="hard"
/>`;

    const code_sizes = `<ListItem supporting_text={{ main: "Small" }}  size="sm" palette="tone" rounded />
<ListItem supporting_text={{ main: "Medium" }} palette="tone" rounded />
<ListItem supporting_text={{ main: "Large" }}  size="lg" palette="tone" rounded />`;

    const code_static = `<!-- Sans onclick — pas de curseur, pas de hover, pas d'état active -->
<ListItem
    supporting_text={{ main: "TGV", extra: "Paris — Lyon" }}
    leading={icon_train}
    palette="tone"
    rounded
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Icon snippets ──────────────────────────────────────────────────────── -->

{#snippet icon_train()}
    <span class="material-symbols-outlined">train</span>
{/snippet}
{#snippet icon_plane()}
    <span class="material-symbols-outlined">airplanemode_active</span>
{/snippet}
{#snippet icon_rocket()}
    <span class="material-symbols-outlined">rocket</span>
{/snippet}
{#snippet icon_terminal()}
    <span class="material-symbols-outlined">terminal</span>
{/snippet}
{#snippet icon_delete()}
    <span class="material-symbols-outlined">delete</span>
{/snippet}
{#snippet icon_archive()}
    <span class="material-symbols-outlined">archive</span>
{/snippet}
{#snippet icon_check()}
    <span class="material-symbols-outlined">check_circle</span>
{/snippet}
{#snippet icon_info()}
    <span class="material-symbols-outlined">info</span>
{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.list_items?.title ?? "List Items"}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone" rounded>
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
    <Selector
        label="Background"
        options={["bg", "card", "accent"]}
        bind:value={demo_bg}
    />
</ControlBar>

<!-- Live preview -->

<div
    class="list-preview"
    style="background: var(--{demo_bg});"
>
    <!-- Navigation palettes -->
    <div class="list-group">
        <span class="group-label">Navigation</span>
        {#each items.nav as item, i}
            <ListItem
                supporting_text={{ main: item.main, extra: item.extra }}
                leading={i === 0 ? icon_train : i === 1 ? icon_plane : icon_rocket}
                palette={i === 0 ? "tone" : i === 1 ? "accent" : "ghost"}
                size={demo_size}
                rounded={demo_rounded}
                elevation={demo_elevation}
                active={active_id === `nav-${i}`}
                onclick={() => toggle(`nav-${i}`)}
            />
        {/each}
    </div>

    <!-- Contextual palettes -->
    <div class="list-group">
        <span class="group-label">Contextual</span>
        <ListItem
            supporting_text={{ main: items.delete_main, extra: items.delete_extra }}
            leading={icon_delete}
            palette="error"
            size={demo_size}
            rounded={demo_rounded}
            elevation={demo_elevation}
            active={active_id === "delete"}
            onclick={() => toggle("delete")}
        />
        <ListItem
            supporting_text={{ main: items.warning_main, extra: items.warning_extra }}
            leading={icon_archive}
            palette="warning"
            size={demo_size}
            rounded={demo_rounded}
            elevation={demo_elevation}
            active={active_id === "warning"}
            onclick={() => toggle("warning")}
        />
        <ListItem
            supporting_text={{ main: items.success_main, extra: items.success_extra }}
            leading={icon_check}
            palette="success"
            size={demo_size}
            rounded={demo_rounded}
            elevation={demo_elevation}
            active={active_id === "success"}
            onclick={() => toggle("success")}
        />
        <ListItem
            supporting_text={{ main: items.info_main, extra: items.info_extra }}
            leading={icon_info}
            palette="info"
            size={demo_size}
            rounded={demo_rounded}
            elevation={demo_elevation}
            active={active_id === "info"}
            onclick={() => toggle("info")}
        />
    </div>

    <!-- Static — no onclick -->
    <div class="list-group">
        <span class="group-label">Static (no onclick)</span>
        {#each items.nav as item, i}
            <ListItem
                supporting_text={{ main: item.main, extra: item.extra }}
                leading={i === 0 ? icon_train : i === 1 ? icon_plane : icon_rocket}
                palette={i === 0 ? "tone" : i === 1 ? "accent" : "ghost"}
                size={demo_size}
                rounded={demo_rounded}
                elevation={demo_elevation}
            />
        {/each}
    </div>
</div>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "opaque", code: code_opaque, language: "Svelte" },
        { label: "ghost", code: code_ghost, language: "Svelte" },
        { label: "contextual", code: code_contextual, language: "Svelte" },
        { label: "elevation", code: code_elevation, language: "Svelte" },
        { label: "sizes", code: code_sizes, language: "Svelte" },
        { label: "static", code: code_static, language: "Svelte" },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
<Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "palette", type: '"tone" | "accent" | "ghost" | "neutral" | "error" | "warning" | "success" | "info"', default: '"tone"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "active", type: "boolean", default: "false" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "supporting_text", type: "SupportingText", default: "\u2014" },
        { prop: "onclick", type: "() => void", default: "\u2014" },
    ]}
/>
</div>

<style>
    .list-preview {
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        align-items: flex-start;
        transition: background 0.2s ease;
    }

    .list-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: 1;
        min-width: 200px;
    }

    .group-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        font-weight: 700;
        color: var(--text-muted);
        margin-bottom: 0.25rem;
    }
</style>
