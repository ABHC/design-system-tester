// frontend/src/routes/store.ts
import { derived, writable, type Writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { translations, available_locales } from './translations';
import type { Locale, Translation } from "$lib/types/translations";

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



