<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Nav from "../design-system/components/Nav/Nav.svelte";
    import type { NavItem } from "../design-system/components/Nav/Nav.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    // ── Props ────────────────────────────────────────────────────────────────

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo configuration state ─────────────────────────────────────────────

    type Layout    = "row" | "column";
    type Direction = "top" | "bottom" | "left" | "right";
    type Palette   = "accent" | "tone";
    type Position  = "fixed" | "sticky";

    let demo_layout:    Layout    = $state("column");
    let demo_direction: Direction = $state("left");
    let demo_palette:   Palette   = $state("accent");
    let demo_position:  Position  = $state("sticky");

    // Active item tracking for demo purposes
    let active_index = $state(0);

    // ── Demo items ───────────────────────────────────────────────────────────

    const demo_items: NavItem[] = [
        {
            icon:    "design_services",
            label:   trans?.menu?.hardware ?? "Design",
            onclick: () => { active_index = 0; },
        },
        {
            icon:    "code",
            label:   trans?.menu?.software ?? "Apps",
            onclick: () => { active_index = 1; },
        },
        {
            icon:    "palette",
            label:   trans?.menu?.visuals ?? "Visuals",
            onclick: () => { active_index = 2; },
        },
        {
            icon:    "article_person",
            label:   trans?.menu?.about ?? "About",
            onclick: () => { active_index = 3; },
        },
    ];

    // Inject reactive active state
    const items_with_active = $derived(
        demo_items.map((item, i) => ({ ...item, active: i === active_index }))
    );

    // ── Code snippets ─────────────────────────────────────────────────────────

    const usage_column_accent = `<Nav
    layout="column"
    position="fixed"
    direction="left"
    palette="accent"
    items={[
        { icon: "design_services", label: "Design",  onclick: () => {} },
        { icon: "code",            label: "Apps",    onclick: () => {} },
        { icon: "palette",         label: "Visuals", onclick: () => {} },
        { icon: "article_person",  label: "About",   onclick: () => {} },
    ]}
/>`;

    const usage_row_tone = `<Nav
    layout="row"
    position="fixed"
    direction="bottom"
    palette="tone"
    items={[
        { icon: "design_services", label: "Design",  onclick: () => {} },
        { icon: "code",            label: "Apps",    onclick: () => {} },
        { icon: "palette",         label: "Visuals", onclick: () => {} },
        { icon: "article_person",  label: "About",   onclick: () => {} },
    ]}
/>`;

    const usage_with_slots = `<Nav
    layout="column"
    position="fixed"
    direction="right"
    palette="accent"
    items={navItems}
>
    {#snippet header()}
        <img src="logo.svg" alt="Logo" />
    {/snippet}

    {#snippet footer()}
        <Button variant="nav" onclick={toggleTheme}>
            <span class="nav-icon material-symbols-outlined">dark_mode</span>
            <span class="nav-label">Theme</span>
        </Button>
    {/snippet}
</Nav>`;
</script>

<Headline size="md" uppercase>
    {trans?.nav?.title ?? "🧭 Navigation"}
</Headline>

<!-- ── Interactive controls ────────────────────────────────────────────────── -->
<div class="nav-controls">
    <div class="control-group">
        <span class="control-label">Layout</span>
        <div class="control-options">
            <button
                class="opt-btn"
                class:opt-active={demo_layout === "column"}
                onclick={() => demo_layout = "column"}
            >
                column
            </button>
            <button
                class="opt-btn"
                class:opt-active={demo_layout === "row"}
                onclick={() => demo_layout = "row"}
            >
                row
            </button>
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">Position</span>
        <div class="control-options">
            <button
                class="opt-btn"
                class:opt-active={demo_position === "sticky"}
                onclick={() => demo_position = "sticky"}
            >
                sticky
            </button>
            <button
                class="opt-btn"
                class:opt-active={demo_position === "fixed"}
                onclick={() => demo_position = "fixed"}
            >
                fixed
            </button>
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">Direction</span>
        <div class="control-options">
            {#each ["top", "bottom", "left", "right"] as dir}
                <button
                    class="opt-btn"
                    class:opt-active={demo_direction === dir}
                    onclick={() => demo_direction = dir as Direction}
                >
                    {dir}
                </button>
            {/each}
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">Palette</span>
        <div class="control-options">
            <button
                class="opt-btn"
                class:opt-active={demo_palette === "accent"}
                onclick={() => demo_palette = "accent"}
            >
                accent
            </button>
            <button
                class="opt-btn"
                class:opt-active={demo_palette === "tone"}
                onclick={() => demo_palette = "tone"}
            >
                tone
            </button>
        </div>
    </div>
</div>

<!-- ── Live preview container ─────────────────────────────────────────────── -->
<!-- The preview box simulates a viewport so sticky/column navs make sense    -->
<div
    class="nav-preview"
    class:preview-row={demo_layout === "row"}
    class:preview-column={demo_layout === "column"}
>
    <div class="preview-content-mock">
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
    </div>

    <!--
        In the demo we always use position="sticky" so the nav stays inside
        the preview box. When the user selects "fixed", we show a note instead
        of breaking the layout.
    -->
    {#if demo_position === "sticky"}
        <Nav
            layout={demo_layout}
            position="sticky"
            direction={demo_direction}
            palette={demo_palette}
            items={items_with_active}
        />
    {:else}
        <!-- Fixed mode: render the nav normally but show an info badge -->
        <Nav
            layout={demo_layout}
            position="sticky"
            direction={demo_direction}
            palette={demo_palette}
            items={items_with_active}
        />
        <div class="fixed-note">
            ℹ️ position="fixed" is active — in production the nav overlays the viewport.
            Preview uses sticky for layout safety.
        </div>
    {/if}
</div>

<!-- ── Code examples ──────────────────────────────────────────────────────── -->
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label:    "column + accent",
            code:     usage_column_accent,
            language: "Svelte"
        },
        {
            label:    "row + tone",
            code:     usage_row_tone,
            language: "Svelte"
        },
        {
            label:    "with slots",
            code:     usage_with_slots,
            language: "Svelte"
        },
    ]}
/>

<style>
    /* ── Controls row ─────────────────────────────────────────────────────── */
    .nav-controls {
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

    /* ── Preview box ──────────────────────────────────────────────────────── */
    .nav-preview {
        position: relative;
        min-height: 200px;
        background: var(--bg);
        border: 1.5px solid var(--highlight);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1.5rem;
        padding: 1rem;
    }

    /* Column nav: place mock content to the right of the nav */
    .preview-column {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.5rem;
    }

    /* Row nav: place mock content above or below */
    .preview-row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }

    /* Skeleton content placeholder */
    .preview-content-mock {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 0.5rem;
    }

    .mock-line {
        height: 10px;
        background: var(--highlight);
        border-radius: 4px;
        width: 100%;
    }

    .mock-line.short {
        width: 60%;
    }

    /* Fixed mode notice */
    .fixed-note {
        font-size: 0.72rem;
        color: var(--text-muted);
        padding: 0.4rem 0.75rem;
        background: var(--card);
        border-radius: 6px;
        border: 1px solid var(--highlight);
        margin-top: 0.5rem;
        text-align: center;
    }
</style>