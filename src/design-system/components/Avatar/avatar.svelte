<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { avatarConfig } from "./avatar.config";

    type Size = "xsm" | "sm" | "md" | "lg" | "xlg";
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

    /* Palette — accent */
    .avatar-palette-accent {
        background: color-mix(in srgb, var(--accent) 80%, var(--card));
        color: color-mix(in srgb, var(--text-accent) 65%, transparent);
    }

    /* Palette — tone */
    .avatar-palette-tone {
        background: var(--highlight);
        color: color-mix(in srgb, var(--text) 65%, transparent);
    }

    /* Sizes */
    .avatar-xsm {
        width: 24px;
        height: 24px;
        font-size: 0.5rem;
    }

    .avatar-sm {
        width: 32px;
        height: 32px;
        font-size: 0.6rem;
    }

    .avatar-md {
        width: 40px;
        height: 40px;
    }

    .avatar-lg {
        width: 56px;
        height: 56px;
        font-size: 0.8rem;
    }

    .avatar-xlg {
        width: 96px;
        height: 96px;
        font-size: 1.1rem;
    }

    /* Shape */
    .avatar-circular {
        border-radius: 50%;
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
        border-radius: 50%;
        border: 2px solid var(--dot-bg, var(--bg));
    }

    /* State dot — position 85%/85% = edge of the circle 45° */
    .avatar-circular .state-dot {
        left: 85%;
        top: 85%;
    }

    button.state-dot {
        cursor: pointer;
    }

    /* State */
    .avatar-online {
        background: var(--ctx-success);
    }

    .avatar-offline {
        background: var(--ctx-error);
    }

    .avatar-absent {
        background: var(--ctx-warning);
    }

    .avatar-do-not-disturb {
        background: var(--dot-bg, var(--bg));
        box-shadow: inset 0 0 0 2px var(--ctx-info);
    }
</style>
