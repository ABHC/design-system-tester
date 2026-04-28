<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Callout, 
        Button, 
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

    // -- Demo state -----------------------------------------------------------

    type Variant = "accent" | "neutral" | "error" | "warning" | "success" | "info";
    type Align = "center" | "start";

    let demo_variant: Variant = $state("accent");
    let demo_align: Align = $state("center");
    let demo_rounded: boolean = $state(false);
    let demo_bordered: boolean = $state(false);

    const bool_opts = [{ value: true, label: "yes" }, { value: false, label: "no" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_essentials = `<!-- {#snippet children()} is implicit — content between the tags is rendered as children -->
<Callout variant="info" rounded>
    <p>Les légions romaines parcouraient 30 km par jour sur leurs routes pavées.</p>
</Callout>

<!-- Leading icon -->
{#snippet icon()}
    <span class="material-symbols-outlined">check_circle</span>
{/snippet}

<Callout variant="success" leading={icon}>
    <strong>Succès</strong>
    <p>La lex a été promulguée avec succès.</p>
</Callout>

<!-- Leading + trailing — Button variant="ghost" palette="tone" hérite de --cb-color -->
{#snippet warn_icon()}
    <span class="material-symbols-outlined">warning</span>
{/snippet}

{#snippet dismiss()}
    <Button variant="ghost" palette="tone" size="sm">Ignorer</Button>
{/snippet}

<Callout variant="warning" leading={warn_icon} trailing={dismiss}>
    <p>Les ides de mars approchent. Vérifiez vos accès avant de continuer.</p>
</Callout>

`;

    const code_composition = `<!-- align="start" + <code> dans le contenu + trailing -->
{#snippet tip_icon()}
    <span class="material-symbols-outlined">lightbulb</span>
{/snippet}

{#snippet action()}
    <Button variant="ghost" palette="tone" size="sm">En savoir plus</Button>
{/snippet}

<Callout variant="accent" align="start" rounded leading={tip_icon} trailing={action}>
    <strong>Tip</strong>
    <p>
        Préférez <code>align="start"</code> pour du contenu multi-lignes —
        l'icône <code>leading</code> s'ancre en haut plutôt que de flotter au centre.
        Le slot <code>leading</code> hérite automatiquement de <code>--cb-color</code>.
    </p>
</Callout>

<!-- Error — align="start", champs en <code>, rounded=false -->
{#snippet err_icon()}
    <span class="material-symbols-outlined">error</span>
{/snippet}

<Callout variant="error" align="start" leading={err_icon}>
    <strong>Validation</strong>
    <p>
        Champs requis : <code>name</code>, <code>email</code>, <code>message</code>.
    </p>
</Callout>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Headline -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.callout_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone" rounded>
    <Selector
        label="Variant"
        options={["accent", "neutral", "info", "success", "warning", "error"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Align"
        options={["center", "start"]}
        bind:value={demo_align}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Bordered"
        options={bool_opts}
        bind:value={demo_bordered}
    />
</ControlBar>

<!-- Live preview -->

<div class="callout-preview">
    <Callout 
        variant={demo_variant} 
        align={demo_align} 
        rounded={demo_rounded} 
        bordered={demo_bordered}
    >
        {#snippet leading()}
            <span class="material-symbols-outlined">lightbulb</span>
        {/snippet}
        {#snippet children()}
            <strong>Tip</strong>
            <p>{@html placeholders?.callout.tip}</p>
        {/snippet}
        {#snippet trailing()}
            <Button 
                variant="ghost" 
                palette={demo_variant} 
                size="sm"
            >
                {placeholders?.callout.view}
            </Button>
        {/snippet}
    </Callout>

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
            label: "essentials",  
            code: code_essentials,  
            language: "Svelte" 
        },
        { 
            label: "composition", 
            code: code_composition, 
            language: "Svelte" 
        },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
<Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "variant", type: '"accent" | "neutral" | "error" | "warning" | "success" | "info"', default: '"info"' },
        { prop: "align", type: '"center" | "start"', default: '"center"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "bordered", type: "boolean", default: "false" },
        { prop: "style", type: "string", default: "\u2014" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
    ]}
/>
</div>

<style>
    /* Preview */
    .callout-preview {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin-bottom: 1.5rem;
    }

</style>
