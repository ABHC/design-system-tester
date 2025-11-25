# Design System Tester - Testeur de Système Design

[English](#english) | [Français](#français)

---

## Français

### À propos

**Design System Tester** est une application interactive permettant de tester, visualiser et valider des systèmes de design complets. Développée avec **SvelteKit** et **TypeScript**, elle offre une interface intuitive pour explorer les combinaisons de thèmes, palettes de couleurs, typographies et composants UI.

L'application inclut un système de contraste WCAG AAA pour garantir l'accessibilité de votre système de design.

### Fonctionnalités principales

- **Thèmes adaptatifs** : Basculez entre thèmes clair et sombre avec support multilingue (FR/EN)
- **Gestion avancée des palettes** : Sélectionnez parmi 8 palettes d'accent et jusqu'à 7 palettes de ton avec interface collapsible
- **Système typographique** : Testez différentes combinaisons de polices pour le corps de texte et les titres (chargement Google Fonts optimisé)
- **Composants UI complets** : Boutons, cartes, formulaires, navigation, alertes
- **Calculateur de contraste WCAG** : Validez en temps réel le contraste de votre palette (AA et AAA)
- **Architecture modulaire** : Composants découplés pour maintenabilité et réutilisabilité

### Stack technique

- **Framework** : SvelteKit 5 avec Svelte Runes
- **Langage** : TypeScript 5.9
- **Build** : Vite 7
- **CSS** : Variables CSS natives + Tailwind utility concepts
- **Test** : Vitest + Playwright
- **Linting** : ESLint 9 + Prettier 3 + svelte-check
- **Gestionnaire de paquets** : npm

### Structure du projet

```
src/
├── routes/
│   ├── +page.svelte              # Page principale (orchestrateur)
│   ├── +layout.svelte            # Layout global avec header/footer
│   ├── ControlPanel.svelte       # Panneau de contrôle (état root)
│   ├── ItemsDisplay.svelte       # Composant réutilisable pour listes d'items
│   ├── Content.svelte            # Contenu principal (démo système)
│   ├── store.ts                  # Stores Svelte
│   ├── translations.ts           # Traductions FR/EN
│   └── placeholders.ts           # Contenu placeholder
├── lib/
│   ├── data/
│   │   ├── fonts.json            # Configuration des polices Google Fonts
│   │   └── palettes.json         # Palettes d'accent et tons
│   ├── types/
│   │   ├── fonts.d.ts
│   │   ├── palettes.d.ts
│   │   └── translations.d.ts
│   ├── utils/
│   │   └── fontLoader.ts         # Utilitaires chargement polices
│   └── assets/
│       └── favicon.svg
└── app.html                      # HTML racine

static/
├── Logo_Epinard2.svg            # Logo personnalisé
├── style.css                     # Variables CSS globales
└── robots.txt
```

### Installation & Développement

```bash
# Cloner et installer
git clone <repository>
cd design-system-tester
npm install

# Développement avec hot reload
npm run dev

# Build production
npm run build

# Aperçu production
npm run preview

# Vérification qualité
npm run check          # svelte-check + TypeScript
npm run lint          # ESLint + Prettier
npm run test          # Vitest

# Format automatique
npm run format
```

### Architecture & Composants

#### +page.svelte
Orchestrateur principal gérant l'état global, les dérivations et le calcul des ratios de contraste WCAG. Compose `ControlPanel.svelte` et `Content.svelte`.

#### ControlPanel.svelte
Panneau de contrôle fixe avec sélecteurs :
- Basculement thème (clair/sombre)
- 8 palettes d'accent
- Jusqu'à 7 palettes de ton
- Sélection de polices (corps + titres)

Utilise `ItemsDisplay.svelte` pour gérer les listes avec collapse/expand.

#### ItemsDisplay.svelte
Composant réutilisable affichant les 3 premiers items avec bouton "Voir plus". Inclut scroll interne pour listes longues et gestion d'état locale.

#### Content.svelte
Zone de démonstration avec sections :
- Typographie (h1-h6 + textes)
- Palette de couleurs (swatches interactifs)
- Composants (boutons, cartes, formulaires, navigation)
- Calculateur de contraste temps réel

### Système de design

#### Palettes (palettes.json)

**Accents** : Viridian, Emerald, Amethyst, Cyan Techno, Azure Pro, Solar Yellow, Gold Warm, Sunset Orange

**Tons clair** : Sepia, Balanced, Soft, Matte

**Tons sombre** : Deep, Pure Black, Void, Midnight Blue, Navy Deep, Slate Stone, Carbon

Chaque palette inclut :
- Couleurs principales et variantes
- Textes contrastés (WCAG AAA optimisé)
- Support light/dark mode

#### Polices

Google Fonts optimisées :
- **Display** (chargées par défaut) : Inter, Space Grotesk, Roboto, Open Sans, Lato, Montserrat, Ubuntu
- **Hidden** : Poppins, Source Sans 3

Preconnexion automatique pour performance.

### Internationalisation

Actuellement supportées : **Français** et **Anglais**

Les textes dynamiques sont gérés via `translations.ts` et les placeholders structurés via `placeholders.ts`.

### Accessibilité

- **Contraste WCAG** : Calculateur temps réel validant AA et AAA
- **Navigation clavier** : Support complet avec focus visible
- **Sémantique HTML** : Landmarks, labels, ARIA où nécessaire
- **Mode sombre** : Support natif avec préférence système

### Configuration

#### CSS Variables
Toutes les couleurs, typographies et espacements utilisent des variables CSS natives définies dans `/static/style.css` et injectées dynamiquement.

#### TypeScript
Configuration stricte activée (`strict: true`). Path alias via `$lib` pour imports propres.

#### Vite
Optimisé pour SvelteKit avec HMR activé. Timestamps Vite ignorés dans `.gitignore`.

### Licence

GNU General Public License v3.0 - Voir [LICENSE](./LICENSE)

---

## English

### About

**Design System Tester** is an interactive application for testing, visualising, and validating complete design systems. Built with **SvelteKit** and **TypeScript**, it provides an intuitive interface to explore combinations of themes, colour palettes, typography, and UI components.

The application includes a WCAG AAA contrast checker to ensure your design system's accessibility.

### Key Features

- **Adaptive themes**: Switch between light and dark modes with multilingual support (FR/EN)
- **Advanced palette management**: Choose from 8 accent palettes and up to 7 tone palettes with collapsible interface
- **Typographic system**: Test different font combinations for body and headings (optimised Google Fonts loading)
- **Complete UI components**: Buttons, cards, forms, navigation, alerts
- **WCAG contrast calculator**: Real-time validation of palette contrast (AA and AAA)
- **Modular architecture**: Decoupled components for maintainability and reusability

### Technology Stack

- **Framework**: SvelteKit 5 with Svelte Runes
- **Language**: TypeScript 5.9
- **Build**: Vite 7
- **CSS**: Native CSS variables + Tailwind utility concepts
- **Testing**: Vitest + Playwright
- **Linting**: ESLint 9 + Prettier 3 + svelte-check
- **Package Manager**: npm

### Project Structure

```
src/
├── routes/
│   ├── +page.svelte              # Main page (orchestrator)
│   ├── +layout.svelte            # Global layout with header/footer
│   ├── ControlPanel.svelte       # Control panel (root state)
│   ├── ItemsDisplay.svelte       # Reusable component for item lists
│   ├── Content.svelte            # Main content (system demo)
│   ├── store.ts                  # Svelte stores
│   ├── translations.ts           # FR/EN translations
│   └── placeholders.ts           # Placeholder content
├── lib/
│   ├── data/
│   │   ├── fonts.json            # Google Fonts configuration
│   │   └── palettes.json         # Accent and tone palettes
│   ├── types/
│   │   ├── fonts.d.ts
│   │   ├── palettes.d.ts
│   │   └── translations.d.ts
│   ├── utils/
│   │   └── fontLoader.ts         # Font loading utilities
│   └── assets/
│       └── favicon.svg
└── app.html                      # Root HTML

static/
├── Logo_Epinard2.svg            # Custom logo
├── style.css                     # Global CSS variables
└── robots.txt
```

### Setup & Development

```bash
# Clone and install
git clone <repository>
cd design-system-tester
npm install

# Development with hot reload
npm run dev

# Production build
npm run build

# Production preview
npm run preview

# Quality checks
npm run check          # svelte-check + TypeScript
npm run lint          # ESLint + Prettier
npm run test          # Vitest

# Auto-format
npm run format
```

### Architecture & Components

#### +page.svelte
Main orchestrator managing global state, derivations, and WCAG contrast ratio calculations. Composes `ControlPanel.svelte` and `Content.svelte`.

#### ControlPanel.svelte
Fixed control panel with selectors:
- Theme toggle (light/dark)
- 8 accent palettes
- Up to 7 tone palettes
- Font selection (body + headings)

Uses `ItemsDisplay.svelte` to manage lists with collapse/expand.

#### ItemsDisplay.svelte
Reusable component displaying first 3 items with "See more" button. Includes internal scroll for long lists and local state management.

#### Content.svelte
Demo zone with sections:
- Typography (h1-h6 + text samples)
- Colour palette (interactive swatches)
- Components (buttons, cards, forms, navigation)
- Real-time contrast calculator

### Design System

#### Palettes (palettes.json)

**Accents**: Viridian, Emerald, Amethyst, Cyan Techno, Azure Pro, Solar Yellow, Gold Warm, Sunset Orange

**Light tones**: Sepia, Balanced, Soft, Matte

**Dark tones**: Deep, Pure Black, Void, Midnight Blue, Navy Deep, Slate Stone, Carbon

Each palette includes:
- Main colours and variants
- Contrasted text (WCAG AAA optimised)
- Light/dark mode support

#### Fonts

Optimised Google Fonts:
- **Display** (loaded by default): Inter, Space Grotesk, Roboto, Open Sans, Lato, Montserrat, Ubuntu
- **Hidden**: Poppins, Source Sans 3

Automatic preconnection for performance.

### Internationalisation

Currently supported: **French** and **English**

Dynamic content managed via `translations.ts` and structured placeholders via `placeholders.ts`.

### Accessibility

- **WCAG Contrast**: Real-time calculator validating AA and AAA
- **Keyboard navigation**: Full support with visible focus
- **HTML Semantics**: Landmarks, labels, ARIA where needed
- **Dark mode**: Native support with system preference detection

### Configuration

#### CSS Variables
All colours, typography, and spacing use native CSS variables defined in `/static/style.css` and dynamically injected.

#### TypeScript
Strict configuration enabled (`strict: true`). Path alias via `$lib` for clean imports.

#### Vite
Optimised for SvelteKit with HMR enabled. Vite timestamps ignored in `.gitignore`.

### Licence

GNU General Public License v3.0 - See [LICENSE](./LICENSE)
