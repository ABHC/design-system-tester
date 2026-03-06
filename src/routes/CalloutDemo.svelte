<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";

    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Callout from "../design-system/components/Callout/Callout.svelte";
    import Button from "../design-system/components/Button/Button.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

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

<!-- Leading + following — Button variant="muted" hérite de --cb-color -->
{#snippet warn_icon()}
    <span class="material-symbols-outlined">warning</span>
{/snippet}

{#snippet dismiss()}
    <Button variant="muted" size="sm">Ignorer</Button>
{/snippet}

<Callout variant="warning" leading={warn_icon} following={dismiss}>
    <p>Les ides de mars approchent. Vérifiez vos accès avant de continuer.</p>
</Callout>

`;

    const code_composition = `<!-- align="start" + <code> dans le contenu + following -->
{#snippet tip_icon()}
    <span class="material-symbols-outlined">lightbulb</span>
{/snippet}

{#snippet action()}
    <Button variant="muted" size="sm">En savoir plus</Button>
{/snippet}

<Callout variant="accent" align="start" rounded leading={tip_icon} following={action}>
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

<!-- Headline -->

<Headline size="md" uppercase>{trans?.callout.title}</Headline>

<!-- Live preview -->

<div class="callout-preview">

    <!-- 1. info — minimal, no leading, rounded -->
    <Callout variant="info" align="center" rounded>
        {#snippet children()}
            <p>{placeholders.callout?.info ?? "An informational message."}</p>
        {/snippet}
    </Callout>

    <!-- 2. success — leading + following Button, rounded -->
    <Callout variant="success" align="center" rounded>
        {#snippet leading()}
            <span class="material-symbols-outlined">check_circle</span>
        {/snippet}
        {#snippet children()}
            <strong>Success</strong>
            <p>{placeholders.callout?.success ?? "The operation completed successfully."}</p>
        {/snippet}
        {#snippet following()}
            <Button variant="muted" size="sm">View</Button>
        {/snippet}
    </Callout>

    <!-- 3. warning — leading + following Button, not rounded -->
    <Callout variant="warning" align="center">
        {#snippet leading()}
            <span class="material-symbols-outlined">warning</span>
        {/snippet}
        {#snippet children()}
            <p>{placeholders.callout?.warning ?? "Proceed with caution."}</p>
        {/snippet}
        {#snippet following()}
            <Button variant="muted" size="sm">Dismiss</Button>
        {/snippet}
    </Callout>

    <!-- 4. error — leading, align="start", not rounded -->
    <Callout variant="error" align="start">
        {#snippet leading()}
            <span class="material-symbols-outlined">error</span>
        {/snippet}
        {#snippet children()}
            <strong>Error</strong>
            <p>{placeholders.callout?.error ?? "Something went wrong."}</p>
        {/snippet}
    </Callout>

    <!-- 5. accent — Tip, leading, align="start", <code>, rounded -->
    <Callout variant="accent" align="start" rounded>
        {#snippet leading()}
            <span class="material-symbols-outlined">lightbulb</span>
        {/snippet}
        {#snippet children()}
            <strong>Tip</strong>
            <p>
                Composez librement <code>leading</code>, <code>children</code> et <code>following</code>.
                Le slot <code>leading</code> hérite de <code>--cb-color</code> automatiquement.
                Préférez <code>align="start"</code> pour du contenu multi-lignes — l'icône s'ancre en haut.
                Un <code>Button variant="muted"</code> placé en <code>following</code> adopte la couleur du callout parent.
            </p>
        {/snippet}
    </Callout>

    <!-- 6. neutral — leading, align="center", not rounded -->
    <Callout variant="neutral" align="center">
        {#snippet leading()}
            <span class="material-symbols-outlined">
                chat_bubble
            </span>
        {/snippet}
        {#snippet children()}
            <strong>
                Note
            </strong>
            <p>
                {placeholders.callout?.neutral ?? "A neutral annotation."}
            </p>
        {/snippet}
    </Callout>


</div>

<!-- Code examples -->

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

<style>
    /* Preview */
    .callout-preview {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin-bottom: 1.5rem;
    }

</style>
