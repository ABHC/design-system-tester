<script lang="ts">
    import Accordion from "../../design-system/components/Accordion/Accordion.svelte";
    import AccordionHeader from "../../design-system/components/Accordion/AccordionHeader.svelte";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const acc = $derived(placeholders.accordion);

    // -- Demo state -----------------------------------------------------------

    type Variant = "flat" | "outlined" | "ghost";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_variant: Variant = $state("ghost");
    let demo_palette: Palette = $state("tone");
    let demo_size: Size = $state("md");
    let demo_elevation: Elevation = $state("none");
    let demo_rounded: boolean = $state(false);

    const bool_opts = [{ value: true, label: "yes" }, { value: false, label: "no" }] as const;

    // -- Code examples --------------------------------------------------------

    const code_basic = `<Accordion variant="ghost" palette="tone">
    <AccordionHeader label="What is this design system?">
        <p>A collection of reusable Svelte components
        built with a token-based theming system.</p>
    </AccordionHeader>
    <AccordionHeader label="How do I install it?">
        <p>Clone the repository and run npm install.</p>
    </AccordionHeader>
</Accordion>`;

    const code_flat = `<Accordion variant="flat" palette="accent" rounded>
    <AccordionHeader label="Section one" open>
        <p>Content with colored header
        and neutral item background.</p>
    </AccordionHeader>
    <AccordionHeader label="Section two">
        <p>Another section.</p>
    </AccordionHeader>
</Accordion>`;

    const code_outlined = `<Accordion variant="outlined" palette="tone">
    <AccordionHeader label="Bordered section">
        <p>Each item gets its own border.</p>
    </AccordionHeader>
</Accordion>`;

    const code_icon = `{#snippet icon_star()}
    <span class="material-symbols-outlined">star</span>
{/snippet}

<Accordion variant="ghost" palette="accent">
    <AccordionHeader label="Favorites" icon={icon_star}>
        <p>Your favorite items appear here.</p>
    </AccordionHeader>
</Accordion>`;
</script>

<!-- -- Icon snippets -------------------------------------------------------- -->

{#snippet icon_help()}
    <span class="material-symbols-outlined">help</span>
{/snippet}

{#snippet icon_settings()}
    <span class="material-symbols-outlined">settings</span>
{/snippet}

{#snippet icon_info()}
    <span class="material-symbols-outlined">info</span>
{/snippet}

{#snippet icon_warning()}
    <span class="material-symbols-outlined">warning</span>
{/snippet}

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- -- Markup --------------------------------------------------------------- -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Accordion</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone" rounded>
    <Selector
        label="Variant"
        options={["ghost", "flat", "outlined"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "neutral", "error", "warning", "success", "info"]}
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

<div class="accordion-preview">
    <Accordion
        variant={demo_variant}
        palette={demo_palette}
        size={demo_size}
        elevation={demo_elevation}
        rounded={demo_rounded}
    >
        <AccordionHeader label={acc.q1_label} leading={icon_help} open>
            <p>{acc.q1_body}</p>
        </AccordionHeader>
        <AccordionHeader label={acc.q2_label} leading={icon_settings}>
            <p>{acc.q2_body}</p>
        </AccordionHeader>
        <AccordionHeader label={acc.q3_label} leading={icon_info}>
            <p>{acc.q3_body}</p>
        </AccordionHeader>
        <AccordionHeader label={acc.q4_label} leading={icon_warning} disabled>
            <p>{acc.q4_body}</p>
        </AccordionHeader>
    </Accordion>
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
        { label: "Flat", code: code_flat, language: "Svelte" },
        { label: "Outlined", code: code_outlined, language: "Svelte" },
        { label: "Icon", code: code_icon, language: "Svelte" },
    ]}
/>

<!-- API table -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>

    <h4 class="api-subtitle">Accordion</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "variant", type: '"flat" | "outlined" | "ghost"', default: '"ghost"' },
            { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"tone"' },
            { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
            { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "children", type: "Snippet", default: "\u2014" },
        ]}
    />

    <h4 class="api-subtitle">AccordionHeader</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "label", type: "string", default: "\u2014" },
            { prop: "icon", type: "Snippet", default: "undefined" },
            { prop: "open", type: "boolean", default: "false" },
            { prop: "disabled", type: "boolean", default: "false" },
            { prop: "children", type: "Snippet", default: "\u2014" },
        ]}
    />
</div>

<style>
    .accordion-preview {
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
    }

    .accordion-preview p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--text-muted);
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }
</style>
