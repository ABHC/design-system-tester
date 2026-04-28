<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Input, 
        Textarea, 
        Card, 
        Button, 
        CodeBlock, 
        Selector, 
        ControlBar, 
        DataTable 
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo controls ────────────────────────────────────────────────────

    type Size = "sm" | "md" | "lg";
    let demo_size: Size = $state("md");

    // ── Contact form ─────────────────────────────────────────────────────

    let ct_name: string = $state("");
    let ct_email: string = $state("");
    let ct_subject: string = $state("");
    let ct_message: string = $state("");

    const msg_long_enough = $derived(ct_message.length >= 20);
    const msg_error = $derived(
        ct_message.length > 0 && ct_message.length < 20
            ? (placeholders?.textarea_demo?.error_msg_short ?? "Message too short (min 20 characters)")
            : undefined
    );
    const msg_success = $derived(
        msg_long_enough
            ? (placeholders?.textarea_demo?.success_msg ?? "Looks good!")
            : undefined
    );

    // ── Code examples ────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    let message: string = $state("");
<\/script>

<Textarea
    bind:value={message}
    label="Message"
    rows={5}
    placeholder="Write something…"
/>`;

    const code_validation = `<script lang="ts">
    let message: string = $state("");

    const too_short   = $derived(message.length > 0 && message.length < 20);
    const long_enough = $derived(message.length >= 20);
<\/script>

<Textarea
    bind:value={message}
    label="Message"
    rows={5}
    placeholder="Write something…"
    error={too_short   ? "Too short (min 20 characters)" : undefined}
    success={long_enough ? "Looks good!"                 : undefined}
/>`;

    const code_states = `<!-- hint — neutral helper text -->
<Textarea bind:value label="Notes" rows={4} hint="Optional" />

<!-- error — red border + message -->
<Textarea bind:value label="Message" rows={4} error="Too short" />

<!-- success — green border + message -->
<Textarea bind:value label="Message" rows={4} success="Looks good!" />

<!-- disabled -->
<Textarea bind:value label="Readonly log" rows={4} disabled />`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Snippets ─────────────────────────────────────────────────────────────── -->

{#snippet icon_person()}
    <span class="material-symbols-outlined">person</span>
{/snippet}
{#snippet icon_email()}
    <span class="material-symbols-outlined">alternate_email</span>
{/snippet}
{#snippet icon_subject()}
    <span class="material-symbols-outlined">subject</span>
{/snippet}

<!-- ── Markup ────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.textarea_demo?.title}</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label={trans?.textarea_demo?.lbl_size}
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
</ControlBar>

<!-- Contact form -->

<div class="forms-grid">
    <span></span>
    <Card variant="flat" rounded elevation="subtle">
        {#snippet leading()}
            <div class="card-form-header">
                <span class="material-symbols-outlined">mail</span>
                <span>{placeholders?.textarea_demo?.sect_contact}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Input
                bind:value={ct_name}
                size={demo_size}
                label={placeholders?.textarea_demo?.lbl_name}
                placeholder={placeholders?.textarea_demo?.ph_name}
                leading={icon_person}
                required
            />

            <Input
                bind:value={ct_email}
                size={demo_size}
                type="email"
                label={placeholders?.textarea_demo?.lbl_email}
                placeholder={placeholders?.textarea_demo?.ph_email}
                leading={icon_email}
                required
            />

            <Textarea
                bind:value={ct_message}
                size={demo_size}
                label={placeholders?.textarea_demo?.lbl_message}
                placeholder={placeholders?.textarea_demo?.ph_message}
                hint={placeholders?.textarea_demo?.hint_message}
                error={msg_error}
                success={msg_success}
                rows={6}
                required
            />
        {/snippet}

        {#snippet trailing()}
            <Button variant="flat" size={demo_size}>
                {placeholders?.textarea_demo?.btn_send}
            </Button>
        {/snippet}
    </Card>
</div>

<!-- States reference -->

<div data-summary="states" data-summary-label={trans?.doc.states ?? "States"}>
    <Headline size="sm" uppercase muted>{trans?.doc.states ?? "States"}</Headline>
</div>

<div class="states-preview">
    <div class="states-grid">

        <div class="state-item">
            <span class="state-label">{trans?.textarea_demo?.lbl_normal}</span>
            <Textarea
                size={demo_size}
                rows={3}
                placeholder={placeholders?.textarea_demo?.ph_message}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.textarea_demo?.lbl_hint}</span>
            <Textarea
                size={demo_size}
                rows={3}
                placeholder={placeholders?.textarea_demo?.ph_message}
                hint={placeholders?.textarea_demo?.hint_message}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.textarea_demo?.lbl_error}</span>
            <Textarea
                size={demo_size}
                rows={3}
                value={placeholders?.textarea_demo?.too_short}
                error={placeholders?.textarea_demo?.error_ref_ta}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.textarea_demo?.lbl_success}</span>
            <Textarea
                size={demo_size}
                rows={3}
                value={placeholders?.textarea_demo?.long_enough}
                success={placeholders?.textarea_demo?.success_ref}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.textarea_demo?.lbl_disabled}</span>
            <Textarea
                size={demo_size}
                rows={3}
                value={placeholders?.textarea_demo?.disabled}
                disabled
            />
        </div>

    </div>
</div>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "basic", code: code_basic, language: "Svelte" },
        { label: "validation", code: code_validation, language: "Svelte" },
        { label: "states", code: code_states, language: "Svelte" },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
</div>
  
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop", width: "20%" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell, width: "10%" },
    ]}
    rows={[
        { prop: "value", type: "string", default: '""' },
        { prop: "placeholder", type: "string", default: '""' },
        { prop: "label", type: "string", default: "\u2014" },
        { prop: "hint", type: "string", default: "\u2014" },
        { prop: "error", type: "string", default: "\u2014" },
        { prop: "success", type: "string", default: "\u2014" },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "rows", type: "number", default: "3" },
        { prop: "disabled", type: "boolean", default: "false" },
        { prop: "readonly", type: "boolean", default: "false" },
        { prop: "required", type: "boolean", default: "false" },
        { prop: "name", type: "string", default: "\u2014" },
        { prop: "id", type: "string", default: "\u2014" },
    ]}
/>

<style>
    /* States reference */
    .states-preview {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        border: 2px solid var(--spk-tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
    }

    .states-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
    }

    .state-item {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .state-label {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--spk-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .forms-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
        gap: 1.25rem;
        margin-bottom: 0.75rem;
    }

    .card-form-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 1rem 1.25rem;
        font-size: 1rem;
        font-weight: 600;
    }
</style>
