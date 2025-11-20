// src/lib/types/fonts.ts

export interface FontConfig {
    name: string;
    display: boolean;
    family: string;
    weights: number[];
    googleFontsName: string;
}

export interface FontsConfig {
    fonts: FontConfig[];
}