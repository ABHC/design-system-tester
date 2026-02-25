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
        {trans?.variants.primary}
    </Badge>

    <Badge
        variant="primary"
        uppercase
    >
        {trans?.variants.uppercase}
    </Badge>

    <Badge
        variant="secondary"
    >
        {trans?.variants.secondary}
    </Badge>

    <Badge
        variant="ghost"
    >
        {trans?.variants.ghost}
    </Badge>

    <Badge
        variant="ctx"
        state="error"
    >
        {trans?.variants.error}
    </Badge>

    <Badge
        variant="ctx"
        state="warning"
    >
        {trans?.variants.warning}
    </Badge>

    <Badge
        variant="ctx"
        state="success"
    >
        {trans?.variants.success}
    </Badge>

    <Badge
        variant="ctx"
        state="info"
    >
        {trans?.variants.info}
    </Badge>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: `${trans?.variants.primary}`,
            code: `<Badge variant="primary">${trans?.variants.primary}</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.uppercase}`,
            code: `<Badge variant="primary" uppercase>`
            +`${trans?.variants.uppercase}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.secondary}`,
            code: `<Badge variant="secondary">${trans?.variants.secondary}</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.ghost}`,
            code: `<Badge variant="ghost">${trans?.variants.ghost}</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.error}`,
            code: `<Badge variant="ctx" state="error">`
            +`${trans?.variants.error}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.warning}`,
            code: `<Badge variant="ctx" state="warning">`
            +`${trans?.variants.warning}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.success}`,
            code: `<Badge variant="ctx" state="success">`
            +`${trans?.variants.success}`
            +`</Badge>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.info}`,
            code: `<Badge variant="ctx" state="info">`
            +`${trans?.variants.info}`
            +`</Badge>`,
            language: "Svelte"
        },
    ]}
/>

<style>
    .content {
        display: flex;
        gap: 20px;
    }
</style>
