<script lang="ts">
    import type { AccentTheme, ToneTheme, ContextualColors, TextTheme } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import { simulateColorblind, type ColorblindType } from "$lib/utils/colorblind";
    import { getContrastRatio, getWcagLevel, getLuminance } from "$lib/utils/contrast";

    import { deriveSemanticTokens, computeMuted, HOVER_DELTA } from '../../design-system/token-schema';
    import { hexToOklch, oklchToHex } from '$lib/utils/contrast';

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
        selected_tone_palette: ToneTheme;
        selected_accent: AccentTheme;
        selected_ctx: ContextualColors;
        selected_text: TextTheme;
        tone_hover: string;
        text_color: string;
    }

    let {
        trans,
        selected_tone_palette,
        selected_accent,
        selected_ctx,
        selected_text,
        tone_hover,
        text_color,
    }: Props = $props();

    const CTX_NAMES = ['error', 'warning', 'success', 'info'] as const;

    const types: { key: ColorblindType | 'normal'; label: () => string | undefined; desc: () => string | undefined }[] = [
        { key: 'normal', label: () => trans?.colorblind.normal, desc: () => trans?.colorblind.normal_desc },
        { key: 'protan', label: () => trans?.colorblind.protan, desc: () => trans?.colorblind.protan_desc },
        { key: 'deutan', label: () => trans?.colorblind.deutan, desc: () => trans?.colorblind.deutan_desc },
        { key: 'tritan', label: () => trans?.colorblind.tritan, desc: () => trans?.colorblind.tritan_desc },
    ];

    function sim(hex: string, type: ColorblindType | 'normal'): string {
        return type === 'normal' ? hex : simulateColorblind(hex, type);
    }

    // Detect dark/light mode from background luminance
    const is_dark = $derived((getLuminance(selected_tone_palette.bg) ?? 0) < 0.5);

    // Best text color on accent (white or black)
    const text_on_accent = $derived(
        parseFloat(getContrastRatio('#ffffff', selected_accent.accent)) >=
        parseFloat(getContrastRatio('#000000', selected_accent.accent))
            ? '#ffffff' : '#000000'
    );

    interface SemanticData {
        label: string;
        base: string;
        textOn: string;
        hover: string;
        muted: string;
        bg: string;
        text: string;
        card: string;
        toneBg: string;
    }

    interface ToneData {
        text: string;
        textMuted: string;
        toneMuted: string;
        card: string;
        toneBg: string;
        toneHover: string;
    }

    function shiftL(hex: string, delta: number): string {
        const oklch = hexToOklch(hex);
        if (!oklch) return hex;
        return oklchToHex(Math.max(0, Math.min(1, oklch.l + delta)), oklch.c, oklch.h);
    }

    // Derived simulated colors per vision type
    const columns = $derived(types.map(t => {
        const simCard = sim(selected_tone_palette.card, t.key);
        const simBg = sim(selected_tone_palette.bg, t.key);
        const simText = sim(text_color, t.key);
        const simTextPalette = { light: sim(selected_text.light, t.key), dark: sim(selected_text.dark, t.key) };
        const hoverDelta = is_dark ? HOVER_DELTA : -HOVER_DELTA;

        function buildSemantic(label: string, hex: string, name: string): SemanticData {
            const simHex = sim(hex, t.key);
            const tk = deriveSemanticTokens(name, simHex, is_dark, simCard, simBg, simTextPalette);
            return {
                label,
                base: simHex,
                textOn: tk[`--text-${name}`],
                hover: tk[`--${name}-hover`],
                muted: tk[`--${name}-muted`],
                bg: tk[`--${name}-bg`],
                text: simText,
                card: simCard,
                toneBg: simBg,
            };
        }

        const accentLabel = trans?.contrast.cat_accent ?? 'Accent';
        const accent = buildSemantic(accentLabel, selected_accent.accent, 'accent');

        const ctxLabels: Record<string, string> = {
            error: trans?.contrast.ctx_error ?? 'Error',
            warning: trans?.contrast.ctx_warning ?? 'Warning',
            success: trans?.contrast.ctx_success ?? 'Success',
            info: trans?.contrast.ctx_info ?? 'Info',
        };
        const ctx_colors = CTX_NAMES.map(name => buildSemantic(ctxLabels[name], selected_ctx[name], name));

        const tone: ToneData = {
            text: simText,
            textMuted: computeMuted(simText, simCard),
            toneMuted: computeMuted(simCard, simCard),
            card: simCard,
            toneBg: simBg,
            toneHover: shiftL(simCard, hoverDelta),
        };

        return {
            key: t.key,
            label: t.label(),
            desc: t.desc(),
            accent,
            ctx_colors,
            tone,
        };
    }));

    function semanticRulePairs(s: SemanticData): { surface: string; fg: string; bg: string; target: number }[] {
        return [
            { surface: 'base', fg: s.textOn, bg: s.base, target: 4.5 },
            { surface: 'hover', fg: s.textOn, bg: s.hover, target: 4.5 },
            { surface: 'card', fg: s.muted, bg: s.card, target: 4.5 },
            { surface: 'bg', fg: s.muted, bg: s.toneBg, target: 4.5 },
            { surface: 'Text/Accent-bg', fg: s.text, bg: s.bg, target: 4.5 },
            { surface: 'muted/Accent-bg', fg: s.muted, bg: s.bg, target: 3 },
        ];
    }

    function toneRulePairs(t: ToneData): { label: string; surface: string; fg: string; bg: string; target: number }[] {
        return [
            { label: 'Text', surface: 'tone-bg', fg: t.text, bg: t.toneBg, target: 4.5 },
            { label: 'Text', surface: 'tone', fg: t.text, bg: t.card, target: 4.5 },
            { label: 'Text', surface: 'tone-hover', fg: t.text, bg: t.toneHover, target: 4.5 },
            { label: 'Text Muted', surface: 'tone', fg: t.textMuted, bg: t.card, target: 4.5 },
            { label: 'Tone Muted', surface: 'tone', fg: t.toneMuted, bg: t.card, target: 4.5 },
        ];
    }

    function addPairs(
        pairs: PairInfo[],
        aa: { v: number },
        aaLarge: { v: number },
        label: string,
        rulePairs: { surface: string; fg: string; bg: string; target: number }[],
    ) {
        for (const rp of rulePairs) {
            const ratio = parseFloat(getContrastRatio(rp.fg, rp.bg));
            const level = getWcagLevel(ratio.toFixed(2), 'normal').level;
            if (ratio >= 4.5) aa.v++;
            if (ratio >= 3.0) aaLarge.v++;
            pairs.push({ accent_name: label, surface_name: rp.surface, fg: rp.fg, bg: rp.bg, ratio, level });
        }
    }

    function computeScore(col: typeof columns[number]): ScoreResult {
        const aa = { v: 0 };
        const aaLarge = { v: 0 };
        const pairs: PairInfo[] = [];

        // Tone rules (5)
        const tRules = toneRulePairs(col.tone);
        for (const rp of tRules) {
            const ratio = parseFloat(getContrastRatio(rp.fg, rp.bg));
            const level = getWcagLevel(ratio.toFixed(2), 'normal').level;
            if (ratio >= 4.5) aa.v++;
            if (ratio >= 3.0) aaLarge.v++;
            pairs.push({ accent_name: rp.label, surface_name: rp.surface, fg: rp.fg, bg: rp.bg, ratio, level });
        }

        // Accent rules (6)
        addPairs(pairs, aa, aaLarge, col.accent.label, semanticRulePairs(col.accent));

        // Contextual rules (6 × 4)
        for (const ctx of col.ctx_colors) {
            addPairs(pairs, aa, aaLarge, ctx.label, semanticRulePairs(ctx));
        }

        return { aa: aa.v, aaLarge: aaLarge.v, total: pairs.length, pairs };
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

                    <!-- Tone rules (5) -->
                    <div class="col-section-label">{trans?.colorblind.surfaces ?? 'Surface'}</div>
                    <div class="swatch-stack">
                        {#each toneRulePairs(col.tone) as rp}
                            <div
                                class="cb-swatch"
                                style="background: {rp.bg}; color: {rp.fg};"
                            >
                                <span class="cb-swatch-label">{rp.label} / {rp.surface}</span>
                                <span class="cb-swatch-hex">Aa</span>
                            </div>
                        {/each}
                    </div>

                    <!-- Accent rules (6) -->
                    <div class="col-section-label" style="margin-top: 8px;">{col.accent.label}</div>
                    <div class="swatch-stack">
                        {#each semanticRulePairs(col.accent) as rp}
                            <div
                                class="cb-swatch"
                                style="background: {rp.bg}; color: {rp.fg};"
                            >
                                <span class="cb-swatch-label">{rp.surface}</span>
                                <span class="cb-swatch-hex">Aa</span>
                            </div>
                        {/each}
                    </div>

                    <!-- Contextual rules (6 × 4) -->
                    <div class="col-section-label" style="margin-top: 8px;">{trans?.contrast.cat_contextual ?? 'Contextual'}</div>
                    {#each [
                        { get: (c: SemanticData) => ({ fg: c.textOn, bg: c.base }), title: 'text / base' },
                        { get: (c: SemanticData) => ({ fg: c.textOn, bg: c.hover }), title: 'text / hover' },
                        { get: (c: SemanticData) => ({ fg: c.muted, bg: c.card }), title: 'muted / card' },
                        { get: (c: SemanticData) => ({ fg: c.muted, bg: c.toneBg }), title: 'muted / bg' },
                        { get: (c: SemanticData) => ({ fg: c.text, bg: c.bg }), title: 'text / sem-bg' },
                        { get: (c: SemanticData) => ({ fg: c.muted, bg: c.bg }), title: 'muted / sem-bg' },
                    ] as row}
                        <div class="ctx-preview-row">
                            {#each col.ctx_colors as ctx}
                                {@const pair = row.get(ctx)}
                                <div
                                    class="cb-preview cb-preview-ctx"
                                    style="background: {pair.bg};"
                                    title="{ctx.label}: {row.title}"
                                >
                                    <span style="color: {pair.fg}; font-size: 0.85rem;">Aa</span>
                                </div>
                            {/each}
                        </div>
                    {/each}

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
                                            style="background: {pair.bg}; color: {pair.fg}; {pair.bg === tone_hover ? ' border: 1px solid var(--tone);' : ''}"
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

    .colorblind-info {
        background: var(--tone);
        padding: 20px;
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
        background: var(--tone-hover);
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
        background: var(--tone-hover);
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
