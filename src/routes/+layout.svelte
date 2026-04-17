<script lang="ts">
    import { onMount } from 'svelte';
    import '$lib/theme/tokens.css';
    import fontsData from '$lib/data/fonts.json';
    import { preconnectGoogleFonts } from '$lib/utils/fontLoader';
    import favicon from '$lib/assets/favicon.svg';
    import BrandABHC from '$lib/brand/BrandABHC.svelte';
    import LogoSpektral from '../design-system/components/Support/LogoSpektral.svelte';
    import Alert from '../design-system/components/Alert/Alert.svelte';
    import Header from '../design-system/components/Header/Header.svelte';
    import Footer from '../design-system/components/Footer/Footer.svelte';
    import BackToTop from '../design-system/components/Button/BackToTop.svelte';
    import ModeToggle from '../design-system/components/Button/ModeToggle.svelte';
    import Nav from '../design-system/components/Nav/Nav.svelte';
    import Button from '../design-system/components/Button/Button.svelte';
    import StylePopover from './StylePopover.svelte';
    import LangPopover from './LangPopover.svelte';
    import ThemeDrawer from './ThemeDrawer.svelte';
    import DocsDrawer from './DocsDrawer.svelte';

    import {
        locale,
        trans,
        browser_name,
        window_width,
        window_height,
        responsive,
        selected_tone,
        selected_tone_palette,
        selected_accent,
        selected_text,
        selected_body_font,
        selected_title_font,
        selected_ctx,
        shadow_opacity,
        drawer_open,
        drawer_menu,
        drawer_docs_open,
    } from './store';

    import { tokenValues } from '$lib/theme/tokenSchema';

    import { translations } from './translations';
    import type { Locale } from "$lib/types/translations";
    import type { Snippet } from 'svelte';
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

    onMount(() => {
        const navEl = document.querySelector('.nav-component');
        if (!navEl) return;
        const ro = new ResizeObserver(([entry]) => {
            document.documentElement.style.setProperty(
                '--nav-height',
                `${entry.borderBoxSize[0].blockSize}px`
            );
        });
        ro.observe(navEl);
        return () => ro.disconnect();
    });

    onMount(() => {
        if (!headerElement) return;
        const ro = new ResizeObserver(([entry]) => {
            document.documentElement.style.setProperty(
                '--header-height',
                `${entry.borderBoxSize[0].blockSize}px`
            );
        });
        ro.observe(headerElement);
        return () => ro.disconnect();
    });

    $effect(() => {
        const h = header_visible ? (headerElement?.offsetHeight ?? 0) : 0;
        document.documentElement.style.setProperty('--header-offset', `${h}px`);
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
    <link
        rel="stylesheet"
        href="https://unpkg.com/lucide-static@latest/font/lucide.css"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css"
    />
</svelte:head>

<!-- Utils Snippets ──────────────────────────────────────────────── -->

<!-- Header snippets -->
{#snippet mobile_brand()}
    <a  class="return-landing" href="/">
        <LogoSpektral size={30}/>
        <h3 id="project">{$trans?.header.project.toUpperCase()}</h3>
    </a>
{/snippet}

{#snippet brand_spektral()}
    <LogoSpektral size={60}/>
    <h1 id="project">{$trans?.header.project.toUpperCase()}</h1>
{/snippet}

{#snippet empty_nav()}
    <span></span>
{/snippet}

{#snippet logo_in_nav()}
    <a  class="return-landing" href="/">
        <LogoSpektral size={32}/>
    </a>
{/snippet}

{#snippet nav_trailing()}
    <div class="nav-trailing-group">
        {#if $responsive.isAbove(1024)}
            <StylePopover />
        {/if}
        <LangPopover />
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

    <a href="https://www.npmjs.com/" class="social-link" aria-label="npm" target="_blank">
        <svg 
            class="social-icon"
            role="img" 
            viewBox="0 0 24 24" 
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>npm</title>
            <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
        </svg>
    </a>

{/snippet}

{#snippet license()}
    <p id="license">{$trans?.footer.license}</p>
{/snippet}

{#snippet brand_ABHC()}
    <BrandABHC 
        logo_fill="text-accent" 
        text_fill="text-accent"
        size="sm"
    />
{/snippet}

<!-- Header ─────────────────────────────────────────────────────────────────────────────────── -->

<div bind:this={headerElement}>
{#if $responsive.isBelow(1024)}
    <Header
        palette="tone"
        leading={mobile_brand}
        bind:visible={header_visible}
    />
{:else}
    <Header
        palette="tone"
        leading={brand_spektral}
        bind:visible={header_visible}
    />
{/if}
</div>

<!-- Nav ─────────────────────────────────────────────────────────────────────────────────── -->

{#if $responsive.isBelow(1024)}
    <Nav
        position="floating"
        direction="top"
        palette="tone"
        elevation="subtle"
        leading={header_visible ? empty_nav : logo_in_nav}
        trailing={nav_trailing}
    >
        {#if !page.url.pathname.startsWith('/docs')}
            <Button 
                variant="ghost" 
                palette="tone"
                aria_label={$trans?.nav.docs}
                active={page.url.pathname.startsWith('/docs')}
                href="/docs"
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">book_5</span>
                </span>
            </Button>
        {:else}
            <Button 
                variant="ghost" 
                palette="tone"
                aria_label={$trans?.nav.docs}
                onclick={() => { $drawer_docs_open = true; }}
            >
                <span class="nav-icon" aria-hidden="true">
                    <span class="material-symbols-outlined">book_5</span>
                </span>
            </Button>
        {/if}


        <Button 
            variant="ghost" 
            palette="tone"
            aria_label={$trans?.nav.customizer}
            active={page.url.pathname.startsWith('/customizer')}
            href="/customizer"
        >
            <span class="nav-icon" aria-hidden="true">
                <span class="material-symbols-outlined">palette</span>
            </span>
        </Button>

        <Button 
            variant="ghost" 
            palette="tone"
            aria_label={$trans?.control.settings}
            onclick={() => { $drawer_menu = "theme"; $drawer_open = true; }}
        >
            <span class="nav-icon" aria-hidden="true">
                <span class="material-symbols-outlined">style</span>
            </span>
        </Button>
    </Nav>
{:else}
    <Nav
        position="floating"
        direction="top"
        palette="tone"
        elevation="subtle"
        leading={header_visible ? empty_nav : logo_in_nav}
        trailing={nav_trailing}
    >
        <Button
            variant="ghost" 
            palette="tone"
            aria_label={$trans?.nav.home}
            active={page.url.pathname === '/'}
            href="/"
        >
            <span class="nav-label">{$trans?.nav.home}</span>
        </Button>

        <Button 
            variant="ghost" 
            palette="tone"
            aria_label={$trans?.nav.docs}
            active={page.url.pathname.startsWith('/docs')}
            href="/docs"
        >
            <span class="nav-label">{$trans?.nav.docs}</span>
        </Button>

        <Button 
            variant="ghost" 
            palette="tone"
            aria_label={$trans?.nav.customizer}
            active={page.url.pathname.startsWith('/customizer')}
            href="/customizer"
        >
            <span class="nav-label">{$trans?.nav.customizer}</span>
        </Button>
    </Nav>
{/if}

<!-- Drawer ──────────────────────────────────────────────────────────────────────────────────── -->

<ThemeDrawer />
<DocsDrawer />

<!-- Content ────────────────────────────────────────────────────────────────────────────────── -->
<main>
    {@render children?.()}
</main>

<!-- Footer ─────────────────────────────────────────────────────────────────────────────────── -->

{#if $responsive.isBelow(768)}
    <Footer palette="accent" leading={brand_ABHC} trailing={license}>
        {@render social_links()}
    </Footer>
{:else}
    <Footer palette="accent" leading={brand_ABHC} trailing={social_links}>
        {@render license()}
    </Footer>
{/if}

<!-- BackToTop ───────────────────────────────────────────────────────────────────────────────── -->

<div class="special-btn-wrapper">
    <BackToTop palette="tone" size="sm" elevation="subtle" raised rounded/>
</div>

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

    .nav-trailing-group {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: 4px;
        width: 100%;
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

    .special-btn-wrapper {
        position: fixed;
        bottom: 5.5rem;
        right: 1.5rem;
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .return-landing {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        padding: 10px;
        cursor: pointer;
        text-decoration: none;
    }

    .return-landing:hover {
        background: var(--tone-ghost);
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    #license {
        margin: 10px 0;
    }
</style>
