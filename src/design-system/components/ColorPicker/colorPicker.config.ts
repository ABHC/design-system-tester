export interface ColorPickerConfig {
    rounded: boolean;
    elevation: "none" | "subtle" | "hard";
}

export const defaultColorPickerConfig: ColorPickerConfig = {
    rounded: false,
    elevation: "none",
};

export const colorPickerConfig = {
    base: "color-picker",

    variants: {
        rounded: {
            true: "color-picker-rounded",
        },
        elevation: {
            none: "color-picker-elevation-none",
            subtle: "color-picker-elevation-subtle",
            hard: "color-picker-elevation-hard",
        },
    },
};
