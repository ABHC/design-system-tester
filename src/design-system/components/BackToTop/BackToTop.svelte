<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { backToTopConfig } from "./backtotop.config";

    type Palette  = "tone" | "accent";
    type Position = "left" | "right";
    type Elevation = "none" | "subtle" | "hard";

    interface Props {
        palette?: Palette;
        round?: boolean;
        outlined?: boolean;
        position?: Position;
        elevation?: Elevation;
    }

    let {
        palette = "accent",
        round = false,
        outlined = false,
        position = "right",
        elevation = "none",
    }: Props = $props();

    const resolve = createVariant(backToTopConfig);

    const classes = $derived(
        resolve({ palette, round, outlined, position, elevation })
    );

    let visible: boolean = $state(false);

    $effect(() => {
        function on_scroll() {
            visible = window.scrollY > 200;
        }
        window.addEventListener("scroll", on_scroll, { passive: true });
        return () => window.removeEventListener("scroll", on_scroll);
    });

    function scroll_to_top() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>

<button
    class="{classes} {visible ? 'btt-visible' : ''}"
    aria-label="Back to top"
    aria-hidden={!visible}
    onclick={scroll_to_top}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="20"
        height="20"
        aria-hidden="true"
    >
        <path d="M12 19V5"/>
        <path d="M5 12l7-7 7 7"/>
    </svg>
</button>

<style>
    .btt-btn {
        position: fixed;
        bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 8px;
        border: 2px solid transparent;
        cursor: pointer;
        z-index: 100;
        opacity: 0;
        pointer-events:  none;
        transition: 
            opacity 0.25s ease, 
            transform 0.2s ease, 
            box-shadow 0.2s ease, 
            background 0.2s ease, 
            color 0.2s ease, 
            border-color 0.2s ease;
    }

    .btt-visible {
        opacity: 1;
        pointer-events: auto;
    }

    /* Position ───────────────────────────────────────── */

    .btt-left  { left: 1.5rem; }
    .btt-right { right: 1.5rem; }

    /* Round ──────────────────────────────────────────── */

    .btt-round { border-radius: 50%; }

    /* Palette tone ───────────────────────────────────── */

    .btt-tone {
        background: var(--card);
        border-color: var(--highlight);
        color: var(--text);
    }

    /* Palette accent ──────────────────────────────────── */

    .btt-accent {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--text-accent);
    }

    /*  Outlined modifier ───────────────────────────────── */

    .btt-outlined.btt-tone {
        background: transparent;
        border-color: var(--highlight);
        color: var(--text-muted);
    }

    .btt-outlined.btt-tone:hover {
        border-color: var(--accent);
        color: var(--accent);
        box-shadow: none;
    }

    .btt-outlined.btt-accent {
        background: transparent;
        border-color: var(--accent);
        color: var(--accent);
    }

    .btt-outlined.btt-accent:hover {
        background: var(--accent);
        color: var(--text-accent);
        box-shadow: none;
    }

    /* Elevation — appears on hover ───────────────────────────────────── */

    .btt-elevation-subtle:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btt-elevation-hard:hover {
        transform: translateX(-2px) translateY(-2px);
        box-shadow: 6px 6px var(--shadow);
    }

    .btt-outlined.btt-elevation-subtle:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .btt-outlined.btt-elevation-hard:hover {
        transform: translateX(-2px) translateY(-2px);
        box-shadow: 6px 6px var(--shadow);
    }
</style>
