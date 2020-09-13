<script>
</script>

<style>
  main,
  header {
    max-width: 56rem;
    padding: 0.5rem 2rem;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 0;
  }

  p {
    font-size: 16px;
    margin-top: 0.5rem;
  }
</style>

<svelte:head>
  <title>First Draft</title>
</svelte:head>

<header>
  <h1>First Draft</h1>
  <p>Don't let editing slow down your first draft</p>
</header>
<main>
  <slot />
</main>
