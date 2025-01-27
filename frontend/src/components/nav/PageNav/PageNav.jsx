import React from "react";
import "./PageNav.css";

function PageNav({ activeView, setActiveView }) {
  return (
    <nav className="pagenav">
      <ul>
        <li
          className={activeView === "home" ? "active" : ""}
          onClick={() => setActiveView("home")}
        >
          Home
        </li>
        <li
          className={activeView === "profile" ? "active" : ""}
          onClick={() => setActiveView("profile")}
        >
          Profile
        </li>
        <li
          className={activeView === "demands" ? "active" : ""}
          onClick={() => setActiveView("demands")}
        >
          Demands
        </li>
        <li
          className={activeView === "match" ? "active" : ""}
          onClick={() => setActiveView("match")}
        >
          Match
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
