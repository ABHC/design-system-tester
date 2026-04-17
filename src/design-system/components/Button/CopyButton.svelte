<script lang="ts">
    import Button from "./Button.svelte";

    type Variant = "ghost" | "outlined";
    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";


    interface Props {
        variant?: Variant;
        palette?: Palette;
        size? : Size;
        to_copy: string | undefined;
        elevation?: Elevation;
        raised?: boolean;
        rounded?: boolean;
    }

    let {
        variant = "ghost",
        palette = "tone",
        size = "sm",
        to_copy = undefined,
        elevation = "none",
        raised= false,
        rounded = false
    }: Props = $props();

    const icon_size = $derived(size === "lg" ? 16 : size === "md" ? 13 : 11);

    // Clipboard feedback state
    let copied = $state(false);

    async function handleCopy() {
    try {
        if (to_copy != undefined) {
            await navigator.clipboard.writeText(to_copy.trim());
            copied = true;
            setTimeout(() => { copied = false; }, 2000);
        }
    } catch {
        // clipboard API unavailable
    }
}
</script>

<Button 
    variant={variant} 
    palette={palette}
    size={size}
    elevation={elevation}
    raised={raised}
    rounded={rounded}
    onclick={handleCopy} 
    aria_label="Copy elements"
>
    {#if copied}
        <svg
            width={icon_size}
            height={icon_size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    {:else}
        <svg
            width={icon_size}
            height={icon_size}
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
    {/if}
</Button>