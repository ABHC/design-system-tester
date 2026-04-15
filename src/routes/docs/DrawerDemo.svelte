<script lang="ts">
    import { createRawSnippet } from "svelte";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Avatar from "../../design-system/components/Avatar/avatar.svelte";
    import Drawer from "../../design-system/components/Drawer/Drawer.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
    import ListItem from "../../design-system/components/ListItem/ListItem.svelte";
    import SearchField from "../../design-system/components/SearchField/SearchField.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    type Direction = "left" | "right" | "top" | "bottom";
    type Palette = "accent" | "tone";
    type Preset = "buttons" | "listitems" | "mixed";

    let demo_direction: Direction = $state("left");
    let demo_palette: Palette = $state("accent");
    let demo_rounded: boolean = $state(true);
    let demo_preset: Preset = $state("buttons");
    let demo_open: boolean = $state(false);

    let active: string = $state("Dashboard");
    let search: string = $state("");

    function close() { demo_open = false; }

    const bool_opts = [{ value: true, label: "on" }, { value: false, label: "off" }] as const;

    // ── Code examples ──────────────────────────────────────────────────────────

    const code_buttons = `<!-- Navigation with Buttons -->
<Drawer direction="left" palette="accent" rounded open={open}
    onclose={() => { open = false; }}>
    {#snippet header()}
        <div style="display:flex; align-items:center; gap:.5rem; width:100%">
            <span class="material-symbols-outlined">layers<\/span>
            <strong>My App<\/strong>
        <\/div>
    {/snippet}

    <Button variant="ghost" palette="accent" rounded direction="row"
        active={active === "Dashboard"}
        onclick={() => { active = "Dashboard"; }}>
        <span class="nav-icon"><span class="material-symbols-outlined">home<\/span><\/span>
        <span class="nav-label">Dashboard<\/span>
    <\/Button>
    <Button variant="ghost" palette="accent" rounded direction="row"
        active={active === "Settings"}
        onclick={() => { active = "Settings"; }}>
        <span class="nav-icon"><span class="material-symbols-outlined">settings<\/span><\/span>
        <span class="nav-label">Settings<\/span>
    <\/Button>
<\/Drawer>`;

    const code_listitems = `<!-- File browser with ListItems -->
<Drawer direction="left" palette="tone" rounded open={open}
    onclose={() => { open = false; }}>
    <ListItem label="Button.svelte" active palette="ghost" rounded>
        src/components
    </ListItem>
    <ListItem label="tokens.css" palette="ghost" rounded>
        design-system
    </ListItem>
    <ListItem label="App.svelte" palette="ghost" rounded>
        src/routes
    </ListItem>
<\/Drawer>`;

    const code_mixed = `<!-- Mixed: SearchField + ListItems -->
<Drawer direction="left" palette="tone" rounded open={open}
    onclose={() => { open = false; }}>
    <SearchField
        bind:value={search}
        placeholder="Filter files..."
        size="sm" palette="tone" rounded clearable
    />
    {#each filtered_files as f}
        <ListItem
            label={f.name}
            active={active === f.name}
            onclick={() => { active = f.name; }}
            palette="ghost" rounded
        >
            {f.path}
        </ListItem>
    {/each}
<\/Drawer>`;

    const code_directions = `<!-- All four directions -->
<Drawer direction="left" ...>Left panel<\/Drawer>
<Drawer direction="right" ...>Right panel<\/Drawer>
<Drawer direction="top" height="200px" ...>Top sheet<\/Drawer>
<Drawer direction="bottom" height="250px" ...>Bottom sheet<\/Drawer>`;

    const code_header_footer = `<!-- Header + footer slots -->
{#snippet drawer_header()}
    <div style="display:flex; align-items:center; gap:.5rem; width:100%">
        <span class="material-symbols-outlined">layers<\/span>
        <strong>My App<\/strong>
        <button style="margin-left:auto" onclick={() => { open = false; }}>
            <span class="material-symbols-outlined">close<\/span>
        <\/button>
    <\/div>
{/snippet}

{#snippet drawer_footer()}
    <div style="display:flex; align-items:center; gap:.6rem; width:100%">
        <Avatar size="sm" circular label="AB" status="online" \/>
        <span style="font-weight:600; font-size:.8rem">Alice B.<\/span>
    <\/div>
{/snippet}

<Drawer direction="left" palette="accent" rounded {open}
    header={drawer_header}
    footer={drawer_footer}>
    <!-- your content here -->
<\/Drawer>`;

    // Files for the mixed preset
    const files = [
        { name: "Button.svelte", path: "src/components" },
        { name: "tokens.css", path: "design-system" },
        { name: "App.svelte", path: "src/routes" },
        { name: "+layout.svelte", path: "src/routes" },
        { name: "Drawer.svelte", path: "src/components" },
        { name: "palette.ts", path: "src/lib" },
    ];

    const filtered_files = $derived(
        search
            ? files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
            : files
    );
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Section headline -->
<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.drawer_demo.title}</Headline>
</div>

<!-- Controls -->
<ControlBar palette="tone">
    <Selector
        label="Preset"
        options={["buttons", "listitems", "mixed"]}
        bind:value={demo_preset}
        onchange={(p) => {
            active = p === "listitems" || p === "mixed" ? "Button.svelte" : "Dashboard";
            search = "";
        }}
    />
    <Selector
        label="Direction"
        options={["left", "right", "top", "bottom"]}
        bind:value={demo_direction}
    />
    <Selector
        label="Palette"
        options={["accent", "tone"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
</ControlBar>

<!-- Open button -->
<div class="open-row">
    <Button
        variant="flat"
        size="sm"
        onclick={() => { demo_open = true; }}
    >
        <span class="material-symbols-outlined">open_in_new</span>
        Open Drawer — {demo_preset} / {demo_direction}
    </Button>
</div>

<!-- Real Drawer instances — one per preset -->

{#if demo_preset === "buttons"}
    <Drawer
        direction={demo_direction}
        palette={demo_palette}
        rounded={demo_rounded}
        open={demo_open}
        onclose={close}
    >
        {#snippet header()}
            <div class="demo-drawer-head">
                <span class="material-symbols-outlined">layers</span>
                <strong>My App</strong>
                <button class="demo-close" onclick={close} aria-label="Close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        {/snippet}

        <Button variant="ghost" palette={demo_palette} rounded direction="row"
            active={active === "Dashboard"}
            onclick={() => { active = "Dashboard"; }}>
            <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">home</span></span>
            <span class="nav-label">Dashboard</span>
        </Button>
        <Button variant="ghost" palette={demo_palette} rounded direction="row"
            active={active === "Components"}
            onclick={() => { active = "Components"; }}>
            <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">widgets</span></span>
            <span class="nav-label">Components</span>
        </Button>
        <Button variant="ghost" palette={demo_palette} rounded direction="row"
            active={active === "Colours"}
            onclick={() => { active = "Colours"; }}>
            <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">palette</span></span>
            <span class="nav-label">Colours</span>
        </Button>
        <Button variant="ghost" palette={demo_palette} rounded direction="row"
            active={active === "Settings"}
            onclick={() => { active = "Settings"; }}>
            <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">settings</span></span>
            <span class="nav-label">Settings</span>
        </Button>

        {#snippet footer()}
            <div class="demo-drawer-foot">
                <Avatar
                    palette={demo_palette === "accent" ? "tone" : "accent"}
                    size="sm" circular label="AB" status="online"
                />
                <span class="demo-user-name">Alice B.</span>
            </div>
        {/snippet}
    </Drawer>
{/if}

{#if demo_preset === "listitems"}
    <Drawer
        direction={demo_direction}
        palette={demo_palette}
        rounded={demo_rounded}
        open={demo_open}
        onclose={close}
    >
        {#snippet header()}
            <div class="demo-drawer-head">
                <span class="material-symbols-outlined">folder_open</span>
                <strong>Files</strong>
                <button class="demo-close" onclick={close} aria-label="Close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        {/snippet}

        <ListItem
            label="Button.svelte"
            active={active === "Button.svelte"}
            onclick={() => { active = "Button.svelte"; }}
            palette="ghost" rounded
        >src/components</ListItem>
        <ListItem
            label="tokens.css"
            active={active === "tokens.css"}
            onclick={() => { active = "tokens.css"; }}
            palette="ghost" rounded
        >design-system</ListItem>
        <ListItem
            label="App.svelte"
            active={active === "App.svelte"}
            onclick={() => { active = "App.svelte"; }}
            palette="ghost" rounded
        >src/routes</ListItem>
        <ListItem
            label="+layout.svelte"
            active={active === "+layout.svelte"}
            onclick={() => { active = "+layout.svelte"; }}
            palette="ghost" rounded
        >src/routes</ListItem>
    </Drawer>
{/if}

{#if demo_preset === "mixed"}
    <Drawer
        direction={demo_direction}
        palette={demo_palette}
        rounded={demo_rounded}
        open={demo_open}
        onclose={close}
    >
        {#snippet header()}
            <div class="demo-drawer-head">
                <span class="material-symbols-outlined">search</span>
                <strong>Explorer</strong>
                <button class="demo-close" onclick={close} aria-label="Close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
        {/snippet}

        <SearchField
            bind:value={search}
            placeholder="Filter files..."
            size="sm"
            palette={demo_palette === "accent" ? "accentbg" : "tone"}
            rounded
            clearable
        />

        {#each filtered_files as f}
            <ListItem
                label={f.name}
                active={active === f.name}
                onclick={() => { active = f.name; }}
                palette="ghost" rounded
            >{f.path}</ListItem>
        {/each}
    </Drawer>
{/if}

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "buttons", code: code_buttons, language: "Svelte" },
        { label: "list items", code: code_listitems, language: "Svelte" },
        { label: "mixed (search)", code: code_mixed, language: "Svelte" },
        { label: "directions", code: code_directions, language: "Svelte" },
        { label: "header & footer", code: code_header_footer, language: "Svelte" },
    ]}
/>


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
        { prop: "direction", type: '"left" | "right" | "top" | "bottom"', default: '"left"' },
        { prop: "palette", type: '"accent" | "tone"', default: '"accent"' },
        { prop: "open", type: "boolean", default: "false" },
        { prop: "offset_top", type: "string", default: '"0px"' },
        { prop: "offset_bottom", type: "string", default: '"0px"' },
        { prop: "width", type: "string", default: '"260px"' },
        { prop: "height", type: "string", default: '"300px"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "header", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "footer", type: "Snippet", default: "\u2014" },
        { prop: "onclose", type: "() => void", default: "\u2014" },
        { prop: "aria_label", type: "string", default: '"Drawer"' },
    ]}
/>
</div>

<style>
    .open-row {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }

    /* Shared styles for drawer header/footer snippets */
    :global(.demo-drawer-head) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
    }

    :global(.demo-close) {
        margin-left: auto;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        padding: 0.15rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transition: opacity 0.2s ease;
        flex-shrink: 0;
    }

    :global(.demo-close:hover) { opacity: 1; }

    :global(.demo-close .material-symbols-outlined) {
        font-size: 1.1rem;
    }

    :global(.demo-drawer-foot) {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
    }

    :global(.demo-user-name) {
        font-weight: 600;
        font-size: 0.8rem;
        line-height: 1;
    }
</style>
