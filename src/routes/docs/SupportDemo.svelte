<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Support, 
        CodeBlock, 
        DataTable, 
        Selector, 
        ControlBar 
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ──────────────────────────────────────────────────────────

    type Fill = "accent" | "text-accent" | "text";
    type Size = "sm" | "md" | "lg";

    let demo_logo_fill: Fill = $state<Fill>("accent");
    let demo_text_fill: Fill = $state<Fill>("text");
    let demo_size: Size = $state<Size>("md");

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<Support />`;

    const code_custom = `<Support
    logo_fill="text-accent"
    text_fill="accent"
    size="lg"
/>`;

    const code_footer = `<!-- Typical footer usage — the component is a self-contained signature block. -->
<footer>
    <Support logo_fill="accent" text_fill="text" size="sm" />
</footer>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Support</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Logo fill"
        options={["accent", "text-accent", "text"]}
        bind:value={demo_logo_fill}
    />
    <Selector
        label="Text fill"
        options={["accent", "text-accent", "text"]}
        bind:value={demo_text_fill}
    />
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
</ControlBar>

<div class="support-preview">
    <Support
        logo_fill={demo_logo_fill}
        text_fill={demo_text_fill}
        size={demo_size}
    />
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
        { label: "Custom", code: code_custom, language: "Svelte" },
        { label: "Footer", code: code_footer, language: "Svelte" },
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
            { prop: "logo_fill", type: '"accent" | "text-accent" | "text"', default: '"accent"' },
            { prop: "text_fill", type: '"accent" | "text-accent" | "text"', default: '"text"' },
            { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        ]}
    />
</div>

<style>
    .support-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
        display: flex;
        justify-content: center;
    }
</style>
