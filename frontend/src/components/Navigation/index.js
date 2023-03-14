import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faBars, faBurger } from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuClick = (e) => {
    e.preventDefault();
    setOpenMenu((open) => !open);
  };
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
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
      <div className="menu">
        <FontAwesomeIcon
          icon={faBurger}
          style={{ opacity: 0.8 }}
          onClick={handleMenuClick}
        />
        {openMenu && (
          <ul className="menu-dropdown">
            <li>Profile</li>
            <li>{isLoaded && sessionLinks}</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navigation;
