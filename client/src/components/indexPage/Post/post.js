import React, { Component } from "react";

import { format } from "date-fns";
import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({
  title,
  summary,
  cover,
  content,
  createdAt,
  publisher,
  _id,
}) {
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={"/post/" + _id}>
            <img src={`http://localhost:4000/image/${cover}`} alt="img" />
          </Link>
        </div>
        <div className="texts">
          <Link to={"/post/" + _id}>
            <div className="font-bold card-title bg-base-100">
              <h2>{title}</h2>
            </div>
          </Link>
          <p className="infos">
            <a className="author">{publisher.username}</a>
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
  );
}
