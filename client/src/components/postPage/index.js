import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
export default function PostPages() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((rsp) => {
      rsp.json().then((postInf) => {
        setPostInfo(postInf);
      });
    });
  }, []);
  return (
    <>
      <h1>Hi</h1>
    </>
  );
}
