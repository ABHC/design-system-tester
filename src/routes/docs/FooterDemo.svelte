<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";

    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Footer from "../../design-system/components/Footer/Footer.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
    import Callout from "../../design-system/components/Callout/Callout.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import Slider from "../../design-system/components/Slider/Slider.svelte";
    import CodeBlock  from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    type Palette = "accent" | "tone";
    type Preset  = "social" | "minimal" | "brand";
    type Effect = "none" | "glow" | "blur" | "fade";
    type Mask = "none" | "fade" | "ellipse";
    type MaskDirection = "top" | "bottom" | "left" | "right";
    type PatternPreset = 
        "none" | 
        "scallops" | 
        "grid" | 
        "sunburst" | 
        "sunrise" | 
        "atoms" | 
        "lozenge" | 
        "waves" | 
        "diamonds" | 
        "shippo" | 
        "kumi_kikko";

    let demo_palette: Palette = $state("accent");
    let demo_rounded: boolean = $state(false);
    let demo_preset: Preset  = $state("social");
    let demo_pattern: PatternPreset = $state("none");
    let demo_pattern_color: string = $state("white");
    let demo_pattern_size: string = $state("auto");
    let demo_pattern_opacity: number = $state(40);
    let demo_pattern_effect: Effect = $state("none");
    let demo_pattern_effect_opacity: number = $state(100);
    let demo_pattern_mask: Mask = $state("none");
    let demo_pattern_mask_direction: MaskDirection = $state("left");
    let demo_pattern_mask_size: number = $state(70);

    const color_opts = [
        { value: "white", label: "white" },
        { value: "black", label: "black" },
        { value: "#aea03f", label: "gold" },
        { value: "#c0392b", label: "red" },
        { value: "#2c7a7b", label: "teal" },
    ] as const;

    const size_opts = [
        { value: "auto", label: "auto" },
        { value: "40px", label: "40" },
        { value: "60px", label: "60" },
        { value: "80px", label: "80" },
        { value: "120px", label: "120" },
    ] as const;

    // ── Code examples ─────────────────────────────────────────────────────────

    const code_social = `<!-- Social / portfolio — icon links left, copyright right -->
{#snippet social_links()}
    <a href="https://github.com/you" class="footer-icon-link" aria-label="GitHub" target="_blank">
        <!-- SVG icon -->
    </a>
    <a href="https://linkedin.com/in/you" class="footer-icon-link" aria-label="LinkedIn" target="_blank">
        <!-- SVG icon -->
    </a>
{/snippet}

{#snippet copyright()}
    <p>© 2025 — MIT License</p>
{/snippet}

<Footer palette="accent" leading={social_links} trailing={copyright} />`;

    const code_minimal = `<!-- Minimal — centered tagline only -->
<Footer palette="tone">
    <p style="text-align:center; font-size: 0.8rem;">
        Built with ❤️ using SvelteKit
    </p>
</Footer>`;

    const code_brand = `<!-- Brand — logo left, nav links center, legal right -->
{#snippet brand()}
    <div style="display:flex; align-items:center; gap:0.5rem; font-weight:800;">
        <span class="material-symbols-outlined">hexagon</span>
        <span>ACME</span>
    </div>
{/snippet}

{#snippet legal()}
    <p style="font-size:0.75rem; opacity:0.75;">© 2025 ACME Corp.</p>
{/snippet}

<Footer palette="accent" leading={brand} trailing={legal}>
    <nav style="display:flex; gap:1rem; justify-content:center;">
        <a href="/about">About</a>
        <a href="/work">Work</a>
        <a href="/contact">Contact</a>
    </nav>
</Footer>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Snippets -->

{#snippet social_preset()}
    <div class="demo-row">
        <div class="mock-social-links">
            {#each ["alternate_email", "code", "person"] as icon}
                <Button 
                    variant="ghost" 
                    palette={demo_palette} 
                    direction="column" 
                    size="sm" 
                    rounded
                >
                    <span class="material-symbols-outlined">{icon}</span>
                </Button>
            {/each}
        </div>
        <p class="mock-copy">© 2025 — MIT License</p>
    </div>
{/snippet}

{#snippet minimal_preset()}
    <div class="demo-center">
        <p class="mock-copy">Built with SvelteKit</p>
    </div>
{/snippet}

{#snippet brand_preset()}
    <div class="demo-row">
        <div class="mock-wordmark">
            <span
                class="material-symbols-outlined mock-icon
                    {demo_palette === 'tone' ? 'mock-icon-accent' : ''}"
            >
                hexagon
            </span>
            <span class="mock-name">
                ACME
            </span>
        </div>
        <nav class="mock-footer-nav">
            {#each [placeholders.navigation.label1, placeholders.navigation.label2, placeholders.navigation.label3] as label}
                <span class="mock-footer-link">{label}</span>
            {/each}
        </nav>
        <p class="mock-copy">© 2025 ACME Corp.</p>
    </div>
{/snippet}

<!-- Headline -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.footer_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
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
        label="Preset"
        options={["social", "minimal", "brand"]}
        bind:value={demo_preset}
    />
    <Selector
        label="Pattern"
        options={[
            "none", 
            "grid",
            "sunburst",
            "scallops",
            "waves",   
            "sunrise", 
            "atoms", 
            "lozenge",  
            "diamonds", 
            "shippo", 
            "kumi_kikko"
        ]}
        bind:value={demo_pattern}
    />
    <Selector
        label="Pattern color"
        options={color_opts}
        bind:value={demo_pattern_color}
    />
    <Selector
        label="Pattern size"
        options={size_opts}
        bind:value={demo_pattern_size}
    />
    <div class="slider-control">
        <span class="slider-label">Pattern opacity</span>
        <Slider
            palette="accent"
            size="sm"
            rounded
            min={0}
            max={100}
            step={5}
            bind:value={demo_pattern_opacity}
        />
    </div>
    <Selector
        label="Effect"
        options={["none", "glow", "blur", "fade"]}
        bind:value={demo_pattern_effect}
    />
    <div class="slider-control">
        <span class="slider-label">Effect opacity</span>
        <Slider
            palette="accent"
            size="sm"
            rounded
            min={0}
            max={100}
            step={5}
            bind:value={demo_pattern_effect_opacity}
        />
    </div>
    <Selector
        label="Mask"
        options={["none", "fade", "ellipse"]}
        bind:value={demo_pattern_mask}
    />
    <Selector
        label="Mask dir"
        options={["top", "bottom", "left", "right"]}
        bind:value={demo_pattern_mask_direction}
    />
    <div class="slider-control">
        <span class="slider-label">Mask size</span>
        <Slider
            palette="accent"
            size="sm"
            rounded
            min={0}
            max={100}
            step={5}
            bind:value={demo_pattern_mask_size}
        />
    </div>
</ControlBar>

<!-- Live preview -->

<div class="footer-preview">
    <!-- Mock page content above -->
    <div class="preview-body">
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
        <div class="mock-line"></div>
        <div class="mock-line short"></div>
    </div>

    <Footer
        palette={demo_palette}
        rounded={demo_rounded}
        pattern={demo_pattern}
        pattern_color={demo_pattern_color}
        pattern_opacity={demo_pattern_opacity / 100}
        pattern_size={demo_pattern_size === "auto" ? undefined : demo_pattern_size}
        pattern_effect={demo_pattern_effect}
        pattern_effect_opacity={demo_pattern_effect_opacity / 100}
        pattern_mask={demo_pattern_mask}
        pattern_mask_direction={demo_pattern_mask_direction}
        pattern_mask_size={demo_pattern_mask_size}
        style="padding: 10px 1.5rem"
        children={
            demo_preset === "social"   ? social_preset  :
            demo_preset === "minimal"  ? minimal_preset :
            brand_preset
        }
    />
</div>

<!-- Preset descriptions -->
<Callout variant="accent" align="start">
    {#snippet leading()}
        <span class="material-symbols-outlined">flex_no_wrap</span>
    {/snippet}
    {#snippet children()}
        <strong>{trans?.footer_demo.layout}</strong>
        {#if demo_preset === "social"}
            <p>
                {@html trans?.footer_demo.preset_social}
            </p>
        {:else if demo_preset === "minimal"}
            <p>
                {@html trans?.footer_demo.preset_minimal}
            </p>
        {:else}
            <p>
                {@html trans?.footer_demo.preset_brand}
            </p>
        {/if}
    {/snippet}
</Callout>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "social", code: code_social, language: "Svelte" },
        { label: "minimal", code: code_minimal, language: "Svelte" },
        { label: "brand", code: code_brand, language: "Svelte" },
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
            { prop: "palette", type: '"accent" | "tone"', default: '"accent"' },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "style", type: "string", default: "\u2014" },
            { prop: "pattern", type: '"none" | "scallops" | "grid" | "sunburst" | "sunrise" | "atoms" | "lozenge" | "waves" | "diamonds" | "shippo" | "kumi_kikko" | string', default: '"none"' },
            { prop: "pattern_color", type: "string", default: '"white"' },
            { prop: "pattern_opacity", type: "number", default: "0.4" },
            { prop: "pattern_size", type: "string", default: "undefined" },
            { prop: "pattern_effect", type: '"none" | "glow" | "blur" | "fade"', default: '"none"' },
            { prop: "pattern_effect_opacity", type: "number", default: "1" },
            { prop: "pattern_mask", type: '"none" | "fade" | "ellipse"', default: '"none"' },
            { prop: "pattern_mask_direction", type: '"top" | "bottom" | "left" | "right"', default: '"left"' },
            { prop: "pattern_mask_size", type: "number", default: "70" },
            { prop: "leading", type: "Snippet", default: "\u2014" },
            { prop: "children", type: "Snippet", default: "\u2014" },
            { prop: "trailing", type: "Snippet", default: "\u2014" },
        ]}
    />
</div>

<style>
    /* Preview */
    .footer-preview {
        border: 2px solid var(--tone-hover);
        overflow: hidden;
        margin-bottom: 1.5rem;
        background: var(--tone-bg);
    }

    .preview-body {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.25rem 1.5rem;
    }

    .mock-line {
        height: 10px;
        background: var(--tone-hover);
        border-radius: 4px;
        width: 100%;
    }

    .mock-line.short { width: 55%; }

    /* Demo content snippets  */
    .demo-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.6rem;
        width: 100%;
    }

    .demo-center {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .mock-social-links {
        display: flex;
        gap:     8px;
    }

    .mock-copy {
        font-size: 0.78rem;
        opacity: 0.75;
        margin: 0;
    }

    .mock-footer-nav {
        display: flex;
        gap: 1.5rem;
    }

    .mock-footer-link {
        font-size: 0.78rem;
        font-weight: 600;
        font-family: var(--font-heading);
        text-transform: uppercase;
        letter-spacing: 0.4px;
        opacity: 0.8;
        cursor: pointer;
    }

    .mock-footer-link:hover { opacity: 1; }

    /* ── Slider control ───────────────────────────────────────────────────── */

    .slider-control {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-width: 140px;
    }

    .slider-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }
</style>
