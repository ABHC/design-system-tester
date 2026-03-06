<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Badge from "../design-system/components/Badge/Badge.svelte";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let {
        trans,
        placeholders,
    }: Props = $props();
</script>

<Headline
    size= "md"
    uppercase
>
    {trans?.badges.title}
</Headline>

<div class="content">
    <Badge
        variant="primary"
    >
        {trans?.buttons.primary}
    </Badge>

    <Badge
        variant="primary"
        uppercase
    >
        {trans?.buttons.uppercase}
    </Badge>

    <Badge
        variant="secondary"
    >
        {trans?.buttons.secondary}
    </Badge>

    <Badge
        variant="ghost"
    >
        {trans?.buttons.ghost}
    </Badge>

    <Badge
        variant="ctx"
        state="error"
        size= "lg"
    >
        {trans?.buttons.error}
    </Badge>

    <Badge
        variant="ctx"
        state="warning"
    >
        {trans?.buttons.warning}
    </Badge>

    <Badge
        variant="ctx"
        state="success"
        size= "sm"
    >
        {trans?.buttons.success}
    </Badge>

    <Badge
        variant="ctx"
        state="info"
    >
        <icon class="material-symbols-outlined badge-icon">info</icon>
        {trans?.buttons.info}
    </Badge>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: `${trans?.buttons.primary}`,
            code: `<Badge variant="primary">${trans?.buttons.primary}</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.uppercase}`,
            code: `<Badge variant="primary" uppercase>`
            +`${trans?.buttons.uppercase}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.secondary}`,
            code: `<Badge variant="secondary">${trans?.buttons.secondary}</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.ghost}`,
            code: `<Badge variant="ghost">${trans?.buttons.ghost}</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.error}`,
            code: `<Badge variant="ctx" state="error">`
            +`${trans?.buttons.error}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.warning}`,
            code: `<Badge variant="ctx" state="warning">`
            +`${trans?.buttons.warning}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.success}`,
            code: `<Badge variant="ctx" state="success">`
            +`${trans?.buttons.success}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.info}`,
            code: `<Badge variant="ctx" state="info">`
            +`${trans?.buttons.info}`
            +`</Badge>`,
            language: "Svelte"
        },
    ]}
/>

<style>
    .content {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 20px;
    }

    .badge-icon {
        font-size: 1em;
    }
</style>
