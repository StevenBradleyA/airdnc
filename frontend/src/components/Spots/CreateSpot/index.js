import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateSpotForm from "./CreateSpotForm";
import "./CreateSpot.css";

const CreateSpot = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    history.push("/");
  }

  return (
    <div>
      <h2>HELOOOOOOOOOOOOOO</h2>
      <h2>HELOOOOOOOOOOOOOO</h2>
      <h2>HELOOOOOOOOOOOOOO</h2>
      <h2>HELOOOOOOOOOOOOOO</h2>
      <CreateSpotForm />
    </div>
  );
};

export default CreateSpot;
