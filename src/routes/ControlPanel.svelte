<script lang="ts">
    import type { AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { FontConfig } from "$lib/types/fonts";

    // Props
    interface Props {
        selected_tone: 'light' | 'dark';
        tone_palettes: ToneTheme[];
        accent_palettes: AccentTheme[];
        available_fonts: FontConfig[];
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
        selected_body_font: FontConfig;
        selected_title_font: FontConfig;
        on_tone_change: (tone: 'light' | 'dark') => void;
        on_tone_index_change: (index: number) => void;
        on_accent_index_change: (index: number) => void;
        on_body_font_change: (index: number) => void;
        on_title_font_change: (index: number) => void;
    }

    let {
        selected_tone,
        tone_palettes,
        accent_palettes,
        available_fonts,
        selected_palette,
        selected_accent,
        selected_body_font,
        selected_title_font,
        on_tone_change,
        on_tone_index_change,
        on_accent_index_change,
        on_body_font_change,
        on_title_font_change
    }: Props = $props();

    import { trans } from './store';
    import ItemsDisplay from "./ItemsDisplay.svelte";
</script>

<!-- Control Panel -->
<div class="control-panel">
    <div class="controls-grid">

        <!-- Tone Controls -->
        <div class="control-group">
            <div class="control-label">{$trans?.control.theme.toUpperCase()}</div>
            <div class="btn-group">
                <button 
                    class="control-btn {selected_tone === 'light' ? 'active' : ''}" 
                    onclick={() => on_tone_change("light")}
                >
                    {$trans?.control.light}
                </button>
                <button 
                    class="control-btn {selected_tone === 'dark' ? 'active' : ''}" 
                    onclick={() => on_tone_change("dark")}
                >
                    {$trans?.control.dark}
                </button>
            </div>
        </div>
        
        <!-- Palette Controls -->
        <div class="control-group">
            <div class="control-label">{$trans?.control.palette.toUpperCase()}</div>
            <ItemsDisplay
                items = {tone_palettes}
                selected = {selected_palette}
                on_item_change = {on_tone_index_change}
            />
        </div>

        <!-- Accent Controls -->
        <div class="control-group">
            <div class="control-label">{$trans?.control.accent.toUpperCase()}</div>
            <ItemsDisplay
                items = {accent_palettes}
                selected = {selected_accent}
                on_item_change = {on_accent_index_change}
            />
        </div>
        
        <!-- Body Fonts Controls -->
        <div class="control-group">
            <div class="control-label">{$trans?.control.font_body.toUpperCase()}</div>
            <ItemsDisplay
                items = {available_fonts}
                selected = {selected_body_font}
                on_item_change = {on_body_font_change}
            />
        </div>
        
        <!-- Titles Fonts Controls -->
        <div class="control-group">
            <div class="control-label">{$trans?.control.font_titles.toUpperCase()}</div>
            <ItemsDisplay
                items = {available_fonts}
                selected = {selected_title_font}
                on_item_change = {on_title_font_change}
            />
        </div>
    </div>
</div>

<style>
    /* Control Panel */
    .control-panel {
        position: fixed;
        top: 100px; 
        left: 0;
        right: 0;
        background: var(--card);
        padding: 20px 100px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 99; 
        border-bottom: 2px solid var(--accent-lighter);
        overflow-y: auto;
        max-height: calc(100vh - 100px);
    }

    .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        max-width: 1400px;
        margin: 0 auto;
        /*display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        gap: 20px;*/
    }

    .control-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .control-label {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
    }

    .btn-group {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .control-btn {
        padding: 8px 16px;
        border: 2px solid var(--accent);
        background: transparent;
        color: var(--text);
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
    }

    .control-btn:hover {
        background: var(--accent);
        color: var(--text-accent);
    }

    .control-btn.active {
        background: var(--accent);
        color: var(--text-accent);
    }

    @media (max-width: 768px) {
        .controls-grid {
            grid-template-columns: 1fr;
        }
    }
</style>