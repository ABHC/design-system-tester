// Modal configuration ------------------------------------------------------

/*
    palette
    - tone   : --card background, --text color (default)
    - accent : --accent background, --text-accent color

    rounded
    Applies border-radius (16px).

    width
    Any valid CSS length. Defaults to "480px".
    Max-width is always capped at calc(100vw - 2rem) for small screens.

    open
    Controls visibility.

    onclose
    Called when the user clicks the scrim or presses Escape.

    Slots
    header   : Top zone - padded, bottom border.
    children : Body zone - padded, scrollable.
    footer   : Bottom zone - padded, top border, flex row.
*/

export type Elevation = "none" | "subtle" | "hard";

export interface ModalConfig {
    palette: "tone" | "accent";
    rounded: boolean;
    elevation: Elevation;
}

export const defaultModalConfig: ModalConfig = {
    palette: "tone",
    rounded: false,
    elevation: "subtle",
};

export const modalConfig = {
    base: "modal-dialog",

    variants: {
        palette: {
            tone:   "modal-palette-tone",
            accent: "modal-palette-accent",
            accentbg: "modal-palette-accentbg",
        },
        rounded: {
            true: "modal-rounded",
        },
        elevation: {
            none:   "modal-elevation-none",
            subtle: "modal-elevation-subtle",
            hard:   "modal-elevation-hard",
        },
    },
};
