import type { Locale } from "$lib/types/translations";

export const translations = {
    fr: {
        language_name: "Français",

        // Layout -----------------------------------------------------------

        header: {
            project: "Spektral UI",
        },
        nav: {
            title: "Nav",
            code: "position='fixed'",
            fixed: "recouvre la fenêtre d'affichage réelle - la preview utilise floating pour ne pas casser le layout",
            home: "Spektral",
            docs: "Docs",
            customizer: "Personnaliser",
        },
        footer: {
            license: "Publié sous licence GNU GPLv3",
            git_btn: "Github",
            linked_in_btn: "LinkedIn",
            copied: "Copié !",
            clipboard: "L'adresse e-mail a été copiée dans votre presse-papier",
        },
        aria: {
            return: "Retour",
            close: "Fermer",
            back_to_top: "Retour en haut de page",
            language: "Langue",
        },
        doc: {
            title: "Sur cette page",
            demo: "Demo",
            usage: "Usage",
            api: "API",
            filter: "Filtrer...",
            avatar_dots: "Statut",
            avatar_clickable: "Interactif",
            back_to_top: "BackToTop",
            ModeToggle: "ModeToggle",
            CopyButton: "CopyButton",
            states: "États",
            swatches: "Swatches",
        },

        // Landing page -----------------------------------------------------

        welcome: {
            cat_layout: "layout",
            cat_controls: "contrôles",
            cat_overlays: "overlays",
            cat_feedback: "feedback",
            cat_content: "contenu",
        },
        hero: {
            headline: "Spektral UI",
            subtitle: "Un design system thématique construit avec Svelte 5. Composez, personnalisez et testez vos interfaces en temps réel.",
            badge_1: "Svelte 5",
            badge_2: "Thématique",
            cta_docs: "Documentation",
            cta_customizer: "Personnaliser",
        },
        stats: {
            components_count: "30+",
            components_label: "composants",
            modes_count: "2 modes",
            modes_label: "clair & sombre",
            patterns_count: "10 patterns art déco",
            patterns_label: "Pour ajouter du style à vos webapps",
        },
        features: {
            f1_title: "Zéro dépendance",
            f1_desc: "Chaque composant repose uniquement sur du HTML, du CSS et Svelte 5, du composant jusqu'au rendu.",
            f2_title: "Composable par snippets",
            f2_desc: "Certains composants exposent des snippets. Adaptez les composants à votre usage en injectant dans les snippets vos contenus... ou d'autres composants !",
            f4_title: "Objectif WCAG AA",
            f4_desc: "Créer vos palettes de couleurs accessibles sur la page de personnalisation. L'outil vérifie les contrastes, propose de meilleures nuances et simule le daltonisme.",
        },
        quickstart: {
            title: "En 3 étapes",
            step_1_label: "Installez le package",
            step_1_desc: "Ajoutez Spektral UI à votre projet Svelte existant. Aucune configuration requise.",
            step_2_label: "Importez vos composants",
            step_2_desc: "Chaque composant est un import direct. Prenez ce dont vous avez besoin, laissez le reste.",
            step_3_label: "Composez avec des snippets",
            step_3_desc: "Les snippets Svelte 5 vous donnent le contrôle total sur chaque zone du composant.",
            cta: "Lire la documentation",
        },

        // Theme controls ---------------------------------------------------

        control: {
            light: "Clair",
            dark: "Sombre",
            theme: "Thème",
            tone: "Teinte",
            accent: "Couleur d'accent",
            ctx: "Couleurs contextuelles",
            text: "Palette texte",
            fonts: "Polices",
            font_body: "Corps de texte",
            font_titles: "Titres",
            font_preview: "Philippe ! Je sais où tu te caches !",
            settings: "Options",
            bigger: "Voir en grand",
        },
        palette: {
            title: "Palette de couleurs",
        },
        palette_creator: {
            title: "Palettes customisées",
            tone_bg: "Ton (fond)",
            tone_base: "Ton (base)",
            accent: "Accent",
            ctx: "Contextuelles",
            text: "Texte",
            light_text: "Texte clair",
            dark_text: "Texte sombre",
            slot_hint: "Chaque slot stocke une palette custom par catégorie (ton, accent, ctx, texte). Sauvegarder écrase le slot sélectionné.",
        },

        // Structure demos --------------------------------------------------

        header_demo: {
            title: "Header",
            layout: "Structure",
            preset_editorial: `<strong>Editorial</strong> — <code>leading</code> wordmark, <code>following</code> liens texte + CTA primaire. Palette <code>tone</code> ou <code>accent</code>.`,
            preset_app: `<strong>App</strong> — <code>leading</code> logo, <code>following</code> <code>Button variant="ghost" palette="tone" squared</code> icône seule. La palette est inversée par rapport au Header pour un contraste optimal.`,
            preset_mixed: `<strong>Mixed</strong> — <code>leading</code> logo, <code>children</code> liens de navigation centrés (slot default), <code>following</code> icône + CTA.`,
            bind_visible: `<code>bind:visible</code> — le Header observe lui-même sa visibilité dans le viewport et expose un booléen bindable. Simulation ci-dessous (en prod : déclenché par le scroll).`,
        },
        footer_demo: {
            title: "Footer",
            layout: "Structure",
            preset_social: `<strong>Social</strong> — <code>leading</code> icônes de réseaux sociaux, <code>following</code> mention légale. Correspond au footer par défaut du layout.`,
            preset_minimal: `<strong>Minimal</strong> — contenu centré via le slot <code>children</code> (slot default). Idéal pour un footer discret.`,
            preset_brand: `<strong>Brand</strong> — <code>leading</code> logo, <code>children</code> liens de navigation centrés, <code>following</code> mention légale.`,
        },
        drawer_demo: {
            title: "Drawer",
        },
        tile_grid_demo: {
            title: "TileGrid",
            id_note_title: "Rôle de l'identifiant (id)",
            id_note: "Chaque tuile peut recevoir un id optionnel. Quand il est renseigné, la tuile devient un lien vers {href_base}/{id} — survol SvelteKit et curseur pointer activés. Sans id, la tuile reste un bloc purement décoratif : aucun lien, curseur neutre.",
            ctrl_mode: "Mode",
            ctrl_position: "Position",
            ctrl_columns: "Colonnes",
            ctrl_hero_span: "Empan héro",
            ctrl_hero_badge: "Badge héro",
            ctrl_rounded: "Arrondi",
            code_desc: "TileGrid affiche une collection de projets en grille responsive.\n\n**Breakpoints**\n1 colonne mobile\n2 colonnes tablette\n`columns` colonnes desktop\n\n**image_mode**\n`image` — fond CSS plein cadre, dégradé overlay au survol\n`flat` — carte plate sur fond `--card`\n`mock-up` — image flottante ancrée à un coin ou bord via `image_position`\n\n**Position image**\nImage : valeur CSS bg-position (`center`, `top`…)\nMock-up : ancre du coin (`top-right`, `right`…)\n`image_size` contrôle la taille en mode mock-up.\n\n**Tuile héro**\n`hero: true` étend la tuile.\n`hero_span=\"half\"` → 2 colonnes\n`hero_span=\"full\"` → rangée entière\n`hero_text` → texte du badge\n`hero_icon` → icône du badge\n\n**Autres props**\n`show_hero_badge` — badge sur le héro\n`show_hero_border` — bordure accent\n`excerpt_length` — troncature de l'abstract sur les tuiles normales\n`rounded` — coins arrondis\n`locale` — langue de l'abstract",
            tab_image: "Image",
            tab_flat: "Flat",
            tab_mockup: "Mock-up",
            tab_hero_full: "Héro plein",
        },
        hero_demo: {
            title: "Hero",
        },
        selector_demo: {
            title: "Selector",
        },
        control_bar_demo: {
            title: "ControlBar",
        },

        // Component demos --------------------------------------------------

        button_demo: {
            title: "Button",
            back_to_top1: "Boutons spéciaux",
            back_to_top2: "Au clic font remonter l'utilisateur en haut de la page",
            copy_button_desc1: "Bouton de copie dans le presse-papier",
            copy_button_desc2: "Au clic, copie la valeur de to_copy. L'icône se transforme en coche pendant 2 secondes.",
        },
        badge_demo: {
            title: "Badge",
            trailing: "Trailing icon — Utile pour créer des filtres — ",
            link: "Lien intégré au badge — ",
            multiple: "BadgeGroup — sélection multiple ou unique",
        },
        avatar_demo: {
            title: "Avatar",
            sect_status: "Status dots — <code>do-not-disturb</code> utilise un double border",
            sect_interactive: "Interactif — <code>onclick</code> réservé pour un flyout ou une modale",
            status_online: "online",
            status_offline: "offline",
            status_absent: "absent",
            status_dnd: "do-not-disturb",
            click: "click",
        },
        modal_demo: {
            title: "Modal",
            btn_open_tone: "Supprimer un fichier",
            btn_open_accent: "Nouvelle annonce",
            btn_open_compose: "Profil utilisateur",
            btn_open_wide: "Conditions d'utilisation",
        },
        card_demo: {
            title: "Card",
        },
        list_item_demo: {
            title: "ListItem",
        },
        alert_demo: {
            title: "Alert",
            trigger: "Cliquez un bouton pour déclencher la notification correspondante. Elles s'empilent — recliquez plusieurs fois.",
        },
        callout_demo: {
            title: "Callout",
        },
        progress_demo: {
            title: "Progress",
        },
        input_demo: {
            title: "Input",
            lbl_size: "Taille",
            sect_states: "États",
            lbl_normal: "Normal",
            lbl_hint: "Avec aide",
            lbl_error: "Erreur",
            lbl_success: "Succès",
            lbl_disabled: "Désactivé",
            lbl_readonly: "Lecture seule",
            lbl_leading: "Icône gauche",
            lbl_trailing: "Icône droite",
        },
        textarea_demo: {
            title: "Textarea",
            lbl_size: "Taille",
            sect_states: "États",
            lbl_normal: "Normal",
            lbl_hint: "Avec aide",
            lbl_error: "Erreur",
            lbl_success: "Succès",
            lbl_disabled: "Désactivé",
        },
        radio_demo: {
            title: "RadioGroup",
            lbl_palette: "Palette",
            lbl_size: "Taille",
            lbl_label_position: "Position du label",
            sect_states: "États",
            lbl_enabled: "Activé",
            lbl_disabled: "Désactivé",
            lbl_individual: "Options individuelles désactivées",
        },
        checkbox_demo: {
            title: "Checkbox",
            lbl_palette: "Palette",
            lbl_size: "Taille",
            lbl_label_position: "Position du label",
            lbl_enabled: "Activé",
            lbl_disabled: "Désactivé",
            lbl_individual: "Options individuelles désactivées",
        },
        switch_demo: {
            title: "Switch",
            lbl_palette: "Palette",
            lbl_size: "Taille",
            lbl_circle: "Circle",
            lbl_on_bg: "Sur fond neutre (--bg / --card)",
            lbl_on_accent: "Sur fond accent",
            lbl_enabled: "Activé",
            lbl_disabled: "Désactivé",
        },
        search_field_demo: {
            title: "SearchField",
        },
        select_demo: {
            title: "Select",
        },
        popover_demo: {
            title: "Popover",
            anchor_note: "L'élément d'ancrage (bouton, input…) doit être placé dans le snippet <code>trigger</code>. Le panneau s'ouvre alors relativement à cet élément. <code>direction</code> définit le côté d'ouverture (top, bottom, left, right) et <code>align</code> l'alignement sur l'axe transversal (start, center, end). Le positionnement est en CSS absolu — il ne se recalcule pas au scroll.",
        },
        command_demo: {
            title: "Command",
        },
        code_block_demo: {
            title: "CodeBlock",
            mini_label: 'Mini — <code>width="fit-content"</code> pour les commandes inline',
        },
        accordion_demo: {
            title: "Accordion",
        },
        slider_demo: {
            title: "Slider",
        },
        marquee_demo: {
            title: "Marquee",
        },
        timeline_demo: {
            title: "Timeline",
        },
        data_table_demo: {
            title: "DataTable",
        },
        explorer_demo: {
            title: "Explorer",
        },
        color_picker_demo: {
            title: "ColorPicker",
        },
        swatch_row_demo: {
            title: "SwatchRow",
        },
        support_demo: {
            title: "Support",
        },
        headline_demo: {
            title: "Headline",
        },

        // Customizer -------------------------------------------------------

        contrast: {
            title: "Informations de contraste",
            text: "Texte",
            accent: "Accent",
            text_muted_label: "Texte atténué",
            cat_text: "Lisibilité du texte principal",
            cat_surfaces: "Séparation des surfaces",
            cat_accent: "Couleurs d'accent",
            cat_contextual: "Couleurs contextuelles",
            cat_semantic: "Couleurs sémantiques",
            surface_badge: "Surface",
            surface_note: "Contraste de distinction visuelle — seuils WCAG non applicables",
            semantic_note: "hover et muted sont calculés par thème : hover ajuste la luminosité OKLCH vers le contraste (+ clair sur fond sombre, + foncé sur fond clair), muted cible 5.5:1 contre card avec chroma réduite à 80%.",
            results_title: "Résultats des tests",
            suggest_title: "Ajustement",
            suggest_all_pass: "Toutes les combinaisons requises passent AA",
            export_theme: "Thème",
            export_accent: "Accent",
            opposite_none: "— Aucun —",
            ctx_error: "Erreur",
            ctx_warning: "Avertissement",
            ctx_success: "Succès",
            ctx_info: "Information",
            ctx_neutral: "Neutre",
        },
        colorblind: {
            title: "Simulation daltonisme",
            normal: "Normal",
            normal_desc: "Dans la limite des variations individuelles",
            protan: "Protanopie",
            protan_desc: "Pas de cônes rouges",
            deutan: "Deutéranopie",
            deutan_desc: "Pas de cônes verts",
            tritan: "Tritanopie",
            tritan_desc: "Pas de cônes bleus",
            surfaces: "Surfaces",
            score_aa: "paires AA",
            score_aa_large: "paires AA Large",
            score_changes: "Changements",
            score_no_change: "Aucun changement",
            score_on: "sur",
        },
    },

    en: {
        language_name: "English",

        // Layout -----------------------------------------------------------

        header: {
            project: "Styleguide",
        },
        nav: {
            title: "Nav",
            code: "position='fixed'",
            fixed: "overlays the real viewport - preview uses floating for layout safety",
            home: "Spektral",
            docs: "Docs",
            customizer: "Customizer",
        },
        footer: {
            license: "Published under GNU GPLv3 license",
            git_btn: "Github",
            linked_in_btn: "LinkedIn",
            copied: "Copied !",
            clipboard: "The email address has been copied to your clipboard.",
        },
        aria: {
            return: "Return",
            close: "Close",
            back_to_top: "Back to top",
            language: "Language",
        },
        doc: {
            title: "On this page",
            demo: "Demo",
            usage: "Usage",
            api: "API",
            filter: "Filter...",
            avatar_dots: "Status dots",
            avatar_clickable: "Interactive",
            back_to_top: "BackToTop",
            ModeToggle: "ModeToggle",
            CopyButton: "CopyButton",
            states: "States",
            swatches: "Swatches",
        },

        // Landing page -----------------------------------------------------

        welcome: {
            cat_layout: "layout",
            cat_controls: "controls",
            cat_overlays: "overlays",
            cat_feedback: "feedback",
            cat_content: "content",
        },
        hero: {
            headline: "Spektral UI",
            subtitle: "A themeable design system built with Svelte 5. Compose, customize and test your interfaces in real time.",
            badge_1: "Svelte 5",
            badge_2: "Themeable",
            cta_docs: "Documentation",
            cta_customizer: "Customize",
        },
        stats: {
            components_count: "30+",
            components_label: "components",
            modes_count: "2 modes",
            modes_label: "light & dark",
            patterns_count: "10 art deco patterns",
            patterns_label: "To add style to your web apps",
        },
        features: {
            f1_title: "Zero dependencies",
            f1_desc: "Each component relies solely on HTML, CSS, and Svelte 5, from component to rendering.",
            f2_title: "Composable via snippets",
            f2_desc: "Some components expose snippets. Adapt the components to your needs by injecting, in the snippets, your content... or other components !",
            f4_title: "WCAG AA target",
            f4_desc: "Create your accessible color palettes on the customization page. The tool checks contrasts, suggests better shades, and simulates color blindness.",
        },
        quickstart: {
            title: "Up in 3 steps",
            step_1_label: "Install the package",
            step_1_desc: "Add Spektral UI to your existing Svelte project. No configuration required.",
            step_2_label: "Import your components",
            step_2_desc: "Every component is a direct import. Take what you need, leave the rest.",
            step_3_label: "Compose with snippets",
            step_3_desc: "Svelte 5 snippets give you full control over every zone of each component.",
            cta: "Read the documentation",
        },

        // Theme controls ---------------------------------------------------

        control: {
            light: "Light",
            dark: "Dark",
            theme: "Theme",
            tone: "Tone",
            accent: "Accent Color",
            ctx: "Contextual colors",
            text: "Text Palette",
            fonts: "Fonts",
            font_body: "Body",
            font_titles: "Headings",
            font_preview: "The quick brown fox",
            settings: "Settings",
            bigger: "View larger",
        },
        palette: {
            title: "Color palette",
        },
        palette_creator: {
            title: "Custom palettes",
            tone_bg: "Tone (background)",
            tone_base: "Tone (base)",
            accent: "Accent",
            ctx: "Contextuals",
            text: "Text",
            light_text: "Light text",
            dark_text: "Dark text",
            slot_hint: "Each slot stores one custom palette per category (tone, accent, ctx, text). Saving overwrites the selected slot.",
        },

        // Structure demos --------------------------------------------------

        header_demo: {
            title: "Header",
            layout: "Layout",
            preset_editorial: `<strong>Editorial</strong> — <code>leading</code> wordmark, <code>following</code> text links + primary CTA. <code>tone</code> or <code>accent</code> palette.`,
            preset_app: `<strong>App</strong> — <code>leading</code> logo, <code>following</code> <code>Button variant="ghost" palette="tone" squared</code> icon-only. Palette is inverted relative to the Header for optimal contrast.`,
            preset_mixed: `<strong>Mixed</strong> — <code>leading</code> logo, <code>children</code> centred navigation links (default slot), <code>following</code> icon + CTA.`,
            bind_visible: `<code>bind:visible</code> — the Header observes its own viewport visibility and exposes a bindable boolean. Simulated below (in production: triggered by scroll).`,
        },
        footer_demo: {
            title: "Footer",
            layout: "Layout",
            preset_social: `<strong>Social</strong> — <code>leading</code> social network icons, <code>following</code> legal notice. Matches the default layout footer.`,
            preset_minimal: `<strong>Minimal</strong> — content centred via the <code>children</code> slot (default slot). Ideal for a discreet footer.`,
            preset_brand: `<strong>Brand</strong> — <code>leading</code> logo, <code>children</code> centred navigation links, <code>following</code> legal notice.`,
        },
        drawer_demo: {
            title: "Drawer",
        },
        tile_grid_demo: {
            title: "TileGrid",
            id_note_title: "Role of the identifier (id)",
            id_note: "Each tile can receive an optional id. When provided, the tile becomes a link to {href_base}/{id} — enabling SvelteKit preloading and a pointer cursor. Without id, the tile is a purely decorative block: no link, neutral cursor.",
            ctrl_mode: "Mode",
            ctrl_position: "Position",
            ctrl_columns: "Columns",
            ctrl_hero_span: "Hero span",
            ctrl_hero_badge: "Hero badge",
            ctrl_rounded: "Rounded",
            code_desc: "TileGrid renders a project collection as a responsive grid.\n\n**Breakpoints**\n1 column mobile\n2 columns tablet\n`columns` columns desktop\n\n**image_mode**\n`image` — full-frame CSS background with hover overlay gradient\n`flat` — flat card on `--card` surface\n`mock-up` — floating image anchored to a corner or edge via `image_position`\n\n**Image position**\nImage: CSS bg-position value (`center`, `top`…)\nMock-up: anchor point (`top-right`, `right`…)\n`image_size` controls the image dimension in mock-up mode.\n\n**Hero tile**\n`hero: true` extends the tile.\n`hero_span=\"half\"` → 2 columns\n`hero_span=\"full\"` → full row\n`hero_text` → badge label\n`hero_icon` → Material icon\n\n**Other props**\n`show_hero_badge` — badge on the hero\n`show_hero_border` — accent border\n`excerpt_length` — abstract truncation on normal tiles\n`rounded` — rounded corners\n`locale` — abstract language",
            tab_image: "Image",
            tab_flat: "Flat",
            tab_mockup: "Mock-up",
            tab_hero_full: "Full hero",
        },
        hero_demo: {
            title: "Hero",
        },
        selector_demo: {
            title: "Selector",
        },
        control_bar_demo: {
            title: "ControlBar",
        },

        // Component demos --------------------------------------------------

        button_demo: {
            title: "Button",
            back_to_top1: "Special buttons",
            back_to_top2: "Trigger a scroll to the top of the page when clicked",
            copy_button_desc1: "Standalone copy-to-clipboard button",
            copy_button_desc2: "Clicking copies the to_copy value. The icon switches to a checkmark for 2 seconds.",
        },
        badge_demo: {
            title: "Badge",
            trailing: "Trailing icon — Useful for create filters — ",
            link: "Integrated links to the badge — ",
            multiple: "BadgeGroup — multiple or single selection",
        },
        avatar_demo: {
            title: "Avatar",
            sect_status: "Status dots — <code>do-not-disturb</code> uses a double border",
            sect_interactive: "Interactive — <code>onclick</code> reserved for a flyout or modal",
            status_online: "online",
            status_offline: "offline",
            status_absent: "absent",
            status_dnd: "do-not-disturb",
            click: "click",
        },
        modal_demo: {
            title: "Modal",
            btn_open_tone: "Delete a file",
            btn_open_accent: "New announcement",
            btn_open_compose: "User profile",
            btn_open_wide: "Terms of use",
        },
        card_demo: {
            title: "Cards",
        },
        list_item_demo: {
            title: "List Items",
        },
        alert_demo: {
            title: "Alert",
            trigger: "Click a button to trigger the corresponding toast notification. They stack — click multiple times.",
        },
        callout_demo: {
            title: "Callout",
        },
        progress_demo: {
            title: "Progress",
        },
        input_demo: {
            title: "Input",
            lbl_size: "Size",
            sect_states: "States",
            lbl_normal: "Normal",
            lbl_hint: "Hint",
            lbl_error: "Error",
            lbl_success: "Success",
            lbl_disabled: "Disabled",
            lbl_readonly: "Readonly",
            lbl_leading: "Leading icon",
            lbl_trailing: "Trailing icon",
        },
        textarea_demo: {
            title: "Textarea",
            lbl_size: "Size",
            sect_states: "States",
            lbl_normal: "Normal",
            lbl_hint: "Hint",
            lbl_error: "Error",
            lbl_success: "Success",
            lbl_disabled: "Disabled",
        },
        radio_demo: {
            title: "RadioGroup",
            lbl_palette: "Palette",
            lbl_size: "Size",
            lbl_label_position: "Label position",
            sect_states: "States",
            lbl_enabled: "Enabled",
            lbl_disabled: "Disabled",
            lbl_individual: "Individual disabled options",
        },
        checkbox_demo: {
            title: "Checkbox",
            lbl_palette: "Palette",
            lbl_size: "Size",
            lbl_label_position: "Label position",
            lbl_enabled: "Enabled",
            lbl_disabled: "Disabled",
            lbl_individual: "Individual disabled options",
        },
        switch_demo: {
            title: "Switches",
            lbl_palette: "Palette",
            lbl_size: "Size",
            lbl_circle: "Circle",
            lbl_on_bg: "On neutral surface (--bg / --card)",
            lbl_on_accent: "On accent surface",
            lbl_enabled: "Enabled",
            lbl_disabled: "Disabled",
        },
        search_field_demo: {
            title: "SearchField",
        },
        select_demo: {
            title: "Select",
        },
        popover_demo: {
            title: "Popover",
            anchor_note: "The anchor element (button, input…) must be placed inside the <code>trigger</code> snippet. The panel then opens relative to that element. <code>direction</code> sets which side it opens on (top, bottom, left, right) and <code>align</code> controls cross-axis alignment (start, center, end). Positioning is CSS absolute — it does not reposition on scroll.",
        },
        command_demo: {
            title: "Command",
        },
        code_block_demo: {
            title: "Code blocks",
            mini_label: 'Mini — <code>width="fit-content"</code> for inline commands',
        },
        accordion_demo: {
            title: "Accordion",
        },
        slider_demo: {
            title: "Slider",
        },
        marquee_demo: {
            title: "Marquee",
        },
        timeline_demo: {
            title: "Timeline",
        },
        data_table_demo: {
            title: "DataTable",
        },
        explorer_demo: {
            title: "Explorer",
        },
        color_picker_demo: {
            title: "ColorPicker",
        },
        swatch_row_demo: {
            title: "SwatchRow",
        },
        support_demo: {
            title: "Support",
        },
        headline_demo: {
            title: "Headline",
        },

        // Customizer -------------------------------------------------------

        contrast: {
            title: "Contrast information",
            text: "Text",
            accent: "Accent",
            text_muted_label: "Text Muted",
            cat_text: "Main text readability",
            cat_surfaces: "Surface separation",
            cat_accent: "Accent colors",
            cat_contextual: "Contextual colors",
            cat_semantic: "Semantic colors",
            surface_badge: "Surface",
            surface_note: "Visual distinction contrast — WCAG thresholds do not apply",
            semantic_note: "hover and muted are computed per-theme: hover shifts OKLCH lightness toward contrast (lighter on dark bg, darker on light bg), muted targets 5.5:1 against card with chroma reduced to 80%.",
            results_title: "Tests results",
            suggest_title: "Adjustment",
            suggest_all_pass: "All required combinations pass AA",
            export_theme: "Theme",
            export_accent: "Accent",
            opposite_none: "— None —",
            ctx_error: "Error",
            ctx_warning: "Warning",
            ctx_success: "Success",
            ctx_info: "Info",
            ctx_neutral: "Neutral",
        },
        colorblind: {
            title: "Color blindness simulation",
            normal: "Normal",
            normal_desc: "Within the limits of individual variations",
            protan: "Protanopia",
            protan_desc: "No red cones",
            deutan: "Deuteranopia",
            deutan_desc: "No green cones",
            tritan: "Tritanopia",
            tritan_desc: "No blue cones",
            surfaces: "Surfaces",
            score_aa: "AA pairs",
            score_aa_large: "AA Large pairs",
            score_changes: "Changes",
            score_no_change: "No changes",
            score_on: "on",
        },
    }
};

export const available_locales = Object.keys(translations) as Locale[];
