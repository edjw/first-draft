<script>
</script>

<style>
  header,
  main,
  footer {
    max-width: 56rem;
    padding: 0.5rem 2rem;
    margin: 0 auto;
  }

  @media only screen and (max-width: 768px) {
    header,
    main,
    footer {
      padding: 0.5rem 0;
    }
  }

  h1 {
    margin-bottom: 0;
  }

  p.subtitle {
    font-size: 16px;
    margin-top: 0.5rem;
  }

  footer {
    margin: 1rem auto;
    padding: 0;
    border-top: 1px solid #333;
  }

  footer p {
    color: rgba(0, 0, 0, 0.6);
  }
</style>

<svelte:head>
  <title>First Draft</title>
</svelte:head>

<header>
  <h1>First Draft</h1>
  <p class="subtitle">Don't let editing slow down your first draft</p>
</header>
<main>
  <slot />
</main>
<footer>
  <p>Made by <a href="https://twitter.com/_edjw">Ed Johnson-Williams</a></p>
  <p>
    Finding this useful? <a href="https://ko-fi.com/edjohnsonwilliams">Chip in
      to help make First Draft better</a>
  </p>
</footer>
