<script>
  import { onMount } from "svelte";

  let editor;

  export let toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["blockquote", "link"],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["clean"], // Remove formatting
  ];

  onMount(async () => {
    const { default: Quill } = await import("quill");

    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
        keyboard: {
          bindings: {
            handleDelete: {
              key: "Delete",
              handler: function () {},
            },
            handleBackspace: {
              key: "Backspace",
              handler: function () {},
            },
            handleUndo: {
              key: "Z",
              shortKey: true,
              handler: function () {},
            },
          },
        },
      },

      theme: "snow",
      placeholder: "Write your story...",
    });

    const container = editor.querySelector(".ql-editor");

    quill.on("text-change", function (delta, oldDelta, source) {
      editor.dispatchEvent(
        new CustomEvent("text-change", {
          detail: {
            html: container.innerHTML,
            text: quill.getText(),
          },
        })
      );
    });
  });

  const disableCut = (event) => {
    event.preventDefault();
  };

  let contents;

  const logThat = (event) => {
    contents = event.detail.html;
    // console.log(contents);
  };
</script>

<style>
</style>

<svelte:head>
  <title>First Draft – Home</title>
  <link rel="stylesheet" href="quill.snow.css" />
  <meta
    name="description"
    content="First Draft. Write your first draft with no deleting allowed" />
</svelte:head>

<div class="editor-wrapper">
  <div bind:this={editor} on:cut={disableCut} on:text-change={logThat} />
</div>
