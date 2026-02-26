// Declarative button configuration
export const buttonConfig = {
    base: "btn",

    variants: {
        variant: {
            primary: "btn-primary",
            secondary: "btn-secondary",
            ghost: "btn-ghost",
            muted: "btn-muted",
            // Square nav button — icon stacked above label, used inside Nav component
            // Palette context (accent vs tone) is controlled by the parent Nav container
            nav: "btn-nav",
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