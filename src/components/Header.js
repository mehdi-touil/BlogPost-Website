import React from "react";
import { Outlet } from "react-router-dom";
import * as Images from "../images/icons";
const Header = ({ isLogged }) => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <a href="/">
            <img src={Images.logo} alt="logo"></img>
          </a>
        </div>
        {isLogged ? (
          <section>
            <a className="headeritem" href="/newpost">
              Create Post
            </a>
            <a className="headeritem" href="/myposts">
              My Posts
            </a>
            <a className="headeritem" href="/logout">
              Logout
            </a>
          </section>
        ) : (
          <section>
            <a className="headeritem" href="/signup">
              Sign Up
            </a>
            <a className="headeritem" href="/login">
              Log in
            </a>
          </section>
        )}
      </div>
      <Outlet />
      <footer>
        <span>&copy; Copyright 2022, Mehdi Touil </span>
      </footer>
    </div>
  );
};

export default Header;
