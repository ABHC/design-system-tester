// Declarative Footer configuration
// Controls wrapper-level CSS classes only.
export const footerConfig = {
    base: "footer-base",

    variants: {
        // Colour palette mode.
        // accent → background: --accent (default, matches layout footer)
        // tone   → background: --card
        palette: {
            accent: "footer-palette-accent",
            tone: "footer-palette-tone",
        },

        // Whether the footer container has rounded top corners.
        rounded: {
            true: "footer-rounded",
        },
    }
};
