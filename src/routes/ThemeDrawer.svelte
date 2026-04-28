<script lang="ts">
    import { createRawSnippet } from 'svelte';
    import { Drawer, Button, ListItem } from '@abhc/spektral-ui';

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

    let font_role: 'body' | 'title' = $state('body');

    const swatches = (shades: string[]) => createRawSnippet(() => {
        const inner = shades.map(color =>
            `<span class="palette-swatch" style="background:${color}"></span>`
        ).join('');
        return {
            render: () => `<span class="palette-swatches">${inner}</span>`
        };
    });

    const font_sample = (family: string) => createRawSnippet(() => ({
        render: () => `<span style="font-family: '${family}', sans-serif;">${$trans?.control.font_preview}</span>`,
    }));
</script>

{#snippet drawer_header()}
    <div class="sb-head">
        {#if $drawer_menu != "theme"}
            <button
                class="sb-head-back"
                aria-label="{$trans?.aria.return}"
                onclick={() => { $drawer_menu = "theme";}}
            >
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
        {:else}
            <button
                class="sb-head-close"
                aria-label="{$trans?.aria.close}"
                onclick={() => { $drawer_open = false; $drawer_menu = null; }}
            >
                <span class="material-symbols-outlined">close</span>
            </button>
        {/if}
        <span class="sb-head-title">
            {
                $drawer_menu === "theme:tone" ? `${$trans?.control.tone}` :
                $drawer_menu === "theme:accent" ? `${$trans?.control.accent}` :
                $drawer_menu === "theme:text" ? `${$trans?.control.text}` :
                $drawer_menu === "theme:ctx" ? `${$trans?.control.ctx}` :
                $drawer_menu === "fonts" ? `${$trans?.control.fonts}` :
                `${$trans?.control.theme}`
            }
        </span>
    </div>
{/snippet}

<Drawer
    direction="left"
    palette="tone"
    width="300px"
    open={$drawer_open}
    leading={drawer_header}
    onclose={() => { $drawer_open = false; $drawer_menu = null; }}
>
    {#if $drawer_menu === "theme"}
        <div class="drawer-group drawer-group--column">
            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                onclick={() => { $drawer_menu = "theme:tone"; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">routine</span>
                </span>
                <span class="nav-label">{$trans?.control.tone}</span>
            </Button>

            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                onclick={() => { $drawer_menu = "theme:accent"; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">style</span>
                </span>
                <span class="nav-label">{$trans?.control.accent}</span>
            </Button>

            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                onclick={() => { $drawer_menu = "theme:ctx"; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">palette</span>
                </span>
                <span class="nav-label">{$trans?.control.ctx}</span>
            </Button>

            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                onclick={() => { $drawer_menu = "theme:text"; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">format_color_text</span>
                </span>
                <span class="nav-label">{$trans?.control.text}</span>
            </Button>

            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                onclick={() => { $drawer_menu = "fonts"; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">brand_family</span>
                </span>
                <span class="nav-label">{$trans?.control.fonts}</span>
            </Button>
        </div>

    {:else if $drawer_menu === "theme:tone"}
        <div class="drawer-group drawer-group--row">
            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                active={$selected_tone === 'light'}
                onclick={() => { $selected_tone = 'light'; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">light_mode</span>
                </span>
                <span class="nav-label">{$trans?.control.light}</span>
            </Button>

            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                active={$selected_tone === 'dark'}
                onclick={() => { $selected_tone = 'dark'; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">dark_mode</span>
                </span>
                <span class="nav-label">{$trans?.control.dark}</span>
            </Button>
        </div>

        <hr class="drawer-sep" />

        {#each $tone_palettes as p, i}
            <ListItem
                label={p.name}
                leading={swatches([p.bg, p.card])}
                active={i === $tone_index}
                onclick={() => { setToneIndex(i); }}
                palette="ghost"
                rounded
            >
                {p.bg} {p.card}
            </ListItem>
        {/each}

    {:else if $drawer_menu === "theme:accent"}
        {#each $accent_palettes as p, i}
            <ListItem
                label={p.name}
                leading={swatches([p.accent])}
                active={i === $accent_index}
                onclick={() => { $accent_index = i; }}
                palette="ghost"
                rounded
            >
                {p.accent}
            </ListItem>
        {/each}

    {:else if $drawer_menu === "theme:ctx"}
        {#each $ctx_colors as c, i}
            <ListItem
                label={c.name}
                leading={swatches([c.error, c.warning, c.success, c.info, c.neutral])}
                active={i === $ctx_index}
                onclick={() => { $ctx_index = i; }}
                palette="ghost"
                rounded
            >
                {c.error} {c.warning} {c.success} {c.info} {c.neutral}
            </ListItem>
        {/each}

    {:else if $drawer_menu === "theme:text"}
        {#each $text_palettes as t, i}
            <ListItem
                label={t.name}
                leading={swatches([t.light, t.dark])}
                active={i === $text_index}
                onclick={() => { $text_index = i; }}
                palette="ghost"
                rounded
            >
                {t.light} / {t.dark}
            </ListItem>
        {/each}

    {:else if $drawer_menu === "fonts"}
        <div class="drawer-group drawer-group--row">
            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                active={font_role === 'body'}
                onclick={() => { font_role = 'body'; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">text_format</span>
                </span>
                <span class="nav-label">{$trans?.control.font_body}</span>
            </Button>

            <Button
                variant="ghost"
                palette="tone"
                direction="row"
                active={font_role === 'title'}
                onclick={() => { font_role = 'title'; }}>
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">format_h1</span>
                </span>
                <span class="nav-label">{$trans?.control.font_titles}</span>
            </Button>
        </div>

        <hr class="drawer-sep" />

        {#each available_fonts as f, i}
            <ListItem
                label={f.family}
                active={font_role === 'body' ? i === $body_font_index : i === $title_font_index}
                onclick={() => {
                    if (font_role === 'body') $body_font_index = i;
                    else $title_font_index = i;
                }}
                palette="ghost"
                rounded
            >
                {@render font_sample(f.family)()}
            </ListItem>
        {/each}
    {/if}
</Drawer>

<style>
    :global(.sb-head) {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        font-family: var(--spk-font-heading);
    }

    :global(.sb-head-title) {
        font-weight: 700;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        flex: 1;
    }

    :global(.sb-head-back),
    :global(.sb-head-close) {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
        border-radius: 6px;
        padding: 4px;
        transition: background 0.15s;
        flex-shrink: 0;
    }

    :global(.sb-head-back:hover),
    :global(.sb-head-close:hover) {
        background: var(--drawer-item-hover-bg, rgba(128, 128, 128, 0.15));
    }

    :global(.drawer-group) {
        display: flex;
        gap: 6px;
    }

    :global(.drawer-group--column) {
        flex-direction: column;
    }

    :global(.drawer-group--column) :global(.btn-ghost) {
        width: 100%;
        justify-content: flex-start;
        gap: 0.6rem;
        padding: 0.5rem 0.75rem;
    }

    :global(.drawer-group--row) {
        flex-direction: row;
        flex-wrap: wrap;
    }

    :global(.drawer-group--row) :global(.btn-ghost) {
        flex: 1;
        justify-content: center;
        gap: 0.35rem;
        padding: 0.5rem 0.4rem;
    }

    :global(.drawer-group) :global(.nav-icon) {
        line-height: 1;
    }

    :global(.drawer-group) :global(.nav-label) {
        font-family: var(--spk-font-heading);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        line-height: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    :global(.drawer-sep) {
        border: none;
        border-top: 2px solid var(--drawer-separator, rgba(128, 128, 128, 0.2));
        margin: 0.15rem 0;
    }

    :global(.palette-swatches) {
        display: inline-flex;
        gap: 3px;
        align-items: center;
    }

    :global(.palette-swatch) {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 20%;
        flex-shrink: 0;
        border: 2px solid var(--spk-text-muted);
    }
</style>
