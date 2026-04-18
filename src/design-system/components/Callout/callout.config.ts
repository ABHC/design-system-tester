// Declarative Callout configuration
export const calloutConfig = {
    base: "callout-base",

    variants: {
        // Semantic colour variant - drives --cb-color, background, and border.
        variant: {
            accent: "callout-variant-accent",
            neutral: "callout-variant-neutral",
            error: "callout-variant-error",
            warning: "callout-variant-warning",
            success: "callout-variant-success",
            info: "callout-variant-info",
        },

        // Vertical alignment of leading / children / trailing.
        align: {
            center: "callout-align-center",
            start: "callout-align-start",
        },

        // Border radius.
        rounded: {
            true: "callout-rounded",
        },

        // Border radius.
        bordered: {
            true: "callout-bordered",
        },
    }
};
