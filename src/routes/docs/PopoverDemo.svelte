<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { PopoverPalette, PopoverElevation, PopoverDirection, PopoverAlign } from '@abhc/spektral-ui';
    import {
        Headline,
        Popover,
        Button,
        ListItem,
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

    // Demo state

    type Direction = "top" | "bottom" | "left" | "right";
    type Align = "start" | "center" | "end";
    type Palette = "tone" | "accent" | "accentbg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_direction: Direction = $state("bottom");
    let demo_align: Align = $state("start");
    let demo_palette: Palette = $state("tone");
    let demo_elevation: Elevation = $state("none");
    let demo_rounded: boolean = $state(false);

    let open_basic = $state(false);
    let open_menu = $state(false);
    let open_match = $state(false);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // Code examples

    const usage_basic = `<script>
    let open = $state(false);
<\/script>

<Popover
    bind:open
    onclose={() => { open = false; }}
    palette="tone"
    rounded
    elevation="subtle"
    direction="bottom"
    align="start"
>
    {#snippet trigger()}
        <Button onclick={() => { open = !open; }}>
            Open popover
        </Button>
    {/snippet}

    {#snippet children()}
        <p>Popover content here</p>
    {/snippet}
</Popover>`;

    const usage_direction = `<!-- Opens to the right, vertically centered -->
<Popover
    bind:open
    onclose={() => { open = false; }}
    direction="right"
    align="center"
    gap="12px"
    palette="accent"
    elevation="subtle"
>
    {#snippet trigger()}
        <Button onclick={() => { open = !open; }}>
            <span class="material-symbols-outlined">menu</span>
        </Button>
    {/snippet}

    {#snippet children()}
        <!-- sidebar-style menu -->
    {/snippet}
</Popover>`;

    const usage_width = `<!-- Fixed width popover -->
<Popover
    bind:open
    onclose={() => { open = false; }}
    width="300px"
    direction="bottom"
    align="end"
>
    {#snippet trigger()}
        <Button onclick={() => { open = !open; }}>Settings</Button>
    {/snippet}

    {#snippet children()}
        <!-- wide panel content -->
    {/snippet}
</Popover>`;

    const usage_match = `<!-- matchWidth: panel stretches to anchor width (used by Select) -->
<Popover
    bind:open
    onclose={() => { open = false; }}
    matchWidth
>
    {#snippet trigger()}
        <div class="custom-trigger">Choose an option</div>
    {/snippet}

    {#snippet children()}
        <!-- dropdown options matching trigger width -->
    {/snippet}
</Popover>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.popover_demo?.title ?? "Popover"}</Headline>
</div>

<p class="anchor-note">{@html trans?.popover_demo?.anchor_note ?? ""}</p>

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
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
</ControlBar>

<!-- Live preview -->
<div class="popover-preview">
    <div class="preview-center">
        <Popover
            bind:open={open_basic}
            onclose={() => { open_basic = false; }}
            direction={demo_direction}
            align={demo_align}
            palette={demo_palette}
            elevation={demo_elevation}
            rounded={demo_rounded}
        >
            {#snippet trigger()}
                <Button
                    variant="flat"
                    palette="accent"
                    onclick={() => { open_basic = !open_basic; }}
                >
                    {open_basic ? placeholders?.popover.close : placeholders?.popover.open}
                </Button>
            {/snippet}

            {#snippet children()}
                <div class="preview-content">
                    <ListItem
                        label="Option A"
                        palette="ghost"
                        size="sm"
                        onclick={() => { open_basic = false; }}
                    />
                    <ListItem
                        label="Option B"
                        palette="ghost"
                        size="sm"
                        onclick={() => { open_basic = false; }}
                    />
                    <ListItem
                        label="Option C"
                        palette="ghost"
                        size="sm"
                        onclick={() => { open_basic = false; }}
                    />
                </div>
            {/snippet}
        </Popover>
    </div>
</div>

<!-- Presets -->
<div class="preset-row">
    <div class="preset">
        <span class="preset-label">matchWidth</span>
        <Popover
            bind:open={open_match}
            onclose={() => { open_match = false; }}
            matchWidth
            palette="tone"
            rounded
        >
            {#snippet trigger()}
                <Button
                    variant="ghost"
                    palette="tone"
                    onclick={() => { open_match = !open_match; }}
                >
                    Select-style dropdown
                </Button>
            {/snippet}

            {#snippet children()}
                <ListItem
                    label={placeholders?.popover.match}
                    palette="ghost"
                    size="sm"
                    onclick={() => { open_match = false; }}
                />
            {/snippet}
        </Popover>
    </div>

    <div class="preset">
        <span class="preset-label">direction="right" + align="center"</span>
        <Popover
            bind:open={open_menu}
            onclose={() => { open_menu = false; }}
            direction="right"
            align="center"
            gap="10px"
            palette="accent"
            elevation="subtle"
            rounded
        >
            {#snippet trigger()}
                <Button
                    variant="flat"
                    palette="accent"
                    rounded
                    onclick={() => { open_menu = !open_menu; }}
                >
                    <span class="material-symbols-outlined">menu</span>
                </Button>
            {/snippet}

            {#snippet children()}
                <div class="preview-content">
                    <ListItem
                        label={placeholders?.popover.settings}
                        palette="ghost"
                        size="sm"
                        onclick={() => { open_menu = false; }}
                    />
                    <ListItem
                        label={placeholders?.popover.profile}
                        palette="ghost"
                        size="sm"
                        onclick={() => { open_menu = false; }}
                    />
                </div>
            {/snippet}
        </Popover>
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
        { label: "direction + align", code: usage_direction, language: "Svelte" },
        { label: "custom width", code: usage_width, language: "Svelte" },
        { label: "matchWidth", code: usage_match, language: "Svelte" },
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
            <code>import type &lbrace; PopoverPalette, PopoverElevation, PopoverDirection, PopoverAlign &rbrace; from '@abhc/spektral-ui';</code>
        {/snippet}
    </Callout>
</div>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "open", type: "boolean", default: "false" },
        { prop: "onclose", type: "() => void", default: "\u2014" },
        { prop: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
        { prop: "align", type: '"start" | "center" | "end"', default: '"start"' },
        { prop: "gap", type: "string", default: '"6px"' },
        { prop: "maxHeight", type: "string", default: '"320px"' },
        { prop: "width", type: "string", default: "\u2014" },
        { prop: "matchWidth", type: "boolean", default: "false" },
        { prop: "palette", type: '"tone" | "accent" | "accentbg"', default: '"tone"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "trigger", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
    ]}
/>


<style>
    .popover-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 280px;
        background: var(--tone-bg);
        border: 2px solid var(--tone-hover);
        overflow: visible;
        margin-bottom: 1.5rem;
        padding: 10px;
    }

    .preview-center {
        position: relative;
    }

    .preview-content {
        display: flex;
        flex-direction: column;
        min-width: 160px;
        padding: 4px;
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
        color: var(--text-muted);
    }

    .anchor-note {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-bottom: 1.5rem;
        line-height: 1.5;
    }
</style>
