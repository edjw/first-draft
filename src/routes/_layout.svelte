<script>
</script>

<style>
  main,
  header {
    max-width: 56rem;
    padding: 1rem 2rem;
    margin: 0 auto;
  }

  p {
    font-size: 16px;
  }
</style>

<svelte:head>
  <title>First Draft</title>
</svelte:head>

<header>
  <h1>First Draft</h1>
  <p>
    Write your first draft without editing slowing you down. You can't delete
    any text once you've typed it.
  </p>
</header>
<main>
  <slot />
</main>
