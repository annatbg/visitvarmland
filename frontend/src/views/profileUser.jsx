import React, { useEffect, useState } from "react";
import useUser from "../store/useUser";
import { fetchUserData } from "../hooks/api/userApi";
const API_URL = import.meta.env.VITE_API_URL;

const ProfileUser = () => {
  const [userData, setUserData] = useState(null);
  const user = useUser((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(user, API_URL + "/user/fetch");
        console.log("Fetched user data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data in ProfileUser:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="profileView">
      <h1>ProfileView</h1>
      {userData ? (
        <div>
          <p>Email: {userData.user.email}</p>
          <p>First Name: {userData.user.firstName}</p>
          <p>Last Name: {userData.user.lastName}</p>
          <p>Organisation: {userData.user.organisation}</p>
          <p>Role: {userData.user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileUser;
