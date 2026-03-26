<script lang="ts">
    import { onMount, createRawSnippet } from 'svelte';
    import '../design-system/tokens.css';
    import fontsData from '$lib/data/fonts.json';
    import { preconnectGoogleFonts } from '$lib/utils/fontLoader';
    import favicon from '$lib/assets/favicon.svg';
    import BrandABHC from '$lib/brand/BrandABHC.svelte';
    import LogoABHC from '../lib/brand/LogoABHC.svelte';
    import LogoSpektral from '../design-system/components/Support/LogoSpektral.svelte';
    import Alert from '../design-system/components/Alert/Alert.svelte';
    import Header from '../design-system/components/Header/Header.svelte';
    import Footer from '../design-system/components/Footer/Footer.svelte';
    import BackToTop from '../design-system/components/Button/BackToTop.svelte';
    import ModeToggle from '../design-system/components/Button/ModeToggle.svelte';
    import Nav from '../design-system/components/Nav/Nav.svelte';
    import Sidebar from '../design-system/components/Sidebar/Sidebar.svelte';
    import type { SidebarItem } from '../design-system/components/Sidebar/Sidebar.svelte';

    import {
        locale,
        trans,
        browser_name,
        window_width,
        window_height,
        responsive,
        sidebar_open,
        sidebar_menu,
        selected_tone,
        tone_index,
        setToneIndex,
        accent_index,
        text_index,
        ctx_index,
        body_font_index,
        title_font_index,
        tone_palettes,
        accent_palettes,
        text_palettes,
        available_fonts,
        ctx_colors,
        selected_tone_palette,
        selected_accent,
        selected_text,
        selected_body_font,
        selected_title_font,
        selected_ctx,
        shadow_opacity,
    } from './store';

    import { tokenValues } from '../design-system/token-schema';

    import { translations } from './translations';
    import type { Locale } from "$lib/types/translations";
    import type { Snippet } from 'svelte';
	import { goto } from '$app/navigation';
    import { page } from '$app/state';

	// ---------- Props ----------
	let { children }: { children?: Snippet | null } = $props();

	// ---------- Local state ----------
	let timestamp: number = $state(0);
    let locales: Locale[] = Object.keys(translations) as Locale[];
	let width: number = $state(0);
	let height: number = $state(0);
    let copied: boolean = $state(false);
    let headerElement: HTMLElement | undefined = $state(undefined);
    let header_visible: boolean = $state(true);
    let googleFontsUrl = $state('');
    let font_role: 'body' | 'title' = $state('body');

    // ---------- CSS variables (global, shared across all routes) ----------
    const css_variables = $derived(tokenValues({
        tone: {
            bg: $selected_tone_palette.bg,
            card: $selected_tone_palette.card,
        },
        semantic: {
            accent: $selected_accent.accent,
            error: $selected_ctx.error,
            warning: $selected_ctx.warning,
            success: $selected_ctx.success,
            info: $selected_ctx.info,
            neutral: $selected_ctx.neutral,
        },
        mode: $selected_tone,
        typography: {
            body: `'${$selected_body_font.family}', sans-serif`,
            heading: `'${$selected_title_font.family}', sans-serif`,
        },
        text_palette: {
            light: $selected_text.light,
            dark: $selected_text.dark,
        },
        shadow_opacity,
    }));

    $effect(() => {
        for (const [key, value] of Object.entries(css_variables)) {
            document.documentElement.style.setProperty(key, value);
        }
    });

    // ---------- Snippet helpers ----------
    const swatches = (shades: string[]) => createRawSnippet(() => {
        const inner = shades.map(color =>
            `<span class="palette-swatch" style="background:${color}"></span>`
        ).join('');
        return {
            // createRawSnippet requires a single root element —
            // wrapping keeps all swatches in one mounted node.
            render: () => `<span class="palette-swatches">${inner}</span>`
        };
    });

    const icon_sb = (name: string) => createRawSnippet(() => ({
        render: () => `<span class="material-symbols-outlined">${name}</span>`,
    }));

    const font_sample = (family: string) => createRawSnippet(() => ({
        render: () => `<span style="font-family: '${family}', sans-serif;">${$trans?.sidebar.test}</span>`,
    }));

    // ---------- Sidebar items (reactive, driven by sidebar_menu store) ----------
    const sidebar_items: SidebarItem[] = $derived.by(() => {
        switch ($sidebar_menu) {
            case "theme":
                return [
                    {
                        type: "button",
                        layout: "column",
                        items: [
                            {
                                icon: icon_sb("routine"),
                                label: `${$trans?.control.tone}`,    
                                onclick: () => { $sidebar_menu = "theme:tone"; } 
                            },
                            {
                                icon: icon_sb("style"), 
                                label: `${$trans?.control.accent}`, 
                                onclick: () => { $sidebar_menu = "theme:accent"; } 
                            },
                            {
                                icon: icon_sb("palette"),
                                label: `${$trans?.control.ctx}`,
                                onclick: () => { $sidebar_menu = "theme:ctx"; }
                            },
                            {
                                icon: icon_sb("format_color_text"),
                                label: `${$trans?.control.text ?? 'Text'}`,
                                onclick: () => { $sidebar_menu = "theme:text"; }
                            }
                        ]
                    }
                ] satisfies SidebarItem[];

            case "theme:tone":
                return [
                    {
                        type: "button",
                        layout: "row",
                        items: [
                            {
                                icon: icon_sb("light_mode"),
                                label: `${$trans?.control.light}`,
                                active: $selected_tone === 'light', 
                                onclick: () => { $selected_tone = 'light'; }
                            },
                            {
                                icon: icon_sb("dark_mode"),
                                label: `${$trans?.control.dark}`,
                                active: $selected_tone === 'dark',
                                onclick: () => { $selected_tone = 'dark'; } 
                            }
                        ]
                    },
                    { type: "separator" },
                    {
                        type: "listitem",
                        layout: "column",
                        items: [
                            ...$tone_palettes.map((p, i) => ({
                                main: p.name,
                                extra: `${p.bg} ${p.card}`,
                                leading: swatches([p.bg, p.card]),
                                active: i === $tone_index,
                                onclick: () => { setToneIndex(i); },
                            }))
                        ]
                    }
                ] satisfies SidebarItem[];

            case "theme:accent":
                return [
                    {
                        type: "listitem",
                        layout: "column",
                        items: [
                            ...$accent_palettes.map((p, i) => ({
                                main: p.name,
                                extra: p.accent,
                                leading: swatches([p.accent]),
                                active: i === $accent_index,
                                onclick: () => { $accent_index = i; },
                            })),
                        ]
                    }
                ] satisfies SidebarItem[];

            case "theme:ctx":
                return [
                    {
                        type: "listitem",
                        layout: "column",
                        items: [
                            ...$ctx_colors.map((c, i) => ({
                                main: c.name,
                                extra: `${c.error} ${c.warning} 
                                    ${c.success} ${c.info}`,
                                leading: swatches([
                                    c.error,
                                    c.warning,
                                    c.success,
                                    c.info
                                ]),
                                active: i === $ctx_index,
                                onclick: () => { $ctx_index = i; },
                            })),
                        ]
                    }
                ] satisfies SidebarItem[];

            case "theme:text":
                return [
                    {
                        type: "listitem",
                        layout: "column",
                        items: [
                            ...$text_palettes.map((t, i) => ({
                                main: t.name,
                                extra: `${t.light} / ${t.dark}`,
                                leading: swatches([t.light, t.dark]),
                                active: i === $text_index,
                                onclick: () => { $text_index = i; },
                            })),
                        ]
                    }
                ] satisfies SidebarItem[];

            case "fonts":
                return [
                    {
                        type: "button",
                        layout: "row",
                        items: [
                            {
                                icon: icon_sb("text_format"),
                                label: `${$trans?.control.font_body}`,
                                active: font_role === 'body', 
                                onclick: () => { font_role = 'body'; } 
                            },
                            {
                                icon: icon_sb("format_h1"),
                                label: `${$trans?.control.font_titles}`,  
                                active: font_role === 'title',  
                                onclick: () => { font_role = 'title'; } 
                            }
                        ]
                    },
                    { type: "separator" },
                    {
                        type: "listitem",
                        layout: "column",
                        items: [
                            ...available_fonts.map((f, i) => ({
                                main: f.family,
                                extra: font_sample(f.family),
                                active: font_role === 'body' ?
                                    i === $body_font_index :
                                    i === $title_font_index,
                                onclick: () => {
                                    if (font_role === 'body') $body_font_index = i;
                                    else $title_font_index = i;
                                },
                            }))
                        ]
                    }
                ] satisfies SidebarItem[];

            case "settings":
                return [
                    {
                        type: "button",
                        layout: "column",
                        items: [
                            {
                                icon: icon_sb("routine"),
                                label: `${$trans?.control.tone}`,    
                                onclick: () => { $sidebar_menu = "theme:tone"; } 
                            },
                            {
                                icon: icon_sb("style"), 
                                label: `${$trans?.control.accent}`, 
                                onclick: () => { $sidebar_menu = "theme:accent"; } 
                            },
                            {
                                icon: icon_sb("palette"), 
                                label: `${$trans?.control.ctx}`, 
                                onclick: () => { $sidebar_menu = "theme:ctx"; } 
                            },
                            {
                                icon: icon_sb("brand_family"), 
                                label: `${$trans?.control.fonts}`, 
                                onclick: () => { $sidebar_menu = "fonts"; } 
                            },
                            {
                                icon: page.url.pathname.startsWith('/contrast') ? 
                                    icon_sb("grid_view") : icon_sb("contrast_square"), 
                                label: page.url.pathname.startsWith('/contrast') ?
                                    `${$trans?.control.demo}` : `${$trans?.control.contrast}`, 
                                onclick: () => {
                                    goto(
                                        page.url.pathname.startsWith('/contrast') ? '/' : '/contrast'
                                    ) 
                                } 
                            },
                            {
                                icon: icon_sb("file_export"), 
                                label: `${$trans?.control.export}`, 
                                onclick: () => { } 
                            }
                        ]
                    }
                ] satisfies SidebarItem[];

            default:
                return [];
        }
    });

	// ---------- Lifecycle ----------
	onMount(async (): Promise<void> => {
		timestamp = Date.now();
        console.log(timestamp);
		await getLocale();
        console.log(locale);
		updateScreenSize();
		$browser_name = detectBrowser();
	});

	// ---------- Reactive translations ----------
	$effect(() => {
		if ($trans == null || $trans !== translations[$locale]) {
			$trans = translations[$locale];
		}
	});

    function isLocale(lang: string): lang is Locale {
        return locales.includes(lang as Locale);
    }

    async function getLocale(): Promise<void> {
		const userLanguage: string = (navigator.language || 'en').split('-')[0];
        const lang = isLocale(userLanguage) ? userLanguage : 'en';
		$locale = lang;
		$trans = translations[lang];
	}

	function getFlagEmoji(lang: string): string {
		switch (lang.toUpperCase()) {
			case 'EN': return '🇬🇧';
			case 'FR': return '🇫🇷';
			case 'DE': return '🇩🇪';
			case 'ES': return '🇪🇸';
			default: return '🇬🇧';
		}
	}

	// ---------- Other Functions ----------

	function detectBrowser(): string {
		const ua: string = navigator.userAgent.toLowerCase();
		if (ua.includes('firefox')) return 'firefox';
		if (ua.includes('edg')) return 'edge';
		if (ua.includes('chrome')) return 'chrome';
		if (ua.includes('safari')) return 'safari';
		return 'unknown';
	}

	function updateScreenSize(): void {
		width = window.innerWidth;
		height = window.innerHeight;
		$window_width = width;
		$window_height = height;
	}

    $effect(() => {
        $window_width = width;
        $window_height = height;
    });

    // Generate URL from fonts configuration
    $effect(() => {
        if (fontsData.fonts) {
            generateFontsUrl();
        }
    });

    function generateFontsUrl(): void {
        const displayedFonts = fontsData.fonts.filter(f => f.display);

        if (displayedFonts.length === 0) {
            googleFontsUrl = '';
            return;
        }

        const fontFamilies = displayedFonts.map(font => {
            const weightsString = font.weights.join(';');
            return `family=${font.googleFontsName}:wght@${weightsString}`;
        });

        googleFontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies.join('&')}&display=swap`;
    }


    async function handleCopy(content:string) {
        try {
            await navigator.clipboard.writeText(content.trim());
            copied = true;
            setTimeout(() => { copied = false; }, 2000);
        } catch {
            // clipboard API unavailable
        }
    }

    onMount(() => {
        preconnectGoogleFonts();
    });

    onMount(() => {
        if (!headerElement) return;
        const observer = new IntersectionObserver(
            ([entry]) => { header_visible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(headerElement);
        return () => observer.disconnect();
    });
</script>

<!-- HTML ─────────────────────────────────────────────────────────────── -->

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    {#if googleFontsUrl}
        <link rel="stylesheet" href={googleFontsUrl} />
    {/if}
    <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
        rel="stylesheet" 
    />
</svelte:head>

<!-- Utils Snippets ──────────────────────────────────────────────── -->

<!-- Header snippets -->
{#snippet brand()}
    <BrandABHC/>
{/snippet}

{#snippet mobile_brand()}
    <div class="nav-logo">
        <LogoABHC size={50} />
    </div>
{/snippet}

{#snippet project()}
    <h1 id="project">{$trans?.header.project.toUpperCase()}</h1>
    <LogoSpektral size={45}/>
{/snippet}

<!-- Nav snippets -->
 {#snippet icon_colors()}
    <span class="material-symbols-outlined">colors</span>
{/snippet}

{#snippet icon_fonts()}
    <span class="material-symbols-outlined">brand_family</span>
{/snippet}

{#snippet icon_contrast()}
    <span class="material-symbols-outlined">contrast_square</span>
{/snippet}

{#snippet icon_demo()}
    <span class="material-symbols-outlined">grid_view</span>
{/snippet}

{#snippet icon_export()}
    <span class="material-symbols-outlined">file_export</span>
{/snippet}

{#snippet icon_settings()}
    <span class="material-symbols-outlined">settings</span>
{/snippet}

{#snippet empty_nav()}
    <span></span>
{/snippet}

{#snippet logo_in_nav()}
    <div class="nav-logo">
        <LogoABHC size={32} />
    </div>
{/snippet}

{#snippet lang_select()}
    <select
        aria-label="Select language"
        class="local-select"
        bind:value={$locale}
    >
        {#each locales as lang}
            <option value={lang}>{getFlagEmoji(lang)} {lang.toUpperCase()}</option>
        {/each}
    </select>
{/snippet}

<!-- SideBar snippets -->
{#snippet sidebar_header()}
    <div class="sb-head">
        {#if
            $sidebar_menu === "theme:tone" ||
            $sidebar_menu === "theme:accent" ||
            $sidebar_menu === "theme:ctx" ||
            $sidebar_menu === "theme:text"
        }
            <button
                class="sb-head-back"
                aria-label="{$trans?.aria.return}"
                onclick={() => { 
                    $responsive.isBelow(1024) ? $sidebar_menu = "settings" : 
                    $sidebar_menu = "theme"; 
                }}
            >
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <span class="sb-head-title">
                {
                    $sidebar_menu === "theme:tone" ? `${$trans?.control.tone}` :
                    $sidebar_menu === "theme:accent" ? `${$trans?.control.accent}` :
                    $sidebar_menu === "theme:text" ? `${$trans?.control.text ?? 'Text'}` :
                    `${$trans?.control.ctx}`
                }
            </span>
        {:else}
            {#if $responsive.isBelow(1024) && $sidebar_menu != "settings"}
                <button
                    class="sb-head-back"
                    aria-label="{$trans?.aria.return}"
                    onclick={() => { $sidebar_menu = "settings" }}
                >
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
            {:else}
                <button
                    class="sb-head-close"
                    aria-label="{$trans?.aria.close}"
                    onclick={() => { $sidebar_open = false; $sidebar_menu = null; }}
                >
                    <span class="material-symbols-outlined">close</span>
                </button>
            {/if}
            <span class="sb-head-title">
                {
                    $sidebar_menu === "settings" ? `${$trans?.control.settings}` : 
                    $sidebar_menu === "theme" ? `${$trans?.control.theme}` : 
                    `${$trans?.control.fonts}`
                }
            </span>
        {/if}
    </div>
{/snippet}

<!-- Footer snippets -->
{#snippet social_links()}
    <a href="https://github.com/ABHC" class="social-link" aria-label="GitHub" target="_blank">
        <svg class="social-icon" viewBox="0 0 24 24" fill="white">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
    </a>

    <a href="https://gitlab.com/ABHC_" class="social-link" aria-label="GitLab" target="_blank">
        <svg class="social-icon" viewBox="0 0 24 24" fill="white">
            <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
        </svg>
    </a>

    <a href="https://linkedin.com/in/abhc" class="social-link" aria-label="LinkedIn" target="_blank">
        <svg class="social-icon" viewBox="0 0 24 24" fill="white">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    </a>

    <div
        class="social-link email-link"
        role="button"
        tabindex="0"
        aria-label="Copy email address"
        onclick={async () => {
            await navigator.clipboard.writeText('alexandre.combe@gmail.com');
            copied = true;
        }}
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}
    >
        <svg class="social-icon" viewBox="0 0 26 24" fill="white">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
    </div>
{/snippet}

{#snippet license()}
    <p>{$trans?.footer.license}</p>
{/snippet}

<!-- Header ─────────────────────────────────────────────────────────────────────────────────── -->

{#if $responsive.isBelow(1024)}
    <Header
        palette="tone"
        leading={mobile_brand}
        following={project}
        bind:visible={header_visible}
    />
{:else}
    <Header
        palette="tone"
        leading={brand}
        following={project}
        bind:visible={header_visible}
    />
{/if}

<!-- Nav ─────────────────────────────────────────────────────────────────────────────────── -->

{#if $responsive.isBelow(1024)}
    <Nav
        position="floating"
        direction="top"
        palette="tone"
        header={header_visible ? empty_nav : logo_in_nav}
        footer={lang_select}
        items={[
            {
                icon: icon_settings,
                label: `${$trans?.control.settings}`,
                onclick: () => { $sidebar_menu = "settings"; $sidebar_open = true; }
            },
        ]}
    />
{:else}
    <Nav
        position="floating"
        direction="top"
        palette="tone"
        roundedBtn
        header={header_visible ? empty_nav : logo_in_nav}
        footer={lang_select}
        items={[
            {
                icon: icon_colors,
                label: `${$trans?.control.theme}`,
                onclick: () => { $sidebar_menu = "theme"; $sidebar_open = true; }
            },
            {
                icon: icon_fonts,
                label: `${$trans?.control.fonts}`,
                onclick: () => { $sidebar_menu = "fonts"; $sidebar_open = true; }
            },
            {
                icon: 
                    page.url.pathname.startsWith('/contrast') ? 
                    icon_demo : icon_contrast,
                label: 
                    page.url.pathname.startsWith('/contrast') ? 
                    `${$trans?.control.demo}` : `${$trans?.control.contrast}`,
                onclick: () => { 
                    goto(page.url.pathname.startsWith('/contrast') ? '/' : '/contrast') 
                }
            },
            {
                icon: icon_export,
                label: `${$trans?.control.export}`,
                onclick: () => {}
            },
        ]}
    />
{/if}

<!-- Sidebar ─────────────────────────────────────────────────────────────────────────────────── -->

<Sidebar
    position="fixed"
    direction="left"
    palette="tone"
    width=300px
    rounded
    open={$sidebar_open}
    items={sidebar_items}
    roundedBtn
    header={sidebar_header}
    onclose={() => { $sidebar_open = false; $sidebar_menu = null; }}
/>

<!-- Content ────────────────────────────────────────────────────────────────────────────────── -->
<main>
    {@render children?.()}
</main>

<!-- Footer ─────────────────────────────────────────────────────────────────────────────────── -->

<Footer palette="accent" leading={social_links} following={license} />

<!-- BackToTop ───────────────────────────────────────────────────────────────────────────────── -->

<BackToTop palette="neutral" size="sm" rounded/>
<ModeToggle bind:mode={$selected_tone} palette="neutral" size="sm" rounded/>

<!-- Copy Alert ──────────────────────────────────────────────────────────────────────────────── -->

{#if copied}
    <Alert
        variant="success"
        position="top-center"
        animate="bottom"
        duration={4}
        rounded
        dismiss_label="Dismiss"
        ondismiss={() => { copied = false; }}
    >
        {#snippet leading()}
            <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
        {/snippet}
        {#snippet children()}
            <strong>{$trans?.footer.copied}</strong>
            <p>{$trans?.footer.clipboard}</p>
        {/snippet}
    </Alert>
{/if}

<style>
    :global(body) {
        background: var(--tone-bg);
        color: var(--text);
        font-family: var(--font-body);
        font-size: 14px;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(.wcag-badge) {
        display: inline-block;
        padding: .4rem .75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: var(--text);
    }

    .nav-logo {
        cursor: pointer;
        color: var(--accent);
    }

    .local-select {
        cursor: pointer;
        color: var(--text);
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        border: 2px solid var(--accent);
        border-radius: 6px;
        background-color: transparent;
        height: 40px;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: all 0.2s;
    }

    .local-select:hover {
        background-color: var(--accent);
        color: var(--text-accent);
    }

    main {
        flex: 1;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .social-icon {
        width: 24px;
        height: 24px;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        background-color: var(--accent-ghost-hover);
        transform: scale(1.1);
    }

    /* Sidebar header */
    :global(.sb-head) {
        display:flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        font-family: var(--font-heading);
    }

    :global(.sb-head-title) {
        font-weight: 700;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        flex: 1;
    }

    :global(.sb-head-back),
    :global(.sb-head-close) {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        cursor: pointer;
        color: inherit;
        border-radius: 6px;
        padding: 4px;
        transition: background 0.15s;
        flex-shrink: 0;
    }

    :global(.sb-head-back:hover),
    :global(.sb-head-close:hover) {
        background: var(--sidebar-item-hover-bg, rgba(128,128,128,0.15));
    }

    /* Palette swatch */
    :global(.palette-swatches) {
        display:     inline-flex;
        gap:         3px;
        align-items: center;
    }

    :global(.palette-swatch) {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 20%;
        flex-shrink: 0;
        border: 2px solid var(--text-muted);
    }
</style>
