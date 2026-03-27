export const explorerConfig = {
    base: "explorer-component",

    variants: {
        palette: {
            accent: "explorer-palette-accent",
            tone: "explorer-palette-tone",
        },
        rounded: {
            true: "explorer-rounded",
        },
    },
};

export const explorerGroupConfig = {
    base: "explorer-group",

    variants: {
        open: {
            true: "explorer-group-open",
            false: "explorer-group-closed",
        },
    },
};

export const explorerLinkConfig = {
    base: "explorer-link",

    variants: {
        active: {
            true: "explorer-link-active",
        },
    },
};
