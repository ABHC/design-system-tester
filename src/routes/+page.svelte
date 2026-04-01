<script lang="ts">
    import { trans } from "./store";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Button from "../design-system/components/Button/Button.svelte";
</script>

<svelte:head>
    <title>Spektral UI - Design System</title>
</svelte:head>

<div class="landing">
    <section class="hero">
        <Headline size="lg" uppercase>Spektral UI</Headline>
        <p class="hero-subtitle">{$trans?.welcome.intro ?? "Explore the design system components. Test variants, adjust settings and copy code directly from the page."}</p>
        <div class="hero-actions">
            <a href="/docs">
                <Button palette="accent" rounded>
                    {$trans?.welcome.cat_composants ?? "Components"}
                </Button>
            </a>
            <a href="/customizer">
                <Button variant="outlined" palette="accent" rounded>
                    {$trans?.control.contrast ?? "Customizer"}
                </Button>
            </a>
        </div>
    </section>
</div>

<style>
    .landing {
        min-height: 80dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-body);
    }

    .hero {
        text-align: center;
        max-width: 700px;
        padding: 2rem;
    }

    .hero-subtitle {
        margin-top: 1rem;
        font-size: 1.15rem;
        line-height: 1.6;
        color: var(--text-muted);
    }

    .hero-actions {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .hero-actions a {
        text-decoration: none;
    }
</style>
