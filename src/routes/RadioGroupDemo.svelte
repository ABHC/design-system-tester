<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import RadioGroup from "../design-system/components/RadioGroup/RadioGroup.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";
    import Selector from "../design-system/components/Selector/Selector.svelte";
    import ControlBar from "../design-system/components/Selector/ControlBar.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // ── Demo controls ───────────────────────────────────────────────────────

    type Palette = "accent" | "tone";
    type Size = "sm" | "md" | "lg";
    type LabelPosition = "right" | "left" | "top" | "bottom";

    let demo_palette: Palette = $state("accent");
    let demo_size: Size = $state("md");
    let demo_label_position: LabelPosition = $state("right");

    // ── Radio group states ──────────────────────────────────────────────────

    let selected_live: string = $state("tgv");
    let selected_individual: string = $state("tgv");

    const options = $derived(placeholders.radio_demo.options);

    const options_with_disabled = $derived([
        options[0],
        { ...options[1], disabled: true },
        options[2],
        { ...options[3], disabled: true },
    ]);

    // ── Code examples ───────────────────────────────────────────────────────

    const code_basic = `<script lang="ts">
    let selected: string = $state("tgv");

    const options = [
        { value: "tgv", label: "TGV" },
        { value: "concorde", label: "Concorde" },
        { value: "minitel", label: "Minitel" },
        { value: "ariane", label: "Ariane" },
    ];
<\/script>

<RadioGroup
    bind:value={selected}
    {options}
    name="transport"
    palette="accent"
/>`;

    const code_label_position = `<!-- right (default) -->
<RadioGroup bind:value {options} name="a" label_position="right" />

<!-- left -->
<RadioGroup bind:value {options} name="b" label_position="left" />

<!-- top — group switches to row layout automatically -->
<RadioGroup bind:value {options} name="c" label_position="top" />

<!-- bottom — group switches to row layout automatically -->
<RadioGroup bind:value {options} name="d" label_position="bottom" />`;

    const code_disabled_group = `<!-- Whole group disabled -->
<RadioGroup
    bind:value={selected}
    {options}
    name="transport"
    palette="accent"
    disabled
/>`;

    const code_disabled_individual = `<!-- Individual options disabled -->
<script lang="ts">
    const options = [
        { value: "tgv",      label: "TGV" },
        { value: "concorde", label: "Concorde", disabled: true },
        { value: "minitel",  label: "Minitel" },
        { value: "ariane",   label: "Ariane",   disabled: true },
    ];
<\/script>

<RadioGroup bind:value {options} name="transport" palette="accent" />`;
</script>

<Headline size="md" uppercase>
    {trans?.radio_demo?.title ?? "Radio Group"}
</Headline>

<!-- Controls ────────────────────────────────────────────────────────────── -->

<ControlBar palette="tone" rounded>
    <Selector
        label={trans?.radio_demo?.lbl_palette ?? "Palette"}
        options={["accent", "tone"]}
        bind:value={demo_palette}
    />
    <Selector
        label={trans?.radio_demo?.lbl_size ?? "Size"}
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label={trans?.radio_demo?.lbl_label_position ?? "Label position"}
        options={["right", "left", "top", "bottom"]}
        bind:value={demo_label_position}
    />
</ControlBar>

<!-- Live preview ─────────────────────────────────────────────────────────── -->

<div class="radio-preview">
    <div class="preview-columns">

        <!-- Enabled -->
        <div class="preview-col">
            <span class="col-label">{trans?.radio_demo?.lbl_enabled ?? "Enabled"}</span>
            <RadioGroup
                bind:value={selected_live}
                options={options}
                name="demo-live"
                palette={demo_palette}
                size={demo_size}
                label_position={demo_label_position}
            />
        </div>

        <!-- Disabled group -->
        <div class="preview-col">
            <span class="col-label">{trans?.radio_demo?.lbl_disabled ?? "Disabled"}</span>
            <RadioGroup
                value="tgv"
                options={options}
                name="demo-disabled"
                palette={demo_palette}
                size={demo_size}
                label_position={demo_label_position}
                disabled
            />
        </div>

        <!-- Individual disabled -->
        <div class="preview-col">
            <span class="col-label">{trans?.radio_demo?.lbl_individual ?? "Individual disabled"}</span>
            <RadioGroup
                bind:value={selected_individual}
                options={options_with_disabled}
                name="demo-individual"
                palette={demo_palette}
                size={demo_size}
                label_position={demo_label_position}
            />
        </div>

    </div>
</div>

<!-- Code examples ────────────────────────────────────────────────────────── -->

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "basic", code: code_basic, language: "Svelte" },
        { label: "label_position", code: code_label_position, language: "Svelte" },
        { label: "disabled (group)", code: code_disabled_group, language: "Svelte" },
        { label: "disabled (individual)", code: code_disabled_individual, language: "Svelte" },
    ]}
/>

<style>
    .radio-preview {
        border: 1.5px solid var(--highlight);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 0.75rem;
    }

    .preview-columns {
        display: flex;
        flex-wrap: wrap;
        gap: 2.5rem;
        align-items: flex-start;
    }

    .preview-col {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .preview-col + .preview-col {
        padding-left: 2rem;
        border-left: 1.5px solid var(--highlight);
    }

    .col-label {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }
</style>
