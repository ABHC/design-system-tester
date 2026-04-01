export interface AccordionConfig {
    variant: "flat" | "outlined" | "ghost";
    palette: "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    size: "sm" | "md" | "lg";
    elevation: "none" | "subtle" | "hard";
    rounded: boolean;
}

export const defaultAccordionConfig: AccordionConfig = {
    variant: "ghost",
    palette: "tone",
    size: "md",
    elevation: "none",
    rounded: false,
};

export const accordionConfig = {
    base: "accordion",

    variants: {
        variant: {
            flat: "accordion-flat",
            outlined: "accordion-outlined",
            ghost: "accordion-ghost",
        },
        palette: {
            accent: "accordion-palette-accent",
            tone: "accordion-palette-tone",
            neutral: "accordion-palette-neutral",
            error: "accordion-palette-error",
            warning: "accordion-palette-warning",
            success: "accordion-palette-success",
            info: "accordion-palette-info",
        },
        size: {
            sm: "accordion-sm",
            md: "accordion-md",
            lg: "accordion-lg",
        },
        elevation: {
            none: "accordion-elevation-none",
            subtle: "accordion-elevation-subtle",
            hard: "accordion-elevation-hard",
        },
        rounded: {
            true: "accordion-rounded",
        },
    },
};

export const accordionHeaderConfig = {
    base: "accordion-header",

    variants: {
        open: {
            true: "accordion-header-open",
            false: "accordion-header-closed",
        },
        disabled: {
            true: "accordion-header-disabled",
        },
    },
};
