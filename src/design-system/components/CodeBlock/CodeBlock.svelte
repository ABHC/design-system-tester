<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { codeblockConfig } from "./codeblock.config";
    import Button from "../Button/Button.svelte";

    type Variant = "simple" | "titled" | "filename" | "tabbed" | "terminal";
    type Size = "sm" | "md" | "lg";

    interface Tab {
        label: string;
        code: string;
        language?: string;
    }

    /*
        -- Props
        title            : "titled" / "terminal" → text displayed in header
        filename         : "filename" variant    → file icon + name in header
        description      : markdown text for the description panel
        description_src  : URL to a file whose content is used as description (fetched, not executed)
        language         : language badge (e.g. "TypeScript", "CSS")
        tabs             : "tabbed" variant → tab navigation
        code             : code content for non-tabbed variants
        code_src         : URL to a file whose content is used as code (fetched, not executed)
        copyable         : show copy button
        line_numbers     : show line numbers
        rounded          : apply border-radius (default true)
        width            : CSS width value — if omitted, takes full available width
        max_height       : CSS max-height for the body area — enables scrolling when content overflows

        -- Layout modes (derived automatically, no prop needed)
        code + description  → split layout (description panel on left, code on right)
        code only           → code fills the body (default)
        description only    → description fills the full body width
    */

    interface Props {
        variant?: Variant;
        size?: Size;
        title?: string;
        filename?: string;
        description?: string;
        description_src?: string;
        language?: string;
        tabs?: Tab[];
        code?: string;
        code_src?: string;
        copyable?: boolean;
        line_numbers?: boolean;
        rounded?: boolean;
        width?: string;
        max_height?: string;
    }

    let {
        variant = "simple",
        size = "md",
        title = undefined,
        filename = undefined,
        description = undefined,
        description_src = undefined,
        language = undefined,
        tabs = undefined,
        code = undefined,
        code_src = undefined,
        copyable = false,
        line_numbers = false,
        rounded = true,
        width = undefined,
        max_height = undefined,
    }: Props = $props();

    // Renders basic markdown: **bold**, _italic_, `code`, newlines
    function md(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="codeblock-desc-inline">$1</code>')
            .replace(/\\n/g, '<br>')   // literal \n from plain HTML attribute strings
            .replace(/\n/g, '<br>');   // real newline from JS template literals
    }

    const resolve = createVariant(codeblockConfig);

    const variant_classes = $derived(resolve({ variant, size }));
    const classes = $derived(variant_classes.trim());

    // Active tab index
    let active_tab = $state(0);

    // Clipboard feedback state
    let copied = $state(false);

    // File-loaded content (fetched at runtime, content displayed as-is — never executed)
    let loaded_code = $state<string | undefined>(undefined);
    let loaded_description = $state<string | undefined>(undefined);

    $effect(() => {
        if (code_src) {
            fetch(code_src).then(r => r.text()).then(t => { loaded_code = t; });
        } else {
            loaded_code = undefined;
        }
    });

    $effect(() => {
        if (description_src) {
            fetch(description_src).then(r => r.text()).then(t => { loaded_description = t; });
        } else {
            loaded_description = undefined;
        }
    });

    // Effective content: src takes priority over inline prop
    const effective_code = $derived(loaded_code ?? code ?? "");
    const effective_description = $derived(loaded_description ?? description);

    // Current code to display (active tab or direct prop)
    const code_snippet = $derived(
        variant === "tabbed" && tabs
            ? (tabs[active_tab]?.code ?? "")
            : effective_code
    );

    // Current language (from active tab or direct prop)
    const code_language = $derived(
        variant === "tabbed" && tabs
            ? (tabs[active_tab]?.language ?? language ?? "")
            : (language ?? "")
    );

    // Lines array used when line numbers are enabled
    const lines = $derived(code_snippet.trim().split("\n"));

    // Header is only rendered for variants other than "simple"
    const has_header = $derived(variant !== "simple");

    // Layout modes — derived from content presence, no prop needed
    const is_split = $derived(!!effective_description && !!code_snippet);
    const is_description_only = $derived(!!effective_description && !code_snippet);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code_snippet.trim());
            copied = true;
            setTimeout(() => { copied = false; }, 2000);
        } catch {
            // clipboard API unavailable
        }
    }
</script>

<div
    class={classes}
    style:border-radius={rounded ? undefined : '0'}
    style:width={width}
>

    <!-- Header -->
    {#if has_header}
        <div class="codeblock-header">

            <!-- Left: title, filename, tabs or terminal prompt -->
            <div class="codeblock-header-left">
                {#if variant === "titled" && title}
                    <span class="codeblock-title">
                        {title}
                    </span>

                {:else if variant === "filename" && filename}
                    <span class="codeblock-filename">
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        {filename}
                    </span>

                {:else if variant === "tabbed" && tabs}
                    <div class="codeblock-tabs" role="tablist">
                        {#each tabs as tab, i}
                            <button
                                role="tab"
                                aria-selected={active_tab === i}
                                class="codeblock-tab {active_tab === i ? 'is-active' : ''}"
                                onclick={() => active_tab = i}
                            >
                                {tab.label}
                            </button>
                        {/each}
                    </div>

                {:else if variant === "terminal"}
                    <span
                        class="codeblock-terminal-prompt"
                        aria-hidden="true"
                    >
                        &gt;
                    </span>
                    {#if title}
                        <span class="codeblock-terminal-title">
                            {title}
                        </span>
                    {/if}
                {/if}
            </div>

            <!-- Right: language badge + copy button -->
            <div class="codeblock-header-right">
                {#if code_language}
                    <span class="codeblock-lang">
                        {code_language}
                    </span>
                {/if}
                {#if copyable && !is_description_only}
                    <Button variant="ghost" palette="tone" size="sm" onclick={handleCopy} aria_label="Copy code">
                        {#if copied}
                            <svg
                                width="11"
                                height="11"
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
                                width="11"
                                height="11"
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
                {/if}
            </div>
        </div>
    {/if}

    <!-- Code body -->
    <div
        class="codeblock-body {is_split ? 'codeblock-body-split' : ''}"
        style:max-height={max_height}
        style:overflow-y={max_height ? 'auto' : undefined}
    >

        <!-- Floating copy button for the "simple" variant (no header) -->
        {#if copyable && variant === "simple" && !is_description_only}
            <div class="codeblock-copy-float">
                <Button variant="ghost" palette="tone" size="sm" onclick={handleCopy} aria_label="Copy code">
                    {#if copied}
                        <svg
                            width="13"
                            height="13"
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
                        Copied
                    {:else}
                        <svg
                            width="13"
                            height="13"
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
                        Copy
                    {/if}
                </Button>
            </div>
        {/if}

        <!-- Description panel: left column in split layout, full width when description-only -->
        {#if is_split || is_description_only}
            <div class="codeblock-description {is_description_only ? 'codeblock-description-only' : ''}">
                {@html md(effective_description!)}
            </div>
        {/if}

        {#if !is_description_only}
            {#if line_numbers}
                <pre class="codeblock-pre"
                ><code class="codeblock-code codeblock-numbered"
                >{#each lines as line
                }<span class="codeblock-line">{line}</span
                >{/each}</code
                ></pre>
            {:else}
                <pre class="codeblock-pre"
                ><code class="codeblock-code"
                >{code_snippet.trim()}</code
                ></pre>
            {/if}
        {/if}
    </div>

</div>

<style>
    /* Base */
    .codeblock {
        border-radius: 10px;
        border: 2px solid var(--tone-hover);
        overflow: hidden;
        position: relative;
        margin: 20px 0;
    }

    /* Header */
    .codeblock-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0 1rem;
        background: var(--tone);
        border-bottom: 1px solid var(--tone-hover);
        min-height: 2.75rem;
    }

    .codeblock-header-left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
        overflow: hidden;
        min-height: 2.75rem;
    }

    .codeblock-header-right {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    /* Terminal prompt */
    .codeblock-terminal-prompt {
        font-family: monospace;
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--accent);
        flex-shrink: 0;
        user-select: none;
        padding: 1px 4px 2px 6px;
        border-radius: 4px;
        border: 2px solid var(--accent);
    }

    .codeblock-terminal-title {
        font-family: monospace;
        font-size: 0.875rem;
        color: var(--text-muted);
    }

    /* Title */
    .codeblock-title {
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--text);
    }

    /* Filename */
    .codeblock-filename {
        font-size: 0.875rem;
        color: var(--text-muted);
        font-family: monospace;
    }

    /* Tabs */
    .codeblock-tabs {
        display: flex;
        align-items: flex-end;
        gap: 0;
        height: 100%;
    }

    .codeblock-tab {
        padding: 0 1rem;
        height: 2.75rem;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: var(--text-muted);
        font-size: 0.875rem;
        font-family: var(--font-body);
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease;
        white-space: nowrap;
    }

    .codeblock-tab:hover {
        color: var(--text);
    }

    .codeblock-tab.is-active {
        color: var(--accent);
        border-bottom-color: var(--accent);
        font-weight: 600;
    }

    /* Language badge */
    .codeblock-lang {
        font-size: 0.7rem;
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        background: var(--tone-hover);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.6px;
        font-weight: 700;
        font-family: var(--font-body);
    }

    /*  Copy button */

    /* Floating copy button for the "simple" variant (no header) */
    .codeblock-copy-float {
        position: absolute;
        top: 0.625rem;
        right: 0.625rem;
        z-index: 1;
    }

    /* Code body */
    .codeblock-body {
        position: relative;
        background: var(--tone-bg);
    }

    /* Split layout: description panel on the left, code on the right */
    .codeblock-body-split {
        display: grid;
        grid-template-columns: 250px 1fr;
    }

    .codeblock-description {
        padding: 1.25rem 1.5rem;
        background: var(--tone);
        border-right: 1px solid var(--tone-hover);
        color: var(--text-muted);
        font-size: 0.875rem;
        line-height: 1.7;
        font-family: var(--font-body);
    }

    /* Description-only: takes full width, no right border */
    .codeblock-description-only {
        border-right: none;
    }

    /* Inline code rendered inside description markdown */
    :global(.codeblock-desc-inline) {
        font-family: monospace;
        font-size: 0.8em;
        background: var(--tone-hover);
        padding: 0.1em 0.35em;
        border-radius: 3px;
        color: var(--text);
    }

    .codeblock-pre {
        margin: 0;
        padding: 1.25rem 1.5rem;
        overflow: auto;
    }

    .codeblock-code {
        font-family: monospace;
        font-size: 0.875rem;
        color: var(--text);
        line-height: 1.7;
    }

    /* Line numbers */
    .codeblock-numbered {
        counter-reset: codeblock-line;
    }

    .codeblock-line {
        display: block;
        padding-left: 3rem;
        position: relative;
    }

    .codeblock-line::before {
        content: counter(codeblock-line);
        counter-increment: codeblock-line;
        position: absolute;
        left: 0;
        width: 2rem;
        text-align: right;
        color: var(--text-muted);
        user-select: none;
        opacity: 0.5;
        font-size: 0.8em;
        padding-right: 0.5rem;
        border-right: 1px solid var(--tone-hover);
    }

    /* Sizes */
    .codeblock-sm
    .codeblock-pre {
        padding: 0.75rem 1rem;
    }

    .codeblock-sm
    .codeblock-code {
        font-size: 0.75rem;
    }
    .codeblock-sm
    .codeblock-header {
        min-height: 2.25rem;
    }

    .codeblock-sm
    .codeblock-tab {
        height: 2.25rem; font-size: 0.8rem;
    }

    .codeblock-sm
    .codeblock-header-left {
        min-height: 2.25rem;
    }

    .codeblock-sm
    .codeblock-description {
        padding: 0.75rem 1rem;
        font-size: 0.75rem;
    }

    .codeblock-lg
    .codeblock-pre {
        padding: 1.75rem 2rem;
    }

    .codeblock-lg
    .codeblock-code {
        font-size: 1rem;
    }

    .codeblock-lg
    .codeblock-header {
        min-height: 3.25rem;
    }

    .codeblock-lg
    .codeblock-tab {
        height: 3.25rem;
        font-size: 1rem;
    }

    .codeblock-lg
    .codeblock-header-left {
        min-height: 3.25rem;
    }

    .codeblock-lg
    .codeblock-description {
        padding: 1.75rem 2rem;
        font-size: 1rem;
    }
</style>
