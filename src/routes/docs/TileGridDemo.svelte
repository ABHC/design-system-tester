<script lang="ts">
    import type { PatternPreset } from "@abhc/spektral-ui";
    import type { Translation } from "#lib/types/translations.js";
    import type { PlaceholdersType } from "../placeholders";

    import type {
        Columns,
        HeroSpan,
        TileImageDisplay,
        ImagePosition,
        TileVariant,
        TilePalette,
        TileGridElevation,
        TileGridEffect,
        TileGridMask,
        TileGridMaskDirection,
        TileAspectRatio
    } from '@abhc/spektral-ui';

    import {
        Headline,
        CodeBlock,
        DataTable,
        TileGrid,
        Tile,
        Badge,
        Avatar,
        Progress,
        Callout,
        Accordion,
        AccordionHeader,
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
    // "none" is a demo-only value: tiles are rendered without `src`, so they always
    // fall back to a plain flat/outlined card regardless of the `image` prop.
    let demo_image: TileImageDisplay | "none" = $state("background");
    let demo_variant: TileVariant = $state("flat");
    let demo_palette: TilePalette = $state("tone");
    let demo_position: ImagePosition = $state("center");
    let demo_columns: Columns = $state(3);
    let demo_hero_span: HeroSpan = $state("half");
    let demo_rounded: boolean = $state(false);
    let demo_elevation: TileGridElevation = $state("none");
    let demo_raised: boolean = $state(false);
    let demo_aspect_ratio: TileAspectRatio = $state("4/3");
    let demo_pattern: PatternPreset = $state("none");
    let demo_pattern_color: string = $state("white");
    let demo_pattern_size: string = $state("auto");
    let demo_pattern_opacity: number = $state(0.4);
    let demo_pattern_effect: TileGridEffect = $state("none");
    let demo_pattern_effect_opacity: number = $state(1);
    let demo_pattern_mask: TileGridMask = $state("none");
    let demo_pattern_mask_direction: TileGridMaskDirection = $state("bottom");
    let demo_pattern_mask_size: number = $state(70);

    const bg_positions = ["center", "top", "bottom"] as const;
    const deco_positions = ["top-right", "top-left", "top-center", "right", "left"] as const;
    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;
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

    function set_image(m: TileImageDisplay | "none") {
        demo_image = m;
        demo_position = m === "preview" ? "top-right" : "center";
    }

    // Demo tiles — plain data, no href (non-clickable), built from placeholders.grid

    interface DemoTile {
        name: string;
        origin: string;
        years: string;
        abstract: string;
        label: string;
        hero: boolean;
        src: string;
    }

    const tile_media = [
        "/assets/tgv.jpeg",
        "/assets/concorde.jpeg",
        "/assets/minitel.jpeg",
        "/assets/ariane3.jpeg",
        "/assets/renault.jpeg",
        "/assets/taaf2.png",
        "/assets/hay_match2.png",
        "/assets/fonk2.png",
        "/assets/brutalist2.png",
        "/assets/cogip2.png",
    ];

    const tiles: DemoTile[] = $derived([
        { ...placeholders.grid.tgv, hero: true, src: tile_media[0] },
        { ...placeholders.grid.concord, hero: false, src: tile_media[1] },
        { ...placeholders.grid.minitel, hero: false, src: tile_media[2] },
        { ...placeholders.grid.ariane, hero: false, src: tile_media[3] },
        { ...placeholders.grid.renault, hero: false, src: tile_media[4] },
    ]);

    const tiles_mockup: DemoTile[] = $derived([
        { ...placeholders.grid.taaf, hero: true, src: tile_media[5] },
        { ...placeholders.grid.haymatch, hero: false, src: tile_media[6] },
        { ...placeholders.grid.fonk, hero: false, src: tile_media[7] },
        { ...placeholders.grid.brutalist, hero: false, src: tile_media[8] },
        { ...placeholders.grid.cogip, hero: false, src: tile_media[9] },
    ]);

    // Code examples — with href

    const code_background = `<TileGrid columns={3} hero_span="half">
    <Tile
        hero
        name="Atlas"
        href="/projects/atlas"
        src="/images/atlas.jpg"
        abstract="Hardware design system for embedded devices"
    >
        {#snippet corner()}
            <Badge palette="accent" size="sm" elevation="subtle" uppercase>
                <span class="material-symbols-outlined" aria-hidden="true">star</span>
                Featured
            </Badge>
        {/snippet}
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Personal</Badge>
            <Badge palette="neutral" size="sm" elevation="hard" uppercase>2023–24</Badge>
        {/snippet}
    </Tile>
    <Tile
        name="Meridian"
        href="/projects/meridian"
        src="/images/meridian.jpg"
        abstract="Industrial supervision platform"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Client</Badge>
            <Badge palette="neutral" size="sm" elevation="hard" uppercase>2024</Badge>
        {/snippet}
    </Tile>
    <Tile
        name="Capsule"
        href="/projects/capsule"
        src="/images/capsule.jpg"
        abstract="Modular enclosure for prototyping boards"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Open Source</Badge>
        {/snippet}
    </Tile>
</TileGrid>`;

    const code_flat = `<TileGrid variant="flat" columns={3} hero_span="half">
    <Tile
        hero
        name="Core API"
        href="/projects/core-api"
        abstract="Modular REST API built on FastAPI and Docker"
    >
        {#snippet corner()}
            <Badge palette="accent" size="sm" elevation="subtle" uppercase>Featured</Badge>
        {/snippet}
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Personal</Badge>
            <Badge palette="neutral" size="sm" elevation="hard" uppercase>2024</Badge>
        {/snippet}
    </Tile>
    <Tile
        name="Dashboard"
        href="/projects/dashboard"
        abstract="Admin interface for an IoT sensor fleet"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Client</Badge>
        {/snippet}
    </Tile>
    <Tile
        name="CLI Toolkit"
        href="/projects/cli-toolkit"
        abstract="CLI toolkit for Linux task automation"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Open Source</Badge>
        {/snippet}
    </Tile>
</TileGrid>`;

    const code_decorative = `<TileGrid image="preview" image_position="top-right" image_size="55%" columns={3}>
    <Tile
        name="Capsule"
        href="/projects/capsule"
        src="/images/capsule.png"
        abstract="Modular enclosure for prototyping boards"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Open Source</Badge>
        {/snippet}
    </Tile>
    <Tile
        name="Stratum"
        href="/projects/stratum"
        src="/images/stratum.png"
        abstract="Configuration interface for sensor networks"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Personal</Badge>
        {/snippet}
    </Tile>
    <Tile
        name="Lichen"
        href="/projects/lichen"
        src="/images/lichen.png"
        abstract="Low-power environmental monitoring system"
    >
        {#snippet meta()}
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Client</Badge>
        {/snippet}
    </Tile>
</TileGrid>`;

    const code_pattern = `<!-- pattern on flat/outlined tiles — hidden behind image="background" -->
<TileGrid
    variant="flat"
    columns={3}
    hero_span="half"
    pattern="scallops"
    pattern_color="white"
    pattern_opacity={0.4}
>
    <Tile hero name="Core API" href="/projects/core-api" abstract="Modular REST API built on FastAPI and Docker">
        {#snippet corner()}
            <Badge palette="accent" size="sm" elevation="subtle" uppercase>Featured</Badge>
        {/snippet}
    </Tile>
    <Tile name="Dashboard" href="/projects/dashboard" abstract="Admin interface for an IoT sensor fleet" />
    <Tile name="CLI Toolkit" href="/projects/cli-toolkit" abstract="CLI toolkit for Linux task automation">
        {#snippet meta()}
            <!-- a single tile can override the grid's pattern -->
            <Badge palette="accent" size="sm" elevation="hard" uppercase>Open Source</Badge>
        {/snippet}
    </Tile>
</TileGrid>`;

    const code_hero_full = `<!-- hero_span="full" — the hero tile spans the full grid width -->
<TileGrid columns={3} hero_span="full">
    <Tile
        hero
        name="Atlas"
        href="/projects/atlas"
        src="/images/atlas.jpg"
        abstract="Hardware design system for embedded devices"
    >
        {#snippet corner()}
            <Badge palette="accent" size="sm" elevation="subtle" uppercase>Featured</Badge>
        {/snippet}
    </Tile>
    <Tile name="Meridian" href="/projects/meridian" src="/images/meridian.jpg" abstract="Industrial supervision platform" />
    <Tile name="Capsule" href="/projects/capsule" src="/images/capsule.jpg" abstract="Modular enclosure for prototyping boards" />
</TileGrid>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Headline -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.tile_grid_demo?.title ?? "TileGrid & Tile"}</Headline>
</div>

<p class="intro">{trans?.tile_grid_demo?.intro}</p>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector
        label="Variant"
        options={["flat", "outlined"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Palette"
        options={["accent", "tone", "neutral", "error", "warning", "success", "info"]}
        bind:value={demo_palette}
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
        label="Elevation persist"
        options={bool_opts}
        bind:value={demo_raised}
    />
    <Selector
        label="Columns"
        options={[1, 2, 3, 4, 5, 6]}
        bind:value={demo_columns}
    />
    <Selector
        label="Aspect ratio"
        options={["4/3", "square", "portrait", "video", "wide", "auto"]}
        bind:value={demo_aspect_ratio}
    />
    {#if demo_columns > 2}
        <Selector
            label="Hero span"
            options={["half", "full"]}
            bind:value={demo_hero_span}
        />
    {/if}
    <Selector
        label="Image"
        options={["background", "preview", "none"]}
        bind:value={demo_image}
        onchange={set_image}
    />
    {#if demo_image === "background"}
        <Selector
            label="Image position"
            options={bg_positions}
            bind:value={demo_position}
        />
    {/if}
    {#if demo_image === "preview"}
        <Selector
            label="Image position"
            options={deco_positions}
            bind:value={demo_position}
        />
    {/if}
    {#if demo_image !== "background"}
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
                label="Pattern mask"
                options={["none", "ellipse", "fade"]}
                bind:value={demo_pattern_mask}
            />
            <Selector
                label="Pattern mask direction"
                options={["top", "bottom", "left", "right"]}
                bind:value={demo_pattern_mask_direction}
            />
            <div class="slider-control">
                <span class="slider-label">Pattern mask size</span>
                <Slider
                    palette="accent"
                    size="sm"
                    rounded
                    min={0}
                    max={100}
                    step={5}
                    bind:value={demo_pattern_mask_size}
                    aria_label="Pattern mask size"
                />
            </div>

            <Selector
                label="Pattern effect"
                options={["none", "glow", "blur", "fade"]}
                bind:value={demo_pattern_effect}
            />
            <div class="slider-control">
                <span class="slider-label">Pattern effect opacity</span>
                <Slider
                    palette="accent"
                    size="sm"
                    rounded
                    min={0}
                    max={1}
                    step={0.05}
                    bind:value={demo_pattern_effect_opacity}
                    aria_label="Pattern effect opacity"
                />
            </div>
        {/if}
    {/if}
</ControlBar>

<!-- Live preview -->

<div class="tg-preview">
    <TileGrid
        image={demo_image === "none" ? "background" : demo_image}
        image_position={demo_position}
        variant={demo_variant}
        palette={demo_palette}
        columns={demo_columns}
        hero_span={demo_hero_span}
        rounded={demo_rounded}
        elevation={demo_elevation}
        elevation_persist={demo_raised}
        aspect_ratio={demo_aspect_ratio}
        pattern={demo_pattern}
        pattern_color={demo_pattern_color}
        pattern_size={demo_pattern_size}
        pattern_opacity={demo_pattern_opacity}
        pattern_effect={demo_pattern_effect}
        pattern_effect_opacity={demo_pattern_effect_opacity}
        pattern_mask={demo_pattern_mask}
        pattern_mask_direction={demo_pattern_mask_direction}
        pattern_mask_size={demo_pattern_mask_size}
    >
        {#each (demo_image === "preview" ? tiles_mockup : tiles) as t, i}
            <Tile
                name={t.name}
                abstract={t.abstract}
                hero={t.hero}
                src={demo_image === "none" ? undefined : t.src}
            >
                {#snippet corner()}
                    {#if t.hero}
                        <Badge palette="accent" size="sm" elevation="subtle" uppercase>
                            <span class="material-symbols-outlined" aria-hidden="true">star</span>
                            {placeholders.grid.hero_text}
                        </Badge>
                    {:else if i === 1 && demo_image != "preview"}
                        <Avatar 
                            size="sm" 
                            palette="tone" 
                            label={t.origin} 
                            shape="circular" 
                        />
                    {:else if i === 4 && demo_image === "preview"}
                        <Avatar 
                            size="sm" 
                            palette="tone" 
                            label={t.origin} 
                            shape="circular" 
                        />
                    {/if}
                {/snippet}
                {#snippet meta()}
                    {#if i === 1}
                        {#if demo_image === "preview"}
                            <div class="tile-demo-progress">
                                <span class="tile-demo-progress-label">
                                    {t.label}
                                </span>
                                <Progress 
                                    palette="neutral" 
                                    size="sm" 
                                    value={95} 
                                    aria_label={t.label}
                                />
                            </div>
                        {:else}
                            <Badge palette="neutral" size="sm" elevation="hard" uppercase>
                                {t.years}
                            </Badge>
                        {/if}
                    {:else if i === 2 && demo_image != "preview"}
                        <div class="tile-demo-progress">
                            <span class="tile-demo-progress-label">
                                {t.label}
                            </span>
                            <Progress 
                                palette="warning" 
                                size="sm" 
                                value={72} 
                                aria_label={t.label}
                            />
                        </div>
                    {:else}
                        {#if i != 4}
                            <Badge 
                                palette="accent" 
                                size="sm" 
                                uppercase
                            >
                                {t.origin}
                            </Badge>
                            <Badge 
                                palette="neutral" 
                                size="sm" 
                                uppercase
                            >
                                {t.years}
                            </Badge>
                        {/if}
                    {/if}
                {/snippet}
            </Tile>
        {/each}
    </TileGrid>
</div>

<!-- Attribution note -->

<Callout palette="info" align="center">
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

<!-- Details accordion -->

<div class="accordion-wrapper">
    <Accordion variant="ghost" palette="accent" size="md">
        <AccordionHeader label={trans?.tile_grid_demo?.id_note_title ?? "Role of the link (href)"}>
            <p>{trans?.tile_grid_demo?.id_note}</p>
        </AccordionHeader>
        <AccordionHeader label={trans?.tile_grid_demo?.aspect_ratio_title ?? "Aspect ratio"}>
            <p>{trans?.tile_grid_demo?.aspect_ratio_text}</p>
        </AccordionHeader>
        <AccordionHeader label={trans?.tile_grid_demo?.snippets_title ?? "Composition zones (snippets)"}>
            <p>{trans?.tile_grid_demo?.snippets_text}</p>
        </AccordionHeader>
        <AccordionHeader label={trans?.tile_grid_demo?.pattern_title ?? "Decorative pattern"}>
            <p>{trans?.tile_grid_demo?.pattern_text}</p>
        </AccordionHeader>
        <AccordionHeader label={trans?.tile_grid_demo?.hero_sizing_title ?? "Hero tile sizing"}>
            <p>{trans?.tile_grid_demo?.hero_sizing_text}</p>
        </AccordionHeader>
    </Accordion>
</div>

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
    <Callout palette="info">
        {#snippet leading()}
            <span class="material-symbols-outlined">package_2</span>
        {/snippet}
        {#snippet children()}
            {trans?.doc.types_notice}<br />
            <code>
                import type &lbrace; Columns, HeroSpan, TileImageDisplay, ImagePosition,
                TileVariant, TilePalette, TileGridElevation, TileGridEffect, TileGridMask,
                TileGridMaskDirection, TileAspectRatio, PatternPreset &rbrace; from '@abhc/spektral-ui';
            </code>
        {/snippet}
    </Callout>
</div>

<h4 class="api-subtitle">TileGrid</h4>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "columns", type: "1 | 2 | 3 | 4 | 5 | 6", default: "3" },
        { prop: "hero_span", type: '"half" | "full"', default: '"half"' },
        { prop: "gap", type: "string", default: '"1.5rem"' },
        { prop: "image", type: '"background" | "preview"', default: '"background"' },
        { prop: "image_position", type: '"center" | "top" | "bottom" | "top-right" | "top-left" | "top-center" | "right" | "left" | string', default: '"center"' },
        { prop: "image_size", type: "string", default: "undefined" },
        { prop: "variant", type: '"flat" | "outlined"', default: '"flat"' },
        { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"tone"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "elevation_persist", type: "boolean", default: "false" },
        { prop: "aspect_ratio", type: '"square" | "portrait" | "video" | "wide" | "auto" | string', default: '"4/3"' },
        { prop: "pattern", type: '"none" | "scallops" | "grid" | "sunburst" | "sunrise" | "atoms" | "lozenge" | "waves" | "diamonds" | "shippo" | "kumi_kikko" | string', default: '"none"' },
        { prop: "pattern_color", type: "string", default: '"white"' },
        { prop: "pattern_opacity", type: "number", default: "0.1" },
        { prop: "pattern_size", type: "string", default: "undefined" },
        { prop: "pattern_effect", type: '"none" | "glow" | "blur" | "fade"', default: '"none"' },
        { prop: "pattern_effect_opacity", type: "number", default: "1" },
        { prop: "pattern_mask", type: '"none" | "ellipse" | "fade"', default: '"none"' },
        { prop: "pattern_mask_direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
        { prop: "pattern_mask_size", type: "number", default: "70" },
        { prop: "children", type: "Snippet", default: "—" },
    ]}
/>

<h4 class="api-subtitle">Tile</h4>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "name", type: "string", default: "—" },
        { prop: "abstract", type: "string", default: "undefined" },
        { prop: "href", type: "string", default: "undefined" },
        { prop: "blank", type: "boolean", default: "false" },
        { prop: "hero", type: "boolean", default: "false" },
        { prop: "src", type: "string", default: "undefined" },
        { prop: "rounded", type: "boolean", default: "inherits from TileGrid" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: "inherits from TileGrid" },
        { prop: "elevation_persist", type: "boolean", default: "inherits from TileGrid" },
        { prop: "image", type: '"background" | "preview"', default: "inherits from TileGrid" },
        { prop: "image_position", type: "string", default: "inherits from TileGrid" },
        { prop: "image_size", type: "string", default: "inherits from TileGrid" },
        { prop: "variant", type: '"flat" | "outlined"', default: "inherits from TileGrid" },
        { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: "inherits from TileGrid" },
        { prop: "aspect_ratio", type: '"4/3" | "square" | "portrait" | "video" | "wide" | "auto" | string', default: "inherits from TileGrid" },
        { prop: "pattern", type: "string", default: "inherits from TileGrid" },
        { prop: "pattern_color", type: "string", default: '"white"' },
        { prop: "corner", type: "Snippet", default: "—" },
        { prop: "meta", type: "Snippet", default: "—" },
    ]}
/>

<style>

    /* Preview */

    .tg-preview {
        background: var(--spk-tone-bg);
        border: 2px solid var(--spk-tone-hover);
        padding: 1rem;
        margin-bottom: 1.5rem;
        overflow: hidden;
    }

    /* Intro */

    .intro {
        margin: 0.5rem 0 1rem;
        color: var(--spk-text-muted);
    }

    /* Details accordion */

    .accordion-wrapper {
        margin-bottom: 1.5rem;
    }

    .accordion-wrapper p {
        margin: 0;
    }

    /* Attributions */

    .attr {
        color: var(--spk-text);
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
        color: var(--spk-text-muted);
    }

    /* Tile meta - Progress composition example */

    .tile-demo-progress {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        flex-basis: 100%;
        min-width: 10rem;
    }

    .tile-demo-progress-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: var(--spk-opacity-overlay);
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--spk-text-muted);
        text-transform: uppercase;
    }
</style>
