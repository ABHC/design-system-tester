<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import { 
        Card, 
        Badge, 
        Button, 
        DataTable, 
        Avatar, 
        Headline, 
        CodeBlock, 
        Selector, 
        ControlBar 
    } from "@abhc/spektral-ui";
    
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    const testimonials = $derived(placeholders.cards.testimonials);
    const profile = $derived(placeholders.cards.profile);
    const tiles = $derived(placeholders.cards.tiles);

    // ── Demo state ──────────────────────────────────────────────────────────

    type Variant = "flat" | "outlined" | "ghost";
    type Elevation = "none" | "subtle" | "hard";
    type Preset = "none" | "projects" | "profile" | "testimonials";

    let demo_variant: Variant = $state("flat");
    let demo_elevation: Elevation = $state("hard");
    let demo_rounded: boolean = $state(false);
    let demo_preset: Preset = $state("projects");

    const bool_opts = [{ value: true, label: "yes" }, { value: false, label: "no" }] as const;

    // ── Code examples ───────────────────────────────────────────────────────

    const code_variants = `<Card variant="flat" width="200px">
    {#snippet children()}
        <p>flat</p>
    {/snippet}
</Card>
<Card variant="outlined" width="200px">
    {#snippet children()}
        <p>outlined</p>
    {/snippet}
</Card>
<Card variant="ghost" width="200px">
    {#snippet children()}
        <p>ghost</p>
    {/snippet}
</Card>`;

    const code_project = `<Card variant="outlined" elevation="hard" width="300px">
    {#snippet leading()}
        <img src="/project.jpg" alt="Project" />
    {/snippet}
    {#snippet children()}
        <Badge size="sm">Design</Badge>
        <h4>Project Name</h4>
        <p>Short description.</p>
    {/snippet}
    {#snippet trailing()}
        <Button variant="flat" size="sm" rounded>View</Button>
    {/snippet}
</Card>`;

    const code_profile = `<Card variant="flat" elevation="subtle" width="100%">
    {#snippet leading()}
        <div class="profile-header">
            <Avatar size="xl" circular label="JM" palette="accent" />
            <div>
                <h2>Jean Michel</h2>
                <p>Designeur de jouet</p>
                <Badge variant="flat" size="sm">FR</Badge>
            </div>
        </div>
    {/snippet}
    {#snippet children()}
        <p>Bio text…</p>
        <Badge variant="outlined" size="sm">dessin</Badge>
    {/snippet}
    {#snippet trailing()}
        <Button variant="flat" size="sm" animate="right" rounded>
            Contact
        </Button>
    {/snippet}
</Card>`;

    const code_testimonials = `<div class="testimonials-row">
    {#each testimonials as t}
        <Card variant="outlined" width="0">
            {#snippet leading()}
                <div class="testi-header">
                    <Avatar size="md" circular label={t.initials} />
                    <div>
                        <p>{t.name}</p>
                        <p>{t.role}</p>
                    </div>
                </div>
            {/snippet}
            {#snippet children()}
                <blockquote>"{t.quote}"</blockquote>
            {/snippet}
        </Card>
    {/each}
</div>`;

    const code_elevation = `<!-- Elevation prop — static shadows -->
<Card elevation="none">...</Card>     <!-- no shadow -->
<Card elevation="subtle">...</Card>   <!-- soft shadow -->
<Card elevation="hard">...</Card>     <!-- neo-brutalist offset -->`;
</script>

{#snippet codeCell(value: string)}<code>{value}</code>{/snippet}

<!-- ── Utils Snippets ────────────────────────────────────────────────────── -->

{#snippet icon_mail()}
    <span class="material-symbols-outlined">mail</span>
{/snippet}

{#snippet icon_open_in_new()}
    <span class="material-symbols-outlined">open_in_new</span>
{/snippet}

<!-- ── Markup ─────────────────────────────────────────────────────────────── -->

<div data-summary="demo" data-summary-label={trans?.doc.demo}>
    <Headline size="md" uppercase>{trans?.card_demo.title}</Headline>
</div>

<!-- Controls -->

<ControlBar palette="tone">
    <Selector 
        label="Preset" 
        options={["none", "projects", "profile", "testimonials"]}
        bind:value={demo_preset} 
    />
    <Selector 
        label="Variant"
        options={["flat", "outlined", "ghost"]}
        bind:value={demo_variant} 
    />
    <Selector 
        label="Elevation"
        options={["none", "subtle", "hard"]}
        bind:value={demo_elevation}
    />
    <Selector 
        label="Rounded" 
        options={bool_opts}
        bind:value={demo_rounded} 
    />
</ControlBar>

<!-- Live preview -->

<div class="card-preview">
    <!-- None — simple variant showcase -->
    {#if demo_preset === "none"}
        <div class="card-row">
            {#each (["flat", "outlined", "ghost"] as const) as v}
                <Card
                    variant={demo_variant}
                    elevation={demo_elevation}
                    rounded={demo_rounded}
                    width="200px"
                >
                    {#snippet children()}
                        <p class="demo-variant-label">{v}</p>
                        <p class="demo-variant-sub">card-{v}</p>
                    {/snippet}
                </Card>
            {/each}
        </div>
    {/if}

    <!-- Projects — header image + body + footer -->
    {#if demo_preset === "projects"}
        <div class="card-row hidden-border">
            {#each tiles as tile, i}
                <Card
                    variant={demo_variant}
                    elevation={demo_elevation}
                    rounded={demo_rounded}
                    width="300px"
                >
                    {#snippet leading()}
                        <div class="demo-img-placeholder" class:accent={i === 0} class:muted={i === 1} aria-hidden="true">
                            {#if i != 2}
                                <span class="material-symbols-outlined">
                                    {i === 0 ? "palette" : i === 1 ? "computer" : "image"}
                                </span>
                            {:else}
                                <img 
                                    src="../assets/aerotrain.jpeg" 
                                    alt="Aérotrain"
                                    style="object-fit: cover; width: 100%"
                                >
                            {/if}
                        </div>
                    {/snippet}
                    {#snippet children()}
                        <Badge variant="flat" size="sm" uppercase>{tile.badge}</Badge>
                        <h4 class="card-title">{tile.name}</h4>
                        <p class="card-text">{tile.description}</p>
                    {/snippet}
                    {#snippet trailing()}
                        {#if i === 2}
                            <Button variant="flat" size="sm" rounded>
                                <a 
                                    href="https://fr.wikipedia.org/wiki/Jean_Bertin_(ing%C3%A9nieur)#/media/Fichier:A%C3%A9rotrain_i80_250.jpg"
                                    target="_blank"
                                    style="text-decoration: none; color:inherit"
                                >
                                    {tile.btn}
                                </a>
                            </Button>
                        {:else}
                            <Button variant="flat" size="sm" rounded>
                                {tile.btn}
                            </Button>
                        {/if}
                        <Button variant="flat" palette="tone" size="sm" rounded>Archives</Button>
                    {/snippet}
                </Card>
            {/each}
        </div>
    {/if}

    <!-- Profile -->
    {#if demo_preset === "profile"}
        <div class="hidden-border">
            <Card
                variant={demo_variant}
                elevation={demo_elevation}
                rounded={demo_rounded}
                width="100%"
            >
                {#snippet leading()}
                    <div class="profile-header">
                        <Avatar size="xl" circular label={profile.initials} palette="accent" />
                        <div class="profile-identity">
                            <h2 class="profile-name">{profile.name}</h2>
                            <p class="profile-role">{profile.role}</p>
                            <div class="profile-langs">
                                {#each profile.langs as lang}
                                    <Badge variant="flat" size="sm">{lang}</Badge>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/snippet}
                {#snippet children()}
                    <p class="card-text">{profile.bio}</p>
                    <div>
                        <p class="section-label">{profile.skills_label}</p>
                        <div class="tags-row">
                            {#each profile.skills as skill}
                                <Badge variant="outlined" size="sm">{skill.label}</Badge>
                            {/each}
                        </div>
                    </div>
                    <div>
                        <p class="section-label">{profile.experience_label}</p>
                        <div class="xp-list">
                            {#each profile.experience as xp}
                                <div class="xp-item">
                                    <span class="xp-date">{xp.date}</span>
                                    <span class="xp-role">{xp.role}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/snippet}
                {#snippet trailing()}
                    <Button variant="flat" size="sm" animate="right" rounded>
                        {profile.contact_btn}
                    </Button>
                    <Button variant="flat" palette="tone" size="sm" rounded>
                        {profile.cv_btn}
                    </Button>
                    <div class="footer-spacer"></div>
                    <Badge variant="outlined" size="sm" href="#" trailing={icon_mail}>
                        {profile.contact_email}
                    </Badge>
                {/snippet}
            </Card>
        </div>
    {/if}

    <!-- Testimonials — 3 cards -->
    {#if demo_preset === "testimonials"}
        <div class="testimonials-row">
            {#each testimonials as t}
                <Card
                    variant={demo_variant}
                    elevation={demo_elevation}
                    rounded={demo_rounded}
                    width="0"
                >
                    {#snippet leading()}
                        <div class="testi-header">
                            <Avatar size="md" circular label={t.avatar_initial} />
                            <div>
                                <p class="testi-name">{t.name}</p>
                                <p class="testi-role">{t.role}</p>
                            </div>
                        </div>
                    {/snippet}
                    {#snippet children()}
                        <blockquote class="testi-quote">"{t.quote}"</blockquote>
                    {/snippet}
                </Card>
            {/each}
        </div>
    {/if}
</div>

<!-- Code examples -->

<div data-summary="usage" data-summary-label={trans?.doc.usage}>
<Headline size="sm" uppercase muted>{trans?.doc.usage}</Headline>
</div>
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Variants", code: code_variants, language: "Svelte" },
        { label: "Project", code: code_project, language: "Svelte" },
        { label: "Profile", code: code_profile, language: "Svelte" },
        { label: "Testimonials", code: code_testimonials, language: "Svelte" },
        { label: "Elevation", code: code_elevation, language: "Svelte" },
    ]}
/>


<div data-summary="api" data-summary-label={trans?.doc.api ?? "API"}>
<Headline size="sm" uppercase muted>{trans?.doc.api ?? "API"}</Headline>
<DataTable
    variant="ghost" palette="tone" size="sm"
    columns={[
        { key: "prop", label: "Prop" },
        { key: "type", label: "Type", cell: codeCell },
        { key: "default", label: "Default", cell: codeCell },
    ]}
    rows={[
        { prop: "variant", type: '"flat" | "outlined" | "ghost"', default: '"flat"' },
        { prop: "elevation", type: '"none" | "subtle" | "hard"', default: '"hard"' },
        { prop: "width", type: "string", default: "undefined" },
        { prop: "rounded", type: "boolean", default: "false" },
        { prop: "href", type: "string", default: "undefined" },
        { prop: "leading", type: "Snippet", default: "\u2014" },
        { prop: "children", type: "Snippet", default: "\u2014" },
        { prop: "trailing", type: "Snippet", default: "\u2014" },
    ]}
/>
</div>

<style>
    /* ── Preview container ────────────────────────────────────────────────── */

    .card-preview {
        border: 2px solid var(--tone-hover);
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        background: var(--tone-bg);
    }

    .card-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: flex-start;
    }

    /* ── Variant mini-cards ───────────────────────────────────────────────── */

    .demo-variant-label {
        font-weight: 600;
        margin: 0;
        color: var(--text);
    }

    .demo-variant-sub {
        font-size: 0.75rem;
        color: var(--text-muted);
        margin: 0;
        font-family: monospace;
    }

    /* ── Image placeholders ───────────────────────────────────────────────── */

    .demo-img-placeholder {
        height: 140px;
        background: var(--tone-hover);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
    }

    .demo-img-placeholder.accent {
        background: var(--accent-ghost-hover);
        color: var(--accent);
    }

    .demo-img-placeholder.muted {
        background: var(--tone-hover);
    }

    .demo-img-placeholder .material-symbols-outlined {
        font-size: 2.5rem;
        opacity: 0.5;
    }

    /* ── Card content helpers ─────────────────────────────────────────────── */

    .card-title {
        font-weight: 700;
        margin: 0;
        font-size: 1rem;
    }

    .card-text {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;
    }

    .tags-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }

    .section-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--text-muted);
        margin: 0 0 0.5rem;
        font-weight: 600;
    }

    /* ── Profile header ───────────────────────────────────────────────────── */

    .profile-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        background: var(--accent-ghost-hover);
    }

    .profile-identity {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .profile-name {
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0;
    }

    .profile-role {
        font-size: 0.875rem;
        color: var(--text-muted);
        margin: 0;
    }

    .profile-langs {
        display: flex;
        gap: 0.35rem;
        margin-top: 0.25rem;
    }

    /* ── Experience ───────────────────────────────────────────────────────── */

    .xp-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .xp-item {
        display: flex;
        gap: 1rem;
        font-size: 0.875rem;
    }

    .xp-date {
        color: var(--text-muted);
        white-space: nowrap;
        min-width: 7rem;
    }

    .xp-role {
        color: var(--text);
    }

    /* ── Footer spacer ────────────────────────────────────────────────────── */

    .footer-spacer {
        flex: 1;
    }

    /* ── Testimonials ─────────────────────────────────────────────────────── */

    .testimonials-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .testimonials-row > :global(.card) {
        flex: 1;
        min-width: 240px;
    }

    .testi-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.25rem;
    }

    .testi-name {
        font-weight: 600;
        margin: 0;
        font-size: 0.9rem;
    }

    .testi-role {
        font-size: 0.75rem;
        color: var(--text-muted);
        margin: 0;
    }

    .testi-quote {
        font-style: italic;
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--text-muted);
        margin: 0;
        quotes: none;
    }

    /* ── Hidden Border ────────────────────────────────────────────────────── */

    .hidden-border :global(.card-header) {
        border-bottom-color: transparent
    }
</style>
