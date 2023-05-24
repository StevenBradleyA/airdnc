import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CreateSpotForm from "../CreateSpot/CreateSpotForm";
import { useParams } from "react-router-dom";
const UpdateSpot = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const {spotId} = useParams()
  if (!sessionUser) {
    history.push("/");
  }

  return (
    <div className="create-container">

      <CreateSpotForm formType="update" spotId={spotId}/>
    </div>
  );
};

export default UpdateSpot;
