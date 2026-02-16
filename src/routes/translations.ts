import type { Translations, Locale, Translation } from "$lib/types/translations";

export const translations = {
    fr: {
        language_name: "Français",
        header: {
            project: "| Testeur de Système Design",
            name1: "Alexandre",
            name2: "Épinard",
            name3: "Combe",
            logo_btn: "Retour à l'accueil"
        },
        control: {
            light: "☀️ Clair",
            dark: "🌙 Sombre",
            theme: "Thème",
            palette: "Palette",
            accent: "Couleur d'accent",
            font_body: "Police - Corps de texte",
            font_titles: "Police - Titres",
            more: "Voir plus",
            less: "Voir moins"
        },
        typo: {
            title: "📝 Typographie",
            h1: "Titre 1",
            h2: "Titre 2",
            h3: "Titre 3",
            h4: "Titre 4",
            h5: "Titre 5",
            h6: "Titre 6",
            lead: "Texte introductif",
            body: "Corps de texte"
        },
        palette: {
            title: "🎨 Palette de couleurs"
        },
        buttons: {
            title: "🔘 Boutons",
            primary: "Bouton primaire",
            secondary: "Bouton secondaire",
            ghost: "Bouton ghost",
            badge: "badge",
        },
        cards: {
            title: "🃏 Cartes",
        },
        nav: {
            title: "🧭 Navigation"
        },
        form: {
            title: "📋 Formulaires",
            name: "Nom",
            email: "Email",
            message: "Message",
            send: "Envoyer",
        },
        alerts: {
            title: "⚠️ Alertes"
        },
        contrast: {
            title: "📊 Informations de contraste",
            desc: "Ratios de contraste actuels :",
            required1: "✅ WCAG AA requis: 4.5:1 pour texte normal, 3:1 pour texte large",
            required2: "✅ WCAG AAA requis: 7:1 pour texte normal, 4.5:1 pour texte large",
            text: "Texte",
            accent: "Accent",
            accent_light: "Accent Light",
            accent_lighter: "Accent Lighter",
            accent_dark: "Accent Dark",
            accent_darker: "Accent Darker",
            text_accent: "Texte Accent",
            background: "Background",
            highlight: "Highlight",
            card: "Card",
            large_text_note: "Évalué en texte large (boutons)",
            cat_text: "Lisibilité du texte principal",
            cat_surfaces: "Séparation des surfaces",
            cat_accent: "Accent sur surfaces",
            surface_badge: "Surface",
            surface_note: "Contraste de distinction visuelle — seuils WCAG non applicables",
            reco_title: "Recommandations",
            reco_best_accent_per_surface: "Meilleur accent par surface",
            reco_best_surface_per_accent: "Meilleure surface par variante d'accent",
            reco_on: "sur",
            reco_threshold: "Seuil minimal par surface",
            reco_threshold_from: "à partir de",
            reco_threshold_none: "Aucune variante ne passe",
            reco_scale: "Échelles des accents",
            export_text: "Copier (texte)",
            export_json: "Copier (JSON)",
            export_copied: "Copié !",
            export_theme: "Thème",
            export_accent: "Accent",
            detail_show: "Voir le détail par combinaison",
            detail_hide: "Masquer le détail",
        },
        colorblind: {
            title: "👁️ Simulation daltonisme",
            normal: "Normal",
            normal_desc: "Dans la limite des variations individuelles",
            protan: "Protanopie",
            protan_desc: "Pas de cônes rouges",
            deutan: "Deutéranopie",
            deutan_desc: "Pas de cônes verts",
            tritan: "Tritanopie",
            tritan_desc: "Pas de cônes bleus",
            surfaces: "Surfaces",
            accents: "Accents",
        },
        footer: {
            license: "Site sous licence GPLv3",
            git_btn: "Github",
            linked_in_btn: "LinkedIn",
        },
        seo: {
            meta: "",
            title: ""
        },
    },
    en: {
        language_name: "English",
        header: {
            project: "| Design System Tester",
            name1: "Alexandre",
            name2: "Spinach",
            name3: "Combe",
            logo_btn: "Back to home"
        },
        control: {
            light: "☀️ Light",
            dark: "🌙 Dark",
            theme: "Theme",
            palette: "Palette",
            accent: "Accent Color",
            font_body: "Font - Body",
            font_titles: "Font - Titles",
            more: "See more",
            less: "See less"
        },
        typo: {
            title: "📝 Typography",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            h4: "Heading 4",
            h5: "Heading 5",
            h6: "Heading 6",
            lead: "Lead text",
            body: "Body text"
        },
        palette: {
            title: "🎨 Color palette"
        },
        buttons: {
            title: "🔘 Buttons",
            primary: "Primary button",
            secondary: "Secondary button",
            ghost: "Ghost button",
            badge: "Badge",
        },
        cards: {
            title: "🃏 Cards"
        },
        nav: {
            title: "🧭 Navigation"
        },
        form: {
            title: "📋 Forms",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send",
        },
        alerts: {
            title: "⚠️ Alerts"
        },
        contrast: {
            title: "📊 Contrast information",
            desc: "Current contrast ratios (approximate):",
            required1: "✅ WCAG AA required: 4.5:1 for normal text, 3:1 for large text",
            required2: "✅ WCAG AAA required: 7:1 for normal text, 4.5:1 for large text",
            text: "Text",
            accent: "Accent",
            accent_light: "Accent Light",
            accent_lighter: "Accent Lighter",
            accent_dark: "Accent Dark",
            accent_darker: "Accent Darker",
            text_accent: "Text Accent",
            background: "Background",
            highlight: "Highlight",
            card: "Card",
            large_text_note: "Evaluated as large text (buttons)",
            cat_text: "Main text readability",
            cat_surfaces: "Surface separation",
            cat_accent: "Accent on surfaces",
            surface_badge: "Surface",
            surface_note: "Visual distinction contrast — WCAG thresholds do not apply",
            reco_title: "Recommendations",
            reco_best_accent_per_surface: "Best accent per surface",
            reco_best_surface_per_accent: "Best surface per accent variant",
            reco_on: "on",
            reco_threshold: "Minimum threshold per surface",
            reco_threshold_from: "from",
            reco_threshold_none: "No variant passes",
            reco_scale: "Accents scales",
            export_text: "Copy (text)",
            export_json: "Copy (JSON)",
            export_copied: "Copied!",
            export_theme: "Theme",
            export_accent: "Accent",
            detail_show: "Show detail per combination",
            detail_hide: "Hide detail",
        },
        colorblind: {
            title: "👁️ Color blindness simulation",
            normal: "Normal",
            normal_desc: "Within the limits of individual variations",
            protan: "Protanopia",
            protan_desc: "No red cones",
            deutan: "Deuteranopia",
            deutan_desc: "No green cones",
            tritan: "Tritanopia",
            tritan_desc: "No blue cones",
            surfaces: "Surfaces",
            accents: "Accents",
        },
        footer: {
            license: "Website under GPLv3 license",
            git_btn: "Github",
            linked_in_btn: "LinkedIn",
        },
        seo: {
            meta: "",
            title: ""
        },
    }
};

export const available_locales = Object.keys(translations) as Locale[];