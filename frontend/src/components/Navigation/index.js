import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faBurger } from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";
import LogOutButton from "./Logout";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();

  const handleMenuClick = (e) => {
    e.preventDefault();
    setOpenMenu((open) => !open);
  };
  const handleCreateClick = (e) => {
    e.preventDefault();
    history.push("/spots/new");
  };
  const handleManageClick = (e) => {
    e.preventDefault();
    history.push("/spots/current");
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div className="navigation-bar">
      <div className="home-button">
        <NavLink
          exact
          to="/"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <FontAwesomeIcon icon={faCouch} />
          <> </>
          airdnc
        </NavLink>
      </div>
      {sessionUser && (
        <div className="new-spot-button">
          <button onClick={handleCreateClick}>Create a New Spot</button>
        </div>
      )}
      <div className="menu">
        <FontAwesomeIcon
          icon={faBurger}
          style={{ opacity: 0.8 }}
          onClick={handleMenuClick}
        />
        {openMenu && (
          <div className="menu-dropdown">
            {sessionUser && (
              <h3>{`Hello, ${sessionUser.firstName} ${sessionUser.email}`}</h3>
            )}
            {sessionUser && (
              <button className="your-profile-button">Your Profile</button>
            )}
            {sessionUser && (
              <div className="manage-spot-button">
                <button onClick={handleManageClick}>Manage Spots</button>
              </div>
            )}
            {sessionUser && (
              <LogOutButton user={sessionUser} name={`Log Out`} />
            )}
            <div>{isLoaded && sessionLinks}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
