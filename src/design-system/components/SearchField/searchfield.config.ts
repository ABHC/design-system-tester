export type SearchFieldSize = "sm" | "md" | "lg";
export type SearchFieldPalette = "tone" | "accent" | "accentbg";

export interface SearchFieldDefaults {
    size: SearchFieldSize;
    palette: SearchFieldPalette;
    rounded: boolean;
    clearable: boolean;
}

export const defaultSearchFieldConfig: SearchFieldDefaults = {
    size: "md",
    palette: "tone",
    rounded: false,
    clearable: true,
};

export const searchFieldConfig = {
    base: "search-field",

    variants: {
        size: {
            sm: "search-field-sm",
            md: "search-field-md",
            lg: "search-field-lg",
        },

        palette: {
            tone: "search-field-palette-tone",
            accent: "search-field-palette-accent",
            accentbg: "search-field-palette-accentbg",
        },

        rounded: {
            true: "search-field-rounded",
        },

        naked: {
            true: "search-field-naked",
        },

        disabled: {
            true: "search-field-disabled",
        },
    },
};
