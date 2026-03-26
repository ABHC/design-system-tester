<script lang="ts">
    import { createRawSnippet }  from "svelte";
    import type { Translation }  from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Avatar from "../design-system/components/Avatar/avatar.svelte";
    import Sidebar from "../design-system/components/Sidebar/Sidebar.svelte";
    import type { SidebarItem } from "../design-system/components/Sidebar/Sidebar.svelte";
    import Selector from "../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../design-system/components/Selector/ControlBar.svelte";
    import CodeBlock  from "../design-system/components/CodeBlock/CodeBlock.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    type Direction = "left" | "right";
    type Palette = "accent" | "tone";
    type Position = "fixed" | "floating";

    type ItemType = "buttons" | "listitems" | "mixed";

    let demo_direction: Direction = $state("left");
    let demo_palette: Palette = $state("accent");
    let demo_position: Position = $state("floating");
    let demo_rounded: boolean = $state(true);
    let demo_roundedBtn: boolean = $state(true);
    let demo_open: boolean = $state(true);
    let demo_item_type: ItemType = $state("mixed");

    // Active item tracking
    let active: string = $state("Dashboard");

    // Icon snippets — Material Symbols via createRawSnippet
    const make_icon = (name: string) => createRawSnippet(() => ({
        render: () => `<span class="material-symbols-outlined">${name}</span>`,
    }));

    const icon_home = make_icon("home");
    const icon_components = make_icon("widgets");
    const icon_palette = make_icon("palette");
    const icon_type = make_icon("text_fields");
    const icon_settings = make_icon("settings");
    const icon_btn = make_icon("smart_button");
    const icon_pin = make_icon("push_pin");

    // Items — vary by demo_item_type
    const sidebar_items = $derived.by<SidebarItem[]>(() => {

        if (demo_item_type === "buttons") return [
            {
                type: "button",
                // layout omitted → defaults to "column" (stacked full-width)
                items: [
                    { 
                        icon: icon_home, 
                        label: "Dashboard",  
                        active: active === "Dashboard",  
                        onclick: () => { active = "Dashboard";  } 
                    },
                    { 
                        icon: icon_components, 
                        label: "Components", 
                        active: active === "Components", 
                        onclick: () => { active = "Components"; } 
                    },
                    { 
                        icon: icon_palette, 
                        label: "Colours", 
                        active: active === "Colours",
                        onclick: () => { active = "Colours"; } 
                    },
                    { icon: icon_type, 
                        label: "Typography", 
                        active: active === "Typography", 
                        onclick: () => { active = "Typography"; } 
                    },
                    { 
                        icon: icon_settings, 
                        label: "Settings", 
                        active: active === "Settings", 
                        onclick: () => { active = "Settings"; } 
                    },
                ],
            },
        ];

        if (demo_item_type === "listitems") return [
            {
                type: "listitem",
                // layout omitted → defaults to "column"
                items: [
                    { 
                        main: "Button.svelte",  
                        extra: "src/components", 
                        active: active === "Button.svelte",  
                        onclick: () => { active = "Button.svelte"; } 
                    },
                    { 
                        main: "tokens.css", 
                        extra: "design-system", 
                        active: active === "tokens.css", 
                        onclick: () => { active = "tokens.css"; } 
                    },
                    { 
                        main: "App.svelte", 
                        extra: "src/routes", 
                        active: active === "App.svelte", 
                        onclick: () => { active = "App.svelte"; } 
                    },
                    { 
                        main: "+layout.svelte", 
                        extra: "src/routes", 
                        active: active === "+layout.svelte", 
                        onclick: () => { active = "+layout.svelte"; } 
                    },
                ],
            },
        ];

        // mixed — compact icon row + separator with label + pinned files
        return [
            {
                type: "button",
                layout: "row",   // icons side by side
                items: [
                    { 
                        icon: icon_home, 
                        label: "Home", 
                        active: active === "Home", 
                        onclick: () => { active = "Home"; } 
                    },
                    { 
                        icon: icon_components, 
                        label: "Components", 
                        active: active === "Components", 
                        onclick: () => { active = "Components"; } 
                    },
                    { 
                        icon: icon_btn, 
                        label: "Buttons",
                        active: active === "Buttons", 
                        onclick: () => { active = "Buttons"; } 
                    },
                    { 
                        icon: icon_settings, 
                        label: "Settings", 
                        active: active === "Settings",
                        onclick: () => { active = "Settings"; } 
                    },
                ],
            },
            { type: "separator", label: "Pinned files" },
            {
                type: "listitem",
                items: [
                    { 
                        main: "Button.svelte", 
                        extra: "Pinned", 
                        active: active === "Button.svelte",  
                        onclick: () => { active = "Button.svelte"; } 
                    },
                    { 
                        main: "tokens.css", 
                        extra: "Pinned", 
                        active: active === "tokens.css", 
                        onclick: () => { active = "tokens.css"; } 
                    },
                    { 
                        main: "+layout.svelte", 
                        extra: "Pinned", 
                        active: active === "+layout.svelte", 
                        onclick: () => { active = "+layout.svelte"; } 
                    },
                ],
            },
        ];
    });

    // ── Code examples ──────────────────────────────────────────────────────────

    const usage_nav = `<!-- Navigation sidebar — buttons stacked vertically (default layout) -->
<script lang="ts">
    import { createRawSnippet } from "svelte";
    import Sidebar from "./Sidebar.svelte";
    import type { SidebarItem } from "./Sidebar.svelte";

    const icon = (name: string) => createRawSnippet(() => ({
        render: () => \`<span class="material-symbols-outlined">\${name}</span>\`,
    }));

    let open   = $state(true);
    let active = $state("Dashboard");

    const items: SidebarItem[] = $derived([
        {
            type: "button",
            // layout is optional — omit for the default "column" (full-width stacked)
            items: [
                { icon: icon("home"),        label: "Dashboard",  active: active === "Dashboard",  onclick: () => { active = "Dashboard";  } },
                { icon: icon("widgets"),     label: "Components", active: active === "Components", onclick: () => { active = "Components"; } },
                { icon: icon("palette"),     label: "Colours",    active: active === "Colours",    onclick: () => { active = "Colours";    } },
                { icon: icon("text_fields"), label: "Typography", active: active === "Typography", onclick: () => { active = "Typography"; } },
                { icon: icon("settings"),    label: "Settings",   active: active === "Settings",   onclick: () => { active = "Settings";   } },
            ],
        },
    ]);
<\/script>

<Sidebar position="floating" direction="left" palette="accent" rounded {open} {items} />`;

    const usage_row_buttons = `<!-- Row layout — icon buttons displayed side by side -->
<script lang="ts">
    import { createRawSnippet } from "svelte";
    import Sidebar from "./Sidebar.svelte";
    import type { SidebarItem } from "./Sidebar.svelte";

    const icon = (name: string) => createRawSnippet(() => ({
        render: () => \`<span class="material-symbols-outlined">\${name}</span>\`,
    }));

    let open   = $state(true);
    let active = $state("Home");

    const items: SidebarItem[] = $derived([
        {
            type: "button",
            layout: "row",   // buttons side by side, equal width
            items: [
                { icon: icon("home"),     label: "Home",     active: active === "Home",     onclick: () => { active = "Home";     } },
                { icon: icon("widgets"),  label: "Widgets",  active: active === "Widgets",  onclick: () => { active = "Widgets";  } },
                { icon: icon("settings"), label: "Settings", active: active === "Settings", onclick: () => { active = "Settings"; } },
            ],
        },
    ]);
<\/script>

<Sidebar position="floating" direction="left" palette="accent" rounded {open} {items} />`;

    const usage_separator = `<!-- Separator — plain divider or with an optional section label -->
<script lang="ts">
    import Sidebar from "./Sidebar.svelte";
    import type { SidebarItem } from "./Sidebar.svelte";

    let open   = $state(true);
    let active = $state("Home");

    const items: SidebarItem[] = $derived([
        {
            type: "button",
            layout: "row",
            items: [
                { icon: icon("home"),     label: "Home",     active: active === "Home",     onclick: () => { active = "Home";     } },
                { icon: icon("settings"), label: "Settings", active: active === "Settings", onclick: () => { active = "Settings"; } },
            ],
        },

        // Plain divider — no label
        { type: "separator" },

        {
            type: "listitem",
            items: [
                { main: "Button.svelte", extra: "src/components", active: active === "Button.svelte", onclick: () => { active = "Button.svelte"; } },
            ],
        },

        // Divider with a section title
        { type: "separator", label: "Pinned files" },

        {
            type: "listitem",
            items: [
                { main: "tokens.css", extra: "design-system", active: active === "tokens.css", onclick: () => { active = "tokens.css"; } },
            ],
        },
    ]);
<\/script>

<Sidebar position="floating" direction="left" palette="tone" rounded {open} {items} />`;

    const usage_listitems = `<!-- List-item variant — recent files, users, channels… -->
<script lang="ts">
    import Sidebar from "./Sidebar.svelte";
    import type { SidebarItem } from "./Sidebar.svelte";

    let open   = $state(true);
    let active = $state("Button.svelte");

    const items: SidebarItem[] = $derived([
        {
            type: "listitem",
            // layout is optional — omit for the default "column"
            items: [
                { main: "Button.svelte",  extra: "src/components", active: active === "Button.svelte",  onclick: () => { active = "Button.svelte";  } },
                { main: "tokens.css",     extra: "design-system",  active: active === "tokens.css",     onclick: () => { active = "tokens.css";     } },
                { main: "App.svelte",     extra: "src/routes",     active: active === "App.svelte",     onclick: () => { active = "App.svelte";     } },
                { main: "+layout.svelte", extra: "src/routes",     active: active === "+layout.svelte", onclick: () => { active = "+layout.svelte"; } },
            ],
        },
    ]);
<\/script>

<!-- tone palette works well for file trees -->
<Sidebar position="floating" direction="left" palette="tone" rounded {open} {items} />`;

    const usage_fixed = `<!-- Fixed sidebar — overlays the viewport, closes on scrim click -->
<!-- offset_top clears a fixed header; offset_bottom clears a footer  -->
<script lang="ts">
    let sidebar_open = $state(false);
<\/script>

<header style="position:fixed; height:64px; width:100%">…</header>

<Sidebar
    position="fixed"
    direction="left"
    palette="tone"
    rounded
    offset_top="64px"
    open={sidebar_open}
    onclose={() => { sidebar_open = false; }}
    items={nav_items}
/>

<!-- A hamburger button that opens the sidebar -->
<button onclick={() => { sidebar_open = true; }}>
    <span class="material-symbols-outlined">menu</span>
<\/button>`;

    const usage_slots = `<!-- Brand header + user footer via snippet slots -->
{#snippet sidebar_header()}
    <div style="display:flex; align-items:center; gap:.5rem; width:100%">
        <span class="material-symbols-outlined">layers</span>
        <strong>Épinard</strong>
        <button style="margin-left:auto" onclick={() => { open = false; }}>
            <span class="material-symbols-outlined">close</span>
        <\/button>
    <\/div>
{/snippet}

{#snippet sidebar_footer()}
    <div style="display:flex; align-items:center; gap:.6rem; width:100%">
        <Avatar size="sm" circular label="AB" status="online" \/>
        <span style="font-weight:600; font-size:.8rem">Alice B.<\/span>
    <\/div>
{/snippet}

<Sidebar
    position="floating"
    direction="left"
    palette="accent"
    rounded
    {open}
    header={sidebar_header}
    footer={sidebar_footer}
    items={nav_items}
/>`;
</script>

<!-- Section headline -->
<Headline size="md" uppercase>
    {trans?.sidebar.title}
</Headline>

<!-- Controls -->
<ControlBar palette="tone" rounded>
    <Selector 
        label="Direction" 
        options={["left", "right"]} 
        bind:value={demo_direction} 
    />
    <Selector 
        label="Palette"
        options={["accent", "tone"]} 
        bind:value={demo_palette} 
    />
    <Selector 
        label="Position" 
        options={["fixed", "floating"]} 
        bind:value={demo_position} 
    />
    <Selector 
        label="Rounded" 
        options={[{value: true, label: "on"}, 
        {value: false, label: "off"}]} 
        bind:value={demo_rounded}
    />
    <Selector 
        label="Rounded Btn" 
        options={[{value: true, label: "on"}, 
        {value: false, label: "off"}]} 
        bind:value={demo_roundedBtn} 
    />
    <Selector 
        label="Items"
        options={["buttons", "listitems", "mixed"]} 
        bind:value={demo_item_type}
        onchange={(t) => { active = t === "listitems" ? "Button.svelte" : "Dashboard"; }}
    />
    <Selector 
        label="Open" 
        options={[{value: true, label: "open"}, {value: false, label: "closed"}]} 
        bind:value={demo_open}
    />
</ControlBar>

<!-- Preview -->
<div class="sidebar-preview sidebar-preview--{demo_direction}">

    <div class="preview-sidebar-slot">
        <Sidebar
            position="floating"
            direction={demo_direction}
            palette={demo_palette}
            rounded={demo_rounded}
            roundedBtn={demo_roundedBtn}
            open={demo_open}
            items={sidebar_items}
        >
            <!-- Header slot: brand mark + close button -->
            {#snippet header()}
                <div class="preview-brand">
                    <span class="material-symbols-outlined preview-brand-icon">layers</span>
                    <span class="preview-brand-name">Épinard</span>
                    <button
                        class="preview-close-btn"
                        onclick={() => { demo_open = false; }}
                        aria-label="Fermer la sidebar"
                    >
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            {/snippet}

            <!-- Footer slot: user profile -->
            {#snippet footer()}
                <div class="preview-user">
                    <Avatar 
                        palette={demo_palette === "accent" ? "tone" : "accent"}
                        size="sm" 
                        circular label="AB" 
                        status="online" 
                    />
                    <div class="preview-user-info">
                        <span class="preview-user-name">Alice B.</span>
                    </div>
                </div>
            {/snippet}
        </Sidebar>
    </div>

    <!-- Main content mock -->
    <div class="preview-main">
        <div class="mock-heading"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
    </div>

    {#if demo_position === "fixed"}
        <div class="fixed-note">
            ℹ️ <code>position="fixed"</code> overlays the real viewport —
            preview uses <code>floating</code> for layout safety.
        </div>
    {/if}
</div>

<!-- Code examples -->
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "nav (column)", code: usage_nav, language: "Svelte" },
        { label: "row buttons", code: usage_row_buttons, language: "Svelte" },
        { label: "separator", code: usage_separator, language: "Svelte" },
        { label: "list items", code: usage_listitems, language: "Svelte" },
        { label: "fixed + scrim", code: usage_fixed, language: "Svelte" },
        { label: "header & footer", code: usage_slots, language: "Svelte" },
    ]}
/>

<style>
    /* Preview box */
    .sidebar-preview {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: "sidebar main";
        min-height: 340px;
        background: var(--tone-bg);
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1.5rem;
        z-index: 10;
    }

    .sidebar-preview--right {
        grid-template-columns: 1fr auto;
        grid-template-areas: "main sidebar";
    }

    .preview-sidebar-slot {
        grid-area: sidebar;
        display: flex;
    }

    .preview-main {
        grid-area: main;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.25rem 1rem;
        align-self: center;
    }

    .mock-heading {
        height: 14px;
        width: 40%;
        background: var(--text);
        border-radius: 4px;
        margin-bottom: 0.5rem;
        opacity: 0.3;
    }

    .mock-line {
        height: 10px;
        background: var(--text);
        border-radius: 4px;
        width: 100%;
        opacity: 0.12;
    }

    .mock-line.short { width: 55%; }

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
        color: var(--accent);
    }

    /* Preview sidebar content */
    .preview-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        color: var(--sidebar-text, currentColor);
    }

    .preview-brand-icon {
        font-size: 1.4rem;
        opacity: 0.9;
    }

    .preview-brand-name {
        font-weight: 700;
        font-size: 1rem;
        letter-spacing: -0.02em;
    }

    .preview-close-btn {
        margin-left: auto;
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--sidebar-text, currentColor);
        opacity: 0.6;
        padding: 0.15rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transition: opacity 0.2s ease;
        flex-shrink: 0;
    }

    .preview-close-btn:hover { opacity: 1; }

    .preview-close-btn :global(.material-symbols-outlined) {
        font-size: 1.1rem;
    }

    .preview-user {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        width: 100%;
        color: var(--sidebar-text, currentColor);
    }

    .preview-user-info {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        min-width: 0;
    }

    .preview-user-name {
        font-weight: 600;
        font-size: 0.8rem;
        line-height: 1;
    }


</style>
