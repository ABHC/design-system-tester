<script lang="ts">
    import Badge from "../Badge/Badge.svelte";

    import {
        defaultTileGridConfig,
        type Tile,
        type TileGridConfig,
        type ImageMode,
        type ImagePosition,
        type Columns,
        type HeroSpan,
        type Elevation,
    } from "./tilegrid.config";

    import { type PatternPreset, PATTERN_PRESETS, tintPattern } from "../../utils/patterns";

    type Effect = "none" | "glow" | "blur" | "fade";
    type Mask = "none" | "ellipse" | "fade";
    type MaskDirection = "top" | "bottom" | "left" | "right";

    // Props

    /*
        Props
        tiles : Array of tiles to display. Accepts any object satisfying the Tile interface
        locale : Current locale key used to resolve `tile.abstract[locale]`.
        image_mode : "image" | "mock-up" | "flat" - default: "image"
        image_position : In image mode: CSS background-position ("center", "top"…).
                         In mock-up mode: anchor for the floating image
                         ("top-right" | "top-left" | "top-center" | "right" | "left").
        image_size : Mock-up mode only. CSS size value passed as --tg-deco-size.
                     Controls width for top-* positions, height for side positions.
                     e.g. "280px", "60%", "18rem". Default: CSS fallback (55% / 90%).
        columns : Number of columns on desktop (>= 1024px) - default: 3
        hero_span : How hero tiles span on desktop - default: "half"
        gap : Gap between tiles - any valid CSS length - default: "1.5rem"
        show_hero_badge : Show "Featured" badge on hero tiles - default: true
        show_hero_border : Show accent border on hero tiles - default: true
        excerpt_length : Max characters for the abstract excerpt on normal tiles (Default: 52)
        href_base : Base path for tile hrefs: "{href_base}/{tile.id}"
    */

    interface Props {
        tiles: readonly Tile[];
        locale?: string;
        image_mode?: ImageMode;
        image_position?: ImagePosition;
        image_size?: string;
        columns?: Columns;
        hero_span?: HeroSpan;
        gap?: string;
        show_hero_badge?: boolean;
        show_hero_border?: boolean;
        excerpt_length?: number;
        href_base?: string;
        rounded?: boolean;
        elevation?: Elevation;
        raised?: boolean;
        pattern?: PatternPreset | string;
        pattern_color?: string;
        pattern_opacity?: number;
        pattern_size?: string;
        pattern_effect?: Effect;
        pattern_effect_opacity?: number;
        pattern_mask?: Mask;
        pattern_mask_direction?: MaskDirection;
        pattern_mask_size?: number;
    }

    let {
        tiles,
        locale = "en",
        image_mode = defaultTileGridConfig.image_mode,
        image_position = defaultTileGridConfig.image_position,
        image_size = undefined,
        columns = defaultTileGridConfig.columns,
        hero_span = defaultTileGridConfig.hero_span,
        gap = defaultTileGridConfig.gap,
        show_hero_badge = defaultTileGridConfig.show_hero_badge,
        show_hero_border = defaultTileGridConfig.show_hero_border,
        excerpt_length = defaultTileGridConfig.excerpt_length,
        href_base = defaultTileGridConfig.href_base,
        rounded = defaultTileGridConfig.rounded,
        elevation = defaultTileGridConfig.elevation,
        raised = defaultTileGridConfig.raised,
        pattern = "none",
        pattern_color = "white",
        pattern_opacity = 0.1,
        pattern_size = undefined,
        pattern_effect = "none",
        pattern_effect_opacity = 1,
        pattern_mask = "none",
        pattern_mask_direction = "bottom",
        pattern_mask_size = 70,
    }: Props = $props();

    // Helpers

    const pattern_bg = $derived.by(() => {
        if (!pattern || pattern === "none") return "none";
        if (pattern in PATTERN_PRESETS) {
            return tintPattern(PATTERN_PRESETS[pattern as Exclude<PatternPreset, "none">], pattern_color);
        }
        return pattern;
    });

    const mask_value = $derived.by(() => {
        if (pattern_mask === "none") return "none";
        if (pattern_mask === "ellipse") {
            return `radial-gradient(ellipse ${pattern_mask_size}% ${pattern_mask_size}% at 50% 50%, black 20%, transparent ${pattern_mask_size}%)`;
        }
        const dir_map: Record<MaskDirection, string> = {
            top: "to top",
            bottom: "to bottom",
            left: "to left",
            right: "to right",
        };
        return `linear-gradient(${dir_map[pattern_mask_direction]}, black 0%, transparent ${pattern_mask_size}%)`;
    });

    /*
        Inject --tg-columns, --tg-gap, pattern vars, mask, and effect vars as CSS custom properties.
        The CSS rules consume these to drive grid-template-columns, gap, and the visual layers.
    */
    const grid_style = $derived(
        [
            `--tg-columns: ${columns}`,
            `--tg-gap: ${gap}`,
            `--tg-pattern-bg: ${pattern_bg}`,
            `--tg-pattern-opacity: ${pattern_opacity}`,
            `--tg-pattern-size: ${pattern_size ?? "auto"}`,
            `--tg-pattern-mask: ${mask_value}`,
            `--tg-effect-opacity: ${pattern_effect_opacity}`,
        ].join("; ")
    );

    /*
        Resolve the correct grid-column span class for a hero tile.
        Returns an empty string for non-hero tiles.
    
        "half" → tg-tile-hero-half (span 2)
        "full" → tg-tile-hero-full (1 / -1, i.e. all columns)
    
        Both classes are neutralised below the 1024px breakpoint via CSS,
        so the tile collapses to a single column on mobile without JS.
    */
    function hero_span_class(is_hero: boolean): string {
        if (!is_hero) return "";
        return hero_span === "full" ? "tg-tile-hero-full" : "tg-tile-hero-half";
    }

    /*
        Truncate a string to max_len characters, appending an ellipsis if needed.
    */
    function truncate(str: string, max_len: number): string {
        if (!str) return "";
        return str.length > max_len ? str.substring(0, max_len) + "…" : str;
    }

    /*
        Return true if a tile has a usable first media asset.
        Used to decide whether to render in image mode or fall back to flat.
    */
    function has_image(tile: Tile): boolean {
        return (
            Array.isArray(tile.media) &&
            tile.media.length > 0 &&
            !!tile.media[0]?.src
        );
    }

    /*
        Build the inline style string for image-mode tiles.
        Injects --bg-image and --bg-position as CSS custom properties.
    */
    function image_style(tile: Tile): string {
        if (!has_image(tile)) return "";
        return `--bg-image: url('${tile.media![0].src}'); --bg-position: ${image_position};`;
    }

    /*
        Resolve a localised string from a Record<string, string>,
        falling back to the first available locale if the requested one is absent.
    */
    function localise(record: Record<string, string> | undefined): string {
        if (!record) return "";
        return record[locale] ?? Object.values(record)[0] ?? "";
    }
</script>

<!-- Markup -->

<section class="tile-grid-section" aria-label="Tile grid" style={grid_style}>
    {#if pattern_effect !== "none"}
        <div class="tg-effect tg-effect-{pattern_effect}"></div>
    {/if}

    <div class="tg-grid">
        {#each tiles as tile}
            {#if tile.display}

                {@const is_hero = tile.hero === true}
                {@const use_image = image_mode === "image" && has_image(tile)}
                {@const use_decorative = image_mode === "mock-up" && has_image(tile)}
                {@const mode_class = use_image ? "tg-tile-image" : use_decorative ? "tg-tile-deco" : "tg-tile-flat"}
                {@const span_class = hero_span_class(is_hero)}
                {@const hero_class = is_hero ? "tg-tile-hero" : ""}
                {@const border_class = is_hero && show_hero_border ? "tg-tile-hero-border" : ""}
                {@const deco_pos_class = use_decorative ? `tg-deco-${image_position}` : ""}
                {@const rounded_class = rounded ? "tg-rounded" : ""}
                {@const elevation_class = elevation !== "none" ? `tg-elevation-${elevation}` : ""}
                {@const raised_class = raised ? "tg-raised" : ""}
                {@const abstract = localise(tile.abstract)}
                {@const hero_text = localise(tile.hero_text)}

                <a
                    href={tile.id ? `${href_base}/${tile.id}` : undefined}
                    class="tg-tile {mode_class} {hero_class} {span_class} {border_class} {deco_pos_class} {rounded_class} {elevation_class} {raised_class}"
                    style={use_image ? image_style(tile) : undefined}
                    aria-label="{tile.name}{is_hero && hero_text ? ` — ${hero_text}` : ''}"
                    data-sveltekit-preload-data={tile.id ? "hover" : undefined}
                >

                    <!-- Hero badge -->
                    {#if is_hero && show_hero_badge && hero_text}
                        <span class="tg-hero-badge-anchor">
                            <Badge 
                                variant="flat" 
                                palette="accent" 
                                size="sm"
                                elevation="subtle"
                                uppercase
                            >
                                {#if tile.hero_icon}
                                    <span
                                        class="material-symbols-outlined tg-hero-badge-icon"
                                        aria-hidden="true"
                                    >
                                        {tile.hero_icon}
                                    </span>
                                {/if}
                                {hero_text}
                            </Badge>
                        </span>
                    {/if}

                    <!-- Pattern background layer (flat and deco tiles only) -->
                    {#if pattern_bg !== "none" && !use_image}
                        <div class="tg-pattern"></div>
                    {/if}

                    <!-- Decorative image - anchored to a corner/edge, clipped by tile -->
                    {#if use_decorative}
                        <img
                            class="tg-deco-img"
                            src={tile.media![0].src}
                            alt=""
                            aria-hidden="true"
                            style={image_size ? `--tg-deco-size: ${image_size};` : undefined}
                        />
                    {/if}

                    <!-- Tile content -->

                    <div class="tg-layout {use_image || use_decorative ? 'tg-overlay' : ''}">
                        <div class="tg-content">

                            <!-- Origin + years badges -->
                            <div class="tg-meta">
                                {#if tile.origin}
                                    <Badge 
                                        variant="flat" 
                                        palette="accent"  
                                        size="sm"
                                        elevation="subtle"
                                        uppercase
                                    >
                                        {tile.origin}
                                    </Badge>
                                {/if}
                                {#if tile.years}
                                    <Badge 
                                        variant="flat" 
                                        palette="neutral" 
                                        size="sm"
                                        elevation="subtle"
                                        uppercase
                                    >
                                        {tile.years}
                                    </Badge>
                                {/if}
                            </div>

                            <!-- Tile name -->
                            <h3 class="tg-name">
                                {tile.name}
                            </h3>

                            <!-- Localised abstract -->
                            {#if abstract}
                                <h5 class="tg-abstract">
                                    {is_hero
                                        ? abstract
                                        : truncate(abstract, excerpt_length)}
                                </h5>
                            {/if}
                        </div>
                    </div>
                </a>
            {/if}
        {/each}
    </div>
</section>

<style>
    /* Section wrapper */

    .tile-grid-section {
        position: relative;
        overflow: hidden;
        width: 100%;
        color: var(--text);
    }

    /*
        Grid
        Mobile  (< 640px)  : 1 column, forced
        Tablet  (640-1023) : 2 columns, forced
        Desktop (>= 1024px) : --tg-columns (2, 3, or 4), injected via style=""
    */

    /* Effect layer ---------------------------------------------------- */

    .tg-effect {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: var(--tg-effect-opacity);
        z-index: 0;
    }

    .tg-effect-glow {
        background: radial-gradient(
            ellipse 60% 50% at 50% 40%,
            color-mix(in oklch, var(--accent) 8%, transparent),
            transparent
        );
    }

    .tg-effect-blur {
        backdrop-filter: blur(2px);
    }

    .tg-effect-fade {
        background: linear-gradient(
            to bottom,
            transparent 0%,
            color-mix(in oklch, var(--tone-bg) 80%, transparent) 100%
        );
    }

    .tg-grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--tg-gap, 1.5rem);
        padding: 1rem 0;
    }

    @media (min-width: 640px) {
        .tg-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .tg-grid {
            grid-template-columns: repeat(var(--tg-columns, 3), 1fr);
        }
    }

    /*
        Hero span
        Mobile (< 640px)  : no span, hero = 1 column like the others.
        Tablet (640-1023) : 2-col grid, span 2 = full row.
        Desktop (>= 1024px): span 2 over N columns, or 1/-1 for hero-full.
    */

    @media (min-width: 640px) {
        .tg-tile-hero-half {
            grid-column: span 2;
        }

        .tg-tile-hero-full {
            grid-column: 1 / -1;
        }
    }

    /* Base tile */

    .tg-tile {
        display: flex;
        position: relative;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .tg-tile:not([href]) {
        cursor: default;
    }

    .tg-rounded {
        border-radius: var(--radius-round);
    }

    /* Elevation - hover only (default) -------------------------------- */

    .tg-elevation-subtle:hover {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .tg-elevation-hard:hover {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

    /* Elevation - constant (raised=true) ------------------------------ */

    .tg-raised.tg-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .tg-raised.tg-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

    /* Hero badge ------------------------------------------------------ */

    .tg-hero-badge-anchor {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        z-index: 10;
        pointer-events: none;
    }

    .tg-hero-badge-icon {
        font-size: 14px;
        line-height: 1;
    }

    /* IMAGE TILE ------------------------------------------------------ */

    .tg-tile-image {
        aspect-ratio: 4 / 3;
        background-image: var(--bg-image);
        background-size: cover;
        background-position: var(--bg-position, center);
        background-repeat: no-repeat;
    }

    @media (min-width: 640px) {
        .tg-tile-image:hover {
            transform: translateX(3px);
        }
    }

    /* FLAT TILE ------------------------------------------------------- */

    .tg-tile-flat {
        aspect-ratio: 4 / 3;
        border-left: 4px solid transparent;
        background: var(--tone);
    }

    .tg-tile-flat.tg-tile-hero-border {
        border-left: 4px solid var(--accent);
    }

    .tg-tile-flat.tg-tile-hero {
        border-left-color: var(--accent);
    }

    .tg-tile-flat:hover {
        border-left-color: var(--accent);
        background: var(--tone-hover);
    }

    @media (min-width: 640px) {
        .tg-tile-flat:hover {
            transform: translateX(3px);
        }
    }

    /* MOCK-UP TILE ---------------------------------------------------- */
    /*
        Flat card look + a <img> anchored to a corner/edge via position:absolute.
        The tile's overflow:hidden clips the image at the border-radius boundary,
        creating the "peek-out" effect without the image leaving the card.
        image_position controls the CSS class (tg-deco-top-right, etc.).
        image_size passes --tg-deco-size to control the image dimension.
    */

    .tg-tile-deco {
        aspect-ratio: 4 / 3;
        background: var(--tone);
    }

    .tg-tile-deco.tg-tile-hero-border {
        border-left: 4px solid var(--accent);
    }

    .tg-tile-deco.tg-tile-hero {
        border-left-color: var(--accent);
        background: var(--accent-ghost-hover);
    }

    .tg-tile-deco:hover {
        border-left: 4px solid var(--accent);
        background: var(--tone-hover);
    }

    @media (min-width: 640px) {
        .tg-tile-deco:hover {
            transform: translateX(3px);
        }
    }

    /* Decorative image element */

    .tg-deco-img {
        position: absolute;
        object-fit: contain;
        pointer-events: none;
        user-select: none;
        z-index: 1;
    }

    /* Top anchors: width-driven (controls how much of the tile width the image takes) */
    .tg-deco-top-right .tg-deco-img,
    .tg-deco-top-left  .tg-deco-img,
    .tg-deco-top-center .tg-deco-img {
        width: var(--tg-deco-size, 55%);
        height: auto;
    }

    /* Side anchors: height-driven */
    .tg-deco-right .tg-deco-img,
    .tg-deco-left  .tg-deco-img {
        height: var(--tg-deco-size, 90%);
        width:  auto;
    }

    /* Placement per anchor */
    .tg-deco-top-right .tg-deco-img { 
        top: 0; 
        right: 0; 
    }

    .tg-deco-top-left .tg-deco-img { 
        top: 0; 
        left: 0; 
    }

    .tg-deco-top-center .tg-deco-img { 
        top: 0; 
        left: 50%; 
        transform: translateX(-50%); 
    }

    .tg-deco-right .tg-deco-img { 
        top: 50%; 
        right: 0; 
        transform: translateY(-50%); 
    }
    .tg-deco-left .tg-deco-img { 
        top: 50%; 
        left: 0; 
        transform: translateY(-50%); 
    }

    /* Text layout: reserve space on the opposite side from the image */
    .tg-deco-right .tg-layout { padding-right: 42%; }
    .tg-deco-left  .tg-layout { padding-left:  42%; }

    /* Hero sizing ----------------------------------------------------- */

    /*
        Desktop (>= 1024px), hero-half, aspect-ratio auto
        Desktop (>= 1024px), hero-full, aspect-ratio 8/3, hero alone in its line
        Tablet (640-1023px), aspect-ratio 8/3, hero alone in its line
        Mobile (< 640px), aspect-ratio 4/3, like other tiles
    */

    @media (min-width: 1024px) {
        .tg-tile-image.tg-tile-hero-half,
        .tg-tile-flat.tg-tile-hero-half,
        .tg-tile-deco.tg-tile-hero-half {
            aspect-ratio: auto;
        }

        .tg-tile-image.tg-tile-hero-full,
        .tg-tile-flat.tg-tile-hero-full,
        .tg-tile-deco.tg-tile-hero-full {
            aspect-ratio: 8 / 3;
        }
    }

    @media (min-width: 640px) and (max-width: 1023px) {
        .tg-tile-image.tg-tile-hero,
        .tg-tile-flat.tg-tile-hero,
        .tg-tile-deco.tg-tile-hero {
            aspect-ratio: 8 / 3;
        }
    }

    /* Inside styles of the tile (layout, overlay, content, etc...) --- */
    .tg-layout {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.5rem;
        z-index: 2;
        transition: background 0.3s ease;
    }

    .tg-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.35) 45%,
            rgba(0, 0, 0, 0.04) 100%
        );
    }

    .tg-tile-image:hover .tg-overlay {
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.80) 0%,
            rgba(0, 0, 0, 0.45) 50%,
            rgba(0, 0, 0, 0.06) 100%
        );
    }

    .tg-meta {
        display: flex;
        gap: 0.45rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .tg-content {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        z-index: 3;
    }

    .tg-name {
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .tg-abstract {
        font-style: italic;
        margin: 0;
        opacity:0.85;
    }

    .tg-overlay .tg-name,
    .tg-overlay .tg-abstract {
        color: var(--text-light);
    }

    /* Hide the subtitle on very small screens to keep tiles compact */
    @media (max-width: 639px) {
        .tg-flat-title {
            display: none;
        }
    }

    .tg-pattern {
        position: absolute;
        inset: 0;
        pointer-events: none;
        user-select: none;
        z-index: 0;
        background-image: var(--tg-pattern-bg);
        background-repeat: repeat;
        background-size: var(--tg-pattern-size);
        opacity: var(--tg-pattern-opacity);
        mask-image: var(--tg-pattern-mask);
        -webkit-mask-image: var(--tg-pattern-mask);
    }
</style>