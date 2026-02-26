// Declarative Nav configuration
// Controls wrapper-level CSS classes only.
// Per-item active state and colours are handled via CSS custom properties
// injected by the component at runtime.
export const navConfig = {
    base: "nav-component",

    variants: {
        // CSS positioning strategy.
        // "fixed"    → position: fixed, overlays the viewport.
        // "floating" → position: sticky, floats within normal flow
        position: {
            fixed:    "nav-fixed",
            floating: "nav-floating",
        },

        // Side of the viewport the nav is anchored to.
        // Also drives the internal flex direction:
        //   left | right  →  flex-direction: column
        //   top  | bottom →  flex-direction: row
        direction: {
            top:    "nav-direction-top",
            bottom: "nav-direction-bottom",
            left:   "nav-direction-left",
            right:  "nav-direction-right",
        },

        // Colour palette mode.
        // accent → background: --accent, buttons inherit --text-accent
        // tone → background: --card, buttons inherit --text
        palette: {
            accent: "nav-palette-accent",
            tone:   "nav-palette-tone",
        },

        // Whether the nav container has rounded corners.
        // rounded=true adds nav-rounded; omitted = no border-radius.
        rounded: {
            true: "nav-rounded",
        },
    }
};
