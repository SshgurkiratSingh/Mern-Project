import { useEffect, useState } from "react";
import Post from "./Post/post";

export default function IndexPage() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/postlist").then((response) => {
      response.json().then((posts) => {
        setPost(posts);
      });
    });
  }, []);
  return <>{posts.length > 0 && posts.map((posts) => <Post {...posts} />)}</>;
}
