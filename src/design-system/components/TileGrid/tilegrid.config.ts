// TileGrid configuration

/*
    Tile interface
    Minimal shape that TileGrid requires. Any object that structurally matches
    this interface is accepted.
*/

/*
    TileMedia
    src : Relative or absolute URL to the image asset
    type :  Media type ex: "image", "video". Currently only "image" is rendered.
*/

export interface TileMedia {
    src: string;
    type: string;
}

/*
    Tile
    id : Unique identifier
    name : Short display name shown on the tile
    origin : Badge label indicating origin (client, personal, open source...) - optional
    years : Year or range string, e.g. "2023" or "2022-24" - optional
    display : Whether this tile should be rendered at all
    hero : Whether this tile is a featured/hero item.
    media : Array of media assets. The first item is used as the background image, in "background" image mode
    abstract : Localised abstract. Record key is a locale string (ex: "fr", "en").

    Hero tiles span more columns on desktop and receive visual differentiator on mobile.
*/

export interface Tile {
    id?: string;
    name: string;
    origin?: string;
    years?: string;
    display: boolean;
    hero?: boolean;
    hero_text?: Record<string, string>; 
    hero_icon?: string; 
    media?: TileMedia[];
    abstract: Record<string, string>;
}

// Config types

/*
    Controls image placement.
    - In "background" mode: CSS background-position value ("center", "top", etc.)
    - In "decorative" mode: anchor corner/edge for the floating image element.
      "top-right" | "top-left" | "top-center" | "right" | "left"
    Accepts any string so callers can pass arbitrary CSS bg-position values.
*/
export type ImagePosition =
    | "center" | "top" | "bottom"
    | "top-right" | "top-left" | "top-center"
    | "right" | "left"
    | string;

/*
    Whether tiles display a background image (DesignGallery style),
    a flat card (AppsGallery style), or a flat card with a decorative
    image anchored to a corner/edge (decorative style).
    Controlled at the grid level. A tile with no media falls back to flat.
*/
export type ImageMode = "image" | "mock-up" | "flat";

/*
    Number of grid columns on desktop (>= 1024px).
    Tablet always uses 2 columns. Mobile always uses 1 column.
*/
export type Columns = 2 | 3 | 4;

/*
    How a hero tile spans on desktop.
    "half" → span 2 columns (⅔ of a 3-col grid, full row on a 2-col grid)
    "full" → span all columns (full row regardless of column count)
*/
export type HeroSpan = "half" | "full";

// Config interface

/*
    image_mode : Image display mode - controls the entire grid, not individual tiles
    image_position : CSS background-position applied to all image-mode tiles
    columns : Number of columns on the desktop breakpoint
    hero_span : How hero tiles span on desktop
    gap : Gap between tiles - any valid CSS length value
    show_hero_badge : Show a "Featured" badge on hero tiles at all breakpoints
    show_hero_border : Show an accent border on hero tiles
    excerpt_length : Maximum number of characters for the localised abstract excerpt on normal tiles.
    href_base : Base path used to build tile hrefs: "{href_base}/{tile.id}
*/

export type Elevation = "none" | "subtle" | "hard";

export interface TileGridConfig {
    image_mode: ImageMode;
    image_position: ImagePosition;
    columns: Columns;
    hero_span: HeroSpan;
    gap: string;
    show_hero_badge: boolean;
    show_hero_border: boolean;
    excerpt_length: number;
    href_base: string;
    rounded: boolean;
    elevation: Elevation;
    raised: boolean;
}

// Defaults

export const defaultTileGridConfig: TileGridConfig = {
    image_mode: "image",
    image_position: "center",
    columns: 3,
    hero_span: "half",
    gap: "1.5rem",
    show_hero_badge: true,
    show_hero_border: true,
    excerpt_length: 52,
    href_base: "/projects",
    rounded: false,
    elevation: "none",
    raised: false,
};