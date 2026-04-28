<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Header, 
        Button, 
        Callout, 
        Selector, 
        ControlBar, 
        CodeBlock, 
        DataTable 
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    type Palette = "accent" | "tone";
    type Preset  = "editorial" | "app" | "mixed";

    let demo_palette: Palette = $state("tone");
    let demo_rounded: boolean = $state(false);
    let demo_preset: Preset  = $state("editorial");

    // bind:visible simulation — toggle instead of scroll to stay self-contained
    let header_sim_visible: boolean = $state(true);

    const nav_labels = $derived([
        placeholders.navigation.label1,
        placeholders.navigation.label2,
        placeholders.navigation.label3,
        placeholders.navigation.label4,
    ]);

    // ── Code examples ────────────────────────────────────────────────────────

    const code_editorial = `<!-- Editorial / portfolio — text nav + primary CTA -->
{#snippet wordmark()}
    <div class="wordmark">
        <span class="material-symbols-outlined">hexagon</span>
        <span>ACME</span>
    </div>
{/snippet}

{#snippet actions()}
    <Button variant="naked">Work</Button>
    <Button variant="naked">About</Button>
    <Button variant="naked">Blog</Button>
    <Button variant="flat" size="sm">Contact</Button>
{/snippet}

<Header palette="tone" leading={wordmark} trailing={actions} />`;

    const code_app = `<!-- App header — accent palette, icon-only squared ghost buttons -->
{#snippet logo()}
    <div class="logo">
        <span class="material-symbols-outlined">deployed_code</span>
        <span>AppName</span>
    </div>
{/snippet}

{#snippet toolbar()}
    <Button variant="ghost" palette="accent" squared aria_label="Search">
        <span class="material-symbols-outlined">search</span>
    </Button>
    <Button variant="ghost" palette="accent" squared aria_label="Notifications">
        <span class="material-symbols-outlined">notifications</span>
    </Button>
    <Button variant="ghost" palette="accent" squared aria_label="Account">
        <span class="material-symbols-outlined">account_circle</span>
    </Button>
{/snippet}

<Header palette="accent" leading={logo} trailing={toolbar} />`;

    const code_mixed = `<!-- Mixed — logo leading, centered nav links (children), actions trailing -->
{#snippet logo()}…{/snippet}

{#snippet actions()}
    <Button variant="ghost" palette="tone" squared aria_label="Settings">
        <span class="material-symbols-outlined">settings</span>
    </Button>
    <Button size="sm">Sign up</Button>
{/snippet}

<!-- Nav links go in the children slot — pass as prop or inline between tags -->
<Header palette="tone" leading={logo} trailing={actions}>
    <nav style="display:flex; gap: 0.5rem;">
        <Button variant="naked">Domus</Button>
        <Button variant="naked">Curia</Button>
        <Button variant="naked">Lex</Button>
        <Button variant="naked">Epistola</Button>
    </nav>
</Header>`;

    const code_padding = `<!-- Custom padding — overrides the default "0 5%" inner spacing -->

<!-- Tighter horizontal rails (e.g. inside a narrow container) -->
<Header palette="tone" padding="0 1rem">
    <!-- header content -->
</Header>

<!-- Add vertical breathing room without touching horizontal rails -->
<Header palette="tone" padding="0.5rem 5%">
    <!-- header content -->
</Header>

<!-- Any valid CSS padding shorthand works -->
<Header palette="tone" padding="12px 24px 12px 32px">
    <!-- header content -->
</Header>`;

    const code_scroll_aware = `<!-- Scroll-aware — logo appears in the Nav once the Header scrolls out of view -->

<!-- In +layout.svelte (or parent component): -->
let header_visible = $state(true);

{#snippet logo_in_nav()}
    <Logo size={32} />
{/snippet}

<!-- Header manages its own IntersectionObserver internally -->
<Header bind:visible={header_visible}>
    <!-- header content -->
</Header>

<!-- Nav reacts: empty header slot when page header is visible,
     logo appears once it scrolls away -->
<Nav
    position="floating"
    direction="top"
    palette="tone"
    header={header_visible ? undefined : logo_in_nav}
    items={navItems}
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Snippets ──────────────────────────────────────────────────────────── -->

<!--
    Pour le preview, tout passe en children dans une flex row qu'on contrôle.
    Le Header fournit background / border / palette, la mise en page est la nôtre.
    Les code tabs montrent l'API leading/trailing/children réelle.
-->

{#snippet editorial()}
    <div class="demo-row">
        <div class="mock-wordmark">
            <span 
                class="material-symbols-outlined mock-icon 
                    {demo_palette === "tone" ? "mock-icon-accent" : ""}"
            >
                hexagon
            </span>
            <span class="mock-name">ACME</span>
        </div>
        <div class="demo-actions">
            {#each nav_labels as label}
                <Button 
                    variant="naked" 
                    palette="tone"
                >
                    {label}
                </Button>
            {/each}
            <Button 
                variant="flat" 
                palette={demo_palette === "accent" ? "tone" : "accent"} 
                size="sm"
            >
                {placeholders.navigation.label5}
            </Button>
        </div>
    </div>
{/snippet}

{#snippet app()}
    <div class="demo-row">
        <div class="mock-wordmark">
            <span 
                class="material-symbols-outlined mock-icon 
                    {demo_palette === "tone" ? "mock-icon-accent" : ""}"
            >
                deployed_code
            </span>
            <span class="mock-name">AppName</span>
        </div>
        <div class="demo-actions">
            <Button 
                variant="ghost" 
                palette={demo_palette} 
                direction="column" 
                size="sm"
                aria_label="Search"
            >
                <span class="material-symbols-outlined">search</span>
            </Button>
            <Button 
                variant="ghost" 
                palette={demo_palette} 
                direction="column" 
                size="sm"
                aria_label="Notifications"
            >
                <span class="material-symbols-outlined">notifications</span>
            </Button>
            <Button 
                variant="ghost" 
                palette={demo_palette} 
                direction="column" 
                size="sm"
                aria_label="Account"
            >
                <span class="material-symbols-outlined">account_circle</span>
            </Button>
        </div>
    </div>
{/snippet}

{#snippet mixed()}
    <div class="demo-row">
        <div class="mock-wordmark">
            <span 
                class="material-symbols-outlined mock-icon 
                    {demo_palette === "tone" ? "mock-icon-accent" : ""}"
            >
                pentagon
            </span>
            <span class="mock-name">Brand</span>
        </div>
        <nav class="demo-nav">
            {#each nav_labels as label}
               <Button 
                    variant="naked" 
                    palette="tone"
                >
                    {label}
                </Button>
            {/each}
        </nav>
        <div class="demo-actions">
            <Button 
                variant="ghost" 
                palette={demo_palette} 
                direction="column" 
                size="sm"
                aria_label="Settings"
            >
                <span class="material-symbols-outlined">settings</span>
            </Button>
            <Button 
                variant="flat" 
                palette={demo_palette === "accent" ? "tone" : "accent"} 
                size="sm"
            >
                Sign up
            </Button>
        </div>
    </div>
{/snippet}

<!-- bind:visible simulation snippets -->
{#snippet sim_nav_header()}
    <div class="mock-wordmark sim-logo">
        <span class="material-symbols-outlined mock-icon">hexagon</span>
        <span class="mock-name">ACME</span>
    </div>
{/snippet}

<!-- Headline ──────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>{trans?.header_demo.title}</Headline>
</div>

<!-- Controls ─────────────────────────────────────────────────────────── -->

<ControlBar palette="tone">
    <Selector label="Palette" options={["tone", "accent"]} bind:value={demo_palette} />
    <Selector label="Rounded" options={[{value: true, label: "yes"}, {value: false, label: "no"}]} bind:value={demo_rounded} />
    <Selector label="Preset"  options={["editorial", "app", "mixed"]} bind:value={demo_preset} />
</ControlBar>

<!-- Live preview ──────────────────────────────────────────────────────── -->

<div class="header-preview">
    <Header
        palette={demo_palette}
        rounded={demo_rounded}
        padding= "0px 1.5rem"
        children={demo_preset === "editorial" ? editorial : demo_preset === "app" ? app : mixed}
    />

    <!-- Mock page content below -->
    <div class="preview-body">
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
    </div>
</div>

<!-- Preset descriptions -->
<Callout variant="accent" align="start">
    {#snippet leading()}
        <span class="material-symbols-outlined">flex_no_wrap</span>
    {/snippet}
    {#snippet children()}
        <strong>{trans?.header_demo.layout}</strong>
        {#if demo_preset === "editorial"}
            <p>
                {@html trans?.header_demo.preset_editorial}
            </p>
        {:else if demo_preset === "app"}
            <p>
                {@html trans?.header_demo.preset_app}
            </p>
        {:else}
            <p>
                {@html trans?.header_demo.preset_mixed}
            </p>
        {/if}
    {/snippet}
</Callout>

<!-- bind:visible simulation ──────────────────────────────────────────── -->

<div class="sim-section">
    <div class="sim-callout-gap"></div>
    <div class="sim-callout-gap"></div>
    
    <Callout variant="neutral" align="start">
        {#snippet children()}
            <p>{@html trans?.header_demo.bind_visible}</p>
        {/snippet}
    </Callout>

    <div class="sim-callout-gap"></div>

    <div class="sim-preview">
        <!-- Simulated page header -->
        <div class="sim-header-area" class:sim-collapsed={!header_sim_visible}>
            <Header palette="tone" padding= "0px 1.5rem">
                <div class="demo-row">
                    <div class="mock-wordmark">
                        <span class="material-symbols-outlined mock-icon">hexagon</span>
                        <span class="mock-name">SCROLL DEMO</span>
                    </div>
                </div>
            </Header>
        </div>

        <!-- Simulated Nav that reacts to header visibility -->
        <div class="sim-nav">
            <div class="sim-nav-header">
                {#if !header_sim_visible}
                    {@render sim_nav_header()}
                {:else}
                    <span class="sim-nav-empty">Nav slot vide</span>
                {/if}
            </div>
            <div class="sim-nav-items">
                {#each nav_labels.slice(0, 3) as label}
                    <div class="sim-nav-item">{label}</div>
                {/each}
            </div>
        </div>

        <div class="sim-controls">
            <button
                class="sim-toggle"
                onclick={() => header_sim_visible = !header_sim_visible}
            >
                {header_sim_visible ? "↑ Simuler scroll (header sort du viewport)" : "↓ Simuler retour (header visible)"}
            </button>
            <span class="sim-badge" class:badge-on={header_sim_visible} class:badge-off={!header_sim_visible}>
                header_visible: {header_sim_visible}
            </span>
        </div>
    </div>
</div>

<!-- Code examples ────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "editorial", code: code_editorial, language: "Svelte" },
        { label: "app", code: code_app, language: "Svelte" },
        { label: "mixed", code: code_mixed, language: "Svelte" },
        { label: "padding", code: code_padding, language: "Svelte" },
        { label: "scroll-aware", code: code_scroll_aware, language: "Svelte" },
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
        { prop: "palette", type: '"accent" | "tone"', default: '"tone"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "visible", type: "boolean", default: "true" },
        { prop: "padding", type: "string", default: '"0 5%"' },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
    ]}
/>

<style>
    /* ---- Preview ---- */
    .header-preview {
        position: relative;
        z-index: 190;
        border: 2px solid var(--spk-tone-hover);
        overflow: hidden;
        margin-bottom: 0.75rem;
        background: var(--spk-tone-bg);
    }

    .demo-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .demo-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .demo-nav {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        flex: 1;
        justify-content: center;
    }

    .preview-body {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.25rem 1.5rem;
    }

    .mock-line {
        height: 10px;
        background: var(--spk-tone-hover);
        border-radius: 4px;
        width: 100%;
    }
    .mock-line.short { width: 55%; }

    /* ---- Inline nav (mixed preset, children slot) ---- */
    :global(.inline-nav) {
        display: flex;
        gap: 0.25rem;
    }

    /* ---- Mock wordmark (shared across presets) ---- */
    :global(.mock-wordmark) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 800;
        font-family: var(--spk-font-heading);
        letter-spacing: 0.5px;
    }

    :global(.mock-icon) {
        font-size: 1.75rem;
    }

    :global(.mock-icon-accent) {
        color: var(--spk-accent);
    }

    :global(.mock-icon-tone) {
        color: var(--spk-text-accent);
    }

    :global(.mock-name) {
        font-size: 1rem;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    /* ---- bind:visible simulation ---- */
    .sim-section {
        margin-bottom: 1.5rem;
    }

    .sim-callout-gap {
        height: 0.6rem;
    }

    .sim-preview {
        position: relative;
        z-index: 190;
        border: 2px solid var(--spk-tone-hover);
        overflow: hidden;
        background: var(--spk-tone-bg);
        margin-top: 0.75rem;
    }

    /* Header area — collapses smoothly to simulate scroll */
    .sim-header-area {
        overflow: hidden;
        max-height: 120px;
        transition: max-height 0.4s ease, opacity 0.3s ease;
        opacity: 1;
    }
    .sim-header-area.sim-collapsed {
        max-height: 0;
        opacity:    0;
    }

    /* Simulated Nav bar */
    .sim-nav {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1.25rem;
        background: var(--spk-tone);
        border-top: 1.5px solid var(--spk-tone-hover);
        border-bottom: 1.5px solid var(--spk-tone-hover);
        min-height: 52px;
        transition: all 0.3s ease;
    }

    .sim-nav-header {
        min-width: 120px;
        display: flex;
        align-items: center;
    }

    .sim-nav-empty {
        font-size: 0.7rem;
        color: var(--spk-text-muted);
        font-style: italic;
    }

    .sim-nav-items {
        display: flex;
        gap: 1rem;
    }

    .sim-nav-item {
        font-size: 0.78rem;
        font-weight: 700;
        font-family: var(--spk-font-heading);
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--spk-text-muted);
    }

    /* Controls row */
    .sim-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1.25rem;
    }

    .sim-toggle {
        padding: 0.35rem 0.85rem;
        border-radius: 6px;
        border: 1.5px solid var(--spk-tone-hover);
        background: transparent;
        color: var(--spk-text);
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family:  inherit;
    }

    .sim-toggle:hover {
        border-color: var(--spk-accent);
        color: var(--spk-accent);
    }

    .sim-badge {
        font-size: 0.72rem;
        font-family: monospace;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        transition: all 0.3s ease;
    }

    .badge-on {
        background: var(--spk-success-ghost-hover);
        color: var(--spk-success);
    }

    .badge-off {
        background: var(--spk-warning-ghost-hover);
        color: var(--spk-warning);
    }

    /* sim-logo inside sim-nav reuses mock-wordmark global styles */
    :global(.sim-logo .mock-icon) {
        font-size: 1.25rem;
    }

    :global(.sim-logo .mock-name) {
        font-size: 0.8rem;
    }
</style>
