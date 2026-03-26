export type PopoverPalette = "tone" | "accent" | "accentbg";
export type PopoverElevation = "none" | "subtle" | "hard";

export interface PopoverDefaults {
    palette: PopoverPalette;
    rounded: boolean;
    elevation: PopoverElevation;
}

export const defaultPopoverConfig: PopoverDefaults = {
    palette: "tone",
    rounded: true,
    elevation: "none",
};

export const popoverConfig = {
    base: "popover",

    variants: {
        palette: {
            tone: "popover-palette-tone",
            accent: "popover-palette-accent",
            accentbg: "popover-palette-accentbg",
        },

        rounded: {
            true: "popover-rounded",
        },

        elevation: {
            none: "popover-elevation-none",
            subtle: "popover-elevation-subtle",
            hard: "popover-elevation-hard",
        },
    },
};
