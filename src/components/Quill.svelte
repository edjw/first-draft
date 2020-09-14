<script>
  import { onMount } from "svelte";
  import ClearContentsButton from "../components/clearContentsButton.svelte";
  // import ShowExportsButton from "../components/showExportsButton.svelte";
  import CopyForWordGDocsButton from "../components/copyForWordGDocsButton.svelte";
  import CopyAsMarkdownButton from "../components/copyAsMarkdownButton.svelte";

  // import { fly } from "svelte/transition";

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
    ["bold", "italic", "underline", strikethrough, "link"],
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
        clipboard: {
          matchVisual: false,
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
      html: event.detail.html.replace(new RegExp(`<p><br></p>`, "g"), ""),
      contents: event.detail.contents,
      plainText: event.detail.plainText,
    };
  };

  // let exportsShown = false;

  // const toggleExportsShown = (exportsShown) => {
  //   console.log(1);
  //   // exportsShown = !exportsShown;
  // };
</script>

<style>
  :global(div.ql-container) {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
  }

  :global(div.ql-editor) {
    min-height: 300px;
  }

  :global(doc.ql-toolbar button, doc.ql-toolbar button) {
    padding: 5px 5px;
  }

  :global(div.ql-toolbar span.ql-formats > button) {
    min-width: 28px;
    margin: 10px;
  }

  @media only screen and (max-width: 768px) {
    div.editor-wrapper,
    div.button-wrapper {
      width: 96vw;
      margin-left: calc(50% - 48vw);
    }
  }

  :global(div.ql-editor blockquote, div.ql-editor h1, div.ql-editor
      h2, div.ql-editor h3, div.ql-editor h4, div.ql-editor h5, div.ql-editor
      h6, div.ql-editor ol, div.ql-editor p, div.ql-editor pre, div.ql-editor
      ul) {
    margin-top: 1rem;
  }

  :global(.ql-editor.ql-blank::before) {
    margin-top: 1rem;
  }
</style>

<svelte:head>
  <link rel="stylesheet" href="quill.snow.min.css" />
  <meta
    name="description"
    content="First Draft. Write your first draft with no deleting allowed" />
</svelte:head>

<div class="editor-wrapper">
  <div bind:this={editor} on:text-change={updateStore} on:cut={handleCut} />
</div>
<div class="button-wrapper">
  <ClearContentsButton on:allowTyping={allowTyping} />
</div>
<div class="export-buttons">
  <!-- <ShowExportsButton on:click={toggleExportsShown} />
  {exportsShown}
  {#if exportsShown === false} -->
  <!-- <div transition:fly={{ y: 200, duration: 2000 }}> -->
  <div class="button-wrapper">
    <CopyForWordGDocsButton />
  </div>
  <div class="button-wrapper">
    <CopyAsMarkdownButton />
  </div>
  <!-- </div> -->
  <!-- {/if} -->
</div>
