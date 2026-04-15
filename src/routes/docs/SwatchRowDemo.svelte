<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import SwatchRow from "../../design-system/components/SwatchRow/SwatchRow.svelte";
    import type { Swatch } from "../../design-system/components/SwatchRow/swatchRow.config";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const sr = $derived(placeholders.swatch_row);

    // ── Demo state ──────────────────────────────────────────────────────────

    let demo_compact: boolean = $state(false);
    let demo_rounded: boolean = $state(false);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Swatch sets ─────────────────────────────────────────────────────────

    const surfaces: Swatch[] = $derived([
        { 
            label: sr.surface_bg,
            value: "var(--bg)", 
            bg: "var(--bg)", 
            color: "var(--text)" 
        },
        { 
            label: sr.surface_tone, 
            value: "var(--tone)",
            bg: "var(--tone)", 
            color: "var(--text)" 
        },
        { 
            label: sr.surface_card, 
            value: "var(--card)", 
            bg: "var(--card)", 
            color: "var(--text)" 
        },
    ]);

    const accents: Swatch[] = $derived([
        { 
            label: sr.accent_main, 
            value: "var(--accent)", 
            bg: "var(--accent)", 
            color: "var(--text-accent)" 
        },
        { 
            label: sr.accent_hover, 
            value: "var(--accent-hover)", 
            bg: "var(--accent-hover)", 
            color: "var(--text-accent)" 
        },
        { 
            label: sr.accent_muted, 
            value: "var(--accent-muted)", 
            bg: "var(--accent-muted)", 
            color: "var(--text-accent)" 
        },
    ]);

    const text_on_tone: Swatch[] = $derived([
        { 
            label: sr.text_main, 
            value: "var(--text)", 
            bg: "var(--tone)", 
            color: "var(--text)", 
            isText: true 
        },
        { 
            label: sr.text_muted, 
            value: "var(--text-muted)", 
            bg: "var(--tone)", 
            color: "var(--text-muted)", 
            isText: true 
        },
    ]);

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<script>
    import type { Swatch } from "./SwatchRow/swatchRow.config";
    import SwatchRow from "./SwatchRow/SwatchRow.svelte";

    const swatches: Swatch[] = [
        { label: "Background", value: "var(--bg)", bg: "var(--bg)", color: "var(--text)" },
        { label: "Tone", value: "var(--tone)", bg: "var(--tone)", color: "var(--text)" },
        { label: "Card", value: "var(--card)", bg: "var(--card)", color: "var(--text)" },
    ];
<\/script>

<SwatchRow {swatches} />`;

    const code_text = `<!-- isText: true displays a large Aa sample on the swatch. -->
<SwatchRow swatches={[
    { label: "Text", value: "var(--text)", bg: "var(--tone)", color: "var(--text)", isText: true },
    { label: "Muted", value: "var(--text-muted)", bg: "var(--tone)", color: "var(--text-muted)", isText: true },
]} />`;

    const code_compact = `<!-- compact shrinks padding, font size and gaps for dense lists. -->
<SwatchRow compact {swatches} />`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>SwatchRow</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Compact"
        options={bool_opts}
        bind:value={demo_compact}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
</ControlBar>

<div class="swatch-row-preview">
    <div class="swatch-group">
        <span class="swatch-group-label">{sr.group_surfaces}</span>
        <SwatchRow 
            swatches={surfaces} 
            compact={demo_compact} 
            rounded={demo_rounded}
        />
    </div>

    <div class="swatch-group">
        <span class="swatch-group-label">{sr.group_accents}</span>
        <SwatchRow 
            swatches={accents} 
            compact={demo_compact} 
            rounded={demo_rounded}
        />
    </div>

    <div class="swatch-group">
        <span class="swatch-group-label">{sr.group_text}</span>
        <SwatchRow 
            swatches={text_on_tone} 
            compact={demo_compact} 
            rounded={demo_rounded}
        />
    </div>
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
        { label: "Text", code: code_text, language: "Svelte" },
        { label: "Compact", code: code_compact, language: "Svelte" },
    ]}
/>

<!-- API ───────────────────────────────────────────────────────────────────── -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>

    <h4 class="api-subtitle">SwatchRow</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "swatches", type: "Swatch[]", default: "required" },
            { prop: "compact", type: "boolean", default: "false" },
            { prop: "rounded", type: "boolean", default: "false" },
        ]}
    />

    <h4 class="api-subtitle">Swatch</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Field" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Required", cell: codeCell },
        ]}
        rows={[
            { prop: "label", type: "string", default: "yes" },
            { prop: "value", type: "string", default: "yes" },
            { prop: "bg", type: "string", default: "yes" },
            { prop: "color", type: "string", default: "yes" },
            { prop: "isText", type: "boolean", default: "no" },
        ]}
    />
</div>

<style>
    .swatch-row-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .swatch-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .swatch-group-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }
</style>
