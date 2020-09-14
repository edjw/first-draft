<script>
  import { contents } from "./stores";

  import { write, ClipboardItem } from "clipboard-polyfill";

  const addTextToClipboard = async (event) => {
    try {
      const formattedText = $contents.html;
      const plainText = $contents.plainText;
      const item = new ClipboardItem({
        "text/html": new Blob([formattedText], { type: "text/html" }),
        "text/plain": new Blob([plainText], { type: "text/plain" }),
      });
      await write([item]);
      event.target.textContent = "Copied!";
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

<button class="button" id="copyForWordButton" on:click={addTextToClipboard}>Copy
  for Word / Google Docs</button>
