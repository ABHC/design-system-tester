<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        DataTable, 
        Headline,
        CodeBlock, 
        Selector, 
        ControlBar,
        Callout 
    } from "@abhc/spektral-ui";


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

    const code_cols = `
        import { DataTable } from "@spektral/ui";

        const columns = [
                { key: "id",     label: "ID",     width: "80px" },
                { key: "name",   label: "Nom",    width: "40%" },
                { key: "email",  label: "Email",  width: "40%" },
                { key: "status", label: "Statut", width: "120px" },
        ];

        const rows = [
                { id: 1, name: "Alice Martin",   email: "alice@example.com",   status: "Admin" },
                { id: 2, name: "Bruno Lefèvre",  email: "bruno@example.com",   status: "Guest" },
                { id: 3, name: "Camille Dupont", email: "camille@example.com", status: "Member" },
        ];

        <DataTable
            columns={columns}
            rows={rows}
        >`
</script>

<!-- Snippet for code-styled cells -->
{#snippet codeCell(value:string)}
    <code>{value}</code>
{/snippet}

<!-- -- Markup --------------------------------------------------------------- -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.data_table_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
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
        { label: "Aligned columns", code: code_cols, language: "Svelte" },
    ]}
/>

<div style="margin-bottom: 1rem;">
    <Callout variant="info">
        {#snippet leading()}
            <span class="material-symbols-outlined">lightbulb</span>
        {/snippet}
        {#snippet children()}
            <strong>{trans?.data_table_demo.column_callout}</strong>
            <br/>
            {trans?.data_table_demo.column1}<br />
            <br/>
            {trans?.data_table_demo.column2}<br />
            <br/>
            {trans?.data_table_demo.column3}<br />
        {/snippet}
    </Callout>
</div>

<!-- API table (using DataTable itself) -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
</div>

<h4 class="api-subtitle">DataTable</h4>
<DataTable
    variant="ghost"
    palette="tone"
    size="sm"
    columns={[
        { key: "name", label: "Prop", width:"20%"},
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width:"10%" },
    ]}
    rows={sample_rows}
/>

<h4 class="api-subtitle">Column</h4>
<DataTable
    variant="ghost"
    palette="tone"
    size="sm"
    columns={[
        { key: "name", label: "Property", width:"20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "required", label: "Required", width:"10%" },
    ]}
    rows={[
        { name: "key", type: "string", required: "yes" },
        { name: "label", type: "string", required: "yes" },
        { name: "width", type: "string", required: "no" },
        { name: "cell", type: "Snippet<[any]>", required: "no" },
    ]}
/>


<style>
    .datatable-preview {
        border: 2px solid var(--spk-tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--spk-tone-bg);
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--spk-text-muted);
    }
</style>
