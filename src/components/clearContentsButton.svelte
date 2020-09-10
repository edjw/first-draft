<script>
  import { contents } from "../components/stores.js";
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();

  const clearContents = () => {
    // const startingText = `{"ops":[{"insert":"\n"}]}`;
    $contents.html = undefined;
    $contents.contents = undefined;
    $contents.plainText = undefined;
    document.querySelector(".ql-editor").innerHTML = "";
    // dispatch(allowTyping);
  };
</script>

<button on:click={clearContents}>Start again</button>
