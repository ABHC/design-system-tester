export const placeholders = {
    fr: {
        typography: {
            h1_context: "L'Empire Romain",
            h2_context: "Architecture et ingénierie",
            h3_context: "Villes principales",
            h4_context: "Infrastructures routières",
            h5_context: "Technologie antique",
            h6_context: "Vestiges archéologiques",
            lead: "Adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            paragraph: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        cards: {
            provinces: [
                {
                    name: "Gallia Lugdunensis",
                    description: "Région stratégique du nord-est incluant les grandes cités de Paris et Strasbourg. Carrefour commercial majeur avec rivières navigables et routes terrestres reliant l'Italie aux côtes atlantiques.",
                    badge: "Commerce",
                    date: "27 av. J.-C.",
                    btn: "Visiter"
                },
                {
                    name: "Hispania Tarraconensis",
                    description: "Province méditerranéenne prospère connue pour ses mines d'argent et ses vignobles prestigieux. Centre culturel avec amphithéâtres remarquables et traditions complexes.",
                    badge: "Richesses",
                    date: "197 av. J.-C.",
                    btn: "Découvrir"
                },
                {
                    name: "Aegyptus Ptolemaica",
                    description: "Grenier du monde antique avec le Nil comme artère commerciale vitale. Mélange fascinant de traditions égyptiennes et d'administration romaine.",
                    badge: "Mystère",
                    date: "30 av. J.-C.",
                    btn: "Explorer"
                }
            ]
        },
        form: {
            placeholder_name: "Ex. Marcus Aurelius",
            placeholder_email: "consul@imperium.romanum",
            placeholder_message: "Salve ! Je viens d'admirer votre magnifique système de design..."
        },
        navigation: {
            items: ["Domus", "Legiones", "Respublica", "Contactus", "Ad visitandum"]
        },
        alerts: {
            success: "✅ Votre message a traversé les frontières sans incident et a été livré au Forum Romanum !",
            info: "ℹ️ Ce système de design a résisté à 2000 ans d'épreuves sans perdre sa dignité.",
            warning: "⚠️ Attention: les gladiateurs du CSS pourraient s'échapper de leurs conteneurs.",
            error: "❌ Les barbares ont attaqué votre palette de couleurs. Défenses activées."
        }
    },
    en: {
        typography: {
            h1_context: "The Roman Empire",
            h2_context: "Architecture and engineering", 
            h3_context: "Major cities",
            h4_context: "Road infrastructure",
            h5_context: "Ancient technology",
            h6_context: "Archaeological remains",
            lead: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            paragraph: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        cards: {
            provinces: [
                {
                    name: "Britannia",
                    description: "Misty island territory at the edge of the known world. Famous for its fierce warrior tribes and inexplicable weather patterns that confound Roman engineers.",
                    badge: "Frontier",
                    date: "43 AD",
                    btn: "Explore"
                },
                {
                    name: "Asia Proconsularis",
                    description: "Wealthy Mediterranean province teeming with Greek culture and ancient temples. Economic powerhouse and intellectual centre of the eastern empire.",
                    badge: "Wealth",
                    date: "133 BC",
                    btn: "Discover"
                },
                {
                    name: "Syria Coele",
                    description: "Crossroads of empires where Silk Road merchants congregate. Rich in spices, silks, and exotic goods from distant Cathay and the mysterious East.",
                    badge: "Trade",
                    date: "64 BC",
                    btn: "Visit"
                },
            ]
        },
        form: {
            placeholder_name: "Ex. Caius Julius Caesar",
            placeholder_email: "imperator@senate.rome",
            placeholder_message: "Salve ! Your design system is as imposing as the Colosseum itself..."
        },
        navigation: {
            items: ["Domus", "Legiones", "Senatus", "Contactus", "Ad visitandum"]
        },
        alerts: {
            success: "✅ Your message has crossed the Roman roads safely and reached the Forum Romanum!",
            info: "ℹ️ This design system has withstood 2000 years of trials without surrendering its dignity.",
            warning: "⚠️ Beware: CSS gladiators may escape their containers.",
            error: "❌ Barbarians have attacked your colour palette. Defence protocols activated."
        }
    }
};

export type PlaceholdersType = typeof placeholders;
export type PlaceholderLocale = keyof PlaceholdersType;