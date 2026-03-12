// Declarative Avatar configuration
export const avatarConfig = {
    base: "avatar-base",

    variants: {
        size: {
            xsm: "avatar-xsm",
            sm: "avatar-sm",
            md: "avatar-md",
            lg: "avatar-lg",
            xlg: "avatar-xlg"
        },

        palette: {
            accent: "avatar-palette-accent",
            tone: "avatar-palette-tone",
        },

        circular: {
            true: "avatar-circular",
        },

        status: {
            online: "avatar-online",
            offline: "avatar-offline",
            absent: "avatar-absent",
            "do-not-disturb": "avatar-do-not-disturb"
        },
    }
};