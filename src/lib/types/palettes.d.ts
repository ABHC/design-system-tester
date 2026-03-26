export interface ContextualColors {
    name: string;
    display: boolean;
    error: string;
    warning: string;
    success: string;
    info: string;
    neutral: string;
}

export interface AccentTheme {
    name: string;
    display: boolean;
    accent: string;
}

export interface ToneTheme {
    name: string;
    display: boolean;
    bg: string;
    card: string;
}

export interface CustomTone { name: string; bg: string; card: string }
export interface CustomAccent { name: string; accent: string }
export interface CustomCtx { name: string; error: string; warning: string; success: string; info: string; neutral: string }
export interface CustomText { name: string; light: string; dark: string }
export type CustomSlots<T> = [T | null, T | null, T | null];

export interface TextTheme {
    name: string;
    display: boolean;
    light: string;
    dark: string;
}

export interface ThemeConfig {
    accent: AccentTheme[];
    light: ToneTheme[];
    dark: ToneTheme[];
    ctx: ContextualColors[];
    text: TextTheme[];
}
