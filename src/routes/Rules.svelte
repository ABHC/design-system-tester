<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import { getContrastRatio, getWcagLevel } from "$lib/utils/contrast";
    import type { RequiredPair } from "$lib/utils/contrast";

    interface AccentVariant {
        name: string | undefined;
        color: string;
    }

    interface Props {
        trans: Translation | null;
        required_pairs: (RequiredPair & { priority: string; isAplat?: boolean })[];
        accent_variants: AccentVariant[];
        surface_map: Record<string, { label: string | undefined; color: string }>;
        text_accent: string;
        highlight_color: string;
    }

    let {
        trans,
        required_pairs,
        accent_variants,
        surface_map,
        text_accent,
        highlight_color,
    }: Props = $props();

    const rule_results = $derived(required_pairs.map(pair => {
        const variant = accent_variants[pair.variant_idx];
        const surface = surface_map[pair.surface_key];
        if (!variant || !surface) return null;

        const target = pair.targetRatio ?? 4.5;
        const is_text_surface = pair.surface_key === 'text';
        const is_aplat = pair.isAplat ?? false;

        // For aplat rules: variant is the surface (aplat), surface_color is behind it
        // For text rules: variant is the foreground text
        // For text_surface: text_accent is foreground on variant background
        let fg: string, bg: string;
        if (is_aplat) {
            // Aplat distinction: variant color vs surface color (which is behind)
            fg = variant.color;
            bg = surface.color;
        } else if (is_text_surface) {
            fg = surface.color;
            bg = variant.color;
        } else {
            fg = variant.color;
            bg = surface.color;
        }

        const ratio = getContrastRatio(fg, bg);
        const passes = parseFloat(ratio) >= target;
        const wcag = getWcagLevel(ratio, 'normal');

        return {
            variant_name: variant.name,
            variant_color: variant.color,
            surface_label: surface.label,
            surface_color: surface.color,
            is_text_surface,
            is_aplat,
            fg,
            bg,
            ratio,
            target,
            passes,
            wcag,
            priority: pair.priority,
        };
    }).filter(Boolean));

    const mandatory = $derived(rule_results.filter(r => r!.priority === 'mandatory'));
    const satisfactory = $derived(rule_results.filter(r => r!.priority === 'satisfactory'));
    const all_pass = $derived(rule_results.every(r => r!.passes));
</script>

{#snippet ruleItem(rule: NonNullable<typeof rule_results[number]>)}
    <div class="rules-item" class:rules-item-fail={!rule.passes}>
        <div class="rules-swatch-row">
            {#if rule.is_aplat}
                <!-- Aplat swatch: nested rectangles (surface behind, variant on top) -->
                <div class="rules-swatch-surface">
                    <div class="swatch-surface-outer" style="background: {rule.bg};{
                        rule.bg === highlight_color ? ' border: 1px solid var(--card);' : ''
                    }">
                        <div class="swatch-surface-inner" style="background: {rule.fg};"></div>
                    </div>
                </div>
            {:else}
                <!-- Text swatch: "Aa" preview -->
                <div
                    class="rules-swatch"
                    style="background: {rule.bg}; color: {rule.fg};{
                        rule.bg === highlight_color ? ' border: 1px solid var(--card);' : ''
                    }"
                >Aa</div>
            {/if}
            <div class="rules-pair-info">
                <div class="rules-pair-label">{rule.variant_name}</div>
                <div class="rules-pair-surface">{rule.is_text_surface ? trans?.contrast.text_accent : rule.surface_label}</div>
            </div>
        </div>
        <div class="rules-ratio-row">
            <span class="rules-ratio">{rule.ratio}</span>
            <span class="rules-target">/ {rule.target}:1</span>
            <span class="wcag-badge" style="background: {rule.passes ? '#3d8a45' : '#ef4444'}; color: #ffffff;">
                {rule.passes ? 'Pass' : 'Fail'}
            </span>
        </div>
    </div>
{/snippet}

<div class="rules-container">
    {#if mandatory.length > 0}
        <div class="rules-group-label">
            <span class="rules-priority-dot" style="background: #ef4444;"></span>
            {trans?.contrast.suggest_mandatory}
        </div>
        <div class="rules-grid">
            {#each mandatory as rule}
                {#if rule}
                    {@render ruleItem(rule)}
                {/if}
            {/each}
        </div>
    {/if}

    {#if satisfactory.length > 0}
        <div class="rules-group-label">
            <span class="rules-priority-dot" style="background: #f59e0b;"></span>
            {trans?.contrast.suggest_satisfactory}
        </div>
        <div class="rules-grid">
            {#each satisfactory as rule}
                {#if rule}
                    {@render ruleItem(rule)}
                {/if}
            {/each}
        </div>
    {/if}

    {#if all_pass}
        <div class="rules-status rules-status-pass">{trans?.contrast.suggest_all_pass}</div>
    {/if}
</div>

<style>
    .rules-container {
        margin-top: 0.5rem;
        flex: 1;
    }

    .rules-status-pass {
        font-size: 0.82rem;
        color: #10b981;
        font-style: italic;
        margin-top: 0.75rem;
    }

    .rules-group-label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
        margin: 0.75rem 0 0.4rem 0;
    }

    .rules-priority-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .rules-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 0.5rem;
    }

    .rules-item {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        padding: 0.5rem;
        background: var(--highlight);
        border-radius: 6px;
        border-left: 3px solid #3d8a45;
    }

    .rules-item-fail {
        border-left-color: #ef4444;
    }

    .rules-swatch-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .rules-swatch {
        width: 2.4rem;
        height: 1.8rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.8rem;
        flex-shrink: 0;
    }

    .rules-swatch-surface {
        flex-shrink: 0;
    }

    .swatch-surface-outer {
        width: 2.4rem;
        height: 1.8rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .swatch-surface-inner {
        width: 1.2rem;
        height: 0.9rem;
        border-radius: 2px;
    }

    .rules-pair-info {
        min-width: 0;
    }

    .rules-pair-label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .rules-pair-surface {
        font-size: 0.68rem;
        color: var(--text-muted);
    }

    .rules-ratio-row {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    .rules-ratio {
        font-size: 1rem;
        font-weight: 700;
        color: var(--text);
    }

    .rules-target {
        font-size: 0.72rem;
        color: var(--text-muted);
    }

    .wcag-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 20px;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        margin-left: auto;
    }
</style>
