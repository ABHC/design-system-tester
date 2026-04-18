<script lang="ts">
    import Button from "./Button.svelte";

    type Variant = "flat" | "outlined";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Animate = "left" | "right" | "top" | "bottom";
    type Elevation = "none" | "subtle" | "hard";
    type Position = "left" | "right";
    type Mode = "light" | "dark";

    interface Props {
        mode?: Mode;
        onchange?: (mode: Mode) => void;
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        raised?: boolean;
        uppercase?: boolean;
        animate?: Animate;
        rounded?: boolean;
        position?: Position;
    }

    let {
        mode = $bindable("dark"),
        onchange = undefined,
        variant = "flat",
        palette = "accent",
        size = "sm",
        elevation = "none",
        raised= false,
        uppercase = false,
        animate = undefined,
        rounded = false,
        position = "right",
    }: Props = $props();

    function toggle_mode() {
        mode = mode === "dark" ? "light" : "dark";
        onchange?.(mode);
    }
</script>

<div
    class="
        bmt-wrapper
        {position === "left" ? "bmt-left" : "bmt-right"}
    "
>
    <Button
        variant={variant}
        palette={palette}
        size={size}
        elevation={elevation}
        raised={raised}
        uppercase={uppercase}
        animate={animate}
        rounded={rounded}
        direction="column"
        onclick={toggle_mode}
        aria_label="Toggle {mode === 'dark' ? 'light' : 'dark'} mode"
    >
        {#if mode === "light"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="20"
                width="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="20"
                width="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
        {/if}
    </Button>
</div>

<style>
    /* Wrapper ----------------------------------------- */

    .bmt-wrapper {
        /*position: fixed;
        bottom: 1.5rem;*/
        z-index: 100;
        transition: 
            opacity 0.25s ease, 
            transform 0.2s ease, 
            box-shadow 0.2s ease, 
            background 0.2s ease, 
            color 0.2s ease, 
            border-color 0.2s ease;
    }

    /* Position ---------------------------------------- */

    /*.bmt-left  { left: 1.5rem; }
    .bmt-right { right: 1.5rem; }*/
</style>