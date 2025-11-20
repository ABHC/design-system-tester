import type { FontConfig } from '$lib/types/fonts';

/**
 * Generate Google Fonts URL from font configurations
 * @param fonts - Array of font configurations to load
 * @returns Complete Google Fonts URL
 */
export function generateGoogleFontsUrl(fonts: FontConfig[]): string {
    if (fonts.length === 0) return '';
    
    // Filter only fonts that should be displayed
    const displayed_fonts = fonts.filter(font => font.display);
    
    // Build font family strings with weights
    const font_families = displayed_fonts.map(font => {
        const weights_string = font.weights.join(';');
        return `family=${font.googleFontsName}:wght@${weights_string}`;
    });
    
    // Construct complete URL
    const base_url = 'https://fonts.googleapis.com/css2';
    const families_param = font_families.join('&');
    const display_param = 'display=swap';
    
    return `${base_url}?${families_param}&${display_param}`;
}

/**
 * Get CSS font-family value for a font
 * @param font - Font configuration
 * @returns CSS font-family string
 */
export function getFontFamilyValue(font: FontConfig): string {
    return `'${font.family}', sans-serif`;
}

/**
 * Load Google Fonts dynamically by injecting a link element
 * @param fonts - Array of font configurations to load
 */
export function loadGoogleFonts(fonts: FontConfig[]): void {
    const url = generateGoogleFontsUrl(fonts);
    
    if (!url) return;
    
    // Check if link already exists
    const existing_link = document.querySelector(`link[href="${url}"]`);
    if (existing_link) return;
    
    // Create and inject link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

/**
 * Preconnect to Google Fonts for performance
 */
export function preconnectGoogleFonts(): void {
    // Preconnect to fonts.googleapis.com
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    
    // Preconnect to fonts.gstatic.com with crossorigin
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    
    // Check if already exists
    if (!document.querySelector('link[href="https://fonts.googleapis.com"]')) {
        document.head.appendChild(preconnect1);
    }
    if (!document.querySelector('link[href="https://fonts.gstatic.com"]')) {
        document.head.appendChild(preconnect2);
    }
}