<script lang="ts">
    import type { AccentTheme, ToneTheme, ContextualColors } from "$lib/types/palettes";
    import type { Translation } from "$lib/types/translations";
    import type { PlaceholdersType } from "./placeholders";
    import Headline      from "../design-system/components/Headline/Headline.svelte";
    import Button        from "../design-system/components/Button/Button.svelte";
    import Welcome       from "./Welcome.svelte";
    import BadgeDemo     from "./BadgeDemo.svelte";
    import ButtonDemo    from "./ButtonDemo.svelte";
    import NavDemo       from "./NavDemo.svelte";
    import ListItemDemo  from "./ListItemDemo.svelte";
    import SidebarDemo   from "./SidebarDemo.svelte";
    import CodeBlockDemo from "./CodeBlockDemo.svelte";
    import TileGridDemo  from "./TileGridDemo.svelte";
    import SelectorDemo  from "./SelectorDemo.svelte";
    import HeaderDemo    from "./HeaderDemo.svelte";
    import FooterDemo    from "./FooterDemo.svelte";
    import CalloutDemo   from "./CalloutDemo.svelte";
    import AlertDemo     from "./AlertDemo.svelte";
    import CardDemo      from "./CardDemo.svelte";
    import AvatarDemo    from "./AvatarDemo.svelte";
    import ModalDemo     from "./ModalDemo.svelte";
    import RadioGroupDemo from "./RadioGroupDemo.svelte";
    import CheckboxDemo  from "./CheckboxDemo.svelte";
    import SwitchDemo    from "./SwitchDemo.svelte";
    import InputDemo     from "./InputDemo.svelte";
    import SelectDemo    from "./SelectDemo.svelte";
    import SearchFieldDemo from "./SearchFieldDemo.svelte";
    import CommandDemo   from "./CommandDemo.svelte";
    import AccentBgLab   from "./AccentBgLab.svelte";

    // Props
    interface Props {
        trans: Translation | null;
        placeholders: PlaceholdersType[keyof PlaceholdersType];
        selected_tone_palette: ToneTheme;
        selected_accent: AccentTheme;
        light_palettes: ToneTheme[];
        dark_palettes: ToneTheme[];
        selected_ctx: ContextualColors;
    }

    let {
        trans,
        placeholders,
        selected_tone_palette,
        selected_accent,
        light_palettes,
        dark_palettes,
        selected_ctx,
    }: Props = $props();

    // ── Filtrage par catégorie ─────────────────────────────────────────────

    type Category = "all" | "presentation" | "structure" | "composants";

    let selected_category: Category = $state("all");

    function show(cats: Category[]): boolean {
        return selected_category === "all" || cats.includes(selected_category);
    }

</script>

<!-- Main Content -->
<div class="content">

    <Welcome trans={trans} bind:selected_category />

    <!-- Typographie ── présentation -->
    <div id="demo-typo">
        {#if show(["presentation"])}
            <Headline size="md" uppercase>{trans?.typo.title}</Headline>
            <div class="demo-section typography-demo">
                <h1>{trans?.typo.h1} - {placeholders.typography.h1_context}</h1>
                <h2>{trans?.typo.h2} - {placeholders.typography.h2_context}</h2>
                <h3>{trans?.typo.h3} - {placeholders.typography.h3_context}</h3>
                <h4>{trans?.typo.h4} - {placeholders.typography.h4_context}</h4>
                <h5>{trans?.typo.h5} - {placeholders.typography.h5_context}</h5>
                <h6>{trans?.typo.h6} - {placeholders.typography.h6_context}</h6>
                <p class="lead">{placeholders.typography.lead}</p>
                <p>{placeholders.typography.body}</p>
            </div>
        {/if}
    </div>

    <!-- Header ── structure -->
    <div id="demo-header">
        {#if show(["structure"])}
            <HeaderDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Footer ── structure -->
    <div id="demo-footer">
        {#if show(["structure"])}
            <FooterDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Callout ── composants -->
    <div id="demo-callout">
        {#if show(["composants"])}
            <CalloutDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Alert ── composants -->
    <div id="demo-alert">
        {#if show(["composants"])}
            <AlertDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Button ── composants -->
    <div id="demo-button">
        {#if show(["composants"])}
            <ButtonDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Badge ── composants -->
    <div id="demo-badge">
        {#if show(["composants"])}
            <BadgeDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- ListItem ── composants -->
    <div id="demo-listitem">
        {#if show(["composants"])}
            <ListItemDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- RadioGroup ── composants -->
    <div id="demo-radiogroup">
        {#if show(["composants"])}
            <RadioGroupDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Checkbox ── composants -->
    <div id="demo-checkbox">
        {#if show(["composants"])}
            <CheckboxDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Switch ── composants -->
    <div id="demo-switch">
        {#if show(["composants"])}
            <SwitchDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Input & Textarea ── composants -->
    <div id="demo-input">
        {#if show(["composants"])}
            <InputDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- SearchField ── composants -->
    <div id="demo-searchfield">
        {#if show(["composants"])}
            <SearchFieldDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Select ── composants -->
    <div id="demo-select">
        {#if show(["composants"])}
            <SelectDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Command ── composants -->
    <div id="demo-command">
        {#if show(["composants"])}
            <CommandDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- ControlBar / Selector ── structure -->
    <div id="demo-selector">
        {#if show(["structure"])}
            <SelectorDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- TileGrid ── structure -->
    <div id="demo-tilegrid">
        {#if show(["structure"])}
            <TileGridDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Nav ── structure -->
    <div id="demo-nav">
        {#if show(["structure"])}
            <NavDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Sidebar ── structure -->
    <div id="demo-sidebar">
        {#if show(["structure"])}
            <SidebarDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- CodeBlock ── présentation -->
    <div id="demo-codeblock">
        {#if show(["presentation"])}
            <CodeBlockDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Card ── composants -->
    <div id="demo-card">
        {#if show(["composants"])}
            <CardDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Avatar ── composants -->
    <div id="demo-avatar">
        {#if show(["composants"])}
            <AvatarDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- Modal ── composants -->
    <div id="demo-modal">
        {#if show(["composants"])}
            <ModalDemo trans={trans} placeholders={placeholders} />
        {/if}
    </div>

    <!-- AccentBg Lab ── test -->
    <!--<div id="demo-accent-bg-lab">
        <Headline size="md" uppercase>Accent-Bg Lab</Headline>
        <AccentBgLab />
    </div>-->
</div>

<style>
    .content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 10px 40px 40px;
    }

    .demo-section {
        margin-bottom: 40px;
    }

    @media (max-width: 768px) {
        .content { padding: 10px 20px 40px; }
    }
</style>
