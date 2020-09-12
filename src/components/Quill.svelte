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
    ["clean"],
  ];

  export let theme = "snow";

  // Don't change this weird formatting
  const placeholderText = `Start writing…

You can't delete any text you type.

Breeze through your typos. You can clean them up later.
`;

  onMount(async () => {
    const { default: Quill } = await import("quill");

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
        handler: function (range) {
          if (range.length === 0) {
            return true;
          } else if (range.length > 0) {
            return false;
          }
        },
      },
      enter: {
        key: "Enter",
        handler: function (range) {
          if (range.length === 0) {
            return true;
          } else if (range.length > 0) {
            return false;
          }
        },
      },
      arrowLeft: {
        key: 37,
        handler: function (range) {
          if (range.length === 0) {
            return true;
          } else if (range.length > 0) {
            quill.setSelection(range.index, 0);
          }
        },
      },
      arrowUp: {
        key: 38,
        handler: function (range) {
          if (range.length === 0) {
            return true;
          } else if (range.length > 0) {
            quill.setSelection(range.index, 0);
          }
        },
      },
      arrowRight: {
        key: 39,
        handler: function (range) {
          if (range.length === 0) {
            return true;
          } else if (range.length > 0) {
            quill.setSelection(range.index + range.length, 0);
          }
        },
      },
      arrowDown: {
        key: 40,
        handler: function (range) {
          if (range.length === 0) {
            return true;
          } else if (range.length > 0) {
            quill.setSelection(range.index + range.length, 0);
          }
        },
      },
    };

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

    quill.on("selection-change", function (range) {
      if (range && range.length > 0) {
        container.addEventListener("keydown", preventTypingWhileSelected);
      } else if (!range) {
        container.removeEventListener("keydown", preventTypingWhileSelected);
      } else if (range && range.length == 0) {
        container.removeEventListener("keydown", preventTypingWhileSelected);
      }
    });

    // End of on mount
  });

  const preventTypingWhileSelected = (event) => {
    const allowedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
    const ctrlAllowedKeys = ["c", "r", "e", "l"];
    if (allowedKeys.includes(event.key)) {
      return true;
    } else if (event.ctrlKey && ctrlAllowedKeys.includes(event.key)) {
      return true;
    } else {
      event.preventDefault();
    }
  };

  const allowTyping = () => {
    document
      .querySelector("div.ql-editor")
      .removeEventListener("keydown", preventTypingWhileSelected);
  };

  const handleCut = (event) => {
    event.preventDefault();
  };

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
  <div bind:this={editor} on:text-change={updateStore} on:cut={handleCut} />
</div>
<div>
  <ClearContentsButton on:allowTyping={allowTyping} />
</div>
