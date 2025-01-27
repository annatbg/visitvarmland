import React from "react";
import { Link } from "react-router-dom";
import "./TopNav.css";
import useUser from "../../../store/useUser";

const TopNav = () => {
  const user = useUser((state) => state.user);
  const logout = useUser((state) => state.logout);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logged out");
  };

  return (
    <nav className="topNav">
      <ul className="nav-list">
        <li className="nav-item">{user}</li>
        <li className="nav-item">
          <button
            onClick={handleLogout}
            className="contentPage__user-logoutBTN"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
