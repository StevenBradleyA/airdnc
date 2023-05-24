import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logoMain from "../../media/logo-main.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./Navigation.css";
import LogOutButton from "./Logout";
import DemoLogin from "./DemoLogin";
import { useModal } from "../../context/Modal";
import FilterModal from "./filterModal";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const [openMenu, setOpenMenu] = useState(false);
  const { setModalContent } = useModal();

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

  const handleSearchClick = () => {
    setModalContent(<FilterModal />);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    setOpenMenu((open) => !open);
  };
  const handleCreateClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
    history.push("/spots/new");
  };
  const handleManageClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
    history.push("/spots/current");
  };
  const handleManageBookingsClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
    history.push("/bookings/current");
  };

  // Might make more sense to just make the search a drop down with all listings with the name
  // because you want to be able to search for a place on every page...

  // refactor once the backend is written
  // clicking the search button just opens a modal that displays listings ez pz

  const handleHomeClick = () => {
    history.push(`/`);
  };

  return (
    <div className="navigation-bar">
      <div className="home-button" onClick={handleHomeClick}>
        <img src={logoMain} alt="home" className="logo-main" />
        <div className="home-button-text">airdnc</div>
      </div>
      {sessionUser && (
        <div className="new-spot-button" onClick={handleCreateClick}>
          Airdnc your home
        </div>
      )}

      <div className="search-bar-style" onClick={handleSearchClick}>
        <div className="search-text-before">
          {`Anywhere   |   Any week   |  `}
          <span style={{ color: "grey" }}>Find a Couch</span>
        </div>

        <div className="magnifying-circle">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying" />
        </div>
      </div>

      <div className="menu-container" ref={burgerRef}>
        <div
          className="nav-bar-menu-icon"
          onClick={handleMenuClick}
          ref={burgerRef}
        >
          <FontAwesomeIcon icon={faBars} className="menu-bars" />
          <FontAwesomeIcon icon={faUserCircle} className="menu-circle-user" />
        </div>
        <div className="menu">
          <div className={`menu-dropdown ${openMenu ? "active" : "inactive"}`}>
            {sessionUser && (
              <div className="menu-drop-heading-container">
                <div className="menu-hello">{`Hello, ${sessionUser.firstName}`}</div>
                <div className="menu-email">{sessionUser.email}</div>
              </div>
            )}
            {sessionUser && (
              <div className="drop-down-logged-in-buttons">
                <div
                  className="logged-in-menu-buttons"
                  onClick={handleManageClick}
                >
                  Manage Listings
                </div>
                <div
                  className="logged-in-menu-buttons"
                  onClick={handleManageBookingsClick}
                >
                  Manage Bookings
                </div>

                

                <LogOutButton
                  user={sessionUser}
                  name={`Log Out`}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              </div>
            )}
            {!sessionUser && (
              <div className="logged-out-dropdown-container">
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
                <div className="demo-log-container">
                  <DemoLogin />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
