<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type {
        AccentTheme,
        ToneTheme,
        ContextualColors,
        TextTheme
    } from "$lib/types/palettes";
    import {
        getContrastRatio,
        getWcagLevel,
        getLuminance,
        hexToOklch,
        oklchToHex,
    } from "$lib/utils/contrast";
    import { tokenValues, deriveSemanticTokens } from '../../design-system/token-schema';
    import Rules from './Rules.svelte';
    import type { ContrastRule, RuleGroup } from './Rules.svelte';
    const SEMANTIC_NAMES = ['accent', 'error', 'warning', 'success', 'info', 'neutral'] as const;

    interface ThemeContext {
        palette: ToneTheme;
        isDark: boolean;
        text: string;
    }

    interface SemanticSuggestion {
        name: string;
        label: string;
        current_hex: string;
        current_text_on: string;
        current_muted: string;
        suggested_hex: string;
        suggested_text_on: string;
        suggested_muted: string;
        delta_L: number;
        fail_count: number;
    }

    interface Props {
        trans: Translation | null;
        selected_tone_palette: ToneTheme;
        selected_accent: AccentTheme;
        selected_ctx: ContextualColors;
        selected_text: TextTheme;
        selected_tone: 'light' | 'dark';
        opposite_theme?: ToneTheme | null;
        opposite_tokens?: Record<string, string> | null;
    }

    let {
        trans,
        selected_tone_palette,
        selected_accent,
        selected_ctx,
        selected_text,
        selected_tone,
        opposite_theme = null,
        opposite_tokens = null,
    }: Props = $props();

    const is_dark = $derived((getLuminance(selected_tone_palette.bg) ?? 0) < 0.5);

    function getSemanticHex(name: string): string {
        if (name === 'accent') return selected_accent.accent;
        return selected_ctx[name as keyof ContextualColors] as string;
    }

    function makeSemanticConfig() {
        return {
            accent: selected_accent.accent,
            error: selected_ctx.error,
            warning: selected_ctx.warning,
            success: selected_ctx.success,
            info: selected_ctx.info,
            neutral: selected_ctx.neutral,
        };
    }

    function makeTokensFor(palette: ToneTheme, tone: 'light' | 'dark'): Record<string, string> {
        return tokenValues({
            tone: {
                bg: palette.bg,
                card: palette.card,
            },
            semantic: makeSemanticConfig(),
            mode: tone,
            typography: { body: 'sans-serif', heading: 'sans-serif' },
            text_palette: { light: selected_text.light, dark: selected_text.dark },
        });
    }

    const tokens = $derived(makeTokensFor(selected_tone_palette, selected_tone));

    function getSemanticLabel(name: string): string {
        const map: Record<string, string | undefined> = {
            accent: trans?.contrast.accent,
            error: trans?.contrast.ctx_error,
            warning: trans?.contrast.ctx_warning,
            success: trans?.contrast.ctx_success,
            info: trans?.contrast.ctx_info,
            neutral: trans?.contrast.ctx_neutral,
        };
        return map[name] ?? name;
    }

    function computeRuleGroups(palette: ToneTheme, tk: Record<string, string>): RuleGroup[] {
        const groups: RuleGroup[] = [];
        const t = trans?.contrast;

        // Surface rules
        groups.push({
            title: t?.cat_text ?? 'Surface',
            rules: [
                { 
                    label: t?.text ?? 'Text', 
                    sublabel: 'tone-bg', 
                    fg: tk['--text'], 
                    bg: palette.bg, 
                    target: 7, 
                    priority: 'satisfactory' 
                },
                { 
                    label: t?.text ?? 'Text', 
                    sublabel: 'tone', 
                    fg: tk['--text'], 
                    bg: palette.card, 
                    target: 4.5, 
                    priority: 'mandatory' 
                },
                { 
                    label: t?.text ?? 'Text', 
                    sublabel: 'tone-hover', 
                    fg: tk['--text'], 
                    bg: tk['--tone-hover'], 
                    target: 4.5, 
                    priority: 'mandatory' 
                },
                { 
                    label: t?.text_muted_label ?? 'Text Muted', 
                    sublabel: 'tone', 
                    fg: tk['--text-muted'], 
                    bg: palette.card, 
                    target: 4.5, 
                    priority: 'satisfactory' 
                },
                { 
                    label: 'Tone Muted', 
                    sublabel: 'tone', 
                    fg: tk['--tone-muted'], 
                    bg: palette.card, 
                    target: 4.5, 
                    priority: 'mandatory' 
                },
            ]
        });

        // Per semantic color
        for (const name of SEMANTIC_NAMES) {
            const base_hex = getSemanticHex(name);
            const text_on_color = tk[`--text-${name}`];
            const hover_hex = tk[`--${name}-hover`];
            const muted_hex = tk[`--${name}-muted`];
            const label = getSemanticLabel(name);

            const bg_hex = tk[`--${name}-bg`];

            groups.push({
                title: label,
                color: muted_hex,
                rules: [
                    {
                        label: `text-${name}`,
                        sublabel: name,
                        fg: text_on_color,
                        bg: base_hex,
                        target: 4.5,
                        priority: 'mandatory'
                    },
                    {
                        label: `text-${name}`,
                        sublabel: `${name}-hover`,
                        fg: text_on_color,
                        bg: hover_hex,
                        target: 4.5,
                        priority: 'mandatory'
                    },
                    { 
                        label: `${name}-muted`, 
                        sublabel: 'tone', 
                        fg: muted_hex, 
                        bg: palette.card, 
                        target: 4.5, 
                        priority: 'mandatory' 
                    },
                    { 
                        label: `${name}-muted`, 
                        sublabel: 'tone-bg', 
                        fg: muted_hex, 
                        bg: palette.bg, 
                        target: 4.5, 
                        priority: 'mandatory' 
                    },
                    {
                        label: t?.text ?? 'Text',
                        sublabel: `${name}-bg`,
                        fg: tk['--text'],
                        bg: bg_hex, target: 4.5,
                        priority: 'mandatory'
                    },
                    {
                        label: `${name}-muted`,
                        sublabel: `${name}-bg`,
                        fg: muted_hex,
                        bg: bg_hex,
                        target: 3,
                        priority: 'satisfactory'
                    },
                ]
            });
        }

        return groups;
    }

    const current_groups = $derived(computeRuleGroups(selected_tone_palette, tokens));

    // Opposite theme (received as props)
    const opposite_tone = $derived<'light' | 'dark'>(is_dark ? 'light' : 'dark');

    const opposite_groups = $derived.by(() => {
        if (!opposite_theme || !opposite_tokens) return [];
        return computeRuleGroups(opposite_theme, opposite_tokens);
    });

    const all_fails = $derived(
        [...current_groups, ...opposite_groups]
            .flatMap(g => g.rules)
            .filter(r => parseFloat(getContrastRatio(r.fg, r.bg)) < r.target)
            .length
    );

    // Suggestions: find adjusted hex that passes on BOTH themes simultaneously

    function checksPassingForTheme(
        name: string,
        candidate_hex: string,
        ctx: ThemeContext,
    ): boolean {
        const tp = { light: selected_text.light, dark: selected_text.dark };
        const tk = deriveSemanticTokens(name, candidate_hex, ctx.isDark, ctx.palette.card, ctx.palette.bg, tp);
        const text_on = tk[`--text-${name}`];
        const hover = tk[`--${name}-hover`];
        const muted = tk[`--${name}-muted`];
        const bg_token = tk[`--${name}-bg`];

        return (
            parseFloat(getContrastRatio(text_on, candidate_hex)) >= 4.5 &&
            parseFloat(getContrastRatio(text_on, hover)) >= 4.5 &&
            parseFloat(getContrastRatio(muted, ctx.palette.card)) >= 4.5 &&
            parseFloat(getContrastRatio(muted, ctx.palette.bg)) >= 4.5 &&
            parseFloat(getContrastRatio(ctx.text, bg_token)) >= 4.5 &&
            parseFloat(getContrastRatio(muted, bg_token)) >= 3
        );
    }

    function checksPassingForAll(name: string, candidate_hex: string, contexts: ThemeContext[]): boolean {
        return contexts.every(ctx => checksPassingForTheme(name, candidate_hex, ctx));
    }

    function countFailuresForAll(name: string, base_hex: string, contexts: ThemeContext[]): number {
        let fails = 0;
        for (const ctx of contexts) {
            const tp = { light: selected_text.light, dark: selected_text.dark };
            const tk = deriveSemanticTokens(name, base_hex, ctx.isDark, ctx.palette.card, ctx.palette.bg, tp);
            const text_on = tk[`--text-${name}`];
            const hover = tk[`--${name}-hover`];
            const muted = tk[`--${name}-muted`];
            const bg_token = tk[`--${name}-bg`];

            if (parseFloat(getContrastRatio(text_on, base_hex)) < 4.5) fails++;
            if (parseFloat(getContrastRatio(text_on, hover)) < 4.5) fails++;
            if (parseFloat(getContrastRatio(muted, ctx.palette.card)) < 4.5) fails++;
            if (parseFloat(getContrastRatio(muted, ctx.palette.bg)) < 4.5) fails++;
            if (parseFloat(getContrastRatio(ctx.text, bg_token)) < 4.5) fails++;
            if (parseFloat(getContrastRatio(muted, bg_token)) < 3) fails++;
        }
        return fails;
    }

    function suggestForSemantic(
        name: string,
        base_hex: string,
        contexts: ThemeContext[],
    ): { hex: string; delta_L: number } | null {
        const oklch = hexToOklch(base_hex);
        if (!oklch) return null;
        if (checksPassingForAll(name, base_hex, contexts)) return null;

        function tryDirection(lo: number, hi: number): { hex: string; l: number } | null {
            let bestL: number | null = null;
            for (let i = 0; i < 30; i++) {
                const mid = (lo + hi) / 2;
                const candidate = oklchToHex(mid, oklch!.c, oklch!.h);
                if (checksPassingForAll(name, candidate, contexts)) {
                    bestL = mid;
                    if (mid < oklch!.l) lo = mid; else hi = mid;
                } else {
                    if (mid < oklch!.l) hi = mid; else lo = mid;
                }
            }
            if (bestL === null) return null;
            return { hex: oklchToHex(bestL, oklch!.c, oklch!.h), l: bestL };
        }

        const results: { hex: string; delta_L: number }[] = [];
        const darker = tryDirection(0, oklch.l);
        if (darker) results.push({ hex: darker.hex, delta_L: Math.round((darker.l - oklch.l) * 100) });
        const lighter = tryDirection(oklch.l, 1);
        if (lighter) results.push({ hex: lighter.hex, delta_L: Math.round((lighter.l - oklch.l) * 100) });

        if (results.length === 0) return null;
        results.sort((a, b) => Math.abs(a.delta_L) - Math.abs(b.delta_L));
        return results[0];
    }

    // Build the list of theme contexts to validate against
    const suggestion_contexts = $derived.by((): ThemeContext[] => {
        const mainIsDark = selected_tone === 'dark';
        const mainText = mainIsDark ? selected_text.light : selected_text.dark;
        const contexts: ThemeContext[] = [
            { palette: selected_tone_palette, isDark: mainIsDark, text: mainText },
        ];
        if (opposite_theme) {
            const oppIsDark = opposite_tone === 'dark';
            const oppText = oppIsDark ? selected_text.light : selected_text.dark;
            contexts.push({ palette: opposite_theme, isDark: oppIsDark, text: oppText });
        }
        return contexts;
    });

    const suggestions = $derived.by((): SemanticSuggestion[] => {
        const tp = { light: selected_text.light, dark: selected_text.dark };
        const currentIsDark = selected_tone === 'dark';
        const results: SemanticSuggestion[] = [];

        for (const name of SEMANTIC_NAMES) {
            const base_hex = getSemanticHex(name);
            const fail_count = countFailuresForAll(name, base_hex, suggestion_contexts);
            if (fail_count === 0) continue;

            const suggestion = suggestForSemantic(name, base_hex, suggestion_contexts);
            if (!suggestion) continue;

            const currentTk = deriveSemanticTokens(name, base_hex, currentIsDark, selected_tone_palette.card, selected_tone_palette.bg, tp);
            const suggestedTk = deriveSemanticTokens(name, suggestion.hex, currentIsDark, selected_tone_palette.card, selected_tone_palette.bg, tp);

            results.push({
                name,
                label: getSemanticLabel(name),
                current_hex: base_hex,
                current_text_on: currentTk[`--text-${name}`],
                current_muted: currentTk[`--${name}-muted`],
                suggested_hex: suggestion.hex,
                suggested_text_on: suggestedTk[`--text-${name}`],
                suggested_muted: suggestedTk[`--${name}-muted`],
                delta_L: suggestion.delta_L,
                fail_count,
            });
        }
        return results;
    });

    // Export
    let copied_text = $state(false);
    let copied_json = $state(false);

    function generateTextExport(): string {
        const lines: string[] = [
            `=== Contrast Report ===`,
            `${trans?.contrast.export_theme}: ${selected_tone_palette.name} | ${trans?.contrast.export_accent}: ${selected_accent.name}`,
            ``,
        ];

        for (const group of current_groups) {
            lines.push(`── ${group.title} ──`);
            for (const rule of group.rules) {
                const ratio = getContrastRatio(rule.fg, rule.bg);
                const passes = parseFloat(ratio) >= rule.target;
                lines.push(`  ${rule.label} / ${rule.sublabel}: ${ratio} (${rule.target}:1) ${passes ? 'Pass' : 'FAIL'} [${rule.priority}]`);
            }
            lines.push('');
        }

        return lines.join('\n');
    }

    function generateJsonExport(): string {
        const obj: Record<string, unknown> = {
            theme: selected_tone_palette.name,
            accent: selected_accent.name,
            groups: current_groups.map(g => ({
                title: g.title,
                rules: g.rules.map(r => {
                    const ratio = getContrastRatio(r.fg, r.bg);
                    return {
                        label: `${r.label} / ${r.sublabel}`,
                        ratio,
                        target: r.target,
                        pass: parseFloat(ratio) >= r.target,
                        priority: r.priority,
                    };
                })
            }))
        };
        return JSON.stringify(obj, null, 2);
    }

    async function copyText() {
        await navigator.clipboard.writeText(generateTextExport());
        copied_text = true;
        setTimeout(() => copied_text = false, 2000);
    }

    async function copyJson() {
        await navigator.clipboard.writeText(generateJsonExport());
        copied_json = true;
        setTimeout(() => copied_json = false, 2000);
    }
</script>

<div class="demo-section">
    <div class="contrast-info">
        <p class="contrast-legend">
            <span style="color: var(--info-muted);">■</span> AAA ≥ 7:1 &nbsp;
            <span style="color: var(--success-muted);">■</span> AA ≥ 4.5:1 &nbsp;
            <span style="color: var(--warning-muted);">■</span> AA Large ≥ 3:1 &nbsp;
            <span style="color: var(--error-muted);">■</span> Fail &lt; 3:1 &nbsp;
            <span style="color: var(--info-muted);">■</span> {trans?.contrast.surface_badge}
        </p>

        <!-- Surface & Text Cards -->
        {#snippet surfaceCards(palette: ToneTheme, tk: Record<string, string>)}
            <div class="semantic-cards">
                <!-- Text readability card -->
                <div class="sem-card">
                    <div class="sem-card-header">
                        <span class="sem-card-title">{trans?.contrast.cat_text ?? 'Text'}</span>
                        <span class="sem-card-hex">{palette.name}</span>
                    </div>
                    <div class="sem-card-checks">
                        {#each [
                            { 
                                label: 'text', 
                                sublabel: 'tone-bg', 
                                fg: tk['--text'], 
                                bg: palette.bg 
                            },
                            { 
                                label: 'text', 
                                sublabel: 'tone', 
                                fg: tk['--text'], 
                                bg: palette.card 
                            },
                            { 
                                label: 'text', 
                                sublabel: 'tone-hover', 
                                fg: tk['--text'], 
                                bg: tk['--tone-hover'] 
                            },
                            { 
                                label: 'text-muted', 
                                sublabel: 'tone', 
                                fg: tk['--text-muted'], 
                                bg: palette.card 
                            },
                            { 
                                label: 'text-muted', 
                                sublabel: 'tone-bg', 
                                fg: tk['--text-muted'], 
                                bg: palette.bg 
                            },
                            { 
                                label: 'tone-muted', 
                                sublabel: 'tone', 
                                fg: tk['--tone-muted'], 
                                bg: palette.card 
                            },
                        ] as check}
                            {@const ratio = getContrastRatio(check.fg, check.bg)}
                            {@const wcag = getWcagLevel(ratio, 'normal')}
                            <div class="sem-check-row">
                                <div class="sem-check-swatch" style="background: {check.bg}; color: {check.fg};">Aa</div>
                                <span class="sem-check-label">{check.label} / {check.sublabel}</span>
                                <span class="sem-check-ratio">{ratio}</span>
                                <span class="wcag-badge wcag-badge-sm" style="background: {wcag.bg}; color: {wcag.colour};">{wcag.level}</span>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Surface separation card -->
                <div class="sem-card">
                    <div class="sem-card-header">
                        <span class="sem-card-title">{trans?.contrast.cat_surfaces ?? 'Surfaces'}</span>
                    </div>
                    <div class="sem-card-surfaces">
                        {#each [
                            { label: 'tone-bg', hex: palette.bg },
                            { label: 'tone', hex: palette.card },
                            { label: 'tone-hover', hex: tk['--tone-hover'] },
                        ] as s}
                            <div 
                                class="sem-surface-swatch" 
                                style="background: {s.hex}; color: {tk['--text']}"
                            >
                                <span class="sem-surface-label">{s.label}</span>
                                <span class="sem-surface-hex">{s.hex}</span>
                            </div>
                        {/each}
                    </div>
                    <div class="sem-card-checks">
                        {#each [
                            { 
                                label: 'tone', 
                                sublabel: 'tone-bg', 
                                c1: palette.card, 
                                c2: palette.bg 
                            },
                            { 
                                label: 'tone-hover', 
                                sublabel: 'tone-bg', 
                                c1: tk['--tone-hover'], 
                                c2: palette.bg 
                            },
                            { 
                                label: 'tone-hover', 
                                sublabel: 'tone', 
                                c1: tk['--tone-hover'], 
                                c2: palette.card 
                            },
                        ] as check}
                            {@const ratio = getContrastRatio(check.c1, check.c2)}
                            <div class="sem-check-row">
                                <div class="swatch-surface-outer" style="background: {check.c2};">
                                    <div class="swatch-surface-inner" style="background: {check.c1};"></div>
                                </div>
                                <span class="sem-check-label">{check.label} / {check.sublabel}</span>
                                <span class="sem-check-ratio">{ratio}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/snippet}

        <div class="contrast-category-title">
            {trans?.contrast.cat_surfaces ?? 'Surfaces'} & {trans?.contrast.cat_text ?? 'Text'}
        </div>
        <p class="contrast-note">{trans?.contrast.surface_note}</p>
        <div class="semantic-columns">
            {@render surfaceCards(selected_tone_palette, tokens)}
            {#if opposite_theme && opposite_tokens}
                {@render surfaceCards(opposite_theme, opposite_tokens)}
            {/if}
        </div>

        <!-- Semantic Color Preview -->
        <div class="contrast-category-title">{trans?.contrast.cat_semantic}</div>
        <p class="contrast-note">{trans?.contrast.semantic_note}</p>
        {#snippet semanticCards(palette: ToneTheme, tk: Record<string, string>)}
            <div class="semantic-cards">
                {#each SEMANTIC_NAMES as name}
                    {@const base_hex = getSemanticHex(name)}
                    {@const text_on_color = tk[`--text-${name}`]}
                    {@const muted_hex = tk[`--${name}-muted`]}
                    {@const hover_hex = tk[`--${name}-hover`]}
                    {@const bg_hex = tk[`--${name}-bg`]}
                    {@const checks = [
                        { 
                            label: `text-${name}`, 
                            sublabel: name, 
                            fg: text_on_color, 
                            bg: base_hex, 
                            target: 4.5 
                        },
                        { 
                            label: `text-${name}`, 
                            sublabel: `${name}-hover`, 
                            fg: text_on_color, 
                            bg: hover_hex, 
                            target: 4.5 
                        },
                        { 
                            label: `${name}-muted`, 
                            sublabel: 'tone', 
                            fg: muted_hex, 
                            bg: palette.card, 
                            target: 4.5 
                        },
                        { 
                            label: `${name}-muted`, 
                            sublabel: 'tone-bg', 
                            fg: muted_hex, 
                            bg: palette.bg, 
                            target: 4.5 
                        },
                        { 
                            label: 'Text', 
                            sublabel: `${name}-bg`, 
                            fg: tk['--text'], 
                            bg: bg_hex, 
                            target: 4.5 
                        },
                        { 
                            label: `${name}-muted`, 
                            sublabel: `${name}-bg`, 
                            fg: muted_hex, 
                            bg: bg_hex, 
                            target: 3 
                        },
                    ]}
                    <div class="sem-card">
                        <div class="sem-card-header" style="color: {muted_hex};">
                            <span
                                class="sem-card-title"
                                style="background:{palette.card};"
                            >
                                {getSemanticLabel(name)}
                            </span>
                            <span
                                class="sem-card-hex"
                                style="background:{palette.card};"
                            >
                                {base_hex}
                            </span>
                        </div>
                        <div class="sem-card-checks">
                            {#each checks as check}
                                {@const ratio = getContrastRatio(check.fg, check.bg)}
                                {@const wcag = getWcagLevel(ratio, 'normal')}
                                <div class="sem-check-row">
                                    <div
                                        class="sem-check-swatch"
                                        style="background: {check.bg}; color: {check.fg};"
                                    >
                                        Aa
                                    </div>
                                    <span class="sem-check-label">
                                        {check.label} / {check.sublabel}
                                    </span>
                                    <span class="sem-check-ratio">
                                        {ratio}
                                    </span>
                                    <span
                                        class="wcag-badge wcag-badge-sm"
                                        style="background: {wcag.bg}; color: {wcag.colour};"
                                    >
                                        {wcag.level}
                                    </span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/snippet}

        <div class="semantic-columns">
            {@render semanticCards(selected_tone_palette, tokens)}
            {#if opposite_theme && opposite_tokens}
                {@render semanticCards(opposite_theme, opposite_tokens)}
            {/if}
        </div>

        
        <!-- Rules -->
        <div class="contrast-category-title">{trans?.contrast.results_title}</div>

        <div class="rules-block">
            <Rules {trans} groups={current_groups} />
            {#if opposite_theme && opposite_groups.length > 0}
                <Rules {trans} groups={opposite_groups} />
            {/if}
        </div>

        <!-- Suggestions -->
        {#if suggestions.length > 0}
            <div class="contrast-category-title">{trans?.contrast.suggest_title}</div>
            <div class="suggest-grid">
                {#each suggestions as s}
                    {@const sign = s.delta_L >= 0 ? '+' : ''}
                    {@const currentOklch = hexToOklch(s.current_hex)}
                    {@const suggestedOklch = hexToOklch(s.suggested_hex)}
                    <div class="suggest-item">
                        <div class="suggest-header">
                            <span 
                                class="suggest-color-label" 
                                style="color: {s.current_muted};"
                            >
                                {s.label}
                            </span>
                            <span class="suggest-fail-count">
                                {s.fail_count} fail{s.fail_count > 1 ? 's' : ''}
                            </span>
                        </div>
                        <div class="suggest-before-after">
                            <div class="suggest-side">
                                <div 
                                    class="suggest-swatch" 
                                    style="background: {s.current_hex}; 
                                    color: {s.current_text_on};"
                                >
                                    Aa
                                </div>
                                <div 
                                    class="suggest-swatch suggest-swatch-muted" 
                                    style="background: var(--tone); color: {s.current_muted};"
                                >
                                    Aa
                                </div>
                            </div>
                            <div class="suggest-detail">
                                L {sign}{s.delta_L}%
                            </div>
                            <span class="suggest-arrow">→</span>
                            <div class="suggest-side">
                                <div
                                    class="suggest-swatch"
                                    style="background: {s.suggested_hex}; color: {s.suggested_text_on};"
                                >
                                    Aa
                                </div>
                                <div
                                    class="suggest-swatch suggest-swatch-muted"
                                    style="background: var(--tone); color: {s.suggested_muted};"
                                >
                                    Aa
                                </div>
                            </div>
                        </div>
                        <div class="suggest-codes">
                            <div class="suggest-codes-col">
                                <span class="suggest-hex">
                                    {s.current_hex}
                                </span>
                                {#if currentOklch}
                                    <span class="suggest-oklch">
                                        {(currentOklch.l * 100).toFixed(0)} {currentOklch.c.toFixed(3)} {currentOklch.h.toFixed(0)}
                                    </span>
                                {/if}
                            </div>
                            <div class="suggest-codes-col">
                                <span class="suggest-arrow">→</span>
                            </div>
                            <div class="suggest-codes-col">
                                <span class="suggest-hex">
                                    {s.suggested_hex}
                                </span>
                                {#if suggestedOklch}
                                    <span class="suggest-oklch">
                                        {(suggestedOklch.l * 100).toFixed(0)} {suggestedOklch.c.toFixed(3)} {suggestedOklch.h.toFixed(0)}
                                    </span>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .demo-section {
        margin-bottom: 40px;
    }

    .contrast-info {
        background: var(--tone);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }

    .contrast-legend {
        margin-top: 15px;
        font-size: 13px;
        color: var(--text-muted);
    }

    .contrast-category-title {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        margin: 1.5rem 0 0.5rem 0;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid var(--tone-hover);
    }

    .contrast-note {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 0.5rem;
    }

    /* Semantic columns (dual-theme) */
    .semantic-columns {
        display: flex;
        gap: 1.5rem;
        margin-top: 0.75rem;
    }

    .semantic-columns > .semantic-cards {
        flex: 0.5;
        min-width: 0;
    }

    /* Surface swatches (inside sem-card) */
    .sem-card-surfaces {
        display: flex;
        gap: 4px;
        margin-bottom: 0.5rem;
    }

    .sem-surface-swatch {
        flex: 1;
        border-radius: 4px;
        padding: 6px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid var(--tone-ghost-hover);
        min-height: 2.5rem;
    }

    .sem-surface-label {
        font-size: 0.55rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.7;
    }

    .sem-surface-hex {
        font-size: 0.55rem;
        font-family: monospace;
        font-weight: 700;
        opacity: 0.85;
    }

    .swatch-surface-outer {
        width: 1.8rem;
        height: 1.3rem;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .swatch-surface-inner {
        width: 1rem;
        height: 0.7rem;
        border-radius: 2px;
    }

    /* Semantic cards */
    .semantic-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 0.75rem;
        margin-top: 0.75rem;
    }

    .sem-card {
        background: var(--tone-hover);
        border-radius: 8px;
        padding: 0.75rem;
    }

    .sem-card-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .sem-card-title {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.4rem;
        border-radius: 6px;
    }

    .sem-card-hex {
        font-size: 0.65rem;
        font-family: monospace;
        opacity: 0.7;
        padding: 0.4rem;
        border-radius: 6px;
    }

    .sem-card-checks {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .sem-check-row {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .sem-check-swatch {
        width: 1.8rem;
        height: 1.3rem;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.6rem;
        flex-shrink: 0;
    }

    .sem-check-label {
        font-size: 0.65rem;
        color: var(--text-muted);
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .sem-check-ratio {
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--text);
        font-family: monospace;
        min-width: 2.5rem;
        text-align: right;
    }

    .wcag-badge-sm {
        font-size: 0.55rem;
        padding: 1px 4px;
        flex-shrink: 0;
    }

    /* Suggestions */
    .suggest-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 0.75rem;
        margin-top: 0.75rem;
    }

    .suggest-item {
        background: var(--tone-hover);
        border-radius: 6px;
        padding: 0.75rem;
        border-left: 3px solid var(--warning);
    }

    .suggest-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .suggest-color-label {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
    }

    .suggest-fail-count {
        font-size: 0.65rem;
        color: var(--error-muted);
        font-weight: 600;
    }

    .suggest-before-after {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .suggest-side {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .suggest-swatch {
        width: 2.2rem;
        height: 1.6rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.7rem;
    }

    .suggest-swatch-muted {
        font-size: 0.65rem;
    }

    .suggest-codes {
        display: flex;
        flex-direction: row;
        gap: 37px;
        margin-top: 0.5rem;
    }

    .suggest-codes-col {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .suggest-hex {
        font-size: 0.65rem;
        font-family: monospace;
        color: var(--text-muted);
    }

    .suggest-oklch {
        font-size: 0.55rem;
        font-family: monospace;
        color: var(--text-muted);
        opacity: 0.6;
    }

    .suggest-arrow {
        font-size: 1rem;
        color: var(--text-muted);
        flex-shrink: 0;
    }

    .suggest-detail {
        margin-top: 0.35rem;
        font-size: 0.7rem;
        color: var(--text-muted);
        font-style: italic;
        font-family: monospace;
    }

    .rules-block {
        display: flex;
        justify-content: flex-start;
        gap: 30px;
    }

    .contrast-export-row {
        display: flex;
        gap: 0.75rem;
        margin: 1.25rem 0 0.5rem 0;
    }

    .button {
        display: inline-block;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        font-size: 14px;
        transition: all 0.2s;
        text-decoration: none;
    }

    .button-secondary {
        background: transparent;
        color: var(--text);
        border: 2px solid var(--accent);
    }

    .button-secondary:hover {
        background: var(--accent);
        color: var(--text-accent);
    }

    @media (max-width: 768px) {
        .rules-block {
            flex-direction: column;
        }
    }
</style>
