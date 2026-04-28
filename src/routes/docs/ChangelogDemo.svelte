<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "../placeholders";
    import {
        Headline,
        Timeline,
        TimelineItem,
    } from "@abhc/spektral-ui";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans }: Props = $props();

    interface Release {
        version: string;
        date: string;
        message: string;
    }

    // Newest first. The Timeline reverses internally so the most-recent
    // release sits at the top with the largest "completed" weight.
    const releases: Release[] = [
        {
            version: "0.3.1",
            date: "2026-04-28",
            message: "DataTable: column alignment through an optional 'width?: string' field on 'Column'",
        },
        {
            version: "0.3.0",
            date: "2026-04-28",
            message: "Token system rewrite: every CSS custom property now ships with a --spk- prefix to avoid collisions with consumer styles. Adds five new immutable groups (z-index ladder, motion, elevation, border width, opacity) and a prefers-reduced-motion media query.",
        },
        {
            version: "0.2.8",
            date: "2026-04-26",
            message: "hotfix : add 'Padding' prop in header and Footer to manage padding instead of 'style'",
        },
        {
            version: "0.2.7",
            date: "2026-04-26",
            message: "Header : remove outdated prop 'style', Footer: remove outdated prop 'style' and add 'visible' similar to the one in Header",
        },
        {
            version: "0.2.6",
            date: "2026-04-26",
            message: "Improve consistency of Card component",
        },
        {
            version: "0.2.5",
            date: "2026-04-25",
            message: "On Explorer(s) : Fix colors for accent palette, rename 'icon' prop to 'leading'. On SwatchRow : 'rounded' value descend to the internal CopyButton.",
        },
        {
            version: "0.2.4",
            date: "2026-04-24",
            message: "hotfix : remove a bug on Explorer group hr and add a better readme for tokens customization",
        },
        {
            version: "0.2.3",
            date: "2026-04-21",
            message: "hotfix : add missing types in index",
        },
        {
            version: "0.2.2",
            date: "2026-04-21",
            message: "hotfix : missing color.ts file",
        },
        {
            version: "0.2.1",
            date: "2026-04-21",
            message: "fix internal imports between components",
        },
        {
            version: "0.2.0",
            date: "2026-04-21",
            message: "Initial public release of Spektral UI.",
        },
    ];
</script>

<!-- Title --------------------------------------------------------------- -->

<Headline size="md" uppercase>{trans?.changelog_demo.title}</Headline>

<p class="intro">{trans?.changelog_demo.intro}</p>
<span class="issue">
    {trans?.changelog_demo.issue}
    <a href="https://github.com/ABHC/spektral-ui">github.com/ABHC/spektral-ui</a>
</span>

<!-- Timeline ------------------------------------------------------------ -->

<div class="changelog-timeline">
    <Timeline
        size="sm"
        variant="flat"
        palette="accent"
        connector="mixed"
        elevation="hard"
        completed={releases.length}
    >
        {#each releases as release}
            {#snippet version_marker()}<span>v{release.version}</span>{/snippet}
            <TimelineItem
                marker={version_marker}
                title={`v${release.version}`}
                meta={release.date}
                wide
            >
                {release.message}
            </TimelineItem>
        {/each}
    </Timeline>
</div>

<style>
    .intro {
        margin: 0.5rem 0 1.5rem;
        max-width: 70ch;
        color: var(--spk-text-muted);
    }
    
    .issue {
        margin: 0.5rem 0 1.5rem;
        text-decoration: none;
        color: var(--spk-text-muted);
    }

    .issue a {
        text-decoration: none;
        color: var(--spk-text);
    }

    .changelog-timeline {
        margin-top: 1rem;
    }
</style>
