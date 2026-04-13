<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Marquee from "../../design-system/components/Marquee/Marquee.svelte";
    import Badge from "../../design-system/components/Badge/Badge.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import Input from "../../design-system/components/Input/Input.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ──────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined" | "ghost";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Elevation = "none" | "subtle" | "hard";
    type Orientation = "horizontal" | "vertical";
    type Direction = "normal" | "reverse";
    type Fade = "none" | "start" | "end" | "both";

    let demo_variant: Variant = $state("ghost");
    let demo_palette: Palette = $state("tone");
    let demo_elevation: Elevation = $state("none");
    let demo_orientation: Orientation = $state("horizontal");
    let demo_direction: Direction = $state("normal");
    let demo_fade: Fade = $state("both");
    let demo_pause: boolean = $state(true);
    let demo_rounded: boolean = $state(false);

    let demo_duration_str: string = $state("25");
    let demo_repeat_str: string = $state("1");
    let demo_gap: string = $state("1rem");

    const demo_duration = $derived(Number(demo_duration_str) || 25);
    const demo_repeat = $derived(Math.max(1, Number(demo_repeat_str) || 1));

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    const chips = [
        { palette: "accent",  label: "Svelte" },
        { palette: "tone",    label: "TypeScript" },
        { palette: "success", label: "Vite" },
        { palette: "info",    label: "SvelteKit" },
        { palette: "warning", label: "ESLint" },
        { palette: "error",   label: "Prettier" },
        { palette: "neutral", label: "Playwright" },
    ] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<Marquee>
    <Badge>Svelte</Badge>
    <Badge palette="tone">TypeScript</Badge>
    <Badge palette="success">Vite</Badge>
    <Badge palette="info">SvelteKit</Badge>
    <Badge palette="warning">ESLint</Badge>
</Marquee>`;

    const code_vertical = `<!-- Vertical requires a bounded height on the parent -->
<div style="height: 240px;">
    <Marquee orientation="vertical" duration={20}>
        <Badge>v1.0.0</Badge>
        <Badge palette="success">v1.1.0</Badge>
        <Badge palette="info">v1.2.0</Badge>
    </Marquee>
</div>`;

    const code_modifiers = `<!-- Direction -->
<Marquee direction="reverse">...</Marquee>

<!-- Duration (seconds per loop — lower = faster) -->
<Marquee duration={10}>...</Marquee>

<!-- Repeat: duplicate children inside each group when content is
     narrower than the viewport, so the loop stays continuous -->
<Marquee repeat={4}>
    <Badge>A</Badge>
    <Badge>B</Badge>
</Marquee>

<!-- Fade mask -->
<Marquee fade="both">...</Marquee>
<Marquee fade="end">...</Marquee>

<!-- Pause on hover (default true) -->
<Marquee pauseOnHover={false}>...</Marquee>

<!-- Gap between items -->
<Marquee gap="2rem">...</Marquee>

<!-- Variant & palette -->
<Marquee variant="outlined" palette="accent" rounded>...</Marquee>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Marquee</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Variant"
        options={["ghost", "flat", "outlined"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "neutral", "error", "warning", "success", "info"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Orientation"
        options={["horizontal", "vertical"]}
        bind:value={demo_orientation}
    />
    <Selector
        label="Direction"
        options={["normal", "reverse"]}
        bind:value={demo_direction}
    />
    <Selector
        label="Fade"
        options={["none", "start", "end", "both"]}
        bind:value={demo_fade}
    />
    <Selector
        label="Pause on hover"
        options={bool_opts}
        bind:value={demo_pause}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />

    <div class="input-container">
        <Input
            type="number"
            label="Duration (s)"
            placeholder="25"
            size="sm"
            bind:value={demo_duration_str}
        />
    </div>

    <div class="input-container">
        <Input
            type="number"
            label="Repeat"
            placeholder="1"
            size="sm"
            bind:value={demo_repeat_str}
        />
    </div>

    <div class="input-container">
        <Input
            type="text"
            label="Gap"
            placeholder="1rem"
            size="sm"
            bind:value={demo_gap}
        />
    </div>
</ControlBar>

<div class="marquee-preview" class:marquee-preview-vertical={demo_orientation === "vertical"}>
    <Marquee
        variant={demo_variant}
        palette={demo_palette}
        elevation={demo_elevation}
        orientation={demo_orientation}
        direction={demo_direction}
        fade={demo_fade}
        pauseOnHover={demo_pause}
        rounded={demo_rounded}
        duration={demo_duration}
        repeat={demo_repeat}
        gap={demo_gap}
    >
        {#each chips as chip}
            <Badge palette={chip.palette} size="md">{chip.label}</Badge>
        {/each}
    </Marquee>
</div>

<!-- Usage ─────────────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage ?? "Usage"}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Basic", code: code_basic, language: "Svelte" },
        { label: "Vertical", code: code_vertical, language: "Svelte" },
        { label: "Modifiers", code: code_modifiers, language: "Svelte" },
    ]}
/>

<!-- API ───────────────────────────────────────────────────────────────────── -->

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
            { prop: "variant", type: '"flat" | "outlined" | "ghost"', default: '"ghost"' },
            { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"tone"' },
            { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"' },
            { prop: "direction", type: '"normal" | "reverse"', default: '"normal"' },
            { prop: "duration", type: "number", default: "25" },
            { prop: "repeat", type: "number", default: "1" },
            { prop: "pauseOnHover", type: "boolean", default: "true" },
            { prop: "fade", type: '"none" | "start" | "end" | "both"', default: '"both"' },
            { prop: "gap", type: "string", default: '"1rem"' },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "children", type: "Snippet", default: "required" },
        ]}
    />
</div>

<style>
    .marquee-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem 0;
        margin-bottom: 0.75rem;
    }

    .marquee-preview-vertical {
        height: 260px;
        padding: 0;
    }

    .input-container {
        width: 110px;
    }
</style>
