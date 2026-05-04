<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Avatar, 
        Headline, 
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

    type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    type Palette = "accent" | "tone";
    type Shape = "rounded" | "circular" | "square";
    type Elevation = "none" | "subtle" | "hard";
    type Status = "none" | "online" | "offline" | "absent" | "do-not-disturb";
    type Content = "label" | "image";

    let demo_size: Size = $state("lg");
    let demo_palette: Palette = $state("accent");
    let demo_shape: Shape = $state("circular");
    let demo_elevation: Elevation = $state("none");
    let demo_status: Status = $state("none");
    let demo_content: Content = $state("label");

    const status_prop = $derived(demo_status === "none" ? undefined : demo_status);

    const vge_avatar = "../assets/vge.jpeg";
    const jc_avatar = "../assets/jc.jpeg";

    // ── Interactive state ────────────────────────────────────────────────────

    let click_count = $state(0);

    // ── Code examples ───────────────────────────────────────────────────────

    const code_sizes = `<Avatar size="xs"  shape="circular" label="JD" />
<Avatar size="sm"  shape="circular" label="JD" />
<Avatar size="md"  shape="circular" label="JD" />
<Avatar size="lg"  shape="circular" label="JD" />
<Avatar size="xl"  shape="circular" label="JD" />
<Avatar size="2xl" shape="circular" label="JD" />`;

    const code_palette = `<!-- accent palette (default) or tone -->
<Avatar size="lg" shape="circular" palette="accent" label="AC" />
<Avatar size="lg" shape="circular" palette="tone"   label="TN" />

<!-- shape: "rounded" (default), "circular" or "square" -->
<Avatar size="lg" shape="rounded"  label="JD" />
<Avatar size="lg" shape="circular" label="JD" />
<Avatar size="lg" shape="square"   label="JD" />`;

    const code_elevation = `<!-- elevation: "none" (default), "subtle" or "hard" -->
<Avatar size="lg" shape="circular" elevation="none"   label="JD" />
<Avatar size="lg" shape="circular" elevation="subtle" label="JD" />
<Avatar size="lg" shape="circular" elevation="hard"   label="JD" />`;

    const code_content = `<!-- label: auto-truncated to 3 characters -->
<Avatar size="lg" shape="circular" label="Jean-Dupont" />
<!-- → renders "JEA" -->

<!-- src: takes priority over label -->
<Avatar
    size="lg"
    shape="circular"
    src="/avatars/jean.jpg"
    alt="Jean Dupont"
/>`;

    const code_status = `<Avatar size="lg" shape="circular" label="ON"  status="online" />
<Avatar size="lg" shape="circular" label="OF"  status="offline" />
<Avatar size="lg" shape="circular" label="AB"  status="absent" />
<Avatar size="lg" shape="circular" label="DND" status="do-not-disturb" />

<!-- --dot-bg: border colour of the state dot, defaults to var(--spk-tone-bg) -->
<div style="--dot-bg: var(--spk-tone)">
    <Avatar size="lg" shape="circular" label="ON" status="online" />
</div>`;

    const code_onclick = `<!-- onclick → root becomes <button> -->
<Avatar
    size="lg"
    shape="circular"
    label="JD"
    status="online"
    onclick={() => openStatusMenu()}
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.avatar_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector label="Size" options={["xs", "sm", "md", "lg", "xl", "2xl"]}                       bind:value={demo_size} />
    <Selector label="Palette" options={["accent", "tone"]}                                       bind:value={demo_palette} />
    <Selector label="Shape" options={["square", "rounded", "circular"]}                          bind:value={demo_shape} />
    <Selector label="Elevation" options={["none", "subtle", "hard"]}                             bind:value={demo_elevation} />
    <Selector label="Status" options={["none", "online", "offline", "absent", "do-not-disturb"]} bind:value={demo_status} />
    <Selector label="Content" options={["label", "image"]}                                       bind:value={demo_content} />
</ControlBar>

<!-- Live preview -->

<div class="avatar-preview">
    <!-- Accent -->
    <div class="avatar-group">
        <Avatar
            size={demo_size}
            palette={demo_palette}
            shape={demo_shape}
            elevation={demo_elevation}
            status={status_prop}
            label={demo_content === "label" ? "VGE" : undefined}
            src={demo_content === "image" ? vge_avatar : undefined}
            alt={demo_content === "image" ? "VGE" : undefined}
        />
        <Avatar
            size={demo_size}
            palette={demo_palette}
            shape={demo_shape}
            elevation={demo_elevation}
            status={status_prop}
            label={demo_content === "label" ? "JCH" : undefined}
            src={demo_content === "image" ? jc_avatar : undefined}
            alt={demo_content === "image" ? "JC" : undefined}
        />
        <Avatar
            size={demo_size}
            palette={demo_palette}
            shape={demo_shape}
            elevation={demo_elevation}
            status={status_prop}
            label="PM"
        />
    </div>
</div>

<!-- Status dots -->

<div data-summary="status" data-summary-label={trans?.doc.avatar_dots}>
    <Headline size="sm" uppercase muted>{trans?.doc.avatar_dots}</Headline>
</div>

<p class="demo-label">{@html trans?.avatar_demo.sect_status}</p>
<div class="row align-center">
    <div class="status-item">
        <Avatar size="lg" shape="circular" label="ON" status="online" />
        <span class="status-label">{trans?.avatar_demo.status_online}</span>
    </div>
    <div class="status-item">
        <Avatar size="lg" shape="circular" label="OF" status="offline" />
        <span class="status-label">{trans?.avatar_demo.status_offline}</span>
    </div>
    <div class="status-item">
        <Avatar size="lg" shape="circular" label="AB" status="absent" />
        <span class="status-label">{trans?.avatar_demo.status_absent}</span>
    </div>
    <div class="status-item">
        <Avatar size="lg" shape="circular" label="DND" status="do-not-disturb" />
        <span class="status-label">{trans?.avatar_demo.status_dnd}</span>
    </div>
</div>

<!-- Interactive -->

<div data-summary="interactive" data-summary-label={trans?.doc.avatar_clickable}>
    <Headline size="sm" uppercase muted>{trans?.doc.avatar_clickable}</Headline>
</div>

<p class="demo-label">{@html trans?.avatar_demo.sect_interactive}</p>
<div class="row align-center">
    <Avatar
        size="lg"
        shape="circular"
        label="JC"
        onclick={() => click_count++}
    />
    <Avatar
        size="lg"
        shape="circular"
        label="JR"
        status="online"
        onclick={() => click_count++}
    />
    
    {#if click_count > 0}
        <span class="click-result">
            {click_count} {trans?.avatar_demo.click}{click_count > 1 ? 's' : ''}
        </span>
    {/if}
</div>

<!-- Code examples -->
<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Sizes", code: code_sizes, language: "Svelte" },
        { label: "Palette & Shape", code: code_palette, language: "Svelte" },
        { label: "Elevation", code: code_elevation, language: "Svelte" },
        { label: "label vs src", code: code_content, language: "Svelte" },
        { label: "Status", code: code_status, language: "Svelte" },
        { label: "onclick", code: code_onclick, language: "Svelte" },
    ]}
/>

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
        { prop: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', default: '"md"' },
        { prop: "status", type: '"online" | "offline" | "absent" | "do-not-disturb"', default: "undefined" },
        { prop: "palette", type: '"accent" | "tone"', default: '"accent"' },
        { prop: "shape", type: '"rounded" | "circular" | "square"', default: '"rounded"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "src", type: "string", default: "undefined" },
        { prop: "alt", type: "string", default: '""' },
        { prop: "label", type: "string", default: "undefined" },
        { prop: "onclick", type: "() => void", default: "undefined" },
    ]}
/>

<style>
    .avatar-preview {
        border: 2px solid var(--spk-tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--spk-tone-bg);
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        align-items: center;
    }

    .avatar-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .row.align-center {
        align-items: center;
    }

    .demo-label {
        font-size: 0.8rem;
        color: var(--spk-text-muted);
        margin: 0.75rem 0 0.4rem;
        font-style: italic;
    }

    .demo-label :global(code) {
        font-style: normal;
        background: var(--spk-tone-hover);
        padding: 0.1em 0.35em;
        border-radius: 4px;
        font-size: 0.9em;
    }

    .status-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .status-label {
        font-size: 0.7rem;
        color: var(--spk-text-muted);
        font-family: monospace;
    }

    .click-result {
        font-size: 0.8rem;
        color: var(--spk-text-muted);
        font-style: italic;
        align-self: center;
    }
</style>
