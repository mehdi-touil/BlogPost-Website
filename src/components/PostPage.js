import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { v4 as uuidv4 } from "uuid";

const PostItem = ({ content, author, timestamp }) => {
  return (
    <div className="commentitem" key={uuidv4()}>
      <div className="commenticon">
        <i className="fa-solid fa-comment fa-xl"></i>
      </div>
      <div className="commentbody">
        <span>{content}</span>
        <span>
          {author ? "Written By " + author + " On  " + timestamp : ""}
        </span>
      </div>
    </div>
  );
};

const PostPage = ({ User, isLogged }) => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `${User?.token}`,
    },
  };
  let navigate = useNavigate();
  const { postId } = useParams();
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      // make api post request
      const data = {
        author: User._id,
        content: comment,
      };

      const response = await api.post(
        "/posts/" + postId + "/comments",
        data,
        config
      );
      setComments((prevState) => [...prevState, response.data]);
      navigate("/posts/" + postId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getPost = async (id) => {
      try {
        setIsLoading(true);
        const response = await api.get("/posts/" + id, config);
        response.data.content = parse(response.data.content);
        setPost(response.data);
        setComments(response.data.comments);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPost(postId);
  }, []);
  return (
    <div className="wrapper">
      <div className="posttitle">
        <span>{post.title}</span>
      </div>
      <div className="postcontent">{post.content}</div>
      <div className="postcontent p2">Written By {post?.author?.fullname} </div>
      <div className="posttitle">
        <span>Comments</span>
      </div>{" "}
      {comments.length == 0 ? (
        <PostItem key={uuidv4()} content={"No comment"} />
      ) : (
        ""
      )}
      {comments?.map((comment) => {
        return (
          <PostItem
            key={uuidv4()}
            content={comment?.content}
            author={comment?.author?.fullname}
            timestamp={comment?.timestamp}
          />
        );
      })}
      {isLogged && (
        <div className="newcomment">
          <form onSubmit={handleComment} className="formcomment">
            <section>
              <label htmlFor="comment">Comment</label>
              <input
                type="text"
                id="comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </section>
            <button type="submit">Add Comment</button>
          </form>
        </div>
      )}
      <div className="postcontent p2">End </div>
    </div>
  );
};

export default PostPage;
