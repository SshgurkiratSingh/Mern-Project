import "./index.css";

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./editor.js";
export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((res) => {
      res.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch("http://localhost:4000/postup", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  return (
    <>
      <form className="p-4 m-2 space-y-[4px]" onSubmit={updatePost}>
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
            onChange={(e) => setFiles(e.target.files)}
            className="file-input w-full max-w-xs "
            disabled={true}
          />
          <br />
          <Editor onChange={setContent} value={content} />
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Update Post
          </button>
        </center>
      </form>
    </>
  );
}
