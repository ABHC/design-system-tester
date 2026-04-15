export type CommandItem = {
    id: string;
    label: string;
    group?: string;
    keywords?: string[];
    hint?: string;
    disabled?: boolean;
};

export type CommandGroup = {
    id: string;
    label: string;
};

export type CommandPalette = "tone" | "accent" | "accentbg";
export type CommandElevation = "none" | "subtle" | "hard";

export interface CommandDefaults {
    palette: CommandPalette;
    rounded: boolean;
    elevation: CommandElevation;
    width: string;
    placeholder: string;
    empty_placeholder: string;
}

export const defaultCommandConfig: CommandDefaults = {
    palette: "tone",
    rounded: false,
    elevation: "subtle",
    width: "560px",
    placeholder: "Search\u2026",
    empty_placeholder: "No results"
};

export const CommandConfig = {
    base: "commande-base",

    variants: {
        palette: {
            tone:   "commande-tone",
            accent: "command-accent",
            accentbg: "command-accentbg",
        },
    },
};
