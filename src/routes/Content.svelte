<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
        css_variables: Record<string, string>;  // replaces all color_* props
        // Text & structural contrasts
        contrast_txt_bg: string;
        contrast_txt_card: string;
        contrast_card_bg: string;
        contrast_highlight_bg: string;
        contrast_highlight_card: string;
        // Accent base
        contrast_accent: string;
        contrast_accent_bg: string;
        contrast_accent_card: string;
        contrast_accent_highlight: string;
        // Accent Light
        contrast_accent_light: string;
        contrast_accent_light_bg: string;
        contrast_accent_light_card: string;
        contrast_accent_light_highlight: string;
        // Accent Lighter
        contrast_accent_lighter: string;
        contrast_accent_lighter_bg: string;
        contrast_accent_lighter_card: string;
        contrast_accent_lighter_highlight: string;
        // Accent Dark
        contrast_accent_dark: string;
        contrast_accent_dark_bg: string;
        contrast_accent_dark_card: string;
        contrast_accent_dark_highlight: string;
        // Accent Darker
        contrast_accent_darker: string;
        contrast_accent_darker_bg: string;
        contrast_accent_darker_card: string;
        contrast_accent_darker_highlight: string;
    }

    let {
        trans,
        placeholders,
        selected_palette,
        selected_accent,
        css_variables,
        // Text & structural contrasts
        contrast_txt_bg,
        contrast_txt_card,
        contrast_card_bg,
        contrast_highlight_bg,
        contrast_highlight_card,
        // Accent base
        contrast_accent,
        contrast_accent_bg,
        contrast_accent_card,
        contrast_accent_highlight,
        // Accent Light
        contrast_accent_light,
        contrast_accent_light_bg,
        contrast_accent_light_card,
        contrast_accent_light_highlight,
        // Accent Lighter
        contrast_accent_lighter,
        contrast_accent_lighter_bg,
        contrast_accent_lighter_card,
        contrast_accent_lighter_highlight,
        // Accent Dark
        contrast_accent_dark,
        contrast_accent_dark_bg,
        contrast_accent_dark_card,
        contrast_accent_dark_highlight,
        // Accent Darker
        contrast_accent_darker,
        contrast_accent_darker_bg,
        contrast_accent_darker_card,
        contrast_accent_darker_highlight,
    }: Props = $props();

    let theme_name:string = selected_palette.name;
    let accent_name:string = selected_accent.name;
    let copied_text = $state(false);
    let copied_json = $state(false);

    // Shortcuts derived from css_variables for readability
    const color_bg           = $derived(css_variables['--bg']);
    const color_card         = $derived(css_variables['--card']);
    const color_highlight    = $derived(css_variables['--highlight']);
    const color_text         = $derived(css_variables['--text']);
    const color_text_accent  = $derived(css_variables['--text-accent']);
    const color_accent       = $derived(css_variables['--accent']);
    const color_accent_light = $derived(css_variables['--accent-light']);
    const color_accent_lighter = $derived(css_variables['--accent-lighter']);
    const color_accent_dark  = $derived(css_variables['--accent-dark']);
    const color_accent_darker = $derived(css_variables['--accent-darker']);

    // Reactive derived data for contrast recommendations
    const surfaces = $derived([
        { key: 'bg'        as const, ratio_key: 'bg'        as const, label: trans?.contrast.background,  color: color_bg,          swatch_fg: color_text,        invert: false },
        { key: 'card'      as const, ratio_key: 'card'      as const, label: trans?.contrast.card,        color: color_card,        swatch_fg: color_text,        invert: false },
        { key: 'highlight' as const, ratio_key: 'highlight' as const, label: trans?.contrast.highlight,   color: color_highlight,   swatch_fg: color_text,        invert: false },
        { key: 'text'      as const, ratio_key: 'text'      as const, label: trans?.contrast.accent, color: color_text_accent, swatch_fg: color_text_accent, invert: true  },
    ]);

    // Ordered accent variants (light → dark) for scale display
    const accent_variants = $derived([
        { name: trans?.contrast.accent_lighter, color: color_accent_lighter, ratios: {
            bg:        contrast_accent_lighter_bg,
            card:      contrast_accent_lighter_card,
            highlight: contrast_accent_lighter_highlight,
            text:      contrast_accent_lighter,
        }},
        { name: trans?.contrast.accent_light, color: color_accent_light, ratios: {
            bg:        contrast_accent_light_bg,
            card:      contrast_accent_light_card,
            highlight: contrast_accent_light_highlight,
            text:      contrast_accent_light,
        }},
        { name: trans?.contrast.accent, color: color_accent, ratios: {
            bg:        contrast_accent_bg,
            card:      contrast_accent_card,
            highlight: contrast_accent_highlight,
            text:      contrast_accent,
        }},
        { name: trans?.contrast.accent_dark, color: color_accent_dark, ratios: {
            bg:        contrast_accent_dark_bg,
            card:      contrast_accent_dark_card,
            highlight: contrast_accent_dark_highlight,
            text:      contrast_accent_dark,
        }},
        { name: trans?.contrast.accent_darker, color: color_accent_darker, ratios: {
            bg:        contrast_accent_darker_bg,
            card:      contrast_accent_darker_card,
            highlight: contrast_accent_darker_highlight,
            text:      contrast_accent_darker,
        }},
    ]);

    const accents = $derived([
        { name: trans?.contrast.accent, ratios: [
            { surface: trans?.contrast.background, ratio: contrast_accent_bg        },
            { surface: trans?.contrast.card,       ratio: contrast_accent_card      },
            { surface: trans?.contrast.highlight,  ratio: contrast_accent_highlight },
        ]},
        { name: trans?.contrast.accent_light, ratios: [
            { surface: trans?.contrast.background, ratio: contrast_accent_light_bg        },
            { surface: trans?.contrast.card,       ratio: contrast_accent_light_card      },
            { surface: trans?.contrast.highlight,  ratio: contrast_accent_light_highlight },
        ]},
        { name: trans?.contrast.accent_lighter, ratios: [
            { surface: trans?.contrast.background, ratio: contrast_accent_lighter_bg        },
            { surface: trans?.contrast.card,       ratio: contrast_accent_lighter_card      },
            { surface: trans?.contrast.highlight,  ratio: contrast_accent_lighter_highlight },
        ]},
        { name: trans?.contrast.accent_dark, ratios: [
            { surface: trans?.contrast.background, ratio: contrast_accent_dark_bg        },
            { surface: trans?.contrast.card,       ratio: contrast_accent_dark_card      },
            { surface: trans?.contrast.highlight,  ratio: contrast_accent_dark_highlight },
        ]},
        { name: trans?.contrast.accent_darker, ratios: [
            { surface: trans?.contrast.background, ratio: contrast_accent_darker_bg        },
            { surface: trans?.contrast.card,       ratio: contrast_accent_darker_card      },
            { surface: trans?.contrast.highlight,  ratio: contrast_accent_darker_highlight },
        ]},
    ]);

    // Get CSS var value
    function getHex(css_var:string) {
        return getComputedStyle(document.documentElement).getPropertyValue(css_var).trim();
    }

    /**
     * Evaluate WCAG level for a given ratio and text size
     * size: 'normal' | 'large'  (large = ≥18pt or bold ≥14pt)
     */
    function getWcagLevel(ratio: string, size: 'normal' | 'large' = 'normal'): {
        level: 'AAA' | 'AA' | 'AA Large' | 'Fail',
        pass: boolean,
        colour: string
    } {
        const r = parseFloat(ratio);
        if (size === 'normal') {
            if (r >= 7)   return { level: 'AAA',      pass: true,  colour: '#10b981' };
            if (r >= 4.5) return { level: 'AA',       pass: true,  colour: '#3d8a45' };
            if (r >= 3)   return { level: 'AA Large', pass: true,  colour: '#f59e0b' };
                          return { level: 'Fail',     pass: false, colour: '#ef4444' };
        } else {
            if (r >= 4.5) return { level: 'AAA',      pass: true,  colour: '#10b981' };
            if (r >= 3)   return { level: 'AA',       pass: true,  colour: '#3d8a45' };
                          return { level: 'Fail',     pass: false, colour: '#ef4444' };
        }
    }

    // Find the first variant that reaches at least AA Large (3:1) for a given surface
    function getThreshold(ratio_key: 'bg' | 'card' | 'highlight' | 'text', variants: typeof accent_variants): {
        name: string | undefined,
        ratio: string,
        wcag: ReturnType<typeof getWcagLevel>
    } | null {
        for (const v of variants) {
            const ratio = v.ratios[ratio_key];
            const wcag  = getWcagLevel(ratio, 'large');
            if (wcag.pass) return { name: v.name, ratio, wcag };
        }
        return null;
    }

    // Generate plain text export
    function generateTextExport(): string {
        const lines: string[] = [
            `=== Contrast Report ===`,
            `${trans?.contrast.export_theme}: ${theme_name} | ${trans?.contrast.export_accent}: ${accent_name}`,
            ``,
            `── ${trans?.contrast.cat_text} ──`,
            `${trans?.contrast.text} / ${trans?.contrast.background}  : ${contrast_txt_bg}:1  ${getWcagLevel(contrast_txt_bg, 'normal').level}`,
            `${trans?.contrast.text} / ${trans?.contrast.card}         : ${contrast_txt_card}:1  ${getWcagLevel(contrast_txt_card, 'normal').level}`,
            `${trans?.contrast.text} / ${trans?.contrast.highlight}    : ${contrast_txt_bg}:1  ${getWcagLevel(contrast_txt_bg, 'normal').level}`,
            ``,
            `── ${trans?.contrast.cat_surfaces} ──`,
            `${trans?.contrast.card} / ${trans?.contrast.background}       : ${contrast_card_bg}:1`,
            `${trans?.contrast.highlight} / ${trans?.contrast.background}  : ${contrast_highlight_bg}:1`,
            `${trans?.contrast.highlight} / ${trans?.contrast.card}        : ${contrast_highlight_card}:1`,
            ``,
            `── ${trans?.contrast.cat_accent} ──`,
        ];

        for (const v of accent_variants) {
            lines.push(`${v.name}`);
            lines.push(`  / ${trans?.contrast.text_accent}  : ${v.ratios.text}:1  ${getWcagLevel(v.ratios.text, 'large').level}`);
            lines.push(`  / ${trans?.contrast.background}   : ${v.ratios.bg}:1  ${getWcagLevel(v.ratios.bg, 'large').level}`);
            lines.push(`  / ${trans?.contrast.card}         : ${v.ratios.card}:1  ${getWcagLevel(v.ratios.card, 'large').level}`);
            lines.push(`  / ${trans?.contrast.highlight}    : ${v.ratios.highlight}:1  ${getWcagLevel(v.ratios.highlight, 'large').level}`);
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

    // Generate JSON export
    function generateJsonExport(): string {
        return JSON.stringify({
            theme: theme_name,
            accent: accent_name,
            text_readability: {
                text_bg:        { ratio: contrast_txt_bg,       wcag: getWcagLevel(contrast_txt_bg, 'normal').level },
                text_card:      { ratio: contrast_txt_card,     wcag: getWcagLevel(contrast_txt_card, 'normal').level },
            },
            surfaces: {
                card_bg:        { ratio: contrast_card_bg },
                highlight_bg:   { ratio: contrast_highlight_bg },
                highlight_card: { ratio: contrast_highlight_card },
            },
            accent_variants: Object.fromEntries(
                accent_variants.map(v => [v.name, {
                    color: v.color,
                    text_accent: { ratio: v.ratios.text,      wcag: getWcagLevel(v.ratios.text, 'large').level },
                    on_bg:       { ratio: v.ratios.bg,        wcag: getWcagLevel(v.ratios.bg, 'large').level },
                    on_card:     { ratio: v.ratios.card,      wcag: getWcagLevel(v.ratios.card, 'large').level },
                    on_highlight:{ ratio: v.ratios.highlight, wcag: getWcagLevel(v.ratios.highlight, 'large').level },
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

<!-- Main Content -->
<div class="content">
    <!-- Typography -->
    <div class="demo-section typography-demo">
        <h2 class="section-title">{trans?.typo.title}</h2>
        <h1>{trans?.typo.h1} - {placeholders.typography.h1_context}</h1>
        <h2>{trans?.typo.h2} - {placeholders.typography.h2_context}</h2>
        <h3>{trans?.typo.h3} - {placeholders.typography.h3_context}</h3>
        <h4>{trans?.typo.h4} - {placeholders.typography.h4_context}</h4>
        <h5>{trans?.typo.h5} - {placeholders.typography.h5_context}</h5>
        <h6>{trans?.typo.h6} - {placeholders.typography.h6_context}</h6>
        <p class="lead">
            {placeholders.typography.lead}
        </p>
        <p>
            {placeholders.typography.body}
        </p>
    </div>

    <!-- Color Swatches -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.palette.title}</h2>
        <div class="swatch-grid">
            <div 
                class="swatch" 
                style="border: 2px solid var(--highlight);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Background</div>
                    <div class="swatch-var">--bg</div>
                </div>
                <div class="swatch-hex">
                    {selected_palette.bg}
                </div>
            </div>
            <div 
                class="swatch" 
                style="background: var(--card);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Card</div>
                    <div class="swatch-var">--card</div>
                </div>
                <div class="swatch-hex">
                    {selected_palette.card}
                </div>
            </div>
            <div 
                class="swatch"
                style="background: var(--highlight);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Highlight</div>
                    <div class="swatch-var">--highlight</div>
                </div>
                <div class="swatch-hex">
                    {selected_palette.highlight}
                </div>
            </div>
            <div class="swatch" style="background: var(--accent); color: var(--text-accent);">
                <div class="swatch-header">
                    <div class="swatch-label">Accent</div>
                    <div class="swatch-var">--accent</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent}
                </div>
            </div>
            <div 
                class="swatch" 
                style="background: var(--accent-dark); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Accent Dark</div>
                    <div class="swatch-var">--accent-dark</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_dark}
                </div>
            </div>
            <div 
                class="swatch" 
                style="background: var(--accent-darker); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Accent Darker</div>
                    <div class="swatch-var">--accent-darker</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_darker}
                </div>
            </div>
            <div 
                class="swatch" 
                style="background: var(--accent-light); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Accent Light</div>
                    <div class="swatch-var">--accent-light</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_light}
                </div>
            </div>
            <div 
                class="swatch" 
                style="background: var(--accent-lighter); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Accent Lighter</div>
                    <div class="swatch-var">--accent-lighter</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_lighter}
                </div>
            </div>
        </div>
    </div>

    <!-- Buttons -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.buttons.title}</h2>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <button class="button button-primary">{trans?.buttons.primary}</button>
            <button class="button button-secondary">{trans?.buttons.secondary}</button>
            <button class="button button-ghost">{trans?.buttons.ghost}</button>
            <span class="badge">{trans?.buttons.badge}</span>
        </div>
    </div>

    <!-- Cards -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.cards.title}</h2>
        <div class="demo-grid">
            {#each placeholders.cards.provinces as province, index}
                <div class="card">
                    <div class="card-title">{province.name}</div>
                    <div class="card-text">
                        {province.description}
                    </div>
                    <div class="card-meta">
                        <span class="badge">{province.badge}</span>
                        <span style="margin-left: 10px;">{province.date}</span>
                    </div>
                    <div style="margin-top: 15px;">
                        {#if index === 2}
                            <button class="button button-ghost">Explore</button>
                        {:else}
                            <button class="button button-primary">Explore</button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Navigation -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.nav.title}</h2>
        <div class="nav-demo">
            {#each placeholders.navigation.items as item}
                <div class="nav-item {item === placeholders.navigation.items[0] ? 'active' : ''}">{item}</div>
            {/each}
        </div>
    </div>

    <!-- Forms -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.form.title}</h2>
        <div class="card card-form">
            <div class="form-group">
                <label for="name-input" class="form-label">{trans?.form.name}</label>
                <input id="name-input" type="text" class="form-input" placeholder={placeholders.form.placeholder_name}>
            </div>
            <div class="form-group">
                <label for="email-input" class="form-label">{trans?.form.email}</label>
                <input id="email-input" type="email" class="form-input" placeholder={placeholders.form.placeholder_email}>
            </div>
            <div class="form-group">
                <label for="message-textarea" class="form-label">{trans?.form.message}</label>
                <textarea id="message-textarea" class="form-input" rows="4" placeholder={placeholders.form.placeholder_message}></textarea>
            </div>
            <button class="button button-primary">{trans?.form.send}</button>
        </div>
    </div>

    <!-- Alerts -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.alerts.title}</h2>
        <div class="alert alert-success">
            {placeholders.alerts.success}
        </div>
        <div class="alert alert-info">
            {placeholders.alerts.info}
        </div>
    </div>

    <!-- Contrast Info -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.contrast.title}</h2>
        <div class="contrast-info">
            <p><strong>{trans?.contrast.desc}</strong></p>
            <div class="contrast-grid">
                <div class="contrast-item">
                    <div>{trans?.contrast.text} / {trans?.contrast.background}</div>
                    <div class="contrast-value">{contrast_txt_bg}:1</div>
                </div>
                <div class="contrast-item">
                    <div>{trans?.contrast.text} / {trans?.contrast.card}</div>
                    <div class="contrast-value">{contrast_txt_card}:1</div>
                </div>
                <div class="contrast-item">
                    <div>{trans?.contrast.accent} / {trans?.contrast.text_accent}</div>
                    <div class="contrast-value">{contrast_accent}:1</div>
                </div>
                <div class="contrast-item">
                    <div>{trans?.contrast.card} / {trans?.contrast.background}</div>
                    <div class="contrast-value">{contrast_card_bg}:1</div>
                </div>
                <div class="contrast-item">
                    <div>{trans?.contrast.highlight} / {trans?.contrast.background}</div>
                    <div class="contrast-value">{contrast_highlight_bg}:1</div>
                </div>
                <div class="contrast-item">
                    <div>{trans?.contrast.highlight} / {trans?.contrast.card}</div>
                    <div class="contrast-value">{contrast_highlight_card}:1</div>
                </div>
            </div>
            <p style="margin-top: 15px; font-size: 13px; color: var(--text-muted);">
                {trans?.contrast.required1}<br>
                {trans?.contrast.required2}
            </p>
        </div>
    </div>

    <!-- Contrast Info 2 -->
    <div class="demo-section">
        <div class="section-title">{trans?.contrast.title}</div>
        <div class="contrast-info">
            <p><strong>{trans?.contrast.desc}</strong></p>

            <!-- ── Category 1 : Main text readability ── -->
            <div class="contrast-category-title">{trans?.contrast.cat_text}</div>
            <div class="contrast-grid">
                {#each [
                    { label: `${trans?.contrast.text} / ${trans?.contrast.background}`, ratio: contrast_txt_bg,       fg: color_text, bg: color_bg,       size: 'normal' },
                    { label: `${trans?.contrast.text} / ${trans?.contrast.card}`,        ratio: contrast_txt_card,     fg: color_text, bg: color_card,     size: 'normal' },
                    { label: `${trans?.contrast.text} / ${trans?.contrast.highlight}`,   ratio: contrast_txt_bg,       fg: color_text, bg: color_highlight, size: 'normal' },
                ] as item}
                    {@const wcag = getWcagLevel(item.ratio, item.size as 'normal' | 'large')}
                    <div class="contrast-item">
                        <div class="contrast-swatch-text" style="background: {item.bg}; color: {item.fg};">Aa</div>
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
            <p class="contrast-surface-note">{trans?.contrast.surface_note}</p>
            <div class="contrast-grid">
                {#each [
                    { label: `${trans?.contrast.card} / ${trans?.contrast.background}`,      ratio: contrast_card_bg,        c1: color_card,      c2: color_bg   },
                    { label: `${trans?.contrast.highlight} / ${trans?.contrast.background}`, ratio: contrast_highlight_bg,   c1: color_highlight, c2: color_bg   },
                    { label: `${trans?.contrast.highlight} / ${trans?.contrast.card}`,       ratio: contrast_highlight_card, c1: color_highlight, c2: color_card },
                ] as item}
                    <div class="contrast-item">
                        <div class="contrast-swatch-surface">
                            <div class="swatch-surface-outer" style="background: {item.c2};">
                                <div class="swatch-surface-inner" style="background: {item.c1};"></div>
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

            <!-- ── Category 3 : Accent on surfaces ── -->
            <div class="contrast-category-title">{trans?.contrast.cat_accent}</div>
            <div class="contrast-grid">
                {#each accent_variants as variant}
                    {#each [
                        { surface_label: trans?.contrast.text_accent, ratio: variant.ratios.text, bg: variant.color,    fg: color_text_accent },
                        { surface_label: trans?.contrast.background,  ratio: variant.ratios.bg,   bg: color_bg,         fg: variant.color     },
                        { surface_label: trans?.contrast.card,        ratio: variant.ratios.card, bg: color_card,       fg: variant.color     },
                        { surface_label: trans?.contrast.highlight,   ratio: variant.ratios.highlight, bg: color_highlight, fg: variant.color  },
                    ] as item}
                        {@const wcag = getWcagLevel(item.ratio, 'large')}
                        <div class="contrast-item">
                            <div class="contrast-swatch-text" style="background: {item.bg}; color: {item.fg};">Aa</div>
                            <div class="contrast-label">{variant.name} / {item.surface_label}</div>
                            <div class="contrast-row">
                                <span class="contrast-value2">{item.ratio}:1</span>
                                <span class="wcag-badge" style="background: {wcag.colour}; color: #ffffff;">{wcag.level}</span>
                            </div>
                            <div class="contrast-note">{trans?.contrast.large_text_note}</div>
                        </div>
                    {/each}
                {/each}
            </div>

            <!-- ── Recommendations ── -->
            <div class="contrast-category-title">{trans?.contrast.reco_title}</div>

            <!-- Scale : all variants per surface -->
            <div class="reco-subtitle">{trans?.contrast.reco_scale}</div>
            <div class="reco-scale-grid">
                {#each surfaces as surface}
                    <div class="reco-scale-block">
                        <div class="reco-scale-surface-label">{surface.label}</div>
                        {#each accent_variants as variant}
                            {@const wcag = getWcagLevel(variant.ratios[surface.ratio_key], 'large')}
                            {@const swatch_bg = surface.invert ? variant.color       : surface.color}
                            {@const swatch_fg = surface.invert ? color_text_accent   : variant.color}
                            <div class="reco-scale-row">
                                <div
                                    class="contrast-swatch-text reco-scale-swatch"
                                    style="background: {swatch_bg}; color: {swatch_fg};"
                                >Aa</div>
                                <span class="reco-scale-name">{variant.name}</span>
                                <span class="contrast-value2">{variant.ratios[surface.ratio_key]}</span>
                                <span class="wcag-badge" style="background: {wcag.colour}; color: #ffffff;">{wcag.level}</span>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>

            <!-- Threshold : first passing variant per surface -->
            <div class="reco-subtitle">{trans?.contrast.reco_threshold}</div>
            <div class="contrast-grid">
                {#each surfaces as surface}
                    {@const threshold = getThreshold(surface.ratio_key as 'bg' | 'card' | 'highlight' | 'text', accent_variants)}
                    <div class="contrast-item reco-item">
                        <div class="contrast-label">{surface.label}</div>
                        {#if threshold}
                            {@const matched_variant = accent_variants.find(v => v.name === threshold.name)}
                            {@const swatch_bg = surface.invert ? (matched_variant?.color ?? color_accent) : surface.color}
                            {@const swatch_fg = surface.invert ? color_text_accent                        : (matched_variant?.color ?? color_accent)}
                            <div
                                class="contrast-swatch-text"
                                style="background: {swatch_bg}; color: {swatch_fg};"
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

            <p class="contrast-legend">
                <span style="color: #10b981;">■</span> AAA ≥ 7:1 &nbsp;
                <span style="color: #3d8a45;">■</span> AA ≥ 4.5:1 &nbsp;
                <span style="color: #f59e0b;">■</span> AA Large ≥ 3:1 &nbsp;
                <span style="color: #ef4444;">■</span> Fail &lt; 3:1 &nbsp;
                <span style="color: #6b7280;">■</span> {trans?.contrast.surface_badge}
            </p>
        </div>
    </div>
</div>

<style>
    /* Typography */
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        font-weight: 600;
        color: var(--text);
    }

    h1 { 
        font-size: 2.5rem;
        font-weight: 700;
    }  
    h2 { 
        font-size: 2rem;
    }
    h3 { 
        font-size: 1.5rem;
    } 
    h4 { 
        font-size: 1.25rem;
    } 
    h5 { 
        font-size: 1.125rem;
    } 
    h6 { 
        font-size: 1rem;
        font-weight: 500;
    }

    /* Main Content */
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 200px 40px 40px;
    }

    /* Demo Sections */
    .demo-section {
        margin-bottom: 40px;
    }

    .section-title {
        margin-bottom: 20px;
        color: var(--text);
    }

    .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 20px;
    }

    /* Card Component */
    .card {
        background: var(--card);
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 2px 8px var(--overlay);
    }

    .card-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--text);
    }

    .card-text {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 15px;
        color: var(--text);
    }

    .card-meta {
        font-size: 13px;
        color: var(--text-muted);
    }

    .card-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 600px;
    }

    /* Buttons */
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

    .button-primary {
        background: var(--accent);
        color: var(--text-accent);
    }

    .button-primary:hover {
        background: var(--accent-dark);
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

    .button-ghost {
        background: var(--highlight);
        color: var(--text);
    }

    .button-ghost:hover {
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Navigation */
    .nav-demo {
        background: var(--card);
        padding: 20px;
        border-radius: 12px;
        display: flex;
        gap: 15px;
        align-items: center;
        flex-wrap: wrap;
    }

    .nav-item {
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        color: var(--text);
    }

    .nav-item:hover {
        background: var(--highlight);
    }

    .nav-item.active {
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Forms */
    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .form-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text);
    }

    .form-input {
        padding: 12px;
        border: 2px solid var(--highlight);
        background: var(--bg);
        color: var(--text);
        border-radius: 6px;
        font-size: 14px;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--accent);
    }

    /* Typography Showcase */
    .typography-demo h1 {
        margin-bottom: 15px;
    }

    .typography-demo h2 {
        margin-bottom: 12px;
    }

    .typography-demo h3 {
        margin-bottom: 10px;
    }

    .typography-demo h4 {
        margin-bottom: 10px;
    }

    .typography-demo h5 {
        margin-bottom: 10px;
    }

    .typography-demo h6 {
        margin-bottom: 10px;
    }

    .typography-demo p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 15px;
    }

    .typography-demo .lead {
        font-size: 20px;
        color: var(--text-muted);
    }

    /* Color Swatches */
    .swatch-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }

    .swatch {
        aspect-ratio: 1;
        border-radius: 8px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 11px;
        font-family: 'Courier New', monospace;
        font-weight: 600;
        position: relative;
    }

    .swatch-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .swatch-label {
        font-size: 10px;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .swatch-var {
        font-size: 11px;
        opacity: 0.9;
    }

    .swatch-hex {
        font-size: 13px;
        font-weight: 700;
        padding: 6px 10px;
        border-radius: 4px;
        text-align: center;
        background: rgba(255,255,255,0.35);
    }

    /* Alert/Badge Components */
    .alert {
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 15px;
        border-left: 4px solid var(--accent);
    }

    .alert-success {
        background: var(--accent);
        color: var(--text-accent);
        border-color: var(--accent-dark);
    }

    .alert-info {
        background: var(--highlight);
        color: var(--text);
        border-color: var(--accent);
    }

    .badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        background: var(--accent);
        color: var(--text-accent);
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

    .contrast-value {
        font-size: 20px;
        font-weight: 700;
        color: var(--accent);
        margin-top: 5px;
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
    }

    .contrast-value2 {
        font-size: 22px;
        font-weight: 700;
        color: var(--accent);
    }

    .wcag-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .contrast-note {
        font-size: 11px;
        color: var(--text-muted);
        margin-top: 4px;
        font-style: italic;
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

    .contrast-surface-note {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 0.5rem;
    }

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
        color: var(--accent);
        margin-bottom: 0.25rem;
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

    /* Recommendation scale */
    .reco-scale-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .reco-scale-block {
        border: 1px solid var(--highlight);
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

    /* Threshold recommendation */
    .reco-none {
        font-size: 0.82rem;
        color: #ef4444;
        font-style: italic;
    }

    /* Export */
    .contrast-export-row {
        display: flex;
        gap: 0.75rem;
        margin: 1.25rem 0 0.5rem 0;
    }

    @media (max-width: 768px) {
        .demo-grid {
            grid-template-columns: 1fr;
        }
        
        .content {
            padding: 280px 20px 40px;
        }
    }
</style>