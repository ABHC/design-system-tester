<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { TooltipPalette, TooltipElevation, TooltipDirection, TooltipAlign, TooltipSize } from '@abhc/spektral-ui';
    import {
        Headline,
        Tooltip,
        Button,
        CopyButton,
        Callout,
        Selector,
        ControlBar,
        CodeBlock,
        DataTable
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    type Direction = "top" | "bottom" | "left" | "right";
    type Align = "start" | "center" | "end";
    type Palette = "tone" | "accent" | "accentbg";
    type Elevation = "none" | "subtle" | "hard";
    type Size = "sm" | "md" | "lg";

    let demo_direction: Direction = $state("bottom");
    let demo_align: Align = $state("center");
    let demo_palette: Palette = $state("tone");
    let demo_elevation: Elevation = $state("none");
    let demo_size: Size = $state("md");
    let demo_max_width: string = $state("260px");
    let demo_rounded: boolean = $state(false);
    let demo_bordered: boolean = $state(true);
    let demo_arrow: boolean = $state(true);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    const usage_basic = `<script>
    let open = $state(false);
<\/script>

<Tooltip
    bind:open
    palette="tone"
    direction="bottom"
    align="center"
    bordered
    arrow
>
    {#snippet trigger()}
        <Button>Hover me</Button>
    {/snippet}

    {#snippet children()}
        Hello from the tooltip.
    {/snippet}
</Tooltip>`;

    const usage_delays = `<!-- Custom show/hide delays, in ms -->
<Tooltip
    showDelay={200}
    hideDelay={0}
    palette="accent"
    elevation="subtle"
    rounded
>
    {#snippet trigger()}
        <Button palette="accent">Info</Button>
    {/snippet}

    {#snippet children()}
        Shows after 200ms, hides instantly.
    {/snippet}
</Tooltip>`;

    const usage_slots = `<!-- leading + trailing snippets -->
<Tooltip palette="tone" bordered arrow>
    {#snippet trigger()}
        <Button>Details</Button>
    {/snippet}

    {#snippet leading()}
        <span class="material-symbols-outlined">info</span>
    {/snippet}

    {#snippet children()}
        Generated API key
    {/snippet}

    {#snippet trailing()}
        <CopyButton to_copy="sk-demo-..." size="sm" />
    {/snippet}
</Tooltip>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>{trans?.tooltip_demo?.title}</Headline>
</div>

<p class="anchor-note">
    {@html trans?.tooltip_demo?.anchor_note ?? ""}
</p>

<!-- Interactive controls -->
<ControlBar palette="tone">
    <Selector
        label="Direction"
        options={["top", "bottom", "left", "right"]}
        bind:value={demo_direction}
    />
    <Selector
        label="Align"
        options={["start", "center", "end"]}
        bind:value={demo_align}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "accentbg"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Max width"
        options={["160px", "260px", "400px", "none"]}
        bind:value={demo_max_width}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Bordered"
        options={bool_opts}
        bind:value={demo_bordered}
    />
    <Selector
        label="Arrow"
        options={bool_opts}
        bind:value={demo_arrow}
    />
</ControlBar>

<!-- Live preview -->
<div class="tooltip-preview">
    <div class="preview-center">
        <Tooltip
            direction={demo_direction}
            align={demo_align}
            palette={demo_palette}
            size={demo_size}
            maxWidth={demo_max_width}
            elevation={demo_elevation}
            rounded={demo_rounded}
            bordered={demo_bordered}
            arrow={demo_arrow}
        >
            {#snippet trigger()}
                <Button variant="flat" palette="accent">
                    {placeholders?.tooltip?.trigger}
                </Button>
            {/snippet}

            {#snippet children()}
                {placeholders?.tooltip?.body}
            {/snippet}
        </Tooltip>
    </div>
</div>

<!-- Presets -->
<div class="preset-row">
    <div class="preset">
        <span class="preset-label">{trans?.tooltip_demo?.preset_sm}</span>
        <Tooltip palette="accentbg" size="sm" arrow={false} bordered={false}>
            {#snippet trigger()}
                <Button variant="ghost" palette="tone" size="sm">
                    <span class="material-symbols-outlined">help</span>
                </Button>
            {/snippet}
            {#snippet children()}{placeholders?.tooltip?.short_hint}{/snippet}
        </Tooltip>
    </div>

    <div class="preset">
        <span class="preset-label">{trans?.tooltip_demo?.preset_lg}</span>
        <Tooltip
            palette="accent"
            size="lg"
            rounded
            elevation="subtle"
            direction="right"
            align="center"
        >
            {#snippet trigger()}
                <Button variant="flat" palette="accent" rounded>
                    <span class="material-symbols-outlined">menu</span>
                </Button>
            {/snippet}
            {#snippet children()}{placeholders?.tooltip?.large_body}{/snippet}
        </Tooltip>
    </div>

    <div class="preset">
        <span class="preset-label">{trans?.tooltip_demo?.preset_leading}</span>
        <Tooltip
            palette="tone"
            direction="bottom"
            align="center"
            bordered
            arrow
        >
            {#snippet trigger()}
                <Button variant="outlined" palette="tone">
                    {placeholders?.tooltip?.help_label}
                </Button>
            {/snippet}
            {#snippet leading()}
                <span class="material-symbols-outlined">info</span>
            {/snippet}
            {#snippet children()}{placeholders?.tooltip?.leading_body}{/snippet}
        </Tooltip>
    </div>

    <div class="preset">
        <span class="preset-label">{trans?.tooltip_demo?.preset_trailing}</span>
        <Tooltip
            palette="accentbg"
            direction="top"
            align="end"
            bordered
            arrow
            rounded
        >
            {#snippet trigger()}
                <Button variant="flat" palette="accent">
                    <span class="material-symbols-outlined">key</span>
                </Button>
            {/snippet}
            {#snippet children()}{placeholders?.tooltip?.trailing_body}{/snippet}
            {#snippet trailing()}
                <CopyButton to_copy={placeholders?.tooltip?.api_key} size="sm" />
            {/snippet}
        </Tooltip>
    </div>
</div>

<!-- Code examples -->
<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "basic", code: usage_basic, language: "Svelte" },
        { label: "delays", code: usage_delays, language: "Svelte" },
        { label: "leading + trailing", code: usage_slots, language: "Svelte" },
    ]}
/>

<!-- API -->
<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
</div>

<div style="margin-bottom: 1rem;">
    <Callout variant="info">
        {#snippet leading()}
            <span class="material-symbols-outlined">package_2</span>
        {/snippet}
        {#snippet children()}
            {trans?.doc.types_notice}<br />
            <code>import type &lbrace; TooltipPalette, TooltipElevation, TooltipDirection, TooltipAlign, TooltipSize &rbrace; from '@abhc/spektral-ui';</code>
        {/snippet}
    </Callout>
</div>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "open", type: "boolean", default: "false" },
        { prop: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
        { prop: "align", type: '"start" | "center" | "end"', default: '"center"' },
        { prop: "gap", type: "string", default: '"8px"' },
        { prop: "maxWidth", type: "string", default: '"320px"' },
        { prop: "showDelay", type: "number", default: "120" },
        { prop: "hideDelay", type: "number", default: "80" },
        { prop: "palette", type: '"tone" | "accent" | "accentbg"', default: '"tone"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "bordered", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "arrow", type: "boolean", default: "false" },
        { prop: "trigger", type: "Snippet", default: "\u2014" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
    ]}
/>


<style>
    .tooltip-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 260px;
        background: var(--spk-tone-bg);
        border: 2px solid var(--spk-tone-hover);
        overflow: visible;
        margin-bottom: 1.5rem;
        padding: 10px;
    }

    .preview-center {
        position: relative;
    }

    .preset-row {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
    }

    .preset {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .preset-label {
        font-size: 0.75rem;
        font-family: monospace;
        color: var(--spk-text-muted);
    }

    .anchor-note {
        font-size: 0.875rem;
        color: var(--spk-text-muted);
        margin-bottom: 1.5rem;
        line-height: 1.5;
    }
</style>
