<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import { simulateColorblind, type ColorblindType } from "$lib/utils/colorblind";

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

    const types: { key: ColorblindType | 'normal'; label: () => string | undefined; desc: () => string | undefined }[] = [
        { key: 'normal', label: () => trans?.colorblind.normal,      desc: () => trans?.colorblind.normal_desc },
        { key: 'protan', label: () => trans?.colorblind.protan,      desc: () => trans?.colorblind.protan_desc },
        { key: 'deutan', label: () => trans?.colorblind.deutan,      desc: () => trans?.colorblind.deutan_desc },
        { key: 'tritan', label: () => trans?.colorblind.tritan,      desc: () => trans?.colorblind.tritan_desc },
    ];

    function sim(hex: string, type: ColorblindType | 'normal'): string {
        return type === 'normal' ? hex : simulateColorblind(hex, type);
    }

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
            { name: 'Accent',  color: sim(selected_accent.accent, t.key) },
            { name: 'Dark',    color: sim(selected_accent.accent_dark, t.key) },
            { name: 'Darker',  color: sim(selected_accent.accent_darker, t.key) },
        ],
        preview: {
            bg: sim(selected_palette.bg, t.key),
            card: sim(selected_palette.card, t.key),
            high: sim(selected_palette.highlight, t.key),
            fg: sim(selected_accent.accent, t.key),
            text_accent: sim(selected_accent.text_accent, t.key),
        },
    })));
</script>

<div class="demo-section">
    <div class="section-title">{trans?.colorblind.title}</div>
    <div class="colorblind-info">
        <div class="colorblind-grid">
            {#each columns as col}
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
                        {#each col.accents as accent}
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
                        {#each col.accents as accent}
                            <span style="color: {accent.color}">Aa</span>
                        {/each}
                    </div>
                    <div
                        class="cb-preview"
                        style="background: {col.preview.card}; color: {col.preview.fg}; border: 1px solid var(--highlight);"
                    >
                        {#each col.accents as accent}
                            <span style="color: {accent.color}">Aa</span>
                        {/each}
                    </div>
                    <div
                        class="cb-preview"
                        style="background: {col.preview.high}; color: {col.preview.fg};"
                    >
                        {#each col.accents as accent}
                            <span style="color: {accent.color}">Aa</span>
                        {/each}
                    </div>
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
        justify-content: space-between;
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
