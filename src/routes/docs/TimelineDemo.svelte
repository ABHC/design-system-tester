<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import type { TimelineVariant, TimelinePalette, TimelineSize, TimelineElevation, TimelineOrientation, TimelineConnectorStyle } from '@abhc/spektral-ui';
    import {
        Headline,
        Timeline,
        TimelineItem,
        Callout,
        CodeBlock,
        DataTable,
        Selector,
        ControlBar,
        Slider
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const tl = $derived(placeholders.timeline);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined" | "ghost";
    type Palette = "accent" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";
    type Orientation = "vertical" | "horizontal";
    type ConnectorStyle = "solid" | "dashed" | "mixed" | "none";
    type Preset = "classic" | "changelog" | "stepper" | "commits";

    let demo_preset: Preset = $state("classic");
    let demo_variant: Variant = $state("ghost");
    let demo_palette: Palette = $state("accent");
    let demo_size: Size = $state("md");
    let demo_elevation: Elevation = $state("none");
    let demo_orientation: Orientation = $state("vertical");
    let demo_connector: ConnectorStyle = $state("solid");
    let demo_rounded: boolean = $state(false);
    let demo_marker_rounded: boolean = $state(false);
    let demo_reverse: boolean = $state(false);
    let demo_completed: number = $state(2);

    const bool_opts = [{ value: true, label: "true" }, { value: false, label: "false" }] as const;

    const vge_photo = "../assets/vge.jpeg";
    const jc_photo = "../assets/jc.jpeg";

    // ── Code examples ───────────────────────────────────────────────────────

    const code_classic = `<Timeline orientation="vertical" palette="accent" completed={2}>
    {#snippet dot_install()}<span class="material-symbols-outlined">download</span>{/snippet}
    {#snippet dot_config()}<span class="material-symbols-outlined">tune</span>{/snippet}
    {#snippet dot_deploy()}<span class="material-symbols-outlined">rocket_launch</span>{/snippet}
    {#snippet dot_validate()}<span class="material-symbols-outlined">verified</span>{/snippet}

    <TimelineItem marker={dot_install} title="Install" meta="day 1">
        Clone the repository and run npm install.
    </TimelineItem>
    <TimelineItem marker={dot_config} title="Configure" meta="day 2">
        Tune the theme tokens to match your brand.
    </TimelineItem>
    <TimelineItem marker={dot_deploy} title="Deploy" meta="day 3">
        Ship to production with confidence.
    </TimelineItem>
    <TimelineItem marker={dot_validate} title="Validate" meta="day 4">
        Review the final rendering and gather feedback.
    </TimelineItem>
</Timeline>`;

    const code_changelog = `<!-- wide markers let long content (version strings)
     grow the dot into a pill while short markers stay circular. -->
<Timeline
    variant="outlined"
    palette="info"
    connector="mixed"
    completed={2}
    rounded
>
    {#snippet v_1()}v0.7.0{/snippet}
    {#snippet v_2()}v0.8.0{/snippet}
    {#snippet v_3()}v0.9.2{/snippet}
    {#snippet v_4()}v1.0.0{/snippet}

    <TimelineItem marker={v_1} title="Dark mode" meta="2026-03-01" wide>
        Full dark theme with reinforced contrast tokens.
    </TimelineItem>
    <TimelineItem marker={v_2} title="New components" meta="2026-02-14" wide>
        Marquee, Slider and Timeline join the library.
    </TimelineItem>
    <TimelineItem marker={v_3} title="Theme engine" meta="2026-01-20" wide>
        Token system rewrite with custom palettes.
    </TimelineItem>
    <TimelineItem marker={v_4} title="Initial release" meta="2025-12-05" wide>
        First public cut with the base component set.
    </TimelineItem>
</Timeline>`;

    const code_stepper = `<Timeline
    orientation="horizontal"
    palette="success"
    completed={2}
    size="lg"
>
    {#snippet step_1()}1{/snippet}
    {#snippet step_2()}2{/snippet}
    {#snippet step_3()}3{/snippet}
    {#snippet step_4()}4{/snippet}

    <TimelineItem marker={step_1} title="Cart">Review items.</TimelineItem>
    <TimelineItem marker={step_2} title="Shipping">Pick address.</TimelineItem>
    <TimelineItem marker={step_3} title="Payment">Enter details.</TimelineItem>
    <TimelineItem marker={step_4} title="Confirm">Order placed.</TimelineItem>
</Timeline>`;

    const code_commits = `<!-- reverse={true} lights the last N items instead of the first N,
     so the most recent commit at the top is also the most "complete". -->
<Timeline palette="neutral" completed={2} reverse size="lg">
    {#snippet author_vge()}
        <img class="tl-marker-photo" src="/avatars/vge.jpg" alt="VGE" />
    {/snippet}
    {#snippet author_fm()}FM{/snippet}
    {#snippet author_jc()}
        <img class="tl-marker-photo" src="/avatars/jc.jpg" alt="JC" />
    {/snippet}
    {#snippet author_lj()}LJ{/snippet}

    <TimelineItem marker={author_vge} title="Initial import" meta="feat">
        First cut of the V Republic customizer.
    </TimelineItem>
    <TimelineItem marker={author_fm} title="Refactor tokens" meta="refactor">
        Rewrote the palette engine from scratch.
    </TimelineItem>
    <TimelineItem marker={author_jc} title="Fix theme switch" meta="fix">
        Dark mode no longer leaks into print.
    </TimelineItem>
    <TimelineItem marker={author_lj} title="Docs pass" meta="chore">
        Cleaned up the component reference.
    </TimelineItem>
</Timeline>`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- Marker snippets — classic preset ─────────────────────────────────────── -->

{#snippet marker_download()}
    <span class="material-symbols-outlined tl-marker-icon">download</span>
{/snippet}

{#snippet marker_tune()}
    <span class="material-symbols-outlined tl-marker-icon">tune</span>
{/snippet}

{#snippet marker_rocket()}
    <span class="material-symbols-outlined tl-marker-icon">rocket_launch</span>
{/snippet}

{#snippet marker_verified()}
    <span class="material-symbols-outlined tl-marker-icon">verified</span>
{/snippet}

<!-- Marker snippets — changelog preset ───────────────────────────────────── -->

{#snippet marker_palette()}
    <span>v0.7.0</span>
{/snippet}

{#snippet marker_extension()}
    <span>v0.8.0</span>
{/snippet}

{#snippet marker_theme()}
    <span>v0.9.2</span>
{/snippet}

{#snippet marker_flag()}
    <span>v1.0.0</span>
{/snippet}

<!-- Marker snippets — stepper preset (numbered) ──────────────────────────── -->

{#snippet marker_num_1()}<span class="tl-marker-num">1</span>{/snippet}
{#snippet marker_num_2()}<span class="tl-marker-num">2</span>{/snippet}
{#snippet marker_num_3()}<span class="tl-marker-num">3</span>{/snippet}
{#snippet marker_num_4()}<span class="tl-marker-num">4</span>{/snippet}

<!-- Marker snippets — commits preset ─────────────────────────────────────── -->

{#snippet marker_author_vge()}
    <img class="tl-marker-photo" src={vge_photo} alt="VGE" />
{/snippet}

{#snippet marker_author_fm()}
    <span class="tl-marker-initials">FM</span>
{/snippet}

{#snippet marker_author_jc()}
    <img class="tl-marker-photo" src={jc_photo} alt="JC" />
{/snippet}

{#snippet marker_author_lj()}
    <span class="tl-marker-initials">LJ</span>
{/snippet}

<!-- Demo ──────────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo ?? "Demo"}>
    <Headline size="md" uppercase>Timeline</Headline>
</div>

<ControlBar palette="tone">
    <Selector
        label="Preset"
        options={["classic", "changelog", "stepper", "commits"]}
        bind:value={demo_preset}
    />
    <Selector
        label="Variant"
        options={["ghost", "flat", "outlined"]}
        bind:value={demo_variant}
    />
    <Selector
        label="Palette"
        options={["accent", "neutral", "error", "warning", "success", "info"]}
        bind:value={demo_palette}
    />
    <Selector
        label="Size"
        options={["sm", "md", "lg"]}
        bind:value={demo_size}
    />
    <Selector
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector
        label="Orientation"
        options={["vertical", "horizontal"]}
        bind:value={demo_orientation}
    />
    <Selector
        label="Connector"
        options={["solid", "dashed", "mixed", "none"]}
        bind:value={demo_connector}
    />
    <Selector
        label="Rounded"
        options={bool_opts}
        bind:value={demo_rounded}
    />
    <Selector
        label="Round marker"
        options={bool_opts}
        bind:value={demo_marker_rounded}
    />
    <Selector
        label="Reverse"
        options={bool_opts}
        bind:value={demo_reverse}
    />

    <div class="slider-control">
        <span class="slider-label">Completed ({demo_completed}/4)</span>
        <Slider
            palette="accent"
            size="sm"
            min={0}
            max={4}
            step={1}
            bind:value={demo_completed}
        />
    </div>
</ControlBar>

<div class="timeline-preview" class:timeline-preview-horizontal={demo_orientation === "horizontal"}>
    {#key demo_preset}
        <Timeline
            variant={demo_variant}
            palette={demo_palette}
            size={demo_size}
            elevation={demo_elevation}
            orientation={demo_orientation}
            connector={demo_connector}
            rounded={demo_rounded}
            completed={demo_completed}
            reverse={demo_reverse}
        >
            {#if demo_preset === "classic"}
                <TimelineItem
                    marker={marker_download}
                    title={tl.classic.s1_title}
                    rounded={demo_marker_rounded}
                >
                    {tl.classic.s1_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_tune}
                    title={tl.classic.s2_title}
                    rounded={demo_marker_rounded}
                >
                    {tl.classic.s2_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_rocket}
                    title={tl.classic.s3_title}
                    rounded={demo_marker_rounded}
                >
                    {tl.classic.s3_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_verified}
                    title={tl.classic.s4_title}
                    rounded={demo_marker_rounded}
                >
                    {tl.classic.s4_body}
                </TimelineItem>
            {:else if demo_preset === "changelog"}
                <TimelineItem
                    marker={marker_palette}
                    title={tl.changelog.s1_title}
                    meta={tl.changelog.s1_meta}
                    rounded={demo_marker_rounded}
                    wide
                >
                    {tl.changelog.s1_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_extension}
                    title={tl.changelog.s2_title}
                    meta={tl.changelog.s2_meta}
                    rounded={demo_marker_rounded}
                    wide
                >
                    {tl.changelog.s2_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_theme}
                    title={tl.changelog.s3_title}
                    meta={tl.changelog.s3_meta}
                    rounded={demo_marker_rounded}
                    wide
                >
                    {tl.changelog.s3_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_flag}
                    title={tl.changelog.s4_title}
                    meta={tl.changelog.s4_meta}
                    rounded={demo_marker_rounded}
                    wide
                >
                    {tl.changelog.s4_body}
                </TimelineItem>
            {:else if demo_preset === "stepper"}
                <TimelineItem
                    marker={marker_num_1}
                    title={tl.stepper.s1_title}
                    meta={tl.stepper.s1_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.stepper.s1_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_num_2}
                    title={tl.stepper.s2_title}
                    meta={tl.stepper.s2_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.stepper.s2_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_num_3}
                    title={tl.stepper.s3_title}
                    meta={tl.stepper.s3_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.stepper.s3_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_num_4}
                    title={tl.stepper.s4_title}
                    meta={tl.stepper.s4_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.stepper.s4_body}
                </TimelineItem>
            {:else}
                <TimelineItem
                    marker={marker_author_vge}
                    title={tl.commits.s1_title}
                    meta={tl.commits.s1_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.commits.s1_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_author_fm}
                    title={tl.commits.s2_title}
                    meta={tl.commits.s2_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.commits.s2_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_author_jc}
                    title={tl.commits.s3_title}
                    meta={tl.commits.s3_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.commits.s3_body}
                </TimelineItem>
                <TimelineItem
                    marker={marker_author_lj}
                    title={tl.commits.s4_title}
                    meta={tl.commits.s4_meta}
                    rounded={demo_marker_rounded}
                >
                    {tl.commits.s4_body}
                </TimelineItem>
            {/if}
        </Timeline>
    {/key}
</div>

<!-- Usage ─────────────────────────────────────────────────────────────────── -->

<div data-summary="usage" data-summary-label={trans?.doc.usage ?? "Usage"}>
    <Headline size="sm" uppercase muted>{trans?.doc.usage ?? "Usage"}</Headline>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Classic", code: code_classic, language: "Svelte" },
        { label: "Changelog", code: code_changelog, language: "Svelte" },
        { label: "Stepper", code: code_stepper, language: "Svelte" },
        { label: "Commits", code: code_commits, language: "Svelte" },
    ]}
/>

<!-- API ───────────────────────────────────────────────────────────────────── -->

<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
    <Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>

    <div style="margin-bottom: 1rem;">
        <Callout variant="info">
            {#snippet leading()}
                <span class="material-symbols-outlined">package_2</span>
            {/snippet}
            {#snippet children()}
                {trans?.doc.types_notice}<br />
                <code>import type &lbrace; TimelineVariant, TimelinePalette, TimelineSize, TimelineElevation, TimelineOrientation, TimelineConnectorStyle &rbrace; from '@abhc/spektral-ui';</code>
            {/snippet}
        </Callout>
    </div>

    <h4 class="api-subtitle">Timeline</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "variant", type: '"flat" | "outlined" | "ghost"', default: '"ghost"' },
            { prop: "palette", type: '"accent" | "neutral" | "error" | "warning" | "success" | "info"', default: '"accent"' },
            { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
            { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"none"' },
            { prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"' },
            { prop: "connector", type: '"solid" | "dashed" | "mixed" | "none"', default: '"solid"' },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "completed", type: "number", default: "0" },
            { prop: "reverse", type: "boolean", default: "false" },
            { prop: "children", type: "Snippet", default: "required" },
        ]}
    />

    <h4 class="api-subtitle">TimelineItem</h4>
    <DataTable
        variant="ghost" palette="tone" size="sm"
        columns={[
            { key: "prop", label: "Prop" },
            { key: "type", label: "Type", cell: codeCell },
            { key: "default", label: "Default", cell: codeCell },
        ]}
        rows={[
            { prop: "marker", type: "Snippet", default: "required" },
            { prop: "title", type: "string", default: '""' },
            { prop: "meta", type: "string", default: '""' },
            { prop: "rounded", type: "boolean", default: "false" },
            { prop: "wide", type: "boolean", default: "false" },
            { prop: "children", type: "Snippet", default: "undefined" },
        ]}
    />

</div>

<style>
    .timeline-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
    }

    .timeline-preview-horizontal {
        overflow-x: auto;
    }

    .tl-marker-icon {
        font-size: 0.95em;
        line-height: 1;
    }

    .tl-marker-num {
        font-weight: 700;
        font-size: 0.9em;
        line-height: 1;
    }

    /* Photo marker — fills the dot so the image replaces the colored fill.
       Grayscale when the item is off gives a visible "complete/incomplete"
       state even though the background is hidden behind the image. */
    .timeline-preview :global(.tl-marker-photo) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
        display: block;
        filter: grayscale(1) contrast(0.9);
        opacity: 0.55;
        transition: filter 0.25s ease, opacity 0.25s ease;
    }

    .timeline-preview :global(.timeline-item-on .tl-marker-photo) {
        filter: none;
        opacity: 1;
    }

    .tl-marker-initials {
        font-weight: 700;
        font-size: 0.85em;
        letter-spacing: 0.02em;
        line-height: 1;
    }

    .api-subtitle {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 1rem 0 0.5rem;
        color: var(--text-muted);
    }

    .slider-control {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-width: 160px;
    }

    .slider-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }
</style>
