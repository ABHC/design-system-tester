<script lang="ts">
    import type { Snippet } from 'svelte';
    import { createVariant } from '../../utils/builder';
    import { inputConfig } from './input.config';

    type Size = "sm" | "md" | "lg";
    type InputType = "text" | "email" | "password" | "number" | "search" | "tel" | "url";

    interface Props {
        value?: string;
        type?: InputType;
        placeholder?: string;
        label?: string;
        hint?: string;
        error?: string;
        success?: string;
        size?: Size;
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        name?: string;
        id?: string;
        min?: number;
        max?: number;
        step?: number;
        leading?: Snippet;
        trailing?: Snippet;
    }

    let {
        value = $bindable(""),
        type = "text",
        placeholder = "",
        label,
        hint,
        error,
        success,
        size = "md",
        disabled = false,
        readonly = false,
        required = false,
        name,
        id,
        min = undefined,
        max = undefined,
        step = 1,
        leading,
        trailing,
    }: Props = $props();

    const uid = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;

    const resolve = createVariant(inputConfig);

    // Password reveal toggle
    let show_password: boolean = $state(false);
    const effective_type = $derived(
        type === "password" && show_password ? "text" :
        type === "number" ? "text" :
        type
    );
    const has_pw_toggle = $derived(type === "password" && !trailing);
    const has_num_spinners = $derived(type === "number" && !trailing);

    function increment() {
        const n = parseFloat(value) || 0;
        const next = n + step;
        if (max !== undefined && next > max) return;
        value = String(next);
    }

    function decrement() {
        const n = parseFloat(value) || 0;
        const next = n - step;
        if (min !== undefined && next < min) return;
        value = String(next);
    }

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
        <label class="input-label" for={uid}>
            {label}
            {#if required}
                <span class="input-required" aria-hidden="true">*</span>
            {/if}
        </label>
    {/if}

    <div class="input-field">
        {#if leading}
            <span class="input-addon input-leading" aria-hidden="true">
                {@render leading()}
            </span>
        {/if}

        <input
            class="input-element"
            class:has-leading={!!leading}
            class:has-trailing={!!trailing || has_pw_toggle || has_num_spinners}
            type={effective_type}
            inputmode={type === "number" ? "numeric" : undefined}
            {placeholder}
            {disabled}
            {readonly}
            {required}
            {name}
            id={uid}
            bind:value
        />

        {#if trailing}
            <span class="input-addon input-trailing" aria-hidden="true">
                {@render trailing()}
            </span>
        {:else if has_num_spinners}
            <div class="input-spinners">
                <button
                    class="input-spinner"
                    type="button"
                    tabindex="-1"
                    aria-label="Increment"
                    onclick={increment}
                >
                    <svg viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M5 0L10 6H0Z" fill="currentColor"/>
                    </svg>
                </button>
                <button
                    class="input-spinner"
                    type="button"
                    tabindex="-1"
                    aria-label="Decrement"
                    onclick={decrement}
                >
                    <svg viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M5 6L0 0H10Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        {:else if has_pw_toggle}
            <button
                class="input-addon input-trailing input-pw-toggle"
                type="button"
                tabindex="-1"
                aria-label={show_password ? "Hide password" : "Show password"}
                onclick={() => show_password = !show_password}
            >
                {#if show_password}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M2 12Q12 4 22 12Q12 20 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="12" cy="12" r="1.75" fill="currentColor"/>
                        <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M2 12Q12 4 22 12Q12 20 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/>
                        <circle cx="12" cy="12" r="1.75" fill="currentColor"/>
                    </svg>
                {/if}
            </button>
        {/if}
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
    /* Root ------------------------------------------------------------ */

    .input-root {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        width: 100%;
    }

    /* Label ----------------------------------------------------------- */

    .input-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text);
        line-height: 1.3;
    }

    .input-required {
        color: var(--error);
    }

    /* Field wrapper --------------------------------------------------- */

    .input-field {
        display: flex;
        align-items: center;
        background: var(--tone);
        border: 2px solid var(--tone-hover);
        border-radius: var(--radius-edge);
        overflow: hidden;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .input-field:focus-within {
        border-color: var(--accent-muted);
        box-shadow: 0 0 0 3px var(--accent-ghost-hover);
    }

    /* Native input ---------------------------------------------------- */

    .input-element {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        font-family: var(--font-body);
        width: 100%;
        min-width: 0;
    }

    .input-element::placeholder {
        color: var(--text-muted);
        opacity: 0.7;
    }

    .input-element:-webkit-autofill,
    .input-element:-webkit-autofill:hover,
    .input-element:-webkit-autofill:focus,
    .input-element:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 100px var(--tone) inset !important;
        -webkit-text-fill-color: var(--text) !important;
        caret-color: var(--text);
    }

    /* Addons ---------------------------------------------------------- */

    .input-addon {
        display: flex;
        align-items: center;
        color: var(--text-muted);
        flex-shrink: 0;
        pointer-events: none;
    }

    .input-pw-toggle {
        pointer-events: auto;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: var(--text-muted);
        transition: color 0.15s ease;
    }

    .input-pw-toggle:hover {
        color: var(--text);
    }

    .input-pw-toggle svg {
        display: block;
        width: 1.8em;
        height: 1.8em;
    }

    /* Message --------------------------------------------------------- */

    .input-message {
        font-size: 0.75rem;
        color: var(--text-muted);
        line-height: 1.4;
    }

    .input-message-error {
        color: var(--error);
    }

    .input-message-success {
        color: var(--success);
    }

    /* Sizes ----------------------------------------------------------- */

    .input-sm .input-field {
        border-radius: var(--radius-edge);
    }

    .input-sm .input-element { 
        font-size: 0.8rem;  
        padding: 0.35rem 0.65rem; 
    }

    .input-sm .input-element.has-leading { 
        padding-left:  0.2rem; 
    }

    .input-sm .input-element.has-trailing { 
        padding-right: 0.2rem; 
    }

    .input-sm .input-addon { 
        padding: 0 0.45rem; 
    }

    .input-sm .input-label { 
        font-size: 0.78rem; 
    }

    .input-sm .input-message { 
        font-size: 0.7rem; 
    }

    .input-md .input-element { 
        font-size: 0.9rem; 
        padding: 0.6rem 0.9rem; 
    }

    .input-md .input-element.has-leading { 
        padding-left:  0.25rem;
    }
    
    .input-md .input-element.has-trailing { 
        padding-right: 0.25rem; 
    }

    .input-md .input-addon { 
        padding: 0 0.6rem; 
    }

    .input-lg .input-field {
        border-radius: var(--radius-soft);
    }
    
    .input-lg .input-element { 
        font-size: 1rem; padding: 0.85rem 1.1rem; 
    }

    .input-lg .input-element.has-leading { 
        padding-left:  0.35rem; 
    }

    .input-lg .input-element.has-trailing { 
        padding-right: 0.35rem; 
    }

    .input-lg .input-addon { 
        padding: 0 0.75rem; 
    }
    
    .input-lg .input-label { 
        font-size: 0.9rem;  
    }

    /* Validation states ----------------------------------------------- */

    .input-has-error .input-field {
        border-color: var(--error);
    }
    .input-has-error .input-field:focus-within {
        border-color: var(--error);
        box-shadow: 0 0 0 3px var(--error-ghost-hover);
    }

    .input-has-success .input-field {
        border-color: var(--success);
    }
    .input-has-success .input-field:focus-within {
        border-color: var(--success);
        box-shadow: 0 0 0 3px var(--success-ghost-hover);
    }

    /* Number spinners ------------------------------------------------- */

    .input-spinners {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex-shrink: 0;
        margin-right: 0.25rem;
    }

    .input-spinner {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-muted);
        padding: 0.2rem 0.4rem;
        transition: background 0.15s ease, color 0.15s ease;
        line-height: 0;
    }

    .input-spinner:hover {
        background: var(--tone-hover);
        color: var(--text);
    }

    .input-spinner svg {
        width: 8px;
        height: 5px;
        display: block;
    }

    /* Disabled -------------------------------------------------------- */

    .input-disabled {
        opacity: 0.5;
        cursor:  not-allowed;
    }

    .input-disabled .input-field,
    .input-disabled .input-element {
        cursor: not-allowed;
    }
</style>
