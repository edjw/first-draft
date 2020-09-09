<script>
  import { contents } from "../components/stores.js";

  const clearContents = () => {
    // const startingText = `{"ops":[{"insert":"\n"}]}`;
    $contents.html = undefined;
    $contents.contents = undefined;
    $contents.plainText = undefined;
    document.querySelector(".ql-editor").innerHTML = "";
  };
</script>

<button on:click={clearContents}>Start again</button>
