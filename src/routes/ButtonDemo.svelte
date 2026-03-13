<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Button from "../design-system/components/Button/Button.svelte";
    import BackToTop from "../design-system/components/BackToTop/BackToTop.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // Active tracking per variant
    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info";
    let active_flat: Palette | undefined = $state(undefined);
    let active_outlined: Palette | undefined = $state(undefined);
    let active_ghost: string | undefined = $state(undefined);
    let active_textual: Palette | undefined = $state(undefined);

    // Palette → demo button label mapping
    const flat_labels = $derived<Record<Palette, string>>({
        accent: placeholders?.buttons.accent ?? "",
        tone: placeholders?.buttons.tone ?? "",
        error: placeholders?.buttons.delete,
        warning: placeholders?.buttons.warning,
        success: placeholders?.buttons.confirm,
        info: placeholders?.buttons.info,
    });

    const outlined_labels = $derived<Record<Palette, string>>({
        accent: placeholders?.buttons.accent ?? "",
        tone: placeholders?.buttons.tone ?? "",
        error: placeholders?.buttons.delete,
        warning: placeholders?.buttons.warning,
        success: placeholders?.buttons.confirm,
        info: placeholders?.buttons.info,
    });
</script>

<Headline size="md" uppercase>
    {trans?.buttons.title}
</Headline>

<!-- Variant × Palette grid -->

<p class="demo-label">{trans?.buttons.lbl_flat}</p>
<div class="content">
    {#each (["accent", "tone", "error", "warning", "success", "info"] as const) as pal}
        <Button 
            variant="flat" 
            palette={pal} 
            active={active_flat === pal} 
            onclick={() => { active_flat = pal; }}
        >
            {flat_labels[pal]}
        </Button>
    {/each}
</div>

<p class="demo-label">{trans?.buttons.lbl_outlined}</p>
<div class="content">
    {#each (["accent", "tone", "error", "warning", "success", "info"] as const) as pal}
        <Button 
            variant="outlined" 
            palette={pal} rounded 
            active={active_outlined === pal} 
            onclick={() => { active_outlined = pal; }}
        >
            {outlined_labels[pal]}
        </Button>
    {/each}
</div>

<p class="demo-label">{trans?.buttons.lbl_ghost}</p>
<div class="demo-row">
    <div class="content on-accent">
        <Button 
            variant="ghost" 
            palette="accent" 
            rounded 
            active={active_ghost === "accent-rect"} 
            onclick={() => { active_ghost = "accent-rect"; }}
        >
            {placeholders?.buttons.rect}
        </Button>
        <Button 
            variant="ghost" 
            palette="accent" 
            rounded squared 
            active={active_ghost === "accent-sq"} 
            onclick={() => { active_ghost = "accent-sq"; }}
        >
            <icon class="material-symbols-outlined">star</icon>
            {placeholders?.buttons.squared}
        </Button>
    </div>

    <div class="content">
        <Button 
            variant="ghost" 
            palette="tone" 
            active={active_ghost === "tone-rect"} 
            onclick={() => { active_ghost = "tone-rect"; }}
        >
            {placeholders?.buttons.rect}
        </Button>
        <Button 
            variant="ghost" 
            palette="tone" 
            rounded 
            squared 
            active={active_ghost === "tone-sq"} 
            onclick={() => { active_ghost = "tone-sq"; }}
        >
            <icon class="material-symbols-outlined">star</icon>
            {placeholders?.buttons.squared}
        </Button>
    </div>
</div>

<p class="demo-label">{trans?.buttons.lbl_textual}</p>
<div class="demo-row">
    <div class="content on-accent">
        <Button 
            variant="textual" 
            palette="accent" 
            active={active_textual === "accent"} 
            onclick={() => { active_textual = "accent"; }}
        >
            {placeholders?.buttons.text}
        </Button>
    </div>
    <div class="content">
        {#each (["tone", "error", "warning", "success", "info"] as const) as pal}
            <Button 
                variant="textual" 
                palette={pal} 
                active={active_textual === pal} 
                onclick={() => { active_textual = pal; }}
            >
                {placeholders?.buttons.text}
            </Button>
        {/each}
    </div>
</div>

<!-- Sizes -->

<p class="demo-label">{trans?.buttons.lbl_sizes}</p>
<div class="content">
    <Button size="lg">{placeholders?.buttons.large}</Button>
    <Button>{placeholders?.buttons.medium}</Button>
    <Button size="sm">{placeholders?.buttons.small}</Button>
</div>

<!-- Modifiers -->

<p class="demo-label">{trans?.buttons.lbl_modifiers}</p>
<div class="content">
    <Button uppercase>{placeholders?.buttons.uppercase}</Button>
    <Button variant="flat" palette="tone" animate="left">
        <icon class="material-symbols-outlined">arrow_back</icon>
        {placeholders?.buttons.anim_left}
    </Button>
    <Button variant="flat" palette="accent" animate="top" rounded>
        <icon class="material-symbols-outlined">arrow_upward</icon>
        {placeholders?.buttons.anim_top}
    </Button>
    <Button variant="flat" palette="accent" animate="bottom" rounded>
        {placeholders?.buttons.anim_bottom}
        <icon class="material-symbols-outlined">arrow_downward</icon>
    </Button>
    <Button variant="flat" palette="tone" animate="right">
        {placeholders?.buttons.anim_right}
        <icon class="material-symbols-outlined">arrow_forward</icon>
    </Button>
    <Button squared rounded>
        <icon class="material-symbols-outlined">star</icon>
        {placeholders?.buttons.squared}
    </Button>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: "flat",
            code:
`<Button>Accent</Button>
<Button palette="tone">Neutral</Button>
<Button palette="error">Delete</Button>
<Button palette="success">Confirm</Button>`,
            language: "Svelte"
        },
        {
            label: "outlined",
            code:
`<Button variant="outlined" rounded>Tone</Button>
<Button variant="outlined" palette="tone" rounded>Neutral</Button>
<Button variant="outlined" palette="error" rounded>Delete</Button>`,
            language: "Svelte"
        },
        {
            label: "ghost",
            code:
`<!-- palette matches the container background -->
<!-- on accent bg: palette="accent" → light text + white-ish hover -->
<Button variant="ghost" palette="accent" rounded>Nav item</Button>
<Button variant="ghost" palette="accent" rounded squared>
    <span class="material-symbols-outlined">home</span>
    Home
</Button>

<!-- on neutral bg: palette="tone" → dark text + highlight hover -->
<Button variant="ghost" palette="tone">Nav item</Button>`,
            language: "Svelte"
        },
        {
            label: "textual",
            code:
`<Button variant="textual">Link-style</Button>
<Button variant="textual" palette="tone">Neutral</Button>
<Button variant="textual" palette="error">Error</Button>`,
            language: "Svelte"
        },
        {
            label: "active",
            code:
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
"{/each}",
            language: "Svelte"
        },
        {
            label: "sizes",
            code:
`<Button size="lg">Large</Button>
<Button>Medium (default)</Button>
<Button size="sm">Small</Button>`,
            language: "Svelte"
        },
        {
            label: "modifiers",
            code:
`<Button uppercase>Uppercase</Button>
<Button animate="left">
    <span class="material-symbols-outlined">arrow_back</span>
    Back
</Button>
<Button animate="right">
    Next
    <span class="material-symbols-outlined">arrow_forward</span>
</Button>
<Button animate="top" rounded>
    <span class="material-symbols-outlined">arrow_upward</span>
    Up
</Button>
<Button squared rounded>
    <span class="material-symbols-outlined">star</span>
    Label
</Button>`,
            language: "Svelte"
        },
    ]}
/>

<p class="demo-label">{trans?.buttons.back_to_top1} — <code>BackToTop</code></p>
<p class="demo-label">{trans?.buttons.back_to_top2}</p>

<div class="btt-preview">
    <BackToTop palette="accent" />
    <BackToTop palette="accent" round />
    <BackToTop palette="tone" />
    <BackToTop palette="tone" round />
    <BackToTop palette="accent" outlined />
    <BackToTop palette="tone" outlined />
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "accent", code: `<BackToTop />`, language: "Svelte" },
        { label: "accent round", code: `<BackToTop round />`, language: "Svelte" },
        { label: "tone", code: `<BackToTop palette="tone" />`, language: "Svelte" },
        { label: "tone round", code: `<BackToTop palette="tone" round />`, language: "Svelte" },
        { label: "accent outlined", code: `<BackToTop outlined />`, language: "Svelte" },
        { label: "tone outlined", code: `<BackToTop palette="tone" outlined />`, language: "Svelte" },
        {
            label: "left",
            code:
`<!-- position left/right define if BackToTop button is in bottom left/right corner the viewport -->
<BackToTop position="left" />`,
            language: "Svelte"
        },
    ]}
/>

<style>
    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 0.5rem;
    }

    .on-accent {
        background: var(--accent);
        padding: 1rem;
        border-radius: 8px;
    }

    .btt-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    /* Force static display for demo — overrides fixed positioning and scroll-triggered opacity */
    .btt-preview :global(.btt-btn) {
        position: static;
        opacity: 1;
        pointer-events: auto;
    }

    .demo-row {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem
    }

    .demo-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin: 0.75rem 0 0.4rem;
        font-style: italic;
    }

    .demo-label code {
        font-style: normal;
        background: var(--highlight);
        padding: 0.1em 0.35em;
        border-radius: 4px;
        font-size: 0.9em;
    }
</style>
