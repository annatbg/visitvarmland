import React, { useEffect, useState } from "react";
import useUser from "../../store/useUser";
const API_URL = import.meta.env.VITE_API_URL;

const ProfileView = () => {
  const user = useUser((state) => state.user);

  return (
    <div className="profileView">
      <h1>ProfileView</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Organisation: {user.organisation}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
};

export default ProfileView;
