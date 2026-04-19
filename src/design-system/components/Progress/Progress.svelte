<script lang="ts">
    import { createVariant } from "../../utils/builder";
    import { progressConfig } from './progress.config';

    type Palette = "accent" | "tone" | "neutral" | "error" | "warning" | "success" | "info";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    interface Props {
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        outlined?: boolean;
        rounded?: boolean;
        aria_label?: string;
        value?: number | null;
        unit?: string;
        max?: number;
    }

    let {
        palette = "accent",
        size = "md",
        elevation = "none",
        outlined = false,
        rounded = false,
        aria_label = undefined,
        value = null,
        unit = "",
        max = 100,
    }: Props = $props();

    const resolve = createVariant(progressConfig);

    const indeterminate = $derived(value === null);
    const pct = $derived(
        indeterminate ? 0 : Math.round(Math.min(100, Math.max(0, ((value ?? 0) / max) * 100)))
    );

    const track_classes = $derived(
        resolve({ size, elevation, outlined, rounded }).trim()
    );

    const fill_classes = $derived([
        "progress-fill",
        `progress-fill-${palette}`,
        indeterminate ? "progress-indeterminate" : "",
    ].filter(Boolean).join(" "));

    const value_classes = $derived([
        "progress-value",
        `progress-value-${palette}`,
    ].filter(Boolean).join(" "));
</script>

<div class="progress-container">
    {#if !indeterminate}
        <span class={value_classes}>{pct}&nbsp;{unit}</span>
    {/if}

    <div
        class={track_classes}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={aria_label}
    >
        <div
            class={fill_classes}
            style={indeterminate ? undefined : `--pct: ${pct}%`}
        ></div>
    </div>
</div>

<style>
    /* Track ----------------------------------------------------------- */

    .progress-base {
        width: 100%;
        background: var(--tone-hover);
        overflow: hidden;
        position: relative;
        margin: 10px 0;
    }

    /* Size ------------------------------------------------------------ */

    .progress-sm { 
        height: 4px; 
    }

    .progress-md { 
        height: 8px; 
    }

    .progress-lg { 
        height: 16px; 
    }

    /* Rounded --------------------------------------------------------- */

    .progress-rounded {
        border-radius: var(--radius-pill);
    }

    .progress-rounded .progress-fill {
        border-radius: var(--radius-pill);
    }

    /* Outlined -------------------------------------------------------- */

    .progress-outlined {
        background: transparent;
        border: 2px solid var(--tone-hover);
        /*box-shadow: inset 0 0 0 2px var(--tone-hover);*/
    }

    /* Elevation ------------------------------------------------------- */

    .progress-elevation-subtle { 
        box-shadow: 0 4px 12px var(--shadow-subtle); 
    }

    .progress-elevation-hard { 
        box-shadow: 0.3rem 0.3rem var(--shadow-hard);
    }

    /* Fill - base ------------------------------------------------------ */

    .progress-fill {
        height: 100%;
        width: var(--pct, 0%);
        transition: width 0.4s ease;
    }

    /* Entry animation: 0 to value when first rendered */
    @starting-style {
        .progress-fill {
            width: 0;
        }
    }

    /* Fill - palette --------------------------------------------------- */

    .progress-fill-accent  {
        background: var(--accent);  
    }

    .progress-fill-tone { 
        background: var(--tone-muted); 
    }

    .progress-fill-neutral { 
        background: var(--neutral); 
    }

    .progress-fill-error { 
        background: var(--error); 
    
    }
    .progress-fill-warning { 
        background: var(--warning); 
    }

    .progress-fill-success {
        background: var(--success);
    }

    .progress-fill-info { 
        background: var(--info);
    }

    /* Value - base ----------------------------------------------------- */

    .progress-value {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-right: 10px;
    }

    /* Fill - palette --------------------------------------------------- */

    .progress-value-accent  {
        color: var(--accent-muted);  
    }

    .progress-value-tone { 
        color: var(--tone-muted);
    }

    .progress-value-neutral { 
        color: var(--neutral-muted);
    }

    .progress-value-error { 
        color: var(--error-muted); 
    
    }
    .progress-value-warning { 
        color: var(--warning-muted); 
    }

    .progress-value-success {
        color: var(--success-muted);
    }

    .progress-value-info { 
        color: var(--info-muted);
    }

    /* Indeterminate --------------------------------------------------- */

    .progress-fill.progress-indeterminate {
        width: 40%;
        animation: progress-indeterminate 4s ease-out infinite;
    }

    @keyframes progress-indeterminate {
        0% { transform: translateX(-60%) scaleX(0.5); }
        100% { transform: translateX(260%)  scaleX(0.5); }
    }

    @keyframes progress-indeterminate-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
        .progress-fill.progress-indeterminate {
            width: 100%;
            transform: none;
            animation: progress-indeterminate-pulse 2s ease-in-out infinite;
        }
    }
</style>
