<script lang="ts">
    import LogoABHC from "./LogoABHC.svelte";
</script>

<div class="brand-container">
    <div class="tagline">
        <div class="brand-name">
            <h3>ALEXANDRE</h3>
            <h3>COMBE</h3>
        </div>
    </div>
    <h1 id="pipe">&nbsp;|&nbsp;</h1>
    <div class="logo-container">
        <LogoABHC />
    </div>
</div>

<style>
    .brand-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .brand-name {
        text-align: end;
    }

    .brand-name h3 {
        margin: 0;
    }

    .tagline {
        text-align: end;
    }

    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 5;
        height: 100%;
        gap: 20px;
        color: var(--accent);
    }

    #pipe {
        margin-bottom: 3px;
        margin-top: 0;
    }
</style>