<script lang="ts">
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline from "../design-system/components/Headline/Headline.svelte";
    import CodeBlock from "../design-system/components/CodeBlock/CodeBlock.svelte";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
    }

    let { trans, placeholders }: Props = $props();

    // Preview snippets 

    const jsSnippet = `function createToken(name, value) {
    return { name, value, timestamp: Date.now() }
}

const accent = createToken('--accent', '#6d5dfc')
console.log(accent)`;

    const tsSnippet = `export interface TokenConfig {
    palette:    PaletteTokens
    accent:     AccentTokens
    tone:       'light' | 'dark'
    typography: TypographyTokens
}`;

    const configSnippet = `export const buttonConfig = {
    base: "btn",
    variants: {
        variant: {
            primary:   "btn-primary",
            secondary: "btn-secondary",
            ghost:     "btn-ghost",
            muted:     "btn-muted",
        },
        size: {
            sm: "btn-sm",
            md: "btn-md",
            lg: "btn-lg",
        }
    }
}`;

    // Usage code shown inside the bottom tabbed CodeBlock 

    const usageSimple = `<CodeBlock
    code={myCode}
    copyable
/>`;

    const usageTitled = `<CodeBlock
    variant="titled"
    title="My title"
    language="TypeScript"
    code={myCode}
    copyable
/>`;

    const usageFilename = `<CodeBlock
    variant="filename"
    filename="button.config.ts"
    language="TypeScript"
    code={myCode}
    copyable
    line_numbers
/>`;

    const usageDescription = `<!-- description activates the split layout -->
<!-- works on all variants except simple   -->
<CodeBlock
    variant="filename"
    filename="button.config.ts"
    description="**Bold**, _italic_, \`inline code\` and line breaks (\\n) are supported."
    language="TypeScript"
    code={myCode}
    copyable
/>`;

    const usageTabbed = `<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "Tab 1", code: firstCode,  language: "Svelte" },
        { label: "Tab 2", code: secondCode, language: "Svelte" },
    ]}
/>`;

    const usageTerminal = `<CodeBlock
    variant="terminal"
    title="build.sh"
    code={myCode}
/>`;
</script>

<Headline size="md" uppercase>
    {trans?.codeblocks.title}
</Headline>

<!-- Simple: no header, floating copy button -->
<CodeBlock
    code={jsSnippet}
    copyable
/>

<!-- Titled: header with title + language badge -->
<CodeBlock
    variant="titled"
    title="TokenConfig"
    language="TypeScript"
    code={tsSnippet}
    copyable
/>

<!-- Filename: header only -->
<CodeBlock
    variant="filename"
    filename="button.config.ts"
    language="TypeScript"
    code={configSnippet}
    copyable
    line_numbers
/>

<!-- description prop → split layout (works on all variants except simple) -->
<CodeBlock
    variant="filename"
    filename="button.config.ts"
    description="**Split layout** — add a `description` prop to any variant except `simple` to get this panel.\nSupports **bold**, _italic_ and `inline code`."
    language="TypeScript"
    code={configSnippet}
    copyable
    line_numbers
/>

<!-- Terminal: Linux-style prompt header -->
<CodeBlock
    variant="terminal"
    title="build.sh"
    code={jsSnippet}
/>

<!-- Tabbed: navigate between multiple code examples -->
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "primary",   code: `<Button variant="primary">Primary</Button>`,     language: "Svelte" },
        { label: "secondary", code: `<Button variant="secondary">Secondary</Button>`, language: "Svelte" },
        { label: "ghost",     code: `<Button variant="ghost">Ghost</Button>`,         language: "Svelte" },
        { label: "muted",     code: `<Button variant="muted">Muted</Button>`,         language: "Svelte" },
    ]}
/>

<!-- Usage code for each variant — shown inside CodeBlocks -->
<CodeBlock
    variant="tabbed"
    copyable
    tabs={[
        { label: "simple",      code: usageSimple,      language: "Svelte" },
        { label: "titled",      code: usageTitled,      language: "Svelte" },
        { label: "filename",    code: usageFilename,    language: "Svelte" },
        { label: "description", code: usageDescription, language: "Svelte" },
        { label: "tabbed",      code: usageTabbed,      language: "Svelte" },
        { label: "terminal",    code: usageTerminal,    language: "Svelte" },
    ]}
/>
