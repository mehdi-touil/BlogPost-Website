import React from "react";
import parse from "html-react-parser";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Post = ({ post, user, setPosts, url }) => {
  let navigate = useNavigate();
  const deletePost = async (id) => {
    const config = {
      headers: {
        Authorization: `${user.token}`,
      },
    };
    try {
      // make api post request
      await api.delete("/posts/" + id, config);
      setPosts((prevPosts) => prevPosts.filter((x) => x._id !== id));
      navigate("/myposts");
    } catch (error) {
      console.log(error);
    }
  };
  const showeditPost = (id) => {
    navigate("/posts/" + id + "/update");
  };
  return (
    <div className="postitem">
      <div className="author-row">
        <div className="timestamp">
          {format(Date.parse(post.updatedAt), "yyyy-MM-dd hh:mm")}
        </div>
        <div className="author">
          By: {post.author._id === user?._id ? "Me" : post.author.fullname}
        </div>
      </div>
      <div className="title">{post.title}</div>
      <div className="description">
        {parse(post.content.substring(0, 100) + ".....")}
      </div>
      <div>
        <a href={"/posts/" + post._id}>
          <span>Read More</span>
          <div>
            <i className="fa-solid fa-arrow-right fa-2xl"></i>
          </div>
        </a>
        {url === "" ? (
          ""
        ) : (
          <div>
            {" "}
            <div
              id={post._id}
              onClick={(e) => {
                deletePost(e.target.id);
              }}
            >
              <i id={post._id} className="fa-solid fa-trash fa-lg"></i>
            </div>
            <div
              id={post._id}
              onClick={(e) => {
                showeditPost(e.target.id);
              }}
            >
              <i id={post._id} className="fa-solid fa-pen-to-square fa-lg"></i>
            </div>
            <div
              className="published"
              style={{
                backgroundColor: post.status === "1" ? "#17ee17ba" : "#ee7979",
              }}
            >
              {post.status === "1" ? "published" : "unpublished"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
