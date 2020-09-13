<script>
  import Quill from "../components/Quill.svelte";

  import { contents } from "../components/stores.js";
</script>

<svelte:head>
  <title>First Draft – Home</title>
  <meta
    name="description"
    content="First Draft. Write your first draft with no deleting allowed" />
</svelte:head>

<Quill />
<!-- <div>all contents: {$contents}</div>
<div>datetime: {$contents.datetime}</div>-->
<!-- <div>html: {$contents.html}</div> -->
<!-- <div>contents: {$contents.contents}</div>
<div>plain text: {$contents.plainText}</div>-->
