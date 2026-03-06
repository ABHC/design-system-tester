<script lang="ts">
    import type { AccentTheme, ToneTheme, ContextualColors } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Contrast from './contrast/Contrast.svelte';
    import Colorblind from './contrast/Colorblind.svelte';
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import BadgeDemo from "./BadgeDemo.svelte";
    import ButtonDemo from "./ButtonDemo.svelte";
    import NavDemo from "./NavDemo.svelte";
    import ListItemDemo from "./ListItemDemo.svelte";
    import SidebarDemo from "./SidebarDemo.svelte";
    import CodeBlockDemo from "./CodeBlockDemo.svelte";
	import TileGridDemo from "./TileGridDemo.svelte";
    import HeaderDemo from "./HeaderDemo.svelte";
    import FooterDemo  from "./FooterDemo.svelte";
    import CalloutDemo from "./CalloutDemo.svelte";
    import AlertDemo from "./AlertDemo.svelte";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
        selected_palette: ToneTheme;
        selected_accent: AccentTheme;
        light_palettes: ToneTheme[];
        dark_palettes: ToneTheme[];
        selected_ctx: ContextualColors;
    }

    let {
        trans,
        placeholders,
        selected_palette,
        selected_accent,
        light_palettes,
        dark_palettes,
        selected_ctx,
    }: Props = $props();

</script>

<!-- Main Content -->
<div class="content">

    <!-- Typography -->
    <Headline size="md" uppercase>
        {trans?.typo.title}
    </Headline>

    <div class="demo-section typography-demo">
        <h1>{trans?.typo.h1} - {placeholders.typography.h1_context}</h1>
        <h2>{trans?.typo.h2} - {placeholders.typography.h2_context}</h2>
        <h3>{trans?.typo.h3} - {placeholders.typography.h3_context}</h3>
        <h4>{trans?.typo.h4} - {placeholders.typography.h4_context}</h4>
        <h5>{trans?.typo.h5} - {placeholders.typography.h5_context}</h5>
        <h6>{trans?.typo.h6} - {placeholders.typography.h6_context}</h6>
        <p class="lead">
            {placeholders.typography.lead}
        </p>
        <p>
            {placeholders.typography.body}
        </p>
    </div>

    <!-- Header -->
    <HeaderDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Footer -->
    <FooterDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Callout -->
    <CalloutDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Alert -->
    <AlertDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Buttons -->
    <ButtonDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Badges -->
    <BadgeDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- List Items -->
    <ListItemDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Tile Grid -->
    <TileGridDemo
        trans={trans}
    />

    <!-- Navs -->
    <NavDemo 
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Sidebar -->
    <SidebarDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Code blocks -->
    <CodeBlockDemo
        trans={trans}
        placeholders={placeholders}
    />

    <!-- Cards -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.cards.title}</h2>
        <div class="demo-grid">
            {#each placeholders.cards.provinces as province, index}
                <div class="card">
                    <div class="card-title">{province.name}</div>
                    <div class="card-text">
                        {province.description}
                    </div>
                    <div class="card-meta">
                        <span class="badge">{province.badge}</span>
                        <span style="margin-left: 10px;">{province.date}</span>
                    </div>
                    <div style="margin-top: 15px;">
                        {#if index === 2}
                            <button class="button button-ghost">Explore</button>
                        {:else}
                            <button class="button button-primary">Explore</button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Forms -->
    <div class="demo-section">
        <h2 class="section-title">{trans?.form.title}</h2>
        <div class="card card-form">
            <div class="form-group">
                <label for="name-input" class="form-label">{trans?.form.name}</label>
                <input id="name-input" type="text" class="form-input" placeholder={placeholders.form.placeholder_name}>
            </div>
            <div class="form-group">
                <label for="email-input" class="form-label">{trans?.form.email}</label>
                <input id="email-input" type="email" class="form-input" placeholder={placeholders.form.placeholder_email}>
            </div>
            <div class="form-group">
                <label for="message-textarea" class="form-label">{trans?.form.message}</label>
                <textarea id="message-textarea" class="form-input" rows="4" placeholder={placeholders.form.placeholder_message}></textarea>
            </div>
            <button class="button button-primary">{trans?.form.send}</button>
        </div>
    </div>

</div>

<style>
    /* Main Content */
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 10px 40px 40px;
    }

    /* Demo Sections */
    .demo-section {
        margin-bottom: 40px;
    }

    .section-title {
        margin-bottom: 20px;
        color: var(--text);
    }

    .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 20px;
    }

    /* Card Component */
    .card {
        background: var(--card);
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 2px 8px var(--overlay);
    }

    .card-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--text);
    }

    .card-text {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 15px;
        color: var(--text);
    }

    .card-meta {
        font-size: 13px;
        color: var(--text-muted);
    }

    .card-form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 600px;
    }

    /* Buttons */
    .button {
        display: inline-block;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        font-size: 14px;
        transition: all 0.2s;
        text-decoration: none;
    }

    .button-primary {
        background: var(--accent);
        color: var(--text-accent);
    }

    .button-primary:hover {
        background: var(--accent-invert);
    }

    .button-ghost {
        background: var(--highlight);
        color: var(--text);
    }

    .button-ghost:hover {
        background: var(--accent);
        color: var(--text-accent);
    }

    .badge {
        display: inline-block;
        width: fit-content;
        padding: .35rem .75rem;
        background: var(--accent);
        color: var(--text-accent);
        border-radius: 12px;
        font-size: .75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* Forms */
    .form-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .form-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--text);
    }

    .form-input {
        padding: 12px;
        border: 2px solid var(--highlight);
        background: var(--bg);
        color: var(--text);
        border-radius: 6px;
        font-size: 14px;
    }

    .form-input:focus {
        outline: none;
        border-color: var(--accent);
    }

    @media (max-width: 768px) {
        .demo-grid {
            grid-template-columns: 1fr;
        }

        .content {
            padding: 10px 20px 40px;
        }
    }
</style>
