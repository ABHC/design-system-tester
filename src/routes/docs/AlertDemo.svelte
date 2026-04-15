<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";

    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Callout from "../../design-system/components/Callout/Callout.svelte";
    import Alert from "../../design-system/components/Alert/Alert.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // Interactive demo state
    type Variant  = "neutral" | "info" | "success" | "warning" | "error";
    type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    type Animate  = "none" | "top" | "bottom" | "left" | "right";

    let demo_variant: Variant = $state("info");
    let demo_position: Position = $state("bottom-right");
    let demo_animate: Animate = $state("none");
    let demo_rounded: boolean = $state(false);
    let demo_dismissable: boolean = $state(false);
    let t_interactive = $state(0);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    const animate_prop = $derived(
        demo_animate === "none" ? false : demo_animate as "top" | "bottom" | "left" | "right"
    );

    const variant_icons: Record<Variant, string> = {
        neutral: "sticky_note_2",
        info: "info",
        success: "check_circle",
        warning: "warning",
        error: "error",
    };

    const demo_title = $derived(({
        neutral: placeholders.alerts.neutral_title,
        info: placeholders.alerts.info_title,
        success: placeholders.alerts.success_title,
        warning: placeholders.alerts.warning_title,
        error: placeholders.alerts.error_title,
    } as Record<Variant, string>)[demo_variant]);

    const demo_body = $derived(({
        neutral: placeholders.alerts.neutral,
        info: placeholders.alerts.info,
        success: placeholders.alerts.success,
        warning: placeholders.alerts.warning_pre,
        error: placeholders.alerts.error,
    } as Record<Variant, string>)[demo_variant]);

    // Trigger counters — incrementing forces remount via {#key}
    let t_info = $state(0);
    let t_success = $state(0);
    let t_warning = $state(0);
    let t_error = $state(0);
    let t_neutral = $state(0);

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

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Live alerts (fixed in viewport) ───────────────────────────────────── -->

{#if t_error > 0}
    {#key t_error}
        <Alert 
            variant="error" 
            position="bottom-left" 
            animate="right" 
            duration={5} 
            dismissable
        >
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">error</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{placeholders?.alerts.error_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.error}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_warning > 0}
    {#key t_warning}
        <Alert 
            variant="warning" 
            position="top-right" 
            animate="left" 
            duration={6} 
            dismissable
        >
            {#snippet children()}
                <p class="alert-demo-body">
                    {placeholders.alerts.warning_pre}
                    <a href="/session/renew">{placeholders.alerts.warning_link}</a>.
                </p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_success > 0}
    {#key t_success}
        <Alert 
            variant="success" 
            position="bottom-right" 
            animate="left" 
            duration={4} 
            rounded
            dismiss_label={placeholders?.alerts.dismiss}
        >
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">check_circle</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{placeholders?.alerts.success_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.success}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_info > 0}
    {#key t_info}
        <Alert 
            variant="info" 
            position="top-center" 
            animate="bottom" 
            duration={5} 
            rounded
        >
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">info</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{placeholders.alerts.info_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.info}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_neutral > 0}
    {#key t_neutral}
        <Alert 
            variant="neutral" 
            position="bottom-center" 
            animate="top" 
            rounded 
            dismissable
        >
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">info</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{placeholders.alerts.neutral_title}</strong>
                <p class="alert-demo-body">{placeholders.alerts.neutral}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

{#if t_interactive > 0}
    {#key t_interactive}
        <Alert
            variant={demo_variant}
            position={demo_position}
            animate={animate_prop}
            rounded={demo_rounded}
            dismissable={demo_dismissable}
        >
            {#snippet leading()}
                <span class="material-symbols-outlined alert-demo-icon">{variant_icons[demo_variant]}</span>
            {/snippet}
            {#snippet children()}
                <strong class="alert-demo-title">{demo_title}</strong>
                <p class="alert-demo-body">{demo_body}</p>
            {/snippet}
        </Alert>
    {/key}
{/if}

<!-- Headline ──────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.alert_demo.title}</Headline>
</div>

<!-- Interactive demo controls ─────────────────────────────────────────── -->

<ControlBar palette="tone">
    <Selector
        label="Variant"
        options={["neutral", "info", "success", "warning", "error"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Position"
        options={["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"]}
        bind:value={demo_position}
    />
    <Selector
        label="Animate"
        options={["none", "top", "bottom", "left", "right"]}
        bind:value={demo_animate}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Dismissable"
        options={bool_opts}
        bind:value={demo_dismissable}
    />
</ControlBar>

<!-- Interactive demo preview ───────────────────────────────────────────── -->

<div class="alert-interactive-preview">
    <div class="alert-mock alert-mock-{demo_variant} {demo_rounded ? 'alert-mock-rounded' : ''}">
        <div class="alert-mock-leading">
            <span class="material-symbols-outlined">{variant_icons[demo_variant]}</span>
        </div>
        <div class="alert-mock-content">
            <strong class="alert-demo-title">{demo_title}</strong>
            <p class="alert-demo-body">{demo_body}</p>
        </div>
        {#if demo_dismissable}
            <div class="alert-mock-following">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        {/if}
    </div>

    <button class="trigger-btn trigger-{demo_variant}" onclick={() => t_interactive++}>
        <span class="material-symbols-outlined">{variant_icons[demo_variant]}</span>
        <span class="trigger-label">{placeholders?.alerts.trigger}</span>
        <span class="trigger-meta">{demo_position} · {demo_animate !== "none" ? demo_animate : "no anim"}</span>
    </button>
</div>

<!-- Instruction callout ───────────────────────────────────────────────── -->

<Callout variant="accent" align="center">
    {#snippet leading()}
        <span class="material-symbols-outlined">lightbulb</span>
    {/snippet}
    {#snippet children()}
        <p>{trans?.alert_demo.trigger}</p>
    {/snippet}
</Callout>

<!-- Trigger grid ───────────────────────────────────────────────────────── -->

<div class="alert-trigger-grid">
    <button class="trigger-btn trigger-error" onclick={() => t_error++}>
        <span class="material-symbols-outlined">error</span>
        <span class="trigger-label">Error</span>
        <span class="trigger-meta">bottom-left · right · 5s</span>
    </button>

    <button class="trigger-btn trigger-warning" onclick={() => t_warning++}>
        <span class="material-symbols-outlined">warning</span>
        <span class="trigger-label">Warning</span>
        <span class="trigger-meta">top-right · left · 6s</span>
    </button>

    <button class="trigger-btn trigger-success" onclick={() => t_success++}>
        <span class="material-symbols-outlined">check_circle</span>
        <span class="trigger-label">Success</span>
        <span class="trigger-meta">bottom-right · left · 4s · btn-text</span>
    </button>

    <button class="trigger-btn trigger-info" onclick={() => t_info++}>
        <span class="material-symbols-outlined">info</span>
        <span class="trigger-label">Info</span>
        <span class="trigger-meta">top-center · Top · 5s</span>
    </button>

    <button class="trigger-btn trigger-neutral" onclick={() => t_neutral++}>
        <span class="material-symbols-outlined">sticky_note_2</span>
        <span class="trigger-label">Neutral</span>
        <span class="trigger-meta">bottom-center · bottom</span>
    </button>
</div>

<!-- Code examples ─────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

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
        { prop: "variant", type: '"neutral" | "info" | "success" | "warning" | "error"', default: '"info"' },
        { prop: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "animate", type: '"top" | "bottom" | "left" | "right" | false', default: "false" },
        { prop: "duration", type: "number", default: "undefined" },
        { prop: "dismissable", type: "boolean", default: "false" },
        { prop: "dismiss_label", type: "string", default: "undefined" },
        { prop: "style", type: "string", default: "\u2014" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "following", type: "Snippet", default: "\u2014" },
        { prop: "ondismiss", type: "() => void", default: "\u2014" },
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
        /*border-radius: 10px;*/
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

    .trigger-info {
        background: var(--info-bg);
        color: var(--info-muted);
        border-left: 3px solid var(--info);
    }

    .trigger-success {
        background: var(--success-bg);
        color: var(--success-muted);
        border-left: 3px solid var(--success);
    }

    .trigger-warning {
        background: var(--warning-bg);
        color: var(--warning-muted);
        border-left: 3px solid var(--warning);
    }

    .trigger-error {
        background: var(--error-bg);
        color: var(--error-muted);
        border-left: 3px solid var(--error);
    }

    .trigger-neutral {
        background: var(--neutral-bg);
        color: var(--neutral-muted);
        border-left: 3px solid var(--neutral);
    }

    .trigger-meta {
        color: var(--text);
    }

    /* Interactive preview layout */
    .alert-interactive-preview {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        border: 2px solid var(--tone-hover);
        margin-bottom: 0.75rem;
    }

    /* Mock alert (inline, not fixed) */
    .alert-mock {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem 1rem;
        min-width: 260px;
        max-width: 420px;
        background: var(--al-bg);
        border-left: 4px solid var(--al-color);
        color: var(--text);
        box-shadow: 0 4px 12px var(--shadow-subtle);
        transition: background 0.2s, border-color 0.2s;
        flex: 1;
    }

    .alert-mock-rounded { border-radius: var(--radius-soft); }

    .alert-mock-neutral { --al-color: var(--neutral); --al-bg: var(--neutral-bg); }
    .alert-mock-info { --al-color: var(--info); --al-bg: var(--info-bg); }
    .alert-mock-success { --al-color: var(--success); --al-bg: var(--success-bg); }
    .alert-mock-warning { --al-color: var(--warning); --al-bg: var(--warning-bg); }
    .alert-mock-error { --al-color: var(--error); --al-bg: var(--error-bg); }

    .alert-mock-leading {
        color: var(--al-color);
        flex-shrink: 0;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
    }

    .alert-mock-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .alert-mock-following {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        color: var(--al-color);
        opacity: 0.7;
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
