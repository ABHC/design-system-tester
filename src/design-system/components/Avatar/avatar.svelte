<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { avatarConfig } from "./avatar.config";

    type Size = "xs" | "sm" | "md" | "lg" | "xl";
    type Status = "online" | "offline" | "absent" | "do-not-disturb";
    type Palette = "accent" | "tone";

    interface Props {
        size?: Size;
        status?: Status;
        palette?: Palette;
        circular?: boolean;
        src?: string;
        alt?: string;
        label?: string;
        onclick?: () => void;
    }

    let {
        size = "md",
        status = undefined,
        palette = "accent",
        circular = false,
        src = undefined,
        alt = "",
        label = undefined,
        onclick = undefined,
    }: Props = $props();

    // Helpers _____________________________________________________________

    const resolve = createVariant(avatarConfig);

    const avatar_classes = $derived(resolve({ size, palette, circular }));
    const status_class = $derived(resolve({ status }));

    const dot_classes = $derived(
        status != undefined ? `state-dot ${status_class}`.trim() : ""
    );

    const truncated_label = $derived(label?.slice(0, 3).toUpperCase());
</script>

{#if onclick}
    <button class={avatar_classes} {onclick} type="button">
        {#if src}
            <img class="avatar-img" {src} {alt} />
        {:else if truncated_label}
            {truncated_label}
        {/if}
        {#if status}
            <span class={dot_classes}></span>
        {/if}
    </button>
{:else}
    <div class={avatar_classes}>
        {#if src}
            <img class="avatar-img" {src} {alt} />
        {:else if truncated_label}
            {truncated_label}
        {/if}
        {#if status}
            <span class={dot_classes}></span>
        {/if}
    </div>
{/if}

<style>
    .avatar-base {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.65rem;
        font-weight: 700;
        flex-shrink: 0;
        letter-spacing: 0.02em;
        overflow: visible;
        border-radius: 15%;
    }

    button.avatar-base {
        cursor: pointer;
        border: none;
        padding: 0;
    }

    /* Palette - accent */
    .avatar-palette-accent {
        background: var(--accent);
        color: var(--text-accent);
    }

    /* Palette - tone */
    .avatar-palette-tone {
        background: var(--tone-hover);
        color: var(--text-muted);
    }

    /* Sizes */
    .avatar-xs {
        width: 32px;
        height: 32px;
        font-size: 0.55rem;
    }

    .avatar-sm {
        width: 48px;
        height: 48px;
        font-size: 0.7rem;
    }

    .avatar-md {
        width: 72px;
        height: 72px;
        font-size: 0.9rem;
    }

    .avatar-lg {
        width: 112px;
        height: 112px;
        font-size: 1.1rem;
    }

    .avatar-xl {
        width: 160px;
        height: 160px;
        font-size: 1.5rem;
    }

    /* Shape */
    .avatar-circular {
        border-radius: var(--radius-circle);
    }
    
    /* Image */
    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
    }

    /* State */     
    .state-dot {
        position: absolute;
        left: 95%;
        top: 95%;
        transform: translate(-50%, -50%);
        width: 22%;
        height: 22%;
        border-radius: var(--radius-circle);
        border: 2px solid var(--dot-bg, var(--tone-bg));
    }

    /* State dot - position 85%/85% = edge of the circle 45° */
    .avatar-circular .state-dot {
        left: 85%;
        top: 85%;
    }

    button.state-dot {
        cursor: pointer;
    }

    /* State */
    .avatar-online {
        background: var(--success);
    }

    .avatar-offline {
        background: var(--error);
    }

    .avatar-absent {
        background: var(--warning);
    }

    .avatar-do-not-disturb {
        background: var(--dot-bg, var(--tone-bg));
        box-shadow: inset 0 0 0 2px var(--neutral);
    }
</style>
