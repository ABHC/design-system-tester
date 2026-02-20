<script lang="ts">
    import type { AccentTheme, ToneTheme, ContextualColors } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import { simulateColorblind, type ColorblindType } from "$lib/utils/colorblind";
    import { getContrastRatio, getWcagLevel, getLuminance, blendColor } from "$lib/utils/contrast";
    import { ctx_opacity, ctx_surface } from "./store";

    interface PairInfo {
        accent_name: string;
        surface_name: string;
        fg: string;
        bg: string;
        ratio: number;
        level: string;
    }

    interface ScoreResult {
        aa: number;
        aaLarge: number;
        total: number;
        pairs: PairInfo[];
    }

    interface Props {
        trans: Translation | null;
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
        contextual_colors: ContextualColors;
    }

    let {
        trans,
        selected_palette,
        selected_accent,
        contextual_colors,
    }: Props = $props();

    const types: { key: ColorblindType | 'normal'; label: () => string | undefined; desc: () => string | undefined }[] = [
        { key: 'normal', label: () => trans?.colorblind.normal,      desc: () => trans?.colorblind.normal_desc },
        { key: 'protan', label: () => trans?.colorblind.protan,      desc: () => trans?.colorblind.protan_desc },
        { key: 'deutan', label: () => trans?.colorblind.deutan,      desc: () => trans?.colorblind.deutan_desc },
        { key: 'tritan', label: () => trans?.colorblind.tritan,      desc: () => trans?.colorblind.tritan_desc },
    ];

    function sim(hex: string, type: ColorblindType | 'normal'): string {
        return type === 'normal' ? hex : simulateColorblind(hex, type);
    }

    // Detect dark/light mode from background luminance
    const is_dark = $derived((getLuminance(selected_palette.bg) ?? 0) < 0.5);

    // Derived simulated colors per vision type
    const columns = $derived(types.map(t => ({
        key: t.key,
        label: t.label(),
        desc: t.desc(),
        surfaces: [
            { name: 'Background', color: sim(selected_palette.bg, t.key) },
            { name: 'Card',       color: sim(selected_palette.card, t.key) },
            { name: 'Highlight',  color: sim(selected_palette.highlight, t.key) },
        ],
        accents: [
            { name: 'Lighter', color: sim(selected_accent.accent_lighter, t.key) },
            { name: 'Light',   color: sim(selected_accent.accent_light, t.key) },
            { name: 'Dark',    color: sim(selected_accent.accent_dark, t.key) },
            { name: 'Darker',  color: sim(selected_accent.accent_darker, t.key) },
        ],
        display_accents: is_dark ? [
            { name: 'Light',   color: sim(selected_accent.accent_light, t.key) },
            { name: 'Lighter', color: sim(selected_accent.accent_lighter, t.key) },
        ] : [
            { name: 'Dark',    color: sim(selected_accent.accent_dark, t.key) },
            { name: 'Darker',  color: sim(selected_accent.accent_darker, t.key) },
        ],
        preview: {
            bg: sim(selected_palette.bg, t.key),
            card: sim(selected_palette.card, t.key),
            high: sim(selected_palette.highlight, t.key),
            fg: sim(selected_accent.accent_light, t.key),
            text_accent: sim(selected_accent.text_accent, t.key),
        },
        ctx_colors: (() => {
            const simSurface = sim(selected_palette[ctx_surface], t.key);
            const simText = sim(selected_palette.text, t.key);
            return [
                { label: trans?.contrast.ctx_error   ?? 'Error',   raw: sim(contextual_colors.error,   t.key) },
                { label: trans?.contrast.ctx_warning ?? 'Warning', raw: sim(contextual_colors.warning, t.key) },
                { label: trans?.contrast.ctx_success ?? 'Success', raw: sim(contextual_colors.success, t.key) },
                { label: trans?.contrast.ctx_info    ?? 'Info',    raw: sim(contextual_colors.info,    t.key) },
            ].map(c => ({
                label:   c.label,
                raw:     c.raw,
                blended: blendColor(c.raw, simSurface, ctx_opacity),
                text:    simText,
            }));
        })(),
    })));

    // Score: theme-aware pairs following the 4-shade rules
    // Dark: lighter(0) as text on bg/card/highlight, light(1) as aplat on card, text_accent on light(1)
    // Light: darker(3) as text on bg/card/highlight, dark(2) as aplat on card, text_accent on dark(2)
    function computeScore(col: typeof columns[number]): ScoreResult {
        let aa = 0;
        let aaLarge = 0;
        const pairs: PairInfo[] = [];

        const surfaceBgs = [
            { name: 'Background', color: col.preview.bg },
            { name: 'Card',       color: col.preview.card },
            { name: 'Highlight',  color: col.preview.high },
        ];

        // Text accent: lighter(0) for dark, darker(3) for light
        const textAccent = is_dark ? col.accents[0] : col.accents[3];
        // Aplat accent: light(1) for dark, dark(2) for light
        const aplatAccent = is_dark ? col.accents[1] : col.accents[2];

        // Text accent variant as text on surfaces
        for (const surf of surfaceBgs) {
            const ratio = parseFloat(getContrastRatio(textAccent.color, surf.color));
            const level = getWcagLevel(ratio.toFixed(2), 'normal').level;
            if (ratio >= 4.5) aa++;
            if (ratio >= 3.0) aaLarge++;
            pairs.push({ accent_name: textAccent.name, surface_name: surf.name, fg: textAccent.color, bg: surf.color, ratio, level });
        }

        // Aplat accent as surface on card
        {
            const cardSurf = surfaceBgs[1];
            const ratio = parseFloat(getContrastRatio(aplatAccent.color, cardSurf.color));
            const level = getWcagLevel(ratio.toFixed(2), 'normal').level;
            if (ratio >= 4.5) aa++;
            if (ratio >= 3.0) aaLarge++;
            pairs.push({ accent_name: aplatAccent.name, surface_name: cardSurf.name, fg: aplatAccent.color, bg: cardSurf.color, ratio, level });
        }

        // text_accent on aplat accent
        {
            const ratio = parseFloat(getContrastRatio(col.preview.text_accent, aplatAccent.color));
            const level = getWcagLevel(ratio.toFixed(2), 'normal').level;
            if (ratio >= 4.5) aa++;
            if (ratio >= 3.0) aaLarge++;
            pairs.push({ accent_name: aplatAccent.name, surface_name: 'Text Accent', fg: col.preview.text_accent, bg: aplatAccent.color, ratio, level });
        }

        // Contextual colors: text on blended badge
        for (const ctx of col.ctx_colors) {
            const ratio = parseFloat(getContrastRatio(ctx.text, ctx.blended));
            const level = getWcagLevel(ratio.toFixed(2), 'normal').level;
            if (ratio >= 4.5) aa++;
            if (ratio >= 3.0) aaLarge++;
            pairs.push({ accent_name: ctx.label, surface_name: 'Text', fg: ctx.text, bg: ctx.blended, ratio, level });
        }

        return { aa, aaLarge, total: pairs.length, pairs };
    }

    const scores = $derived(columns.map(col => computeScore(col)));
    const normalScore = $derived(scores[0]);

    // Per-column detail toggle
    let showChanges: boolean[] = $state([false, false, false, false]);

    // Pairs that changed WCAG category vs Normal
    const changedPairs = $derived(scores.map((score, i) => {
        if (i === 0) return [];
        const normalPairs = scores[0].pairs;
        return score.pairs
            .map((p, j) => ({ ...p, normalLevel: normalPairs[j].level, normalRatio: normalPairs[j].ratio }))
            .filter(p => p.level !== p.normalLevel);
    }));
</script>

<div class="demo-section">
    <div class="section-title">{trans?.colorblind.title}</div>
    <div class="colorblind-info">
        <div class="colorblind-grid">
            {#each columns as col, i}
                <div class="colorblind-column">
                    <div class="col-header">
                        <div class="col-title">{col.label}</div>
                        {#if col.desc}
                            <div class="col-desc">{col.desc}</div>
                        {/if}
                    </div>

                    <!-- Surfaces -->
                    <div class="col-section-label">{trans?.colorblind.surfaces}</div>
                    <div class="swatch-stack">
                        {#each col.surfaces as surface}
                            <div
                                class="cb-swatch"
                                style="background: {surface.color};"
                            >
                                <span class="cb-swatch-label">{surface.name}</span>
                                <span class="cb-swatch-hex">{surface.color}</span>
                            </div>
                        {/each}
                    </div>

                    <!-- Accents -->
                    <div class="col-section-label">{trans?.colorblind.accents}</div>
                    <div class="swatch-stack">
                        {#each col.display_accents as accent}
                            <div
                                class="cb-swatch"
                                style="background: {accent.color}; color: {col.preview.text_accent};"
                            >
                                <span class="cb-swatch-label">{accent.name}</span>
                                <span class="cb-swatch-hex">{accent.color}</span>
                            </div>
                        {/each}
                    </div>

                    <!-- Mini preview Aa -->
                    <div
                        class="cb-preview"
                        style="background: {col.preview.bg};"
                    >
                        {#each col.display_accents as accent}
                            <span style="color: {accent.color}">Aa</span>
                        {/each}
                    </div>
                    <div
                        class="cb-preview"
                        style="background: {col.preview.card}; color: {col.preview.fg}; border: 1px solid var(--highlight);"
                    >
                        {#each col.display_accents as accent}
                            <span style="color: {accent.color}">Aa</span>
                        {/each}
                    </div>
                    <div
                        class="cb-preview"
                        style="background: {col.preview.high}; color: {col.preview.fg};"
                    >
                        {#each col.display_accents as accent}
                            <span style="color: {accent.color}">Aa</span>
                        {/each}
                    </div>
                    <div
                        class="cb-preview"
                        style="background: {col.display_accents[0].color}; color: {col.preview.fg};"
                    >
                        <span style="color: {col.preview.text_accent}">Aa</span>
                    </div>

                    <!-- Contextual color previews -->
                    <div class="col-section-label" style="margin-top: 8px;">{trans?.contrast.cat_contextual ?? 'Contextual'}</div>
                    <div class="ctx-preview-row">
                        {#each col.ctx_colors as ctx}
                            <div
                                class="cb-preview cb-preview-ctx"
                                style="background: {ctx.blended};"
                                title="{ctx.label}"
                            >
                                <span style="color: {ctx.text}; font-size: 0.85rem;">Aa</span>
                            </div>
                        {/each}
                    </div>

                    <!-- Score summary -->
                    {#if scores[i]}
                        {@const score = scores[i]}
                        {@const deltaAa = score.aa - normalScore.aa}
                        {@const deltaLarge = score.aaLarge - normalScore.aaLarge}
                        {@const changes = changedPairs[i]}
                        {@const hasChanges = col.key !== 'normal' && changes.length > 0}
                        <button
                            class="cb-score"
                            class:cb-score-clickable={hasChanges}
                            onclick={() => { if (hasChanges) showChanges[i] = !showChanges[i]; }}
                        >
                            <div class="cb-score-row">
                                <span class="cb-score-value">{score.aa}/{score.total}</span>
                                <span class="cb-score-label">{trans?.colorblind.score_aa}</span>
                                {#if col.key !== 'normal'}
                                    <span class="cb-score-delta" class:delta-neg={deltaAa < 0} class:delta-pos={deltaAa > 0} class:delta-zero={deltaAa === 0}>
                                        {deltaAa > 0 ? '+' : ''}{deltaAa}
                                    </span>
                                {/if}
                            </div>
                            <div class="cb-score-row">
                                <span class="cb-score-value">{score.aaLarge}/{score.total}</span>
                                <span class="cb-score-label">{trans?.colorblind.score_aa_large}</span>
                                {#if col.key !== 'normal'}
                                    <span class="cb-score-delta" class:delta-neg={deltaLarge < 0} class:delta-pos={deltaLarge > 0} class:delta-zero={deltaLarge === 0}>
                                        {deltaLarge > 0 ? '+' : ''}{deltaLarge}
                                    </span>
                                {/if}
                            </div>
                            {#if hasChanges}
                                <div class="cb-score-hint">
                                    {changes.length} {trans?.colorblind.score_changes} {showChanges[i] ? '▲' : '▼'}
                                </div>
                            {:else if col.key !== 'normal'}
                                <div class="cb-score-hint cb-score-hint-muted">{trans?.colorblind.score_no_change}</div>
                            {/if}
                        </button>

                        <!-- Changed pairs detail -->
                        {#if showChanges[i] && hasChanges}
                            <div class="cb-changes">
                                {#each changes as pair}
                                    {@const degraded = ['Fail', 'AA Large', 'AA', 'AAA'].indexOf(pair.level) < ['Fail', 'AA Large', 'AA', 'AAA'].indexOf(pair.normalLevel)}
                                    <div class="cb-change-row">
                                        <div
                                            class="cb-change-swatch"
                                            style="background: {pair.bg}; color: {pair.fg}; {pair.bg === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''}"
                                        >Aa</div>
                                        <div class="cb-change-info">
                                            <div class="cb-change-pair">{pair.accent_name} {trans?.colorblind.score_on} {pair.surface_name}</div>
                                            <div class="cb-change-levels">
                                                <span class="cb-change-level-old">{pair.normalLevel}</span>
                                                <span class="cb-change-arrow" class:degraded class:improved={!degraded}>→</span>
                                                <span class="cb-change-level-new" class:degraded class:improved={!degraded}>{pair.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>
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

    .colorblind-info {
        background: var(--card);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }

    .colorblind-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .colorblind-column {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 8px;
    }

    .col-header {
        margin-bottom: 4px;
    }

    .col-title {
        font-size: 1rem;
        font-weight: 700;
        color: var(--text);
    }

    .col-desc {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-style: italic;
    }

    .col-section-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        margin-top: 4px;
    }

    .swatch-stack {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .cb-swatch {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 10px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-family: 'Courier New', monospace;
        color: var(--text);
    }

    .cb-swatch-label {
        font-weight: 600;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }

    .cb-swatch-hex {
        font-size: 0.72rem;
        opacity: 0.85;
    }

    .cb-preview {
        margin-top: 8px;
        height: 48px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .ctx-preview-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        margin-top: 4px;
    }

    .cb-preview-ctx {
        margin-top: 0;
        height: 36px;
        font-size: 1rem;
        border-radius: 5px;
    }

    .cb-score {
        height: 75px;
        margin-top: 10px;
        padding: 8px 10px;
        background: var(--highlight);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        border: none;
        width: 100%;
        text-align: left;
        font-family: inherit;
        cursor: default;
    }

    .cb-score-clickable {
        cursor: pointer;
    }

    .cb-score-clickable:hover {
        opacity: 0.85;
    }

    .cb-score-row {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
    }

    .cb-score-value {
        font-weight: 700;
        color: var(--text);
        min-width: 2.5em;
    }

    .cb-score-label {
        color: var(--text-muted);
        flex: 1;
    }

    .cb-score-delta {
        font-weight: 700;
        font-size: 0.75rem;
        padding: 1px 6px;
        border-radius: 10px;
    }

    .delta-neg {
        background: #ef44441a;
        color: #ef4444;
    }

    .delta-pos {
        background: #10b9811a;
        color: #10b981;
    }

    .delta-zero {
        background: #6b72801a;
        color: #6b7280;
    }

    .cb-score-hint {
        font-size: 0.7rem;
        color: var(--text-muted);
        margin-top: 2px;
    }

    .cb-score-hint-muted {
        font-style: italic;
        opacity: 0.7;
    }

    .cb-changes {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 6px;
    }

    .cb-change-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        background: var(--highlight);
        border-radius: 5px;
        font-size: 0.72rem;
    }

    .cb-change-swatch {
        width: 2rem;
        height: 1.4rem;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.65rem;
        flex-shrink: 0;
    }

    .cb-change-info {
        flex: 1;
        min-width: 0;
    }

    .cb-change-pair {
        color: var(--text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .cb-change-levels {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 1px;
    }

    .cb-change-level-old {
        color: var(--text-muted);
        text-decoration: line-through;
        font-size: 0.68rem;
    }

    .cb-change-arrow {
        font-size: 0.7rem;
    }

    .cb-change-arrow.degraded,
    .cb-change-level-new.degraded {
        color: #ef4444;
    }

    .cb-change-arrow.improved,
    .cb-change-level-new.improved {
        color: #10b981;
    }

    .cb-change-level-new {
        font-weight: 700;
        font-size: 0.7rem;
    }

    @media (max-width: 1024px) {
        .colorblind-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .colorblind-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
