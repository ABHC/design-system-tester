<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import ListItem from "../design-system/components/ListItem/ListItem.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();
</script>

<!-- Icon snippets -->
{#snippet icon_home()}
    <span class="material-symbols-outlined">home</span>
{/snippet}
{#snippet icon_senate()}
    <span class="material-symbols-outlined">account_balance</span>
{/snippet}
{#snippet icon_lex()}
    <span class="material-symbols-outlined">balance</span>
{/snippet}

<Headline size="md" uppercase>
    {trans?.list_items?.title ?? "List Items"}
</Headline>

<div class="content">
    <ListItem
        supporting_text={{ main: "Domus", extra: "Accueil · Home" }}
        palette="tone"
        rounded
        leading={icon_home}
    />

    <ListItem
        supporting_text={{ main: "Curia", extra: "Sénat · Senate" }}
        palette="tone"
        rounded
        active
        leading={icon_senate}
    />

    <ListItem
        supporting_text={{ main: "Lex" }}
        palette="tone"
        rounded
        leading={icon_lex}
    />

    <ListItem
        supporting_text={{ main: "Domus", extra: "Accueil · Home" }}
        palette="accent"
        rounded
        leading={icon_home}
    />

    <ListItem
        supporting_text={{ main: "Curia" }}
        palette="accent"
        rounded
        active
        leading={icon_senate}
    />

    <ListItem
        supporting_text={{ main: "Domus", extra: "sans leading" }}
        palette="tone"
        rounded
    />

    <ListItem
        supporting_text={{ main: "Lex", extra: "sm" }}
        palette="tone"
        size="sm"
        rounded
        leading={icon_lex}
    />

    <ListItem
        supporting_text={{ main: "Curia", extra: "lg" }}
        palette="tone"
        size="lg"
        rounded
        leading={icon_senate}
    />
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: "tone",
            code: `<ListItem\n    supporting_text={{ main: "Domus", extra: "Accueil" }}\n    palette="tone"\n    rounded\n    leading={icon_home}\n/>`,
            language: "Svelte"
        },
        {
            label: "tone active",
            code: `<ListItem\n    supporting_text={{ main: "Curia" }}\n    palette="tone"\n    rounded\n    active\n    leading={icon_senate}\n/>`,
            language: "Svelte"
        },
        {
            label: "accent",
            code: `<ListItem\n    supporting_text={{ main: "Domus" }}\n    palette="accent"\n    rounded\n    leading={icon_home}\n/>`,
            language: "Svelte"
        },
        {
            label: "accent active",
            code: `<ListItem\n    supporting_text={{ main: "Curia" }}\n    palette="accent"\n    rounded\n    active\n    leading={icon_senate}\n/>`,
            language: "Svelte"
        },
        {
            label: "sm / lg",
            code: `<ListItem supporting_text={{ main: "Lex" }} size="sm" palette="tone" rounded />\n<ListItem supporting_text={{ main: "Lex" }} size="lg" palette="tone" rounded />`,
            language: "Svelte"
        },
    ]}
/>

<style>
    .content {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 12px;
    }
</style>
