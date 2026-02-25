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
        {trans?.variants.primary}
    </Button>

    <Button
        variant="primary"
        uppercase
    >
        {trans?.variants.uppercase}
    </Button>

    <Button
        variant="primary"
        size="lg"
    >
        {trans?.variants.large}
    </Button>

    <Button
        variant="primary"
        size="sm"
    >
        {trans?.variants.small}
    </Button>

    <Button
        variant="secondary"
    >
        {trans?.variants.secondary}
    </Button>

    <Button
        variant="ghost"
    >
        {trans?.variants.ghost}
    </Button>

    <Button
        variant="ghost"
        animate="left"
    >
        <icon class="material-symbols-outlined">arrow_back</icon>
        {trans?.variants.anim_left}
    </Button>

    <Button
        variant="ghost"
        animate="right"
    >
        {trans?.variants.anim_right}
        <icon class="material-symbols-outlined">arrow_forward</icon>
    </Button>
</div>

<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        {
            label: `${trans?.variants.primary}`,
            code: `<Button variant="primary">${trans?.variants.primary}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.uppercase}`,
            code: `<Button variant="primary" uppercase>${trans?.variants.uppercase}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.large}`,
            code: `<Button variant="primary" size="lg">${trans?.variants.large}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.small}`,
            code: `<Button variant="primary" size="sm">${trans?.variants.small}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.secondary}`,
            code: `<Button variant="secondary">${trans?.variants.secondary}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.ghost}`,
            code: `<Button variant="ghost">${trans?.variants.ghost}</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.anim_left}`,
            code: `<Button variant="ghost" animate="left">`
            +`<icon class="material-symbols-outlined">arrow_back</icon>`
            +`${trans?.variants.anim_left}`
            +`</Button>`,
            language: "Svelte"
        },
        {
            label: `${trans?.variants.anim_right}`,
            code: `<Button variant="ghost" animate="right">`
            +`${trans?.variants.anim_right}`
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
        width: max-content;
        height:max-content;
        gap: 20px;
    }
</style>
