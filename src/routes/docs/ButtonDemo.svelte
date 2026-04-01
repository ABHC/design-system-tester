<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import BackToTop from "../../design-system/components/Button/BackToTop.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
	import ModeToggle from "../../design-system/components/Button/ModeToggle.svelte";
    import CopyButton from "../../design-system/components/Button/CopyButton.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // Demo state ──────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined" | "ghost" | "textual";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";
    type Animate = "none" | "left" | "right" | "top" | "bottom";
    type Bg = "bg" | "card" | "accent";
    type Direction = "row" | "column";

    let demo_variant: Variant = $state("flat");
    let demo_size: Size = $state("md");
    let demo_elevation: Elevation = $state("none");
    let demo_rounded: boolean = $state(false);
    let demo_uppercase: boolean = $state(false);
    let demo_animate: Animate = $state("none");
    let demo_bg: Bg = $state("bg");
    let demo_direction: Direction = $state("row");

    const bool_opts = [
        { value: true, label: "true" }, { value: false, label: "false" }
    ] as const;

    // Active state tracking
    let active_id: string | undefined = $state(undefined);

    // Animate prop — undefined when "none"
    const animate_prop = $derived(demo_animate === "none" ? undefined : demo_animate);

    // Code examples ───────────────────────────────────────────────────────

    const code_flat = `<Button>Accent</Button>
<Button palette="tone">Neutral</Button>
<Button palette="error">Delete</Button>
<Button palette="success">Confirm</Button>`;

    const code_outlined = `<Button variant="outlined" rounded>Accent</Button>
<Button variant="outlined" palette="tone" rounded>Neutral</Button>
<Button variant="outlined" palette="error" rounded>Delete</Button>`;

    const code_ghost = `<!-- palette matches the container background -->
<!-- on accent bg: palette="accent" → light text + white-ish hover -->
<Button variant="ghost" palette="accent" rounded>Nav item</Button>
<Button variant="ghost" palette="accent" rounded squared>
    <span class="material-symbols-outlined">home</span>
    Home
</Button>

<!-- on neutral bg: palette="tone" → dark text + highlight hover -->
<Button variant="ghost" palette="tone">Nav item</Button>`;

    const code_textual = `<Button variant="textual">Link-style</Button>
<Button variant="textual" palette="tone">Neutral</Button>
<Button variant="textual" palette="error">Error</Button>`;

    const code_active =
"<!-- Track active state per variant group -->\n" +
"<" + "script>\n" +
"    let active: string | undefined = $state(undefined);\n" +
"</" + "script>\n\n" +
"{#each ([\"accent\", \"tone\", \"error\"] as const) as pal}\n" +
"    <Button\n" +
"        palette={pal}\n" +
"        active={active === pal}\n" +
"        onclick={() => { active = pal; }}\n" +
"    >\n" +
"        {pal}\n" +
"    </Button>\n" +
"{/each}";

    const code_elevation = `<!-- Elevation appears on hover -->
<Button elevation="subtle">Subtle shadow</Button>
<Button elevation="hard">Hard shadow</Button>`;

    const code_modifiers = `<Button uppercase>Uppercase</Button>
<Button animate="left">
    <span class="material-symbols-outlined">arrow_back</span>
    Back
</Button>
<Button animate="right">
    Next
    <span class="material-symbols-outlined">arrow_forward</span>
</Button>
<Button squared rounded>
    <span class="material-symbols-outlined">star</span>
    Label
</Button>`;

    const code_sizes = `<Button size="lg">Large</Button>
<Button>Medium (default)</Button>
<Button size="sm">Small</Button>`;

    const code_back_to_top = `<!-- Fixed button — scrolls to top on click -->
<BackToTop />
<BackToTop palette="tone" rounded />
<BackToTop palette="accent" variant="outlined" />`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.buttons.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone" rounded>
    <Selector 
        label="Variant"
        options={["flat", "outlined", "ghost", "textual"]}
        bind:value={demo_variant} 
    />
    <Selector 
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size} 
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
    <Selector 
        label="Direction" 
        options={["row", "column"]} 
        bind:value={demo_direction} 
    />
    <Selector 
        label="Uppercase" 
        options={bool_opts} 
        bind:value={demo_uppercase} 
    />
    <Selector 
        label="Animate" 
        options={["none", "left", "right", "top", "bottom"]} 
        bind:value={demo_animate} 
    />
    <Selector 
        label="Background" 
        options={["bg", "tone", "accent", "accent-bg"]} 
        bind:value={demo_bg} 
    />
</ControlBar>

<!-- Live preview -->

<div
    class="btn-preview"
    style="background: var(--{demo_bg});"
>
    <!-- Accent palette buttons -->
    <div class="btn-group">
        <Button
            variant={demo_variant}
            palette="accent"
            size={demo_size}
            elevation={demo_elevation}
            rounded={demo_rounded}
            direction={demo_direction}
            uppercase={demo_uppercase}
            animate={animate_prop}
            active={active_id === "accent"}
            onclick={() => active_id = "accent"}
        >
            {placeholders.buttons.accent}
        </Button>
    </div>

    <!-- Tone palette buttons -->
    <div class="btn-group">
        <Button
            variant={demo_variant}
            palette="tone"
            size={demo_size}
            elevation={demo_elevation}
            rounded={demo_rounded}
            direction={demo_direction}
            uppercase={demo_uppercase}
            animate={animate_prop}
            active={active_id === "tone"}
            onclick={() => active_id = "tone"}
        >
            {placeholders.buttons.tone}
        </Button>
    </div>

    <!-- Contextual palette buttons -->
    <div class="btn-group">
        {#each ([
            { 
                pal: "error",   
                label: placeholders.buttons.delete,  
                icon: "delete" 
            },
            { 
                pal: "warning", 
                label: placeholders.buttons.warning, 
                icon: "warning" 
            },
            { 
                pal: "success", 
                label: placeholders.buttons.confirm, 
                icon: "check_circle" 
            },
            { 
                pal: "info",    
                label: placeholders.buttons.info, 
                icon: "info" 
            },
            { 
                pal: "neutral",    
                label: placeholders.buttons.neutral, 
                icon: "sticky_note_2" 
            },
        ] as const) as item}
            <Button
                variant={demo_variant}
                palette={item.pal}
                size={demo_size}
                elevation={demo_elevation}
                rounded={demo_rounded}
                direction={demo_direction}
                uppercase={demo_uppercase}
                animate={animate_prop}
                active={active_id === item.pal}
                onclick={() => active_id = item.pal}
            >
                <span class="material-symbols-outlined item-demo">
                    {item.icon}
                </span>
                {item.label}
            </Button>
        {/each}
    </div>
</div>

<!-- BackToTop ────────────────────────────────────────────────────────────────── -->

<div data-summary="back-to-top" data-summary-label={trans?.doc.back_to_top ?? "BackToTop"}>
    <Headline size="sm" uppercase muted>{trans?.doc.back_to_top ?? "BackToTop"}</Headline>
</div>

<p class="demo-label">{trans?.buttons.back_to_top1} — <code>BackToTop</code></p>
<p class="demo-label">{trans?.buttons.back_to_top2}</p>

<div class="btt-preview">
    <BackToTop palette="accent" elevation="hard" animate="top" />
    <BackToTop palette="accent" elevation="hard" animate="top" rounded />
    <BackToTop palette="tone" elevation="subtle" animate="top" />
    <BackToTop palette="tone" elevation="subtle" animate="top" rounded />
    <BackToTop palette="accent" variant="outlined" />
    <BackToTop palette="tone" variant="outlined" />
    <BackToTop palette="neutral" variant="flat" />
    <BackToTop palette="neutral" variant="outlined" />
</div>

<!-- ModeToogle ────────────────────────────────────────────────────────────────── -->

<div data-summary="mode-toggle" data-summary-label={trans?.doc.ModeToggle}>
    <Headline size="sm" uppercase muted>{trans?.doc.ModeToggle}</Headline>
</div>

<p class="demo-label">{trans?.buttons.back_to_top1} — <code>BackToTop</code></p>
<p class="demo-label">{trans?.buttons.back_to_top2}</p>

<div class="btt-preview">
    <ModeToggle palette="accent" elevation="hard" animate="top" />
    <ModeToggle palette="accent" elevation="hard" animate="top" rounded />
    <ModeToggle palette="tone" elevation="subtle" animate="top" />
    <ModeToggle palette="tone" elevation="subtle" animate="top" rounded />
    <ModeToggle palette="accent" variant="outlined" />
    <ModeToggle palette="tone" variant="outlined" />
    <ModeToggle palette="neutral" variant="flat" />
    <ModeToggle palette="neutral" variant="outlined" />
</div>

<!-- CopyButton ────────────────────────────────────────────────────────────────── -->

<div data-summary="copy-button" data-summary-label={trans?.doc.CopyButton}>
    <Headline size="sm" uppercase muted>{trans?.doc.CopyButton}</Headline>
</div>

<p class="demo-label">{trans?.buttons.back_to_top1} — <code>BackToTop</code></p>
<p class="demo-label">{trans?.buttons.back_to_top2}</p>

<div class="btt-preview">
    <CopyButton palette="accent" rounded />
    <CopyButton palette="tone" size="md" />
    <CopyButton palette="neutral" size="lg" rounded/>
    <CopyButton palette="info" size="lg"/>
    <CopyButton variant="outlined" palette="accent" rounded />
    <CopyButton variant="outlined" palette="tone" size="md" />
    <CopyButton variant="outlined" palette="neutral" size="lg" rounded/>
    <CopyButton variant="outlined" palette="info" size="lg"/>
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
            label: "flat", 
            code: code_flat, 
            language: "Svelte" 
        },
        { 
            label: "outlined",   
            code: code_outlined, 
            language: "Svelte" 
        },
        { 
            label: "ghost", 
            code: code_ghost,      
            language: "Svelte" 
        },
        { 
            label: "textual",    
            code: code_textual,     
            language: "Svelte" 
        },
        { 
            label: "active", 
            code: code_active, 
            language: "Svelte" 
        },
        { 
            label: "sizes", 
            code: code_sizes, 
            language: "Svelte" 
        },
        { 
            label: "modifiers",  
            code: code_modifiers,  
            language: "Svelte" 
        },
        { 
            label: "elevation",  
            code: code_elevation,  
            language: "Svelte" 
        },
        { 
            label: "BackToTop",  
            code: code_back_to_top, 
            language: "Svelte" 
        },
    ]}
/>

<!-- API ────────────────────────────────────────────────────────────────── -->
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
        { prop: "variant", type: '"flat" | "outlined" | "ghost" | "textual"', default: '"flat"' },
        { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"accent"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "uppercase", type: "boolean", default: "false" },
        { prop: "animate", type: '"left" | "right" | "top" | "bottom"', default: "undefined" },
        { prop: "active", type: "boolean", default: "false" },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "direction", type: '"row" | "column"', default: '"row"' },
        { prop: "aria_label", type: "string", default: "undefined" },
        { prop: "onclick", type: "() => void", default: "undefined" },
        { prop: "children", type: "Snippet", default: "\u2014" },
    ]}
/>

<style>
    .btn-preview {
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        align-items: center;
        transition: background 0.2s ease;
    }

    .btn-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
    }

    .btt-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    /* Force static display for demo */
    .btt-preview :global(.btt-wrapper),
    .btt-preview :global(.bmt-wrapper) {
        position: static;
        opacity: 1;
        pointer-events: auto;
    }

    .demo-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin: 0.75rem 0 0.4rem;
        font-style: italic;
    }

    .demo-label code {
        font-style: normal;
        background: var(--tone-hover);
        padding: 0.1em 0.35em;
        border-radius: 4px;
        font-size: 0.9em;
    }

    .item-demo {
        font-size: 100%;
    }
</style>
