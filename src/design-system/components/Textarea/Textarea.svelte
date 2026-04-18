<script lang="ts">
    import { createVariant } from '../../utils/builder';
    import { TextareaConfig } from './textarea.config';

    type Size = "sm" | "md" | "lg";
    type Resize = "none" | "vertical" | "both";

    interface Props {
        value?: string;
        placeholder?: string;
        label?: string;
        hint?: string;
        error?: string;
        success?: string;
        size?: Size;
        rows?: number;
        resize?: Resize;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        name?: string;
        id?: string;
    }

    let {
        value = $bindable(""),
        placeholder = "",
        label,
        hint,
        error,
        success,
        size = "md",
        rows = 4,
        resize = "vertical",
        disabled = false,
        readonly = false,
        required = false,
        name,
        id,
    }: Props = $props();

    const uid = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;

    const resolve = createVariant(TextareaConfig);

    const root_classes = $derived(
        resolve({
            size,
            disabled: disabled ? true : undefined,
            has_error: error ? true : undefined,
            has_success: success && !error ? true : undefined,
        }).trim()
    );
</script>

<div class={root_classes}>
    {#if label}
        <label class="textarea-label" for={uid}>
            {label}
            {#if required}
                <span class="input-required" aria-hidden="true">*</span>
            {/if}
        </label>
    {/if}

    <div class="field-wrapper">
        <textarea
            class="textarea-field"
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
        <span class="textarea-message textarea-message-error" role="alert">{error}</span>
    {:else if success}
        <span class="textarea-message textarea-message-success">{success}</span>
    {:else if hint}
        <span class="textarea-message">{hint}</span>
    {/if}
</div>

<style>
    /* Root ------------------------------------------------------------ */

    .textarea-base {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        width: 100%;
    }

    /* Label ----------------------------------------------------------- */

    .textarea-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text);
        line-height: 1.3;
    }

    .input-required {
        color: var(--error);
    }

    /* Field wrapper --------------------------------------------------- */

    .field-wrapper {
        display: flex;
        background: var(--tone);
        border: 2px solid var(--tone-hover);
        border-radius: var(--radius-edge);
        overflow: hidden;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .field-wrapper:focus-within {
        border-color: var(--accent-muted);
        box-shadow: 0 0 0 3px var(--accent-ghost-hover);
    }

    /* Textarea -------------------------------------------------------- */

    .textarea-field {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        font-family: var(--font-body);
        width: 100%;
        min-width: 0;
        min-height: 80px;
        line-height: 1.6;
    }

    .textarea-field::placeholder {
        color: var(--text-muted);
        opacity: 0.7;
    }

    /* Message --------------------------------------------------------- */

    .textarea-message {
        font-size: 0.75rem;
        color: var(--text-muted);
        line-height: 1.4;
    }

    .textarea-message-error { 
        color: var(--error); 
    }
    
    .textarea-message-success { 
        color: var(--success); 
    }

    /* Sizes ----------------------------------------------------------- */

    .textarea-sm .field-wrapper {
        border-radius: var(--radius-edge);
    }

    .textarea-sm .textarea-field { 
        font-size: 0.8rem;  
        padding: 0.35rem 0.65rem; 
    }

    .textarea-sm .textarea-label { 
        font-size: 0.78rem; 
    }

    .textarea-sm .textarea-message { 
        font-size: 0.7rem;  
    }

    .textarea-md .textarea-field { 
        font-size: 0.9rem;  
        padding: 0.6rem 0.9rem; 
    }

    .textarea-lg .field-wrapper {
        border-radius: var(--radius-soft);
    }

    .textarea-lg .textarea-field { 
        font-size: 1rem;    
        padding: 0.85rem 1.1rem; 
    }

    .textarea-lg .textarea-label { 
        font-size: 0.9rem; 
    }

    /* Validation states ----------------------------------------------- */

    .textarea-has-error .field-wrapper {
        border-color: var(--error);
    }
    .textarea-has-error .field-wrapper:focus-within {
        border-color: var(--error);
        box-shadow: 0 0 0 3px var(--error-ghost-hover);
    }

    .textarea-has-success .field-wrapper {
        border-color: var(--success);
    }
    .textarea-has-success .field-wrapper:focus-within {
        border-color: var(--success);
        box-shadow: 0 0 0 3px var(--success-ghost-hover);
    }

    /* Disabled -------------------------------------------------------- */

    .textarea-disabled {
        opacity: 0.5;
        cursor:  not-allowed;
    }

    .textarea-disabled .field-wrapper,
    .textarea-disabled .textarea-field {
        cursor: not-allowed;
    }
</style>
