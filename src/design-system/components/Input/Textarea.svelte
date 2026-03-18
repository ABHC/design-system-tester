<script lang="ts">
    import { createVariant } from '../../utils/builder';
    import { inputConfig } from './input.config';

    type Size   = "sm" | "md" | "lg";
    type Resize = "none" | "vertical" | "both";

    interface Props {
        value?:       string;
        placeholder?: string;
        label?:       string;
        hint?:        string;
        error?:       string;
        success?:     string;
        size?:        Size;
        rows?:        number;
        resize?:      Resize;
        disabled?:    boolean;
        readonly?:    boolean;
        required?:    boolean;
        name?:        string;
        id?:          string;
    }

    let {
        value       = $bindable(""),
        placeholder = "",
        label,
        hint,
        error,
        success,
        size        = "md",
        rows        = 4,
        resize      = "vertical",
        disabled    = false,
        readonly    = false,
        required    = false,
        name,
        id,
    }: Props = $props();

    const uid = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;

    const resolve = createVariant(inputConfig);

    const root_classes = $derived(
        resolve({
            size,
            disabled:    disabled ? true : undefined,
            has_error:   error    ? true : undefined,
            has_success: success && !error ? true : undefined,
        }).trim()
    );
</script>

<div class={root_classes}>
    {#if label}
        <label class="input-label" for={uid}>
            {label}{#if required}<span class="input-required" aria-hidden="true"> *</span>{/if}
        </label>
    {/if}

    <div class="input-field">
        <textarea
            class="input-textarea"
            style:resize
            {rows}
            {placeholder}
            {disabled}
            {readonly}
            {required}
            {name}
            id={uid}
            bind:value
        ></textarea>
    </div>

    {#if error}
        <span class="input-message input-message-error" role="alert">{error}</span>
    {:else if success}
        <span class="input-message input-message-success">{success}</span>
    {:else if hint}
        <span class="input-message">{hint}</span>
    {/if}
</div>

<style>
    /* Root ──────────────────────────────────────────────────────────── */

    .input-root {
        display:        flex;
        flex-direction: column;
        gap:            0.35rem;
        width:          100%;
    }

    /* Label ─────────────────────────────────────────────────────────── */

    .input-label {
        font-size:   0.85rem;
        font-weight: 600;
        color:       var(--text);
        line-height: 1.3;
    }

    .input-required {
        color: var(--ctx-error);
    }

    /* Field wrapper ─────────────────────────────────────────────────── */

    .input-field {
        display:       flex;
        background:    var(--card);
        border:        2px solid var(--highlight);
        border-radius: 6px;
        overflow:      hidden;
        transition:    border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .input-field:focus-within {
        border-color: var(--accent-more);
        box-shadow:   0 0 0 3px color-mix(in srgb, var(--accent-more) 18%, transparent);
    }

    /* Textarea ──────────────────────────────────────────────────────── */

    .input-textarea {
        flex:        1;
        background:  transparent;
        border:      none;
        outline:     none;
        color:       var(--text);
        font-family: var(--font-body);
        width:       100%;
        min-width:   0;
        min-height:  80px;
        line-height: 1.6;
    }

    .input-textarea::placeholder {
        color:   var(--text-muted);
        opacity: 0.7;
    }

    /* Message ───────────────────────────────────────────────────────── */

    .input-message {
        font-size:   0.75rem;
        color:       var(--text-muted);
        line-height: 1.4;
    }

    .input-message-error   { color: var(--ctx-error);  }
    .input-message-success { color: var(--ctx-success); }

    /* ── Sizes ───────────────────────────────────────────────────────── */

    .input-sm .input-field    { border-radius: 5px; }
    .input-sm .input-textarea { font-size: 0.8rem;  padding: 0.35rem 0.65rem; }
    .input-sm .input-label    { font-size: 0.78rem; }
    .input-sm .input-message  { font-size: 0.7rem;  }

    .input-md .input-textarea { font-size: 0.9rem;  padding: 0.6rem 0.9rem; }

    .input-lg .input-field    { border-radius: 8px; }
    .input-lg .input-textarea { font-size: 1rem;    padding: 0.85rem 1.1rem; }
    .input-lg .input-label    { font-size: 0.9rem;  }

    /* ── Validation states ───────────────────────────────────────────── */

    .input-has-error .input-field {
        border-color: var(--ctx-error);
    }
    .input-has-error .input-field:focus-within {
        border-color: var(--ctx-error);
        box-shadow:   0 0 0 3px color-mix(in srgb, var(--ctx-error) 18%, transparent);
    }

    .input-has-success .input-field {
        border-color: var(--ctx-success);
    }
    .input-has-success .input-field:focus-within {
        border-color: var(--ctx-success);
        box-shadow:   0 0 0 3px color-mix(in srgb, var(--ctx-success) 18%, transparent);
    }

    /* ── Disabled ────────────────────────────────────────────────────── */

    .input-disabled {
        opacity: 0.5;
        cursor:  not-allowed;
    }

    .input-disabled .input-field,
    .input-disabled .input-textarea {
        cursor: not-allowed;
    }
</style>
