<script lang="ts">
    import { createRawSnippet } from 'svelte';
    import Popover from '../design-system/components/Popover/Popover.svelte';
    import Button from '../design-system/components/Button/Button.svelte';
    import ListItem from '../design-system/components/ListItem/ListItem.svelte';
    import Headline from '../design-system/components/Headline/Headline.svelte';
    import Select from '../design-system/components/Select/Select.svelte';

    import {
        trans,
        selected_tone,
        tone_index,
        setToneIndex,
        accent_index,
        text_index,
        ctx_index,
        body_font_index,
        title_font_index,
        tone_palettes,
        accent_palettes,
        text_palettes,
        ctx_colors,
        available_fonts,
        drawer_open,
        drawer_menu,
    } from './store';

    let style_open: boolean = $state(false);

    const swatches_sm = (shades: string[]) => createRawSnippet(() => {
        const inner = shades.map(color =>
            `<span class="palette-swatch-sm" style="background:${color}"></span>`
        ).join('');
        return {
            render: () => `<span class="palette-swatches-sm">${inner}</span>`
        };
    });
</script>

<Popover
    bind:open={style_open}
    onclose={() => { style_open = false; }}
    palette="tone"
    rounded={false}
    maxHeight="800px"
    gap="18px"
    direction="bottom"
    align="end"
>
    {#snippet trigger()}
        <Button
            variant="ghost"
            palette="tone"
            direction="row"
            size="sm"
            aria_label={$trans?.control.theme}
            onclick={() => { style_open = !style_open; }}
        >
            <span class="style-pop-select" aria-hidden="true">
                <span class="material-symbols-outlined">style</span>
            </span>
        </Button>
    {/snippet}

    {#snippet children()}
        <div class="pop-styling-menu">
            <div class="pop-styling-row">
                <div class="pop-row-left">
                    <Button
                        size="sm"
                        variant="ghost"
                        palette="tone"
                        direction="row"
                        active={$selected_tone === 'light'}
                        onclick={() => { $selected_tone = 'light'; }}
                    >
                        <span class="nav-icon" aria-hidden="true">
                            <span class="material-symbols-outlined sm-icon">
                                light_mode
                            </span>
                        </span>
                        <span class="nav-label">{$trans?.control.light}</span>
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        palette="tone"
                        direction="row"
                        active={$selected_tone === 'dark'}
                        onclick={() => { $selected_tone = 'dark'; }}
                    >
                        <span class="nav-icon" aria-hidden="true">
                            <span class="material-symbols-outlined sm-icon">
                                dark_mode
                            </span>
                        </span>
                        <span class="nav-label">{$trans?.control.dark}</span>
                    </Button>
                </div>

                <div class="pop-row-left">
                    <Button
                        size="sm"
                        variant="ghost"
                        palette="tone"
                        direction="row"
                        onclick={() => {
                            $drawer_menu = "theme";
                            $drawer_open = true;
                            style_open = false;
                        }}
                    >
                        <span class="nav-label">{$trans?.control.bigger}</span>
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        palette="tone"
                        direction="row"
                        onclick={() => { style_open = false; }}
                    >
                        <span class="nav-icon" aria-hidden="true">
                            <span class="material-symbols-outlined sm-icon">
                                close
                            </span>
                        </span>
                    </Button>
                </div>
            </div>

            <Headline size="xs" uppercase>{$trans?.control.tone}</Headline>
            <div class="pop-styling-grid">
                {#each $tone_palettes as p, i}
                    <ListItem
                        label={p.name}
                        active={i === $tone_index}
                        onclick={() => { setToneIndex(i); }}
                        palette="ghost"
                        size="sm"
                    >
                        {@render swatches_sm([p.bg, p.card])()}
                    </ListItem>
                {/each}
            </div>

            <Headline size="xs" uppercase>{$trans?.control.accent}</Headline>
            <div class="pop-styling-grid">
                {#each $accent_palettes as p, i}
                    <ListItem
                        label={p.name}
                        active={i === $accent_index}
                        onclick={() => { $accent_index = i; }}
                        palette="ghost"
                        size="sm"
                    >
                        {@render swatches_sm([p.accent])()}
                    </ListItem>
                {/each}
            </div>

            <Headline size="xs" uppercase>{$trans?.control.ctx}</Headline>
            <div class="pop-styling-grid">
                {#each $ctx_colors as c, i}
                    <ListItem
                        label={c.name}
                        active={i === $ctx_index}
                        onclick={() => { $ctx_index = i; }}
                        palette="ghost"
                        size="sm"
                    >
                        {@render swatches_sm(
                            [c.error, c.warning, c.success, c.info, c.neutral])()
                        }
                    </ListItem>
                {/each}
            </div>

            <Headline size="xs" uppercase>{$trans?.control.text}</Headline>
            <div class="pop-styling-grid">
                {#each $text_palettes as t, i}
                    <ListItem
                        label={t.name}
                        active={i === $text_index}
                        onclick={() => { $text_index = i; }}
                        palette="ghost"
                        size="sm"
                    >
                        {@render swatches_sm([t.light, t.dark])()}
                    </ListItem>
                {/each}
            </div>

            <Headline size="xs" uppercase>{$trans?.control.fonts}</Headline>
            <div class="pop-styling-row">
                <Select
                    bind:value={$title_font_index}
                    options={available_fonts.map((f, i) => ({ value: i, label: f.family }))}
                    size="sm"
                    palette="tone"
                    label={$trans?.control.font_titles}
                    placeholder=""
                    direction="top"
                />
                <Select
                    bind:value={$body_font_index}
                    options={available_fonts.map((f, i) => ({ value: i, label: f.family }))}
                    size="sm"
                    palette="tone"
                    label={$trans?.control.font_body}
                    placeholder=""
                    direction="top"
                />
            </div>
        </div>
    {/snippet}
</Popover>

<style>
    .pop-styling-menu {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 10px;
    }

    .pop-styling-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
    }

    .pop-row-left {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .pop-styling-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
    }

    .sm-icon {
        font-size: 16px;
    }

    :global(.palette-swatches-sm) {
        display: inline-flex;
        gap: 3px;
        align-items: center;
    }

    :global(.palette-swatch-sm) {
        display: inline-block;
        width: 10px;
        height: 10px;
        flex-shrink: 0;
    }
</style>
