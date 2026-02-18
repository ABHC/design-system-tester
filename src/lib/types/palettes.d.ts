// src/lib/types/palettes.ts

export interface ContextualColors {
    error: string;
    warning: string;
    success: string;
    info: string;
}

export interface AccentTheme {
    name: string;
    display: boolean;
    accent_lighter: string;
    accent_light: string;
    accent_dark: string;
    accent_darker: string;
    text_accent: string;
}

export interface ToneTheme {
    name: string;
    display: boolean;
    bg: string;
    card: string;
    highlight: string;
    text: string;
    text_muted: string;
}

export interface ThemeConfig {
    accent: AccentTheme[];
    light: ToneTheme[];
    dark: ToneTheme[];
}
