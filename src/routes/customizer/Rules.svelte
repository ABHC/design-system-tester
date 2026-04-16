<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import { getContrastRatio, getWcagLevel } from "$lib/utils/contrast";
    import Badge from "../../design-system/components/Badge/Badge.svelte";

    export interface ContrastRule {
        label: string;
        sublabel: string;
        fg: string;
        bg: string;
        target: number;
        priority: 'mandatory' | 'satisfactory';
    }

    export interface RuleGroup {
        title: string;
        color?: string;
        rules: ContrastRule[];
    }

    interface Props {
        trans: Translation | null;
        groups: RuleGroup[];
    }

    let { trans, groups }: Props = $props();

    interface ComputedRule extends ContrastRule {
        ratio: string;
        passes: boolean;
        wcag: ReturnType<typeof getWcagLevel>;
    }

    interface ComputedGroup {
        title: string;
        color?: string;
        rules: ComputedRule[];
        all_pass: boolean;
    }

    const computed_groups: ComputedGroup[] = $derived(
        groups.map(g => {
            const all_rules = g.rules.map(r => {
                const ratio = getContrastRatio(r.fg, r.bg);
                const passes = parseFloat(ratio) >= r.target;
                const wcag = getWcagLevel(ratio, 'normal');
                return { ...r, ratio, passes, wcag };
            });
            const failed_rules = all_rules.filter(r => !r.passes);
            return { ...g, rules: failed_rules, all_pass: failed_rules.length === 0 };
        })
    );

    const all_pass = $derived(computed_groups.every(g => g.all_pass));
</script>

<div class="rules-container">
    {#each computed_groups.filter(g => !g.all_pass) as group}
        <div class="rules-group">
            <div class="rules-group-label">
                {#if group.color}
                    <span class="rules-priority-dot" style="background: {group.color};"></span>
                {/if}
                {group.title}
            </div>
            <div class="rules-grid">
                {#each group.rules as rule}
                    <div class="rules-item" class:rules-item-fail={!rule.passes}>
                        <div class="rules-swatch-row">
                            <div
                                class="rules-swatch"
                                style="background: {rule.bg}; color: {rule.fg};"
                            >Aa</div>
                            <div class="rules-pair-info">
                                <div class="rules-pair-label">{rule.label}</div>
                                <div class="rules-pair-surface">{rule.sublabel}</div>
                            </div>
                        </div>
                        <div class="rules-ratio-row">
                            <div class="rules-ratio-block">
                                <span class="rules-ratio">{rule.ratio}</span>
                                <span class="rules-target">/ {rule.target}:1</span>
                            </div>
                            {#if !rule.passes}
                                <Badge
                                    variant="flat"
                                    palette="error"
                                    size="sm"
                                    pill={true}
                                >
                                    {rule.passes ? 'Pass' : 'Fail'}
                                </Badge>
                            {/if}
                            <!--<span
                                class="wcag-badge"
                                style="background: {
                                    rule.passes ? 'var(--success)' : 
                                    'var(--error)'}; color: {rule.passes ? 
                                    'var(--text-success)' : 'var(--text-error)'
                                };"
                            >
                                {rule.passes ? 'Pass' : 'Fail'}
                            </span>-->
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}

    {#if all_pass}
        <div class="rules-status rules-status-pass">{trans?.contrast.suggest_all_pass}</div>
    {/if}
</div>

<style>
    .rules-container {
        margin-top: 0.5rem;
        flex: 0.5;
    }

    .rules-group {
        margin-bottom: 0.75rem;
    }

    .rules-status-pass {
        font-size: 0.82rem;
        color: var(--success);
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
        grid-template-columns: repeat(2, minmax(220px, 1fr));
        gap: 0.5rem;
    }

    .rules-item {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        padding: 0.5rem;
        background: var(--tone-hover);
        border-left: 3px solid var(--success);
    }

    .rules-item-fail {
        border-left-color: var(--error);
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
        justify-content: space-between;
    }

    .rules-ratio {
        font-size: 1rem;
        font-weight: 700;
        color: var(--text);
    }

    .rules-ratio-block {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }


    .rules-target {
        font-size: 0.72rem;
        color: var(--text-muted);
    }
</style>
