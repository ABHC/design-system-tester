<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Slider, 
        CodeBlock, 
        DataTable, 
        Selector, 
        ControlBar, 
        Input 
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ──────────────────────────────────────────────────────────

    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_palette: Palette = $state("accent");
    let demo_size: Size = $state("md");
    let demo_elevation: Elevation = $state("none");
    let demo_outlined: boolean  = $state(false);
    let demo_rounded: boolean = $state(false);
    let demo_range:  boolean = $state(false);
    let demo_disabled: boolean = $state(false);

    let demo_value: number = $state(30);
    let demo_value_end: number = $state(70);
    let demo_min_str: string = $state("0");
    let demo_max_str: string = $state("100");
    let demo_step_str: string = $state("1");

    const demo_min = $derived(Number(demo_min_str) || 0);
    const demo_max = $derived(Number(demo_max_str) || 100);
    const demo_step = $derived(Number(demo_step_str) || 1);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<!-- Single value slider -->
<Slider value={30} />
<Slider value={50} palette="success" rounded />

<!-- All palettes -->
<Slider value={60} palette="accent" />
<Slider value={60} palette="tone" />
<Slider value={60} palette="error" />
<Slider value={60} palette="warning" />
<Slider value={60} palette="success" />
<Slider value={60} palette="info" />
<Slider value={60} palette="neutral" />`;

    const code_range = `<!-- Range mode: two thumbs -->
<Slider range value={20} value_end={80} />
<Slider range value={30} value_end={70} palette="info" rounded />`;

    const code_modifiers = `<!-- Size -->
<Slider value={50} size="sm" />
<Slider value={50} size="md" />
<Slider value={50} size="lg" />

<!-- Rounded -->
<Slider value={50} rounded />

<!-- Outlined -->
<Slider value={50} outlined />

<!-- Step -->
<Slider value={50} step={10} />

<!-- Disabled -->
<Slider value={50} disabled />`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>Slider</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Palette"
        options={["accent", "tone", "neutral", "error", "warning", "success", "info"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Outlined"
        options={bool_opts}
        bind:value={demo_outlined}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Range"
        options={bool_opts}
        bind:value={demo_range}
    />
    <Selector
        label="Disabled"
        options={bool_opts}
        bind:value={demo_disabled}
    />

    <div class="input-container">
        <Input
            type="number"
            label="Min"
            placeholder="0"
            size="sm"
            bind:value={demo_min_str}
        />
    </div>

    <div class="input-container">
        <Input
            type="number"
            label="Max"
            placeholder="100"
            size="sm"
            bind:value={demo_max_str}
        />
    </div>

    <div class="input-container">
        <Input
            type="number"
            label="Step"
            placeholder="1"
            size="sm"
            bind:value={demo_step_str}
        />
    </div>
</ControlBar>

<div class="slider-preview">
    <Slider
        palette={demo_palette}
        size={demo_size}
        elevation={demo_elevation}
        outlined={demo_outlined}
        rounded={demo_rounded}
        range={demo_range}
        disabled={demo_disabled}
        min={demo_min}
        max={demo_max}
        step={demo_step}
        bind:value={demo_value}
        bind:value_end={demo_value_end}
    />
</div>

<!-- Usage ─────────────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Basic", code: code_basic, language: "Svelte" },
        { label: "Range", code: code_range, language: "Svelte" },
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
            { prop: "value", type: "number", default: "0" },
            { prop: "value_end", type: "number", default: "100" },
            { prop: "range", type: "boolean", default: "false" },
            { prop: "min", type: "number", default: "0" },
            { prop: "max", type: "number", default: "100" },
            { prop: "step", type: "number", default: "1" },
            { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"accent"' },
            { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
            { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
            { prop: "outlined", type: "boolean", default: "false" },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "disabled", type: "boolean", default: "false" },
            { prop: "aria_label", type: "string", default: "undefined" },
        ]}
    />
</div>

<style>
    .slider-preview {
        border: 2px solid var(--tone-hover);
        padding: 2rem 1.5rem 1rem;
        margin-bottom: 0.75rem;
    }

    .input-container {
        width: 100px;
    }
</style>
