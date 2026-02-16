<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import { getContrastRatio, getWcagLevel, getLuminance } from "$lib/utils/contrast";

    interface Props {
        trans: Translation | null;
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
    }

    let {
        trans,
        selected_palette,
        selected_accent,
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

    // Accent base
    const contrast_accent = $derived(getContrastRatio(selected_accent.accent, selected_accent.text_accent));
    const contrast_accent_bg = $derived(getContrastRatio(selected_accent.accent, selected_palette.bg));
    const contrast_accent_card = $derived(getContrastRatio(selected_accent.accent, selected_palette.card));
    const contrast_accent_highlight = $derived(getContrastRatio(selected_accent.accent, selected_palette.highlight));

    // Accent Light
    const contrast_accent_light = $derived(getContrastRatio(selected_accent.accent_light, selected_accent.text_accent));
    const contrast_accent_light_bg = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.bg));
    const contrast_accent_light_card = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.card));
    const contrast_accent_light_highlight = $derived(getContrastRatio(selected_accent.accent_light, selected_palette.highlight));

    // Accent Lighter
    const contrast_accent_lighter = $derived(getContrastRatio(selected_accent.accent_lighter, selected_accent.text_accent));
    const contrast_accent_lighter_bg = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.bg));
    const contrast_accent_lighter_card = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.card));
    const contrast_accent_lighter_highlight = $derived(getContrastRatio(selected_accent.accent_lighter, selected_palette.highlight));

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
    let show_detail = $state(false);

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
            name: trans?.contrast.accent, 
            color: selected_accent.accent, 
            ratios: {
                bg: contrast_accent_bg,
                card: contrast_accent_card,
                highlight: contrast_accent_highlight,
                text: contrast_accent,
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

    // Find the variant closest to the AA Large threshold (3:1) for a given surface.
    // Dark mode: search darker → lighter (darkest passing variant)
    // Light mode: search lighter → darker (lightest passing variant)
    function getThreshold(ratio_key: 'bg' | 'card' | 'highlight' | 'text', variants: typeof accent_variants): {
        name: string | undefined,
        ratio: string,
        wcag: ReturnType<typeof getWcagLevel>
    } | null {
        const ordered = is_dark ? [...variants].reverse() : variants;
        for (const v of ordered) {
            const ratio = v.ratios[ratio_key];
            const wcag  = getWcagLevel(ratio, 'normal');
            if (wcag.pass) return { name: v.name, ratio, wcag };
        }
        return null;
    }

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

        lines.push(``);
        lines.push(`── ${trans?.contrast.reco_threshold} ──`);

        for (const s of surfaces) {
            const threshold = getThreshold(s.key as 'bg' | 'card' | 'highlight', accent_variants);
            if (threshold) {
                lines.push(`${s.label}: ${trans?.contrast.reco_threshold_from} ${threshold.name} → ${threshold.ratio}:1 ${threshold.wcag.level}`);
            } else {
                lines.push(`${s.label}: ${trans?.contrast.reco_threshold_none}`);
            }
        }

        return lines.join('\n');
    }

    function generateJsonExport(): string {
        return JSON.stringify({
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
                accent_variants.map(v => [v.name, {
                    color: v.color,
                    text_accent: { 
                        ratio: v.ratios.text, 
                        wcag: getWcagLevel(v.ratios.text, 'normal').level 
                    },
                    on_bg: { 
                        ratio: v.ratios.bg, 
                        wcag: getWcagLevel(v.ratios.bg, 'normal').level 
                    },
                    on_card: { 
                        ratio: v.ratios.card, 
                        wcag: getWcagLevel(v.ratios.card, 'normal').level 
                    },
                    on_highlight:{ 
                        ratio: v.ratios.highlight, 
                        wcag: getWcagLevel(v.ratios.highlight, 'normal').level 
                    },
                }])
            ),
        }, null, 2);
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
                    ratio: contrast_highlight_card, c1: selected_palette.highlight, 
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

        <!-- ── Category 3 : Accent ── -->
        <div class="contrast-category-title">{trans?.contrast.reco_scale}</div>
        <div class="contrast-note">{trans?.contrast.large_text_note}</div>

        <!-- Scale : all variants per surface -->
        <div class="reco-scale-grid">
            {#each surfaces as surface}
                <div class="reco-scale-block">
                    <div class="reco-scale-surface-label">{surface.label}</div>
                    {#each accent_variants as variant}
                        {@const wcag = getWcagLevel(variant.ratios[surface.ratio_key], 'normal')}
                        {@const swatch_bg = surface.invert ? variant.color : surface.color}
                        {@const swatch_fg = surface.invert ? selected_accent.text_accent : variant.color}
                        <div class="reco-scale-row">
                            <div
                                class="contrast-swatch-text reco-scale-swatch"
                                style="background: {swatch_bg}; color: {swatch_fg};{swatch_bg === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''}"
                            >Aa</div>
                            <span class="reco-scale-name">{variant.name}</span>
                            <span class="contrast-value2">{variant.ratios[surface.ratio_key]}</span>
                            <span class="wcag-badge" style="background: {wcag.colour}; color: #ffffff;">{wcag.level}</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>

        <!-- Individual : all variants per surface (collapsible) -->
        <button class="button button-secondary detail-toggle" onclick={() => show_detail = !show_detail}>
            {show_detail ? trans?.contrast.detail_hide : trans?.contrast.detail_show}
        </button>
        {#if show_detail}
            <div class="detail-grid">
                {#each accent_variants as variant, i}
                    {#if i > 0}
                        <div class="detail-separator"></div>
                    {/if}
                    <div class="detail-variant-label">{variant.name}</div>
                    <div class="contrast-grid">
                        {#each [
                            {
                                surface_label: trans?.contrast.text_accent,
                                ratio: variant.ratios.text,
                                bg: variant.color,
                                fg: selected_accent.text_accent
                            },
                            {
                                surface_label: trans?.contrast.background,
                                ratio: variant.ratios.bg,
                                bg: selected_palette.bg,
                                fg: variant.color
                            },
                            {
                                surface_label: trans?.contrast.card,
                                ratio: variant.ratios.card,
                                bg: selected_palette.card,
                                fg: variant.color
                            },
                            {
                                surface_label: trans?.contrast.highlight,
                                ratio: variant.ratios.highlight,
                                bg: selected_palette.highlight,
                                fg: variant.color
                            },
                        ] as item}
                            {@const wcag = getWcagLevel(item.ratio, 'normal')}
                            <div class="contrast-item">
                                <div 
                                    class="contrast-swatch-text" 
                                    style="background: {item.bg}; color: {item.fg};{
                                        item.bg === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                                    }"
                                >Aa</div>
                                <div class="contrast-label">{variant.name} / {item.surface_label}</div>
                                <div class="contrast-row">
                                    <span class="contrast-value2">{item.ratio}</span>
                                    <span class="wcag-badge" style="background: {wcag.colour}; color: #ffffff;">{wcag.level}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        {/if}

        <!-- ── Recommendations ── -->
        <div class="contrast-category-title">{trans?.contrast.reco_title}</div>

        <!-- Threshold : first passing variant per surface -->
        <div class="reco-subtitle">{trans?.contrast.reco_threshold}</div>
        <div class="contrast-grid">
            {#each surfaces as surface}
                {@const threshold = getThreshold(surface.ratio_key as 'bg' | 'card' | 'highlight' | 'text', accent_variants)}
                <div class="contrast-item reco-item">
                    <div class="contrast-label">{surface.label}</div>
                    {#if threshold}
                        {@const matched_variant = accent_variants.find(v => v.name === threshold.name)}
                        {@const swatch_bg = surface.invert ? (matched_variant?.color ?? selected_accent.accent) : surface.color}
                        {@const swatch_fg = surface.invert ? selected_accent.text_accent : (matched_variant?.color ?? selected_accent.accent)}
                        <div
                            class="contrast-swatch-text"
                            style="background: {swatch_bg}; color: {swatch_fg};{
                                swatch_bg === selected_palette.highlight ? ' border: 1px solid var(--card);' : ''
                            }"
                        >Aa</div>
                        <div class="reco-best-name">
                            {trans?.contrast.reco_threshold_from} <strong>{threshold.name}</strong>
                        </div>
                        <div class="contrast-row">
                            <span class="contrast-value2">{threshold.ratio}</span>
                            <span class="wcag-badge" style="background: {threshold.wcag.colour}; color: #ffffff;">{threshold.wcag.level}</span>
                        </div>
                    {:else}
                        <div class="reco-none">{trans?.contrast.reco_threshold_none}</div>
                    {/if}
                </div>
            {/each}
        </div>

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

    .reco-item {
        border-left: 3px solid var(--accent);
        padding-left: 0.5rem;
    }

    .reco-best-name {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .reco-scale-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .reco-scale-block {
        background: var(--highlight);
        border-radius: 6px;
        padding: 0.6rem;
    }

    .reco-scale-surface-label {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 0.5rem;
    }

    .reco-scale-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.35rem;
    }

    .reco-scale-swatch {
        margin-bottom: 0;
        width: 2.2rem;
        height: 1.6rem;
        font-size: 0.75rem;
    }

    .reco-scale-name {
        flex: 1;
        font-size: 0.78rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .reco-none {
        font-size: 0.82rem;
        color: #ef4444;
        font-style: italic;
    }

    /* Detail toggle (collapsible individual section) */
    .detail-toggle {
        margin-top: 1rem;
    }

    .detail-grid {
        margin-top: 1rem;
    }

    .detail-variant-label {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--text);
        margin-bottom: 0.25rem;
    }

    .detail-separator {
        height: 1px;
        background: var(--highlight);
        margin: 1.25rem 0;
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
