<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
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
    type BtnVariant = "flat" | "outlined" | "ghost" | "textual";
    type BtnSize = "sm" | "md" | "lg";

    const layouts: readonly Layout[] = ["grid", "list", "tile"];

    // Standalone
    let s_layout: Layout = $state("grid");
    let s_cols: number = $state(3);
    let s_rounded: boolean = $state(true);

    // Tone
    let t_layout: Layout = $state("grid");
    let t_cols: number = $state(3);
    let t_rounded: boolean = $state(true);

    // Accent
    let a_layout: Layout = $state("grid");
    let a_cols: number = $state(3);
    let a_rounded: boolean = $state(true);

    // Borderless
    let b_layout: Layout = $state("grid");
    let b_cols: number = $state(3);
    let b_rounded: boolean = $state(true);

    // Interactive meta-demo
    let bar_visible: boolean = $state(true);
    let bar_palette: "tone" | "accent" | "accentbg" = $state("tone");
    let bar_bordered: boolean = $state(true);
    let bar_rounded: boolean = $state(false);
    let sel_palette: BtnPalette = $state("accent");
    let sel_variant: BtnVariant = $state("outlined");
    let sel_size: BtnSize = $state("sm");
    let sel_rounded: boolean = $state(true);
    let sel_uppercase: boolean = $state(false);
    let demo_layout: Layout = $state("grid");
    let demo_cols: number = $state(3);

    // Swatches
    let color: string = $state("#4a90d9");

    const bool_opts = $derived([
        { value: true,  label: placeholders?.selector?.opt_on  },
        { value: false, label: placeholders?.selector?.opt_off },
    ]);

    const swatch_colors = ["#4a90d9", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];

</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.selector_demo.title}</Headline>
</div>

<!-- Interactive meta-demo ───────────────────────────────────────────────── -->

<p class="demo-label">{placeholders?.selector?.sect_interactive}</p>

<ControlBar palette="tone">
    <Selector
        label={placeholders?.selector?.lbl_bar_visible}
        options={bool_opts}
        bind:value={bar_visible}
    />
    <Selector
        label={placeholders?.selector?.lbl_bar_palette}
        options={["tone", "accent", "accentbg"] as const}
        bind:value={bar_palette}
    />
    <Selector
        label={placeholders?.selector?.lbl_bar_bordered}
        options={bool_opts}
        bind:value={bar_bordered}
    />
    <Selector
        label={placeholders?.selector?.lbl_bar_rounded}
        options={bool_opts}
        bind:value={bar_rounded}
    />
    <Selector
        label={placeholders?.selector?.lbl_sel_palette}
        options={["accent", "tone", "neutral", "error", "warning", "success", "info"] as const}
        bind:value={sel_palette}
    />
    <Selector
        label={placeholders?.selector?.lbl_sel_variant}
        options={["flat", "outlined", "ghost", "textual"] as const}
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

{#if bar_visible}
    <ControlBar palette={bar_palette} bordered={bar_bordered} rounded={bar_rounded}>
        {#snippet header()}
            {placeholders?.selector?.header_interactive}
        {/snippet}
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
    </ControlBar>
{:else}
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
{/if}

<!-- Swatches ───────────────────────────────────────────────────────────── -->

<div data-summary="swatches" data-summary-label={trans?.doc.swatches ?? "Swatches"}>
<Headline size="sm" uppercase muted>{trans?.doc.swatches ?? "Swatches"}</Headline>
</div>
<p class="demo-label">{placeholders?.selector?.sect_swatches}</p>

<ControlBar palette="tone" rounded>
    {#snippet header()}
        <h4 class="header-demo">
            {placeholders?.selector?.selected_color}&nbsp;{color}
        </h4>
    {/snippet}
    <div class="swatch-picker">
        <span class="swatch-label">{placeholders?.selector?.lbl_color}</span>
        <div class="swatch-options">
            {#each swatch_colors as c}
                <Button
                    variant={color === c ? "flat" : "outlined"}
                    palette="neutral"
                    size="sm"
                    rounded
                    onclick={() => { color = c; }}
                >
                    <span class="swatch" style="background: {c}"></span>
                </Button>
            {/each}
        </div>
    </div>
</ControlBar>

<!-- CodeBlock ───────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: "tone",
            language: "Svelte",
            code:
`<ControlBar palette="tone">
    <Selector label="Layout"  options={["grid", "list", "tile"]} bind:value={layout}  />
    <Selector label="Columns" options={[2, 3, 4]} bind:value={cols} />
    <Selector label="Rounded" options={[
        { value: true,  label: "on"  },
        { value: false, label: "off" },
    ]} bind:value={rounded} />
</ControlBar>`
        },
        {
            label: "accent",
            language: "Svelte",
            code:
`<ControlBar palette="accent">
    <Selector label="Layout"  options={["grid", "list", "tile"]} bind:value={layout} />
    <Selector label="Columns" options={[2, 3, 4]} bind:value={cols} />
</ControlBar>`
        },
        {
            label: "header",
            language: "Svelte",
            code:
`<ControlBar palette="tone">
    {#snippet header()}
        Section title
    {/snippet}
    <Selector label="Layout"  options={["grid", "list", "tile"]} bind:value={layout} />
    <Selector label="Columns" options={[2, 3, 4]} bind:value={cols} />
</ControlBar>`
        },
        {
            label: "bordered={false}",
            language: "Svelte",
            code:
`<!-- bordered={false} — background keeped, external border deleted -->
<!-- Only header's border-bottom du header as separator -->
<ControlBar palette="tone" bordered={false}>
    {#snippet header()}
        Section title
    {/snippet}
    <Selector label="Layout"  options={["grid", "list", "tile"]} bind:value={layout} />
    <Selector label="Columns" options={[2, 3, 4]} bind:value={cols} />
</ControlBar>`
        },
        {
            label: "swatches",
            language: "Svelte",
            code:
`<!-- Swatch picker — use Button directly with children snippets -->
<script>
    import Button from "./Button.svelte";
    const colors = ["#4a90d9", "#e74c3c", "#2ecc71", "#f39c12"];
    let selected = $state("#4a90d9");
<\/script>

{#each colors as c}
    <Button
        variant={selected === c ? "flat" : "outlined"}
        palette="tone"
        size="sm"
        rounded
        onclick={() => { selected = c; }}
    >
        <span class="swatch" style="background: {c}"></span>
    </Button>
{/each}

<style>
    .swatch {
        display: inline-block;
        width: 12px; height: 12px;
        border-radius: 3px;
    }
</style>`
        },
        {
            label: "standalone",
            language: "Svelte",
            code:
`<!-- Standalone — no ControlBar, fallback design tokens -->
<Selector label="Mode" options={["grid", "list", "tile"]} bind:value={mode} />`
        },
    ]}
/>

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
</div>

<h4 class="api-subtitle">Selector</h4>
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
        { prop: "variant", type: '"flat" | "outlined" | "ghost" | "textual"', default: '"outlined"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"sm"' },
        { prop: "rounded", type: "boolean", default: "true" },
        { prop: "uppercase", type: "boolean", default: "false" },
        { prop: "direction", type: '"row" | "column"', default: '"row"' },
        { prop: "options", type: "readonly (T | OptionEntry)[]", default: "\u2014" },
        { prop: "value", type: "T", default: "\u2014" },
        { prop: "onchange", type: "(value: T) => void", default: "\u2014" },
    ]}
/>

<h4 class="api-subtitle">ControlBar</h4>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "header", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "palette", type: '"accent" | "tone" | "accentbg"', default: "\u2014" },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "bordered", type: "boolean", default: "true" },
    ]}
/>


<style>
    .demo-label {
        font-size:  0.8rem;
        color:      var(--text-muted);
        margin:     0.75rem 0 0.4rem;
        font-style: italic;
    }

    .standalone-row {
        display:       flex;
        flex-wrap:     wrap;
        gap:           1rem 2rem;
        margin-bottom: 1.5rem;
    }

    .header-demo {
        text-transform: uppercase;
        margin: 10px 0;
    }

    .swatch-picker {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .swatch-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--sel-label-color, var(--text-muted));
    }

    .swatch-options {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
    }

    .swatch {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 3px;
        flex-shrink: 0;
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }
</style>
