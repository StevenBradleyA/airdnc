import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";

function LogOutButton({ user, name, openMenu, setOpenMenu }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/`);
    setOpenMenu(false);
  };

  const handleCreateClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
    history.push("/spots/new");
  };

  return (
    <>
      {user && (
        <div className="log-out-button-container">
          <div
                  className="logged-in-menu-buttons"
                  onClick={handleCreateClick}
                >
                  Airdnc your home
                </div>
        <div className="logged-in-menu-buttons" onClick={handleLogoutClick}>
          {name}
        </div>


        </div>
      )}
    </>
  );
}

export default LogOutButton;
