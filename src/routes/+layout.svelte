<script lang="ts">
    import { onMount } from 'svelte';
    import fontsData from '$lib/data/fonts.json';
    import { preconnectGoogleFonts } from '$lib/utils/fontLoader';
    import favicon from '$lib/assets/favicon.svg';
    import Logo from './Logo.svelte';
    import {
		locale,
		trans,
		browser_name,
		window_width,
		window_height,
        responsive,
	} from './store';
    
    let googleFontsUrl = $state('');

    import { translations } from './translations';
    import type { Locale } from "$lib/types/translations";
    import type { Snippet } from 'svelte';

	// ---------- Props ----------
	let { children }: { children?: Snippet | null } = $props();

	// ---------- Local state ----------
	let timestamp: number = $state(0);
    let locales: Locale[] = Object.keys(translations) as Locale[];
	let width: number = $state(0);
	let height: number = $state(0);
    let copied: boolean = $state(false);

	// ---------- Lifecycle ----------
	onMount(async (): Promise<void> => {
		timestamp = Date.now();
		await getLocale();
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
    
    onMount(() => {
        preconnectGoogleFonts();
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    
    <!-- Dynamic Google Fonts stylesheet -->
    {#if googleFontsUrl}
        <link rel="stylesheet" href={googleFontsUrl} />
    {/if}
</svelte:head>

<header>
    <div class="title-container">
        <div class="tagline">
            <div class="id">
                <h3>{$trans?.header.name1.toUpperCase()}</h3>
                <h3>{$trans?.header.name3.toUpperCase()}</h3>
            </div>
        </div>
        <h1 id="pipe">&nbsp;|&nbsp;</h1>
        <div id="logo-container">
            <Logo />
        </div>
    </div>

    <select 
        aria-label="Select language"
        class="local-select"
        bind:value={$locale}
    >
        {#each locales as lang}
            <option value={lang}>{getFlagEmoji(lang)} {lang.toUpperCase()}</option>
        {/each}
    </select>

    <h1 id="project">{$trans?.header.project.toUpperCase()}</h1>
</header>

<main>
    {@render children?.()}
</main>

<footer>
    <div class="social-links">
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

        <div class="social-link email-link">
            <svg class="social-icon" viewBox="0 0 26 24" fill="white">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            
            {#if copied}
                <div class="copy-confirmation">
                <span>✓ Copié !</span>
                </div>
            {/if}
            </div>
    </div>

    <div class="footer-column">
        <p>{$trans?.footer.license}</p>
    </div>
</footer>

<style global>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Typography */
    :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
        font-family: var(--font-heading);
        font-weight: 600;
        color: var(--text);
    }

    :global(h1) {
        font-size: 2.5rem;
        font-weight: 700;
    }

    :global(h2) {
        font-size: 2rem;
    }

    :global(h3) {
        font-size: 1.5rem;
    }

    :global(h4) {
        font-size: 1.25rem;
    }

    :global(h5) {
        font-size: 1.125rem;
    }

    :global(h6) {
        font-size: 1rem;
        font-weight: 500;
    }

    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--card);
        padding: 0px var(--side-margin) 0px var(--side-margin);
        color: var(--text);
        font-family: 'Space Grotesk', sans-serif;
        border-bottom: 4px solid var(--accent);
        z-index: 50;
        padding: 0 100px;
    }

    .title-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .id {
        text-align: end;
    }

    .tagline {
        text-align: end;
    }

    #logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 5;
        height: 100%;
        gap: 20px;
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
        padding: 8px 16px;
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
        padding-top: 100px; /* Hauteur du header */
        flex: 1;
    }

    footer {
        background-color: var(--accent);
        width: 100%;
        padding: 10px 3% 10px 3%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--text-accent);
        font-family: 'Inter', sans-serif;
        margin-top: auto;
    }

    .social-links {
        display: flex;
        gap: 16px;
        justify-content: center;
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
    }


    .social-icon {
        width: 24px;
        height: 24px;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        border-color: var(--accent-more);
        background-color: var(--accent);
        transform: scale(1.1);
    }
</style>
