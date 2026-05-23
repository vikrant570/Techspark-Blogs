import React, { useCallback, useRef, useState, useEffect} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import axios from "axios";
import { createLowlight } from "lowlight";
import { common } from "lowlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import ResizeImage from "tiptap-extension-resize-image";


// List style and line spacing options
const unorderedStyles = [
  { label: "Disc", value: "disc" },
  { label: "Circle", value: "circle" },
  { label: "Square", value: "square" },
];
const orderedStyles = [
  { label: "Decimal", value: "decimal" },
  { label: "Lower Alpha", value: "lower-alpha" },
  { label: "Upper Alpha", value: "upper-alpha" },
];
const lineSpacings = [
  { label: "1", value: "1" },
  { label: "1.5", value: "1.5" },
  { label: "2", value: "2" },
];

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaHeading,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaImage,
  FaTable,
  FaCode,
  FaYoutube,
  FaEraser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { IoMdUndo, IoMdRedo } from "react-icons/io";
import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../Context";

// Cloudinary config (replace these in production)
const CLOUDINARY_UPLOAD_PRESET = "blogspot_app";
const CLOUDINARY_CLOUD_NAME = "dut8fdtro";

const fontFamilies = [
  "Arial",
  "Georgia",
  "Impact",
  "Tahoma",
  "Times New Roman",
  "Verdana",
  "Courier New",
  "Comic Sans MS",
];
const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
];
const colors = [
  "#000000",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

const CreatePost = () => {
  const [showCode, setShowCode] = useState(false);
  const fileInputRef = useRef();
  const [content, setContent] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const linkRef = useRef(null);
  const [listType, setListType] = useState("disc");
  const [listKind, setListKind] = useState(""); // "ul" or "ol"
  const [lineSpacing, setLineSpacing] = useState("1.5");
  const [showPalette, setShowPalette] = useState(false);

  const {user} = useAppContext();

  //Function To Prevent User From exiting without saving.
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Required for some browsers
      
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  

  StarterKit.configure({
    listItem: {
      HTMLAttributes: {
        class: "list-item-no-paragraph",
      },
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
      ResizeImage,
      Placeholder.configure({ placeholder: "Write your post..." }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        defaultLanguage: "javascript",
      }),
      Youtube.configure({ width: 640, height: 360 }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] w-full p-4 border border-gray-300 rounded bg-white focus:outline-none text-base sm:text-lg resize-y",
      }
    },
    onUpdate: ({ editor }) => {
      // Update state with HTML content whenever the editor changes
      setContent(editor.getHTML());
    },
  });

  const currentStyles = listKind === "ol" ? orderedStyles : unorderedStyles;

  const addImage = useCallback(
    async (file) => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append(
        "public_id",
        `blogspot/${user.username}/${user._id}/posts/post-${user.totalPosts}/image-${Math.floor(
          (Math.random() + 1) * 9000
        )}`
      );
      const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
      console.log(`blogspot/${user.username}/${user._id}/posts/post-${user.totalPosts+1}/image-${Math.floor(
          (Math.random() + 1) * 9000
        )}`);
      try {
        const res = await axios.post(url, formData);
        if (res.data.secure_url) {
          console.log("URL Set : ", res.data.secure_url);
          editor.chain().focus().setImage({ src: res.data.secure_url }).run();
        }
      } catch (err) {
        alert("Image upload failed.");
      }
    },
    [editor]
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    addImage(file);
    e.target.value = null;
  };

  const handleImageButton = () => {
    fileInputRef.current.click();
  };

  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState("");
  const [subject, setSubject] = useState("");

  const handlePublish = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("body", content.toString());
    const post = Object.fromEntries(formData);
    console.log(post)
  };

  if (!editor) {
    return <div className="w-full text-center py-10">Loading editor...</div>;
  }

  return (
    <>
      <div className="w-full mt-0 flex flex-row justify-between p-3 bg-gray-100">
        <h1 className="font-lobster text-highlight text-5xl">Tech Spark</h1>
        <i className="fa-duotone fa-regular fa-user m-2 text-white bg-slate-900 rounded-full p-3"></i>
      </div>
      <form onSubmit={handlePublish}>
        <div
          id="createPost-header"
          className="w-full p-4 flex flex-row justify-between"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-2/5 outline-none border border-b-orange-400 p-2"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-2/5 outline-none border border-b-orange-400 p-2"
          />
          <label
            htmlFor="banner"
            className="border border-b-orange-400 p-2 cursor-pointer hover:bg-gray-100 hover:border-none ease-in-out duration-150"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="banner"
            name="banner"
            accept="image/*"
            className="hidden"
            // onClick={uploadBanner}
          />
          <button className="main-button" type="submit">
            <i className="fa-solid fa-paper-plane text-white"></i> Publish
          </button>
        </div>
      </form>

      <div className="w-full max-w-8xl mx-auto p-4 bg-gray-100 rounded shadow-md shadow-black/20 tip-tap">
        {showDialog && (
          <dialog
            className="w-1/3 absolute z-40 bg-gray-100 p-4 rounded-sm shadow-black/30 shadow-lg m-auto top-1/2"
            open
          >
            <input
              type="text"
              name="embedded-link"
              placeholder="Paste your link here"
              className="px-3 py-1 w-full rounded-md border border-gray-300 outline-none"
              ref={linkRef}
            />
            <button
              className="bg-gray-200 rounded-sm shadow-sm shadow-black/20 px-3 mt-5 py-1 hover:bg-gray-300 hover:text-slate-800 ease-in-out duration-150"
              onClick={() => {
                setShowDialog(false);
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: linkRef.current.value })
                  .run();
              }}
            >
              Embed
            </button>
          </dialog>
        )}

        {/* Toolbar */}
        <div className="relative flex flex-wrap gap-2 bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 top-0 z-10">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md hover:bg-gray-100 transition ${
              editor.isActive("bold") ? "bg-blue-100 text-blue-600" : ""
            }`}
            title="Bold"
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md hover:bg-gray-100 transition ${
              editor.isActive("italic") ? "bg-blue-100 text-blue-600" : ""
            }`}
            title="Italic"
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-md hover:bg-gray-100 transition ${
              editor.isActive("underline") ? "bg-blue-100 text-blue-600" : ""
            }`}
            title="Underline"
          >
            <FaUnderline />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded-md hover:bg-gray-100 transition ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-100 text-blue-600"
                : ""
            }`}
            title="H1"
          >
            <FaHeading />1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded-md hover:bg-gray-100 transition ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-100 text-blue-600"
                : ""
            }`}
            title="H2"
          >
            <FaHeading />2
          </button>

          {/* Font Dropdown */}
          <select
            value={editor.getAttributes("fontFamily").fontFamily || ""}
            onChange={(e) =>
              editor.chain().focus().setFontFamily(e.target.value).run()
            }
            className="text-sm border rounded px-2 py-1 bg-white shadow-sm hover:bg-gray-50"
          >
            <option value="">Font</option>
            {fontFamilies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {/* Font Size Dropdown */}
          <select
            value={editor.getAttributes("fontSize").fontSize || ""}
            onChange={(e) =>
              editor.chain().focus().setFontSize(e.target.value).run()
            }
            className="text-sm border rounded px-2 py-1 bg-white shadow-sm hover:bg-gray-50"
          >
            <option value="">Size</option>
            {fontSizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Text Align Buttons */}
          {[
            ["left", FaAlignLeft],
            ["center", FaAlignCenter],
            ["right", FaAlignRight],
            ["justify", FaAlignJustify],
          ].map(([align, Icon]) => (
            <button
              key={align}
              onClick={() => editor.chain().focus().setTextAlign(align).run()}
              className={`p-2 rounded-md hover:bg-gray-100 transition ${
                editor.isActive("paragraph", { textAlign: align })
                  ? "bg-blue-100 text-blue-600"
                  : ""
              }`}
              title={`Align ${align}`}
            >
              <Icon />
            </button>
          ))}

          {/* Lists, Code, Table */}
          <button
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
              setListKind("ul");
            }}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Bullet List"
          >
            <FaListUl />
          </button>

          <button
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
              setListKind("ol");
            }}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Numbered List"
          >
            <FaListOl />
          </button>
          <button
            onClick={() => setShowDialog(true)}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Embed Link"
          >
            <FaCode />
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            className="p-2 rounded-md hover:bg-gray-100"
            title="Insert Table"
          >
            <FaTable />
          </button>

          {/* Image Upload */}
          <button
            onClick={handleImageButton}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Insert Image"
          >
            <FaImage />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          {/* YouTube Embed */}
          <button
            onClick={() => {
              const url = prompt("YouTube URL");
              if (url)
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Embed YouTube"
          >
            <FaYoutube />
          </button>

          {/* Color Picker */}
          {/* Color Palette Button */}
          <button
            onClick={() => setShowPalette((v) => !v)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            title="Font Color"
          >
            {/* you can swap in any icon here */}
            <i className="fa-solid fa-palette text-black"></i>
          </button>

          {showPalette && (
            <div
              className="absolute top-full right-1/3 bg-white p-2 border rounded shadow-lg z-20 grid grid-cols-5 gap-1"
              onMouseLeave={() => setShowPalette(false)}
            >
              {colors.map((c) => (
                <button
                  key={c}
                  style={{ backgroundColor: c }}
                  className="w-6 h-6 rounded-sm hover:scale-110 transition-transform"
                  onClick={() => {
                    editor.chain().focus().setColor(c).run();
                    setShowPalette(false);
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Remove Color"
          >
            <FaEraser />
          </button>

          {/* View HTML / Undo / Redo */}
          <button
            onClick={() => setShowCode((prev) => !prev)}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Toggle HTML"
          >
            {showCode ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Undo"
          >
            <IoMdUndo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded-md hover:bg-gray-100"
            title="Redo"
          >
            <IoMdRedo />
          </button>

          {/* List Style Dropdown */}
          <select
            value={listType}
            onChange={(e) => {
              setListType(e.target.value);
              // immediately apply it in the editor
              if (listKind === "ol") {
                editor
                  .chain()
                  .focus()
                  .setOrderedList({ order: e.target.value })
                  .run();
              } else {
                editor
                  .chain()
                  .focus()
                  .setBulletList({ kind: e.target.value })
                  .run();
              }
            }}
            className="text-sm border rounded px-2 py-1 bg-white shadow-sm hover:bg-gray-50"
            title="List Style"
          >
            {currentStyles.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>

          {/* Line Spacing Dropdown */}
          <select
            value={lineSpacing}
            onChange={(e) => {
              setLineSpacing(e.target.value);
              const editorContent = document.querySelector(".tiptap-editable");
              if (editorContent) {
                editorContent.style.lineHeight = e.target.value;
              }
            }}
            className="text-sm border rounded px-2 py-1 bg-white shadow-sm hover:bg-gray-50"
            title="Line Spacing"
          >
            {lineSpacings.map((spacing) => (
              <option key={spacing.value} value={spacing.value}>
                {spacing.label}
              </option>
            ))}
          </select>
        </div>
        {/* Editor Content */}
        <div className="border border-gray-300 mt-4 p-0 rounded-lg bg-gray-50 shadow-sm min-h-[450px] h-[450px] overflow-y-auto overflow-x-hidden w-full box-border">
          {showCode ? (
            <textarea
              className="w-full h-full min-h-[300px] font-mono p-0 bg-gray-100 rounded resize-y border-none focus:outline-none text-sm box-border"
              value={editor.getHTML()}
              readOnly
            />
          ) : (
            <EditorContent
              editor={editor}
              className={`tiptap-editable ${listType} ${listKind} ${
                listKind === "ol" ? "list-decimal" : "list-disc"
              } h-full min-h-full w-full overflow-y-auto overflow-x-hidden border-0 text-left px-4 py-2 bg-white box-border ${listType}`}
              style={{
                lineHeight: lineSpacing,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                height: "100%",
                minHeight: "100%",
                boxSizing: "border-box",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePost;