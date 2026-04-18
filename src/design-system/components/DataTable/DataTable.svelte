<script lang="ts">
    import type { Snippet } from "svelte";
    import { createVariant } from "../../utils/builder";
    import { dataTableConfig, defaultDataTableConfig } from "./dataTable.config";

    // Types ----------------------------------------------------------------

    type Variant = "flat" | "outlined" | "ghost";
    type Palette = "accent" | "tone" | "neutral";
    type Size = "sm" | "md" | "lg";
    type Elevation = "none" | "subtle" | "hard";

    interface Column {
        key: string;
        label: string;
        cell?: Snippet<[any]>;
    }

    // Props ----------------------------------------------------------------

    interface Props {
        columns: Column[];
        rows: Record<string, any>[];
        variant?: Variant;
        palette?: Palette;
        size?: Size;
        elevation?: Elevation;
        rounded?: boolean;
    }

    let {
        columns,
        rows,
        variant = defaultDataTableConfig.variant,
        palette = defaultDataTableConfig.palette,
        size = defaultDataTableConfig.size,
        elevation = defaultDataTableConfig.elevation,
        rounded = defaultDataTableConfig.rounded,
    }: Props = $props();

    // Helpers --------------------------------------------------------------

    const resolve = createVariant(dataTableConfig);

    const classes = $derived(
        resolve({
            variant,
            palette,
            size,
            elevation,
            rounded: rounded ? true : undefined,
        }).trim()
    );
</script>

<!-- Desktop: standard table -->
<table class="{classes} data-table-desktop">
    <thead>
        <tr>
            {#each columns as col}
                <th>{col.label}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each rows as row}
            <tr>
                {#each columns as col}
                    <td>
                        {#if col.cell}
                            {@render col.cell(row[col.key])}
                        {:else}
                            {row[col.key] ?? ""}
                        {/if}
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<!-- Mobile: stacked cards -->
<div class="{classes} data-table-mobile">
    {#each rows as row}
        <div class="data-table-card">
            {#each columns as col}
                <div class="data-table-card-row">
                    <span class="data-table-card-label">{col.label}</span>
                    <span class="data-table-card-value">
                        {#if col.cell}
                            {@render col.cell(row[col.key])}
                        {:else}
                            {row[col.key] ?? ""}
                        {/if}
                    </span>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    /* Base --------------------------------------------------------------- */

    .data-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-family: var(--font-body);
        color: var(--text);
    }

    /* Palette ------------------------------------------------------------ */

    .data-table-palette-accent {
        --dt-border: var(--accent);
        --dt-header-bg: var(--accent);
        --dt-header-text: var(--text-accent);
        --dt-row-bg: var(--accent-bg);
        --dt-hover: var(--tone-ghost-hover);
    }

    .data-table-palette-tone {
        --dt-border: var(--tone-hover);
        --dt-header-bg: var(--tone-hover);
        --dt-header-text: var(--text);
        --dt-row-bg: var(--tone);
        --dt-hover: var(--tone-ghost-hover);
    }

    .data-table-palette-neutral {
        --dt-border: var(--neutral);
        --dt-header-bg: var(--neutral);
        --dt-header-text: var(--text-neutral);
        --dt-row-bg: var(--neutral-bg);
        --dt-hover: var(--tone-ghost-hover);
    }

    /* Variants ----------------------------------------------------------- */

    .data-table-flat th {
        background: var(--dt-header-bg);
        color: var(--dt-header-text);
    }

    .data-table-flat td {
        border-top: 1px solid var(--dt-border);
    }

    .data-table-outlined {
        border: 2px solid var(--dt-border);
    }

    .data-table-outlined th {
        border-bottom: 2px solid var(--dt-border);
        color: var(--dt-header-text);
        background: var(--dt-header-bg);
    }

    .data-table-outlined td {
        border-top: 1px solid var(--dt-border);
    }

    .data-table-ghost th {
        border-bottom: 2px solid var(--dt-border);
        color: var(--text-muted);
    }

    .data-table-ghost td {
        border-top: 1px solid var(--dt-border);
    }

    /* Sizes -------------------------------------------------------------- */

    .data-table-sm th,
    .data-table-sm td {
        padding: 0.35rem 0.6rem;
        font-size: 0.8rem;
    }

    .data-table-md th,
    .data-table-md td {
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
    }

    .data-table-lg th,
    .data-table-lg td {
        padding: 0.7rem 1rem;
        font-size: 0.95rem;
    }

    /* Header ------------------------------------------------------------- */

    th {
        text-align: left;
        font-weight: 700;
        font-family: var(--font-heading);
        text-transform: uppercase;
        font-size: 0.75em;
        letter-spacing: 0.5px;
    }

    td {
        vertical-align: top;
    }

    /* Rounded ------------------------------------------------------------ */

    .data-table-rounded {
        border-radius: var(--radius-soft);
        overflow: hidden;
    }

    /* Elevation ---------------------------------------------------------- */

    .data-table-elevation-subtle {
        box-shadow: 0 4px 12px var(--shadow-subtle);
    }

    .data-table-elevation-hard {
        box-shadow: 0.3rem 0.3rem var(--shadow-hard);
    }

    /* Hover -------------------------------------------------------------- */

    tbody tr:hover td {
        background: var(--dt-hover);
    }

    /* Responsive --------------------------------------------------------- */

    .data-table-desktop {
        display: table;
    }

    .data-table-mobile {
        display: none;
    }

    @media (max-width: 640px) {
        .data-table-desktop {
            display: none;
        }

        .data-table-mobile {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .data-table-flat.data-table-mobile {
            background: var(--dt-row-bg);
        }


        .data-table-card {
            overflow: hidden;
        }

        .data-table-card-row {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
        }

        .data-table-card-row + .data-table-card-row {
            border-top: 1px solid var(--dt-border);
        }

        .data-table-card-label {
            font-weight: 700;
            font-family: var(--font-heading);
            text-transform: uppercase;
            font-size: 0.7em;
            letter-spacing: 0.5px;
            color: var(--text-muted);
            flex-shrink: 0;
        }

        .data-table-card-value {
            text-align: right;
        }

        /* Mobile sizes */
        .data-table-sm .data-table-card-row {
            padding: 0.3rem 0.5rem;
            font-size: 0.8rem;
        }

        .data-table-lg .data-table-card-row {
            padding: 0.7rem 1rem;
            font-size: 0.95rem;
        }
    }
</style>
