<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Headline, 
        Input, 
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

    // ── Sign-up form ─────────────────────────────────────────────────────

    let first_name: string = $state("");
    let last_name: string = $state("");
    let su_email: string = $state("");
    let password: string = $state("");
    let password_repeat: string = $state("");

    const password_match = $derived(password_repeat.length > 0 && password === password_repeat);
    const password_mismatch = $derived(password_repeat.length > 0 && password !== password_repeat);

    // ── States reference (static) ────────────────────────────────────────

    const ref_email_error = "user@example";
    const ref_email_success = "user@example.com";
    const ref_disabled_val = "disabled@example.com";
    const ref_readonly_val = "readonly@example.com";

    // ── Code examples ────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    let email: string = $state("");
<\/script>

<Input
    bind:value={email}
    type="email"
    label="Email"
    placeholder="you@example.com"
    hint="We'll never share your email"
/>`;

    const code_validation = `<script lang="ts">
    let password:  string = $state("");
    let pw_repeat: string = $state("");

    const pw_match    = $derived(pw_repeat.length > 0 && password === pw_repeat);
    const pw_mismatch = $derived(pw_repeat.length > 0 && password !== pw_repeat);
<\/script>

<Input bind:value={password}  type="password" label="Password" />

<Input
    bind:value={pw_repeat}
    type="password"
    label="Repeat password"
    success={pw_match    ? "Passwords match"        : undefined}
    error={pw_mismatch   ? "Passwords do not match" : undefined}
/>`;

    const code_icons = `{#snippet icon_email()}
    <span class="material-symbols-outlined">alternate_email</span>
{/snippet}

{#snippet icon_search()}
    <span class="material-symbols-outlined">search</span>
{/snippet}

<!-- leading — left of the field -->
<Input bind:value type="email" label="Email" leading={icon_email} />

<!-- trailing — right of the field -->
<Input bind:value placeholder="Search…" trailing={icon_search} />`;

    const code_states = `<!-- hint — neutral helper text -->
<Input bind:value label="Username" hint="3–20 characters" />

<!-- error — red border + message -->
<Input bind:value label="Email" error="This email is already taken" />

<!-- success — green border + message -->
<Input bind:value label="Password" success="Strong password" />

<!-- disabled -->
<Input bind:value label="API key" disabled />

<!-- readonly -->
<Input bind:value label="API key" readonly />`;

    const code_pw_toggle = `<!-- The visibility toggle appears automatically for type="password" -->
<!-- as long as NO trailing snippet is provided. -->
<Input
    bind:value={password}
    type="password"
    label="Password"
    placeholder="••••••••"
/>

<!-- Combining with a leading icon is fine — the toggle stays on the right -->
{#snippet icon_lock()}
    <span class="material-symbols-outlined">lock</span>
{/snippet}

<Input
    bind:value={password}
    type="password"
    label="Password"
    placeholder="••••••••"
    leading={icon_lock}
/>

<!-- Providing a trailing snippet disables the built-in toggle -->
{#snippet my_action()}
    <button type="button">…</button>
{/snippet}

<Input
    bind:value={password}
    type="password"
    label="Password"
    trailing={my_action}
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Snippets ─────────────────────────────────────────────────────────────── -->

{#snippet icon_person()}
    <span class="material-symbols-outlined">person</span>
{/snippet}
{#snippet icon_email()}
    <span class="material-symbols-outlined">alternate_email</span>
{/snippet}
{#snippet icon_lock()}
    <span class="material-symbols-outlined">lock</span>
{/snippet}

<!-- ── Markup ────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.input_demo?.title}</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label={trans?.input_demo?.lbl_size}
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
</ControlBar>

<!-- Sign-up form -->

<div class="forms-grid">
    <span></span>
    <Card variant="flat" rounded elevation="subtle">
        {#snippet leading()}
            <div class="card-form-header">
                <span class="material-symbols-outlined">account_circle</span>
                <span>{placeholders?.input_demo?.sect_signup}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <div class="form-row">
                <Input
                    bind:value={first_name}
                    size={demo_size}
                    label={placeholders?.input_demo?.lbl_first_name}
                    placeholder={placeholders?.input_demo?.ph_first_name}
                    leading={icon_person}
                    required
                />
                <Input
                    bind:value={last_name}
                    size={demo_size}
                    label={placeholders?.input_demo?.lbl_last_name}
                    placeholder={placeholders?.input_demo?.ph_last_name}
                    required
                />
            </div>

            <Input
                bind:value={su_email}
                size={demo_size}
                type="email"
                label={placeholders?.input_demo?.lbl_email}
                placeholder={placeholders?.input_demo?.ph_email}
                leading={icon_email}
                required
            />

            <Input
                bind:value={password}
                size={demo_size}
                type="password"
                label={placeholders?.input_demo?.lbl_password}
                placeholder="••••••••"
                leading={icon_lock}
                hint={placeholders?.input_demo?.hint_password}
                required
            />

            <Input
                bind:value={password_repeat}
                size={demo_size}
                type="password"
                label={placeholders?.input_demo?.lbl_pw_repeat}
                placeholder="••••••••"
                leading={icon_lock}
                success={
                    password_match ? (placeholders?.input_demo?.success_pw) : undefined
                }
                error={
                    password_mismatch ? (placeholders?.input_demo?.error_pw) : undefined
                }
                required
            />
        {/snippet}

        {#snippet trailing()}
            <Button variant="flat" size={demo_size}>
                {placeholders?.input_demo?.btn_signup}
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
            <span class="state-label">{trans?.input_demo?.lbl_normal}</span>
            <Input
                size={demo_size}
                placeholder="you@example.com"
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_hint}</span>
            <Input
                size={demo_size}
                placeholder="you@example.com"
                hint={placeholders?.input_demo?.hint_email_ref}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_error}</span>
            <Input
                size={demo_size}
                value={ref_email_error}
                error={placeholders?.input_demo?.error_ref}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_success}</span>
            <Input
                size={demo_size}
                value={ref_email_success}
                success={placeholders?.input_demo?.success_ref}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_disabled}</span>
            <Input
                size={demo_size}
                value={ref_disabled_val}
                disabled
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_readonly}</span>
            <Input
                size={demo_size}
                value={ref_readonly_val}
                readonly
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_leading}</span>
            <Input
                size={demo_size}
                placeholder="you@example.com"
                leading={icon_email}
            />
        </div>

        <div class="state-item">
            <span class="state-label">{trans?.input_demo?.lbl_trailing}</span>
            <Input
                size={demo_size}
                type="password"
                placeholder="••••••••"
                leading={icon_lock}
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
        { label: "icons", code: code_icons, language: "Svelte" },
        { label: "states", code: code_states, language: "Svelte" },
        { label: "password toggle", code: code_pw_toggle, language: "Svelte" },
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
        { prop: "value", type: "string", default: '""' },
        { prop: "type", type: '"text" | "email" | "password" | "number" | "search" | "tel" | "url"', default: '"text"' },
        { prop: "placeholder", type: "string", default: '""' },
        { prop: "label", type: "string", default: "\u2014" },
        { prop: "hint", type: "string", default: "\u2014" },
        { prop: "error", type: "string", default: "\u2014" },
        { prop: "success", type: "string", default: "\u2014" },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "disabled", type: "boolean", default: "false" },
        { prop: "readonly", type: "boolean", default: "false" },
        { prop: "required", type: "boolean", default: "false" },
        { prop: "name", type: "string", default: "\u2014" },
        { prop: "id", type: "string", default: "\u2014" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
    ]}
/>
</div>

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

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
    }

    @media (max-width: 500px) {
        .forms-grid { grid-template-columns: 1fr; }
        .form-row { grid-template-columns: 1fr; }
    }
</style>
