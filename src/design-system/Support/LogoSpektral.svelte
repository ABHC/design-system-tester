<script lang="ts">
    // Props ────────────────────────────────────────────────────────────────
    interface Props {
        size?: number;
        annotate?: boolean;
    }

    let { size = 64 }: Props = $props();

    // Unique gradient ID ───────────────────────────────────────────────────
    // Each mounted instance gets its own gradient ID to avoid cross-instance
    // collisions when multiple logos coexist on the same page.
    const uid = Math.random().toString(36).slice(2, 8);
    const gradient_id = `spektral-pipe-gradient-${uid}`;

    // ── Reactive CSS variable reader ─────────────────────────────────────────
    // SVG linearGradient stop-color cannot directly use var(--token) in all
    // browsers, so we read the computed values at runtime and bind them to
    // the stop elements as plain colour strings.
    //
    // The $derived rune re-evaluates whenever the DOM-injected CSS variables
    // change, because getComputedStyle reflects the latest values on the next
    // microtask after the effect that writes to :root runs.
    let accent_darker  = $state('#047857');
    let accent_dark    = $state('#059669');
    let accent_light   = $state('#34d399');
    let accent_lighter = $state('#6ee7b7');

    // Read tokens from the document root after mount and on every store update.
    // We use a lightweight MutationObserver on :root style attribute so the
    // gradient stays in sync when the palette changes at runtime.
    import { onMount } from 'svelte';

    function read_accent_tokens(): void {
        const style = getComputedStyle(document.documentElement);
        accent_darker = style.getPropertyValue('--accent-darker').trim()   || accent_darker;
        accent_dark = style.getPropertyValue('--accent-dark').trim()       || accent_dark;
        accent_light = style.getPropertyValue('--accent-light').trim()     || accent_light;
        accent_lighter = style.getPropertyValue('--accent-lighter').trim() || accent_lighter;
    }

    onMount(() => {
        read_accent_tokens();

        // Watch for inline style mutations on :root (triggered by the store
        // effect in +layout.svelte that calls setProperty on each palette change).
        const observer = new MutationObserver(read_accent_tokens);
        observer.observe(document.documentElement, {
            attributes:      true,
            attributeFilter: ['style'],
        });

        return () => observer.disconnect();
    });
</script>

<!--
    LogoSpektral — SVG logo for the Spektral design system.

    Geometry is preserved verbatim from the Inkscape source (Spektral_logo.svg).
    Hardcoded fill colours are replaced with CSS custom properties so the logo
    reacts to runtime palette changes.

    The pipe rectangle uses a linearGradient whose stop colours are read from
    CSS tokens via getComputedStyle (see script above).
-->
<svg
    role="img"
    aria-label="Spektral logo"
    viewBox="0 0 13.772485 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="height: {size}px; width: auto; overflow: visible;"
>
    <defs>
        <!--
            Pipe gradient — vertical, bottom-to-top.
            stop colours are bound to reactive state derived from CSS tokens.
            The gradient runs along the pipe height (y1=100% → y2=0%),
            matching the original Inkscape direction (darker at bottom).
        -->
        <linearGradient
            id={gradient_id}
            x1="0"
            y1="1"
            x2="0"
            y2="0"
            gradientUnits="objectBoundingBox"
        >
            <stop offset="0"  stop-color={accent_darker} />
            <stop offset="0.35" stop-color={accent_dark} />
            <stop offset="0.65" stop-color={accent_light} />
            <stop offset="1" stop-color={accent_lighter} />
        </linearGradient>
    </defs>

    <!--
        Full geometry group — transform and clip-path preserved from source.
        Layer translate: (−98, −174.0865) cancels the Inkscape page offset,
        bringing coordinates back to the (0,0)–(13.77,20) viewport.
    -->
    <g transform="translate(-98,-174.0865)">
        <g id="logo-body">

            <!-- Accent triangles ────────────────────────────────────
                clip-path is inlined as a rect in the same coordinate space.
                Using clipPathUnits="userSpaceOnUse" matches the Inkscape source.
            -->
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
                <!-- accent-lighter — rightmost triangle (lightest shade) -->
                <path
                    fill="var(--accent-lighter)"
                    d="m 81.89836,132.44698 4.715454,17.97677 5.6935,0.001 z"
                />
                <!-- accent-darker — leftmost triangle (darkest shade) -->
                <path
                    fill="var(--accent-darker)"
                    d="m 81.899307,132.44773 c 0.0093,-0.004 -4.673544,17.97677 -4.673544,17.97677 l -5.653723,7.9e-4 z"
                />
                <!-- accent-dark — left-centre triangle -->
                <path
                    fill="var(--accent-dark)"
                    d="m 81.899999,132.44654 0.03062,17.9765 -4.781915,0.002 z"
                />
                <!-- accent-light — right-centre triangle -->
                <path
                    fill="var(--accent-light)"
                    d="m 81.899596,132.44964 0.0054,17.9734 4.72974,7.7e-4 z"
                />
            </g>

            <!-- Pipe rectangle ───────────────────────────────────────────
                fill references the reactive linearGradient defined above.
                stop colours update whenever the MutationObserver fires.
            -->
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