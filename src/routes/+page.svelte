<script lang="ts">
    import { trans } from "./store";
    import { selected_tone, selected_text } from "./store";
    import Showcase from "./Showcase.svelte";
    import { 
        LogoSpektral, 
        Badge, 
        Button, 
        Hero, 
        CodeBlock 
    } from "@abhc/spektral-ui";

  const pattern_color = $derived(                                                                                                                                                                                                     
      $selected_tone === 'dark' ? $selected_text.light : $selected_text.dark
  );   

    // Code showcase ─────────────────────────────────────────────────────────

    const showcase_code = [
        `<Button palette="accent">
  Start
</Button>

<Button variant="outlined" palette="accent">
  <span class="material-symbols-outlined">palette</span>
  Personnaliser
</Button>

<Button variant="ghost" palette="tone" squared>
  <span class="material-symbols-outlined">menu</span>
</Button>`,
        `<Card variant="outlined" elevation="subtle">
  {#snippet children()}
    <div class="card-content">
      <h3>Spektral Card</h3>
      <p>Composable via snippets Svelte 5.
Header, body et footer indépendants.</p>
    </div>
  {/snippet}
  {#snippet trailing()}
    <Button size="sm" palette="accent">
      Voir la doc
    </Button>
  {/snippet}
</Card>`,
        `<Badge palette="accent" pill>Svelte 5</Badge>

<Badge variant="outlined" palette="tone" pill>
  WCAG AA
</Badge>

<Badge palette="success" size="sm">Nouveau</Badge>`,
    ];

</script>

<svelte:head>
    <title>Spektral UI - Design System</title>
</svelte:head>

<!-- Main Hero ──────────────────────────────────────────────────────────── -->

<Hero
    layout="two-cols"
    palette="transparent"
    pattern="scallops"
    pattern_color={pattern_color}
    pattern_size="150px"
    pattern_opacity={0.15}
    pattern_mask="ellipse"
    pattern_mask_size={70}
    gap="0"
    pattern_effect="glow"
    pattern_effect_opacity={1}
>
    {#snippet cell_1()}
        <div class="hero-content">
            <LogoSpektral size={160} />
            <h1>{$trans?.hero.headline}</h1>
            <p class="hero-subtitle">{$trans?.hero.subtitle}</p>
            <div class="hero-badges">
                <Badge variant="outlined" palette="accent" size="sm" pill>
                    {$trans?.hero.badge_1}
                </Badge>
                <Badge variant="outlined" palette="tone" size="sm" pill>
                    {$trans?.hero.badge_2}
                </Badge>
                <Badge variant="outlined" palette="tone" size="sm" pill>
                    {$trans?.hero.badge_3}
                </Badge>
            </div>
            <div class="hero-actions">
                <Button palette="accent" href="/docs">
                    <span class="material-symbols-outlined hero-btn-icon">book_5</span>
                    {$trans?.hero.cta_docs}
                </Button>
                <Button variant="outlined" palette="accent" href="/customizer">
                    <span class="material-symbols-outlined hero-btn-icon">palette</span>
                    {$trans?.hero.cta_customizer}
                </Button>
            </div>
        </div>
    {/snippet}

    {#snippet cell_2()}
        <Showcase />
    {/snippet}
</Hero>

<!-- Stat strip ─────────────────────────────────────────────────────────── -->

<section class="stat-strip">
    <div class="stat-item">
        <span class="stat-number">{$trans?.stats.components_count}</span>
        <span class="stat-label">{$trans?.stats.components_label}</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
        <span class="stat-number">{$trans?.stats.modes_count}</span>
        <span class="stat-label">{$trans?.stats.modes_label}</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
        <span class="stat-number">{$trans?.stats.patterns_count}</span>
        <span class="stat-label">{$trans?.stats.patterns_label}</span>
    </div>
</section>

<!-- Features ───────────────────────────────────────────────────────────── -->

<Hero
    layout="single"
    palette="accent"
    pattern="sunrise"
    pattern_color={pattern_color}
    pattern_size="100px"
    pattern_opacity={0.1}
    pattern_mask="none"
    pattern_mask_size={30}
    pattern_mask_direction="top"
    gap="10px"
    pattern_effect="blur"
    pattern_effect_opacity={0.3}
    height="20dvh"
>
    {#snippet cell_1()}
        <div class="feature-block">
            <div class="feature-item">
                <img 
                    id="svelte-icon" 
                    src="/assets/svelte.svg" 
                    alt="svelte icon" 
                />
                <div class="feature-text">
                    <h3>{$trans?.features.f1_title}</h3>
                    <span>{$trans?.features.f1_desc}</span>
                </div>
            </div>
            <div class="feature-item">
                <span class="material-symbols-outlined feature-icon">dashboard_2_edit</span>
                <div class="feature-text">
                    <h3>{$trans?.features.f2_title}</h3>
                    <span>{$trans?.features.f2_desc}</span>
                </div>
            </div>
            <div class="feature-item">
                <span class="material-symbols-outlined feature-icon">palette</span>
                <div class="feature-text">
                    <h3>{$trans?.features.f4_title}</h3>
                    <span>{$trans?.features.f4_desc}</span>
                </div>
            </div>
        </div>
    {/snippet}
</Hero>

<!-- Quickstart ─────────────────────────────────────────────────────────── -->

<Hero
    layout="two-cols"
    palette="transparent"
    pattern="grid"
    pattern_color={pattern_color}
    pattern_size="80px"
    pattern_effect="fade"
    pattern_effect_opacity={0.55}
    pattern_mask="fade"
    pattern_mask_direction="left"
    pattern_mask_size={65}
    height="50dvh"
    gap="10px"
>
    {#snippet cell_1()}
        <div class="quickstart">
            <h2>{$trans?.quickstart.title}</h2>
            <ol class="quickstart-steps">
                <li class="quickstart-step">
                    <span class="quickstart-num">01</span>
                    <div class="quickstart-text">
                        <strong>{$trans?.quickstart.step_1_label}</strong>
                        <span>{$trans?.quickstart.step_1_desc}</span>
                    </div>
                </li>
                <li class="quickstart-step">
                    <span class="quickstart-num">02</span>
                    <div class="quickstart-text">
                        <strong>{$trans?.quickstart.step_2_label}</strong>
                        <span>{$trans?.quickstart.step_2_desc}</span>
                    </div>
                </li>
                <li class="quickstart-step">
                    <span class="quickstart-num">03</span>
                    <div class="quickstart-text">
                        <strong>{$trans?.quickstart.step_3_label}</strong>
                        <span>{$trans?.quickstart.step_3_desc}</span>
                    </div>
                </li>
            </ol>
            <Button palette="accent" href="/docs">
                <span class="material-symbols-outlined">book_5</span>
                {$trans?.quickstart.cta}
            </Button>
        </div>
    {/snippet}
    {#snippet cell_2()}
        <div class="quickstart-code">
            <CodeBlock 
                variant="terminal" 
                size="sm" 
                code="npm i @abhc/spektral-ui" 
                copyable 
            />

            <CodeBlock
                variant="filename"
                filename="App.svelte"
                size="sm"
                language="Svelte"
                code={`import { Button, Card, Badge } from '@abhc/spektral-ui';`}
                copyable
            />

            <CodeBlock
                variant="filename"
                filename="MyComponent.svelte"
                size="sm"
                language="Svelte"
                code={`<Button palette="accent">
  Start
</Button>`}
                copyable
            />
        </div>
    {/snippet}
</Hero>

<style>
    /* Hero left column ─────────────────────────────────────────────────── */

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 1.25rem;
        padding: 3rem 2rem;
        height: 100%;
    }

    .hero-content h1 {
        text-transform: uppercase;
    }

    .hero-subtitle {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--spk-text-muted);
        max-width: 480px;
    }

    .hero-badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 0.5rem;
    }

    .hero-btn-icon {
        font-size: 18px;
    }

    /* Stat strip ───────────────────────────────────────────────────────── */

    .stat-strip {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 1.5rem 2rem;
        background: var(--spk-tone);
        border-top: 2px solid var(--spk-tone-hover);
        border-bottom: 2px solid var(--spk-tone-hover);
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.15rem;
    }

    .stat-number {
        font-size: 1.5rem;
        font-weight: 700;
        font-family: var(--spk-font-heading);
        color: var(--spk-accent-muted);
        line-height: 1;
        text-transform: uppercase;
    }

    .stat-label {
        font-size: 0.75rem;
        color: var(--spk-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 500;
    }

    .stat-divider {
        width: 1px;
        height: 2rem;
        background: var(--spk-tone-hover);
    }

    @media (max-width: 520px) {
        .stat-strip {
            flex-direction: column;
            gap: 1.25rem;
        }

        .stat-divider {
            width: 40%;
            height: 1px;
        }
    }

    /* Features ─────────────────────────────────────────────────────────── */

    .feature-block {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: flex-start;
        padding: 15px;
        gap: 12px;
    }

    .feature-item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 15px;
        gap: 12px;
        max-width: 320px;
    }

    .feature-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .feature-text h3 {
        margin-top: 0;
    }

    #svelte-icon {
        width: 36px;
        margin: 10px 0;
    }

    .feature-icon {
        font-size: 36px;
        margin: 10px 0;
    }

    /* Quickstart ───────────────────────────────────────────────────────── */

    .quickstart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        padding: 2rem;
        height: 100%;
    }

    .quickstart h2 {
        font-size: 1.75rem;
    }

    .quickstart-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .quickstart-step {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }

    .quickstart-num {
        font-size: 0.7rem;
        font-weight: 700;
        font-family: var(--spk-font-heading);
        color: var(--spk-accent-muted);
        background: color-mix(in oklch, var(--spk-accent-muted) 12%, transparent);
        border: 1px solid color-mix(in oklch, var(--spk-accent-muted) 30%, transparent);
        border-radius: 4px;
        padding: 0.2rem 0.4rem;
        letter-spacing: 0.05em;
        flex-shrink: 0;
        margin-top: 0.15rem;
    }

    .quickstart-text {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .quickstart-text strong {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--spk-text);
    }

    .quickstart-text span {
        font-size: 0.85rem;
        color: var(--spk-text-muted);
        line-height: 1.5;
    }

    .quickstart-code {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        padding: 2rem;
        height: 100%;
    }

    .quickstart-code :global(.codeblock) {
        margin: 0 0 -2px 0;
        border-radius: 0;
    }

    .quickstart-code :global(.codeblock:first-child) {
        border-radius: 10px 10px 0 0;
    }

    .quickstart-code :global(.codeblock:last-child) {
        border-radius: 0 0 10px 10px;
    }
</style>
