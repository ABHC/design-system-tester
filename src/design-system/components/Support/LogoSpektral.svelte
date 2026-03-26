<script lang="ts">
    import { hexToOklch, oklchToHex } from '$lib/utils/contrast';
    import { onMount } from 'svelte';

    interface Props {
        size?: number;
    }

    let { size = 64 }: Props = $props();

    const uid = Math.random().toString(36).slice(2, 8);
    const gradient_id = `spektral-pipe-gradient-${uid}`;

    let shade_darker = $state('#047857');
    let shade_dark = $state('#059669');
    let shade_light = $state('#34d399');
    let shade_lighter = $state('#6ee7b7');

    function compute_shades(accent_hex: string): void {
        const oklch = hexToOklch(accent_hex);
        if (!oklch) return;
        const { c, h } = oklch;
        shade_darker = oklchToHex(Math.max(0, oklch.l - 0.20), c, h);
        shade_dark = oklchToHex(Math.max(0, oklch.l - 0.10), c, h);
        shade_light = oklchToHex(Math.min(1, oklch.l + 0.10), c, h);
        shade_lighter = oklchToHex(Math.min(1, oklch.l + 0.20), c, h);
    }

    function read_accent(): void {
        const hex = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent').trim();
        if (hex) compute_shades(hex);
    }

    onMount(() => {
        read_accent();
        const observer = new MutationObserver(read_accent);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style'],
        });
        return () => observer.disconnect();
    });
</script>

<svg
    role="img"
    aria-label="Spektral logo"
    viewBox="0 0 13.772485 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="height: {size}px; width: auto; overflow: visible;"
>
    <defs>
        <linearGradient
            id={gradient_id}
            x1="0"
            y1="1"
            x2="0"
            y2="0"
            gradientUnits="objectBoundingBox"
        >
            <stop offset="0" stop-color={shade_darker} />
            <stop offset="0.35" stop-color={shade_dark} />
            <stop offset="0.65" stop-color={shade_light} />
            <stop offset="1" stop-color={shade_lighter} />
        </linearGradient>
    </defs>

    <g transform="translate(-98,-174.0865)">
        <g id="logo-body">
            <clipPath id="spektral-clip-{uid}" clipPathUnits="userSpaceOnUse">
                <rect
                    width="15.550653"
                    height="20.734203"
                    x="139.05003"
                    y="-92.306259"
                    transform="rotate(90)"
                />
            </clipPath>

            <g
                transform="matrix(0,-0.96458977,0.96458977,0,-33.32624,263.12417)"
                clip-path="url(#spektral-clip-{uid})"
            >
                <path
                    fill={shade_lighter}
                    d="m 81.89836,132.44698 4.715454,17.97677 5.6935,0.001 z"
                />
                <path
                    fill={shade_darker}
                    d="m 81.899307,132.44773 c 0.0093,-0.004 -4.673544,17.97677 -4.673544,17.97677 l -5.653723,7.9e-4 z"
                />
                <path
                    fill={shade_dark}
                    d="m 81.899999,132.44654 0.03062,17.9765 -4.781915,0.002 z"
                />
                <path
                    fill={shade_light}
                    d="m 81.899596,132.44964 0.0054,17.9734 4.72974,7.7e-4 z"
                />
            </g>

            <rect
                fill="url(#{gradient_id})"
                width="3"
                height="20"
                x="98"
                y="174.0865"
            />
        </g>
    </g>
</svg>

<style>
    svg {
        height: 64px;
        width: auto;
        margin: 8px;
    }
</style>
