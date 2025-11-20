<script lang="ts">

    import type { ThemeConfig, AccentTheme, ToneTheme } from "$lib/types/palettes";
    import type { FontConfig } from '$lib/types/fonts';
    
    import { getFontFamilyValue } from "$lib/utils/fontLoader";
    import { onMount } from 'svelte';
    import palettes from "$lib/data/palettes.json" assert { type: 'json' };
    import stored_fonts from "$lib/data/fonts.json" assert { type: 'json' };

    let selected_tone = $state<'light' | 'dark'>('dark');
    let accent_index = $state(0);
    let tone_index = $state(0);
    let body_font_index = $state(0);
    let title_font_index = $state(1);

    // Derived data filtered according to display status
    let accent_palettes: AccentTheme[] = $derived(palettes.accent.filter(a => a.display));
    let tone_palettes: ToneTheme[] = $derived(palettes[selected_tone].filter(t => t.display));
    let available_fonts: FontConfig[]= $derived(stored_fonts.fonts.filter(f => f.display));
    
    let selected_accent: AccentTheme = $derived(accent_palettes[accent_index]);
    let selected_palette: ToneTheme = $derived(tone_palettes[tone_index]);
    let selected_body_font: FontConfig = $derived(available_fonts[body_font_index]);
    let selected_title_font: FontConfig = $derived(available_fonts[title_font_index]);

    // reactive constrast calculus
    let contrast_txt_bg = $derived(getContrastRatio(selected_palette.text, selected_palette.bg));
    let contrast_txt_card = $derived(getContrastRatio(selected_palette.text, selected_palette.card));
    let contrast_accent = $derived(getContrastRatio(selected_accent.accent, selected_accent.text_accent));
    let contrast_card_bg = $derived(getContrastRatio(selected_palette.card, selected_palette.bg));

    // reactive CSS variables
    const css_variables = $derived({
        '--bg': selected_palette.bg,
        '--card': selected_palette.card,
        '--highlight': selected_palette.highlight,
        '--text': selected_palette.text,
        '--text-muted': selected_palette.text_muted,
        '--accent': selected_accent.accent,
        '--accent-dark': selected_accent.accent_dark,
        '--accent-darker': selected_accent.accent_darker,
        '--accent-light': selected_accent.accent_light,
        '--accent-lighter': selected_accent.accent_lighter,
        '--text-accent': selected_accent.text_accent,
        '--font-body': selected_body_font.name,
        '--font-heading': selected_title_font.name
    });

    $effect(() => {
        for (const [key, value] of Object.entries(css_variables)) {
            document.documentElement.style.setProperty(key, value);
        }
    });

    function setTone(tone: "light" | "dark") {
        selected_tone = tone;
        tone_palettes = palettes[tone];
        tone_index = 0;
    }

    function hexToRgb(hex:string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function getLuminance(r:number, g:number, b:number) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function getContrastRatio(color1:string, color2:string) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        
        const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
        
        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);
        
        return ((lighter + 0.05) / (darker + 0.05)).toFixed(1);
    }

    // Initialize
    onMount(() => {
        setTone(selected_tone);
    });
</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design System Tester - Épinard</title>
    <!--<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">--> 
</head>

<body>
    <!-- Control Panel -->
    <div class="control-panel">
        <div class="controls-grid">

            <!-- Tone Controls -->
            <div class="control-group">
                <div class="control-label">Thème</div>
                <div class="btn-group">
                    <button class="control-btn" onclick={() => setTone("light")}>☀️ Clair</button>
                    <button class="control-btn active" onclick={() => setTone("dark")}>🌙 Sombre</button>
                </div>
            </div>
            
            <!-- Palette Controls -->
            <div class="control-group">
                <div class="control-label">Palette</div>
                <div class="btn-group">
                    {#each tone_palettes as palette, index}
                        <button 
                            class="control-btn {selected_palette.name === palette.name ? 'active' : ''}" 
                            onclick={() => accent_index = index}
                        >
                            {palette.name}
                        </button>
                    {/each}
                </div>
            </div>
            
            <!-- Body Fonts Controls -->
            <div class="control-group">
                <div class="control-label">Police Body</div>
                <div class="btn-group">
                    {#each available_fonts as font, index}
                        <button 
                            class="control-btn {selected_body_font.name === font.name ? 'active' : ''}" 
                            onclick={() => body_font_index = index}
                        >
                            {font.name}
                        </button>
                    {/each}
                </div>
            </div>
            
            <!-- Titles Fonts Controls -->
            <div class="control-group">
                <div class="control-label">Police Titres</div>
                <div class="btn-group">
                    {#each available_fonts as font, index}
                        <button 
                            class="control-btn {selected_title_font.name === font.name ? 'active' : ''}" 
                            onclick={() => title_font_index = index}
                        >
                            {font.name}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="content">
        <!-- Typography -->
        <div class="demo-section typography-demo">
            <div class="section-title">📝 Typographie</div>
            <h1>Heading 1 - Épinard Portfolio</h1>
            <h2>Heading 2 - Designer & Développeur</h2>
            <h3>Heading 3 - Projets récents</h3>
            <h4>Heading 4 - Compétences techniques</h4>
            <h5>Heading 5 - Technologies utilisées</h5>
            <h6>Heading 6 - Détails supplémentaires</h6>
            <p class="lead">Lead text - Introduction à mon travail et mes compétences en conception hardware et développement.</p>
            <p>Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>

        <!-- Color Swatches -->
        <div class="demo-section">
            <div class="section-title">🎨 Palette de couleurs</div>
            <div class="swatch-grid">
                <div class="swatch" id="swatch-bg" style="border: 2px solid var(--highlight);">
                    <div class="swatch-header">
                        <div class="swatch-label">Background</div>
                        <div class="swatch-var">--bg</div>
                    </div>
                    <div class="swatch-hex" id="hex-bg"></div>
                </div>
                <div class="swatch" id="swatch-card">
                    <div class="swatch-header">
                        <div class="swatch-label">Card</div>
                        <div class="swatch-var">--card</div>
                    </div>
                    <div class="swatch-hex" id="hex-card"></div>
                </div>
                <div class="swatch" id="swatch-highlight">
                    <div class="swatch-header">
                        <div class="swatch-label">Highlight</div>
                        <div class="swatch-var">--highlight</div>
                    </div>
                    <div class="swatch-hex" id="hex-highlight"></div>
                </div>
                <div class="swatch" style="background: var(--accent); color: var(--text-accent);">
                    <div class="swatch-header">
                        <div class="swatch-label">Accent</div>
                        <div class="swatch-var">--accent</div>
                    </div>
                    <div class="swatch-hex" style="background: rgba(255,255,255,0.2);">#10b981</div>
                </div>
                <div class="swatch" style="background: var(--accent-dark); color: var(--text-accent);">
                    <div class="swatch-header">
                        <div class="swatch-label">Accent Dark</div>
                        <div class="swatch-var">--accent-dark</div>
                    </div>
                    <div class="swatch-hex" style="background: rgba(255,255,255,0.2);">#059669</div>
                </div>
                <div class="swatch" style="background: var(--accent-darker); color: var(--text-accent);">
                    <div class="swatch-header">
                        <div class="swatch-label">Accent Darker</div>
                        <div class="swatch-var">--accent-darker</div>
                    </div>
                    <div class="swatch-hex" style="background: rgba(255,255,255,0.2);">#047857</div>
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="demo-section">
            <div class="section-title">🔘 Boutons</div>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <button class="button button-primary">Bouton primaire</button>
                <button class="button button-secondary">Bouton secondaire</button>
                <button class="button button-ghost">Bouton ghost</button>
                <span class="badge">Badge</span>
            </div>
        </div>

        <!-- Cards -->
        <div class="demo-section">
            <div class="section-title">🃏 Cartes</div>
            <div class="demo-grid">
                <div class="card">
                    <div class="card-title">Projet Hardware - IoT Sensor</div>
                    <div class="card-text">
                        Conception d'un capteur IoT pour la surveillance environnementale. 
                        Utilisation de FreeCAD et KiCAD pour la modélisation.
                    </div>
                    <div class="card-meta">
                        <span class="badge">Hardware</span>
                        <span style="margin-left: 10px;">2024</span>
                    </div>
                    <div style="margin-top: 15px;">
                        <button class="button button-primary">Voir le projet</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-title">Application Web - Dashboard</div>
                    <div class="card-text">
                        Développement d'un dashboard de monitoring en SvelteJS et TypeScript. 
                        Backend FastAPI avec Docker.
                    </div>
                    <div class="card-meta">
                        <span class="badge">Dev</span>
                        <span style="margin-left: 10px;">2024</span>
                    </div>
                    <div style="margin-top: 15px;">
                        <button class="button button-primary">Voir le projet</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-title">Open Source Contribution</div>
                    <div class="card-text">
                        Contributions à des projets libres de conception hardware et software. 
                        Engagement pour l'Open Source.
                    </div>
                    <div class="card-meta">
                        <span class="badge">OSS</span>
                        <span style="margin-left: 10px;">En cours</span>
                    </div>
                    <div style="margin-top: 15px;">
                        <button class="button button-secondary">Voir GitHub</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <div class="demo-section">
            <div class="section-title">🧭 Navigation</div>
            <div class="nav-demo">
                <div class="nav-item active">Accueil</div>
                <div class="nav-item">Projets</div>
                <div class="nav-item">Compétences</div>
                <div class="nav-item">À propos</div>
                <div class="nav-item">Contact</div>
            </div>
        </div>

        <!-- Forms -->
        <div class="demo-section">
            <div class="section-title">📋 Formulaires</div>
            <div class="card" style="max-width: 600px;">
                <div class="form-group">
                    <label class="form-label">Nom</label>
                    <input type="text" class="form-input" placeholder="Votre nom">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" placeholder="votre.email@exemple.fr">
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea class="form-input" rows="4" placeholder="Votre message"></textarea>
                </div>
                <button class="button button-primary">Envoyer</button>
            </div>
        </div>

        <!-- Alerts -->
        <div class="demo-section">
            <div class="section-title">⚠️ Alertes</div>
            <div class="alert alert-success">
                ✅ Votre message a été envoyé avec succès !
            </div>
            <div class="alert alert-info">
                ℹ️ Cette fonctionnalité est en développement sous Linux avec Docker.
            </div>
        </div>

        <!-- Contrast Info -->
        <div class="demo-section">
            <div class="section-title">📊 Informations de contraste</div>
            <div class="contrast-info">
                <p><strong>Ratios de contraste actuels (approximatifs) :</strong></p>
                <div class="contrast-grid">
                    <div class="contrast-item">
                        <div>Texte / Background</div>
                        <div class="contrast-value" id="contrast-text-bg">-
                            {contrast_txt_bg}:1
                        </div>
                    </div>
                    <div class="contrast-item">
                        <div>Texte / Card</div>
                        <div class="contrast-value" id="contrast-text-card">
                            {contrast_txt_card}:1
                        </div>
                    </div>
                    <div class="contrast-item">
                        <div>Accent / Text Accent</div>
                        <div class="contrast-value" id="contrast-accent">
                            {contrast_accent}:1
                        </div>
                    </div>
                    <div class="contrast-item">
                        <div>Card / Background</div>
                        <div class="contrast-value" id="contrast-card-bg">
                            {contrast_card_bg}:1
                        </div>
                    </div>
                </div>
                <p style="margin-top: 15px; font-size: 13px; color: var(--text-muted);">
                    ✅ WCAG AA requis: 4.5:1 pour texte normal, 3:1 pour texte large<br>
                    ✅ WCAG AAA requis: 7:1 pour texte normal, 4.5:1 pour texte large
                </p>
            </div>
        </div>
    </div>
</body>

<style>
    /* Default Palette: Balanced Spinach */
    :root {
        /* Accent */
        --accent: #10b981;
        --accent-dark: #059669;
        --accent-darker: #047857;
        --accent-light: #34d399;
        --accent-lighter: #64e6b4;
        --text-accent: #ffffff;

        /* Tone */
        --bg: #252825;
        --card: #1a1d1a;
        --highlight: #2f342f;
        --text: #f5f5f4;
        --text-muted: #a8a29e;

        /* Typography */
        --font-body: 'Inter', sans-serif;
        --font-heading: 'Space Grotesk', sans-serif;

        /* Overlay */
        --overlay: rgba(37, 40, 37, 0.45);
        --overlay-light: rgba(220, 217, 206, 0.75);
    }

    body {
        font-family: var(--font-body);
        background: var(--bg);
        color: var(--text);
        transition: background-color 0.3s, color 0.3s;
        font-size: 14px;
    }

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

    /* Control Panel */
    .control-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: var(--card);
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        border-bottom: 2px solid var(--highlight);
    }

    .controls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        max-width: 1400px;
        margin: 0 auto;
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

    /* Main Content */
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 180px 40px 40px;
    }

    /* Demo Sections */
    .demo-section {
        margin-bottom: 40px;
    }

    .section-title {
        font-size: 24px;
        font-weight: 700;
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
    }

    .form-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text);
    }

    .form-input {
        width: 100%;
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
        background: rgba(0,0,0,0.1);
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
        .controls-grid {
            grid-template-columns: 1fr;
        }
        
        .demo-grid {
            grid-template-columns: 1fr;
        }
        
        .content {
            padding: 280px 20px 40px;
        }
    }
</style>