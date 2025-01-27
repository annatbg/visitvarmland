import React, { useEffect, useState } from "react";
import useUser from "../store/useUser";

const ProfileUser = () => {
  const [userData, setUserData] = useState(null);
  const user = useUser((state) => state.user);

  useEffect(() => {
    const apiUrl =
      "https://4zhdfvr7u4.execute-api.eu-north-1.amazonaws.com/user/fetch";

    const postData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Posted data response:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    postData();
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
