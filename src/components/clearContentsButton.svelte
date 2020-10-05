<script>
  import { contents } from "../components/stores.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const confirmClear = () => {
    if (confirm("This will delete all your text. Are you sure?")) {
      clearContents();
    }
  };

  const clearContents = () => {
    $contents.html = undefined;
    $contents.contents = undefined;
    $contents.plainText = undefined;
    document.querySelector(".ql-editor").innerHTML = "";
    document.querySelector("button#copyForWordButton").textContent =
      "Copy for Word / Google Docs";
    document.querySelector("button#copyAsMarkdownButton").textContent =
      "Copy as Markdown";
    dispatch("allowTyping");
  };
</script>

<style>
  button {
    min-width: 225px;
    text-align: left;
  }
</style>

<button class="button" on:click={confirmClear}>Start again</button>
