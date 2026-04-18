<script lang="ts">
    // Props
    interface Props {
        /**
         * Height (and width) of the logo in pixels. The viewBox is square.
         * Default: 64px.
         */
        size?: number;
        /**
         * When true, renders the CSS token name next to each coloured element.
         * Intended for styleguide / documentation pages.
         */
        annotate?: boolean;
        /**
         * When true, fills resolve to --logo-main/-hover/-muted (set by the
         * parent) instead of the accent tokens. The parent decides the palette;
         * fallbacks keep the logo readable if none are provided.
         */
        mono?: boolean;
    }

    let { size = 64, annotate = false, mono = false }: Props = $props();

    // In mono mode each role reads from a dedicated CSS var the parent can
    // override with fully-resolved solid colors. Stacking opacity on top of
    // currentColor would visually collapse (overlapping paths bleed through
    // each other), so we rely on distinct fill values instead.
    const fill_main = $derived(mono ? "var(--logo-main, currentColor)" : "var(--accent)");
    const fill_hover = $derived(mono ? "var(--logo-hover, currentColor)" : "var(--accent-hover)");
    const fill_muted = $derived(mono ? "var(--logo-muted, currentColor)" : "var(--accent-muted)");
</script>

<!--
    LogoSpektral - Diamond K logo for the Spektral design system.
    Geometry preserved verbatim from logo_spektral3.svg (Inkscape, 3rd revision).

    Structural change vs previous version: the nested group hierarchy (g13 /
    g12-2 / g8-6-7) has been flattened by Inkscape into individual elements,
    each carrying its own explicit transform. The component mirrors this flat
    structure exactly.

    Token mapping (from inkscape:label suffixes):
      -accent       → var(--accent)       fill on Triangle-1, stroke on Outline
      -accent-hover → var(--accent-hover) fill on Triangle-2, K-1, K-2
      -accent-muted → var(--accent-muted) fill on Triangle-3

    Render order (painter's algorithm, back to front):
      1. Triangle-1  (accent)       - large background triangle
      2. K-1         (accent-hover) - upper K arm
      3. K-2         (accent-hover) - lower K arm
      4. Outline     (accent)       - diamond frame, drawn on top
      5. Triangle-2  (accent-hover) - mid triangle
      6. Triangle-3  (accent-muted) - small muted triangle

    No linearGradient → no MutationObserver needed. All fills/strokes are
    resolved natively by the browser via CSS custom properties.
-->
<svg
    role="img"
    aria-label="Spektral logo"
    viewBox="0 0 209.30361 209.30361"
    xmlns="http://www.w3.org/2000/svg"
    style="height: {size}px; width: {size}px; overflow: visible;"
>
    <!--
        All elements live in the layer1 coordinate space:
          transform="translate(-0.34820308,-43.848212)"
        Each element carries its own additional transform as per the Inkscape source.
    -->
    <g transform="translate(-0.34820308,-43.848212)">

        <!-- Triangle-1 (accent) -->
        <path
            fill={fill_main}
            stroke="none"
            transform="translate(304.89433,-280.25802)"
            d="M -225.6617,355.02002 V 502.4941 l -74.64038,-73.73704 z"
        />

        <!-- K-1 - upper arm (accent-hover) -->
        <path
            fill={fill_hover}
            stroke="none"
            transform="translate(-200.81692,7.070112)"
            d="m 326.45353,65.809488 -117.41461,73.404302 -1.47485,1.47485 143.38519,-50.383043 z"
        />

        <!-- K-2 - lower arm (accent-hover) -->
        <path
            fill={fill_hover}
            stroke="none"
            transform="translate(-200.81692,7.070112)"
            d="m 325.77341,217.64193 25.69998,-25.68775 -143.90777,-49.78294 1.62006,1.62005 z"
        />

        <!-- Outline - diamond frame (accent, stroke only) -->

        <rect
            fill="none"
            stroke={fill_main}
            stroke-width="8"
            stroke-linecap="square"
            width="140"
            height="140"
            x="-98.999046"
            y="150.76463"
            transform="rotate(45,125.23159,346.38349)"
        />

        <!-- Triangle-2 (accent-hover) -->

        <path
            fill={fill_hover}
            stroke="none"
            transform="translate(304.89433,-280.25802)"
            d="m -236.25032,389.63127 -0.019,79.22795 -64.03276,-40.10216 z"
        />

        <!-- Triangle-3 (accent-muted) -->

        <path
            fill={fill_muted}
            stroke="none"
            transform="translate(304.89433,-280.25802)"
            d="m -225.66419,402.78407 v 51.94598 l -74.1117,-25.97299 z"
        />

    </g>

    <!-- Token annotation labels (annotate prop) -->
   
    {#if annotate}
        <!-- Top - Outline label -->
        <text
            x="104"
            y="10"
            text-anchor="middle"
            font-size="7"
            font-family="var(--font-body, monospace)"
            fill="var(--accent)"
        >--accent (stroke)</text>

        <!-- Left - Triangle-1 label -->
        <text
            x="-2"
            y="105"
            text-anchor="end"
            font-size="7"
            font-family="var(--font-body, monospace)"
            fill="var(--accent)"
        >--accent</text>

        <!-- Left - Triangle-2 label -->
        <text
            x="-2"
            y="130"
            text-anchor="end"
            font-size="7"
            font-family="var(--font-body, monospace)"
            fill="var(--accent-hover)"
        >--accent-hover</text>

        <!-- Left - Triangle-3 label -->
        <text
            x="-2"
            y="152"
            text-anchor="end"
            font-size="7"
            font-family="var(--font-body, monospace)"
            fill="var(--accent-muted)"
        >--accent-muted</text>

        <!-- Right - K arms label -->
        <text
            x="213"
            y="105"
            text-anchor="start"
            font-size="7"
            font-family="var(--font-body, monospace)"
            fill="var(--accent-hover)"
        >--accent-hover (K)</text>
    {/if}

</svg>

<style>
    svg {
        /* Allow annotation labels to render outside the viewBox boundaries */
        overflow: visible;
    }
</style>