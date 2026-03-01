<script lang="ts">
    import type { AccentTheme, ToneTheme, ContextualColors } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Contrast from './Contrast.svelte';
    import Colorblind from './Colorblind.svelte';
    import BadgeDemo from "./BadgeDemo.svelte";
    import ButtonDemo from "./ButtonDemo.svelte";
    import NavDemo from "./NavDemo.svelte";
    import ListItemDemo from "./ListItemDemo.svelte";
    import SidebarDemo from "./SidebarDemo.svelte";
    import CodeBlockDemo from "./CodeBlockDemo.svelte";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
        light_palettes: ToneTheme[];
        dark_palettes: ToneTheme[];
        contextual_colors: ContextualColors;
    }

    let {
        trans,
        placeholders,
        selected_palette,
        selected_accent,
        light_palettes,
        dark_palettes,
        contextual_colors,
    }: Props = $props();

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
            <div
                class="swatch"
                style="background: var(--accent-lighter); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Lighter</div>
                    <div class="swatch-var">--accent-lighter</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_lighter}
                </div>
            </div>
            <div
                class="swatch"
                style="background: var(--accent-light); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Light</div>
                    <div class="swatch-var">--accent-light</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_light}
                </div>
            </div>
            <div
                class="swatch"
                style="background: var(--accent-dark); color: var(--text-accent);"
            >
                <div class="swatch-header">
                    <div class="swatch-label">Dark</div>
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
                    <div class="swatch-label">Darker</div>
                    <div class="swatch-var">--accent-darker</div>
                </div>
                <div class="swatch-hex">
                    {selected_accent.accent_darker}
                </div>
            </div>
        </div>
    </div>

    <!-- Buttons -->
    <ButtonDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Badges -->
    <BadgeDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- List Items -->
    <ListItemDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Navs -->
    <NavDemo 
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Sidebar -->
    <SidebarDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Code blocks -->
    <CodeBlockDemo
        trans={trans}
        placeholders={placeholders}
    />

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
        <div class="alert alert-info">
            {placeholders.alerts.info}
        </div>
        <div class="alert alert-success">
            {placeholders.alerts.success}
        </div>
        <div class="alert alert-warning">
            {placeholders.alerts.info}
        </div>
        <div class="alert alert-error">
            {placeholders.alerts.info}
        </div>
    </div>

    <!-- Detailed Contrast Info -->
    <Contrast {trans} {selected_palette} {selected_accent} {light_palettes} {dark_palettes} {contextual_colors} />

    <!-- Colorblind Simulation -->
    <Colorblind {trans} {selected_palette} {selected_accent} {contextual_colors} />
</div>

<style>
    /* Main Content */
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 40px 40px 40px;
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
    .btn-badge-demo {
        display: flex; 
        align-items: center;
        gap: 15px; 
        flex-wrap: wrap;
    }

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
        background: var(--accent-invert);
    }

    .button-secondary {
        background: transparent;
        color: var(--accent-more);
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

    .badge {
        display: inline-block;
        width: fit-content;
        padding: .35rem .75rem;
        background: var(--accent);
        color: var(--text-accent);
        border-radius: 12px;
        font-size: .75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
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
        background: var(--highlight);
        color: var(--text);
    }

    .alert-success {
        border-left: 4px solid var(--ctx-success);
    }

    .alert-info {
        border-left: 4px solid var(--ctx-info);
    }

    .alert-error {
        border-left: 4px solid var(--ctx-error);
    }

    .alert-warning {
        border-left: 4px solid var(--ctx-warning);
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
