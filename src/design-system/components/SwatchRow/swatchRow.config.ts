export interface Swatch {
    label: string;
    value: string;
    bg: string;
    color: string;
    isText?: boolean;
}

export interface SwatchRowConfig {
    compact: boolean;
    rounded: boolean;
}

export const defaultSwatchRowConfig: SwatchRowConfig = {
    compact: false,
    rounded: false
};

export const swatchRowConfig = {
    base: "swatch-row",

    variants: {
        compact: {
            true: "swatch-row-compact",
        },

        rounded: {
            true: "swatch-row-rounded"
        },
    },
    
};
