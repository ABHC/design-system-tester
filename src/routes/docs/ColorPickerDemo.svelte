<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        ColorPicker, 
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

    const cp = $derived(placeholders.color_picker);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Mode = "full" | "achromatic";
    type Elevation = "none" | "subtle" | "hard";

    let demo_mode: Mode = $state("full");
    let demo_elevation: Elevation = $state("subtle");
    let demo_rounded: boolean = $state(false);
    let demo_alpha: boolean = $state(false);
    let demo_value: string = $state("#6644ff");

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<script>
    let color = $state("#6644ff");
<\/script>

<ColorPicker
    value={color}
    onchange={(hex) => color = hex}
/>`;

    const code_alpha = `<!-- alpha={true} surfaces an opacity slider and emits the full RGBA. -->
<ColorPicker
    value="#6644ff"
    alpha
    onchange={(hex, a) => console.log(hex, a)}
/>`;

    const code_achromatic = `<!-- Achromatic mode locks chroma to 0 — only lightness varies. -->
<ColorPicker
    mode="achromatic"
    value="#808080"
    rounded
    elevation="subtle"
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>ColorPicker</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Mode"
        options={["full", "achromatic"]}
        bind:value={demo_mode}
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
        label="Alpha"
        options={bool_opts}
        bind:value={demo_alpha}
    />
</ControlBar>

<div class="color-picker-preview">
    <ColorPicker
        value={demo_value}
        mode={demo_mode}
        elevation={demo_elevation}
        rounded={demo_rounded}
        alpha={demo_alpha}
        onchange={(hex) => { demo_value = hex; }}
    />

    <div class="color-picker-readout">
        <span class="readout-label">{cp.current}</span>
        <span class="readout-value">{demo_value}</span>
        <div class="readout-swatch" style="background: {demo_value};"></div>
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
        { label: "Alpha", code: code_alpha, language: "Svelte" },
        { label: "Achromatic", code: code_achromatic, language: "Svelte" },
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
            { prop: "value", type: "string", default: '"#6644ff"' },
            { prop: "mode", type: '"full" | "achromatic"', default: '"full"' },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
            { prop: "alpha", type: "boolean", default: "false" },
            { prop: "onchange", type: "(hex: string, alpha: number) => void", default: "undefined" },
            { prop: "leading", type: "Snippet", default: "undefined" },
            { prop: "extra", type: "Snippet", default: "undefined" },
            { prop: "trailing", type: "Snippet", default: "undefined" },
            { prop: "children", type: "Snippet", default: "undefined" },
        ]}
    />
</div>

<style>
    .color-picker-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .color-picker-readout {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: monospace;
        font-size: 0.8rem;
    }

    .readout-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }

    .readout-value {
        font-weight: 700;
    }

    .readout-swatch {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        border: 1px solid var(--tone-hover);
    }
</style>
