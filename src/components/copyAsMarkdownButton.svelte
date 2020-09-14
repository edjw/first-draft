<script>
  import { contents } from "./stores";

  import TurndownService from "turndown";
  let turndownService = new TurndownService({ headingStyle: "atx" });

  const addMarkdownToClipboard = async (event) => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      const html = $contents.html;
      const markdown = turndownService.turndown(html);
      await navigator.clipboard.writeText(markdown);
      event.target.textContent = "Copied!";
      document.querySelector("button#copyForWordButton").textContent =
        "Copy for Word / Google Docs";
    } catch (error) {
      console.error("Copy failed", error);
    }
  };
</script>

<style>
  button {
    min-width: 225px;
    text-align: left;
  }
</style>

<button
  class="button"
  id="copyAsMarkdownButton"
  on:click={addMarkdownToClipboard}>Copy as Markdown</button>
