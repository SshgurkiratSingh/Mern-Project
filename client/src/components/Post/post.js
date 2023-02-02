import React, { Component } from "react";
import "./Post.css";

class Post extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="post">
          <div className="image">
            <img
              src="https://images.moneycontrol.com/static-mcnews/2021/08/Microsoft_reuters-770x433.jpg?impolicy=website&width=770&height=431"
              alt=""
            />
          </div>
          <div className="texts">
            <div className="font-bold card-title bg-base-100">
              <h2>Microsoft rolls out ChatGPT-powered Teams Premium</h2>
            </div>
            <p className="infos">
              <a className="author">Gurkirat</a>
              <time>2023-02-02</time>
            </p>
            <p className="summary">
              The premium service will cost $7 per month in June before
              increasing to $10 in July, Microsoft said.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
