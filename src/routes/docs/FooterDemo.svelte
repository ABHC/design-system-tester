<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";

    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Footer from "../../design-system/components/Footer/Footer.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
    import Callout from "../../design-system/components/Callout/Callout.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import CodeBlock  from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    type Palette = "accent" | "tone";
    type Preset  = "social" | "minimal" | "brand";

    let demo_palette:  Palette = $state("accent");
    let demo_rounded:  boolean = $state(false);
    let demo_preset:   Preset  = $state("social");

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

<Footer palette="accent" leading={social_links} following={copyright} />`;

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

<Footer palette="accent" leading={brand} following={legal}>
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

<ControlBar palette="tone" rounded>
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
        style="padding: 10px 1.5rem"
        children={
            demo_preset === "social"   ? social_preset  :
            demo_preset === "minimal"  ? minimal_preset :
            brand_preset
        }
    />
</div>

<!-- Preset descriptions -->
<Callout variant="accent" align="start" rounded>
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
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "following", type: "Snippet", default: "\u2014" },
    ]}
/>
</div>

<style>
    /* Preview */
    .footer-preview {
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 0.75rem;
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

    .mock-social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        transition: all 0.2s ease;
        opacity: 0.85;
    }

    .mock-social-link:hover {
        opacity: 1;
        background: var(--tone-ghost);
    }

    .mock-copy {
        font-size: 0.78rem;
        opacity: 0.75;
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
</style>
