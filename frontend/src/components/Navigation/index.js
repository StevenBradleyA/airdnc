import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faBurger, faUserCircle, faBars, faB } from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";
import LogOutButton from "./Logout";
import DemoLogin from "./DemoLogin";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const burgerRef = useRef();
  useEffect(() => {
    let handleClickOffMenu = (e) => {
      if (!burgerRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOffMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOffMenu);
    };
  });

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
      <></>
      // <div>
      //   <ProfileButton user={sessionUser} />
      // </div>
    );
  } else {
    sessionLinks = (
      <div>
        <OpenModalButton
          buttonText="Log In"
          
          modalComponent={<LoginFormModal />}
        />
        <div></div>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
        <DemoLogin />
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
        <div className="new-spot-button" onClick={handleCreateClick}>
          Create a New Spot
        </div>
      )}
        <div className="nav-bar-menu-icon" onClick={handleMenuClick} ref={burgerRef}>
          <FontAwesomeIcon icon={faBars} className="menu-bars"/>
          <FontAwesomeIcon icon={faUserCircle} className="menu-circle-user"/>
        </div>
      <div className="menu-container" ref={burgerRef}>
        <div className="menu">

{/* 
          <FontAwesomeIcon
            icon={faBurger}
            style={{ opacity: 0.8 }}
            onClick={handleMenuClick}
          /> */}

          <div className={`menu-dropdown ${openMenu ? "active" : "inactive"}`}>
            {sessionUser && (
              <h3 className="menu-hello">{`Hello, ${sessionUser.firstName} ${sessionUser.email}`}</h3>
            )}
            {sessionUser && (
              <button
                className="your-profile-button"
                onClick={() => window.alert("Coming Soon!")}
              >
                Your Profile
              </button>
            )}
            {sessionUser && (
              <button
                className="manage-spot-button"
                onClick={handleManageClick}
              >
                Manage Spots
              </button>
            )}
            {sessionUser && (
              <LogOutButton user={sessionUser} name={`Log Out`} openMenu={openMenu} setOpenMenu={setOpenMenu} />
            )}
            <div className="logged-out-dropdown-container">{isLoaded && sessionLinks}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
