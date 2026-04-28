<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { Swatch } from '@abhc/spektral-ui';
    import {
        Headline,
        SwatchRow,
        Callout,
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
            color: "var(--spk-text)" 
        },
        { 
            label: sr.surface_tone, 
            value: "var(--spk-tone)",
            bg: "var(--spk-tone)", 
            color: "var(--spk-text)" 
        },
        { 
            label: sr.surface_card, 
            value: "var(--card)", 
            bg: "var(--card)", 
            color: "var(--spk-text)" 
        },
    ]);

    const accents: Swatch[] = $derived([
        { 
            label: sr.accent_main, 
            value: "var(--spk-accent)", 
            bg: "var(--spk-accent)", 
            color: "var(--spk-text-accent)" 
        },
        { 
            label: sr.accent_hover, 
            value: "var(--spk-accent-hover)", 
            bg: "var(--spk-accent-hover)", 
            color: "var(--spk-text-accent)" 
        },
        { 
            label: sr.accent_muted, 
            value: "var(--spk-accent-muted)", 
            bg: "var(--spk-accent-muted)", 
            color: "var(--spk-text-accent)" 
        },
    ]);

    const text_on_tone: Swatch[] = $derived([
        { 
            label: sr.text_main, 
            value: "var(--spk-text)", 
            bg: "var(--spk-tone)", 
            color: "var(--spk-text)", 
            isText: true 
        },
        { 
            label: sr.text_muted, 
            value: "var(--spk-text-muted)", 
            bg: "var(--spk-tone)", 
            color: "var(--spk-text-muted)", 
            isText: true 
        },
    ]);

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<script>
    import type { Swatch } from "./SwatchRow/swatchRow.config";
    import SwatchRow from "./SwatchRow/SwatchRow.svelte";

    const swatches: Swatch[] = [
        { label: "Background", value: "var(--bg)", bg: "var(--bg)", color: "var(--spk-text)" },
        { label: "Tone", value: "var(--spk-tone)", bg: "var(--spk-tone)", color: "var(--spk-text)" },
        { label: "Card", value: "var(--card)", bg: "var(--card)", color: "var(--spk-text)" },
    ];
<\/script>

<SwatchRow {swatches} />`;

    const code_text = `<!-- isText: true displays a large Aa sample on the swatch. -->
<SwatchRow swatches={[
    { label: "Text", value: "var(--spk-text)", bg: "var(--spk-tone)", color: "var(--spk-text)", isText: true },
    { label: "Muted", value: "var(--spk-text-muted)", bg: "var(--spk-tone)", color: "var(--spk-text-muted)", isText: true },
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

    <div style="margin-bottom: 1rem;">
        <Callout variant="info">
            {#snippet leading()}
                <span class="material-symbols-outlined">package_2</span>
            {/snippet}
            {#snippet children()}
                {trans?.doc.types_notice}<br />
                <code>import type &lbrace; Swatch &rbrace; from '@abhc/spektral-ui';</code>
            {/snippet}
        </Callout>
    </div>

    <h4 class="api-subtitle">SwatchRow</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop", width: "20%" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell, width: "10%" },
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
            { key: "prop", label: "Field", width: "20%" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Required", cell: codeCell, width: "10%" },
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
        border: 2px solid var(--spk-tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--spk-tone-bg);
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
        color: var(--spk-text-muted);
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--spk-text-muted);
    }
</style>
