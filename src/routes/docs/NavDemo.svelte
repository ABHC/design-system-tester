<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Nav, 
        Button, 
        Badge, 
        Switch, 
        Selector, 
        ControlBar, 
        CodeBlock, 
        DataTable 
    } from "@abhc/spektral-ui";

    // Props ────────────────────────────────────────────────────────────────

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // Demo configuration state ──────────────────────────────────────────────

    type Direction = "top" | "bottom" | "left" | "right";
    type Palette = "accent" | "tone";
    type Position = "fixed" | "floating";
    type Elevation = "none" | "subtle" | "hard";

    let demo_direction: Direction = $state("left");
    let demo_palette: Palette = $state("accent");
    let demo_position: Position = $state("floating");
    let demo_rounded: boolean = $state(false);
    let demo_elevation: Elevation = $state("none");

    // Active item tracking
    let active_index = $state(0);

    // Labels
    const label1 = $derived(placeholders.navigation.label1);
    const label2 = $derived(placeholders.navigation.label2);
    const label3 = $derived(placeholders.navigation.label3);
    const label4 = $derived(placeholders.navigation.label4);

    // Preset selector
    type Preset = "row" | "column" | "rounded" | "mixed";
    let demo_preset: Preset = $state("row");

    // Switch state for mixed preset
    let switch_on = $state(false);

    // Code examples ─────────────────────────────────────────────────────────

    const usage_basic = `<!-- Floating side nav with Button children -->
<Nav position="floating" direction="left" palette="accent" rounded>
    <Button variant="ghost" palette="accent" direction="row"
        active onclick={() => {}}>
        <span class="material-symbols-outlined">design_services</span>
        Design
    </Button>
    <Button variant="ghost" palette="accent" direction="row"
        onclick={() => {}}>
        <span class="material-symbols-outlined">code</span>
        Code
    </Button>
</Nav>`;

    const usage_rounded = `<!-- Rounded buttons in a top bar -->
<Nav position="floating" direction="top" palette="tone">
    <Button variant="ghost" palette="tone" rounded direction="column"
        active onclick={() => {}}>
        <span class="material-symbols-outlined">home</span>
        Home
    </Button>
    <Button variant="ghost" palette="tone" rounded direction="column"
        onclick={() => {}}>
        <span class="material-symbols-outlined">settings</span>
        Settings
    </Button>
</Nav>`;

    const usage_header_footer = `<!-- Leading, trailing, and free composition -->
{#snippet logo()}
    <Logo size={32} />
{/snippet}

{#snippet lang_select()}
    <select bind:value={locale}>
        <option value="en">EN</option>
        <option value="fr">FR</option>
    </select>
{/snippet}

<Nav position="floating" direction="left" palette="accent"
    leading={logo} trailing={lang_select}>
    <Button variant="ghost" palette="accent" rounded
        onclick={() => {}}>
        <span class="material-symbols-outlined">colors</span>
        Theme
    </Button>
    <Button variant="ghost" palette="accent" rounded
        onclick={() => {}}>
        <span class="material-symbols-outlined">brand_family</span>
        Fonts
    </Button>
</Nav>`;

    const usage_mixed = `<!-- Mix any component — not limited to Button -->
<Nav position="floating" direction="left" palette="tone" rounded>
    <Button variant="ghost" palette="tone" direction="row"
        onclick={() => {}}>
        <span class="material-symbols-outlined">inbox</span>
        Inbox
        <Badge palette="accent" size="sm">3</Badge>
    </Button>
    <Switch palette="tone" bind:checked={dark}>
        {#snippet trailing()}Dark mode{/snippet}
    </Switch>
    <Button variant="ghost" palette="tone" direction="row"
        onclick={() => {}}>
        <span class="material-symbols-outlined">settings</span>
        Settings
    </Button>
</Nav>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.nav?.title}</Headline>
</div>

<!-- Interactive controls -->
<ControlBar palette="tone">
    <Selector
        label="Preset"
        options={[
            { value: "row", label: "Row" },
            { value: "column", label: "Column" },
            { value: "rounded", label: "Rounded" },
            { value: "mixed", label: "Mixed" },
        ]}
        bind:value={demo_preset}
    />
    <Selector
        label="Position"
        options={["floating", "fixed"]}
        bind:value={demo_position}
    />
    <Selector
        label="Direction"
        options={["top", "bottom", "left", "right"]}
        bind:value={demo_direction}
    />
    <Selector
        label="Palette"
        options={["accent", "tone"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Rounded"
        options={[{value: true, label: "yes"}, {value: false, label: "no"}]}
        bind:value={demo_rounded}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
</ControlBar>

<!-- Live preview -->
<div class="nav-preview">
    <div class="preview-main">
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
    </div>

    <div class="nav-slot nav-slot-{demo_direction}">
        {#if demo_preset === "row"}
            <Nav
                position="floating"
                direction={demo_direction}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
            >
                <Button variant="ghost" palette={demo_palette} direction="row"
                    active={active_index === 0}
                    onclick={() => { active_index = 0; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">train</span></span>
                    <span class="nav-label">{label1}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} direction="row"
                    active={active_index === 1}
                    onclick={() => { active_index = 1; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">airlines</span></span>
                    <span class="nav-label">{label2}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} direction="row"
                    active={active_index === 2}
                    onclick={() => { active_index = 2; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">rocket_launch</span></span>
                    <span class="nav-label">{label3}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} direction="row"
                    active={active_index === 3}
                    onclick={() => { active_index = 3; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">Monitor</span></span>
                    <span class="nav-label">{label4}</span>
                </Button>
            </Nav>

        {:else if demo_preset === "column"}
            <Nav
                position="floating"
                direction={demo_direction}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
            >
                <Button variant="ghost" palette={demo_palette} direction="column"
                    active={active_index === 0}
                    onclick={() => { active_index = 0; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">train</span></span>
                    <span class="nav-label">{label1}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} direction="column"
                    active={active_index === 1}
                    onclick={() => { active_index = 1; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">airlines</span></span>
                    <span class="nav-label">{label2}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} direction="column"
                    active={active_index === 2}
                    onclick={() => { active_index = 2; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">rocket_launch</span></span>
                    <span class="nav-label">{label3}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} direction="column"
                    active={active_index === 3}
                    onclick={() => { active_index = 3; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">Monitor</span></span>
                    <span class="nav-label">{label4}</span>
                </Button>
            </Nav>

        {:else if demo_preset === "rounded"}
            <Nav
                position="floating"
                direction={demo_direction}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
            >
                <Button variant="ghost" palette={demo_palette} rounded direction="column"
                    active={active_index === 0}
                    onclick={() => { active_index = 0; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">train</span></span>
                    <span class="nav-label">{label1}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} rounded direction="column"
                    active={active_index === 1}
                    onclick={() => { active_index = 1; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">airlines</span></span>
                    <span class="nav-label">{label2}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} rounded direction="column"
                    active={active_index === 2}
                    onclick={() => { active_index = 2; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">rocket_launch</span></span>
                    <span class="nav-label">{label3}</span>
                </Button>
                <Button variant="ghost" palette={demo_palette} rounded direction="column"
                    active={active_index === 3}
                    onclick={() => { active_index = 3; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">Monitor</span></span>
                    <span class="nav-label">{label4}</span>
                </Button>
            </Nav>

        {:else if demo_preset === "mixed"}
            <Nav
                position="floating"
                direction={demo_direction}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
            >
                <Button variant="ghost" palette={demo_palette} direction="row"
                    active={active_index === 0}
                    onclick={() => { active_index = 0; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">inbox</span></span>
                    <span class="nav-label">{label1}</span>
                    <Badge palette="accent" size="sm">3</Badge>
                </Button>
                <Switch palette={demo_palette} bind:checked={switch_on}>
                    {#snippet trailing()}
                        <span class="nav-label">{label2}</span>
                    {/snippet}
                </Switch>
                <Button variant="ghost" palette={demo_palette} direction="row"
                    active={active_index === 2}
                    onclick={() => { active_index = 2; }}>
                    <span class="nav-icon" aria-hidden="true"><span class="material-symbols-outlined">settings</span></span>
                    <span class="nav-label">{label3}</span>
                </Button>
            </Nav>
        {/if}
    </div>

    {#if demo_position === "fixed"}
        <div class="fixed-note">
            <code>{trans?.nav.code}</code>
            {trans?.nav.fixed}
        </div>
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
        {
            label: "row buttons",
            code: usage_basic,
            language: "Svelte"
        },
        {
            label: "rounded buttons",
            code: usage_rounded,
            language: "Svelte"
        },
        {
            label: "leading & trailing",
            code: usage_header_footer,
            language: "Svelte"
        },
        {
            label: "mixed components",
            code: usage_mixed,
            language: "Svelte"
        },
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
        { prop: "position", type: '"fixed" | "floating"', default: '"fixed"' },
        { prop: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"left"' },
        { prop: "palette", type: '"accent" | "tone"', default: '"accent"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "offset", type: "string", default: '"0px"' },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
    ]}
/>
</div>

<style>
    /* Preview grid */
    .nav-preview {
        position: relative;
        display: grid;
        grid-template-areas:
            "top    top    top"
            "left   main   right"
            "bottom bottom bottom";
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        min-height: 320px;
        background: var(--tone-bg);
        border: 2px solid var(--tone-hover);
        overflow: hidden;
        margin-bottom: 1.5rem;
        padding: 10px;
        z-index: 10;
    }

    .preview-main {
        grid-area: main;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 0.75rem;
        align-self: center;
    }

    .mock-line {
        height: 10px;
        background: var(--tone-hover);
        border-radius: 4px;
        width: 100%;
    }

    .mock-line.short { width: 60%; }

    .nav-slot {
        display: flex;
        align-items: stretch;
        justify-content: stretch;
    }

    .nav-slot-top {
        grid-area: top;
        align-items: flex-start;
    }

    .nav-slot-bottom {
        grid-area: bottom;
        align-items: flex-end;
    }

    .nav-slot-left {
        grid-area: left;
        justify-content: flex-start;
        align-items: center;
    }

    .nav-slot-right {
        grid-area: right;
        justify-content: flex-end;
        align-items: center;
    }

    .nav-slot-top :global(.nav-component),
    .nav-slot-bottom :global(.nav-component) {
        width: 100%;
    }

    .nav-slot-left :global(.nav-component),
    .nav-slot-right :global(.nav-component) {
        justify-content: center;
    }

    .nav-slot-left :global(.nav-direction-left.nav-floating),
    .nav-slot-right :global(.nav-direction-right.nav-floating) {
        align-self: center;
        top: 0;
    }

    .fixed-note {
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.7rem;
        color: var(--text-muted);
        padding: 0.3rem 0.75rem;
        background: var(--tone);
        border-radius: 6px;
        border: 1px solid var(--tone-hover);
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
    }

    .fixed-note code {
        font-size: 0.68rem;
        font-family: monospace;
        color: var(--accent-muted);
    }
</style>
