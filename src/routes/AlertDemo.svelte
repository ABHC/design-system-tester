<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";

    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Callout from "../design-system/components/Callout/Callout.svelte";
    import Alert from "../design-system/components/Alert/Alert.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // Trigger counters — incrementing forces remount via {#key}
    let t_info = $state(0);
    let t_success = $state(0);
    let t_warning = $state(0);
    let t_error = $state(0);

    // ── Code examples ─────────────────────────────────────────────────────

    const code_info = `<!-- Info — top-center, slides in from bottom, auto-dismiss 5s, rounded -->
<!-- {#snippet children()} is implicit — content between the tags is rendered as children -->
<Alert variant="info" position="top-center" animate="bottom" duration={5} rounded>
    {#snippet leading()}
        <span class="material-symbols-outlined">info</span>
    {/snippet}
    <strong>Info</strong>
    <p>This design system has withstood 2000 years of trials.</p>
</Alert>`;

    const code_success = `<!-- Success — bottom-right, slides from left, auto-dismiss 4s, rounded -->
<!-- dismiss_label generates a btn-text dismiss button — no snippet needed -->
<Alert variant="success" position="bottom-right" animate="left" duration={4} rounded
    dismiss_label="Dismiss"
>
    {#snippet leading()}
        <span class="material-symbols-outlined">check_circle</span>
    {/snippet}
    {#snippet children()}
        <strong>Success</strong>
        <p>Your changes have been saved successfully.</p>
    {/snippet}
</Alert>`;

    const code_warning = `<!-- Warning — top-right, slides from left, 6s, inline link in children -->
<!-- <a> inside .alert-content inherits --al-color — no extra styling needed -->
<Alert variant="warning" position="top-right" animate="left" duration={6} dismissable>
    {#snippet children()}
        <p>
            Your session expires soon.
            <a href="/session/renew">Renew now</a>.
        </p>
    {/snippet}
</Alert>`;

    const code_error = `<!-- Error — bottom-left, slides from right, 5s, dismissable, leading icon -->
<Alert variant="error" position="bottom-left" animate="right" duration={5} dismissable>
    {#snippet leading()}
        <span class="material-symbols-outlined">error</span>
    {/snippet}
    {#snippet children()}
        <strong>Error</strong>
        <p>Connection lost. Please retry or contact support.</p>
    {/snippet}
</Alert>`;

</script>

<!-- Live alerts (fixed in viewport) ───────────────────────────────────── -->

{#if t_info > 0}
    {#key t_info}
        <Alert variant="info" position="top-center" animate="bottom" duration={5} rounded>
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">info</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{trans?.alerts.info_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.info}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_success > 0}
    {#key t_success}
        <Alert variant="success" position="bottom-right" animate="left" duration={4} rounded
            dismiss_label={trans?.alerts.dismiss}
        >
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">check_circle</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{trans?.alerts.success_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.success}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_warning > 0}
    {#key t_warning}
        <Alert variant="warning" position="top-right" animate="left" duration={6} dismissable>
            {#snippet children()}
                <p class="alert-demo-body">
                    {placeholders.alerts.warning_pre}
                    <a href="/session/renew">{placeholders.alerts.warning_link}</a>.
                </p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_error > 0}
    {#key t_error}
        <Alert variant="error" position="bottom-left" animate="right" duration={5} dismissable>
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">error</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{trans?.alerts.error_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.error}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}


<!-- Headline ──────────────────────────────────────────────────────────── -->

<Headline size="md" uppercase>{trans?.alerts.title}</Headline>

<!-- Instruction callout ───────────────────────────────────────────────── -->

<Callout variant="accent" align="center" rounded>
    {#snippet leading()}
        <span class="material-symbols-outlined">lightbulb</span>
    {/snippet}
    {#snippet children()}
        <p>{trans?.alerts.trigger}</p>
    {/snippet}
</Callout>

<!-- Trigger grid ───────────────────────────────────────────────────────── -->

<div class="alert-trigger-grid">

    <button class="trigger-btn trigger-info" onclick={() => t_info++}>
        <span class="material-symbols-outlined">info</span>
        <span class="trigger-label">Info</span>
        <span class="trigger-meta">top-center · bottom · 5s</span>
    </button>

    <button class="trigger-btn trigger-success" onclick={() => t_success++}>
        <span class="material-symbols-outlined">check_circle</span>
        <span class="trigger-label">Success</span>
        <span class="trigger-meta">bottom-right · left · 4s · btn-text</span>
    </button>

    <button class="trigger-btn trigger-warning" onclick={() => t_warning++}>
        <span class="material-symbols-outlined">warning</span>
        <span class="trigger-label">Warning</span>
        <span class="trigger-meta">top-right · left · 6s · ×</span>
    </button>

    <button class="trigger-btn trigger-error" onclick={() => t_error++}>
        <span class="material-symbols-outlined">error</span>
        <span class="trigger-label">Error</span>
        <span class="trigger-meta">bottom-left · right · 5s · ×</span>
    </button>


</div>

<!-- Code examples ─────────────────────────────────────────────────────── -->

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "info", code: code_info, language: "Svelte" },
        { label: "success", code: code_success, language: "Svelte" },
        { label: "warning", code: code_warning, language: "Svelte" },
        { label: "error", code: code_error, language: "Svelte" },
    ]}
/>

<style>
    /* Trigger grid */
    .alert-trigger-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin: 1.5rem 0;
    }

    .trigger-btn {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.15rem;
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-family: var(--font-body);
        transition: all 0.2s;
        min-width: 160px;
    }

    .trigger-btn .material-symbols-outlined { font-size: 1.3rem; }

    .trigger-label {
        font-size: 0.88rem;
        font-weight: 700;
        line-height: 1;
    }

    .trigger-meta {
        font-size: 0.7rem;
        opacity: 0.65;
        line-height: 1.3;
    }

    .trigger-btn:hover { 
        transform: translateY(-2px); 
    }

    .trigger-info    { 
        background: color-mix(in srgb, var(--ctx-info) 12%, var(--highlight) 88%); 
        color: var(--ctx-info);    
        border-left: 3px solid var(--ctx-info);    
    }

    .trigger-success { 
        background: color-mix(in srgb, var(--ctx-success) 12%, var(--highlight) 88%); 
        color: var(--ctx-success); 
        border-left: 3px solid var(--ctx-success); 
    }

    .trigger-warning { 
        background: color-mix(in srgb, var(--ctx-warning) 12%, var(--highlight) 88%); 
        color: var(--ctx-warning); 
        border-left: 3px solid var(--ctx-warning); 
    }
    
    .trigger-error   {
        background: color-mix(in srgb, var(--ctx-error) 12%, var(--highlight) 88%);
        color: var(--ctx-error); 
        border-left: 3px solid var(--ctx-error);
    }

    .trigger-meta {
        color: var(--text);
    }


    /* Alert content (global — snippets rendered inside Alert) */
    :global(.alert-demo-icon)  { font-size: 1.2rem; }

    :global(.alert-demo-title) {
        font-size: 0.8rem;
        font-weight: 700;
        line-height: 1.2;
    }

    :global(.alert-demo-body) {
        font-size: 0.82rem;
        line-height: 1.5;
        opacity: 0.9;
        margin: 0;
    }
</style>
