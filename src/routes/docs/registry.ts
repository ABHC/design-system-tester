import type { Component } from "svelte";
import type { Translation } from "$lib/types/translations";

import HeaderDemo from "./HeaderDemo.svelte";
import FooterDemo from "./FooterDemo.svelte";
import NavDemo from "./NavDemo.svelte";
import DrawerDemo from "./DrawerDemo.svelte";
import TileGridDemo from "./TileGridDemo.svelte";
import HeroDemo from "./HeroDemo.svelte";
import SelectorDemo from "./SelectorDemo.svelte";
import CalloutDemo from "./CalloutDemo.svelte";
import AlertDemo from "./AlertDemo.svelte";
import ButtonDemo from "./ButtonDemo.svelte";
import BadgeDemo from "./BadgeDemo.svelte";
import ListItemDemo from "./ListItemDemo.svelte";
import CardDemo from "./CardDemo.svelte";
import RadioGroupDemo from "./RadioGroupDemo.svelte";
import CheckboxDemo from "./CheckboxDemo.svelte";
import SwitchDemo from "./SwitchDemo.svelte";
import InputDemo from "./InputDemo.svelte";
import SelectDemo from "./SelectDemo.svelte";
import PopoverDemo from "./PopoverDemo.svelte";
import SearchFieldDemo from "./SearchFieldDemo.svelte";
import CommandDemo from "./CommandDemo.svelte";
import AvatarDemo from "./AvatarDemo.svelte";
import ModalDemo from "./ModalDemo.svelte";
import ProgressDemo from "./ProgressDemo.svelte";
import AccordionDemo from "./AccordionDemo.svelte";
import CodeBlockDemo from "./CodeBlockDemo.svelte";
import DataTableDemo from "./DataTableDemo.svelte";
import SliderDemo from "./SliderDemo.svelte";

export type Category = "structure" | "components" | "presentation";

export interface DocEntry {
    slug: string;
    label: string;
    category: Category;
    component: Component<any>;
    get_label: (trans: Translation | null) => string;
}

export const categories: { key: Category; get_label: (trans: Translation | null) => string }[] = [
    { key: "structure", get_label: (t) => t?.welcome.cat_structure ?? "Structure" },
    { key: "components", get_label: (t) => t?.welcome.cat_composants ?? "Components" },
    { key: "presentation", get_label: (t) => t?.welcome.cat_presentation ?? "Presentation" },
];

export const docs: DocEntry[] = [
    // Structure
    { slug: "header", label: "Header", category: "structure", component: HeaderDemo, get_label: (t) => t?.header_demo.title ?? "Header" },
    { slug: "footer", label: "Footer", category: "structure", component: FooterDemo, get_label: (t) => t?.footer_demo.title ?? "Footer" },
    { slug: "nav", label: "Nav", category: "structure", component: NavDemo, get_label: (t) => t?.nav.title ?? "Nav" },
    { slug: "drawer", label: "Drawer", category: "structure", component: DrawerDemo, get_label: (t) => t?.drawer.title ?? "Drawer" },
    { slug: "tilegrid", label: "TileGrid", category: "structure", component: TileGridDemo, get_label: (t) => t?.tile_grid.title ?? "TileGrid" },
    { slug: "hero", label: "Hero", category: "structure", component: HeroDemo, get_label: (t) => "Hero" },
    { slug: "selector", label: "Selector", category: "structure", component: SelectorDemo, get_label: (t) => t?.selector_demo.title ?? "Selector" },

    // Components
    { slug: "callout", label: "Callout", category: "components", component: CalloutDemo, get_label: (t) => t?.callout.title ?? "Callout" },
    { slug: "alert", label: "Alert", category: "components", component: AlertDemo, get_label: (t) => t?.alerts.title ?? "Alert" },
    { slug: "button", label: "Button", category: "components", component: ButtonDemo, get_label: (t) => t?.buttons.title ?? "Button" },
    { slug: "badge", label: "Badge", category: "components", component: BadgeDemo, get_label: (t) => t?.badges.title ?? "Badge" },
    { slug: "listitem", label: "ListItem", category: "components", component: ListItemDemo, get_label: (t) => t?.list_items.title ?? "ListItem" },
    { slug: "card", label: "Card", category: "components", component: CardDemo, get_label: (t) => t?.cards.title ?? "Card" },
    { slug: "radiogroup", label: "RadioGroup", category: "components", component: RadioGroupDemo, get_label: (t) => t?.radio_demo.title ?? "RadioGroup" },
    { slug: "checkbox", label: "Checkbox", category: "components", component: CheckboxDemo, get_label: (t) => t?.checkbox_demo?.title ?? "Checkbox" },
    { slug: "switch", label: "Switch", category: "components", component: SwitchDemo, get_label: (t) => t?.switch_demo.title ?? "Switch" },
    { slug: "input", label: "Input", category: "components", component: InputDemo, get_label: (t) => t?.input_demo.title ?? "Input" },
    { slug: "select", label: "Select", category: "components", component: SelectDemo, get_label: (t) => t?.select.title ?? "Select" },
    { slug: "popover", label: "Popover", category: "components", component: PopoverDemo, get_label: (t) => t?.popover?.title ?? "Popover" },
    { slug: "searchfield", label: "SearchField", category: "components", component: SearchFieldDemo, get_label: (t) => t?.search_field.title ?? "SearchField" },
    { slug: "command", label: "Command", category: "components", component: CommandDemo, get_label: (t) => t?.command.title ?? "Command" },
    { slug: "avatar", label: "Avatar", category: "components", component: AvatarDemo, get_label: (t) => t?.avatar.title ?? "Avatar" },
    { slug: "modal", label: "Modal", category: "components", component: ModalDemo, get_label: (t) => t?.modal.title ?? "Modal" },
    { slug: "progress", label: "Progress", category: "components", component: ProgressDemo, get_label: (t) => t?.progress_demo.title ?? "Progress" },
    { slug: "accordion", label: "Accordion", category: "components", component: AccordionDemo, get_label: (t) => (t as any)?.accordion_demo?.title ?? "Accordion" },
    { slug: "slider", label: "Slider", category: "components", component: SliderDemo, get_label: (t) => (t as any)?.slider_demo?.title ?? "Slider" },

    // Presentation
    { slug: "codeblock", label: "CodeBlock", category: "presentation", component: CodeBlockDemo, get_label: (t) => t?.codeblocks.title ?? "CodeBlock" },
    { slug: "datatable", label: "DataTable", category: "presentation", component: DataTableDemo, get_label: (t) => "DataTable" },
];

export const docs_by_slug = new Map(docs.map(d => [d.slug, d]));
