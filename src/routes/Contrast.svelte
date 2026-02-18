<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import { getContrastRatio, getWcagLevel, getLuminance, suggestAdjustedColor, hexToOklch, suggestCorrectedScale } from "$lib/utils/contrast";
    import type { AdjustmentSuggestion, RequiredPair, ScaleSuggestion } from "$lib/utils/contrast";
    import Rules from './Rules.svelte';

    interface Props {
        trans: Translation | null;
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
        light_palettes: ToneTheme[];
        dark_palettes: ToneTheme[];
    }

    let {
        trans,
        selected_palette,
        selected_accent,
        light_palettes,
        dark_palettes,
    }: Props = $props();

    // ── Contrast ratios computed from palette/accent hex values ──

    // Text on theme
    const contrast_txt_bg = $derived(getContrastRatio(selected_palette.text, selected_palette.bg));
    const contrast_txt_card = $derived(getContrastRatio(selected_palette.text, selected_palette.card));
    const contrast_txt_highlight = $derived(getContrastRatio(selected_palette.text, selected_palette.highlight));

    // Structures
    const contrast_card_bg = $derived(getContrastRatio(selected_palette.card, selected_palette.bg));
    const contrast_highlight_bg = $derived(getContrastRatio(selected_palette.highlight, selected_palette.bg));
    const contrast_highlight_card  = $derived(getContrastRatio(selected_palette.highlight, selected_palette.card));

    // Accent Lighter
    const contrast_accent_lighter = $derived(getContrastRatio(selected_accent.accent_lighter, selected_accent.text_accent));
    const contrast_accent_lighter_bg = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.bg));
    const contrast_accent_lighter_card = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.card));
    const contrast_accent_lighter_highlight = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.highlight));

    // Accent Light
    const contrast_accent_light = $derived(getContrastRatio(selected_accent.accent_light, selected_accent.text_accent));
    const contrast_accent_light_bg = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.bg));
    const contrast_accent_light_card = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.card));
    const contrast_accent_light_highlight = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.highlight));

    // Accent Dark
    const contrast_accent_dark = $derived(getContrastRatio(selected_accent.accent_dark, selected_accent.text_accent));
    const contrast_accent_dark_bg = $derived(getContrastRatio(selected_accent.accent_dark, selected_palette.bg));
    const contrast_accent_dark_card = $derived(getContrastRatio(selected_accent.accent_dark, selected_palette.card));
    const contrast_accent_dark_highlight = $derived(getContrastRatio(selected_accent.accent_dark, selected_palette.highlight));

    // Accent Darker
    const contrast_accent_darker = $derived(getContrastRatio(selected_accent.accent_darker, selected_accent.text_accent));
    const contrast_accent_darker_bg = $derived(getContrastRatio(selected_accent.accent_darker, selected_palette.bg));
    const contrast_accent_darker_card = $derived(getContrastRatio(selected_accent.accent_darker, selected_palette.card));
    const contrast_accent_darker_highlight = $derived(getContrastRatio(selected_accent.accent_darker, selected_palette.highlight));

    // ── Derived data structures ──

    const theme_name = $derived(selected_palette.name);
    const accent_name = $derived(selected_accent.name);
    let copied_text = $state(false);
    let copied_json = $state(false);

    // Detect dark/light mode from background luminance
    const is_dark = $derived((getLuminance(selected_palette.bg) ?? 0) < 0.5);

    const surfaces = $derived([
        { 
            key: 'bg' as const, 
            ratio_key: 'bg' as const, 
            label: trans?.contrast.background,  
            color: selected_palette.bg,          
            swatch_fg: selected_palette.text,        
            invert: false 
        },
        { 
            key: 'card' as const, 
            ratio_key: 'card' as const, 
            label: trans?.contrast.card,        
            color: selected_palette.card,        
            swatch_fg: selected_palette.text,        
            invert: false 
        },
        { 
            key: 'highlight' as const, 
            ratio_key: 'highlight' as const, 
            label: trans?.contrast.highlight,   
            color: selected_palette.highlight, 
            swatch_fg: selected_palette.text, 
            invert: false 
        },
        { 
            key: 'text' as const, 
            ratio_key: 'text' as const, 
            label: trans?.contrast.accent,      
            color: selected_accent.text_accent,  
            swatch_fg: selected_accent.text_accent,  
            invert: true  
        },
    ]);

    const accent_variants = $derived([
        {
            name: trans?.contrast.accent_lighter,
            color: selected_accent.accent_lighter,
            ratios: {
                bg: contrast_accent_lighter_bg,
                card: contrast_accent_lighter_card,
                highlight: contrast_accent_lighter_highlight,
                text: contrast_accent_lighter,
            }
        },
        {
            name: trans?.contrast.accent_light,
            color: selected_accent.accent_light,
            ratios: {
                bg: contrast_accent_light_bg,
                card: contrast_accent_light_card,
                highlight: contrast_accent_light_highlight,
                text: contrast_accent_light,
            }
        },
        {
            name: trans?.contrast.accent_dark,
            color: selected_accent.accent_dark,
            ratios: {
                bg: contrast_accent_dark_bg,
                card: contrast_accent_dark_card,
                highlight: contrast_accent_dark_highlight,
                text: contrast_accent_dark,
            }
        },
        {
            name: trans?.contrast.accent_darker,
            color: selected_accent.accent_darker,
            ratios: {
                bg: contrast_accent_darker_bg,
                card: contrast_accent_darker_card,
                highlight: contrast_accent_darker_highlight,
                text: contrast_accent_darker,
            }
        },
    ]);

    // ── Surface maps ──

    const surfaceBgMap = $derived<Record<string, string>>({
        bg: selected_palette.bg,
        card: selected_palette.card,
        highlight: selected_palette.highlight,
        text: selected_accent.text_accent,
    });

    const surfaceLabelMap = $derived<Record<string, { label: string | undefined; color: string }>>({
        bg: { label: trans?.contrast.background, color: selected_palette.bg },
        card: { label: trans?.contrast.card, color: selected_palette.card },
        highlight: { label: trans?.contrast.highlight, color: selected_palette.highlight },
        text: { label: trans?.contrast.text_accent, color: selected_accent.text_accent },
    });

    // ── Business rules: which variant/surface pairs must pass AA ──

    const required_pairs = $derived.by(() => {
        const pairs: (RequiredPair & { priority: string })[] = [];

        if (is_dark) {
            // text_accent on light aplat (idx=1) → 4.5:1
            pairs.push({ variant_idx: 1, surface_key: 'text', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            // lighter (idx=0) as TEXT on dark surfaces
            pairs.push({ variant_idx: 0, surface_key: 'bg', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 0, surface_key: 'card', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 0, surface_key: 'highlight', targetRatio: 3.0, priority: 'satisfactory', isAplat: false });
            // light (idx=1) as APLAT on card → 3:1
            pairs.push({ variant_idx: 1, surface_key: 'card', targetRatio: 3.0, priority: 'satisfactory', isAplat: true });
        } else {
            // text_accent on dark aplat (idx=2) → 4.5:1
            pairs.push({ variant_idx: 2, surface_key: 'text', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            // darker (idx=3) as TEXT on light surfaces
            pairs.push({ variant_idx: 3, surface_key: 'bg', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 3, surface_key: 'card', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 3, surface_key: 'highlight', targetRatio: 3.0, priority: 'satisfactory', isAplat: false });
            // dark (idx=2) as APLAT on card → 3:1
            pairs.push({ variant_idx: 2, surface_key: 'card', targetRatio: 3.0, priority: 'satisfactory', isAplat: true });
        }

        return pairs;
    });

    const adjustment_suggestions = $derived.by(() => {
        const results: {
            variant_name: string | undefined;
            variant_color: string;
            variant_idx: number;
            surface_label: string | undefined;
            surface_color: string;
            surface_key: string;
            invert: boolean;
            ratio: string;
            wcag: ReturnType<typeof getWcagLevel>;
            priority: string;
            suggestion: AdjustmentSuggestion | null;
        }[] = [];

        for (const pair of required_pairs) {
            const variant = accent_variants[pair.variant_idx];
            const surface = surfaces.find(s => s.key === pair.surface_key);
            if (!variant || !surface) continue;

            const ratio = variant.ratios[surface.ratio_key];
            const pairTarget = pair.targetRatio ?? 4.5;
            if (parseFloat(ratio) >= pairTarget) continue;

            const suggestion = suggestAdjustedColor(variant.color, surfaceBgMap[surface.key], pairTarget);
            if (!suggestion) continue;

            results.push({
                variant_name: variant.name,
                variant_color: variant.color,
                variant_idx: pair.variant_idx,
                surface_label: surface.label,
                surface_color: surface.color,
                surface_key: surface.key,
                invert: surface.invert,
                ratio,
                wcag: getWcagLevel(ratio, 'normal'),
                priority: pair.priority,
                suggestion,
            });
        }

        // Sort by variant index
        results.sort((a, b) => is_dark ? a.variant_idx - b.variant_idx : a.variant_idx - b.variant_idx);
        return results;
    });

    // ── Suggested progressive scale ──

    const scale_suggestion = $derived.by((): ScaleSuggestion | null => {
        const accentOklch = hexToOklch(selected_accent.accent_light);
        if (!accentOklch) return null;

        const existingHexes = [
            selected_accent.accent_lighter,
            selected_accent.accent_light,
            selected_accent.accent_dark,
            selected_accent.accent_darker,
        ];

        const rules: RequiredPair[] = required_pairs.map(p => ({
            variant_idx: p.variant_idx,
            surface_key: p.surface_key,
            targetRatio: p.targetRatio,
        }));

        return suggestCorrectedScale(
            existingHexes,
            accentOklch.c, accentOklch.h,
            surfaceBgMap,
            rules,
        );
    });

    // ── Opposite theme recommendations ──

    const opposite_palettes = $derived(is_dark ? light_palettes : dark_palettes);
    let opposite_index = $state(-1); // -1 = none selected

    const opposite_theme = $derived(opposite_index >= 0 ? opposite_palettes[opposite_index] : null);

    const opposite_rules = $derived.by(() => {
        if (!opposite_theme) return [];
        const pairs: (RequiredPair & { priority: string; isAplat: boolean })[] = [];

        if (is_dark) {
            // Current is dark → opposite is light
            // text_accent on dark aplat (idx=2) → 4.5:1
            pairs.push({ variant_idx: 2, surface_key: 'text', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            // darker (idx=3) as TEXT on light surfaces
            pairs.push({ variant_idx: 3, surface_key: 'bg', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 3, surface_key: 'card', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 3, surface_key: 'highlight', targetRatio: 3.0, priority: 'satisfactory', isAplat: false });
            // dark (idx=2) as APLAT on card → 3:1
            pairs.push({ variant_idx: 2, surface_key: 'card', targetRatio: 3.0, priority: 'satisfactory', isAplat: true });
        } else {
            // Current is light → opposite is dark
            // text_accent on light aplat (idx=1) → 4.5:1
            pairs.push({ variant_idx: 1, surface_key: 'text', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            // lighter (idx=0) as TEXT on dark surfaces
            pairs.push({ variant_idx: 0, surface_key: 'bg', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 0, surface_key: 'card', targetRatio: 4.5, priority: 'mandatory', isAplat: false });
            pairs.push({ variant_idx: 0, surface_key: 'highlight', targetRatio: 3.0, priority: 'satisfactory', isAplat: false });
            // light (idx=1) as APLAT on card → 3:1
            pairs.push({ variant_idx: 1, surface_key: 'card', targetRatio: 3.0, priority: 'satisfactory', isAplat: true });
        }

        return pairs;
    });

    const opposite_surface_map = $derived.by(() => {
        if (!opposite_theme) return {};
        return {
            bg: { label: trans?.contrast.background, color: opposite_theme.bg },
            card: { label: trans?.contrast.card, color: opposite_theme.card },
            highlight: { label: trans?.contrast.highlight, color: opposite_theme.highlight },
            text: { label: trans?.contrast.text_accent, color: selected_accent.text_accent },
        } as Record<string, { label: string | undefined; color: string }>;
    });

    // ── Export functions ──

    function generateTextExport(): string {
        const lines: string[] = [
            `=== Contrast Report ===`,
            `${trans?.contrast.export_theme}: ${theme_name} | ${trans?.contrast.export_accent}: ${accent_name}`,
            ``,
            `── ${trans?.contrast.cat_text} ──`,
            `${trans?.contrast.text} / ${trans?.contrast.background}  : ${contrast_txt_bg}  ${getWcagLevel(contrast_txt_bg, 'normal').level}`,
            `${trans?.contrast.text} / ${trans?.contrast.card}         : ${contrast_txt_card}  ${getWcagLevel(contrast_txt_card, 'normal').level}`,
            `${trans?.contrast.text} / ${trans?.contrast.highlight}    : ${contrast_txt_bg}  ${getWcagLevel(contrast_txt_bg, 'normal').level}`,
            ``,
            `── ${trans?.contrast.cat_surfaces} ──`,
            `${trans?.contrast.card} / ${trans?.contrast.background}       : ${contrast_card_bg}`,
            `${trans?.contrast.highlight} / ${trans?.contrast.background}  : ${contrast_highlight_bg}`,
            `${trans?.contrast.highlight} / ${trans?.contrast.card}        : ${contrast_highlight_card}`,
            ``,
            `── ${trans?.contrast.cat_accent} ──`,
        ];

        for (const v of accent_variants) {
            lines.push(`${v.name}`);
            lines.push(`  / ${trans?.contrast.text_accent}  : ${v.ratios.text}  ${getWcagLevel(v.ratios.text, 'normal').level}`);
            lines.push(`  / ${trans?.contrast.background}   : ${v.ratios.bg}  ${getWcagLevel(v.ratios.bg, 'normal').level}`);
            lines.push(`  / ${trans?.contrast.card}         : ${v.ratios.card}  ${getWcagLevel(v.ratios.card, 'normal').level}`);
            lines.push(`  / ${trans?.contrast.highlight}    : ${v.ratios.highlight}  ${getWcagLevel(v.ratios.highlight, 'normal').level}`);
        }

        // Required rules
        lines.push(``);
        lines.push(`── ${trans?.contrast.reco_title} ──`);

        for (const pair of required_pairs) {
            const variant = accent_variants[pair.variant_idx];
            const surface = surfaces.find(s => s.key === pair.surface_key);
            if (!variant || !surface) continue;
            const ratio = variant.ratios[surface.ratio_key];
            const target = pair.targetRatio ?? 4.5;
            const passes = parseFloat(ratio) >= target;
            lines.push(`${variant.name} / ${surface.label} : ${ratio} (${target}:1) ${passes ? 'Pass' : 'FAIL'} [${pair.priority}]`);
        }

        // Suggestions d'ajustement (filtered by business rules)
        lines.push(``);
        lines.push(`── ${trans?.contrast.suggest_title} ──`);

        if (adjustment_suggestions.length === 0) {
            lines.push(trans?.contrast.suggest_all_pass ?? '');
        } else {
            for (const entry of adjustment_suggestions) {
                const sign = (entry.suggestion?.deltaL ?? 0) >= 0 ? '+' : '';
                const priority = entry.priority === 'mandatory'
                    ? trans?.contrast.suggest_mandatory
                    : trans?.contrast.suggest_satisfactory;
                lines.push(`[${priority}] ${entry.variant_name} / ${entry.surface_label} : ${entry.ratio} ${entry.wcag.level} → ${entry.suggestion?.hex} (L ${sign}${entry.suggestion?.deltaL}%) → ${entry.suggestion?.ratio}:1 AA`);
            }
        }

        // Suggested scale
        lines.push(``);
        lines.push(`── ${trans?.contrast.suggest_scale_title} ──`);
        if (scale_suggestion) {
            for (const shade of scale_suggestion.shades) {
                const status = shade.ok ? (shade.adjusted ? 'ADJUSTED' : 'OK') : 'FAIL';
                lines.push(`  ${shade.name}: ${shade.hex} (L ${Math.round(shade.l * 100)}%) [${status}]`);
            }
        } else {
            lines.push(trans?.contrast.suggest_scale_none ?? '');
        }

        return lines.join('\n');
    }

    function generateJsonExport(): string {
        // Build a set of required pairs for quick lookup
        const requiredSet = new Set(
            required_pairs.map(p => `${p.variant_idx}:${p.surface_key}`)
        );

        function entryWithSuggestion(
            ratio: string,
            fgHex: string,
            bgKey: string,
            variantIdx: number
        ): { ratio: string; wcag: string; required: boolean; priority?: string; suggestion?: { adjusted_color: string; adjusted_ratio: string; delta_lightness_percent: number } } {
            const wcag = getWcagLevel(ratio, 'normal').level;
            const isRequired = requiredSet.has(`${variantIdx}:${bgKey}`);
            const pair = required_pairs.find(p => p.variant_idx === variantIdx && p.surface_key === bgKey);
            const entry: { ratio: string; wcag: string; required: boolean; priority?: string; suggestion?: { adjusted_color: string; adjusted_ratio: string; delta_lightness_percent: number } } = {
                ratio, wcag, required: isRequired
            };
            if (isRequired && pair) {
                entry.priority = pair.priority;
            }
            const pairTarget = pair?.targetRatio ?? 4.5;
            if (isRequired && parseFloat(ratio) < pairTarget) {
                const suggestion = suggestAdjustedColor(fgHex, surfaceBgMap[bgKey], pairTarget);
                if (suggestion) {
                    entry.suggestion = {
                        adjusted_color: suggestion.hex,
                        adjusted_ratio: suggestion.ratio,
                        delta_lightness_percent: suggestion.deltaL,
                    };
                }
            }
            return entry;
        }

        const jsonObj: Record<string, unknown> = {
            theme: theme_name,
            accent: accent_name,
            text_readability: {
                text_bg: {
                    ratio: contrast_txt_bg,
                    wcag: getWcagLevel(contrast_txt_bg, 'normal').level
                },
                text_card: {
                    ratio: contrast_txt_card,
                    wcag: getWcagLevel(contrast_txt_card, 'normal').level
                },
            },
            surfaces: {
                card_bg: { ratio: contrast_card_bg },
                highlight_bg: { ratio: contrast_highlight_bg },
                highlight_card: { ratio: contrast_highlight_card },
            },
            accent_variants: Object.fromEntries(
                accent_variants.map((v, idx) => [v.name, {
                    color: v.color,
                    text_accent: entryWithSuggestion(v.ratios.text, v.color, 'text', idx),
                    on_bg: entryWithSuggestion(v.ratios.bg, v.color, 'bg', idx),
                    on_card: entryWithSuggestion(v.ratios.card, v.color, 'card', idx),
                    on_highlight: entryWithSuggestion(v.ratios.highlight, v.color, 'highlight', idx),
                }])
            ),
        };

        if (scale_suggestion) {
            jsonObj.suggested_scale = {
                color_space: 'oklch',
                score: scale_suggestion.score,
                shades: scale_suggestion.shades.map(sh => ({
                    name: sh.name,
                    hex: sh.hex,
                    lightness_percent: Math.round(sh.l * 100),
                    meets_requirements: sh.ok,
                    adjusted: sh.adjusted,
                })),
            };
        }

        return JSON.stringify(jsonObj, null, 2);
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

<!-- Contrast Info -->
<div class="demo-section">
    <div class="section-title">{trans?.contrast.title}</div>
    <div class="contrast-info">
        <p class="contrast-legend">
            <span style="color: #10b981;">■</span> AAA ≥ 7:1 &nbsp;
            <span style="color: #3d8a45;">■</span> AA ≥ 4.5:1 &nbsp;
            <span style="color: #f59e0b;">■</span> AA Large ≥ 3:1 &nbsp;
            <span style="color: #ef4444;">■</span> Fail &lt; 3:1 &nbsp;
            <span style="color: #6b7280;">■</span> {trans?.contrast.surface_badge}
        </p>

        <!-- ── Category 1 : Main text readability ── -->
        <div class="contrast-category-title">{trans?.contrast.cat_text}</div>
        <div class="contrast-grid">
            {#each [
                { 
                    label: `${trans?.contrast.text} / ${trans?.contrast.background}`, 
                    ratio: contrast_txt_bg,       
                    fg: selected_palette.text, 
                    bg: selected_palette.bg,        
                    size: 'normal' 
                },
                { 
                    label: `${trans?.contrast.text} / ${trans?.contrast.card}`,       
                    ratio: contrast_txt_card,     
                    fg: selected_palette.text, bg: selected_palette.card,      
                    size: 'normal' 
                },
                { 
                    label: `${trans?.contrast.text} / ${trans?.contrast.highlight}`,  
                    ratio: contrast_txt_highlight,       
                    fg: selected_palette.text, 
                    bg: selected_palette.highlight, 
                    size: 'normal' 
                },
                {
                    label: `${trans?.contrast.text_accent} / ${trans?.contrast.accent_light}`,
                    ratio: contrast_accent_light,
                    fg: selected_accent.text_accent,
                    bg: selected_accent.accent_light,
                    size: 'normal'
                },
                {
                    label: `${trans?.contrast.text_accent} / ${trans?.contrast.accent_dark}`,
                    ratio: contrast_accent_dark,
                    fg: selected_accent.text_accent,
                    bg: selected_accent.accent_dark,
                    size: 'normal'
                },
            ] as item}
                {@const wcag = getWcagLevel(item.ratio, item.size as 'normal' | 'large')}
                <div class="contrast-item">
                    <div 
                        class="contrast-swatch-text" 
                        style="background: {item.bg}; color: {item.fg};{
                            item.bg === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                        }"
                    >Aa</div>
                    <div class="contrast-label">{item.label}</div>
                    <div class="contrast-row">
                        <span class="contrast-value2">{item.ratio}</span>
                        <span class="wcag-badge" style="background: {wcag.colour}; color: #ffffff;">{wcag.level}</span>
                    </div>
                </div>
            {/each}
        </div>

        <!-- ── Category 2 : Surface separation ── -->
        <div class="contrast-category-title">{trans?.contrast.cat_surfaces}</div>
        <p class="contrast-note">{trans?.contrast.surface_note}</p>
        <div class="contrast-grid">
            {#each [
                { 
                    label: `${trans?.contrast.card} / ${trans?.contrast.background}`,      
                    ratio: contrast_card_bg,        
                    c1: selected_palette.card,      
                    c2: selected_palette.bg   
                },
                { 
                    label: `${trans?.contrast.highlight} / ${trans?.contrast.background}`, 
                    ratio: contrast_highlight_bg,   
                    c1: selected_palette.highlight, 
                    c2: selected_palette.bg   
                },
                { 
                    label: `${trans?.contrast.highlight} / ${trans?.contrast.card}`,       
                    ratio: contrast_highlight_card, 
                    c1: selected_palette.highlight, 
                    c2: selected_palette.card 
                },
            ] as item}
                <div class="contrast-item">
                    <div class="contrast-swatch-surface">
                        <div class="swatch-surface-outer" style="background: {item.c2};{item.c2}">
                            <div class="swatch-surface-inner" style="background: {item.c1};{item.c1}"></div>
                        </div>
                    </div>
                    <div class="contrast-label">{item.label}</div>
                    <div class="contrast-row">
                        <span class="contrast-value2">{item.ratio}</span>
                        <span class="wcag-badge" style="background: #6b7280; color: #ffffff;">{trans?.contrast.surface_badge}</span>
                    </div>
                </div>
            {/each}
        </div>

        <div class="contrast-grid">
            {#each (is_dark ? [
                {
                    label: `${trans?.contrast.accent_light} / ${trans?.contrast.background}`,
                    ratio: contrast_accent_light_bg,
                    c1: selected_accent.accent_light,
                    c2: selected_palette.bg
                },
                {
                    label: `${trans?.contrast.accent_light} / ${trans?.contrast.card}`,
                    ratio: contrast_accent_light_card,
                    c1: selected_accent.accent_light,
                    c2: selected_palette.card
                },
            ] : [
                {
                    label: `${trans?.contrast.accent_dark} / ${trans?.contrast.background}`,
                    ratio: contrast_accent_dark_bg,
                    c1: selected_accent.accent_dark,
                    c2: selected_palette.bg
                },
                {
                    label: `${trans?.contrast.accent_dark} / ${trans?.contrast.card}`,
                    ratio: contrast_accent_dark_card,
                    c1: selected_accent.accent_dark,
                    c2: selected_palette.card
                },
            ]) as item}
                <div class="contrast-item">
                    <div class="contrast-swatch-surface">
                        <div 
                            class="swatch-surface-outer" 
                            style="background: 
                                {item.c2};{item.c2}; 
                                {item.c2 === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''}
                            "
                        >
                            <div 
                                class="swatch-surface-inner" 
                                style="background: {item.c1};{item.c1}"
                            ></div>
                        </div>
                    </div>
                    <div class="contrast-label">{item.label}</div>
                    <div class="contrast-row">
                        <span class="contrast-value2">{item.ratio}</span>
                        <span class="wcag-badge" style="background: #6b7280; color: #ffffff;">{trans?.contrast.surface_badge}</span>
                    </div>
                </div>
            {/each}
        </div>

        <!-- ── Rules : required pairs with pass/fail ── -->
        <div class="contrast-category-title">{trans?.contrast.reco_title}</div>
        <div class="rules-block">
            <div class="rules-col">
                <p class="contrast-note">{trans?.contrast.opposite_desc}</p>
            </div>
            <div class="rules-col">
                <p class="contrast-note">{trans?.contrast.opposite_desc}</p>
                <div class="opposite-selector">
                    <label class="opposite-selector-label" for="opposite-select">{trans?.contrast.opposite_select_label}</label>
                    <select id="opposite-select" class="opposite-select" bind:value={opposite_index}>
                        <option value={-1}>{trans?.contrast.opposite_none}</option>
                        {#each opposite_palettes as palette, i}
                            <option value={i}>{palette.name}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>

        <div class="rules-block">
            <Rules
                {trans}
                {required_pairs}
                accent_variants={accent_variants.map(v => ({ name: v.name, color: v.color }))}
                surface_map={surfaceLabelMap}
                text_accent={selected_accent.text_accent}
                highlight_color={selected_palette.highlight}
            />

            {#if opposite_theme}
                <Rules
                    {trans}
                    required_pairs={opposite_rules}
                    accent_variants={accent_variants.map(v => ({ name: v.name, color: v.color }))}
                    surface_map={opposite_surface_map}
                    text_accent={selected_accent.text_accent}
                    highlight_color={opposite_theme.highlight}
                />
            {/if}
        </div>

        <!-- ── Adjustment suggestions ── -->
        <div class="rules-block">

            <!-- Current theme suggestion-->
            <div class="rules-col">
                {#if adjustment_suggestions.length !== 0}
                    <div class="reco-subtitle">{trans?.contrast.suggest_title}</div>
                {/if}

                {#if adjustment_suggestions.length !== 0}
                    <div class="suggest-grid">
                        {#each adjustment_suggestions as entry}
                            {@const sign = (entry.suggestion?.deltaL ?? 0) >= 0 ? '+' : ''}
                            {@const swatch_bg_before = entry.invert ? entry.variant_color : entry.surface_color}
                            {@const swatch_fg_before = entry.invert ? selected_accent.text_accent : entry.variant_color}
                            {@const swatch_bg_after = entry.invert ? (entry.suggestion?.hex ?? entry.variant_color) : entry.surface_color}
                            {@const swatch_fg_after = entry.invert ? selected_accent.text_accent : (entry.suggestion?.hex ?? entry.variant_color)}
                            {@const priority_label = entry.priority === 'mandatory' ? trans?.contrast.suggest_mandatory : trans?.contrast.suggest_satisfactory}
                            {@const priority_color = entry.priority === 'mandatory' ? '#ef4444' : '#f59e0b'}
                            <div class="suggest-item" style="border-left-color: {priority_color};">
                                <div class="suggest-pair-header">
                                    <span class="suggest-pair-label">{entry.variant_name} / {entry.surface_label}</span>
                                    <span class="suggest-priority-badge" style="background: {priority_color}; color: #ffffff;">{priority_label}</span>
                                </div>
                                <div class="suggest-before-after">
                                    <div class="suggest-side">
                                        <div
                                            class="contrast-swatch-text reco-scale-swatch"
                                            style="background: {swatch_bg_before}; color: {swatch_fg_before};{
                                                swatch_bg_before === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                                            }"
                                        >Aa</div>
                                        <span class="suggest-ratio">{entry.ratio}</span>
                                        <span class="wcag-badge" style="background: {entry.wcag.colour}; color: #ffffff;">{entry.wcag.level}</span>
                                    </div>
                                    <span class="suggest-arrow">→</span>
                                    <div class="suggest-side">
                                        <div
                                            class="contrast-swatch-text reco-scale-swatch"
                                            style="background: {swatch_bg_after}; color: {swatch_fg_after};{
                                                swatch_bg_after === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                                            }"
                                        >Aa</div>
                                        <span class="suggest-ratio">{entry.suggestion?.ratio}</span>
                                        <span class="wcag-badge" style="background: #3d8a45; color: #ffffff;">AA</span>
                                    </div>
                                </div>
                                <div class="suggest-detail">
                                    <span class="suggest-hex">{entry.suggestion?.hex}</span>
                                    <span class="suggest-delta">L {sign}{entry.suggestion?.deltaL}%</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
            
            <!-- Opposite theme suggestion-->
            <div class="rules-col">
                {#if adjustment_suggestions.length !== 0}
                    <div class="reco-subtitle">{trans?.contrast.suggest_title}</div>
                {/if}

                {#if adjustment_suggestions.length !== 0}
                    <div class="suggest-grid">
                        {#each adjustment_suggestions as entry}
                            {@const sign = (entry.suggestion?.deltaL ?? 0) >= 0 ? '+' : ''}
                            {@const swatch_bg_before = entry.invert ? entry.variant_color : entry.surface_color}
                            {@const swatch_fg_before = entry.invert ? selected_accent.text_accent : entry.variant_color}
                            {@const swatch_bg_after = entry.invert ? (entry.suggestion?.hex ?? entry.variant_color) : entry.surface_color}
                            {@const swatch_fg_after = entry.invert ? selected_accent.text_accent : (entry.suggestion?.hex ?? entry.variant_color)}
                            {@const priority_label = entry.priority === 'mandatory' ? trans?.contrast.suggest_mandatory : trans?.contrast.suggest_satisfactory}
                            {@const priority_color = entry.priority === 'mandatory' ? '#ef4444' : '#f59e0b'}
                            <div class="suggest-item" style="border-left-color: {priority_color};">
                                <div class="suggest-pair-header">
                                    <span class="suggest-pair-label">{entry.variant_name} / {entry.surface_label}</span>
                                    <span class="suggest-priority-badge" style="background: {priority_color}; color: #ffffff;">{priority_label}</span>
                                </div>
                                <div class="suggest-before-after">
                                    <div class="suggest-side">
                                        <div
                                            class="contrast-swatch-text reco-scale-swatch"
                                            style="background: {swatch_bg_before}; color: {swatch_fg_before};{
                                                swatch_bg_before === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                                            }"
                                        >Aa</div>
                                        <span class="suggest-ratio">{entry.ratio}</span>
                                        <span class="wcag-badge" style="background: {entry.wcag.colour}; color: #ffffff;">{entry.wcag.level}</span>
                                    </div>
                                    <span class="suggest-arrow">→</span>
                                    <div class="suggest-side">
                                        <div
                                            class="contrast-swatch-text reco-scale-swatch"
                                            style="background: {swatch_bg_after}; color: {swatch_fg_after};{
                                                swatch_bg_after === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                                            }"
                                        >Aa</div>
                                        <span class="suggest-ratio">{entry.suggestion?.ratio}</span>
                                        <span class="wcag-badge" style="background: #3d8a45; color: #ffffff;">AA</span>
                                    </div>
                                </div>
                                <div class="suggest-detail">
                                    <span class="suggest-hex">{entry.suggestion?.hex}</span>
                                    <span class="suggest-delta">L {sign}{entry.suggestion?.deltaL}%</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <!-- ── Corrected scale ── -->
        <div class="reco-subtitle">{trans?.contrast.suggest_corrected_title}</div>
        {#if scale_suggestion}
            <div class="scale-swatches">
                {#each scale_suggestion.shades as shade}
                    <div class="scale-swatch-item" class:scale-swatch-fail={!shade.ok}>
                        <div class="scale-swatch" style="background: {shade.hex};"></div>
                        <span class="scale-swatch-label">{shade.name}</span>
                        <span class="scale-swatch-hex">{shade.hex}</span>
                        <span class="scale-swatch-l">L {Math.round(shade.l * 100)}%</span>
                        {#if shade.adjusted}
                            <span class="scale-swatch-status" style="color: #f59e0b;">{trans?.contrast.suggest_adjusted}</span>
                        {/if}
                        {#if !shade.ok}
                            <span class="scale-swatch-status" style="color: #ef4444;">Fail</span>
                        {/if}
                    </div>
                {/each}
            </div>
            <div class="scale-bar">
                {#each scale_suggestion.shades as shade}
                    <div class="scale-bar-segment" style="background: {shade.hex};" title="{shade.name}: {shade.hex}"></div>
                {/each}
            </div>
        {:else}
            <div class="reco-none">{trans?.contrast.suggest_scale_none}</div>
        {/if}

        <!-- ── Export buttons ── -->
        <div class="contrast-export-row">
            <button class="button button-secondary" onclick={copyText}>
                {copied_text ? trans?.contrast.export_copied : trans?.contrast.export_text}
            </button>
            <button class="button button-secondary" onclick={copyJson}>
                {copied_json ? trans?.contrast.export_copied : trans?.contrast.export_json}
            </button>
        </div>
    </div>
</div>

<style>
    /* Demo section */
    .demo-section {
        margin-bottom: 40px;
    }

    .section-title {
        margin-bottom: 20px;
        color: var(--text);
        font-size: 2rem;
        font-weight: 600;
    }

    /* Contrast Info */
    .contrast-info {
        background: var(--card);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }

    .contrast-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 15px;
    }

    .contrast-item {
        padding: 12px;
        background: var(--highlight);
        border-radius: 6px;
        font-size: 13px;
    }

    .contrast-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 6px;
    }

    .contrast-label {
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 8px;
    }

    .contrast-value2 {
        font-size: 22px;
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
        border-bottom: 1px solid var(--highlight);
    }

    .contrast-note {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 0.5rem;
    }

    /* Text swatch : "Aa" preview */
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
        margin-bottom: 0.4rem;
    }

    /* Surface swatch : nested rectangles */
    .contrast-swatch-surface {
        margin-bottom: 0.4rem;
    }
    .swatch-surface-outer {
        width: 3rem;
        height: 2rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .swatch-surface-inner {
        width: 1.4rem;
        height: 1rem;
        border-radius: 2px;
    }

    /* Recommendations */
    .reco-subtitle {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-muted);
        margin: 1rem 0 0.4rem 0;
    }

    .reco-none {
        font-size: 0.82rem;
        color: #ef4444;
        font-style: italic;
    }

    .reco-scale-swatch {
        margin-bottom: 0;
        width: 2.2rem;
        height: 1.6rem;
        font-size: 0.75rem;
    }

    .rules-block {
        display: flex;
        justify-content: flex-start;
        gap: 30px;
    }

    .rules-col {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1;
    }

    /* Adjustment suggestions */
    .suggest-all-pass {
        font-size: 0.82rem;
        color: #10b981;
        font-style: italic;
        margin: 0.5rem 0;
    }

    .suggest-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 0.75rem;
        margin-top: 0.5rem;
    }

    .suggest-item {
        background: var(--highlight);
        border-radius: 6px;
        padding: 0.6rem;
        border-left: 3px solid #f59e0b;
    }

    .suggest-pair-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.4rem;
    }

    .suggest-pair-label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--text-muted);
    }

    .suggest-priority-badge {
        display: inline-block;
        padding: 1px 6px;
        border-radius: 10px;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.3px;
        flex-shrink: 0;
    }

    .suggest-before-after {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .suggest-side {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }

    .suggest-arrow {
        font-size: 1rem;
        color: var(--text-muted);
        flex-shrink: 0;
    }

    .suggest-ratio {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--text);
    }

    .suggest-detail {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.35rem;
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .suggest-hex {
        font-family: monospace;
    }

    .suggest-delta {
        font-style: italic;
    }

    /* Suggested scale */
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
        margin: 0.25rem 0 1rem 0;
    }

    .scale-bar-segment {
        flex: 1;
    }

    /* Opposite theme */
    .opposite-selector {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0.5rem 0 1rem 0;
    }

    .opposite-selector-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-muted);
    }

    .opposite-select {
        padding: 8px 12px;
        border: 2px solid var(--highlight);
        background: var(--bg);
        color: var(--text);
        border-radius: 6px;
        font-size: 14px;
        min-width: 180px;
    }

    .opposite-select:focus {
        outline: none;
        border-color: var(--accent);
    }

    .opposite-results {
        margin: 0.5rem 0 1rem 0;
    }

    .opposite-ratios-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 0.5rem;
    }

    /* Export */
    .contrast-export-row {
        display: flex;
        gap: 0.75rem;
        margin: 1.25rem 0 0.5rem 0;
    }

    /* Buttons (needed for export buttons) */
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
</style>
