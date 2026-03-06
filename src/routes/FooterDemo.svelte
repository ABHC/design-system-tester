<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";

    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Footer from "../design-system/components/Footer/Footer.svelte";
    import Button from "../design-system/components/Button/Button.svelte";
    import Callout from "../design-system/components/Callout/Callout.svelte";
    import CodeBlock  from "../design-system/components/CodeBlock/CodeBlock.svelte";

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

<!-- Snippets -->

{#snippet social_preset()}
    <div class="demo-row">
        <div class="mock-social-links">
            {#each ["alternate_email", "code", "person"] as icon}
                <div class="mock-social-link">
                    <span class="material-symbols-outlined">{icon}</span>
                </div>
            {/each}
        </div>
        <p class="mock-copy">© 2025 — MIT License</p>
    </div>
{/snippet}

{#snippet minimal_preset()}
    <div class="demo-center">
        <p class="mock-copy">Built with SvelteKit · {placeholders.navigation.domus} · {placeholders.navigation.respublica}</p>
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
            {#each [placeholders.navigation.domus, placeholders.navigation.respublica, placeholders.navigation.lex] as label}
                <span class="mock-footer-link">{label}</span>
            {/each}
        </nav>
        <p class="mock-copy">© 2025 ACME Corp.</p>
    </div>
{/snippet}

<!-- Headline -->

<Headline size="md" uppercase>{trans?.footer_demo.title}</Headline>

<!-- Controls -->

<div class="footer-controls">
    <div class="control-group">
        <span class="control-label">Palette</span>
        <div class="control-options">
            {#each (["accent", "tone"] as const) as pal}
                <button
                    class="opt-btn"
                    class:opt-active={demo_palette === pal}
                    onclick={() => demo_palette = pal}
                >
                    {pal}
                </button>
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
            {#each (["social", "minimal", "brand"] as const) as preset}
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

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "social", code: code_social, language: "Svelte" },
        { label: "minimal", code: code_minimal, language: "Svelte" },
        { label: "brand", code: code_brand, language: "Svelte" },
    ]}
/>

<style>
    /* Controls (same pattern as HeaderDemo) */
    .footer-controls {
        display: flex;
        flex-wrap: wrap;
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

    /* Preview */
    .footer-preview {
        border: 1.5px solid var(--highlight);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 0.75rem;
        background: var(--bg);
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
        background: color-mix(in srgb, currentColor 15%, transparent);
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
