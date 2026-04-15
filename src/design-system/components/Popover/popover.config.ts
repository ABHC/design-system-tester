export type PopoverPalette = "tone" | "accent" | "accentbg";
export type PopoverElevation = "none" | "subtle" | "hard";
export type PopoverDirection = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverDefaults {
    palette: PopoverPalette;
    rounded: boolean;
    elevation: PopoverElevation;
    direction: PopoverDirection;
    align: PopoverAlign;
}

export const defaultPopoverConfig: PopoverDefaults = {
    palette: "tone",
    rounded: false,
    elevation: "none",
    direction: "bottom",
    align: "start",
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
