<script lang="ts">
    import type { ToneTheme } from "$lib/types/palettes";
    import { SwatchRow } from '@abhc/spektral-ui';
    import type { Swatch } from '@abhc/spektral-ui/dist/components/SwatchRow/swatchRow.config';
    import { blendColor } from '$lib/utils/contrast';

    const SEMANTIC_NAMES = ['accent', 'error', 'warning', 'success', 'info', 'neutral'] as const;
    const TONE_SUBTLE_ALPHA = 0.08;
    const TONE_SUBTLE_HOVER_ALPHA = 0.15;

    interface SwatchGroup {
        label: string;
        labelColor?: string;
        swatches: Swatch[];
    }

    interface Props {
        current_palette: ToneTheme;
        current_tokens: Record<string, string>;
        opposite_palette?: ToneTheme | null;
        opposite_tokens?: Record<string, string> | null;
    }

    let {
        current_palette,
        current_tokens,
        opposite_palette = null,
        opposite_tokens = null,
    }: Props = $props();

    function buildGroups(tk: Record<string, string>, cardHex: string): SwatchGroup[] {
        const groups: SwatchGroup[] = [];

        const toneSubtleBlended = blendColor(tk['--text'], cardHex, TONE_SUBTLE_ALPHA);
        const toneSubtleHoverBlended = blendColor(tk['--text'], cardHex, TONE_SUBTLE_HOVER_ALPHA);

        groups.push({
            label: 'Tone',
            swatches: [
                {
                    label: '--tone-ghost',
                    value: toneSubtleBlended,
                    bg: toneSubtleBlended,
                    color: tk['--text']
                },
                { 
                    label: '--tone-bg', 
                    value: tk['--tone-bg'], 
                    bg: tk['--tone-bg'], 
                    color: tk['--text'] 
                },
                { 
                    label: '--tone', 
                    value: tk['--tone'], 
                    bg: tk['--tone'], 
                    color: tk['--text'] 
                },
                { 
                    label: '--tone-hover', 
                    value: tk['--tone-hover'], 
                    bg: tk['--tone-hover'], 
                    color: tk['--text'] 
                },
                { 
                    label: '--tone-muted', 
                    value: tk['--tone-muted'], 
                    bg: tk['--tone-muted'], 
                    color: tk['--tone-bg'] 
                },
                { 
                    label: '--text', 
                    value: tk['--text'], 
                    bg: tk['--tone'], 
                    color: tk['--text'], 
                    isText: true 
                },
                { 
                    label: '--text-muted', 
                    value: tk['--text-muted'], 
                    bg: tk['--tone'], 
                    color: tk['--text-muted'], 
                    isText: true 
                },
            ],
        });

        for (const name of SEMANTIC_NAMES) {
            const ghostHoverRgba = tk[`--${name}-ghost-hover`];

            groups.push({
                label: name,
                labelColor: tk[`--${name}-muted`],
                swatches: [
                    { 
                        label: `--${name}-bg`, 
                        value: tk[`--${name}-bg`], 
                        bg: tk[`--${name}-bg`], 
                        color: tk[`--text`] 
                    },
                    { 
                        label: `--${name}`, 
                        value: tk[`--${name}`], 
                        bg: tk[`--${name}`], 
                        color: tk[`--text-${name}`] 
                    },
                    { 
                        label: `--${name}-hover`, 
                        value: tk[`--${name}-hover`], 
                        bg: tk[`--${name}-hover`], 
                        color: tk[`--text-${name}`] 
                    },
                    { 
                        label: `--${name}-muted`, 
                        value: tk[`--${name}-muted`], 
                        bg: tk[`--${name}-muted`], 
                        color: tk[`--text-${name}`] 
                    },
                    { 
                        label: `--text-${name}`, 
                        value: tk[`--text-${name}`], 
                        bg: tk[`--${name}`], 
                        color: tk[`--text-${name}`], 
                        isText: true 
                    },
                ],
            });
        }

        return groups;
    }

    const current_groups = $derived(buildGroups(current_tokens, current_palette.card));
    const opposite_groups = $derived.by((): SwatchGroup[] | null => {
        if (!opposite_tokens || !opposite_palette) return null;
        return buildGroups(opposite_tokens, opposite_palette.card);
    });

    interface InterleavedCell {
        group: SwatchGroup;
        palette_name: string;
    }

    const cells = $derived.by((): InterleavedCell[] => {
        const out: InterleavedCell[] = [];
        for (let i = 0; i < current_groups.length; i++) {
            out.push({ group: current_groups[i], palette_name: current_palette.name });
            if (opposite_groups && opposite_palette) {
                out.push({ group: opposite_groups[i], palette_name: opposite_palette.name });
            }
        }
        return out;
    });

    const has_opposite = $derived(opposite_groups !== null);
</script>

<div class="ts-grid" class:dual={has_opposite}>
    {#each cells as cell}
        <div class="ts-group">
            <div class="ts-group-header">
                <span
                    class="ts-group-label"
                    style={cell.group.labelColor ? `color: ${cell.group.labelColor};` : ''}
                >
                    {cell.group.label}
                </span>
                {#if has_opposite}
                    <span class="ts-group-palette">{cell.palette_name}</span>
                {/if}
            </div>
            <SwatchRow swatches={cell.group.swatches} />
        </div>
    {/each}
</div>

<style>
    .ts-grid {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .ts-grid.dual {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1.5rem;
        row-gap: 0.75rem;
    }

    .ts-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
    }

    .ts-group-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 2px;
    }

    .ts-group-label {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--text-muted);
    }

    .ts-group-palette {
        font-size: 0.6rem;
        font-weight: 600;
        color: var(--text-muted);
        opacity: 0.7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 1024px) {
        .ts-grid.dual {
            grid-template-columns: 1fr;
        }
    }
</style>
