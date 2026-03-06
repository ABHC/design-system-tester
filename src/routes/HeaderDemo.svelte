<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";

    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Header  from "../design-system/components/Header/Header.svelte";
    import Button  from "../design-system/components/Button/Button.svelte";
    import Callout from "../design-system/components/Callout/Callout.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

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
        placeholders.navigation.domus,
        placeholders.navigation.respublica,
        placeholders.navigation.lex,
        placeholders.navigation.epistola,
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
    <Button variant="text">Work</Button>
    <Button variant="text">About</Button>
    <Button variant="text">Blog</Button>
    <Button variant="primary" size="sm">Contact</Button>
{/snippet}

<Header palette="tone" leading={wordmark} following={actions} />`;

    const code_app = `<!-- App header — accent palette, icon-only squared nav buttons -->
{#snippet logo()}
    <div class="logo">
        <span class="material-symbols-outlined">deployed_code</span>
        <span>AppName</span>
    </div>
{/snippet}

{#snippet toolbar()}
    <Button variant="nav" squared aria_label="Search">
        <span class="material-symbols-outlined">search</span>
    </Button>
    <Button variant="nav" squared aria_label="Notifications">
        <span class="material-symbols-outlined">notifications</span>
    </Button>
    <Button variant="nav" squared aria_label="Account">
        <span class="material-symbols-outlined">account_circle</span>
    </Button>
{/snippet}

<Header palette="accent" leading={logo} following={toolbar} />`;

    const code_mixed = `<!-- Mixed — logo leading, centered nav links (children), actions following -->
{#snippet logo()}…{/snippet}

{#snippet actions()}
    <Button variant="nav" squared aria_label="Settings">
        <span class="material-symbols-outlined">settings</span>
    </Button>
    <Button variant="primary" size="sm">Sign up</Button>
{/snippet}

<!-- Nav links go in the children slot — pass as prop or inline between tags -->
<Header palette="tone" leading={logo} following={actions}>
    <nav style="display:flex; gap: 0.5rem;">
        <Button variant="text">Domus</Button>
        <Button variant="text">Curia</Button>
        <Button variant="text">Lex</Button>
        <Button variant="text">Epistola</Button>
    </nav>
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

<!-- ── Snippets ──────────────────────────────────────────────────────────── -->

<!--
    Pour le preview, tout passe en children dans une flex row qu'on contrôle.
    Le Header fournit background / border / palette, la mise en page est la nôtre.
    Les code tabs montrent l'API leading/following/children réelle.
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
                <Button variant="text">{label}</Button>
            {/each}
            {#if demo_palette === "accent"}
                <Button variant="ghost" size="sm">Contact</Button>
            {:else}
                <Button variant="primary" size="sm">Contact</Button>
            {/if}
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
            <Button variant="nav" squared aria_label="Search">
                <span class="material-symbols-outlined">search</span>
            </Button>
            <Button variant="nav" squared aria_label="Notifications">
                <span class="material-symbols-outlined">notifications</span>
            </Button>
            <Button variant="nav" squared aria_label="Account">
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
                <Button variant="text">{label}</Button>
            {/each}
        </nav>
        <div class="demo-actions">
            <Button variant="nav" squared aria_label="Settings">
                <span class="material-symbols-outlined">settings</span>
            </Button>
            {#if demo_palette === "accent"}
                <Button variant="ghost" size="sm">Sign up</Button>
            {:else}
                <Button variant="primary" size="sm">Sign up</Button>
            {/if}
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

<Headline size="md" uppercase>{trans?.header_demo.title}</Headline>

<!-- Controls ─────────────────────────────────────────────────────────── -->

<div class="header-controls">
    <div class="control-group">
        <span class="control-label">Palette</span>
        <div class="control-options">
            {#each (["tone", "accent"] as const) as pal}
                <button
                    class="opt-btn"
                    class:opt-active={demo_palette === pal}
                    onclick={() => demo_palette = pal}
                >{pal}</button>
            {/each}
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">Rounded</span>
        <div class="control-options">
            <button 
                class="opt-btn" 
                class:opt-active={demo_rounded}  
                onclick={() => demo_rounded = true}
            >
                yes
            </button>
            <button 
                class="opt-btn" 
                class:opt-active={!demo_rounded} 
                onclick={() => demo_rounded = false}
            >
                no
            </button>
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">Preset</span>
        <div class="control-options">
            {#each (["editorial", "app", "mixed"] as const) as preset}
                <button
                    class="opt-btn"
                    class:opt-active={demo_preset === preset}
                    onclick={() => demo_preset = preset}
                >
                    {preset}
                </button>
            {/each}
        </div>
    </div>
</div>

<!-- Live preview ──────────────────────────────────────────────────────── -->

<div class="header-preview">
    <Header
        palette={demo_palette}
        rounded={demo_rounded}
        style="padding: 0 1.5rem"
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
<Callout variant="accent" align="start" rounded>
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
    
    <Callout variant="neutral" align="start" rounded>
        {#snippet children()}
            <p>{@html trans?.header_demo.bind_visible}</p>
        {/snippet}
    </Callout>

    <div class="sim-callout-gap"></div>

    <div class="sim-preview">
        <!-- Simulated page header -->
        <div class="sim-header-area" class:sim-collapsed={!header_sim_visible}>
            <Header
                palette="tone"
                style="padding: 0 1.5rem"
            >
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

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "editorial", code: code_editorial, language: "Svelte" },
        { label: "app", code: code_app, language: "Svelte" },
        { label: "mixed", code: code_mixed, language: "Svelte" },
        { label: "scroll-aware", code: code_scroll_aware, language: "Svelte" },
    ]}
/>

<style>
    /* ---- Controls (same pattern as NavDemo) ---- */
    .header-controls {
        display: flex;
        flex-wrap:wrap;
        gap: 1rem 2rem;
        margin-bottom: 1.5rem;
        padding: 1rem 1.25rem;
        background: var(--card);
        border-radius: 10px;
        border: 1.5px solid var(--highlight);
    }

    .control-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .control-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }

    .control-options { 
        display: flex; 
        gap: 0.35rem; 
    }

    .opt-btn {
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        border: 1.5px solid var(--highlight);
        background: transparent;
        color: var(--text-muted);
        font-size: 0.72rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        text-transform: lowercase;
    }

    .opt-btn:hover { 
        border-color: var(--accent); 
        color: var(--accent); 
    }

    .opt-btn.opt-active { 
        background: var(--accent); 
        border-color: var(--accent); 
        color: var(--text-accent); 
    }

    /* ---- Preview ---- */
    .header-preview {
        border: 1.5px solid var(--highlight);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 0.75rem;
        background: var(--bg);
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
        background: var(--highlight);
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
        font-family: var(--font-heading);
        letter-spacing: 0.5px;
    }

    :global(.mock-icon) {
        font-size: 1.75rem;
    }

    :global(.mock-icon-accent) {
        color: var(--accent);
    }

    :global(.mock-icon-tone) {
        color: var(--text-accent);
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
        border: 1.5px solid var(--highlight);
        border-radius: 12px;
        overflow: hidden;
        background: var(--bg);
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
        background: var(--card);
        border-top: 1.5px solid var(--highlight);
        border-bottom: 1.5px solid var(--highlight);
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
        color: var(--text-muted);
        font-style: italic;
    }

    .sim-nav-items {
        display: flex;
        gap: 1rem;
    }

    .sim-nav-item {
        font-size: 0.78rem;
        font-weight: 700;
        font-family: var(--font-heading);
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--text-muted);
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
        border: 1.5px solid var(--highlight);
        background: transparent;
        color: var(--text);
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family:  inherit;
    }

    .sim-toggle:hover {
        border-color: var(--accent);
        color: var(--accent);
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
        background: color-mix(in srgb, var(--ctx-success, #4caf50) 15%, transparent);
        color: var(--ctx-success, #4caf50);
    }

    .badge-off {
        background: color-mix(in srgb, var(--ctx-warning, #ff9800) 15%, transparent);
        color: var(--ctx-warning, #ff9800);
    }

    /* sim-logo inside sim-nav reuses mock-wordmark global styles */
    :global(.sim-logo .mock-icon) {
        font-size: 1.25rem;
    }

    :global(.sim-logo .mock-name) {
        font-size: 0.8rem;
    }
</style>
