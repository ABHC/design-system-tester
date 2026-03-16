<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Nav from "../design-system/components/Nav/Nav.svelte";
    import Selector from "../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../design-system/components/Selector/ControlBar.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

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
    type DirectionBtn = "row" | "column";

    let demo_direction: Direction = $state("left");
    let demo_palette: Palette = $state("accent");
    let demo_position: Position = $state("floating");
    let demo_rounded: boolean = $state(true);
    let demo_squared: boolean = $state(true);
    let demo_directionBtn: DirectionBtn = $state("column");
    let demo_roundedBtn: boolean = $state(true);

    // Active item tracking
    let active_index = $state(0);

    // Labels ─────────────────────────────────────────────────────────
    const label1 = $derived(placeholders.navigation.label1);
    const label2 = $derived(placeholders.navigation.label2);
    const label3 = $derived(placeholders.navigation.label3);
    const label4 = $derived(placeholders.navigation.label4);

    // Code examples ─────────────────────────────────────────────────────────

    const usage_basic = `<!-- Floating side nav — core usage pattern -->
{#snippet icon_design()}
    <span class="material-symbols-outlined">design_services</span>
{/snippet}
{#snippet icon_code()}
    <span class="material-symbols-outlined">code</span>
{/snippet}

<Nav
    position="floating"
    direction="left"
    palette="accent"
    rounded
    squared
    items={[
        { icon: icon_design, label: "Design", active: true, onclick: () => {} },
        { icon: icon_code,   label: "Code",   onclick: () => {} },
    ]}
/>`;

    const usage_offset = `<!-- Fixed top bar sitting below a header via offset -->
<!-- offset shifts the nav away from its anchor edge    -->
<header style="height: 64px">…</header>

<Nav
    position="fixed"
    direction="top"
    palette="tone"
    offset="64px"
    items={navItems}
/>`;

    const usage_header_footer = `<!-- Logo in header slot, language selector in footer slot -->
<!-- Snippets are passed as props — no child slot syntax  -->
{#snippet logo_snippet()}
    <Logo size={32} />
{/snippet}

{#snippet lang_select()}
    <select bind:value={locale}>
        <option value="en">🇬🇧 EN</option>
        <option value="fr">🇫🇷 FR</option>
    </select>
{/snippet}

<Nav
    position="floating"
    direction="left"
    palette="accent"
    header={logo_snippet}
    footer={lang_select}
    items={navItems}
/>`;

    const usage_scroll_aware = `<!-- Logo appears in the nav once the page header scrolls out of view -->

<!-- In your layout script block: ─────────────────────────────
    let headerEl;
    let headerVisible = $state(true);

    onMount(() => {
        const obs = new IntersectionObserver(
            ([e]) => { headerVisible = e.isIntersecting; },
            { threshold: 0 }
        );
        obs.observe(headerEl);
        return () => obs.disconnect();
    });
────────────────────────────────────────────────────────────── -->

{#snippet logo_in_nav()}
    <Logo size={32} />
{/snippet}

<header bind:this={headerEl}>…</header>

<Nav
    position="floating"
    direction="top"
    palette="tone"
    header={headerVisible ? undefined : logo_in_nav}
    items={navItems}
/>`;
</script>

<!-- Svelte 5 note on icon Snippets -----------------------------------------
    Snippets are template-only constructs in Svelte 5. They cannot be defined
    in <script> and then referenced in data arrays. The correct pattern is:
    define {#snippet} blocks in the template, then pass them as NavItem.icon
    directly in the Nav items prop — which is what we do below. -->

<!-- Icon Snippets — agnostic to icon system: Material Symbols here, but can be
     any SVG, Simple Icons, img, or custom markup. -->
{#snippet icon1()}
    <span class="material-symbols-outlined">train</span>
{/snippet}
{#snippet icon2()}
    <span class="material-symbols-outlined">airlines</span>
{/snippet}
{#snippet icon3()}
    <span class="material-symbols-outlined">rocket_launch</span>
{/snippet}
{#snippet icon4()}
    <span class="material-symbols-outlined">Monitor</span>
{/snippet}

<Headline size="md" uppercase>
    {trans?.nav?.title}
</Headline>

<!-- Interactive controls -->
<ControlBar palette="tone" rounded>
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
        options={[{value: true, label: "yes"}, 
        {value: false, label: "no"}]} 
        bind:value={demo_rounded} 
    />
    <Selector 
        label="Buttons Direction"   
        options={["row", "column"]} 
        bind:value={demo_directionBtn} 
    />
    <Selector 
        label="Rounded Btn" 
        options={[{value: true, label: "on"}, 
        {value: false, label: "off"}]} 
        bind:value={demo_roundedBtn} 
    />
</ControlBar>

<!-- Live preview — 5-area CSS Grid simulating a mini-viewport.

    ┌─────────────────────┐
    │         top         │
    ├──────┬──────┬───────┤
    │ left │ main │ right │
    ├──────┴──────┴───────┤
    │        bottom       │
    └─────────────────────┘

    The Nav is placed in a slot div that maps to the correct grid area
    via class="nav-slot-{demo_direction}".
    Always rendered as position="floating" (sticky) inside the preview
    to prevent viewport bleed. A note explains the fixed behaviour. -->
<div class="nav-preview">

    <!-- Central mock content — always in the "main" grid area -->
    <div class="preview-main">
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
    </div>

    <!-- Nav positioned by direction via grid area class -->
    <div class="nav-slot nav-slot-{demo_direction}">
        <!--
            Icons passed as Snippets directly in the items prop.
            This is the canonical Svelte 5 usage pattern.
        -->
        <Nav
            position="floating"
            direction={demo_direction}
            palette={demo_palette}
            rounded={demo_rounded}
            directionBtn={demo_directionBtn}
            roundedBtn={demo_roundedBtn}
            items={[
                {
                    icon: icon1,
                    label: label1,
                    active: active_index === 0,
                    onclick: () => { active_index = 0; },
                },
                {
                    icon: icon2,
                    label: label2,
                    active: active_index === 1,
                    onclick: () => { active_index = 1; },
                },
                {
                    icon: icon3,
                    label: label3,
                    active: active_index === 2,
                    onclick: () => { active_index = 2; },
                },
                {
                    icon: icon4,
                    label: label4,
                    active: active_index === 3,
                    onclick: () => { active_index = 3; },
                },
            ]}
        />
    </div>

    {#if demo_position === "fixed"}
        <div class="fixed-note">
            ℹ️ <code>{trans?.nav.code}</code>
            {trans?.nav.fixed}
        </div>
    {/if}
</div>

<!-- ── Code examples ──────────────────────────────────────────────────────── -->
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { 
            label: "floating side nav", 
            code: usage_basic, 
            language: "Svelte" 
        },
        { 
            label: "fixed + offset", 
            code: usage_offset, 
            language: "Svelte" 
        },
        { 
            label: "header & footer", 
            code: usage_header_footer, 
            language: "Svelte" 
        },
        { 
            label: "scroll-aware logo", 
            code: usage_scroll_aware,  
            language: "Svelte" 
        },
    ]}
/>

<style>
    /* ── Preview grid ─────────────────────────────────────────────────────── */
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
        background: var(--bg);
        border: 1.5px solid var(--highlight);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1.5rem;
        padding: 10px;
        z-index: 10;
    }

    /* Central content skeleton */
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
        background: var(--highlight);
        border-radius: 4px;
        width: 100%;
    }

    .mock-line.short { width: 60%; }

    /* Nav slot containers — one per grid area */
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

    .nav-slot-left   {
        grid-area: left;
        justify-content: flex-start;
        align-items: center;
    }

    .nav-slot-right  {
        grid-area: right;
        justify-content: flex-end;
        align-items: center;
    }

    .nav-slot-top :global(.nav-component),
    .nav-slot-bottom :global(.nav-component) {
        width: 100%;
    }

    .nav-slot-left  :global(.nav-component),
    .nav-slot-right :global(.nav-component) {
        justify-content: center;
    }

    .nav-slot-left  :global(.nav-direction-left.nav-floating),
    .nav-slot-right :global(.nav-direction-right.nav-floating) {
        align-self: center;
        top: 0;
    }

    /* Fixed mode notice */
    .fixed-note {
        position:       absolute;
        bottom:         0.5rem;
        left:           50%;
        transform:      translateX(-50%);
        font-size:      0.7rem;
        color:          var(--text-muted);
        padding:        0.3rem 0.75rem;
        background:     var(--card);
        border-radius:  6px;
        border:         1px solid var(--highlight);
        white-space:    nowrap;
        pointer-events: none;
        z-index:        10;
    }

    .fixed-note code {
        font-size: 0.68rem;
        font-family: monospace;
        color: var(--accent-more);
    }
</style>