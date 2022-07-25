/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../styles/App.css";
import Post from "./Post";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import api from "../api";
function App({ isLogged, url }) {
  // const user = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (!isLogged && url !== "") {
      navigate("/login");
    }
    const GetPosts = async () => {
      setIsLoading(true);
      const config =
        url !== ""
          ? {
              headers: {
                Authorization: `${user.token}`,
                UserID: `${user._id}`,
              },
            }
          : {};
      try {
        const response = await api.get("/posts" + url, config);
        setPosts(response.data.posts);
        setIsLoading(false);
      } catch (err) {
        // Handle error
        setError(err.response.data);
      }
    };
    GetPosts();
  }, []);

  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <div className="loading">
          <svg height="200" width="200">
            <circle
              cx="100"
              cy="100"
              r="80"
              strokeDasharray="50"
              stroke="#4885ED"
              strokeWidth="3"
              fill="none"
            />
          </svg>{" "}
        </div>
      ) : (
        <div className="posts">
          {posts.map((post) => {
            return (
              <Post
                post={post}
                key={uuidv4()}
                user={user}
                setPosts={setPosts}
                url={url}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
