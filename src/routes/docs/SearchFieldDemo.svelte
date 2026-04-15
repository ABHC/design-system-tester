<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import SearchField from "../../design-system/components/SearchField/SearchField.svelte";
    import Card from "../../design-system/components/Card/Card.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo controls ────────────────────────────────────────────────────

    type Size = "sm" | "md" | "lg";
    type Palette = "tone" | "accent" | "accentbg";

    let demo_size: Size = $state("md");
    let demo_palette: Palette = $state("tone");
    let demo_rounded: boolean = $state(false);
    let demo_naked: boolean = $state(false);
    let demo_clearable: boolean = $state(true);
    let demo_disabled: boolean = $state(false);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Demo values ──────────────────────────────────────────────────────

    let search_basic: string = $state("");
    let search_full: string = $state("");

    // ── Code examples ────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    let search: string = $state("");
<\/script>

<SearchField bind:value={search} placeholder="Search…" />`;

    const code_clearable = `<!-- clearable is true by default -->
<SearchField bind:value={search} clearable />

<!-- disable the clear button -->
<SearchField bind:value={search} clearable={false} />`;

    const code_sizes = `<SearchField bind:value={search} size="sm" />
<SearchField bind:value={search} size="md" />
<SearchField bind:value={search} size="lg" />`;

    const code_palettes = `<SearchField bind:value={search} palette="tone" />
<SearchField bind:value={search} palette="accent" />
<SearchField bind:value={search} palette="accentbg" />`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Markup ────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>{trans?.search_field_demo.title}</Headline>
</div>

<ControlBar palette="tone" rounded>
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "accentbg"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Naked"
        options={bool_opts}
        bind:value={demo_naked}
    />
    <Selector
        label="Clearable"
        options={bool_opts}
        bind:value={demo_clearable}
    />
    <Selector
        label="Disabled"
        options={bool_opts}
        bind:value={demo_disabled}
    />
</ControlBar>

<!-- Demo grid -->

<div class="demo-grid">
    <Card variant="flat" rounded elevation="subtle">
        {#snippet children()}
            <SearchField
                bind:value={search_basic}
                placeholder={placeholders.search_field.search_placeholder}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                clearable={demo_clearable}
                disabled={demo_disabled}
                naked={demo_naked}
            />

            <div class="demo-value">
                Value: <code>{search_basic || "(empty)"}</code>
            </div>
        {/snippet}
    </Card>
</div>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "basic", code: code_basic, language: "Svelte" },
        { label: "clearable", code: code_clearable, language: "Svelte" },
        { label: "sizes", code: code_sizes, language: "Svelte" },
        { label: "palettes", code: code_palettes, language: "Svelte" },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api}>
<Headline size="sm" uppercase muted>{trans?.doc.api}</Headline>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "value", type: "string", default: '""' },
        { prop: "placeholder", type: "string", default: '"Search..."' },
        { prop: "clearable", type: "boolean", default: "true" },
        { prop: "disabled", type: "boolean", default: "false" },
        { prop: "autofocus", type: "boolean", default: "false" },
        { prop: "naked", type: "boolean", default: "false" },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "palette", type: '"tone" | "accent" | "accentbg"', default: '"tone"' },
    ]}
/>
</div>

<style>
    .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
        gap: 1.25rem;
        margin-bottom: 0.75rem;
    }

    .demo-value {
        font-size: 0.8rem;
        color: var(--text-muted);
        padding: 0.5rem 0.6rem;
        background: var(--tone-bg);
        border-radius: 5px;
        margin-top: 0.5rem;
    }

    .demo-value code {
        color: var(--accent-muted);
        font-weight: 600;
    }

    @media (max-width: 500px) {
        .demo-grid { grid-template-columns: 1fr; }
    }
</style>
