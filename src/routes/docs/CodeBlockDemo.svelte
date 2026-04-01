<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo state ─────────────────────────────────────────────────────────

    type Variant   = "simple" | "titled" | "filename" | "tabbed" | "terminal";
    type Size      = "sm" | "md" | "lg";
    type DescMode  = "none" | "split" | "only";
    type MaxHeight = "none" | "200px" | "300px";

    let demo_variant:     Variant   = $state("titled");
    let demo_size:        Size      = $state("md");
    let demo_copyable:    boolean   = $state(true);
    let demo_line_numbers: boolean  = $state(false);
    let demo_rounded:     boolean   = $state(true);
    let demo_desc_mode:   DescMode  = $state("none");
    let demo_max_height:  MaxHeight = $state("none");

    const bool_opts = [
        { value: true,  label: "true"  },
        { value: false, label: "false" },
    ] as const;

    // ── Preview content ────────────────────────────────────────────────────

    const preview_tabs = [
        {
            label: "tokens.ts",
            language: "TypeScript",
            code: `export interface TokenConfig {
    palette:    PaletteTokens
    accent:     AccentTokens
    tone:       'light' | 'dark'
    typography: TypographyTokens
}`,
        },
        {
            label: "button.config.ts",
            language: "TypeScript",
            code: `export const buttonConfig = {
    base: "btn",
    variants: {
        variant: {
            primary:   "btn-primary",
            secondary: "btn-secondary",
        },
        size: { sm: "btn-sm", md: "btn-md", lg: "btn-lg" }
    }
}`,
        },
        {
            label: "styles.css",
            language: "CSS",
            code: `.codeblock {
    border-radius: 10px;
    border: 1px solid var(--tone-hover);
    overflow: hidden;
    position: relative;
}`,
        },
    ];

    const preview_desc = "**Split layout** — the `description` prop activates a side panel.\\nSupports **bold**, _italic_ and `inline code`.";
    const preview_desc_only = "**Description-only mode** — when `code` is absent, the description fills the full body width.\\nUseful for **notes**, _tips_ or any prose content that doesn't need a code panel.";

    // Props derived from demo state
    const preview_title    = $derived(demo_variant === "titled" ? "TokenConfig" : demo_variant === "terminal" ? "build.sh" : undefined);
    const preview_filename = $derived(demo_variant === "filename" ? "button.config.ts" : undefined);
    const preview_language = $derived((demo_variant === "titled" || demo_variant === "filename") ? "TypeScript" : undefined);
    const preview_desc_val = $derived(demo_desc_mode !== "none" ? (demo_desc_mode === "only" ? preview_desc_only : preview_desc) : undefined);
    const preview_mh       = $derived(demo_max_height !== "none" ? demo_max_height : undefined);

    // Generated usage code — the block shows its own source
    const generated_code = $derived.by(() => {
        const props: string[] = [];
        if (demo_variant !== "simple")  props.push(`    variant="${demo_variant}"`);
        if (demo_size !== "md")         props.push(`    size="${demo_size}"`);
        if (preview_title)              props.push(`    title="${preview_title}"`);
        if (preview_filename)           props.push(`    filename="${preview_filename}"`);
        if (preview_language)           props.push(`    language="${preview_language}"`);
        if (demo_desc_mode === "split") props.push(`    description="**Split layout** — describe your code here.\\n_italic_, \\\`inline code\\\` supported."`);
        if (demo_desc_mode === "only")  props.push(`    description="**Description-only** — prose content without a code panel."`);
        if (demo_max_height !== "none") props.push(`    max_height="${demo_max_height}"`);
        if (demo_copyable)              props.push(`    copyable`);
        if (demo_line_numbers)          props.push(`    line_numbers`);
        if (!demo_rounded)              props.push(`    rounded={false}`);
        if (demo_desc_mode !== "only")  props.push(`    code={snippet}`);
        return `<CodeBlock\n${props.join("\n")}\n/>`;
    });

    const preview_code = $derived(demo_desc_mode === "only" ? undefined : generated_code);

    // ── Usage code examples ────────────────────────────────────────────────

    const usage_simple = `<CodeBlock code={snippet} copyable />`;

    const usage_titled = `<CodeBlock
    variant="titled"
    title="TokenConfig"
    language="TypeScript"
    code={snippet}
    copyable
/>`;

    const usage_filename = `<CodeBlock
    variant="filename"
    filename="button.config.ts"
    language="TypeScript"
    code={snippet}
    copyable
    line_numbers
/>`;

    const usage_tabbed = `<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "tokens.ts",        code: tsCode,  language: "TypeScript" },
        { label: "button.config.ts", code: cfgCode, language: "TypeScript" },
        { label: "styles.css",       code: cssCode, language: "CSS"        },
    ]}
/>`;

    const usage_terminal = `<CodeBlock
    variant="terminal"
    title="build.sh"
    code={snippet}
/>`;

    const usage_split = `<!-- Split layout — description + code side by side -->
<!-- Works on all variants, derived automatically from props -->
<CodeBlock
    variant="filename"
    filename="token.config.ts"
    description="**Split layout** — add a \`description\` to activate this panel.\\nSupports **bold**, _italic_ and \`inline code\`."
    language="TypeScript"
    code={snippet}
    copyable
/>`;

    const usage_desc_only = `<!-- Description-only — no code prop → description fills full width -->
<CodeBlock
    variant="titled"
    title="How it works"
    description="When \`code\` is absent, the description fills the full body.\\nUseful for **notes**, _tips_, or prose content."
/>`;

    const usage_mini = `<!-- Mini inline block — width="fit-content" keeps it compact -->
<CodeBlock
    variant="terminal"
    size="sm"
    width="fit-content"
    code="npm install @my/design-system"
    copyable
/>
<CodeBlock
    variant="simple"
    size="sm"
    width="fit-content"
    code="npx sv create my-app"
    copyable
/>`;

    const usage_src = `<!-- Load content from a static file — fetched, never executed -->
<CodeBlock
    variant="filename"
    filename="example.ts"
    code_src="/assets/example.ts"
    language="TypeScript"
    copyable
/>
<CodeBlock
    variant="titled"
    title="Guide"
    description_src="/assets/guide.md"
/>`;

    const usage_max_height = `<!-- max_height constrains the body and enables scroll -->
<CodeBlock
    code={longSnippet}
    max_height="200px"
    copyable
/>
<!-- rounded={false} for sharp corners -->
<CodeBlock
    variant="titled"
    title="Raw output"
    code={longSnippet}
    max_height="300px"
    rounded={false}
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.codeblocks.title}</Headline>
</div>

<!-- Controls ──────────────────────────────────────────────────────────── -->

<ControlBar palette="tone" rounded>
    <Selector
        label="Variant"
        options={["simple", "titled", "filename", "tabbed", "terminal"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Copyable"
        options={bool_opts}
        bind:value={demo_copyable}
    />
    <Selector
        label="Line numbers"
        options={bool_opts}
        bind:value={demo_line_numbers}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Description"
        options={["none", "split", "only"]}
        bind:value={demo_desc_mode}
    />
    <Selector
        label="Max height"
        options={["none", "200px", "300px"]}
        bind:value={demo_max_height}
    />
</ControlBar>

<!-- Live preview ──────────────────────────────────────────────────────── -->

{#if demo_variant === "tabbed"}
    <CodeBlock
        variant="tabbed"
        size={demo_size}
        copyable={demo_copyable}
        line_numbers={demo_line_numbers}
        rounded={demo_rounded}
        max_height={preview_mh}
        tabs={preview_tabs}
    />
{:else}
    <CodeBlock
        variant={demo_variant}
        size={demo_size}
        title={preview_title}
        filename={preview_filename}
        language={preview_language}
        code={preview_code}
        description={preview_desc_val}
        copyable={demo_copyable}
        line_numbers={demo_line_numbers}
        rounded={demo_rounded}
        max_height={preview_mh}
    />
{/if}

<!-- Mini blocks ───────────────────────────────────────────────────────── -->

<p class="demo-label">Mini — <code>width="fit-content"</code> pour les commandes inline</p>

<div class="mini-row">
    <CodeBlock
        variant="terminal"
        size="sm"
        width="fit-content"
        code="npm install @my/design-system"
        copyable
    />
    <CodeBlock
        variant="simple"
        size="sm"
        width="fit-content"
        code="npx sv create my-app"
        copyable
    />
    <CodeBlock
        variant="terminal"
        size="sm"
        width="fit-content"
        code="git push origin main"
        copyable
    />
</div>

<!-- Usage code ────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "simple", code: usage_simple, language: "Svelte" },
        { label: "titled", code: usage_titled, language: "Svelte" },
        { label: "filename", code: usage_filename, language: "Svelte" },
        { label: "tabbed", code: usage_tabbed, language: "Svelte" },
        { label: "terminal", code: usage_terminal,  language: "Svelte" },
        { label: "split", code: usage_split, language: "Svelte" },
        { label: "desc-only", code: usage_desc_only, language: "Svelte" },
        { label: "mini", code: usage_mini, language: "Svelte" },
        { label: "src", code: usage_src, language: "Svelte" },
        { label: "max_height",   code: usage_max_height, language: "Svelte" },
    ]}
/>

<!-- API ─────────────────────────────────────────────────────────────── -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
</div>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "variant", type: '"simple" | "titled" | "filename" | "tabbed" | "terminal"', default: '"simple"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "title", type: "string", default: "undefined" },
        { prop: "filename", type: "string", default: "undefined" },
        { prop: "description", type: "string", default: "undefined" },
        { prop: "description_src", type: "string", default: "undefined" },
        { prop: "language", type: "string", default: "undefined" },
        { prop: "tabs", type: "Tab[]", default: "undefined" },
        { prop: "code", type: "string", default: "undefined" },
        { prop: "code_src", type: "string", default: "undefined" },
        { prop: "copyable", type: "boolean", default: "false" },
        { prop: "line_numbers", type: "boolean", default: "false" },
        { prop: "rounded", type: "boolean", default: "true" },
        { prop: "width", type: "string", default: "undefined" },
        { prop: "max_height", type: "string", default: "undefined" },
    ]}
/>

<style>
    .mini-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0;
    }

    .mini-row :global(.codeblock) {
        margin: 0 0.75rem 0 0;
    }

    .demo-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin: 1.5rem 0 0;
        font-style: italic;
    }

    .demo-label code {
        font-style: normal;
        background: var(--tone-hover);
        padding: 0.1em 0.35em;
        border-radius: 4px;
        font-size: 0.9em;
    }
</style>
