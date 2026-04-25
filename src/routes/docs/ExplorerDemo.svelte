<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Explorer, 
        ExplorerGroup, 
        ExplorerLink, 
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

    const ex = $derived(placeholders.explorer);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Palette = "accent" | "tone";

    let demo_palette: Palette = $state("tone");
    let demo_collapsible: boolean = $state(true);
    let demo_headline: boolean = $state(true);
    let demo_active: string = $state("themes");
    let demo_naked: boolean = $state(false);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<Explorer palette="tone">
    <ExplorerGroup label="Getting started">
        {#snippet leading()}
            <span class="material-symbols-outlined">rocket_launch</span>
        {/snippet}

        <ExplorerLink label="Install" href="/docs/install" />
        <ExplorerLink label="Themes" href="/docs/themes" active />
        <ExplorerLink label="Tokens" href="/docs/tokens" />
    </ExplorerGroup>

    <ExplorerGroup label="Components">
        {#snippet leading()}
            <span class="material-symbols-outlined">widgets</span>
        {/snippet}

        <ExplorerLink label="Button" href="/docs/button" />
        <ExplorerLink label="Card" href="/docs/card" />
        <ExplorerLink label="Modal" href="/docs/modal" />
    </ExplorerGroup>
</Explorer>`;

    const code_static = `<!-- collapsible={false} locks every group open. -->
<Explorer palette="accent">
    <ExplorerGroup label="Navigation" collapsible={false}>
        <ExplorerLink label="Home" href="/" />
        <ExplorerLink label="Docs" href="/docs" active />
        <ExplorerLink label="Customizer" href="/customize" />
    </ExplorerGroup>
</Explorer>`;

    const code_naked = `<!-- naked hides the vertical indicator — handy for flat lists. -->
<Explorer palette="tone">
    <ExplorerGroup label="Shortcuts" headline={false}>
        <ExplorerLink label="Search" naked onclick={() => openSearch()} />
        <ExplorerLink label="New file" naked onclick={() => createFile()} />
        <ExplorerLink label="Settings" naked onclick={() => openSettings()} />
    </ExplorerGroup>
</Explorer>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

{#snippet icon_rocket()}
    <span class="material-symbols-outlined explorer-demo-icon">rocket_launch</span>
{/snippet}

{#snippet icon_widgets()}
    <span class="material-symbols-outlined explorer-demo-icon">widgets</span>
{/snippet}

{#snippet icon_palette()}
    <span class="material-symbols-outlined explorer-demo-icon">palette</span>
{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Explorer</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Palette"
        options={["tone", "accent"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Collapsible"
        options={bool_opts}
        bind:value={demo_collapsible}
    />
    <Selector
        label="Headline"
        options={bool_opts}
        bind:value={demo_headline}
    />
    <Selector
        label="Naked"
        options={bool_opts}
        bind:value={demo_naked}
    />
</ControlBar>

<div 
    class="explorer-preview" 
    style={demo_palette === "accent" ? "background: var(--accent);":""}
    >
    <Explorer palette={demo_palette}>
        <ExplorerGroup
            label={ex.group_start}
            leading={icon_rocket}
            collapsible={demo_collapsible}
            headline={demo_headline}
        >
            <ExplorerLink
                label={ex.link_install}
                href="#"
                naked={demo_naked}
                active={demo_active === "install"}
                onclick={() => { demo_active = "install"; }}
            />
            <ExplorerLink
                label={ex.link_themes}
                href="#"
                naked={demo_naked}
                active={demo_active === "themes"}
                onclick={() => { demo_active = "themes"; }}
            />
            <ExplorerLink
                label={ex.link_tokens}
                href="#"
                naked={demo_naked}
                active={demo_active === "tokens"}
                onclick={() => { demo_active = "tokens"; }}
            />
        </ExplorerGroup>

        <ExplorerGroup
            label={ex.group_components}
            leading={icon_widgets}
            collapsible={demo_collapsible}
            headline={demo_headline}
        >
            <ExplorerLink
                label={ex.link_button}
                href="#"
                naked={demo_naked}
                active={demo_active === "button"}
                onclick={() => { demo_active = "button"; }}
            />
            <ExplorerLink
                label={ex.link_card}
                href="#"
                naked={demo_naked}
                active={demo_active === "card"}
                onclick={() => { demo_active = "card"; }}
            />
            <ExplorerLink
                label={ex.link_modal}
                href="#"
                naked={demo_naked}
                active={demo_active === "modal"}
                onclick={() => { demo_active = "modal"; }}
            />
        </ExplorerGroup>

        <ExplorerGroup
            label={ex.group_theming}
            leading={icon_palette}
            collapsible={demo_collapsible}
            headline={demo_headline}
            open={false}
        >
            <ExplorerLink
                label={ex.link_palettes}
                href="#"
                naked={demo_naked}
                active={demo_active === "palettes"}
                onclick={() => { demo_active = "palettes"; }}
            />
            <ExplorerLink
                label={ex.link_fonts}
                href="#"
                naked={demo_naked}
                active={demo_active === "fonts"}
                onclick={() => { demo_active = "fonts"; }}
            />
        </ExplorerGroup>
    </Explorer>
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
        { label: "Static", code: code_static, language: "Svelte" },
        { label: "Naked", code: code_naked, language: "Svelte" },
    ]}
/>

<!-- API ───────────────────────────────────────────────────────────────────── -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>

    <h4 class="api-subtitle">Explorer</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "palette", type: '"accent" | "tone"', default: '"tone"' },
            { prop: "aria_label", type: "string", default: '"Explorer"' },
            { prop: "children", type: "Snippet", default: "required" },
        ]}
    />

    <h4 class="api-subtitle">ExplorerGroup</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "label", type: "string", default: "required" },
            { prop: "leading", type: "Snippet", default: "undefined" },
            { prop: "collapsible", type: "boolean", default: "true" },
            { prop: "headline", type: "boolean", default: "true" },
            { prop: "open", type: "boolean", default: "true" },
            { prop: "children", type: "Snippet", default: "required" },
        ]}
    />

    <h4 class="api-subtitle">ExplorerLink</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "label", type: "string", default: "required" },
            { prop: "href", type: "string", default: "undefined" },
            { prop: "leading", type: "Snippet", default: "undefined" },
            { prop: "active", type: "boolean", default: "false" },
            { prop: "naked", type: "boolean", default: "false" },
            { prop: "onclick", type: "() => void", default: "undefined" },
        ]}
    />
</div>

<style>
    .explorer-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
        max-width: 320px;
    }

    .explorer-demo-icon {
        font-size: 1rem;
        line-height: 1;
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }
</style>
