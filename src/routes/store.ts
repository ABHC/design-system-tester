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



