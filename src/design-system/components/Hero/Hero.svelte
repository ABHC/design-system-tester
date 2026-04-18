<script lang="ts">
    import type { Snippet } from "svelte";
    import { type PatternPreset, PATTERN_PRESETS, tintPattern } from "../../utils/patterns";

    // Types ------------------------------------------------------------------

    type Layout = "single" | "two-cols" | "two-rows" | "main-left" | "main-right" | "grid-2x2";
    type Palette = "transparent" | "tone" | "accent" | "accent-bg";
    type Effect = "none" | "glow" | "blur" | "fade";
    type Mask = "none" | "ellipse" | "fade";
    type MaskDirection = "top" | "bottom" | "left" | "right";

    // Props ------------------------------------------------------------------

    interface Props {
        layout?: Layout;
        palette?: Palette;
        pattern?: PatternPreset | string;
        pattern_color?: string;
        pattern_opacity?: number;
        pattern_size?: string;
        pattern_effect?: Effect;
        pattern_effect_opacity?: number;
        pattern_mask?: Mask;
        pattern_mask_direction?: MaskDirection;
        pattern_mask_size?: number;
        height?: string;
        gap?: string;
        cell_1?: Snippet;
        cell_2?: Snippet;
        cell_3?: Snippet;
        cell_4?: Snippet;
    }

    let {
        layout = "single",
        palette = "transparent",
        pattern = "none",
        pattern_color = "white",
        pattern_opacity = 0.6,
        pattern_size = undefined,
        pattern_effect = "none",
        pattern_effect_opacity = 1,
        pattern_mask = "none",
        pattern_mask_direction = "bottom",
        pattern_mask_size = 70,
        height = "85dvh",
        gap = "0",
        cell_1,
        cell_2,
        cell_3,
        cell_4,
    }: Props = $props();

    // Derived values ---------------------------------------------------------

    const pattern_bg = $derived.by(() => {
        if (pattern === "none" || !pattern) return "none";
        if (pattern in PATTERN_PRESETS) {
            return tintPattern(PATTERN_PRESETS[pattern as Exclude<PatternPreset, "none">], pattern_color);
        }
        return pattern;
    });

    const mask_value = $derived.by(() => {
        if (pattern_mask === "none") return "none";
        if (pattern_mask === "ellipse") {
            return `radial-gradient(ellipse ${pattern_mask_size}% ${pattern_mask_size}% at 50% 50%, black 20%, transparent ${pattern_mask_size}%)`;
        }
        const dir_map: Record<MaskDirection, string> = {
            top: "to top",
            bottom: "to bottom",
            left: "to left",
            right: "to right",
        };
        return `linear-gradient(${dir_map[pattern_mask_direction]}, black 0%, transparent ${pattern_mask_size}%)`;
    });

    const root_style = $derived(
        [
            `--hero-height: ${height}`,
            `--hero-gap: ${gap}`,
            `--hero-pattern-opacity: ${pattern_opacity}`,
            `--hero-pattern-bg: ${pattern_bg}`,
            `--hero-pattern-size: ${pattern_size ?? "auto"}`,
            `--hero-effect-opacity: ${pattern_effect_opacity}`,
            `--hero-mask: ${mask_value}`,
        ].join("; ")
    );
</script>

<!-- Markup ------------------------------------------------------------------- -->

<section
    class="hero hero-palette-{palette}"
    style={root_style}
>
    {#if pattern_bg !== "none"}
        <div class="hero-pattern"></div>
    {/if}

    {#if pattern_effect !== "none"}
        <div class="hero-effect hero-effect-{pattern_effect}"></div>
    {/if}

    <div class="hero-content hero-layout-{layout}">
        {#if layout === "single"}
            <div class="hero-cell">{@render cell_1?.()}</div>
        {:else if layout === "two-cols" || layout === "two-rows"}
            <div class="hero-cell">{@render cell_1?.()}</div>
            <div class="hero-cell">{@render cell_2?.()}</div>
        {:else if layout === "main-left"}
            <div class="hero-cell hero-main">{@render cell_1?.()}</div>
            <div class="hero-stack">
                <div class="hero-cell">{@render cell_2?.()}</div>
                <div class="hero-cell">{@render cell_3?.()}</div>
            </div>
        {:else if layout === "main-right"}
            <div class="hero-stack">
                <div class="hero-cell">{@render cell_1?.()}</div>
                <div class="hero-cell">{@render cell_2?.()}</div>
            </div>
            <div class="hero-cell hero-main">{@render cell_3?.()}</div>
        {:else if layout === "grid-2x2"}
            <div class="hero-cell">{@render cell_1?.()}</div>
            <div class="hero-cell">{@render cell_2?.()}</div>
            <div class="hero-cell">{@render cell_3?.()}</div>
            <div class="hero-cell">{@render cell_4?.()}</div>
        {/if}
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: var(--hero-height);
        overflow: hidden;
        width: 100%;
    }

    /* Palette -------------------------------------------------------------- */

    .hero-palette-transparent {
        background: var(--tone-bg);
        color: var(--text);
    }

    .hero-palette-tone {
        background: var(--tone);
        color: var(--text);
    }

    .hero-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
    }

    .hero-palette-accent-bg {
        background: var(--accent-bg);
        color: var(--text);
    }

    .hero-palette-accent :global(h3) {
        color: var(--text-accent);
    }

    .hero-palette-transparent :global(h3),
    .hero-palette-tone :global(h3),
    .hero-palette-accent-bg :global(h3) {
        color: var(--text);
    }

    /* Pattern layer -------------------------------------------------------- */

    .hero-pattern {
        position: absolute;
        inset: 0;
        background-image: var(--hero-pattern-bg);
        background-repeat: repeat;
        background-size: var(--hero-pattern-size);
        opacity: var(--hero-pattern-opacity);
        mask-image: var(--hero-mask);
        -webkit-mask-image: var(--hero-mask);
        pointer-events: none;
    }

    /* Effect layer --------------------------------------------------------- */

    .hero-effect {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: var(--hero-effect-opacity);
    }

    .hero-effect-glow {
        background: radial-gradient(
            ellipse 60% 50% at 50% 40%,
            color-mix(in oklch, var(--accent) 8%, transparent),
            transparent
        );
    }

    .hero-effect-blur {
        backdrop-filter: blur(2px);
    }

    .hero-effect-fade {
        background: linear-gradient(
            to bottom,
            transparent 0%,
            color-mix(in oklch, var(--tone-bg) 80%, transparent) 100%
        );
    }

    /* Content wrapper (flex layouts) --------------------------------------- */

    .hero-content {
        position: relative;
        z-index: 1;
        display: flex;
        width: 100%;
        min-height: var(--hero-height);
        gap: var(--hero-gap);
    }

    .hero-cell {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
    }

    /* Layouts -------------------------------------------------------------- */

    .hero-layout-single {
        flex-direction: column;
    }

    .hero-layout-two-cols {
        flex-direction: row;
    }

    .hero-layout-two-rows {
        flex-direction: column;
    }

    .hero-layout-main-left,
    .hero-layout-main-right {
        flex-direction: row;
    }

    .hero-layout-main-left .hero-main,
    .hero-layout-main-right .hero-main {
        flex: 2 1 0;
    }

    .hero-stack {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--hero-gap);
    }

    .hero-stack .hero-cell {
        flex: 1 1 0;
    }

    .hero-layout-grid-2x2 {
        flex-wrap: wrap;
    }

    .hero-layout-grid-2x2 .hero-cell {
        flex: 1 1 calc(50% - var(--hero-gap));
        min-height: calc(var(--hero-height) / 2 - var(--hero-gap) / 2);
    }

    /* Mobile collapse (< 640px) -------------------------------------------- */

    @media (max-width: 639px) {
        .hero-content {
            flex-direction: column;
            min-height: auto;
        }

        .hero-stack {
            flex-direction: column;
        }

        .hero-cell,
        .hero-stack,
        .hero-layout-grid-2x2 .hero-cell {
            flex: 1 1 auto;
            width: 100%;
            min-height: auto;
        }
    }
</style>
