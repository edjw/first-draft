<script>
  import { onMount } from "svelte";
  import ClearContentsButton from "../components/clearContentsButton.svelte";

  import { contents } from "./stores";

  let editor;

  export let strikethroughAllowed = false;

  let strikethrough;

  if (strikethroughAllowed) {
    strikethrough = "strike";
  } else if (!strikethroughAllowed) {
    strikethrough = undefined;
  }

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }],
    [
      "bold",
      "italic",
      "underline",
      strikethrough,
      "blockquote",
      "code-block",
      "link",
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, "clean"],
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
            tab: {
              key: 9,
              handler: function () {},
            },
          },
        },
      },

      theme: "snow",
      placeholder: "Start writing…",
    });

    quill.setContents($contents.contents);

    const container = editor.querySelector(".ql-editor");

    quill.on("text-change", function (delta, oldDelta, source) {
      editor.dispatchEvent(
        new CustomEvent("text-change", {
          detail: {
            html: container.innerHTML,
            contents: quill.getContents(),
            plainText: quill.getText(),
          },
        })
      );
    });

    quill.on("selection-change", function (range, oldRange, source) {
      if (range && range.length > 0) {
        container.addEventListener("keydown", preventTyping);
      } else if (!range) {
        container.removeEventListener("keydown", preventTyping);
      } else if (range && range.length == 0) {
        container.removeEventListener("keydown", preventTyping);
      }
    });

    const preventTyping = (event) => {
      const allowedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

      // All this to get around some weird bug with removing selection with arrow keys
      const { index, length } = quill.getSelection();
      const rangeEnd = index + length;

      if (allowedKeys.includes(event.key) && !event.shiftKey) {
        event.preventDefault();

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          quill.setSelection(index, 0);
        } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          quill.setSelection(rangeEnd, 0);
        }
      } else if (!allowedKeys.includes(event.key)) {
        // prevent typing if it's not an arrow key
        event.preventDefault();
      }
    };
  });

  // End of on mount

  const updateStore = (event) => {
    // $contents.datetime = new Date().getTime();
    // $contents.html = event.detail.html;
    // $contents.contents = event.detail.contents;
    // $contents.plainText = event.detail.plainText;

    $contents = {
      datetime: new Date().getTime(),
      html: event.detail.html,
      contents: event.detail.contents,
      plainText: event.detail.plainText,
    };
  };
  // const logger = () => {
  //   console.log(1);
  // };
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
  <div bind:this={editor} on:cut|preventDefault on:text-change={updateStore} />
</div>
<div>
  <ClearContentsButton />
  <!-- <ClearContentsButton on:allowTyping={logger} /> -->
</div>
