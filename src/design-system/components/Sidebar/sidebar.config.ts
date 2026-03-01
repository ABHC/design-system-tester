// Declarative Sidebar configuration.
// Controls wrapper-level CSS classes only.
// Colour tokens are injected as CSS custom properties at runtime.
export const sidebarConfig = {
    base: "sidebar-component",

    variants: {
        // CSS positioning strategy.
        // "fixed"    → position: fixed, overlays the viewport edge.
        // "floating" → position: sticky, participates in normal flow.
        position: {
            fixed:    "sidebar-fixed",
            floating: "sidebar-floating",
        },

        // Side of the viewport the sidebar is anchored to.
        // Only "left" and "right" are valid — a sidebar is inherently vertical.
        direction: {
            left:  "sidebar-direction-left",
            right: "sidebar-direction-right",
        },

        // Colour palette mode.
        // "accent" → background: --accent, content inherits --text-accent.
        // "tone"   → background: --card,   content inherits --text.
        palette: {
            accent: "sidebar-palette-accent",
            tone:   "sidebar-palette-tone",
        },

        // Whether the sidebar has rounded corners on its inner edge.
        rounded: {
            true: "sidebar-rounded",
        },

        // Whether the sidebar is currently open (visible).
        // Controls the translate animation.
        open: {
            true:  "sidebar-open",
            false: "sidebar-closed",
        },
    },
};