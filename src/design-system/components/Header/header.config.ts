// Declarative Header configuration
// Controls wrapper-level CSS classes only.
// injected by the component at runtime.
export const headerConfig = {
    base: "header-base",

    variants: {
        // Colour palette mode.
        // accent → background: --accent, buttons inherit --text-accent
        // tone → background: --card, buttons inherit --text
        palette: {
            accent: "header-palette-accent",
            tone: "header-palette-tone",
        },

        // Whether the header container has rounded corners.
        // rounded=true adds nav-rounded; omitted = no border-radius.
        rounded: {
            true: "header-rounded",
        },
    }
};