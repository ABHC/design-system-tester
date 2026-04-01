<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import Select from "../../design-system/components/Select/Select.svelte";
    import Card from "../../design-system/components/Card/Card.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo controls ────────────────────────────────────────────────────

    type Size = "sm" | "md" | "lg";
    type Palette = "tone" | "accent" | "accentbg";
    type Elevation = "none" | "subtle" | "hard";

    let demo_size: Size = $state("md");
    let demo_palette: Palette = $state("tone");
    let demo_rounded: boolean = $state(false);
    let demo_elevation: Elevation = $state("none");

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    // ── Derived data from placeholders ───────────────────────────────────

    const ph = $derived(placeholders.select_demo);

    // ── Select state ─────────────────────────────────────────────────────

    let country: string | undefined = $state(undefined);
    let language: string | undefined = $state(undefined);
    let fruit: string | undefined = $state(undefined);
    let role: string | undefined = $state(undefined);
    let status: string | undefined = $state(undefined);
    let disabled_val: string = $state("locked");

    // ── Code examples ────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    let country: string | undefined = $state(undefined);

    const countries = [
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "es", label: "Spain" },
    ];
<\/script>

<Select
    bind:value={country}
    options={countries}
    label="Country"
    placeholder="Choose a country"
    hint="Select your country of residence"
/>`;

    const code_searchable = `<!-- searchable adds a built-in search field in the header -->
<Select
    bind:value={language}
    options={languages}
    label="Language"
    placeholder="Pick a language"
    searchable
    searchPlaceholder="Filter languages…"
/>`;

    const code_slots = `<!-- Custom header and footer via snippets -->
<Select bind:value={fruit} options={fruits} label="Fruit" placeholder="Pick a fruit">
    {#snippet header()}
        <div style="padding: 0.25rem; font-size: 0.75rem; color: var(--text-muted);">
            Pick your favorite fruit
        </div>
    {/snippet}

    {#snippet footer()}
        <button onclick={() => { fruit = undefined; }}>
            Clear selection
        </button>
    {/snippet}
</Select>`;

    const code_validation = `<!-- error state -->
<Select
    bind:value={role}
    options={["admin", "editor", "viewer", "guest"]}
    label="Role"
    required
    error={!role ? "Please select a role" : undefined}
/>

<!-- success state -->
<Select
    bind:value={status}
    options={statuses}
    label="Status"
    success={status ? "Status selected" : undefined}
/>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Markup ────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.select.title}</Headline>
</div>

<ControlBar palette="tone" rounded>
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Palette"
        options={["tone", "accent", "accentbg"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
</ControlBar>

<!-- Demo grid -->

<div class="select-demo-grid">

    <!-- Basic -->
    <Card variant="flat" rounded elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">list</span>
                <span>{ph.sect_basic}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Select
                bind:value={country}
                options={ph.countries}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                label={ph.lbl_country}
                placeholder={ph.ph_country}
                hint={ph.hint_country}
            />

            <div class="demo-value">
                {ph.lbl_selected} <code>{country ?? ph.lbl_none}</code>
            </div>
        {/snippet}
    </Card>

    <!-- Searchable -->
    <Card variant="flat" rounded elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">search</span>
                <span>{ph.sect_searchable}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Select
                bind:value={language}
                options={ph.languages}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                label={ph.lbl_language}
                placeholder={ph.ph_language}
                searchable
                searchPlaceholder={ph.search_language}
            />

            <div class="demo-value">
                {ph.lbl_selected} <code>{language ?? ph.lbl_none}</code>
            </div>
        {/snippet}
    </Card>

    <!-- With slots -->
    <Card variant="flat" rounded elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">view_agenda</span>
                <span>{ph.sect_slots}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Select
                bind:value={fruit}
                options={ph.fruits}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                label={ph.lbl_fruit}
                placeholder={ph.ph_fruit}
            >
                {#snippet header()}
                    <div class="slot-header-content">
                        <span class="material-symbols-outlined slot-icon">info</span>
                        {ph.fruit_header}
                    </div>
                {/snippet}

                {#snippet footer()}
                    <button
                        class="slot-footer-btn"
                        onclick={() => { fruit = undefined; }}
                    >
                        <span class="material-symbols-outlined slot-icon">close</span>
                        {ph.fruit_clear}
                    </button>
                {/snippet}
            </Select>

            <div class="demo-value">
                {ph.lbl_selected} <code>{fruit ?? ph.lbl_none}</code>
            </div>
        {/snippet}
    </Card>

    <!-- Validation -->
    <Card variant="flat" rounded elevation="subtle">
        {#snippet header()}
            <div class="card-section-header">
                <span class="material-symbols-outlined">verified</span>
                <span>{ph.sect_validation}</span>
            </div>
        {/snippet}

        {#snippet children()}
            <Select
                bind:value={role}
                options={ph.roles}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                label={ph.lbl_role}
                placeholder={ph.ph_role}
                required
                error={role === undefined ? ph.error_role : undefined}
            />

            <Select
                bind:value={status}
                options={ph.statuses}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                label={ph.lbl_status}
                placeholder={ph.ph_status}
                success={status ? ph.success_status : undefined}
            />
        {/snippet}
    </Card>

</div>

<!-- States reference -->

<div data-summary="states" data-summary-label={trans?.doc.states ?? "States"}>
<Headline size="sm" uppercase muted>{trans?.doc.states ?? "States"}</Headline>
</div>
<div class="states-preview">
    <span class="section-label">Select states</span>

    <div class="states-grid">
        <div class="state-item">
            <span class="state-label">Normal</span>
            <Select
                options={ph.countries}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                placeholder={ph.ph_country}
            />
        </div>

        <div class="state-item">
            <span class="state-label">Hint</span>
            <Select
                options={ph.countries}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                placeholder={ph.ph_country}
                hint={ph.hint_shipping}
            />
        </div>

        <div class="state-item">
            <span class="state-label">Error</span>
            <Select
                options={ph.countries}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                placeholder={ph.ph_country}
                error={ph.error_required}
            />
        </div>

        <div class="state-item">
            <span class="state-label">Success</span>
            <Select
                value="fr"
                options={ph.countries}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                success={ph.success_selected}
            />
        </div>

        <div class="state-item">
            <span class="state-label">Disabled</span>
            <Select
                value={disabled_val}
                options={[{ value: "locked", label: ph.lbl_disabled }]}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                disabled
            />
        </div>

        <div class="state-item">
            <span class="state-label">Searchable</span>
            <Select
                options={ph.languages}
                size={demo_size}
                palette={demo_palette}
                rounded={demo_rounded}
                elevation={demo_elevation}
                placeholder={ph.ph_language}
                searchable
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
        { label: "searchable", code: code_searchable, language: "Svelte" },
        { label: "slots", code: code_slots, language: "Svelte" },
        { label: "validation", code: code_validation, language: "Svelte" },
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
        { prop: "value", type: "T", default: "\u2014" },
        { prop: "options", type: "readonly (T | OptionEntry)[]", default: "\u2014" },
        { prop: "placeholder", type: "string", default: '"Select an option"' },
        { prop: "label", type: "string", default: "\u2014" },
        { prop: "hint", type: "string", default: "\u2014" },
        { prop: "error", type: "string", default: "\u2014" },
        { prop: "success", type: "string", default: "\u2014" },
        { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
        { prop: "disabled", type: "boolean", default: "false" },
        { prop: "required", type: "boolean", default: "false" },
        { prop: "searchable", type: "boolean", default: "false" },
        { prop: "searchPlaceholder", type: "string", default: '"Search..."' },
        { prop: "name", type: "string", default: "\u2014" },
        { prop: "id", type: "string", default: "\u2014" },
        { prop: "onchange", type: "(value: T) => void", default: "\u2014" },
        { prop: "header", type: "Snippet", default: "\u2014" },
        { prop: "footer", type: "Snippet", default: "\u2014" },
        { prop: "palette", type: "PopoverPalette", default: '"tone"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "elevation", type: "PopoverElevation", default: '"none"' },
    ]}
/>
</div>

<style>
    .select-demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
        gap: 1.25rem;
        margin-bottom: 0.75rem;
    }

    .card-section-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 1rem 1.25rem;
        font-size: 1rem;
        font-weight: 600;
    }

    .demo-value {
        font-size: 0.8rem;
        color: var(--text-muted);
        padding: 0.5rem 0.6rem;
        background: var(--tone-bg);
        border-radius: 5px;
    }

    .demo-value code {
        color: var(--accent-muted);
        font-weight: 600;
    }

    .slot-header-content {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.8rem;
        color: var(--text-muted);
        padding: 0.15rem 0.25rem;
    }

    .slot-footer-btn {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        background: none;
        border: none;
        color: var(--text-muted);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        padding: 0.15rem 0.25rem;
        border-radius: 4px;
        transition: color 0.15s ease, background 0.15s ease;
    }

    .slot-footer-btn:hover {
        color: var(--error);
        background: var(--error-ghost-hover);
    }

    .slot-icon {
        font-size: 16px;
    }

    /* States reference */
    .states-preview {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
    }

    .section-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--text-muted);
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
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    @media (max-width: 500px) {
        .select-demo-grid { grid-template-columns: 1fr; }
    }
</style>
