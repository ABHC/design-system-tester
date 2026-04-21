<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { BadgeItem } from '@abhc/spektral-ui';
    import {
        Badge,
        BadgeGroup,
        Headline,
        Callout,
        CodeBlock,
        DataTable,
        Selector,
        ControlBar
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const demo = $derived(placeholders.badges);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined";
    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";
    type Bg = "bg" | "card" | "accent";

    let demo_variant: Variant = $state("flat");
    let demo_size: Size = $state("md");
    let demo_pill: boolean = $state(true);
    let demo_uppercase: boolean = $state(false);
    let demo_elevation: Elevation = $state("none");
    let demo_interactive: boolean = $state(false);
    let demo_bg: Bg = $state("bg");

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Interactive state ────────────────────────────────────────────────────

    let click_count = $state(0);
    let active_filters: string[] = $state([...placeholders.badges.filters]);

    function remove_filter(label: string) {
        active_filters = active_filters.filter(f => f !== label);
    }

    // ── BadgeGroup demo ──────────────────────────────────────────────────────

    const group_badges = [
        { value: "svelte", label: "Svelte" },
        { value: "ts", label: "TypeScript" },
        { value: "css", label: "CSS" },
        { value: "design", label: "Design" },
        { value: "a11y", label: "A11y" },
    ];

    let group_selected: string[] = $state(["svelte"]);
    let group_single: string[] = $state([]);

    // ── Code examples ───────────────────────────────────────────────────────

    const code_variants = `<!-- flat (default) — all palettes -->
<Badge>accent</Badge>
<Badge palette="tone">tone</Badge>
<Badge palette="error">error</Badge>
<Badge palette="warning">warning</Badge>
<Badge palette="success">success</Badge>
<Badge palette="info">info</Badge>

<!-- outlined -->
<Badge variant="outlined">accent</Badge>
<Badge variant="outlined" palette="tone">tone</Badge>
<Badge variant="outlined" palette="error">error</Badge>`;

    const code_shape = `<!-- pill (default) = border-radius: 20px -->
<Badge>pill</Badge>

<!-- pill={false} = border-radius: 4px -->
<Badge pill={false}>rect</Badge>`;

    const code_trailing = `<!-- Icons Snippets -->
{#snippet icon_close()}
    <span class="material-symbols-outlined">close</span>
{/snippet}
{#snippet icon_open_in_new()}
    <span class="material-symbols-outlined">open_in_new</span>
{/snippet}

<!-- Decorative trailing icon -->
<Badge trailing={icon_open_in_new}>Link</Badge>

<!-- Actionable trailing — on_trailing_click makes it a button -->
<Badge
    pill={false}
    trailing={icon_close}
    trailing_label="Remove"
    on_trailing_click={() => remove(item)}
>
    Active filter
</Badge>`;

    const code_interactive = `<!-- Icon Snippet -->
{#snippet icon_open_in_new()}
    <span class="material-symbols-outlined">open_in_new</span>
{/snippet}
    
<!-- onclick → root becomes <button> -->
<Badge onclick={() => doSomething()}>Click me</Badge>

<!-- selected — mirrors hover style, useful for filter toggles -->
<Badge onclick={toggle} selected={isActive}>Toggle me</Badge>

<!-- href → root becomes <a> -->
<Badge variant="outlined" href="/page" trailing={icon_open_in_new}>
    Link
</Badge>`;

    const code_group = `<script>
    import BadgeGroup from "$ds/Badge/BadgeGroup.svelte";

    const skills = [
        { value: "svelte", label: "Svelte" },
        { value: "ts", label: "TypeScript" },
        { value: "css", label: "CSS" },
        { value: "design", label: "Design" },
    ];

    let selected: string[] = $state(["svelte"]);
    let single: string[] = $state([]);
<\/script>

<!-- Multiple select (default) -->
<BadgeGroup badges={skills} bind:selected />

<!-- Single select — deselects on re-click -->
<BadgeGroup badges={skills} bind:selected={single} multiple={false} />

<!-- Styled -->
<BadgeGroup
    badges={skills}
    variant="outlined"
    palette="tone"
    size="sm"
    pill={false}
    bind:selected
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Utils Snippets ────────────────────────────────────────────────────── -->

{#snippet icon_close()}
    <span class="material-symbols-outlined">close</span>
{/snippet}

{#snippet icon_open_in_new()}
    <span class="material-symbols-outlined">open_in_new</span>
{/snippet}

{#snippet icon_arrow_forward()}
    <span class="material-symbols-outlined">arrow_forward</span>
{/snippet}

{#snippet icon_check()}
    <span class="material-symbols-outlined">check</span>
{/snippet}

{#snippet icon_schedule()}
    <span class="material-symbols-outlined">schedule</span>
{/snippet}

{#snippet icon_add()}
    <span class="material-symbols-outlined">add</span>
{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.badge_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector 
        label="Variant" 
        options={["flat", "outlined"]} 
        bind:value={demo_variant} 
    />
    <Selector 
        label="Size" 
        options={["sm", "md", "lg"]} 
        bind:value={demo_size}
    />
    <Selector 
        label="Pill" 
        options={bool_opts} 
        bind:value={demo_pill}
    />
    <Selector 
        label="Uppercase" 
        options={bool_opts} 
        bind:value={demo_uppercase} 
    />
    <Selector 
        label="Elevation" 
        options={["none", "subtle", "hard"]} 
        bind:value={demo_elevation} 
    />
    <Selector 
        label="href or onclick ?" 
        options={bool_opts} 
        bind:value={demo_interactive} 
    />
    <Selector 
        label="Background" 
        options={["bg", "card", "accent"]} 
        bind:value={demo_bg} 
    />
</ControlBar>

<!-- Live preview -->

<div 
    class="badge-preview"
    style="background: var(--{demo_bg});"
>
    <!-- Flat / Outlined -->
    {#if demo_interactive}
        <div class="badge-group">
            <Badge
                variant={demo_variant}
                palette="accent"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                onclick={() => click_count++}
            >
                {demo.click_me}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="tone"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_add}
                onclick={() => click_count++}
            >
                {demo.add}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="error"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_close}
                onclick={() => click_count++}
            >
                {demo.filter_remove}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="warning"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_schedule}
                onclick={() => click_count++}
            >
                {demo.pending}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="success"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_check}
                onclick={() => click_count++}
            >
                {demo.confirm}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="info"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_arrow_forward}
                onclick={() => click_count++}
            >
                {demo.see_more}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="neutral"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                onclick={() => click_count++}
            >
                {demo.see_map}
            </Badge>
        </div>
    {:else}
        <div class="badge-group">
            <Badge
                variant={demo_variant}
                palette="accent"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
            >
                {demo.accent}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="tone"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
            >
                {demo.tone}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="error"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_arrow_forward}
            >
                {demo.delete}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="warning"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
            >
                {demo.warning}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="success"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
                trailing={icon_check}
            >
                {demo.validated}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="info"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
            >
                {demo.info}
            </Badge>
            <Badge
                variant={demo_variant}
                palette="neutral"
                size={demo_size}
                pill={demo_pill}
                uppercase={demo_uppercase}
                elevation={demo_elevation}
            >
                {demo.location}
            </Badge>
        </div>
    {/if}
    {#if click_count > 0}
        <span class="click-result">{click_count} {demo.click}{click_count > 1 ? 's' : ''}</span>
    {/if}
</div>

<!-- Trailing icon — dismissable filters -->

<p class="demo-label">{trans?.badge_demo.trailing} <code>on_trailing_click</code></p>
<div class="row">
    {#each active_filters as f (f)}
        <Badge
            variant="flat"
            palette="accent"
            pill={false}
            trailing={icon_close}
            trailing_label="{demo.filter_remove} {f}"
            on_trailing_click={() => remove_filter(f)}
        >
            {f}
        </Badge>
    {/each}
    {#if active_filters.length === 0}
        <span class="demo-empty">{demo.all_removed}</span>
    {/if}
</div>

<!-- Href badges -->

<p class="demo-label">{trans?.badge_demo.link} <code>href</code></p>
<div class="row">
    <Badge 
        variant="outlined" 
        palette="accent"
        elevation="subtle"
        href="#" 
        trailing={icon_open_in_new}
    >
        {demo.link}
    </Badge>
    <Badge 
        variant="flat" 
        palette="tone"
        elevation="hard"
        href="#"
    >
        {demo.learn_more}
    </Badge>
</div>

<!-- BadgeGroup -->

<p class="demo-label">{trans?.badge_demo.multiple}</p>
<div class="row">
    <BadgeGroup 
        badges={group_badges} 
        variant="outlined" 
        palette="tone" 
        bind:selected={group_selected} 
    />
</div>
<div class="row">
    <BadgeGroup 
        badges={group_badges} 
        palette="accent" 
        bind:selected={group_single} 
        multiple={false}
    />
</div>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Variants", code: code_variants, language: "Svelte" },
        { label: "Shape", code: code_shape, language: "Svelte" },
        { label: "Trailing", code: code_trailing, language: "Svelte" },
        { label: "Interactive", code: code_interactive, language: "Svelte" },
        { label: "BadgeGroup",  code: code_group, language: "Svelte" },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>

<div style="margin-bottom: 1rem;">
    <Callout variant="info">
        {#snippet leading()}
            <span class="material-symbols-outlined">package_2</span>
        {/snippet}
        {#snippet children()}
            {trans?.doc.types_notice}<br />
            <code>import type &lbrace; BadgeItem &rbrace; from '@abhc/spektral-ui';</code>
        {/snippet}
    </Callout>
</div>

<h4 class="api-subtitle">Badge</h4>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "variant", type: '"flat" | "outlined"', default: '"flat"' },
        { prop: "palette", type: '"accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info"', default: '"accent"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "uppercase", type: "boolean", default: "false" },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "pill", type: "boolean", default: "true" },
        { prop: "href", type: "string", default: "undefined" },
        { prop: "onclick", type: "() => void", default: "undefined" },
        { prop: "selected", type: "boolean", default: "false" },
        { prop: "trailing", type: "Snippet", default: "undefined" },
        { prop: "on_trailing_click", type: "() => void", default: "undefined" },
        { prop: "trailing_label", type: "string", default: "undefined" },
        { prop: "children", type: "Snippet", default: "\u2014" },
    ]}
/>

<h4 class="api-subtitle">BadgeGroup</h4>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "badges", type: "BadgeItem[]", default: "\u2014" },
        { prop: "selected", type: "string[]", default: "[]" },
        { prop: "multiple", type: "boolean", default: "true" },
        { prop: "variant", type: '"flat" | "outlined"', default: '"flat"' },
        { prop: "palette", type: '"accent" | "tone" | "error" | "warning" | "success" | "info" | "neutral"', default: '"accent"' },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
        { prop: "pill", type: "boolean", default: "true" },
        { prop: "gap", type: "string", default: '"0.5rem"' },
    ]}
/>

</div>

<style>
    .badge-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        align-items: center;
    }

    .badge-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
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

    .click-result {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-style: italic;
    }

    .demo-empty {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-style: italic;
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }
</style>
