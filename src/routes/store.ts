// frontend/src/routes/store.ts
import { derived, writable, type Writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { translations, available_locales } from './translations';
import type { Locale, Translation } from "$lib/types/translations";
import palettes   from '$lib/data/palettes.json';
import fonts_data from '$lib/data/fonts.json';
import type { AccentTheme, ToneTheme, ContextualColors, TextTheme, CustomTone, CustomAccent, CustomCtx, CustomText, CustomSlots } from '$lib/types/palettes';
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
export const shadow_opacity: number = 0.3;

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

// ── Drawer navigation ────────────────────────────────────────────────────────
export type DrawerMenu = "theme" | "theme:tone" | "theme:accent" | "theme:ctx" | "theme:text" | "fonts" | "settings" | null;
export const drawer_open: Writable<boolean> = writable(false);
export const drawer_menu: Writable<DrawerMenu> = writable(null);
export const drawer_docs_open: Writable<boolean> = writable(false);

// ── Theme/font control (defined after persistStore — see below) ──────────────

// ── Storage ───────────────────────────────────────────────────────

/* -----------------------------------------
 * Types
 * ----------------------------------------- */
type StorageType = 'local' | 'session' | 'cookie' | 'indexedDB' | 'svelteStore';

interface PersistedStoreOptions<T> {
	key: string;
	initial_value: T;
	storage_type?: StorageType;
}

/* -----------------------------------------
 * Persistent Store Factory
 * ----------------------------------------- */
export function persistStore<T>(
	key: string,
	initial_value: T,
	storage_type: StorageType = 'local'
): Writable<T> {
	let data: T = initial_value;

	// Simple in-memory store (no persistence)
	if (storage_type === 'svelteStore') {
		return writable<T>(initial_value);
	}

	// Session storage
	if (storage_type === 'session') {
		if (typeof window !== 'undefined') {
			const stored_value = sessionStorage.getItem(key);
			data = stored_value ? JSON.parse(stored_value) : initial_value;
		}

		const session_store = writable<T>(data);

		if (typeof window !== 'undefined') {
			session_store.subscribe((value) => {
				sessionStorage.setItem(key, JSON.stringify(value));
			});
		}

		return session_store;
	}

	// IndexedDB
	if (storage_type === 'indexedDB') {
		const store = writable<T>(initial_value);

		openIndexedDB().then(async (db) => {
			if (!db) return;
			const stored_value = await getFromIndexedDB<T>(db, key);
			data = stored_value !== null ? stored_value : initial_value;
			store.set(data);

			store.subscribe(async (value) => {
				await setInIndexedDB(db, key, value);
			});
		});

		return store;
	}

	// Cookie-based storage
	if (storage_type === 'cookie') {
		const stored_value = getCookie(key);
		data = stored_value ? JSON.parse(stored_value) : initial_value;
		const store = writable<T>(data);

		store.subscribe((value) => {
			setCookie(key, JSON.stringify(value));
		});

		return store;
	}

	// Default: Local storage
	if (typeof window !== 'undefined') {
		const stored_value = localStorage.getItem(key);
		data = stored_value ? JSON.parse(stored_value) : initial_value;
	}

	const local_store = writable<T>(data);

	if (typeof window !== 'undefined') {
		local_store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return local_store;
}

/* -----------------------------------------
 * Cookie Management
 * ----------------------------------------- */
function getCookie(key: string): string | null {
	if (typeof document !== 'undefined') {
		const name = `${key}=`;
		const decoded_cookie = decodeURIComponent(document.cookie);
		const cookie_array = decoded_cookie.split(';');

		for (const cookie of cookie_array) {
			const trimmed = cookie.trim();
			if (trimmed.startsWith(name)) {
				return trimmed.substring(name.length);
			}
		}
	}
	return null;
}

function setCookie(key: string, value: string, days: number = 365): void {
	if (typeof document !== 'undefined') {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = `expires=${date.toUTCString()}`;
		document.cookie = `${key}=${encodeURIComponent(value)}; ${expires}; path=/`;
	}
}

/* -----------------------------------------
 * IndexedDB Functions
 * ----------------------------------------- */
export function openIndexedDB(): Promise<IDBDatabase | undefined> {
	return new Promise((resolve, reject) => {
		if (!browser) {
			resolve(undefined);
			return;
		}

		const request = indexedDB.open('Spektral_styleguide_DB', 1);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains('persistedStore')) {
				db.createObjectStore('persistedStore', { keyPath: 'key' });
			}
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject('Error opening IndexedDB');
		};
	});
}

async function getFromIndexedDB<T>(db: IDBDatabase, key: string): Promise<T | null> {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(['persistedStore'], 'readonly');
		const store = transaction.objectStore('persistedStore');
		const request = store.get(key);

		request.onsuccess = () => {
			resolve(request.result ? (request.result.value as T) : null);
		};

		request.onerror = () => {
			reject('Error retrieving data from IndexedDB');
		};
	});
}

async function setInIndexedDB<T>(db: IDBDatabase, key: string, value: T): Promise<void> {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(['persistedStore'], 'readwrite');
		const store = transaction.objectStore('persistedStore');
		const request = store.put({ key, value });

		request.onsuccess = () => resolve();
		request.onerror = () => reject('Error storing data in IndexedDB');
	});
}

// ── Theme/font control (persisted in IndexedDB) ─────────────────────────────
export const selected_tone = persistStore<'light' | 'dark'>('selected-tone', 'dark', 'indexedDB');
export const tone_index_dark = persistStore<number>('tone-index-dark', 0, 'indexedDB');
export const tone_index_light = persistStore<number>('tone-index-light', 0, 'indexedDB');
export const accent_index = persistStore<number>('accent-index', 0, 'indexedDB');
export const text_index = persistStore<number>('text-index', 0, 'indexedDB');
export const body_font_index = persistStore<number>('body-font-index', 0, 'indexedDB');
export const title_font_index = persistStore<number>('title-font-index', 1, 'indexedDB');
export const ctx_index = persistStore<number>('ctx-index', 0, 'indexedDB');

// tone_index: reads/writes the correct per-mode index
export const tone_index = derived(
    [selected_tone, tone_index_dark, tone_index_light],
    ([$tone, $dark, $light]) => $tone === 'dark' ? $dark : $light
);

// Helper to set tone_index for the current mode
export function setToneIndex(idx: number) {
    const tone = get(selected_tone);
    if (tone === 'dark') tone_index_dark.set(idx);
    else tone_index_light.set(idx);
}

// ── Custom palette stores (IndexedDB) ────────────────────────────────────────
export const custom_tone_dark = persistStore<CustomSlots<CustomTone>>('custom-dark-tone', [null, null, null], 'indexedDB');
export const custom_tone_light = persistStore<CustomSlots<CustomTone>>('custom-light-tone', [null, null, null], 'indexedDB');
export const custom_accent = persistStore<CustomSlots<CustomAccent>>('custom-accent', [null, null, null], 'indexedDB');
export const custom_ctx = persistStore<CustomSlots<CustomCtx>>('custom-ctx', [null, null, null], 'indexedDB');
export const custom_text = persistStore<CustomSlots<CustomText>>('custom-text', [null, null, null], 'indexedDB');
export const custom_slot_index = writable<0 | 1 | 2>(0);

// ── Static data (filtered once) ──────────────────────────────────────────────
const base_accent_palettes: AccentTheme[] = palettes.accent.filter(a => a.display);
const base_text_palettes: TextTheme[] = palettes.text.filter(t => t.display);
export const available_fonts: FontConfig[] = fonts_data.fonts.filter(f => f.display);
const base_ctx_colors: ContextualColors[] = palettes.ctx.filter(c => c.display);

// ── Derived stores (merged built-in + custom) ────────────────────────────────

export const tone_palettes = derived(
    [selected_tone, custom_tone_dark, custom_tone_light],
    ([$tone, $customDark, $customLight]) => {
        const base = (palettes[$tone] as ToneTheme[]).filter(t => t.display);
        const customSlots = $tone === 'dark' ? $customDark : $customLight;
        const customs = customSlots
            .filter((s): s is CustomTone => s !== null)
            .map(c => ({ ...c, display: true } as ToneTheme));
        return [...base, ...customs];
    }
);

export const accent_palettes = derived(
    custom_accent,
    ($custom) => {
        const customs = $custom
            .filter((s): s is CustomAccent => s !== null)
            .map(c => ({ ...c, display: true } as AccentTheme));
        return [...base_accent_palettes, ...customs];
    }
);

export const ctx_colors = derived(
    custom_ctx,
    ($custom) => {
        const customs = $custom
            .filter((s): s is CustomCtx => s !== null)
            .map(c => ({ ...c, display: true } as ContextualColors));
        return [...base_ctx_colors, ...customs];
    }
);

export const text_palettes = derived(
    custom_text,
    ($custom) => {
        const customs = $custom
            .filter((s): s is CustomText => s !== null)
            .map(c => ({ ...c, display: true } as TextTheme));
        return [...base_text_palettes, ...customs];
    }
);

export const selected_tone_palette = derived([tone_palettes, tone_index], ([$pals, $idx]) =>
    $pals[$idx] ?? $pals[0]
);
export const selected_accent = derived([accent_palettes, accent_index], ([$pals, $idx]) =>
    $pals[$idx] ?? $pals[0]
);
export const selected_body_font = derived(body_font_index, ($idx) =>
    available_fonts[$idx]
);
export const selected_title_font = derived(title_font_index, ($idx) =>
    available_fonts[$idx]
);

export const selected_ctx = derived([ctx_colors, ctx_index], ([$pals, $idx]) =>
    $pals[$idx] ?? $pals[0]
);
export const selected_text = derived([text_palettes, text_index], ([$pals, $idx]) =>
    $pals[$idx] ?? $pals[0]
);
