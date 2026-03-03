<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import Headline  from "../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";
    import TileGrid  from "../design-system/components/TileGrid/TileGrid.svelte";
    import type { Tile, Columns, HeroSpan } from "../design-system/components/TileGrid/tilegrid.config";

    // -- Props 

    interface Props {
        trans: Translation | null;
    }

    let { trans }: Props = $props();

    // -- Demo state

    type Mode = "background" | "none" | "decorative";

    let demo_mode: Mode = $state("background");
    let demo_position: string = $state("center");
    let demo_columns: Columns = $state(3);
    let demo_hero_span: HeroSpan = $state("half");
    let demo_hero_badge: boolean = $state(true);
    let demo_rounded: boolean = $state(true);

    const bg_positions   = ["center", "top", "bottom"] as const;
    const deco_positions = ["top-right", "top-left", "top-center", "right", "left"] as const;

    function set_mode(m: Mode) {
        demo_mode     = m;
        demo_position = m === "decorative" ? "top-right" : "center";
    }

    // -- Demo tiles — no id (non-clickable) 

    const tiles: readonly Tile[] = [
        {
            name: "Atlas",
            origin: "Personal",
            years: "2023–24",
            display: true,
            hero: true,
            hero_text: { 
                fr: "En vedette", 
                en: "Featured" 
            },
            hero_icon: "star",
            media: [
                { 
                    src: "https://picsum.photos/seed/atlas/900/600",   
                    type: "image" 
                }
            ],
            abstract:  { 
                fr: "Système de conception hardware pour dispositifs embarqués", 
                en: "Hardware design system for embedded devices" 
            },
        },
        {
            name: "Meridian",
            origin: "Client",
            years: "2024",
            display: true,
            hero: false,
            media: [
                { 
                    src: "https://picsum.photos/seed/meridian/800/600", 
                    type: "image" 
                }
            ],
            abstract: { fr: "Plateforme de supervision industrielle",        en: "Industrial supervision platform" },
        },
        {
            name: "Capsule",
            origin: "Open Source",
            years: "2022",
            display: true,
            hero: false,
            media: [
                { 
                    src: "https://picsum.photos/seed/capsule/800/600",  
                    type: "image" 
                }
            ],
            abstract: { 
                fr: "Boîtier modulaire pour cartes de prototypage", 
                en: "Modular enclosure for prototyping boards" 
            },
        },
        {
            name: "Stratum",
            origin: "Personal",
            years: "2023",
            display: true,
            hero: false,
            media: [
                { 
                    src: "https://picsum.photos/seed/stratum/800/600",  
                    type: "image" 
                }
            ],
            abstract: { 
                fr: "Interface de configuration pour réseau de capteurs", 
                en: "Configuration interface for sensor networks" 
            },
        },
        {
            name: "Lichen",
            origin: "Client",
            years: "2024",
            display: true,
            hero: false,
            media: [
                { 
                    src: "https://picsum.photos/seed/lichen/800/600",   
                    type: "image" 
                }
            ],
            abstract: { 
                fr: "Système de monitoring environnemental basse consommation", 
                en: "Low-power environmental monitoring system" 
            },
        },
    ];

    // -- Code examples — with id 

    const code_background = `<TileGrid
    tiles={[
        {
            id:        "atlas",
            name:      "Atlas",
            origin:    "Personal",
            years:     "2023–24",
            display:   true,
            hero:      true,
            hero_text: { fr: "En vedette", en: "Featured" },
            hero_icon: "star",
            media:     [{ src: "/images/atlas.jpg", type: "image" }],
            abstract:  { en: "Hardware design system for embedded devices" },
        },
        {
            id:      "meridian",
            name:    "Meridian",
            origin:  "Client",
            years:   "2024",
            display: true,
            hero:    false,
            media:   [{ src: "/images/meridian.jpg", type: "image" }],
            abstract: { en: "Industrial supervision platform" },
        },
        {
            id:      "capsule",
            name:    "Capsule",
            origin:  "Open Source",
            display: true,
            hero:    false,
            media:   [{ src: "/images/capsule.jpg", type: "image" }],
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
            id:        "core-api",
            name:      "Core API",
            origin:    "Personal",
            years:     "2024",
            display:   true,
            hero:      true,
            hero_text: { en: "Featured" },
            media:     [],
            abstract:  { en: "Modular REST API built on FastAPI and Docker" },
        },
        {
            id:      "dashboard",
            name:    "Dashboard",
            origin:  "Client",
            display: true,
            hero:    false,
            media:   [],
            abstract: { en: "Admin interface for an IoT sensor fleet" },
        },
        {
            id:      "cli-toolkit",
            name:    "CLI Toolkit",
            origin:  "Open Source",
            display: true,
            hero:    false,
            media:   [],
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
            id:      "capsule",
            name:    "Capsule",
            origin:  "Open Source",
            display: true,
            media:   [{ src: "/images/capsule.png", type: "image" }],
            abstract: { en: "Modular enclosure for prototyping boards" },
        },
        {
            id:      "stratum",
            name:    "Stratum",
            origin:  "Personal",
            display: true,
            media:   [{ src: "/images/stratum.png", type: "image" }],
            abstract: { en: "Configuration interface for sensor networks" },
        },
        {
            id:      "lichen",
            name:    "Lichen",
            origin:  "Client",
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
            id:        "atlas",
            name:      "Atlas",
            origin:    "Personal",
            years:     "2023–24",
            display:   true,
            hero:      true,
            hero_text: { fr: "En vedette", en: "Featured" },
            hero_icon: "star",
            media:     [{ src: "/images/atlas.jpg", type: "image" }],
            abstract:  { en: "Hardware design system for embedded devices" },
        },
        {
            id:      "meridian",
            name:    "Meridian",
            display: true,
            hero:    false,
            media:   [{ src: "/images/meridian.jpg", type: "image" }],
            abstract: { en: "Industrial supervision platform" },
        },
        {
            id:      "capsule",
            name:    "Capsule",
            display: true,
            hero:    false,
            media:   [{ src: "/images/capsule.jpg", type: "image" }],
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

<!-- Headline -->

<Headline size="md" uppercase>
    {trans?.tile_grid?.title ?? "Tile Grid"}
</Headline>

<!-- Controls -->

<div class="tg-controls">

    <div class="control-group">
        <span class="control-label">{trans?.tile_grid?.ctrl_mode ?? "Mode"}</span>
        <div class="control-options">
            {#each (["background", "none", "decorative"] as const) as m}
                <button
                    class="opt-btn"
                    class:opt-active={demo_mode === m}
                    onclick={() => set_mode(m)}
                >{m}</button>
            {/each}
        </div>
    </div>

    {#if demo_mode === "background"}
        <div class="control-group">
            <span class="control-label">{trans?.tile_grid?.ctrl_position ?? "Position"}</span>
            <div class="control-options">
                {#each bg_positions as pos}
                    <button
                        class="opt-btn"
                        class:opt-active={demo_position === pos}
                        onclick={() => demo_position = pos}
                    >{pos}</button>
                {/each}
            </div>
        </div>
    {/if}

    {#if demo_mode === "decorative"}
        <div class="control-group">
            <span class="control-label">{trans?.tile_grid?.ctrl_position ?? "Position"}</span>
            <div class="control-options">
                {#each deco_positions as pos}
                    <button
                        class="opt-btn"
                        class:opt-active={demo_position === pos}
                        onclick={() => demo_position = pos}
                    >{pos}</button>
                {/each}
            </div>
        </div>
    {/if}

    <div class="control-group">
        <span class="control-label">{trans?.tile_grid?.ctrl_columns ?? "Columns"}</span>
        <div class="control-options">
            {#each ([2, 3, 4] as Columns[]) as c}
                <button
                    class="opt-btn"
                    class:opt-active={demo_columns === c}
                    onclick={() => demo_columns = c}
                >{c}</button>
            {/each}
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">{trans?.tile_grid?.ctrl_hero_span ?? "Hero span"}</span>
        <div class="control-options">
            {#each (["half", "full"] as const) as s}
                <button
                    class="opt-btn"
                    class:opt-active={demo_hero_span === s}
                    onclick={() => demo_hero_span = s}
                >{s}</button>
            {/each}
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">{trans?.tile_grid?.ctrl_hero_badge ?? "Hero badge"}</span>
        <div class="control-options">
            <button 
                class="opt-btn" 
                class:opt-active={demo_hero_badge}  
                onclick={() => demo_hero_badge = true}
            >
                on
            </button>
            <button 
                class="opt-btn" 
                class:opt-active={!demo_hero_badge} 
                onclick={() => demo_hero_badge = false}
            >
                off
            </button>
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">{trans?.tile_grid?.ctrl_rounded ?? "Rounded"}</span>
        <div class="control-options">
            <button 
                class="opt-btn" 
                class:opt-active={demo_rounded}
                onclick={() => demo_rounded = true}
            >
                on
            </button>
            <button 
                class="opt-btn" 
                class:opt-active={!demo_rounded} 
                onclick={() => demo_rounded = false}
            >
                off
            </button>
        </div>
    </div>

</div>

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
        excerpt_length={52}
    />
</div>

<!-- ID info note -->

<div class="tg-id-note" role="note">
    <span class="material-symbols-outlined tg-id-note-icon" aria-hidden="true">info</span>
    <div class="tg-id-note-content">
        <strong class="tg-id-note-title">
            {trans?.tile_grid?.id_note_title ?? "Role of the identifier (id)"}
        </strong>
        <p class="tg-id-note-body">
            {trans?.tile_grid?.id_note}
        </p>
    </div>
</div>

<!-- Code examples — split layout -->

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

<style>
    /* Controls */

    .tg-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 2rem;
        margin-bottom: 1.5rem;
        padding: 1rem 1.25rem;
        background: var(--card);
        border-radius: 10px;
        border: 1.5px solid var(--highlight);
    }

    .control-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .control-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }

    .control-options {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
    }

    .opt-btn {
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        border: 1.5px solid var(--highlight);
        background: transparent;
        color: var(--text-muted);
        font-size: 0.72rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        text-transform: lowercase;
    }

    .opt-btn:hover { 
        border-color: var(--accent); 
        color: var(--accent); 
    }

    .opt-btn.opt-active {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    /* Preview */

    .tg-preview {
        background:    var(--bg);
        border:        1.5px solid var(--highlight);
        border-radius: 12px;
        padding:       1rem;
        margin-bottom: 1.5rem;
        overflow:      hidden;
    }

    /* ID note */

    .tg-id-note {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
        padding: 0.9rem 1.1rem;
        margin-bottom: 1.5rem;
        background: color-mix(in srgb, var(--accent) 10%, var(--card) 90%);
        border: 1.5px solid color-mix(in srgb, var(--accent) 30%, transparent);
        border-radius: 10px;
    }

    .tg-id-note-icon {
        font-size: 1.2rem;
        color: var(--accent);
        flex-shrink: 0;
        margin-top: 0.1rem;
    }

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
</style>
