<style>
  header,
  main,
  footer {
    padding: 0.5rem 2rem;
  }

  footer {
    margin: 2rem 2rem 1rem 2rem;
    border-top: 1px solid #333;
    padding-left: 0;
    padding-right: 0;
  }

  @media only screen and (max-width: 768px) {
    header,
    main,
    footer {
      padding: 0.5rem 0;
    }

    footer {
      margin: 2rem 0rem 1rem 0rem;
    }
  }

  h1 {
    margin-bottom: 0;
  }

  p.subtitle {
    font-size: 16px;
    margin-top: 0.5rem;
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
  <p>Made by Ed Johnson-Williams</p>
  <p><a href="https://github.com/edjw/first-draft">See this project on Github</a></p>
  <p>
    Finding this useful?
    <a href="https://ko-fi.com/edjohnsonwilliams">Chip in to help make First
      Draft better</a>
  </p>
</footer>
