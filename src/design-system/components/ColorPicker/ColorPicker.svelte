<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { colorPickerConfig, defaultColorPickerConfig } from "./colorPicker.config";
    import { hexToOklch, oklchToHex, hexToRgbChannels } from "$lib/utils/contrast";

    // Types ------------------------------------------------------------------

    type Elevation = "none" | "subtle" | "hard";
    type Mode = "full" | "achromatic";

    // Props ------------------------------------------------------------------

    interface Props {
        value?: string;
        mode?: Mode;
        rounded?: boolean;
        elevation?: Elevation;
        alpha?: boolean;
        leading?: Snippet;
        children?: Snippet;
        extra?: Snippet;
        trailing?: Snippet;
        onchange?: (hex: string, alpha: number) => void;
    }

    let {
        value = "#6644ff",
        mode = "full",
        rounded = defaultColorPickerConfig.rounded,
        elevation = defaultColorPickerConfig.elevation,
        alpha: showAlpha = false,
        leading,
        children,
        extra,
        trailing,
        onchange,
    }: Props = $props();

    // Variant resolver -------------------------------------------------------

    const resolve = createVariant(colorPickerConfig);
    const classes = $derived(resolve({ rounded, elevation }));

    // Internal OKLCH state ---------------------------------------------------

    let lightness = $state(0.5);
    let chroma = $state(0.15);
    let hue = $state(270);
    let alphaValue = $state(1);
    let internalChange = false;

    // Sync from external value prop - skip when the change originated from our own sliders
    $effect(() => {
        if (value) {
            if (internalChange) {
                internalChange = false;
                return;
            }
            const oklch = hexToOklch(value);
            if (oklch) {
                lightness = oklch.l;
                chroma = mode === "achromatic" ? 0 : oklch.c;
                hue = oklch.h;
            }
        }
    });

    // Derived values ---------------------------------------------------------

    const currentHex = $derived(oklchToHex(lightness, mode === "achromatic" ? 0 : chroma, hue));
    const rgbChannels = $derived(hexToRgbChannels(currentHex));
    const rgbaDisplay = $derived(
        rgbChannels ? `rgba(${rgbChannels}, ${alphaValue.toFixed(2)})` : null
    );
    const oklchDisplay = $derived(
        `${(lightness * 100).toFixed(1)}% ${(mode === "achromatic" ? 0 : chroma).toFixed(3)} ${hue.toFixed(1)}°`
    );

    // Canvas rendering -------------------------------------------------------

    let spectrumCanvas: HTMLCanvasElement | undefined = $state();
    let canvasWidth = 280;
    let canvasHeight = 160;

    function drawSpectrum(l: number) {
        if (!spectrumCanvas) return;
        const ctx = spectrumCanvas.getContext("2d");
        if (!ctx) return;

        const w = spectrumCanvas.width;
        const h = spectrumCanvas.height;
        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        for (let y = 0; y < h; y++) {
            const c = (1 - y / h) * 0.4;
            for (let x = 0; x < w; x++) {
                const hVal = (x / w) * 360;
                const hex = oklchToHex(l, c, hVal);
                const rgb = parseHexFast(hex);
                const idx = (y * w + x) * 4;
                data[idx] = rgb[0];
                data[idx + 1] = rgb[1];
                data[idx + 2] = rgb[2];
                data[idx + 3] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function parseHexFast(hex: string): [number, number, number] {
        return [
            parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16),
        ];
    }

    // Redraw spectrum when lightness or mode changes
    $effect(() => {
        void mode;
        drawSpectrum(lightness);
    });

    // Canvas interaction -----------------------------------------------------

    let draggingCanvas = $state(false);

    function updateFromCanvas(e: MouseEvent) {
        if (!spectrumCanvas) return;
        const rect = spectrumCanvas.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        hue = x * 360;
        chroma = (1 - y) * 0.4;
        emitChange();
    }

    function onCanvasPointerDown(e: MouseEvent) {
        draggingCanvas = true;
        updateFromCanvas(e);
    }

    function onCanvasPointerMove(e: MouseEvent) {
        if (draggingCanvas) updateFromCanvas(e);
    }

    function onCanvasPointerUp() {
        draggingCanvas = false;
    }

    // Cursor position --------------------------------------------------------

    const cursorX = $derived(`${(hue / 360) * 100}%`);
    const cursorY = $derived(`${(1 - chroma / 0.4) * 100}%`);

    // Slider handlers --------------------------------------------------------

    function onLightnessInput(e: Event) {
        lightness = parseFloat((e.target as HTMLInputElement).value);
        emitChange();
    }

    function onChromaInput(e: Event) {
        chroma = parseFloat((e.target as HTMLInputElement).value);
        emitChange();
    }

    function onHueInput(e: Event) {
        hue = parseFloat((e.target as HTMLInputElement).value);
        emitChange();
    }

    function onAlphaInput(e: Event) {
        alphaValue = parseFloat((e.target as HTMLInputElement).value);
        emitChange();
    }

    function emitChange() {
        internalChange = true;
        const hex = oklchToHex(lightness, mode === "achromatic" ? 0 : chroma, hue);
        onchange?.(hex, alphaValue);
    }

    // Hex input --------------------------------------------------------------

    let hexInput = $state("");
    $effect(() => { hexInput = currentHex; });

    function applyHexInput() {
        const oklch = hexToOklch(hexInput.trim());
        if (oklch) {
            lightness = oklch.l;
            chroma = mode === "achromatic" ? 0 : oklch.c;
            hue = oklch.h;
            emitChange();
        }
    }

    function onHexKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") applyHexInput();
    }

    // Slider track gradients -------------------------------------------------

    const lightnessGradient = $derived.by(() => {
        const c = mode === "achromatic" ? 0 : chroma;
        const stops = [];
        for (let i = 0; i <= 10; i++) {
            const l = i / 10;
            stops.push(oklchToHex(l, c, hue));
        }
        return `linear-gradient(to right, ${stops.join(", ")})`;
    });

    const hueGradient = $derived.by(() => {
        const c = mode === "achromatic" ? 0 : chroma;
        const stops = [];
        for (let i = 0; i <= 12; i++) {
            const h = (i / 12) * 360;
            stops.push(oklchToHex(lightness, c, h));
        }
        return `linear-gradient(to right, ${stops.join(", ")})`;
    });

    const chromaGradient = $derived.by(() => {
        const stops = [];
        for (let i = 0; i <= 8; i++) {
            const c = (i / 8) * 0.4;
            stops.push(oklchToHex(lightness, c, hue));
        }
        return `linear-gradient(to right, ${stops.join(", ")})`;
    });

    const alphaGradient = $derived(
        `linear-gradient(to right, transparent, ${currentHex})`
    );
</script>

<svelte:window
    onpointermove={onCanvasPointerMove}
    onpointerup={onCanvasPointerUp}
/>

<div class={classes}>
    {#if leading}
        <div class="color-picker-header">
            {@render leading()}
        </div>
    {/if}

    <div class="color-picker-body">
        {#if mode === "full"}
            <div class="color-row">
                <div class="cp-spectrum-wrap">
                    <canvas
                        bind:this={spectrumCanvas}
                        width={canvasWidth}
                        height={canvasHeight}
                        class="cp-spectrum"
                        onpointerdown={onCanvasPointerDown}
                    ></canvas>
                    <div
                        class="cp-cursor"
                        style="left: {cursorX}; top: {cursorY};"
                    ></div>
                </div>

                <div class="cp-side">
                    <!-- Sliders -->
                    <div class="cp-sliders">
                        <label class="cp-slider-row">
                            <span class="cp-slider-label">L</span>
                            <div class="cp-slider-track" style="background: {lightnessGradient};">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.005"
                                    value={lightness}
                                    oninput={onLightnessInput}

                                    class="cp-slider"
                                />
                            </div>
                            <span class="cp-slider-value">{(lightness * 100).toFixed(0)}</span>
                        </label>

                        <label class="cp-slider-row">
                            <span class="cp-slider-label">C</span>
                            <div class="cp-slider-track" style="background: {chromaGradient};">
                                <input
                                    type="range"
                                    min="0"
                                    max="0.4"
                                    step="0.001"
                                    value={chroma}
                                    oninput={onChromaInput}

                                    class="cp-slider"
                                />
                            </div>
                            <span class="cp-slider-value">{chroma.toFixed(3)}</span>
                        </label>

                        <label class="cp-slider-row">
                            <span class="cp-slider-label">H</span>
                            <div class="cp-slider-track" style="background: {hueGradient};">
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    step="1"
                                    value={hue}
                                    oninput={onHueInput}

                                    class="cp-slider"
                                />
                            </div>
                            <span class="cp-slider-value">{hue.toFixed(0)}°</span>
                        </label>

                        {#if showAlpha}
                            <label class="cp-slider-row">
                                <span class="cp-slider-label">A</span>
                                <div class="cp-slider-track cp-alpha-track" style="--alpha-grad: {alphaGradient};">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={alphaValue}
                                        oninput={onAlphaInput}
                                        class="cp-slider"
                                    />
                                </div>
                                <span class="cp-slider-value">{(alphaValue * 100).toFixed(0)}%</span>
                            </label>
                        {/if}
                    </div>

                    <!-- Preview swatch -->
                    <div class="cp-preview-row">
                        <div
                            class="cp-preview"
                            style="background: {showAlpha ? `rgba(${rgbChannels}, ${alphaValue})` : currentHex};"
                        ></div>
                        <div class="cp-values">
                            <label class="cp-field">
                                <span class="cp-label">HEX</span>
                                <input
                                    type="text"
                                    class="cp-input"
                                    bind:value={hexInput}
                                    onkeydown={onHexKeydown}
                                    onblur={applyHexInput}
                                />
                            </label>
                            {#if showAlpha && rgbaDisplay}
                                <div class="cp-field">
                                    <span class="cp-label">RGBA</span>
                                    <span class="cp-value">{rgbaDisplay}</span>
                                </div>
                            {:else if rgbChannels}
                                <div class="cp-field">
                                    <span class="cp-label">RGB</span>
                                    <span class="cp-value">{rgbChannels}</span>
                                </div>
                            {/if}
                            <div class="cp-field">
                                <span class="cp-label">OKLCH</span>
                                <span class="cp-value">{oklchDisplay}</span>
                            </div>
                        </div>
                    </div>

                    {#if extra}
                        <div class="color-picker-extra">
                            {@render extra()}
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <!-- Achromatic mode: simple vertical layout -->
            <div class="cp-sliders">
                <label class="cp-slider-row">
                    <span class="cp-slider-label">L</span>
                    <div class="cp-slider-track" style="background: {lightnessGradient};">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.005"
                            value={lightness}
                            oninput={onLightnessInput}
                            class="cp-slider"
                        />
                    </div>
                    <span class="cp-slider-value">{(lightness * 100).toFixed(0)}</span>
                </label>

                {#if showAlpha}
                    <label class="cp-slider-row">
                        <span class="cp-slider-label">A</span>
                        <div class="cp-slider-track cp-alpha-track" style="--alpha-grad: {alphaGradient};">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={alphaValue}
                                oninput={onAlphaInput}
                                class="cp-slider"
                            />
                        </div>
                        <span class="cp-slider-value">{(alphaValue * 100).toFixed(0)}%</span>
                    </label>
                {/if}
            </div>

            <div class="cp-preview-row">
                <div
                    class="cp-preview"
                    style="background: {showAlpha ? `rgba(${rgbChannels}, ${alphaValue})` : currentHex};"
                ></div>
                <div class="cp-values">
                    <label class="cp-field">
                        <span class="cp-label">HEX</span>
                        <input
                            type="text"
                            class="cp-input"
                            bind:value={hexInput}
                            onkeydown={onHexKeydown}
                            onblur={applyHexInput}
                        />
                    </label>
                    {#if showAlpha && rgbaDisplay}
                        <div class="cp-field">
                            <span class="cp-label">RGBA</span>
                            <span class="cp-value">{rgbaDisplay}</span>
                        </div>
                    {:else if rgbChannels}
                        <div class="cp-field">
                            <span class="cp-label">RGB</span>
                            <span class="cp-value">{rgbChannels}</span>
                        </div>
                    {/if}
                    <div class="cp-field">
                        <span class="cp-label">OKLCH</span>
                        <span class="cp-value">{oklchDisplay}</span>
                    </div>
                </div>
            </div>

            {#if extra}
                <div class="color-picker-extra">
                    {@render extra()}
                </div>
            {/if}
        {/if}

        {#if children}
            {@render children()}
        {/if}
    </div>

    {#if trailing}
        <div class="color-picker-footer">
            {@render trailing()}
        </div>
    {/if}
</div>

<style>
    /* Base ----------------------------------------------------------------- */

    .color-picker {
        --cp-radius: 10px;
        --cp-padding: 1rem;

        display: flex;
        flex-direction: column;
        background: var(--tone);
        color: var(--text);
        overflow: hidden;
        box-sizing: border-box;
    }

    /* Rounded -------------------------------------------------------------- */

    .color-picker-rounded {
        border-radius: var(--cp-radius);
    }

    /* Elevation ------------------------------------------------------------ */

    .color-picker-elevation-none {
        box-shadow: none;
    }

    .color-picker-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .color-picker-elevation-hard {
        box-shadow: 0.4rem 0.4rem var(--shadow-hard);
    }

    /* Zones ---------------------------------------------------------------- */

    .color-picker-header {
        flex-shrink: 0;
        overflow: hidden;
    }

    .color-picker-rounded .color-picker-header {
        border-radius: var(--cp-radius) var(--cp-radius) 0 0;
    }

    .color-picker-body {
        flex: 1;
        padding: var(--cp-padding);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .color-row {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
    }

    .cp-side {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .color-picker-footer {
        padding: calc(var(--cp-padding) * 0.75) var(--cp-padding);
        border-top: 1px solid var(--tone-hover);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
    }

    /* Spectrum ------------------------------------------------------------- */

    .cp-spectrum-wrap {
        position: relative;
        width:50%;
        aspect-ratio: 280 / 160;
        border-radius: var(--radius-edge);
        overflow: hidden;
        cursor: crosshair;
    }

    .cp-spectrum {
        display: block;
        width: 100%;
        height: 100%;
    }

    .cp-cursor {
        position: absolute;
        width: 14px;
        height: 14px;
        border: 2px solid #fff;
        border-radius: var(--radius-circle);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    /* Preview -------------------------------------------------------------- */

    .cp-preview-row {
        display: flex;
        gap: 0.75rem;
        align-items: stretch;
    }

    .cp-preview {
        width: 56px;
        min-height: 56px;
        border: 1px solid var(--tone-hover);
        flex-shrink: 0;
    }

    .color-picker-rounded .cp-preview {
        border-radius: var(--radius-soft);
    }

    .cp-values {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
        justify-content: center;
    }

    .cp-field {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .cp-label {
        font-size: 0.6rem;
        font-weight: 700;
        text-transform: uppercase;
        opacity: 0.5;
        width: 2.5rem;
        flex-shrink: 0;
    }

    .cp-value {
        font-size: 0.7rem;
        font-family: monospace;
        font-weight: 600;
    }

    .cp-input {
        font-size: 0.7rem;
        font-family: monospace;
        font-weight: 600;
        background: var(--tone-bg);
        color: var(--text);
        border: 1px solid var(--tone-hover);
        border-radius: var(--radius-edge);
        padding: 2px 6px;
        width: 6rem;
    }

    .cp-input:focus {
        outline: 2px solid var(--accent);
        outline-offset: -1px;
    }

    /* Sliders -------------------------------------------------------------- */

    .cp-sliders {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .cp-slider-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .cp-slider-label {
        font-size: 0.65rem;
        font-weight: 700;
        opacity: 0.5;
        width: 1rem;
        text-align: right;
        flex-shrink: 0;
    }

    .cp-slider-track {
        flex: 1;
        height: 12px;
        border-radius: var(--radius-edge);
        position: relative;
        border: 1px solid var(--tone-hover);
    }

    .cp-alpha-track {
        position: relative;
        background-color: #fff;
        background-image:
            linear-gradient(45deg, #ddd 25%, transparent 25%),
            linear-gradient(-45deg, #ddd 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ddd 75%),
            linear-gradient(-45deg, transparent 75%, #ddd 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
    }

    .cp-alpha-track::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--alpha-grad);
        pointer-events: none;
    }

    .cp-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 100%;
        background: transparent;
        margin: 0;
        cursor: pointer;
        position: relative;
    }

    .cp-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: var(--radius-circle);
        background: #fff;
        border: 2px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        cursor: grab;
    }

    .cp-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: var(--radius-circle);
        background: #fff;
        border: 2px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        cursor: grab;
    }

    .cp-slider-value {
        font-size: 0.65rem;
        font-family: monospace;
        font-weight: 600;
        width: 2.5rem;
        text-align: right;
        flex-shrink: 0;
    }

    /* Extra ---------------------------------------------------------------- */

    .color-picker-extra {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    @media (max-width: 1024px) {
        .color-row {
            flex-direction: column;
            align-items: stretch;
        }

        .cp-spectrum-wrap {
            width: 100%;
        }
    }
</style>
