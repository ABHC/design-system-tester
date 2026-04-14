import type { Component } from "svelte";
import type { Translation } from "$lib/types/translations";

import HeaderDemo from "./HeaderDemo.svelte";
import FooterDemo from "./FooterDemo.svelte";
import NavDemo from "./NavDemo.svelte";
import HeroDemo from "./HeroDemo.svelte";
import TileGridDemo from "./TileGridDemo.svelte";
import ExplorerDemo from "./ExplorerDemo.svelte";

import ButtonDemo from "./ButtonDemo.svelte";
import BadgeDemo from "./BadgeDemo.svelte";
import InputDemo from "./InputDemo.svelte";
import TextareaDemo from "./TextareaDemo.svelte";
import SelectDemo from "./SelectDemo.svelte";
import CheckboxDemo from "./CheckboxDemo.svelte";
import RadioGroupDemo from "./RadioGroupDemo.svelte";
import SwitchDemo from "./SwitchDemo.svelte";
import SliderDemo from "./SliderDemo.svelte";
import SearchFieldDemo from "./SearchFieldDemo.svelte";
import ColorPickerDemo from "./ColorPickerDemo.svelte";
import SelectorDemo from "./SelectorDemo.svelte";
import ControlBarDemo from "./ControlBarDemo.svelte";

import DrawerDemo from "./DrawerDemo.svelte";
import ModalDemo from "./ModalDemo.svelte";
import PopoverDemo from "./PopoverDemo.svelte";
import CommandDemo from "./CommandDemo.svelte";

import AlertDemo from "./AlertDemo.svelte";
import CalloutDemo from "./CalloutDemo.svelte";
import ProgressDemo from "./ProgressDemo.svelte";

import CardDemo from "./CardDemo.svelte";
import ListItemDemo from "./ListItemDemo.svelte";
import AccordionDemo from "./AccordionDemo.svelte";
import DataTableDemo from "./DataTableDemo.svelte";
import CodeBlockDemo from "./CodeBlockDemo.svelte";
import AvatarDemo from "./AvatarDemo.svelte";
import HeadlineDemo from "./HeadlineDemo.svelte";
import TimelineDemo from "./TimelineDemo.svelte";
import MarqueeDemo from "./MarqueeDemo.svelte";
import SupportDemo from "./SupportDemo.svelte";
import SwatchRowDemo from "./SwatchRowDemo.svelte";

export type Category = "layout" | "controls" | "overlays" | "feedback" | "content";

export interface DocEntry {
    slug: string;
    label: string;
    category: Category;
    component: Component<any>;
    get_label: (trans: Translation | null) => string;
}

export const categories: { key: Category; get_label: (trans: Translation | null) => string }[] = [
    { key: "layout",   get_label: (t) => t?.welcome.cat_layout   ?? "Layout" },
    { key: "controls", get_label: (t) => t?.welcome.cat_controls ?? "Controls" },
    { key: "overlays", get_label: (t) => t?.welcome.cat_overlays ?? "Overlays" },
    { key: "feedback", get_label: (t) => t?.welcome.cat_feedback ?? "Feedback" },
    { key: "content",  get_label: (t) => t?.welcome.cat_content  ?? "Content" },
];

export const docs: DocEntry[] = [
    // Layout ────────────────────────────────────────────────────────────────
    {
        slug: "header",
        label: "Header",
        category: "layout",
        component: HeaderDemo, get_label: (t) => t?.header_demo.title ?? "Header"
    },
    {
        slug: "footer",
        label: "Footer",
        category: "layout",
        component: FooterDemo, get_label: (t) => t?.footer_demo.title ?? "Footer"
    },
    {
        slug: "nav",
        label: "Nav",
        category: "layout",
        component: NavDemo, get_label: (t) => t?.nav.title ?? "Nav"
    },
    {
        slug: "hero",
        label: "Hero",
        category: "layout",
        component: HeroDemo, get_label: (t) => t?.hero_demo.title ?? "Hero"
    },
    {
        slug: "tilegrid",
        label: "TileGrid",
        category: "layout",
        component: TileGridDemo, get_label: (t) => t?.tile_grid_demo.title ?? "TileGrid"
    },
    {
        slug: "explorer",
        label: "Explorer",
        category: "layout",
        component: ExplorerDemo, get_label: (t) => t?.explorer_demo.title ?? "Explorer"
    },

    // Controls ──────────────────────────────────────────────────────────────
    {
        slug: "button",
        label: "Button",
        category: "controls",
        component: ButtonDemo, get_label: (t) => t?.button_demo.title ?? "Button"
    },
    {
        slug: "badge",
        label: "Badge",
        category: "controls",
        component: BadgeDemo, get_label: (t) => t?.badge_demo.title ?? "Badge"
    },
    {
        slug: "input",
        label: "Input",
        category: "controls",
        component: InputDemo, get_label: (t) => t?.input_demo.title ?? "Input"
    },
    {
        slug: "textarea",
        label: "Textarea",
        category: "controls",
        component: TextareaDemo, get_label: (t) => t?.textarea_demo.title ?? "Textarea"
    },
    {
        slug: "select",
        label: "Select",
        category: "controls",
        component: SelectDemo, get_label: (t) => t?.select_demo.title ?? "Select"
    },
    {
        slug: "checkbox",
        label: "Checkbox",
        category: "controls",
        component: CheckboxDemo, get_label: (t) => t?.checkbox_demo?.title ?? "Checkbox"
    },
    {
        slug: "radiogroup",
        label: "RadioGroup",
        category: "controls",
        component: RadioGroupDemo, get_label: (t) => t?.radio_demo.title ?? "RadioGroup"
    },
    {
        slug: "switch",
        label: "Switch",
        category: "controls",
        component: SwitchDemo, get_label: (t) => t?.switch_demo.title ?? "Switch"
    },
    {
        slug: "slider",
        label: "Slider",
        category: "controls",
        component: SliderDemo, get_label: (t) => t?.slider_demo?.title ?? "Slider"
    },
    {
        slug: "searchfield",
        label: "SearchField",
        category: "controls",
        component: SearchFieldDemo, get_label: (t) => t?.search_field_demo.title ?? "SearchField"
    },
    {
        slug: "colorpicker",
        label: "ColorPicker",
        category: "controls",
        component: ColorPickerDemo, get_label: (t) => t?.color_picker_demo?.title ?? "ColorPicker"
    },
    {
        slug: "selector",
        label: "Selector",
        category: "controls",
        component: SelectorDemo, get_label: (t) => t?.selector_demo.title ?? "Selector"
    },
    {
        slug: "controlbar",
        label: "ControlBar",
        category: "controls",
        component: ControlBarDemo, get_label: (t) => t?.control_bar_demo.title ?? "ControlBar"
    },

    // Overlays ──────────────────────────────────────────────────────────────
    {
        slug: "drawer",
        label: "Drawer",
        category: "overlays",
        component: DrawerDemo, get_label: (t) => t?.drawer_demo.title ?? "Drawer"
    },
    {
        slug: "modal",
        label: "Modal",
        category: "overlays",
        component: ModalDemo, get_label: (t) => t?.modal_demo.title ?? "Modal"
    },
    {
        slug: "popover",
        label: "Popover",
        category: "overlays",
        component: PopoverDemo, get_label: (t) => t?.popover_demo?.title ?? "Popover"
    },
    {
        slug: "command",
        label: "Command",
        category: "overlays",
        component: CommandDemo, get_label: (t) => t?.command_demo.title ?? "Command"
    },

    // Feedback ──────────────────────────────────────────────────────────────
    {
        slug: "alert",
        label: "Alert",
        category: "feedback",
        component: AlertDemo, get_label: (t) => t?.alert_demo.title ?? "Alert"
    },
    {
        slug: "callout",
        label: "Callout",
        category: "feedback",
        component: CalloutDemo, get_label: (t) => t?.callout_demo.title ?? "Callout"
    },
    {
        slug: "progress",
        label: "Progress",
        category: "feedback",
        component: ProgressDemo, get_label: (t) => t?.progress_demo.title ?? "Progress"
    },

    // Content ───────────────────────────────────────────────────────────────
    {
        slug: "card",
        label: "Card",
        category: "content",
        component: CardDemo, get_label: (t) => t?.card_demo.title ?? "Card"
    },
    {
        slug: "listitem",
        label: "ListItem",
        category: "content",
        component: ListItemDemo, get_label: (t) => t?.list_item_demo.title ?? "ListItem"
    },
    {
        slug: "accordion",
        label: "Accordion",
        category: "content",
        component: AccordionDemo, get_label: (t) => t?.accordion_demo.title ?? "Accordion"
    },
    {
        slug: "datatable",
        label: "DataTable",
        category: "content",
        component: DataTableDemo, get_label: (t) => t?.data_table_demo.title ?? "DataTable"
    },
    {
        slug: "codeblock",
        label: "CodeBlock",
        category: "content",
        component: CodeBlockDemo, get_label: (t) => t?.code_block_demo.title ?? "CodeBlock"
    },
    {
        slug: "avatar",
        label: "Avatar",
        category: "content",
        component: AvatarDemo, get_label: (t) => t?.avatar_demo.title ?? "Avatar"
    },
    {
        slug: "headline",
        label: "Headline",
        category: "content",
        component: HeadlineDemo, get_label: (t) => t?.headline_demo?.title ?? "Headline"
    },
    {
        slug: "timeline",
        label: "Timeline",
        category: "content",
        component: TimelineDemo, get_label: (t) => t?.timeline_demo?.title ?? "Timeline"
    },
    {
        slug: "marquee",
        label: "Marquee",
        category: "content",
        component: MarqueeDemo, get_label: (t) => t?.marquee_demo?.title ?? "Marquee"
    },
    {
        slug: "support",
        label: "Support",
        category: "content",
        component: SupportDemo, get_label: (t) => t?.support_demo?.title ?? "Support"
    },
    {
        slug: "swatchrow",
        label: "SwatchRow",
        category: "content",
        component: SwatchRowDemo, get_label: (t) => t?.swatch_row_demo?.title ?? "SwatchRow"
    },
];

export const docs_by_slug = new Map(docs.map(d => [d.slug, d]));
