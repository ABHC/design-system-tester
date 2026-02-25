// Generic variant resolver
export function createVariant(config: any) {
    return function resolve(props: any) {
        const classes: string[] = [];

        if (config.base) {
            classes.push(config.base);
        }

        for (const key in config.variants) {
            const value = props[key];
            const mapping = config.variants[key];

            if (value && mapping[value]) {
                classes.push(mapping[value]);
            }
        }

        return classes.join(" ");
    };
}
