import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./index.css";
export default function PostPages() {
  const [postInfo, setPostInfo] = useState(null);
  const { userINFO } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((rsp) => {
      rsp.json().then((postInf) => {
        setPostInfo(postInf);
      });
    });
  }, []);
  if (!postInfo) return "";
  console.log(postInfo);
  const img = `http://localhost:4000/image/${postInfo.cover}`;
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <div className="hero-overlay  bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl text-white font-bold">
              {postInfo.title}
            </h1>
            <div className="infos">
              <div className="text-slate-500	">
                By @{postInfo.publisher.username}
              </div>
              {userINFO.id === postInfo.publisher._id && (
                <div className="edit-row">
                  <Link
                    to={`/edit/${postInfo._id}`}
                    className="btn-link	btn-outline	 btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit Post
                  </Link>
                </div>
              )}
              <div className="date text-red-300	">
                Published on {formatISO9075(new Date(postInfo.createdAt))}
              </div>
            </div>
            <p className="mb-5">{postInfo.summary}</p>
          </div>
        </div>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </>
  );
}
