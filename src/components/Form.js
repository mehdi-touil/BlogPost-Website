import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Form.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
const Form = ({ User, action }) => {
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(0);
  const config = {
    headers: {
      Authorization: `${User.token}`,
    },
  };
  let { postId } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // make axios post request
      const post = { title, content, author: User._id, status };
      if (action === "add") {
        await api.post("/posts", post, config);
      } else {
        await api.put("/posts/" + postId, post, config);
      }
      navigate("/myposts");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function getPost(id) {
      if (action === "update") {
        const response = await api.get("/posts/" + id, config);
        setContent(response.data.content);
        setTitle(response.data.title);
        setStatus(response.data.status);
      }
    }
    getPost(postId);
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <h1>{action} Blog Post</h1>
      <section>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          required
        />
      </section>
      <section>
        <label htmlFor="content">Content</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </section>
      <section>
        <label htmlFor="status">Publish ?</label>
        <input
          type="checkbox"
          id="status"
          checked={status === "1" ? true : false}
          onChange={(e) => {
            setStatus(e.target.checked ? "1" : "0");
          }}
        />
      </section>
      <section>
        <button type="submit">Submit</button>
        <a href="/myposts">Cancel</a>
      </section>
    </form>
  );
};

export default Form;
