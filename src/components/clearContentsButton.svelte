<script>
  import { contents } from "../components/stores.js";
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();

  const confirmClear = () => {
    if (confirm("Are you sure you want to delete all your text?")) {
      clearContents();
    }
  };

  const clearContents = () => {
    // const startingText = `{"ops":[{"insert":"\n"}]}`;
    $contents.html = undefined;
    $contents.contents = undefined;
    $contents.plainText = undefined;
    document.querySelector(".ql-editor").innerHTML = "";
    // dispatch(allowTyping);
  };
</script>

<style>
  button {
    padding: 0.5rem 3rem;
  }
</style>

<button on:click={confirmClear}>Start again</button>
