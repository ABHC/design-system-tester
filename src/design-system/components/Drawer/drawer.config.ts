export const drawerConfig = {
    base: "drawer-component",

    variants: {
        // Side of the viewport the drawer slides in from.
        direction: {
            left: "drawer-direction-left",
            right: "drawer-direction-right",
            top: "drawer-direction-top",
            bottom: "drawer-direction-bottom",
        },

        // Colour palette mode.
        palette: {
            accent: "drawer-palette-accent",
            tone: "drawer-palette-tone",
        },

        // Whether the drawer has rounded corners on its inner edge.
        rounded: {
            true: "drawer-rounded",
        },

        // Whether the drawer is currently open (visible).
        open: {
            true: "drawer-open",
            false: "drawer-closed",
        },
    },
};
