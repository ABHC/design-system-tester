<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { CommandItem, CommandGroup } from "../../design-system/components/Command/command.config";

    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Command from "../../design-system/components/Command/Command.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
    import Badge from "../../design-system/components/Badge/Badge.svelte";
    import Card from "../../design-system/components/Card/Card.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo controls ────────────────────────────────────────────────────

    type Palette = "tone" | "accent" | "accentbg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_palette: Palette = $state("tone");
    let demo_elevation: Elevation = $state("none");
    let demo_rounded: boolean = $state(false);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Derived data from placeholders ───────────────────────────────────

    const ph = $derived(placeholders.command);

    const basic_items: CommandItem[] = $derived([
        { id: "new-file", label: ph.items.new_file, hint: "Ctrl+N", group: "file", keywords: ["create"] },
        { id: "open-file", label: ph.items.open_file, hint: "Ctrl+O", group: "file", keywords: ["browse"] },
        { id: "save", label: ph.items.save, hint: "Ctrl+S", group: "file" },
        { id: "save-as", label: ph.items.save_as, hint: "Ctrl+Shift+S", group: "file" },
        { id: "undo", label: ph.items.undo, hint: "Ctrl+Z", group: "edit" },
        { id: "redo", label: ph.items.redo, hint: "Ctrl+Shift+Z", group: "edit" },
        { id: "find", label: ph.items.find, hint: "Ctrl+F", group: "edit", keywords: ["search"] },
        { id: "replace", label: ph.items.replace, hint: "Ctrl+H", group: "edit" },
        { id: "theme", label: ph.items.theme, group: "view", keywords: ["dark", "light", "mode"] },
        { id: "drawer", label: ph.items.drawer, hint: "Ctrl+B", group: "view" },
        { id: "terminal", label: ph.items.terminal, hint: "Ctrl+`", group: "view" },
        { id: "zoom-in", label: ph.items.zoom_in, hint: "Ctrl++", group: "view" },
        { id: "zoom-out", label: ph.items.zoom_out, hint: "Ctrl+-", group: "view" },
    ]);

    const basic_groups: CommandGroup[] = $derived([
        { id: "file", label: ph.groups.file },
        { id: "edit", label: ph.groups.edit },
        { id: "view", label: ph.groups.view },
    ]);

    const team_items: CommandItem[] = $derived([
        { id: "alice", label: ph.team.alice, group: "engineering", keywords: ["frontend", "svelte"] },
        { id: "bob", label: ph.team.bob, group: "engineering", keywords: ["backend", "rust"] },
        { id: "carol", label: ph.team.carol, group: "design", keywords: ["ui", "ux", "figma"] },
        { id: "david", label: ph.team.david, group: "design", keywords: ["illustration", "brand"] },
        { id: "eve", label: ph.team.eve, group: "product", keywords: ["pm", "roadmap"] },
        { id: "frank", label: ph.team.frank, group: "product", keywords: ["analytics", "data"] },
    ]);

    const team_groups: CommandGroup[] = $derived([
        { id: "engineering", label: ph.groups.engineering },
        { id: "design", label: ph.groups.design },
        { id: "product", label: ph.groups.product },
    ]);

    const flat_items: CommandItem[] = $derived([
        { id: "home", label: ph.nav.home, keywords: ["dashboard", "main"] },
        { id: "settings", label: ph.nav.settings, keywords: ["preferences", "config"] },
        { id: "profile", label: ph.nav.profile, keywords: ["account", "user"] },
        { id: "logout", label: ph.nav.logout, keywords: ["sign out", "exit"] },
        { id: "help", label: ph.nav.help, keywords: ["docs", "support", "faq"] },
    ]);

    // ── Command state ────────────────────────────────────────────────────

    let basic_open = $state(false);
    let basic_result: string = $state("");

    let custom_open = $state(false);
    let custom_result: string = $state("");

    let flat_open = $state(false);
    let flat_result: string = $state("");

    // ── Code examples ────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    import Command from "./Command.svelte";
    import type { CommandItem, CommandGroup } from "./command.config";

    let open = $state(false);

    const items: CommandItem[] = [
        { id: "new-file", label: "New File", hint: "Ctrl+N", group: "file" },
        { id: "save", label: "Save", hint: "Ctrl+S", group: "file" },
        { id: "undo", label: "Undo", hint: "Ctrl+Z", group: "edit" },
    ];

    const groups: CommandGroup[] = [
        { id: "file", label: "File" },
        { id: "edit", label: "Edit" },
    ];
<\/script>

<Button onclick={() => open = true}>Open Command</Button>

<Command
    bind:open
    {items}
    {groups}
    placeholder="Type a command…"
    onselect={(item) => console.log(item.label)}
/>`;

    const code_custom = `<!-- Custom rendering via the item snippet -->
<Command bind:open {items} {groups} palette={demo_palette} onselect={handler}>
    {#snippet item(entry)}
        <div class="custom-item">
            <span class="custom-item-name">{entry.label}</span>
            <Badge 
                palette={demo_palette === "tone" ? "accent" : "tone"}
                size="sm" 
                variant={demo_palette === "tone" ? "outlined" : "flat"}
            >
                {team_groups.find(g => g.id === entry.group)?.label ?? entry.group}
            </Badge>
        </div>
    {/snippet}
</Command>`;

    const code_flat = `<!-- Without groups — flat list -->
<Command
    bind:open
    items={[
        { id: "home", label: "Go to Home", keywords: ["dashboard"] },
        { id: "settings", label: "Open Settings" },
        { id: "logout", label: "Log Out" },
    ]}
    onselect={(item) => console.log(item.id)}
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Markup ────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.command_demo.title}</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Palette"
        options={["tone", "accent", "accentbg"]}
        bind:value={demo_palette}
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

<!-- Demo grid -->

<div class="demo-grid">

    <!-- Basic grouped -->
    <Card variant="flat" elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">terminal</span>
                <span>{ph.group_commands}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Button
                variant="outlined"
                palette="accent"
                onclick={() => basic_open = true}
            >
                <span class="material-symbols-outlined">keyboard_command_key</span>
                {ph.open_cmd}
            </Button>

            {#if basic_result}
                <div class="demo-value">
                    {ph.selected_item}&nbsp;<code>{basic_result}</code>
                </div>
            {/if}
        {/snippet}
    </Card>

    <!-- Custom item snippet -->
    <Card variant="flat" elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">groups</span>
                <span>{ph.custom_item}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Button
                variant="outlined"
                palette="accent"
                onclick={() => custom_open = true}
            >
                <span class="material-symbols-outlined">person_search</span>
                {ph.search_team}
            </Button>

            {#if custom_result}
                <div class="demo-value">
                    {ph.selected_item}&nbsp;<code>{custom_result}</code>
                </div>
            {/if}
        {/snippet}
    </Card>

    <!-- Flat (no groups) -->
    <Card variant="flat" elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">list</span>
                <span>{ph.no_groups}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Button
                variant="outlined"
                palette="accent"
                onclick={() => flat_open = true}
            >
                <span class="material-symbols-outlined">search</span>
                {ph.quick_nav}
            </Button>

            {#if flat_result}
                <div class="demo-value">
                    {ph.selected_item}&nbsp;<code>{flat_result}</code>
                </div>
            {/if}
        {/snippet}
    </Card>

</div>

<!-- Command instances -->

<Command
    bind:open={basic_open}
    items={basic_items}
    groups={basic_groups}
    placeholder={ph.placeholder_commands}
    empty_placeholder={ph.empty}
    palette={demo_palette}
    rounded={demo_rounded}
    elevation={demo_elevation}
    onselect={(item) => { basic_result = item.label; }}
/>

<Command
    bind:open={custom_open}
    items={team_items}
    groups={team_groups}
    placeholder={ph.placeholder_team}
    empty_placeholder={ph.empty}
    palette={demo_palette}
    rounded={demo_rounded}
    elevation={demo_elevation}
    onselect={(item) => { custom_result = item.label; }}
>
    {#snippet item(entry)}
        <div class="custom-item">
            <span class="custom-item-name">{entry.label}</span>
            <Badge 
                palette={demo_palette === "tone" ? "accent" : "tone"}
                size="sm" 
                variant={demo_palette === "tone" ? "outlined" : "flat"}
            >
                {team_groups.find(g => g.id === entry.group)?.label ?? entry.group}
            </Badge>
        </div>
    {/snippet}
</Command>

<Command
    bind:open={flat_open}
    items={flat_items}
    placeholder={ph.placeholder_nav}
    empty_placeholder={ph.empty}
    palette={demo_palette}
    rounded={demo_rounded}
    elevation={demo_elevation}
    onselect={(item) => { flat_result = item.label; }}
/>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "grouped", code: code_basic, language: "Svelte" },
        { label: "custom snippet", code: code_custom, language: "Svelte" },
        { label: "flat", code: code_flat, language: "Svelte" },
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
        { prop: "open", type: "boolean", default: "false" },
        { prop: "items", type: "CommandItem[]", default: "\u2014" },
        { prop: "groups", type: "CommandGroup[]", default: "[]" },
        { prop: "placeholder", type: "string", default: '"Search..."' },
        { prop: "empty_placeholder", type: "string", default: '"No results"' },
        { prop: "onselect", type: "(item: CommandItem) => void", default: "\u2014" },
        { prop: "onclose", type: "() => void", default: "\u2014" },
        { prop: "item", type: "Snippet<[CommandItem]>", default: "\u2014" },
        { prop: "empty", type: "Snippet", default: "\u2014" },
        { prop: "palette", type: '"tone" | "accent" | "accentbg"', default: '"tone"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"subtle"' },
        { prop: "width", type: "string", default: '"560px"' },
    ]}
/>
</div>

<style>
    .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
        gap: 1.25rem;
        margin-bottom: 0.75rem;
    }

    .card-section-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 1rem 1.25rem;
        font-size: 1rem;
        font-weight: 600;
    }

    .demo-value {
        font-size: 0.8rem;
        color: var(--text-muted);
        padding: 0.5rem 0.6rem;
        background: var(--tone-bg);
        border-radius: 5px;
        margin-top: 0.5rem;
    }

    .demo-value code {
        color: var(--accent);
        font-weight: 600;
    }

    .custom-item {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
    }

    .custom-item-name {
        flex: 1;
        min-width: 0;
    }

    @media (max-width: 500px) {
        .demo-grid { grid-template-columns: 1fr; }
    }
</style>
