<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Switch from "../design-system/components/Switch/Switch.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo controls ───────────────────────────────────────────────────────

    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Bg = "bg" | "card" | "accent";

    let demo_size: Size = $state("md");
    let demo_circle: boolean  = $state(true);
    let demo_bg: Bg = $state("bg");

    const bool_opts = [
        { value: true, label: "true"  },
        { value: false, label: "false" },
    ] as const;

    // ── Switch states ───────────────────────────────────────────────────────

    let status_wifi: boolean = $state(true);
    let status_notifications: boolean = $state(true);
    let status_dark_mode: boolean = $state(true);
    let status_airplane: boolean = $state(true);
    let status_bluetooth: boolean = $state(true);
    let status_dnd: boolean = $state(true);
    let status_eco: boolean = $state(true);

    const all_palettes: Palette[] = ["accent", "tone", "error", "warning", "success", "info"];

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    let wifi_on: boolean = $state(true);
<\/script>

<Switch bind:checked={wifi_on} palette="accent" />`;

    const code_snippets = `<script lang="ts">
    let wifi_on: boolean = $state(true);
    let notif_on: boolean = $state(true);
<\/script>

<!-- snippet re-renders on every state change -->
{#snippet wifi_icon()}
    {#if wifi_on}
        <span class="material-symbols-outlined">wifi</span>
    {:else}
        <span class="material-symbols-outlined">android_wifi_3_bar_off</span>
    {/if}
{/snippet}

{#snippet notif_icon()}
    {#if notif_on}
        <span class="material-symbols-outlined">notifications</span>
    {:else}
        <span class="material-symbols-outlined">notifications_off</span>
    {/if}
{/snippet}

<!-- leading — left of the track -->
<Switch bind:checked={wifi_on} palette="accent" leading={wifi_icon} />

<!-- trailing — right of the track -->
<Switch bind:checked={notif_on} palette="warning" trailing={notif_icon} />`;

    const code_both = `<!-- leading + trailing on the same switch -->

{#snippet light_icon()}
    <span class="material-symbols-outlined">light_mode</span>
{/snippet}
{#snippet dark_icon()}
    <span class="material-symbols-outlined">dark_mode</span>
{/snippet}

{#snippet bt_off()}
    <span class="material-symbols-outlined">bluetooth_disabled</span>
{/snippet}
{#snippet bt_on()}
    <span class="material-symbols-outlined">bluetooth</span>
{/snippet}

<Switch bind:checked={dark_mode} palette="tone"
    leading={light_icon}
    trailing={dark_icon}
/>
<Switch bind:checked={bluetooth} palette="info"
    leading={bt_off}
    trailing={bt_on}
/>`;

    const code_palettes = `<script lang="ts">
    type Palette = "accent" | "tone" | "error" | "warning" | "success" | "info";
    const palettes: Palette[] = ["accent", "tone", "error", "warning", "success", "info"];
<\/script>

<!-- palette reference — ON / OFF disabled -->
{#each palettes as pal}
    <Switch checked={true}  palette={pal} disabled />
    <Switch checked={false} palette={pal} disabled />
{/each}`;

    const code_shapes = `<!-- circle=true (default) — pill track + round knob -->
<Switch bind:checked palette="accent" />

<!-- circle=false — rect track + square knob -->
<Switch bind:checked palette="accent" circle={false} />`;

    const code_sizes = `<!-- Knob is always 20 × 20 px — only the track changes -->
<!-- In sm, the knob intentionally protrudes above and below the track -->
<Switch bind:checked palette="accent" size="sm" />
<Switch bind:checked palette="accent" />
<Switch bind:checked palette="accent" size="lg" />`;

    const code_disabled = `<!-- checked state is preserved, switch is inert -->
<Switch palette="accent" checked={false} disabled />
<Switch palette="accent" checked={true}  disabled />`;
</script>

<!-- Snippets utils ─────────────────────────────────────────────────────────── -->

<!-- Leading -->
{#snippet wifi_icon()}
    {#if status_wifi}
        <span class="material-symbols-outlined">wifi</span>
    {:else}
        <span class="material-symbols-outlined">android_wifi_3_bar_off</span>
    {/if}
{/snippet}
{#snippet leading_dark()}
    <span class="material-symbols-outlined">light_mode</span>
{/snippet}
{#snippet dnd_icon()}
    <span class="material-symbols-outlined">do_not_disturb_on</span>
{/snippet}
{#snippet airplane_icon()}
    <span class="material-symbols-outlined">airplanemode_active</span>
{/snippet}
{#snippet leading_bluetooth()}
    <span class="material-symbols-outlined">bluetooth_disabled</span>
{/snippet}

<!-- Trailing -->
{#snippet trailing_dark()}
    <span class="material-symbols-outlined">dark_mode</span>
{/snippet}
{#snippet trailing_notif()}
    {#if status_notifications}
        <span class="material-symbols-outlined">notifications</span>
    {:else}
        <span class="material-symbols-outlined">notifications_off</span>
    {/if}
{/snippet}
{#snippet trailing_bluetooth()}
    <span class="material-symbols-outlined">bluetooth</span>
{/snippet}

<!-- ── Markup ──────────────────────────────────────────────────────────────── -->

<Headline size="md" uppercase>
    {trans?.switch_demo?.title ?? "Switch"}
</Headline>

<!-- Controls -->

<ControlBar palette="tone" rounded>
    <Selector
        label={trans?.switch_demo?.lbl_size ?? "Size"}
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label={trans?.switch_demo?.lbl_circle ?? "Circle"}
        options={bool_opts}
        bind:value={demo_circle}
    />
    <Selector
        label="Background"
        options={["bg", "card", "accent"]}
        bind:value={demo_bg}
    />
</ControlBar>

<!-- Live preview -->

<div
    class="switch-preview"
    style="background: var(--{demo_bg});"
>
    <div class="switch-columns">

        <!-- Left: switches -->
        <div class="switch-list">
            <div class="palette-col-header">
                <span class="col-header-label">
                    {trans?.switch_demo?.lbl_enabled}
                </span>
            </div>
            <div class="switch-row">
                <Switch
                    bind:checked={status_wifi}
                    palette="accent"
                    size={demo_size} circle={demo_circle}
                    leading={wifi_icon}
                />
                <span class="switch-item-label">
                    {placeholders?.switch_demo?.wifi}
                </span>
            </div>
            <div class="switch-row">
                <Switch
                    bind:checked={status_dark_mode}
                    palette="tone"
                    size={demo_size}
                    circle={demo_circle}
                    leading={leading_dark}
                    trailing={trailing_dark}
                />
                <span class="switch-item-label">
                    {
                        status_dark_mode ? placeholders?.switch_demo?.dark_mode : 
                        placeholders?.switch_demo.light_mode
                    }
                </span>
            </div>
            <div class="switch-row">
                <Switch
                    bind:checked={status_dnd}
                    palette="error"
                    size={demo_size}
                    circle={demo_circle}
                    leading={dnd_icon}
                />
                <span class="switch-item-label">
                    {placeholders?.switch_demo?.dnd}
                </span>
            </div>
            <div class="switch-row">
                <span class="switch-item-label">
                    {placeholders?.switch_demo?.notifications}
                </span>
                <Switch
                    bind:checked={status_notifications}
                    palette="warning"
                    size={demo_size}
                    circle={demo_circle}
                    trailing={trailing_notif}
                />
            </div>
            <div class="switch-row">
                <span class="switch-item-label">
                    {placeholders?.switch_demo?.airplane}
                </span>
                <Switch
                    bind:checked={status_airplane}
                    palette="success"
                    size={demo_size}
                    circle={demo_circle}
                    leading={airplane_icon}
                />
            </div>
            <div class="switch-row">
                <Switch
                    bind:checked={status_bluetooth}
                    palette="info"
                    size={demo_size}
                    circle={demo_circle}
                    leading={leading_bluetooth}
                    trailing={trailing_bluetooth}
                />
            </div>
            <div class="switch-row">
                <Switch
                    bind:checked={status_eco}
                    palette="neutral"
                    size={demo_size}
                    circle={demo_circle}
                />
                <span class="switch-item-label">
                    {placeholders?.switch_demo?.eco}
                </span>
            </div>
        </div>

        <!-- Right: palette reference aligned per row -->
        <div class="palette-col">
            <div class="palette-col-header">
                <span class="col-header-label">
                    {trans?.switch_demo?.lbl_disabled}
                </span>
            </div>
            {#each ([
                "accent",
                "tone",
                "error",
                "warning",
                "success",
                "info",
                "neutral"
            ] as const) as pal}
                <div class="palette-row-item">
                    <Switch
                        checked={true}
                        palette={pal}
                        size={demo_size}
                        circle={demo_circle}
                        disabled
                    />
                    <Switch
                        checked={false}
                        palette={pal}
                        size={demo_size}
                        circle={demo_circle}
                        disabled
                    />
                    <span class="pal-label">{pal}</span>
                </div>
            {/each}
        </div>

    </div>
</div>

<!-- Code examples -->

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "basic", code: code_basic, language: "Svelte" },
        { label: "snippets", code: code_snippets, language: "Svelte" },
        { label: "leading+trailing", code: code_both, language: "Svelte" },
        { label: "palettes", code: code_palettes, language: "Svelte" },
        { label: "shapes", code: code_shapes, language: "Svelte" },
        { label: "sizes", code: code_sizes, language: "Svelte" },
        { label: "disabled", code: code_disabled, language: "Svelte" },
    ]}
/>

<style>
    /* Preview box */
    .switch-preview {
        border: 2px solid var(--tone-hover);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
    }

    .switch-columns {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 2.5rem;
    }

    .switch-list {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
    }

    .switch-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .switch-item-label {
        font-size: 0.9rem;
        font-weight: 500;
    }

    /* Right palette column */
    .palette-col {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        border-left: 1.5px solid var(--tone-hover);
        padding-left: 2rem;
    }

    .palette-col-header {
        display: flex;
        gap: 0.5rem;
        padding-bottom: 0.1rem;
    }

    .col-header-label {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
        /* align with switch widths — approximate */
        flex: 0 0 auto;
    }

    .palette-row-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .pal-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-muted);
        margin-left: 0.25rem;
    }

    /* Palette reference grids */
    .palette-grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 0.75rem;
    }

    .palette-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .section-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: var(--text-muted);
    }

    .palette-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        padding: 1rem 1.25rem;
        border-radius: 10px;
        border: 1.5px solid var(--tone-hover);
    }

    .palette-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
    }

    .item-label {
        font-size: 0.65rem;
        font-weight: 600;
        color: var(--text-muted);
        text-align: center;
    }

    .accent-text {
        color: var(--accent-muted);
    }
</style>
