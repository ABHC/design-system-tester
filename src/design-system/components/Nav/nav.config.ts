// Declarative Nav configuration
// Controls wrapper-level CSS classes only.
// Per-item active state and colours are handled via CSS custom properties
// injected by the component at runtime.
export const navConfig = {
    base: "nav-component",

    variants: {
        // Layout of buttons inside the nav bar
        layout: {
            row:    "nav-layout-row",
            column: "nav-layout-column",
        },

        // CSS positioning strategy
        position: {
            fixed:  "nav-position-fixed",
            sticky: "nav-position-sticky",
        },

        // Side of the viewport the nav is anchored to
        direction: {
            top:    "nav-direction-top",
            bottom: "nav-direction-bottom",
            left:   "nav-direction-left",
            right:  "nav-direction-right",
        },

        // Colour palette mode
        // • accent — background uses --accent, text uses --text-accent 
        // • tone   — background uses --card / --highlight, text uses --text
        palette: {
            accent: "nav-palette-accent",
            tone:   "nav-palette-tone",
        },
    }
};