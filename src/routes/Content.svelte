<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
        contrast_txt_bg: string;
        contrast_txt_card: string;
        contrast_accent: string;
        contrast_card_bg: string;
        contrast_high_bg: string;
        contrast_high_card: string;
    }

    let {
        trans,
        placeholders,
        contrast_txt_bg,
        contrast_txt_card,
        contrast_accent,
        contrast_card_bg,
        contrast_high_bg,
        contrast_high_card
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
                <div 
                    class="swatch-hex"
                    style="background: var(--overlay-dark);"
                >
                    var(--bg)
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
                <div 
                    class="swatch-hex"
                    style="background: var(--overlay-dark);"
                >
                    var(--card)
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
                <div 
                    class="swatch-hex"
                    style="background: var(--overlay-dark);"
                >
                    var(--highlight)
                </div>
            </div>
            <div class="swatch" style="background: var(--accent); color: var(--text-accent);">
                <div class="swatch-header">
                    <div class="swatch-label">Accent</div>
                    <div class="swatch-var">--accent</div>
                </div>
                <div 
                    class="swatch-hex" 
                    style="background: var(--overlay-light);"
                >
                    var(--accent)
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
                <div 
                    class="swatch-hex" 
                    style="background: var(--overlay-light);"
                >
                    var(--accent-dark)
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
                <div 
                    class="swatch-hex" 
                    style="background: var(--overlay-light);"
                >
                    var(--accent-darker)
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
                <div 
                    class="swatch-hex" 
                    style="background: var(--overlay-light);"
                >
                    var(--accent-light)
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
                <div 
                    class="swatch-hex" 
                    style="background: var(--overlay-light);"
                >
                    var(--accent-lighter)
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
                    <div class="contrast-value">{contrast_high_bg}:1</div>
                </div>
                <div class="contrast-item">
                    <div>{trans?.contrast.highlight} / {trans?.contrast.card}</div>
                    <div class="contrast-value">{contrast_high_card}:1</div>
                </div>
            </div>
            <p style="margin-top: 15px; font-size: 13px; color: var(--text-muted);">
                {trans?.contrast.required1}<br>
                {trans?.contrast.required2}
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
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        text-align: center;
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

    @media (max-width: 768px) {
        .demo-grid {
            grid-template-columns: 1fr;
        }
        
        .content {
            padding: 280px 20px 40px;
        }
    }
</style>