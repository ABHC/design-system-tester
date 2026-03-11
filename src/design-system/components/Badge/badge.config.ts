export interface BadgeItem {
    value: string;
    label: string;
}

// Declarative badge configuration
export const badgeConfig = {
    base: "badge",

    variants: {
        variant: {
            accent: "badge-accent",
            outlined: "badge-outlined",
            flat: "badge-flat",
            ctx: "badge-ctx"
        },

        size: {
            sm: "badge-sm",
            md: "badge-md",
            lg: "badge-lg"
        },

        uppercase: {
            true: "badge-uppercase"
        }
    }
};
