<script lang="ts">
    import type { PatternPreset } from "@abhc/spektral-ui";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { Tile, TileMedia, Columns, HeroSpan, Elevation } from '@abhc/spektral-ui';
    import { 
        Headline, 
        CodeBlock, 
        DataTable, 
        TileGrid, 
        Callout, 
        Selector, 
        ControlBar, 
        Slider 
    } from "@abhc/spektral-ui";

    // -- Props 

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // -- Demo state

    type Mode = "image" | "flat" | "mock-up";
    type Effect = "none" | "glow" | "blur" | "fade";
    type Mask = "none" | "ellipse" | "fade";
    type MaskDirection = "top" | "bottom" | "left" | "right";

    let demo_mode: Mode = $state("image");
    let demo_position: string = $state("center");
    let demo_columns: Columns = $state(3);
    let demo_hero_span: HeroSpan = $state("half");
    let demo_hero_badge: boolean = $state(true);
    let demo_rounded: boolean = $state(false);
    let demo_elevation: Elevation = $state("none");
    let demo_raised: boolean = $state(false);
    let demo_pattern: PatternPreset = $state("none");
    let demo_pattern_color: string = $state("white");
    let demo_pattern_size: string = $state("auto");
    let demo_pattern_opacity: number = $state(0.4);
    let demo_pattern_effect: Effect = $state("none");
    let demo_pattern_effect_opacity: number = $state(1);
    let demo_pattern_mask: Mask = $state("none");
    let demo_pattern_mask_direction: MaskDirection = $state("bottom");
    let demo_pattern_mask_size: number = $state(70);

    const bg_positions = ["center", "top", "bottom"] as const;
    const deco_positions = ["top-right", "top-left", "top-center", "right", "left"] as const;
    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;
    const pattern_colors = ["white", "black", "accent"];
    const color_opts = [
        { value: "white", label: "white" },
        { value: "black", label: "black" },
        { value: "#aea03f", label: "gold" },
        { value: "#c0392b", label: "red" },
        { value: "#2c7a7b", label: "teal" },
    ] as const;
    const pattern_presets: PatternPreset[] = [
        "none", 
        "grid",
        "sunburst",
        "scallops",
        "waves",   
        "sunrise", 
        "atoms", 
        "lozenge",  
        "diamonds", 
        "shippo", 
        "kumi_kikko"
    ];

    function set_mode(m: Mode) {
        demo_mode = m;
        demo_position = m === "mock-up" ? "top-right" : "center";
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
    image_mode="image"
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
    image_mode="flat"
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
    image_mode="mock-up"
    image_position="top-right"
    image_size="55%"
    columns={3}
    href_base="/projects"
/>`;

    const code_pattern = `<!-- pattern on flat tiles — works with image_mode="flat" or "mock-up" -->
<TileGrid
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
    image_mode="flat"
    columns={3}
    hero_span="half"
    pattern="scallops"
    pattern_color="white"
    pattern_opacity={0.4}
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
    image_mode="image"
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
    <Headline size="md" uppercase>{trans?.tile_grid_demo?.title ?? "Tile Grid"}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector
        label={trans?.tile_grid_demo?.ctrl_mode}
        options={["image", "flat", "mock-up"]}
        bind:value={demo_mode}
        onchange={set_mode}
    />
    {#if demo_mode === "image"}
        <Selector
            label={trans?.tile_grid_demo?.ctrl_position}
            options={bg_positions}
            bind:value={demo_position}
        />
    {/if}
    {#if demo_mode === "mock-up"}
        <Selector
            label={trans?.tile_grid_demo?.ctrl_position}
            options={deco_positions}
            bind:value={demo_position}
        />
    {/if}
    <Selector
        label={trans?.tile_grid_demo?.ctrl_columns}
        options={[2, 3, 4]}
        bind:value={demo_columns}
    />
    <Selector
        label={trans?.tile_grid_demo?.ctrl_hero_span}
        options={["half", "full"]}
        bind:value={demo_hero_span}
    />
    <Selector
        label={trans?.tile_grid_demo?.ctrl_hero_badge}
        options={bool_opts}
        bind:value={demo_hero_badge}
    />
    <Selector
        label={trans?.tile_grid_demo?.ctrl_rounded}
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Elevation Raised"
        options={bool_opts}
        bind:value={demo_raised}
    />
    {#if demo_mode !== "image"}
        <Selector
            label="Pattern"
            options={pattern_presets}
            bind:value={demo_pattern}
        />
        {#if demo_pattern !== "none"}
            <Selector
                label="Pattern color"
                options={color_opts}
                bind:value={demo_pattern_color}
            />
            <Selector
                label="Pattern size"
                options={["auto", "20px", "40px", "60px", "80px", "120px"]}
                bind:value={demo_pattern_size}
            />
            <div class="slider-control">
                <span class="slider-label">Pattern opacity</span>
                <Slider
                    palette="accent"
                    size="sm"
                    rounded
                    min={0}
                    max={1}
                    step={0.05}
                    bind:value={demo_pattern_opacity}
                    aria_label="Pattern opacity"
                />
            </div>
            <Selector
                label="Mask"
                options={["none", "ellipse", "fade"]}
                bind:value={demo_pattern_mask}
            />
            <Selector
                label="Mask dir"
                options={["top", "bottom", "left", "right"]}
                bind:value={demo_pattern_mask_direction}
            />
            <div class="slider-control">
                <span class="slider-label">Mask size</span>
                <Slider
                    palette="accent"
                    size="sm"
                    rounded
                    min={0}
                    max={100}
                    step={5}
                    bind:value={demo_pattern_mask_size}
                    aria_label="Mask size"
                />
            </div>
            
            <Selector
                label="Effect"
                options={["none", "glow", "blur", "fade"]}
                bind:value={demo_pattern_effect}
            />
            <div class="slider-control">
                <span class="slider-label">Effect opacity</span>
                <Slider
                    palette="accent"
                    size="sm"
                    rounded
                    min={0}
                    max={1}
                    step={0.05}
                    bind:value={demo_pattern_effect_opacity}
                    aria_label="Effect opacity"
                />
            </div>
        {/if}
    {/if}
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
        raised={demo_raised}
        excerpt_length={52}
        pattern={demo_pattern}
        pattern_color={demo_pattern_color}
        pattern_size={demo_pattern_size}
        pattern_opacity={demo_pattern_opacity}
        pattern_effect={demo_pattern_effect}
        pattern_effect_opacity={demo_pattern_effect_opacity}
        pattern_mask={demo_pattern_mask}
        pattern_mask_direction={demo_pattern_mask_direction}
        pattern_mask_size={demo_pattern_mask_size}
    />
</div>

<!-- ID info note -->

<Callout variant="info" align="center">
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

<Callout variant="accent" align="start">
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
                {trans?.tile_grid_demo?.id_note_title ?? "Role of the identifier (id)"}
            </strong>
            <p class="tg-id-note-body">
                {trans?.tile_grid_demo?.id_note}
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
    description={trans?.tile_grid_demo?.code_desc}
    tabs={[
        { 
            label: trans?.tile_grid_demo?.tab_image ?? "Image",   
            code: code_background, 
            language: "Svelte" 
        },
        { 
            label: trans?.tile_grid_demo?.tab_flat ?? "Flat",
            code: code_flat,       
            language: "Svelte" 
        },
        {
            label: trans?.tile_grid_demo?.tab_mockup ?? "Mock-up",
            code: code_decorative,
            language: "Svelte"
        },
        {
            label: "Pattern",
            code: code_pattern,
            language: "Svelte",
        },
        {
            label: trans?.tile_grid_demo?.tab_hero_full ?? "Full hero",
            code: code_hero_full,
            language: "Svelte"
        },
    ]}
/>

<div data-summary="api" data-summary-label={trans?.doc.api}>
    <Headline size="sm" uppercase muted>{trans?.doc.api}</Headline>
</div>

<div style="margin-bottom: 1rem;">
    <Callout variant="info">
        {#snippet leading()}
            <span class="material-symbols-outlined">package_2</span>
        {/snippet}
        {#snippet children()}
            {trans?.doc.types_notice}<br />
            <code>import type &lbrace; Tile, TileMedia, Columns, HeroSpan &rbrace; from '@abhc/spektral-ui';</code>
        {/snippet}
    </Callout>
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
        { prop: "image_mode", type: '"image" | "mock-up" | "flat"', default: '"image"' },
        { prop: "image_position", type: '"center" | "top" | "bottom" | "top-right" | "top-left" | "top-center" | "right" | "left" | string', default: '"center"' },
        { prop: "image_size", type: "string", default: "undefined" },
        { prop: "columns", type: "2 | 3 | 4", default: "3" },
        { prop: "hero_span", type: '"half" | "full"', default: '"half"' },
        { prop: "gap", type: "string", default: '"1.5rem"' },
        { prop: "show_hero_badge", type: "boolean", default: "true" },
        { prop: "show_hero_border", type: "boolean", default: "true" },
        { prop: "excerpt_length", type: "number", default: "52" },
        { prop: "href_base", type: "string", default: '"/projects"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "raised", type: "boolean", default: "false" },
        { prop: "pattern", type: '"none" | "scallops" | "grid" | "sunburst" | "sunrise" | "atoms" | "lozenge" | "waves" | "diamonds" | "shippo" | "kumi_kikko" | string', default: '"none"' },
        { prop: "pattern_color", type: "string", default: '"white"' },
        { prop: "pattern_opacity", type: "number", default: "0.4" },
        { prop: "pattern_size", type: "string", default: "undefined" },
        { prop: "pattern_effect", type: '"none" | "glow" | "blur" | "fade"', default: '"none"' },
        { prop: "pattern_effect_opacity", type: "number", default: "1" },
        { prop: "pattern_mask", type: '"none" | "ellipse" | "fade"', default: '"none"' },
        { prop: "pattern_mask_direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
        { prop: "pattern_mask_size", type: "number", default: "70" },
    ]}
/>


<style>

    /* Preview */

    .tg-preview {
        background: var(--tone-bg);
        border: 2px solid var(--tone-hover);
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

    .slider-control {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-width: 140px;
    }

    .slider-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }
</style>
