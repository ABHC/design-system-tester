<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Progress, 
        CodeBlock, 
        DataTable, 
        Selector, 
        ControlBar, 
        Input 
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ──────────────────────────────────────────────────────────

    type Palette   = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size      = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_palette:   Palette   = $state("accent");
    let demo_size:      Size      = $state("md");
    let demo_elevation: Elevation = $state("none");
    let demo_outlined:  boolean   = $state(false);
    let demo_rounded:   boolean   = $state(false);

    let demo_indeterminate: boolean = $state(false);
    let demo_value_str:     string  = $state("60");
    let demo_max_str:       string  = $state("100");

    const demo_value = $derived(demo_indeterminate ? null : Number(demo_value_str));
    const demo_max   = $derived(Number(demo_max_str) || 100);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<!-- Determinate — value / max / unit -->
<Progress value={75} />
<Progress value={42} max={100} unit="%" palette="success" rounded />

<!-- All palettes -->
<Progress value={60} palette="accent" />
<Progress value={60} palette="tone" />
<Progress value={60} palette="error" />
<Progress value={60} palette="warning" />
<Progress value={60} palette="success" />
<Progress value={60} palette="info" />
<Progress value={60} palette="neutral" />`;

    const code_indeterminate = `<!-- value defaults to null → indeterminate state -->
<Progress />
<Progress palette="accent" size="lg" rounded />
<Progress palette="tone" outlined />`;

    const code_modifiers = `<!-- Size -->
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />

<!-- Rounded -->
<Progress value={60} rounded />

<!-- Outlined -->
<Progress value={60} outlined />

<!-- Elevation -->
<Progress value={60} elevation="subtle" />
<Progress value={60} elevation="hard" />`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>{trans?.progress_demo?.title}</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Palette"
        options={["accent", "tone", "neutral", "error", "warning", "success", "info"]}
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
        label="Outlined"
        options={bool_opts}
        bind:value={demo_outlined}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />

    <Selector
        label="Indeterminate"
        options={bool_opts}
        bind:value={demo_indeterminate}
    />

    <div class="input-container">
        <Input
            type="number"
            label="Value"
            placeholder="0–100"
            size="sm"
            disabled={demo_indeterminate}
            bind:value={demo_value_str}
        />
    </div>

    <div class="input-container">
        <Input
            type="number"
            label="Max"
            placeholder="100"
            size="sm"
            bind:value={demo_max_str}
        />
    </div>
</ControlBar>

<div class="progress-preview">
    <Progress
        palette={demo_palette}
        size={demo_size}
        value={demo_value}
        max={demo_max}
        unit="%"
        elevation={demo_elevation}
        outlined={demo_outlined}
        rounded={demo_rounded}
    />
</div>

<!-- Usage ─────────────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Basic", code: code_basic, language: "Svelte" },
        { label: "Indeterminate", code: code_indeterminate, language: "Svelte" },
        { label: "Modifiers", code: code_modifiers, language: "Svelte" },
    ]}
/>

<!-- API ───────────────────────────────────────────────────────────────────── -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
</div>

<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "value", type: "number | null", default: "null" },
        { prop: "max", type: "number", default: "100" },
        { prop: "unit", type: "string", default: '""' },
        { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"accent"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "outlined", type: "boolean", default: "false" },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "aria_label", type: "string", default: "undefined" },
    ]}
/>

<style>
    .progress-preview {
        border: 2px solid var(--spk-tone-hover);
        padding: 1.5rem 1.5rem 0.5rem;
        margin-bottom: 0.75rem;
    }

    .input-container {
        width: 100px;
    }
</style>
