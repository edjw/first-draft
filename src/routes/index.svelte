<script>
  import Quill from "../components/Quill.svelte";

  import { contents } from "../components/stores.js";

  import ClearContentsButton from "../components/clearContentsButton.svelte";
</script>

<svelte:head>
  <title>First Draft – Home</title>
  <meta
    name="description"
    content="First Draft. Write your first draft with no deleting allowed" />
</svelte:head>

<Quill />
<div>{$contents.datetime}</div>
<div>{$contents.html}</div>
<div>{$contents.contents}</div>
<div>{$contents.plainText}</div>
<ClearContentsButton />
