<script lang="ts">
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import TileGrid from "../../design-system/components/TileGrid/TileGrid.svelte";
    import Callout from "../../design-system/components/Callout/Callout.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";

    import type { Tile, Columns, HeroSpan, Elevation } from "../../design-system/components/TileGrid/tilegrid.config";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";

    // -- Props 

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // -- Demo state

    type Mode = "background" | "none" | "decorative";

    let demo_mode: Mode = $state("background");
    let demo_position: string = $state("center");
    let demo_columns: Columns = $state(3);
    let demo_hero_span: HeroSpan = $state("half");
    let demo_hero_badge: boolean = $state(true);
    let demo_rounded: boolean = $state(true);
    let demo_elevation: Elevation = $state("hard");

    const bg_positions = ["center", "top", "bottom"] as const;
    const deco_positions = ["top-right", "top-left", "top-center", "right", "left"] as const;
    const bool_opts = [{ value: true, label: "on" }, { value: false, label: "off" }] as const;

    function set_mode(m: Mode) {
        demo_mode = m;
        demo_position = m === "decorative" ? "top-right" : "center";
    }

    // Demo tiles — no id (non-clickable), built from placeholders.grid

    const tile_media = [
        "/assets/tgv.jpeg",
        "/assets/concorde.jpeg",
        "/assets/minitel.jpeg",
        "/assets/ariane3.jpeg",
        "/assets/renault.jpeg",
    ];

    const tiles = $derived([
        {
            ...placeholders.grid.tgv,
            display: true,
            hero: true,
            hero_text: { en: placeholders.grid.hero_text },
            hero_icon: "star",
            media: [{ src: tile_media[0], type: "image" }],
            abstract: { en: placeholders.grid.tgv.abstract },
        },
        {
            ...placeholders.grid.concord,
            display: true,
            hero: false,
            media: [{ src: tile_media[1], type: "image" }],
            abstract: { en: placeholders.grid.concord.abstract },
        },
        {
            ...placeholders.grid.minitel,
            display: true,
            hero: false,
            media: [{ src: tile_media[2], type: "image" }],
            abstract: { en: placeholders.grid.minitel.abstract },
        },
        {
            ...placeholders.grid.ariane,
            display: true,
            hero: false,
            media: [{ src: tile_media[3], type: "image" }],
            abstract: { en: placeholders.grid.ariane.abstract },
        },
        {
            ...placeholders.grid.renault,
            display: true,
            hero: false,
            media: [{ src: tile_media[4], type: "image" }],
            abstract: { en: placeholders.grid.renault.abstract },
        },
    ]);

    // Code examples — with id 

    const code_background = `<TileGrid
    tiles={[
        {
            id: "atlas",
            name: "Atlas",
            origin: "Personal",
            years: "2023–24",
            display: true,
            hero: true,
            hero_text: { fr: "En vedette", en: "Featured" },
            hero_icon: "star",
            media:     [{ src: "/images/atlas.jpg", type: "image" }],
            abstract:  { en: "Hardware design system for embedded devices" },
        },
        {
            id: "meridian",
            name: "Meridian",
            origin: "Client",
            years: "2024",
            display: true,
            hero: false,
            media: [{ src: "/images/meridian.jpg", type: "image" }],
            abstract: { en: "Industrial supervision platform" },
        },
        {
            id: "capsule",
            name: "Capsule",
            origin: "Open Source",
            display: true,
            hero: false,
            media: [{ src: "/images/capsule.jpg", type: "image" }],
            abstract: { en: "Modular enclosure for prototyping boards" },
        },
    ]}
    locale="en"
    image_mode="background"
    image_position="center"
    columns={3}
    hero_span="half"
    show_hero_badge={true}
    href_base="/projects"
/>`;

    const code_flat = `<TileGrid
    tiles={[
        {
            id: "core-api",
            name: "Core API",
            origin: "Personal",
            years: "2024",
            display: true,
            hero: true,
            hero_text: { en: "Featured" },
            media: [],
            abstract: { en: "Modular REST API built on FastAPI and Docker" },
        },
        {
            id: "dashboard",
            name: "Dashboard",
            origin: "Client",
            display: true,
            hero: false,
            media: [],
            abstract: { en: "Admin interface for an IoT sensor fleet" },
        },
        {
            id: "cli-toolkit",
            name: "CLI Toolkit",
            origin: "Open Source",
            display: true,
            hero: false,
            media: [],
            abstract: { en: "CLI toolkit for Linux task automation" },
        },
    ]}
    locale="en"
    image_mode="none"
    columns={3}
    hero_span="half"
    show_hero_badge={true}
    href_base="/projects"
/>`;

    const code_decorative = `<TileGrid
    tiles={[
        {
            id: "capsule",
            name: "Capsule",
            origin: "Open Source",
            display: true,
            media:   [{ src: "/images/capsule.png", type: "image" }],
            abstract: { en: "Modular enclosure for prototyping boards" },
        },
        {
            id: "stratum",
            name: "Stratum",
            origin:  "Personal",
            display: true,
            media: [{ src: "/images/stratum.png", type: "image" }],
            abstract: { en: "Configuration interface for sensor networks" },
        },
        {
            id: "lichen",
            name: "Lichen",
            origin: "Client",
            display: true,
            media:   [{ src: "/images/lichen.png", type: "image" }],
            abstract: { en: "Low-power environmental monitoring system" },
        },
    ]}
    locale="en"
    image_mode="decorative"
    image_position="top-right"
    image_size="55%"
    columns={3}
    href_base="/projects"
/>`;

    const code_hero_full = `<!-- hero_span="full" — the hero tile spans the full grid width -->
<TileGrid
    tiles={[
        {
            id: "atlas",
            name: "Atlas",
            origin: "Personal",
            years: "2023–24",
            display: true,
            hero: true,
            hero_text: { fr: "En vedette", en: "Featured" },
            hero_icon: "star",
            media:     [{ src: "/images/atlas.jpg", type: "image" }],
            abstract:  { en: "Hardware design system for embedded devices" },
        },
        {
            id: "meridian",
            name: "Meridian",
            display: true,
            hero: false,
            media: [{ src: "/images/meridian.jpg", type: "image" }],
            abstract: { en: "Industrial supervision platform" },
        },
        {
            id: "capsule",
            name: "Capsule",
            display: true,
            hero: false,
            media: [{ src: "/images/capsule.jpg", type: "image" }],
            abstract: { en: "Modular enclosure for prototyping boards" },
        },
    ]}
    locale="en"
    image_mode="background"
    image_position="center"
    columns={3}
    hero_span="full"
    show_hero_badge={true}
    href_base="/projects"
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Headline -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.tile_grid?.title ?? "Tile Grid"}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone" rounded>
    <Selector
        label={trans?.tile_grid?.ctrl_mode}
        options={["background", "none", "decorative"]}
        bind:value={demo_mode}
        onchange={set_mode}
    />
    {#if demo_mode === "background"}
        <Selector
            label={trans?.tile_grid?.ctrl_position}
            options={bg_positions}
            bind:value={demo_position}
        />
    {/if}
    {#if demo_mode === "decorative"}
        <Selector
            label={trans?.tile_grid?.ctrl_position}
            options={deco_positions}
            bind:value={demo_position}
        />
    {/if}
    <Selector
        label={trans?.tile_grid?.ctrl_columns}
        options={[2, 3, 4]}
        bind:value={demo_columns}
    />
    <Selector
        label={trans?.tile_grid?.ctrl_hero_span}
        options={["half", "full"]}
        bind:value={demo_hero_span}
    />
    <Selector
        label={trans?.tile_grid?.ctrl_hero_badge}
        options={bool_opts}
        bind:value={demo_hero_badge}
    />
    <Selector
        label={trans?.tile_grid?.ctrl_rounded}
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
</ControlBar>

<!-- Live preview -->

<div class="tg-preview">
    <TileGrid
        {tiles}
        locale="en"
        image_mode={demo_mode}
        image_position={demo_position}
        columns={demo_columns}
        hero_span={demo_hero_span}
        show_hero_badge={demo_hero_badge}
        show_hero_border={true}
        rounded={demo_rounded}
        elevation={demo_elevation}
        excerpt_length={52}
    />
</div>

<!-- ID info note -->

<Callout variant="info" align="center" rounded>
    {#snippet leading()}
        <span class="material-symbols-outlined">
            photo_library
        </span>
    {/snippet}
    {#snippet children()}
        <strong>
            {placeholders?.grid.attribution.header}
        </strong>
        <p>
            <a 
                class="attr" 
                target="_blank"
                href={placeholders?.grid.attribution.tgv_link}
            >
                {placeholders.grid.attribution.tgv}
            </a>
        </p>
        <p>
            <a 
                class="attr" 
                target="_blank"
                href={placeholders?.grid.attribution.concord_link}
            >
                {placeholders.grid.attribution.concord}
            </a>
        </p>
        <p>
            <a 
                class="attr" 
                href={placeholders?.grid.attribution.minitel_link}
                target="_blank"
            >
                {placeholders.grid.attribution.minitel}
            </a>
        </p>
        <p>
            <a 
                class="attr" 
                target="_blank"
                href={placeholders?.grid.attribution.ariane_link}
            >
                {placeholders.grid.attribution.ariane}
            </a>
        </p>
        <p>
            {placeholders.grid.attribution.renault}
        </p>
    {/snippet}
</Callout>

<div class="callout-gap"></div>

<!-- ID info note -->

<Callout variant="accent" align="start" rounded>
    {#snippet leading()}
        <span 
            class="material-symbols-outlined" 
            aria-hidden="true"
        >
            info
        </span>
    {/snippet}
    {#snippet children()}
        <div class="tg-id-note-content">
            <strong class="tg-id-note-title">
                {trans?.tile_grid?.id_note_title ?? "Role of the identifier (id)"}
            </strong>
            <p class="tg-id-note-body">
                {trans?.tile_grid?.id_note}
            </p>
        </div>
    {/snippet}
</Callout>

<!-- Code examples — split layout -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    description={trans?.tile_grid?.code_desc}
    tabs={[
        { 
            label: trans?.tile_grid?.tab_background ?? "Image bg",   
            code: code_background, 
            language: "Svelte" 
        },
        { 
            label: trans?.tile_grid?.tab_flat ?? "Flat",
            code: code_flat,       
            language: "Svelte" 
        },
        {   
            label: trans?.tile_grid?.tab_decorative  ?? "Decorative", 
            code: code_decorative, 
            language: "Svelte" 
        },
        { 
            label: trans?.tile_grid?.tab_hero_full   ?? "Full hero",
            code: code_hero_full,  
            language: "Svelte" 
        },
    ]}
/>

<div data-summary="api" data-summary-label={trans?.doc.api}>
    <Headline size="sm" uppercase muted>{trans?.doc.api}</Headline>
</div>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "tiles", type: "readonly Tile[]", default: "\u2014" },
        { prop: "locale", type: "string", default: '"en"' },
        { prop: "image_mode", type: "ImageMode", default: '"background"' },
        { prop: "image_position", type: "ImagePosition", default: '"center"' },
        { prop: "image_size", type: "string", default: "undefined" },
        { prop: "columns", type: "Columns", default: "3" },
        { prop: "hero_span", type: "HeroSpan", default: '"half"' },
        { prop: "gap", type: "string", default: '"1.5rem"' },
        { prop: "show_hero_badge", type: "boolean", default: "true" },
        { prop: "show_hero_border", type: "boolean", default: "true" },
        { prop: "excerpt_length", type: "number", default: "52" },
        { prop: "href_base", type: "string", default: '"/projects"' },
        { prop: "rounded", type: "boolean", default: "true" },
        { prop: "elevation", type: "Elevation", default: '"hard"' },
    ]}
/>

<style>

    /* Preview */

    .tg-preview {
        background: var(--tone-bg);
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
        overflow: hidden;
    }

    /* ID note */

    .tg-id-note-content {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .tg-id-note-title {
        font-size: 0.82rem;
        font-weight: 700;
        color: var(--accent);
    }

    .tg-id-note-body {
        margin: 0;
        font-size: 0.85rem;
        color: var(--text);
        line-height: 1.55;
        opacity: 0.85;
    }

    /* Attributions */

    .attr {
        color: var(--text);
    }

    .callout-gap {
        height: 1rem;
    }
</style>
