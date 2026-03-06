// Declarative button configuration
export const buttonConfig = {
    base: "btn",

    variants: {
        variant: {
            primary: "btn-primary",
            secondary: "btn-secondary",
            ghost: "btn-ghost",
            muted: "btn-muted",
            nav: "btn-nav", // Nav button — icon + label, palette context inherited from Nav or Header wrapper
            text: "btn-text",
        },

        size: {
            sm: "btn-sm",
            md: "btn-md",
            lg: "btn-lg"
        },

        animate: {
            left: "btn-animate-left",
            right: "btn-animate-right",
        },

        uppercase: {
            true: "btn-uppercase"
        },

        active: {
            true: "btn-active"
        },

        squared: {
            true: "btn-squared"
        }
    }
};