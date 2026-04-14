<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const hl = $derived(placeholders.headline);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Size = "xs" | "sm" | "md" | "lg";

    let demo_size: Size = $state("md");
    let demo_uppercase: boolean = $state(false);
    let demo_muted: boolean = $state(false);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<!-- size picks the underlying tag: lg→h1, md→h2, sm→h3, xs→span. -->
<Headline size="lg">Page title</Headline>
<Headline size="md">Section title</Headline>
<Headline size="sm">Subsection</Headline>
<Headline size="xs">Label</Headline>`;

    const code_uppercase = `<!-- uppercase + muted is the usual "subsection marker" combo. -->
<Headline size="sm" uppercase muted>
    Section
</Headline>`;

    const code_mixed = `<Headline size="lg">Welcome</Headline>
<Headline size="sm" uppercase muted>Getting started</Headline>
<p>...</p>
<Headline size="sm" uppercase muted>Components</Headline>
<p>...</p>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Headline</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Size"
        options={["xs", "sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Uppercase"
        options={bool_opts}
        bind:value={demo_uppercase}
    />
    <Selector
        label="Muted"
        options={bool_opts}
        bind:value={demo_muted}
    />
</ControlBar>

<div class="headline-preview">
    <Headline size={demo_size} uppercase={demo_uppercase} muted={demo_muted}>
        {hl.sample}
    </Headline>
</div>

<div data-summary="sizes" data-summary-label={trans?.doc.states ?? "Sizes"}>
    <Headline size="sm" uppercase muted>{hl.sizes_label}</Headline>
</div>

<div class="headline-preview headline-stack">
    <Headline size="lg">{hl.size_lg}</Headline>
    <Headline size="md">{hl.size_md}</Headline>
    <Headline size="sm">{hl.size_sm}</Headline>
    <Headline size="xs">{hl.size_xs}</Headline>
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
        { label: "Uppercase", code: code_uppercase, language: "Svelte" },
        { label: "Mixed", code: code_mixed, language: "Svelte" },
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
            { prop: "size", type: '"xs" | "sm" | "md" | "lg"', default: '"md"' },
            { prop: "uppercase", type: "boolean", default: "false" },
            { prop: "muted", type: "boolean", default: "false" },
            { prop: "children", type: "Snippet", default: "undefined" },
        ]}
    />
</div>

<style>
    .headline-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
    }

    .headline-stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
