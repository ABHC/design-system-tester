# Chargement à la demande 

```
// src/lib/stores/fontStore.ts
import { writable } from 'svelte/store';
import type { FontConfig } from '$lib/types/fonts';
import fontsData from '$lib/data/fonts.json';

const loadedFonts = new Set<string>();

export const currentBodyFont = writable<FontConfig>(fontsData.fonts[0]);
export const currentHeadingFont = writable<FontConfig>(fontsData.fonts[1]);

/**
 * Load a single font on demand
 */
export function loadFontOnDemand(font: FontConfig): void {
    if (loadedFonts.has(font.googleFontsName)) return;
    
    const weightsString = font.weights.join(';');
    const url = `https://fonts.googleapis.com/css2?family=${font.googleFontsName}:wght@${weightsString}&display=swap`;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    
    loadedFonts.add(font.googleFontsName);
}
```

## Avantages de cette approche

✅ **Modulaire** : Pas de distinction body/heading dans le JSON
✅ **Dynamique** : Chargement automatique depuis Google Fonts
✅ **Performant** : Preconnect et chargement optimisé
✅ **Type-safe** : Types TypeScript complets
✅ **Flexible** : Chargement global ou à la demande selon vos besoins
✅ **Extensible** : Facile d'ajouter de nouvelles polices



**Commit message sketch:**
```
feat(fonts): add dynamic font loading system with Google Fonts integration
```

# Polices Custom

```
// Polices prédéfinies : chargées statiquement dans layout.svelte
// Polices custom ajoutées par l'utilisateur : chargées avec loadFontOnDemand()

import { loadFontOnDemand } from '$lib/utils/fontLoader';

function addCustomFont(fontName: string) {
    const customFont = {
        name: fontName,
        family: fontName,
        weights: [400, 700],
        googleFontsName: fontName.replace(/ /g, '+')
    };
    
    // Charger uniquement cette nouvelle police
    loadFontOnDemand(customFont);
}
```

- Add static font URL generation from fonts.json configuration
- Support reactive font loading based on configuration
- Add global typography styles (h1-h6, body)
