<script lang="ts">
    import Hero from "../../design-system/components/Hero/Hero.svelte";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import Slider from "../../design-system/components/Slider/Slider.svelte";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { PatternPreset } from "../../design-system/utils/patterns";

    interface Props {
        trans: Translation | null;
        placeholders?: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans }: Props = $props();

    // ── Demo state ──────────────────────────────────────────────────────────

    type Layout = "single" | "two-cols" | "two-rows" | "main-left" | "main-right" | "grid-2x2";
    type Palette = "transparent" | "tone" | "accent" | "accent-bg";
    type Effect = "none" | "glow" | "blur" | "fade";
    type Mask = "none" | "ellipse" | "fade";
    type MaskDirection = "top" | "bottom" | "left" | "right";

    let demo_layout: Layout = $state("single");
    let demo_palette: Palette = $state("transparent");
    let demo_pattern: PatternPreset = $state("none");
    let demo_pattern_color: string = $state("white");
    let demo_pattern_size: string = $state("auto");
    let demo_pattern_opacity: number = $state(60);
    let demo_pattern_effect: Effect = $state("none");
    let demo_pattern_effect_opacity: number = $state(100);
    let demo_pattern_mask: Mask = $state("none");
    let demo_pattern_mask_direction: MaskDirection = $state("top");
    let demo_pattern_mask_size: number = $state(70);

    const color_opts = [
        { value: "white", label: "white" },
        { value: "black", label: "black" },
        { value: "#aea03f", label: "gold" },
        { value: "#c0392b", label: "red" },
        { value: "#2c7a7b", label: "teal" },
    ] as const;

    const size_opts = [
        { value: "auto", label: "auto" },
        { value: "40px", label: "40" },
        { value: "60px", label: "60" },
        { value: "80px", label: "80" },
        { value: "120px", label: "120" },
    ] as const;

    // ── Code example ────────────────────────────────────────────────────────

    const code_basic = `<Hero
    layout="single"
    palette="transparent"
    pattern="scallops"
    pattern_effect="glow"
    pattern_mask="ellipse"
    height="85dvh"
>
    {#snippet cell_1()}
        <div class="hero-content">
            <Headline size="lg" uppercase>Spektral UI</Headline>
            <p>A composable design system</p>
            <Button palette="accent" href="/docs">Get started</Button>
        </div>
    {/snippet}
</Hero>`;

    const code_split = `<Hero layout="main-left" palette="tone" gap="1rem">
    {#snippet cell_1()}
        <div class="cell-main">Main content</div>
    {/snippet}
    {#snippet cell_2()}
        <div class="cell-sub">Top right</div>
    {/snippet}
    {#snippet cell_3()}
        <div class="cell-sub">Bottom right</div>
    {/snippet}
</Hero>`;

    const code_grid = `<Hero layout="grid-2x2" palette="accent-bg" gap="0.5rem">
    {#snippet cell_1()}<div>One</div>{/snippet}
    {#snippet cell_2()}<div>Two</div>{/snippet}
    {#snippet cell_3()}<div>Three</div>{/snippet}
    {#snippet cell_4()}<div>Four</div>{/snippet}
</Hero>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Reusable demo cell snippets ─────────────────────────────────────────── -->

{#snippet cell_labelled(label: string)}
    <div class="demo-cell demo-cell-label">
        <span class="demo-cell-index">{label}</span>
    </div>
{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Hero</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector
        label="Layout"
        options={[
            "single", 
            "two-cols", 
            "two-rows", 
            "main-left", 
            "main-right", 
            "grid-2x2"
        ]}
        bind:value={demo_layout}
    />
    <Selector
        label="Palette"
        options={["transparent", "tone", "accent", "accent-bg"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Pattern"
        options={[
            "none", 
            "grid", 
            "scallops", 
            "lozenge",
            "sunburst", 
            "sunrise", 
            "atoms", 
            "prisms",
            "complex",
            "chevrons",
        ]}
        bind:value={demo_pattern}
    />
    <Selector
        label="Pattern color"
        options={color_opts}
        bind:value={demo_pattern_color}
    />
    <Selector
        label="Pattern size"
        options={size_opts}
        bind:value={demo_pattern_size}
    />
    <div class="slider-control">
        <span class="slider-label">Pattern opacity</span>
        <Slider
            palette="accent"
            size="sm"
            rounded
            min={0}
            max={100}
            step={5}
            bind:value={demo_pattern_opacity}
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
            max={100}
            step={5}
            bind:value={demo_pattern_effect_opacity}
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
        />
    </div>
</ControlBar>

<!-- Live preview -->

<div class="hero-preview">
    <Hero
        layout={demo_layout}
        palette={demo_palette}
        pattern={demo_pattern}
        pattern_color={demo_pattern_color}
        pattern_opacity={demo_pattern_opacity / 100}
        pattern_size={demo_pattern_size === "auto" ? undefined : demo_pattern_size}
        pattern_effect={demo_pattern_effect}
        pattern_effect_opacity={demo_pattern_effect_opacity / 100}
        pattern_mask={demo_pattern_mask}
        pattern_mask_direction={demo_pattern_mask_direction}
        pattern_mask_size={demo_pattern_mask_size}
        height="60dvh"
        gap="0.5rem"
    >
        {#snippet cell_1()}{@render cell_labelled("cell_1")}{/snippet}
        {#snippet cell_2()}{@render cell_labelled("cell_2")}{/snippet}
        {#snippet cell_3()}{@render cell_labelled("cell_3")}{/snippet}
        {#snippet cell_4()}{@render cell_labelled("cell_4")}{/snippet}
    </Hero>
</div>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage ?? "Usage"}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Basic", code: code_basic, language: "Svelte" },
        { label: "Main + Split", code: code_split, language: "Svelte" },
        { label: "Grid 2x2", code: code_grid, language: "Svelte" },
    ]}
/>

<!-- API -->

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
            { prop: "layout", type: '"single" | "two-cols" | "two-rows" | "main-left" | "main-right" | "grid-2x2"', default: '"single"' },
            { prop: "palette", type: '"transparent" | "tone" | "accent" | "accent-bg"', default: '"transparent"' },
            { prop: "pattern", type: '"none" | "grid" | "scallops" | "chevrons" | "sunburst" | "sunrise" | "atoms" | "complex" | "prisms" | "lozenge"', default: '"none"' },
            { prop: "pattern_color", type: "string", default: '"white"' },
            { prop: "pattern_opacity", type: "number", default: "0.6" },
            { prop: "pattern_size", type: "string", default: "undefined" },
            { prop: "pattern_effect", type: '"none" | "glow" | "blur" | "fade"', default: '"none"' },
            { prop: "pattern_effect_opacity", type: "number", default: "1" },
            { prop: "pattern_mask", type: '"none" | "ellipse" | "fade"', default: '"none"' },
            { prop: "pattern_mask_direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
            { prop: "pattern_mask_size", type: "number", default: "70" },
            { prop: "height", type: "string", default: '"85dvh"' },
            { prop: "gap", type: "string", default: '"0"' },
            { prop: "cell_1", type: "Snippet", default: "\u2014" },
            { prop: "cell_2", type: "Snippet", default: "\u2014" },
            { prop: "cell_3", type: "Snippet", default: "\u2014" },
            { prop: "cell_4", type: "Snippet", default: "\u2014" },
        ]}
    />
</div>

<style>
    .hero-preview {
        border: 2px solid var(--tone-hover);
        padding: 0;
        margin-bottom: 0.75rem;
        overflow: hidden;
    }

    /* ── Demo cells ───────────────────────────────────────────────────────── */

    .demo-cell {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        gap: 1rem;
    }

    .demo-cell-label {
        outline: 1px dashed color-mix(in oklch, var(--text) 20%, transparent);
        outline-offset: -8px;
    }

    .demo-cell-index {
        font-family: monospace;
        font-size: 0.875rem;
        color: var(--text-muted);
        letter-spacing: 0.5px;
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
