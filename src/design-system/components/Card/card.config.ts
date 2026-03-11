// ─── Card configuration ────────────────────────────────────────────────────────

/*
    variant
    — flat     : filled surface with --card background
    — outlined : transparent bg, border on --highlight
— ghost    : fully transparent, no border, no shadow

    width
    Any valid CSS length ("100%", "320px", "calc(50% - 1rem)"…).
    When omitted the card fills its parent naturally.

    rounded
    Applies border-radius (uses --card-radius custom property, default 12px).

    href
    Makes the entire card a link (<a>). Avoid pairing with interactive
    footer content — prefer standalone non-href card + <a> in the footer slot.
*/

export interface CardConfig {
    variant: "flat" | "outlined" | "ghost";
    width?: string;
    rounded: boolean;
}

export const defaultCardConfig: CardConfig = {
    variant: "flat",
    rounded: true,
};

export const cardConfig = {
    base: "card",

    variants: {
        variant: {
            flat:     "card-flat",
            outlined: "card-outlined",
ghost:    "card-ghost",
        },
        rounded: {
            true: "card-rounded",
        },
    },
};
