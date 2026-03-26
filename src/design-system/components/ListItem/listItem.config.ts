export const listItemConfig = {
    base: "list-item",

    variants: {
        palette: {
            tone: "list-item-tone",
            highlight: "list-item-highlight",
            ghost: "list-item-ghost",
            accent: "list-item-accent",
            neutral: "list-item-neutral",
            error: "list-item-error",
            warning: "list-item-warning",
            success: "list-item-success",
            info: "list-item-info",
        },

        size: {
            sm: "list-item-sm",
            md: "list-item-md",
            lg: "list-item-lg"
        },

        elevation: {
            none:   "list-item-elevation-none",
            subtle: "list-item-elevation-subtle",
            hard:   "list-item-elevation-hard",
        },

        rounded: {
            true: "list-item-rounded"
        },

        active: {
            true: "list-item-active"
        },
    }
};
