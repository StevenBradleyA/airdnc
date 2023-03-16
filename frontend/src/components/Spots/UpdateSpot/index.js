import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateSpotForm from "../CreateSpot/CreateSpotForm";

const UpdateSpot = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    history.push("/");
  }

  return (
    <div className="update-container">
      <CreateSpotForm formType="update" />
    </div>
  );
};

export default UpdateSpot;
