import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateSpot from "../CreateSpot/index";

const UpdateSpot = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    history.push("/");
  }

  return (
    <div className="update-container">
      <CreateSpot />
    </div>
  );
};

export default UpdateSpot;
