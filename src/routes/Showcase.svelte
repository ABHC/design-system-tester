<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";
    import { responsive } from "./store";

    import Avatar from "../design-system/components/Avatar/avatar.svelte";
    import Accordion from "../design-system/components/Accordion/Accordion.svelte";
    import AccordionHeader from "../design-system/components/Accordion/AccordionHeader.svelte";
    import Badge from "../design-system/components/Badge/Badge.svelte";
    import Button from "../design-system/components/Button/Button.svelte";
    import Callout from "../design-system/components/Callout/Callout.svelte";
    import Card from "../design-system/components/Card/Card.svelte";
    import ListItem from "../design-system/components/ListItem/ListItem.svelte";
    import Progress from "../design-system/components/Progress/Progress.svelte";
    import Slider from "../design-system/components/Slider/Slider.svelte";
    import Switch from "../design-system/components/Switch/Switch.svelte";
    import TileGrid from "../design-system/components/TileGrid/TileGrid.svelte";
    import Timeline from "../design-system/components/Timeline/Timeline.svelte";
    import TimelineItem from "../design-system/components/Timeline/TimelineItem.svelte";
    import type { Tile } from "../design-system/components/TileGrid/tilegrid.config";

    //  imer ─────────────────────────────────────────────────────────────────

    const SLIDE_COUNT = 8;
    const SLIDE_MS = 3500;
    const TILEGRID_INDEX = 1;

    let index = $state(0);
    let paused = false;
    let timer: ReturnType<typeof setInterval>;

    // TileGrid (index 1) doesn't render well below 768px — skip it
    const hide_tilegrid = $derived($responsive.isBelow(768));

    function next(i: number): number {
        let n = (i + 1) % SLIDE_COUNT;
        if (n === TILEGRID_INDEX && hide_tilegrid) n = (n + 1) % SLIDE_COUNT;
        return n;
    }

    // If breakpoint crosses while showing TileGrid, advance away
    $effect(() => {
        if (hide_tilegrid && index === TILEGRID_INDEX) index = next(index);
    });

    onMount(() => {
        timer = setInterval(() => {
            if (!paused) index = next(index);
        }, SLIDE_MS);
    });

    onDestroy(() => clearInterval(timer));

    // Slide 1 — TileGrid ────────────────────────────────────────────────────

    const tiles: Tile[] = [
        { 
            name: "TGV",  
            display: true, 
            media: [{ src: "/assets/tgv.jpeg", type: "image" }], 
            abstract: { en: "" } 
        },
        { 
            name: "Ariane",   
            display: true, 
            media: [{ src: "/assets/ariane3.jpeg", type: "image" }], 
            abstract: { en: "" } 
        },
        { 
            name: "Concorde",   
            display: true, 
            media: [{ src: "/assets/concorde.jpeg", type: "image" }], 
            abstract: { en: "" } 
        },
        { 
            name: "Minitel", 
            display: true, 
            media: [{ src: "/assets/minitel.jpeg", type: "image" }], 
            abstract: { en: "" } 
        },
    ];

    // Slide 3 — Settings switches ───────────────────────────────────────────

    let sw_dark = $state(false);
    let sw_rounded = $state(true);
    let sw_motion = $state(true);

    // Slide 5 — Sliders ─────────────────────────────────────────────────────

    let sl_font = $state(14);
    let sl_spacing = $state(16);
    let sl_opacity = $state(80);

    // Labels ────────────────────────────────────────────────────────────────

    const labels = ["Card", "TileGrid", "Accordion", "Settings", "Progress", "Slider", "ListItem", "Timeline"];
</script>

<div
    class="showcase"
    onmouseenter={() => paused = true}
    onmouseleave={() => paused = false}
    role="region"
    aria-label="Component showcase"
>
    <div class="showcase-stage">
        {#key index}
            <div class="showcase-slide" transition:fade={{ duration: 350 }}>

                {#if index === 0}
                    <!-- Slide 0 — Card profile -->
                    <Card variant="flat" elevation="hard" width="300px">
                        {#snippet children()}
                            <div class="cs-profile-body">
                                <Avatar size="md" circular label="AL" palette="accent" />
                                <div class="cs-profile-info">
                                    <strong>Alice Laurent</strong>
                                    <span>Design Engineer</span>
                                </div>
                                <div class="cs-profile-badges">
                                    <Badge palette="accent" size="sm" pill>Svelte 5</Badge>
                                    <Badge palette="tone" size="sm" pill>TypeScript</Badge>
                                </div>
                            </div>
                        {/snippet}
                        {#snippet trailing()}
                            <Button size="sm" variant="flat" palette="accent">View profile</Button>
                            <Button size="sm" variant="ghost" palette="tone">Message</Button>
                        {/snippet}
                    </Card>

                {:else if index === 1}
                    <!-- Slide 1 — TileGrid -->
                    <Card variant="flat" width="500px">
                        {#snippet children()}
                            <div class="cs-tilegrid">
                                <TileGrid
                                    {tiles}
                                    image_mode="image"
                                    columns={2}
                                    gap="0.5rem"
                                    show_hero_badge={false}
                                    show_hero_border={false}
                                    excerpt_length={36}
                                />
                            </div>
                        {/snippet}
                    </Card>

                {:else if index === 2}
                    <!-- Slide 2 — Accordion -->
                    <Card variant="flat" width="360px">
                        {#snippet children()}
                            <div class="cs-accordion">
                                <Accordion 
                                    variant="ghost" 
                                    palette="accent" 
                                    size="sm" 
                                    rounded
                                >
                                    <AccordionHeader label="Components" open={true}>
                                        <p>26 components, fully typed, composable via Svelte 5 snippets.</p>
                                    </AccordionHeader>
                                    <AccordionHeader label="Theming">
                                        <p>CSS custom properties. Dark mode and custom palettes built-in.</p>
                                    </AccordionHeader>
                                    <AccordionHeader label="Accessibility">
                                        <p>WCAG AA compliant. ARIA labels, keyboard navigation.</p>
                                    </AccordionHeader>
                                </Accordion>
                            </div>
                        {/snippet}
                    </Card>

                {:else if index === 3}
                    <!-- Slide 3 — Switches + Callout -->
                    <Card variant="flat" width="320px">
                        {#snippet leading()}
                            <div class="cs-settings-header">
                                <span class="material-symbols-outlined">tune</span>
                                <strong>Preferences</strong>
                            </div>
                        {/snippet}
                        {#snippet children()}
                            <div class="cs-settings-body">
                                <div class="cs-switch-row">
                                    <Switch bind:checked={sw_dark} palette="accent">
                                        {#snippet trailing()}
                                            <span>Dark mode</span>
                                        {/snippet}
                                    </Switch>
                                </div>
                                <div class="cs-switch-row">
                                    <Switch bind:checked={sw_rounded} palette="accent">
                                        {#snippet trailing()}
                                            <span>Rounded corners</span>
                                        {/snippet}
                                    </Switch>
                                </div>
                                <div class="cs-switch-row">
                                    <Switch bind:checked={sw_motion} palette="accent">
                                        {#snippet trailing()}
                                            <span>Reduce motion</span>
                                        {/snippet}
                                    </Switch>
                                </div>
                                <Callout variant="info" rounded bordered align="start">
                                    {#snippet leading()}
                                        <span class="material-symbols-outlined">info</span>
                                    {/snippet}
                                    {#snippet children()}
                                        <p>Settings are applied live across all components.</p>
                                    {/snippet}
                                </Callout>
                            </div>
                        {/snippet}
                    </Card>

                {:else if index === 4}
                    <!-- Slide 4 — Progress bars -->
                    <Card variant="flat" width="340px">
                        {#snippet leading()}
                            <div class="cs-progress-header">
                                <span class="material-symbols-outlined">bar_chart</span>
                                <strong>Coverage</strong>
                            </div>
                        {/snippet}
                        {#snippet children()}
                            <div class="cs-progress-body">
                                <div class="cs-progress-row">
                                    <span class="cs-progress-label">Button</span>
                                    <Progress palette="accent" size="sm" rounded value={92} />
                                </div>
                                <div class="cs-progress-row">
                                    <span class="cs-progress-label">Card</span>
                                    <Progress palette="success" size="sm" rounded value={100} />
                                </div>
                                <div class="cs-progress-row">
                                    <span class="cs-progress-label">Avatar</span>
                                    <Progress palette="info" size="sm" rounded value={78} />
                                </div>
                                <div class="cs-progress-row">
                                    <span class="cs-progress-label">TileGrid</span>
                                    <Progress palette="warning" size="sm" rounded value={65} />
                                </div>
                                <div class="cs-progress-row">
                                    <span class="cs-progress-label">Accordion</span>
                                    <Progress palette="error" size="sm" rounded value={45} />
                                </div>
                            </div>
                        {/snippet}
                    </Card>

                {:else if index === 5}
                    <!-- Slide 5 — Sliders -->
                    <Card variant="flat" width="320px">
                        {#snippet leading()}
                            <div class="cs-slider-header">
                                <span class="material-symbols-outlined">linear_scale</span>
                                <strong>Controls</strong>
                            </div>
                        {/snippet}
                        {#snippet children()}
                            <div class="cs-slider-body">
                                <div class="cs-slider-row">
                                    <div class="cs-slider-meta">
                                        <span class="cs-slider-label">Font size</span>
                                        <span class="cs-slider-value">{sl_font}px</span>
                                    </div>
                                    <Slider 
                                        palette="accent" 
                                        bind:value={sl_font} 
                                        min={10} 
                                        max={24} 
                                        step={1} 
                                        rounded 
                                    />
                                </div>
                                <div class="cs-slider-row">
                                    <div class="cs-slider-meta">
                                        <span class="cs-slider-label">Spacing</span>
                                        <span class="cs-slider-value">{sl_spacing}px</span>
                                    </div>
                                    <Slider 
                                        palette="tone" 
                                        bind:value={sl_spacing} 
                                        min={0} 
                                        max={32} 
                                        step={4} 
                                        rounded 
                                    />
                                </div>
                                <div class="cs-slider-row">
                                    <div class="cs-slider-meta">
                                        <span class="cs-slider-label">Opacity</span>
                                        <span class="cs-slider-value">{sl_opacity}%</span>
                                    </div>
                                    <Slider 
                                        palette="info" 
                                        bind:value={sl_opacity} 
                                        min={0} 
                                        max={100} 
                                        step={5} 
                                        rounded 
                                    />
                                </div>
                            </div>
                        {/snippet}
                    </Card>

                {:else if index === 6}
                    <!-- Slide 6 — ListItems -->
                    <Card variant="flat" width="320px">
                        {#snippet leading()}
                            <div class="cs-list-header">
                                <span class="material-symbols-outlined">list</span>
                                <strong>Components</strong>
                            </div>
                        {/snippet}
                        {#snippet children()}
                            <div class="cs-list-body">
                                <ListItem 
                                    label="Button" 
                                    palette="ghost" 
                                    rounded
                                >
                                    {#snippet leading()}
                                        <span class="material-symbols-outlined">
                                            smart_button
                                        </span>
                                    {/snippet}

                                    {#snippet trailing()}
                                        <Badge 
                                            palette="accent"  
                                            size="sm"
                                        >
                                            Stable
                                        </Badge>
                                    {/snippet}
                                </ListItem>

                                <ListItem 
                                    label="TileGrid"  
                                    palette="ghost" 
                                    rounded 
                                    active
                                >
                                    {#snippet leading()}
                                        <span class="material-symbols-outlined">
                                            grid_view
                                        </span>
                                    {/snippet}

                                    {#snippet trailing()}
                                        <Badge 
                                            palette="success" 
                                            size="sm"
                                        >
                                            New
                                        </Badge>
                                    {/snippet}
                                </ListItem>

                                <ListItem 
                                    label="Accordion" 
                                    palette="ghost" 
                                    rounded
                                >
                                    {#snippet leading()}
                                        <span class="material-symbols-outlined">
                                            expand
                                        </span>
                                    {/snippet}
                                    {#snippet trailing()}
                                        <Badge 
                                            palette="accent" 
                                            size="sm"
                                        >
                                            Stable
                                        </Badge>
                                    {/snippet}
                                </ListItem>

                                <ListItem 
                                    label="Slider" 
                                    palette="ghost" 
                                    rounded
                                >
                                    {#snippet leading()}
                                        <span class="material-symbols-outlined">
                                            tune
                                        </span>
                                    {/snippet}

                                    {#snippet trailing()}
                                        <Badge 
                                            palette="info" 
                                            size="sm"
                                        >
                                            New
                                        </Badge>
                                    {/snippet}
                                </ListItem>

                                <ListItem 
                                    label="Progress" 
                                    palette="accent" 
                                    rounded
                                >
                                    {#snippet leading()}
                                        <span class="material-symbols-outlined">
                                            bar_chart
                                        </span>
                                    {/snippet}
                                    {#snippet trailing()}
                                        <Badge 
                                            palette="tone" 
                                            size="sm"
                                        >
                                            Beta
                                        </Badge>
                                    {/snippet}
                                </ListItem>
                            </div>
                        {/snippet}
                    </Card>

                {:else}
                    <!-- Slide 7 — Timeline (stepper content) -->
                    {#snippet tl_step_1()}<span class="cs-tl-num">1</span>{/snippet}
                    {#snippet tl_step_2()}<span class="cs-tl-num">2</span>{/snippet}
                    {#snippet tl_step_3()}<span class="cs-tl-num">3</span>{/snippet}
                    {#snippet tl_step_4()}<span class="cs-tl-num">4</span>{/snippet}

                    <div class="cs-timeline-frame">
                        <Timeline
                            variant="flat"
                            elevation="hard"
                            orientation="vertical"
                            palette="accent"
                            size="sm"
                            completed={2}
                            rounded
                        >
                            <TimelineItem marker={tl_step_1} title="Cart" meta="Step 1">
                                Review the items and their quantities before checkout.
                            </TimelineItem>
                            <TimelineItem marker={tl_step_2} title="Shipping" meta="Step 2">
                                Enter the delivery address and pick a shipping method.
                            </TimelineItem>
                            <TimelineItem marker={tl_step_3} title="Payment" meta="Step 3">
                                Provide your card details or pick another payment option.
                            </TimelineItem>
                            <TimelineItem marker={tl_step_4} title="Confirmation" meta="Step 4">
                                Order placed — a confirmation email is on its way.
                            </TimelineItem>
                        </Timeline>
                    </div>
                {/if}
            </div>
        {/key}
    </div>

    <nav class="showcase-nav">
        {#each labels as label, i}
            {#if !(i === TILEGRID_INDEX && hide_tilegrid)}
                <button
                    class="showcase-nav-btn"
                    class:showcase-nav-active={index === i}
                    onclick={() => index = i}
                >
                    {label}
                </button>
            {/if}
        {/each}
    </nav>
</div>

<style>
    /* Shell ───────────────────────────────────────────────────────────────── */

    .showcase {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        height: 100%;
        padding: 2rem;
    }

    .showcase-stage {
        position: relative;
        flex: 1;
        width: 100%;
        min-height: 440px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .showcase-slide {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Nav ─────────────────────────────────────────────────────────────────── */

    .showcase-nav {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        flex-shrink: 0;
        flex-wrap: wrap;
        justify-content: center;
    }

    .showcase-nav-btn {
        padding: 0.25rem 0.75rem;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: var(--text-muted);
        cursor: pointer;
        transition: color 0.2s ease, background 0.2s ease;
        font-family: var(--font-body);
    }

    .showcase-nav-btn:hover {
        color: var(--text);
        background: var(--tone-hover);
    }

    .showcase-nav-active {
        color: var(--accent-muted) !important;
        background: color-mix(in oklch, var(--accent) 12%, transparent) !important;
    }

    /* Slide 0 — Card / profile ─────────────────────────────────────────────── */

    .cs-profile-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 1.25rem 1.25rem 0.5rem;
        text-align: center;
    }

    .cs-profile-info {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }

    .cs-profile-info strong {
        font-size: 0.95rem;
        font-weight: 700;
    }

    .cs-profile-info span {
        font-size: 0.8rem;
        color: var(--text-muted);
    }

    .cs-profile-badges {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    /* Slide 1 — TileGrid ───────────────────────────────────────────────────── */

    .cs-tilegrid {
        padding: 0.75rem;
    }

    /* Slide 2 — Accordion ──────────────────────────────────────────────────── */

    .cs-accordion {
        padding: 0.75rem;
    }

    .cs-accordion :global(p) {
        margin: 0;
        font-size: 0.8rem;
        color: var(--text-muted);
        line-height: 1.55;
    }

    /* Slide 3 — Settings ───────────────────────────────────────────────────── */

    .cs-settings-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.85rem;
    }

    .cs-settings-header .material-symbols-outlined {
        font-size: 1.1rem;
        color: var(--accent);
    }

    .cs-settings-body {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.25rem 1rem 0.75rem;
    }

    .cs-switch-row {
        display: flex;
        align-items: center;
        padding: 0.3rem 0;
    }

    .cs-switch-row :global(span) {
        font-size: 0.85rem;
        color: var(--text);
    }

    /* Slide 4 — Progress ───────────────────────────────────────────────────── */

    .cs-progress-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.85rem;
    }

    .cs-progress-header .material-symbols-outlined {
        font-size: 1.1rem;
        color: var(--accent);
    }

    .cs-progress-body {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.25rem 1rem 0.75rem;
    }

    .cs-progress-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .cs-progress-label {
        font-size: 0.75rem;
        color: var(--text-muted);
        width: 5rem;
        flex-shrink: 0;
    }

    .cs-progress-row :global(.progress-container) {
        flex: 1;
    }

    /* Slide 5 — Sliders ────────────────────────────────────────────────────── */

    .cs-slider-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.85rem;
    }

    .cs-slider-header .material-symbols-outlined {
        font-size: 1.1rem;
        color: var(--accent);
    }

    .cs-slider-body {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.25rem 1rem 0.75rem;
    }

    .cs-slider-row {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
    }

    .cs-slider-meta {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .cs-slider-label {
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .cs-slider-value {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--accent);
        font-family: var(--font-heading);
    }

    /* Slide 6 — ListItems ──────────────────────────────────────────────────── */

    .cs-list-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem 0.5rem;
        font-size: 0.85rem;
    }

    .cs-list-header .material-symbols-outlined {
        font-size: 1.1rem;
        color: var(--accent);
    }

    .cs-list-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0.25rem 0 0.5rem;
    }

    .cs-list-body :global(.material-symbols-outlined) {
        font-size: 1.1rem;
    }

    /* Slide 7 — Timeline ──────────────────────────────────────────────────── */

    .cs-timeline-frame {
        width: 340px;
    }

    .cs-tl-num {
        font-weight: 700;
        font-size: 0.9em;
        line-height: 1;
    }
</style>
