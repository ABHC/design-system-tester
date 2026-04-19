<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { Elevation } from "../../design-system/components/Modal/modal.config";

    import Modal from "../../design-system/components/Modal/Modal.svelte";
    import Avatar from "../../design-system/components/Avatar/avatar.svelte";
    import Badge from "../../design-system/components/Badge/Badge.svelte";
    import Button from "../../design-system/components/Button/Button.svelte";
    import Headline from "../../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../../design-system/components/Selector/ControlBar.svelte";
    import DataTable from "../../design-system/components/DataTable/DataTable.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const modal = $derived(placeholders.modal);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Palette = "tone" | "accent";
    type Preset  = "confirm" | "announce" | "profile" | "terms";

    let demo_palette: Palette = $state("tone");
    let demo_elevation: Elevation = $state("subtle");
    let demo_rounded: boolean = $state(false);
    let demo_width: string = $state("480px");
    let demo_preset: Preset = $state("confirm");

    let demo_open = $state(false);

    const bool_opts = [{ value: true, label: "yes" }, { value: false, label: "no" }] as const;

    function close() { demo_open = false; }

    // ── Code examples ───────────────────────────────────────────────────────

    const code_confirm = `<!-- Confirmation dialog — tone palette -->
<Modal palette="tone" open={open} onclose={() => open = false}>
    {#snippet leading()}
        <span class="modal-title">${placeholders.modal.tone_title}</span>
    {/snippet}
    {#snippet children()}
        <p>${placeholders.modal.tone_body}</p>
    {/snippet}
    {#snippet trailing()}
        <Button palette="error" rounded onclick={() => open = false}>
            ${placeholders.modal.tone_confirm}
        </Button>
        <Button palette="tone" rounded onclick={() => open = false}>
            ${placeholders.modal.tone_cancel}
        </Button>
    {/snippet}
</Modal>`;

    const code_announce = `<!-- Announcement — accent palette -->
<Modal palette="accent" open={open} onclose={() => open = false}>
    {#snippet leading()}
        <span class="modal-title">${placeholders.modal.accent_title}</span>
    {/snippet}
    {#snippet children()}
        <p>${placeholders.modal.accent_body}</p>
    {/snippet}
    {#snippet trailing()}
        <Button palette="tone" rounded onclick={() => open = false}>
            ${placeholders.modal.accent_cta}
        </Button>
    {/snippet}
</Modal>`;

    const code_profile = `<!-- Profile composition — Avatar + Badge -->
<Modal open={open} onclose={() => open = false}>
    {#snippet leading()}
        <Avatar size="md" circular label="${placeholders.modal.compose_name}" />
        <div>
            <strong>${placeholders.modal.compose_name}</strong>
            <small>${placeholders.modal.compose_role}</small>
        </div>
    {/snippet}
    {#snippet children()}
        <p>${placeholders.modal.compose_bio}</p>
        <div style="display:flex; gap:.4rem; flex-wrap:wrap">
            ${placeholders.modal.compose_skills.map(s => `<Badge variant="outlined" size="sm">${s}</Badge>`).join("\n ")}
        </div>
    {/snippet}
    {#snippet trailing()}
        <Button animate="right" rounded>${placeholders.modal.compose_contact}</Button>
        <Button palette="tone" rounded onclick={() => open = false}>${placeholders.modal.compose_close}</Button>
    {/snippet}
</Modal>`;

    const code_terms = `<!-- Wide terms dialog — 680px -->
<Modal width="680px" open={open} onclose={() => open = false}>
    {#snippet leading()}
        <span class="modal-title">${placeholders.modal.wide_title}</span>
    {/snippet}
    {#snippet children()}
        <p>${placeholders.modal.wide_body}</p>
    {/snippet}
    {#snippet trailing()}
        <Button rounded>${placeholders.modal.wide_accept}</Button>
        <Button variant="outlined" palette="error" rounded>${placeholders.modal.wide_decline}</Button>
    {/snippet}
</Modal>`;

    const code_elevation = `<!-- Elevation prop -->
<Modal elevation="none">...</Modal>    <!-- no shadow -->
<Modal elevation="subtle">...</Modal>  <!-- soft shadow (default) -->
<Modal elevation="hard">...</Modal>    <!-- neo-brutalist offset -->`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>{trans?.modal_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector 
        label="Preset" 
        options={["confirm", "announce", "profile", "terms"]} 
        bind:value={demo_preset} 
    />
    <Selector 
        label="Palette"
        options={["tone", "accent"]}
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
    <Selector 
        label="Width"
        options={["360px", "480px", "680px"]} 
        bind:value={demo_width} 
    />
</ControlBar>

<!-- Open button -->

<div class="open-row">
    <Button
        variant="flat"
        size="sm"
        onclick={() => demo_open = true}
    >
        <span class="material-symbols-outlined">open_in_new</span>
        {
            demo_preset === "confirm"  ? trans?.modal_demo.btn_open_tone :
            demo_preset === "announce" ? trans?.modal_demo.btn_open_accent :
            demo_preset === "profile"  ? trans?.modal_demo.btn_open_compose :
            trans?.modal_demo.btn_open_wide
        }
    </Button>
</div>

<!-- Modals — one per preset, all controlled by the same state -->

<!-- Confirm -->
{#if demo_preset === "confirm"}
    <Modal
        palette={demo_palette}
        elevation={demo_elevation}
        rounded={demo_rounded}
        width={demo_width}
        open={demo_open}
        onclose={close}
    >
        {#snippet leading()}
            <span class="modal-title">{modal.tone_title}</span>
        {/snippet}
        {#snippet children()}
            <p class="modal-text">{modal.tone_body}</p>
        {/snippet}
        {#snippet trailing()}
            <Button variant="flat" palette="error" rounded onclick={close}>
                {modal.tone_confirm}
            </Button>
            <Button variant="flat" palette="tone" rounded onclick={close}>
                {modal.tone_cancel}
            </Button>
        {/snippet}
    </Modal>
{/if}

<!-- Announce -->
{#if demo_preset === "announce"}
    <Modal
        palette={demo_palette}
        elevation={demo_elevation}
        rounded={demo_rounded}
        width={demo_width}
        open={demo_open}
        onclose={close}
    >
        {#snippet leading()}
            <span class="modal-title">{modal.accent_title}</span>
        {/snippet}
        {#snippet children()}
            <p class="modal-text">{modal.accent_body}</p>
        {/snippet}
        {#snippet trailing()}
            <Button variant="flat" palette="tone" rounded onclick={close}>
                {modal.accent_cta}
            </Button>
            <Button variant="flat" palette="tone" rounded onclick={close}>
                {modal.accent_dismiss}
            </Button>
        {/snippet}
    </Modal>
{/if}

<!-- Profile -->
{#if demo_preset === "profile"}
    <Modal
        palette={demo_palette}
        elevation={demo_elevation}
        rounded={demo_rounded}
        width={demo_width}
        open={demo_open}
        onclose={close}
    >
        {#snippet leading()}
            <Avatar size="md" circular label={modal.compose_name} palette="accent" />
            <div class="header-identity">
                <span class="modal-title">{modal.compose_name}</span>
                <span class="modal-subtitle">{modal.compose_role}</span>
            </div>
        {/snippet}
        {#snippet children()}
            <p class="modal-text">{modal.compose_bio}</p>
            <div class="skills-row">
                {#each modal.compose_skills as skill}
                    <Badge variant="outlined" size="sm">{skill}</Badge>
                {/each}
            </div>
        {/snippet}
        {#snippet trailing()}
            <Button variant="flat" animate="right" rounded onclick={close}>
                {modal.compose_contact}
            </Button>
            <Button variant="flat" palette="tone" rounded onclick={close}>
                {modal.compose_close}
            </Button>
        {/snippet}
    </Modal>
{/if}

<!-- Terms -->
{#if demo_preset === "terms"}
    <Modal
        palette={demo_palette}
        elevation={demo_elevation}
        rounded={demo_rounded}
        width={demo_width}
        open={demo_open}
        onclose={close}
    >
        {#snippet leading()}
            <span class="modal-title">{modal.wide_title}</span>
        {/snippet}
        {#snippet children()}
            <p class="modal-text">{modal.wide_body}</p>
        {/snippet}
        {#snippet trailing()}
            <Button variant="flat" rounded onclick={close}>
                {modal.wide_accept}
            </Button>
            <Button variant="outlined" palette="error" rounded onclick={close}>
                {modal.wide_decline}
            </Button>
        {/snippet}
    </Modal>
{/if}

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "confirm", code: code_confirm, language: "Svelte" },
        { label: "announce",  code: code_announce, language: "Svelte" },
        { label: "profile",   code: code_profile, language: "Svelte" },
        { label: "terms",     code: code_terms, language: "Svelte" },
        { label: "elevation", code: code_elevation, language: "Svelte" },
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
        { prop: "open", type: "boolean", default: "false" },
        { prop: "onclose", type: "() => void", default: "undefined" },
        { prop: "palette", type: '"tone" | "accent" | "accentbg"', default: '"tone"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"subtle"' },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "width", type: "string", default: '"480px"' },
        { prop: "label", type: "string", default: "\u2014" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
    ]}
/>

<style>
    .open-row {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }

    .modal-title {
        font-weight: 700;
        font-size: 1rem;
        flex: 1;
    }

    .modal-subtitle {
        font-size: 0.8rem;
        opacity: 0.7;
    }

    .header-identity {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }

    .modal-text {
        font-size: 0.875rem;
        line-height: 1.6;
        margin: 0;
        color: var(--modal-muted, var(--text-muted));
    }

    .skills-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }
</style>
