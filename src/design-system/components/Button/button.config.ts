// Declarative button configuration
export const buttonConfig = {
    base: "btn",

    variants: {
        variant: {
            accent: "btn-accent",
            outlined: "btn-outlined",
            flat: "btn-flat",
            muted: "btn-muted",
            nav: "btn-nav", // Nav button — icon + label, palette context inherited from Nav or Header wrapper
            textual: "btn-textual",
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