<script>
</script>

<style>
  main,
  header {
    max-width: 56rem;
    padding: 1rem 2rem;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>First Draft</title>
</svelte:head>

<header>
  <h1>First Draft</h1>
  <p>Write and save anything you want. But sorry, you can't delete any text</p>
</header>
<main>
  <slot />
</main>
