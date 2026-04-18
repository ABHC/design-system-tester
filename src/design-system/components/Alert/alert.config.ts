// Declarative Alert configuration
export const alertConfig = {
    base: "alert-base",

    variants: {
        // Semantic colour variant - drives --al-color, background, border and shadow.
        variant: {
            neutral: "alert-variant-neutral",
            info: "alert-variant-info",
            success: "alert-variant-success",
            warning: "alert-variant-warning",
            error: "alert-variant-error",
        },

        // Fixed position in the viewport.
        position: {
            "top-left": "alert-pos-top-left",
            "top-center": "alert-pos-top-center",
            "top-right": "alert-pos-top-right",
            "bottom-left": "alert-pos-bottom-left",
            "bottom-center": "alert-pos-bottom-center",
            "bottom-right": "alert-pos-bottom-right",
        },

        // Border radius.
        rounded: {
            true: "alert-rounded",
        },
    }
};
