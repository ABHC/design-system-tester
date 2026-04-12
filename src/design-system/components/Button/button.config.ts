
export const buttonConfig = {
    base: "btn",

    variants: {
        variant: {
            flat: "btn-flat",
            outlined: "btn-outlined",
            ghost: "btn-ghost",
            naked: "btn-naked",
        },

        palette: {
            accent: "btn-palette-accent",
            tone: "btn-palette-tone",
            neutral: "btn-palette-neutral",
            error: "btn-palette-error",
            warning: "btn-palette-warning",
            success: "btn-palette-success",
            info: "btn-palette-info",
        },

        size: {
            sm: "btn-sm",
            md: "btn-md",
            lg: "btn-lg",
        },

        animate: {
            left: "btn-animate-left",
            right: "btn-animate-right",
            top: "btn-animate-top",
            bottom: "btn-animate-bottom",
        },

        elevation: {
            none: "btn-elevation-none",
            subtle: "btn-elevation-subtle",
            hard: "btn-elevation-hard",
        },

        raised: {
            true: "btn-raised"
        },

        uppercase: { 
            true: "btn-uppercase" 
        },

        active: { 
            true: "btn-active" 
        },

        rounded: {
            true: "btn-rounded"
        },

        direction: { 
            row: "btn-row",
            column: "btn-column"
        },
    }
};
