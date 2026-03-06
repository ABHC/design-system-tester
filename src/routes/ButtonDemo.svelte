<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import Button from "../design-system/components/Button/Button.svelte";
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
    {trans?.buttons.title}
</Headline>

<div class="content">
    <Button
        variant="primary"
    >
        {trans?.buttons.primary}
    </Button>

    <Button
        variant="primary"
        uppercase
    >
        {trans?.buttons.uppercase}
    </Button>

    <Button
        variant="primary"
        size="lg"
    >
        {trans?.buttons.large}
    </Button>

    <Button
        variant="primary"
        size="sm"
    >
        {trans?.buttons.small}
    </Button>

    <Button
        variant="secondary"
    >
        {trans?.buttons.secondary}
    </Button>

    <Button
        variant="ghost"
    >
        {trans?.buttons.ghost}
    </Button>

    <Button
        variant="text"
        size= "lg"
    >
        {trans?.buttons.text}
    </Button>

    <Button
        variant="ghost"
        animate="left"
    >
        <icon class="material-symbols-outlined">arrow_back</icon>
        {trans?.buttons.anim_left}
    </Button>

    <Button
        variant="ghost"
        animate="right"
    >
        {trans?.buttons.anim_right}
        <icon class="material-symbols-outlined">arrow_forward</icon>
    </Button>

    <Button
        variant="primary"
        squared
    >
        <icon class="material-symbols-outlined">star</icon>
        {trans?.buttons.primary}
    </Button>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: `${trans?.buttons.primary}`,
            code: `<Button variant="primary">${trans?.buttons.primary}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.uppercase}`,
            code: `<Button variant="primary" uppercase>${trans?.buttons.uppercase}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.large}`,
            code: `<Button variant="primary" size="lg">${trans?.buttons.large}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.small}`,
            code: `<Button variant="primary" size="sm">${trans?.buttons.small}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.secondary}`,
            code: `<Button variant="secondary">${trans?.buttons.secondary}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.ghost}`,
            code: `<Button variant="ghost">${trans?.buttons.ghost}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.anim_left}`,
            code: `<Button variant="ghost" animate="left">`
            +`<icon class="material-symbols-outlined">arrow_back</icon>`
            +`${trans?.buttons.anim_left}`
            +`</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.buttons.anim_right}`,
            code: `<Button variant="ghost" animate="right">`
            +`${trans?.buttons.anim_right}`
            +`<icon class="material-symbols-outlined">arrow_forward</icon>`
            +`</Button>`,
            language: "Svelte"
        },
    ]}
/>


<style>
    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
</style>
