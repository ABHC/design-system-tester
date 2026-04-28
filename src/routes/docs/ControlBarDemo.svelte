<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Selector, 
        ControlBar, 
        Button, 
        Slider, 
        Input, 
        SearchField, 
        Switch, 
        CodeBlock, 
        DataTable 
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ─────────────────────────────────────────────────────────

    type Layout = "grid" | "list" | "tile";
    const layouts: readonly Layout[] = ["grid", "list", "tile"];

    // Meta-demo — controls the composition ControlBar below
    let bar_palette: "tone" | "accent" | "accentbg" = $state("tone");
    let bar_bordered: boolean = $state(true);
    let bar_rounded: boolean = $state(false);
    let bar_header: boolean = $state(true);

    // Composition state
    let demo_layout: Layout = $state("grid");
    let demo_cols: number = $state(3);
    let demo_opacity: number = $state(60);
    let demo_label_width: string = $state("120");
    let demo_search: string = $state("");
    let demo_notify: boolean = $state(true);

    // Swatches
    let color: string = $state("#4a90d9");
    const swatch_colors = ["#4a90d9", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];

    const bool_opts = $derived([
        { value: true,  label: placeholders?.control_bar?.opt_on  },
        { value: false, label: placeholders?.control_bar?.opt_off },
    ]);
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.control_bar_demo?.title}</Headline>
</div>

<!-- Interactive meta-demo ───────────────────────────────────────────────── -->

<p class="demo-label">{placeholders?.control_bar?.sect_interactive}</p>

<ControlBar palette="tone">
    <Selector
        label={placeholders?.control_bar?.lbl_bar_palette}
        options={["tone", "accent", "accentbg"] as const}
        bind:value={bar_palette}
    />
    <Selector
        label={placeholders?.control_bar?.lbl_bar_bordered}
        options={bool_opts}
        bind:value={bar_bordered}
    />
    <Selector
        label={placeholders?.control_bar?.lbl_bar_rounded}
        options={bool_opts}
        bind:value={bar_rounded}
    />
    <Selector
        label={placeholders?.control_bar?.lbl_bar_header}
        options={bool_opts}
        bind:value={bar_header}
    />
</ControlBar>

<!-- Composition — ControlBar hosting multiple component types ───────────── -->

<p class="demo-label">{placeholders?.control_bar?.sect_composition}</p>
{#snippet header_demo()}
    <span style="font-weight: bold;">
        {placeholders?.control_bar?.header_composition}
    </span>
{/snippet}

<ControlBar
    palette={bar_palette}
    bordered={bar_bordered}
    rounded={bar_rounded}
    leading={bar_header ? header_demo : undefined}
>
    <Selector
        label={placeholders?.control_bar?.lbl_layout}
        options={layouts}
        bind:value={demo_layout}
    />

    <Selector
        label={placeholders?.control_bar?.lbl_cols}
        options={[2, 3, 4]}
        bind:value={demo_cols}
    />

    <div class="slider-control">
        <span class="slider-label">{placeholders?.control_bar?.lbl_opacity}</span>
        <Slider
            palette="accent"
            size="sm"
            rounded
            min={0}
            max={100}
            step={5}
            bind:value={demo_opacity}
        />
    </div>

    <div class="input-control">
        <Input
            type="number"
            size="sm"
            label={placeholders?.control_bar?.lbl_width}
            placeholder="120"
            bind:value={demo_label_width}
        />
    </div>

    <div class="search-control">
        <span class="field-label">{placeholders?.control_bar?.lbl_search}</span>
        <SearchField
            size="sm"
            placeholder={placeholders?.control_bar?.ph_search}
            bind:value={demo_search}
        />
    </div>

    <div class="switch-control">
        <span class="field-label">{placeholders?.control_bar?.lbl_notify}</span>
        <Switch size="sm" bind:checked={demo_notify} />
    </div>

    <Button variant="flat" palette="accent" size="sm">
        {placeholders?.control_bar?.btn_apply}
    </Button>
</ControlBar>

<!-- Swatches ───────────────────────────────────────────────────────────── -->

<div data-summary="swatches" data-summary-label={trans?.doc.swatches}>
    <Headline size="sm" uppercase muted>{trans?.doc.swatches}</Headline>
</div>
<p class="demo-label">{placeholders?.control_bar?.sect_swatches}</p>

<ControlBar palette="tone">
    {#snippet leading()}
        <h4 class="header-demo">
            {placeholders?.control_bar?.selected_color}&nbsp;{color}
        </h4>
    {/snippet}
    <div class="swatch-picker">
        <span class="field-label">{placeholders?.control_bar?.lbl_color}</span>
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
`<!-- ControlBar is a generic container. Drop any control inside. -->
<ControlBar palette="tone">
    <Selector label="Layout"  options={["grid", "list", "tile"]} bind:value={layout} />
    <Selector label="Columns" options={[2, 3, 4]} bind:value={cols} />
</ControlBar>`
        },
        {
            label: "composition",
            language: "Svelte",
            code:
`<!-- Selector + Slider + Input + SearchField + Switch + Button — all in one -->
<ControlBar palette="tone" rounded>
    <Selector label="Layout" options={["grid", "list", "tile"]} bind:value={layout} />

    <div class="slider-control">
        <span class="slider-label">Opacity</span>
        <Slider size="sm" rounded bind:value={opacity} />
    </div>

    <Input type="number" size="sm" label="Width" bind:value={width} />

    <SearchField size="sm" placeholder="Search…" bind:value={query} />

    <Switch size="sm" bind:checked={notify} />

    <Button variant="flat" palette="accent" size="sm">Apply</Button>
</ControlBar>`
        },
        {
            label: "palettes",
            language: "Svelte",
            code:
`<!-- tone — card background -->
<ControlBar palette="tone"> … </ControlBar>

<!-- accent — accent-tinted background -->
<ControlBar palette="accent"> … </ControlBar>

<!-- accentbg — solid accent background -->
<ControlBar palette="accentbg"> … </ControlBar>`
        },
        {
            label: "header",
            language: "Svelte",
            code:
`<ControlBar palette="tone">
    {#snippet leading()}
        Section title
    {/snippet}
    <Selector label="Layout" options={layouts} bind:value={layout} />
</ControlBar>`
        },
        {
            label: "bordered={false}",
            language: "Svelte",
            code:
`<!-- Drops the outer border; header's bottom border acts as separator -->
<ControlBar palette="tone" bordered={false}>
    {#snippet leading()}
        Section title
    {/snippet}
    <Selector label="Layout" options={layouts} bind:value={layout} />
</ControlBar>`
        },
        {
            label: "swatches",
            language: "Svelte",
            code:
`<!-- Button composition inside a ControlBar header slot -->
<script>
    const colors = ["#4a90d9", "#e74c3c", "#2ecc71", "#f39c12"];
    let selected = $state("#4a90d9");
<\/script>

<ControlBar palette="tone">
    {#snippet leading()}
        Selected: {selected}
    {/snippet}
    {#each colors as c}
        <Button
            variant={selected === c ? "flat" : "outlined"}
            palette="neutral"
            size="sm"
            rounded
            onclick={() => { selected = c; }}
        >
            <span class="swatch" style="background: {c}"></span>
        </Button>
    {/each}
</ControlBar>`
        },
    ]}
/>

<!-- API ─────────────────────────────────────────────────────────────────── -->

<div data-summary="api" data-summary-label={trans?.doc.api}>
    <Headline size="sm" uppercase muted>{trans?.doc.api}</Headline>
</div>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "palette", type: '"accent" | "tone" | "accentbg"', default: '"tone"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "bordered", type: "boolean", default: "true" },
    ]}
/>


<style>
    .demo-label {
        font-size: 0.8rem;
        color: var(--spk-text-muted);
        margin: 0.75rem 0 0.4rem;
        font-style: italic;
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
        color: var(--sel-label-color, var(--spk-text-muted));
    }

    .input-control {
        width: 110px;
    }

    .search-control {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        min-width: 180px;
    }

    .switch-control {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .field-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--sel-label-color, var(--spk-text-muted));
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
</style>
