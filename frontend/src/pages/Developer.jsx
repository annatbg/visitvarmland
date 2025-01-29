import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/header/mainHeader/MainHeader";
import MainFooter from "../components/footer/mainFooter/MainFooter";
import useUser from "../store/useUser";
import "./styles/DeveloperPage.css";
import "./styles/Page.css";

function Admin() {
  const user = useUser((state) => state.user);
  const role = useUser((state) => state.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (role !== "developer") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <div className="page developerPage">
          <MainHeader />
          <div className="developerPage-content">
            <h1>Developer-page</h1>
          </div>
          <MainFooter />
        </div>
      )}
    </>
  );
}

export default Admin;
