<script lang="ts">
    import type { Snippet } from 'svelte';
    import Button from "./Button.svelte";

    type Variant = "flat" | "outlined";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Animate = "left" | "right" | "top" | "bottom";
    type Elevation = "none" | "subtle" | "hard";
    type Position = "left" | "right";

    interface Props {
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        raised?: boolean;
        uppercase?: boolean;
        animate?: Animate;
        rounded?: boolean;
        position?: Position;
        children?: Snippet;
    }

    let {
        variant = "flat",
        palette = "accent",
        size = "sm",
        elevation = "none",
        raised= false,
        uppercase = false,
        animate = undefined,
        rounded = false,
        position = "right",
        children,
    }: Props = $props();

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

<div 
    class="
        btt-wrapper
        {visible ? "" : "btt-hidden"}
        {position === "left" ? "btt-left" : "btt-right"}
    " 
    aria-hidden={!visible}
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
        onclick={scroll_to_top}                                                                                                                                                                                                        
        aria_label="Back to top"
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
    </Button>
</div>

<style>
    /* Wrapper ----------------------------------------- */

    .btt-wrapper {
        /*position: fixed;
        bottom: 5.5rem;*/
        z-index: 100;
        transition: 
            opacity 0.25s ease, 
            transform 0.2s ease, 
            box-shadow 0.2s ease, 
            background 0.2s ease, 
            color 0.2s ease, 
            border-color 0.2s ease;
    }

    /* Visibility -------------------------------------- */
    
    .btt-hidden {
        opacity: 0;
    }

    /* Position ---------------------------------------- */

    /*.btt-left  { left: 1.5rem; }
    .btt-right { right: 1.5rem; }*/
</style>