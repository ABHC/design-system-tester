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
            desc: "Ratios de contraste actuels (approximatifs) :",
            required1: "✅ WCAG AA requis: 4.5:1 pour texte normal, 3:1 pour texte large",
            required2: "✅ WCAG AAA requis: 7:1 pour texte normal, 4.5:1 pour texte large",
            text: "Texte",
            accent: "Accent",
            text_accent: "Texte Accent",
            background: "Background",
            highlight: "Highlight",
            card: "Card"
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
            text_accent: "Text Accent",
            background: "Background",
            highlight: "Highlight",
            card: "Card"
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