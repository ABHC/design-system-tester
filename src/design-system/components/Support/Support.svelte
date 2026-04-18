<script lang="ts">
    import AccordionHeader from "../Accordion/AccordionHeader.svelte";
import LogoSpektral from "./LogoSpektral.svelte";

    type Fill = "accent" | "text-accent" | "text" ;
    type Size = "sm" | "md" | "lg";

    interface Props {
        logo_fill?: Fill;
        text_fill?: Fill;
        size?: Size;
    }

    let {
        logo_fill = "accent",
        text_fill = "text",
        size = "md",
    }: Props = $props();

    const logo_fill_class:string = $derived(
        logo_fill === "text" ? "fill-text" :
        logo_fill === "text-accent" ? "fill-text-accent" :
        "fill-accent"
    )

    const text_fill_class:string = $derived(
        text_fill === "accent" ? "fill-accent" :
        text_fill === "text-accent" ? "fill-text-accent" :
        "fill-text"
    )

    const logo_size:number = $derived(
        size === "sm" ? 45 :
        size === "lg" ? 74 :
        64
    )

    // Text-based fills have no hover/muted variants, so the logo switches to
    // monochrome mode where LogoSpektral renders with currentColor + opacity.
    const logo_mono: boolean = $derived(logo_fill !== "accent");
</script>

<a class="support-container" href="https://spektral.combe.tf/">
    <div class="logo-container {logo_fill_class}">
        <LogoSpektral size={logo_size} mono={logo_mono} />
    </div>
    <span class="pipe {text_fill_class} support-{size}">|</span>
    <div class="tagline support-{size}">
        <div class="support-name {text_fill_class}">
            <span>Made with Spektral UI</span>
            <span>Designed by ABHC</span>
        </div>
    </div>
</a>

<style>
    .support-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        padding: 6px;
        text-decoration: none;
    }

    .support-container:hover {
        background: var(--accent-ghost-hover);
    }

    .support-name {
        display: flex;
        flex-direction: column;
        text-align: start;
        font-weight: 700;
        font-family: var(--font-heading);
        line-height: 1.1;
    }

    .support-sm .support-name { 
        font-size: 1.25rem; 
    }

    .support-md .support-name { 
        font-size: 1.5rem; 
    }

    .support-lg .support-name {
        font-size: 2rem;
    }

    .fill-accent span,
    .fill-accent {
        color: var(--accent);
    }

    .fill-text-accent span,
    .fill-text-accent {
        color: var(--text-accent);
    }

    .fill-text span,
    .fill-text {
        color: var(--text);
    }

    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 5;
    }

    /* 3-stop logo scales for mono modes - fully resolved solid colors so the
       three paths don't blend through each other when stacked. Each pair is
       mixed with a high-contrast partner (bg for text, accent for text-accent)
       to guarantee a visible step between main / hover / muted. */
    .logo-container.fill-text {
        --logo-main:  var(--text);
        --logo-hover: color-mix(in oklch, var(--text) 80%, var(--tone) 100%);
        --logo-muted: color-mix(in oklch, var(--text) 30%, var(--tone-muted) 70%);
    }

    .logo-container.fill-text-accent {
        --logo-main:  var(--text-accent);
        --logo-hover: color-mix(in oklch, var(--text-accent) 80%, var(--tone) 100%);
        --logo-muted: color-mix(in oklch, var(--text-accent) 30%, var(--tone-muted) 70%);
    }


    .pipe {
        font-weight: 100;
        line-height: 1;
        margin-bottom: 0px;                                                                                                                                                                                         
        margin-top: 2px; 
    }

    .pipe.support-sm { font-size: 2rem; }
    .pipe.support-md { font-size: 2.25rem; }
    .pipe.support-lg { font-size: 3rem; }

</style>