import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
export default function CreatePost() {
  const [title, setTitle] = useState("");

  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    console.log(data);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
      console.log(redirect, response.ok);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <form className="p-4 m-2 space-y-[4px]" onSubmit={createNewPost}>
        <center>
          <h1 className="animate-pulse text-lg">Create A Post</h1>
          <input
            value={title}
            required={true}
            type="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Title"}
            className="input input-bordered input-accent w-full max-w-l space-y-1"
          />
          <input
            type="summary"
            required={true}
            style={{ marginTop: "5px" }}
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="input input-bordered input-info w-full space-y-5"
          />

          <input
            style={{ marginTop: "5px" }}
            type="file"
            required={true}
            onChange={(e) => setFiles(e.target.files)}
            className="file-input w-full max-w-xs "
          />
          <br />
          <ReactQuill
            value={content}
            onChange={(e) => setContent(e)}
            modules={modules}
            required={true}
            format={formats}
          />
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Create Post
          </button>
        </center>
      </form>
    </>
  );
}
