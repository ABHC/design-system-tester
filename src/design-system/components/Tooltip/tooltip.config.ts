// Declarative tooltip configuration

export type TooltipPalette = "tone" | "accent" | "accentbg";
export type TooltipElevation = "none" | "subtle" | "hard";
export type TooltipDirection = "top" | "bottom" | "left" | "right";
export type TooltipAlign = "start" | "center" | "end";
export type TooltipSize = "sm" | "md" | "lg";

export interface TooltipDefaults {
    palette: TooltipPalette;
    rounded: boolean;
    bordered: boolean;
    elevation: TooltipElevation;
    direction: TooltipDirection;
    align: TooltipAlign;
    size: TooltipSize;
    arrow: boolean;
}

export const defaultTooltipConfig: TooltipDefaults = {
    palette: "tone",
    rounded: false,
    bordered: false,
    elevation: "none",
    direction: "bottom",
    align: "center",
    size: "md",
    arrow: false,
};

export const tooltipConfig = {
    base: "tooltip",

    variants: {
        palette: {
            tone: "tooltip-palette-tone",
            accent: "tooltip-palette-accent",
            accentbg: "tooltip-palette-accentbg",
        },

        elevation: {
            none: "tooltip-elevation-none",
            subtle: "tooltip-elevation-subtle",
            hard: "tooltip-elevation-hard",
        },

        size: {
            sm: "tooltip-sm",
            md: "tooltip-md",
            lg: "tooltip-lg",
        },

        rounded: {
            true: "tooltip-rounded",
        },

        bordered: {
            true: "tooltip-bordered",
        },
    }
};
