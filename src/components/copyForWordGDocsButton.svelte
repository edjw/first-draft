<script>
  import { contents } from "./stores";

  import { write, ClipboardItem } from "clipboard-polyfill";

  const addTextToClipboard = async (event) => {
    try {
      const text = $contents.html.replace("<p><br></p>", "");
      const item = new ClipboardItem({
        "text/html": new Blob([text], { type: "text/html" }),
      });
      await write([item]);
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

<button class="button" on:click={addTextToClipboard}>Copy for Word / Google Docs</button>
