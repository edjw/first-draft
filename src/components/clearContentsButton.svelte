<script>
  import { contents } from "../components/stores.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const confirmClear = () => {
    if (confirm("Are you sure you want to delete all your text?")) {
      clearContents();
    }
  };

  const clearContents = () => {
    $contents.html = undefined;
    $contents.contents = undefined;
    $contents.plainText = undefined;
    document.querySelector(".ql-editor").innerHTML = "";
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
