export const selectConfig = {
    base: "select-root",

    variants: {
        size: {
            sm: "select-sm",
            md: "select-md",
            lg: "select-lg",
        },

        palette: {
            tone: "select-option-tone",
            accent: "select-option-accent",
            accentbg: "select-option-accentbg",
        },

        disabled: {
            true: "select-disabled",
        },

        has_error: {
            true: "select-has-error",
        },

        has_success: {
            true: "select-has-success",
        },
    },
};
