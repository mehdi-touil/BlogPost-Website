import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Form from "./components/Form";
import Header from "./components/Header";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import { useState } from "react";
import PostPage from "./components/PostPage";

const Router = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogged, setIsLogged] = useState(user || false);
  const [User, setUser] = useState(user || null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header isLogged={isLogged} />}>
          <Route index element={<Home isLogged={isLogged} url={""} />} />
          <Route path="newpost" element={<Form User={User} action={"add"} />} />
          <Route
            path="/posts/:postId"
            element={<PostPage User={User} isLogged={isLogged} />}
          />
          <Route
            path="/posts/:postId/update"
            element={<Form User={User} action={"update"} />}
          />

          <Route
            path="login"
            element={<Login setIsLogged={setIsLogged} setUser={setUser} />}
          />
          <Route
            path="signup"
            element={<Signup setIsLogged={setIsLogged} setUser={setUser} />}
          />
          <Route
            path="logout"
            element={<Logout setIsLogged={setIsLogged} setUser={setUser} />}
          />
          <Route
            path="myposts"
            element={
              <Home
                isLogged={isLogged}
                url={User ? "/author/" + User._id : ""}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
