export const TIMELINE_KEY = Symbol("timeline");

export type TimelineVariant = "flat" | "outlined" | "ghost";
export type TimelinePalette = "accent" | "neutral" | "error" | "warning" | "success" | "info";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineElevation = "none" | "subtle" | "hard";
export type TimelineOrientation = "vertical" | "horizontal";
export type TimelineConnectorStyle = "solid" | "dashed" | "mixed" | "none";

export interface TimelineContext {
    register: () => number;
    readonly palette: TimelinePalette;
    readonly completed: number;
    readonly orientation: TimelineOrientation;
    readonly connector: TimelineConnectorStyle;
    readonly reverse: boolean;
    readonly total: number;
}

export interface TimelineConfig {
    variant: TimelineVariant;
    palette: TimelinePalette;
    size: TimelineSize;
    elevation: TimelineElevation;
    rounded: boolean;
    orientation: TimelineOrientation;
    connector: TimelineConnectorStyle;
    completed: number;
    reverse: boolean;
}

export const defaultTimelineConfig: TimelineConfig = {
    variant: "ghost",
    palette: "accent",
    size: "md",
    elevation: "none",
    rounded: false,
    orientation: "vertical",
    connector: "solid",
    completed: 0,
    reverse: false,
};

export const timelineConfig = {
    base: "timeline",

    variants: {
        variant: {
            flat: "timeline-flat",
            outlined: "timeline-outlined",
            ghost: "timeline-ghost",
        },
        palette: {
            accent: "timeline-palette-accent",
            neutral: "timeline-palette-neutral",
            error: "timeline-palette-error",
            warning: "timeline-palette-warning",
            success: "timeline-palette-success",
            info: "timeline-palette-info",
        },
        size: {
            sm: "timeline-sm",
            md: "timeline-md",
            lg: "timeline-lg",
        },
        elevation: {
            none: "timeline-elevation-none",
            subtle: "timeline-elevation-subtle",
            hard: "timeline-elevation-hard",
        },
        orientation: {
            vertical: "timeline-vertical",
            horizontal: "timeline-horizontal",
        },
        connector: {
            solid: "timeline-connector-solid",
            dashed: "timeline-connector-dashed",
            mixed: "timeline-connector-mixed",
            none: "timeline-connector-none",
        },
        rounded: {
            true: "timeline-rounded",
        },
    },
};
