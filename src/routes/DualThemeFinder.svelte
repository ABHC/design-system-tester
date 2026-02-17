<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import type { RequiredPair, ScaleSuggestion } from "$lib/utils/contrast";
    import { getContrastRatio, getWcagLevel, hexToOklch, suggestDualScales } from "$lib/utils/contrast";

    interface Props {
        trans: Translation | null;
        light_palettes: ToneTheme[];
        dark_palettes: ToneTheme[];
        selected_accent: AccentTheme;
    }

    let {
        trans,
        light_palettes,
        dark_palettes,
        selected_accent,
    }: Props = $props();

    let light_index = $state(0);
    let dark_index = $state(0);

    const light_theme = $derived(light_palettes[light_index]);
    const dark_theme = $derived(dark_palettes[dark_index]);

    // Build rules for a given theme (0=light, 1=accent, 2=dark)
    function buildRules(palette: ToneTheme, isDark: boolean): (RequiredPair & { priority: string })[] {
        const pairs: (RequiredPair & { priority: string })[] = [];

        // text_accent sur accent (seul aplat primaire) → 4.5:1
        pairs.push({ variant_idx: 1, surface_key: 'text', targetRatio: 4.5, priority: 'non_negotiable' });

        if (isDark) {
            // accent-light (idx=0) comme TEXTE sur surfaces sombres
            pairs.push({ variant_idx: 0, surface_key: 'bg', targetRatio: 4.5, priority: 'non_negotiable' });
            pairs.push({ variant_idx: 0, surface_key: 'card', targetRatio: 4.5, priority: 'non_negotiable' });
            pairs.push({ variant_idx: 0, surface_key: 'highlight', targetRatio: 3.0, priority: 'satisfactory' });
            // accent comme APLAT sur card → 3:1
            pairs.push({ variant_idx: 1, surface_key: 'card', targetRatio: 3.0, priority: 'satisfactory' });
        } else {
            // accent-dark (idx=2) comme TEXTE sur surfaces claires
            pairs.push({ variant_idx: 2, surface_key: 'bg', targetRatio: 4.5, priority: 'non_negotiable' });
            pairs.push({ variant_idx: 2, surface_key: 'card', targetRatio: 4.5, priority: 'non_negotiable' });
            pairs.push({ variant_idx: 2, surface_key: 'highlight', targetRatio: 3.0, priority: 'satisfactory' });
            // accent comme APLAT sur card → 3:1
            pairs.push({ variant_idx: 1, surface_key: 'card', targetRatio: 3.0, priority: 'satisfactory' });
        }

        return pairs;
    }

    // Combined rules from both themes
    const combined_rules = $derived.by(() => {
        const darkRules = buildRules(dark_theme, true);
        const lightRules = buildRules(light_theme, false);

        const rules: (RequiredPair & { theme: 'dark' | 'light' })[] = [];
        for (const r of darkRules) rules.push({ variant_idx: r.variant_idx, surface_key: `dark_${r.surface_key}`, targetRatio: r.targetRatio, theme: 'dark' });
        for (const r of lightRules) rules.push({ variant_idx: r.variant_idx, surface_key: `light_${r.surface_key}`, targetRatio: r.targetRatio, theme: 'light' });
        return rules;
    });

    // Surface hex map combining both themes
    const combined_surfaces = $derived<Record<string, string>>({
        dark_bg: dark_theme.bg,
        dark_card: dark_theme.card,
        dark_highlight: dark_theme.highlight,
        dark_text: selected_accent.text_accent,
        light_bg: light_theme.bg,
        light_card: light_theme.card,
        light_highlight: light_theme.highlight,
        light_text: selected_accent.text_accent,
    });

    // Generate multiple candidate scales
    const dual_candidates = $derived.by((): ScaleSuggestion[] => {
        const accentOklch = hexToOklch(selected_accent.accent);
        if (!accentOklch) return [];

        const rules: RequiredPair[] = combined_rules.map(r => ({
            variant_idx: r.variant_idx,
            surface_key: r.surface_key,
            targetRatio: r.targetRatio,
        }));

        return suggestDualScales(
            accentOklch.c, accentOklch.h, accentOklch.l,
            combined_surfaces,
            rules,
        );
    });

    const SHADE_NAMES = ['light', 'accent', 'dark'];

    // Compute ratios for each shade against each surface in a theme
    function getRatiosForTheme(shades: { hex: string }[], palette: ToneTheme) {
        const surfaceKeys = [
            { key: 'bg', label: trans?.contrast.background, color: palette.bg },
            { key: 'card', label: trans?.contrast.card, color: palette.card },
            { key: 'highlight', label: trans?.contrast.highlight, color: palette.highlight },
            { key: 'text', label: trans?.contrast.text_accent, color: selected_accent.text_accent },
        ];

        return shades.map(shade => ({
            hex: shade.hex,
            surfaces: surfaceKeys.map(s => {
                const ratio = getContrastRatio(shade.hex, s.color);
                const wcag = getWcagLevel(ratio, 'normal');
                return { key: s.key, label: s.label, ratio, wcag, surfaceColor: s.color };
            }),
        }));
    }

    function countPassing(candidate: ScaleSuggestion): number {
        return candidate.shades.filter(s => s.ok).length;
    }
</script>

<div class="demo-section">
    <div class="section-title">{trans?.contrast.dual_title}</div>
    <div class="dual-finder">
        <p class="dual-desc">{trans?.contrast.dual_desc}</p>

        <div class="dual-selectors">
            <div class="dual-selector">
                <label class="dual-selector-label" for="dual-light-select">{trans?.contrast.dual_light_theme}</label>
                <select id="dual-light-select" class="dual-select" bind:value={light_index}>
                    {#each light_palettes as palette, i}
                        <option value={i}>{palette.name}</option>
                    {/each}
                </select>
            </div>
            <div class="dual-selector">
                <label class="dual-selector-label" for="dual-dark-select">{trans?.contrast.dual_dark_theme}</label>
                <select id="dual-dark-select" class="dual-select" bind:value={dark_index}>
                    {#each dark_palettes as palette, i}
                        <option value={i}>{palette.name}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="dual-result-title">{trans?.contrast.dual_result} ({dual_candidates.length} {trans?.contrast.dual_candidates})</div>

        {#if dual_candidates.length > 0}
            {#each dual_candidates as candidate, candidateIdx}
                <div class="dual-candidate" class:dual-candidate-best={candidateIdx === 0}>
                    <div class="dual-candidate-header">
                        <span class="dual-candidate-rank">#{candidateIdx + 1}</span>
                        <span class="dual-candidate-score">{trans?.contrast.dual_score}: {candidate.score.toFixed(1)}</span>
                        <span class="dual-candidate-passing">{countPassing(candidate)}/3 {trans?.contrast.dual_pass}</span>
                    </div>

                    <div class="scale-swatches">
                        {#each candidate.shades as shade}
                            <div class="scale-swatch-item" class:scale-swatch-fail={!shade.ok}>
                                <div class="scale-swatch" style="background: {shade.hex};"></div>
                                <span class="scale-swatch-label">{shade.name}</span>
                                <span class="scale-swatch-hex">{shade.hex}</span>
                                <span class="scale-swatch-l">L {Math.round(shade.l * 100)}%</span>
                                {#if !shade.ok}
                                    <span class="scale-swatch-status" style="color: #ef4444;">{trans?.contrast.dual_fail}</span>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    <div class="scale-bar">
                        {#each candidate.shades as shade}
                            <div class="scale-bar-segment" style="background: {shade.hex};" title="{shade.name}: {shade.hex}"></div>
                        {/each}
                    </div>

                    <!-- Ratios on dark theme -->
                    {#if true}
                        {@const darkRatios = getRatiosForTheme(candidate.shades, dark_theme)}
                        <div class="dual-ratios-section">
                            <div class="dual-ratios-title">{trans?.contrast.dual_ratios_on} {dark_theme.name} ({trans?.control.dark})</div>
                            <div class="dual-ratios-grid">
                                {#each darkRatios as shadeRatios, idx}
                                    <div class="dual-ratio-block">
                                        <div class="dual-ratio-shade-label">{SHADE_NAMES[idx]}</div>
                                        {#each shadeRatios.surfaces as s}
                                            <div class="dual-ratio-row">
                                                <div
                                                    class="contrast-swatch-text reco-scale-swatch"
                                                    style="background: {s.key === 'text' ? shadeRatios.hex : s.surfaceColor}; color: {s.key === 'text' ? s.surfaceColor : shadeRatios.hex};"
                                                >Aa</div>
                                                <span class="dual-ratio-surface">{s.label}</span>
                                                <span class="dual-ratio-value">{s.ratio}</span>
                                                <span class="wcag-badge" style="background: {s.wcag.colour}; color: #ffffff;">{s.wcag.level}</span>
                                            </div>
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Ratios on light theme -->
                    {#if true}
                        {@const lightRatios = getRatiosForTheme(candidate.shades, light_theme)}
                        <div class="dual-ratios-section">
                            <div class="dual-ratios-title">{trans?.contrast.dual_ratios_on} {light_theme.name} ({trans?.control.light})</div>
                            <div class="dual-ratios-grid">
                                {#each lightRatios as shadeRatios, idx}
                                    <div class="dual-ratio-block">
                                        <div class="dual-ratio-shade-label">{SHADE_NAMES[idx]}</div>
                                        {#each shadeRatios.surfaces as s}
                                            <div class="dual-ratio-row">
                                                <div
                                                    class="contrast-swatch-text reco-scale-swatch"
                                                    style="background: {s.key === 'text' ? shadeRatios.hex : s.surfaceColor}; color: {s.key === 'text' ? s.surfaceColor : shadeRatios.hex};"
                                                >Aa</div>
                                                <span class="dual-ratio-surface">{s.label}</span>
                                                <span class="dual-ratio-value">{s.ratio}</span>
                                                <span class="wcag-badge" style="background: {s.wcag.colour}; color: #ffffff;">{s.wcag.level}</span>
                                            </div>
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        {:else}
            <div class="dual-no-result">{trans?.contrast.dual_no_result}</div>
        {/if}
    </div>
</div>

<style>
    .demo-section {
        margin-bottom: 40px;
    }

    .section-title {
        margin-bottom: 20px;
        color: var(--text);
        font-size: 2rem;
        font-weight: 600;
    }

    .dual-finder {
        background: var(--card);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }

    .dual-desc {
        font-size: 0.82rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 1rem;
    }

    .dual-selectors {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }

    .dual-selector {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .dual-selector-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .dual-select {
        padding: 8px 12px;
        border: 2px solid var(--highlight);
        background: var(--bg);
        color: var(--text);
        border-radius: 6px;
        font-size: 14px;
        min-width: 180px;
    }

    .dual-select:focus {
        outline: none;
        border-color: var(--accent);
    }

    .dual-result-title {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        margin: 1rem 0 0.5rem 0;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid var(--highlight);
    }

    .dual-no-result {
        font-size: 0.82rem;
        color: #ef4444;
        font-style: italic;
        margin: 0.5rem 0;
    }

    /* Candidate cards */
    .dual-candidate {
        background: var(--bg);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        border: 1px solid var(--highlight);
    }

    .dual-candidate-best {
        border-color: var(--accent);
        border-width: 2px;
    }

    .dual-candidate-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .dual-candidate-rank {
        font-size: 1rem;
        font-weight: 800;
        color: var(--accent);
    }

    .dual-candidate-score {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-muted);
        background: var(--highlight);
        padding: 2px 8px;
        border-radius: 10px;
    }

    .dual-candidate-passing {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-muted);
    }

    /* Scale swatches */
    .scale-swatches {
        display: flex;
        gap: 0.75rem;
        margin: 0.5rem 0;
        flex-wrap: wrap;
    }

    .scale-swatch-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
    }

    .scale-swatch {
        width: 3rem;
        height: 2rem;
        border-radius: 4px;
    }

    .scale-swatch-label {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--text-muted);
    }

    .scale-swatch-hex {
        font-size: 0.65rem;
        font-family: monospace;
        color: var(--text-muted);
    }

    .scale-swatch-l {
        font-size: 0.65rem;
        font-style: italic;
        color: var(--text-muted);
    }

    .scale-swatch-fail {
        opacity: 0.6;
    }

    .scale-swatch-status {
        font-size: 0.6rem;
        font-weight: 700;
    }

    .scale-bar {
        display: flex;
        height: 0.6rem;
        border-radius: 3px;
        overflow: hidden;
        margin: 0.25rem 0 0.5rem 0;
    }

    .scale-bar-segment {
        flex: 1;
    }

    /* Ratio tables */
    .dual-ratios-section {
        margin: 1rem 0;
    }

    .dual-ratios-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 0.5rem;
    }

    .dual-ratios-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 0.75rem;
    }

    .dual-ratio-block {
        background: var(--highlight);
        border-radius: 6px;
        padding: 0.6rem;
    }

    .dual-ratio-shade-label {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 0.4rem;
    }

    .dual-ratio-row {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.3rem;
    }

    .contrast-swatch-text {
        width: 3rem;
        height: 2rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        flex-shrink: 0;
    }

    .reco-scale-swatch {
        margin-bottom: 0;
        width: 2.2rem;
        height: 1.6rem;
        font-size: 0.75rem;
    }

    .dual-ratio-surface {
        flex: 1;
        font-size: 0.72rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dual-ratio-value {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text);
    }

    .wcag-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
    }
</style>
