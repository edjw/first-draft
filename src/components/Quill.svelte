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

  let toolbarOptions = [
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

  export let theme = "snow";

  // Don't change this weird formatting
  const placeholderText = `Start writing…

You can't delete any text you type.

Breeze through your typos. You can clean them up later.
`;

  const keyBindings = {
    handleDelete: {
      key: "Delete",
      handler: function () {},
    },
    handleShiftDelete: {
      key: "Delete",
      shiftKey: true,
      handler: function () {},
    },
    handleBackspace: {
      key: "Backspace",
      handler: function () {},
    },
    handlesShiftBackspace: {
      key: "Backspace",
      shiftKey: true,
      handler: function () {},
    },
    handlesSuperBackspace: {
      key: "Backspace",
      shortKey: true,
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
    enter: {
      key: "Enter",
      handler: function (range) {
        if (range.length === 0) {
          // If nothing is selected, enter works as normal
          return true;
        } else if (range.length > 0) {
          // If any characters are selected, enter is disabled
          return false;
        }
      },
    },
    // Handle arrow buttons when text is selected here
  };

  onMount(async () => {
    const { default: Quill } = await import("quill");

    let quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
        keyboard: {
          bindings: keyBindings,
        },
      },
      theme: theme,
      placeholder: placeholderText,
    });

    quill.setContents($contents.contents);
    quill.focus();

    const container = editor.querySelector(".ql-editor");

    quill.on("text-change", function () {
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

    // If text is selected an an arrow key is pressed, move the cursor to where you expect instead of onto a new line. Bug in Quill maybe?

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

      // All this to get around some weird bug with removing selection with arrow keys moving the cursor to a new line
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
        // prevent all typing if it's not an arrow key
        event.preventDefault();
      }
    };
  });

  // End of on mount

  const updateStore = (event) => {
    $contents = {
      datetime: new Date().getTime(),
      html: event.detail.html,
      contents: event.detail.contents,
      plainText: event.detail.plainText,
    };
  };
</script>

<style>
</style>

<svelte:head>
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
</div>
