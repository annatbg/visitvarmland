import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/header/mainHeader/MainHeader";
import PageNav from "../components/nav/PageNav/PageNav";
import MainFooter from "../components/footer/mainFooter/MainFooter";
import useUser from "../store/useUser";
import HomeUser from "../views/homeUser";
import ProfileUser from "../views/profileUser";
import SettingsUser from "../views/settingsUser";
import "./styles/UserPage.css";

function User() {
  const user = useUser((state) => state.user);
  const logout = useUser((state) => state.logout);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("home");

  const handleLogout = () => {
    logout();
    navigate("/");
    console.log("Logged out");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomeUser />;
      case "profile":
        return <ProfileUser />;
      case "settings":
        return <SettingsUser />;
      default:
        return <HomeUser />;
    }
  };

  return (
    <>
      {user && (
        <div className="userPage">
          <MainHeader />
          <div className="contentPage">
            <div className="contentPage__user">
              <h2>Welcome {user}</h2>
              <button
                onClick={handleLogout}
                className="contentPage__user-logoutBTN"
              >
                Logout
              </button>
            </div>
            <PageNav setActiveView={setActiveView} activeView={activeView} />
            {renderView()}
          </div>
          <MainFooter />
        </div>
      )}
    </>
  );
}

export default User;
