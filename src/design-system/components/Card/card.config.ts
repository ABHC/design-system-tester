// Declarative Card configuration

export interface CardConfig {
    variant: "flat" | "outlined" | "ghost";
    width?: string;
    rounded: boolean;
    elevation: "none" | "subtle" | "hard";
}

export const defaultCardConfig: CardConfig = {
    variant: "flat",
    rounded: false,
    elevation: "hard",
};

export const cardConfig = {
    base: "card",

    variants: {
        variant: {
            flat: "card-flat",
            outlined: "card-outlined",
            ghost: "card-ghost",
        },
        rounded: {
            true: "card-rounded",
        },
        elevation: {
            none: "card-elevation-none",
            subtle: "card-elevation-subtle",
            hard: "card-elevation-hard",
        },
    },
};
