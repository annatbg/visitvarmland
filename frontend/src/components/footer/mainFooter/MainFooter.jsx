import React from "react";
import "./MainFooter.css";

const MainFooter = () => {
  return (
    <footer className="mainFooter">
      <div className="mainFooter-content">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <ul className="mainFooter-links">
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default MainFooter;
