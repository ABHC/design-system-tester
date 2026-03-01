// frontend/src/routes/store.ts
import { derived, writable, type Writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { translations, available_locales } from './translations';
import type { Locale, Translation } from "$lib/types/translations";
import palettes   from '$lib/data/palettes.json';
import fonts_data from '$lib/data/fonts.json';
import type { AccentTheme, ToneTheme } from '$lib/types/palettes';
import type { FontConfig } from '$lib/types/fonts';

/* -----------------------------------------
 * Translations Stores
 * ----------------------------------------- */
export const locale: Writable<Locale> = writable('en');
export const trans: Writable<Translation | null> = writable(null);

/* -----------------------------------------
 * Global Stores
 * ----------------------------------------- */
export const browser_name: Writable<string | null> = writable(null);
export const window_height: Writable<number | null> = writable(null);
export const window_width: Writable<number | null> = writable(null);

// ---------- Opacity ----------
export const ctx_opacity : number = 0.4;
export const shadow_opacity : number = 0.3;

// ---------- Badge blend surface ----------
// Surface used as the fixed background layer under contextual badges (rgba + this = opaque).
// Change this to 'bg' or 'card' to explore visual alternatives.
// Must match the CSS var() used in ctxBg() in +page.svelte.
export const ctx_surface : 'bg' | 'card' | 'highlight' = 'highlight';

/* -----------------------------------------
 * Responsive Stores
 * ----------------------------------------- */

export const responsive = derived(window_width, ($width) => ({
    isMobile: $width !== null && $width < 768,
    isTablet: $width !== null && $width >= 768 && $width < 1024,
    isDesktop: $width !== null && $width >= 1024,
    isBelow: (breakpoint: number) => $width !== null && $width < breakpoint,
    isAbove: (breakpoint: number) => $width !== null && $width >= breakpoint
}));

// ── Sidebar navigation ───────────────────────────────────────────────────────
export type SidebarMenu = "theme" | "theme:tone" | "theme:accent" | "fonts" | null;
export const sidebar_open: Writable<boolean>     = writable(false);
export const sidebar_menu: Writable<SidebarMenu> = writable(null);

// ── Theme/font control ───────────────────────────────────────────────────────
export const selected_tone    = writable<'light' | 'dark'>('dark');
export const tone_index       = writable(0);
export const accent_index     = writable(0);
export const body_font_index  = writable(0);
export const title_font_index = writable(1);

// ── Static data (filtered once) ──────────────────────────────────────────────
export const accent_palettes: AccentTheme[] = palettes.accent.filter(a => a.display);
export const available_fonts: FontConfig[]  = fonts_data.fonts.filter(f => f.display);

// ── Derived stores ────────────────────────────────────────────────────────────
export const tone_palettes = derived(selected_tone, ($tone) =>
    (palettes[$tone] as ToneTheme[]).filter(t => t.display)
);
export const selected_palette = derived([tone_palettes, tone_index], ([$pals, $idx]) =>
    $pals[$idx]
);
export const selected_accent = derived(accent_index, ($idx) =>
    accent_palettes[$idx]
);
export const selected_body_font = derived(body_font_index, ($idx) =>
    available_fonts[$idx]
);
export const selected_title_font = derived(title_font_index, ($idx) =>
    available_fonts[$idx]
);
