export interface BadgeItem {
    value: string;
    label: string;
}

// Declarative badge configuration
export const badgeConfig = {
    base: "badge",

    variants: {
        variant: {
            flat: "badge-flat",
            outlined: "badge-outlined",
        },

        palette: {
            accent: "badge-palette-accent",
            tone: "badge-palette-tone",
            neutral: "badge-palette-neutral",
            error: "badge-palette-error",
            warning: "badge-palette-warning",
            success: "badge-palette-success",
            info: "badge-palette-info",
        },

        size: {
            sm: "badge-sm",
            md: "badge-md",
            lg: "badge-lg"
        },

        uppercase: {
            true: "badge-uppercase"
        },

        elevation: {
            none: "badge-elevation-none",
            subtle: "badge-elevation-subtle",
            hard: "badge-elevation-hard",
        },
    }
};
