<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ─────────────────────────────────────────────────────────

    type Layout = "grid" | "list" | "tile";
    type BtnPalette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type BtnVariant = "flat" | "outlined" | "ghost" | "naked";
    type BtnSize = "sm" | "md" | "lg";

    const layouts: readonly Layout[] = ["grid", "list", "tile"];

    // Interactive meta-demo
    let sel_palette: BtnPalette = $state("accent");
    let sel_variant: BtnVariant = $state("outlined");
    let sel_size: BtnSize = $state("sm");
    let sel_rounded: boolean = $state(false);
    let sel_uppercase: boolean = $state(false);
    let demo_layout: Layout = $state("grid");
    let demo_cols: number = $state(3);

    const bool_opts = $derived([
        { value: true,  label: placeholders?.selector?.opt_on  },
        { value: false, label: placeholders?.selector?.opt_off },
    ]);
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.selector_demo.title}</Headline>
</div>

<!-- Interactive meta-demo ───────────────────────────────────────────────── -->

<p class="demo-label">{placeholders?.selector?.sect_interactive}</p>

<ControlBar palette="tone">
    <Selector
        label={placeholders?.selector?.lbl_sel_palette}
        options={["accent", "tone", "neutral", "error", "warning", "success", "info"] as const}
        bind:value={sel_palette}
    />
    <Selector
        label={placeholders?.selector?.lbl_sel_variant}
        options={["flat", "outlined", "ghost", "naked"] as const}
        bind:value={sel_variant}
    />
    <Selector
        label={placeholders?.selector?.lbl_sel_size}
        options={["sm", "md", "lg"] as const}
        bind:value={sel_size}
    />
    <Selector
        label={placeholders?.selector?.lbl_sel_rounded}
        options={bool_opts}
        bind:value={sel_rounded}
    />
    <Selector
        label={placeholders?.selector?.lbl_sel_uppercase}
        options={bool_opts}
        bind:value={sel_uppercase}
    />
</ControlBar>

<div class="standalone-row">
    <Selector
        label={placeholders?.selector?.lbl_layout}
        palette={sel_palette}
        variant={sel_variant}
        size={sel_size}
        rounded={sel_rounded}
        uppercase={sel_uppercase}
        options={layouts}
        bind:value={demo_layout}
    />
    <Selector
        label={placeholders?.selector?.lbl_cols}
        palette={sel_palette}
        variant={sel_variant}
        size={sel_size}
        rounded={sel_rounded}
        uppercase={sel_uppercase}
        options={[2, 3, 4]}
        bind:value={demo_cols}
    />
</div>

<!-- Variants reference ──────────────────────────────────────────────────── -->

<div data-summary="variants" data-summary-label="Variants">
    <Headline size="sm" uppercase muted>Variants</Headline>
</div>

<p class="demo-label">{placeholders?.selector?.sect_variants}</p>

<div class="variants-grid">
    <div class="variant-cell">
        <span class="variant-label">flat</span>
        <Selector
            palette="accent"
            variant="flat"
            size="md"
            options={layouts}
            value="grid"
        />
    </div>
    <div class="variant-cell">
        <span class="variant-label">outlined</span>
        <Selector
            palette="accent"
            variant="outlined"
            size="md"
            options={layouts}
            value="grid"
        />
    </div>
    <div class="variant-cell">
        <span class="variant-label">ghost</span>
        <Selector
            palette="accent"
            variant="ghost"
            size="md"
            options={layouts}
            value="grid"
        />
    </div>
    <div class="variant-cell">
        <span class="variant-label">naked</span>
        <Selector
            palette="accent"
            variant="naked"
            size="md"
            options={layouts}
            value="grid"
        />
    </div>
</div>

<!-- CodeBlock ───────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: "basic",
            language: "Svelte",
            code:
`<Selector
    label="Layout"
    options={["grid", "list", "tile"]}
    bind:value={layout}
/>`
        },
        {
            label: "object options",
            language: "Svelte",
            code:
`<!-- Use { value, label } entries when the value and display differ -->
<Selector
    label="Status"
    options={[
        { value: true,  label: "on"  },
        { value: false, label: "off" },
    ]}
    bind:value={enabled}
/>`
        },
        {
            label: "styling",
            language: "Svelte",
            code:
`<Selector
    label="Mode"
    palette="accent"
    variant="flat"
    size="md"
    rounded
    uppercase
    options={["grid", "list", "tile"]}
    bind:value={mode}
/>`
        },
        {
            label: "variants",
            language: "Svelte",
            code:
`<!-- Variants map onto Button's variants -->
<Selector variant="flat"     options={opts} bind:value />
<Selector variant="outlined" options={opts} bind:value />
<Selector variant="ghost"    options={opts} bind:value />
<Selector variant="naked"    options={opts} bind:value />`
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
        { prop: "label", type: "string", default: "\u2014" },
        { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"accent"' },
        { prop: "variant", type: '"flat" | "outlined" | "ghost" | "naked"', default: '"outlined"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"sm"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "uppercase", type: "boolean", default: "false" },
        { prop: "direction", type: '"row" | "column"', default: '"row"' },
        { prop: "options", type: "readonly (T | OptionEntry)[]", default: "\u2014" },
        { prop: "value", type: "T", default: "\u2014" },
        { prop: "onchange", type: "(value: T) => void", default: "\u2014" },
    ]}
/>


<style>
    .demo-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin: 0.75rem 0 0.4rem;
        font-style: italic;
    }

    .standalone-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 2rem;
        margin-bottom: 1.5rem;
    }

    .variants-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
        gap: 1rem;
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
    }

    .variant-cell {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .variant-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }
</style>
