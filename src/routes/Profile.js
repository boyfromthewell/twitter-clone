import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import React from "react";

function Profile() {
  const history = useHistory();
  const onLogOutClick = () => authService.signOut();
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
}

export default Profile;
