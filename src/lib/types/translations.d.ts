// Internal library for complxe type déclarations 

import { translations } from "../../routes/translations";

/* -----------------------------------------
* TRANSLATIONS.TS TYPES
* ----------------------------------------- */

export type Translations = typeof translations;
export type Locale = keyof Translations; // "fr" | "en"
export type Translation = Translations[Locale]; // Content from one of the managed languages

  