<script lang="ts">
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // -- Demo state -----------------------------------------------------------

    type Variant = "flat" | "outlined" | "ghost";
    type Palette = "accent" | "tone" | "neutral";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_variant: Variant = $state("flat");
    let demo_palette: Palette = $state("tone");
    let demo_size: Size = $state("md");
    let demo_elevation: Elevation = $state("none");
    let demo_rounded: boolean = $state(false);

    const bool_opts = [{ value: true, label: "yes" }, { value: false, label: "no" }] as const;

    // -- Sample data ----------------------------------------------------------

    const sample_columns = [
        { key: "name", label: "Prop" },
        { key: "type", label: "Type" },
        { key: "default", label: "Default" },
    ];

    const sample_rows = [
        { name: "variant", type: '"flat" | "outlined" | "ghost"', default: '"flat"' },
        { name: "palette", type: '"accent" | "tone" | "neutral"', default: '"tone"' },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { name: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { name: "rounded", type: "boolean", default: "false" },
        { name: "columns", type: "Column[]", default: "\u2014" },
        { name: "rows", type: "Record<string, any>[]", default: "\u2014" },
    ];

    // -- Code examples --------------------------------------------------------

    const code_basic = `<DataTable
    columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
    ]}
    rows={[
        { name: "Alice", role: "Engineer", status: "Active" },
        { name: "Bob", role: "Designer", status: "Away" },
    ]}
/>`;

    const code_snippet = `{#snippet codeCell(value)}
    <code>{value}</code>
{/snippet}

<DataTable
    columns={[
        { key: "name", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { name: "variant", type: '"flat" | "outlined"', default: '"flat"' },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
    ]}
/>`;

    const code_styled = `<DataTable
    variant="outlined"
    palette="accent"
    elevation="subtle"
    rounded
    columns={columns}
    rows={rows}
/>`;
</script>

<!-- Snippet for code-styled cells -->
{#snippet codeCell(value:string)}
    <code>{value}</code>
{/snippet}

<!-- -- Markup --------------------------------------------------------------- -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>DataTable</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone" rounded>
    <Selector
        label="Variant"
        options={["flat", "outlined", "ghost"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "neutral"]}
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
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
</ControlBar>

<!-- Live preview -->

<div class="datatable-preview">
    <DataTable
        variant={demo_variant}
        palette={demo_palette}
        size={demo_size}
        elevation={demo_elevation}
        rounded={demo_rounded}
        columns={[
            { key: "name", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={sample_rows}
    />
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
        { label: "Snippet", code: code_snippet, language: "Svelte" },
        { label: "Styled", code: code_styled, language: "Svelte" },
    ]}
/>

<!-- API table (using DataTable itself) -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>

    <h4 class="api-subtitle">DataTable</h4>
    <DataTable
        variant="ghost"
        palette="tone"
        size="sm"
        columns={[
            { key: "name", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={sample_rows}
    />

    <h4 class="api-subtitle">Column</h4>
    <DataTable
        variant="ghost"
        palette="tone"
        size="sm"
        columns={[
            { key: "name", label: "Property" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "required", label: "Required" },
        ]}
        rows={[
            { name: "key", type: "string", required: "yes" },
            { name: "label", type: "string", required: "yes" },
            { name: "cell", type: "Snippet<[any]>", required: "no" },
        ]}
    />
</div>

<style>
    .datatable-preview {
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }
</style>
