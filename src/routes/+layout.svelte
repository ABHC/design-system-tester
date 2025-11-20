<script lang="ts">
    import { onMount } from 'svelte';
    import fontsData from '$lib/data/fonts.json';
    import { loadGoogleFonts, preconnectGoogleFonts } from '$lib/utils/fontLoader';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

    onMount(() => {
        preconnectGoogleFonts();
        loadGoogleFonts(fontsData.fonts);
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!--{@render children()}-->
