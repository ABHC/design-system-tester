// Declarative Marquee configuration

export interface MarqueeConfig {
    variant: "flat" | "outlined" | "ghost";
    palette: "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    elevation: "none" | "subtle" | "hard";
    orientation: "horizontal" | "vertical";
    direction: "normal" | "reverse";
    // Seconds per loop cycle - lower = faster scroll.
    duration: number;
    // Number of times `children` is rendered inside each group.
    // Use >1 when the content is narrower than the viewport so the loop
    // stays visually continuous (no empty gap on the trailing edge).
    repeat: number;
    pauseOnHover: boolean;
    fade: "none" | "start" | "end" | "both";
    // Any CSS length (e.g. "1rem", "24px") - applied between items and between duplicated groups.
    gap: string;
    rounded: boolean;
}

export const defaultMarqueeConfig: MarqueeConfig = {
    variant: "ghost",
    palette: "tone",
    elevation: "none",
    orientation: "horizontal",
    direction: "normal",
    duration: 25,
    repeat: 1,
    pauseOnHover: true,
    fade: "both",
    gap: "1rem",
    rounded: false,
};

export const marqueeConfig = {
    base: "marquee",

    variants: {
        variant: {
            flat: "marquee-flat",
            outlined: "marquee-outlined",
            ghost: "marquee-ghost",
        },
        palette: {
            accent: "marquee-palette-accent",
            tone: "marquee-palette-tone",
            neutral: "marquee-palette-neutral",
            error: "marquee-palette-error",
            warning: "marquee-palette-warning",
            success: "marquee-palette-success",
            info: "marquee-palette-info",
        },
        elevation: {
            none: "marquee-elevation-none",
            subtle: "marquee-elevation-subtle",
            hard: "marquee-elevation-hard",
        },
        orientation: {
            horizontal: "marquee-horizontal",
            vertical: "marquee-vertical",
        },
        direction: {
            normal: "marquee-direction-normal",
            reverse: "marquee-direction-reverse",
        },
        fade: {
            none: "marquee-fade-none",
            start: "marquee-fade-start",
            end: "marquee-fade-end",
            both: "marquee-fade-both",
        },
        rounded: {
            true: "marquee-rounded",
        },
        pauseOnHover: {
            true: "marquee-pause-on-hover",
        },
    },
};
